//
//  ZHWebSocket.m
//  WebViewPro
//
//  Created by cifer on 2019/4/22.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "WebSocketManger.h"

@implementation WebSocketManger

@synthesize onopen;

@synthesize onmessage;

@synthesize onclose;

@synthesize onerror;

+ (WebSocketManger *)getWebSocket:(NSString *)str {
    return [[WebSocketManger alloc]initWithUrl:str];
}

- (instancetype)initWithUrl:(NSString *)str {
    self = [super init];
    NSURL * url = [[NSURL alloc]initWithString:str];
    self.webSocket = [[SRWebSocket alloc]initWithURL:url];
    self.webSocket.delegate = self;
    [self.webSocket open];
    return self;
}

- (void)send:(JSValue *)str WithType:(JSValue *)type  {
    if ([type.toString isEqualToString:@"string"]) {
        [self.webSocket send: str.toString];
    }else if ([type.toString isEqualToString:@"bin"]){
        NSData *data = [[NSData alloc] initWithBase64EncodedString:str.toString options:0];
        [self.webSocket send: data];
    }
}

-(void)close {
    NSLog(@"关闭了socket");
    [self.webSocket close];
}

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message {
    NSString * type = @"string";
    if ([message isKindOfClass:[NSString class]]) {
        
    }else if ([message isKindOfClass:[NSData class]]) {
        NSData *base64Data = [message base64EncodedDataWithOptions:0];
        NSString *baseString = [[NSString alloc]initWithData:base64Data encoding:NSUTF8StringEncoding];
        message = baseString;
        type = @"bin";
    }
    NSDictionary * dic = @{@"data":message,@"type":type};
    [onmessage callWithArguments:@[dic,type]];
}
- (void)webSocketDidOpen:(SRWebSocket *)webSocket {
    [onopen callWithArguments:@[]];
}
- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error {
    NSDictionary * dic = @{@"code":@0,@"reason":error.description};
    [onerror callWithArguments:@[dic]];
    [onclose callWithArguments:@[dic]];
}
- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean {
    NSNumber *n = [[NSNumber alloc]initWithInteger:code];
    NSDictionary * dic = @{@"code":n,@"reason":@""};
    [onclose callWithArguments:@[dic]];
}

@end
