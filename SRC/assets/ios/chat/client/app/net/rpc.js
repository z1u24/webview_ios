_$define("chat/client/app/net/rpc", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var message_s_1 = require("../../../server/data/db/message.s");
var basic_p_1 = require("../../../server/data/rpc/basic.p");
var basic_s_1 = require("../../../server/data/rpc/basic.s");
var group_p_1 = require("../../../server/data/rpc/group.p");
var group_s_1 = require("../../../server/data/rpc/group.s");
var message_p_1 = require("../../../server/data/rpc/message.p");
var message_s_2 = require("../../../server/data/rpc/message.s");
var user_p_1 = require("../../../server/data/rpc/user.p");
var user_s_1 = require("../../../server/data/rpc/user.s");
var store_1 = require("../data/store");
var init_1 = require("./init");
// ================================================ 导出
/**
 * 普通用户注册
 * @param name user name
 * @param passwd user passwd
 * @param cb callback
 */
exports.register = function (name, passwdHash, cb) {
    var info = new basic_s_1.UserRegister();
    info.name = name;
    info.passwdHash = passwdHash;
    init_1.clientRpcFunc(basic_p_1.registerUser, info, function (r) {
        store_1.setStore("userInfoMap/" + r.uid, r);
        cb(r);
    });
};
/**
 * 普通用户登录
 * @param uid user id
 * @param passwdHash passwd hash
 * @param cb callback
 */
exports.login = function (uid, passwdHash, cb) {
    // 本地账户登录
    var userType = new basic_s_1.UserType();
    userType.enum_type = basic_s_1.UserType_Enum.DEF;
    var info = new basic_s_1.LoginReq();
    info.uid = uid;
    info.passwdHash = passwdHash;
    userType.value = info;
    init_1.clientRpcFunc(basic_p_1.login, userType, function (r) {
        cb(r);
    });
};
/**
 * 钱包登录
 * @param uid user id
 * @param passwdHash passwd hash
 * @param cb callback
 */
exports.walletLogin = function (openid, sign, cb) {
    var userType = new basic_s_1.UserType();
    userType.enum_type = basic_s_1.UserType_Enum.WALLET;
    var walletLoginReq = new basic_s_1.WalletLoginReq();
    walletLoginReq.openid = openid;
    walletLoginReq.sign = sign;
    userType.value = walletLoginReq;
    init_1.clientRpcFunc(basic_p_1.login, userType, function (r) {
        cb(r);
    });
};
/**
 * 获取用户基本信息
 *
 * @param uid user id
 */
exports.getUsersBasicInfo = function (uids, cb) {
    var info = new basic_s_1.GetUserInfoReq();
    info.uids = uids;
    init_1.clientRpcFunc(basic_p_1.getUsersInfo, info, function (r) {
        cb(r);
    });
};
/**
 * 单聊
 * @param rid reader id
 * @param msg message
 * @param cb callback
 */
exports.sendMessage = function (rid, msg, cb) {
    var msgType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : message_s_1.MSG_TYPE.TXT;

    var info = new message_s_2.UserSend();
    info.msg = msg;
    info.mtype = msgType;
    info.rid = rid;
    info.time = new Date().getTime();
    init_1.clientRpcFunc(message_p_1.sendUserMessage, info, function (r) {
        cb(r);
    });
};
/**
 * 申请添加rid为好友
 * @param rid reader id
 * @param cb callback
 */
exports.applyFriend = function (user, cb) {
    init_1.clientRpcFunc(user_p_1.applyFriend, user, function (r) {
        cb(r);
    });
};
/**
 * 接受对方为好友
 * @param rid reader
 * @param cb callback
 */
exports.acceptFriend = function (rid, agree, cb) {
    var userAgree = new user_s_1.UserAgree();
    userAgree.uid = rid;
    userAgree.agree = agree;
    init_1.clientRpcFunc(user_p_1.acceptFriend, userAgree, function (r) {
        cb(r);
    });
};
/**
 * 删除好友
 * @param rid reader id
 * @param cb callback
 */
exports.delFriend = function (rid, cb) {
    init_1.clientRpcFunc(user_p_1.delFriend, rid, function (r) {
        cb(r);
    });
};
// ================  debug purpose ==========================
// 创建群聊  need_agree：入群是否需要同意
exports.createGroup = function (name, avatar, note, need_agree, cb) {
    var group = new group_s_1.GroupCreate();
    group.note = note;
    group.name = name;
    group.avatar = avatar;
    group.need_agree = need_agree;
    init_1.clientRpcFunc(group_p_1.createGroup, group, function (r) {
        cb(r);
    });
};
// 邀请用户入群
exports.inviteUsersToGroup = function (gid, arr, cb) {
    var inviteArray = new group_s_1.InviteArray();
    arr.forEach(function (item) {
        var invite = new group_s_1.Invite();
        invite.gid = gid;
        invite.rid = item;
        inviteArray.arr.push(invite);
    });
    init_1.clientRpcFunc(group_p_1.inviteUsers, inviteArray, function (r) {
        cb(r);
    });
};
exports.deleteGroupMember = function () {
    var req = '11111:4';
    init_1.clientRpcFunc(group_p_1.delMember, req, function (r) {
        console.log(r);
    });
};
exports.deleteGroup = function () {
    var gid = 11111;
    init_1.clientRpcFunc(group_p_1.dissolveGroup, gid, function (r) {
        console.log(r);
    });
};
exports.sendGroupMsg = function () {
    var msg = new message_s_2.GroupSend();
    msg.gid = 11111;
    msg.msg = 'hi group';
    msg.mtype = 0;
    msg.time = Date.now();
    init_1.clientRpcFunc(message_p_1.sendGroupMessage, msg, function (r) {
        console.log(r);
    });
};
exports.addAdministror = function (uid) {
    var guid = "11111:" + uid.toString();
    init_1.clientRpcFunc(group_p_1.addAdmin, guid, function (r) {
        console.log(r);
    });
};
exports.applyGroup = function (gid) {
    init_1.clientRpcFunc(group_p_1.applyJoinGroup, gid, function (r) {
        console.log(r);
    });
};
exports.acceptUserJoin = function (uid, accept) {
    var ga = new group_s_1.GroupAgree();
    ga.agree = accept;
    ga.gid = 11111;
    ga.uid = uid;
    init_1.clientRpcFunc(group_p_1.acceptUser, ga, function (r) {
        console.log(r);
    });
};
exports.getGroupInfo = function () {
    var groups = new basic_s_1.GetGroupInfoReq();
    groups.gids = [11111];
    init_1.clientRpcFunc(basic_p_1.getGroupsInfo, groups, function (r) {
        console.log(r);
    });
};
exports.friendLinks = function (uuid) {
    var x = new basic_s_1.GetFriendLinksReq();
    x.uuid = [uuid];
    init_1.clientRpcFunc(basic_p_1.getFriendLinks, x, function (r) {
        console.log(r);
    });
};
self.friendLinks = function (uuid) {
    exports.friendLinks(uuid);
};
self.subscribeGroupMsg = function (topicName) {
    init_1.subscribe(topicName, message_s_1.GroupMsg, function (r) {
        // TODO:
    });
};
self.getGroupInfo = function () {
    exports.getGroupInfo();
};
self.login = function (uid, passwdHash) {
    exports.login(uid, passwdHash, function (r) {
        console.log(r);
    });
};
self.register = function (name, passwdHash) {
    exports.register(name, passwdHash, function (r) {
        console.log(r);
    });
};
self.deleteGroupMember = function () {
    exports.deleteGroupMember();
};
self.deleteGroup = function () {
    exports.deleteGroup();
};
self.sendGroupMsg = function () {
    exports.sendGroupMsg();
};
self.sendMessage = function (uid, msg) {
    exports.sendMessage(uid, msg, function (r) {
        console.log(r);
    });
};
self.addAdministror = function (uid) {
    exports.addAdministror(uid);
};
self.applyGroup = function (gid) {
    exports.applyGroup(gid);
};
self.acceptUserJoin = function (uid, accept) {
    exports.acceptUserJoin(uid, accept);
};
self.inviteUsersToGroup = function (gid) {
    exports.inviteUsersToGroup();
};
})