_$define("chat/server/cfg/server.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Server configuration
 */
var cfg_1 = require("../../../pi/util/cfg");
var server_cfg_s_1 = require("../../../pi_pt/init/server_cfg.s");
// const netMgr = new NetMgr('netMgr', []);
// const netCfg = new NetCfg('0.0.0.0:9080', 'tcp', true, netMgr, []);
// const mqttCfg = new MqttCfg(netCfg, 1024 * 1024, 500 * 1000, 'mqttServer', []);
// const rpcCfg = new RpcCfg(mqttCfg, 'rpcServer', ['mqttServer']);
// // const httpsCfg = new HttpsCfg('0.0.0.0', 82, 5000, 10000, '../dst/');
// cfgMgr.set(NetMgr._$info.name, new Map<number, any>([[0, netMgr]]));
// cfgMgr.set(NetCfg._$info.name, new Map<number, any>([[0, netCfg]]));
// cfgMgr.set(MqttCfg._$info.name, new Map<number, any>([[0, mqttCfg]]));
// cfgMgr.set(RpcCfg._$info.name, new Map<number, any>([[0, rpcCfg]]));
// // cfgMgr.set(HttpsCfg._$info.name, new Map<number,any>([[0, httpsCfg]]));
// 启动http与ws
var rawNetMgr = new server_cfg_s_1.RawNetMgr('rawNetMgr', []);
var rawNetCfg = new server_cfg_s_1.NetCfg(server_cfg_s_1.NetCfg_Enum.Raw, new server_cfg_s_1.RawNetCfg('0.0.0.0:2234', 'tcp', true, rawNetMgr, []));
var mqttCfg = new server_cfg_s_1.MqttCfg(rawNetCfg, 1024 * 1024, 500 * 1000, 'mqttServer', []);
var rpcCfg = new server_cfg_s_1.RpcCfg(mqttCfg, 'rpcServer', ['mqttServer']);
var asyncCfg = new server_cfg_s_1.AsyncCfg([]);
var httpsCfg = new server_cfg_s_1.HttpsCfg('0.0.0.0', 8088, 5000, 10000, '../dst/');
cfg_1.cfgMgr.set(server_cfg_s_1.RawNetMgr._$info.name, new Map([[0, rawNetMgr]]));
cfg_1.cfgMgr.set(server_cfg_s_1.NetCfg._$info.name, new Map([[0, rawNetCfg]]));
cfg_1.cfgMgr.set(server_cfg_s_1.MqttCfg._$info.name, new Map([[0, mqttCfg]]));
cfg_1.cfgMgr.set(server_cfg_s_1.RpcCfg._$info.name, new Map([[0, rpcCfg]]));
cfg_1.cfgMgr.set(server_cfg_s_1.AsyncCfg._$info.name, new Map([[0, asyncCfg]]));
cfg_1.cfgMgr.set(server_cfg_s_1.HttpsCfg._$info.name, new Map([[0, httpsCfg]]));
})