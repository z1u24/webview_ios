_$define("pi/render3d/particlesystem/curve", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var PSCurveMode;
(function (PSCurveMode) {
    PSCurveMode[PSCurveMode["Constant"] = 0] = "Constant";
    PSCurveMode[PSCurveMode["Curve"] = 1] = "Curve";
    PSCurveMode[PSCurveMode["TwoCurves"] = 2] = "TwoCurves";
    PSCurveMode[PSCurveMode["TwoConstants"] = 3] = "TwoConstants";
})(PSCurveMode = exports.PSCurveMode || (exports.PSCurveMode = {}));

var Keyframe =
// tslint:disable-next-line:typedef
function Keyframe(config) {
    _classCallCheck(this, Keyframe);

    this.inTangent = config.inTangent;
    this.outTangent = config.outTangent;
    this.time = config.time;
    this.value = config.value;
};

var AnimationCurve = function () {
    // tslint:disable-next-line:typedef
    function AnimationCurve(config) {
        _classCallCheck(this, AnimationCurve);

        this.keys = [];
        for (var i = 0; i < config.keys.length; ++i) {
            this.keys[i] = new Keyframe(config.keys[i]);
        }
    }

    _createClass(AnimationCurve, [{
        key: "getValue",
        value: function getValue(time) {
            var i = 0;
            for (i = 0; i < this.keys.length; ++i) {
                var k = this.keys[i];
                if (k.time >= time) break;
            }
            if (i === 0) {
                return this.keys.length > 0 ? this.keys[0].value : 0.0;
            } else if (i === this.keys.length) {
                return this.keys.length > 0 ? this.keys[this.keys.length - 1].value : 0.0;
            }
            var _keys = this.keys[i - 1],
                t0 = _keys.time,
                v0 = _keys.value,
                m0 = _keys.outTangent;
            var _keys$i = this.keys[i],
                t1 = _keys$i.time,
                v1 = _keys$i.value,
                m1 = _keys$i.inTangent;
            // 有一个是inf或者-inf，都要按阶梯函数处理

            if (m0 === Infinity || m0 === -Infinity || m1 === Infinity || m1 === -Infinity) {
                return v0;
            }
            var dt = t1 - t0;
            var x = (time - t0) / dt;
            var x2 = x * x;
            var x3 = x * x2;
            var h1 = x3 * 2 - x2 * 3 + 1;
            var h2 = x3 - x2 * 2 + x;
            var h3 = x3 * -2 + x2 * 3;
            var h4 = x3 - x2;
            var result = h1 * v0 + dt * h2 * m0 + h3 * v1 + dt * h4 * m1;
            return result;
        }
    }]);

    return AnimationCurve;
}();

var ConstantImpl = function () {
    function ConstantImpl(constant) {
        _classCallCheck(this, ConstantImpl);

        this.constant = constant;
    }

    _createClass(ConstantImpl, [{
        key: "getValue",
        value: function getValue(time, random) {
            return this.constant;
        }
    }]);

    return ConstantImpl;
}();
// tslint:disable:max-classes-per-file


var TwoConstantsImpl = function () {
    function TwoConstantsImpl(min, max) {
        _classCallCheck(this, TwoConstantsImpl);

        this.min = min;
        this.max = max;
    }

    _createClass(TwoConstantsImpl, [{
        key: "getValue",
        value: function getValue(time, random) {
            if (random === undefined) {
                random = Math.random();
            }
            return this.min + random * (this.max - this.min);
        }
    }]);

    return TwoConstantsImpl;
}();

var CurveImpl = function () {
    // tslint:disable-next-line:typedef
    function CurveImpl(config) {
        _classCallCheck(this, CurveImpl);

        this.curve = new AnimationCurve(config);
    }

    _createClass(CurveImpl, [{
        key: "getValue",
        value: function getValue(time, random) {
            return this.curve.getValue(time);
        }
    }]);

    return CurveImpl;
}();

var TwoCurvesImpl = function () {
    // tslint:disable-next-line:typedef
    function TwoCurvesImpl(minConfig, maxConfig) {
        _classCallCheck(this, TwoCurvesImpl);

        this.curveMin = new AnimationCurve(minConfig);
        this.curveMax = new AnimationCurve(maxConfig);
    }

    _createClass(TwoCurvesImpl, [{
        key: "getValue",
        value: function getValue(time, random) {
            var min = this.curveMin.getValue(time);
            var max = this.curveMax.getValue(time);
            if (random === undefined) {
                random = Math.random();
            }
            return min + random * (max - min);
        }
    }]);

    return TwoCurvesImpl;
}();
/**
 * 构建曲线取值
 */


exports.buildMinMaxCurve = function (config) {
    var result = void 0;
    switch (config.mode) {
        case PSCurveMode.Constant:
            result = new ConstantImpl(config.constant);
            break;
        case PSCurveMode.TwoConstants:
            result = new TwoConstantsImpl(config.constantMin, config.constantMax);
            break;
        case PSCurveMode.Curve:
            result = new CurveImpl(config.curve);
            break;
        // tslint:disable-next-line:no-duplicate-switch-case
        case PSCurveMode.Curve:
            result = new TwoCurvesImpl(config.curveMin, config.curveMax);
            break;
        default:
    }
    return result;
};
})