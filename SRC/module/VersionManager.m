//
//  VersionManager.m
//  WebViewPro
//
//  Created by yineng on 2018/12/3.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import "VersionManager.h"

@implementation VersionManager

//上传版本号
- (void)getVersionId:(NSArray *)array{
    NSNumber *listenerId = [array objectAtIndex:0];
    JSBundle *bundel = array[1];
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSString *app_Version = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
    [bundel callJS:listenerId code:0 params:[NSArray arrayWithObjects:app_Version, nil]];
}

//执行安装请求
- (void)appUpdate:(NSArray *)array{
    NSNumber *listenerId = [array objectAtIndex:0];
    NSString *url = array[1];
    JSBundle *bundel = array[2];
    if (@available(iOS 10.0, *)) {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url] options:@{} completionHandler:nil];
    } else {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]];
    }
    [bundel callJS:listenerId code:0 params:@[@""]];
}


@end
