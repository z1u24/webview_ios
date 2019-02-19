_$define("earn/server/util/award.t", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 这里处理冒险奖励逻辑
 */
// ===================================================== 导入
var db_1 = require("../../../pi_pt/db");
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var awardCfg_s_1 = require("../../xlsx/awardCfg.s");
var constant_1 = require("../data/constant");
var award_1 = require("./award");
var randomSeedMgr_1 = require("./randomSeedMgr");
// ===================================================== 导出
// 处理奖励
exports.doAward = function (awardId, seedMgr, awards) {
    // 计算奖励
    if (awardCfg_s_1.isRateAward(awardId)) {
        doRateAward(awardId, seedMgr, awards);
    } else if (awardCfg_s_1.isWeightAward(awardId)) {
        doWeightAward(awards, awardId, seedMgr);
    } else if (awardCfg_s_1.isAverageAward(awardId)) {
        doAverageAward(awards, awardId, seedMgr);
    }
};
// 添加奖励
exports.addAward = function (itemId, count, allAwards) {
    if (!itemId || !count) return;
    // 装备是不可叠加的，其他的可叠加
    var index = allAwards.findIndex(function (v) {
        return v[0] === itemId;
    });
    if (index < 0) {
        allAwards.push([itemId, count]);
    } else {
        allAwards[index][1] += count;
    }
};
// ===================================================== 本地
// 处理几率奖励---万分率
var doRateAward = function doRateAward(awardId, seedMgr, awards) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var specialAwards = [];
    db_1.read(dbMgr, function (tr) {
        var maxCount = 0;
        // 取几率奖励配置
        var iterCfg = db_1.iterDb(tr, constant_1.MEMORY_NAME, awardCfg_s_1.RateAwardCfg._$info.name, awardId, false, null); // 取from表的迭代器
        do {
            var elCfg = iterCfg.nextElem();
            console.log('elCfg----------------read---------------', elCfg);
            if (!elCfg) return;
            var cfg = elCfg[1];
            if (maxCount <= 0) maxCount = cfg.count;
            var hadAward = false;
            if (cfg.rate < 10000) {
                var index = randomSeedMgr_1.RandomSeedMgr.randomSeed(seedMgr.seed, 0, 10000);
                if (index <= cfg.rate) {
                    hadAward = true;
                }
            } else {
                hadAward = true;
            }
            if (hadAward) {
                if (award_1.isSpecialAward(cfg.prop)) {
                    specialAwards.push(cfg.prop);
                } else {
                    var count = randomSeedMgr_1.RandomSeedMgr.randomSeed(seedMgr.seed, cfg.min, cfg.max);
                    exports.addAward(cfg.prop, count, awards);
                }
            }
            maxCount--;
        } while (maxCount > 0);
    });
    // 处理特殊奖励
    specialAwards.forEach(function (v) {
        exports.doAward(v, seedMgr, awards);
    });
};
/**
 * 处理权重奖励
 * @param upBox 宝箱品质提升
 */
var doWeightAward = function doWeightAward(awards, awardId, seedMgr) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var cfgs = [];
    var weights = [];
    var maxWeights = 0;
    db_1.read(dbMgr, function (tr) {
        var maxCount = 0;
        // 取权重奖励配置
        var iterCfg = db_1.iterDb(tr, constant_1.MEMORY_NAME, awardCfg_s_1.WeightAwardCfg._$info.name, awardId, false, null); // 取from表的迭代器
        do {
            var elCfg = iterCfg.nextElem();
            console.log('elCfg----------------read---------------', elCfg);
            if (!elCfg) return;
            var _cfg = elCfg[1];
            if (maxCount <= 0) maxCount = _cfg.count;
            cfgs.push(_cfg);
            maxWeights = _cfg.weight + maxWeights;
            weights.push(maxWeights);
            maxCount--;
        } while (maxCount > 0);
    });
    var i = award_1.getWeightIndex(weights, seedMgr.seed);
    // 处理特殊奖励
    var cfg = cfgs[i];
    var prop = cfg.prop;
    if (award_1.isSpecialAward(prop)) {
        exports.doAward(prop, seedMgr, awards);
    } else {
        var count = randomSeedMgr_1.RandomSeedMgr.randomSeed(seedMgr.seed, cfg.min, cfg.max);
        exports.addAward(prop, count, awards);
    }
};
// 处理平均奖励
var doAverageAward = function doAverageAward(awards, awardId, seedMgr) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var cfg = void 0;
    db_1.read(dbMgr, function (tr) {
        // 取平均奖励配置
        var iterCfg = db_1.iterDb(tr, constant_1.MEMORY_NAME, awardCfg_s_1.AverageAwardCfg._$info.name, awardId, false, null); // 取from表的迭代器
        var elCfg = iterCfg.nextElem();
        console.log('elCfg----------------read---------------', elCfg);
        if (!elCfg) return;
        var iCfg = elCfg[1];
        var index = randomSeedMgr_1.RandomSeedMgr.randomSeed(seedMgr.seed, 1, iCfg.count);
        if (index === 1) {
            cfg = iCfg;
        } else {
            awardId = Math.floor(awardId / 100) * 100 + index;
            var _iterCfg = db_1.iterDb(tr, constant_1.MEMORY_NAME, awardCfg_s_1.AverageAwardCfg._$info.name, awardId, false, null); // 取from表的迭代器
            var _elCfg = _iterCfg.nextElem();
            console.log('elCfg----------------read---------------', _elCfg);
            if (!_elCfg) return;
            cfg = _elCfg[1];
        }
    });
    // 处理特殊奖励
    if (award_1.isSpecialAward(cfg.prop)) {
        exports.doAward(cfg.prop, seedMgr, awards);
    } else {
        var count = randomSeedMgr_1.RandomSeedMgr.randomSeed(seedMgr.seed, cfg.min, cfg.max);
        exports.addAward(cfg.prop, count, awards);
    }
};
// ===================================================== 立即执行
})