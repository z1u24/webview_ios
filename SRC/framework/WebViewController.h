//
//  ViewController.h
//  test
//
//  Created by yineng on 2018/8/7.
//  Copyright © 2018年 kupay. All rights reserved.
//
#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>
#import "JSBridge.h"
#import "YNWebView.h"
#import "JSIntercept.h"

@interface WebViewController : UIViewController

@property (nonatomic, strong)NSTimer *timer;
@property (nonatomic, strong)YNWebView *ynWebView;
@property (nonatomic, strong)JSIntercept *intercept;
@property (nonatomic, strong)JSBridge *bridge;
@property (nonatomic, strong)NSNumber *isUpdate;

+(instancetype)sharedInstence;
+ (NSString *)getURLFromInfo;
- (void)stopTimer;
- (void)startTimer;
- (BOOL)isWebViewKilled;
-(void)setWebViewKilled:(BOOL)ki;
@end

