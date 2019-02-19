_$define("pi/render3d/particlesystem/size_lifetime", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var curve_1 = require("./curve");

var SizeOverLifetimeModule =
// tslint:disable-next-line:typedef
function SizeOverLifetimeModule(config) {
    _classCallCheck(this, SizeOverLifetimeModule);

    this.separateAxes = config.separateAxes;
    this.size = curve_1.buildMinMaxCurve(config.size);
    this.sizeMultiplier = config.sizeMultiplier;
    this.x = curve_1.buildMinMaxCurve(config.x);
    this.xMultiplier = config.xMultiplier;
    this.y = curve_1.buildMinMaxCurve(config.y);
    this.yMultiplier = config.yMultiplier;
    this.z = curve_1.buildMinMaxCurve(config.z);
    this.zMultiplier = config.zMultiplier;
};

exports.SizeOverLifetimeModule = SizeOverLifetimeModule;
})