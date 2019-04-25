//
//  JSVMBootManager.m
//  WebViewPro
//
//  Created by yineng on 2019/4/22.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "JSVMBootManager.h"
#import "WebViewAppDelegate.h"

@implementation JSVMBootManager

NSNumber *update = 0;
NSString *app_Version = nil;
NSString *appversionPath = nil;
NSMutableDictionary *mJSBootFilePathDic = nil;

- (instancetype)initWithContext:(JSContext *)context {
    self = [super init];
    if (self) {
        update = [NSNumber numberWithInt:0];
        [self getMobilBootFiles];
        [self getDocumentsAppVersion];
        [self initManager:context];
    }
    return self;
}

- (void)initManager:(JSContext *)context {
    context[@"JSVM"][@"Boot"][@"updateApp"] = ^(JSValue *url){
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url.toString] options:@{} completionHandler:nil];
    };
    
    context[@"JSVM"][@"Boot"][@"getAppVersion"] = ^(JSValue *cb){
        [cb callWithArgumentsNoNil:@[@TRUE,app_Version,update]];
    };
    
    context[@"JSVM"][@"Boot"][@"updateFinish"] = ^(JSValue *cb){
        //更改底层app文件版本号
        [app_Version writeToFile:appversionPath atomically:YES encoding:NSUTF8StringEncoding error:nil];
        [cb callWithArgumentsNoNil:@[]];
    };
    
    context[@"JSVM"][@"Boot"][@"getMobileBootFiles"] = ^(JSValue *cb){

        [cb callWithArgumentsNoNil:@[mJSBootFilePathDic]];
    };
    
    context[@"JSVM"][@"Boot"][@"restartJSVM"] = ^(){
        [[NSNotificationCenter defaultCenter] postNotificationName:@"restartJSVM" object:@"restart"];
    };
    
    context[@"JSVM"][@"Boot"][@"saveFile"] = ^(JSValue *path, JSValue *content, JSValue *cb){
        //如果path中包含.depend改为depend
        // 获取Document目录
        NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
        NSString *assetsPath = [@"/assets/JSVM/" stringByAppendingString:path.toString];
        if([assetsPath containsString:@".depend"]){
            assetsPath = [assetsPath stringByReplacingOccurrencesOfString:@".depend" withString:@"depend"];
        }
        NSString *fullPath = [docPath stringByAppendingString:assetsPath];
        NSFileManager *manager = [NSFileManager defaultManager];
        NSString *dirPath = [fullPath substringToIndex:[fullPath rangeOfString:@"/" options:NSBackwardsSearch].location];
        //判断文件夹是否存在  不存在就创建
        BOOL filePathExist = [manager fileExistsAtPath:dirPath isDirectory:false];
        if (!filePathExist) {
            NSError *err = nil;
            BOOL ok = [manager createDirectoryAtPath:dirPath withIntermediateDirectories:YES attributes:nil error:&err];
            if (ok == NO) {
                NSLog(@"JSVM, file = %@, isCreate = %d", dirPath, ok);
                return;
            }
        }
        NSData *data = [[NSData alloc] initWithBase64EncodedString:content.toString options:0];
        BOOL isExist = [manager fileExistsAtPath:fullPath];
        NSLog(@"JSVM, file = %@, isExist = %d", fullPath, isExist);
        if (isExist) {
            [manager removeItemAtPath:fullPath error:nil];
        }
        if(data == nil){
            [content.toString writeToFile:fullPath atomically:YES encoding:NSUTF8StringEncoding error:nil];
        }else{
            BOOL sucess = [manager createFileAtPath:fullPath contents:data attributes:nil];
            if (!sucess) {
                NSLog(@"JSVM createFile failed, file = %@", fullPath);
            }
        }
        //判断
        NSString *mBootFilePath = [docPath stringByAppendingString:@"/apkback/JSVMBootFilePaths.plist"];
        NSString *apkPath = [mBootFilePath substringToIndex:[fullPath rangeOfString:@"/" options:NSBackwardsSearch].location];
        //判断文件夹是否存在  不存在就创建
        BOOL isDirectory = YES;
        BOOL apkPathExist = [manager fileExistsAtPath:apkPath isDirectory:&isDirectory];
        if (!apkPathExist) {
            NSError *err = nil;
            BOOL ok = [manager createDirectoryAtPath:apkPath withIntermediateDirectories:YES attributes:nil error:&err];
            if (ok == NO) {
                NSLog(@"JSVM, file = %@, isCreate = %d", dirPath, ok);
                return;
            }
        }
        BOOL isMBootFileExist = [manager fileExistsAtPath:fullPath];
        if (!isMBootFileExist) {
            BOOL sucess = [manager createFileAtPath:mBootFilePath contents:nil attributes:nil];
            if (!sucess) {
                NSLog(@"JSVM createFile failed, file = %@", fullPath);
            }
        }
        //获取文件名称
        NSString *fileName = [assetsPath containsString:@"/"]?[assetsPath substringFromIndex:[assetsPath rangeOfString:@"/" options:NSBackwardsSearch].location + 1] : assetsPath;
        [mJSBootFilePathDic setObject:assetsPath forKey:fileName];
        [mJSBootFilePathDic writeToFile:mBootFilePath atomically:YES];
        [cb callWithArgumentsNoNil:@[@TRUE]];
    };
    
}

- (void)getMobilBootFiles{
    if (mJSBootFilePathDic == nil) {
        //文件中读取
        NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
        NSString *apkPath = [docPath stringByAppendingString:@"/apkback/"];
        NSString *mBootFilePath = [apkPath stringByAppendingString:@"JSVMBootFilePaths.plist"];
        NSFileManager *manager = [NSFileManager defaultManager];
        BOOL isMBootFileExist = [manager fileExistsAtPath:mBootFilePath];
        if (!isMBootFileExist) {
            mJSBootFilePathDic = [[NSMutableDictionary alloc] initWithCapacity:0];
        }else{
            mJSBootFilePathDic = [[NSMutableDictionary alloc] initWithContentsOfFile:mBootFilePath];
        }
    }
}

- (void)getDocumentsAppVersion{
    //获取当前app版本
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    app_Version = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
    //获取底层app文件版本号
    NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    NSString *apkPath = [docPath stringByAppendingString:@"/apkback"];
    appversionPath = [apkPath stringByAppendingString:@"/appversion.txt"];
    NSFileManager *manager = [NSFileManager defaultManager];
    BOOL isDirectory = YES;
    //判断文件夹是否存在  不存在就创建
    BOOL apkPathExist = [manager fileExistsAtPath:apkPath isDirectory:&isDirectory];
    if (!apkPathExist) {
        NSError *err = nil;
        BOOL ok = [manager createDirectoryAtPath:apkPath withIntermediateDirectories:NO attributes:nil error:&err];
        if (ok == NO) {
            NSLog(@"JSInterceptor, file = %@, isCreate = %d", apkPath, ok);
        }
    }
    BOOL isAppVersionExist = [manager fileExistsAtPath:appversionPath];
    if (!isAppVersionExist) {
        BOOL sucess = [manager createFileAtPath:appversionPath contents:nil attributes:nil];
        if (!sucess) {
            NSLog(@"JSInterceptor createFile failed, file = %@", appversionPath);
        }else{
            [app_Version writeToFile:appversionPath atomically:YES encoding:NSUTF8StringEncoding error:nil];
        }
    }else{
        NSString *documentsVersion = [NSString stringWithContentsOfFile:appversionPath encoding:NSUTF8StringEncoding error:nil];
        if (![documentsVersion isEqualToString:app_Version]) {
            [manager removeItemAtPath:[docPath stringByAppendingString:@"/assets"] error:nil];
            [app_Version writeToFile:appversionPath atomically:YES encoding:NSUTF8StringEncoding error:nil];
            update = [NSNumber numberWithInt:1];
        }
    }
}


@end
