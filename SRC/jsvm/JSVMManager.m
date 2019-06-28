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
#import "VMBridge.h"
#import "shareView.h"
#import "ShareToPlatforms.h"
#import "toastUtil.h"

@interface JSVMManager () <shareDelegate>


@end

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

JSContext *ct = nil;

JSVMBootManager *boot = nil;

VMBridge *vmb = nil;

JSValue* shareCallBack = nil;

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

//获取当前时间戳
- (NSString *)currentTimeStr{
    NSDate* date = [NSDate dateWithTimeIntervalSinceNow:0];//获取当前时间0秒后的时间
    NSTimeInterval time=[date timeIntervalSince1970]*1000;// *1000 是精确到毫秒，不乘就是精确到秒
    NSString *timeString = [NSString stringWithFormat:@"%.0f", time];
    return timeString;
}

//加载bundlejs文件
- (void)loadJSFromBundle:(NSString *)fileName context:(JSContext *)ctx{
    NSString *fileNamePath = [[NSBundle mainBundle] pathForResource:fileName ofType:nil];
    NSString *fileStr = [NSString stringWithContentsOfFile:fileNamePath encoding:NSUTF8StringEncoding error:nil];
    [ctx evaluateScript:fileStr withSourceURL:[NSURL URLWithString:fileName]];
}

- (JSContext *)shareInstanceWithUserAgent:(NSString *)userAgent withNavigationController:(globolNavigationController *)navi{
    // 初始化JSVM
    JSContext *context = [[JSContext alloc] init];
    vmb = [[VMBridge alloc] initWithContext:context];
    context[@"window"] = context.globalObject;
    context[@"self"] = context.globalObject;
    [context evaluateScript:@"var document = {};"];
    [context evaluateScript:@"document.body = {};"];
    [context evaluateScript:@"document.body.style = undefined;"];
    [self loadJSFromBundle:@"globalValue.js" context:context];
    context[@"WebSocketManger"] = [WebSocketManger class];
    [context evaluateScript:@"var isConsole = true;" withSourceURL:[NSURL URLWithString:@"isConsole.js"]];
    //添加打印方法
    context[@"console"][@"print"] =   ^(JSValue *one,JSValue*two,JSValue *three,JSValue *four) {
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
    
    
    
    [self loadJSFromBundle:@"env.js" context:context];
    
    context[@"JSVM"][@"postMessage"] = ^(JSValue *webName, JSValue *Message){
        //如果webName = undefined 说明是一个广播事件
        if ([webName.toString isEqualToString:@"undefined"]) {
            
        }else if ([YNWebView getIfWebViewWithWebName:webName.toString]) {
            NSString *fullCode = [NSString stringWithFormat:@"window['onWebViewPostMessage']('%@', '%@')",@"JSVM",Message.toString];
            NSString *fuco = [fullCode stringByReplacingOccurrencesOfString:@"\\" withString:@"\\\\"];
            dispatch_async(dispatch_get_main_queue(), ^{
                [[[YNWebView getYNWebViewInWebName:webName.toString] getWKWebView] evaluateJavaScript:fuco completionHandler:^(id object,NSError *error) {
                    if(error != nil) {
                        NSLog(@"item = %@, error = %@", object, error);
                    }
                }];
            });
            
            
        }
    };
    
   
    
    context[@"JSVM"][@"getRandomValues"] = ^(){
        UInt32 randomResult = 0;
        int result = SecRandomCopyBytes(kSecRandomDefault, sizeof(int), (uint8_t*)&randomResult);
        if (result != 0) randomResult = arc4random();
        return randomResult;
    };
    
    [self loadJSFromBundle:@"crypto.js" context:context];
    
    context[@"JSVM"][@"module"][@"loadJS"] = ^(JSValue *path,JSValue *base64){
        NSLog(@"load files......");
        NSData *data = [[NSData alloc] initWithBase64EncodedString:base64.toString options:0];
        NSString *value = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
        [[JSContext currentContext] evaluateScript:value withSourceURL:[NSURL URLWithString:path.toString]];
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
    
    context[@"JSVM"][@"getDownRead"] = ^(JSValue *filePath, JSValue *okCB, JSValue *errCB){
        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            NSData *base64Data = [NSData dataWithContentsOfFile:filePath.toString];
            NSString *value = [base64Data base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithLineFeed];
            if (value == nil) {
                [errCB callWithArgumentsNoNil:@[@"can not find"]];
            }else{
                [okCB callWithArgumentsNoNil:@[value]];
            }
        });
    };
    
    //base64
    [self loadJSFromBundle:@"base64js.min.js" context:context];
    
    
    context[@"JSVM"][@"messageReciver"] = ^(JSValue *message){
        [vmb postMessage:message.toArray];
    };
    
    
    
    context[@"JSVM"][@"goShare"] = ^(JSValue* imageName, JSValue* userName, JSValue* shareCode, JSValue* shareUrl, JSValue* callBack){
        shareCallBack = callBack;
        UIViewController *vm = navi.topViewController;
        shareView *share = [[shareView alloc] initWithFrame:vm.view.bounds ImageName:imageName.toString UserName:userName.toString ShareCode:shareCode.toString ShareUrl:shareUrl.toString];
        share.delegate = self;
        [vm.view addSubview:share];
    };
    
    context[@"window"][@"onWebViewPostMessage"] = ^(JSValue *name, JSValue *message){
        [[JSContext currentContext] evaluateScript:@"window.JSVM.goShare('wallet','test123','aighriaigag','http://www.niuroubao.cn', (isSuccess)=>{console.log('share success')})"];
    };
    
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
                [[JSContext currentContext] evaluateScript:value withSourceURL:[NSURL URLWithString:url.toString]];
            }
        }else{
            [[JSContext currentContext]  evaluateScript:value withSourceURL:[NSURL URLWithString:url.toString]];
        }
    };
    
    //注入alert方法
    context[@"alert"] = ^(JSValue *message){
        NSLog(@"%@",message.toString);
    };
    
    //注入时间函数
    [self timerAddToJSC:context];
    // 注入数据库函数
    [self FMDBAddToJSC:context];
    // 注入HTTP请求函数
    [self HTTPAddToJSC:context];
    
    //注入Boot
    boot = [[JSVMBootManager alloc] initWithContext:context];
    
    //注入第三方JS
    
    
    NSString *path = [@"assets/JSVM" stringByAppendingString:@"/vm/boot/jsvm.js"];
//    NSString *path = @"test.js";
    NSString *fullPath = [[[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingString:@"/"] stringByAppendingString:path];
    NSString *main = [NSString stringWithContentsOfFile:fullPath encoding:NSUTF8StringEncoding error:nil];
    if (main == nil) {
        fullPath = [[NSBundle mainBundle] pathForResource:path ofType:nil];
        //    NSString *fullPath = [[NSBundle mainBundle] pathForResource:@"jsvmTest.js" ofType:nil];
        main = [NSString stringWithContentsOfFile:fullPath encoding:NSUTF8StringEncoding error:nil];
    }
    context[@"location"][@"href"] = fullPath;
    if(main != nil){
        [context evaluateScript:main withSourceURL:[NSURL URLWithString:@"jsvm.js"]];
    }
    
    ct = context;
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
            double times = timeout.toDouble;
            double interval = times/1000.0;
            __weak typeof(self) weakSelf = self;
            NSTimer *timer = [NSTimer timerWithTimeInterval:interval repeats:NO block:^(NSTimer * _Nonnull timer) {
                [func callWithArgumentsNoNil:@[]];
                [weakSelf removeFrom:_dic withObject:timer];
                [timer invalidate];
                timer = nil;
            }];
            [NSRunLoop.mainRunLoop addTimer:timer forMode:NSRunLoopCommonModes];
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
            double times = timeout.toDouble;
            double interval = times/1000.0;
            __weak typeof(self) weakSelf = self;
            NSTimer *timer = [NSTimer timerWithTimeInterval:interval repeats:YES block:^(NSTimer * _Nonnull timer) {
                [func callWithArgumentsNoNil:@[]];
                [weakSelf removeFrom:_dic withObject:timer];
                [timer invalidate];
                timer = nil;
            }];
            [NSRunLoop.mainRunLoop addTimer:timer forMode:NSRunLoopCommonModes];
            
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


-(void)goShareBack:(UIView *)view{
    if (shareCallBack != nil) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [shareCallBack callWithArguments:@[@"fail"]];
            shareCallBack = nil;
        });
    }
    [view removeFromSuperview];
}

-(void)goShare:(NSNumber *)way{
    ShareToPlatforms *stp = [[ShareToPlatforms alloc] init];
    toastUtil *toast = [toastUtil shareInstance];
    [stp getScreenShot:^(CallJSType callJSType, NSArray *params) {
        if (callJSType == Success) {
            [stp shareScreen:way callJS:^(CallJSType callJSType, NSArray *params) {
                if (callJSType == Success) {
                    dispatch_async(dispatch_get_main_queue(), ^{
                        [shareCallBack callWithArguments:@[@"success"]];
                    });
                }else{
                    [toast makeToast:params[0] duration:1.0];
                }
            }];
        }else{
            [toast makeToast:@"截图失败" duration:1.0];
        }
    }];
    
}


@end
