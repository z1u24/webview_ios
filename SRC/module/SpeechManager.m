//
//  SpeechManager.m
//  WebViewPro
//
//  Created by yineng on 2018/12/4.
//  Copyright © 2018 kuplay. All rights reserved.
//

#import "SpeechManager.h"
#import <AVFoundation/AVFoundation.h>
#define getVolTime 0.2

@implementation SpeechManager

//录音时长由高层决定
NSTimer         *timer;            //定时器
AVAudioSession      *session;
AVAudioRecorder     *recorder;    //录音器
AVAudioPlayer       *player;      //音频播放器
NSNumber            *startListenId;
NSString            *recordFilePath; //文件存放位置   temp/RRecord.wav
CallJS              startCallJS;

- (instancetype)init
{
    self = [super init];
    if (self) {
        
    }
    return self;
}

//开始录制音频
- (void)startSpeech:(CallJS)callJS{
    startCallJS = callJS;
    if (![self canRecord]) {
        //弹出提示框是否去打开
        [self showAlertController];
        callJS(Fail,@[@"The Microphone Is Not Open"]);
    }else{
        //初始化定时器
        timer = [NSTimer scheduledTimerWithTimeInterval:getVolTime target:self selector:@selector(timeRefreshAction) userInfo:nil repeats:YES];
        [[NSRunLoop currentRunLoop] addTimer:timer forMode:NSRunLoopCommonModes];
        session =[AVAudioSession sharedInstance];
        NSError *sessionError;
        [session setCategory:AVAudioSessionCategoryPlayAndRecord error:&sessionError];
        if (session == nil) {
            NSLog(@"Error creating session: %@",[sessionError description]);
        } else {
            [session setActive:YES error:nil];
        }
        //获取文件沙盒地址
        NSString *path = NSTemporaryDirectory();
        recordFilePath = [path stringByAppendingString:@"/RRecord.amr"];
        NSDictionary *recordSetting = @{AVFormatIDKey: @(kAudioFormatLinearPCM),
                                        AVSampleRateKey: @8000.00f,
                                        AVNumberOfChannelsKey: @1,
                                        AVLinearPCMBitDepthKey: @16,
                                        AVLinearPCMIsNonInterleaved: @NO,
                                        AVLinearPCMIsFloatKey: @NO,
                                        AVLinearPCMIsBigEndianKey: @NO};
        recorder = [[AVAudioRecorder alloc] initWithURL:[NSURL fileURLWithPath:recordFilePath] settings:recordSetting error:nil];
        recorder.meteringEnabled = YES;
        [recorder prepareToRecord];
        [recorder record];
        callJS(Success,@[@"开始录制"]);
    }
}


//结束录制
- (void)endSpeech:(CallJS)callJS{
    //移除定时器
    [timer invalidate];
    timer = nil;
    if ([recorder isRecording]) {
        [recorder stop];
    }
    //上传录音数据
    NSData *data = [NSData dataWithContentsOfFile:recordFilePath];
    NSString *jsonStr = [data base64EncodedStringWithOptions: NSDataBase64Encoding64CharacterLineLength];
    callJS(Success,@[jsonStr]);
    //删除文件
    NSFileManager* fileManager=[NSFileManager defaultManager];
    [fileManager removeItemAtPath:recordFilePath error:nil];
}

//丢弃录音
- (void)dropSpeech:(CallJS)callJS{
    //移除定时器
    [timer invalidate];
    timer = nil;
    if([recorder isRecording]){
        [recorder stop];
    }
    NSFileManager* fileManager=[NSFileManager defaultManager];
    [fileManager removeItemAtPath:recordFilePath error:nil];
    callJS(Success,@[@""]);
}


//定时器事件--->如果countDown<1时，结束录制
- (void)timeRefreshAction{
    [recorder updateMeters];
    double ff = [recorder averagePowerForChannel:0];
    ff = ff+60;
    if (ff>0&&ff<=10) {
        startCallJS(Success,@[@"0"]);
    } else if (ff>10 && ff<20) {
        startCallJS(Success,@[@"1"]);
    } else if (ff >=20 &&ff<30) {
        startCallJS(Success,@[@"2"]);
    } else if (ff >=30 &&ff<40) {
        startCallJS(Success,@[@"3"]);
    } else if (ff >=40 &&ff<50) {
        startCallJS(Success,@[@"4"]);
    } else if (ff >= 50 && ff < 60) {
        startCallJS(Success,@[@"5"]);
    } else if (ff >= 60 && ff < 70) {
        startCallJS(Success,@[@"6"]);
    } else {
        startCallJS(Success,@[@"7"]);
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
