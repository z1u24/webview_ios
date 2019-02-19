_$define("chat/pressure/xls/awardCfg.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cfg_1 = require("../../../pi/util/cfg");
var awardCfg_s_1 = require("./awardCfg.s");
var _a = function _a(o0, o1, o2, o3, o4, o5) {
  return new awardCfg_s_1.AverageAwardCfg(o0, o1, o2, o3, o4, o5);
};
cfg_1.cfgMgr.set("chat/pressure/xls/awardCfg.AverageAwardCfg", new Map([[0, _a(201101, 1601101, 1, 1, 4, 1)], [1, _a(201102, 1601201, 1, 1, 0, 0)], [2, _a(201103, 1601301, 1, 1, 0, 0)], [3, _a(201104, 1601401, 1, 1, 0, 0)], [4, _a(202101, 1602101, 1, 1, 8, 1)], [5, _a(202102, 1602102, 1, 1, 0, 0)], [6, _a(202103, 1602201, 1, 1, 0, 0)], [7, _a(202104, 1602202, 1, 1, 0, 0)], [8, _a(202105, 1602301, 1, 1, 0, 0)], [9, _a(202106, 1602302, 1, 1, 0, 0)], [10, _a(202107, 1602401, 1, 1, 0, 0)], [11, _a(202108, 1602402, 1, 1, 0, 0)]]));
var _b = function _b(o0, o1, o2, o3, o4, o5, o6, o7, o8, o9, o10) {
  return new awardCfg_s_1.WeightAwardCfg(o0, o1, o2, o3, o4, o5, o6, o7, o8, o9, o10);
};
cfg_1.cfgMgr.set("chat/pressure/xls/awardCfg.WeightAwardCfg", new Map([[0, _b(300101, 1, 1, 1, 4, 1, 50, "chat/pressure/robot", "addFind", "[]", "\u52A0\u597D\u53CB")], [1, _b(300102, 2, 1, 1, 0, 0, 50, "chat/pressure/robot", "inviteGroup", "[]", "\u52A0\u7FA4")], [2, _b(300103, 3, 1, 1, 0, 0, 80, "chat/pressure/robot", "chat", "[]", "\u5355\u804A")], [3, _b(300104, 4, 1, 1, 0, 0, 50, "chat/pressure/robot", "groupchat", "[]", "\u7FA4\u804A")]]));
var _c = function _c(o0, o1, o2, o3, o4, o5) {
  return new awardCfg_s_1.RateAwardCfg(o0, o1, o2, o3, o4, o5);
};
cfg_1.cfgMgr.set("chat/pressure/xls/awardCfg.RateAwardCfg", new Map([[0, _c(401101, 1, 1, 1, 4, 5000)], [1, _c(401102, 2, 1, 1, 0, 10000)], [2, _c(401103, 3, 1, 1, 0, 3500)], [3, _c(401104, 4, 1, 1, 0, 3500)]]));
})