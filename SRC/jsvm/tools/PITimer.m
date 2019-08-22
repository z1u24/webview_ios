//
//  PITimer.m
//  WebViewPro
//
//  Created by yineng on 2019/7/16.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "PITimer.h"

@implementation PITimer{
    int _timerKey;
    NSMutableDictionary *_timerDic;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _timerKey = 0;
        _timerDic = [[NSMutableDictionary alloc] initWithCapacity:0];
    }
    return self;
}

-(int)setTimeout:(callBack)func time:(NSNumber *)timeout{
    _timerKey += 1;
    double times = timeout.doubleValue;
    double interval = times/1000.0;
    __weak typeof(self) weakSelf = self;
    NSTimer *timer = [NSTimer timerWithTimeInterval:interval repeats:NO block:^(NSTimer * _Nonnull timer) {
        func(@[]);
        [weakSelf removeFrom:self->_timerDic withObject:timer];
        [timer invalidate];
        timer = nil;
    }];
    [NSRunLoop.mainRunLoop addTimer:timer forMode:NSRunLoopCommonModes];
    NSString *key = [NSString stringWithFormat:@"%d",_timerKey];
    [_timerDic setObject:timer forKey:key];
    return _timerKey;
}

-(void)clearTimeout:(NSNumber *)timeout{
    NSString *key = [NSString stringWithFormat:@"%@",timeout];
    if([_timerDic.allKeys containsObject:key]){
        NSTimer *timer = [_timerDic objectForKey:key];
        [_timerDic removeObjectForKey:key];
        [timer invalidate];
        timer = nil;
    }
}

-(int)setInterval:(callBack)func time:(NSNumber *)timeout{
    _timerKey += 1;
    double times = timeout.doubleValue;
    double interval = times/1000.0;
    __weak typeof(self) weakSelf = self;
    NSTimer *timer = [NSTimer timerWithTimeInterval:interval repeats:YES block:^(NSTimer * _Nonnull timer) {
        func(@[]);
        [weakSelf removeFrom:self->_timerDic withObject:timer];
        [timer invalidate];
        timer = nil;
    }];
    [NSRunLoop.mainRunLoop addTimer:timer forMode:NSRunLoopCommonModes];
    
    NSString *key = [NSString stringWithFormat:@"%d",_timerKey];
    [_timerDic setObject:timer forKey:key];
    return _timerKey;
}

// 移除字典中的对象
-(void)removeFrom:(NSMutableDictionary *)dic withObject:(id )obj {
    for (NSString *dicKey in dic.allKeys) {
        id target = [dic objectForKey:dicKey];
        if (target == obj) {
            [dic removeObjectForKey:dicKey];
            break;
        }
    }
}

@end
