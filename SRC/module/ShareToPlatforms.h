//
//  ShareToPlatforms.h
//  WebViewPro
//
//  Created by Apple on 2018/8/23.
//  Copyright © 2018年 kupay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Foundation/Foundation.h>
#import <ShareSDK/ShareSDK.h>
#import <ShareSDKUI/ShareSDK+SSUI.h>
#import "HMScannerController.h"
#import "ImageUtils.h"
#import "BaseObject.h"

typedef void (^CallJS)(CallJSType callJSType, NSArray *params);

@interface ShareToPlatforms : BaseObject
/**
 * 分享链接
 */
- (void)shareLink:(NSString *)url title:(NSString *)title content:(NSString *)content platform:(NSNumber *)platform callJS:(CallJS)callJS;

/**
 * 分享内容
 */
- (void)shareContent:(NSString *)content shareType:(NSNumber *)shareType platform:(NSNumber *)platform callJS:(CallJS)callJS;

/**
 * 获取屏幕的截图
 */
- (void)getScreenShot:(CallJS)callJS;


//分享截屏
- (void)shareScreen:(NSNumber *)platform callJS:(CallJS)callJS;

@end
