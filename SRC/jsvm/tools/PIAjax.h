//
//  PIAjax.h
//  WebViewPro
//
//  Created by yineng on 2019/7/16.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "callBack.h"
#import "URLSessionDataTask.h"

@interface PIAjax : NSObject
-(URLSessionDataTask *)request:(NSString *)type inputUrl:(NSString *)url header:(NSDictionary *)header reqData:(NSString *)reqData reqType:(NSString *)reqType success:(callBack)success fail:(callBack)fail progress:(callBack)progress;
@end

