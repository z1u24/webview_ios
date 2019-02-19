_$define("pi_pt/init/event.b", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 事件服务
 */
var init_1 = require("./init");
var js_net_1 = require("../rust/pi_serv/js_net");
var js_lib_1 = require("../rust/pi_serv/js_lib");
var js_db_1 = require("../rust/pi_serv/js_db");
var server_cfg_s_1 = require("./server_cfg.s");
var entrance_s_1 = require("../entrance.s");
var constant_1 = require("../constant");
var event_server_1 = require("../event/event_server");
var util_1 = require("./util");
var cfg_1 = require("../../pi/util/cfg");
var netConnect = function netConnect() {
    var net_connect_close = []; //关闭网络连接入口
    var connect_close = []; //网络连接
    var db_listen = []; //db监听
    var entranceCfg = cfg_1.cfgMgr.get(entrance_s_1.Entrance._$info.name);
    var netCfgs = cfg_1.cfgMgr.get(server_cfg_s_1.NetCfg._$info.name);
    if (!netCfgs) {
        return;
    }
    if (entranceCfg) {
        entranceCfg.forEach(function (r, _k) {
            if (r.note.get("event") === constant_1.NET_CONNECT_EVENT) {
                var file = r.path.slice(0, r.path.lastIndexOf("."));
                connect_close.push(file + ".r.js");
            } else if (r.note.get("event") === constant_1.NET_CONNECT_CLOSE_EVENT) {
                var _file = r.path.slice(0, r.path.lastIndexOf("."));
                net_connect_close.push(_file + ".r.js");
            } else if (r.note.get("event") === constant_1.DB_CHANGE) {
                var _file2 = r.path.slice(0, r.path.lastIndexOf("."));
                db_listen.push(_file2 + ".r.js");
            }
        });
    }
    netCfgs.forEach(function (net, _k) {
        if (net.enum_type == server_cfg_s_1.NetCfg_Enum.Raw) {
            var netCfg = net.value;
            var netMgr = init_1.getNativeObj(netCfg.netMgr.name);
            if (netMgr) {
                addNetHandler(netMgr, net, net_connect_close, connect_close);
            } else {
                init_1.addNobjListener(netCfg.netMgr, function (netMgr) {
                    addNetHandler(netMgr, net, net_connect_close, connect_close);
                });
            }
        } else {
            var _netCfg = net.value;
            var _netMgr = init_1.getNativeObj(_netCfg.netMgr.name);
            if (_netMgr) {
                addNetHandler(_netMgr, net, net_connect_close, connect_close);
            } else {
                init_1.addNobjListener(_netCfg.netMgr, function (netMgr) {
                    addNetHandler(netMgr, net, net_connect_close, connect_close);
                });
            }
        }
    });
    var env = init_1.getEnv();
    //注册数据库监听器
    if (db_listen.length > 0) {
        var factory = util_1.createVMFactory(env.getDbMgr(), env.getDepend(), [event_server_1.Path + ".js"].concat(db_listen));
        var m = js_db_1.JSDBMonitor.new("_$notify", factory);
        js_db_1.registerDbJsDbMonitor(env.getDbMgr(), m);
    }
};
var addNetHandler = function addNetHandler(netMgr, netCfg, net_connect_close, connect_close) {
    var env = init_1.getEnv();
    var dbMgr = env.getDbMgr();
    var depend = env.getDepend();
    var nobjs_paths = init_1.nobjsPath(netCfg.value.nobjs);
    var factory = util_1.createVMFactory(dbMgr, depend, nobjs_paths.concat([event_server_1.Path + ".js"]).concat(connect_close));
    var factory_close = util_1.createVMFactory(dbMgr, depend, nobjs_paths.concat([event_server_1.Path + ".js"]).concat(net_connect_close));
    var gray = js_lib_1.JSGray.new(dbMgr, factory, "net_connect$event", init_1.createNobjs(netCfg.value.nobjs));
    var gray_close = js_lib_1.JSGray.new(dbMgr, factory_close, "net_connect_close$event", init_1.createNobjs(netCfg.value.nobjs));
    if (netCfg.enum_type == server_cfg_s_1.NetCfg_Enum.Raw) {
        var cfg = netCfg.value;
        js_net_1.netConnectBind(netMgr, cfg.addr, cfg.protocol, js_net_1.NetHandler.new("_$notify", gray), js_net_1.NetHandler.new("_$notify", gray_close));
    } else {
        var _cfg = netCfg.value;
        js_net_1.netConnectBindTls(netMgr, _cfg.addr, _cfg.protocol, _cfg.certPath, _cfg.keyPath, js_net_1.NetHandler.new("_$notify", gray), js_net_1.NetHandler.new("_$notify", gray_close));
    }
};
netConnect();
})