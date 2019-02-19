_$define("earn/xlsx/competition.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cfg_1 = require("../../pi/util/cfg");
var competition_s_1 = require("./competition.s");
var _a = function _a(o0, o1, o2, o3) {
  return new competition_s_1.LOLTeamInfosCfg(o0, o1, o2, o3);
};
cfg_1.cfgMgr.set("earn/xlsx/competition.LOLTeamInfosCfg", new Map([[0, _a(1010001, "IG", "LPL", "a")], [1, _a(1010002, "RNG", "LPL", "a")], [2, _a(1010003, "EDG", "LPL", "a")], [3, _a(1010004, "TOP", "LPL", "a")], [4, _a(1010005, "WE", "LPL", "a")], [5, _a(1010006, "BLG", "LPL", "a")], [6, _a(1010007, "FPX", "LPL", "a")], [7, _a(1010008, "JDG", "LPL", "a")], [8, _a(1010009, "LGD", "LPL", "a")], [9, _a(1010010, "OMG", "LPL", "a")], [10, _a(1010011, "RW", "LPL", "a")], [11, _a(1010012, "SN", "LPL", "a")], [12, _a(1010013, "SS", "LPL", "a")], [13, _a(1010014, "VG", "LPL", "a")], [14, _a(1010015, "SDG", "LPL", "a")], [15, _a(1010016, "V5", "LPL", "a")]]));
var _b = function _b(o0, o1, o2, o3) {
  return new competition_s_1.LOLTypeCfg(o0, o1, o2, o3);
};
cfg_1.cfgMgr.set("earn/xlsx/competition.LOLTypeCfg", new Map([[0, _b(101, "LPL\u82F1\u96C4\u8054\u76DF\u804C\u4E1A\u8054\u8D5B", "2019\u6625\u5B63\u8D5B", "lpl")], [1, _b(102, "LCK\u82F1\u96C4\u8054\u76DF\u51A0\u519B\u8054\u8D5B", "2019\u6625\u5B63\u8D5B", "lck")], [2, _b(103, "LMS\u82F1\u96C4\u8054\u76DF\u804C\u4E1A\u8054\u8D5B", "2019\u6625\u5B63\u8D5B", "lms")], [3, _b(104, "LCS\u82F1\u96C4\u8054\u76DF\u51A0\u519B\u8054\u8D5B", "2019\u6625\u5B63\u8D5B", "lcs")]]));
})