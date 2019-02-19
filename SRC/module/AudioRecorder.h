//
//  AudioRecorder.h
//  WebViewPro
//
//  Created by yineng on 2019/1/3.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "BaseObject.h"

NS_ASSUME_NONNULL_BEGIN

@interface AudioRecorder : BaseObject

- (void)getPromission:(CallJS)callJS;

- (void)start:(CallJS)callJS;

- (void)stop:(CallJS)callJS;

- (void)drop:(CallJS)callJS;


@end

NS_ASSUME_NONNULL_END
