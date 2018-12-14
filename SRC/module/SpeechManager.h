//
//  SpeechManager.h
//  WebViewPro
//
//  Created by yineng on 2018/12/4.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import "BaseObject.h"

NS_ASSUME_NONNULL_BEGIN


typedef void (^CallJS)(CallJSType callJSType, NSArray *params);

@interface SpeechManager : BaseObject

//开始录制音频
- (void)startSpeech:(CallJS)callJS;
//结束录制
- (void)endSpeech:(CallJS)callJS;
//丢弃录音
- (void)dropSpeech:(CallJS)callJS;

@end

NS_ASSUME_NONNULL_END
