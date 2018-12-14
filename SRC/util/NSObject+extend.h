//
//  NSObject+extend.h
//  WebViewPro
//
//  Created by yineng on 2018/12/11.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSObject (extend)
- (id)performSelector:(SEL)aSelector withObjects:(NSArray *)arguments;
@end

NS_ASSUME_NONNULL_END


#import "NSObject+extend.h"

@implementation NSObject (extend)

- (id)performSelector:(SEL)aSelector withObjects:(NSArray *)arguments{
    
    //1.根据SEL实例化方法签名
    NSMethodSignature *signature = [[self class]instanceMethodSignatureForSelector:aSelector];
    //2.判断方法是否存在
    if (signature == nil) {
        //抛出异常
        NSLog(@"不存在这个方法");
        return nil;
    }
    //3.通过类方法实例化NSInvaction对象,设置target,selector
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    [invocation setTarget:self];
    [invocation setSelector:aSelector];
    
    //获取参数的个数,默认方法都有 self,_cmd两个参数
    NSInteger signatureParmCount = signature.numberOfArguments - 2;
    NSInteger resultCount = MIN(signatureParmCount, arguments.count);
    
    //设置方法参数
    for (NSInteger i = 0; i < resultCount; i++) {
        id argument = arguments[i];
        if ([argument isKindOfClass:[NSNull class]]) continue;
        [invocation setArgument:&argument atIndex:i+2];
    }
    [invocation invoke];
    
    //返回值,获取返回值的长度,大于0表示有返回值
    id returnArgument = nil;
    if (signature.methodReturnLength) {
        [invocation getReturnValue:&returnArgument];
    }
    return returnArgument;
}

@end
