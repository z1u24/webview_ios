_$define("chat/client/rpc/rpcs", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var client_stub_1 = require("./client_stub");
var send_message_s_1 = require("../../server/rpc/send_message.s");
var send_message_p_1 = require("../../server/rpc/send_message.p");
var basic_s_1 = require("../../server/data/rpc/basic.s");
var basic_p_1 = require("../../server/data/rpc/basic.p");
var user_s_1 = require("../../server/data/db/user.s");
var message_s_1 = require("../../server/data/rpc/message.s");
var message_s_2 = require("../../server/data/db/message.s");
var message_p_1 = require("../../server/data/rpc/message.p");
var sendMessage = function sendMessage(uid, message) {
    var msg = new send_message_s_1.sendMessage();
    msg.src = "uid-123";
    msg.dst = uid;
    msg.msgType = 1;
    msg.msgId = 1;
    msg.payload = message;
    client_stub_1.callRemoteRpc(send_message_p_1.sendMessage, msg, send_message_s_1.messageReceivedAck, function (r) {
        console.log(r);
    });
};
var sendP2PMessage = function sendP2PMessage(uid, txt) {
    var msg = new message_s_1.UserSend();
    msg.rid = uid;
    msg.time = 0;
    msg.mtype = 0;
    msg.msg = txt;
    client_stub_1.callRemoteRpc(message_p_1.sendUserMessage, msg, message_s_2.UserHistory, function (r) {
        console.log(r);
    });
};
var login = function login(uid, passwd) {
    var loginReq = new basic_s_1.LoginReq();
    loginReq.uid = uid;
    loginReq.passwdHash = '0xacef123';
    client_stub_1.callRemoteRpc(basic_p_1.login, loginReq, user_s_1.UserInfo, function (r) {
        console.log(r);
    });
};
var registry = function registry(userName) {
    var u = new basic_s_1.UserRegister();
    u.name = userName;
    u.passwdHash = '0xacef123';
    client_stub_1.callRemoteRpc(basic_p_1.registerUser, u, user_s_1.UserInfo, function (r) {
        console.log(r);
    });
};
var getUserInfo = function getUserInfo(uid) {
    var info = new basic_s_1.GetUserInfoReq();
    info.uids = [uid];
    client_stub_1.callRemoteRpc(basic_p_1.getUsersInfo, info, basic_s_1.UserArray, function (r) {
        console.log(r);
    });
};
// ---------------------------  console test purpose -------------------------
// (<any>self).sendMessage = (channleId: string, msg: string) => {
//     sendMessage(channleId, msg);
// }
// (<any>self).login = (uid: number, passwd: string) => {
//     login(uid, passwd);
// }
// (<any>self).subscribe = (channleId: string) => {
//     subscribeChannel(channleId);
// }
// (<any>self).registry = (userName: string) => {
//     registry(userName);
// }
// (<any>self).getUserInfo = (uid: number) => {
//     getUserInfo(uid);
// }
// (<any>self).sendP2PMessage = (uid: number, txt: string) => {
//     sendP2PMessage(uid, txt);
// }
})