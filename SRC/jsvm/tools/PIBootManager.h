//
//  PIBootManager.h
//  WebViewPro
//
//  Created by yineng on 2019/7/16.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "callBack.h"
@interface PIBootManager : NSObject
@property (nonatomic, readonly)NSString *app_version;
@property (nonatomic, readonly)NSString *loadBase;
@property (nonatomic, readonly)NSString *loadVMBase;
@property (nonatomic, readonly)NSString *fullPath;
@property (nonatomic, readonly)NSString *fullVMPath;
@property (nonatomic, strong)NSNumber *update;
@property (nonatomic, strong)NSMutableDictionary *mBootFileDic;
@property (nonatomic, strong)NSMutableDictionary *mVMBootFileDic;

+ (instancetype)sharedInstance;
-(void)saveVMFile:(NSString *)path content:(NSString *)content cb:(callBack)cb;
-(void)saveFile:(NSString *)path content:(NSString *)content cb:(callBack)cb;
-(void)loadDefault;
-(void)loadVM;
-(void)setAppVerison;
@end
