//
//  payView.h
//  UI
//
//  Created by yineng on 2019/5/7.
//  Copyright © 2019 com.z1u24. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@protocol payDelegate <NSObject>

-(void)goPayBack:(UIView *)view;

-(void)goPay:(NSNumber *)sID sMD:(NSString *)sMD;

@end

@interface payView : UIView
- (instancetype)initWithFrame:(CGRect)frame withRest:(double)slv withDefault:(int)defaultTag;
- (void)closeMenView;
@property(nonatomic, strong)id<payDelegate> delegate;

@end

NS_ASSUME_NONNULL_END
