_$define("pi/render3d/particlesystem/rotation_lifetime", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var curve_1 = require("./curve");

var RotationOverLifetimeModule =
// tslint:disable-next-line:typedef
function RotationOverLifetimeModule(config) {
    _classCallCheck(this, RotationOverLifetimeModule);

    this.separateAxes = config.separateAxes;
    this.x = curve_1.buildMinMaxCurve(config.x);
    this.xMultiplier = config.xMultiplier;
    this.y = curve_1.buildMinMaxCurve(config.y);
    this.yMultiplier = config.yMultiplier;
    this.z = curve_1.buildMinMaxCurve(config.z);
    this.zMultiplier = config.zMultiplier;
};

exports.RotationOverLifetimeModule = RotationOverLifetimeModule;
})