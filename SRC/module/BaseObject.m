//
//  BaseObject.m
//  Telegraph
//
//  Created by Apple on 2018/8/22.
//

#import "BaseObject.h"

UIViewController *controller = nil;

@implementation BaseObject
+ (void)setVc:(UIViewController *)vc {
    controller = vc;
}

+ (UIViewController *)getVc {
    return controller;
}
@end
