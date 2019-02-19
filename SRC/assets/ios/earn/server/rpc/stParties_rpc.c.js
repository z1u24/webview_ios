_$define("earn/server/rpc/stParties_rpc.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cfg_1 = require("../../../pi/util/cfg");
var entrance_s_1 = require("../../../pi_pt/entrance.s");
var _$c = function _$c(path, notes) {
  return new entrance_s_1.Entrance(path, notes);
};
var arr = [[0, _$c("earn/server/rpc/stParties.get_STNum", new Map([["rpc", "rpcServer"]]))], [1, _$c("earn/server/rpc/stParties.get_KTNum", new Map([["rpc", "rpcServer"]]))], [2, _$c("earn/server/rpc/stParties.st_rotary", new Map([["rpc", "rpcServer"]]))], [3, _$c("earn/server/rpc/stParties.rotary_pay_query", new Map([["rpc", "rpcServer"]]))], [4, _$c("earn/server/rpc/stParties.st_treasurebox", new Map([["rpc", "rpcServer"]]))], [5, _$c("earn/server/rpc/stParties.box_pay_query", new Map([["rpc", "rpcServer"]]))], [6, _$c("earn/server/rpc/stParties.get_convert_list", new Map([["rpc", "rpcServer"]]))], [7, _$c("earn/server/rpc/stParties.st_convert", new Map([["rpc", "rpcServer"]]))], [8, _$c("earn/server/rpc/stParties.add_convert_info", new Map([["rpc", "rpcServer"]]))], [9, _$c("earn/server/rpc/stParties.modify_convert_info", new Map([["rpc", "rpcServer"]]))], [10, _$c("earn/server/rpc/stParties.add_convert", new Map([["rpc", "rpcServer"]]))], [11, _$c("earn/server/rpc/stParties.get_hasFree", new Map([["rpc", "rpcServer"]]))]];
cfg_1.cfgMgr.update(entrance_s_1.Entrance._$info.name, new Map(arr));
})