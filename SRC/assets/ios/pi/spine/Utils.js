_$define("pi/spine/Utils", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/******************************************************************************
 * Spine Runtimes Software License v2.5
 *
 * Copyright (c) 2013-2016, Esoteric Software
 * All rights reserved.
 *
 * You are granted a perpetual, non-exclusive, non-sublicensable, and
 * non-transferable license to use, install, execute, and perform the Spine
 * Runtimes software and derivative works solely for personal or internal
 * use. Without the written permission of Esoteric Software (see Section 2 of
 * the Spine Software License Agreement), you may not (a) modify, translate,
 * adapt, or develop new applications using the Spine Runtimes or otherwise
 * create derivative works or improvements of the Spine Runtimes or (b) remove,
 * delete, alter, or obscure any trademarks or any copyright, trademark, patent,
 * or other intellectual property or proprietary rights notices on or in the
 * Software, including any copy thereof. Redistributions in binary or source
 * form must include this license and terms.
 *
 * THIS SOFTWARE IS PROVIDED BY ESOTERIC SOFTWARE "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 * EVENT SHALL ESOTERIC SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, BUSINESS INTERRUPTION, OR LOSS OF
 * USE, DATA, OR PROFITS) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *****************************************************************************/
var spine;
(function (spine) {
    var IntSet = function () {
        function IntSet() {
            _classCallCheck(this, IntSet);

            this.array = new Array();
        }

        _createClass(IntSet, [{
            key: "add",
            value: function add(value) {
                var contains = this.contains(value);
                this.array[value | 0] = value | 0;
                return !contains;
            }
        }, {
            key: "contains",
            value: function contains(value) {
                return this.array[value | 0] != undefined;
            }
        }, {
            key: "remove",
            value: function remove(value) {
                this.array[value | 0] = undefined;
            }
        }, {
            key: "clear",
            value: function clear() {
                this.array.length = 0;
            }
        }]);

        return IntSet;
    }();

    spine.IntSet = IntSet;

    var Color = function () {
        function Color() {
            var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            _classCallCheck(this, Color);

            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }

        _createClass(Color, [{
            key: "set",
            value: function set(r, g, b, a) {
                this.r = r;
                this.g = g;
                this.b = b;
                this.a = a;
                this.clamp();
                return this;
            }
        }, {
            key: "setFromColor",
            value: function setFromColor(c) {
                this.r = c.r;
                this.g = c.g;
                this.b = c.b;
                this.a = c.a;
                return this;
            }
        }, {
            key: "setFromString",
            value: function setFromString(hex) {
                hex = hex.charAt(0) == '#' ? hex.substr(1) : hex;
                this.r = parseInt(hex.substr(0, 2), 16) / 255.0;
                this.g = parseInt(hex.substr(2, 2), 16) / 255.0;
                this.b = parseInt(hex.substr(4, 2), 16) / 255.0;
                this.a = (hex.length != 8 ? 255 : parseInt(hex.substr(6, 2), 16)) / 255.0;
                return this;
            }
        }, {
            key: "add",
            value: function add(r, g, b, a) {
                this.r += r;
                this.g += g;
                this.b += b;
                this.a += a;
                this.clamp();
                return this;
            }
        }, {
            key: "clamp",
            value: function clamp() {
                if (this.r < 0) this.r = 0;else if (this.r > 1) this.r = 1;
                if (this.g < 0) this.g = 0;else if (this.g > 1) this.g = 1;
                if (this.b < 0) this.b = 0;else if (this.b > 1) this.b = 1;
                if (this.a < 0) this.a = 0;else if (this.a > 1) this.a = 1;
                return this;
            }
        }]);

        return Color;
    }();

    Color.WHITE = new Color(1, 1, 1, 1);
    Color.RED = new Color(1, 0, 0, 1);
    Color.GREEN = new Color(0, 1, 0, 1);
    Color.BLUE = new Color(0, 0, 1, 1);
    Color.MAGENTA = new Color(1, 0, 1, 1);
    spine.Color = Color;

    var MathUtils = function () {
        function MathUtils() {
            _classCallCheck(this, MathUtils);
        }

        _createClass(MathUtils, null, [{
            key: "clamp",
            value: function clamp(value, min, max) {
                if (value < min) return min;
                if (value > max) return max;
                return value;
            }
        }, {
            key: "cosDeg",
            value: function cosDeg(degrees) {
                return Math.cos(degrees * MathUtils.degRad);
            }
        }, {
            key: "sinDeg",
            value: function sinDeg(degrees) {
                return Math.sin(degrees * MathUtils.degRad);
            }
        }, {
            key: "signum",
            value: function signum(value) {
                return value > 0 ? 1 : value < 0 ? -1 : 0;
            }
        }, {
            key: "toInt",
            value: function toInt(x) {
                return x > 0 ? Math.floor(x) : Math.ceil(x);
            }
        }, {
            key: "cbrt",
            value: function cbrt(x) {
                var y = Math.pow(Math.abs(x), 1 / 3);
                return x < 0 ? -y : y;
            }
        }, {
            key: "randomTriangular",
            value: function randomTriangular(min, max) {
                return MathUtils.randomTriangularWith(min, max, (min + max) * 0.5);
            }
        }, {
            key: "randomTriangularWith",
            value: function randomTriangularWith(min, max, mode) {
                var u = Math.random();
                var d = max - min;
                if (u <= (mode - min) / d) return min + Math.sqrt(u * d * (mode - min));
                return max - Math.sqrt((1 - u) * d * (max - mode));
            }
        }]);

        return MathUtils;
    }();

    MathUtils.PI = 3.1415927;
    MathUtils.PI2 = MathUtils.PI * 2;
    MathUtils.radiansToDegrees = 180 / MathUtils.PI;
    MathUtils.radDeg = MathUtils.radiansToDegrees;
    MathUtils.degreesToRadians = MathUtils.PI / 180;
    MathUtils.degRad = MathUtils.degreesToRadians;
    spine.MathUtils = MathUtils;

    var Interpolation = function () {
        function Interpolation() {
            _classCallCheck(this, Interpolation);
        }

        _createClass(Interpolation, [{
            key: "apply",
            value: function apply(start, end, a) {
                return start + (end - start) * this.applyInternal(a);
            }
        }]);

        return Interpolation;
    }();

    spine.Interpolation = Interpolation;

    var Pow = function (_Interpolation) {
        _inherits(Pow, _Interpolation);

        function Pow(power) {
            _classCallCheck(this, Pow);

            var _this = _possibleConstructorReturn(this, (Pow.__proto__ || Object.getPrototypeOf(Pow)).call(this));

            _this.power = 2;
            _this.power = power;
            return _this;
        }

        _createClass(Pow, [{
            key: "applyInternal",
            value: function applyInternal(a) {
                if (a <= 0.5) return Math.pow(a * 2, this.power) / 2;
                return Math.pow((a - 1) * 2, this.power) / (this.power % 2 == 0 ? -2 : 2) + 1;
            }
        }]);

        return Pow;
    }(Interpolation);

    spine.Pow = Pow;

    var PowOut = function (_Pow) {
        _inherits(PowOut, _Pow);

        function PowOut(power) {
            _classCallCheck(this, PowOut);

            return _possibleConstructorReturn(this, (PowOut.__proto__ || Object.getPrototypeOf(PowOut)).call(this, power));
        }

        _createClass(PowOut, [{
            key: "applyInternal",
            value: function applyInternal(a) {
                return Math.pow(a - 1, this.power) * (this.power % 2 == 0 ? -1 : 1) + 1;
            }
        }]);

        return PowOut;
    }(Pow);

    spine.PowOut = PowOut;

    var Utils = function () {
        function Utils() {
            _classCallCheck(this, Utils);
        }

        _createClass(Utils, null, [{
            key: "arrayCopy",
            value: function arrayCopy(source, sourceStart, dest, destStart, numElements) {
                for (var i = sourceStart, j = destStart; i < sourceStart + numElements; i++, j++) {
                    dest[j] = source[i];
                }
            }
        }, {
            key: "setArraySize",
            value: function setArraySize(array, size) {
                var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

                var oldSize = array.length;
                if (oldSize == size) return array;
                array.length = size;
                if (oldSize < size) {
                    for (var i = oldSize; i < size; i++) {
                        array[i] = value;
                    }
                }
                return array;
            }
        }, {
            key: "ensureArrayCapacity",
            value: function ensureArrayCapacity(array, size) {
                var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

                if (array.length >= size) return array;
                return Utils.setArraySize(array, size, value);
            }
        }, {
            key: "newArray",
            value: function newArray(size, defaultValue) {
                var array = new Array(size);
                for (var i = 0; i < size; i++) {
                    array[i] = defaultValue;
                }return array;
            }
        }, {
            key: "newFloatArray",
            value: function newFloatArray(size) {
                if (Utils.SUPPORTS_TYPED_ARRAYS) {
                    return new Float32Array(size);
                } else {
                    var array = new Array(size);
                    for (var i = 0; i < array.length; i++) {
                        array[i] = 0;
                    }return array;
                }
            }
        }, {
            key: "newShortArray",
            value: function newShortArray(size) {
                if (Utils.SUPPORTS_TYPED_ARRAYS) {
                    return new Int16Array(size);
                } else {
                    var array = new Array(size);
                    for (var i = 0; i < array.length; i++) {
                        array[i] = 0;
                    }return array;
                }
            }
        }, {
            key: "toFloatArray",
            value: function toFloatArray(array) {
                return Utils.SUPPORTS_TYPED_ARRAYS ? new Float32Array(array) : array;
            }
        }, {
            key: "toSinglePrecision",
            value: function toSinglePrecision(value) {
                return Utils.SUPPORTS_TYPED_ARRAYS ? Math.fround(value) : value;
            }
            // This function is used to fix WebKit 602 specific issue described at http://esotericsoftware.com/forum/iOS-10-disappearing-graphics-10109

        }, {
            key: "webkit602BugfixHelper",
            value: function webkit602BugfixHelper(alpha, pose) {}
        }]);

        return Utils;
    }();

    Utils.SUPPORTS_TYPED_ARRAYS = typeof Float32Array !== "undefined";
    spine.Utils = Utils;

    var DebugUtils = function () {
        function DebugUtils() {
            _classCallCheck(this, DebugUtils);
        }

        _createClass(DebugUtils, null, [{
            key: "logBones",
            value: function logBones(skeleton) {
                for (var i = 0; i < skeleton.bones.length; i++) {
                    var bone = skeleton.bones[i];
                    console.log(bone.data.name + ", " + bone.a + ", " + bone.b + ", " + bone.c + ", " + bone.d + ", " + bone.worldX + ", " + bone.worldY);
                }
            }
        }]);

        return DebugUtils;
    }();

    spine.DebugUtils = DebugUtils;

    var Pool = function () {
        function Pool(instantiator) {
            _classCallCheck(this, Pool);

            this.items = new Array();
            this.instantiator = instantiator;
        }

        _createClass(Pool, [{
            key: "obtain",
            value: function obtain() {
                return this.items.length > 0 ? this.items.pop() : this.instantiator();
            }
        }, {
            key: "free",
            value: function free(item) {
                if (item.reset) item.reset();
                this.items.push(item);
            }
        }, {
            key: "freeAll",
            value: function freeAll(items) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].reset) items[i].reset();
                    this.items[i] = items[i];
                }
            }
        }, {
            key: "clear",
            value: function clear() {
                this.items.length = 0;
            }
        }]);

        return Pool;
    }();

    spine.Pool = Pool;

    var Vector2 = function () {
        function Vector2() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            _classCallCheck(this, Vector2);

            this.x = x;
            this.y = y;
        }

        _createClass(Vector2, [{
            key: "set",
            value: function set(x, y) {
                this.x = x;
                this.y = y;
                return this;
            }
        }, {
            key: "length",
            value: function length() {
                var x = this.x;
                var y = this.y;
                return Math.sqrt(x * x + y * y);
            }
        }, {
            key: "normalize",
            value: function normalize() {
                var len = this.length();
                if (len != 0) {
                    this.x /= len;
                    this.y /= len;
                }
                return this;
            }
        }]);

        return Vector2;
    }();

    spine.Vector2 = Vector2;

    var TimeKeeper = function () {
        function TimeKeeper() {
            _classCallCheck(this, TimeKeeper);

            this.maxDelta = 0.064;
            this.framesPerSecond = 0;
            this.delta = 0;
            this.totalTime = 0;
            this.lastTime = Date.now() / 1000;
            this.frameCount = 0;
            this.frameTime = 0;
        }

        _createClass(TimeKeeper, [{
            key: "update",
            value: function update() {
                var now = Date.now() / 1000;
                this.delta = now - this.lastTime;
                this.frameTime += this.delta;
                this.totalTime += this.delta;
                if (this.delta > this.maxDelta) this.delta = this.maxDelta;
                this.lastTime = now;
                this.frameCount++;
                if (this.frameTime > 1) {
                    this.framesPerSecond = this.frameCount / this.frameTime;
                    this.frameTime = 0;
                    this.frameCount = 0;
                }
            }
        }]);

        return TimeKeeper;
    }();

    spine.TimeKeeper = TimeKeeper;

    var WindowedMean = function () {
        function WindowedMean() {
            var windowSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;

            _classCallCheck(this, WindowedMean);

            this.addedValues = 0;
            this.lastValue = 0;
            this.mean = 0;
            this.dirty = true;
            this.values = new Array(windowSize);
        }

        _createClass(WindowedMean, [{
            key: "hasEnoughData",
            value: function hasEnoughData() {
                return this.addedValues >= this.values.length;
            }
        }, {
            key: "addValue",
            value: function addValue(value) {
                if (this.addedValues < this.values.length) this.addedValues++;
                this.values[this.lastValue++] = value;
                if (this.lastValue > this.values.length - 1) this.lastValue = 0;
                this.dirty = true;
            }
        }, {
            key: "getMean",
            value: function getMean() {
                if (this.hasEnoughData()) {
                    if (this.dirty) {
                        var mean = 0;
                        for (var i = 0; i < this.values.length; i++) {
                            mean += this.values[i];
                        }
                        this.mean = mean / this.values.length;
                        this.dirty = false;
                    }
                    return this.mean;
                } else {
                    return 0;
                }
            }
        }]);

        return WindowedMean;
    }();

    spine.WindowedMean = WindowedMean;
})(spine || (spine = {}));
})