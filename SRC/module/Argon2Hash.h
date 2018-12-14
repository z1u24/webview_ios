//
//  Argon2Hash
//  Telegraph
//
//  Created by yineng on 2018/8/9.
//  Copyright © 2018年 kupay. All rights reserved.
//
#include "BaseObject.h"
#include "argon2.h"

typedef void (^CallJS)(CallJSType callJSType, NSArray *params);

@interface ArgonHash : BaseObject

- (void)getArgon2Hash:(NSNumber *)iter memory:(NSNumber *)memory parallelism:(NSNumber *)parallelism password:(NSString *)password salt:(NSString *)salt type:(NSNumber *)type hashLen:(NSNumber *)hashLen callJS:(CallJS)callJS;

@end
