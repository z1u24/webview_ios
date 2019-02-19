_$define("pi/math/frustum", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var vector3_1 = require("./vector3");
var plane_1 = require("./plane");
/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
/* tslint:disable:variable-name no-constant-condition no-reserved-keywords*/
var _v1 = void 0;
var _v2 = void 0;

var Frustum = function () {
    /**
     * @description 构造
     */
    function Frustum(p1, p2, p3, p4, p5, p6) {
        _classCallCheck(this, Frustum);

        this.planes = [p1 !== undefined ? p1 : new plane_1.Plane(), p2 !== undefined ? p2 : new plane_1.Plane(), p3 !== undefined ? p3 : new plane_1.Plane(), p4 !== undefined ? p4 : new plane_1.Plane(), p5 !== undefined ? p5 : new plane_1.Plane(), p6 !== undefined ? p6 : new plane_1.Plane()];
    }
    /**
     * @description 设置
     */


    _createClass(Frustum, [{
        key: "set",
        value: function set(p1, p2, p3, p4, p5, p6) {
            var planes = this.planes;
            planes[0].copy(p1);
            planes[1].copy(p2);
            planes[2].copy(p3);
            planes[3].copy(p4);
            planes[4].copy(p5);
            planes[5].copy(p6);
            return this;
        }
        /**
         * @description 克隆
         */

    }, {
        key: "clone",
        value: function clone() {
            return new Frustum().copy(this);
        }
        /**
         * @description 拷贝
         */

    }, {
        key: "copy",
        value: function copy(frustum) {
            var planes = this.planes;
            for (var i = 0; i < 6; i++) {
                planes[i].copy(frustum.planes[i]);
            }
            return this;
        }
        /**
         * @description 从矩阵中设置
         */

    }, {
        key: "setFromMatrix",
        value: function setFromMatrix(m) {
            var planes = this.planes;
            var me = m.elements;
            var me0 = me[0];
            var me1 = me[1];
            var me2 = me[2];
            var me3 = me[3];
            var me4 = me[4];
            var me5 = me[5];
            var me6 = me[6];
            var me7 = me[7];
            var me8 = me[8];
            var me9 = me[9];
            var me10 = me[10];
            var me11 = me[11];
            var me12 = me[12];
            var me13 = me[13];
            var me14 = me[14];
            var me15 = me[15];
            planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
            planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
            planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
            planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
            planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
            planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();
            return this;
        }
        /**
         * @description 与球相交
         */

    }, {
        key: "intersectsSphere",
        value: function intersectsSphere(sphere) {
            var planes = this.planes;
            var center = sphere.center;
            var negRadius = -sphere.radius;
            for (var i = 0; i < 6; i++) {
                var distance = planes[i].distanceToPoint(center);
                if (distance < negRadius) {
                    return false;
                }
            }
            return true;
        }
        /**
         * @description 与AABB相交
         */

    }, {
        key: "intersectsAABB",
        value: function intersectsAABB(aabb) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            if (_v2 === undefined) _v2 = new vector3_1.Vector3();
            var planes = this.planes;
            for (var i = 0; i < 6; i++) {
                var plane = planes[i];
                _v1.x = plane.normal.x > 0 ? aabb.min.x : aabb.max.x;
                _v2.x = plane.normal.x > 0 ? aabb.max.x : aabb.min.x;
                _v1.y = plane.normal.y > 0 ? aabb.min.y : aabb.max.y;
                _v2.y = plane.normal.y > 0 ? aabb.max.y : aabb.min.y;
                _v1.z = plane.normal.z > 0 ? aabb.min.z : aabb.max.z;
                _v2.z = plane.normal.z > 0 ? aabb.max.z : aabb.min.z;
                var d1 = plane.distanceToPoint(_v1);
                var d2 = plane.distanceToPoint(_v2);
                // if both outside plane, no intersection
                if (d1 < 0 && d2 < 0) {
                    return false;
                }
            }
            return true;
        }
        /**
         * @description 是否包含点
         */

    }, {
        key: "containsPoint",
        value: function containsPoint(point) {
            var planes = this.planes;
            for (var i = 0; i < 6; i++) {
                if (planes[i].distanceToPoint(point) < 0) {
                    return false;
                }
            }
            return true;
        }
    }]);

    return Frustum;
}();

exports.Frustum = Frustum;
})