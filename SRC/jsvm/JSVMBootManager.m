//
//  JSVMBootManager.m
//  WebViewPro
//
//  Created by yineng on 2019/4/22.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "JSVMBootManager.h"
#import "WebViewAppDelegate.h"
#import "PIBootManager.h"
#import "PIAjax.h"
#import "DataHandle.h"
@implementation JSVMBootManager{
    PIBootManager *piBoot;
}

- (instancetype)initWithContext:(JSContext *)context {
    self = [super init];
    if (self) {
        piBoot = [PIBootManager sharedInstance];
        [self initManager:context];
    }
    return self;
}

-(NSString *)getLocationHref{
    return piBoot.fullVMPath;
}

-(NSString *)getIndexJS{
    return piBoot.loadVMBase;
}

- (void)initManager:(JSContext *)context {
    
    context[@"JSVM"][@"Boot"][@"loadJS"] = ^(JSValue *defaultDomain, JSValue *path){
        NSString *paths = [defaultDomain.toString stringByAppendingString:path.toString];
        NSString *content = [NSString stringWithContentsOfFile:paths encoding:NSUTF8StringEncoding error:nil];
        DataHandle *dh = [[DataHandle alloc] init];
        [dh setContent:content file:path.toString];
        return dh;
    };
    
    context[@"JSVM"][@"Boot"][@"updateApp"] = ^(JSValue *url){
        [self->piBoot loadVM];
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url.toString] options:@{} completionHandler:nil];
    };
    
    context[@"JSVM"][@"Boot"][@"getAppVersion"] = ^(JSValue *cb){
        [cb callWithArgumentsNoNil:@[@TRUE,self->piBoot.app_version,self->piBoot.update]];
    };
    
    context[@"JSVM"][@"Boot"][@"getMobileBootFiles"] = ^(JSValue *cb){
        NSString *docPath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject];
        NSMutableDictionary *dic = self->piBoot.mVMBootFileDic;
        for (NSString *fileName in dic.allKeys) {
            NSString *rootPath = [dic objectForKey:fileName];
            NSString *fullPath = [docPath stringByAppendingString:rootPath];
            NSString *content = [NSString stringWithContentsOfFile:fullPath encoding:NSUTF8StringEncoding error:nil];
            DataHandle *dh = [[DataHandle alloc] init];
            [dh setContent:content file:fileName];
            [dic setObject:dh forKey:fileName];
        }
        [cb callWithArgumentsNoNil:@[dic]];
    };
    
    context[@"JSVM"][@"Boot"][@"restartJSVM"] = ^(){
        [[NSNotificationCenter defaultCenter] postNotificationName:@"restartJSVM" object:@"restart"];
    };
    
    context[@"JSVM"][@"Boot"][@"updateFinish"] = ^(){
        [self->piBoot setAppVerison];
    };
    
    context[@"JSVM"][@"Boot"][@"updateDownload"] = ^(JSValue *domains, JSValue *url, JSValue *files, JSValue *success, JSValue *fail, JSValue *progress){
        PIAjax *ajax = [[PIAjax alloc] init];
        [self goDownload:ajax domians:domains.toArray url:url.toString files:files.toArray success:^(NSArray *array) {
            [success callWithArgumentsNoNil:array];
        } fail:^(NSArray *array) {
            [fail callWithArgumentsNoNil:array];
        } progress:^(NSArray *array) {
            [progress callWithArgumentsNoNil:array];
        } retry:0];
    };
    
    context[@"JSVM"][@"Boot"][@"saveDepend"] = ^(JSValue *content){
        [self->piBoot saveVMFile:@".depend" content:content.toString cb:^(NSArray *array) {
            
        }];
    };
    
    context[@"JSVM"][@"Boot"][@"saveIndexJS"] = ^(JSValue *content){
        [self->piBoot saveVMFile:@"boot/jsindex.js" content:content.toString cb:^(NSArray *array) {
            
        }];
    };
    
    
}

-(void)goDownload:(PIAjax *)ajax domians:(NSArray *)domains url:(NSString *)url files:(NSArray *)files success:(callBack)success fail:(callBack)fail progress:(callBack)progress retry:(int)retry{
    if (retry >= domains.count) {
        fail(@[]);
        return;
    }
    NSString *fullUrl = [domains[retry] stringByAppendingString:url];
    [ajax request:@"GET" inputUrl:fullUrl header:nil reqData:nil reqType:nil success:^(NSArray *array) {
        //开始下载
        NSData *data = [array firstObject];
        int start = 0;
        int end = 0;
        for(int i = 0; i < files.count; i++){
            NSDictionary *file = files[i];
            start = start + end;
            end = [[file objectForKey:@"size"] intValue];
            NSString *name = [file objectForKey:@"path"];
            NSData *codeData = [data subdataWithRange:NSMakeRange(start, end)];
            NSString *content = [[NSString alloc] initWithData:codeData encoding:NSUTF8StringEncoding];
            //存docments
            DataHandle *dh = [[DataHandle alloc] init];
            [dh setContent:content file:name];
            success(@[file, dh]);
            if([name containsString:@"boot"]){
                [self->piBoot saveVMFile:name content:content cb:^(NSArray *array) {
                    
                }];
            }
            
        }
        //结束
        
    } fail:^(NSArray *array) {
        [self goDownload:ajax domians:domains url:url files:files success:success fail:fail progress:progress retry:retry+1];
    } progress:^(NSArray *array) {
        progress(array);
    }];
}


@end
