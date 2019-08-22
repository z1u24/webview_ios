//
//  StageUtils.h
//  WebViewPro
//
//  Created by yineng on 2019/6/28.
//  Copyright © 2019 kuplay. All rights reserved.
//
//  vm和default准备阶段准备

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface StageUtils : NSObject

//获取单例对象
+ (instancetype)sharedInstence;

//准备阶段----stageMessage：准备的阶段，mod:vm或者default
- (BOOL)makeStages:(NSString *)stageMessage mod:(NSString *)mod;
@end

NS_ASSUME_NONNULL_END

