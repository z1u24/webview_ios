//
//  IAPManager.h
//  WebViewPro
//
//  Created by yineng on 2019/3/30.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "BaseObject.h"
#import <StoreKit/StoreKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface IAPManager : BaseObject <SKProductsRequestDelegate,SKPaymentTransactionObserver>

- (void)addTransactionObserver:(CallJS)callJS;
- (void)removeTransactionObserver:(CallJS)callJS;
- (void)IAPurchase:(NSString *)sm sd:(NSString *)sd callJS:(CallJS)callJS;
//- (void)sendJSTransation:(NSNumber *)issuccess sd:(NSString *)sd transation:(NSString *)transation;
@end

NS_ASSUME_NONNULL_END
