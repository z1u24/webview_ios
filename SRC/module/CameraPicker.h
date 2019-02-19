//
//  cameraPicker.h
//  WebViewPro
//
//  Created by yineng on 2018/12/29.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import "BaseObject.h"

NS_ASSUME_NONNULL_BEGIN

@interface CameraPicker : BaseObject

-(void)takePhoto:(CallJS)callJS;

@end

NS_ASSUME_NONNULL_END
