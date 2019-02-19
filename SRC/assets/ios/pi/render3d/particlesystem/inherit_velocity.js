_$define("pi/render3d/particlesystem/inherit_velocity", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var curve_1 = require("./curve");
var PSInheritVelocityMode;
(function (PSInheritVelocityMode) {
    PSInheritVelocityMode[PSInheritVelocityMode["Initial"] = 0] = "Initial";
    PSInheritVelocityMode[PSInheritVelocityMode["Current"] = 1] = "Current";
})(PSInheritVelocityMode || (PSInheritVelocityMode = {}));

var InheritVelocityModule =
// tslint:disable-next-line:typedef
function InheritVelocityModule(config) {
    _classCallCheck(this, InheritVelocityModule);

    this.mode = config.mode;
    this.curve = curve_1.buildMinMaxCurve(config.curve);
    this.curveMultiplier = config.curveMultiplier;
};

exports.InheritVelocityModule = InheritVelocityModule;
})