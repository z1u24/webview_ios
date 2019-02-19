_$define("chat/server/data/rpc/net_close.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 会话关闭
 */
var event_server_1 = require("../../../../pi_pt/event/event_server");
var db_1 = require("../../../utils/db");
var logger_1 = require("../../../utils/logger");
var CONSTANT = require("../constant");
var logger = new logger_1.Logger('NET_CLOSE');
// #[event=net_connect_close]
exports.close_connect = function (e) {
    var sessionId = e.connect_id;
    var dbMgr = event_server_1.getEnv().getDbMgr();
    var reverseBucket = new db_1.Bucket('memory', CONSTANT.ONLINE_USERS_REVERSE_INDEX_TABLE, dbMgr);
    var bucket = new db_1.Bucket('memory', CONSTANT.ONLINE_USERS_TABLE, dbMgr);
    var reverseIndex = reverseBucket.get(sessionId)[0];
    if (reverseIndex) {
        reverseBucket.delete(reverseIndex.sessionId);
        var onlineUser = bucket.get(reverseIndex.uid)[0];
        if (onlineUser) {
            bucket.delete(reverseIndex.uid);
        }
        logger.debug('Unbind uid: ', reverseIndex.uid, 'with sessionId: ', reverseIndex.sessionId);
    }
};
})