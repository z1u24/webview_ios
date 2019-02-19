
//
//  YNWebView.m
//  WebViewPro
//
//  Created by yineng on 2018/11/29.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import "YNWebView.h"


static NSMutableDictionary *webViewDic = nil;

@implementation YNWebView{
    NSString *selwebName;
    UIViewController *vc;
    WKWebView *webView;
}

- (instancetype)initWithWKWebView:(WKWebView *)wkwebView webName:(NSString *)webName webViewController:(UIViewController *)webViewController{
    self = [super init];
    if (self) {
        if (webViewDic == nil) {
            webViewDic = [[NSMutableDictionary alloc] initWithCapacity:0];
        }
        vc = webViewController;
        [self setWKWebView:wkwebView webName:webName];
    }
    return self;
}

- (void)setWKWebView:(WKWebView *)wkwebView webName:(NSString *)webName{
    webView = wkwebView;
    selwebName = webName;
    [webViewDic setObject:self forKey:selwebName];
}

+ (BOOL)getIfWebViewWithWebName:(NSString *)webName{
    NSArray *keys = [webViewDic allKeys];
    return [keys containsObject:webName];
}

+ (void)removeWebViewWithWebName:(NSString *)webName{
    [webViewDic removeObjectForKey:webName];
}


+ (YNWebView *)getYNWebViewInWebName:(NSString *)webName{
    return [webViewDic objectForKey:webName];
}


- (WKWebView *)getWKWebView{
    return webView;
}

- (NSString *)getWkWebViewName{
    return selwebName;
}

-(UIViewController *)getViewController{
    return vc;
}

@end
