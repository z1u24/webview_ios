_$define("chat/server/data/rpc/user_rpc.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cfg_1 = require("../../../../pi/util/cfg");
var entrance_s_1 = require("../../../../pi_pt/entrance.s");
var _$c = function _$c(path, notes) {
  return new entrance_s_1.Entrance(path, notes);
};
var arr = [[0, _$c("chat/server/data/rpc/user.applyFriend", new Map([["rpc", "rpcServer"]]))], [1, _$c("chat/server/data/rpc/user.acceptFriend", new Map([["rpc", "rpcServer"]]))], [2, _$c("chat/server/data/rpc/user.delFriend", new Map([["rpc", "rpcServer"]]))], [3, _$c("chat/server/data/rpc/user.addToBlackList", new Map([["rpc", "rpcServer"]]))], [4, _$c("chat/server/data/rpc/user.removeFromBlackList", new Map([["rpc", "rpcServer"]]))], [5, _$c("chat/server/data/rpc/user.changeFriendAlias", new Map([["rpc", "rpcServer"]]))], [6, _$c("chat/server/data/rpc/user.changeUserInfo", new Map([["rpc", "rpcServer"]]))]];
cfg_1.cfgMgr.update(entrance_s_1.Entrance._$info.name, new Map(arr));
})