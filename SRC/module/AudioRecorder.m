//
//  AudioRecorder.m
//  WebViewPro
//
//  Created by yineng on 2019/1/3.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "AudioRecorder.h"
#import <AVFoundation/AVFoundation.h>
#import "lame.h"
#define getVolTime 0.2

@implementation AudioRecorder{
    NSTimer         *timer;            //定时器
    AVAudioSession      *session;
    AVAudioRecorder     *recorder;    //录音器
    AVAudioPlayer       *player;      //音频播放器
    NSNumber            *startListenId;
    NSString            *recordFilePath; //文件存放位置   temp/RRecord.wav
    CallJS              startCallJS;
    CallJS              stopCallJS;
    BOOL                isPromission;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        isPromission = false;
    }
    return self;
}

- (void)getPromission:(CallJS)callJS{
    if (!isPromission) {
        callJS(Fail,@[@"not open"]);
        //弹出提示框是否去打开
        if (![self canRecord]) {
            isPromission = false;
            [self showAlertController];
        }else{
            isPromission = true;
        }
    }else{
        callJS(Success,@[@"ok"]);
    }
}

- (void)start:(CallJS)callJS{
    if(![self canRecord]){
        [self showAlertController];
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
        recordFilePath = [path stringByAppendingString:@"/RRecord.caf"];
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

- (void)stop:(CallJS)callJS{
    stopCallJS = callJS;
    [timer invalidate];
    timer = nil;
    if ([recorder isRecording]) {
        [recorder stop];
    }
    [self transformCAFToMP3];
}

- (void)drop:(CallJS)callJS{
    //[timer invalidate];
    //timer = nil;
    if ([recorder isRecording]) {
        [recorder stop];
    }
    callJS(Success,@[@""]);
}


//caf转mp3
- (void)transformCAFToMP3 {
    
    @try {
        int read, write;
        
        NSString *path = NSTemporaryDirectory();
        NSString *mp3FilePath = [path stringByAppendingString:@"/resave.mp3"];
        FILE *pcm = fopen([recordFilePath cStringUsingEncoding:1], "rb");  //source 被转换的音频文件位置
        fseek(pcm, 4*1024, SEEK_CUR);                                   //skip file header
        FILE *mp3 = fopen([mp3FilePath cStringUsingEncoding:1], "wb");  //output 输出生成的Mp3文件位置
        
        const int PCM_SIZE = 8192;
        const int MP3_SIZE = 8192;
        short int pcm_buffer[PCM_SIZE*2];
        unsigned char mp3_buffer[MP3_SIZE];
        
        lame_t lame = lame_init();
        lame_set_num_channels(lame,1);
        lame_set_in_samplerate(lame, 8000.00);
        lame_set_out_samplerate(lame, 8000.00);
        lame_set_brate(lame, 16);
        lame_set_mode(lame, 3);
        lame_set_quality(lame, 7); /* 2=high 5 = medium 7=low 音质*/
        lame_init_params(lame);
        
        do {
            read = (int)fread(pcm_buffer, sizeof(short int), PCM_SIZE, pcm);
            if (read == 0)
                write = lame_encode_flush(lame, mp3_buffer, MP3_SIZE);
            else
                write = lame_encode_buffer(lame, pcm_buffer, pcm_buffer, read, mp3_buffer, MP3_SIZE);
            //write = lame_encode_buffer_interleaved(lame, pcm_buffer, read, mp3_buffer, MP3_SIZE);
            fwrite(mp3_buffer, write, 1, mp3);
            
        } while (read != 0);
        
        lame_close(lame);
        fclose(mp3);
        fclose(pcm);
    }
    @catch (NSException *exception) {
        NSLog(@"%@",[exception description]);
        stopCallJS(Fail,@[[exception description]]);
    }
    @finally {
        NSLog(@"MP3生成成功");
        //文件转base64
        NSData *mp3Data = [NSData dataWithContentsOfFile:[NSTemporaryDirectory() stringByAppendingPathComponent:@"resave.mp3"]];
        NSString *base64 = [mp3Data base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
        stopCallJS(Success, @[[self removeSpaceAndNewline:base64]]);
    }
}

- (NSString *)removeSpaceAndNewline:(NSString *)str {
    NSString *temp = [str stringByReplacingOccurrencesOfString:@" " withString:@""];
    temp = [temp stringByReplacingOccurrencesOfString:@"\r" withString:@""];
    temp = [temp stringByReplacingOccurrencesOfString:@"\n" withString:@""];
    return temp;
}

//定时器事件--->如果countDown<1时，结束录制
- (void)timeRefreshAction{
    [recorder updateMeters];
    double ff = [recorder averagePowerForChannel:0];
    ff = ff+60;
//    if (ff>0&&ff<=10) {
//        startCallJS(Success,@[@"0"]);
//    } else if (ff>10 && ff<20) {
//        startCallJS(Success,@[@"1"]);
//    } else if (ff >=20 &&ff<30) {
//        startCallJS(Success,@[@"2"]);
//    } else if (ff >=30 &&ff<40) {
//        startCallJS(Success,@[@"3"]);
//    } else if (ff >=40 &&ff<50) {
//        startCallJS(Success,@[@"4"]);
//    } else if (ff >= 50 && ff < 60) {
//        startCallJS(Success,@[@"5"]);
//    } else if (ff >= 60 && ff < 70) {
//        startCallJS(Success,@[@"6"]);
//    } else {
//        startCallJS(Success,@[@"7"]);
//    }
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
