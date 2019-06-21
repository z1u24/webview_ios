//
//  shareView.m
//  WebViewPro
//
//  Created by yineng on 2019/4/29.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "shareView.h"

@implementation shareView

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
    [payButton addTarget:self action:@selector(shareAction) forControlEvents:UIControlEventTouchUpInside];
}

-(void)shareAction{
    [self.delegate goShare:@"123"];
}


@end
