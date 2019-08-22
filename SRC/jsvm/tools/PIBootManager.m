//
//  PIBootManager.m
//  WebViewPro
//
//  Created by yineng on 2019/7/16.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "PIBootManager.h"
#import "DataHandle.h"

@implementation PIBootManager



+ (instancetype)sharedInstance{
    static dispatch_once_t onceToken = 0;
    static PIBootManager *_sharedObject = nil;
    dispatch_once(&onceToken, ^{
        _sharedObject = [[PIBootManager alloc] init]; // or some other init method
    });
    return _sharedObject;
}


- (instancetype)init
{
    self = [super init];
    if (self) {
        _update = [NSNumber numberWithInt:0];
        NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
        _app_version = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
        [self loadDefault];
        [self loadVM];
        [self getDocumentsAppVersion];
        [self getMobilBootFiles];
    }
    return self;
}

-(void)loadDefault{
    NSString *documentsPath = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingString:@"/"];
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSString *url = [infoDictionary objectForKey:@"URL_PATH"];
    NSString *paths = [@"assets" stringByAppendingString:url];
    NSString *fpath = [documentsPath stringByAppendingString:paths];
    _loadBase = [NSString stringWithContentsOfFile:fpath encoding:NSUTF8StringEncoding error:nil];
    if (_loadBase == nil) {
        fpath = [[NSBundle mainBundle] pathForResource:paths ofType:nil];
        _loadBase = [NSString stringWithContentsOfFile:fpath encoding:NSUTF8StringEncoding error:nil];
    }
    NSString *urlPath = [[NSBundle mainBundle] pathForResource:[@"assets" stringByAppendingString:url] ofType:nil];
    _fullPath = [@"file://" stringByAppendingString:urlPath];
}

-(void)loadVM{
    NSString *documentsPath = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingString:@"/"];
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSString *vm = [infoDictionary objectForKey:@"VM_PATH"];
    NSString *vmPaths = [@"assets" stringByAppendingString:vm];
    _fullVMPath = [documentsPath stringByAppendingString:vmPaths];
    _loadVMBase = [NSString stringWithContentsOfFile:_fullVMPath encoding:NSUTF8StringEncoding error:nil];
    if (_loadVMBase == nil) {
        _fullVMPath = [[NSBundle mainBundle] pathForResource:vmPaths ofType:nil];
        _loadVMBase = [NSString stringWithContentsOfFile:_fullVMPath encoding:NSUTF8StringEncoding error:nil];
    }
}

-(void)getDocumentsAppVersion{
    //获取当前app版本
    //获取底层app文件版本号
    NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    NSString *apkPath = [docPath stringByAppendingString:@"/apkback"];
    NSString *appversionPath = [apkPath stringByAppendingString:@"/appversion.txt"];
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
            [_app_version writeToFile:appversionPath atomically:YES encoding:NSUTF8StringEncoding error:nil];
        }
    }else{
        NSString *documentsVersion = [NSString stringWithContentsOfFile:appversionPath encoding:NSUTF8StringEncoding error:nil];
        if (![documentsVersion isEqualToString:_app_version]) {
            _update = [NSNumber numberWithInt:1];
        }
    }
}

-(void)setAppVerison{
    NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    NSString *apkPath = [docPath stringByAppendingString:@"/apkback"];
    NSString *appversionPath = [apkPath stringByAppendingString:@"/appversion.txt"];
    NSFileManager *manager = [NSFileManager defaultManager];
    [manager removeItemAtPath:[docPath stringByAppendingString:@"/assets"] error:nil];
    [_app_version writeToFile:appversionPath atomically:YES encoding:NSUTF8StringEncoding error:nil];
}


- (void)getMobilBootFiles{
    if (_mBootFileDic == nil) {
        //文件中读取
        NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
        NSString *apkPath = [docPath stringByAppendingString:@"/apkback/"];
        NSString *mBootFilePath = [apkPath stringByAppendingString:@"bootFile.plist"];
        NSFileManager *manager = [NSFileManager defaultManager];
        BOOL isMBootFileExist = [manager fileExistsAtPath:mBootFilePath];
        if (!isMBootFileExist) {
            _mBootFileDic = [[NSMutableDictionary alloc] initWithCapacity:0];
        }else{
            _mBootFileDic = [[NSMutableDictionary alloc] initWithContentsOfFile:mBootFilePath];
        }
    }
    if (_mVMBootFileDic == nil) {
        //文件中读取
        NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
        NSString *apkPath = [docPath stringByAppendingString:@"/apkback/"];
        NSString *mBootFilePath = [apkPath stringByAppendingString:@"bootVMFile.plist"];
        NSFileManager *manager = [NSFileManager defaultManager];
        BOOL isMBootFileExist = [manager fileExistsAtPath:mBootFilePath];
        if (!isMBootFileExist) {
            _mVMBootFileDic = [[NSMutableDictionary alloc] initWithCapacity:0];
        }else{
            _mVMBootFileDic = [[NSMutableDictionary alloc] initWithContentsOfFile:mBootFilePath];
        }
    }
    
}


-(void)saveVMFile:(NSString *)path content:(NSString *)content cb:(callBack)cb{
    //如果path中包含.depend改为depend
    // 获取Document目录
    NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    NSString *assetsPath = [@"/assets/VM/" stringByAppendingString:path];
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
    NSData *data = [[NSData alloc] initWithBase64EncodedString:content options:0];
    BOOL isExist = [manager fileExistsAtPath:fullPath];
    NSLog(@"JSVM, file = %@, isExist = %d", fullPath, isExist);
    if (isExist) {
        [manager removeItemAtPath:fullPath error:nil];
    }
    if(data == nil){
        [content writeToFile:fullPath atomically:YES encoding:NSUTF8StringEncoding error:nil];
    }else{
        BOOL sucess = [manager createFileAtPath:fullPath contents:data attributes:nil];
        if (!sucess) {
            NSLog(@"JSVM createFile failed, file = %@", fullPath);
        }
    }
    //判断
    NSString *mBootFilePath = [docPath stringByAppendingString:@"/apkback/bootVMFile.plist"];
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
    [_mVMBootFileDic setObject:assetsPath forKey:fileName];
    [_mVMBootFileDic writeToFile:mBootFilePath atomically:YES];
    cb(@[@TRUE]);
}

-(void)saveFile:(NSString *)path content:(NSString *)content cb:(callBack)cb{
    //如果path中包含.depend改为depend
    // 获取Document目录
    NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
    NSString *assetsPath = [@"/assets/" stringByAppendingString:path];
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
    NSData *data = [[NSData alloc] initWithBase64EncodedString:content options:0];
    BOOL isExist = [manager fileExistsAtPath:fullPath];
    NSLog(@"JSVM, file = %@, isExist = %d", fullPath, isExist);
    if (isExist) {
        [manager removeItemAtPath:fullPath error:nil];
    }
    if(data == nil){
        [content writeToFile:fullPath atomically:YES encoding:NSUTF8StringEncoding error:nil];
    }else{
        BOOL sucess = [manager createFileAtPath:fullPath contents:data attributes:nil];
        if (!sucess) {
            NSLog(@"JSVM createFile failed, file = %@", fullPath);
        }
    }
    //判断
    NSString *mBootFilePath = [docPath stringByAppendingString:@"/apkback/bootFile.plist"];
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
    [_mBootFileDic setObject:assetsPath forKey:fileName];
    [_mBootFileDic writeToFile:mBootFilePath atomically:YES];
    cb(@[@TRUE]);
}



@end
