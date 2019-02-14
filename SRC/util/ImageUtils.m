//
//  ImageUtils.m
//  WebViewPro
//
//  Created by Apple on 2018/8/22.
//  Copyright © 2018年 kupay. All rights reserved.
//

#import "ImageUtils.h"

@implementation ImageUtils

+ (NSString *)image2base64:(UIImage *)image {
    NSData *data = UIImageJPEGRepresentation(image, 1.0f);
    NSString *encodedImageStr = [data base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
    return [self removeSpaceAndNewline:encodedImageStr];
}

+ (NSString *)removeSpaceAndNewline:(NSString *)str {
    NSString *temp = [str stringByReplacingOccurrencesOfString:@" " withString:@""];
    temp = [temp stringByReplacingOccurrencesOfString:@"\r" withString:@""];
    temp = [temp stringByReplacingOccurrencesOfString:@"\n" withString:@""];
    return temp;
}

+ (int)getImageWidth:(UIImage *)image {
    return (int) image.size.width;
}

+ (int)getImageHeight:(UIImage *)image {
    return (int) image.size.height;
}

+ (char *)getAhash:(UIImage *)image {
    CGImageRef cgimage = [image CGImage];
    size_t width = CGImageGetWidth(cgimage); // 图片宽度
    size_t height = CGImageGetHeight(cgimage); // 图片高度
    unsigned char *data = calloc(width * height * 4, sizeof(unsigned char)); // 取图片首地址
    size_t bitsPerComponent = 8; // r g b a 每个component bits数目
    size_t bytesPerRow = width * 4; // 一张图片每行字节数目 (每个像素点包含r g b a 四个字节)
    CGColorSpaceRef space = CGColorSpaceCreateDeviceRGB(); // 创建rgb颜色空间
    CGContextRef context = CGBitmapContextCreate(data,
            width,
            height,
            bitsPerComponent,
            bytesPerRow,
            space,
            kCGImageAlphaPremultipliedLast | kCGBitmapByteOrder32Big);
    CGContextDrawImage(context, CGRectMake(0, 0, width, height), cgimage);
    int *colorArray = malloc(width * height * sizeof(int));
    int cnt = 0;
    for (size_t i = 0; i < height; i++) {
        for (size_t j = 0; j < width; j++) {
            size_t pixelIndex = i * width * 4 + j * 4;
            unsigned char red = data[pixelIndex];
            unsigned char green = data[pixelIndex + 1];
            unsigned char blue = data[pixelIndex + 2];
            unsigned char alpha = data[pixelIndex + 3];
            int color = [self buildColorBy:alpha :red :green :blue];
            colorArray[cnt++] = color;
        }
    }
    char *result = ahashImpl(colorArray, (int) width, (int) height, 4);
    free(colorArray);
    return result;
}

+ (BOOL)saveImageIntoBox:(UIImage *)image :(NSString *)imagePath {
    NSArray *path = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *filePath = [path[0] stringByAppendingPathComponent:[NSString stringWithFormat:@"%@", imagePath]];
    BOOL result = [UIImagePNGRepresentation(image) writeToFile:filePath atomically:YES];
    return result;
}

+ (UIImage *)getDocumentImage:(NSString *)imagePath {
    NSString *path = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingPathComponent:imagePath];
    NSData *imageData = [[NSData alloc] initWithContentsOfFile:path];
    //将二进制数据转成图片
    UIImage *image = [[UIImage alloc] initWithData:imageData];
    return image;
}


/**
 * 把 ARGB 转为颜色
 * @param A alpha
 * @param R red
 * @param G green
 * @param B blue
 * @return color
 */
+ (int)buildColorBy:(char)A :(char)R :(char)G :(char)B {
    return (A << 24) | (R << 16) | (G << 8) | B;
}

@end
