//
//  ynWebViewController.m
//  WebViewPro
//
//  Created by yineng on 2018/11/30.
//  Copyright © 2018 kuplay. All rights reserved.
//
#define KISIphoneX (CGSizeEqualToSize(CGSizeMake(375.f, 812.f), [UIScreen mainScreen].bounds.size) || CGSizeEqualToSize(CGSizeMake(812.f, 375.f), [UIScreen mainScreen].bounds.size))
#import "ynWebViewController.h"
#import "JSIntercept.h"
#import "JSBridge.h"



@interface ynWebViewController ()<WKUIDelegate, WKNavigationDelegate, WKScriptMessageHandler,BackButtonHandlerProtocol>
@property (nonatomic, strong)NSTimer *timer;
@end

@implementation ynWebViewController

NSString *webViewName;
YNWebView *ynWebView;
NSString *webtitle;
NSString *url;
NSString *injectContent;
JSIntercept *intercept;
JSBridge *bridge;

+ (instancetype)sharedInstenceWithWebViewName:(NSString *)webviewName url:(NSString *)Url title:(NSString *)webTitle injectContent:(NSString *)injectcontent{
    static ynWebViewController *singleton = nil;
    static dispatch_once_t onceToken;
    // dispatch_once  无论使用多线程还是单线程，都只执行一次
    dispatch_once(&onceToken, ^{
        singleton = [[ynWebViewController alloc] initWithWebViewName:webviewName url:Url title:webTitle injectContent:injectcontent];
    });
    return singleton;
}


- (instancetype)initWithWebViewName:(NSString *)webviewName url:(NSString *)Url title:(NSString *)webTitle injectContent:(NSString *)injectcontent
{
    self = [super init];
    if (self) {
        self.view.backgroundColor = UIColor.whiteColor;
        webViewName = webviewName;
        webtitle = webTitle;
        url = Url;
        injectContent = injectcontent;
        [self initWeb];
    }
    return self;
}

-(void)initWeb{
    WKWebView *webView = [self createWebviewWithInjectContent:injectContent];
    ynWebView = [[YNWebView alloc] initWithWKWebView:webView webName:webViewName webViewController:self];
    bridge = [[JSBridge alloc] initWithYnWebView:ynWebView];
    intercept = [[JSIntercept alloc] initWithWebView:[ynWebView getWKWebView] update:0];
}

- (WKWebView *)createWebviewWithInjectContent:(NSString *)injectContent {
    
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
    //注入js代码 WKUserScriptInjectionTimeAtDocumentStart---在webView运行之前注入
    WKUserScript *script = [[WKUserScript alloc] initWithSource:injectContent injectionTime:WKUserScriptInjectionTimeAtDocumentStart forMainFrameOnly:NO];
    [config.userContentController addUserScript:script];
    WKWebView *webview = [[WKWebView alloc] initWithFrame:self.view.bounds configuration:config];
//    webview.scrollView.    // 确定宽、高、X、Y坐标
    if (KISIphoneX) {
        [webview setFrame:CGRectMake(0, 44, self.view.bounds.size.width, self.view.bounds.size.height-44)];
    }else{
        [webview setFrame:CGRectMake(0, 20, self.view.bounds.size.width, self.view.bounds.size.height-20)];
    }
//    [webview setFrame:CGRectMake(0, 0, self.view.bounds.size.width, self.view.bounds.size.height)];
    [self.view addSubview:webview];
    NSURLRequest *request = [[NSURLRequest alloc] initWithURL:[NSURL URLWithString:url]];
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
//    NSLog(@"%@ %@",message.name,message.body);
    if ([message.name isEqualToString:@"Native"]) {
        [bridge postMessage:message.body];
    } else if ([message.name isEqualToString:@"JSIntercept"]) {
        NSArray *params = message.body;
        if ([params[0] isEqualToString:@"saveFile"]) {
            [intercept saveFile:params[1] content:params[2] listenID:params[3]];
        }else if([params[0] isEqualToString:@"getBootFiles"]){
            [intercept getBootFiles:params[1]];
        }else if([params[0] isEqualToString:@"restartApp"]){
            [intercept restartApp];
        }else if([params[0] isEqualToString:@"getAppVersion"]){
            [intercept getAppVersion:params[1]];
        }else if([params[0] isEqualToString:@"updateApp"]){
            [intercept updateApp:params[1]];
        }
        //[JSIntercept safeFile:params[0] content:params[1] saveID:params[2] webView:[ynWebView getWKWebView]];
    } else {
        
    }
}


- (void)viewWillAppear:(BOOL)animated{
    [bridge sendJS:@"PI_Activity" name:@"onResumed" params:@[@"页面进入前台"]];
}

- (void)viewWillDisappear:(BOOL)animated{
    [bridge sendJS:@"PI_App" name:@"onBackPressed" params:@[@"页面进入后台"]];
}

- (void)removeScriptMessageHandle{
    [[ynWebView getWKWebView].configuration.userContentController removeScriptMessageHandlerForName:@"Native"];
    [[ynWebView getWKWebView].configuration.userContentController removeScriptMessageHandlerForName:@"JSIntercept"];
}


//回退页面时注销webView
- (BOOL)navigationShouldPopOnBackButton{
    return NO;
}



@end
