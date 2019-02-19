//
//  WebViewManager
//  WebViewPro
//
//  Created by yineng on 2018/11/29.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "YNWebView.h"
#import "ynWebViewController.h"
#import "BaseObject.h"
#import <WebKit/WebKit.h>

NS_ASSUME_NONNULL_BEGIN

typedef void (^CallJS)(CallJSType callJSType, NSArray *params);

@interface WebViewManager : BaseObject

/*
    创建一个新的webView并打开
*/
- (void)openWebView:(NSString *)webName url:(NSString *)url title:(NSString *)title injectContent:(NSString *)injectContent callJS:(CallJS)callJS;

/*
    关闭一个WebView并remove掉
*/
- (void)closeWebView:(NSString *)webName callJS:(CallJS)callJS;

/*
    向webView发送消息
*/
- (void)postWebViewMessage:(NSString *)webName message:(NSString *)message callJS:(CallJS)callJS ynwebView:(YNWebView *)ynwebView;



//删除ViewController
+ (void)removeViewControllerWithWebName:(NSString *)webName;

//微信支付接口
- (void)newView:(NSString *)webName url:(NSString *)url headers:(NSString *)headers callJS:(CallJS)callJS ynWeb:(YNWebView *)ynWeb;

- (void)freeView:(NSString *)webName callJS:(CallJS)callJS ynWeb:(YNWebView *)ynWeb;


- (void)getScreenModify:(CallJS)callJS;



@end

NS_ASSUME_NONNULL_END
