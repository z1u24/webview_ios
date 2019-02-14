//
//  MessagePost.m
//  WebViewPro
//
//  Created by yineng on 2019/2/14.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "MessagePost.h"

@implementation MessagePost

- (void)sendMessage:(CallJS)callJS{
    //获取用户授权
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeBadge categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
    
    //注册消息推送
    UIApplication *application = [UIApplication sharedApplication];
    [application registerForRemoteNotifications];
    
    [[UIApplication sharedApplication] setApplicationIconBadgeNumber:99];
    
}

- (void)readMessage:(CallJS)callJS{
    //获取用户授权
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeBadge categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];

    //注册消息推送
    UIApplication *application = [UIApplication sharedApplication];
    [application registerForRemoteNotifications];
    
    [[UIApplication sharedApplication] setApplicationIconBadgeNumber:0];
    
}


@end
