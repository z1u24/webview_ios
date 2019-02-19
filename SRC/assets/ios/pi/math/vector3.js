_$define("pi/math/vector3", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var quaternion_1 = require("./quaternion");
/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
// tslint:disable:variable-name
var _v = void 0;
/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
var _q = void 0;

var Vector3 = function () {
    /**
     * @description 构造函数
     * @note 这里为了性能考虑，不用默认参数
     */
    function Vector3(x, y, z) {
        _classCallCheck(this, Vector3);

        this.x = x || 0.0;
        this.y = y || 0.0;
        this.z = z || 0.0;
    }
    /**
     * @description 设置函数
     */
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(Vector3, [{
        key: "set",
        value: function set(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        }
        /**
         * @description 设置标量
         */

    }, {
        key: "setScalar",
        value: function setScalar(scalar) {
            this.x = this.y = this.z = scalar;
            return this;
        }
        /**
         * @description 取x
         */

    }, {
        key: "getX",
        value: function getX() {
            return this.x;
        }
        /**
         * @description 取y
         */

    }, {
        key: "getY",
        value: function getY() {
            return this.y;
        }
        /**
         * @description 取z
         */

    }, {
        key: "getZ",
        value: function getZ() {
            return this.z;
        }
        /**
         * 判断v和this是否相等
         */

    }, {
        key: "equals",
        value: function equals(v) {
            return Math.abs(v.x - this.x) < 0.0001 && Math.abs(v.y - this.y) < 0.0001 && Math.abs(v.z - this.z) < 0.0001;
        }
        /**
         * 从数组array的offset中取值
         */

    }, {
        key: "fromArray",
        value: function fromArray(array, offset) {
            offset = offset || 0;
            this.x = array[offset];
            this.y = array[offset + 1];
            this.z = array[offset + 2];
            return this;
        }
        /**
         * 赋值到array去
         */

    }, {
        key: "toArray",
        value: function toArray(array, offset) {
            if (array === undefined) array = [];
            if (offset === undefined) offset = 0;
            array[offset] = this.x;
            array[offset + 1] = this.y;
            array[offset + 2] = this.z;
            return array;
        }
        /**
         * @description 拷贝
         */

    }, {
        key: "copy",
        value: function copy(src) {
            this.x = src.x;
            this.y = src.y;
            this.z = src.z;
            return this;
        }
        /**
         * @description 克隆
         */

    }, {
        key: "clone",
        value: function clone() {
            return new Vector3(this.x, this.y, this.z);
        }
        /**
         * @description this += src
         */

    }, {
        key: "add",
        value: function add(src) {
            this.x += src.x;
            this.y += src.y;
            this.z += src.z;
            return this;
        }
        /**
         * @description this += new Vector3(scalar, scalar, scalar)
         */

    }, {
        key: "addScalar",
        value: function addScalar(scalar) {
            this.x += scalar;
            this.y += scalar;
            this.z += scalar;
            return this;
        }
        /**
         * @description this = src1 + src2;
         */

    }, {
        key: "addVectors",
        value: function addVectors(src1, src2) {
            this.x = src1.x + src2.x;
            this.y = src1.y + src2.y;
            this.z = src1.z + src2.z;
            return this;
        }
        /**
         * @description this += scalar * src;
         */

    }, {
        key: "addScaledVector",
        value: function addScaledVector(src, scalar) {
            this.x += scalar * src.x;
            this.y += scalar * src.y;
            this.z += scalar * src.z;
            return this;
        }
        /**
         * @description this -= src;
         */

    }, {
        key: "sub",
        value: function sub(src) {
            this.x -= src.x;
            this.y -= src.y;
            this.z -= src.z;
            return this;
        }
        /**
         * @description this -= new Vector3(scalar, scalar, scalar)
         */

    }, {
        key: "subScalar",
        value: function subScalar(scalar) {
            this.x -= scalar;
            this.y -= scalar;
            this.z -= scalar;
            return this;
        }
        /**
         * @description this = src1 - src2;
         */

    }, {
        key: "subVectors",
        value: function subVectors(src1, src2) {
            this.x = src1.x - src2.x;
            this.y = src1.y - src2.y;
            this.z = src1.z - src2.z;
            return this;
        }
        /**
         * @description this *= src;
         */

    }, {
        key: "multiply",
        value: function multiply(src) {
            this.x *= src.x;
            this.y *= src.y;
            this.z *= src.z;
            return this;
        }
        /**
         * @description this *= new Vector3(scaler, scaler, scaler);
         */

    }, {
        key: "multiplyScalar",
        value: function multiplyScalar(scalar) {
            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
            return this;
        }
        /**
         * @description this = src1 * src2;
         */

    }, {
        key: "multiplyVectors",
        value: function multiplyVectors(src1, src2) {
            this.x = src1.x * src2.x;
            this.y = src1.y * src2.y;
            this.z = src1.z * src2.z;
            return this;
        }
        /**
         * @description this /= src;
         */

    }, {
        key: "divide",
        value: function divide(src) {
            this.x /= src.x;
            this.y /= src.y;
            this.z /= src.z;
            return this;
        }
        /**
         * @description this /= new Vector3(scalar, scalar, scalar)
         */

    }, {
        key: "divideScalar",
        value: function divideScalar(scalar) {
            this.x /= scalar;
            this.y /= scalar;
            this.z /= scalar;
            return this;
        }
        /**
         * @description this = this, src对应分量的最小值
         */

    }, {
        key: "min",
        value: function min(src) {
            this.x = this.x < src.x ? this.x : src.x;
            this.y = this.y < src.y ? this.y : src.y;
            this.z = this.z < src.z ? this.z : src.z;
            return this;
        }
        /**
         * @description this = this, src对应分量的最大值
         */

    }, {
        key: "max",
        value: function max(src) {
            this.x = this.x > src.x ? this.x : src.x;
            this.y = this.y > src.y ? this.y : src.y;
            this.z = this.z > src.z ? this.z : src.z;
            return this;
        }
        /**
         * @description this 的对应分量截取在min到max之间
         * @note 假设 min < max
         */

    }, {
        key: "clamp",
        value: function clamp(min, max) {
            this.x = Math.max(min.x, Math.min(max.x, this.x));
            this.y = Math.max(min.y, Math.min(max.y, this.y));
            this.z = Math.max(min.z, Math.min(max.z, this.z));
            return this;
        }
        /**
         * @description this 的对应分量截取在min到max之间
         * @note 假设 min < max
         */

    }, {
        key: "clampScalar",
        value: function clampScalar(min, max) {
            this.x = Math.max(min, Math.min(max, this.x));
            this.y = Math.max(min, Math.min(max, this.y));
            this.z = Math.max(min, Math.min(max, this.z));
            return this;
        }
        /**
         * @description 取相反数
         */

    }, {
        key: "negate",
        value: function negate() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            return this;
        }
        /**
         * @description 点积
         */

    }, {
        key: "dot",
        value: function dot(src) {
            return this.x * src.x + this.y * src.y + this.z * src.z;
        }
        /**
         * @description 长度的平方
         */

    }, {
        key: "lengthSq",
        value: function lengthSq() {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }
        /**
         * @description 长度
         */

    }, {
        key: "length",
        value: function length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        /**
         * @description 曼哈顿长度
         */

    }, {
        key: "lengthManhattan",
        value: function lengthManhattan() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
        }
        /**
         * @description 单位化
         */

    }, {
        key: "normalize",
        value: function normalize() {
            return this.divideScalar(this.length());
        }
        /**
         * @description 将向量的长度改为length
         */

    }, {
        key: "setLength",
        value: function setLength(length) {
            return this.multiplyScalar(length / this.length());
        }
        /**
         * @description 线性插值 this = v * alpha + this * (1 - alpha)
         */

    }, {
        key: "lerp",
        value: function lerp(v, alpha) {
            this.x += (v.x - this.x) * alpha;
            this.y += (v.y - this.y) * alpha;
            this.z += (v.z - this.z) * alpha;
            return this;
        }
        /**
         * @description 线性插值 this = v2 * alpha + v1 * (1 - alpha)
         */

    }, {
        key: "lerpVectors",
        value: function lerpVectors(v1, v2, alpha) {
            this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
            return this;
        }
        /**
         * @description 叉乘 this = this * v
         */

    }, {
        key: "cross",
        value: function cross(v) {
            var x = this.x;
            var y = this.y;
            var z = this.z;
            this.x = y * v.z - z * v.y;
            this.y = z * v.x - x * v.z;
            this.z = x * v.y - y * v.x;
            return this;
        }
        /**
         * @description 叉乘 this = a * b
         */

    }, {
        key: "crossVectors",
        value: function crossVectors(a, b) {
            // 注：全部取出来放到临时变量是因为有可能this和a或者b是同一个对象
            var ax = a.x;
            var ay = a.y;
            var az = a.z;
            var bx = b.x;
            var by = b.y;
            var bz = b.z;
            this.x = ay * bz - az * by;
            this.y = az * bx - ax * bz;
            this.z = ax * by - ay * bx;
            return this;
        }
        /**
         * @description 计算this在v的投影向量
         */

    }, {
        key: "projectOnVector",
        value: function projectOnVector(v) {
            if (_v === undefined) {
                _v = new Vector3();
            }
            _v.copy(v).normalize();
            var dot = this.dot(_v);
            return this.copy(_v).multiplyScalar(dot);
        }
        /**
         * @description 计算this在平面的投影向量
         */

    }, {
        key: "projectOnPlane",
        value: function projectOnPlane(planeNormal) {
            if (_v === undefined) {
                _v = new Vector3();
            }
            _v.copy(this).projectOnVector(planeNormal);
            return this.sub(_v);
        }
        /**
         * @description 计算this在normal的反射向量
         */

    }, {
        key: "reflect",
        value: function reflect(normal) {
            if (_v === undefined) {
                _v = new Vector3();
            }
            return this.sub(_v.copy(normal).multiplyScalar(this.dot(normal) * 2));
        }
        /**
         * @description 计算this和v之间的夹角
         */

    }, {
        key: "angleTo",
        value: function angleTo(v) {
            var theta = this.dot(v) / Math.sqrt(this.lengthSq() * v.lengthSq());
            // acos的定义域在 [-1, 1]
            theta = theta < -1 ? -1 : theta;
            theta = theta > 1 ? 1 : theta;
            return Math.acos(theta);
        }
        /**
         * @description 计算this到v的距离的平方
         */

    }, {
        key: "distanceToSq",
        value: function distanceToSq(v) {
            var dx = this.x - v.x;
            var dy = this.y - v.y;
            var dz = this.z - v.z;
            return dx * dx + dy * dy + dz * dz;
        }
        /**
         * @description 计算this到v的距离
         */

    }, {
        key: "distanceTo",
        value: function distanceTo(v) {
            return Math.sqrt(this.distanceToSq(v));
        }
        /**
         * @description 应用欧拉角 旋转到本向量
         */

    }, {
        key: "applyEuler",
        value: function applyEuler(euler) {
            if (_q === undefined) {
                _q = new quaternion_1.Quaternion();
            }
            this.applyQuaternion(_q.setFromEuler(euler));
            return this;
        }
        /**
         * @description 应用轴-角度 旋转到本向量
         * @param angleRed 单位弧度
         */

    }, {
        key: "applyAxisAngle",
        value: function applyAxisAngle(axis, angleRad) {
            if (_q === undefined) {
                _q = new quaternion_1.Quaternion();
            }
            this.applyQuaternion(_q.setFromAxisAngle(axis, angleRad));
            return this;
        }
        /**
         * @description 应用矩阵到向量
         */

    }, {
        key: "applyVector",
        value: function applyVector(m) {
            var x = this.x;
            var y = this.y;
            var z = this.z;
            var e = m.elements;
            this.x = e[0] * x + e[4] * y + e[8] * z;
            this.y = e[1] * x + e[5] * y + e[9] * z;
            this.z = e[2] * x + e[6] * y + e[10] * z;
            return this;
        }
        /**
         * @description 应用矩阵到点
         * @param m 仿射矩阵
         */

    }, {
        key: "applyPoint",
        value: function applyPoint(m) {
            var x = this.x;
            var y = this.y;
            var z = this.z;
            var e = m.elements;
            this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
            this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
            this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
            return this;
        }
        /**
         * @description 应用矩阵到点
         * @param m 投影矩阵
         */

    }, {
        key: "applyProjection",
        value: function applyProjection(m) {
            var x = this.x;
            var y = this.y;
            var z = this.z;
            var e = m.elements;
            var d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]); // perspective divide
            this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * d;
            this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * d;
            this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * d;
            return this;
        }
        /**
         * @description 应用四元数 旋转到本向量
         */

    }, {
        key: "applyQuaternion",
        value: function applyQuaternion(q) {
            var x = this.x;
            var y = this.y;
            var z = this.z;
            var qx = q.x;
            var qy = q.y;
            var qz = q.z;
            var qw = q.w;
            // calculate quat * vector
            var ix = qw * x + qy * z - qz * y;
            var iy = qw * y + qz * x - qx * z;
            var iz = qw * z + qx * y - qy * x;
            var iw = -qx * x - qy * y - qz * z;
            // calculate result * inverse quat
            this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return this;
        }
        /**
         * @description 球面坐标转直角坐标
         */

    }, {
        key: "setFromSpherical",
        value: function setFromSpherical(s) {
            var sinPhiRadius = Math.sin(s.phi) * s.radius;
            this.x = sinPhiRadius * Math.sin(s.theta);
            this.y = Math.cos(s.phi) * s.radius;
            this.z = sinPhiRadius * Math.cos(s.theta);
            return this;
        }
        /**
         * @description 从矩阵中取出位置分量
         */

    }, {
        key: "setFromMatrixPosition",
        value: function setFromMatrixPosition(m) {
            return this.setFromMatrixColumn(m, 3);
        }
        /**
         * @description 从矩阵中取出缩放分量
         */

    }, {
        key: "setFromMatrixScale",
        value: function setFromMatrixScale(m) {
            var sx = this.setFromMatrixColumn(m, 0).length();
            var sy = this.setFromMatrixColumn(m, 1).length();
            var sz = this.setFromMatrixColumn(m, 2).length();
            this.x = sx;
            this.y = sy;
            this.z = sz;
            return this;
        }
        /**
         * @description 取矩阵的第index列
         */

    }, {
        key: "setFromMatrixColumn",
        value: function setFromMatrixColumn(m, index) {
            return this.fromArray(m.elements, index * 4);
        }
    }]);

    return Vector3;
}();

exports.Vector3 = Vector3;
})