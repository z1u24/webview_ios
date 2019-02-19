_$define("pi_pt/init/async.a", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var js_base_1 = require("../rust/pi_serv/js_base");
var js_lib_1 = require("../rust/pi_serv/js_lib");
var js_async_1 = require("../rust/pi_serv/js_async");
var server_cfg_s_1 = require("./server_cfg.s");
var init_1 = require("./init");
var entrance_s_1 = require("../entrance.s");
var async_resp_1 = require("../async/async_resp");
var util_1 = require("./util");
var js_base_2 = require("../rust/pi_serv/js_base");
var cfg_1 = require("../../pi/util/cfg");
exports.initOk = false;
var initAsync = function initAsync() {
    var env = init_1.getEnv();
    var entrance = []; //rpc入口函数路径
    var asyncCfgs = cfg_1.cfgMgr.get(server_cfg_s_1.AsyncCfg._$info.name);
    var entranceCfgs = cfg_1.cfgMgr.get(entrance_s_1.Entrance._$info.name);
    if (!asyncCfgs || !entranceCfgs) {
        return;
    }
    entranceCfgs.forEach(function (v, _k) {
        if (v.note.get("async") !== undefined) {
            entrance.push(v.path);
        }
    });
    var map = new Map();
    asyncCfgs.forEach(function (v, k) {
        var nobjs = init_1.createNobjs(v.nobjs);
        for (var j = 0; j < entrance.length; j++) {
            var topic = entrance[j];
            var file = topic.slice(0, topic.lastIndexOf("."));
            var handler = map.get(entrance[j]);
            if (!handler) {
                var gray = js_lib_1.JSGray.new(env.getDbMgr(), util_1.createVMFactory(env.getDbMgr(), env.getDepend(), [async_resp_1.Path + ".js", file + ".r.js"]), topic + "$async", nobjs);
                handler = js_base_2.arcNewAsyncRequestHandler(js_async_1.AsyncRequestHandler.new(gray)); //创建handler， 同一js文件下的rpc函数， handler应该是同一个
                map.set(entrance[j], handler);
            }
            js_base_1.registerAsyncHandler(topic, handler); //注册一个异步处理器
        }
    });
};
initAsync();
})