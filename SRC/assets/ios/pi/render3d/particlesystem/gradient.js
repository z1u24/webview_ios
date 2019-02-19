_$define("pi/render3d/particlesystem/gradient", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("../three");
var GradientMode;
(function (GradientMode) {
    GradientMode[GradientMode["Blend"] = 0] = "Blend";
    GradientMode[GradientMode["Fixed"] = 1] = "Fixed";
})(GradientMode = exports.GradientMode || (exports.GradientMode = {}));
var PSGradientMode;
(function (PSGradientMode) {
    PSGradientMode[PSGradientMode["Color"] = 0] = "Color";
    PSGradientMode[PSGradientMode["Gradient"] = 1] = "Gradient";
    PSGradientMode[PSGradientMode["TwoColors"] = 2] = "TwoColors";
    PSGradientMode[PSGradientMode["TwoGradients"] = 3] = "TwoGradients";
    PSGradientMode[PSGradientMode["RandomColor"] = 4] = "RandomColor";
})(PSGradientMode = exports.PSGradientMode || (exports.PSGradientMode = {}));
/**
 * r, g, b 在0，1之间
 */

var GradientColorKey = function GradientColorKey() {
    _classCallCheck(this, GradientColorKey);
};

var lerpNum = function lerpNum(n1, n2, k) {
    return k * n2 + (1 - k) * n1;
};
var lerpColor = function lerpColor(c, c1, c2, k) {
    c.r = k * c2.color.r + (1 - k) * c1.color.r;
    c.g = k * c2.color.g + (1 - k) * c1.color.g;
    c.b = k * c2.color.b + (1 - k) * c1.color.b;
};
var getAlpha = function getAlpha(time, keys) {
    var i = void 0;
    var result = void 0;
    for (i = 0; i < keys.length; ++i) {
        if (keys[i].time > time) {
            break;
        }
    }
    if (i === 0) {
        result = keys[0].alpha;
    } else if (i === keys.length) {
        result = keys[keys.length - 1].alpha;
    } else {
        // 数组至少有两个元素，而且i肯定有前一个元素
        var k = (time - keys[i - 1].time) / (keys[i].time - keys[i - 1].time);
        result = lerpNum(keys[i - 1].alpha, keys[i].alpha, k);
    }
    return result;
};
var getColor = function getColor(color, time, keys) {
    var i = void 0;
    for (i = 0; i < keys.length; ++i) {
        if (keys[i].time > time) {
            break;
        }
    }
    if (i === 0) {
        color.r = keys[0].color.r;
        color.g = keys[0].color.g;
        color.b = keys[0].color.b;
    } else if (i === keys.length) {
        color.r = keys[keys.length - 1].color.r;
        color.g = keys[keys.length - 1].color.g;
        color.b = keys[keys.length - 1].color.b;
    } else {
        // 数组至少有两个元素，而且i肯定有前一个元素
        var k = (time - keys[i - 1].time) / (keys[i].time - keys[i - 1].time);
        lerpColor(color, keys[i - 1], keys[i], k);
    }
};

var Gradient = function () {
    function Gradient(config) {
        _classCallCheck(this, Gradient);

        this.mode = config.mode;
        this.alphaKeys = [];
        for (var i = 0; i < config.alphaKeys.length; ++i) {
            this.alphaKeys.push(config.alphaKeys[i]);
        }
        this.colorKeys = [];
        for (var _i = 0; _i < config.colorKeys.length; ++_i) {
            this.colorKeys.push(config.colorKeys[_i]);
        }
    }

    _createClass(Gradient, [{
        key: "getValue",
        value: function getValue(c, time) {
            getColor(c, time, this.colorKeys);
            c.a = getAlpha(time, this.alphaKeys);
        }
    }]);

    return Gradient;
}();

var ColorImpl = function () {
    function ColorImpl(color) {
        _classCallCheck(this, ColorImpl);

        this.color = new three_1.THREE.Color(0);
        this.color.setRGBA(color.r, color.g, color.b, color.a);
    }

    _createClass(ColorImpl, [{
        key: "getValue",
        value: function getValue(c, time, randoms) {
            c.setRGBA(this.color.r, this.color.g, this.color.b, this.color.a);
        }
    }]);

    return ColorImpl;
}();
// tslint:disable:max-classes-per-file


var TwoColorImpl = function () {
    function TwoColorImpl(min, max) {
        _classCallCheck(this, TwoColorImpl);

        this.colorMin = new three_1.THREE.Color(0);
        this.colorMax = new three_1.THREE.Color(0);
        this.colorMin.setRGBA(min.r, min.g, min.b, min.a);
        this.colorMax.setRGBA(max.r, max.g, max.b, max.a);
    }

    _createClass(TwoColorImpl, [{
        key: "getValue",
        value: function getValue(c, time, randoms) {
            if (randoms === undefined) {
                randoms = [Math.random(), Math.random(), Math.random(), Math.random()];
            }
            c.setRGBA(this.colorMin.r + randoms[0] * (this.colorMax.r - this.colorMin.r), this.colorMin.g + randoms[1] * (this.colorMax.g - this.colorMin.g), this.colorMin.b + randoms[2] * (this.colorMax.b - this.colorMin.b), this.colorMin.a + randoms[3] * (this.colorMax.a - this.colorMin.a));
        }
    }]);

    return TwoColorImpl;
}();

var RandomColorImpl = function () {
    function RandomColorImpl() {
        _classCallCheck(this, RandomColorImpl);
    }

    _createClass(RandomColorImpl, [{
        key: "getValue",
        value: function getValue(c, time, randoms) {
            if (randoms === undefined) {
                randoms = [Math.random(), Math.random(), Math.random(), Math.random()];
            }
            c.a = randoms[0];
            c.r = randoms[1];
            c.g = randoms[2];
            c.b = randoms[3];
        }
    }]);

    return RandomColorImpl;
}();

var GradientImpl = function () {
    // tslint:disable-next-line:typedef
    function GradientImpl(config) {
        _classCallCheck(this, GradientImpl);

        this.gradient = new Gradient(config);
    }

    _createClass(GradientImpl, [{
        key: "getValue",
        value: function getValue(c, time, randoms) {
            this.gradient.getValue(c, time);
        }
    }]);

    return GradientImpl;
}();

var TwoGradientImpl = function () {
    // tslint:disable-next-line:typedef
    function TwoGradientImpl(min, max) {
        _classCallCheck(this, TwoGradientImpl);

        this.gradientMin = new Gradient(min);
        this.gradientMax = new Gradient(max);
    }

    _createClass(TwoGradientImpl, [{
        key: "getValue",
        value: function getValue(c, time, randoms) {
            var min = TwoGradientImpl.min;
            var max = TwoGradientImpl.max;
            this.gradientMin.getValue(min, time);
            this.gradientMax.getValue(max, time);
            if (randoms === undefined) {
                randoms = [Math.random(), Math.random(), Math.random(), Math.random()];
            }
            c.setRGBA(min.r + randoms[0] * (max.r - min.r), min.g + randoms[1] * (max.g - min.g), min.b + randoms[2] * (max.b - min.b), min.a + randoms[3] * (max.a - min.a));
        }
    }]);

    return TwoGradientImpl;
}();
// tslint:disable-next-line:typedef


TwoGradientImpl.min = new three_1.THREE.Color(0);
// tslint:disable-next-line:typedef
TwoGradientImpl.max = new three_1.THREE.Color(0);
exports.buildMinMaxGradient = function (config) {
    var result = void 0;
    switch (config.mode) {
        case PSGradientMode.Color:
            result = new ColorImpl(config.color);
            break;
        case PSGradientMode.TwoColors:
            result = new TwoColorImpl(config.colorMin, config.colorMax);
            break;
        case PSGradientMode.RandomColor:
            result = new RandomColorImpl();
            break;
        case PSGradientMode.Gradient:
            result = new GradientImpl(config.gradient);
            break;
        case PSGradientMode.TwoGradients:
            result = new TwoGradientImpl(config.gradientMin, config.gradientMax);
            break;
        default:
    }
    return result;
};
})