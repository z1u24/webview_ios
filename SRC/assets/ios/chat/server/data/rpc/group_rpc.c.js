_$define("chat/server/data/rpc/group_rpc.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cfg_1 = require("../../../../pi/util/cfg");
var entrance_s_1 = require("../../../../pi_pt/entrance.s");
var _$c = function _$c(path, notes) {
  return new entrance_s_1.Entrance(path, notes);
};
var arr = [[0, _$c("chat/server/data/rpc/group.applyJoinGroup", new Map([["rpc", "rpcServer"]]))], [1, _$c("chat/server/data/rpc/group.userExitGroup", new Map([["rpc", "rpcServer"]]))], [2, _$c("chat/server/data/rpc/group.acceptUser", new Map([["rpc", "rpcServer"]]))], [3, _$c("chat/server/data/rpc/group.inviteUsers", new Map([["rpc", "rpcServer"]]))], [4, _$c("chat/server/data/rpc/group.agreeJoinGroup", new Map([["rpc", "rpcServer"]]))], [5, _$c("chat/server/data/rpc/group.setOwner", new Map([["rpc", "rpcServer"]]))], [6, _$c("chat/server/data/rpc/group.addAdmin", new Map([["rpc", "rpcServer"]]))], [7, _$c("chat/server/data/rpc/group.delAdmin", new Map([["rpc", "rpcServer"]]))], [8, _$c("chat/server/data/rpc/group.delMember", new Map([["rpc", "rpcServer"]]))], [9, _$c("chat/server/data/rpc/group.getGroupUserLink", new Map([["rpc", "rpcServer"]]))], [10, _$c("chat/server/data/rpc/group.createGroup", new Map([["rpc", "rpcServer"]]))], [11, _$c("chat/server/data/rpc/group.dissolveGroup", new Map([["rpc", "rpcServer"]]))], [12, _$c("chat/server/data/rpc/group.updateGroupInfo", new Map([["rpc", "rpcServer"]]))]];
cfg_1.cfgMgr.update(entrance_s_1.Entrance._$info.name, new Map(arr));
})