//
//  JSValue_Extension.h
//  WebViewPro
//
//  Created by cifer on 2019/4/24.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

@interface JSValue (Extension)

- (JSValue *)callWithArgumentsNoNil:(NSArray *)arguments;

@end
