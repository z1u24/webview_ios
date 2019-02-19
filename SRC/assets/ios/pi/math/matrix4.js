_$define("pi/math/matrix4", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 4*4 行矩阵
 */
var euler_1 = require("./euler");
var vector3_1 = require("./vector3");
/**
 * 注：不能在这里初始化，否则会引起模块的循环引用
 */
/* tslint:disable:variable-name  no-reserved-keywords*/
var _v1 = void 0;
var _v2 = void 0;
var _v3 = void 0;
var _m = void 0;

var Matrix4 = function () {
    function Matrix4() {
        _classCallCheck(this, Matrix4);

        this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    /**
     * @description 设置数值
     */


    _createClass(Matrix4, [{
        key: "set",
        value: function set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
            var te = this.elements;
            te[0] = n11;
            te[4] = n12;
            te[8] = n13;
            te[12] = n14;
            te[1] = n21;
            te[5] = n22;
            te[9] = n23;
            te[13] = n24;
            te[2] = n31;
            te[6] = n32;
            te[10] = n33;
            te[14] = n34;
            te[3] = n41;
            te[7] = n42;
            te[11] = n43;
            te[15] = n44;
            return this;
        }
        /**
         * @description 设置单位阵
         */

    }, {
        key: "identity",
        value: function identity() {
            return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        /**
         * @description 判断相等
         */

    }, {
        key: "equals",
        value: function equals(matrix) {
            var te = this.elements;
            var me = matrix.elements;
            for (var i = 0; i < 16; i++) {
                if (Math.abs(te[i] - me[i]) < 0.001) {
                    return false;
                }
            }
            return true;
        }
        /**
         * @description 从数组中赋值
         */

    }, {
        key: "fromArray",
        value: function fromArray(array) {
            this.elements.set(array);
            return this;
        }
        /**
         * @description 把值放到数组
         */

    }, {
        key: "toArray",
        value: function toArray(array, offset) {
            if (array === undefined) array = [];
            if (offset === undefined) offset = 0;
            var te = this.elements;
            array[offset] = te[0];
            array[offset + 1] = te[1];
            array[offset + 2] = te[2];
            array[offset + 3] = te[3];
            array[offset + 4] = te[4];
            array[offset + 5] = te[5];
            array[offset + 6] = te[6];
            array[offset + 7] = te[7];
            array[offset + 8] = te[8];
            array[offset + 9] = te[9];
            array[offset + 10] = te[10];
            array[offset + 11] = te[11];
            array[offset + 12] = te[12];
            array[offset + 13] = te[13];
            array[offset + 14] = te[14];
            array[offset + 15] = te[15];
            return array;
        }
        /**
         * @description 克隆
         */

    }, {
        key: "clone",
        value: function clone() {
            return new Matrix4().fromArray(this.elements);
        }
        /**
         * @description 拷贝
         */

    }, {
        key: "copy",
        value: function copy(m) {
            this.elements.set(m.elements);
            return this;
        }
        /**
         * @description 将矩阵的列拷贝到向量去
         *
         */

    }, {
        key: "columnToVec",
        value: function columnToVec(dst, index) {
            return dst.fromArray(this.elements, index * 4);
        }
        /**
         * @description 将矩阵的3列拷贝到三个轴去
         */

    }, {
        key: "extractBasis",
        value: function extractBasis(xAxis, yAxis, zAxis) {
            this.columnToVec(xAxis, 0);
            this.columnToVec(yAxis, 1);
            this.columnToVec(zAxis, 2);
            return this;
        }
        /**
         * @description 将三个轴拷到矩阵去
         */

    }, {
        key: "makeBasis",
        value: function makeBasis(xAxis, yAxis, zAxis) {
            this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);
            return this;
        }
        /**
         * @description 旋转
         */

    }, {
        key: "extractRotation",
        value: function extractRotation(m) {
            var te = this.elements;
            var me = m.elements;
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            var scaleX = 1 / _v1.setFromMatrixColumn(m, 0).length();
            var scaleY = 1 / _v1.setFromMatrixColumn(m, 1).length();
            var scaleZ = 1 / _v1.setFromMatrixColumn(m, 2).length();
            te[0] = me[0] * scaleX;
            te[1] = me[1] * scaleX;
            te[2] = me[2] * scaleX;
            te[4] = me[4] * scaleY;
            te[5] = me[5] * scaleY;
            te[6] = me[6] * scaleY;
            te[8] = me[8] * scaleZ;
            te[9] = me[9] * scaleZ;
            te[10] = me[10] * scaleZ;
            return this;
        }
        /**
         * @description 从欧拉角构造旋转矩阵
         */
        // tslint:disable-next-line:max-func-body-length

    }, {
        key: "makeRotationFromEuler",
        value: function makeRotationFromEuler(euler) {
            var te = this.elements;
            var x = euler.x;
            var y = euler.y;
            var z = euler.z;
            var a = Math.cos(x);
            var b = Math.sin(x);
            var c = Math.cos(y);
            var d = Math.sin(y);
            var e = Math.cos(z);
            var f = Math.sin(z);
            if (euler.order === euler_1.RotationOrder.XYZ) {
                var ae = a * e;
                var af = a * f;
                var be = b * e;
                var bf = b * f;
                te[0] = c * e;
                te[4] = -c * f;
                te[8] = d;
                te[1] = af + be * d;
                te[5] = ae - bf * d;
                te[9] = -b * c;
                te[2] = bf - ae * d;
                te[6] = be + af * d;
                te[10] = a * c;
            } else if (euler.order === euler_1.RotationOrder.YXZ) {
                var ce = c * e;
                var cf = c * f;
                var de = d * e;
                var df = d * f;
                te[0] = ce + df * b;
                te[4] = de * b - cf;
                te[8] = a * d;
                te[1] = a * f;
                te[5] = a * e;
                te[9] = -b;
                te[2] = cf * b - de;
                te[6] = df + ce * b;
                te[10] = a * c;
            } else if (euler.order === euler_1.RotationOrder.ZXY) {
                var _ce = c * e;
                var _cf = c * f;
                var _de = d * e;
                var _df = d * f;
                te[0] = _ce - _df * b;
                te[4] = -a * f;
                te[8] = _de + _cf * b;
                te[1] = _cf + _de * b;
                te[5] = a * e;
                te[9] = _df - _ce * b;
                te[2] = -a * d;
                te[6] = b;
                te[10] = a * c;
            } else if (euler.order === euler_1.RotationOrder.ZYX) {
                var _ae = a * e;
                var _af = a * f;
                var _be = b * e;
                var _bf = b * f;
                te[0] = c * e;
                te[4] = _be * d - _af;
                te[8] = _ae * d + _bf;
                te[1] = c * f;
                te[5] = _bf * d + _ae;
                te[9] = _af * d - _be;
                te[2] = -d;
                te[6] = b * c;
                te[10] = a * c;
            } else if (euler.order === euler_1.RotationOrder.YZX) {
                var ac = a * c;
                var ad = a * d;
                var bc = b * c;
                var bd = b * d;
                te[0] = c * e;
                te[4] = bd - ac * f;
                te[8] = bc * f + ad;
                te[1] = f;
                te[5] = a * e;
                te[9] = -b * e;
                te[2] = -d * e;
                te[6] = ad * f + bc;
                te[10] = ac - bd * f;
            } else if (euler.order === euler_1.RotationOrder.XZY) {
                var _ac = a * c;
                var _ad = a * d;
                var _bc = b * c;
                var _bd = b * d;
                te[0] = c * e;
                te[4] = -f;
                te[8] = d * e;
                te[1] = _ac * f + _bd;
                te[5] = a * e;
                te[9] = _ad * f - _bc;
                te[2] = _bc * f - _ad;
                te[6] = b * e;
                te[10] = _bd * f + _ac;
            }
            // last column
            te[3] = 0;
            te[7] = 0;
            te[11] = 0;
            // bottom row
            te[12] = 0;
            te[13] = 0;
            te[14] = 0;
            te[15] = 1;
            return this;
        }
        /**
         * @description 从四元数构造
         */

    }, {
        key: "makeRotationFromQuaternion",
        value: function makeRotationFromQuaternion(q) {
            var te = this.elements;
            /* tslint:disable:one-variable-per-declaration */
            var x = q.x,
                y = q.y,
                z = q.z,
                w = q.w;
            var x2 = x + x,
                y2 = y + y,
                z2 = z + z;
            var xx = x * x2,
                xy = x * y2,
                xz = x * z2;
            var yy = y * y2,
                yz = y * z2,
                zz = z * z2;
            var wx = w * x2,
                wy = w * y2,
                wz = w * z2;
            te[0] = 1 - (yy + zz);
            te[4] = xy - wz;
            te[8] = xz + wy;
            te[1] = xy + wz;
            te[5] = 1 - (xx + zz);
            te[9] = yz - wx;
            te[2] = xz - wy;
            te[6] = yz + wx;
            te[10] = 1 - (xx + yy);
            // last column
            te[3] = 0;
            te[7] = 0;
            te[11] = 0;
            // bottom row
            te[12] = 0;
            te[13] = 0;
            te[14] = 0;
            te[15] = 1;
            return this;
        }
        /**
         * @description
         */

    }, {
        key: "getNormalMatrix",
        value: function getNormalMatrix(matrix) {
            return this.getInverse(matrix).transpose();
        }
        /**
         * @description
         */

    }, {
        key: "lookAt",
        value: function lookAt(eye, target, up) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            if (_v2 === undefined) _v2 = new vector3_1.Vector3();
            if (_v3 === undefined) _v3 = new vector3_1.Vector3();
            var te = this.elements;
            _v3.subVectors(eye, target).normalize();
            if (_v3.lengthSq() === 0) {
                _v3.z = 1;
            }
            _v1.crossVectors(up, _v3).normalize();
            if (_v1.lengthSq() === 0) {
                _v3.x += 0.0001;
                _v1.crossVectors(up, _v3).normalize();
            }
            _v2.crossVectors(_v3, _v1);
            te[0] = _v1.x;
            te[4] = _v2.x;
            te[8] = _v3.x;
            te[1] = _v1.y;
            te[5] = _v2.y;
            te[9] = _v3.y;
            te[2] = _v1.z;
            te[6] = _v2.z;
            te[10] = _v3.z;
        }
        /**
         * @description this = this * m;
         */

    }, {
        key: "multiply",
        value: function multiply(m) {
            return this.multiplyMatrices(this, m);
        }
        /**
         * @description this = m * this
         */

    }, {
        key: "premultiply",
        value: function premultiply(m) {
            return this.multiplyMatrices(m, this);
        }
        /**
         * @description this = a * b;
         */

    }, {
        key: "multiplyMatrices",
        value: function multiplyMatrices(a, b) {
            var ae = a.elements;
            var be = b.elements;
            var te = this.elements;
            var a11 = ae[0],
                a12 = ae[4],
                a13 = ae[8],
                a14 = ae[12];
            var a21 = ae[1],
                a22 = ae[5],
                a23 = ae[9],
                a24 = ae[13];
            var a31 = ae[2],
                a32 = ae[6],
                a33 = ae[10],
                a34 = ae[14];
            var a41 = ae[3],
                a42 = ae[7],
                a43 = ae[11],
                a44 = ae[15];
            var b11 = be[0],
                b12 = be[4],
                b13 = be[8],
                b14 = be[12];
            var b21 = be[1],
                b22 = be[5],
                b23 = be[9],
                b24 = be[13];
            var b31 = be[2],
                b32 = be[6],
                b33 = be[10],
                b34 = be[14];
            var b41 = be[3],
                b42 = be[7],
                b43 = be[11],
                b44 = be[15];
            te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
            te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
            te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
            te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
            te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
            te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
            te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
            te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
            te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
            te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
            te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
            te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
            te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
            te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
            te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
            te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
            return this;
        }
        /**
         * @description r = this = a * b;
         */

    }, {
        key: "multiplyToArray",
        value: function multiplyToArray(a, b, r) {
            var te = this.elements;
            this.multiplyMatrices(a, b);
            r[0] = te[0];
            r[1] = te[1];
            r[2] = te[2];
            r[3] = te[3];
            r[4] = te[4];
            r[5] = te[5];
            r[6] = te[6];
            r[7] = te[7];
            r[8] = te[8];
            r[9] = te[9];
            r[10] = te[10];
            r[11] = te[11];
            r[12] = te[12];
            r[13] = te[13];
            r[14] = te[14];
            r[15] = te[15];
            return this;
        }
        /**
         * @description this *= s;
         */

    }, {
        key: "multiplyScalar",
        value: function multiplyScalar(s) {
            var te = this.elements;
            te[0] *= s;
            te[4] *= s;
            te[8] *= s;
            te[12] *= s;
            te[1] *= s;
            te[5] *= s;
            te[9] *= s;
            te[13] *= s;
            te[2] *= s;
            te[6] *= s;
            te[10] *= s;
            te[14] *= s;
            te[3] *= s;
            te[7] *= s;
            te[11] *= s;
            te[15] *= s;
            return this;
        }
        /**
         * @description array作为vec3应用
         */

    }, {
        key: "applyToVector3Array",
        value: function applyToVector3Array(array, offset, length) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            if (offset === undefined) offset = 0;
            if (length === undefined) length = array.length;
            for (var i = 0, j = offset; i < length; i += 3, j += 3) {
                _v1.fromArray(array, j);
                _v1.applyPoint(this);
                _v1.toArray(array, j);
            }
            return array;
        }
        /**
         * @description 行列式
         */

    }, {
        key: "determinant",
        value: function determinant() {
            var te = this.elements;
            var n11 = te[0],
                n12 = te[4],
                n13 = te[8],
                n14 = te[12];
            var n21 = te[1],
                n22 = te[5],
                n23 = te[9],
                n24 = te[13];
            var n31 = te[2],
                n32 = te[6],
                n33 = te[10],
                n34 = te[14];
            var n41 = te[3],
                n42 = te[7],
                n43 = te[11],
                n44 = te[15];
            // TODO: make this more efficient
            // ( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )
            return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
        }
        /**
         * @description 转置
         */

    }, {
        key: "transpose",
        value: function transpose() {
            var tmp = void 0;
            var te = this.elements;
            tmp = te[1];
            te[1] = te[4];
            te[4] = tmp;
            tmp = te[2];
            te[2] = te[8];
            te[8] = tmp;
            tmp = te[6];
            te[6] = te[9];
            te[9] = tmp;
            tmp = te[3];
            te[3] = te[12];
            te[12] = tmp;
            tmp = te[7];
            te[7] = te[13];
            te[13] = tmp;
            tmp = te[11];
            te[11] = te[14];
            te[14] = tmp;
            return this;
        }
        /**
         * @description 设置位置
         */

    }, {
        key: "setPosition",
        value: function setPosition(v) {
            var te = this.elements;
            te[12] = v.x;
            te[13] = v.y;
            te[14] = v.z;
            return this;
        }
        /**
         * @description 取逆
         */

    }, {
        key: "getInverse",
        value: function getInverse(m) {
            var throwOnDegenerate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
            var te = this.elements,
                me = m.elements,
                n11 = me[0],
                n21 = me[1],
                n31 = me[2],
                n41 = me[3],
                n12 = me[4],
                n22 = me[5],
                n32 = me[6],
                n42 = me[7],
                n13 = me[8],
                n23 = me[9],
                n33 = me[10],
                n43 = me[11],
                n14 = me[12],
                n24 = me[13],
                n34 = me[14],
                n44 = me[15],
                t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
                t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
                t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
                t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
            var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
            if (det === 0) {
                var msg = 'Matrix4.getInverse(): can\'t invert matrix, determinant is 0';
                if (throwOnDegenerate || false) {
                    throw new Error(msg);
                } else {
                    console.warn(msg);
                }
                return this.identity();
            }
            te[0] = t11;
            te[1] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
            te[2] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
            te[3] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
            te[4] = t12;
            te[5] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
            te[6] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
            te[7] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
            te[8] = t13;
            te[9] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
            te[10] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
            te[11] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
            te[12] = t14;
            te[13] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
            te[14] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
            te[15] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;
            return this.multiplyScalar(1 / det);
        }
        /**
         * @description 缩放
         */

    }, {
        key: "scale",
        value: function scale(v) {
            var te = this.elements;
            var x = v.x,
                y = v.y,
                z = v.z;
            te[0] *= x;
            te[4] *= y;
            te[8] *= z;
            te[1] *= x;
            te[5] *= y;
            te[9] *= z;
            te[2] *= x;
            te[6] *= y;
            te[10] *= z;
            te[3] *= x;
            te[7] *= y;
            te[11] *= z;
            return this;
        }
        /**
         * @description 最大长度的轴
         */

    }, {
        key: "getMaxScaleOnAxis",
        value: function getMaxScaleOnAxis() {
            var te = this.elements;
            var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
            var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
            var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
            return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
        }
        /**
         * @description 构造位移矩阵
         */

    }, {
        key: "makeTranslation",
        value: function makeTranslation(x, y, z) {
            this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
            return this;
        }
        /**
         * @description 构造绕x轴旋转theta弧度的矩阵
         */

    }, {
        key: "makeRotationX",
        value: function makeRotationX(theta) {
            var c = Math.cos(theta),
                s = Math.sin(theta);
            this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
            return this;
        }
        /**
         * @description 构造绕y轴旋转theta弧度的矩阵
         */

    }, {
        key: "makeRotationY",
        value: function makeRotationY(theta) {
            var c = Math.cos(theta),
                s = Math.sin(theta);
            this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
            return this;
        }
        /**
         * @description 构造绕z轴旋转theta弧度的矩阵
         */

    }, {
        key: "makeRotationZ",
        value: function makeRotationZ(theta) {
            var c = Math.cos(theta),
                s = Math.sin(theta);
            this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            return this;
        }
        /**
         * @description 构造轴-角度的旋转矩阵
         * @param axis 单位向量
         * @param angle 单位:弧度
         */

    }, {
        key: "makeRotationAxis",
        value: function makeRotationAxis(axis, angle) {
            // Based on http://www.gamedev.net/reference/articles/article1199.asp
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            var t = 1 - c;
            var x = axis.x,
                y = axis.y,
                z = axis.z;
            var tx = t * x,
                ty = t * y;
            this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
            return this;
        }
        /**
         * @description 构造缩放矩阵
         */

    }, {
        key: "makeScale",
        value: function makeScale(x, y, z) {
            this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
            return this;
        }
        /**
         * @description 通过 旋转-缩放-平移 合成 矩阵
         */

    }, {
        key: "compose",
        value: function compose(position, quaternion, scale) {
            this.makeRotationFromQuaternion(quaternion);
            this.scale(scale);
            this.setPosition(position);
            return this;
        }
        /**
         * @description 分解矩阵到旋转-缩放-平移
         */

    }, {
        key: "decompose",
        value: function decompose(position, quaternion, scale) {
            if (_v1 === undefined) _v1 = new vector3_1.Vector3();
            if (_m === undefined) _m = new Matrix4();
            var te = this.elements;
            var sx = _v1.set(te[0], te[1], te[2]).length();
            var sy = _v1.set(te[4], te[5], te[6]).length();
            var sz = _v1.set(te[8], te[9], te[10]).length();
            // if determine is negative, we need to invert one scale
            var det = this.determinant();
            if (det < 0) {
                sx = -sx;
            }
            position.x = te[12];
            position.y = te[13];
            position.z = te[14];
            // scale the rotation part
            _m.elements.set(this.elements); // at this point matrix is incomplete so we can't use .copy()
            var invSX = 1 / sx;
            var invSY = 1 / sy;
            var invSZ = 1 / sz;
            _m.elements[0] *= invSX;
            _m.elements[1] *= invSX;
            _m.elements[2] *= invSX;
            _m.elements[4] *= invSY;
            _m.elements[5] *= invSY;
            _m.elements[6] *= invSY;
            _m.elements[8] *= invSZ;
            _m.elements[9] *= invSZ;
            _m.elements[10] *= invSZ;
            quaternion.setFromRotationMatrix(_m);
            scale.x = sx;
            scale.y = sy;
            scale.z = sz;
            return this;
        }
        /**
         * @description 构造投影矩阵
         */

    }, {
        key: "makeFrustum",
        value: function makeFrustum(left, right, bottom, top, near, far) {
            var te = this.elements;
            var x = near / (right - left) * 2;
            var y = near / (top - bottom) * 2;
            var a = (right + left) / (right - left);
            var b = (top + bottom) / (top - bottom);
            var c = -(far + near) / (far - near);
            var d = far * near / (far - near) * -2;
            te[0] = x;
            te[4] = 0;
            te[8] = a;
            te[12] = 0;
            te[1] = 0;
            te[5] = y;
            te[9] = b;
            te[13] = 0;
            te[2] = 0;
            te[6] = 0;
            te[10] = c;
            te[14] = d;
            te[3] = 0;
            te[7] = 0;
            te[11] = -1;
            te[15] = 0;
            return this;
        }
        /**
         * @description 构造透视投影矩阵
         * @param fov 视野角度，单位：弧度
         * @param aspect 宽高比
         * @param near 近距离
         * @param far 远距离
         */

    }, {
        key: "makePerspective",
        value: function makePerspective(fov, aspect, near, far) {
            var ymax = near * Math.tan(fov * 0.5);
            var ymin = -ymax;
            var xmin = ymin * aspect;
            var xmax = ymax * aspect;
            return this.makeFrustum(xmin, xmax, ymin, ymax, near, far);
        }
        /**
         * @description 构造正交投影矩阵
         */

    }, {
        key: "makeOrthographic",
        value: function makeOrthographic(left, right, top, bottom, near, far) {
            var te = this.elements;
            /* tslint:disable:number-literal-format */
            var w = 1.0 / (right - left);
            var h = 1.0 / (top - bottom);
            var p = 1.0 / (far - near);
            var x = (right + left) * w;
            var y = (top + bottom) * h;
            var z = (far + near) * p;
            te[0] = w * 2;
            te[4] = 0;
            te[8] = 0;
            te[12] = -x;
            te[1] = 0;
            te[5] = h * 2;
            te[9] = 0;
            te[13] = -y;
            te[2] = 0;
            te[6] = 0;
            te[10] = p * -2;
            te[14] = -z;
            te[3] = 0;
            te[7] = 0;
            te[11] = 0;
            te[15] = 1;
            return this;
        }
    }]);

    return Matrix4;
}();

exports.Matrix4 = Matrix4;
})