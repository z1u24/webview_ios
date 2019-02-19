_$define("earn/server/rpc/guessingCompetition_rpc.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cfg_1 = require("../../../pi/util/cfg");
var entrance_s_1 = require("../../../pi_pt/entrance.s");
var _$c = function _$c(path, notes) {
  return new entrance_s_1.Entrance(path, notes);
};
var arr = [[0, _$c("earn/server/rpc/guessingCompetition.get_main_competitions", new Map([["rpc", "rpcServer"]]))], [1, _$c("earn/server/rpc/guessingCompetition.get_compJackpots", new Map([["rpc", "rpcServer"]]))], [2, _$c("earn/server/rpc/guessingCompetition.start_guessing", new Map([["rpc", "rpcServer"]]))], [3, _$c("earn/server/rpc/guessingCompetition.guessing_pay_query", new Map([["rpc", "rpcServer"]]))], [4, _$c("earn/server/rpc/guessingCompetition.get_user_guessingInfo", new Map([["rpc", "rpcServer"]]))], [5, _$c("earn/server/rpc/guessingCompetition.get_competitions", new Map([["rpc", "rpcServer"]]))], [6, _$c("earn/server/rpc/guessingCompetition.add_competitions", new Map([["rpc", "rpcServer"]]))], [7, _$c("earn/server/rpc/guessingCompetition.input_competition_result", new Map([["rpc", "rpcServer"]]))], [8, _$c("earn/server/rpc/guessingCompetition.settle_guessing_award", new Map([["rpc", "rpcServer"]]))], [9, _$c("earn/server/rpc/guessingCompetition.cancle_guessing", new Map([["rpc", "rpcServer"]]))]];
cfg_1.cfgMgr.update(entrance_s_1.Entrance._$info.name, new Map(arr));
})