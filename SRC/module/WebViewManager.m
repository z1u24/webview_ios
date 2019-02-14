//
//  YNWebViewManager.m
//  WebViewPro
//
//  Created by yineng on 2018/11/29.
//  Copyright © 2018 kuplay. All rights reserved.
//
#define KISIphoneX (CGSizeEqualToSize(CGSizeMake(375.f, 812.f), [UIScreen mainScreen].bounds.size) || CGSizeEqualToSize(CGSizeMake(812.f, 375.f), [UIScreen mainScreen].bounds.size))
#import "WebViewManager.h"
#import "WebViewController.h"

static NSMutableDictionary *webControlDic = nil;

@interface WebViewManager () <WKUIDelegate, WKNavigationDelegate>

@end

@implementation WebViewManager{
    WKWebView *payWebView;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        if (webControlDic == nil) {
            webControlDic = [[NSMutableDictionary alloc] initWithCapacity:0];
        }
    }
    return self;
}


- (void)openWebView:(NSString *)webName url:(NSString *)url title:(NSString *)title injectContent:(NSString *)injectContent callJS:(CallJS)callJS{
    if ([YNWebView getIfWebViewWithWebName:webName]) {
        callJS(Fail,@[@"The WebView Is Already Build"]);
    }else{
        ynWebViewController *webViewController = [[ynWebViewController alloc] initWithWebViewName:webName url:url title:title injectContent:injectContent];
        [webControlDic setObject:webViewController forKey:webName];
        [[BaseObject getVc] pushViewController:webViewController animated:YES];
        callJS(Success,@[@""]);
    }
}

- (void)closeWebView:(NSString *)webName callJS:(CallJS)callJS{
    //如果窗口名称为default，或者是不在hash表中时，抛出异常
    //关闭窗口时，判断窗口是否为当前窗口，如果是当前窗口就直接nav中pop到上级页面，如果不是当前窗口，如果窗口在nav中，则移除
    if ([webName isEqualToString:@"default"] || ![YNWebView getIfWebViewWithWebName:webName]) {
        callJS(Fail,@[@"Can Not Find The WebView"]);
    }else{
        if([webControlDic objectForKey:webName] == [[BaseObject getVc] topViewController]){
            [[BaseObject getVc] popViewControllerAnimated:YES];
            [YNWebView removeWebViewWithWebName:webName];
            [WebViewManager removeViewControllerWithWebName:webName];
            callJS(Success,@[@""]);
        }else{
            //获取需要删除的viewController
            //获取当前navigation控制器数组
            NSMutableArray *navArray = [[NSMutableArray alloc] initWithArray:[BaseObject getVc].viewControllers];
            for (UIViewController *viewController in navArray) {
                if (viewController == [webControlDic objectForKey:webName]) {
                    [navArray removeObject:viewController];
                    break;
                }
            }
            [BaseObject getVc].viewControllers = navArray;
            [webControlDic removeObjectForKey:webName];
            [YNWebView removeWebViewWithWebName:webName];
            callJS(Success,@[@""]);
        }
    }
    
}



- (void)postWebViewMessage:(NSString *)webName message:(NSString *)message callJS:(CallJS)callJS ynwebView:(YNWebView *)ynwebView{
    WebViewController *wb = [WebViewController sharedInstence];
    if ([webName isEqualToString:@"default"]) {
        [wb startTimer];
    }else{
        [wb stopTimer];
    }
    if ([YNWebView getIfWebViewWithWebName:webName]) {
        NSString *fullCode = [NSString stringWithFormat:@"window['onWebViewPostMessage']('%@', '%@')",[ynwebView getWkWebViewName],message];
        [[[YNWebView getYNWebViewInWebName:webName] getWKWebView] evaluateJavaScript:fullCode completionHandler:^(id object,NSError *error) {
            if(error != nil) {
                NSLog(@"item = %@, error = %@", object, error);
            }
        }];
        callJS(Success,@[@""]);
    }else{
        callJS(Fail,@[@"can not find webView"]);
    }
}


//删除ViewController
+ (void)removeViewControllerWithWebName:(NSString *)webName{
    [webControlDic removeObjectForKey:webName];
}

- (void)newView:(NSString *)webName url:(NSString *)url headers:(NSString *)headers callJS:(CallJS)callJS ynWeb:(YNWebView *)ynWeb{
    
    NSData *jsonData = [headers dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *head = [NSJSONSerialization JSONObjectWithData:jsonData options:0 error:nil];
    if ([url containsString:@"https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?"] && ![url containsString:@"redirect_url"]){
        NSString *scheme = [head objectForKey:@"Referer"];
        if (scheme != nil) {
            scheme = [NSString stringWithFormat:@"&redirect_url=%@://",scheme];
            url = [url stringByAppendingString:scheme];
        }
        
    }
    NSMutableURLRequest *newRequest = [[NSMutableURLRequest alloc] initWithURL:[NSURL URLWithString:url]];
    if (head != nil) {
        for (NSString *key in [head allKeys]) {
            [newRequest setValue:[head objectForKey:key] forHTTPHeaderField:key];
        }
    }
    payWebView = [[WKWebView alloc] init];
    [[ynWeb getViewController].view addSubview:payWebView];
    [payWebView loadRequest:newRequest];
    payWebView.UIDelegate = self;
    payWebView.navigationDelegate = self;
    callJS(Success,@[@"打开成功"]);
}

- (void)freeView:(NSString *)webName callJS:(CallJS)callJS ynWeb:(YNWebView *)ynWeb{
    [payWebView removeFromSuperview];
    payWebView = nil;
    callJS(Success,@[@"移除成功"]);
}

//状态栏适配
- (void)getScreenModify:(CallJS)callJS{
    if (KISIphoneX) {
        callJS(Success,@[@88,@68]);
    }else{
        callJS(Success,@[@40,@0]);
    }
    
}


- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler{
    NSString *urlStr = navigationAction.request.URL.absoluteString;
    if ([urlStr containsString:@"weixin://"]) {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:urlStr]];
        decisionHandler(WKNavigationActionPolicyCancel);
        return;
    }else{
        decisionHandler(WKNavigationActionPolicyAllow);
    }
}




@end
