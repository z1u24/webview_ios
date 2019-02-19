_$define("chat/client/app/net/subscribedb", function (require, exports, module){
"use strict";
/**
 * 订阅后端数据库,也是通过mqtt方式实现的
 */

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================================= 导入
var bon_1 = require("../../../../pi/util/bon");
var util_1 = require("../../../../pi/util/util");
var constant_1 = require("../../../server/data/constant");
var extra_s_1 = require("../../../server/data/db/extra.s");
var group_s_1 = require("../../../server/data/db/group.s");
var message_s_1 = require("../../../server/data/db/message.s");
var user_s_1 = require("../../../server/data/db/user.s");
var dbWatcher_p_1 = require("../../../server/data/rpc/dbWatcher.p");
var store = require("../data/store");
var init_1 = require("./init");
// ================================================================= 导出
/**
 * 群组信息
 * @param gid group id
 */
exports.subscribeGroupInfo = function (gid, cb) {
    subscribeTable(dbWatcher_p_1.watchGroupInfo, 'gid', gid, constant_1.DEFAULT_ERROR_NUMBER, group_s_1.GroupInfo, 'groupInfoMap', cb);
};
/**
 * 群组中的用户信息
 * @param guid group user id
 */
exports.subscribeGroupUserLink = function (guid, cb) {
    subscribeTable(dbWatcher_p_1.watchGroupUserLink, 'guid', guid, constant_1.DEFAULT_ERROR_STR, group_s_1.GroupUserLink, 'groupUserLinkMap', cb);
};
/**
 * 用户历史记录
 * @param hIncId history increament id
 */
exports.subscribeUserHistory = function (hIncId, cb) {
    subscribeTable(dbWatcher_p_1.watchUserHistory, 'hIncId', hIncId, constant_1.DEFAULT_ERROR_STR, message_s_1.UserHistory, 'userHistoryMap', cb);
};
/**
 * 群组历史记录
 * @param hIncId history increament id
 */
exports.subscribeGroupHistory = function (hIncId, cb) {
    subscribeTable(dbWatcher_p_1.watchGroupHistory, 'hIncId', hIncId, constant_1.DEFAULT_ERROR_STR, message_s_1.GroupHistory, 'groupHistoryMap', cb);
};
/**
 * 所有公告
 * @param aIncId Announce increament id
 */
exports.subscribeAnnounceHistory = function (aIncId, cb) {
    subscribeTable(dbWatcher_p_1.watchAnnounceHistory, 'aIncId', aIncId, constant_1.DEFAULT_ERROR_STR, message_s_1.AnnounceHistory, 'announceHistoryMap', cb);
};
/**
 * 消息锁
 * @param hid history increament id
 */
exports.subscribeMsgLock = function (hid, cb) {
    subscribeTable(dbWatcher_p_1.watchMsgLock, 'hid', hid, constant_1.DEFAULT_ERROR_NUMBER, message_s_1.MsgLock, 'msgLockMap', cb);
};
/**
 * 用户本人的基本信息
 * @param uid user id
 */
exports.subscribeUserInfo = function (uid, cb) {
    subscribeTable(dbWatcher_p_1.watchUserInfo, 'uid', uid, constant_1.DEFAULT_ERROR_NUMBER, user_s_1.UserInfo, 'userInfoMap', cb);
};
/**
 * User credential table
 * @param uid user id
 */
exports.subscribeUserCredential = function (uid, cb) {
    subscribeTable(dbWatcher_p_1.watchUserCredential, 'uid', uid, constant_1.DEFAULT_ERROR_NUMBER, user_s_1.UserCredential, 'userCredentialMap', cb);
};
/**
 * User account generator
 * @param index index
 */
exports.subscribeAccountGenerator = function (index, cb) {
    subscribeTable(dbWatcher_p_1.watchAccountGenerator, 'index', index, constant_1.DEFAULT_ERROR_STR, user_s_1.AccountGenerator, 'accountGeneratorMap', cb);
};
/**
 * 好友链接信息
 * @param uuid user:user
 */
exports.subscribeFriendLink = function (uuid, cb) {
    subscribeTable(dbWatcher_p_1.watchFriendLink, 'uuid', uuid, constant_1.DEFAULT_ERROR_STR, user_s_1.FriendLink, 'friendLinkMap', cb);
};
/**
 * 联系人信息
 * @param uid uid
 */
exports.subscribeContact = function (uid, cb, diffcb) {
    subscribeTable(dbWatcher_p_1.watchContact, 'uid', uid, constant_1.DEFAULT_ERROR_NUMBER, user_s_1.Contact, 'contactMap', cb, diffcb);
};
/**
 * 地址信息
 * @param uid uid
 */
exports.subscribeAddressInfo = function (uid, cb) {
    subscribeTable(dbWatcher_p_1.watchAddressInfo, 'uid', uid, constant_1.DEFAULT_ERROR_NUMBER, extra_s_1.AddressInfo, 'addressInfoMap', cb);
};
// ================================================================= 本地
/**
 * 一个通用的订阅数据结构
 * @param method method Name
 * @param keyName key Name
 * @param keyValue value
 * @param defaultKeyValue default value
 * @param struct struct
 * @param mapName map Name
 * @param cb callback
 * @param beforeStoreCb 在修改数据库之前先调用这个函数，专门用户新旧数据的比较
 */
var subscribeTable = function subscribeTable(method, keyName, keyValue, defaultKeyValue, struct, mapName, cb, beforeStoreCb) {
    init_1.clientRpcFunc(method, keyValue, function (r) {
        updateMap(r);
        var bonKeyValue = util_1.ab2hex(new bon_1.BonBuffer().write(keyValue).getBuffer());
        init_1.subscribe(constant_1.WARE_NAME + "." + struct._$info.name + "." + bonKeyValue, struct, function (r) {
            updateMap(r);
        });
    });
    var updateMap = function updateMap(r) {
        beforeStoreCb && beforeStoreCb(r);
        store.setStore(mapName + "/" + keyValue, r);
        cb && cb(r);
    };
};
})