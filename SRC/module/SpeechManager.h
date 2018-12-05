//
//  SpeechManager.h
//  WebViewPro
//
//  Created by yineng on 2018/12/4.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import "BaseObject.h"

NS_ASSUME_NONNULL_BEGIN

@interface SpeechManager : BaseObject

//开始录制音频
- (void)startSpeech:(NSArray *)array;
//结束录制
- (void)endSpeech:(NSArray *)array;
//丢弃录音
- (void)dropSpeech:(NSArray *)array;

@end

NS_ASSUME_NONNULL_END
