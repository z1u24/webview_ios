//
//  ZHObject.m
//  WebViewPro
//
//  Created by cifer on 2019/4/16.
//  Copyright © 2019 kuplay. All rights reserved.
//
#import "ZHJSVMManager.h"
#import "ZHURLSessionDataTask.h"
#import "FMDB.h"
#import "AFNetwork.h"
#import "AFNetWorking_Extension.h"
#import <JavaScriptCore/JavaScriptCore.h>

@implementation ZHJSVMManager
NSString *const CREATE_TABLE_SQL =
@"CREATE TABLE IF NOT EXISTS %@ ( \
id TEXT NOT NULL, \
json TEXT NOT NULL, \
createdTime TEXT NOT NULL, \
PRIMARY KEY(id)) \
";

NSString *const UPDATE_ITEM_SQL = @"REPLACE INTO %@ (id, json, createdTime) values (?, ?, ?)";

NSString *const QUERY_ITEM_SQL = @"SELECT json, createdTime from %@ where id = ? Limit 1";

NSString *const SELECT_ALL_SQL = @"SELECT * from %@";

NSString *const CLEAR_ALL_SQL = @"DELETE from %@";

NSString *const DELETE_ITEM_SQL = @"DELETE from %@ where id = ?";

NSString *const DELETE_ITEMS_SQL = @"DELETE from %@ where id in ( %@ )";

NSString *const DELETE_ITEMS_WITH_PREFIX_SQL = @"DELETE from %@ where id like ? ";

static ZHJSVMManager *_manager = nil;

+ (ZHJSVMManager *)getIntance {
    if (_manager == nil) {
        _manager = [[ZHJSVMManager alloc]initManger];
    }
    return _manager;
}

//FMDB参数
dispatch_queue_t _queue;
FMDatabase *_db;
// timer参数
int _timerKey = 0;
NSMutableDictionary *_dic;
// AFNetWorking
AFHTTPSessionManager *_afManager;

-(instancetype) initManger {
    self = [super init];
    // 实例化timer字典
    _dic = [NSMutableDictionary dictionary];
    // 实例化FMDataBase对象
    NSString *documentsPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    NSString *filePath = [documentsPath stringByAppendingPathComponent:@"jsvm.sqlite"];
    _db = [FMDatabase databaseWithPath:filePath];
    // 实例化queue
    dispatch_queue_t serialQueue=dispatch_queue_create("FMDB串行队列", DISPATCH_QUEUE_SERIAL);
    _queue = serialQueue;
    // 初始化AFNet,尝试唯一对象
    _afManager = [[AFHTTPSessionManager alloc]init];
    return self;
}

- (void)initContext {
    // 初始化JSVM
    JSContext * context = [[JSContext alloc] init];
    [context evaluateScript:@"var console = {}"];
    context[@"console"][@"log"] = ^(NSString *message) {
        NSLog(@"Javascript log: %@",message);
    };
    [context evaluateScript:@"var JSVM = {}"];
    [context evaluateScript:@"JSVM.store = {}"];
    //注入时间函数
    [self timerAddToJSC:context];
    // 注入数据库函数
    [self FMDBAddToJSC:context];
    // 注入HTTP请求函数
    [self HTTPAddToJSC:context];
    // 测试方法
    [self testAction:context];
    
    NSString *path = [[NSBundle mainBundle] pathForResource:@"jsvmTest" ofType:@"js"];
    NSString *str = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:nil];
    [context evaluateScript:str];
    
};
// MARK:HTTP注入
-(void) HTTPAddToJSC:(JSContext *)context{
    context[@"JSVM"][@"request"] = ^(JSValue *inputType,JSValue *inputUrl,JSValue *inputHeader,JSValue *inputReqData,JSValue *inputRespType,JSValue *success, JSValue *fail,JSValue *progress) {
        
        NSDictionary *header =  @{};
        NSString *method = @"GET";
        NSString * url = @"http://chatapp-assets.shuyouhu.com/server.txt";
        //  尝试使用唯一对象，不行再打开注释新建
        //    AFHTTPSessionManager * _afManager = [[AFHTTPSessionManager alloc]init];
        _afManager.requestSerializer = [AFJSONRequestSerializer serializer]; // 忘了
        [_afManager setResponseSerializer:[AFHTTPResponseSerializer serializer]]; // 设置不自动解析数据∂
        for (int i = 0; i<header.allKeys.count; i++) {
            NSString * key = header.allKeys[i];
            NSString * value = [header objectForKey:key];
            [_afManager.requestSerializer setValue:value forHTTPHeaderField:key]; // 添加请求头
        }
        
        NSData *body = nil;
        if([inputReqData isKindOfClass:[NSString class]]) {
            NSString *jsonString = [NSString stringWithFormat:@"%@", inputReqData];
            body = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
        }else {
            
        }
        
        NSURLSessionTask * task = [_afManager zhHttpRequestWithUrl:url method:method parameters:@{} httpBody:body progress:^(NSProgress * p) {
            NSNumber * complete = [[NSNumber alloc]initWithLong:p.completedUnitCount];
            NSNumber * total = [[NSNumber alloc]initWithLong:p.totalUnitCount];
            NSLog(@"完成进度=%@，总进度=%@",complete,total);
            [progress callWithArguments:@[complete,total]];
        } success:^(NSURLSessionDataTask * task, id data) {
            NSString *jsonStr = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
            NSLog(@"请求成功字符串=%@",jsonStr);
            NSDictionary *dicJson=[NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
            NSLog(@"请求成功字典=%@",dicJson);
            NSData *base64Data = [data base64EncodedDataWithOptions:0];
            NSString *baseString = [[NSString alloc]initWithData:base64Data encoding:NSUTF8StringEncoding];
            NSLog(@"请求成功base64=%@",baseString);
        } failure:^(NSURLSessionDataTask * task, NSError * error) {
            NSLog(@"请求失败%@",error.description);
            [fail callWithArguments:@[error.description]];
        }];
        ZHURLSessionDataTask *obj = [[ZHURLSessionDataTask alloc]initWithTask:task];
        return obj;
    };
}
//MARK:回调到jsc
-(void) callToJSC:(JSValue *)target WithArguments:(NSArray *)arguments WithComplete:(JSValue *)complete {
    // 不判断直接callwith也屁事没的
    //    NSString * func = [NSString stringWithFormat:@"%@", target];
    //    if (func == nil || [func isEqual: @"undefined"]) {
    //        return;
    //    }
    [target callWithArguments:arguments];
    [complete callWithArguments:@[]];
}

// MARK:检查表名是否符合格式
- (BOOL)checkTableName:(NSString *)tableName {
    if (tableName == nil || tableName.length == 0 || [tableName rangeOfString:@" "].location != NSNotFound) {
        NSLog(@"ERROR, table name: %@ format error.", tableName);
        return NO;
    }
    return YES;
}
//MARK: FMDB注入
-(void) FMDBAddToJSC:(JSContext *)context{
    NSString *g = NSHomeDirectory();
    NSLog(@"%@",g);
    /// 创建
    context[@"JSVM"][@"store"][@"create"] = ^(JSValue *inputTabName,JSValue *success, JSValue *fail,JSValue *complete) {
        dispatch_async(_queue, ^{
            NSString * tableName = [NSString stringWithFormat:@"%@", inputTabName];
            if ([self checkTableName:tableName] == NO) {
                // 参数错误
                [self callToJSC:fail WithArguments:@[@"The tableName does not exist"] WithComplete:complete];
                NSLog(@"参数错误=%@",inputTabName);
                return;
            }
            [_db open];
            NSString * createSql = [NSString stringWithFormat:CREATE_TABLE_SQL, tableName];
            BOOL createResult = [_db executeUpdate:createSql];
            [_db close];
            // 返回值成功失败完结
            JSValue * result = createResult ? success:fail;
            NSArray * array = createSql ? @[]:@[@"create table error"];
            [self callToJSC:result WithArguments:array WithComplete:complete];
        });
    };
    
    /// 增加(其实是替换)
    context[@"JSVM"][@"store"][@"write"] = ^(JSValue *inputTabName,JSValue *key,JSValue *data,JSValue *success, JSValue *fail,JSValue *complete) {
        dispatch_async(_queue, ^{
            NSString * tableName = [NSString stringWithFormat:@"%@", inputTabName];
            if ([self checkTableName:tableName] == NO) {
                // 参数错误
                [self callToJSC:fail WithArguments:@[@"The tableName does not exist"] WithComplete:complete];
                NSLog(@"参数错误=%@",inputTabName);
                return;
            }
            [_db open];
            NSString *inputKey = [NSString stringWithFormat:@"%@", key];
            NSString *inputJson = [NSString stringWithFormat:@"%@", data];
            NSString * updateSql = [NSString stringWithFormat:UPDATE_ITEM_SQL, tableName];
            NSDate * createdTime = [NSDate date];
            BOOL updateResult = [_db executeUpdate:updateSql,inputKey,inputJson,createdTime];
            [_db close];
            // 返回值成功失败完结
            JSValue * result = updateResult ? success:fail;
            NSArray * array = updateResult ? @[]:@[@"write table error"];
            [self callToJSC:result WithArguments:array WithComplete:complete];
        });
    };
    /// 查询单条
    context[@"JSVM"][@"store"][@"read"] = ^(JSValue *inputTabName,JSValue *key,JSValue *success, JSValue *fail,JSValue *complete) {
        dispatch_async(_queue, ^{
            NSString * tableName = [NSString stringWithFormat:@"%@", inputTabName];
            if ([self checkTableName:tableName] == NO) {
                // 参数错误
                [self callToJSC:fail WithArguments:@[@"The tableName does not exist"] WithComplete:complete];
                NSLog(@"参数错误=%@",inputTabName);
                return;
            }
            NSString *inputKey = [NSString stringWithFormat:@"%@", key];
            /// 查询
            [_db open];
            NSString * querySql = [NSString stringWithFormat:QUERY_ITEM_SQL,tableName];
            FMResultSet * rs = [ _db executeQuery:querySql,inputKey];
            if ([rs next]) {
                NSString * json = [rs stringForColumn:@"json"];
                [self callToJSC:success WithArguments:@[json] WithComplete:complete];
            }else {
                // 没值
                [self callToJSC:fail WithArguments:@[@"The key does not exist"] WithComplete:complete];
            }
            [_db close];
            // 完结
            
        });
    };
    
    ///    删除数据
    context[@"JSVM"][@"store"][@"remove"] = ^(JSValue *inputTabName,JSValue *key,JSValue *success, JSValue *fail,JSValue *complete) {
        dispatch_async(_queue, ^{
            NSString * tableName = [NSString stringWithFormat:@"%@", inputTabName];
            if ([self checkTableName:tableName] == NO) {
                // 参数错误
                [self callToJSC:fail WithArguments:@[@"The tableName does not exist"] WithComplete:complete];
                NSLog(@"参数错误=%@",inputTabName);
                return;
            }
            NSString *inputKey = [NSString stringWithFormat:@"%@", key];
            [_db open];
            NSString * removeSql = [NSString stringWithFormat:DELETE_ITEM_SQL, tableName];
            BOOL removeResult = [_db executeUpdate:removeSql, inputKey];
            [_db close];
            // 返回值成功失败完结
            JSValue * result = removeResult ? success:fail;
            NSArray * array = removeResult ? @[]:@[@"remove table error"];
            [self callToJSC:result WithArguments:array WithComplete:complete];
        });
    };
    /// 查询表格所有数据
    context[@"JSVM"][@"store"][@"iterate"] = ^(JSValue *inputTabName,JSValue *success, JSValue *fail,JSValue *complete) {
        dispatch_async(_queue, ^{
            NSString * tableName = [NSString stringWithFormat:@"%@", inputTabName];
            if ([self checkTableName:tableName] == NO) {
                // 参数错误
                [self callToJSC:fail WithArguments:@[@"The tableName does not exist"] WithComplete:complete];
                return;
            }
            [_db open];
            NSString * quertyAllsql = [NSString stringWithFormat:SELECT_ALL_SQL, tableName];
            __block NSMutableDictionary * dic = [NSMutableDictionary dictionary];
            FMResultSet * all = [_db executeQuery:quertyAllsql];
            while ([all next]) {
                NSString *key = [all stringForColumn:@"id"];
                NSString *value = [all stringForColumn:@"json"];
                [dic setObject:value forKey:key];
            }
            [_db close];
            NSError * error = nil;
            NSData * jsonData = [NSJSONSerialization dataWithJSONObject:dic options:NSJSONWritingPrettyPrinted error:&error];
            if (error == nil) {
                NSString * jsonStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
                [self callToJSC:success WithArguments:@[jsonStr] WithComplete:complete];
            }else {
                [self callToJSC:fail WithArguments:@[@"NSJSONWritingPrettyPrinted error"] WithComplete:complete];
            }
            
        });
    };
    /// 移除表格
    context[@"JSVM"][@"store"][@"delete"] = ^(JSValue *inputTabName,JSValue *success, JSValue *fail,JSValue *complete) {
        dispatch_async(_queue, ^{
            NSString * tableName = [NSString stringWithFormat:@"%@", inputTabName];
            if ([self checkTableName:tableName] == NO) {
                // 参数错误
                [self callToJSC:fail WithArguments:@[@"The tableName does not exist"] WithComplete:complete];
                NSLog(@"参数错误=%@",inputTabName);
                return;
            }
            [_db open];
            NSString * deleteTabSql = [NSString stringWithFormat:CLEAR_ALL_SQL, tableName];
            BOOL deleteResult = [_db executeUpdate:deleteTabSql];
            [_db close];
            // 返回值成功失败完结
            JSValue * result = deleteResult ? success:fail;
            NSArray * array = deleteResult ? @[]:@[@"delete table error"];
            [self callToJSC:result WithArguments:array WithComplete:complete];
        });
    };
}
// 移除字典中的对象
-(void)removeFrom:(NSMutableDictionary *)dic withObject:(id )obj {
    for (NSString *dicKey in dic.allKeys) {
        id target = [dic objectForKey:dicKey];
        if (target == obj) {
            [dic removeObjectForKey:dicKey];
            break;
        }
    }
}
// MARK: 定时器相关注入
-(void) timerAddToJSC:(JSContext *)context{
    context[@"setTimeout"] = ^(JSValue *func, JSValue *timeout) {
        if (timeout.isNumber) {
            _timerKey += 1;
            NSTimer *timer = [NSTimer scheduledTimerWithTimeInterval:[timeout toDouble]/1000.0 repeats:NO block:^(NSTimer * _Nonnull timer) {
                [func callWithArguments:@[]];
                [self removeFrom:_dic withObject:timer];
                [timer invalidate];
                timer = nil;
            }];
            NSString *key = [NSString stringWithFormat:@"%d",_timerKey];
            [_dic setObject:timer forKey:key];
            return _timerKey;
        }else {
            return 0;
        }
    };
    context[@"clearTimeout"] = ^(JSValue*timeout) {
        NSString *key = [NSString stringWithFormat:@"%@",timeout];
        NSTimer *timer = [_dic objectForKey:key];
        [_dic removeObjectForKey:key];
        [timer invalidate];
        timer = nil;
    };
    context[@"setInterval"] = ^(JSValue *func, JSValue *timeout) {
        if (timeout.isNumber) {
            _timerKey += 1;
            NSTimer *timer = [NSTimer scheduledTimerWithTimeInterval:[timeout toDouble]/1000.0 repeats:YES block:^(NSTimer * _Nonnull timer) {
                [func callWithArguments:@[]];
                [self removeFrom:_dic withObject:timer];
                [timer invalidate];
                timer = nil;
            }];
            NSString *key = [NSString stringWithFormat:@"%d",_timerKey];
            [_dic setObject:timer forKey:key];
            return _timerKey;
        }else {
            return 0;
        }
    };
    context[@"clearInterval"] = ^(JSValue*timeout) {
        NSString *key = [NSString stringWithFormat:@"%@",timeout];
        NSTimer *timer = [_dic objectForKey:key];
        [_dic removeObjectForKey:key];
        [timer invalidate];
        timer = nil;
    };
}

// 测试代码
-(void) testAction:(JSContext *)context{
    //                for (NSString *dicKey in _dic.allKeys) {
    //                    NSTimer *target = [_dic objectForKey:dicKey];
    //                    if (target == timer) {
    //                        [_dic removeObjectForKey:dicKey];
    //                        [timer invalidate];
    //                        timer = nil;
    //                        break;
    //                    }
    //                }
    //    context[@"ZHURLSessionDataTask"] = [ZHURLSessionDataTask class];
    //    dispatch_group_t group = dispatch_group_create();
    //    dispatch_group_async(group, queue, ^{ NSLog(@"1"); });
    //    dispatch_group_async(group, queue, ^{ NSLog(@"2"); });
    //    dispatch_group_async(group, queue, ^{ NSLog(@"3"); });
    //    dispatch_group_async(group, queue, ^{ NSLog(@"4"); });
    //    dispatch_group_async(group, queue, ^{ NSLog(@"5"); });
    //    dispatch_group_notify(group, dispatch_get_main_queue(), ^{ NSLog(@"done"); });
    //    dispatch_async(queue, ^{
    //        NSLog(@"22222");
    //    });
    //    NSLog(@"3333");
    
    //        [store createTableWithName:tableName];
    //        [store putString:@"你好世界一号机" withId:@"name" intoTable:tableName];
    //        NSString *json = [store getStringById:@"name" fromTable:tableName];
    //        NSLog(@"%@",json);
    //            [store deleteObjectById:@"name" fromTable:tableName];
    //        [store clearTable:tableName];
    
    //    NSString *tableName = @"person";
    //    /// 创建
    //    [_db open];
    //    NSString * createSql = [NSString stringWithFormat:CREATE_TABLE_SQL, tableName];
    //    BOOL createResult = [_db executeUpdate:createSql];
    //    /// 增加(其实是替换)
    //    NSString *inputJson = @"输入值二号机";
    //    NSString *inputKey = @"一号机";
    //    // 检查表名
    //    if ([self checkTableName:tableName] == NO) {
    //        return;
    //    }
    //    NSString * insertSql = [NSString stringWithFormat:UPDATE_ITEM_SQL, tableName];
    //    NSDate * createdTime = [NSDate date];
    //    [_db executeUpdate:insertSql,inputKey,inputJson,createdTime];
    //    NSString *inputKey1 = @"二号机";
    //    [_db executeUpdate:insertSql,inputKey1,inputJson,createdTime];
    //    /// 查询所有
    //    NSString * quertyAllsql = [NSString stringWithFormat:SELECT_ALL_SQL, tableName];
    //    __block NSMutableArray * allKeyResult = [NSMutableArray array];
    //    FMResultSet * all = [_db executeQuery:quertyAllsql];
    //    while ([all next]) {
    //        NSString *key = [all stringForColumn:@"id"];
    //        [allKeyResult addObject:key];
    //    }
    //    NSLog(@"%@",allKeyResult);
    //    /// 查询
    //    NSString * querySql = [NSString stringWithFormat:QUERY_ITEM_SQL,tableName];
    //    FMResultSet * rs = [ _db executeQuery:querySql,inputKey];
    //    if ([rs next]) {
    //        NSString * json = [rs stringForColumn:@"json"];
    //        //        NSData *queryCreatedTime = [rs dateForColumn:@"createdTime"];
    //        NSLog(@"%@",json);
    //    }else {
    //        // 没值
    //    }
    //    /// 删除数据
    //    NSString * removeSql = [NSString stringWithFormat:DELETE_ITEM_SQL, tableName];
    //    [_db executeUpdate:removeSql, inputKey];
    //    /// 删除表
    //    NSString * deleteTabSql = [NSString stringWithFormat:CLEAR_ALL_SQL, tableName];
    //    [_db executeUpdate:deleteTabSql];
    //    [_db close];
}

//- (NSURLSessionDataTask *)getOrPost:(NSString *)URLString
//                         parameters:(id)parameters
//                           progress:(void (^)(NSProgress * _Nonnull))downloadProgress
//                            success:(void (^)(NSURLSessionDataTask * _Nonnull, id _Nullable))success
//                            failure:(void (^)(NSURLSessionDataTask * _Nullable, NSError * _Nonnull))failure
//                              isGet:(BOOL) b
//                        withManager:(AFHTTPSessionManager *)manager
//{
//    manager.requestSerializer.timeoutInterval = 20.f;
//    NSURLSessionDataTask *task = nil;
//    if (b) {
//        task = [manager GET:URLString parameters:parameters progress:downloadProgress success:success failure:failure];
//    }else {
//        task = [manager POST:URLString parameters:parameters progress:downloadProgress success:success failure:failure];
//    }
//    return task;
//}

@end
