_$define("pi_pt/event/event_server", function (require, exports, module){
"use strict";
/**
 * _$rpc负责rpc路由，和响应结果
 * rpc函数有且仅有一个参数, 该参数必须是pi/struct/struct_mgr.Struct类型
 * rpc函数返回值类型也必须是Struct， 当无返回值时， 将默认构建一个pi/net/rpc_r.Ok的实例作为rpc的返回值， 当rpc函数内部抛出异常时， 将默认构建pi/net/rpc_r.Error的实例作为返回值
 */

Object.defineProperty(exports, "__esModule", { value: true });
var mgr_1 = require("../rust/pi_db/mgr");
var MetaInit = require("../../pi/struct/meta_init");
var db_1 = require("../db");
var entrance_s_1 = require("../entrance.s");
var env_1 = require("../init/env");
MetaInit.init();
var env = void 0;
exports.getEnv = function () {
    return env;
};
exports.Path = "pi_pt/event/event_server";
//初始化元信息
exports.structMgr = MetaInit.mgr;
//事件通知
var _$notify = function _$notify(e, mgr, _env) {
    var dbMgr = new mgr_1.Mgr(mgr);
    env = new env_1.Env(dbMgr, null);
    db_1.read(dbMgr, function (tr) {
        var it = db_1.iterDb(tr, "memory", entrance_s_1.Entrance._$info.name, null, false, "");
        var r1 = it.nextElem();
        while (r1) {
            var r = r1[1];
            if (r.note.get("event") === e.event_name) {
                var lastPoint = r.path.lastIndexOf(".");
                pi_modules[r.path.slice(0, lastPoint) + ".r"].exports[r.path.slice(lastPoint + 1, r.path.length)](e);
            }
            r1 = it.nextElem();
        }
    });
};
self._$notify = _$notify;
})