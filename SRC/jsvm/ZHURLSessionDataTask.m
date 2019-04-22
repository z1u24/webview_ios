//
//  MyPoint.m
//  Test_JSCore
//
//  Created by 纠结伦 on 2017/3/3.
//  Copyright © 2017年 纠结伦. All rights reserved.
//

#import "ZHURLSessionDataTask.h"

@interface ZHURLSessionDataTask ()<ZHURLSessionDataTaskExports>

@end

@implementation ZHURLSessionDataTask

NSURLSessionTask * _task;

- (instancetype)initWithTask:(NSURLSessionTask *)task {
    self = [super init];
    _task = task;
    return self;
}

+ (id)getZhDataTask:(double)str {
    ZHURLSessionDataTask *g = [[ZHURLSessionDataTask alloc]init];
    return g;
}

- (void)cancel {
    [_task cancel];
}

@end
