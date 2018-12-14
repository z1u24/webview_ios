//
//  DeviceIdProvider.m
//  WebViewPro
//
//  Created by Apple on 2018/9/28.
//  Copyright © 2018年 kupay. All rights reserved.
//

#import "DeviceIdProvider.h"

@implementation DeviceIdProvider
- (void)getUUId:(CallJS)callJS {
    NSString *UUIDString = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
    callJS(Success,[NSArray arrayWithObjects:UUIDString, nil]);
}
@end
