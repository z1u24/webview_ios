//
//  VMBridge.h
//  WebViewPro
//
//  Created by yineng on 2019/6/26.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "NSObject+extend.h"
#import <JavaScriptCore/JavaScriptCore.h>
NS_ASSUME_NONNULL_BEGIN



@interface VMBridge : NSObject

//初始化桥接器
- (instancetype)initWithContext:(JSContext *)webView;
//接收高层调用事件
- (void)postMessage:(NSArray *)params;
//主动上抛事件
- (void)sendJS:(NSString *)type name:(NSString *)name params:(NSArray *)params;

@end

NS_ASSUME_NONNULL_END
