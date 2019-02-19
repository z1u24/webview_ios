_$define("pi/math/sphere", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var vector3_1 = require("./vector3");
var aabb_1 = require("./aabb");
/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
// tslint:disable-next-line:variable-name
var _aabb = void 0;

var Sphere = function () {
    /**
     * @description 构造
     */
    function Sphere(center, radius) {
        _classCallCheck(this, Sphere);

        // tslint:disable:no-constant-condition
        this.center = center !== undefined ? center : new vector3_1.Vector3();
        this.radius = radius !== undefined ? radius : 0;
    }
    /**
     * @description 设置
     */
    // tslint:disable-next-line:no-reserved-keywords


    _createClass(Sphere, [{
        key: "set",
        value: function set(center, radius) {
            this.center.copy(center);
            this.radius = radius;
            return this;
        }
        /**
         * @description 从点中设置
         */

    }, {
        key: "setFromPoints",
        value: function setFromPoints(points, optionalCenter) {
            if (_aabb === undefined) _aabb = new aabb_1.AABB();
            var center = this.center;
            if (optionalCenter !== undefined) {
                center.copy(optionalCenter);
            } else {
                _aabb.setFromPoints(points).center(center);
            }
            var maxRadiusSq = 0;
            for (var i = 0, il = points.length; i < il; i++) {
                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSq(points[i]));
            }
            this.radius = Math.sqrt(maxRadiusSq);
            return this;
        }
        /**
         * @description 克隆
         */

    }, {
        key: "clone",
        value: function clone() {
            return new Sphere().copy(this);
        }
        /**
         * @description 拷贝
         */

    }, {
        key: "copy",
        value: function copy(sphere) {
            this.center.copy(sphere.center);
            this.radius = sphere.radius;
            return this;
        }
        /**
         * @description 是否为空
         */

    }, {
        key: "empty",
        value: function empty() {
            return this.radius <= 0;
        }
        /**
         * @description 是否包含点
         */

    }, {
        key: "containsPoint",
        value: function containsPoint(point) {
            return point.distanceToSq(this.center) <= this.radius * this.radius;
        }
        /**
         * @description 到点的距离
         */

    }, {
        key: "distanceToPoint",
        value: function distanceToPoint(point) {
            return point.distanceTo(this.center) - this.radius;
        }
        /**
         * @description 是否和球相交
         */

    }, {
        key: "intersectsSphere",
        value: function intersectsSphere(sphere) {
            var radiusSum = this.radius + sphere.radius;
            return sphere.center.distanceToSq(this.center) <= radiusSum * radiusSum;
        }
        /**
         * @description AABB相交
         */

    }, {
        key: "intersectsAABB",
        value: function intersectsAABB(aabb) {
            return aabb.intersectsSphere(this);
        }
        /**
         * @description 平面相交
         */

    }, {
        key: "intersectsPlane",
        value: function intersectsPlane(plane) {
            // We use the following equation to compute the signed distance from
            // the center of the sphere to the plane.
            //
            // distance = q * n - d
            //
            // If this distance is greater than the radius of the sphere,
            // then there is no intersection.
            return Math.abs(this.center.dot(plane.normal) - plane.constant) <= this.radius;
        }
        /**
         * @description 裁剪点
         */

    }, {
        key: "clampPoint",
        value: function clampPoint(point, optionalTarget) {
            var deltaLengthSq = this.center.distanceToSq(point);
            var result = optionalTarget || new vector3_1.Vector3();
            result.copy(point);
            if (deltaLengthSq > this.radius * this.radius) {
                result.sub(this.center).normalize();
                result.multiplyScalar(this.radius).add(this.center);
            }
            return result;
        }
        /**
         * @description 取AABB
         */

    }, {
        key: "getBoundingBox",
        value: function getBoundingBox(optionalTarget) {
            var box = optionalTarget || new aabb_1.AABB();
            box.set(this.center, this.center);
            box.expandByScalar(this.radius);
            return box;
        }
        /**
         * @description 矩阵应用
         */

    }, {
        key: "applyMatrix4",
        value: function applyMatrix4(matrix) {
            this.center.applyPoint(matrix);
            this.radius = this.radius * matrix.getMaxScaleOnAxis();
            return this;
        }
        /**
         * @description 平移
         */

    }, {
        key: "translate",
        value: function translate(offset) {
            this.center.add(offset);
            return this;
        }
        /**
         * @description 相等
         */

    }, {
        key: "equal",
        value: function equal(sphere) {
            return sphere.center.equals(this.center) && sphere.radius === this.radius;
        }
    }]);

    return Sphere;
}();

exports.Sphere = Sphere;
})