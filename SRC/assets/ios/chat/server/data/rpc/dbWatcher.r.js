_$define("chat/server/data/rpc/dbWatcher.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 前端主动监听后端数据库的变化
 */
// ================================================================= 导入
var bon_1 = require("../../../../pi/util/bon");
var util_1 = require("../../../../pi/util/util");
var rpc_server_1 = require("../../../../pi_pt/net/rpc_server");
var js_net_1 = require("../../../../pi_pt/rust/pi_serv/js_net");
var db_1 = require("../../../utils/db");
var CONSTANT = require("../constant");
var extra_s_1 = require("../db/extra.s");
var group_s_1 = require("../db/group.s");
var message_s_1 = require("../db/message.s");
var user_s_1 = require("../db/user.s");
// ================================================================= 导出
/**
 * 群组信息
 * @param gid group id
 */
// #[rpc=rpcServer]
exports.watchGroupInfo = function (gid) {
  return exports.watchInfo('gid', gid, group_s_1.GroupInfo, -1);
};
/**
 * 群组中的用户信息
 * @param guid group user id
 */
// #[rpc=rpcServer]
exports.watchGroupUserLink = function (guid) {
  return exports.watchInfo('guid', guid, group_s_1.GroupUserLink, '-1');
};
/**
 * 用户历史记录
 * @param hIncId history increament id
 */
// #[rpc=rpcServer]
exports.watchUserHistory = function (hIncId) {
  return exports.watchInfo('hIncId', hIncId, message_s_1.UserHistory, '-1');
};
/**
 * 群组历史记录
 * @param hIncId history increament id
 */
// #[rpc=rpcServer]
exports.watchGroupHistory = function (hIncId) {
  return exports.watchInfo('hIncId', hIncId, message_s_1.GroupHistory, '-1');
};
/**
 * 所有公告
 * @param aIncId announce increament id
 */
// #[rpc=rpcServer]
exports.watchAnnounceHistory = function (aIncId) {
  return exports.watchInfo('aIncId', aIncId, message_s_1.AnnounceHistory, '-1');
};
/**
 * 消息锁
 * @param hid history increament id
 */
// #[rpc=rpcServer]
exports.watchMsgLock = function (hid) {
  return exports.watchInfo('hid', hid, message_s_1.MsgLock, -1);
};
/**
 * 用户本人的基本信息
 * @param uid user id
 */
// #[rpc=rpcServer]
exports.watchUserInfo = function (uid) {
  return exports.watchInfo('uid', uid, user_s_1.UserInfo, -1);
};
/**
 * User credential table
 * @param uid user id
 */
// #[rpc=rpcServer]
exports.watchUserCredential = function (uid) {
  return exports.watchInfo('uid', uid, user_s_1.UserCredential, -1);
};
/**
 * User account generator
 * @param index index
 */
// #[rpc=rpcServer]
exports.watchAccountGenerator = function (index) {
  return exports.watchInfo('index', index, user_s_1.UserCredential, '-1');
};
/**
 * 好友链接信息
 * @param uuid uid:uid
 */
// #[rpc=rpcServer]
exports.watchFriendLink = function (uuid) {
  return exports.watchInfo('uuid', uuid, user_s_1.FriendLink, '-1');
};
/**
 * 联系人信息
 * @param uid user id
 */
// #[rpc=rpcServer]
exports.watchContact = function (uid) {
  return exports.watchInfo('uid', uid, user_s_1.Contact, -1);
};
/**
 * 地址信息
 * @param uid uid user id
 */
// #[rpc=rpcServer]
exports.watchAddressInfo = function (uid) {
  return exports.watchInfo('uid', uid, extra_s_1.AddressInfo, -1);
};
// ================================================================= 本地
/**
 * 获取mqttServer
 */
var getMqttServer = function getMqttServer() {
  return rpc_server_1.getEnv().getNativeObject('mqttServer');
};
/**
 * 一个通用的数据库监听器函数
 * @param keyName key name
 * @param keyValue key value
 * @param tableStruct struct
 * @param defaultValue  default value
 */
exports.watchInfo = function (keyName, keyValue, tableStruct, keyDefaultValue) {
  // 监听数据库
  var mqttServer = getMqttServer();
  var bonKeyValue = util_1.ab2hex(new bon_1.BonBuffer().write(keyValue).getBuffer());
  js_net_1.setMqttTopic(mqttServer, CONSTANT.WARE_NAME + "." + tableStruct._$info.name + "." + bonKeyValue, true, true);
  // 返回当前值
  var dbMgr = rpc_server_1.getEnv().getDbMgr();
  var infoBucket = new db_1.Bucket(CONSTANT.WARE_NAME, tableStruct._$info.name, dbMgr);
  console.log(tableStruct._$info.name + " iter");
  // iterTable(dbMgr,tableStruct);
  console.log("keyName is : " + keyName + ", keyValue is : " + keyValue + ", info is : " + infoBucket.get(keyValue)[0]);
  var info = infoBucket.get(keyValue)[0] || new tableStruct();
  console.log(tableStruct._$info.name);
  info[keyName] = info[keyName] || keyDefaultValue;
  return info;
};
})