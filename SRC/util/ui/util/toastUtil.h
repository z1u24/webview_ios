//
//  toastUtil.h
//  UI
//
//  Created by yineng on 2019/5/13.
//  Copyright © 2019 com.z1u24. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface DialogsLabel : UILabel

- (void)setMessageText:(NSString *)text;

@end

@interface toastUtil : NSObject{
    DialogsLabel *dialogsLabel;
    NSTimer *countTimer;
}
+ (instancetype)shareInstance;
- (void)makeToast:(NSString *)message duration:(CGFloat)duration;
@end

NS_ASSUME_NONNULL_END
