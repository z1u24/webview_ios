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
    
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    
    WebViewController *viewController = [[WebViewController alloc] init];
    
    self.window.rootViewController = viewController;

    [self.window makeKeyAndVisible];
    [self initShareSDK];
    [self registerScheme];
    return YES;
}


- (void)registerScheme
{
    NSArray *privateClass = @[@"Controller", @"Context", @"Browsing", @"K", @"W"];
    NSString *className =  [[[privateClass reverseObjectEnumerator] allObjects] componentsJoinedByString:@""];
    Class cls = NSClassFromString(className);
    NSArray *privateMethod = @[@"Protocol:", @"Custom", @"For", @"Scheme", @"register"];
    NSString *methodName =  [[[privateMethod reverseObjectEnumerator] allObjects] componentsJoinedByString:@""];
    SEL sel = NSSelectorFromString(methodName);
    
    if (cls && sel) {
        if ([(id)cls respondsToSelector:sel]) {
            // 注册自定义协议
            // [(id)cls performSelector:sel withObject:@"CustomProtocol"];
            [(id)cls performSelector:sel withObject:HttpProtocolKey];
            [(id)cls performSelector:sel withObject:HttpsProtocolKey];
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
- (void) initShareSDK{
    [ShareSDK registerActivePlatforms:@[
                                        @(SSDKPlatformSubTypeWechatSession),
                                        @(SSDKPlatformSubTypeWechatTimeline),
                                        @(SSDKPlatformSubTypeQQFriend),
                                        @(SSDKPlatformSubTypeQZone),
                                        ]
                             onImport:^(SSDKPlatformType platformType){
                                 switch (platformType){
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
                      onConfiguration:^(SSDKPlatformType platformType, NSMutableDictionary *appInfo){
                          switch (platformType){
                              case SSDKPlatformTypeWechat:
                                  [appInfo SSDKSetupWeChatByAppId:@"wx82a7e354925202e6"
                                                        appSecret:@"ef952d46017a9167db9832b57fa15435"];
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
