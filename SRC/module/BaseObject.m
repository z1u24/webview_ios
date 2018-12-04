//
//  BaseObject.m
//  Telegraph
//
//  Created by Apple on 2018/8/22.
//

#import "BaseObject.h"


UINavigationController *controller = nil;

@implementation BaseObject
+ (void)setVc:(UINavigationController *)vc {
    controller = vc;
}

+ (UINavigationController *)getVc {
    return controller;
}
@end
