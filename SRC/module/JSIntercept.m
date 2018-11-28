#import "JSIntercept.h"
#import "WebViewController.h"

@implementation JSIntercept

+ (void)safeFile:(NSString *)path content:(NSString *)base64Str saveID:(NSNumber *)saveID {
    // 获取Document目录
    NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    NSString *fullPath = [docPath stringByAppendingString:@"/assets/"];
    fullPath = [fullPath stringByAppendingString:path];

    NSFileHandle *file = [NSFileHandle fileHandleForWritingAtPath:fullPath];
    if (file == nil) {
        NSError *err = nil;
        NSString *dirPath = [fullPath substringToIndex:[fullPath rangeOfString:@"/" options:NSBackwardsSearch].location];

        NSFileManager *manager = [NSFileManager defaultManager];

        BOOL ok = [manager createDirectoryAtPath:dirPath withIntermediateDirectories:YES attributes:nil error:&err];
        if (ok == NO) {
            return;
        }

        NSData *data = [[NSData alloc] initWithBase64EncodedString:base64Str options:0];
        BOOL isExist = [manager fileExistsAtPath:fullPath];
        NSLog(@"JSInterceptor, file = %@, isExist = %d", fullPath, isExist);
        if (isExist) {
            NSFileHandle *file = [NSFileHandle fileHandleForWritingAtPath:fullPath];
            if (file != nil) {
                [file writeData:data];
                [file closeFile];
            }
        } else {
            BOOL sucess = [manager createFileAtPath:fullPath contents:data attributes:nil];
            if (!sucess) {
                NSLog(@"JSInterceptor createFile failed, file = %@", fullPath);
            }
        }

        NSString *fullCode = [NSString stringWithFormat:@"window.handle_update_save('%d')", saveID.intValue];
        WKWebView *webview = [WebViewController getWebView];
        [webview evaluateJavaScript:fullCode completionHandler:^(id object, NSError *error) {
            if (error != nil) {
                NSLog(@"item = %@, error = %@", object, error);
            }
        }];
    }
}

@end

