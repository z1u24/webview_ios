//
//  JSVMBootManager.h
//  WebViewPro
//
//  Created by yineng on 2019/4/22.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "JSValue_Extension.h"

NS_ASSUME_NONNULL_BEGIN

@interface JSVMBootManager : NSObject
- (instancetype)initWithContext:(JSContext *)context;
@end

NS_ASSUME_NONNULL_END
