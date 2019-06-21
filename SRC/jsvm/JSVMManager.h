//
//  Object.h
//  WebViewPro
//
//  Created by cifer on 2019/4/16.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "JSValue_Extension.h"
#import "globolNavigationController.h"
@interface JSVMManager : NSObject
+ (JSVMManager *)getIntance;
- (JSContext *)shareInstanceWithUserAgent:(NSString *)userAgent withNavigationController:(globolNavigationController *)navi;

@end
