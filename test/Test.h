//
//  Test.h
//  test
//
//  Created by yineng on 2018/8/9.
//  Copyright © 2018年 kupay. All rights reserved.
//

// 要继承自 NSObject
@interface Test: NSObject

- (void)testInstance:(NSArray *)array;

- (void)testCallback:(NSArray *)array;

+ (void)testStatic:(NSArray *)array;

@end
