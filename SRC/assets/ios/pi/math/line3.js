_$define("pi/math/line3", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 线段
 */
var math_1 = require("../util/math");
var vector3_1 = require("./vector3");
/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
/* tslint:disable:variable-name no-constant-condition no-reserved-keywords*/
var _v1 = void 0;
var _v2 = void 0;

var Line3 = function () {
    /**
     * @description 构造
     */
    function Line3(start, end) {
        _classCallCheck(this, Line3);

        this.start = start !== undefined ? start : new vector3_1.Vector3();
        this.end = end !== undefined ? end : new vector3_1.Vector3();
    }
    /**
     * @description 设置
     */


    _createClass(Line3, [{
        key: "set",
        value: function set(start, end) {
            this.start.copy(start);
            this.end.copy(end);
            return this;
        }
        /**
         * @description 克隆
         */

    }, {
        key: "clone",
        value: function clone() {
            return new Line3().copy(this);
        }
        /**
         * @description 拷贝
         */

    }, {
        key: "copy",
        value: function copy(line) {
            this.start.copy(line.start);
            this.end.copy(line.end);
            return this;
        }
        /**
         * @description 取中心点
         */

    }, {
        key: "center",
        value: function center(optionalTarget) {
            var result = optionalTarget || new vector3_1.Vector3();
            return result.addVectors(this.start, this.end).multiplyScalar(0.5);
        }
        /**
         * @description 多长
         */

    }, {
        key: "delta",
        value: function delta(optionalTarget) {
            var result = optionalTarget || new vector3_1.Vector3();
            return result.subVectors(this.end, this.start);
        }
        /**
         * @description 距离平方
         */

    }, {
        key: "distanceSq",
        value: function distanceSq() {
            return this.start.distanceToSq(this.end);
        }
        /**
         * @description 距离
         */

    }, {
        key: "distance",
        value: function distance() {
            return this.start.distanceTo(this.end);
        }
        /**
         * @description 伸缩
         */

    }, {
        key: "at",
        value: function at(t, optionalTarget) {
            var result = optionalTarget || new vector3_1.Vector3();
            return this.delta(result).multiplyScalar(t).add(this.start);
        }
        /**
         * @description 最近距离
         */

    }, {
        key: "closestPointToPointParameter",
        value: function closestPointToPointParameter(point, clampToLine) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            if (_v2 === undefined) _v2 = new vector3_1.Vector3();
            var startP = _v1;
            var startEnd = _v2;
            startP.subVectors(point, this.start);
            startEnd.subVectors(this.end, this.start);
            var startEnd2 = startEnd.dot(startEnd);
            var startEnd_startP = startEnd.dot(startP);
            var t = startEnd_startP / startEnd2;
            if (clampToLine) {
                t = math_1.clamp(t, 0, 1);
            }
            return t;
        }
        /**
         * @description 最近距离
         */

    }, {
        key: "closestPointToPoint",
        value: function closestPointToPoint(point, clampToLine, optionalTarget) {
            var t = this.closestPointToPointParameter(point, clampToLine);
            var result = optionalTarget || new vector3_1.Vector3();
            return this.delta(result).multiplyScalar(t).add(this.start);
        }
        /**
         * @description 矩阵应用
         */

    }, {
        key: "applyMatrix4",
        value: function applyMatrix4(matrix) {
            this.start.applyPoint(matrix);
            this.end.applyPoint(matrix);
            return this;
        }
        /**
         * @description 是否相等
         */

    }, {
        key: "equal",
        value: function equal(line) {
            return line.start.equals(this.start) && line.end.equals(this.end);
        }
    }]);

    return Line3;
}();

exports.Line3 = Line3;
})