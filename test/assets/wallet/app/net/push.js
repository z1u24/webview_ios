_$define("app/net/push", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var con_mgr_1 = require("../../pi/net/ui/con_mgr");
var tools_1 = require("../utils/tools");
var pull_1 = require("./pull");
/**
 * 后端主动推消息给后端
 */
// ===================================================== 导入
// ===================================================== 导出
// ===================================================== 本地
// ===================================================== 立即执行
// 主动推送
exports.initPush = function () {
    con_mgr_1.setMsgHandler('event_pay_ok', function (res) {
        tools_1.popNewMessage(tools_1.getStaticLanguage().transfer.rechargeTips);
        var value = res.value.toJSNumber ? res.value.toJSNumber() : res.value;
        pull_1.getCloudBalance().then(function (res) {
            console.log('服务器推送成功 云端余额更新==========================', res);
        });
        console.log('服务器推送成功==========================', res);
    });
};
})