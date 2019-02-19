_$define("pi/render3d/particlesystem/force", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */

var ExternalForcesModule =
// tslint:disable-next-line:typedef
function ExternalForcesModule(config) {
    _classCallCheck(this, ExternalForcesModule);

    this.multiplier = config.multiplier;
};

exports.ExternalForcesModule = ExternalForcesModule;
})