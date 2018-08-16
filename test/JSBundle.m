//
//  JSBundle.m
//  test
//
//  Created by yineng on 2018/8/9.
//  Copyright © 2018年 kupay. All rights reserved.
//

#import "JSBundle.h"
#import "WebViewController.h"

@interface JSBundle ()

@end

static int identity = 0;

// <int, id>
static NSMutableDictionary *dictionary = nil;

@implementation JSBundle

+ (void)callJS:(NSNumber *)listenerID code:(CallJSType)code params:(NSArray *)params {
    
    NSLog(@"CallJS");
    
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
    WKWebView *webview = [WebViewController getWebView];
    
    // NSLog(@"callJS fullCode = %@", fullCode);
    [webview evaluateJavaScript:fullCode completionHandler:^(id object,NSError *error) {
        if(error != nil) {
            NSLog(@"item = %@, error = %@", object, error);
        }
    }];
}

+ (void)callJSError:(NSString *)arrayClassName funcName:(NSString *)funcName msg:(NSString *)msg {
    
    NSLog(@"CallJSError");
    
    WKWebView *webview = [WebViewController getWebView];
    NSString *code = [NSString stringWithFormat:@"window['handle_Native_ThrowError']('%@','%@','%@')", arrayClassName, funcName, msg];
    // NSLog(@"callJSError code = %@", code);
     [webview evaluateJavaScript:code completionHandler:^(id object,NSError *error) {
        if(error != nil) {
            NSLog(@"item= %@, error= s%@", object, error);
        }
    }];
}

// 收到JS的消息，做分发
+ (void)sendMessage:(NSArray *)params {
    
    NSLog(@"sendMessage: %@", params);
    
    if (dictionary == nil) {
        dictionary = [NSMutableDictionary dictionaryWithCapacity:10];
    }
    
    NSString *className = params[0];
    NSString *funcName = params[1];
    NSNumber *nativeID = params[2];
    
    params = [params subarrayWithRange:NSMakeRange(3, [params count] - 3)];
    
    Class clazz = NSClassFromString(className);
    if (clazz == nil) {
        NSLog(@"JSBundle Error = className");
        return;
    }

    if (nativeID.intValue == 0) {
        if ([funcName isEqualToString:@"init"]) {
            [JSBundle initImpl:clazz params:params];
        } else {
            // 类方法
            NSString *s = [funcName stringByAppendingString:@":"];
            SEL sel = NSSelectorFromString(s);
            if ([clazz respondsToSelector:sel]) {
                [clazz performSelector:sel withObject:params];
            } else {
                [JSBundle callJSError:NSStringFromClass(clazz) funcName:funcName msg:@"class methed funcName not found"];
            }
        }
    } else {
        // close方法
        if ([funcName isEqualToString:@"close"]) {
            [dictionary removeObjectForKey:nativeID];
            return;
        }
        
        // 其他实例方法
        NSObject *object = [dictionary objectForKey:nativeID];
        if (object == nil) {
            NSLog(@"JSBundle Error = object not found");
            return;
        }

        NSString *s = [funcName stringByAppendingString:@":"];
        SEL sel = NSSelectorFromString(s);
        if ([object respondsToSelector:sel]) {
            [object performSelector:sel withObject:params];
        } else {
            [JSBundle callJSError:NSStringFromClass(clazz) funcName:funcName msg:@"object method funcName not found"];
        }
    }
}

// 初始化对象并添加到字典中
+ (void)initImpl: (Class)clazz params: (NSArray*)array {
    id obj = [[clazz alloc] init];
    if (obj == nil) {
        [JSBundle callJSError:NSStringFromClass(clazz) funcName:@"init" msg:@"init failed"];
    }
    
    NSNumber *listenerID = [array objectAtIndex:0];
    if (listenerID == nil) {
        [JSBundle callJSError:NSStringFromClass(clazz) funcName:@"init" msg:@"listenerID not found"];
    }
    
    identity += 1;
    [dictionary setObject:obj forKey:[NSNumber numberWithInt:identity]];
    [JSBundle callJS:listenerID code:0 params:[NSArray arrayWithObjects:[NSNumber numberWithInt:identity],nil]];
}

@end
