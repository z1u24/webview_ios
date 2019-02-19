_$define("chat/server/data/rpc/basic.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取客户的基本信息
 * 后端不应该相信前端发送的uid信息，应该自己从会话中获取
 */
// ================================================================= 导入
var rpc_server_1 = require("../../../../pi_pt/net/rpc_server");
var js_net_1 = require("../../../../pi_pt/rust/pi_serv/js_net");
var db_1 = require("../../../utils/db");
var util_1 = require("../../../utils/util");
var session_r_1 = require("../../rpc/session.r");
var CONSTANT = require("../constant");
var message_s_1 = require("../db/message.s");
var user_s_1 = require("../db/user.s");
var basic_s_1 = require("./basic.s");
var group_r_1 = require("./group.r");
var user_r_1 = require("./user.r");
// ================================================================= 导出
/**
 * 用户注册
 * @param registerInfo user info
 */
// #[rpc=rpcServer]
exports.registerUser = function (registerInfo) {
    console.log('user try to register with: ', registerInfo);
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var userInfoBucket = new db_1.Bucket('file', CONSTANT.USER_INFO_TABLE, dbMgr);
    var userCredentialBucket = new db_1.Bucket('file', CONSTANT.USER_CREDENTIAL_TABLE, dbMgr);
    var accountGeneratorBucket = new db_1.Bucket('file', CONSTANT.ACCOUNT_GENERATOR_TABLE, dbMgr);
    var userInfo = new user_s_1.UserInfo();
    var userCredential = new user_s_1.UserCredential();
    userInfo.name = registerInfo.name;
    userInfo.note = '';
    userInfo.tel = '';
    // 这是一个事务
    accountGeneratorBucket.readAndWrite(user_s_1.GENERATOR_TYPE.USER, function (items) {
        var accountGenerator = new user_s_1.AccountGenerator();
        accountGenerator.index = user_s_1.GENERATOR_TYPE.USER;
        accountGenerator.currentIndex = util_1.genNewIdFromOld(items[0].currentIndex);
        userInfo.uid = accountGenerator.currentIndex;
        return accountGenerator;
    });
    userInfo.sex = 1;
    userCredential.uid = userInfo.uid;
    userCredential.passwdHash = registerInfo.passwdHash;
    userInfoBucket.put(userInfo.uid, userInfo);
    console.log('sucessfully registered user', userInfo);
    userCredentialBucket.put(userInfo.uid, userCredential);
    // write contact info
    var contact = new user_s_1.Contact();
    contact.uid = userInfo.uid;
    contact.applyGroup = [];
    contact.applyUser = [];
    contact.friends = [];
    contact.group = [];
    contact.temp_chat = [];
    contact.blackList = [];
    var contactBucket = new db_1.Bucket('file', CONSTANT.CONTACT_TABLE, dbMgr);
    var c = contactBucket.get(userInfo.uid)[0];
    if (c === undefined) {
        var v = contactBucket.put(userInfo.uid, contact);
        if (v) {
            console.log('Create user contact success');
        } else {
            console.error('Create user contact failed');
        }
    }
    return userInfo;
};
// #[rpc=rpcServer]
exports.login = function (user) {
    // console.log('user try to login with uid: ', loginReq.uid);
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var userInfoBucket = new db_1.Bucket('file', CONSTANT.USER_INFO_TABLE, dbMgr);
    var userCredentialBucket = new db_1.Bucket('file', CONSTANT.USER_CREDENTIAL_TABLE, dbMgr);
    var loginReq = new basic_s_1.LoginReq();
    var userInfo = new user_s_1.UserInfo();
    if (user.enum_type === basic_s_1.UserType_Enum.WALLET) {
        var walletLoginReq = user.value;
        var openid = walletLoginReq.openid;
        var sign = walletLoginReq.sign;
        // TODO 验证签名
        var userAccountBucket = new db_1.Bucket('file', CONSTANT.USER_ACCOUNT_TABLE, dbMgr);
        var _v = userAccountBucket.get(openid)[0];
        if (!_v) {
            // 注册用户
            var reguser = new basic_s_1.UserRegister();
            reguser.passwdHash = openid;
            reguser.name = '';
            var userinfo = exports.registerUser(reguser);
            var userAcc = new user_s_1.UserAccount();
            userAcc.user = openid;
            userAcc.uid = userinfo.uid;
            var _v2 = userAccountBucket.put(openid, userAcc);
            loginReq.uid = userinfo.uid;
        } else {
            loginReq.uid = _v.uid;
        }
    } else if (user.enum_type === basic_s_1.UserType_Enum.DEF) {
        loginReq = user.value;
        var passwdHash = loginReq.passwdHash;
        var expectedPasswdHash = userCredentialBucket.get(loginReq.uid);
        // 判断密码是否正确
        // user doesn't exist
        if (expectedPasswdHash[0] === undefined || passwdHash !== expectedPasswdHash[0].passwdHash) {
            userInfo.uid = -1;
            userInfo.sex = 0;
            console.log('user does not exist: ', loginReq.uid);
            return userInfo;
        }
    }
    // FIXME: constant time equality check
    userInfo = userInfoBucket.get(loginReq.uid)[0];
    var mqttServer = rpc_server_1.getEnv().getNativeObject('mqttServer');
    js_net_1.setMqttTopic(mqttServer, loginReq.uid.toString(), true, true);
    // 后端统一推送消息topic
    js_net_1.setMqttTopic(mqttServer, "send/" + loginReq.uid.toString(), true, true);
    console.log('Set user topic: ', loginReq.uid.toString());
    // save session
    var session = rpc_server_1.getEnv().getSession();
    // write(dbMgr, (tr: Tr) => {
    //     session.set(tr, 'uid', loginReq.uid.toString());
    //     logger.info('set session value of uid: ', loginReq.uid.toString());
    // });
    session_r_1.setSession('uid', loginReq.uid.toString(), loginReq.uid.toString());
    // TODO: debug purpose
    // read(dbMgr, (tr: Tr) => {
    //     const v = session.get(tr, 'uid');
    //     console.log('read session value of uid: ', v);
    //     console.log('user login session id: ', session.getId());
    // });
    var v = session_r_1.getSession('uid');
    console.log('read session value of uid: ', v);
    var onlineUsersBucket = new db_1.Bucket('memory', CONSTANT.ONLINE_USERS_TABLE, dbMgr);
    var onlineUsersReverseIndexBucket = new db_1.Bucket('memory', CONSTANT.ONLINE_USERS_REVERSE_INDEX_TABLE, dbMgr);
    var online = new user_s_1.OnlineUsers();
    online.uid = loginReq.uid;
    online.sessionId = session.getId();
    onlineUsersBucket.put(online.uid, online);
    console.log('Add user: ', loginReq.uid, 'to online users bucket with sessionId: ', online.sessionId);
    var onlineReverse = new user_s_1.OnlineUsersReverseIndex();
    onlineReverse.sessionId = session.getId();
    onlineReverse.uid = loginReq.uid;
    onlineUsersReverseIndexBucket.put(onlineReverse.sessionId, onlineReverse);
    console.log('Add user: ', loginReq.uid, 'to online users reverse index bucket with sessionId: ', online.sessionId);
    var SUID = CONSTANT.CUSTOMER_SERVICE; // 客服账号
    if (loginReq.uid !== SUID) {
        user_r_1.applyFriend(SUID.toString());
    }
    return userInfo;
};
/**
 * 获取用户基本信息
 *
 * @param uid user id
 */
// #[rpc=rpcServer]
exports.getUsersInfo = function (getUserInfoReq) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var userInfoBucket = new db_1.Bucket('file', CONSTANT.USER_INFO_TABLE, dbMgr);
    var uids = getUserInfoReq.uids;
    var values = userInfoBucket.get(uids);
    console.log('Read userinfo: ', uids, values);
    // FIXME: check if `values` have undefined element, or will crash
    var res = new basic_s_1.UserArray();
    res.arr = values;
    return res;
};
/**
 * 获取群组基本信息
 * @param uid user id
 */
// #[rpc=rpcServer]
exports.getGroupsInfo = function (getGroupInfoReq) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var groupInfoBucket = new db_1.Bucket('file', CONSTANT.GROUP_INFO_TABLE, dbMgr);
    var gids = getGroupInfoReq.gids;
    var values = groupInfoBucket.get(gids);
    var res = new basic_s_1.GroupArray();
    res.arr = values;
    return res;
};
/**
 * 获取联系人信息
 * @param uid user id
 */
// #[rpc=rpcServer]
exports.getContact = function (getContactReq) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var contactBucket = new db_1.Bucket('file', CONSTANT.CONTACT_TABLE, dbMgr);
    var uid = getContactReq.uid;
    var value = contactBucket.get(uid);
    return value[0];
};
/**
 * 获取好友别名
 * @param uuidArr userid:userid
 */
// #[rpc=rpcServer]
exports.getFriendLinks = function (getFriendLinksReq) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var friendLinkBucket = new db_1.Bucket('file', CONSTANT.FRIEND_LINK_TABLE, dbMgr);
    var friendLinkArray = new basic_s_1.FriendLinkArray();
    // const friend = new FriendLink();
    console.log("uuid is : " + JSON.stringify(getFriendLinksReq.uuid));
    var friends = friendLinkBucket.get(getFriendLinksReq.uuid);
    // no friends found
    // if (friends === undefined) {
    //     friend.alias = '';
    //     friend.hid = 0;
    //     friend.uuid = '';
    // }
    console.log("friendLinkArray is : " + JSON.stringify(friends));
    friendLinkArray.arr = friends || [];
    return friendLinkArray;
};
/**
 * 获取群组聊天的历史记录
 */
// #[rpc=rpcServer]
exports.getGroupHistory = function (param) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var sid = group_r_1.getUid();
    var start = param.start;
    var end = param.end;
    if (end < start) {
        throw new Error("param error start:" + start + " end:" + end);
    }
    var groupHistoryBucket = new db_1.Bucket('file', CONSTANT.GROUP_HISTORY_TABLE, dbMgr);
    var groupHistorycursorBucket = new db_1.Bucket('file', CONSTANT.GROUP_HISTORY_CURSOR_TABLE, dbMgr);
    var hid = util_1.genGroupHid(param.gid);
    var groupHistoryArray = new basic_s_1.GroupHistoryArray();
    groupHistoryArray.arr = [];
    groupHistoryArray.newMess = 0;
    // let fg = 1;
    // let index = -1;
    var groupCursor = groupHistorycursorBucket.get(util_1.genGuid(param.gid, sid))[0];
    // console.log(`getGroupHistory begin index:${index}, groupHistorycursor: ${JSON.stringify(groupCursor)}`);
    // if (param.hIncId) {  // 如果本地有记录则取本地记录
    //     index = getIndexFromHIncId(param.hIncId);
    // } else if (groupCursor) { // 如果本地没有记录且cursor存在则从cursor中获取，否则从0开始
    //     index = groupCursor.cursor;
    // }
    var mess = [];
    for (var id = start; id <= end; id++) {
        var hIncId = util_1.genHIncId(hid, id);
        var v = groupHistoryBucket.get(hIncId)[0];
        if (v) {
            mess.push(v);
        }
    }
    console.log('getGroupHistory mess:', mess);
    // while (fg === 1) {
    //     index++;
    //     const oneMess = groupHistoryBucket.get<string, UserHistory>(genHIncId(hid, index))[0];
    //     console.log('getGroupHistory oneMess: ', oneMess);
    //     if (oneMess) {
    //         groupHistoryArray.arr.push(oneMess);
    //     } else {
    //         fg = 0;
    //     }
    // }
    groupHistoryArray.arr = mess;
    // 游标表中是否有该用户的记录
    if (!groupCursor) {
        groupCursor = new message_s_1.GroupHistoryCursor();
        groupCursor.guid = util_1.genGuid(param.gid, sid);
        groupCursor.cursor = -1;
    }
    if (end > groupCursor.cursor) {
        groupHistoryArray.newMess = end - groupCursor.cursor;
        groupCursor.cursor = end;
    }
    groupHistorycursorBucket.put(groupCursor.guid, groupCursor);
    // console.log(`getGroupHistory index:${index}, groupHistorycursor: ${JSON.stringify(groupCursor)}`);
    console.log('getGroupHistory rid: ', param.gid, 'history: ', groupHistoryArray);
    return groupHistoryArray;
};
/**
 * 获取单聊的消息记录
 */
// #[rpc=rpcServer]
exports.getUserHistory = function (param) {
    console.log('getUserHistory param', param);
    var start = param.start;
    var end = param.end;
    if (end < start) {
        throw new Error("param error start:" + start + " end:" + end);
    }
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var sid = group_r_1.getUid();
    var userHistoryBucket = new db_1.Bucket('file', CONSTANT.USER_HISTORY_TABLE, dbMgr);
    var userHistoryCursorBucket = new db_1.Bucket('file', CONSTANT.USER_HISTORY_CURSOR_TABLE, dbMgr);
    var hid = util_1.genUserHid(sid, param.rid);
    var userHistoryArray = new basic_s_1.UserHistoryArray();
    userHistoryArray.arr = [];
    userHistoryArray.newMess = 0;
    // let fg = 1;
    // let index = -1;
    var userCursor = userHistoryCursorBucket.get(util_1.genUuid(sid, param.rid))[0];
    // console.log(`getUserHistory begin index:${index}, userHistoryCursor: ${JSON.stringify(userCursor)}`);
    // if (param.hIncId) {  // 如果本地有记录则取本地记录
    //     index = getIndexFromHIncId(param.hIncId);
    // } else if (userCursor) { // 如果本地没有记录且cursor存在则从cursor中获取，否则从0开始
    //     index = userCursor.cursor;
    // }
    var mess = [];
    for (var id = start; id <= end; id++) {
        var hIncId = util_1.genHIncId(hid, id);
        var v = userHistoryBucket.get(hIncId)[0];
        if (v) {
            mess.push(v);
        }
    }
    console.log('getuserhistory mess: ', mess);
    // while (fg === 1) {
    //     index++;
    //     const oneMess = userHistoryBucket.get<string, UserHistory>(genHIncId(hid, index))[0];
    //     console.log('getUserHistory oneMess: ', oneMess);
    //     if (oneMess) {
    //         userHistoryArray.arr.push(oneMess);
    //     } else {
    //         fg = 0;
    //     }
    // }
    userHistoryArray.arr = mess;
    // 游标表中是否有该用户的记录
    if (!userCursor) {
        userCursor = new message_s_1.UserHistoryCursor();
        userCursor.uuid = util_1.genUuid(sid, param.rid);
        userCursor.cursor = -1;
    }
    if (end > userCursor.cursor) {
        userHistoryArray.newMess = end - userCursor.cursor;
        userCursor.cursor = end;
    }
    // userCursor.cursor = index - 1;
    userHistoryCursorBucket.put(userCursor.uuid, userCursor);
    // console.log(`getUserHistory index:${index}, userHistoryCursor: ${JSON.stringify(userCursor)}`);
    // userHistoryArray.newMess = userHistoryArray.arr.length;
    console.log('getUserHistory rid: ', param.rid, 'history: ', userHistoryArray);
    return userHistoryArray;
};
/**
 * 获取公告
 * @param param AnnouceFragment
 */
// #[rpc=rpcServer]
exports.getAnnoucement = function (param) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var announceHistoryBucket = new db_1.Bucket('file', CONSTANT.ANNOUNCE_HISTORY_TABLE, dbMgr);
    var announceHistory = new basic_s_1.AnnounceHistoryArray();
    // we don't use param.order there, because `iter` is not bidirectional
    var aid = param.aid;
    // tslint:disable-next-line:no-reserved-keywords
    var from = param.from;
    var size = param.size;
    var keyPrefix = aid + ":";
    var value = announceHistoryBucket.get(keyPrefix + from);
    if (value[0] !== undefined) {
        for (var i = from; i < from + size; i++) {
            var v = announceHistoryBucket.get(keyPrefix + i);
            if (v[0] !== undefined) {
                announceHistory.arr.push(v[0]);
            } else {
                break;
            }
        }
    }
    return announceHistory;
};
/**
 * 获取公告信息
 * @param param AnnouceIds
 */
// #[rpc=rpcServer]
exports.getAnnoucements = function (param) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var announceHistoryBucket = new db_1.Bucket('file', CONSTANT.ANNOUNCE_HISTORY_TABLE, dbMgr);
    var announceHistory = new basic_s_1.AnnounceHistoryArray();
    var aids = param.arr;
    announceHistory.arr = announceHistoryBucket.get(aids);
    console.log('getAnnoucements announceHistory', announceHistory);
    return announceHistory;
};
/**
 * 前端需要存储的内容
 */
// #[rpc=rpcServer]
exports.setData = function (param) {
    console.log('setData param: ', param);
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var storeBucket = new db_1.Bucket('file', CONSTANT.FRONT_STORE_DATA, dbMgr);
    var uid = group_r_1.getUid();
    var store = storeBucket.get(uid)[0];
    if (!store) {
        store = new user_s_1.FrontStoreData();
        store.uid = uid;
    }
    store.value = param;
    storeBucket.put(uid, store);
    console.log('setData store: ', store);
    return store;
};
/**
 * 获取前端存储的内容
 */
// #[rpc=rpcServer]
exports.getData = function (uid) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var storeBucket = new db_1.Bucket('file', CONSTANT.FRONT_STORE_DATA, dbMgr);
    var sid = group_r_1.getUid();
    console.log('getData uid: ', uid, 'sid: ', sid);
    if (sid !== uid) {
        return new user_s_1.FrontStoreData();
    }
    var store = storeBucket.get(sid)[0];
    if (!store) {
        store = new user_s_1.FrontStoreData();
        store.uid = sid;
        store.value = '';
    }
    console.log('getData store: ', store);
    return store;
};
// ================================================================= 本地
})