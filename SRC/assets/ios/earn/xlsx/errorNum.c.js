_$define("earn/xlsx/errorNum.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cfg_1 = require("../../pi/util/cfg");
var errorNum_s_1 = require("./errorNum.s");
var _a = function _a(o0, o1, o2) {
  return new errorNum_s_1.ErrorNumCfg(o0, o1, o2);
};
cfg_1.cfgMgr.set("earn/xlsx/errorNum.ErrorNumCfg", new Map([[0, _a(600, "\u6570\u636E\u5E93\u9519\u8BEF", "\u6570\u636E\u5E93\u9519\u8BEF")], [1, _a(700, "\u7269\u54C1\u6570\u91CF\u9519\u8BEF", "\u7269\u54C1\u6570\u91CF\u9519\u8BEF")], [2, _a(800, "\u914D\u7F6E\u9519\u8BEF", "\u914D\u7F6E\u9519\u8BEF")], [3, _a(7101, "\u7528\u6237\u5956\u5238\u4E0D\u8DB3", "\u7528\u6237\u5956\u5238\u4E0D\u8DB3")], [4, _a(7102, "\u5956\u5238\u7C7B\u578B\u9519\u8BEF", "\u5956\u5238\u7C7B\u578B\u9519\u8BEF")], [5, _a(7103, "\u5956\u54C1\u5DF2\u7ECF\u5151\u5B8C", "\u5956\u54C1\u5DF2\u7ECF\u5151\u5B8C")], [6, _a(8101, "\u83B7\u53D6\u6392\u884C\u699C\u6570\u636E\u5931\u8D25", "\u83B7\u53D6\u6392\u884C\u699C\u6570\u636E\u5931\u8D25")], [7, _a(1101, "\u8BE5\u7C7B\u578B\u77FF\u5C71\u6570\u91CF\u4E0D\u8DB3", "\u8BE5\u7C7B\u578B\u77FF\u5C71\u6570\u91CF\u4E0D\u8DB3")], [8, _a(101, "\u53C2\u6570\u4E0D\u9F50", "\u53C2\u6570\u4E0D\u9F50")], [9, _a(102, "\u5BC6\u7801\u9519\u8BEF", "\u5BC6\u7801\u9519\u8BEF")], [10, _a(103, "\u53D6\u6D88\u652F\u4ED8", "\u53D6\u6D88\u652F\u4ED8")], [11, _a(203, "\u5176\u4ED6\u9519\u8BEF", "\u5176\u4ED6\u9519\u8BEF")]]));
})