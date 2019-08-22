//
//  JSVMBootManager.h
//  WebViewPro
//
//  Created by yineng on 2019/4/22.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "JSValue_Extension.h"

NS_ASSUME_NONNULL_BEGIN

@interface JSVMBootManager : NSObject
- (instancetype)initWithContext:(JSContext *)context;
-(NSString *)getLocationHref;
-(NSString *)getIndexJS;
@end

NS_ASSUME_NONNULL_END
