//
//  ViewController.m
//  test
//
//  Created by yineng on 2018/8/7.
//  Copyright © 2018年 kupay. All rights reserved.
//

#import "JSBundle.h"
#import "WebViewController.h"

@interface WebViewController () <WKUIDelegate, WKNavigationDelegate, WKScriptMessageHandler>

@end

@implementation WebViewController

static WKWebView *wkWebView = nil;

+ (WKWebView *)getWebView {
    return wkWebView;
}

- (void)viewDidLoad {
    
    [super viewDidLoad];
    
    wkWebView = [self createWebview];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreate©∫ƒd.
}

- (WKWebView *)createWebview {
    
    WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
    
    config.preferences = [WKPreferences new];
    
    // 默认为0
    // 设置minimumFontSize后，ios10+的line-height值不对，会导致页面错位
    // config.preferences.minimumFontSize = 45
    
    // 默认认为YES
    config.preferences.javaScriptEnabled = YES;
    // 在iOS上默认为NO，表示不能自动通过窗口打开
    config.preferences.javaScriptCanOpenWindowsAutomatically = NO;
    
    // 创建UserContentController（提供JavaScript向webView发送消息的方法）
    config.userContentController = [[WKUserContentController alloc] init];
    // 添加消息处理，注意：self指代的对象需要遵守WKScriptMessageHandler协议，结束时需要移除
    [config.userContentController addScriptMessageHandler:self name: @"Native"];

    WKWebView *webview = [[WKWebView alloc]initWithFrame:self.view.bounds configuration:config];
    
    // 获取默认User-Agent
    [webview evaluateJavaScript:@"navigator.userAgent" completionHandler:^(id result, NSError *error) {
        webview.customUserAgent = [result stringByAppendingString:@" YINENG_IOS/1.0"];
    }];
    
    [self.view addSubview:webview];
    
    NSString *urlPath = @"https://www.baidu.com";
    // NSString *urlPath = @"http://192.168.33.88:8088/dst/boot/index.html";
    // NSString *urlPath = [NSString stringWithFormat:@"file:///%@/android_asset/index.html", [[NSBundle mainBundle] bundlePath]];
    NSURLRequest *request = [[NSURLRequest alloc]initWithURL:[NSURL URLWithString:urlPath]];
    [webview loadRequest:request];
    // 关闭webView的拖动
    webview.scrollView.scrollEnabled = NO;
    webview.UIDelegate = self;
    webview.navigationDelegate = self;
    
    return webview;
}

- (void)webView:(WKWebView *)webView runJavaScriptAlertPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(void))completionHandler
{
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:message message:@"" preferredStyle:UIAlertControllerStyleAlert];
    
    UIAlertAction *okAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        completionHandler();
    }];
    
    [alert addAction:okAction];
    [self presentViewController:alert animated:YES completion:nil];
}

// 消息分发
- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message
{
    // 判断是否是调用原生的
    if ([message.name isEqualToString:@"Native"]) {
        [JSBundle sendMessage:message.body];
    } else {
        [JSBundle callJSError:@"None" funcName:@"None" msg:@"'Not Native Message Call'"];
    }
}

@end
