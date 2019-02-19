_$define("earn/server/rpc/dbWatcher.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 前端主动监听后端数据库的变化
 */
var bon_1 = require("../../../pi/util/bon");
var util_1 = require("../../../pi/util/util");
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var js_net_1 = require("../../../pi_pt/rust/pi_serv/js_net");
var db_1 = require("../../utils/db");
var logger_1 = require("../../utils/logger");
var constant_1 = require("../data/constant");
var item_s_1 = require("../data/db/item.s");
var user_s_1 = require("./user.s");
// ================================================================= 导入
/**
 * 物品信息
 * @param gid group id
 */
// #[rpc=rpcServer]
exports.watchItemsInfo = function (uid) {
    return watchInfo('uid', uid, item_s_1.Items, {});
};
/**
 * 用户挖矿得到的KT数
 * @param uid user id
 */
// #[rpc=rpcServer]
exports.watchMiningKTNum = function (uid) {
    return watchInfo('uid', uid, item_s_1.MiningKTNum, -1);
};
/**
 * 用户挖矿得到的特别奖品
 * @param id string
 */
// #[rpc=rpcServer]
exports.watchSpecialAward = function (id) {
    return watchInfo('id', id, item_s_1.SpecialAward, -1);
};
// 指定用户消息推送
exports.mqtt_send = function (uid, msgType, msg) {
    console.log('mqtt_send in !!!!!!!!!!!!!!!!!!!!');
    var mqttServer = getMqttServer();
    var message = new user_s_1.SendMessage();
    message.uid = uid;
    message.msg = msg;
    message.msgType = msgType;
    var buf = new bon_1.BonBuffer();
    message.bonEncode(buf);
    console.log('QoS.AtMostOnce !!!!!!!!!!!!!!!!!!!!', js_net_1.QoS.AtMostOnce);
    js_net_1.mqttPublish(mqttServer, true, js_net_1.QoS.AtMostOnce, uid.toString(), buf.getBuffer());
};
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);
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
var watchInfo = function watchInfo(keyName, keyValue, tableStruct, keyDefaultValue) {
    // 监听数据库
    var mqttServer = getMqttServer();
    var bonKeyValue = util_1.ab2hex(new bon_1.BonBuffer().write(keyValue).getBuffer());
    console.log('setMqttTopic ==== ', constant_1.WARE_NAME + "." + tableStruct._$info.name + "." + bonKeyValue);
    js_net_1.setMqttTopic(mqttServer, constant_1.WARE_NAME + "." + tableStruct._$info.name + "." + bonKeyValue, true, true);
    // 返回当前值
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var infoBucket = new db_1.Bucket(constant_1.WARE_NAME, tableStruct._$info.name, dbMgr);
    console.log('infoBucket  ==== ', infoBucket);
    logger.debug(tableStruct._$info.name + " iter");
    logger.debug("keyName is : " + keyName + ", keyValue is : " + keyValue + ", info is : " + infoBucket.get(keyValue)[0]);
    var info = infoBucket.get(keyValue)[0] || new tableStruct();
    logger.debug(tableStruct._$info.name);
    info[keyName] = info[keyName] || keyDefaultValue;
    return info;
};
})