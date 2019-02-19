_$define("chat/pressure/util/randomSeedMgr", function (require, exports, module){
"use strict";
/**
 * 随机种子管理器
 * 种子随机算法---https://www.zhihu.com/question/22818104
 * @example
 */
// ===================================================== 导入

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
// ===================================================== 导出--类型

var RandomSeedMgr = function () {
    // 构造函数
    function RandomSeedMgr(seed) {
        _classCallCheck(this, RandomSeedMgr);

        this._seed = seed;
    }

    _createClass(RandomSeedMgr, [{
        key: "currentSeed",

        // 当前种子
        value: function currentSeed() {
            return this._seed;
        }
    }, {
        key: "updateSeed",
        value: function updateSeed() {
            var seed = (this._seed * 9301 + 49297) % RandomSeedMgr.maxSeed;
            this._seed = seed < 0 ? seed + RandomSeedMgr.maxSeed : seed;
        }
    }, {
        key: "seed",
        get: function get() {
            this.updateSeed();
            return this._seed;
        }
    }]);

    return RandomSeedMgr;
}();

RandomSeedMgr.maxSeed = 233280;
// 用指定的种子，生成指定范围的随机数（随机值可以取到N1和N2）max 必须 大于 等于 min 
RandomSeedMgr.randomSeed = function (seed, min, max) {
    if (min > max) return 0;
    return Math.round(min + (max - min) * seed / RandomSeedMgr.maxSeed);
};
//
RandomSeedMgr.randNumber = function (seed) {
    var max = 233280;
    var a = 9527;
    var c = 813521;
    return (a * seed + c) % max;
};
// 检查概率是否通过
RandomSeedMgr.checkProbability = function (probability, seed) {
    return probability >= 1 || probability >= seed / RandomSeedMgr.maxSeed;
};
exports.RandomSeedMgr = RandomSeedMgr;
// 线性求余算法
// var randNumber = (seed, max = 2147483647) => {
//     // 防止种子为0
//     var r = seed ^ 123459876;
//     // C语言的写法，可防止溢出
//     seed = 16807 * r - ((r / 127773) | 0) * max;
//     return seed < 0 ? seed + max : seed;
// };
// ===================================================== 导出--初始化
})