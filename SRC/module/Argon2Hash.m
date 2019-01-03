//
//  Argon2Hash.m
//  Telegraph
//
//  Created by yineng on 2018/8/13.
//

#import <Foundation/Foundation.h>
#import "Argon2Hash.h"

static char toHexChar(uint8_t num) {
    char r = '0';
    if (num >= 0 && num < 10) {
        return r + num;
    }

    switch (num) {
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

static char *convertHexString(uint8_t *data, int len) {
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
static NSString *argon2Hash(NSNumber *iter, NSNumber *memory, NSNumber *parallelism, NSString *password, NSString *salt, NSNumber *type, NSNumber *hashLen) {
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


@implementation ArgonHash

- (void)getArgon2Hash:(NSNumber *)iter memory:(NSNumber *)memory parallelism:(NSNumber *)parallelism password:(NSString *)password salt:(NSString *)salt type:(NSNumber *)type
              hashLen:(NSNumber *)hashLen callJS:(CallJS)callJS{
    //[self printCurrentMillions];//打印当前时间
    dispatch_queue_t agron2HashQueue = dispatch_queue_create("agron2HashQueue", DISPATCH_QUEUE_CONCURRENT);
    dispatch_async(agron2HashQueue, ^{
        NSString *result = argon2Hash(iter, memory, parallelism, password, salt, type, hashLen);
        dispatch_async(dispatch_get_main_queue(), ^{
            callJS(Success,@[result]);
            //[self printCurrentMillions];//打印当前时间
        });
    });
}


- (void)printCurrentMillions {
    // 获取系统当前时间
    NSDate *date = [NSDate date];
    NSTimeInterval sec = [date timeIntervalSinceNow];
    NSDate *currentDate = [[NSDate alloc] initWithTimeIntervalSinceNow:sec];
    //设置时间输出格式：
    NSDateFormatter *df = [[NSDateFormatter alloc] init];
    [df setDateFormat:@"yyyy年MM月dd日 HH小时mm分ss秒"];
    NSString *na = [df stringFromDate:currentDate];
    NSLog(@"系统当前时间为：%@", na);
}

@end
