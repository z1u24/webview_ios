//
//  ViewController.m
//  test
//
//  Created by yineng on 2018/8/7.
//  Copyright © 2018年 kupay. All rights reserved.
//

#define KISIphoneX (CGSizeEqualToSize(CGSizeMake(375.f, 812.f), [UIScreen mainScreen].bounds.size) || CGSizeEqualToSize(CGSizeMake(812.f, 375.f), [UIScreen mainScreen].bounds.size))
#import "WebViewController.h"
#import "JSIntercept.h"
#import "BaseObject.h"

@interface WebViewController () <WKUIDelegate, WKNavigationDelegate, WKScriptMessageHandler>

@property (nonatomic, strong)NSTimer *timer;
@property (nonatomic, strong)YNWebView *ynWebView;
@property (nonatomic, strong)JSIntercept *intercept;
@property (nonatomic, strong)JSBridge *bridge;
@property (nonatomic, strong)NSNumber *isUpdate;
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

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.isUpdate = [NSNumber numberWithInt:0];
        WKWebView *wbView = [self createWebview];
        _ynWebView = [[YNWebView alloc] initWithWKWebView:wbView webName:@"default" webViewController:self];
        _bridge = [[JSBridge alloc] initWithYnWebView:_ynWebView];
        _intercept = [[JSIntercept alloc] initWithWebView:wbView update:self.isUpdate];
    }
    return self;
}

- (void)startTimer{
    self.timer = [NSTimer scheduledTimerWithTimeInterval:0.5 target:self selector:@selector(keepWKWebViewActive:) userInfo:nil repeats:YES];
}

- (void)stopTimer{
    if (self.timer) {
        [self.timer invalidate];
        self.timer = nil;
    }
}

- (void)viewWillAppear:(BOOL)animated{
    [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
    [super viewWillAppear:animated];
    
    if (self.timer) {
        [self.timer invalidate];
        self.timer = nil;
    }
    self.view.backgroundColor = UIColor.whiteColor;
}

- (void)viewWillDisappear:(BOOL)animated{
    [super viewWillDisappear:animated];
    
}

- (void)viewDidLoad {
    [super viewDidLoad];
}


- (void)keepWKWebViewActive:(NSTimer*) timer{
    if ([[[BaseObject getVc] topViewController] isKindOfClass:[WebViewController class]]) {
        if (timer) {
            [timer invalidate];
            timer = nil;
            return;
        }else{
            return;
        }
    }
    if([[self.ynWebView getWKWebView] isLoading]){
        return;
    }
    [[self.ynWebView getWKWebView] evaluateJavaScript:@"1+1" completionHandler:^(id object,NSError *error) {
        
    }];
}



- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreate©∫ƒd.
}

+ (NSString *)getURLFromInfo{
    NSString *bundlePath = [[NSBundle mainBundle] pathForResource:@"Info" ofType:@"plist"];
    NSMutableDictionary *infoDict = [NSMutableDictionary dictionaryWithContentsOfFile:bundlePath];
    NSString *version = [infoDict objectForKey:@"URL_PATH"];
    return version;
}

- (WKWebView *)createWebview {
    
    NSString *URL_PATH = [WebViewController getURLFromInfo];
    
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
    if(KISIphoneX){
        [webview setFrame:CGRectMake(0, -44, self.view.bounds.size.width, self.view.bounds.size.height+10)];
    }else{
        [webview setFrame:CGRectMake(0, -20, self.view.bounds.size.width, self.view.bounds.size.height+20)];
    }
    
    [self.view addSubview:webview];
    [self.view sendSubviewToBack:webview];
    
    //获取app版本号
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSString *app_Version = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
    //获取底层版本号
    NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    NSString *apkPath = [docPath stringByAppendingString:@"/apkback"];
    NSString *appversionPath = [apkPath stringByAppendingString:@"/appversion.txt"];
    NSFileManager *manager = [NSFileManager defaultManager];
    BOOL isDirectory = YES;
    //判断文件夹是否存在  不存在就创建
    BOOL apkPathExist = [manager fileExistsAtPath:apkPath isDirectory:&isDirectory];
    if (!apkPathExist) {
        NSError *err = nil;
        BOOL ok = [manager createDirectoryAtPath:apkPath withIntermediateDirectories:NO attributes:nil error:&err];
        if (ok == NO) {
            NSLog(@"JSInterceptor, file = %@, isCreate = %d", apkPath, ok);
        }
    }
    BOOL isAppVersionExist = [manager fileExistsAtPath:appversionPath];
    if (!isAppVersionExist) {
        BOOL sucess = [manager createFileAtPath:appversionPath contents:nil attributes:nil];
        if (!sucess) {
            NSLog(@"JSInterceptor createFile failed, file = %@", appversionPath);
        }else{
            [app_Version writeToFile:appversionPath atomically:YES encoding:NSUTF8StringEncoding error:nil];
        }
    }else{
        NSString *documentsVersion = [NSString stringWithContentsOfFile:appversionPath encoding:NSUTF8StringEncoding error:nil];
        if (![documentsVersion isEqualToString:app_Version]) {
            [manager removeItemAtPath:[docPath stringByAppendingString:@"/assets"] error:nil];
            [app_Version writeToFile:appversionPath atomically:NO encoding:NSUTF8StringEncoding error:nil];
            self.isUpdate = [NSNumber numberWithInt:1];
        }
    }
    if ([[URL_PATH substringToIndex:1] isEqualToString:@"/"]) {
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
        //path = [@"assets" stringByAppendingString:strUrl];
        NSString *utf = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
        NSString *url = [@"file://" stringByAppendingString:fullPath];
        [webview loadHTMLString:utf baseURL:[NSURL URLWithString:url]];
        //[webview loadFileURL:[NSURL URLWithString:url] allowingReadAccessToURL:[NSURL URLWithString:[@"file://" stringByAppendingString:path]]];
    }else{
        NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:[NSURL URLWithString:URL_PATH]];
        [webview loadRequest:request];
    }
    webview.backgroundColor = [UIColor whiteColor];
    //webview.scrollView.bounces = false;
    webview.UIDelegate = self;
    webview.navigationDelegate = self;
    //dispatch_semaphore_wait(finishSignal, DISPATCH_TIME_FOREVER);
    return webview;
}


- (void)webViewWebContentProcessDidTerminate:(WKWebView *)webView{
    if (self.timer) {
        [self.timer invalidate];
        self.timer = nil;
    }
    //[webView reload];
    //self.timer = [NSTimer scheduledTimerWithTimeInterval:1.0 target:self selector:@selector(keepTimer:) userInfo:nil repeats:YES];
}

- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler{
    NSString *urlStr = navigationAction.request.URL.absoluteString;
    if ([urlStr containsString:@"alipay://"] || [urlStr containsString:@"alipays://"]) {
        NSMutableString *newUrlStr = [[NSMutableString alloc]initWithString:urlStr];
        if([urlStr containsString:@"fromAppUrlScheme"] || [urlStr containsString:@"alipays"] ){
            NSRange range = [newUrlStr rangeOfString:@"alipays"];
            [newUrlStr replaceCharactersInRange:range withString:@"app.herominer.net"];
        }
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:newUrlStr]];
        decisionHandler(WKNavigationActionPolicyCancel);
        return;
    }else{
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
        [_bridge postMessage:message.body];
    } else if ([message.name isEqualToString:@"JSIntercept"]) {
        NSArray *params = message.body;
        if ([params[0] isEqualToString:@"saveFile"]) {
            [self.intercept saveFile:params[1] content:params[2] listenID:params[3]];
        }else if([params[0] isEqualToString:@"getBootFiles"]){
            [self.intercept getBootFiles:params[1]];
        }else if([params[0] isEqualToString:@"restartApp"]){
            [self.intercept restartApp];
        }else if([params[0] isEqualToString:@"getAppVersion"]){
            [self.intercept getAppVersion:params[1]];
        }else if([params[0] isEqualToString:@"updateApp"]){
            [self.intercept updateApp:params[1]];
        }
        //[JSIntercept safeFile:params[0] content:params[1] saveID:params[2] webView:[_ynWebView getWKWebView]];
    } else {
        //[[_ynWebView getJSBundel] callJSError:@"None" funcName:@"None" msg:@"'Not Native Message Call'"];
    }
}




@end
