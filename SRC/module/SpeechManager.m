//
//  SpeechManager.m
//  WebViewPro
//
//  Created by yineng on 2018/12/4.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import "SpeechManager.h"
#import <AVFoundation/AVFoundation.h>

@implementation SpeechManager

NSTimer         *timer;            //定时器
NSInteger       countDown;         //倒计时,最多60秒

AVAudioSession      *session;
AVAudioRecorder     *recorder;    //录音器
AVAudioPlayer       *player;      //音频播放器

- (instancetype)init
{
    self = [super init];
    if (self) {
        
    }
    return self;
}

//开始录制音频
- (void)startSpeech:(NSArray *)array{
    NSNumber *listenId = array[0];
    JSBundle *bundle = array[1];
    if (![self canRecord]) {
        //弹出提示框是否去打开
        [self showAlertController];
        [bundle callJSError:@"None" funcName:@"startSpeech" msg:@"The Microphone Is Not Open"];
    }else{
        //录音时长最长不超过60s
        countDown = 60;
        //初始化定时器
        timer = [NSTimer scheduledTimerWithTimeInterval:1.0 target:self selector:@selector(timeRefreshAction) userInfo:nil repeats:YES];
        [[NSRunLoop currentRunLoop] addTimer:timer forMode:NSRunLoopCommonModes];
        session =[AVAudioSession sharedInstance];
        NSError *sessionError;
        [session setCategory:AVAudioSessionCategoryPlayAndRecord error:&sessionError];
        if (session == nil) {
            NSLog(@"Error creating session: %@",[sessionError description]);
        } else {
            [session setActive:YES error:nil];
        }
        
    }
}


//结束录制
- (void)endSpeech:(NSArray *)array{
    
}

//丢弃录音
- (void)dropSpeech:(NSArray *)array{
    [timer invalidate];
    timer = nil;
    if([recorder isRecording]){
        [recorder stop];
    }
}

//上传
- (void)onloadSpeech:(NSArray *)array{
    
}

//定时器事件--->如果countDown<1时，结束录制
- (void)timeRefreshAction{
    countDown --;
    if (countDown < 1) {
        //结束录制
    }
}

//检查是否拥有麦克风权限
- (BOOL)canRecord {
    __block BOOL bCanRecord = YES;
    
    AVAudioSession *audioSession = [AVAudioSession sharedInstance];
    if ([audioSession respondsToSelector:@selector(requestRecordPermission:)]) {
        [audioSession performSelector:@selector(requestRecordPermission:) withObject:^(BOOL granted) {
            if (granted) {
                bCanRecord = YES;
            } else {
                bCanRecord = NO;
            }
        }];
    }
    return bCanRecord;
}

//提示框---->提示用户去设置中打开麦克风
- (void)showAlertController{
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"请启用麦克风" message:@"设置/隐私/麦克风" preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *canelAction = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel handler:nil];
    UIAlertAction *okAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction *_Nonnull action) {
        NSURL *settingsURL = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
        [[UIApplication sharedApplication] openURL:settingsURL];
    }];
    [alert addAction:canelAction];
    [alert addAction:okAction];
    [[BaseObject getVc] presentViewController:alert animated:YES completion:nil];
}

@end
