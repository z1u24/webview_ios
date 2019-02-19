_$define("chat/utils/send", function (require, exports, module){
"use strict";
/**
 * 通用消息推送方法
 */

Object.defineProperty(exports, "__esModule", { value: true });
var bon_1 = require("../../pi/util/bon");
var rpc_server_1 = require("../../pi_pt/net/rpc_server");
var js_net_1 = require("../../pi_pt/rust/pi_serv/js_net");
var logger_1 = require("../utils/logger");
var send_s_1 = require("./send.s");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);
exports.send = function (uid, cmd, msg) {
    var topic = "send/" + uid;
    var mqttServer = rpc_server_1.getEnv().getNativeObject('mqttServer');
    var sendMsg = new send_s_1.SendMsg();
    sendMsg.cmd = cmd;
    sendMsg.msg = msg;
    var buf = new bon_1.BonBuffer();
    sendMsg.bonEncode(buf);
    logger.debug("the topic is : " + topic);
    js_net_1.mqttPublish(mqttServer, true, js_net_1.QoS.AtMostOnce, topic, buf.getBuffer());
};
})