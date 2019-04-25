//
//  JSValue_Extension.m
//  WebViewPro
//
//  Created by cifer on 2019/4/24.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "JSValue_Extension.h"

@implementation JSValue (Extension)

- (JSValue *)callWithArgumentsNoNil:(NSArray *)arguments {
    if ([self.toString isEqualToString:@"undefined"]) {
        return nil;
    }
    return [self callWithArguments:arguments];
}

@end

