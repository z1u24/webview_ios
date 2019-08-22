//
//  PIDataBase.m
//  WebViewPro
//
//  Created by yineng on 2019/7/16.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "PIDataBase.h"
#import "FMDB.h"
#import "DataHandle.h"

@implementation PIDataBase{
    dispatch_queue_t _queue;
    FMDatabase *_db;
    int transactionTime;
    BOOL canClose;
    
}

static PIDataBase *vmDataBase = nil;
NSString *const CREATE_TABLE_SQL = @"CREATE TABLE IF NOT EXISTS %@ (id TEXT NOT NULL,json TEXT NOT NULL,createdTime TEXT NOT NULL,PRIMARY KEY(id))";
NSString *const UPDATE_ITEM_SQL = @"REPLACE INTO %@ (id, json, createdTime) values (?, ?, ?)";
NSString *const QUERY_ITEM_SQL = @"SELECT json, createdTime from %@ where id = ? Limit 1";
NSString *const SELECT_ALL_SQL = @"SELECT * from %@";
NSString *const CLEAR_ALL_SQL = @"DELETE from %@";
NSString *const DELETE_ITEM_SQL = @"DELETE from %@ where id = ?";
NSString *const DELETE_ITEMS_SQL = @"DELETE from %@ where id in ( %@ )";
NSString *const DELETE_ITEMS_WITH_PREFIX_SQL = @"DELETE from %@ where id like ? ";

- (instancetype)initWithName:(NSString *)name{
    self = [super init];
    if (self) {
        // 实例化FMDataBase对象
        canClose = YES;
        transactionTime = 200;
        NSString *documentsPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
        NSString *dbName = [NSString stringWithFormat:@"%@.sqlite",name];
        NSString *filePath = [documentsPath stringByAppendingPathComponent:dbName];
        _db = [FMDatabase databaseWithPath:filePath];
        // 实例化queue
        _queue = dispatch_queue_create("FMDBSYANQUEUE", DISPATCH_QUEUE_SERIAL);
        //事务GCD定时器
        
    }
    return self;
}

-(void)startTransaction{
    //查看DB有没有打开
    if (![self->_db isOpen]) {
        //打开数据库，启用事务
        [self->_db open];
        [self->_db beginTransaction];
        //打开定时器GCD
        dispatch_source_t timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, _queue);
        dispatch_source_set_timer(timer, DISPATCH_TIME_NOW, transactionTime * NSEC_PER_MSEC, 0 * NSEC_PER_MSEC);
        dispatch_source_set_event_handler(timer, ^{
            if(self->canClose){
                //关闭定时器
                dispatch_cancel(timer);
                [self->_db commit];
                //关闭事务
                [self->_db close];
            }
        });
        //开启定时器
        dispatch_resume(timer);
    }
}

+(PIDataBase *)getVMDataBase{
    if (vmDataBase == nil) {
        vmDataBase = [[PIDataBase alloc] initWithName:@"JSVM"];
    }
    return vmDataBase;
}

//MARK:回调到jsc
-(void)callToJSC:(callBack)target WithArguments:(NSArray *)arguments WithComplete:(callBack)complete {
    target(arguments);
    complete(@[]);
}

// MARK:检查表名是否符合格式
- (BOOL)checkTableName:(NSString *)tableName {
    if (tableName == nil || tableName.length == 0 || [tableName rangeOfString:@" "].location != NSNotFound) {
        NSLog(@"ERROR, table name: %@ format error.", tableName);
        return NO;
    }
    return YES;
}

-(void)create:(NSString *)inputTabName success:(callBack)success fail:(callBack)fail complete:(callBack)complete{
    dispatch_async(_queue, ^{
        NSString * tableName = [NSString stringWithFormat:@"%@", inputTabName];
        if ([self checkTableName:tableName] == NO) {
            // 参数错误
            [self callToJSC:fail WithArguments:@[@"The tableName does not exist"] WithComplete:complete];
            NSLog(@"参数错误=%@",inputTabName);
            return;
        }
        [self->_db open];
        NSString * createSql = [NSString stringWithFormat:CREATE_TABLE_SQL, tableName];
        BOOL createResult = [self->_db executeUpdate:createSql];
        [self->_db close];
        // 返回值成功失败完结
        callBack result = createResult ? success:fail;
        NSArray * array = createSql ? @[]:@[@"create table error"];
        [self callToJSC:result WithArguments:array WithComplete:complete];
    });
}

-(void)write:(NSString *)inputTabName key:(NSString *)key data:(NSString *)data success:(callBack)success fail:(callBack)fail complete:(callBack)complete{
    NSLog(@"saveVMFile:%@",key);
//    [self->_db beginTransaction];
    dispatch_async(_queue, ^{
        self->canClose = NO;
        NSString * tableName = [NSString stringWithFormat:@"%@", inputTabName];
        if ([self checkTableName:tableName] == NO) {
            // 参数错误
            [self callToJSC:fail WithArguments:@[@"The tableName does not exist"] WithComplete:complete];
            NSLog(@"参数错误=%@",inputTabName);
            return;
        }
        [self startTransaction];
        NSString *inputKey = [NSString stringWithFormat:@"%@", key];
        NSString *inputJson = [NSString stringWithFormat:@"%@", data];
        NSString * updateSql = [NSString stringWithFormat:UPDATE_ITEM_SQL, tableName];
        NSDate * createdTime = [NSDate date];
        BOOL updateResult = [self->_db executeUpdate:updateSql,inputKey,inputJson,createdTime];
        // 返回值成功失败完结
        callBack result = updateResult ? success:fail;
        NSArray * array = updateResult ? @[]:@[@"write table error"];
        [self callToJSC:result WithArguments:array WithComplete:complete];
        self->canClose = YES;
    });
}

-(void)read:(NSString *)inputTabName key:(NSString *)key success:(callBack)success fail:(callBack)fail complete:(callBack)complete{
    dispatch_async(_queue, ^{
        self->canClose = NO;
        NSString * tableName = [NSString stringWithFormat:@"%@", inputTabName];
        if ([self checkTableName:tableName] == NO) {
            // 参数错误
            [self callToJSC:fail WithArguments:@[@"The tableName does not exist"] WithComplete:complete];
            NSLog(@"参数错误=%@",inputTabName);
            return;
        }
        NSString *inputKey = [NSString stringWithFormat:@"%@", key];
        /// 查询
        [self startTransaction];
        NSString * querySql = [NSString stringWithFormat:QUERY_ITEM_SQL,tableName];
        FMResultSet * rs = [ self->_db executeQuery:querySql,inputKey];
        if ([rs next]) {
            NSString * json = [rs stringForColumn:@"json"];
            DataHandle *dataHandle = [[DataHandle alloc] init];
            [dataHandle setContent:json file:key];
            [self callToJSC:success WithArguments:@[dataHandle] WithComplete:complete];
        }else {
            // 没值
            [self callToJSC:fail WithArguments:@[@"The key does not exist"] WithComplete:complete];
        }
        self->canClose = YES;
        // 完结
    });
}

-(void)remove:(NSString *)inputTabName key:(NSString *)key success:(callBack)success fail:(callBack)fail complete:(callBack)complete{
    dispatch_async(_queue, ^{
        NSString * tableName = [NSString stringWithFormat:@"%@", inputTabName];
        if ([self checkTableName:tableName] == NO) {
            // 参数错误
            [self callToJSC:fail WithArguments:@[@"The tableName does not exist"] WithComplete:complete];
            NSLog(@"参数错误=%@",inputTabName);
            return;
        }
        NSString *inputKey = [NSString stringWithFormat:@"%@", key];
        [self->_db open];
        NSString * removeSql = [NSString stringWithFormat:DELETE_ITEM_SQL, tableName];
        BOOL removeResult = [self->_db executeUpdate:removeSql, inputKey];
        [self->_db close];
        // 返回值成功失败完结
        callBack result = removeResult ? success:fail;
        NSArray * array = removeResult ? @[]:@[@"remove table error"];
        [self callToJSC:result WithArguments:array WithComplete:complete];
    });
}

-(void)iterate:(NSString *)inputTabName success:(callBack)success fail:(callBack)fail complete:(callBack)complete{
    dispatch_async(_queue, ^{
        NSString * tableName = [NSString stringWithFormat:@"%@", inputTabName];
        if ([self checkTableName:tableName] == NO) {
            // 参数错误
            [self callToJSC:fail WithArguments:@[@"The tableName does not exist"] WithComplete:complete];
            return;
        }
        [self->_db open];
        NSString * quertyAllsql = [NSString stringWithFormat:SELECT_ALL_SQL, tableName];
        __block NSMutableDictionary * dic = [NSMutableDictionary dictionary];
        FMResultSet * all = [self->_db executeQuery:quertyAllsql];
        while ([all next]) {
            NSString *key = [all stringForColumn:@"id"];
            NSString *value = [all stringForColumn:@"json"];
            [dic setObject:value forKey:key];
        }
        [self->_db close];
        NSError * error = nil;
        NSData * jsonData = [NSJSONSerialization dataWithJSONObject:dic options:NSJSONWritingPrettyPrinted error:&error];
        if (error == nil) {
            NSString * jsonStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
            DataHandle *data = [[DataHandle alloc] init];
            [data setValue:jsonStr forKey:inputTabName];
            [self callToJSC:success WithArguments:@[data] WithComplete:complete];
        }else {
            [self callToJSC:fail WithArguments:@[@"NSJSONWritingPrettyPrinted error"] WithComplete:complete];
        }
    });
}

-(void)deleteTable:(NSString *)inputTabName success:(callBack)success fail:(callBack)fail complete:(callBack)complete{
    dispatch_async(_queue, ^{
        NSString * tableName = [NSString stringWithFormat:@"%@", inputTabName];
        if ([self checkTableName:tableName] == NO) {
            // 参数错误
            [self callToJSC:fail WithArguments:@[@"The tableName does not exist"] WithComplete:complete];
            NSLog(@"参数错误=%@",inputTabName);
            return;
        }
        [self->_db open];
        NSString * deleteTabSql = [NSString stringWithFormat:CLEAR_ALL_SQL, tableName];
        BOOL deleteResult = [self->_db executeUpdate:deleteTabSql];
        [self->_db close];
        // 返回值成功失败完结
        callBack result = deleteResult ? success:fail;
        NSArray * array = deleteResult ? @[]:@[@"delete table error"];
        [self callToJSC:result WithArguments:array WithComplete:complete];
    });
}

@end
