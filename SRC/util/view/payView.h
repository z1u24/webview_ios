//
//  payView.h
//  WebViewPro
//
//  Created by yineng on 2019/4/29.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
@protocol payAcitonDelegate <NSObject>
-(void)goPay:(NSString *)sID;
@end

@interface payView : UIView
@property (assign,nonatomic)id <payAcitonDelegate> delegate;
- (instancetype)initWithFrame:(CGRect)frame;
@end

NS_ASSUME_NONNULL_END
