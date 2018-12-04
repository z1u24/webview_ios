//
//  WebViewManager
//  WebViewPro
//
//  Created by yineng on 2018/11/29.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BaseObject.h"
#import <WebKit/WebKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface WebViewManager : BaseObject

/*
    创建一个新的webView并打开
*/
- (void)openWebView:(NSArray *)array;

/*
    关闭一个WebView并remove掉
*/
- (void)closeWebView:(NSArray *)array;

/*
    向webView发送消息
*/
- (void)postWebViewMessage:(NSArray *)array;

//删除ViewController
+ (void)removeViewControllerWithWebName:(NSString *)webName;

@end

NS_ASSUME_NONNULL_END
