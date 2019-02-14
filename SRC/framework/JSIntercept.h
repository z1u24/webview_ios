
#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

@interface JSIntercept : NSObject

- (instancetype)initWithWebView:(WKWebView *)webview update:(NSNumber *)update;

- (void)saveFile:(NSString *)path content:(NSString *)base64Str listenID:(NSNumber *)listenID;

- (void)getBootFiles:(NSNumber *)listenID;

- (void)restartApp;

- (void)getAppVersion:(NSNumber *)listenID;

- (void)updateApp:(NSString *)url;


@end
