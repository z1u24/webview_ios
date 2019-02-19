_$define("pi_pt/init/mqtt.a", function (require, exports, module){
"use strict";
/**
 * mqtt服务初始化
 * 根据配置创建mqtt服务
 */

Object.defineProperty(exports, "__esModule", { value: true });
var js_net_1 = require("../rust/pi_serv/js_net");
var server_cfg_s_1 = require("./server_cfg.s");
var init_1 = require("./init");
var cfg_1 = require("../../pi/util/cfg");
var initMqtt = function initMqtt() {
    var mqttCfgs = cfg_1.cfgMgr.get(server_cfg_s_1.MqttCfg._$info.name);
    if (!mqttCfgs) {
        return;
    }
    mqttCfgs.forEach(function (r, _k) {
        if (r.net.enum_type == server_cfg_s_1.NetCfg_Enum.Raw) {
            var netCfg = r.net.value;
            var netMgr = init_1.getNativeObj(netCfg.netMgr.name);
            if (netMgr) {
                var mqttServer = js_net_1.mqttBind(netMgr, netCfg.addr, netCfg.protocol, r.send_buf_size, r.recv_timeout); //创建mqtt服务
                init_1.addNativeObj(r.name, mqttServer, r, js_net_1.cloneServerNode);
            } else {
                init_1.addNobjListener(netCfg.netMgr, function (netMgr) {
                    var mqttServer = js_net_1.mqttBind(netMgr, netCfg.addr, netCfg.protocol, r.send_buf_size, r.recv_timeout); //创建mqtt服务
                    init_1.addNativeObj(r.name, mqttServer, r, js_net_1.cloneServerNode);
                });
            }
        } else {
            var _netCfg = r.net.value;
            var _netMgr = init_1.getNativeObj(_netCfg.netMgr.name);
            if (_netMgr) {
                var _mqttServer = js_net_1.mqttBindTls(_netMgr, _netCfg.addr, _netCfg.protocol, _netCfg.certPath, _netCfg.keyPath, r.send_buf_size, r.recv_timeout); //创建mqtt服务
                init_1.addNativeObj(r.name, _mqttServer, r, js_net_1.cloneServerNode);
            } else {
                init_1.addNobjListener(_netCfg.netMgr, function (netMgr) {
                    var mqttServer = js_net_1.mqttBindTls(netMgr, _netCfg.addr, _netCfg.protocol, _netCfg.certPath, _netCfg.keyPath, r.send_buf_size, r.recv_timeout); //创建mqtt服务
                    init_1.addNativeObj(r.name, mqttServer, r, js_net_1.cloneServerNode);
                });
            }
        }
    });
};
initMqtt();
})