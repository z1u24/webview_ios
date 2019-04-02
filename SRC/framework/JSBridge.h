//
//  JSBridge.h
//  WebViewPro
//
//  Created by yineng on 2018/12/12.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>
#import "NSObject+extend.h"
#import "YNWebView.h"

//MARK: callJS的状态
typedef enum {
    Error = -1,
    Success  = 0,
    Fail = 1,
    Callback = 2
    
} CallJSType;

typedef void (^CallJS)(CallJSType callJSType, NSArray *params);

NS_ASSUME_NONNULL_BEGIN

@interface JSBridge : NSObject
//初始化桥接器
- (instancetype)initWithYnWebView:(YNWebView *)webView;
//接收高层调用事件
- (void)postMessage:(NSArray *)params;
//主动上抛事件
- (void)sendJS:(NSString *)type name:(NSString *)name params:(NSArray *)params;
@end

NS_ASSUME_NONNULL_END
