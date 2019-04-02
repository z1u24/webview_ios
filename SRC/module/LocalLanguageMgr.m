//
//  LocalLanguageMgr.m
//  WebViewPro
//
//  Created by yineng on 2019/3/8.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "LocalLanguageMgr.h"
#define LANGUAGE_SYSTEM  1
#define LANGUAGE_CHINESE_SIMPLIFY  2
#define LANGUAGE_CHINESE_TRADITIONAL  3
#define LANGUAGE_ENGLISH  4
#define LANGUAGE_JAPANESE  5

@implementation LocalLanguageMgr

-(void)getSystemLanguage:(CallJS)callJS{
    //默认是简体中文
    NSNumber *result = [[NSNumber alloc] initWithInt:LANGUAGE_CHINESE_SIMPLIFY];
    NSString *countryCode = [NSString stringWithFormat:@"-%@", [[NSLocale currentLocale] objectForKey:NSLocaleCountryCode]];
    NSString *languageCode = [NSLocale preferredLanguages][0];
    if (languageCode) {
        languageCode = [languageCode stringByReplacingOccurrencesOfString:countryCode withString:@""];
    }
    if ([languageCode isEqualToString:@"zh-Hans"]){
        result = [[NSNumber alloc] initWithInt:LANGUAGE_CHINESE_SIMPLIFY];
    }else if ([languageCode isEqualToString:@"zh-Hant"]){
        result = [[NSNumber alloc] initWithInt:LANGUAGE_CHINESE_TRADITIONAL];
    }else if ([languageCode isEqualToString:@"en"]){
        result = [[NSNumber alloc] initWithInt:LANGUAGE_ENGLISH];
    }else if ([languageCode isEqualToString:@"ja"]){
        result = [[NSNumber alloc] initWithInt:LANGUAGE_JAPANESE];
    }
    callJS(Success,@[result]);
}

-(void)getAppLanguage:(CallJS)callJS{
    
}

-(void)setAppLanguage:(CallJS)callJS{
    
}

@end
