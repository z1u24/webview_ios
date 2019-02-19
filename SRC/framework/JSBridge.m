//
//  JSBridge.m
//  WebViewPro
//
//  Created by yineng on 2018/12/12.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import "JSBridge.h"
#import <objc/message.h>
#import <objc/runtime.h>

static int identity = 0;
// <int, id>
static NSMutableDictionary *dictionary = nil;

@implementation JSBridge{
    YNWebView *ynWebView;
}

- (instancetype)initWithYnWebView:(YNWebView *)webView{
    self = [super init];
    if (self) {
        ynWebView = webView;
    }
    return self;
}

- (void)postMessage:(NSArray *)params{
    @synchronized (self) {
        if (dictionary == nil) {
            dictionary = [NSMutableDictionary dictionaryWithCapacity:10];
        }
    }
    //类名
    NSString *className = params[0];
    //方法名
    NSString *funcName = params[1];
    //参数
    NSNumber *nativeID = params[2];
    //listenID
    NSNumber *listenerID = params[3];
    //得到方法执行所需参数
    params = [params subarrayWithRange:NSMakeRange(4, [params count] - 4)];
    //判断是否有该类名
    Class clazz = NSClassFromString(className);
    if (clazz == nil) {
        NSLog(@"JSBridge Error = className");
        return;
    }
    //判断类方法与对象方法
    if (nativeID.intValue == 0) {
        if ([funcName isEqualToString:@"init"]) {
            @synchronized (self) {
                [self initImpl:clazz listenerID:listenerID];
            }
        } else {
            NSLog(@"this is a class method,can't use");
            return;
        }
    } else {
        // close方法
        if ([funcName isEqualToString:@"close"]) {
            [dictionary removeObjectForKey:nativeID];
            return;
        }
        //其他实例方法
        //获取实例对象
        
        //判断方法是否存在，获取完整方法名
        funcName = [self getSelectorNameWithClass:clazz funcName:funcName];
        if ([funcName isEqualToString:@"notFound"]) {
            NSLog(@"JSBridge Error = funcName");
            return;
        }
        
        NSObject *object = [dictionary objectForKey:nativeID];
        if (object == nil) {
            NSLog(@"JSBridge Error = object not found");
            return;
        }
        SEL sel = NSSelectorFromString(funcName);
        if ([object respondsToSelector:sel]) {
            //在执行方法的时候添加callBack
            void (^CallJS)(CallJSType callJSType, NSArray *params) = ^(CallJSType callJSType, NSArray *params){
                __weak JSBridge *weakSelf = self;
                //执行成功
                if (callJSType == Success) {
                    [weakSelf callJS:listenerID code:Success params:params];
                }
                else{
                    [weakSelf callJS:listenerID code:Fail params:params];
                }
            };
            NSMutableArray *mutableParams = [[NSMutableArray alloc] initWithArray:params];
            [mutableParams addObject:CallJS];
            //如果需要获取YNWebView信息的可以在block后面获取
            [mutableParams addObject:ynWebView];
            [object performSelector:sel withObjects:mutableParams];
            return;
        } else {
            [self callJSError:className funcName:funcName msg:@"object method funcName not found"];
            return;
        }
    }
}

- (void)callJS:(NSNumber *)listenerID code:(CallJSType)code params:(NSArray *)params {
    if([listenerID intValue] == 0){
        return;
    }
    NSString *s = [NSString stringWithFormat:@"window['handle_Native_Message'](%@, %d,", listenerID, code];
    NSMutableArray *array = [NSMutableArray arrayWithObjects:s, nil];
    NSInteger count = [params count];
    for (int i = 0 ; i < count; ++i) {
        id obj = [params objectAtIndex:i];
        NSString *str = nil;
        if ([obj isKindOfClass:[NSString class]]) {
            str = [NSString stringWithFormat:@"'%@'", (NSString *)obj];
        } else {
            str = [NSString stringWithFormat:@"%@", obj];
        }
        if (i + 1 < count) {
            str =  [str stringByAppendingString:@", "];
        }
        [array addObject:str];
    }
    [array addObject:@")"];
    NSString *fullCode = [array componentsJoinedByString:@""];
    //NSString *ss = [ynWebView getWkWebViewName];
    [[ynWebView getWKWebView] evaluateJavaScript:fullCode completionHandler:^(id object,NSError *error) {
        if(error != nil) {
            NSLog(@"item = %@, error = %@", object, error);
        }
    }];
}

- (void)callJSError:(NSString *)arrayClassName funcName:(NSString *)funcName msg:(NSString *)msg {
    NSString *code = [NSString stringWithFormat:@"window['handle_Native_ThrowError']('%@','%@','%@')", arrayClassName, funcName, msg];
    // NSLog(@"callJSError code = %@", code);
    [[ynWebView getWKWebView] evaluateJavaScript:code completionHandler:^(id object,NSError *error) {
        if(error != nil) {
            NSLog(@"item= %@, error= s%@", object, error);
        }
    }];
}

//判断类中是否有该方法
- (NSString *)getSelectorNameWithClass:(Class)clazz funcName:(NSString *)funcName{
    unsigned int num;
    Method *mothod = class_copyMethodList([clazz class], &num);
    for (int i = 0; i < num ; i++) {
        Method meth = mothod[i];
        SEL sel = method_getName(meth);
        const char *name = sel_getName(sel);
        NSString *selName = [NSString stringWithUTF8String:name];
        if ([selName hasPrefix:funcName]) {
            return selName;
        }
    }
    return @"notFound";
}

// 初始化对象并添加到字典中
- (void)initImpl: (Class)clazz listenerID: (NSNumber *)listenerID {
    id obj = [[clazz alloc] init];
    if (obj == nil) {
        [self callJSError:NSStringFromClass(clazz) funcName:@"init" msg:@"init failed"];
        return;
    }
    if (listenerID == nil) {
        [self callJSError:NSStringFromClass(clazz) funcName:@"init" msg:@"listenerID not found"];
        return;
    }
    identity += 1;
    [dictionary setObject:obj forKey:[NSNumber numberWithInt:identity]];
    [self callJS:listenerID code:Success params:[NSArray arrayWithObjects:[NSNumber numberWithInt:identity],nil]];
}

@end
