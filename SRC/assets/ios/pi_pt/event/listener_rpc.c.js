_$define("pi_pt/event/listener_rpc.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cfg_1 = require("../../pi/util/cfg");
var entrance_s_1 = require("../entrance.s");
var _$c = function _$c(path, notes) {
  return new entrance_s_1.Entrance(path, notes);
};
var arr = [[0, _$c("pi_pt/event/listener.connect", new Map([["event", "net_connect"]]))], [1, _$c("pi_pt/event/listener.close_connect", new Map([["event", "net_connect_close"]]))], [2, _$c("pi_pt/event/listener.dump", new Map([["event", "db_change"]]))]];
cfg_1.cfgMgr.update(entrance_s_1.Entrance._$info.name, new Map(arr));
})