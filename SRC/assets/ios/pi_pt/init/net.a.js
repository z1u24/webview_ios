_$define("pi_pt/init/net.a", function (require, exports, module){
"use strict";
/**
 * netMgr
 */

Object.defineProperty(exports, "__esModule", { value: true });
var js_net_1 = require("../rust/pi_serv/js_net");
var server_cfg_s_1 = require("./server_cfg.s");
var init_1 = require("./init");
var cfg_1 = require("../../pi/util/cfg");
var initNetMgr = function initNetMgr() {
    //raw
    var netCfg = cfg_1.cfgMgr.get(server_cfg_s_1.RawNetMgr._$info.name);
    if (netCfg) {
        netCfg.forEach(function (v, k) {
            init_1.addNativeObj(v.name, js_net_1.NetMgr.new(), v, null);
        });
    }
    //tls
    var netCfgTls = cfg_1.cfgMgr.get(server_cfg_s_1.TlsNetMgr._$info.name);
    if (netCfgTls) {
        netCfgTls.forEach(function (v, k) {
            init_1.addNativeObj(v.name, js_net_1.TlsNetMgr.new(v.recvBuffSize), v, null);
        });
    }
};
initNetMgr();
})