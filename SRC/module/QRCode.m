//
//  QRCode.m
//  Telegraph
//
//  Created by Apple on 2018/8/22.
//

#import "QRCode.h"

@implementation QRCode

- (void)scan:(CallJS)callJS {
   
    NSString *cardName = @"";
    UIImage *avatar = [UIImage imageNamed:@""];
    // 实例化扫描控制器
    HMScannerController *scanner = [HMScannerController scannerWithCardName:cardName avatar:avatar completion:^(NSString *stringValue) {
        callJS(Success,[NSArray arrayWithObjects:stringValue, nil]);
    }];
    [scanner setTitleColor:[UIColor whiteColor] tintColor:[UIColor whiteColor]];
    [[BaseObject getVc] showDetailViewController:scanner sender:nil];
}

@end
