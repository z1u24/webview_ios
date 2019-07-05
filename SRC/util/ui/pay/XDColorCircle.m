//
//  XDColorCircle.m
//  UI
//
//  Created by yineng on 2019/7/3.
//  Copyright © 2019 com.z1u24. All rights reserved.
//

#import "XDColorCircle.h"

@implementation XDColorCircle

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor=[UIColor clearColor];
        UIView *circleView=[[UIView alloc]init];
        circleView.frame=CGRectMake(0, 0,frame.size.width,frame.size.height);
        circleView.backgroundColor=[UIColor whiteColor];
        [self addSubview: circleView];
        CAGradientLayer * gradientLayer = [CAGradientLayer layer];
        gradientLayer.colors = @[(__bridge id)[UIColor whiteColor].CGColor,(__bridge id)[UIColor colorWithWhite:0 alpha:0.6].CGColor];
        gradientLayer.locations = @[@0.2,@1.0];
        gradientLayer.startPoint = CGPointMake(0, 0);
        gradientLayer.endPoint = CGPointMake(1.0, 0);
        gradientLayer.frame =CGRectMake(0, 0, self.frame.size.width, self.frame.size.height);
        [circleView.layer insertSublayer:gradientLayer atIndex:0];
        CAShapeLayer *layer=[[CAShapeLayer alloc]init];
        CGMutablePathRef pathRef=CGPathCreateMutable();
        CGPathAddRelativeArc(pathRef, nil,frame.size.width/2.0,frame.size.height/2.0,frame.size.width<frame.size.height?frame.size.width/2.0-5:frame.size.height/2.0-5,0, 2*M_PI);
        layer.path=pathRef;
        layer.lineWidth=3;
        layer.fillColor=[UIColor clearColor].CGColor;
        layer.strokeColor=[UIColor blackColor].CGColor;
        CGPathRelease(pathRef);
        circleView.layer.mask=layer;
        CABasicAnimation *animation=[CABasicAnimation animationWithKeyPath:@"transform.rotation.z"];  ;
        // 设定动画选项
        animation.duration = 1;
        animation.removedOnCompletion = NO;
        animation.fillMode = kCAFillModeForwards;
        animation.repeatCount =HUGE_VALF;
        // 设定旋转角度
        animation.fromValue = [NSNumber numberWithFloat:0.0]; // 起始角度
        animation.toValue = [NSNumber numberWithFloat:2 * M_PI]; // 终止角度
        [circleView.layer addAnimation:animation forKey:@"rotate-layer"];
    }
    return self;
}





@end
