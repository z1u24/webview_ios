_$define("earn/xlsx/item.c", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cfg_1 = require("../../pi/util/cfg");
var item_s_1 = require("./item.s");
var _a = function _a(o0, o1) {
  return new item_s_1.MineHpCfg(o0, o1);
};
cfg_1.cfgMgr.set("earn/xlsx/item.MineHpCfg", new Map([[0, _a(1001, 100)], [1, _a(1002, 300)], [2, _a(1003, 500)]]));
var _b = function _b(o0, o1, o2, o3, o4) {
  return new item_s_1.ItemInitCfg(o0, o1, o2, o3, o4);
};
cfg_1.cfgMgr.set("earn/xlsx/item.ItemInitCfg", new Map([[0, _b(0, 1001, 1, 0, "\u5C0F\u77FF\u5C71")], [1, _b(1, 1002, 1, 0, "\u4E2D\u77FF\u5C71")], [2, _b(2, 1003, 1, 0, "\u5927\u77FF\u5C71")], [3, _b(3, 2001, 2, 0, "\u5C0F\u9504\u5934")], [4, _b(4, 2002, 2, 0, "\u4E2D\u9504\u5934")], [5, _b(5, 2003, 2, 0, "\u5927\u9504\u5934")], [6, _b(6, 3001, 3, 0, "BTC")], [7, _b(7, 4001, 4, 0, "ETH")], [8, _b(8, 5001, 5, 0, "ST")], [9, _b(9, 6001, 6, 0, "KT")], [10, _b(10, 7001, 7, 0, "\u94F6\u5238")], [11, _b(11, 7002, 7, 0, "\u91D1\u5238")], [12, _b(12, 7003, 7, 0, "\u5F69\u5238")]]));
var _c = function _c(o0, o1, o2, o3, o4, o5) {
  return new item_s_1.MedalCfg(o0, o1, o2, o3, o4, o5);
};
cfg_1.cfgMgr.set("earn/xlsx/item.MedalCfg", new Map([[0, _c(8001, "\u5E73\u6C11", 6001, 1, "\u5B51\u7136\u4E00\u8EAB", "\u5B51\u7136\u4E00\u8EAB")], [1, _c(8002, "\u5E73\u6C11", 6001, 20, "\u5BB6\u5F92\u56DB\u58C1", "\u5BB6\u5F92\u56DB\u58C1")], [2, _c(8003, "\u5E73\u6C11", 6001, 50, "\u5165\u4E0D\u6577\u51FA", "\u5165\u4E0D\u6577\u51FA")], [3, _c(8004, "\u5E73\u6C11", 6001, 100, "\u8EAB\u65E0\u5206\u6587", "\u8EAB\u65E0\u5206\u6587")], [4, _c(8005, "\u5E73\u6C11", 6001, 200, "\u56CA\u4E2D\u7F9E\u6DA9", "\u56CA\u4E2D\u7F9E\u6DA9")], [5, _c(8006, "\u4E2D\u4EA7", 6001, 500, "\u6E05\u8D2B\u4E50\u9053", "\u6E05\u8D2B\u4E50\u9053")], [6, _c(8007, "\u4E2D\u4EA7", 6001, 1000, "\u9971\u98DF\u6696\u8863", "\u9971\u98DF\u6696\u8863")], [7, _c(8008, "\u4E2D\u4EA7", 6001, 2000, "\u5B89\u5C45\u4E50\u4E1A", "\u5B89\u5C45\u4E50\u4E1A")], [8, _c(8009, "\u4E2D\u4EA7", 6001, 5000, "\u4E30\u8863\u8DB3\u98DF", "\u4E30\u8863\u8DB3\u98DF")], [9, _c(8010, "\u4E2D\u4EA7", 6001, 10000, "\u9526\u8863\u7389\u98DF", "\u9526\u8863\u7389\u98DF")], [10, _c(8011, "\u5BCC\u4EBA", 6001, 20000, "\u8363\u534E\u5BCC\u8D35", "\u8363\u534E\u5BCC\u8D35")], [11, _c(8012, "\u5BCC\u4EBA", 6001, 50000, "\u91D1\u7389\u6EE1\u5802", "\u91D1\u7389\u6EE1\u5802")], [12, _c(8013, "\u5BCC\u4EBA", 6001, 100000, "\u5BB6\u8D22\u4E07\u8D2F", "\u5BB6\u8D22\u4E07\u8D2F")], [13, _c(8014, "\u5BCC\u4EBA", 6001, 500000, "\u5BCC\u7532\u4E00\u65B9", "\u5BCC\u7532\u4E00\u65B9")], [14, _c(8015, "\u5BCC\u4EBA", 6001, 1000000, "\u5BCC\u7532\u5929\u4E0B", "\u5BCC\u7532\u5929\u4E0B")], [15, _c(8016, "\u5076\u7136\u6210\u5C31", 5001, 1, "\u9E3F\u8FD0\u5F53\u5934", "\u9E3F\u8FD0\u5F53\u5934")], [16, _c(8017, "\u5076\u7136\u6210\u5C31", 4001, 1, "\u6D3B\u4F53\u9526\u9CA4", "\u6D3B\u4F53\u9526\u9CA4")], [17, _c(8018, "\u5076\u7136\u6210\u5C31", 3001, 1, "\u5929\u9009\u4E4B\u5B50", "\u5929\u9009\u4E4B\u5B50")]]));
var _d = function _d(o0, o1, o2, o3, o4, o5) {
  return new item_s_1.AchievementMedalCfg(o0, o1, o2, o3, o4, o5);
};
cfg_1.cfgMgr.set("earn/xlsx/item.AchievementMedalCfg", new Map([[0, _d(8016, "\u5076\u7136\u6210\u5C31", 5001, 1, "\u9E3F\u8FD0\u5F53\u5934", "\u9E3F\u8FD0\u5F53\u5934")], [1, _d(8017, "\u5076\u7136\u6210\u5C31", 4001, 1, "\u6D3B\u4F53\u9526\u9CA4", "\u6D3B\u4F53\u9526\u9CA4")], [2, _d(8018, "\u5076\u7136\u6210\u5C31", 3001, 1, "\u5929\u9009\u4E4B\u5B50", "\u5929\u9009\u4E4B\u5B50")]]));
})