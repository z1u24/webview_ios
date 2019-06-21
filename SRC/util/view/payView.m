//
//  payView.m
//  WebViewPro
//
//  Created by yineng on 2019/4/29.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "payView.h"

@implementation payView

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor = [UIColor whiteColor];
    }
    return self;
}

//视图绘制
-(void)setpayView{
    UIButton *payButton = [[UIButton alloc] initWithFrame:CGRectMake(100, 100, 100, 100)];
    payButton.backgroundColor = UIColor.greenColor;
    [payButton addTarget:self action:@selector(payAction) forControlEvents:UIControlEventTouchUpInside];
}

-(void)payAction{
    [self.delegate goPay:@"123"];
}


@end
