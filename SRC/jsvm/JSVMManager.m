//
//  ZHObject.m
//  WebViewPro
//
//  Created by cifer on 2019/4/16.
//  Copyright © 2019 kuplay. All rights reserved.
//
#import "JSVMManager.h"
#import "URLSessionDataTask.h"
#import "FMDB.h"
#import "AFNetwork.h"
#import "AFNetWorking_Extension.h"
#import <JavaScriptCore/JavaScriptCore.h>
#import "JSVMBootManager.h"
#import "WebSocketManger.h"
#import "YNWebView.h"

@implementation JSVMManager
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

static JSVMManager *_manager = nil;

JSVMBootManager *boot = nil;

+ (JSVMManager *)getIntance {
    if (_manager == nil) {
        _manager = [[JSVMManager alloc] initManger];
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
    dispatch_queue_t serialQueue=dispatch_queue_create("FMDBSYANQUEUE", DISPATCH_QUEUE_SERIAL);
    _queue = serialQueue;
    // 初始化AFNet,尝试唯一对象
    _afManager = [[AFHTTPSessionManager alloc]init];
    return self;
}

- (JSContext *)shareInstanceWithUserAgent:(NSString *)userAgent withNavigationController:(globolNavigationController *)navi{
    // 初始化JSVM
    JSContext *context = [[JSContext alloc] init];
    [context evaluateScript:@"var console = {};"];
    [context evaluateScript:@"var navigator = {};"];
    [context evaluateScript:@"var JSVM = {};"];
    [context evaluateScript:@"JSVM.store = {};"];
    [context evaluateScript:@"JSVM.module = {};"];
    [context evaluateScript:@"JSVM.Boot = {};"];
    [context evaluateScript:@"var self= {};"];
    //添加打印方法
    context[@"console"][@"log"] =   ^(JSValue *one,JSValue*two,JSValue *three,JSValue *four) {
        NSArray * arr = @[one,two,three,four];
        NSString *result = @"";
        for (JSValue * i in arr) {
            if ([i.toString isEqualToString:@"undefined"]) {
            }else {
                result = [NSString stringWithFormat:@"%@%@",result,i];
            }
        }
        NSLog(@"%@",result);
    };
    
    context[@"JSVM"][@"postMessage"] = ^(JSValue *webName, JSValue *Message){
        //如果webName = undefined 说明是一个广播事件
        if ([webName.toString isEqualToString:@"undefined"]) {
            
            
        }else if ([YNWebView getIfWebViewWithWebName:webName.toString]) {
            NSString *fullCode = [NSString stringWithFormat:@"window['onWebViewPostMessage']('%@', '%@')",@"JSVM",Message.toString];
            [[[YNWebView getYNWebViewInWebName:webName.toString] getWKWebView] evaluateJavaScript:fullCode completionHandler:^(id object,NSError *error) {
                if(error != nil) {
                    NSLog(@"item = %@, error = %@", object, error);
                }
            }];
        }
    };
    
    context[@"JSVM"][@"getMessage"] = ^(JSValue *webName, JSValue *Message){
        NSLog(@"%@%@",webName.toString,Message.toString);
    };
    
    context[@"JSVM"][@"module"][@"loadJS"] = ^(JSValue *base64){
        NSData *data = [[NSData alloc] initWithBase64EncodedString:base64.toString options:0];
        NSString *value = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
        [[JSContext currentContext]  evaluateScript:value];
    };
    
    //添加浏览器环境字段
    context[@"navigator"][@"userAgent"] = userAgent;
    
    //沙盒路径
    context[@"JSVM"][@"sandBox"] = ^(){
        NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
        return docPath;
    };
    
    //添加读取文件方法
    context[@"JSVM"][@"fileRead"] = ^(JSValue *filePath){
        NSString *value = [[NSString alloc] initWithContentsOfFile:filePath.toString encoding:NSUTF8StringEncoding error:nil];
        return value;
    };
    
    //base64
    NSString *base64path = [[NSBundle mainBundle] pathForResource:@"base64js.min.js" ofType:nil];
    NSString *base64js = [NSString stringWithContentsOfFile:base64path encoding:NSUTF8StringEncoding error:nil];
    [context evaluateScript:base64js];
    //加载js方法
    context[@"JSVM"][@"loadJS"] = ^(JSValue *path, JSValue *url, JSValue *errFunc, JSValue *errText){
        NSString *docPath = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingString:@"/assets/JSVM"];
        NSString *fillPath = [docPath stringByAppendingString:url.toString];
        NSString *value = [[NSString alloc] initWithContentsOfFile:fillPath encoding:NSUTF8StringEncoding error:nil];
        if (!value){
            value = [[NSString alloc] initWithContentsOfFile:[path.toString stringByAppendingString:url.toString] encoding:NSUTF8StringEncoding error:nil];
            if (!value){
                [errFunc callWithArgumentsNoNil:@[errText]];
            }else{
                [[JSContext currentContext] evaluateScript:value];
            }
        }else{
            [[JSContext currentContext]  evaluateScript:value];
        }
    };
    
    //注入alert方法
    context[@"alert"] = ^(JSValue *message){
        UIAlertController *alert = [UIAlertController alertControllerWithTitle:[message toString] message:@"" preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *okAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
            
        }];
        [alert addAction:okAction];
        [navi.topViewController presentViewController:alert animated:YES completion:nil];
    };
    
    [context evaluateScript:@"var location = {};"];
    
    context[@"WebSocketManger"] = [WebSocketManger class];
    
    //注入时间函数
    [self timerAddToJSC:context];
    // 注入数据库函数
    [self FMDBAddToJSC:context];
    // 注入HTTP请求函数
    [self HTTPAddToJSC:context];
    
    //注入Boot
    boot = [[JSVMBootManager alloc] initWithContext:context];
//
    NSString *path = [@"assets/JSVM" stringByAppendingString:@"/dst/boot/jsvm.js"];
    NSString *fullPath = [[[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingString:@"/"] stringByAppendingString:path];
    NSString *main = [NSString stringWithContentsOfFile:fullPath encoding:NSUTF8StringEncoding error:nil];
    if (main == nil) {
        fullPath = [[NSBundle mainBundle] pathForResource:path ofType:nil];
        //    NSString *fullPath = [[NSBundle mainBundle] pathForResource:@"jsvmTest.js" ofType:nil];
        main = [NSString stringWithContentsOfFile:fullPath encoding:NSUTF8StringEncoding error:nil];
    }
    context[@"location"][@"href"] = fullPath;
    
    [context evaluateScript:main];
    
    
    return context;
};
// MARK:HTTP注入
-(void) HTTPAddToJSC:(JSContext *)context{
    context[@"JSVM"][@"request"] = ^(JSValue *inputType, JSValue *inputUrl, JSValue *inputHeader, JSValue *inputReqData, JSValue *inputReqType, JSValue *inputRespType, JSValue *success, JSValue *fail, JSValue *progress) {
        
        NSDictionary *header = inputHeader.toDictionary;
        NSString *method = inputType.toString;
        NSString * url = inputUrl.toString;
//        NSString *url = @"www.baidu.com";
        //  尝试使用唯一对象，不行再打开注释新建
        //    AFHTTPSessionManager * _afManager = [[AFHTTPSessionManager alloc]init];
        _afManager.requestSerializer = [AFJSONRequestSerializer serializer];
        [_afManager setResponseSerializer:[AFHTTPResponseSerializer serializer]]; // 设置不自动解析数据∂
        for (int i = 0; i<header.allKeys.count; i++) {
            NSString * key = header.allKeys[i];
            NSString * value = [header objectForKey:key];
            [_afManager.requestSerializer setValue:value forHTTPHeaderField:key]; // 添加请求头
        }
        NSData *body = nil;
        if ([method isEqualToString:@"POST"]) {
            if([inputReqType.toString isEqualToString:@"bin"]){
                body = [[NSData alloc] initWithBase64EncodedString:inputReqData.toString options:0];
            }else if([inputReqType.toString isEqualToString:@"json"]){
                body = [NSJSONSerialization dataWithJSONObject:inputReqData options:NSJSONWritingPrettyPrinted error:nil];
            }else{
                NSString *jsonString = [NSString stringWithFormat:@"%@", inputReqData];
                body = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
            }
        }
        NSURLSessionTask * task = [_afManager zhHttpRequestWithUrl:url method:method parameters:@{} httpBody:body progress:^(NSProgress * p) {
            NSNumber * complete = [[NSNumber alloc]initWithLong:p.completedUnitCount];
            NSNumber * total = [[NSNumber alloc]initWithLong:p.totalUnitCount];
            NSLog(@"完成进度=%@，总进度=%@",complete,total);
            [progress callWithArgumentsNoNil:@[complete,total]];
        } success:^(NSURLSessionDataTask * task, id data) {
            id request = nil;
            if ([inputRespType.toString isEqualToString:@"json"]) {
                NSDictionary *dicJson=[NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
                request = dicJson;
                NSLog(@"请求成功字典=%@",dicJson);
            }else if ([inputRespType.toString isEqualToString:@"bin"]){
                NSData *base64Data = [data base64EncodedDataWithOptions:0];
                NSString *baseString = [[NSString alloc]initWithData:base64Data encoding:NSUTF8StringEncoding];
                request = baseString;
                NSLog(@"请求成功base64=%@",baseString);
            }else{
                NSString *jsonStr = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                request = jsonStr;
                NSLog(@"请求成功字符串=%@",jsonStr);
            }
            [success callWithArgumentsNoNil:@[request]];
        } failure:^(NSURLSessionDataTask * task, NSError * error) {
            NSLog(@"请求失败%@",error.description);
            [fail callWithArgumentsNoNil:@[error.description]];
        }];
        URLSessionDataTask *obj = [[URLSessionDataTask alloc] initWithTask:task];
        return obj;
    };
}
//MARK:回调到jsc
-(void) callToJSC:(JSValue *)target WithArguments:(NSArray *)arguments WithComplete:(JSValue *)complete {
        [target callWithArgumentsNoNil:arguments];
        [complete callWithArgumentsNoNil:@[]];
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
- (void)FMDBAddToJSC:(JSContext *)context{
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
                [func callWithArgumentsNoNil:@[]];
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
                [func callWithArgumentsNoNil:@[]];
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



@end
