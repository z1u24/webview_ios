//
//  globolNavigationController.m
//  DP Store
//
//  Created by ORION－Zues on 2018/9/20.
//  Copyright © 2018年 zeus. All rights reserved.
//

#import "globolNavigationController.h"
#import "WebViewController.h"

@interface globolNavigationController ()<UINavigationControllerDelegate>

@end

@implementation globolNavigationController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.delegate = self;
    self.interactivePopGestureRecognizer.enabled = NO;
}

- (void)pushViewController:(UIViewController *)viewController animated:(BOOL)animated
{
    if (self.viewControllers.count > 0) {
        viewController.hidesBottomBarWhenPushed = YES;
    }
    [super pushViewController:viewController animated:animated];
}

- (void)navigationController:(UINavigationController *)navigationController willShowViewController:(UIViewController *)viewController animated:(BOOL)animated {
    BOOL isHideNav = ([viewController isKindOfClass:[WebViewController class]]);
    [self setNavigationBarHidden:isHideNav animated:YES];
}
- (void)handleNavigationTransition:(id)sender{
    
}
@end
