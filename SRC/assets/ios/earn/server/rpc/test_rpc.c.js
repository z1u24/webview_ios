_$define("earn/server/rpc/test_rpc.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cfg_1 = require("../../../pi/util/cfg");
var entrance_s_1 = require("../../../pi_pt/entrance.s");
var _$c = function _$c(path, notes) {
  return new entrance_s_1.Entrance(path, notes);
};
var arr = [[0, _$c("earn/server/rpc/test.award", new Map([["rpc", "rpcServer"]]))], [1, _$c("earn/server/rpc/test.db_test", new Map([["rpc", "rpcServer"]]))], [2, _$c("earn/server/rpc/test.item_add", new Map([["rpc", "rpcServer"]]))], [3, _$c("earn/server/rpc/test.item_addticket", new Map([["rpc", "rpcServer"]]))], [4, _$c("earn/server/rpc/test.hit_test", new Map([["rpc", "rpcServer"]]))], [5, _$c("earn/server/rpc/test.bigint_test", new Map([["rpc", "rpcServer"]]))], [6, _$c("earn/server/rpc/test.get_objStr", new Map([["rpc", "rpcServer"]]))]];
cfg_1.cfgMgr.update(entrance_s_1.Entrance._$info.name, new Map(arr));
})