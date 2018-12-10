//
//  YNWebViewManager.m
//  WebViewPro
//
//  Created by yineng on 2018/11/29.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import "WebViewManager.h"
#import "YNWebView.h"
#import "ynWebViewController/ynWebViewController.h"

static NSMutableDictionary *webControlDic = nil;

@implementation WebViewManager

- (instancetype)init
{
    self = [super init];
    if (self) {
        if (webControlDic == nil) {
            webControlDic = [[NSMutableDictionary alloc] initWithCapacity:0];
        }
    }
    return self;
}


- (void)openWebView:(NSArray *)array{
    NSNumber *callbackId = array[0];
    NSString *webName = array[1];
    NSString *url = array[2];
    NSString *title = array[3];
    NSString *injectContent = array[4];
    JSBundle *bundle = array[5];
    if ([YNWebView getIfWebViewWithWebName:webName]) {
        [bundle callJSError:@"None" funcName:@"openWebView" msg:@"The WebView Is Already Build"];
    }else{
        [self createWKWebViewWithWebName:webName url:url title:title injectContent:injectContent];
        [bundle callJS:callbackId code:0 params:@[@""]];
    }
}

- (void)closeWebView:(NSArray *)array{
    NSNumber *callbackId = array[0];
    NSString *webName = array[1];
    JSBundle *bundle = array[2];
    //如果窗口名称为default，或者是不在hash表中时，抛出异常
    //关闭窗口时，判断窗口是否为当前窗口，如果是当前窗口就直接nav中pop到上级页面，如果不是当前窗口，如果窗口在nav中，则移除
    if ([webName isEqualToString:@"default"] || ![YNWebView getIfWebViewWithWebName:webName]) {
        [bundle callJSError:@"None" funcName:@"closeWebView" msg:@"Can Not Find The WebView"];
    }else{
        if([webControlDic objectForKey:webName] == [[BaseObject getVc] topViewController]){
            [[BaseObject getVc] popViewControllerAnimated:YES];
            [YNWebView removeWebViewWithWebName:webName];
            [WebViewManager removeViewControllerWithWebName:webName];
            [bundle callJS:callbackId code:0 params:@[@""]];
        }else{
            //获取需要删除的viewController
            //获取当前navigation控制器数组
            NSMutableArray *navArray = [[NSMutableArray alloc] initWithArray:[BaseObject getVc].viewControllers];
            for (UIViewController *viewController in navArray) {
                if (viewController == [webControlDic objectForKey:webName]) {
                    [navArray removeObject:viewController];
                    break;
                }
            }
            [BaseObject getVc].viewControllers = navArray;
            [webControlDic removeObjectForKey:webName];
            [YNWebView removeWebViewWithWebName:webName];
        }
    }
    
}

- (void)postWebViewMessage:(NSArray *)array{
    NSNumber *callbackId = array[0];
    NSString *webName = array[1];
    NSString *message = array[2];
    JSBundle *bundle = array[3];
    if ([YNWebView getIfWebViewWithWebName:webName]) {
        NSString *fullCode = [NSString stringWithFormat:@"window['onWebViewPostMessage']('%@', '%@')",[bundle getWebName],message];
        [[[YNWebView getYNWebViewInWebName:webName] getWKWebView] evaluateJavaScript:fullCode completionHandler:^(id object,NSError *error) {
            if(error != nil) {
                NSLog(@"item = %@, error = %@", object, error);
            }
        }];
        [bundle callJS:callbackId code:0 params:@[@""]];
    }else{
        [bundle callJS:callbackId code:0 params:@[@"fail"]];
    }
}


//创建一个WKwebView
/*
    webName: WKWebView的名称
    url: WKWebView的初始地址
    title: WkWebView的标题
    injectContent: WkWebView的注入内容
 */
- (void)createWKWebViewWithWebName:(NSString *)webName url:(NSString *)url title:(NSString *)title injectContent:(NSString *)injectContent{
    ynWebViewController *webViewController = [[ynWebViewController alloc] initWithWebViewName:webName url:url title:title injectContent:injectContent];
    [webControlDic setObject:webViewController forKey:webName];
    [[BaseObject getVc] pushViewController:webViewController animated:YES];
}

//删除ViewController
+ (void)removeViewControllerWithWebName:(NSString *)webName{
    [webControlDic removeObjectForKey:webName];
}

@end
