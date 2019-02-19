_$define("chat/server/rpc/send_message.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 发送聊天消息
 */
var sinfo_1 = require("../../../pi/struct/sinfo");
var bon_1 = require("../../../pi/util/bon");
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var js_net_1 = require("../../../pi_pt/rust/pi_serv/js_net");
var db_1 = require("../../utils/db");
var logger_1 = require("../../utils/logger");
var send_message_s_1 = require("./send_message.s");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);
// #[rpc]
exports.sendMessage = function (message) {
    var mqttServer = rpc_server_1.getEnv().getNativeObject('mqttServer');
    var dst = message.dst;
    var msgAck = new send_message_s_1.messageReceivedAck();
    msgAck.ack = true;
    messgeHandler(message);
    var buf = new bon_1.BonBuffer();
    message.bonEncode(buf);
    logger.debug("the topic is : " + dst);
    js_net_1.mqttPublish(mqttServer, true, js_net_1.QoS.AtMostOnce, dst, buf.getBuffer());
    return msgAck;
};
// #[rpc]
exports.messageDeliveredAck = function () {
    var deliverAck = new send_message_s_1.messageDeliveredAck();
    deliverAck.ack = true;
    return deliverAck;
};
var messgeHandler = function messgeHandler(message) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var meta = new sinfo_1.TabMeta(new sinfo_1.EnumType(sinfo_1.Type.Usize), new sinfo_1.EnumType(sinfo_1.Type.Struct, send_message_s_1.sendMessage._$info));
    var bkt = db_1.createMemoryBucket('wtf', meta, dbMgr);
    var key = message.msgId;
    var val = message;
    bkt.put(key, val);
    console.log('read memory bucket', bkt.get(key));
};
})