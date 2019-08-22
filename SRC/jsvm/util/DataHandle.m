//
//  DataHandle.m
//  looooooper
//
//  Created by yineng on 2019/7/15.
//  Copyright © 2019 com.z1u24. All rights reserved.
//

#import "DataHandle.h"

@implementation DataHandle

- (NSString *)getContent {
    return _data;
}

- (void)runScript{
    [[JSContext currentContext] evaluateScript:_data withSourceURL:[NSURL URLWithString:_filePath]];
}

- (void)setContent:(NSString *)content file:(NSString *)fileName{
    _data = content;
    _filePath = fileName;
}

@end
