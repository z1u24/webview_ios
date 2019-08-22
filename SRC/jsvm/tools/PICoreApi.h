//
//  PICoreApi.h
//  WebViewPro
//
//  Created by yineng on 2019/7/23.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <JavaScriptCore/JavaScriptCore.h>

@interface PICoreApi : NSObject
- (instancetype)initWithJSContext:(JSContext *)runtime;
@end

