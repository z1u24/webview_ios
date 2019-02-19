_$define("earn/server/rpc/user_item_rpc.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cfg_1 = require("../../../pi/util/cfg");
var entrance_s_1 = require("../../../pi_pt/entrance.s");
var _$c = function _$c(path, notes) {
  return new entrance_s_1.Entrance(path, notes);
};
var arr = [[0, _$c("earn/server/rpc/user_item.add_mine", new Map([["rpc", "rpcServer"]]))], [1, _$c("earn/server/rpc/user_item.item_query", new Map([["rpc", "rpcServer"]]))], [2, _$c("earn/server/rpc/user_item.get_item", new Map([["rpc", "rpcServer"]]))], [3, _$c("earn/server/rpc/user_item.award_query", new Map([["rpc", "rpcServer"]]))], [4, _$c("earn/server/rpc/user_item.get_medals", new Map([["rpc", "rpcServer"]]))], [5, _$c("earn/server/rpc/user_item.get_showMedal", new Map([["rpc", "rpcServer"]]))], [6, _$c("earn/server/rpc/user_item.show_medal", new Map([["rpc", "rpcServer"]]))], [7, _$c("earn/server/rpc/user_item.get_achievements", new Map([["rpc", "rpcServer"]]))], [8, _$c("earn/server/rpc/user_item.get_ad_award", new Map([["rpc", "rpcServer"]]))]];
cfg_1.cfgMgr.update(entrance_s_1.Entrance._$info.name, new Map(arr));
})