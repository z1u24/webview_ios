//
//  UIViewController+BackButtonHandler.h
//  WebViewPro
//
//  Created by yineng on 2018/12/3.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol BackButtonHandlerProtocol <NSObject>
@optional
// Override this method in UIViewController derived class to handle 'Back' button click
- (BOOL)navigationShouldPopOnBackButton;
@end


NS_ASSUME_NONNULL_BEGIN

@interface UIViewController (BackButtonHandler)<BackButtonHandlerProtocol>

@end

NS_ASSUME_NONNULL_END
