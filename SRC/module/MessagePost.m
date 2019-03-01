//
//  MessagePost.m
//  WebViewPro
//
//  Created by yineng on 2019/2/14.
//  Copyright © 2019 kuplay. All rights reserved.
//

#import "MessagePost.h"

@implementation MessagePost

//绑定账号
- (void)bindAccount:(NSString *)account callJS:(CallJS)callJS{
    [CloudPushSDK bindAccount:account withCallback:^(CloudPushCallbackResult *res) {
        if(res.success){
            callJS(Success,@[@""]);
        }else{
            callJS(Fail,@[@""]);
        }
    }];
}

//解绑账号
- (void)unbindAccount:(CallJS)callJS{
    [CloudPushSDK unbindAccount:^(CloudPushCallbackResult *res) {
        if(res.success){
            callJS(Success,@[@""]);
        }else{
            callJS(Fail,@[@""]);
        }
    }];
}


//1：本设备；2：本设备绑定账号；3：别名
- (void)bindTag:(int)target withTags:(NSArray *)tags withAlias:(NSString *)alias callJS:(CallJS)callJS{
    [CloudPushSDK bindTag:target withTags:tags withAlias:alias withCallback:^(CloudPushCallbackResult *res) {
        if(res.success){
            callJS(Success,@[@""]);
        }else{
            callJS(Fail,@[@""]);
        }
    }];
    
}

//解绑标签
- (void)unbindTag:(int)target withTags:(NSArray *)tags withAlias:(NSString *)alias callJS:(CallJS)callJS{
    [CloudPushSDK unbindTag:target withTags:tags withAlias:alias withCallback:^(CloudPushCallbackResult *res) {
        if(res.success){
            callJS(Success,@[@""]);
        }else{
            callJS(Fail,@[@""]);
        }
    }];
}

//查询本设备标签
- (void)listTags:(CallJS)callJS{
    [CloudPushSDK listTags:1 withCallback:^(CloudPushCallbackResult *res) {
        if(res.success){
            callJS(Success,res.data);
        }else{
            callJS(Fail,@[@""]);
        }
    }];
}

//添加别名
- (void)addAlias:(NSString *)alias callJS:(CallJS)callJS{
    [CloudPushSDK addAlias:alias withCallback:^(CloudPushCallbackResult *res) {
        if(res.success){
            callJS(Success,@[@""]);
        }else{
            callJS(Fail,@[@""]);
        }
    }];
}

//删除别名
- (void)removeAlias:(NSString *)alias callJS:(CallJS)callJS{
    [CloudPushSDK removeAlias:alias withCallback:^(CloudPushCallbackResult *res) {
        if(res.success){
            callJS(Success,@[@""]);
        }else{
            callJS(Fail,@[@""]);
        }
    }];
}

//查询别名listAliases
- (void)listAliases:(CallJS)callJS{
    [CloudPushSDK listAliases:^(CloudPushCallbackResult *res) {
        if(res.success){
            callJS(Success,res.data);
        }else{
            callJS(Fail,@[@""]);
        }
    }];
}



@end
