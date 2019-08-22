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

#import <UIKit/UIKit.h>
#import "NSObject+extend.h"

typedef enum {
    Error = -1,
    Success  = 0,
    Fail = 1,
    Callback = 2
    
} CallJSType;

typedef void (^CallJS)(CallJSType callJSType, NSArray *params);

@interface BaseObject : NSObject

+ (void)setVc:(UINavigationController *)vc;

+ (UINavigationController *)getVc;

@end

#endif /* BaseObject_h */
