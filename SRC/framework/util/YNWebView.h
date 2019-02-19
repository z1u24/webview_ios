//
//  YNWebView.h
//  WebViewPro
//
//  Created by yineng on 2018/11/29.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>
NS_ASSUME_NONNULL_BEGIN

@interface YNWebView : NSObject

+ (BOOL)getIfWebViewWithWebName:(NSString *)webName;
+ (void)removeWebViewWithWebName:(NSString *)webName;
+ (YNWebView *)getYNWebViewInWebName:(NSString *)webName;


- (instancetype)initWithWKWebView:(WKWebView *)wkwebView webName:(NSString *)webName webViewController:(UIViewController *)webViewController;
- (NSString *)getWkWebViewName;
- (WKWebView *)getWKWebView;
- (UIViewController *)getViewController;


@end

NS_ASSUME_NONNULL_END
