//
//  DeviceIdProvider.h
//  WebViewPro
//
//  Created by Apple on 2018/9/28.
//  Copyright © 2018年 kupay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <sys/utsname.h>
#import "BaseObject.h"

typedef void (^CallJS)(CallJSType callJSType, NSArray *params);

@interface DeviceIdProvider : BaseObject

- (void)getUUId:(CallJS)callJS;
- (void)getSystem:(CallJS)callJS;
- (void)getMemSize:(CallJS)callJS;
- (void)getNetWorkStatus:(CallJS)callJS;
- (void)getOperatorName:(CallJS)callJS;

@end
