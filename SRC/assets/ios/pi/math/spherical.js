_$define("pi/math/spherical", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 球面坐标
 */
var math_1 = require("../util/math");

var Spherical = function () {
    /**
     * @description 构造函数
     */
    function Spherical(radius, phi, theta) {
        _classCallCheck(this, Spherical);

        this.radius = radius !== undefined ? radius : 1.0;
        this.phi = phi !== undefined ? phi : 0.0;
        this.theta = theta !== undefined ? theta : 0.0;
    }
    /**
     * @description 设置
     */
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(Spherical, [{
        key: "set",
        value: function set(radius, phi, theta) {
            this.radius = radius;
            this.phi = phi;
            this.theta = theta;
        }
        /**
         * @description 克隆
         */

    }, {
        key: "clone",
        value: function clone() {
            return new Spherical().copy(this);
        }
        /**
         * @description 拷贝
         */

    }, {
        key: "copy",
        value: function copy(src) {
            this.radius = src.radius;
            this.phi = src.phi;
            this.theta = src.theta;
            return this;
        }
        /**
         * @description 限制phi在 [EPS, Pi - EPS]
         */

    }, {
        key: "makeSafe",
        value: function makeSafe() {
            var EPS = 0.0001;
            this.phi = Math.max(EPS, Math.min(Math.PI - EPS, this.phi));
        }
        /**
         * @description 直角坐标转球面坐标
         */

    }, {
        key: "setFromVector3",
        value: function setFromVector3(v) {
            this.radius = v.length();
            if (this.radius === 0) {
                this.theta = 0;
                this.phi = 0;
            } else {
                this.theta = Math.atan2(v.x, v.z);
                this.phi = Math.acos(math_1.clamp(v.y / this.radius, -1, 1));
            }
            return this;
        }
    }]);

    return Spherical;
}();

exports.Spherical = Spherical;
})