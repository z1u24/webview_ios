_$define("pi_pt/event/listener.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var event_server_1 = require("./event_server");
var db_1 = require("../db");
var constant_1 = require("../constant");
var sinfo_1 = require("../../pi/struct/sinfo");
var js_db_1 = require("../rust/pi_serv/js_db");
//#[event=net_connect]
exports.connect = function (e) {
    console.log("net connect success----------------------------------");
    db_1.write(event_server_1.getEnv().getDbMgr(), function (tr) {
        db_1.alter(tr, constant_1.SESSION_WARE, e.connect_id + "_str", new sinfo_1.TabMeta(new sinfo_1.EnumType(sinfo_1.Type.Str), new sinfo_1.EnumType(sinfo_1.Type.Str)));
        db_1.alter(tr, constant_1.SESSION_WARE, e.connect_id + "_num", new sinfo_1.TabMeta(new sinfo_1.EnumType(sinfo_1.Type.Str), new sinfo_1.EnumType(sinfo_1.Type.U32)));
    });
};
//#[event=net_connect_close]
exports.close_connect = function (e) {
    console.log("net connect close success----------------------------------");
    db_1.write(event_server_1.getEnv().getDbMgr(), function (tr) {
        db_1.alter(tr, constant_1.SESSION_WARE, e.connect_id + "_str", null);
        db_1.alter(tr, constant_1.SESSION_WARE, e.connect_id + "_num", null);
    });
};
//#[event=db_change]
exports.dump = function (e) {
    if (e.ware === constant_1.DEFAULT_FILE_WARE) {
        //console.log("dump----------------------------------");
        js_db_1.dump(event_server_1.getEnv().getDbMgr(), e.ware, e.tab, "./dump/" + constant_1.DEFAULT_FILE_WARE + "/" + e.tab);
    }
};
})