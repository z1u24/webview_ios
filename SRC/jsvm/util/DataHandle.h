//
//  DataHandle.h
//  looooooper
//
//  Created by yineng on 2019/7/15.
//  Copyright © 2019 com.z1u24. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <JavaScriptCore/JavaScriptCore.h>

@class DataHandle;
@protocol DataHandleExports <JSExport, NSObject>
-(NSString *) getContent;
JSExportAs(setContent, -(void) setContent:(NSString *)content file:(NSString *)fileName);
-(void) runScript;
@end

@interface DataHandle : NSObject<DataHandleExports>
@property (nonatomic, strong)NSString *filePath;
@property (nonatomic, strong)NSString *data;
@end

