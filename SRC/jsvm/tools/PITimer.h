//
//  PITimer.h
//  WebViewPro
//
//  Created by yineng on 2019/7/16.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "callBack.h"

@interface PITimer : NSObject
-(int)setTimeout:(callBack)func time:(NSNumber *)timeout;
-(void)clearTimeout:(NSNumber *)timeout;
-(int)setInterval:(callBack)func time:(NSNumber *)timeout;

@end
