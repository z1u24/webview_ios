//
//  ZHObject.h
//  WebViewPro
//
//  Created by cifer on 2019/4/16.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

@interface ZHJSVMManager : NSObject

+ (ZHJSVMManager *)getIntance;

- (void)initContext;

@end
