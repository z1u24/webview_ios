//
//  toastUtil.m
//  UI
//
//  Created by yineng on 2019/5/13.
//  Copyright © 2019 com.z1u24. All rights reserved.
//

#import "toastUtil.h"

static int changeCount;

@implementation toastUtil

+ (instancetype)shareInstance {
    static toastUtil *singleton = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        singleton = [[toastUtil alloc] init];
    });
    return singleton;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        dialogsLabel = [[DialogsLabel alloc] init];
        countTimer = [NSTimer scheduledTimerWithTimeInterval:1.0 target:self selector:@selector(changeTime) userInfo:nil repeats:YES];
        countTimer.fireDate = [NSDate distantFuture];//关闭定时器
    }
    return self;
}
- (void)makeToast:(NSString *)message duration:(CGFloat)duration {
    if ([message length] == 0) {
        return;
    }
    [dialogsLabel setMessageText:message];
    [[[UIApplication sharedApplication] keyWindow] addSubview:dialogsLabel];
    dialogsLabel.alpha = 0.8;
    countTimer.fireDate = [NSDate distantPast];//开启定时器
    changeCount = duration;
    
}
- (void)changeTime {
    if(changeCount-- <= 0){
        countTimer.fireDate = [NSDate distantFuture]; //关闭定时器
        [UIView animateWithDuration:0.2f animations:^{
            self->dialogsLabel.alpha = 0;
        } completion:^(BOOL finished) {
            [self->dialogsLabel removeFromSuperview];
        }];
    }
    
}
@end

@implementation DialogsLabel

//DialogsLabel初始化，为label设置各种属性

- (instancetype)init {
    self = [super init];
    if (self) {
        self.layer.cornerRadius = 8;
        self.layer.masksToBounds = YES;
        self.backgroundColor = [UIColor blackColor];
        self.numberOfLines = 0;
        self.textAlignment = NSTextAlignmentCenter;
        self.textColor = [UIColor whiteColor];
        self.font = [UIFont systemFontOfSize:15];
    }
    return self;
}

- (void)setMessageText:(NSString *)text {
    [self setText:text];
    float SCREEN_WIDTH = [UIScreen mainScreen ].bounds.size.width;
    float SCREEN_HEIGHT = [UIScreen mainScreen ].bounds.size.height;
    CGRect rect = [self.text boundingRectWithSize:CGSizeMake(SCREEN_WIDTH - 20, MAXFLOAT) options:NSStringDrawingUsesLineFragmentOrigin|NSStringDrawingUsesFontLeading attributes:@{NSFontAttributeName:self.font} context:nil];
    CGFloat width = rect.size.width + 20;
    CGFloat height = rect.size.height + 20;
    CGFloat x = (SCREEN_WIDTH-width)/2;
    CGFloat y = SCREEN_HEIGHT-height - 59;
    self.frame = CGRectMake(x, y, width, height);
}
@end
