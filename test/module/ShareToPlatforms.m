//
//  ShareToPlatforms.m
//  WebViewPro
//
//  Created by Apple on 2018/8/23.
//  Copyright © 2018年 kupay. All rights reserved.
//
#import <ShareSDK/ShareSDK.h>
#import <ShareSDKUI/ShareSDK+SSUI.h>
#import "HMScannerController.h"
#import "ShareToPlatforms.h"
const static int PLATFORM_ALL = -1;//分享的平台 所有 注：当传递这个参数的时候、会直接调用原生的分享菜单
const static int PLATFORM_WE_CHAT = 1;//分享的平台 微信好友
const static int PLATFORM_MOMENTS = 2;//分享的平台 朋友圈
const static int PLATFORM_Q_ZONE = 3;//分享的平台 QQ空间
const static int PLATFORM_QQ = 4;//分享的平台 QQ
const static int PLATFORM_LINE = 5;//分享的平台 LINE
const static int SHARE_TYPE_IAMGE = 1;//分享的类型图片
const static int SHARE_TYPE_TEXT = 2;//分享的类型文本
@implementation ShareToPlatforms
- (void) shareLink: (NSArray *) array{
    NSNumber *callbackId=[array objectAtIndex:0];
    NSString *webName=[array objectAtIndex:1];
    NSString *url=[array objectAtIndex:2];
    NSString *title=[array objectAtIndex:3];
    NSString *content=[array objectAtIndex:4];
    NSString *comment=[array objectAtIndex:5];
    int platform=[[array objectAtIndex:6] intValue];
    NSMutableDictionary *shareParams = [NSMutableDictionary dictionary];
    [shareParams SSDKSetupShareParamsByText:content
                                     images:[UIImage imageNamed:@"icon"]
                                        url:[NSURL URLWithString:url]
                                      title:title
                                       type:SSDKContentTypeAuto];
    //有的平台要客户端分享需要加此方法，例如微博
    [shareParams SSDKEnableUseClientShare];
    SSDKPlatformType type = [self getSharePlatform:platform];
    if (SSDKPlatformTypeUnknown == type) {
        [self showShareActionMenu:shareParams :callbackId];
    }else{
        [self share:shareParams ToPlatform:type :callbackId];
    }
}
/**
 * 根据高层传递的参数、决定要分享到哪个平台
 */
- (SSDKPlatformType) getSharePlatform:(int) value{
    switch (value) {
        case PLATFORM_WE_CHAT:
            return SSDKPlatformSubTypeWechatSession;
        case PLATFORM_MOMENTS:
            return SSDKPlatformSubTypeWechatTimeline;
        case PLATFORM_Q_ZONE:
            return SSDKPlatformSubTypeQZone;
        case PLATFORM_QQ:
            return SSDKPlatformTypeQQ;
        case PLATFORM_LINE:
            return SSDKPlatformTypeLine;
        case PLATFORM_ALL:
        default:
            return SSDKPlatformTypeUnknown;
    }
}
/**
 * 执行分享操作(分享到指定的平台)
 */
- (void) share:(NSMutableDictionary *)shareParams ToPlatform:(SSDKPlatformType)platformType:(NSNumber *) callbackId{
    [ShareSDK share:platformType parameters:shareParams onStateChanged:^(SSDKResponseState state, NSDictionary *userData, SSDKContentEntity *contentEntity, NSError *error) {
        switch (state) {
                //分享成功
            case SSDKResponseStateSuccess:
                [JSBundle callJS:callbackId code:0 params:[NSArray arrayWithObjects:@"分享成功",nil]];
                break;
                //分享失败
            case SSDKResponseStateFail:
                [JSBundle callJS:callbackId code:1 params:[NSArray arrayWithObjects:@"分享失败",nil]];
                break;
                //分享取消
            case SSDKResponseStateCancel:
                [JSBundle callJS:callbackId code:1 params:[NSArray arrayWithObjects:@"分享取消",nil]];
                break;
            default:
                break;
        }
    }];
}

/**
 * 执行分享操作(显示分享的菜单)
 */
- (void) showShareActionMenu:(NSMutableDictionary *)shareParams:(NSNumber *)callbackId{
    [ShareSDK showShareActionSheet:nil
                             items:nil
                       shareParams:shareParams
               onShareStateChanged:^(SSDKResponseState state, SSDKPlatformType platformType, NSDictionary *userData, SSDKContentEntity *contentEntity, NSError *error, BOOL end) {
                   switch (state) {
                       case SSDKResponseStateSuccess:{
                           [JSBundle callJS:callbackId code:0 params:[NSArray arrayWithObjects:@"success",nil]];
                           break;
                       }
                       case SSDKResponseStateFail:{
                           [JSBundle callJS:callbackId code:1 params:[NSArray arrayWithObjects:@"failed",nil]];
                           break;
                       }
                       default:
                           break;
                   }
               }
     ];
}
/**
 * 分享图片或者文本
 */
- (void) shareContent: (NSArray *) array{
    NSNumber *callbackId = [array objectAtIndex:0];//回调id
    NSString *content=[array objectAtIndex:1];//要分享的内容
    int shareType = [[array objectAtIndex:2] intValue];//用于判断分享的类型(1 是图片  2是文本)
    int platform = [[array objectAtIndex:3] intValue];//要分享到的平台
    NSMutableDictionary *shareParams = [NSMutableDictionary dictionary];
    if (SHARE_TYPE_IAMGE == shareType) {
        //分享图片
        UIImage *avatar = [UIImage imageNamed:@""];
        [HMScannerController cardImageWithCardName:content avatar:avatar scale:0.2 completion:^(UIImage *image){
            [shareParams SSDKSetupShareParamsByText:@""
                                             images:image
                                                url:nil
                                              title:nil
                                               type:SSDKContentTypeImage];
        }];
    }else if (SHARE_TYPE_TEXT == shareType){
        //分享文本
        [shareParams SSDKSetupShareParamsByText:content
                                         images:nil
                                            url:nil
                                          title:nil
                                           type:SSDKContentTypeText];
    }
    SSDKPlatformType platformType = [self getSharePlatform:platform];
    if (SSDKPlatformTypeUnknown == platformType) {
        [self showShareActionMenu:shareParams :callbackId];
    }else{
        [self share:shareParams ToPlatform:platformType :callbackId];
    }
}

@end
