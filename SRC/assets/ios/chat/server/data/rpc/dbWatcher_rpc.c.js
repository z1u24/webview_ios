_$define("chat/server/data/rpc/dbWatcher_rpc.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cfg_1 = require("../../../../pi/util/cfg");
var entrance_s_1 = require("../../../../pi_pt/entrance.s");
var _$c = function _$c(path, notes) {
  return new entrance_s_1.Entrance(path, notes);
};
var arr = [[0, _$c("chat/server/data/rpc/dbWatcher.watchGroupInfo", new Map([["rpc", "rpcServer"]]))], [1, _$c("chat/server/data/rpc/dbWatcher.watchGroupUserLink", new Map([["rpc", "rpcServer"]]))], [2, _$c("chat/server/data/rpc/dbWatcher.watchUserHistory", new Map([["rpc", "rpcServer"]]))], [3, _$c("chat/server/data/rpc/dbWatcher.watchGroupHistory", new Map([["rpc", "rpcServer"]]))], [4, _$c("chat/server/data/rpc/dbWatcher.watchAnnounceHistory", new Map([["rpc", "rpcServer"]]))], [5, _$c("chat/server/data/rpc/dbWatcher.watchMsgLock", new Map([["rpc", "rpcServer"]]))], [6, _$c("chat/server/data/rpc/dbWatcher.watchUserInfo", new Map([["rpc", "rpcServer"]]))], [7, _$c("chat/server/data/rpc/dbWatcher.watchUserCredential", new Map([["rpc", "rpcServer"]]))], [8, _$c("chat/server/data/rpc/dbWatcher.watchAccountGenerator", new Map([["rpc", "rpcServer"]]))], [9, _$c("chat/server/data/rpc/dbWatcher.watchFriendLink", new Map([["rpc", "rpcServer"]]))], [10, _$c("chat/server/data/rpc/dbWatcher.watchContact", new Map([["rpc", "rpcServer"]]))], [11, _$c("chat/server/data/rpc/dbWatcher.watchAddressInfo", new Map([["rpc", "rpcServer"]]))]];
cfg_1.cfgMgr.update(entrance_s_1.Entrance._$info.name, new Map(arr));
})