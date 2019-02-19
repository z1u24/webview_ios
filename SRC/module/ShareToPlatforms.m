//
//  ShareToPlatforms.m
//  WebViewPro
//
//  Created by Apple on 2018/8/23.
//  Copyright © 2018年 kupay. All rights reserved.
//
#import "ShareToPlatforms.h"

const static int PLATFORM_ALL = -1;//分享的平台 所有 注：当传递这个参数的时候、会直接调用原生的分享菜单
const static int PLATFORM_WE_CHAT = 1;//分享的平台 微信好友
const static int PLATFORM_MOMENTS = 2;//分享的平台 朋友圈
const static int PLATFORM_Q_ZONE = 3;//分享的平台 QQ空间
const static int PLATFORM_QQ = 4;//分享的平台 QQ
const static int PLATFORM_LINE = 5;//分享的平台 LINE
const static int SHARE_TYPE_IAMGE = 1;//分享的类型图片
const static int SHARE_TYPE_TEXT = 2;//分享的类型文本

@implementation ShareToPlatforms{
    CallJS selcallJS;
}

- (void)shareLink:(NSString *)url title:(NSString *)title content:(NSString *)content platform:(NSNumber *)platform callJS:(CallJS)callJS{
    NSMutableDictionary *shareParams = [NSMutableDictionary dictionary];
    [shareParams SSDKSetupShareParamsByText:content
                                     images:[[NSBundle mainBundle] pathForResource:@"icon" ofType:@"png"]
                                        url:[NSURL URLWithString:url]
                                      title:title
                                       type:SSDKContentTypeAuto];
    //有的平台要客户端分享需要加此方法，例如微博
    [shareParams SSDKEnableUseClientShare];
    SSDKPlatformType type = [self getSharePlatform:[platform intValue]];
    selcallJS = callJS;
    if (SSDKPlatformTypeUnknown == type) {
        [self showShareActionMenu:shareParams];
    } else {
        [self share:shareParams ToPlatform:type];
    }
}

/**
 * 根据高层传递的参数、决定要分享到哪个平台
 */
- (SSDKPlatformType)getSharePlatform:(int)value {
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
- (void)share:(NSMutableDictionary *)shareParams ToPlatform:(SSDKPlatformType)platformType{
    [ShareSDK share:platformType parameters:shareParams onStateChanged:^(SSDKResponseState state, NSDictionary *userData, SSDKContentEntity *contentEntity, NSError *error) {
        switch (state) {
            //分享成功
            case SSDKResponseStateSuccess:
                NSLog(@"分享成功");
                self->selcallJS(Success,@[@"分享成功"]);
                break;
                //分享失败
            case SSDKResponseStateFail:
                NSLog(@"%@", error);
                self->selcallJS(Fail,@[@"分享失败"]);
                break;
                //分享取消
            case SSDKResponseStateCancel:
                self->selcallJS(Fail,@[@"分享取消"]);
                break;
            default:
                break;
        }
    }];
}

/**
 * 执行分享操作(显示分享的菜单)
 */
- (void)showShareActionMenu:(NSMutableDictionary *)shareParams{
    [ShareSDK showShareActionSheet:nil
                             items:nil
                       shareParams:shareParams
               onShareStateChanged:^(SSDKResponseState state, SSDKPlatformType platformType, NSDictionary *userData, SSDKContentEntity *contentEntity, NSError *error, BOOL end) {
                   switch (state) {
                       case SSDKResponseStateSuccess: {
                           self->selcallJS(Success,@[@"success"]);
                           break;
                       }
                       case SSDKResponseStateFail: {
                           NSLog(@"%@", error);
                           self->selcallJS(Fail,@[@"failed"]);
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
- (void)shareContent:(NSString *)content shareType:(NSNumber *)shareType platform:(NSNumber *)platform callJS:(CallJS)callJS {
    self->selcallJS = callJS;
    NSMutableDictionary *shareParams = [NSMutableDictionary dictionary];
    if (SHARE_TYPE_IAMGE == [shareType intValue]) {
        //分享图片
        UIImage *avatar = [UIImage imageNamed:@"shareImg.png"];
        [HMScannerController cardImageWithCardName:content avatar:avatar scale:0.2 completion:^(UIImage *image) {
            [shareParams SSDKSetupShareParamsByText:@"分享内容"
                                             images:image
                                                url:nil
                                              title:@"图片"
                                               type:SSDKContentTypeImage];
            dispatch_async(dispatch_get_main_queue(), ^{
                SSDKPlatformType platformType = [self getSharePlatform:[platform intValue]];
                if (SSDKPlatformTypeUnknown == platformType) {
                    [self showShareActionMenu:shareParams];
                } else {
                    [self share:shareParams ToPlatform:platformType];
                }
            });
        }];
    } else if (SHARE_TYPE_TEXT == [shareType intValue]) {
        //分享文本
        [shareParams SSDKSetupShareParamsByText:content
                                         images:@""
                                            url:nil
                                          title:@"图片"
                                           type:SSDKContentTypeText];
        dispatch_async(dispatch_get_main_queue(), ^{
            SSDKPlatformType platformType = [self getSharePlatform:[platform intValue]];
            if (SSDKPlatformTypeUnknown == platformType) {
                [self showShareActionMenu:shareParams];
            } else {
                [self share:shareParams ToPlatform:platformType];
            }
        });
    }
}

- (void)getScreenShot:(CallJS)callJS{
    UIGraphicsBeginImageContextWithOptions([BaseObject getVc].view.bounds.size, YES, 0);
    [[BaseObject getVc].view drawViewHierarchyInRect:[BaseObject getVc].view.bounds afterScreenUpdates:YES];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    BOOL success = [ImageUtils saveImageIntoBox:image :@"share_screen_image.png"];
    if (success) {
        callJS(Success,@[@""]);
    } else {
        callJS(Fail,@[@""]);
    }
}

- (void)shareScreen:(NSNumber *)platform callJS:(CallJS)callJS{
    self->selcallJS = callJS;
    NSMutableDictionary *shareParams = [NSMutableDictionary dictionary];
    UIImage *image = [ImageUtils getDocumentImage:@"share_screen_image.png"];
    [shareParams SSDKSetupShareParamsByText:@""
                                     images:image
                                        url:nil
                                      title:@""
                                       type:SSDKContentTypeImage];
    SSDKPlatformType platformType = [self getSharePlatform:[platform intValue]];
    if (SSDKPlatformTypeUnknown == platformType) {
        [self showShareActionMenu:shareParams];
    } else {
        [self share:shareParams ToPlatform:platformType];
    }
}


@end
