//
//  shareView.h
//  WebViewPro
//
//  Created by yineng on 2019/4/29.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
@protocol shareAcitonDelegate <NSObject>
-(void)goShare:(NSString *)wID;
@end
@interface shareView : UIView
@property (assign,nonatomic)id <shareAcitonDelegate> delegate;
- (instancetype)initWithFrame:(CGRect)frame;
@end

NS_ASSUME_NONNULL_END
