_$define("pi_pt/init/rpc.a", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * rpc服务初始化
 * 根据配置，创建rpc服务，并为服务绑定handler
 */
var server_1 = require("../rust/rpc/server");
var js_net_1 = require("../rust/pi_serv/js_net");
var server_cfg_s_1 = require("./server_cfg.s");
var init_1 = require("./init");
var entrance_s_1 = require("../entrance.s");
var cfg_1 = require("../../pi/util/cfg");
var rpc_1 = require("./rpc");
var dbMgr = init_1.getEnv().getDbMgr();
var depend = init_1.getEnv().getDepend();
var initRpc = function initRpc() {
    var entranceCfg = cfg_1.cfgMgr.get(entrance_s_1.Entrance._$info.name); //rpc入口函数路径
    if (!entranceCfg) {
        return;
    }
    //遍历入口配置， 将rpc的配置过滤出来
    var entrance = [];
    entranceCfg.forEach(function (v, k) {
        if (v.note.get("rpc") !== undefined) {
            entrance.push(v);
        }
    });
    //rpc服务配置， 利用rpc服务配置创建rpc服务，并绑定handler
    var rpCfgs = cfg_1.cfgMgr.get(server_cfg_s_1.RpcCfg._$info.name); //rpc服务配置
    if (!rpCfgs) {
        return;
    }
    var handlerMap = new Map();
    rpCfgs.forEach(function (rpc, _) {
        var mqttServer = init_1.getNativeObj(rpc.mqtt.name);
        if (mqttServer) {
            var rpcServer = server_1.RPCServer.new(mqttServer);
            addHandlers(rpcServer, entrance, rpc.nobjs, handlerMap);
            init_1.addNativeObj(rpc.name, rpcServer, rpc, js_net_1.cloneRpcServer); //注册rpc服务
        } else {
            init_1.addNobjListener(rpc.mqtt, function (mqtt) {
                var rpcServer = server_1.RPCServer.new(js_net_1.cloneServerNode(mqtt));
                addHandlers(rpcServer, entrance, rpc.nobjs, handlerMap);
                init_1.addNativeObj(rpc.name, rpcServer, rpc, js_net_1.cloneRpcServer); //创建rpc服务
            });
        }
    });
};
var addHandlers = function addHandlers(rpcServer, entrance, _nobjs, map) {
    for (var j = 0; j < entrance.length; j++) {
        rpc_1.addHandler(rpcServer, entrance[j].path, _nobjs, map, dbMgr, depend, init_1.grayMgr, init_1.getEnv(), entrance[j].note.get("rpc"));
    }
};
initRpc();
})