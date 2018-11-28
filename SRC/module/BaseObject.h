//
//  BaseObject.h
//  Telegraph
//
//  Created by Apple on 2018/8/22.
//  大部分情况下、使用三方库的时候需要用到UIViewController
//  此父类抽象出一个初始化UIViewController的方法
//

#ifndef BaseObject_h
#define BaseObject_h

#import <Foundation/Foundation.h>
#import "JSBundle.h"

@interface BaseObject : NSObject

+ (void)setVc:(UIViewController *)vc;

+ (UIViewController *)getVc;

@end

#endif /* BaseObject_h */
