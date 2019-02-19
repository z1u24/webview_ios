_$define("pi/render3d/particlesystem/color_lifetime", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var gradient_1 = require("./gradient");

var ColorOverLifetimeModule =
// tslint:disable-next-line:typedef
function ColorOverLifetimeModule(config) {
    _classCallCheck(this, ColorOverLifetimeModule);

    this.color = gradient_1.buildMinMaxGradient(config.color);
};

exports.ColorOverLifetimeModule = ColorOverLifetimeModule;
})