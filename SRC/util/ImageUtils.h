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
#import <CoreGraphics/CoreGraphics.h>
#import <UIKit/UIKit.h>
#include "ahash.h"

@interface ImageUtils : NSObject
/**
 * 把图片转化为Base64字符串
 * @param image 被执行操作的图片
 * @return Base64字符串
 */
+ (NSString *)image2base64:(UIImage *)image;

/**
 * 去掉字符串中的所有换行符
 * @param str 被执行操作的字符串
 * @return 去除换行符之后的字符串
 */
+ (NSString *)removeSpaceAndNewline:(NSString *)str;

/**
 * 获取图片的宽度
 * @param image 图片
 * @return 图片的宽度
 */
+ (int)getImageWidth:(UIImage *)image;

/**
 * 获取图片的高度
 * @param image 图片
 * @return 图片的高度
 */
+ (int)getImageHeight:(UIImage *)image;

/**
 * 获取图片的颜色
 * @param image 图片
 * @return 图片的颜色(ARGB)
 */
+ (char *)getAhash:(UIImage *)image;

/**
 * 把图片存到沙盒当中
 * @param image 要保存的图片
 * @return 保存成功返回true
 */
+ (BOOL)saveImageIntoBox:(UIImage *)image :(NSString *)imagePath;

/**
 * 从沙盒中取出图片
 * @param imagePath 图片的路径
 * @return 图片
 */
+ (UIImage *)getDocumentImage:(NSString *)imagePath;

@end

#endif /* ImageUtils_h */
