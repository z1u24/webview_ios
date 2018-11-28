
#import <UIKit/UIKit.h>

@interface JSIntercept : NSObject

+ (void)safeFile:(NSString *)path content:(NSString *)base64Str saveID:(NSNumber *)saveID;

@end
