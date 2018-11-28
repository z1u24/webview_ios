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

@interface ShareToPlatforms : BaseObject
/**
 * 分享链接
 * @param array TS传入参数
 */
- (void)shareLink:(NSArray *)array;

/**
 * 分享内容
 * @param array TS传入参数
 */
- (void)shareContent:(NSArray *)array;

/**
 * 获取屏幕的截图
 * @param array TS传入参数
 */
- (void)getScreenShot:(NSArray *)array;

/**
 * 分享截屏
 * @param array TS传入参数
 */
- (void)shareScreen:(NSArray *)array;

@end
