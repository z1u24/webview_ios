_$define("chat/server/data/util", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 只有后端可以用的util
 */
var db_1 = require("../../../pi_pt/db");
var constant_1 = require("../../server/data/constant");
/**
 * 用于测试的时候遍历表
 * @param dbMgr db manager
 * @param tableStruct table struct
 */
exports.iterTable = function (dbMgr, tableStruct) {
    db_1.read(dbMgr, function (tr) {
        console.log('login read---------------:');
        // 角色基础
        var iterBase = db_1.iterDb(tr, constant_1.WARE_NAME, tableStruct._$info.name, null, false, null); // 取from表的迭代器
        var elBase = iterBase.nextElem();
        while (elBase) {
            console.log('elBase----------------read---------------', elBase);
            elBase = iterBase.nextElem();
        }
    });
};
})