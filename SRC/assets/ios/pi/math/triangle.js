_$define("pi/math/triangle", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 三角形
 */
var line3_1 = require("./line3");
var plane_1 = require("./plane");
var vector3_1 = require("./vector3");
/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
// tslint:disable:variable-name
var _v1 = void 0;
var _v2 = void 0;
var _v3 = void 0;
var _plane = void 0;
var _edgeList = void 0;

var Triangle = function () {
    /**
     * @description
     */
    function Triangle(a, b, c) {
        _classCallCheck(this, Triangle);

        // tslint:disable:no-constant-condition
        this.a = a !== undefined ? a : new vector3_1.Vector3();
        this.b = b !== undefined ? b : new vector3_1.Vector3();
        this.c = c !== undefined ? c : new vector3_1.Vector3();
    }
    /**
     * @description
     */


    _createClass(Triangle, [{
        key: "set",

        /**
         * @description
         */
        // tslint:disable-next-line:no-reserved-keywords
        value: function set(a, b, c) {
            this.a.copy(a);
            this.b.copy(b);
            this.c.copy(c);
            return this;
        }
        /**
         * @description
         */

    }, {
        key: "setFromPointsAndIndices",
        value: function setFromPointsAndIndices(points, i0, i1, i2) {
            this.a.copy(points[i0]);
            this.b.copy(points[i1]);
            this.c.copy(points[i2]);
            return this;
        }
        /**
         * @description
         */

    }, {
        key: "clone",
        value: function clone() {
            return new Triangle().copy(this);
        }
        /**
         * @description
         */

    }, {
        key: "copy",
        value: function copy(triangle) {
            this.a.copy(triangle.a);
            this.b.copy(triangle.b);
            this.c.copy(triangle.c);
            return this;
        }
        /**
         * @description
         */

    }, {
        key: "area",
        value: function area() {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            if (_v2 === undefined) _v2 = new vector3_1.Vector3();
            _v1.subVectors(this.c, this.b);
            _v2.subVectors(this.a, this.b);
            return _v1.cross(_v2).length() * 0.5;
        }
        /**
         * @description
         */

    }, {
        key: "midpoint",
        value: function midpoint(optionalTarget) {
            var result = optionalTarget || new vector3_1.Vector3();
            return result.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
        }
        /**
         * @description
         */

    }, {
        key: "normal",
        value: function normal(optionalTarget) {
            return Triangle.normal(this.a, this.b, this.c, optionalTarget);
        }
        /**
         * @description
         */

    }, {
        key: "plane",
        value: function plane(optionalTarget) {
            var result = optionalTarget || new plane_1.Plane();
            return result.setFromCoplanarPoints(this.a, this.b, this.c);
        }
        /**
         * @description
         */

    }, {
        key: "barycoordFromPoint",
        value: function barycoordFromPoint(point, optionalTarget) {
            return Triangle.barycoordFromPoint(point, this.a, this.b, this.c, optionalTarget);
        }
        /**
         * @description
         */

    }, {
        key: "containsPoint",
        value: function containsPoint(point) {
            return Triangle.containsPoint(point, this.a, this.b, this.c);
        }
        /**
         * @description
         */

    }, {
        key: "closestPointToPoint",
        value: function closestPointToPoint(point, optionalTarget) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            if (_v2 === undefined) _v2 = new vector3_1.Vector3();
            if (_plane === undefined) _plane = new plane_1.Plane();
            if (_edgeList === undefined) _edgeList = [new line3_1.Line3(), new line3_1.Line3(), new line3_1.Line3()];
            var projectedPoint = _v1;
            var closestPoint = _v2;
            var result = optionalTarget || new vector3_1.Vector3();
            var minDistance = Infinity;
            // project the point onto the plane of the triangle
            _plane.setFromCoplanarPoints(this.a, this.b, this.c);
            _plane.projectPoint(point, projectedPoint);
            // check if the projection lies within the triangle
            if (this.containsPoint(projectedPoint) === true) {
                // if so, this is the closest point
                result.copy(projectedPoint);
            } else {
                // if not, the point falls outside the triangle. the result is the closest point to the triangle's edges or vertices
                _edgeList[0].set(this.a, this.b);
                _edgeList[1].set(this.b, this.c);
                _edgeList[2].set(this.c, this.a);
                for (var i = 0; i < _edgeList.length; i++) {
                    _edgeList[i].closestPointToPoint(projectedPoint, true, closestPoint);
                    var distance = projectedPoint.distanceToSq(closestPoint);
                    if (distance < minDistance) {
                        minDistance = distance;
                        result.copy(closestPoint);
                    }
                }
            }
            return result;
        }
        /**
         * @description
         */

    }, {
        key: "equals",
        value: function equals(triangle) {
            return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);
        }
    }], [{
        key: "normal",
        value: function normal(a, b, c, optionalTarget) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            var result = optionalTarget || new vector3_1.Vector3();
            result.subVectors(c, b);
            _v1.subVectors(a, b);
            result.cross(_v1);
            var resultLengthSq = result.lengthSq();
            if (resultLengthSq > 0) {
                return result.multiplyScalar(1 / Math.sqrt(resultLengthSq));
            }
            return result.set(0, 0, 0);
        }
        /**
         * @description
         */
        // tslint:disable-next-line:typedef

    }, {
        key: "barycoordFromPoint",
        value: function barycoordFromPoint(point, a, b, c, optionalTarget) {
            // static/instance method to calculate barycentric coordinates
            // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            if (_v2 === undefined) _v2 = new vector3_1.Vector3();
            if (_v3 === undefined) _v3 = new vector3_1.Vector3();
            _v1.subVectors(c, a);
            _v2.subVectors(b, a);
            _v3.subVectors(point, a);
            var dot00 = _v1.dot(_v1);
            var dot01 = _v1.dot(_v2);
            var dot02 = _v1.dot(_v3);
            var dot11 = _v2.dot(_v2);
            var dot12 = _v2.dot(_v3);
            var denom = dot00 * dot11 - dot01 * dot01;
            var result = optionalTarget || new vector3_1.Vector3();
            // collinear or singular triangle
            if (denom === 0) {
                // arbitrary location outside of triangle?
                // not sure if this is the best idea, maybe should be returning undefined
                return result.set(-2, -1, -1);
            }
            var invDenom = 1 / denom;
            var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
            var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
            // barycentric coordinates must always sum to 1
            return result.set(1 - u - v, v, u);
        }
        /**
         * @description
         */

    }, {
        key: "containsPoint",
        value: function containsPoint(point, a, b, c) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            var result = Triangle.barycoordFromPoint(point, a, b, c, _v1);
            return result.x >= 0 && result.y >= 0 && result.x + result.y <= 1;
        }
    }]);

    return Triangle;
}();

exports.Triangle = Triangle;
})