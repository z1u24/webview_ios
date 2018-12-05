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
JSBundle            *startBundle;
NSNumber            *startListenId;
NSString            *recordFilePath; //文件存放位置   temp/RRecord.wav
- (instancetype)init
{
    self = [super init];
    if (self) {
        
    }
    return self;
}

//开始录制音频
- (void)startSpeech:(NSArray *)array{
    startListenId = array[0];
    startBundle = array[1];
    if (![self canRecord]) {
        //弹出提示框是否去打开
        [self showAlertController];
        [startBundle callJSError:@"None" funcName:@"startSpeech" msg:@"The Microphone Is Not Open"];
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
        [startBundle callJS:startListenId code:0 params:@[@"开始录制"]];
    }
}


//结束录制
- (void)endSpeech:(NSArray *)array{
    NSNumber *listenId = array[0];
    JSBundle *bundle = array[1];
    //移除定时器
    [timer invalidate];
    timer = nil;
    if ([recorder isRecording]) {
        [recorder stop];
    }
    //上传录音数据
    NSData *data = [NSData dataWithContentsOfFile:recordFilePath];
    NSString *jsonStr = [data base64EncodedStringWithOptions: NSDataBase64Encoding64CharacterLineLength];
    [bundle callJS:listenId code:0 params:@[jsonStr]];
    //删除文件
    NSFileManager* fileManager=[NSFileManager defaultManager];
    [fileManager removeItemAtPath:recordFilePath error:nil];
}

//丢弃录音
- (void)dropSpeech:(NSArray *)array{
    NSNumber *listenId = array[0];
    JSBundle *bundle = array[1];
    //移除定时器
    [timer invalidate];
    timer = nil;
    if([recorder isRecording]){
        [recorder stop];
    }
    NSFileManager* fileManager=[NSFileManager defaultManager];
    [fileManager removeItemAtPath:recordFilePath error:nil];
    [bundle callJS:listenId code:0 params:@[]];
}


//定时器事件--->如果countDown<1时，结束录制
- (void)timeRefreshAction{
    [recorder updateMeters];
    double ff = [recorder averagePowerForChannel:0];
    ff = ff+60;
    if (ff>0&&ff<=10) {
        [startBundle callJS:startListenId code:0 params:@[@"0"]];
    } else if (ff>10 && ff<20) {
        [startBundle callJS:startListenId code:0 params:@[@"1"]];
    } else if (ff >=20 &&ff<30) {
        [startBundle callJS:startListenId code:0 params:@[@"2"]];
    } else if (ff >=30 &&ff<40) {
        [startBundle callJS:startListenId code:0 params:@[@"3"]];
    } else if (ff >=40 &&ff<50) {
        [startBundle callJS:startListenId code:0 params:@[@"4"]];
    } else if (ff >= 50 && ff < 60) {
        [startBundle callJS:startListenId code:0 params:@[@"5"]];
    } else if (ff >= 60 && ff < 70) {
        [startBundle callJS:startListenId code:0 params:@[@"6"]];
    } else {
        [startBundle callJS:startListenId code:0 params:@[@"7"]];
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
