//
//  ADUnion.m
//  WebViewPro
//
//  Created by yineng on 2019/7/30.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "ADUnion.h"
#import <BUAdSDK/BURewardedVideoAd.h>
#import <BUAdSDK/BURewardedVideoModel.h>

@interface ADUnion () <BURewardedVideoAdDelegate>

@end

@implementation ADUnion{
    CallJS load_callBack;
    CallJS show_callBack;
    NSMutableArray *array;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        array = [[NSMutableArray alloc] initWithCapacity:0];
    }
    return self;
}


-(void)loadRewardVideoAD:(NSNumber *)platform callJS:(CallJS)callJS{
    //目前只支持穿山甲
    if ([platform intValue] == 2) {
        load_callBack = callJS;
        BURewardedVideoModel *model = [[BURewardedVideoModel alloc] init];
        model.userId = @"123";
        BURewardedVideoAd *rewardedVideoAd = [[BURewardedVideoAd alloc] initWithSlotID:@"925750192" rewardedVideoModel:model];
        rewardedVideoAd.delegate = self;
        [rewardedVideoAd loadAdData];
        [array addObject:rewardedVideoAd];
    }
}


-(void)showRewardVideoAD:(NSNumber *)platform callJS:(CallJS)callJS ynwebView:(YNWebView *)ynwebView{
    if ([platform intValue] == 2) {
        show_callBack = callJS;
        BURewardedVideoAd *showAD = array[0];
        [array removeObjectAtIndex:0];
        [showAD showAdFromRootViewController:[ynwebView getViewController]];
    }
}


//delegate
- (void)rewardedVideoAdDidLoad:(BURewardedVideoAd *)rewardedVideoAd{
    load_callBack(Success,@[@"success"]);
}

- (void)rewardedVideoAdDidClose:(BURewardedVideoAd *)rewardedVideoAd{
    show_callBack(Callback,@[@1,@1,@"success"]);
    show_callBack(Success,@[@""]);
}

- (void)rewardedVideoAd:(BURewardedVideoAd *)rewardedVideoAd didFailWithError:(NSError *)error{
    load_callBack(Fail,@[@"fail"]);
}

- (void)rewardedVideoAdDidPlayFinish:(BURewardedVideoAd *)rewardedVideoAd didFailWithError:(NSError *)error{
    if (error != nil) {
        show_callBack(Callback,@[@0,@0,@"fail"]);
        show_callBack(Fail,@[@"fail"]);
    }
   
}

- (void)rewardedVideoAdServerRewardDidSucceed:(BURewardedVideoAd *)rewardedVideoAd verify:(BOOL)verify{
    show_callBack(Callback,@[@1,@0,@"success"]);
}


@end
