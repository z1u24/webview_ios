//
//  PIAjax.m
//  WebViewPro
//
//  Created by yineng on 2019/7/16.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "PIAjax.h"
#import "AFNetwork.h"
#import "AFNetWorking_Extension.h"
@implementation PIAjax{
    AFHTTPSessionManager *_afManager;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _afManager = [[AFHTTPSessionManager alloc] init];
    }
    return self;
}

-(URLSessionDataTask *)request:(NSString *)type inputUrl:(NSString *)url header:(NSDictionary *)header reqData:(NSString *)reqData reqType:(NSString *)reqType success:(callBack)success fail:(callBack)fail progress:(callBack)progress{
    //        NSString *url = @"www.baidu.com";
    //  尝试使用唯一对象，不行再打开注释新建
    //    AFHTTPSessionManager * _afManager = [[AFHTTPSessionManager alloc]init];
    _afManager.requestSerializer = [AFJSONRequestSerializer serializer];
    [_afManager setResponseSerializer:[AFHTTPResponseSerializer serializer]]; // 设置不自动解析数据∂
    for (int i = 0; i<header.allKeys.count; i++) {
        NSString * key = header.allKeys[i];
        NSString * value = [header objectForKey:key];
        [_afManager.requestSerializer setValue:value forHTTPHeaderField:key]; // 添加请求头
    }
    NSData *body = nil;
    if ([type isEqualToString:@"POST"]) {
        if([reqType isEqualToString:@"bin"]){
            body = [[NSData alloc] initWithBase64EncodedString:reqData options:0];
        }else if([reqType isEqualToString:@"json"]){
            body = [NSJSONSerialization dataWithJSONObject:reqData options:NSJSONWritingPrettyPrinted error:nil];
        }else{
            body = [reqData dataUsingEncoding:NSUTF8StringEncoding];
        }
    }
    NSURLSessionTask * task = [_afManager zhHttpRequestWithUrl:url method:type parameters:@{} httpBody:body progress:^(NSProgress * p) {
        NSNumber * complete = [[NSNumber alloc]initWithLong:p.completedUnitCount];
        NSNumber * total = [[NSNumber alloc]initWithLong:p.totalUnitCount];
        //            NSLog(@"完成进度=%@，总进度=%@",complete,total);
        progress(@[complete,total]);
    } success:^(NSURLSessionDataTask * task, id data) {
        success(@[data]);
    } failure:^(NSURLSessionDataTask * task, NSError * error) {
        NSString *dispretion = [NSString stringWithFormat:@"请求失败%@",error.description];
        //            NSLog(@"请求失败%@",error.description);
        fail(@[dispretion]);
    }];
    URLSessionDataTask *obj = [[URLSessionDataTask alloc] initWithTask:task];
    return obj;
}


@end
