//
//  ZHObject.m
//  WebViewPro
//
//  Created by cifer on 2019/4/16.
//  Copyright © 2019 kuplay. All rights reserved.
//
#import "JSVMManager.h"
#import "URLSessionDataTask.h"
#import <JavaScriptCore/JavaScriptCore.h>
#import "JSVMBootManager.h"
#import "WebSocketManger.h"
#import "YNWebView.h"
#import "VMBridge.h"
#import "shareView.h"
#import "payView.h"
#import "IAPManager.h"
#import "ShareToPlatforms.h"
#import "toastUtil.h"
#import "StageUtils.h"
#import "DataHandle.h"
#import "PIAjax.h"
#import "PITimer.h"
#import "PIDataBase.h"
#import "PICoreApi.h"

@interface JSVMManager () <shareDelegate,payDelegate>


@end

@implementation JSVMManager{
    JSContext *ct;
    payView *pv;
    IAPManager *iapm;
    JSVMBootManager *boot;
    VMBridge *vmb;
    JSValue* shareCallBack;
    JSValue* payCallBack;
}
static JSVMManager *_manager = nil;

+ (JSVMManager *)getIntance {
    if (_manager == nil) {
        _manager = [[JSVMManager alloc] initManger];
    }
    return _manager;
}


-(instancetype) initManger {
    self = [super init];
    //初始化支付模块
    iapm = [[IAPManager alloc] init];
    return self;
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
    
    PICoreApi *eth = [[PICoreApi alloc] initWithJSContext:context];
    
    vmb = [[VMBridge alloc] initWithContext:context];
    context[@"window"] = context.globalObject;
    context[@"self"] = context.globalObject;
    [context evaluateScript:@"var isConsole = true;"];
    //base64
    [self loadJSFromBundle:@"base64js.min.js" context:context];
    [self loadJSFromBundle:@"globalValue.js" context:context];
    context[@"WebSocketManger"] = [WebSocketManger class];
    context[@"DataHandle"] = [DataHandle class];
    
    
    
    //添加打印方法
    context[@"console"][@"print"] = ^(JSValue *one,JSValue*two,JSValue *three,JSValue *four) {
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
    
    context[@"JSVM"][@"messageReciver"] = ^(JSValue *message){
        [self->vmb postMessage:message.toArray];
    };
    
    context[@"JSVM"][@"getReady"] = ^(JSValue *stage){
        StageUtils *stageUtil = [StageUtils sharedInstence];
        BOOL b = [stageUtil makeStages:stage.toString mod:@"JSVM"];
        if (b) {
            NSString *fullCode = [NSString stringWithFormat:@"window['onLoadTranslation']('%@')",stage];
            dispatch_async(dispatch_get_main_queue(), ^{
                [[[YNWebView getYNWebViewInWebName:@"default"] getWKWebView] evaluateJavaScript:fullCode completionHandler:^(id object,NSError *error) {
                    if(error != nil) {
                        NSLog(@"item = %@, error = %@", object, error);
                    }
                }];
            });
            [[JSContext currentContext] evaluateScript:fullCode];
        }
    };
   
    
    context[@"JSVM"][@"getRandomValues"] = ^(){
        UInt32 randomResult = 0;
        int result = SecRandomCopyBytes(kSecRandomDefault, sizeof(int), (uint8_t*)&randomResult);
        if (result != 0) randomResult = arc4random();
        return randomResult;
    };
    
    [self loadJSFromBundle:@"crypto.js" context:context];
    
    //添加浏览器环境字段
    context[@"navigator"][@"userAgent"] = userAgent;
    
    context[@"JSVM"][@"getDownRead"] = ^(JSValue *filePath, JSValue *fileName, JSValue *okCB, JSValue *errCB){
        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            NSString *value = [[NSString alloc] initWithContentsOfFile:filePath.toString encoding:NSUTF8StringEncoding error:nil];
            DataHandle *dataHandle = [[DataHandle alloc] init];
            [dataHandle setContent:value file:fileName.toString];
            if (value == nil) {
                [errCB callWithArgumentsNoNil:@[@"can not find"]];
            }else{
                [okCB callWithArgumentsNoNil:@[dataHandle]];
            }
        });
    };
    
    context[@"JSVM"][@"goShare"] = ^(JSValue* imageName, JSValue* userName, JSValue* shareCode, JSValue* shareUrl, JSValue* callBack){
        self->shareCallBack = callBack;
        UIViewController *vm = navi.topViewController;
        shareView *share = [[shareView alloc] initWithFrame:vm.view.bounds ImageName:imageName.toString UserName:userName.toString ShareCode:shareCode.toString ShareUrl:shareUrl.toString];
        share.delegate = self;
        [vm.view addSubview:share];
    };
    
    context[@"JSVM"][@"goPay"] = ^(JSValue* slv, JSValue* defInt, JSValue* callBack){
        self->payCallBack = callBack;
        UIViewController *vm = navi.topViewController;
        self->pv = [[payView alloc] initWithFrame:vm.view.bounds withRest:slv.toDouble withDefault:(defInt.toInt32/100)];
        self->pv.delegate = self;
        [vm.view addSubview:self->pv];
    };
    
    context[@"JSVM"][@"closePayView"] = ^(){
        if (self->pv != nil) {
            [self->pv removeFromSuperview];
            self->pv = nil;
        }
    };
    
    context[@"JSVM"][@"goiosPay"] = ^(JSValue *sID, JSValue *sMD, JSValue *successCallBack, JSValue *failCallBack){
        __weak typeof(self->iapm) weakIapm = self->iapm;
        __weak typeof(self->pv) weakPv = self->pv;
        [self->iapm addTransactionObserver:^(CallJSType callJSType, NSArray *params) {
            if (callJSType == Success) {
                [weakIapm IAPurchase:sMD.toString sd:sID.toString callJS:^(CallJSType callJSType, NSArray *params) {
                    if (callJSType == Success) {
                        [successCallBack callWithArguments:params];
                    }else{
                        [failCallBack callWithArguments:@[@"支付失败"]];
                    }
                    //关闭蒙版,关闭监听
                    [weakIapm removeTransactionObserver:^(CallJSType callJSType, NSArray *params) {
                        
                    }];
                    [weakPv closeMenView];
                }];
            }
        }];
    };
    
    //注入alert方法
    context[@"alert"] = ^(JSValue *message){
        NSLog(@"%@",message.toString);
    };
    
    PIAjax *piAjax = [[PIAjax alloc] init];
    PITimer *piTimer = [[PITimer alloc] init];
    PIDataBase *piDataBase = [PIDataBase getVMDataBase];
    
    //注入时间函数
    [self timerAddToJSC:context piTimer:piTimer];
    // 注入数据库函数
    [self DataBaseAddToJSC:context piDataBase:piDataBase];
    // 注入HTTP请求函数
    [self HTTPAddToJSC:context piAjax:piAjax];
    
    //注入Boot
    boot = [[JSVMBootManager alloc] initWithContext:context];
    
    context[@"location"][@"href"] = [boot getLocationHref];

    NSString *main = [boot getIndexJS];

    if(main != nil){
        [context evaluateScript:main withSourceURL:[NSURL URLWithString:@"jsvm.js"]];
    }
    ct = context;
    return context;
};

// MARK:HTTP注入
-(void) HTTPAddToJSC:(JSContext *)context piAjax:(PIAjax *)pAjax{
    context[@"JSVM"][@"request"] = ^(JSValue *inputType, JSValue *inputUrl, JSValue *inputHeader, JSValue *inputReqData, JSValue *inputReqType, JSValue *inputRespType, JSValue *success, JSValue *fail, JSValue *progress) {
        URLSessionDataTask *obj = [pAjax request:inputType.toString inputUrl:inputUrl.toString header:inputHeader.toDictionary reqData:inputReqData.toString reqType:inputReqType.toString success:^(NSArray *array) {
            NSData *data = [array firstObject];
            id request = nil;
            if ([inputRespType.toString isEqualToString:@"json"]) {
                NSDictionary *dicJson=[NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
                request = dicJson;
//                NSLog(@"请求成功字典=%@",dicJson);
            }else if ([inputRespType.toString isEqualToString:@"bin"]){
                NSData *base64Data = [data base64EncodedDataWithOptions:0];
                NSString *baseString = [[NSString alloc]initWithData:base64Data encoding:NSUTF8StringEncoding];
                request = baseString;
//                NSLog(@"请求成功base64=%@",baseString);
            }else{
                NSString *jsonStr = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                request = jsonStr;
//                NSLog(@"请求成功字符串=%@",jsonStr);
            }
            [success callWithArgumentsNoNil:@[request]];
        } fail:^(NSArray *array) {
            [fail callWithArgumentsNoNil:@[@"请求失败"]];
        } progress:^(NSArray *array) {
            [progress callWithArgumentsNoNil:array];
        }];
        return obj;
    };
}

//MARK: FMDB注入
- (void)DataBaseAddToJSC:(JSContext *)context piDataBase:(PIDataBase *)pDataBase{
    /// 创建
    context[@"JSVM"][@"store"][@"create"] = ^(JSValue *inputTabName,JSValue *success, JSValue *fail,JSValue *complete) {
        [pDataBase create:inputTabName.toString success:^(NSArray *array) {
            [success callWithArgumentsNoNil:array];
        } fail:^(NSArray *array) {
            [fail callWithArgumentsNoNil:array];
        } complete:^(NSArray *array) {
            [complete callWithArgumentsNoNil:array];
        }];
    };
    
    /// 增加(其实是替换)
    context[@"JSVM"][@"store"][@"write"] = ^(JSValue *inputTabName,JSValue *key,JSValue *data,JSValue *success, JSValue *fail,JSValue *complete) {
        [pDataBase write:inputTabName.toString key:key.toString data:data.toString success:^(NSArray *array) {
            [success callWithArgumentsNoNil:array];
        } fail:^(NSArray *array) {
            NSLog(@"fail write files");
            [fail callWithArgumentsNoNil:array];
        } complete:^(NSArray *array) {
            [complete callWithArgumentsNoNil:array];
        }];
    };
    /// 查询单条
    context[@"JSVM"][@"store"][@"read"] = ^(JSValue *inputTabName,JSValue *key,JSValue *success, JSValue *fail,JSValue *complete) {
        [pDataBase read:inputTabName.toString key:key.toString success:^(NSArray *array) {
            [success callWithArgumentsNoNil:array];
        } fail:^(NSArray *array) {
            [fail callWithArgumentsNoNil:array];
        } complete:^(NSArray *array) {
            [complete callWithArgumentsNoNil:array];
        }];
    };
    
    ///    删除数据
    context[@"JSVM"][@"store"][@"remove"] = ^(JSValue *inputTabName,JSValue *key,JSValue *success, JSValue *fail,JSValue *complete) {
        [pDataBase remove:inputTabName.toString key:key.toString success:^(NSArray *array) {
            [success callWithArgumentsNoNil:array];
        } fail:^(NSArray *array) {
            [fail callWithArgumentsNoNil:array];
        } complete:^(NSArray *array) {
            [complete callWithArgumentsNoNil:array];
        }];
    };
    /// 查询表格所有数据
    context[@"JSVM"][@"store"][@"iterate"] = ^(JSValue *inputTabName,JSValue *success, JSValue *fail,JSValue *complete) {
        [pDataBase iterate:inputTabName.toString success:^(NSArray *array) {
            [success callWithArgumentsNoNil:array];
        } fail:^(NSArray *array) {
            [fail callWithArgumentsNoNil:array];
        } complete:^(NSArray *array) {
            [complete callWithArgumentsNoNil:array];
        }];
    };
    /// 移除表格
    context[@"JSVM"][@"store"][@"delete"] = ^(JSValue *inputTabName,JSValue *success, JSValue *fail,JSValue *complete) {
        [pDataBase deleteTable:inputTabName.toString success:^(NSArray *array) {
            [success callWithArgumentsNoNil:array];
        } fail:^(NSArray *array) {
            [fail callWithArgumentsNoNil:array];
        } complete:^(NSArray *array) {
            [complete callWithArgumentsNoNil:array];
        }];
    };
}

// MARK: 定时器相关注入
-(void) timerAddToJSC:(JSContext *)context piTimer:(PITimer *)pTimer{
    context[@"setTimeout"] = ^(JSValue *func, JSValue *timeout) {
        if (timeout.isNumber) {
            int n = [pTimer setTimeout:^(NSArray *array) {
                [func callWithArgumentsNoNil:@[]];
            } time:timeout.toNumber];
            return n;
        }else {
            return 0;
        }
    };
    context[@"clearTimeout"] = ^(JSValue *timeout) {
        if (timeout.isNumber) {
            [pTimer clearTimeout:timeout.toNumber];
        }
    };
    context[@"setInterval"] = ^(JSValue *func, JSValue *timeout) {
        if (timeout.isNumber) {
            int n = [pTimer setInterval:^(NSArray *array) {
                [func callWithArgumentsNoNil:@[]];
            } time:timeout.toNumber];
            return n;
        }else {
            return 0;
        }
    };
    context[@"clearInterval"] = ^(JSValue*timeout) {
        if (timeout.isNumber) {
            [pTimer clearTimeout:timeout.toNumber];
        }
    };
}

-(void)goShareBack:(UIView *)view{
    if (shareCallBack != nil) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [self->shareCallBack callWithArguments:@[@"fail"]];
            self->shareCallBack = nil;
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
                        [self->shareCallBack callWithArguments:@[@"success"]];
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


- (void)goPay:(NSNumber *)sID sMD:(NSString *)sMD{
    if (payCallBack != nil) {
        [payCallBack callWithArguments:@[@"success",sID,sMD,@"apple_pay"]];
        payCallBack = nil;
    }
}

- (void)goPayBack:(UIView *)view{
    if (payCallBack != nil) {
        [payCallBack callWithArguments:@[@"fail",@0,@"x",@"apple_pay"]];
        payCallBack = nil;
    }
    [view removeFromSuperview];
}

@end
