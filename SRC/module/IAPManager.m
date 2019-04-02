//
//  IAPManager.m
//  WebViewPro
//
//  Created by yineng on 2019/3/30.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "IAPManager.h"
#import "WebViewController.h"


@implementation IAPManager{
    CallJS selCallJS;
    NSString *sID;
    NSString *sOD;
    NSMutableDictionary *transDic;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        if ([[NSUserDefaults standardUserDefaults] objectForKey:@"trans"] != NULL) {
            sOD = [[NSUserDefaults standardUserDefaults] objectForKey:@"trans"];
            [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"trans"];
        }else{
            sOD = @"";
        }
    }
    return self;
}

- (void)addTransactionObserver:(CallJS)callJS{
    [[SKPaymentQueue defaultQueue] addTransactionObserver:self];
    callJS(Success,@[@"success"]);
}

//当交易成功后可以调用该方法移除支付监听
- (void)removeTransactionObserver:(CallJS)callJS{
    [[SKPaymentQueue defaultQueue] addTransactionObserver:self];
    callJS(Success,@[@"success"]);
}

//sm : 商品ID
//sd : 订单ID
- (void)IAPurchase:(NSString *)sm sd:(NSString *)sd callJS:(CallJS)callJS{
    if ([SKPaymentQueue canMakePayments]) {
        selCallJS = callJS;
        sID = sm;
        sOD = sd;
        [[NSUserDefaults standardUserDefaults] setObject:sOD forKey:@"trans"];
        [[NSUserDefaults standardUserDefaults] synchronize];
        [self getRequestAppleProduct];
    }else{
        callJS(Fail, @[@"not allow"]);
    }
}

- (void)getRequestAppleProduct{
    //商品ID
    NSArray *product = [[NSArray alloc] initWithObjects:sID,nil];
    NSSet *nsset = [NSSet setWithArray:product];
    //执行请求
    SKProductsRequest *request = [[SKProductsRequest alloc] initWithProductIdentifiers:nsset];
    request.delegate = self;
    [request start];
}

//接收到产品的返回信息,然后用返回的商品信息进行发起购买请求
- (void)productsRequest:(SKProductsRequest *)request didReceiveResponse:(SKProductsResponse *)response{
    NSArray *product = response.products;
    //如果服务器没有产品
    if([product count] == 0){
        selCallJS(Fail,@[@"nothing to buy"]);
        return;
    }
    SKProduct *requestProduct = nil;
    for (SKProduct *pro in product) {
        // 如果后台消费条目的ID与我这里需要请求的一样（用于确保订单的正确性）
        if([pro.productIdentifier isEqualToString:sID]){
            requestProduct = pro;
        }
    }
    //发送购买请求
    SKPayment *payment = [SKPayment paymentWithProduct:requestProduct];
    [[SKPaymentQueue defaultQueue] addPayment:payment];
}

//请求失败
- (void)request:(SKRequest *)request didFailWithError:(NSError *)error{
    NSString *err = [NSString stringWithFormat:@"%@",error];
    selCallJS(Fail,@[err]);
}

//反馈请求的产品信息结束后
- (void)requestDidFinish:(SKRequest *)request{
    NSLog(@"信息反馈结束");
}

//监听购买结果
//网络不稳定时会导致该回调不及时，造成丢包
- (void)paymentQueue:(SKPaymentQueue *)queue updatedTransactions:(NSArray<SKPaymentTransaction *> *)transactions{
    for(SKPaymentTransaction *tran in transactions){
        switch (tran.transactionState) {
            case SKPaymentTransactionStatePurchased:
                //tran抛给高层用于验证
                [self completeTransaction:tran sd:sOD];
                [transDic removeObjectForKey:sOD];
                [[NSUserDefaults standardUserDefaults] setObject:transDic forKey:@"trans"];
                if (selCallJS != NULL) {
                    selCallJS(Success,@[@"交易完成"]);
                }
                NSLog(@"交易完成");
                break;
            case SKPaymentTransactionStatePurchasing:
                //将商品添加到本地存储
                NSLog(@"商品添加进列表");
                break;
            case SKPaymentTransactionStateRestored:
                NSLog(@"已经购买过商品");
                [[SKPaymentQueue defaultQueue] finishTransaction:tran];
                if (selCallJS != NULL) {
                    selCallJS(Fail,@[@"该订单已经完成"]);
                }
                break;
            case SKPaymentTransactionStateFailed:
                NSLog(@"交易失败");
                [[SKPaymentQueue defaultQueue] finishTransaction:tran];
                if (selCallJS != NULL) {
                    selCallJS(Fail,@[@"交易失败"]);
                }
                break;
            default:
                break;
        }
    }
}

- (void)completeTransaction:(SKPaymentTransaction *)transaction sd:(NSString *)sd{
    NSURL *receiptURL = [[NSBundle mainBundle] appStoreReceiptURL];
    // 从沙盒中获取到购买凭据
    NSData *receiptData = [NSData dataWithContentsOfURL:receiptURL];
    NSString *encodeStr = [receiptData base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithLineFeed];
    [self sendJSTransation:[NSNumber numberWithInt:1] sd:sd transation:encodeStr];
    [[SKPaymentQueue defaultQueue] finishTransaction:transaction];
}

- (void)sendJSTransation:(NSNumber *)issuccess sd:(NSString *)sd transation:(NSString *)transation{
    WebViewController *wb = [WebViewController sharedInstence];
    [wb.bridge sendJS:@"iap_manager" name:@"transation" params:@[issuccess,sd,transation]];
}


@end
