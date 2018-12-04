//
//  YNWebView.h
//  WebViewPro
//
//  Created by yineng on 2018/11/29.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "JSBundle.h"

NS_ASSUME_NONNULL_BEGIN

@interface YNWebView : NSObject

@property (nonatomic, strong)NSString *webName;
@property (nonatomic, strong)WKWebView *webView;
@property (nonatomic, strong)JSBundle *bundle;

- (instancetype)initWithWKWebView:(WKWebView *)wkwebView webName:(NSString *)webName;
+ (BOOL)getIfWebViewWithWebName:(NSString *)webName;
+ (void)removeWebViewWithWebName:(NSString *)webName;
+ (YNWebView *)getYNWebViewInWebName:(NSString *)webName;
- (WKWebView *)getWKWebView;
- (JSBundle *)getJSBundel;



@end

NS_ASSUME_NONNULL_END
