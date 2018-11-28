
#import "Interceptor.h"
#import <MobileCoreServices/MobileCoreServices.h>

NSString *const HttpProtocolKey = @"http";

static NSString *bootDir = nil;
static NSArray *domains = nil;
static BOOL fetchFromMobile = YES;

@implementation Interceptor

+ (BOOL)canInitWithRequest:(NSURLRequest *)request {
//    return NO;
    NSURL *url = [request URL];
    NSString *scheme = [url scheme];
    NSString *path = url.path;
    NSString *urlString = url.absoluteString;
    // 判断是否需要进入自定义加载器
    if ([scheme caseInsensitiveCompare:HttpProtocolKey] != NSOrderedSame) {
        return NO;
    }
    // 是否已经处理过了，防止无限循环
    if ([NSURLProtocol propertyForKey:@"URLProtocolHandledKey" inRequest:request]) {
        return NO;
    }
    if ([path hasPrefix:@"/$intercept"]) {
        return YES;
    } else if ([path hasPrefix:@"/$resinfo"]) {
        return YES;
    } else if (fetchFromMobile) {
        if ([urlString rangeOfString:@"$forceServer=1"].location != NSNotFound) {
            return NO;
        } else if (domains == nil) {
            return YES;
        } else {
            for (NSString *domain in domains) {
                if ([urlString hasPrefix:domain]) {
                    return YES;
                }
            }
        }
    }
    return NO;
}

+ (NSURLRequest *)canonicalRequestForRequest:(NSURLRequest *)request {

    NSMutableURLRequest *mutableReqeust = [request mutableCopy];
    // 执行自定义操作，例如添加统一的请求头等
    return mutableReqeust;
}


- (void)stopLoading {

}

- (void)startLoading {
    NSMutableURLRequest *request = [[self request] mutableCopy];
    NSURL *url = [request URL];
    NSString *path = url.path;

    // 标示改request已经处理过了，防止无限循环
    [NSURLProtocol setProperty:@YES forKey:@"URLProtocolHandledKey" inRequest:request];

    if ([path hasPrefix:@"/$intercept"]) {
        [self handleIntercept:request];
    } else if ([path hasPrefix:@"/$resinfo"]) {
        [self handleResInfo:request];
    } else if (fetchFromMobile) {
        [self handleFecthFromMobile:request];
    }
}

/**
 * 设置拦截标记
 */
- (void)handleIntercept:(NSMutableURLRequest *)request {
    NSURL *url = [request URL];

    NSURLComponents *components = [[NSURLComponents alloc] initWithString:url.absoluteString];
    [components.queryItems enumerateObjectsUsingBlock:^(NSURLQueryItem *_Nonnull obj, NSUInteger idx, BOOL *_Nonnull stop) {
        if ([obj.name isEqualToString:@"value"]) {
            fetchFromMobile = [obj.value isEqualToString:@"1"];
        }
    }];

    NSData *data = [@"true" dataUsingEncoding:NSUTF8StringEncoding];
    [self sendResponse:url content:data mimeType:@"text/json" statusCode:200];
}

/**
 * 设置资源信息
 */
- (void)handleResInfo:(NSMutableURLRequest *)request {
    NSURL *url = [request URL];

    NSURLComponents *components = [[NSURLComponents alloc] initWithString:url.absoluteString];
    [components.queryItems enumerateObjectsUsingBlock:^(NSURLQueryItem *_Nonnull obj, NSUInteger idx, BOOL *_Nonnull stop) {
        if ([obj.name isEqualToString:@"domains"]) {
            NSError *error;
            NSData *jsonData = [obj.value dataUsingEncoding:NSUTF8StringEncoding];
            domains = [NSJSONSerialization JSONObjectWithData:jsonData options:kNilOptions error:&error];
        } else if ([obj.name isEqualToString:@"bootdir"]) {
            bootDir = obj.value;
        }
    }];

    NSData *data = [@"true" dataUsingEncoding:NSUTF8StringEncoding];
    [self sendResponse:url content:data mimeType:@"text/json" statusCode:200];
}

/**
 * 从手机路径获取
 */
- (void)handleFecthFromMobile:(NSMutableURLRequest *)request {
    NSURL *url = [request URL];

    NSData *data = nil;

    // 获取Document目录
    NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    NSString *path = [docPath stringByAppendingString:@"/assets"];
    NSString *fullPath = [path stringByAppendingString:url.path];
    NSFileHandle *file = [NSFileHandle fileHandleForReadingAtPath:fullPath];
    if (file != nil) {
        data = [file readDataToEndOfFile];
        [file closeFile];
    }

    if (data == nil) {
        path = url.path;
        NSString *replace = @"/.depend";
        if ([path hasSuffix:replace]) {
            path = [path stringByReplacingOccurrencesOfString:replace withString:@"/depend"];
        }
        path = [@"assets" stringByAppendingString:path];
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

    if (data != nil) {
        NSString *mimeType = [self getMIMETypeWithCAPIAtFilePath:fullPath];
        [self sendResponse:url content:data mimeType:mimeType statusCode:200];
    } else {
        NSData *data = [@"404" dataUsingEncoding:NSUTF8StringEncoding];
        [self sendResponse:url content:data mimeType:@"text/plain" statusCode:404];
    }
}

// 调用C语言的API来获得文件的MIMEType ，只能获取本地文件哦，无法获取网络请求来的文件
- (NSString *)getMIMETypeWithCAPIAtFilePath:(NSString *)path {
    if (![[[NSFileManager alloc] init] fileExistsAtPath:path]) {
        return nil;
    }

    CFStringRef uti = UTTypeCreatePreferredIdentifierForTag(kUTTagClassFilenameExtension, (__bridge CFStringRef) [path pathExtension], NULL);
    CFStringRef type = UTTypeCopyPreferredTagWithClass(uti, kUTTagClassMIMEType);
    CFRelease(uti);
    if (!type) {
        return @"application/octet-stream";
    }
    return (__bridge NSString *) (type);
}

- (void)sendResponse:(NSURL *)url content:(NSData *)data mimeType:(NSString *)mimeType statusCode:(int)code {
    NSInteger dataLength = data.length;
    NSHTTPURLResponse *response = [self jointResponseWithData:data dataLength:dataLength mimeType:mimeType requestUrl:url statusCode:code httpVersion:@"HTTP/1.1"];

    [[self client] URLProtocol:self didReceiveResponse:response cacheStoragePolicy:NSURLCacheStorageNotAllowed];
    [[self client] URLProtocol:self didLoadData:data];
    [[self client] URLProtocolDidFinishLoading:self];
}

#pragma mark - 拼接响应Response

- (NSHTTPURLResponse *)jointResponseWithData:(NSData *)data dataLength:(NSInteger)dataLength mimeType:(NSString *)mimeType requestUrl:(NSURL *)requestUrl statusCode:(NSInteger)statusCode httpVersion:(NSString *)httpVersion {
    NSDictionary *dict = @{
            @"Content-type": mimeType,
            @"Content-length": [NSString stringWithFormat:@"%ld", dataLength],
            @"X-From-Mobile": @"1"
    };
    NSHTTPURLResponse *response = [[NSHTTPURLResponse alloc] initWithURL:requestUrl statusCode:statusCode HTTPVersion:httpVersion headerFields:dict];
    return response;
}

@end


