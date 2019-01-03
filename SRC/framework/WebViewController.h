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

#define URL_PATH @"/wallet/app/boot/index.html"
//#define URL_PATH @"/dst/boot/index.html"

@interface WebViewController : UIViewController
+(instancetype)sharedInstence;
- (void)stopTimer;
- (void)startTimer;
@end

