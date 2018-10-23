//
//  Argon2Hash
//  Telegraph
//
//  Created by yineng on 2018/8/9.
//  Copyright © 2018年 kupay. All rights reserved.
//
#include "BaseObject.h"
#include "argon2.h"

@interface ArgonHash : BaseObject

- (void)getArgon2Hash:(NSArray *)array;

@end
