//
//  AFNetWorking_Extension.m
//  WebViewPro
//
//  Created by cifer on 2019/4/19.
//  Copyright © 2019 kuplay. All rights reserved.
//
#import "AFNetwork.h"

@implementation AFHTTPSessionManager (Extension)

- (NSURLSessionDataTask *)zhHttpRequestWithUrl:(NSString *)URLString
                                        method:(NSString *) method
                                    parameters:(id)parameters
                                      httpBody:(NSData *)httpBody
                                      progress:(void (^)(NSProgress * _Nonnull))downloadProgress
                                       success:(void (^)(NSURLSessionDataTask * _Nonnull, id _Nullable))success
                                       failure:(void (^)(NSURLSessionDataTask * _Nullable, NSError * _Nonnull))failure

{
    
    NSError *serializationError = nil;
    NSMutableURLRequest *request = [self.requestSerializer requestWithMethod:method URLString:[[NSURL URLWithString:URLString relativeToURL:self.baseURL] absoluteString] parameters:parameters error:&serializationError];
    if (serializationError) {
        if (failure) {
            dispatch_async(self.completionQueue ?: dispatch_get_main_queue(), ^{
                failure(nil, serializationError);
            });
        }
        return nil;
    }
    [request setHTTPBody:httpBody];
    __block NSURLSessionDataTask *dataTask = nil;
    dataTask = [self dataTaskWithRequest:request uploadProgress:nil downloadProgress:downloadProgress completionHandler:^(NSURLResponse * __unused response, id responseObject, NSError *error)  {
        if (error) {
            if (failure) {
                failure(dataTask, error);
            }
        } else {
            if (success) {
                success(dataTask, responseObject);
            }
        }
    }];
    [dataTask resume];
    return dataTask;
}

@end
