//
//  ViewController.m
//  test
//
//  Created by yineng on 2018/8/7.
//  Copyright © 2018年 kupay. All rights reserved.
//

#import "JSBundle.h"
#import "WebViewController.h"
#import "BaseObject.h"
#import "JSIntercept.h"
#import "ShareToPlatforms.h"

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
    [BaseObject setVc:self];
//    [self addTestButton];
}

UIButton *mBtnTest;

- (void)addTestButton {
    mBtnTest = [UIButton buttonWithType:UIButtonTypeRoundedRect]; //绘制形状
    CGRect frame;
    frame.size.width = self.view.bounds.size.width;
    frame.size.height = 50;
    frame.origin.x = 0;
    frame.origin.y = self.view.bounds.size.height - 50;
    [mBtnTest setFrame:frame];
    mBtnTest.tag = 10;
    [mBtnTest setTitle:@"点击这个测试" forState:UIControlStateNormal];
    [mBtnTest addTarget:self action:@selector(btnPressed:) forControlEvents:UIControlEventTouchUpInside];
    [mBtnTest setBackgroundColor:UIColor.whiteColor];
    [self.view addSubview:mBtnTest];
}

- (void)btnPressed:(id)sender {
    [[[ShareToPlatforms alloc] init] getScreenShot:@[@125]];
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
    [config.userContentController addScriptMessageHandler:self name:@"Native"];
    [config.userContentController addScriptMessageHandler:self name:@"JSIntercept"];
    WKWebView *webview = [[WKWebView alloc] initWithFrame:self.view.bounds configuration:config];
    // 获取默认User-Agent
//    [webview evaluateJavaScript:@"navigator.userAgent" completionHandler:^(id result, NSError *error) {
//        webview.customUserAgent = [result stringByAppendingString:@" YINENG_IOS/1.0"];
//    }];
    // 确定宽、高、X、Y坐标
    [webview setFrame:CGRectMake(0, -20, self.view.bounds.size.width, self.view.bounds.size.height + 20)];
    [self.view addSubview:webview];
    NSURLRequest *request = [[NSURLRequest alloc] initWithURL:[NSURL URLWithString:URL_PATH]];
    [webview loadRequest:request];
    // 关闭webView的拖动
//    webview.scrollView.scrollEnabled = NO;
    webview.UIDelegate = self;
    webview.navigationDelegate = self;
    return webview;
}

- (void)webView:(WKWebView *)webView runJavaScriptAlertPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(void))completionHandler {
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:message message:@"" preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *okAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction *_Nonnull action) {
        completionHandler();
    }];
    [alert addAction:okAction];
    [self presentViewController:alert animated:YES completion:nil];
}

- (void)webView:(WKWebView *)webView runJavaScriptConfirmPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(BOOL))completionHandler {
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:message message:@"" preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *okAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction *_Nonnull action) {
        completionHandler(YES);
    }];
    UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"Cancel" style:UIAlertActionStyleDefault handler:^(UIAlertAction *_Nonnull action) {
        completionHandler(NO);
    }];
    [alert addAction:okAction];
    [alert addAction:cancelAction];
    [self presentViewController:alert animated:YES completion:nil];
}

// 消息分发
- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
    // 判断是否是调用原生的
    if ([message.name isEqualToString:@"Native"]) {
        [JSBundle sendMessage:message.body];
    } else if ([message.name isEqualToString:@"JSIntercept"]) {
        NSArray *params = message.body;
        [JSIntercept safeFile:params[0] content:params[1] saveID:params[2]];
    } else {
        [JSBundle callJSError:@"None" funcName:@"None" msg:@"'Not Native Message Call'"];
    }
}

@end
