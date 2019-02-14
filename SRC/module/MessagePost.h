//
//  MessagePost.h
//  WebViewPro
//
//  Created by yineng on 2019/2/14.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "BaseObject.h"

NS_ASSUME_NONNULL_BEGIN

@interface MessagePost : BaseObject

- (void)sendMessage:(CallJS)callJS;

@end

NS_ASSUME_NONNULL_END
