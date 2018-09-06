#import "JSIntercept.h"

@implementation JSIntercept

+ (void)safeFile:(NSString *)path content:(NSString *)base64Str
{
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
        if(ok == NO) {
            return;
        }
        
        NSData *data = [[NSData alloc] initWithBase64EncodedString:base64Str options:0];
        BOOL isExist = [manager fileExistsAtPath:fullPath];
        if(isExist) {
            NSFileHandle *file = [NSFileHandle fileHandleForWritingAtPath:fullPath];
            if (file != nil) {
                [file writeData:data];
                [file closeFile];
            }
        } else {
            BOOL sucess = [manager createFileAtPath:fullPath contents:data attributes:nil];
            if (!sucess) {
                return;
            }
        }
    }
}

@end

