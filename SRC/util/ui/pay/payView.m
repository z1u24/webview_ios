//
//  payView.m
//  UI
//
//  Created by yineng on 2019/5/7.
//  Copyright © 2019 com.z1u24. All rights reserved.
//

#import "payView.h"
#import "Masonry.h"
#import "viewSizeUtil.h"

@interface payView ()
@property(nonatomic, strong)viewSizeUtil *sizeUtil;
@property(nonatomic, strong)UIButton *backButton;
@property(nonatomic, strong)UILabel *silverLabel;
@property(nonatomic, strong)UIButton *payButton;
@property(nonatomic, strong)NSMutableDictionary *muchDic;
@property(nonatomic, strong)NSArray *muchArr;
@property(nonatomic, strong)UILabel *payShow;
@property(nonatomic, strong)UILabel *payListShow;
@property(nonatomic, strong)UILabel *freeShow;
@property(nonatomic, assign)NSInteger selectTag;
@end

@implementation payView



- (instancetype)initWithFrame:(CGRect)frame withRest:(double)slv
{
    self = [super initWithFrame:frame];
    if (self) {
        //初始化页面布局
        self.sizeUtil = [[viewSizeUtil alloc] init];
        self.muchArr = @[@"6",@"30",@"68",@"98",@"198",@"328",@"648",@"1298",@"2998",@"6498"];
        self.muchDic = [[NSMutableDictionary alloc] initWithCapacity:0];
        self.backgroundColor = UIColor.whiteColor;
        [self initBackButton];
        [self initAotView];
        [self initRemoView:slv];
        [self initFastView];
        [self initPayView];
        [self initOverLookView];
        [self initPayButton];
        //默认选中第一个
        self.selectTag = 6;
        [self didselect:[self.muchDic objectForKey:[NSString stringWithFormat:@"%ld",(long)self.selectTag]] withTag:self.selectTag];
    }
    return self;
}

-(void)initBackButton{
    self.backButton = [[UIButton alloc] initWithFrame:[self.sizeUtil makeBackFrame:CGRectMake(13, 33, 24, 24)]];
    self.backButton.backgroundColor = UIColor.whiteColor;
    [self.backButton setImage:[UIImage imageNamed:@"back"] forState:UIControlStateNormal];
    [self addSubview:self.backButton];
    
    [self.backButton addTarget:self action:@selector(backAction) forControlEvents:UIControlEventTouchUpInside];
    
    UILabel *label = [[UILabel alloc] initWithFrame:[self.sizeUtil makeBackFrame:CGRectMake(50, 33, 42.7, 22.5)]];
    label.numberOfLines = 0;
    [self addSubview:label];
    
    NSMutableAttributedString *string = [[NSMutableAttributedString alloc] initWithString:@"充值"attributes: @{NSFontAttributeName: [UIFont fontWithName:@"PingFangSC-Regular" size: 16*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:34/255.0 green:34/255.0 blue:34/255.0 alpha:1.0]}];
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(backAction)];
    label.userInteractionEnabled = YES;
    [label addGestureRecognizer:tap];
    label.attributedText = string;
    label.textAlignment = NSTextAlignmentLeft;
    label.alpha = 1.0;
    
}

-(void)initAotView{
    UILabel *label = [[UILabel alloc] initWithFrame:[self.sizeUtil makeFrame:CGRectMake(15, 89, 56, 20)]];
    label.numberOfLines = 0;
    [self addSubview:label];
    
    NSMutableAttributedString *string = [[NSMutableAttributedString alloc] initWithString:@"银两余额"attributes: @{NSFontAttributeName: [UIFont fontWithName:@"PingFangSC-Medium" size: 14*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:34/255.0 green:34/255.0 blue:34/255.0 alpha:1.0]}];
    label.attributedText = string;
    label.textAlignment = NSTextAlignmentLeft;
    label.alpha = 1.0;
}

-(void)initRemoView:(double)slv{
    self.silverLabel = [[UILabel alloc] initWithFrame:[self.sizeUtil makeFrame:CGRectMake(332.5, 90.5, 27.5, 17)]];
    self.silverLabel.numberOfLines = 0;
    NSString *s = [NSString stringWithFormat:@"%.2lf",slv];
    NSMutableAttributedString *string = [[NSMutableAttributedString alloc] initWithString:s attributes: @{NSFontAttributeName: [UIFont fontWithName:@"Helvetica" size: 14*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:136/255.0 green:136/255.0 blue:136/255.0 alpha:1.0]}];
    self.silverLabel.attributedText = string;
    self.silverLabel.textAlignment = NSTextAlignmentRight;
    self.silverLabel.alpha = 1.0;
    [self.silverLabel sizeToFit];
    [self addSubview:self.silverLabel];
    __weak typeof(self) weakSelf = self;
    [self.silverLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.right.equalTo(weakSelf).offset(-15*[weakSelf.sizeUtil getWidthSize]);
        make.top.equalTo(weakSelf).offset(90.5*[weakSelf.sizeUtil getHeightSize]);
    }];
}

-(void)initFastView{
    UILabel *label = [[UILabel alloc] initWithFrame:[self.sizeUtil makeFrame:CGRectMake(15, 124, 56, 20)]];
    label.numberOfLines = 0;
    [self addSubview:label];
    
    NSMutableAttributedString *string = [[NSMutableAttributedString alloc] initWithString:@"快捷充值"attributes: @{NSFontAttributeName: [UIFont fontWithName:@"PingFangSC-Medium" size: 14*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:34/255.0 green:34/255.0 blue:34/255.0 alpha:1.0]}];
    
    label.attributedText = string;
    label.textAlignment = NSTextAlignmentLeft;
    label.alpha = 1.0;
}

-(void)initPayView{
    int pointx = 15;
    int pointy = 159;
    int width = 110;
    int height = 60;
    for (int i = 0; i < self.muchArr.count; i++) {
        int j = i % 3;
        int k = i / 3;
        [self makePayButton:[self.muchArr[i] intValue] frame:[self.sizeUtil makeFrame:CGRectMake(pointx+(117.5*j), pointy+(70.0*k), width, height)]];
    }
}

-(void)initOverLookView{
    UIView *view = [[UIView alloc] initWithFrame:[self.sizeUtil makeFrame:CGRectMake(15, 439, 345, 50)]];
    view.backgroundColor = UIColor.whiteColor;
    view.layer.borderWidth = 1;
    view.layer.borderColor = [UIColor colorWithRed:136/255.0 green:136/255.0 blue:136/255.0 alpha:1.0].CGColor;
    view.layer.cornerRadius = 3*[self.sizeUtil getHeightSize];
    view.layer.masksToBounds = YES;
    [self addSubview:view];
    
    self.payShow = [[UILabel alloc] init];
    self.payShow.numberOfLines = 0;
    [self.payShow sizeToFit];
    NSMutableAttributedString *t6 = [[NSMutableAttributedString alloc] initWithString:@"6"attributes: @{NSFontAttributeName: [UIFont fontWithName:@"PingFangSC-Regular" size: 24*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:34/255.0 green:34/255.0 blue:34/255.0 alpha:1.0]}];
    self.payShow.attributedText = t6;
    self.payShow.textAlignment = NSTextAlignmentLeft;
    self.payShow.alpha = 1.0;
    [view addSubview:self.payShow];
    __weak typeof(self) weakSelf = self;
    [self.payShow mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(view.mas_left).offset(15*[weakSelf.sizeUtil getWidthSize]);
        make.centerY.equalTo(view.mas_centerY);
    }];
    
    self.payListShow = [[UILabel alloc] init];
    self.payListShow.numberOfLines = 0;
    [self.payListShow sizeToFit];
    NSMutableAttributedString *ts6 = [[NSMutableAttributedString alloc] initWithString:@"6银两"attributes: @{NSFontAttributeName: [UIFont fontWithName:@"PingFangSC-Regular" size: 18*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:204/255.0 green:204/255.0 blue:204/255.0 alpha:1.0]}];
    self.payListShow.attributedText = ts6;
    self.payListShow.textAlignment = NSTextAlignmentRight;
    self.payListShow.alpha = 1.0;
    [self addSubview:self.payListShow];
    [self.payListShow mas_makeConstraints:^(MASConstraintMaker *make) {
        make.right.equalTo(view.mas_right).offset(-15*[self.sizeUtil getWidthSize]);
        make.centerY.equalTo(view.mas_centerY);
    }];

    
    self.freeShow = [[UILabel alloc] init];
    self.freeShow.numberOfLines = 0;
    [self.freeShow sizeToFit];
    NSMutableAttributedString *string = [[NSMutableAttributedString alloc] initWithString:@"送60嗨豆" attributes: @{NSFontAttributeName: [UIFont fontWithName:@"Helvetica" size: 14*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:245/255.0 green:162/255.0 blue:100/255.0 alpha:1.0]}];
    self.freeShow.attributedText = string;
    self.freeShow.textAlignment = NSTextAlignmentLeft;
    self.freeShow.alpha = 1.0;
    [self addSubview:self.freeShow];
    [self.freeShow mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(view.mas_left).offset(15*[weakSelf.sizeUtil getWidthSize]);
        make.top.equalTo(view.mas_bottom).offset(10*[weakSelf.sizeUtil getHeightSize]);
    }];
    
}



- (void)initPayButton{
    self.payButton = [[UIButton alloc] init];
    
    NSMutableAttributedString *string = [[NSMutableAttributedString alloc] initWithString:@"支付"attributes: @{NSFontAttributeName: [UIFont fontWithName:@"PingFangSC-Medium" size: 16*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:255/255.0 green:255/255.0 blue:255/255.0 alpha:1.0]}];
    [self.payButton setAttributedTitle:string forState:UIControlStateNormal];
    // gradient
    CAGradientLayer *gl = [CAGradientLayer layer];
    gl.frame = CGRectMake(0,0,315*[self.sizeUtil getWidthSize],50*[self.sizeUtil getHeightSize]);
    gl.startPoint = CGPointMake(1, 0.5);
    gl.endPoint = CGPointMake(0, 0.5);
    gl.colors = @[(__bridge id)[UIColor colorWithRed:68/255.0 green:206/255.0 blue:237/255.0 alpha:1.0].CGColor, (__bridge id)[UIColor colorWithRed:62/255.0 green:179/255.0 blue:241/255.0 alpha:1.0].CGColor];
    gl.locations = @[@(0), @(1.0f)];
    [self.payButton.layer addSublayer:gl];
    self.payButton.layer.cornerRadius = 25*[self.sizeUtil getHeightSize];
    self.payButton.layer.masksToBounds = YES;
    [self addSubview:self.payButton];
    __weak typeof(self) weakSelf = self;
    [self.payButton mas_makeConstraints:^(MASConstraintMaker *make) {
        if([weakSelf.sizeUtil isNotchScreen]){
            make.bottom.equalTo(weakSelf.mas_bottom).offset(-(28+35)*[weakSelf.sizeUtil getHeightSize]);
        }else{
            make.bottom.equalTo(weakSelf.mas_bottom).offset(-28*[weakSelf.sizeUtil getHeightSize]);
        }
        make.centerX.equalTo(weakSelf);
        make.width.equalTo(@(315*[weakSelf.sizeUtil getWidthSize]));
        make.height.equalTo(@(50*[weakSelf.sizeUtil getHeightSize]));
    }];
    [self.payButton addTarget:self action:@selector(payAction) forControlEvents:UIControlEventTouchUpInside];
}

-(void)makePayButton:(NSInteger)tag frame:(CGRect)frame{
    NSMutableDictionary *dic = [[NSMutableDictionary alloc] initWithCapacity:0];
    UIButton *button = [[UIButton alloc] init];
    button.tag = tag;
    button.frame = frame;
    button.layer.borderWidth = 1;
    button.layer.borderColor = [UIColor colorWithRed:136/255.0 green:136/255.0 blue:136/255.0 alpha:1.0].CGColor;
    button.layer.backgroundColor = [UIColor colorWithRed:255/255.0 green:255/255.0 blue:255/255.0 alpha:1.0].CGColor;
    button.layer.cornerRadius = 4*[self.sizeUtil getHeightSize];
    button.layer.masksToBounds = YES;
    [self addSubview:button];
    [button addTarget:self action:@selector(selectButton:) forControlEvents:UIControlEventTouchUpInside];
    
    
    UILabel *showY = [[UILabel alloc] init];
    [showY sizeToFit];
    showY.numberOfLines = 0;
    [button addSubview:showY];
    __weak typeof(self) weakSelf = self;
    [showY mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(button);
        make.top.equalTo(button.mas_top).offset(12*[weakSelf.sizeUtil getHeightSize]);
    }];
    NSString *showYT = [NSString stringWithFormat:@"%ld银两",(long)tag];
    NSMutableAttributedString *showYString = [[NSMutableAttributedString alloc] initWithString:showYT attributes: @{NSFontAttributeName: [UIFont fontWithName:@"PingFangSC-Regular" size: 16*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:136/255.0 green:136/255.0 blue:136/255.0 alpha:1.0]}];
    showY.attributedText = showYString;
    showY.textAlignment = NSTextAlignmentCenter;
    showY.alpha = 1.0;
    
    UILabel *showM = [[UILabel alloc] init];
    [showY sizeToFit];
    showM.numberOfLines = 0;
    [button addSubview:showM];
    [showM mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(button);
        make.top.equalTo(showY.mas_bottom);
    }];
    NSString *showMT = [NSString stringWithFormat:@"售价：%ld元",(long)tag];
    NSMutableAttributedString *showMString = [[NSMutableAttributedString alloc] initWithString:showMT attributes: @{NSFontAttributeName: [UIFont fontWithName:@"PingFangSC-Regular" size: 10*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:136/255.0 green:136/255.0 blue:136/255.0 alpha:1.0]}];
    
    showM.attributedText = showMString;
    showM.textAlignment = NSTextAlignmentCenter;
    showM.alpha = 1.0;
    
    [dic setObject:button forKey:@"button"];
    [dic setObject:showY forKey:@"siliver"];
    [dic setObject:showM forKey:@"price"];
    NSString *str = [NSString stringWithFormat:@"%ld",(long)tag];
    [self.muchDic setValue:dic forKey:str];
    
}

-(void)selectButton:(UIButton *)sender{
    if (self.selectTag != 0) {
        if (self.selectTag != sender.tag) {
            [self unselect:[self.muchDic objectForKey:[NSString stringWithFormat:@"%ld",(long)self.selectTag]]];
            [self didselect:[self.muchDic objectForKey:[NSString stringWithFormat:@"%ld",(long)sender.tag]] withTag:sender.tag];
            self.selectTag = sender.tag;
        }
    }else{
        [self didselect:[self.muchDic objectForKey:[NSString stringWithFormat:@"%ld",(long)sender.tag]] withTag:sender.tag];
        self.selectTag = sender.tag;
    }
    
}

-(void)unselect:(NSDictionary *)dic{
    UIButton *button = [dic objectForKey:@"button"];
    UILabel *showY = [dic objectForKey:@"siliver"];
    UILabel *showM = [dic objectForKey:@"price"];
    button.layer.borderColor = [UIColor colorWithRed:136/255.0 green:136/255.0 blue:136/255.0 alpha:1.0].CGColor;
    showY.textColor = [UIColor colorWithRed:136/255.0 green:136/255.0 blue:136/255.0 alpha:1.0];
    showM.textColor = [UIColor colorWithRed:136/255.0 green:136/255.0 blue:136/255.0 alpha:1.0];
}

-(void)didselect:(NSDictionary *)dic withTag:(NSInteger)tag{
    UIButton *button = [dic objectForKey:@"button"];
    UILabel *showY = [dic objectForKey:@"siliver"];
    UILabel *showM = [dic objectForKey:@"price"];
    button.layer.borderColor = [UIColor colorWithRed:49/255.0 green:141/255.0 blue:230/255.0 alpha:1.0].CGColor;
    showY.textColor = [UIColor colorWithRed:49/255.0 green:141/255.0 blue:230/255.0 alpha:1.0];
    showM.textColor = [UIColor colorWithRed:49/255.0 green:141/255.0 blue:230/255.0 alpha:1.0];
    
    NSMutableAttributedString *t = [[NSMutableAttributedString alloc] initWithString:[NSString stringWithFormat:@"%ld",(long)tag] attributes: @{NSFontAttributeName: [UIFont fontWithName:@"PingFangSC-Regular" size: 24*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:34/255.0 green:34/255.0 blue:34/255.0 alpha:1.0]}];
    NSMutableAttributedString *ts = [[NSMutableAttributedString alloc] initWithString:[NSString stringWithFormat:@"%ld银两",(long)tag] attributes: @{NSFontAttributeName: [UIFont fontWithName:@"PingFangSC-Regular" size: 18*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:204/255.0 green:204/255.0 blue:204/255.0 alpha:1.0]}];
    NSMutableAttributedString *tf = [[NSMutableAttributedString alloc] initWithString:[NSString stringWithFormat:@"送%ld嗨豆",(long)tag*10] attributes: @{NSFontAttributeName: [UIFont fontWithName:@"Helvetica" size: 14*[self.sizeUtil getHeightSize]],NSForegroundColorAttributeName: [UIColor colorWithRed:245/255.0 green:162/255.0 blue:100/255.0 alpha:1.0]}];
    self.payShow.attributedText = t;
    self.payListShow.attributedText = ts;
    self.freeShow.attributedText = tf;
}

-(void)backAction{
    [self.delegate goPayBack];
}

-(void)payAction{
    NSString *sID = [NSString stringWithFormat:@"high_xzxd_%ld",(long)self.selectTag];
    [self.delegate goPay:sID];
}

@end
