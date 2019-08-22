//
//  AFNetWorking_Extension.h
//  WebViewPro
//
//  Created by cifer on 2019/4/19.
//  Copyright © 2019 kuplay. All rights reserved.
//
@interface AFHTTPSessionManager (Extension)
- (NSURLSessionDataTask *)zhHttpRequestWithUrl:(NSString *)URLString
                                        method:(NSString *) method
                                    parameters:(id)parameters
                                      httpBody:(NSData *)httpBody
                                      progress:(void (^)(NSProgress * _Nonnull))downloadProgress
                                       success:(void (^)(NSURLSessionDataTask * _Nonnull, id _Nullable))success
                                       failure:(void (^)(NSURLSessionDataTask * _Nullable, NSError * _Nonnull))failure;

@end
