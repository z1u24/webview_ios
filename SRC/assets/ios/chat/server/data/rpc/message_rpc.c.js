_$define("chat/server/data/rpc/message_rpc.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cfg_1 = require("../../../../pi/util/cfg");
var entrance_s_1 = require("../../../../pi_pt/entrance.s");
var _$c = function _$c(path, notes) {
  return new entrance_s_1.Entrance(path, notes);
};
var arr = [[0, _$c("chat/server/data/rpc/message.getUserHistoryCursor", new Map([["rpc", "rpcServer"]]))], [1, _$c("chat/server/data/rpc/message.getGroupHistoryCursor", new Map([["rpc", "rpcServer"]]))], [2, _$c("chat/server/data/rpc/message.sendGroupMessage", new Map([["rpc", "rpcServer"]]))], [3, _$c("chat/server/data/rpc/message.sendUserMessage", new Map([["rpc", "rpcServer"]]))], [4, _$c("chat/server/data/rpc/message.isUserOnline", new Map([["rpc", "rpcServer"]]))]];
cfg_1.cfgMgr.update(entrance_s_1.Entrance._$info.name, new Map(arr));
})