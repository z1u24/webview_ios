//
//  PIDataBase.h
//  WebViewPro
//
//  Created by yineng on 2019/7/16.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "callBack.h"

@interface PIDataBase : NSObject

+(PIDataBase *)getVMDataBase;

- (instancetype)initWithName:(NSString *)name;

-(void)create:(NSString *)inputTabName success:(callBack)success fail:(callBack)fail complete:(callBack)complete;

-(void)write:(NSString *)inputTabName key:(NSString *)key data:(NSString *)data success:(callBack)success fail:(callBack)fail complete:(callBack)complete;

-(void)read:(NSString *)inputTabName key:(NSString *)key success:(callBack)success fail:(callBack)fail complete:(callBack)complete;

-(void)remove:(NSString *)inputTabName key:(NSString *)key success:(callBack)success fail:(callBack)fail complete:(callBack)complete;

-(void)iterate:(NSString *)inputTabName success:(callBack)success fail:(callBack)fail complete:(callBack)complete;

-(void)deleteTable:(NSString *)inputTabName success:(callBack)success fail:(callBack)fail complete:(callBack)complete;

@end

