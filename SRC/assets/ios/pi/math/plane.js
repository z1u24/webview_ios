_$define("pi/math/plane", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var matrix4_1 = require("./matrix4");
var vector3_1 = require("./vector3");
/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
/* tslint:disable:variable-name no-constant-condition no-reserved-keywords*/
var _v1 = void 0;
var _v2 = void 0;
var _m = void 0;

var Plane = function () {
    /**
     * @description 构造
     */
    function Plane(normal, constant) {
        _classCallCheck(this, Plane);

        this.normal = normal !== undefined ? normal : new vector3_1.Vector3(1, 0, 0);
        this.constant = constant !== undefined ? constant : 0;
    }
    /**
     * @description 设置
     */


    _createClass(Plane, [{
        key: "set",
        value: function set(normal, constant) {
            this.normal.copy(normal);
            this.constant = constant;
            return this;
        }
        /**
         * @description 分量设置
         */

    }, {
        key: "setComponents",
        value: function setComponents(x, y, z, w) {
            this.normal.set(x, y, z);
            this.constant = w;
            return this;
        }
        /**
         * @description 从法线和点设置
         */

    }, {
        key: "setFromNormalAndCoplanarPoint",
        value: function setFromNormalAndCoplanarPoint(normal, point) {
            this.normal.copy(normal);
            this.constant = -point.dot(this.normal); // must be this.normal, not normal, as this.normal is normalized
            return this;
        }
        /**
         * @description 从三个点设置
         */

    }, {
        key: "setFromCoplanarPoints",
        value: function setFromCoplanarPoints(a, b, c) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            if (_v2 === undefined) _v2 = new vector3_1.Vector3();
            var normal = _v1.subVectors(c, b).cross(_v2.subVectors(a, b)).normalize();
            // Q: should an error be thrown if normal is zero (e.g. degenerate plane)?
            this.setFromNormalAndCoplanarPoint(normal, a);
            return this;
        }
        /**
         * @description 克隆
         */

    }, {
        key: "clone",
        value: function clone() {
            return new Plane().copy(this);
        }
        /**
         * @description 拷贝
         */

    }, {
        key: "copy",
        value: function copy(plane) {
            this.normal.copy(plane.normal);
            this.constant = plane.constant;
            return this;
        }
        /**
         * @description 单位化
         */

    }, {
        key: "normalize",
        value: function normalize() {
            // Note: will lead to a divide by zero if the plane is invalid.
            /* tslint:disable:number-literal-format */
            var inverseNormalLength = 1.0 / this.normal.length();
            this.normal.multiplyScalar(inverseNormalLength);
            this.constant *= inverseNormalLength;
            return this;
        }
        /**
         * @description 取反
         */

    }, {
        key: "negate",
        value: function negate() {
            this.constant *= -1;
            this.normal.negate();
            return this;
        }
        /**
         * @description 点距离
         */

    }, {
        key: "distanceToPoint",
        value: function distanceToPoint(point) {
            return this.normal.dot(point) + this.constant;
        }
        /**
         * @description 球距离
         */

    }, {
        key: "distanceToSphere",
        value: function distanceToSphere(sphere) {
            return this.distanceToPoint(sphere.center) - sphere.radius;
        }
        /**
         * @description 点投影
         */

    }, {
        key: "projectPoint",
        value: function projectPoint(point, optionalTarget) {
            return this.orthoPoint(point, optionalTarget).sub(point).negate();
        }
        /**
         * @description 点正交
         */

    }, {
        key: "orthoPoint",
        value: function orthoPoint(point, optionalTarget) {
            var perpendicularMagnitude = this.distanceToPoint(point);
            var result = optionalTarget || new vector3_1.Vector3();
            return result.copy(this.normal).multiplyScalar(perpendicularMagnitude);
        }
        /**
         * @description 与线段相交的点
         */

    }, {
        key: "intersectLine",
        value: function intersectLine(line, optionalTarget) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            var result = optionalTarget || new vector3_1.Vector3();
            var direction = line.delta(_v1);
            var denominator = this.normal.dot(direction);
            if (denominator === 0) {
                // line is coplanar, return origin
                if (this.distanceToPoint(line.start) === 0) {
                    return result.copy(line.start);
                }
                // Unsure if this is the correct method to handle this case.
                return undefined;
            }
            var t = -(line.start.dot(this.normal) + this.constant) / denominator;
            if (t < 0 || t > 1) {
                return undefined;
            }
            return result.copy(direction).multiplyScalar(t).add(line.start);
        }
        /**
         * @description 是否与线段相交
         */

    }, {
        key: "intersectsLine",
        value: function intersectsLine(line) {
            // Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.
            var startSign = this.distanceToPoint(line.start);
            var endSign = this.distanceToPoint(line.end);
            return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0;
        }
        /**
         * @description 是否与aabb相交
         */

    }, {
        key: "intersectsAABB",
        value: function intersectsAABB(aabb) {
            return aabb.intersectsPlane(this);
        }
        /**
         * @description 是否与球相交
         */

    }, {
        key: "intersectsSphere",
        value: function intersectsSphere(sphere) {
            return sphere.intersectsPlane(this);
        }
        /**
         * @description 平面点
         */

    }, {
        key: "coplanarPoint",
        value: function coplanarPoint(optionalTarget) {
            var result = optionalTarget || new vector3_1.Vector3();
            return result.copy(this.normal).multiplyScalar(-this.constant);
        }
        /**
         * @description 应用矩阵
         */

    }, {
        key: "applyMatrix4",
        value: function applyMatrix4(matrix, optionalNormalMatrix) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            if (_m === undefined) _m = new matrix4_1.Matrix4();
            var referencePoint = this.coplanarPoint(_v1).applyPoint(matrix);
            // transform normal based on theory here:
            // http://www.songho.ca/opengl/gl_normaltransform.html
            var normalMatrix = optionalNormalMatrix || _m.getNormalMatrix(matrix);
            var normal = this.normal.applyVector(normalMatrix).normalize();
            // recalculate constant (like in setFromNormalAndCoplanarPoint)
            this.constant = -referencePoint.dot(normal);
            return this;
        }
        /**
         * @description 平移
         */

    }, {
        key: "translate",
        value: function translate(offset) {
            this.constant = this.constant - offset.dot(this.normal);
            return this;
        }
        /**
         * @description 是否相等
         */

    }, {
        key: "equal",
        value: function equal(plane) {
            return plane.normal.equals(this.normal) && plane.constant === this.constant;
        }
    }]);

    return Plane;
}();

exports.Plane = Plane;
})