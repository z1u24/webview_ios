_$define("pi/render3d/particlesystem/force_lifetime", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var curve_1 = require("./curve");

var ForceOverLifetimeModule =
// tslint:disable-next-line:typedef
function ForceOverLifetimeModule(config) {
    _classCallCheck(this, ForceOverLifetimeModule);

    this.randomized = config.randomized;
    this.space = config.space; // 只实现World
    this.x = curve_1.buildMinMaxCurve(config.x);
    this.xMultiplier = config.xMultiplier;
    this.y = curve_1.buildMinMaxCurve(config.y);
    this.yMultiplier = config.yMultiplier;
    this.z = curve_1.buildMinMaxCurve(config.z);
    this.zMultiplier = config.zMultiplier;
};

exports.ForceOverLifetimeModule = ForceOverLifetimeModule;
})