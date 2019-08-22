//
//  ZHWebSocket.h
//  WebViewPro
//
//  Created by cifer on 2019/4/22.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <JavaScriptCore/JavaScriptCore.h>
#import "SocketRocket.h"

@class WebSocketManger;
@protocol WebSocketExports <JSExport, NSObject>
+ (WebSocketManger *) getWebSocket:(NSString *)str;
-(void) send:(JSValue *)str WithType:(JSValue *)type;
-(void) close;
@property(strong, nonatomic) JSValue * onopen;
@property(strong, nonatomic) JSValue * onmessage;
@property(strong, nonatomic) JSValue * onclose;
@property(strong, nonatomic) JSValue * onerror;
- (instancetype)initWithUrl:(NSString *)str;
@end

@interface WebSocketManger : NSObject<WebSocketExports,SRWebSocketDelegate>
@property(strong, nonatomic) SRWebSocket * webSocket;
@end
