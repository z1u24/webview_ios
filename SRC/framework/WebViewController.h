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

//#define URL_PATH @"https://www.baidu.com/"
//#define URL_PATH @"http://192.168.33.183:8088/dst/boot/index.html"
//#define URL_PATH @"http://192.168.9.29:80/wallet/app/boot/index.html"
//#define URL_PATH @"http://47.75.254.166:8080/wallet/app/boot/index.html"
//#define URL_PATH @"http://192.168.9.24:8088/dst/boot/index.html;

//#define URL_PATH @"http://47.244.29.209/wallet/app/boot/index.html"

//#define URL_PATH @"http://192.168.9.15/wallet/app/boot/index.html"

#define URL_PATH @"/wallet/app/boot/index.html"
//#define URL_PATH @"https://xiangyuecn.github.io/Recorder/"
//#define URL_PATH @"http://192.168.9.28:8088/recorder/index.html"
//#define URL_PATH @"http://yxl.github.io/opencore-amr-js/"
@interface WebViewController : UIViewController
+(instancetype)sharedInstence;
@end

