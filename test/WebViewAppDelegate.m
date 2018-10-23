//
//  AppDelegate.m
//  test
//
//  Created by yineng on 2018/8/7.
//  Copyright © 2018年 kupay. All rights reserved.
//

#import "WebViewAppDelegate.h"
#import "Interceptor.h"

@interface AppDelegate ()

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // 设置userAgent
    NSString *customizeUserAgent = @" YINENG_IOS/1.0";
    NSString *webViewUserAgent = [[UIWebView new] stringByEvaluatingJavaScriptFromString:@"navigator.userAgent"];
    customizeUserAgent = [webViewUserAgent stringByAppendingFormat:@" %@", customizeUserAgent];
    if (customizeUserAgent) {
        [[NSUserDefaults standardUserDefaults] registerDefaults:@{@"UserAgent": customizeUserAgent}];
    }
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];

    WebViewController *viewController = [[WebViewController alloc] init];

    self.window.rootViewController = viewController;

    [self.window makeKeyAndVisible];
    [self initShareSDK];
    [self registerScheme];
    return YES;
}

////设置状态栏颜色
//- (void)setStatusBarBackgroundColor:(UIColor *)color {
//    UIView *statusBar = [[[UIApplication sharedApplication] valueForKey:@"statusBarWindow"] valueForKey:@"statusBar"];
//    if ([statusBar respondsToSelector:@selector(setBackgroundColor:)]) {
//        statusBar.backgroundColor = color;
//    }
//}


- (void)registerScheme {
    NSArray *privateClass = @[@"Controller", @"Context", @"Browsing", @"K", @"W"];
    NSString *className = [[[privateClass reverseObjectEnumerator] allObjects] componentsJoinedByString:@""];
    Class cls = NSClassFromString(className);
    NSArray *privateMethod = @[@"Protocol:", @"Custom", @"For", @"Scheme", @"register"];
    NSString *methodName = [[[privateMethod reverseObjectEnumerator] allObjects] componentsJoinedByString:@""];
    SEL sel = NSSelectorFromString(methodName);

    if (cls && sel) {
        if ([(id) cls respondsToSelector:sel]) {
            // 注册自定义协议
            [(id) cls performSelector:sel withObject:HttpProtocolKey];
        }
    }
    // SechemaURLProtocol 自定义类 继承于 NSURLProtocol
    [NSURLProtocol registerClass:[Interceptor class]];
}

/**
 * 初始化ShareSDK应用
 * 使用的分享平台集合
 * 导入回调处理，当某个平台的功能需要依赖原平台提供的SDK支持时，需要在此方法中对原平台SDK进行导入操作
 * 配置回调处理，在此方法中根据设置的platformType来填充应用配置信息
 */
- (void)initShareSDK {
    [ShareSDK registerActivePlatforms:@[
                    @(SSDKPlatformSubTypeWechatSession),
                    @(SSDKPlatformSubTypeWechatTimeline),
                    @(SSDKPlatformSubTypeQQFriend),
                    @(SSDKPlatformSubTypeQZone),
            ]
                             onImport:^(SSDKPlatformType platformType) {
                                 switch (platformType) {
                                     case SSDKPlatformTypeWechat:
                                         [ShareSDKConnector connectWeChat:[WXApi class]];
                                         break;
                                     case SSDKPlatformTypeQQ:
                                         [ShareSDKConnector connectQQ:[QQApiInterface class] tencentOAuthClass:[TencentOAuth class]];
                                         break;
                                     default:
                                         break;
                                 }
                             }
                      onConfiguration:^(SSDKPlatformType platformType, NSMutableDictionary *appInfo) {
                          switch (platformType) {
                              case SSDKPlatformTypeWechat:
                                  [appInfo SSDKSetupWeChatByAppId:@"wx3d86fc2e76c0af41"
                                                        appSecret:@"36fee1ab731a7bda68ae0b24b7d6bdb5"];
                                  break;
                              case SSDKPlatformTypeQQ:
                                  [appInfo SSDKSetupQQByAppId:@"1107057918"
                                                       appKey:@"ZA8TZCDkupz38eoN"
                                                     authType:SSDKAuthTypeBoth];
                                  break;
                              default:
                                  break;
                          }
                      }];
}


@end
