//
//  QRCode.h
//  WebViewPro
//
//  Created by Apple on 2018/8/22.
//  Copyright © 2018年 kupay. All rights reserved.
//

#ifndef QRCode_h
#define QRCode_h

#import <Foundation/Foundation.h>
#import "HMScannerController.h"
#import "WebViewController.h"
#import "JSBundle.h"
#import "BaseObject.h"

@interface QRCode : BaseObject

- (void)scan:(NSArray *)array;

@end

#endif /* QRCode_h */
