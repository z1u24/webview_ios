//
//  ViewController.m
//  test
//
//  Created by yineng on 2018/8/7.
//  Copyright © 2018年 kupay. All rights reserved.
//


#import "WebViewController.h"
#import "JSIntercept.h"
#import "BaseObject.h"
#import "ynWebViewController.h"

#import <AVFoundation/AVFoundation.h>

@interface WebViewController () <WKUIDelegate, WKNavigationDelegate, WKScriptMessageHandler>

@property (nonatomic, strong)YNWebView *ynWebView;
@property (nonatomic, strong)JSIntercept *intercept;
@end

@implementation WebViewController

+ (instancetype)sharedInstence{
    static WebViewController *singleton = nil;
    static dispatch_once_t onceToken;
    // dispatch_once  无论使用多线程还是单线程，都只执行一次
    dispatch_once(&onceToken, ^{
        singleton = [[WebViewController alloc] init];
    });
    return singleton;
}


- (void)viewDidLoad {
    [super viewDidLoad];
    _ynWebView = [[YNWebView alloc] initWithWKWebView:[self createWebview] webName:@"default"];
    _intercept = [[JSIntercept alloc] initWithWebView:[_ynWebView getWKWebView]];
    [BaseObject setVc:self.navigationController];
//    [self addTestButton];
}

//UIButton *mBtnTest;
//
//- (void)addTestButton {
//    mBtnTest = [UIButton buttonWithType:UIButtonTypeRoundedRect]; //绘制形状
//    CGRect frame;
//    frame.size.width = self.view.bounds.size.width;
//    frame.size.height = 50;
//    frame.origin.x = 0;
//    frame.origin.y = self.view.bounds.size.height - 50;
//    [mBtnTest setFrame:frame];
//    mBtnTest.tag = 10;
//    [mBtnTest setTitle:@"点击这个测试" forState:UIControlStateNormal];
//    [mBtnTest addTarget:self action:@selector(btnPressed:) forControlEvents:UIControlEventTouchUpInside];
//    [mBtnTest setBackgroundColor:UIColor.whiteColor];
//    [self.view addSubview:mBtnTest];
//}

//- (void)btnPressed:(id)sender {
//    [[[ShareToPlatforms alloc] init] getScreenShot:@[@125]];
//}

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
    //[config.preferences setValue:@TRUE forKey:@"modernMediaControlsEnabled"];
    [config.preferences setValue:@TRUE forKey:@"mediaDevicesEnabled"];
    //支持文件协议跨域
    [config.preferences setValue:@TRUE forKey:@"allowFileAccessFromFileURLs"];
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
    
    if ([[URL_PATH substringToIndex:1] isEqualToString:@"/"]) {
        NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
        NSString *path = [docPath stringByAppendingString:@"/assets"];
        NSString *fullPath = [path stringByAppendingString:URL_PATH];
        NSFileHandle *file = [NSFileHandle fileHandleForReadingAtPath:fullPath];
        NSData *data = nil;
        if (file != nil) {
            data = [file readDataToEndOfFile];
            [file closeFile];
        }
        if (data == nil) {
            path = [@"assets" stringByAppendingString:URL_PATH];
            fullPath = [[NSBundle mainBundle] pathForResource:path ofType:nil];
            file = [NSFileHandle fileHandleForReadingAtPath:fullPath];
            if (file != nil) {
                NSLog(@"file is read, %@", path);
                data = [file readDataToEndOfFile];
                [file closeFile];
            } else {
                NSLog(@"file isn't found: %@", path);
            }
        }
        path = [@"assets" stringByAppendingString:URL_PATH];
        fullPath = [[NSBundle mainBundle] pathForResource:path ofType:nil];
        NSString *utf = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
        NSString *url = [@"file://" stringByAppendingString:fullPath];
        [webview loadHTMLString:utf baseURL:[NSURL URLWithString:url]];
    }else{
        NSURLRequest *request = [[NSURLRequest alloc] initWithURL:[NSURL URLWithString:URL_PATH]];
        [webview loadRequest:request];
    }
    
    // 关闭webView的拖动
    //webview.scrollView.scrollEnabled = NO;
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
    //NSLog(@"%@ %@",message.name,message.body);
    if ([message.name isEqualToString:@"Native"]) {
        [[_ynWebView getJSBundel] sendMessage:message.body];
    } else if ([message.name isEqualToString:@"JSIntercept"]) {
        NSArray *params = message.body;
        if ([params[0] isEqualToString:@"saveFile"]) {
            [self.intercept saveFile:params[1] content:params[2] listenID:params[3]];
        }else if([params[0] isEqualToString:@"getBootFiles"]){
            [self.intercept getBootFiles:params[1]];
        }else if([params[0] isEqualToString:@"restartApp"]){
            [self.intercept restartApp];
        }
        //[JSIntercept safeFile:params[0] content:params[1] saveID:params[2] webView:[_ynWebView getWKWebView]];
    } else {
        [[_ynWebView getJSBundel] callJSError:@"None" funcName:@"None" msg:@"'Not Native Message Call'"];
    }
}

@end
