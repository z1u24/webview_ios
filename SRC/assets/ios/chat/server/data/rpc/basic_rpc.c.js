_$define("chat/server/data/rpc/basic_rpc.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cfg_1 = require("../../../../pi/util/cfg");
var entrance_s_1 = require("../../../../pi_pt/entrance.s");
var _$c = function _$c(path, notes) {
  return new entrance_s_1.Entrance(path, notes);
};
var arr = [[0, _$c("chat/server/data/rpc/basic.registerUser", new Map([["rpc", "rpcServer"]]))], [1, _$c("chat/server/data/rpc/basic.login", new Map([["rpc", "rpcServer"]]))], [2, _$c("chat/server/data/rpc/basic.getUsersInfo", new Map([["rpc", "rpcServer"]]))], [3, _$c("chat/server/data/rpc/basic.getGroupsInfo", new Map([["rpc", "rpcServer"]]))], [4, _$c("chat/server/data/rpc/basic.getContact", new Map([["rpc", "rpcServer"]]))], [5, _$c("chat/server/data/rpc/basic.getFriendLinks", new Map([["rpc", "rpcServer"]]))], [6, _$c("chat/server/data/rpc/basic.getGroupHistory", new Map([["rpc", "rpcServer"]]))], [7, _$c("chat/server/data/rpc/basic.getUserHistory", new Map([["rpc", "rpcServer"]]))], [8, _$c("chat/server/data/rpc/basic.getAnnoucement", new Map([["rpc", "rpcServer"]]))], [9, _$c("chat/server/data/rpc/basic.getAnnoucements", new Map([["rpc", "rpcServer"]]))], [10, _$c("chat/server/data/rpc/basic.setData", new Map([["rpc", "rpcServer"]]))], [11, _$c("chat/server/data/rpc/basic.getData", new Map([["rpc", "rpcServer"]]))]];
cfg_1.cfgMgr.update(entrance_s_1.Entrance._$info.name, new Map(arr));
})