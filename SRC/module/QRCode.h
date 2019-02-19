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
#import "BaseObject.h"

typedef void (^CallJS)(CallJSType callJSType, NSArray *params);

@interface QRCode : BaseObject

- (void)scan:(CallJS)callJS;

@end

#endif /* QRCode_h */
