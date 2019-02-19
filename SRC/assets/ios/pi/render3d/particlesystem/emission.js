_$define("pi/render3d/particlesystem/emission", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var curve_1 = require("./curve");

var Burst =
// tslint:disable-next-line:typedef
function Burst(config) {
    _classCallCheck(this, Burst);

    this.time = config.time;
    this.minCount = config.minCount;
    this.maxCount = config.maxCount;
};

var EmissionModule = function () {
    // tslint:disable-next-line:typedef
    function EmissionModule(config) {
        _classCallCheck(this, EmissionModule);

        this.lastTime = 0;
        this.rateOverDistance = curve_1.buildMinMaxCurve(config.rateOverDistance);
        this.rateOverDistanceMultiplier = config.rateOverDistanceMultiplier;
        this.rateOverTime = curve_1.buildMinMaxCurve(config.rateOverTime);
        this.rateOverTimeMultiplier = config.rateOverTimeMultiplier;
        this.bursts = [];
        for (var i = 0; i < config.bursts.length; ++i) {
            this.bursts.push(new Burst(config.bursts[i]));
        }
    }
    // 返回这次新创建的粒子的数量


    _createClass(EmissionModule, [{
        key: "update",
        value: function update(time, playTime, maxCount) {
            var count = 0;
            for (var i = 0; i < this.bursts.length; ++i) {
                if (Math.abs(this.bursts[i].time - playTime) < 0.01) {
                    count = this.bursts[i].minCount + Math.random() * (this.bursts[i].maxCount - this.bursts[i].minCount);
                    count = Math.floor(count);
                    break;
                }
            }
            if (this.lastTime === 0) {
                this.lastTime = time;
            }
            if (count === 0) {
                var v = this.rateOverTime.getValue(playTime);
                var delta = time - this.lastTime;
                count = Math.floor(v * delta);
                if (count >= 1) {
                    this.lastTime = time;
                }
            }
            return count < maxCount ? count : maxCount;
        }
    }]);

    return EmissionModule;
}();

exports.EmissionModule = EmissionModule;
})