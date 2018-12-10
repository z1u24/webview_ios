//
//  ViewController.h
//  test
//
//  Created by yineng on 2018/8/7.
//  Copyright © 2018年 kupay. All rights reserved.
//
#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>
#import "JSBundle.h"
#import "YNWebView.h"


//#define URL_PATH @"/dst/boot/index.html"
#define URL_PATH @"/wallet/app/boot/index.html"
//#define URL_Referer @"http://192.168.9.28"
//#define URL_PATH @"http://app.herominer.net/wallet/app/boot/index.html"


@interface WebViewController : UIViewController
+(instancetype)sharedInstence;
@end

