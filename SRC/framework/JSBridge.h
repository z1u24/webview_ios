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
    Success  = 0,
    Fail = 1,
    Callback = 100
} CallJSType;

typedef void (^CallJS)(CallJSType callJSType, NSArray *params);

NS_ASSUME_NONNULL_BEGIN

@interface JSBridge : NSObject

- (instancetype)initWithYnWebView:(YNWebView *)webView;
- (void)postMessage:(NSArray *)params;

@end

NS_ASSUME_NONNULL_END
