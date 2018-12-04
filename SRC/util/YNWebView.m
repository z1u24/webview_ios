
//
//  YNWebView.m
//  WebViewPro
//
//  Created by yineng on 2018/11/29.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import "YNWebView.h"


static NSMutableDictionary *webViewDic = nil;

@implementation YNWebView

- (instancetype)initWithWKWebView:(WKWebView *)wkwebView webName:(NSString *)webName
{
    self = [super init];
    if (self) {
        if (webViewDic == nil) {
            webViewDic = [[NSMutableDictionary alloc] initWithCapacity:0];
        }
        [self setWKWebView:wkwebView webName:webName];
    }
    return self;
}

- (void)setWKWebView:(WKWebView *)wkwebView webName:(NSString *)webName{
    self.webView = wkwebView;
    self.webName = webName;
    [self setJSBundel];
    [webViewDic setObject:self forKey:webName];
}

- (void)setJSBundel{
    self.bundle = [[JSBundle alloc] initWithWebView:_webView webName:_webName];
}


- (WKWebView *)getWKWebView{
    return _webView;
}

+ (BOOL)getIfWebViewWithWebName:(NSString *)webName{
    NSArray *keys = [webViewDic allKeys];
    return [keys containsObject:webName];
}

- (JSBundle *)getJSBundel{
    return _bundle;
}

+ (void)removeWebViewWithWebName:(NSString *)webName{
    [webViewDic removeObjectForKey:webName];
}


+ (YNWebView *)getYNWebViewInWebName:(NSString *)webName{
    return [webViewDic objectForKey:webName];
}

@end
