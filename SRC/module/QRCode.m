//
//  QRCode.m
//  Telegraph
//
//  Created by Apple on 2018/8/22.
//

#import "QRCode.h"

@implementation QRCode

- (void)scan:(NSArray *)array {
    NSNumber *listenerId = [array objectAtIndex:0];
    JSBundle *bundel = array[1];
    NSString *cardName = @"";
    UIImage *avatar = [UIImage imageNamed:@""];
    // 实例化扫描控制器
    HMScannerController *scanner = [HMScannerController scannerWithCardName:cardName avatar:avatar completion:^(NSString *stringValue) {
        [bundel callJS:listenerId code:0 params:[NSArray arrayWithObjects:stringValue, nil]];
    }];
    [scanner setTitleColor:[UIColor whiteColor] tintColor:[UIColor greenColor]];
    [[BaseObject getVc] showDetailViewController:scanner sender:nil];
}

@end
