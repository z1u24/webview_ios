_$define("chat/pressure/util/util", function (require, exports, module){
"use strict";
/**
 *
 */

Object.defineProperty(exports, "__esModule", { value: true });
var awardCfg_s_1 = require("../xls/awardCfg.s");
var cfgMap_1 = require("./cfgMap");
var randomSeedMgr_1 = require("./randomSeedMgr");
// 获取任务
exports.getTask = function (num, seedMgr) {
    var weights = [];
    var maxWeigth = 0;
    var filterCfgs = [];
    var cfgs = exports.getCfg(awardCfg_s_1.WeightAwardCfg._$info.name);
    var cfg = cfgs.get(num);
    if (!cfg) return;
    var count = cfg.count;
    filterCfgs.push(cfg);
    weights.push(maxWeigth += cfg.weight);
    for (var _i = 1; _i < count; _i++) {
        var cfg2 = cfgs.get(num + _i);
        filterCfgs.push(cfg2);
        weights.push(maxWeigth += cfg2.weight);
    }
    var i = getWeightIndex(weights, seedMgr.seed);
    return filterCfgs[i];
};
// 获取权重对应的位置
var getWeightIndex = function getWeightIndex(weights, seed) {
    var rate = randomSeedMgr_1.RandomSeedMgr.randomSeed(seed, 1, weights[weights.length - 1]);
    var i = 0;
    for (i = 0; i < weights.length; i++) {
        if (rate <= weights[i]) break;
    }
    return i;
};
/**
 * 读取配置
 * id作为主键
 * 返回map
 */
exports.getCfg = function (name) {
    var cfgs = cfgMap_1.getMap(name);
    var r = new Map();
    for (var _iterator = cfgs.values(), _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i2 >= _iterator.length) break;
            _ref = _iterator[_i2++];
        } else {
            _i2 = _iterator.next();
            if (_i2.done) break;
            _ref = _i2.value;
        }

        var value = _ref;

        r.set(value.id, value);
    }
    return r;
};
})