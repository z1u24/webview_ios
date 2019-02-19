_$define("pi/render3d/particlesystem/color_speed", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var three_1 = require("../three");
var gradient_1 = require("./gradient");

var ColorBySpeedModule =
// tslint:disable-next-line:typedef
function ColorBySpeedModule(config) {
    _classCallCheck(this, ColorBySpeedModule);

    this.range = new three_1.THREE.Vector2(config.range.x, config.range.y);
    this.color = gradient_1.buildMinMaxGradient(config.color);
};

exports.ColorBySpeedModule = ColorBySpeedModule;
})