#import "JSIntercept.h"
#import "WebViewAppDelegate.h"




@implementation JSIntercept

NSNumber *isUpdate = 0;
NSMutableDictionary *mBootFilePathDic = nil;
WKWebView *webView = nil;

- (instancetype)initWithWebView:(WKWebView *)webview update:(NSNumber *)update
{
    self = [super init];
    if (self) {
        isUpdate = update;
        if (mBootFilePathDic == nil) {
            //文件中读取
            NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
            NSString *apkPath = [docPath stringByAppendingString:@"/apkback/"];
            NSString *mBootFilePath = [apkPath stringByAppendingString:@"bootFilePaths.plist"];
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
    NSString *mBootFilePath = [docPath stringByAppendingString:@"/apkback/bootFilePaths.plist"];
    NSString *apkPath = [mBootFilePath substringToIndex:[fullPath rangeOfString:@"/" options:NSBackwardsSearch].location];
    //判断文件夹是否存在  不存在就创建
    BOOL isDirectory = YES;
    BOOL apkPathExist = [manager fileExistsAtPath:apkPath isDirectory:&isDirectory];
    if (!apkPathExist) {
        NSError *err = nil;
        BOOL ok = [manager createDirectoryAtPath:apkPath withIntermediateDirectories:NO attributes:nil error:&err];
        if (ok == NO) {
            NSLog(@"JSInterceptor, file = %@, isCreate = %d", dirPath, ok);
            return;
        }
    }
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
    NSString *fileName = [path containsString:@"/"]?[path substringFromIndex:[path rangeOfString:@"/" options:NSBackwardsSearch].location + 1] : path;
    
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
    NSString *URL_PATH = [WebViewController getURLFromInfo];
    
    NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    NSLog(@"%@",docPath);
    NSString *path = [docPath stringByAppendingString:@"/assets"];
    NSString *fullPath = [path stringByAppendingString:URL_PATH];
    NSFileHandle *file = [NSFileHandle fileHandleForReadingAtPath:fullPath];
    NSData *data = nil;
    if (file != nil) {
        data = [file readDataToEndOfFile];
        [file closeFile];
    }
    if (data == nil) {
        path = [@"assets" stringByAppendingString:URL_PATH];
        fullPath = [[NSBundle mainBundle] pathForResource:path ofType:nil];
        file = [NSFileHandle fileHandleForReadingAtPath:fullPath];
        if (file != nil) {
            NSLog(@"file is read, %@", path);
            data = [file readDataToEndOfFile];
            [file closeFile];
        } else {
            NSLog(@"file isn't found: %@", path);
        }
    }
    //path = [@"assets" stringByAppendingString:strUrl];
    NSString *utf = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    NSString *url = [@"file://" stringByAppendingString:fullPath];
    [webView loadHTMLString:utf baseURL:[NSURL URLWithString:url]];
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
- (void)getAppVersion:(NSNumber *)listenID{
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSString *app_Version = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
    NSString *fullCode = [NSString stringWithFormat:@"window.handle_jsintercept_callback(%d, true, '%@',%d)", [listenID intValue],app_Version,[isUpdate intValue]];
    [webView evaluateJavaScript:fullCode completionHandler:^(id object, NSError *error) {
        isUpdate = [NSNumber numberWithInt:0];
        if (error != nil) {
            NSLog(@"item = %@, error = %@", object, error);
        }
    }];
}

//执行安装请求
- (void)updateApp:(NSString *)url{
    if (@available(iOS 10.0, *)) {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url] options:@{} completionHandler:nil];
    } else {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]];
    }
    //[self restartApp];
}



@end

