_$define("earn/server/cfg/server.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Server configuration
 */
var cfg_1 = require("../../../pi/util/cfg");
var server_cfg_s_1 = require("../../../pi_pt/init/server_cfg.s");
var netMgr = new server_cfg_s_1.NetMgr('netMgr', []);
var netCfg = new server_cfg_s_1.NetCfg('0.0.0.0:2234', 'tcp', true, netMgr, []);
var mqttCfg = new server_cfg_s_1.MqttCfg(netCfg, 1024 * 1024, 500 * 1000, 'mqttServer', []);
var rpcCfg = new server_cfg_s_1.RpcCfg(mqttCfg, 'rpcServer', ['mqttServer']);
var httpsCfg = new server_cfg_s_1.HttpsCfg('0.0.0.0', 8088, 5000, 10000, '../dst/');
cfg_1.cfgMgr.set(server_cfg_s_1.NetMgr._$info.name, new Map([[0, netMgr]]));
cfg_1.cfgMgr.set(server_cfg_s_1.NetCfg._$info.name, new Map([[0, netCfg]]));
cfg_1.cfgMgr.set(server_cfg_s_1.MqttCfg._$info.name, new Map([[0, mqttCfg]]));
cfg_1.cfgMgr.set(server_cfg_s_1.RpcCfg._$info.name, new Map([[0, rpcCfg]]));
cfg_1.cfgMgr.set(server_cfg_s_1.HttpsCfg._$info.name, new Map([[0, httpsCfg]]));
// // 启动http与ws
// let rawNetMgr = new RawNetMgr('rawNetMgr', []);
// let rawNetCfg = new NetCfg(NetCfg_Enum.Raw, new RawNetCfg('0.0.0.0:2234', 'tcp', true, rawNetMgr, []));
// let mqttCfg = new MqttCfg(rawNetCfg, 1024*1024, 500 * 1000, "mqttServer", []);
// let rpcCfg = new RpcCfg(mqttCfg, 'rpcServer', ['mqttServer']);
// let asyncCfg = new AsyncCfg([]);
// let httpsCfg = new HttpsCfg('0.0.0.0', 8088, 5000, 10000, '../dst/');
// cfgMgr.set(RawNetMgr._$info.name, new Map<number,any>([[0, rawNetMgr]]));
// cfgMgr.set(NetCfg._$info.name, new Map<number,any>([[0, rawNetCfg]]));
// cfgMgr.set(MqttCfg._$info.name, new Map<number, any>([[0, mqttCfg]]));
// cfgMgr.set(RpcCfg._$info.name, new Map<number, any>([[0, rpcCfg]]));
// cfgMgr.set(AsyncCfg._$info.name, new Map<number,any>([[0, asyncCfg]]));
// cfgMgr.set(HttpsCfg._$info.name, new Map<number,any>([[0, httpsCfg]]));
// 允许跨域
// const staticfile = StaticFile.newString('/earn/client/boot/index.html');
// staticfile.addGenRespHeader('Access-Control-Allow-Origin', '*');
})