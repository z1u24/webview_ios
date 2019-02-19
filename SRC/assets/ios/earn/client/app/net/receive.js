_$define("earn/client/app/net/receive", function (require, exports, module){
"use strict";
/**
 * 接受后端推送事件
 */

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../../pi/ui/root");
var send_message_s_1 = require("../../../server/rpc/send_message.s");
var medalShow_1 = require("../view/medal/medalShow");
var init_1 = require("./init");
// 监听topic
exports.initReceive = function (uid) {
    init_1.subscribe("send/" + uid, send_message_s_1.SendMsg, function (r) {
        console.log('后端推送事件！！！！！！！！', r);
        switch (r.cmd) {
            case 'add_medal':
                // 勋章提醒
                root_1.popNew('earn-client-app-view-components-newMedalAlert', {
                    // tslint:disable-next-line:radix
                    medalId: parseInt(r.msg),
                    medalType: medalShow_1.MedalType.rankMedal
                });
                break;
            default:
        }
    });
};
})