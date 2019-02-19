_$define("earn/server/main.i", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 入口文件
 */
var struct_mgr_1 = require("../../pi/struct/struct_mgr");
var bon_1 = require("../../pi/util/bon");
var init_1 = require("../../pi_pt/init/init");
var js_db_1 = require("../../pi_pt/rust/pi_serv/js_db");
var js_net_1 = require("../../pi_pt/rust/pi_serv/js_net");
var constant_1 = require("./data/constant");
var dbMgr = init_1.getEnv().getDbMgr();
var init = function init() {
    addDbMonitor();
};
// 数据库监听器， 需要初始化配置， 启动mqtt服务， rpc服务
var addDbMonitor = function addDbMonitor() {
    var mqttServer = js_net_1.cloneServerNode(init_1.getNativeObj('mqttServer'));
    var buf = new bon_1.BonBuffer();
    var roster = createRoster();
    console.log(roster);
    buf.writeMap(roster, function (ware, value) {
        buf.writeUtf8(ware);
        buf.writeMap(value, function (tab, flag) {
            buf.writeUtf8(tab);
            buf.writeBool(flag);
        });
    });
    var monitor = js_db_1.DBToMqttMonitor.new(js_net_1.cloneServerNode(mqttServer), buf.getBuffer());
    js_db_1.registerDbToMqttMonitor(dbMgr, monitor);
};
// 创建一个监听名单
var createRoster = function createRoster() {
    var map = new Map();
    for (var id in pi_modules) {
        if (pi_modules.hasOwnProperty(id) && pi_modules[id].exports) {
            for (var kk in pi_modules[id].exports) {
                var c = pi_modules[id].exports[kk];
                if (struct_mgr_1.Struct.isPrototypeOf(c) && c._$info) {
                    if (c._$info.notes && c._$info.notes.get('dbMonitor')) {
                        var m = map.get(constant_1.WARE_NAME);
                        if (!m) {
                            m = new Map();
                            map.set(constant_1.WARE_NAME, m);
                        }
                        m.set(c._$info.name, true);
                    }
                }
            }
        }
    }
    return map;
};
init();
})