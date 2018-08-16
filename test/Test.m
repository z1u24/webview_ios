//
//  Test.m
//  test
//
//  Created by yineng on 2018/8/9.
//  Copyright © 2018年 kupay. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "Test.h"
#import "JSBundle.h"

@implementation Test

- (void)testInstance:(NSArray *)array {
    NSLog(@"testInstance : %@", array);
    
    NSNumber *listenerID = [array objectAtIndex:0];
    
    NSNumber *a = [array objectAtIndex:1];
    NSNumber *b = [array objectAtIndex:2];
    NSNumber *c = [array objectAtIndex:3];
    NSNumber *d = [array objectAtIndex:4];
    NSString *s = [array objectAtIndex:5];
    
    NSNumber *r = [NSNumber numberWithFloat:1234.567];
    [JSBundle callJS:listenerID code:0 params:[NSArray arrayWithObjects:r, a, b, c, d, s, nil]];
}

- (void)testCallback:(NSArray *)array {
    NSLog(@"testCallback : %@", array);
    
    NSNumber *listenerID = [array objectAtIndex:0];
    
    NSNumber *a = [array objectAtIndex:1];
    NSNumber *b = [array objectAtIndex:2];
    NSNumber *cbID = [array objectAtIndex:3];
    [JSBundle callJS:cbID code:100 params:[NSArray arrayWithObjects:[NSString stringWithFormat:@"testCallback return: %@, %@", a, b], nil]];
}

+ (void)testStatic:(NSArray *)array {
    NSLog(@"testStatic : %@", array);
    
    NSNumber *listenerID = [array objectAtIndex:0];
    
    NSNumber *a = [array objectAtIndex:1];
    NSNumber *b = [array objectAtIndex:2];
    NSNumber *c = [array objectAtIndex:3];
    NSNumber *d = [array objectAtIndex:4];
    NSString *s = [array objectAtIndex:5];
    NSNumber *r = [NSNumber numberWithFloat:1234.567];
    [JSBundle callJS:listenerID code:0 params:[NSArray arrayWithObjects:r, a, b, c, d, s, nil]];}

@end

