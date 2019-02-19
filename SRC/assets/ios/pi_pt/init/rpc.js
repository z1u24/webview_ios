_$define("pi_pt/init/rpc", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rpc_server_1 = require("../net/rpc_server");
var util_1 = require("./util");
var js_net_1 = require("../rust/pi_serv/js_net");
var js_lib_1 = require("../rust/pi_serv/js_lib");
exports.addHandler = function (rpcServer, topic, _nobjs, map, dbMgr, depend, grayMgr, env, serverName) {
    var file = topic.slice(0, topic.lastIndexOf("."));
    var handler = map.get(topic);
    if (!handler) {
        var grayTab = grayMgr.getGrayTab(grayName(file, serverName));
        if (!grayTab) {
            grayTab = exports.createGrayTab(dbMgr, depend, file, _nobjs, grayMgr, env, serverName);
        }
        handler = js_net_1.arcNewTopicHandler(js_net_1.TopicHandler.new(grayTab)); //创建handler， 同一js文件下的rpc函数， handler应该是同一个
        map.set(topic, handler);
    }
    js_net_1.registerRpcHandler(rpcServer, topic, false, handler); //向rpc服务中设置handler
};
//创建灰度
exports.createGrayTab = function (dbMgr, depend, file, _nobjs, grayMgr, env, serverName) {
    var nobjs = util_1.createNobjs(_nobjs, env);
    var nobjs_paths = util_1.nobjsPath(_nobjs, env);
    var gray = js_lib_1.createGrayTab(js_lib_1.JSGray.new(dbMgr, util_1.createVMFactory(dbMgr, depend, nobjs_paths.concat([rpc_server_1.Path + ".js", file + ".r.js"])), grayName(file, serverName), nobjs));
    grayMgr.addGrayTab(gray); //将灰度表添加到灰度管理器中
    return gray;
};
//更新灰度
exports.updateGrayTab = function (dbMgr, depend, file, _nobjs, grayMgr, env, serverName) {
    var nobjs_paths = util_1.nobjsPath(_nobjs, env);
    grayMgr.updateGray(grayName(file, serverName), dbMgr, util_1.createVMFactory(dbMgr, depend, nobjs_paths.concat([rpc_server_1.Path + ".js", file + ".r.js"])));
};
//灰度命名
var grayName = function grayName(modName, serverName) {
    return modName + ".r.js$rpc$" + serverName;
};
})