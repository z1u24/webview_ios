_$define("earn/server/util/award", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 这里处理冒险相关逻辑
 */
// ===================================================== 导入
var awardCfg_s_1 = require("../../xlsx/awardCfg.s");
var randomSeedMgr_1 = require("./randomSeedMgr");
// ===================================================== 导出
// 获取权重对应的位置
exports.getWeightIndex = function (weights, seed) {
    var rate = randomSeedMgr_1.RandomSeedMgr.randomSeed(seed, 1, weights[weights.length - 1]);
    var i = 0;
    for (i = 0; i < weights.length; i++) {
        if (rate <= weights[i]) break;
    }
    return i;
};
// 是特殊奖励
exports.isSpecialAward = function (awardId) {
    return awardCfg_s_1.isRateAward(awardId) || awardCfg_s_1.isWeightAward(awardId) || awardCfg_s_1.isAverageAward(awardId);
};
// ===================================================== 本地
// ===================================================== 立即执行
})