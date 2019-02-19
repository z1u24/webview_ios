_$define("pi/math/euler", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 旋转的优先顺序
 */
var math_1 = require("../util/math");
var matrix4_1 = require("./matrix4");
var quaternion_1 = require("./quaternion");
var vector3_1 = require("./vector3");
var RotationOrder;
(function (RotationOrder) {
    RotationOrder[RotationOrder["XYZ"] = 0] = "XYZ";
    RotationOrder[RotationOrder["YZX"] = 1] = "YZX";
    RotationOrder[RotationOrder["ZXY"] = 2] = "ZXY";
    RotationOrder[RotationOrder["XZY"] = 3] = "XZY";
    RotationOrder[RotationOrder["YXZ"] = 4] = "YXZ";
    RotationOrder[RotationOrder["ZYX"] = 5] = "ZYX";
})(RotationOrder = exports.RotationOrder || (exports.RotationOrder = {}));
/**
 * 默认顺序
 */
var DEFAULT_ORDER = RotationOrder.YXZ;
/**
 * @description 欧拉角
 */

var Euler = function () {
    /**
     * @description 构造函数
     */
    function Euler(x, y, z, order) {
        _classCallCheck(this, Euler);

        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.order = order || DEFAULT_ORDER;
    }
    /**
     * @description 设置
     */
    /* tslint:disable:no-reserved-keywords */


    _createClass(Euler, [{
        key: "set",
        value: function set(x, y, z, order) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.order = order || this.order;
            return this;
        }
        /**
         * @description 克隆
         */

    }, {
        key: "clone",
        value: function clone() {
            return new Euler(this.x, this.y, this.z, this.order);
        }
        /**
         * @description 拷贝
         */

    }, {
        key: "copy",
        value: function copy(euler) {
            this.x = euler.x;
            this.y = euler.y;
            this.z = euler.z;
            this.order = euler.order;
            return this;
        }
        /**
         * @description 从四元数构建
         */

    }, {
        key: "setFromQuaternion",
        value: function setFromQuaternion(q, order) {
            if (!Euler._m) {
                Euler._m = new matrix4_1.Matrix4();
            }
            Euler._m.makeRotationFromQuaternion(q);
            this.setFromRotationMatrix(Euler._m, order);
            return this;
        }
        /**
         * @description 从三维向量构建
         */

    }, {
        key: "setFromVector3",
        value: function setFromVector3(v, order) {
            return this.set(v.x, v.y, v.z, order || this.order);
        }
        /**
         * @description 重新设置order
         */

    }, {
        key: "reorder",
        value: function reorder(order) {
            // WARNING: this discards revolution information -bhouston
            if (!Euler._q) {
                Euler._q = new quaternion_1.Quaternion();
            }
            Euler._q.setFromEuler(this);
            this.setFromQuaternion(Euler._q, order);
        }
        /**
         * @description 判断相等
         */

    }, {
        key: "equal",
        value: function equal(euler) {
            return math_1.equal(euler.x, this.x) && math_1.equal(euler.y, this.y) && math_1.equal(euler.z, this.z) && math_1.equal(euler.order, this.order);
        }
        /**
         * @description 从数组构建
         * @param array 元素依次是：x, y, z, order; order可以没有
         */

    }, {
        key: "fromArray",
        value: function fromArray(array) {
            this.x = array[0];
            this.y = array[1];
            this.z = array[2];
            if (array[3] !== undefined) {
                this.order = array[3];
            }
            return this;
        }
        /**
         * @description 把euler的值写到array的第offset索引中
         */

    }, {
        key: "toArray",
        value: function toArray(array, offset) {
            if (array === undefined) array = [];
            if (offset === undefined) offset = 0;
            array[offset] = this.x;
            array[offset + 1] = this.y;
            array[offset + 2] = this.z;
            array[offset + 3] = this.order;
            return array;
        }
        /**
         * @description 把euler的值写到vector3中
         */

    }, {
        key: "toVector3",
        value: function toVector3(vec) {
            if (vec) {
                return vec.set(this.x, this.y, this.z);
            } else {
                return new vector3_1.Vector3(this.x, this.y, this.z);
            }
        }
        /**
         * @description 从旋转矩阵中构建
         * @param m 必须是旋转矩阵，无缩放分量
         */

    }, {
        key: "setFromRotationMatrix",
        value: function setFromRotationMatrix(m, order) {
            var te = m.elements;
            var m11 = te[0];
            var m12 = te[4];
            var m13 = te[8];
            var m21 = te[1];
            var m22 = te[5];
            var m23 = te[9];
            var m31 = te[2];
            var m32 = te[6];
            var m33 = te[10];
            order = order || this.order;
            if (order === RotationOrder.XYZ) {
                this.y = Math.asin(math_1.clamp(m13, -1, 1));
                if (Math.abs(m13) < 0.99999) {
                    this.x = Math.atan2(-m23, m33);
                    this.z = Math.atan2(-m12, m11);
                } else {
                    this.x = Math.atan2(m32, m22);
                    this.z = 0;
                }
            } else if (order === RotationOrder.YXZ) {
                this.x = Math.asin(-math_1.clamp(m23, -1, 1));
                if (Math.abs(m23) < 0.99999) {
                    this.y = Math.atan2(m13, m33);
                    this.z = Math.atan2(m21, m22);
                } else {
                    this.y = Math.atan2(-m31, m11);
                    this.z = 0;
                }
            } else if (order === RotationOrder.ZXY) {
                this.x = Math.asin(math_1.clamp(m32, -1, 1));
                if (Math.abs(m32) < 0.99999) {
                    this.y = Math.atan2(-m31, m33);
                    this.z = Math.atan2(-m12, m22);
                } else {
                    this.y = 0;
                    this.z = Math.atan2(m21, m11);
                }
            } else if (order === RotationOrder.ZYX) {
                this.y = Math.asin(-math_1.clamp(m31, -1, 1));
                if (Math.abs(m31) < 0.99999) {
                    this.x = Math.atan2(m32, m33);
                    this.z = Math.atan2(m21, m11);
                } else {
                    this.x = 0;
                    this.z = Math.atan2(-m12, m22);
                }
            } else if (order === RotationOrder.YZX) {
                this.z = Math.asin(math_1.clamp(m21, -1, 1));
                if (Math.abs(m21) < 0.99999) {
                    this.x = Math.atan2(-m23, m22);
                    this.y = Math.atan2(-m31, m11);
                } else {
                    this.x = 0;
                    this.y = Math.atan2(m13, m33);
                }
            } else if (order === RotationOrder.XZY) {
                this.z = Math.asin(-math_1.clamp(m12, -1, 1));
                if (Math.abs(m12) < 0.99999) {
                    this.x = Math.atan2(m32, m22);
                    this.y = Math.atan2(m13, m11);
                } else {
                    this.x = Math.atan2(-m23, m33);
                    this.y = 0;
                }
            } else {
                console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + order);
            }
            this.order = order;
            return this;
        }
    }]);

    return Euler;
}();

exports.Euler = Euler;
})