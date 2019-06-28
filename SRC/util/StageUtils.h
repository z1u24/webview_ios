//
//  StageUtils.h
//  WebViewPro
//
//  Created by yineng on 2019/6/28.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface StageUtils : NSObject

+ (instancetype)sharedInstence;
- (BOOL)makeStages:(NSString *)stageMessage mod:(NSString *)mod;
@end

NS_ASSUME_NONNULL_END
