//
//  shareView.h
//  UI
//
//  Created by yineng on 2019/5/7.
//  Copyright © 2019 com.z1u24. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@protocol shareDelegate <NSObject>

-(void)goShareBack:(UIView *)view;

-(void)goShare:(NSNumber *)way;


@end

@interface shareView : UIView
- (instancetype)initWithFrame:(CGRect)frame ImageName:(NSString *)imageName UserName:(NSString *)userName ShareCode:(NSString *)shareCode ShareUrl:(NSString *)shareUrl;
@property(nonatomic, strong)id<shareDelegate> delegate;
@end

NS_ASSUME_NONNULL_END
