//
//  FileManager.h
//  WebViewPro
//
//  Created by yineng on 2018/12/4.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import "BaseObject.h"

NS_ASSUME_NONNULL_BEGIN

@interface FileManager : BaseObject

+ (NSString *)getDocumentsPath;

+ (void)saveFile:(NSString *)path content:(NSString *)base64Str;

+ (NSData *)getFile:(NSString *)path;

@end

NS_ASSUME_NONNULL_END
