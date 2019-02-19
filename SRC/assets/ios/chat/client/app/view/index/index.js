_$define("chat/client/app/view/index/index", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 项目入口
 */
// ============================== 导入
var root_1 = require("../../../../../pi/ui/root");
var util_1 = require("../../../../../pi/widget/util");
// ============================== 导出
exports.run = function () {
    var currentTime = new Date().getTime();
    util_1.addWidget(document.body, 'pi-ui-root');
    document.oncontextmenu = function (e) {
        // 或者return false;
        e.preventDefault();
    };
    root_1.popNew('chat-client-app-view-login-login');
};
})