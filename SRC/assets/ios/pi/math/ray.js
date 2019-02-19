_$define("pi/math/ray", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var vector3_1 = require("./vector3");
/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
/* tslint:disable:variable-name no-constant-condition no-reserved-keywords*/
var _v1 = void 0;
var _v2 = void 0;
var _v3 = void 0;
var _v4 = void 0;

var Ray = function () {
    /**
     * @description 构造
     */
    function Ray(origin, direction) {
        _classCallCheck(this, Ray);

        this.origin = origin !== undefined ? origin : new vector3_1.Vector3();
        this.direction = direction !== undefined ? direction : new vector3_1.Vector3();
    }
    /**
     * @description 设置
     */


    _createClass(Ray, [{
        key: "set",
        value: function set(origin, direction) {
            this.origin.copy(origin);
            this.direction.copy(direction);
            return this;
        }
        /**
         * @description 克隆
         */

    }, {
        key: "clone",
        value: function clone() {
            return new Ray().copy(this);
        }
        /**
         * @description 拷贝
         */

    }, {
        key: "copy",
        value: function copy(ray) {
            this.origin.copy(ray.origin);
            this.direction.copy(ray.direction);
            return this;
        }
        /**
         * @description 在t的位置
         */

    }, {
        key: "at",
        value: function at(t, optionalTarget) {
            var result = optionalTarget || new vector3_1.Vector3();
            return result.copy(this.direction).multiplyScalar(t).add(this.origin);
        }
        /**
         * @description 朝向
         */

    }, {
        key: "lookAt",
        value: function lookAt(v) {
            this.direction.copy(v).sub(this.origin).normalize();
        }
        /**
         * @description
         */

    }, {
        key: "recast",
        value: function recast(t) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            this.origin.copy(this.at(t, _v1));
            return this;
        }
        /**
         * @description
         */

    }, {
        key: "closestPointToPoint",
        value: function closestPointToPoint(point, optionalTarget) {
            var result = optionalTarget || new vector3_1.Vector3();
            result.subVectors(point, this.origin);
            var directionDistance = result.dot(this.direction);
            if (directionDistance < 0) {
                return result.copy(this.origin);
            }
            return result.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
        }
        /**
         * @description
         */

    }, {
        key: "distanceToPoint",
        value: function distanceToPoint(point) {
            return Math.sqrt(this.distanceSqToPoint(point));
        }
        /**
         * @description
         */

    }, {
        key: "distanceSqToPoint",
        value: function distanceSqToPoint(point) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            var directionDistance = _v1.subVectors(point, this.origin).dot(this.direction);
            // point behind the ray
            if (directionDistance < 0) {
                return this.origin.distanceToSq(point);
            }
            _v1.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
            return _v1.distanceToSq(point);
        }
        /**
         * 啊啊啊
         *
         * @extends
         */

    }, {
        key: "distanceSqToSegment",
        value: function distanceSqToSegment(v0, v1, optionalPointOnRay, optionalPointOnSegment) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            if (_v2 === undefined) _v2 = new vector3_1.Vector3();
            if (_v3 === undefined) _v3 = new vector3_1.Vector3();
            var segCenter = _v1;
            var segDir = _v2;
            var diff = _v3;
            //   from http://www.geometrictools.com/LibMathematics/Distance/Wm5DistRay3Segment3.cpp
            // 	 It returns the min distance between the ray and the segment
            // 	 defined by v0 and v1
            //  	 It can also set two optional targets :
            // 	 - The closest point on the ray
            // 	 - The closest point on the segment
            segCenter.copy(v0).add(v1).multiplyScalar(0.5);
            segDir.copy(v1).sub(v0).normalize();
            diff.copy(this.origin).sub(segCenter);
            var segExtent = v0.distanceTo(v1) * 0.5;
            var a01 = -this.direction.dot(segDir);
            var b0 = diff.dot(this.direction);
            var b1 = -diff.dot(segDir);
            var c = diff.lengthSq();
            var det = Math.abs(1 - a01 * a01);
            var s0 = void 0;
            var s1 = void 0;
            var sqrDist = void 0;
            var extDet = void 0;
            if (det > 0) {
                // The ray and segment are not parallel.
                s0 = a01 * b1 - b0;
                s1 = a01 * b0 - b1;
                extDet = segExtent * det;
                if (s0 >= 0) {
                    if (s1 >= -extDet) {
                        if (s1 <= extDet) {
                            // region 0
                            // Minimum at interior points of ray and segment.
                            var invDet = 1 / det;
                            s0 *= invDet;
                            s1 *= invDet;
                            sqrDist = s0 * (s0 + a01 * s1 + b0 * 2) + s1 * (a01 * s0 + s1 + b1 * 2) + c;
                        } else {
                            // region 1
                            s1 = segExtent;
                            s0 = Math.max(0, -(a01 * s1 + b0));
                            sqrDist = -s0 * s0 + s1 * (s1 + b1 * 2) + c;
                        }
                    } else {
                        // region 5
                        s1 = -segExtent;
                        s0 = Math.max(0, -(a01 * s1 + b0));
                        sqrDist = -s0 * s0 + s1 * (s1 + b1 * 2) + c;
                    }
                } else {
                    if (s1 <= -extDet) {
                        // region 4
                        s0 = Math.max(0, -(-a01 * segExtent + b0));
                        s1 = s0 > 0 ? -segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                        sqrDist = -s0 * s0 + s1 * (s1 + b1 * 2) + c;
                    } else if (s1 <= extDet) {
                        // region 3
                        s0 = 0;
                        s1 = Math.min(Math.max(-segExtent, -b1), segExtent);
                        sqrDist = s1 * (s1 + b1 * 2) + c;
                    } else {
                        // region 2
                        s0 = Math.max(0, -(a01 * segExtent + b0));
                        s1 = s0 > 0 ? segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                        sqrDist = -s0 * s0 + s1 * (s1 + b1 * 2) + c;
                    }
                }
            } else {
                // Ray and segment are parallel.
                s1 = a01 > 0 ? -segExtent : segExtent;
                s0 = Math.max(0, -(a01 * s1 + b0));
                sqrDist = -s0 * s0 + s1 * (s1 + b1 * 2) + c;
            }
            if (optionalPointOnRay) {
                optionalPointOnRay.copy(this.direction).multiplyScalar(s0).add(this.origin);
            }
            if (optionalPointOnSegment) {
                optionalPointOnSegment.copy(segDir).multiplyScalar(s1).add(segCenter);
            }
            return sqrDist;
        }
        /**
         * @description
         */

    }, {
        key: "intersectSphere",
        value: function intersectSphere(sphere, optionalTarget) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            _v1.subVectors(sphere.center, this.origin);
            var tca = _v1.dot(this.direction);
            var d2 = _v1.dot(_v1) - tca * tca;
            var radius2 = sphere.radius * sphere.radius;
            if (d2 > radius2) return null;
            var thc = Math.sqrt(radius2 - d2);
            // t0 = first intersect point - entrance on front of sphere
            var t0 = tca - thc;
            // t1 = second intersect point - exit point on back of sphere
            var t1 = tca + thc;
            // test to see if both t0 and t1 are behind the ray - if so, return null
            if (t0 < 0 && t1 < 0) return null;
            // test to see if t0 is behind the ray:
            // if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
            // in order to always return an intersect point that is in front of the ray.
            if (t0 < 0) return this.at(t1, optionalTarget);
            // else t0 is in front of the ray, so return the first collision point scaled by t0
            return this.at(t0, optionalTarget);
        }
        /**
         * @description
         */

    }, {
        key: "intersectsSphere",
        value: function intersectsSphere(sphere) {
            return this.distanceToPoint(sphere.center) <= sphere.radius;
        }
        /**
         * @description
         */

    }, {
        key: "distanceToPlane",
        value: function distanceToPlane(plane) {
            var denominator = plane.normal.dot(this.direction);
            if (denominator === 0) {
                // line is coplanar, return origin
                if (plane.distanceToPoint(this.origin) === 0) {
                    return 0;
                }
                // Null is preferable to undefined since undefined means.... it is undefined
                return null;
            }
            var t = -(this.origin.dot(plane.normal) + plane.constant) / denominator;
            // Return if the ray never intersects the plane
            return t >= 0 ? t : null;
        }
        /**
         * @description
         */

    }, {
        key: "intersectPlane",
        value: function intersectPlane(plane, optionalTarget) {
            var t = this.distanceToPlane(plane);
            if (t === null) {
                return null;
            }
            return this.at(t, optionalTarget);
        }
        /**
         * @description
         */

    }, {
        key: "intersectsPlane",
        value: function intersectsPlane(plane) {
            // check if the ray lies on the plane first
            var distToPoint = plane.distanceToPoint(this.origin);
            if (distToPoint === 0) {
                return true;
            }
            var denominator = plane.normal.dot(this.direction);
            if (denominator * distToPoint < 0) {
                return true;
            }
            // ray origin is behind the plane (and is pointing behind it)
            return false;
        }
        /**
         * @description
         */

    }, {
        key: "intersectAABB",
        value: function intersectAABB(aabb, optionalTarget) {
            var tmin = void 0;
            var tmax = void 0;
            var tymin = void 0;
            var tymax = void 0;
            var tzmin = void 0;
            var tzmax = void 0;
            var invdirx = 1 / this.direction.x;
            var invdiry = 1 / this.direction.y;
            var invdirz = 1 / this.direction.z;
            var origin = this.origin;
            if (invdirx >= 0) {
                tmin = (aabb.min.x - origin.x) * invdirx;
                tmax = (aabb.max.x - origin.x) * invdirx;
            } else {
                tmin = (aabb.max.x - origin.x) * invdirx;
                tmax = (aabb.min.x - origin.x) * invdirx;
            }
            if (invdiry >= 0) {
                tymin = (aabb.min.y - origin.y) * invdiry;
                tymax = (aabb.max.y - origin.y) * invdiry;
            } else {
                tymin = (aabb.max.y - origin.y) * invdiry;
                tymax = (aabb.min.y - origin.y) * invdiry;
            }
            if (tmin > tymax || tymin > tmax) return null;
            // These lines also handle the case where tmin or tmax is NaN
            // (result of 0 * Infinity). x !== x returns true if x is NaN
            if (tymin > tmin || tmin !== tmin) tmin = tymin;
            if (tymax < tmax || tmax !== tmax) tmax = tymax;
            if (invdirz >= 0) {
                tzmin = (aabb.min.z - origin.z) * invdirz;
                tzmax = (aabb.max.z - origin.z) * invdirz;
            } else {
                tzmin = (aabb.max.z - origin.z) * invdirz;
                tzmax = (aabb.min.z - origin.z) * invdirz;
            }
            if (tmin > tzmax || tzmin > tmax) return null;
            if (tzmin > tmin || tmin !== tmin) tmin = tzmin;
            if (tzmax < tmax || tmax !== tmax) tmax = tzmax;
            // return point closest to the ray (positive side)
            if (tmax < 0) return null;
            return this.at(tmin >= 0 ? tmin : tmax, optionalTarget);
        }
        /**
         * @description
         */

    }, {
        key: "intersectsAABB",
        value: function intersectsAABB(aabb) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            return this.intersectAABB(aabb, _v1) !== null;
        }
        /**
         * @description
         */

    }, {
        key: "intersectTriangle",
        value: function intersectTriangle(a, b, c, backfaceCulling, optionalTarget) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            if (_v2 === undefined) _v2 = new vector3_1.Vector3();
            if (_v3 === undefined) _v3 = new vector3_1.Vector3();
            if (_v4 === undefined) _v4 = new vector3_1.Vector3();
            // Compute the offset origin, edges, and normal.
            var diff = _v1;
            var edge1 = _v2;
            var edge2 = _v3;
            var normal = _v4;
            // from http://www.geometrictools.com/LibMathematics/Intersection/Wm5IntrRay3Triangle3.cpp
            edge1.subVectors(b, a);
            edge2.subVectors(c, a);
            normal.crossVectors(edge1, edge2);
            // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
            // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
            //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
            //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
            //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
            var DdN = this.direction.dot(normal);
            var sign = void 0;
            if (DdN > 0) {
                if (backfaceCulling) return null;
                sign = 1;
            } else if (DdN < 0) {
                sign = -1;
                DdN = -DdN;
            } else {
                return null;
            }
            diff.subVectors(this.origin, a);
            var DdQxE2 = sign * this.direction.dot(edge2.crossVectors(diff, edge2));
            // b1 < 0, no intersection
            if (DdQxE2 < 0) {
                return null;
            }
            var DdE1xQ = sign * this.direction.dot(edge1.cross(diff));
            // b2 < 0, no intersection
            if (DdE1xQ < 0) {
                return null;
            }
            // b1+b2 > 1, no intersection
            if (DdQxE2 + DdE1xQ > DdN) {
                return null;
            }
            // Line intersects triangle, check if ray does.
            var QdN = -sign * diff.dot(normal);
            // t < 0, no intersection
            if (QdN < 0) {
                return null;
            }
            // Ray intersects triangle.
            return this.at(QdN / DdN, optionalTarget);
        }
        /**
         * @description
         */

    }, {
        key: "applyMatrix4",
        value: function applyMatrix4(matrix4) {
            this.direction.add(this.origin).applyPoint(matrix4);
            this.origin.applyPoint(matrix4);
            this.direction.sub(this.origin);
            this.direction.normalize();
            return this;
        }
        /**
         * @description
         */

    }, {
        key: "equal",
        value: function equal(ray) {
            return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
        }
    }]);

    return Ray;
}();

exports.Ray = Ray;
})