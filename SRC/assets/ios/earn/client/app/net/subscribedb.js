_$define("earn/client/app/net/subscribedb", function (require, exports, module){
"use strict";
/**
 * 订阅后端数据库,也是通过mqtt方式实现的
 */

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================================= 导入
var bon_1 = require("../../../../pi/util/bon");
var util_1 = require("../../../../pi/util/util");
var constant_1 = require("../../../server/data/constant");
var item_s_1 = require("../../../server/data/db/item.s");
var dbWatcher_p_1 = require("../../../server/rpc/dbWatcher.p");
var memstore_1 = require("../store/memstore");
var constants_1 = require("../utils/constants");
var init_1 = require("./init");
// ================================================================= 导出
/**
 * 初始化需要监听的信息
 */
exports.initSubscribeInfo = function () {
    exports.subscribeItemsInfo(memstore_1.getStore('userInfo/uid'), function (r) {
        memstore_1.setStore('goods', r.item);
    });
};
/**
 * 物品信息监听
 */
exports.subscribeItemsInfo = function (uid, cb) {
    subscribeTable(dbWatcher_p_1.watchItemsInfo, uid, item_s_1.Items, cb);
};
/**
 * 挖矿特殊奖励公告监听
 */
exports.subscribeSpecialAward = function (cb) {
    subscribeTable(dbWatcher_p_1.watchSpecialAward, constant_1.THE_ELDER_SCROLLS, item_s_1.SpecialAward, cb);
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
 */
var subscribeTable = function subscribeTable(method, keyValue, struct, cb) {
    init_1.clientRpcFunc(method, keyValue, function (r) {
        updateMap(r);
        var bonKeyValue = util_1.ab2hex(new bon_1.BonBuffer().write(keyValue).getBuffer());
        init_1.subscribe(constants_1.WARE_NAME + "." + struct._$info.name + "." + bonKeyValue, struct, function (r) {
            updateMap(r);
        });
    });
    var updateMap = function updateMap(r) {
        console.log('数据变化监听  ---------- ', r);
        cb && cb(r);
    };
};
})