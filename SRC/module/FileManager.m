//
//  FileManager.m
//  WebViewPro
//
//  Created by yineng on 2018/12/4.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import "FileManager.h"

@implementation FileManager

+ (NSString *)getDocumentsPathWithPath:(NSString *)assetsPath fileName:(NSString *)fileName{
    NSString *path = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    path = [path stringByAppendingString:assetsPath];
    return path;
}


@end
