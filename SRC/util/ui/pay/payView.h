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

-(void)goPayBack;

-(void)goPay:(NSString *)sID;

@end

@interface payView : UIView
- (instancetype)initWithFrame:(CGRect)frame withRest:(double)slv;

@property(nonatomic, strong)id<payDelegate> delegate;

@end

NS_ASSUME_NONNULL_END
