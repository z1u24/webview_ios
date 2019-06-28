//
//  viewSizeUtil.m
//  UI
//
//  Created by yineng on 2019/5/10.
//  Copyright © 2019 com.z1u24. All rights reserved.
//

#import "viewSizeUtil.h"

@implementation viewSizeUtil{
    CGRect rx;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self->rx = [UIScreen mainScreen ].bounds;
    }
    return self;
}


-(float)getHeightSize{
    return self->rx.size.height/667.0;
}

-(float)getWidthSize{
    return self->rx.size.width/375.0;
}

-(CGRect)makeFrame:(CGRect)frame{
    return CGRectMake(frame.origin.x * [self getWidthSize], frame.origin.y * [self getHeightSize], frame.size.width * [self getWidthSize], frame.size.height * [self getHeightSize]);
}

-(CGRect)makeBackFrame:(CGRect)frame{
    if([self isNotchScreen]){
        return CGRectMake(frame.origin.x * [self getWidthSize], frame.origin.y * [self getHeightSize] + 20, frame.size.width * [self getHeightSize], frame.size.height * [self getHeightSize]);
    }
    return CGRectMake(frame.origin.x * [self getWidthSize], frame.origin.y * [self getHeightSize], frame.size.width * [self getHeightSize], frame.size.height * [self getHeightSize]);
}

//判断是否为刘海屏
- (BOOL)isNotchScreen {
    if ([UIDevice currentDevice].userInterfaceIdiom == UIUserInterfaceIdiomPad) {
        return NO;
    }
    CGSize size = [UIScreen mainScreen].bounds.size;
    NSInteger notchValue = size.width / size.height * 100;
    if (216 == notchValue || 46 == notchValue) {
        return YES;
    }
    return NO;
}

@end
