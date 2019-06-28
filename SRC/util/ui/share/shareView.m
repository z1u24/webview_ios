//
//  shareView.m
//  UI
//
//  Created by yineng on 2019/5/7.
//  Copyright © 2019 com.z1u24. All rights reserved.
//

#import "shareView.h"
#import "Masonry.h"
#import "viewSizeUtil.h"
#import "toastUtil.h"
#import "HMScannerController.h"

@interface shareView ()
@property(nonatomic, strong)UIButton *backButton;
@property(nonatomic, strong)viewSizeUtil *sizeUtil;
@property(nonatomic, strong)NSString *code;
@end

@implementation shareView


- (instancetype)initWithFrame:(CGRect)frame ImageName:(NSString *)imageName UserName:(NSString *)userName ShareCode:(NSString *)shareCode ShareUrl:(NSString *)shareUrl
{
    self = [super initWithFrame:frame];
    if (self) {
        self.sizeUtil = [[viewSizeUtil alloc] init];
        [self initBackImage:imageName];
        [self initBackButton];
        [self initNameTitile:userName];
        [self initShareCode:shareCode];
        self.code = shareCode;
        [self initQrcode:(NSString *)shareUrl];
        [self initShareImage];
    }
    return self;
}

-(void)initBackImage:(NSString *)imageName{
    NSString *path = [[NSBundle mainBundle]pathForResource:imageName ofType:@"png"];
    UIImage *image = [UIImage imageWithContentsOfFile:path];
    self.layer.contents = (id)image.CGImage;
    // gradient
    CAGradientLayer *gl = [CAGradientLayer layer];
    gl.frame = CGRectMake(0,0,375*[self.sizeUtil getWidthSize],667*[self.sizeUtil getHeightSize]);
    gl.startPoint = CGPointMake(0.51, 0);
    gl.endPoint = CGPointMake(0.51, 1);
    gl.colors = @[(__bridge id)[UIColor colorWithRed:34/255.0 green:4/255.0 blue:64/255.0 alpha:0.2].CGColor, (__bridge id)[UIColor colorWithRed:34/255.0 green:4/255.0 blue:64/255.0 alpha:0.0].CGColor, (__bridge id)[UIColor colorWithRed:34/255.0 green:4/255.0 blue:64/255.0 alpha:0.0].CGColor, (__bridge id)[UIColor colorWithRed:33/255.0 green:2/255.0 blue:63/255.0 alpha:1.0].CGColor, (__bridge id)[UIColor colorWithRed:33/255.0 green:1/255.0 blue:63/255.0 alpha:1.0].CGColor];
    gl.locations = @[@(0), @(0.1f), @(0.4f), @(0.7f), @(1.0f)];
    [self.layer addSublayer:gl];
}

-(void)initBackButton{
    self.backButton = [[UIButton alloc] initWithFrame:[self.sizeUtil makeBackFrame:CGRectMake(13, 33, 24, 24)]];
    [self.backButton setImage:[UIImage imageNamed:@"whiteBack"] forState:UIControlStateNormal];
    [self addSubview:self.backButton];
    [self.backButton addTarget:self action:@selector(backAction) forControlEvents:UIControlEventTouchUpInside];
}

-(void)initNameTitile:(NSString *)name{
    UILabel *label = [[UILabel alloc] init];
    label.numberOfLines = 0;
    [label sizeToFit];
    [self addSubview:label];
    NSString *showName = [NSString stringWithFormat:@"“%@”专属邀请码",name];
    NSMutableAttributedString *string = [[NSMutableAttributedString alloc] initWithString:showName attributes: @{NSFontAttributeName: [UIFont fontWithName:@"PingFangSC-Regular" size: 16*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:255/255.0 green:255/255.0 blue:255/255.0 alpha:1.0]}];
    label.attributedText = string;
    label.textAlignment = NSTextAlignmentCenter;
    label.alpha = 1.0;
    __weak typeof(self) weakSelf = self;
    [label mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(weakSelf.mas_centerX);
        make.top.equalTo(weakSelf.mas_top).offset(327.5*[weakSelf.sizeUtil getHeightSize]);
    }];
}

-(void)initShareCode:(NSString *)code{
    UILabel *label = [[UILabel alloc] initWithFrame:[self.sizeUtil makeFrame:CGRectMake(115.5,361,92,22.5)]];
    label.numberOfLines = 0;
    [label sizeToFit];
    [self addSubview:label];
    
    NSMutableAttributedString *codeStr = [[NSMutableAttributedString alloc] initWithString:code attributes: @{NSFontAttributeName: [UIFont fontWithName:@"PingFangSC-Regular" size: 16*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:255/255.0 green:255/255.0 blue:255/255.0 alpha:1.0]}];
    label.attributedText = codeStr;
    label.textAlignment = NSTextAlignmentCenter;
    label.alpha = 1.0;
    __weak typeof(self) weakSelf = self;
    [label mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(weakSelf).offset(-26*[weakSelf.sizeUtil getWidthSize]);
        make.top.equalTo(weakSelf).offset(361*[weakSelf.sizeUtil getHeightSize]);
    }];
    
    UIButton *bt = [[UIButton alloc] init];
    bt.layer.cornerRadius = 12.5 * [self.sizeUtil getWidthSize];
    bt.layer.masksToBounds = YES;
    bt.layer.borderWidth = 1;
    bt.layer.borderColor = UIColor.whiteColor.CGColor;
    NSMutableAttributedString *string = [[NSMutableAttributedString alloc] initWithString:@"复制"attributes: @{NSFontAttributeName: [UIFont fontWithName:@"PingFangSC-Regular" size: 14*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:255/255.0 green:255/255.0 blue:255/255.0 alpha:1.0]}];
    [bt setAttributedTitle:string forState:UIControlStateNormal];
    [self addSubview:bt];
    [bt addTarget:self action:@selector(copyAction) forControlEvents:UIControlEventTouchUpInside];
    [bt mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerY.equalTo(label);
        make.width.equalTo(@(42*[weakSelf.sizeUtil getWidthSize]));
        make.height.equalTo(@(25*[weakSelf.sizeUtil getWidthSize]));
        make.left.equalTo(label.mas_right).offset(10*[weakSelf.sizeUtil getWidthSize]).priorityLow();
    }];
    
}

-(void)initQrcode:(NSString *)shareUrl{
    NSString *qrPath = [[NSBundle mainBundle] pathForResource:@"qrcode" ofType:@"png"];
    UIImage *uimage = [UIImage imageWithContentsOfFile:qrPath];
    UIImageView *qrView = [[UIImageView alloc] initWithImage:uimage];
    [HMScannerController cardImageWithCardName:shareUrl avatar:nil scale:0 completion:^(UIImage *image) {
        [qrView setImage:image];
    }];
    [self addSubview:qrView];
    __weak typeof(self) weakSelf = self;
    [qrView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.bottom.equalTo(weakSelf.mas_bottom).offset(-112*[weakSelf.sizeUtil getHeightSize]);
        make.centerX.equalTo(weakSelf);
        make.width.equalTo(@(150*[weakSelf.sizeUtil getHeightSize]));
        make.height.equalTo(@(150*[weakSelf.sizeUtil getHeightSize]));
    }];
    
    UILabel *label = [[UILabel alloc] initWithFrame:[self.sizeUtil makeFrame:CGRectMake(163.5,565,48,16.5)]];
    label.numberOfLines = 0;
    [self addSubview:label];
    
    NSMutableAttributedString *string = [[NSMutableAttributedString alloc] initWithString:@"扫码下载"attributes: @{NSFontAttributeName: [UIFont fontWithName:@"PingFangSC-Regular" size: 12*[weakSelf.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:204/255.0 green:204/255.0 blue:204/255.0 alpha:1.0]}];
    
    label.attributedText = string;
    label.textAlignment = NSTextAlignmentCenter;
    label.alpha = 1.0;
}

-(void)initShareImage{
    UIButton *wechatBt = [[UIButton alloc] initWithFrame:[self.sizeUtil makeBackFrame:CGRectMake(45,594,45,45)]];
    NSString *wechatStr = [[NSBundle mainBundle] pathForResource:@"wechat" ofType:@"png"];
    [wechatBt setImage:[UIImage imageWithContentsOfFile:wechatStr] forState:UIControlStateNormal];
    wechatBt.tag = 1022;
    [wechatBt addTarget:self action:@selector(goshre:) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:wechatBt];
    
    UIButton *friendBT = [[UIButton alloc] initWithFrame:[self.sizeUtil makeBackFrame:CGRectMake(125,594,45,45)]];
    NSString *friendStr = [[NSBundle mainBundle] pathForResource:@"friend" ofType:@"png"];
    [friendBT setImage:[UIImage imageWithContentsOfFile:friendStr] forState:UIControlStateNormal];
    friendBT.tag = 1023;
    [friendBT addTarget:self action:@selector(goshre:) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:friendBT];
    
    UIButton *qqBt = [[UIButton alloc] initWithFrame:[self.sizeUtil makeBackFrame:CGRectMake(205,594,45,45)]];
    NSString *qqStr = [[NSBundle mainBundle] pathForResource:@"qq" ofType:@"png"];
    [qqBt setImage:[UIImage imageWithContentsOfFile:qqStr] forState:UIControlStateNormal];
    qqBt.tag = 1024;
    [qqBt addTarget:self action:@selector(goshre:) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:qqBt];
    
    UIButton *spaceBT = [[UIButton alloc] initWithFrame:[self.sizeUtil makeBackFrame:CGRectMake(285,594,45,45)]];
    NSString *spaceStr = [[NSBundle mainBundle] pathForResource:@"space" ofType:@"png"];
    [spaceBT setImage:[UIImage imageWithContentsOfFile:spaceStr] forState:UIControlStateNormal];
    spaceBT.tag = 1025;
    [spaceBT addTarget:self action:@selector(goshre:) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:spaceBT];
}

-(void)backAction{
    [self.delegate goShareBack:self];
}

-(void)goshre:(UIButton *)sender{
    switch (sender.tag) {
        case 1022:
            [self.delegate goShare:[[NSNumber alloc] initWithInt:1]];
            break;
        case 1023:
            [self.delegate goShare:[[NSNumber alloc] initWithInt:2]];
            break;
        case 1024:
            [self.delegate goShare:[[NSNumber alloc] initWithInt:4]];
            break;
        case 1025:
            [self.delegate goShare:[[NSNumber alloc] initWithInt:3]];
        default:
            break;
    }
}


-(void)copyAction{
    UIPasteboard *pastBoard = [UIPasteboard generalPasteboard];
    pastBoard.string = self.code;
    [[toastUtil shareInstance] makeToast:@"复制成功!" duration:1.0];
}

@end
