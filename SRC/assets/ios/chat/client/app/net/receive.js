_$define("chat/client/app/net/receive", function (require, exports, module){
"use strict";
/**
 * 接受后端推送事件
 */

Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("../../../../pi/util/event");
var CONSTANT = require("../../../server/data/constant");
var send_s_1 = require("../../../utils/send.s");
var logic_1 = require("../logic/logic");
var init_1 = require("./init");
/**
 * 消息处理列表
 */
var handlerMap = new event_1.HandlerMap();
// 注册事件监听
exports.addEvent = function (cmd, cb) {
    handlerMap.add(cmd, function (r) {
        cb(r);
        return event_1.HandlerResult.OK;
    });
};
// 监听topic
exports.initReceive = function (uid) {
    init_1.subscribe("send/" + uid, send_s_1.SendMsg, function (r) {
        exports.notify(r.cmd, r.msg);
    });
};
// 事件通知
exports.notify = function (cmd, msg) {
    handlerMap.notify(cmd, [msg]);
};
// 主动推送
exports.initPush = function () {
    // 拒绝好友添加
    exports.addEvent(CONSTANT.SEND_REFUSED, function (r) {
        console.log('!!!!!!!!!!!!r:', r);
        logic_1.bottomNotice(r);
    });
};
})