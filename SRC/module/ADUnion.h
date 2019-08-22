//
//  ADUnion.h
//  WebViewPro
//
//  Created by yineng on 2019/7/30.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "BaseObject.h"
#import "YNWebView.h"

@interface ADUnion : BaseObject
-(void)loadRewardVideoAD:(NSNumber *)platform callJS:(CallJS)callJS;
-(void)showRewardVideoAD:(NSNumber *)platform callJS:(CallJS)callJS ynwebView:(YNWebView *)ynwebView;
@end

