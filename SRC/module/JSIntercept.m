#import "JSIntercept.h"
#import "WebViewAppDelegate.h"

@implementation JSIntercept

NSMutableDictionary *mBootFilePathDic = nil;
WKWebView *webView = nil;



- (instancetype)initWithWebView:(WKWebView *)webview
{
    self = [super init];
    if (self) {
        if (mBootFilePathDic == nil) {
            //文件中读取
            NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
            NSString *assetsPath = [docPath stringByAppendingString:@"/assets/"];
            NSString *mBootFilePath = [assetsPath stringByAppendingString:@"bootFilePaths.plist"];
            NSFileManager *manager = [NSFileManager defaultManager];
            BOOL isMBootFileExist = [manager fileExistsAtPath:mBootFilePath];
            if (!isMBootFileExist) {
                mBootFilePathDic = [[NSMutableDictionary alloc] initWithCapacity:0];
            }else{
                mBootFilePathDic = [[NSMutableDictionary alloc] initWithContentsOfFile:mBootFilePath];
            }
        }
        webView = webview;
    }
    return self;
}

- (void)saveFile:(NSString *)path content:(NSString *)base64Str listenID:(NSNumber *)listenID;{
    //如果path中包含.depend改为depend
    // 获取Document目录
    NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    NSString *assetsPath = [@"/assets/" stringByAppendingString:path];
    NSString *fullPath = [docPath stringByAppendingString:assetsPath];
    NSFileManager *manager = [NSFileManager defaultManager];
    NSString *dirPath = [fullPath substringToIndex:[fullPath rangeOfString:@"/" options:NSBackwardsSearch].location];
    //判断文件夹是否存在  不存在就创建
    BOOL filePathExist = [manager fileExistsAtPath:dirPath isDirectory:false];
    if (!filePathExist) {
        NSError *err = nil;
        BOOL ok = [manager createDirectoryAtPath:dirPath withIntermediateDirectories:YES attributes:nil error:&err];
        if (ok == NO) {
            NSLog(@"JSInterceptor, file = %@, isCreate = %d", dirPath, ok);
            return;
        }
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
    
    //判断
    NSString *mBootFilePath = [docPath stringByAppendingString:@"/assets/bootFilePaths.plist"];
    BOOL isMBootFileExist = [manager fileExistsAtPath:fullPath];
    if (!isMBootFileExist) {
        BOOL sucess = [manager createFileAtPath:mBootFilePath contents:nil attributes:nil];
        if (!sucess) {
            NSLog(@"JSInterceptor createFile failed, file = %@", fullPath);
        }
    }
    //获取文件名称
    if([path containsString:@".depend"]){
        path = [path stringByReplacingOccurrencesOfString:@".depend" withString:@"depend"];
    }
    NSString *fileName = [path substringFromIndex:[path rangeOfString:@"/" options:NSBackwardsSearch].location + 1];
    
    [mBootFilePathDic setObject:assetsPath forKey:fileName];
    [mBootFilePathDic writeToFile:mBootFilePath atomically:YES];
    
    NSString *fullCode = [NSString stringWithFormat:@"window.handle_jsintercept_callback(%d, true)", [listenID intValue]];
    [webView evaluateJavaScript:fullCode completionHandler:^(id object, NSError *error) {
        if (error != nil) {
            NSLog(@"item = %@, error = %@", object, error);
        }
    }];
}

- (void)restartApp{
    exit(0);
}

- (void)getBootFiles:(NSNumber *)listenID{
    NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    NSMutableDictionary *fullDic = [[NSMutableDictionary alloc] initWithCapacity:0];
    NSArray *keys = [mBootFilePathDic allKeys];
    for (NSString *key in keys) {
        NSString *value = [docPath stringByAppendingString:[mBootFilePathDic objectForKey:key]];
        NSData *data = [[NSData alloc] initWithContentsOfFile:value];
        NSString *bs64data = [data base64EncodedStringWithOptions:0];
        [fullDic setObject:bs64data forKey:key];
    }
    NSData * jsonData = [NSJSONSerialization dataWithJSONObject:fullDic options:NSJSONWritingSortedKeys error:nil];
    NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    NSString *fullCode = [NSString stringWithFormat:@"window.handle_jsintercept_callback(%d, true, '%@')", [listenID intValue],jsonString];
    [webView evaluateJavaScript:fullCode completionHandler:^(id object, NSError *error) {
        if (error != nil) {
            NSLog(@"item = %@, error = %@", object, error);
        }
    }];
}

//上传版本号
- (void)getVersionId:(NSArray *)array{
    NSNumber *listenID = [array objectAtIndex:0];
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSString *app_Version = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
    NSString *fullCode = [NSString stringWithFormat:@"window.handle_jsintercept_callback(%d, true, '%@')", [listenID intValue],app_Version];
    [webView evaluateJavaScript:fullCode completionHandler:^(id object, NSError *error) {
        if (error != nil) {
            NSLog(@"item = %@, error = %@", object, error);
        }
    }];
}

//执行安装请求
- (void)appUpdate:(NSArray *)array{
    NSString *url = array[0];
    if (@available(iOS 10.0, *)) {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url] options:@{} completionHandler:nil];
    } else {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]];
    }
    [self restartApp];
}


@end

