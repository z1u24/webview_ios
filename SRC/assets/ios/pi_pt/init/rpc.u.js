_$define("pi_pt/init/rpc.u", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var update_1 = require("./update");
var rpc_1 = require("./rpc");
var db_1 = require("../db");
var constant_1 = require("../constant");
var server_cfg_s_1 = require("./server_cfg.s");
var server_1 = require("../rust/rpc/server");
//更新rpc
var updateRpc = function updateRpc() {
    var env = update_1.getEnv();
    var newDbMgr = env.getDbMgr();
    var oldDbMgr = env.getOldMgr();
    var diff = env.getRDiff(); //取出后缀为.r.js的差异文件
    var depend = env.getDepend();
    var grayMgr = env.getGrayMgr();
    var newMap = update_1.readEntryCfg(newDbMgr, "rpc"); //从老的mgr中读到rpc的入口配置（即每个rpc函数的配置）
    var oldMap = update_1.readEntryCfg(oldDbMgr, "rpc"); //从新的mgr中读到rpc的入口配置（即每个rpc函数的配置）
    var cfg = update_1.compareEntryCfg(newMap, oldMap); //比较配置表的差异
    //取到所有的rpc服务
    var rpcServers = new Map();
    self._$nobjs.forEach(function (v, k) {
        if (v instanceof server_1.RPCServer) {
            rpcServers.set(k, v);
            return;
        }
    });
    //取到所有的rpc服务的配置
    var rpcServerCfgs = db_1.read(newDbMgr, function (tr) {
        var map = new Map();
        var iter = db_1.iterDb(tr, constant_1.DEFAULT_WARE, server_cfg_s_1.RpcCfg._$info.name, null, false, null);
        var n = iter.nextElem();
        while (n) {
            map.set(n[0], n[1]);
            n = iter.nextElem();
        }
        return map;
    });
    var topicMap = new Map();
    //console.log("cfg---------------",cfg);
    //遍历.r.js的差异列表，
    diff.forEach(function (v, modPath) {
        if (v === update_1.Change.Remove) {
            //如果文件被移除， 不做任何处理（不能移除对应的topicHandler， 否则旧的灰度将无法访问）
            return;
        }
        var modName = modPath.slice(0, modPath.length - 5);
        //console.log("diff---------------",modName);
        var map = cfg.get(modName);
        var flags = new Map();
        if (map) {
            //如果从配置中取到k， 表示该文件中存在rpc接口
            map.forEach(function (r, name) {
                var change = r.t;
                var o = r.old || r.new;
                if (o.note) {
                    //该文件对应的所有rpc灰度都应该被更新
                    var serverName = o.note.get("rpc");
                    if (serverName && !flags.get(serverName)) {
                        var server_cfg = rpcServerCfgs.get(serverName);
                        rpc_1.updateGrayTab(newDbMgr, depend, modName, server_cfg.nobjs, grayMgr, env, serverName);
                        flags.set(serverName, true);
                    }
                    //如果新创建了一个入口函数， 应该绑定topic
                    switch (change[0]) {
                        case update_1.Change.Create:
                            var _serverName = r.new.note.get("rpc");
                            var server = rpcServers.get(_serverName);
                            var _server_cfg = rpcServerCfgs.get(_serverName);
                            rpc_1.addHandler(server, modName + "." + name, _server_cfg.nobjs, topicMap, newDbMgr, depend, grayMgr, env, _serverName);
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    });
};
updateRpc();
})