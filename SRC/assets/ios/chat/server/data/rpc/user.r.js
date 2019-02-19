_$define("chat/server/data/rpc/user.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用户相关的rpc操作
 */
// ================================================================= 导入
var bon_1 = require("../../../../pi/util/bon");
var rpc_server_1 = require("../../../../pi_pt/net/rpc_server");
var js_net_1 = require("../../../../pi_pt/rust/pi_serv/js_net");
var db_1 = require("../../../utils/db");
var send_1 = require("../../../utils/send");
var util_1 = require("../../../utils/util");
var CONSTANT = require("../constant");
var message_s_1 = require("../db/message.s");
var user_s_1 = require("../db/user.s");
var basic_s_1 = require("./basic.s");
var group_r_1 = require("./group.r");
var message_r_1 = require("./message.r");
var message_s_2 = require("./message.s");
// ================================================================= 导出
/**
 * 申请添加对方为好友
 * @param uid uid
 */
// #[rpc=rpcServer]
exports.applyFriend = function (user) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var sid = group_r_1.getUid();
    // 获取用户UID
    var userFindBucket = new db_1.Bucket(CONSTANT.WARE_NAME, user_s_1.UserFind._$info.name, dbMgr);
    var rArr = userFindBucket.get(["u:" + user, "w:" + user, "p:" + user]);
    console.log('!!!!!!!!!!!!!!!applyFriend rArr:', rArr);
    var uid = void 0;
    rArr.forEach(function (r) {
        if (r) {
            return uid = r.uid;
        }
    });
    var result = new basic_s_1.Result();
    if (!uid) {
        result.r = -2; // 添加的好友不存在
        return result;
    }
    console.log('!!!!!!!!!!!uid:', uid);
    if (sid === uid) {
        result.r = -1; // 不能添加自己为好友
        return result;
    }
    // 取出联系人表
    var contactBucket = new db_1.Bucket(CONSTANT.WARE_NAME, CONSTANT.CONTACT_TABLE, dbMgr);
    var friendLinkBucket = new db_1.Bucket(CONSTANT.WARE_NAME, CONSTANT.FRIEND_LINK_TABLE, dbMgr);
    var friend1 = friendLinkBucket.get(util_1.genUuid(sid, uid))[0];
    var friend2 = friendLinkBucket.get(util_1.genUuid(uid, sid))[0];
    console.log('applyFriend friend1: ', friend1, 'friend2: ', friend2);
    var contact = contactBucket.get(sid)[0]; // 当前用户的联系人列表
    // 当前用户的黑名单中是否有uid
    if (contact.blackList.findIndex(function (item) {
        return item === uid;
    }) > -1) {
        exports.removeFromBlackList(uid); // 从黑名单中移出
        result.r = 1;
        return result;
    } else if (friend1 && friend2) {
        result.r = 0; // 已经是好友，不需要重复添加
        return result;
    }
    var SUID = CONSTANT.CUSTOMER_SERVICE; // 客服账号
    if (user === SUID.toString()) {
        // 添加客服为好友，直接添加无需同意
        var friendLink = new user_s_1.FriendLink();
        friendLink.uuid = util_1.genUuid(sid, SUID);
        friendLink.alias = '';
        friendLink.hid = util_1.genUserHid(sid, SUID);
        friendLinkBucket.put(friendLink.uuid, friendLink);
        friendLink.uuid = util_1.genUuid(SUID, sid);
        friendLinkBucket.put(friendLink.uuid, friendLink);
        var curUser = contactBucket.get(sid)[0];
        curUser.friends.push(SUID);
        contactBucket.put(sid, curUser); // 添加好友到当前用户联系人表
        var serUser = contactBucket.get(SUID)[0];
        serUser.friends.push(sid);
        contactBucket.put(SUID, serUser); // 添加好友到客服联系人表
        // 客服发送的第一条欢迎消息
        exports.autoReplayMessage('我是KuPlay客服，欢迎您使用KuPlay，如果您对产品有什么意见或建议可以直接提出，如果建议被采纳，还有奖励哦^_^');
        result.r = 1;
        return result;
    }
    // 取出对应的那一个联系人列表
    var contactInfo = contactBucket.get(uid)[0];
    var ind = contactInfo.blackList.findIndex(function (item) {
        return item === sid;
    }); // uid的黑名单中是否有当前用户
    if (ind > -1) {
        // 在黑名单中则不添加到申请人列表中
        result.r = 1;
        return result;
    }
    contactInfo.applyUser.findIndex(function (item) {
        return item === sid;
    }) === -1 && contactInfo.applyUser.push(sid);
    contactBucket.put(uid, contactInfo);
    result.r = 1;
    return result;
};
/**
 * 客服自动发布的消息
 */
exports.autoReplayMessage = function (mess) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var userHistoryBucket = new db_1.Bucket('file', CONSTANT.USER_HISTORY_TABLE, dbMgr);
    var msgLockBucket = new db_1.Bucket('file', CONSTANT.MSG_LOCK_TABLE, dbMgr);
    var SUID = CONSTANT.CUSTOMER_SERVICE; // 客服账号
    var sid = group_r_1.getUid();
    var userHistory = new message_s_1.UserHistory();
    var userMsg = new message_s_1.UserMsg();
    userMsg.cancel = false;
    userMsg.msg = mess;
    userMsg.mtype = message_s_1.MSG_TYPE.TXT;
    userMsg.read = false;
    userMsg.send = true;
    userMsg.sid = SUID;
    userMsg.time = Date.now();
    userHistory.msg = userMsg;
    var msgLock = new message_s_1.MsgLock();
    msgLock.hid = util_1.genUserHid(sid, SUID);
    // 这是一个事务
    msgLockBucket.readAndWrite(msgLock.hid, function (mLock) {
        mLock[0] === undefined ? msgLock.current = 0 : msgLock.current = util_1.genNextMessageIndex(mLock[0].current);
        return msgLock;
    });
    userHistory.hIncId = util_1.genHIncId(msgLock.hid, msgLock.current);
    userHistoryBucket.put(userHistory.hIncId, userHistory);
    // 推送消息ID
    var sendMsg = new message_s_2.SendMsg();
    sendMsg.code = 1;
    sendMsg.last = msgLock.current;
    sendMsg.rid = SUID;
    var buf = new bon_1.BonBuffer();
    sendMsg.bonEncode(buf);
    var mqttServer = rpc_server_1.getEnv().getNativeObject('mqttServer');
    js_net_1.mqttPublish(mqttServer, true, js_net_1.QoS.AtMostOnce, sid.toString(), buf.getBuffer());
    console.log("from " + SUID + " to " + sid + ", message is : " + JSON.stringify(sendMsg));
    return userHistory;
};
/**
 * 接受对方为好友
 * @param agree user agree
 */
// #[rpc=rpcServer]
exports.acceptFriend = function (agree) {
    var _acceptFriend = function _acceptFriend(sid, rid, agree) {
        var dbMgr = rpc_server_1.getEnv().getDbMgr();
        var contactBucket = new db_1.Bucket(CONSTANT.WARE_NAME, CONSTANT.CONTACT_TABLE, dbMgr);
        // 获取当前用户的联系人列表
        var sContactInfo = contactBucket.get(sid)[0];
        // 从申请列表中删除当前同意/拒绝的用户
        console.log("sContactInfo.applyFriend is " + sContactInfo.applyUser);
        // 判断对方是否邀请了该用户,如果没有邀请，则直接返回
        if (sContactInfo.applyUser.findIndex(function (item) {
            return item === rid;
        }) === -1) {
            var rlt = new basic_s_1.Result();
            rlt.r = -1;
            return rlt;
        }
        sContactInfo.applyUser = util_1.delValueFromArray(rid, sContactInfo.applyUser);
        // 在对方的列表中添加好友
        var rContactInfo = contactBucket.get(rid)[0];
        rContactInfo.applyUser = util_1.delValueFromArray(sid, rContactInfo.applyUser);
        if (agree) {
            rContactInfo.friends.findIndex(function (item) {
                return item === sid;
            }) === -1 && rContactInfo.friends.push(sid);
            // 在当前用户列表中添加好友
            sContactInfo.friends.findIndex(function (item) {
                return item === rid;
            }) === -1 && sContactInfo.friends.push(rid);
            // 分别插入到friendLink中去
            var friendLinkBucket = new db_1.Bucket(CONSTANT.WARE_NAME, CONSTANT.FRIEND_LINK_TABLE, dbMgr);
            var friendLink = new user_s_1.FriendLink();
            friendLink.uuid = util_1.genUuid(sid, rid);
            friendLink.alias = '';
            friendLink.hid = util_1.genUserHid(sid, rid);
            friendLinkBucket.put(friendLink.uuid, friendLink);
            friendLink.uuid = util_1.genUuid(rid, sid);
            friendLinkBucket.put(friendLink.uuid, friendLink);
            contactBucket.put(sid, sContactInfo);
            contactBucket.put(rid, rContactInfo);
            // 发布一条添加成功的消息
            var info = new message_s_2.UserSend();
            info.msg = '你们已经成为好友，开始聊天吧';
            info.mtype = message_s_1.MSG_TYPE.ADDUSER;
            info.rid = rid;
            info.time = Date.now();
            message_r_1.sendUserMessage(info);
        } else {
            // 拒绝好友
            send_1.send(rid, CONSTANT.SEND_REFUSED, '');
        }
    };
    _acceptFriend(group_r_1.getUid(), agree.uid, agree.agree);
    var result = new basic_s_1.Result();
    result.r = 1;
    return result;
};
/**
 * 删除好友
 * @param uuid uid:uid
 */
// #[rpc=rpcServer]
exports.delFriend = function (uid) {
    var _delFriend = function _delFriend(sid, rid) {
        var dbMgr = rpc_server_1.getEnv().getDbMgr();
        var contactBucket = new db_1.Bucket(CONSTANT.WARE_NAME, CONSTANT.CONTACT_TABLE, dbMgr);
        // 获取当前用户的联系人列表
        var sContactInfo = contactBucket.get(sid)[0];
        // 从好友列表中删除当前用户
        sContactInfo.friends = util_1.delValueFromArray(rid, sContactInfo.friends);
        contactBucket.put(sid, sContactInfo);
        // 从friendLink中删除
        var friendLinkBucket = new db_1.Bucket(CONSTANT.WARE_NAME, CONSTANT.FRIEND_LINK_TABLE, dbMgr);
        friendLinkBucket.delete(util_1.genUuid(sid, rid));
        console.log('delFriend friendLink ', util_1.genUuid(sid, rid));
    };
    _delFriend(group_r_1.getUid(), uid);
    var result = new basic_s_1.Result();
    result.r = 1;
    return result;
};
/**
 * 将用户添加到黑名单
 * @param uid user id
 */
// #[rpc=rpcServer]
exports.addToBlackList = function (peerUid) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var contactBucket = new db_1.Bucket(CONSTANT.WARE_NAME, CONSTANT.CONTACT_TABLE, dbMgr);
    var uid = group_r_1.getUid();
    var result = new basic_s_1.Result();
    var contactInfo = contactBucket.get(uid)[0];
    var index = contactInfo.blackList.indexOf(peerUid);
    if (index > -1) {
        console.log('User: ', peerUid, 'has already in blacklist of user: ', uid);
        result.r = 0;
        return result;
    } else {
        contactInfo.blackList.push(peerUid);
        var index1 = contactInfo.applyUser.findIndex(function (item) {
            return item === peerUid;
        });
        if (index1 > -1) {
            contactInfo.applyUser.splice(index1, 1); // 删除添加好友申请
        }
        var index2 = contactInfo.friends.findIndex(function (item) {
            return item === peerUid;
        });
        if (index2 > -1) {
            contactInfo.friends.splice(index2, 1); // 删除好友
        }
        contactBucket.put(uid, contactInfo);
        console.log('Add user: ', peerUid, 'to blacklist of user: ', uid);
        result.r = 1;
        return result;
    }
};
/**
 * 将用户移除黑名单
 * @param peerUid user id
 */
// #[rpc=rpcServer]
exports.removeFromBlackList = function (peerUid) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var contactBucket = new db_1.Bucket(CONSTANT.WARE_NAME, CONSTANT.CONTACT_TABLE, dbMgr);
    var friendLinkBucket = new db_1.Bucket(CONSTANT.WARE_NAME, CONSTANT.FRIEND_LINK_TABLE, dbMgr);
    var msgLockBucket = new db_1.Bucket(CONSTANT.WARE_NAME, CONSTANT.MSG_LOCK_TABLE, dbMgr);
    var userHistoryCursorBucket = new db_1.Bucket('file', CONSTANT.USER_HISTORY_CURSOR_TABLE, dbMgr);
    var sid = group_r_1.getUid();
    var result = new basic_s_1.Result();
    var contactInfo = contactBucket.get(sid)[0];
    var index = contactInfo.blackList.indexOf(peerUid);
    if (index > -1) {
        contactInfo.blackList.splice(index, 1);
        console.log('Remove user: ', peerUid, 'from blacklist of user: ', sid);
        var friend1 = friendLinkBucket.get(util_1.genUuid(sid, peerUid))[0];
        var friend2 = friendLinkBucket.get(util_1.genUuid(peerUid, sid))[0];
        if (friend1 && friend2) {
            contactInfo.friends.push(peerUid); // 我们曾经是好友，则直接添加到好友列表
        }
        contactBucket.put(sid, contactInfo);
        var lastID = msgLockBucket.get(util_1.genUserHid(sid, peerUid))[0]; // 最后一条消息记录
        var userCursor = userHistoryCursorBucket.get(util_1.genUuid(sid, peerUid))[0];
        userCursor.cursor = lastID ? lastID.current : 0; // 当前用户的游标置于最新消息
        userHistoryCursorBucket.put(util_1.genUuid(sid, peerUid), userCursor);
        result.r = 1;
        return result;
    } else {
        console.log('User: ', peerUid, 'is not banned by user: ', sid);
        result.r = 0;
        return result;
    }
};
/**
 * 修改好友别名
 * @param rid user id
 * @param alias user alias
 */
// #[rpc=rpcServer]
exports.changeFriendAlias = function (friendAlias) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var friendLinkBucket = new db_1.Bucket(CONSTANT.WARE_NAME, CONSTANT.FRIEND_LINK_TABLE, dbMgr);
    var contactBucket = new db_1.Bucket(CONSTANT.WARE_NAME, CONSTANT.CONTACT_TABLE, dbMgr);
    var sid = group_r_1.getUid();
    var uuid = util_1.genUuid(sid, friendAlias.rid);
    var result = new basic_s_1.Result();
    var contactInfo = contactBucket.get(sid)[0];
    var index = contactInfo.friends.indexOf(friendAlias.rid);
    // 判断rid是否是当前用户的好友
    if (index > -1) {
        var friend = friendLinkBucket.get(uuid)[0];
        friend.alias = friendAlias.alias;
        friendLinkBucket.put(uuid, friend);
        result.r = 1;
    } else {
        console.log('user: ', friendAlias.rid, ' is not your friend');
        result.r = 0;
    }
    return result;
};
/**
 * 修改当前用户的基础信息
 * @param userinfo user info
 */
// #[rpc=rpcServer]
exports.changeUserInfo = function (userinfo) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var userInfoBucket = new db_1.Bucket(CONSTANT.WARE_NAME, CONSTANT.USER_INFO_TABLE, dbMgr);
    var userFindBucket = new db_1.Bucket(CONSTANT.WARE_NAME, user_s_1.UserFind._$info.name, dbMgr);
    var sid = group_r_1.getUid();
    var oldUserinfo = userInfoBucket.get(sid)[0];
    console.log('!!!!!!!!!!!!!!!!!changeUserInfo!!oldUserinfo:', oldUserinfo);
    // 添加手机查找用户
    if (!(oldUserinfo.tel === userinfo.tel) && !(userinfo.tel === '')) {
        var phoneFind = new user_s_1.UserFind();
        phoneFind.user = "p:" + userinfo.tel;
        phoneFind.uid = sid;
        console.log('!!!!!!!!!!!!!!!!!add phone!1212121', phoneFind);
        userFindBucket.put(phoneFind.user, phoneFind);
    }
    console.log('!!!!!!!!!!!!!!!!!changeUserInfo!!1111111111111');
    // 添加钱包地址查询用户
    if (!(oldUserinfo.wallet_addr === userinfo.wallet_addr) && !(userinfo.wallet_addr === '')) {
        var walletFind = new user_s_1.UserFind();
        walletFind.user = "w:" + userinfo.wallet_addr;
        walletFind.uid = sid;
        userFindBucket.put(walletFind.user, walletFind);
    }
    var uidFind = userFindBucket.get("u:" + sid)[0];
    console.log('!!!!!!!!!!!!!!!!!changeUserInfo!!22222222222', uidFind);
    // 添加用户ID查询用户
    if (!uidFind) {
        var newUidFind = new user_s_1.UserFind();
        newUidFind.user = "u:" + sid;
        newUidFind.uid = sid;
        console.log('!!!!!!!!!!!!!!!!!changeUserInfo!!232233', newUidFind);
        userFindBucket.put(newUidFind.user, newUidFind);
    }
    console.log('!!!!!!!!!!!!!!!!!changeUserInfo!!333333333333333333');
    var newUser = new user_s_1.UserInfo();
    if (userinfo.uid === sid) {
        userInfoBucket.put(sid, userinfo);
        newUser = userinfo;
    } else {
        console.log('curUser: ', sid, ' changeUser: ', userinfo);
        newUser.uid = -1;
    }
    return newUser;
};
// ================================================================= 本地
})