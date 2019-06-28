//
//  StageUtils.m
//  WebViewPro
//
//  Created by yineng on 2019/6/28.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "StageUtils.h"

@implementation StageUtils{
    NSMutableArray *vmMap;
    NSMutableArray *defaultMap;
}

+ (instancetype)sharedInstence{
    static StageUtils *singleton = nil;
    static dispatch_once_t onceToken;
    // dispatch_once  无论使用多线程还是单线程，都只执行一次
    dispatch_once(&onceToken, ^{
        singleton = [[StageUtils alloc] init];
    });
    return singleton;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        vmMap = [[NSMutableArray alloc] initWithCapacity:0];
        defaultMap = [[NSMutableArray alloc] initWithCapacity:0];
    }
    return self;
}

- (BOOL)makeStages:(NSString *)stageMessage mod:(NSString *)mod{
    @synchronized (self) {
        if ([mod isEqualToString:@"JSVM"]) {
            if ([defaultMap containsObject:stageMessage]) {
                return YES;
            }else{
                [vmMap addObject:stageMessage];
                return NO;
            }
        }else if([mod isEqualToString:@"default"]){
            if ([vmMap containsObject:stageMessage]) {
                return YES;
            }else{
                [defaultMap addObject:stageMessage];
                return NO;
            }
        }
        
        return NO;
    }
}



@end
