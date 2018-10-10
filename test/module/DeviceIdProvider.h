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

@interface DeviceIdProvider : BaseObject
- (void)getUUId:(NSArray *)array;
@end
