//
//  main.m
//  test
//
//  Created by yineng on 2018/8/7.
//  Copyright © 2018年 kupay. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WebViewAppDelegate.h"

#import "JSBundle.h"

#import "Argon2/argon2.h"

char toHexChar(uint8_t num) {
    char r = '0';
    if (num >= 0 && num < 10) {
        return r + num;
    }
    
    switch(num) {
        case 10:
        r = 'a';
        break;
        case 11:
        r = 'b';
        break;
        case 12:
        r = 'c';
        break;
        case 13:
        r = 'd';
        break;
        case 14:
        r = 'e';
        break;
        case 15:
        r = 'f';
        break;
    }
    return r;
}

char* convertHexString(uint8_t *data, int len)
{
    char *r = malloc(2 * len + 1);
    for (int i = 0; i < len; ++i) {
        uint8_t item = data[i];
        r[2 * i] = toHexChar(item / 16);
        r[2 * i + 1] = toHexChar(item % 16);
    }
    r[2 * len] = 0;
    return r;
}

// type: d = 0, i = 1, id = 2
NSString* argon2Hash(NSNumber *iter, NSNumber *memory, NSNumber *parallelism, NSString *password, NSString *salt, NSNumber *type, NSNumber *hashLen) {
    char *pwd = [password UTF8String];
    char *saltImpl = [salt UTF8String];
    uint8_t *hash = malloc(hashLen.intValue);
    
    argon2_hash(iter.intValue, memory.intValue, parallelism.intValue,
                pwd, strlen(pwd), saltImpl, strlen(saltImpl), hash, hashLen.intValue, NULL, 0, type.intValue, ARGON2_VERSION_NUMBER);

    char *hexStr = convertHexString(hash, hashLen.intValue);
    NSString *r = [NSString stringWithUTF8String:hexStr];
    free(hash);
    free(hexStr);
    return r;
}

int main(int argc, char * argv[]) {
    @autoreleasepool {

        NSNumber *iter = [NSNumber numberWithInt:1];
        NSNumber *memory = [NSNumber numberWithInt:1024];
        NSNumber *parallelism = [NSNumber numberWithInt:1];
        NSString *password = @"password";
        NSString *salt = @"somesalt";
        NSNumber *hashLen = [NSNumber numberWithInt:32];
        NSNumber *type = [NSNumber numberWithInt:0];
        NSString *hash = argon2Hash(iter, memory, parallelism, password, salt, type, hashLen);
        
        NSLog(hash);
        
        return UIApplicationMain(argc, argv, nil, NSStringFromClass([AppDelegate class]));
    }
}
