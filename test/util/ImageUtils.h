//
//  ImageUtils.h
//  WebViewPro
//
//  Created by Apple on 2018/8/22.
//  Copyright © 2018年 kupay. All rights reserved.
//

#ifndef ImageUtils_h
#define ImageUtils_h
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface ImageUtils:NSObject
//把图片转化为Base64字符串
+ (NSString *) image2base64:(UIImage *)image;
//去掉字符串中的所有换行符
+ (NSString *)removeSpaceAndNewline:(NSString *)str;

@end

#endif /* ImageUtils_h */
