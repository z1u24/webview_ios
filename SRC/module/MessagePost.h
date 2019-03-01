//
//  MessagePost.h
//  WebViewPro
//
//  Created by yineng on 2019/2/14.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "BaseObject.h"
#import <CloudPushSDK/CloudPushSDK.h>
NS_ASSUME_NONNULL_BEGIN

@interface MessagePost : BaseObject
- (void)listAliases:(CallJS)callJS;
- (void)removeAlias:(NSString *)alias callJS:(CallJS)callJS;
- (void)addAlias:(NSString *)alias callJS:(CallJS)callJS;
- (void)listTags:(CallJS)callJS;
- (void)unbindTag:(int)target withTags:(NSArray *)tags withAlias:(NSString *)alias callJS:(CallJS)callJS;
- (void)bindTag:(int)target withTags:(NSArray *)tags withAlias:(NSString *)alias callJS:(CallJS)callJS;
- (void)unbindAccount:(CallJS)callJS;
- (void)bindAccount:(NSString *)account callJS:(CallJS)callJS;
@end

NS_ASSUME_NONNULL_END
