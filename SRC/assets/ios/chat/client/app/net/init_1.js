_$define("chat/client/app/net/init_1", function (require, exports, module){
"use strict";
/**
 * RPC， 远程方法调用
 * 采用 mqtt上定义的每会话的$req和$resp主题，来发送请求和接受响应
 * 建立网络响应客户端的
 */

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================ 导入
var JSAPI_1 = require("../../../../app/api/JSAPI");
var ipConfig_1 = require("../../../../app/ipConfig");
var walletStore = require("../../../../app/store/memstore");
var user_s_1 = require("../../../server/data/db/user.s");
var message_s_1 = require("../../../server/data/rpc/message.s");
var user_p_1 = require("../../../server/data/rpc/user.p");
var initStore_1 = require("../data/initStore");
var store = require("../data/store");
var autologin_1 = require("../logic/autologin");
var logic_1 = require("../logic/logic");
var init2 = require("./init");
// ================================================ 导出
/**
 * 客户端初始化
 */
exports.initClient = function (server, port) {
    init2.initClient(server, port);
};
/**
 * 注册了所有可以rpc调用的结构体
 * @param fileMap file map
 */
exports.registerRpcStruct = function (fileMap) {
    init2.registerRpcStruct(fileMap);
};
// ===================================登陆相关
/**
 * 钱包 登陆或注册聊天
 */
exports.walletSignIn = function () {
    if (!loginChatFg) {
        JSAPI_1.getOpenId('101', function (r) {
            var openId = String(r.openid);
            if (openId) {
                init2.login(autologin_1.UserType.WALLET, openId, 'sign', function (r) {
                    loginChatFg = false;
                    if (r && r.uid > 0) {
                        console.log('聊天登陆成功！！！！！！！！！！！！！！');
                        store.setStore("uid", r.uid);
                        store.setStore("userInfoMap/" + r.uid, r);
                        init2.init(r.uid);
                        init2.subscribe(r.uid.toString(), message_s_1.SendMsg, function (v) {
                            if (v.code === 1) {
                                initStore_1.getFriendHistory(v.rid);
                            }
                            // updateUserMessage(v.msg.sid, v);
                        });
                        exports.setUserInfo();
                    } else {
                        logic_1.bottomNotice('钱包登陆失败');
                    }
                });
            }
        });
    }
    loginChatFg = true;
};
/**
 * 改变用户信息
 */
exports.setUserInfo = function () {
    var user = walletStore.getStore('user/info');
    var walletAddr = walletStore.getStore('user/id');
    var r = new user_s_1.UserInfo();
    r.uid = store.getStore('uid');
    r.sex = 0;
    r.note = '';
    r.name = user.nickName;
    r.avatar = user.avatar;
    r.tel = user.phoneNumber;
    r.wallet_addr = walletAddr;
    init2.clientRpcFunc(user_p_1.changeUserInfo, r, function (res) {
        if (res && res.uid > 0) {
            store.setStore("userInfoMap/" + r.uid, r);
        }
    });
};
// 登陆聊天方法执行标记
var loginChatFg = void 0;
walletStore.register('user/isLogin', function (r) {
    if (r) {
        // 如果钱包登陆成功，聊天创建链接
        exports.initClient(ipConfig_1.chatLogicIp, ipConfig_1.chatLogicPort);
    }
});
})