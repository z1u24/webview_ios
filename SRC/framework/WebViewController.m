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

@interface WebViewController () <WKUIDelegate, WKNavigationDelegate, WKScriptMessageHandler>

@property (nonatomic, strong)NSTimer *timer;
@property (nonatomic, strong)YNWebView *ynWebView;
@property (nonatomic, strong)JSIntercept *intercept;

@end

@implementation WebViewController

WKWebView *h5WebView = nil;

+ (instancetype)sharedInstence{
    static WebViewController *singleton = nil;
    static dispatch_once_t onceToken;
    // dispatch_once  无论使用多线程还是单线程，都只执行一次
    dispatch_once(&onceToken, ^{
        singleton = [[WebViewController alloc] init];
    });
    return singleton;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _ynWebView = [[YNWebView alloc] initWithWKWebView:[self createWebview] webName:@"default"];
        _intercept = [[JSIntercept alloc] initWithWebView:[_ynWebView getWKWebView]];
    }
    return self;
}

- (void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    if (!self.timer) {
        [self.timer invalidate];
        self.timer = nil;
    }
}

- (void)viewWillDisappear:(BOOL)animated{
    [super viewWillDisappear:animated];
    self.timer = [NSTimer scheduledTimerWithTimeInterval:0.2 target:self selector:@selector(keepWKWebViewActive:) userInfo:nil repeats:YES];
}

- (void)viewDidLoad {
    [super viewDidLoad];
}

- (void)keepWKWebViewActive:(NSTimer*) timer{
    NSLog(@"1");
    [[_ynWebView getWKWebView] evaluateJavaScript:@"1+1" completionHandler:^(id object,NSError *error) {
        
    }];
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
    //[config.preferences setValue:@TRUE forKey:@"modernMediaControlsEnabled"];
    //该方法使浏览器支持播放aac音频，但只在ios11以上版本可以使用
    //ios10及以下版本，只支持播放mp3格式

    //[config.preferences setValue:@TRUE forKey:@"mediaDevicesEnabled"];
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
    NSString *str = [URL_PATH substringToIndex:1];
    if ([str isEqualToString:@"/"]) {
        NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
        NSLog(@"%@",docPath);
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
        NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:[NSURL URLWithString:URL_PATH]];
        [webview loadRequest:request];
    }
    
    webview.UIDelegate = self;
    webview.navigationDelegate = self;
    return webview;
}

//支付请求拦截
- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler{
    NSString *urlStr = navigationAction.request.URL.absoluteString;
    if ([urlStr containsString:@"alipay://"] || [urlStr containsString:@"alipays://"]  || [urlStr containsString:@"weixin://"] ) {
        NSMutableString *newUrlStr = [[NSMutableString alloc]initWithString:urlStr];
        if([urlStr containsString:@"fromAppUrlScheme"] || [urlStr containsString:@"alipays"] ){
            NSRange range = [newUrlStr rangeOfString:@"alipays"];
            [newUrlStr replaceCharactersInRange:range withString:@"app.herominer.net"];
        }
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:newUrlStr]];
        decisionHandler(WKNavigationActionPolicyCancel);
        return;
    }
    else if ([urlStr containsString:@"https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?"] && ![urlStr containsString:@"redirect_url"] ){
        NSString *newURLStr = [urlStr stringByAppendingString:@"&redirect_url=app.herominer.net://"];
        NSMutableURLRequest *newRequest = [[NSMutableURLRequest alloc] initWithURL:[NSURL URLWithString:newURLStr]];
        newRequest.allHTTPHeaderFields = navigationAction.request.allHTTPHeaderFields;
        //TODO: 对newURLStr追加或修改参数redirect_url=URLEncode(A.company.com://)
        [newRequest setValue:@"app.herominer.net" forHTTPHeaderField:@"Referer"];
        h5WebView = [[WKWebView alloc] initWithFrame:CGRectMake(0, 0, 1, 1)];
        [self.view addSubview:h5WebView];
        [h5WebView loadRequest:newRequest];
        h5WebView.UIDelegate = self;
        h5WebView.navigationDelegate = self;
        //[[UIApplication sharedApplication] openURL:newRequest.URL];
        decisionHandler(WKNavigationActionPolicyCancel);
    }else if([urlStr isEqualToString:@"app.herominer.net://"]){
        [h5WebView removeFromSuperview];
        h5WebView = nil;
        decisionHandler(WKNavigationActionPolicyCancel);
    }
    else{
        decisionHandler(WKNavigationActionPolicyAllow);
    }
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
    NSLog(@"%@ %@",message.name,message.body);
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
