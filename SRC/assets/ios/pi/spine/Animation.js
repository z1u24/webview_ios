_$define("pi/spine/Animation", function (require, exports, module){
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
    var Animation = function () {
        function Animation(name, timelines, duration) {
            _classCallCheck(this, Animation);

            if (name == null) throw new Error("name cannot be null.");
            if (timelines == null) throw new Error("timelines cannot be null.");
            this.name = name;
            this.timelines = timelines;
            this.duration = duration;
        }

        _createClass(Animation, [{
            key: "apply",
            value: function apply(skeleton, lastTime, time, loop, events, alpha, pose, direction) {
                if (skeleton == null) throw new Error("skeleton cannot be null.");
                if (loop && this.duration != 0) {
                    time %= this.duration;
                    if (lastTime > 0) lastTime %= this.duration;
                }
                var timelines = this.timelines;
                for (var i = 0, n = timelines.length; i < n; i++) {
                    timelines[i].apply(skeleton, lastTime, time, events, alpha, pose, direction);
                }
            }
        }], [{
            key: "binarySearch",
            value: function binarySearch(values, target) {
                var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

                var low = 0;
                var high = values.length / step - 2;
                if (high == 0) return step;
                var current = high >>> 1;
                while (true) {
                    if (values[(current + 1) * step] <= target) low = current + 1;else high = current;
                    if (low == high) return (low + 1) * step;
                    current = low + high >>> 1;
                }
            }
        }, {
            key: "linearSearch",
            value: function linearSearch(values, target, step) {
                for (var i = 0, last = values.length - step; i <= last; i += step) {
                    if (values[i] > target) return i;
                }return -1;
            }
        }]);

        return Animation;
    }();

    spine.Animation = Animation;
    var MixPose = void 0;
    (function (MixPose) {
        MixPose[MixPose["setup"] = 0] = "setup";
        MixPose[MixPose["current"] = 1] = "current";
        MixPose[MixPose["currentLayered"] = 2] = "currentLayered";
    })(MixPose = spine.MixPose || (spine.MixPose = {}));
    var MixDirection = void 0;
    (function (MixDirection) {
        MixDirection[MixDirection["in"] = 0] = "in";
        MixDirection[MixDirection["out"] = 1] = "out";
    })(MixDirection = spine.MixDirection || (spine.MixDirection = {}));
    var TimelineType = void 0;
    (function (TimelineType) {
        TimelineType[TimelineType["rotate"] = 0] = "rotate";
        TimelineType[TimelineType["translate"] = 1] = "translate";
        TimelineType[TimelineType["scale"] = 2] = "scale";
        TimelineType[TimelineType["shear"] = 3] = "shear";
        TimelineType[TimelineType["attachment"] = 4] = "attachment";
        TimelineType[TimelineType["color"] = 5] = "color";
        TimelineType[TimelineType["deform"] = 6] = "deform";
        TimelineType[TimelineType["event"] = 7] = "event";
        TimelineType[TimelineType["drawOrder"] = 8] = "drawOrder";
        TimelineType[TimelineType["ikConstraint"] = 9] = "ikConstraint";
        TimelineType[TimelineType["transformConstraint"] = 10] = "transformConstraint";
        TimelineType[TimelineType["pathConstraintPosition"] = 11] = "pathConstraintPosition";
        TimelineType[TimelineType["pathConstraintSpacing"] = 12] = "pathConstraintSpacing";
        TimelineType[TimelineType["pathConstraintMix"] = 13] = "pathConstraintMix";
        TimelineType[TimelineType["twoColor"] = 14] = "twoColor";
    })(TimelineType = spine.TimelineType || (spine.TimelineType = {}));

    var CurveTimeline = function () {
        function CurveTimeline(frameCount) {
            _classCallCheck(this, CurveTimeline);

            if (frameCount <= 0) throw new Error("frameCount must be > 0: " + frameCount);
            this.curves = Utils.newFloatArray((frameCount - 1) * CurveTimeline.BEZIER_SIZE);
        }

        _createClass(CurveTimeline, [{
            key: "getFrameCount",
            value: function getFrameCount() {
                return this.curves.length / CurveTimeline.BEZIER_SIZE + 1;
            }
        }, {
            key: "setLinear",
            value: function setLinear(frameIndex) {
                this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.LINEAR;
            }
        }, {
            key: "setStepped",
            value: function setStepped(frameIndex) {
                this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.STEPPED;
            }
        }, {
            key: "getCurveType",
            value: function getCurveType(frameIndex) {
                var index = frameIndex * CurveTimeline.BEZIER_SIZE;
                if (index == this.curves.length) return CurveTimeline.LINEAR;
                var type = this.curves[index];
                if (type == CurveTimeline.LINEAR) return CurveTimeline.LINEAR;
                if (type == CurveTimeline.STEPPED) return CurveTimeline.STEPPED;
                return CurveTimeline.BEZIER;
            }
            /** Sets the control handle positions for an interpolation bezier curve used to transition from this keyframe to the next.
             * cx1 and cx2 are from 0 to 1, representing the percent of time between the two keyframes. cy1 and cy2 are the percent of
             * the difference between the keyframe's values. */

        }, {
            key: "setCurve",
            value: function setCurve(frameIndex, cx1, cy1, cx2, cy2) {
                var tmpx = (-cx1 * 2 + cx2) * 0.03,
                    tmpy = (-cy1 * 2 + cy2) * 0.03;
                var dddfx = ((cx1 - cx2) * 3 + 1) * 0.006,
                    dddfy = ((cy1 - cy2) * 3 + 1) * 0.006;
                var ddfx = tmpx * 2 + dddfx,
                    ddfy = tmpy * 2 + dddfy;
                var dfx = cx1 * 0.3 + tmpx + dddfx * 0.16666667,
                    dfy = cy1 * 0.3 + tmpy + dddfy * 0.16666667;
                var i = frameIndex * CurveTimeline.BEZIER_SIZE;
                var curves = this.curves;
                curves[i++] = CurveTimeline.BEZIER;
                var x = dfx,
                    y = dfy;
                for (var n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
                    curves[i] = x;
                    curves[i + 1] = y;
                    dfx += ddfx;
                    dfy += ddfy;
                    ddfx += dddfx;
                    ddfy += dddfy;
                    x += dfx;
                    y += dfy;
                }
            }
        }, {
            key: "getCurvePercent",
            value: function getCurvePercent(frameIndex, percent) {
                percent = MathUtils.clamp(percent, 0, 1);
                var curves = this.curves;
                var i = frameIndex * CurveTimeline.BEZIER_SIZE;
                var type = curves[i];
                if (type == CurveTimeline.LINEAR) return percent;
                if (type == CurveTimeline.STEPPED) return 0;
                i++;
                var x = 0;
                for (var start = i, n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
                    x = curves[i];
                    if (x >= percent) {
                        var prevX = void 0,
                            prevY = void 0;
                        if (i == start) {
                            prevX = 0;
                            prevY = 0;
                        } else {
                            prevX = curves[i - 2];
                            prevY = curves[i - 1];
                        }
                        return prevY + (curves[i + 1] - prevY) * (percent - prevX) / (x - prevX);
                    }
                }
                var y = curves[i - 1];
                return y + (1 - y) * (percent - x) / (1 - x); // Last point is 1,1.
            }
        }]);

        return CurveTimeline;
    }();

    CurveTimeline.LINEAR = 0;
    CurveTimeline.STEPPED = 1;
    CurveTimeline.BEZIER = 2;
    CurveTimeline.BEZIER_SIZE = 10 * 2 - 1;
    spine.CurveTimeline = CurveTimeline;

    var RotateTimeline = function (_CurveTimeline) {
        _inherits(RotateTimeline, _CurveTimeline);

        function RotateTimeline(frameCount) {
            _classCallCheck(this, RotateTimeline);

            var _this = _possibleConstructorReturn(this, (RotateTimeline.__proto__ || Object.getPrototypeOf(RotateTimeline)).call(this, frameCount));

            _this.frames = Utils.newFloatArray(frameCount << 1);
            return _this;
        }

        _createClass(RotateTimeline, [{
            key: "getPropertyId",
            value: function getPropertyId() {
                return (TimelineType.rotate << 24) + this.boneIndex;
            }
            /** Sets the time and angle of the specified keyframe. */

        }, {
            key: "setFrame",
            value: function setFrame(frameIndex, time, degrees) {
                frameIndex <<= 1;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + RotateTimeline.ROTATION] = degrees;
            }
        }, {
            key: "apply",
            value: function apply(skeleton, lastTime, time, events, alpha, pose, direction) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            bone.rotation = bone.data.rotation;
                            return;
                        case MixPose.current:
                            var _r = bone.data.rotation - bone.rotation;
                            _r -= (16384 - (16384.499999999996 - _r / 360 | 0)) * 360;
                            bone.rotation += _r * alpha;
                    }
                    return;
                }
                if (time >= frames[frames.length - RotateTimeline.ENTRIES]) {
                    // Time is after last frame.
                    if (pose == MixPose.setup) bone.rotation = bone.data.rotation + frames[frames.length + RotateTimeline.PREV_ROTATION] * alpha;else {
                        var _r2 = bone.data.rotation + frames[frames.length + RotateTimeline.PREV_ROTATION] - bone.rotation;
                        _r2 -= (16384 - (16384.499999999996 - _r2 / 360 | 0)) * 360; // Wrap within -180 and 180.
                        bone.rotation += _r2 * alpha;
                    }
                    return;
                }
                // Interpolate between the previous frame and the current frame.
                var frame = Animation.binarySearch(frames, time, RotateTimeline.ENTRIES);
                var prevRotation = frames[frame + RotateTimeline.PREV_ROTATION];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / (frames[frame + RotateTimeline.PREV_TIME] - frameTime));
                var r = frames[frame + RotateTimeline.ROTATION] - prevRotation;
                r -= (16384 - (16384.499999999996 - r / 360 | 0)) * 360;
                r = prevRotation + r * percent;
                if (pose == MixPose.setup) {
                    r -= (16384 - (16384.499999999996 - r / 360 | 0)) * 360;
                    bone.rotation = bone.data.rotation + r * alpha;
                } else {
                    r = bone.data.rotation + r - bone.rotation;
                    r -= (16384 - (16384.499999999996 - r / 360 | 0)) * 360;
                    bone.rotation += r * alpha;
                }
            }
        }]);

        return RotateTimeline;
    }(CurveTimeline);

    RotateTimeline.ENTRIES = 2;
    RotateTimeline.PREV_TIME = -2;
    RotateTimeline.PREV_ROTATION = -1;
    RotateTimeline.ROTATION = 1;
    spine.RotateTimeline = RotateTimeline;

    var TranslateTimeline = function (_CurveTimeline2) {
        _inherits(TranslateTimeline, _CurveTimeline2);

        function TranslateTimeline(frameCount) {
            _classCallCheck(this, TranslateTimeline);

            var _this2 = _possibleConstructorReturn(this, (TranslateTimeline.__proto__ || Object.getPrototypeOf(TranslateTimeline)).call(this, frameCount));

            _this2.frames = Utils.newFloatArray(frameCount * TranslateTimeline.ENTRIES);
            return _this2;
        }

        _createClass(TranslateTimeline, [{
            key: "getPropertyId",
            value: function getPropertyId() {
                return (TimelineType.translate << 24) + this.boneIndex;
            }
            /** Sets the time and value of the specified keyframe. */

        }, {
            key: "setFrame",
            value: function setFrame(frameIndex, time, x, y) {
                frameIndex *= TranslateTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + TranslateTimeline.X] = x;
                this.frames[frameIndex + TranslateTimeline.Y] = y;
            }
        }, {
            key: "apply",
            value: function apply(skeleton, lastTime, time, events, alpha, pose, direction) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            bone.x = bone.data.x;
                            bone.y = bone.data.y;
                            return;
                        case MixPose.current:
                            bone.x += (bone.data.x - bone.x) * alpha;
                            bone.y += (bone.data.y - bone.y) * alpha;
                    }
                    return;
                }
                var x = 0,
                    y = 0;
                if (time >= frames[frames.length - TranslateTimeline.ENTRIES]) {
                    // Time is after last frame.
                    x = frames[frames.length + TranslateTimeline.PREV_X];
                    y = frames[frames.length + TranslateTimeline.PREV_Y];
                } else {
                    // Interpolate between the previous frame and the current frame.
                    var frame = Animation.binarySearch(frames, time, TranslateTimeline.ENTRIES);
                    x = frames[frame + TranslateTimeline.PREV_X];
                    y = frames[frame + TranslateTimeline.PREV_Y];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / TranslateTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TranslateTimeline.PREV_TIME] - frameTime));
                    x += (frames[frame + TranslateTimeline.X] - x) * percent;
                    y += (frames[frame + TranslateTimeline.Y] - y) * percent;
                }
                if (pose == MixPose.setup) {
                    bone.x = bone.data.x + x * alpha;
                    bone.y = bone.data.y + y * alpha;
                } else {
                    bone.x += (bone.data.x + x - bone.x) * alpha;
                    bone.y += (bone.data.y + y - bone.y) * alpha;
                }
            }
        }]);

        return TranslateTimeline;
    }(CurveTimeline);

    TranslateTimeline.ENTRIES = 3;
    TranslateTimeline.PREV_TIME = -3;
    TranslateTimeline.PREV_X = -2;
    TranslateTimeline.PREV_Y = -1;
    TranslateTimeline.X = 1;
    TranslateTimeline.Y = 2;
    spine.TranslateTimeline = TranslateTimeline;

    var ScaleTimeline = function (_TranslateTimeline) {
        _inherits(ScaleTimeline, _TranslateTimeline);

        function ScaleTimeline(frameCount) {
            _classCallCheck(this, ScaleTimeline);

            return _possibleConstructorReturn(this, (ScaleTimeline.__proto__ || Object.getPrototypeOf(ScaleTimeline)).call(this, frameCount));
        }

        _createClass(ScaleTimeline, [{
            key: "getPropertyId",
            value: function getPropertyId() {
                return (TimelineType.scale << 24) + this.boneIndex;
            }
        }, {
            key: "apply",
            value: function apply(skeleton, lastTime, time, events, alpha, pose, direction) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            bone.scaleX = bone.data.scaleX;
                            bone.scaleY = bone.data.scaleY;
                            return;
                        case MixPose.current:
                            bone.scaleX += (bone.data.scaleX - bone.scaleX) * alpha;
                            bone.scaleY += (bone.data.scaleY - bone.scaleY) * alpha;
                    }
                    return;
                }
                var x = 0,
                    y = 0;
                if (time >= frames[frames.length - ScaleTimeline.ENTRIES]) {
                    // Time is after last frame.
                    x = frames[frames.length + ScaleTimeline.PREV_X] * bone.data.scaleX;
                    y = frames[frames.length + ScaleTimeline.PREV_Y] * bone.data.scaleY;
                } else {
                    // Interpolate between the previous frame and the current frame.
                    var frame = Animation.binarySearch(frames, time, ScaleTimeline.ENTRIES);
                    x = frames[frame + ScaleTimeline.PREV_X];
                    y = frames[frame + ScaleTimeline.PREV_Y];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / ScaleTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ScaleTimeline.PREV_TIME] - frameTime));
                    x = (x + (frames[frame + ScaleTimeline.X] - x) * percent) * bone.data.scaleX;
                    y = (y + (frames[frame + ScaleTimeline.Y] - y) * percent) * bone.data.scaleY;
                }
                if (alpha == 1) {
                    bone.scaleX = x;
                    bone.scaleY = y;
                } else {
                    var bx = 0,
                        by = 0;
                    if (pose == MixPose.setup) {
                        bx = bone.data.scaleX;
                        by = bone.data.scaleY;
                    } else {
                        bx = bone.scaleX;
                        by = bone.scaleY;
                    }
                    // Mixing out uses sign of setup or current pose, else use sign of key.
                    if (direction == MixDirection.out) {
                        x = Math.abs(x) * MathUtils.signum(bx);
                        y = Math.abs(y) * MathUtils.signum(by);
                    } else {
                        bx = Math.abs(bx) * MathUtils.signum(x);
                        by = Math.abs(by) * MathUtils.signum(y);
                    }
                    bone.scaleX = bx + (x - bx) * alpha;
                    bone.scaleY = by + (y - by) * alpha;
                }
            }
        }]);

        return ScaleTimeline;
    }(TranslateTimeline);

    spine.ScaleTimeline = ScaleTimeline;

    var ShearTimeline = function (_TranslateTimeline2) {
        _inherits(ShearTimeline, _TranslateTimeline2);

        function ShearTimeline(frameCount) {
            _classCallCheck(this, ShearTimeline);

            return _possibleConstructorReturn(this, (ShearTimeline.__proto__ || Object.getPrototypeOf(ShearTimeline)).call(this, frameCount));
        }

        _createClass(ShearTimeline, [{
            key: "getPropertyId",
            value: function getPropertyId() {
                return (TimelineType.shear << 24) + this.boneIndex;
            }
        }, {
            key: "apply",
            value: function apply(skeleton, lastTime, time, events, alpha, pose, direction) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            bone.shearX = bone.data.shearX;
                            bone.shearY = bone.data.shearY;
                            return;
                        case MixPose.current:
                            bone.shearX += (bone.data.shearX - bone.shearX) * alpha;
                            bone.shearY += (bone.data.shearY - bone.shearY) * alpha;
                    }
                    return;
                }
                var x = 0,
                    y = 0;
                if (time >= frames[frames.length - ShearTimeline.ENTRIES]) {
                    // Time is after last frame.
                    x = frames[frames.length + ShearTimeline.PREV_X];
                    y = frames[frames.length + ShearTimeline.PREV_Y];
                } else {
                    // Interpolate between the previous frame and the current frame.
                    var frame = Animation.binarySearch(frames, time, ShearTimeline.ENTRIES);
                    x = frames[frame + ShearTimeline.PREV_X];
                    y = frames[frame + ShearTimeline.PREV_Y];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / ShearTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ShearTimeline.PREV_TIME] - frameTime));
                    x = x + (frames[frame + ShearTimeline.X] - x) * percent;
                    y = y + (frames[frame + ShearTimeline.Y] - y) * percent;
                }
                if (pose == MixPose.setup) {
                    bone.shearX = bone.data.shearX + x * alpha;
                    bone.shearY = bone.data.shearY + y * alpha;
                } else {
                    bone.shearX += (bone.data.shearX + x - bone.shearX) * alpha;
                    bone.shearY += (bone.data.shearY + y - bone.shearY) * alpha;
                }
            }
        }]);

        return ShearTimeline;
    }(TranslateTimeline);

    spine.ShearTimeline = ShearTimeline;

    var ColorTimeline = function (_CurveTimeline3) {
        _inherits(ColorTimeline, _CurveTimeline3);

        function ColorTimeline(frameCount) {
            _classCallCheck(this, ColorTimeline);

            var _this5 = _possibleConstructorReturn(this, (ColorTimeline.__proto__ || Object.getPrototypeOf(ColorTimeline)).call(this, frameCount));

            _this5.frames = Utils.newFloatArray(frameCount * ColorTimeline.ENTRIES);
            return _this5;
        }

        _createClass(ColorTimeline, [{
            key: "getPropertyId",
            value: function getPropertyId() {
                return (TimelineType.color << 24) + this.slotIndex;
            }
            /** Sets the time and value of the specified keyframe. */

        }, {
            key: "setFrame",
            value: function setFrame(frameIndex, time, r, g, b, a) {
                frameIndex *= ColorTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + ColorTimeline.R] = r;
                this.frames[frameIndex + ColorTimeline.G] = g;
                this.frames[frameIndex + ColorTimeline.B] = b;
                this.frames[frameIndex + ColorTimeline.A] = a;
            }
        }, {
            key: "apply",
            value: function apply(skeleton, lastTime, time, events, alpha, pose, direction) {
                var slot = skeleton.slots[this.slotIndex];
                var frames = this.frames;
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            slot.color.setFromColor(slot.data.color);
                            return;
                        case MixPose.current:
                            var color = slot.color,
                                setup = slot.data.color;
                            color.add((setup.r - color.r) * alpha, (setup.g - color.g) * alpha, (setup.b - color.b) * alpha, (setup.a - color.a) * alpha);
                    }
                    return;
                }
                var r = 0,
                    g = 0,
                    b = 0,
                    a = 0;
                if (time >= frames[frames.length - ColorTimeline.ENTRIES]) {
                    // Time is after last frame.
                    var i = frames.length;
                    r = frames[i + ColorTimeline.PREV_R];
                    g = frames[i + ColorTimeline.PREV_G];
                    b = frames[i + ColorTimeline.PREV_B];
                    a = frames[i + ColorTimeline.PREV_A];
                } else {
                    // Interpolate between the previous frame and the current frame.
                    var frame = Animation.binarySearch(frames, time, ColorTimeline.ENTRIES);
                    r = frames[frame + ColorTimeline.PREV_R];
                    g = frames[frame + ColorTimeline.PREV_G];
                    b = frames[frame + ColorTimeline.PREV_B];
                    a = frames[frame + ColorTimeline.PREV_A];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / ColorTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ColorTimeline.PREV_TIME] - frameTime));
                    r += (frames[frame + ColorTimeline.R] - r) * percent;
                    g += (frames[frame + ColorTimeline.G] - g) * percent;
                    b += (frames[frame + ColorTimeline.B] - b) * percent;
                    a += (frames[frame + ColorTimeline.A] - a) * percent;
                }
                if (alpha == 1) slot.color.set(r, g, b, a);else {
                    var _color = slot.color;
                    if (pose == MixPose.setup) _color.setFromColor(slot.data.color);
                    _color.add((r - _color.r) * alpha, (g - _color.g) * alpha, (b - _color.b) * alpha, (a - _color.a) * alpha);
                }
            }
        }]);

        return ColorTimeline;
    }(CurveTimeline);

    ColorTimeline.ENTRIES = 5;
    ColorTimeline.PREV_TIME = -5;
    ColorTimeline.PREV_R = -4;
    ColorTimeline.PREV_G = -3;
    ColorTimeline.PREV_B = -2;
    ColorTimeline.PREV_A = -1;
    ColorTimeline.R = 1;
    ColorTimeline.G = 2;
    ColorTimeline.B = 3;
    ColorTimeline.A = 4;
    spine.ColorTimeline = ColorTimeline;

    var TwoColorTimeline = function (_CurveTimeline4) {
        _inherits(TwoColorTimeline, _CurveTimeline4);

        function TwoColorTimeline(frameCount) {
            _classCallCheck(this, TwoColorTimeline);

            var _this6 = _possibleConstructorReturn(this, (TwoColorTimeline.__proto__ || Object.getPrototypeOf(TwoColorTimeline)).call(this, frameCount));

            _this6.frames = Utils.newFloatArray(frameCount * TwoColorTimeline.ENTRIES);
            return _this6;
        }

        _createClass(TwoColorTimeline, [{
            key: "getPropertyId",
            value: function getPropertyId() {
                return (TimelineType.twoColor << 24) + this.slotIndex;
            }
            /** Sets the time and value of the specified keyframe. */

        }, {
            key: "setFrame",
            value: function setFrame(frameIndex, time, r, g, b, a, r2, g2, b2) {
                frameIndex *= TwoColorTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + TwoColorTimeline.R] = r;
                this.frames[frameIndex + TwoColorTimeline.G] = g;
                this.frames[frameIndex + TwoColorTimeline.B] = b;
                this.frames[frameIndex + TwoColorTimeline.A] = a;
                this.frames[frameIndex + TwoColorTimeline.R2] = r2;
                this.frames[frameIndex + TwoColorTimeline.G2] = g2;
                this.frames[frameIndex + TwoColorTimeline.B2] = b2;
            }
        }, {
            key: "apply",
            value: function apply(skeleton, lastTime, time, events, alpha, pose, direction) {
                var slot = skeleton.slots[this.slotIndex];
                var frames = this.frames;
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            slot.color.setFromColor(slot.data.color);
                            slot.darkColor.setFromColor(slot.data.darkColor);
                            return;
                        case MixPose.current:
                            var light = slot.color,
                                dark = slot.darkColor,
                                setupLight = slot.data.color,
                                setupDark = slot.data.darkColor;
                            light.add((setupLight.r - light.r) * alpha, (setupLight.g - light.g) * alpha, (setupLight.b - light.b) * alpha, (setupLight.a - light.a) * alpha);
                            dark.add((setupDark.r - dark.r) * alpha, (setupDark.g - dark.g) * alpha, (setupDark.b - dark.b) * alpha, 0);
                    }
                    return;
                }
                var r = 0,
                    g = 0,
                    b = 0,
                    a = 0,
                    r2 = 0,
                    g2 = 0,
                    b2 = 0;
                if (time >= frames[frames.length - TwoColorTimeline.ENTRIES]) {
                    // Time is after last frame.
                    var i = frames.length;
                    r = frames[i + TwoColorTimeline.PREV_R];
                    g = frames[i + TwoColorTimeline.PREV_G];
                    b = frames[i + TwoColorTimeline.PREV_B];
                    a = frames[i + TwoColorTimeline.PREV_A];
                    r2 = frames[i + TwoColorTimeline.PREV_R2];
                    g2 = frames[i + TwoColorTimeline.PREV_G2];
                    b2 = frames[i + TwoColorTimeline.PREV_B2];
                } else {
                    // Interpolate between the previous frame and the current frame.
                    var frame = Animation.binarySearch(frames, time, TwoColorTimeline.ENTRIES);
                    r = frames[frame + TwoColorTimeline.PREV_R];
                    g = frames[frame + TwoColorTimeline.PREV_G];
                    b = frames[frame + TwoColorTimeline.PREV_B];
                    a = frames[frame + TwoColorTimeline.PREV_A];
                    r2 = frames[frame + TwoColorTimeline.PREV_R2];
                    g2 = frames[frame + TwoColorTimeline.PREV_G2];
                    b2 = frames[frame + TwoColorTimeline.PREV_B2];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / TwoColorTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TwoColorTimeline.PREV_TIME] - frameTime));
                    r += (frames[frame + TwoColorTimeline.R] - r) * percent;
                    g += (frames[frame + TwoColorTimeline.G] - g) * percent;
                    b += (frames[frame + TwoColorTimeline.B] - b) * percent;
                    a += (frames[frame + TwoColorTimeline.A] - a) * percent;
                    r2 += (frames[frame + TwoColorTimeline.R2] - r2) * percent;
                    g2 += (frames[frame + TwoColorTimeline.G2] - g2) * percent;
                    b2 += (frames[frame + TwoColorTimeline.B2] - b2) * percent;
                }
                if (alpha == 1) {
                    slot.color.set(r, g, b, a);
                    slot.darkColor.set(r2, g2, b2, 1);
                } else {
                    var _light = slot.color,
                        _dark = slot.darkColor;
                    if (pose == MixPose.setup) {
                        _light.setFromColor(slot.data.color);
                        _dark.setFromColor(slot.data.darkColor);
                    }
                    _light.add((r - _light.r) * alpha, (g - _light.g) * alpha, (b - _light.b) * alpha, (a - _light.a) * alpha);
                    _dark.add((r2 - _dark.r) * alpha, (g2 - _dark.g) * alpha, (b2 - _dark.b) * alpha, 0);
                }
            }
        }]);

        return TwoColorTimeline;
    }(CurveTimeline);

    TwoColorTimeline.ENTRIES = 8;
    TwoColorTimeline.PREV_TIME = -8;
    TwoColorTimeline.PREV_R = -7;
    TwoColorTimeline.PREV_G = -6;
    TwoColorTimeline.PREV_B = -5;
    TwoColorTimeline.PREV_A = -4;
    TwoColorTimeline.PREV_R2 = -3;
    TwoColorTimeline.PREV_G2 = -2;
    TwoColorTimeline.PREV_B2 = -1;
    TwoColorTimeline.R = 1;
    TwoColorTimeline.G = 2;
    TwoColorTimeline.B = 3;
    TwoColorTimeline.A = 4;
    TwoColorTimeline.R2 = 5;
    TwoColorTimeline.G2 = 6;
    TwoColorTimeline.B2 = 7;
    spine.TwoColorTimeline = TwoColorTimeline;

    var AttachmentTimeline = function () {
        function AttachmentTimeline(frameCount) {
            _classCallCheck(this, AttachmentTimeline);

            this.frames = Utils.newFloatArray(frameCount);
            this.attachmentNames = new Array(frameCount);
        }

        _createClass(AttachmentTimeline, [{
            key: "getPropertyId",
            value: function getPropertyId() {
                return (TimelineType.attachment << 24) + this.slotIndex;
            }
        }, {
            key: "getFrameCount",
            value: function getFrameCount() {
                return this.frames.length;
            }
            /** Sets the time and value of the specified keyframe. */

        }, {
            key: "setFrame",
            value: function setFrame(frameIndex, time, attachmentName) {
                this.frames[frameIndex] = time;
                this.attachmentNames[frameIndex] = attachmentName;
            }
        }, {
            key: "apply",
            value: function apply(skeleton, lastTime, time, events, alpha, pose, direction) {
                var slot = skeleton.slots[this.slotIndex];
                if (direction == MixDirection.out && pose == MixPose.setup) {
                    var _attachmentName = slot.data.attachmentName;
                    slot.setAttachment(_attachmentName == null ? null : skeleton.getAttachment(this.slotIndex, _attachmentName));
                    return;
                }
                var frames = this.frames;
                if (time < frames[0]) {
                    if (pose == MixPose.setup) {
                        var _attachmentName2 = slot.data.attachmentName;
                        slot.setAttachment(_attachmentName2 == null ? null : skeleton.getAttachment(this.slotIndex, _attachmentName2));
                    }
                    return;
                }
                var frameIndex = 0;
                if (time >= frames[frames.length - 1]) // Time is after last frame.
                    frameIndex = frames.length - 1;else frameIndex = Animation.binarySearch(frames, time, 1) - 1;
                var attachmentName = this.attachmentNames[frameIndex];
                skeleton.slots[this.slotIndex].setAttachment(attachmentName == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName));
            }
        }]);

        return AttachmentTimeline;
    }();

    spine.AttachmentTimeline = AttachmentTimeline;
    var zeros = null;

    var DeformTimeline = function (_CurveTimeline5) {
        _inherits(DeformTimeline, _CurveTimeline5);

        function DeformTimeline(frameCount) {
            _classCallCheck(this, DeformTimeline);

            var _this7 = _possibleConstructorReturn(this, (DeformTimeline.__proto__ || Object.getPrototypeOf(DeformTimeline)).call(this, frameCount));

            _this7.frames = Utils.newFloatArray(frameCount);
            _this7.frameVertices = new Array(frameCount);
            if (zeros == null) zeros = Utils.newFloatArray(64);
            return _this7;
        }

        _createClass(DeformTimeline, [{
            key: "getPropertyId",
            value: function getPropertyId() {
                return (TimelineType.deform << 27) + +this.attachment.id + this.slotIndex;
            }
            /** Sets the time of the specified keyframe. */

        }, {
            key: "setFrame",
            value: function setFrame(frameIndex, time, vertices) {
                this.frames[frameIndex] = time;
                this.frameVertices[frameIndex] = vertices;
            }
        }, {
            key: "apply",
            value: function apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var slot = skeleton.slots[this.slotIndex];
                var slotAttachment = slot.getAttachment();
                if (!(slotAttachment instanceof VertexAttachment) || !slotAttachment.applyDeform(this.attachment)) return;
                var verticesArray = slot.attachmentVertices;
                if (verticesArray.length == 0) alpha = 1;
                var frameVertices = this.frameVertices;
                var vertexCount = frameVertices[0].length;
                var frames = this.frames;
                if (time < frames[0]) {
                    var vertexAttachment = slotAttachment;
                    switch (pose) {
                        case MixPose.setup:
                            verticesArray.length = 0;
                            return;
                        case MixPose.current:
                            if (alpha == 1) {
                                verticesArray.length = 0;
                                break;
                            }
                            var _vertices = Utils.setArraySize(verticesArray, vertexCount);
                            if (vertexAttachment.bones == null) {
                                // Unweighted vertex positions.
                                var setupVertices = vertexAttachment.vertices;
                                for (var i = 0; i < vertexCount; i++) {
                                    _vertices[i] += (setupVertices[i] - _vertices[i]) * alpha;
                                }
                            } else {
                                // Weighted deform offsets.
                                alpha = 1 - alpha;
                                for (var i = 0; i < vertexCount; i++) {
                                    _vertices[i] *= alpha;
                                }
                            }
                    }
                    return;
                }
                var vertices = Utils.setArraySize(verticesArray, vertexCount);
                if (time >= frames[frames.length - 1]) {
                    // Time is after last frame.
                    var lastVertices = frameVertices[frames.length - 1];
                    if (alpha == 1) {
                        Utils.arrayCopy(lastVertices, 0, vertices, 0, vertexCount);
                    } else if (pose == MixPose.setup) {
                        var _vertexAttachment = slotAttachment;
                        if (_vertexAttachment.bones == null) {
                            // Unweighted vertex positions, with alpha.
                            var _setupVertices = _vertexAttachment.vertices;
                            for (var _i = 0; _i < vertexCount; _i++) {
                                var setup = _setupVertices[_i];
                                vertices[_i] = setup + (lastVertices[_i] - setup) * alpha;
                            }
                        } else {
                            // Weighted deform offsets, with alpha.
                            for (var _i2 = 0; _i2 < vertexCount; _i2++) {
                                vertices[_i2] = lastVertices[_i2] * alpha;
                            }
                        }
                    } else {
                        for (var _i3 = 0; _i3 < vertexCount; _i3++) {
                            vertices[_i3] += (lastVertices[_i3] - vertices[_i3]) * alpha;
                        }
                    }
                    return;
                }
                // Interpolate between the previous frame and the current frame.
                var frame = Animation.binarySearch(frames, time);
                var prevVertices = frameVertices[frame - 1];
                var nextVertices = frameVertices[frame];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame - 1, 1 - (time - frameTime) / (frames[frame - 1] - frameTime));
                if (alpha == 1) {
                    for (var _i4 = 0; _i4 < vertexCount; _i4++) {
                        var prev = prevVertices[_i4];
                        vertices[_i4] = prev + (nextVertices[_i4] - prev) * percent;
                    }
                } else if (pose == MixPose.setup) {
                    var _vertexAttachment2 = slotAttachment;
                    if (_vertexAttachment2.bones == null) {
                        // Unweighted vertex positions, with alpha.
                        var _setupVertices2 = _vertexAttachment2.vertices;
                        for (var _i5 = 0; _i5 < vertexCount; _i5++) {
                            var _prev = prevVertices[_i5],
                                _setup = _setupVertices2[_i5];
                            vertices[_i5] = _setup + (_prev + (nextVertices[_i5] - _prev) * percent - _setup) * alpha;
                        }
                    } else {
                        // Weighted deform offsets, with alpha.
                        for (var _i6 = 0; _i6 < vertexCount; _i6++) {
                            var _prev2 = prevVertices[_i6];
                            vertices[_i6] = (_prev2 + (nextVertices[_i6] - _prev2) * percent) * alpha;
                        }
                    }
                } else {
                    // Vertex positions or deform offsets, with alpha.
                    for (var _i7 = 0; _i7 < vertexCount; _i7++) {
                        var _prev3 = prevVertices[_i7];
                        vertices[_i7] += (_prev3 + (nextVertices[_i7] - _prev3) * percent - vertices[_i7]) * alpha;
                    }
                }
            }
        }]);

        return DeformTimeline;
    }(CurveTimeline);

    spine.DeformTimeline = DeformTimeline;

    var EventTimeline = function () {
        function EventTimeline(frameCount) {
            _classCallCheck(this, EventTimeline);

            this.frames = Utils.newFloatArray(frameCount);
            this.events = new Array(frameCount);
        }

        _createClass(EventTimeline, [{
            key: "getPropertyId",
            value: function getPropertyId() {
                return TimelineType.event << 24;
            }
        }, {
            key: "getFrameCount",
            value: function getFrameCount() {
                return this.frames.length;
            }
            /** Sets the time of the specified keyframe. */

        }, {
            key: "setFrame",
            value: function setFrame(frameIndex, event) {
                this.frames[frameIndex] = event.time;
                this.events[frameIndex] = event;
            }
            /** Fires events for frames > lastTime and <= time. */

        }, {
            key: "apply",
            value: function apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                if (firedEvents == null) return;
                var frames = this.frames;
                var frameCount = this.frames.length;
                if (lastTime > time) {
                    // Fire events after last time for looped animations.
                    this.apply(skeleton, lastTime, Number.MAX_VALUE, firedEvents, alpha, pose, direction);
                    lastTime = -1;
                } else if (lastTime >= frames[frameCount - 1]) // Last time is after last frame.
                    return;
                if (time < frames[0]) return; // Time is before first frame.
                var frame = 0;
                if (lastTime < frames[0]) frame = 0;else {
                    frame = Animation.binarySearch(frames, lastTime);
                    var frameTime = frames[frame];
                    while (frame > 0) {
                        // Fire multiple events with the same frame.
                        if (frames[frame - 1] != frameTime) break;
                        frame--;
                    }
                }
                for (; frame < frameCount && time >= frames[frame]; frame++) {
                    firedEvents.push(this.events[frame]);
                }
            }
        }]);

        return EventTimeline;
    }();

    spine.EventTimeline = EventTimeline;

    var DrawOrderTimeline = function () {
        function DrawOrderTimeline(frameCount) {
            _classCallCheck(this, DrawOrderTimeline);

            this.frames = Utils.newFloatArray(frameCount);
            this.drawOrders = new Array(frameCount);
        }

        _createClass(DrawOrderTimeline, [{
            key: "getPropertyId",
            value: function getPropertyId() {
                return TimelineType.drawOrder << 24;
            }
        }, {
            key: "getFrameCount",
            value: function getFrameCount() {
                return this.frames.length;
            }
            /** Sets the time of the specified keyframe.
             * @param drawOrder May be null to use bind pose draw order. */

        }, {
            key: "setFrame",
            value: function setFrame(frameIndex, time, drawOrder) {
                this.frames[frameIndex] = time;
                this.drawOrders[frameIndex] = drawOrder;
            }
        }, {
            key: "apply",
            value: function apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var drawOrder = skeleton.drawOrder;
                var slots = skeleton.slots;
                if (direction == MixDirection.out && pose == MixPose.setup) {
                    Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                    return;
                }
                var frames = this.frames;
                if (time < frames[0]) {
                    if (pose == MixPose.setup) Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                    return;
                }
                var frame = 0;
                if (time >= frames[frames.length - 1]) // Time is after last frame.
                    frame = frames.length - 1;else frame = Animation.binarySearch(frames, time) - 1;
                var drawOrderToSetupIndex = this.drawOrders[frame];
                if (drawOrderToSetupIndex == null) Utils.arrayCopy(slots, 0, drawOrder, 0, slots.length);else {
                    for (var i = 0, n = drawOrderToSetupIndex.length; i < n; i++) {
                        drawOrder[i] = slots[drawOrderToSetupIndex[i]];
                    }
                }
            }
        }]);

        return DrawOrderTimeline;
    }();

    spine.DrawOrderTimeline = DrawOrderTimeline;

    var IkConstraintTimeline = function (_CurveTimeline6) {
        _inherits(IkConstraintTimeline, _CurveTimeline6);

        function IkConstraintTimeline(frameCount) {
            _classCallCheck(this, IkConstraintTimeline);

            var _this8 = _possibleConstructorReturn(this, (IkConstraintTimeline.__proto__ || Object.getPrototypeOf(IkConstraintTimeline)).call(this, frameCount));

            _this8.frames = Utils.newFloatArray(frameCount * IkConstraintTimeline.ENTRIES);
            return _this8;
        }

        _createClass(IkConstraintTimeline, [{
            key: "getPropertyId",
            value: function getPropertyId() {
                return (TimelineType.ikConstraint << 24) + this.ikConstraintIndex;
            }
            /** Sets the time, mix and bend direction of the specified keyframe. */

        }, {
            key: "setFrame",
            value: function setFrame(frameIndex, time, mix, bendDirection) {
                frameIndex *= IkConstraintTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + IkConstraintTimeline.MIX] = mix;
                this.frames[frameIndex + IkConstraintTimeline.BEND_DIRECTION] = bendDirection;
            }
        }, {
            key: "apply",
            value: function apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var frames = this.frames;
                var constraint = skeleton.ikConstraints[this.ikConstraintIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            constraint.mix = constraint.data.mix;
                            constraint.bendDirection = constraint.data.bendDirection;
                            return;
                        case MixPose.current:
                            constraint.mix += (constraint.data.mix - constraint.mix) * alpha;
                            constraint.bendDirection = constraint.data.bendDirection;
                    }
                    return;
                }
                if (time >= frames[frames.length - IkConstraintTimeline.ENTRIES]) {
                    // Time is after last frame.
                    if (pose == MixPose.setup) {
                        constraint.mix = constraint.data.mix + (frames[frames.length + IkConstraintTimeline.PREV_MIX] - constraint.data.mix) * alpha;
                        constraint.bendDirection = direction == MixDirection.out ? constraint.data.bendDirection : frames[frames.length + IkConstraintTimeline.PREV_BEND_DIRECTION];
                    } else {
                        constraint.mix += (frames[frames.length + IkConstraintTimeline.PREV_MIX] - constraint.mix) * alpha;
                        if (direction == MixDirection.in) constraint.bendDirection = frames[frames.length + IkConstraintTimeline.PREV_BEND_DIRECTION];
                    }
                    return;
                }
                // Interpolate between the previous frame and the current frame.
                var frame = Animation.binarySearch(frames, time, IkConstraintTimeline.ENTRIES);
                var mix = frames[frame + IkConstraintTimeline.PREV_MIX];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame / IkConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + IkConstraintTimeline.PREV_TIME] - frameTime));
                if (pose == MixPose.setup) {
                    constraint.mix = constraint.data.mix + (mix + (frames[frame + IkConstraintTimeline.MIX] - mix) * percent - constraint.data.mix) * alpha;
                    constraint.bendDirection = direction == MixDirection.out ? constraint.data.bendDirection : frames[frame + IkConstraintTimeline.PREV_BEND_DIRECTION];
                } else {
                    constraint.mix += (mix + (frames[frame + IkConstraintTimeline.MIX] - mix) * percent - constraint.mix) * alpha;
                    if (direction == MixDirection.in) constraint.bendDirection = frames[frame + IkConstraintTimeline.PREV_BEND_DIRECTION];
                }
            }
        }]);

        return IkConstraintTimeline;
    }(CurveTimeline);

    IkConstraintTimeline.ENTRIES = 3;
    IkConstraintTimeline.PREV_TIME = -3;
    IkConstraintTimeline.PREV_MIX = -2;
    IkConstraintTimeline.PREV_BEND_DIRECTION = -1;
    IkConstraintTimeline.MIX = 1;
    IkConstraintTimeline.BEND_DIRECTION = 2;
    spine.IkConstraintTimeline = IkConstraintTimeline;

    var TransformConstraintTimeline = function (_CurveTimeline7) {
        _inherits(TransformConstraintTimeline, _CurveTimeline7);

        function TransformConstraintTimeline(frameCount) {
            _classCallCheck(this, TransformConstraintTimeline);

            var _this9 = _possibleConstructorReturn(this, (TransformConstraintTimeline.__proto__ || Object.getPrototypeOf(TransformConstraintTimeline)).call(this, frameCount));

            _this9.frames = Utils.newFloatArray(frameCount * TransformConstraintTimeline.ENTRIES);
            return _this9;
        }

        _createClass(TransformConstraintTimeline, [{
            key: "getPropertyId",
            value: function getPropertyId() {
                return (TimelineType.transformConstraint << 24) + this.transformConstraintIndex;
            }
            /** Sets the time and mixes of the specified keyframe. */

        }, {
            key: "setFrame",
            value: function setFrame(frameIndex, time, rotateMix, translateMix, scaleMix, shearMix) {
                frameIndex *= TransformConstraintTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + TransformConstraintTimeline.ROTATE] = rotateMix;
                this.frames[frameIndex + TransformConstraintTimeline.TRANSLATE] = translateMix;
                this.frames[frameIndex + TransformConstraintTimeline.SCALE] = scaleMix;
                this.frames[frameIndex + TransformConstraintTimeline.SHEAR] = shearMix;
            }
        }, {
            key: "apply",
            value: function apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var frames = this.frames;
                var constraint = skeleton.transformConstraints[this.transformConstraintIndex];
                if (time < frames[0]) {
                    var data = constraint.data;
                    switch (pose) {
                        case MixPose.setup:
                            constraint.rotateMix = data.rotateMix;
                            constraint.translateMix = data.translateMix;
                            constraint.scaleMix = data.scaleMix;
                            constraint.shearMix = data.shearMix;
                            return;
                        case MixPose.current:
                            constraint.rotateMix += (data.rotateMix - constraint.rotateMix) * alpha;
                            constraint.translateMix += (data.translateMix - constraint.translateMix) * alpha;
                            constraint.scaleMix += (data.scaleMix - constraint.scaleMix) * alpha;
                            constraint.shearMix += (data.shearMix - constraint.shearMix) * alpha;
                    }
                    return;
                }
                var rotate = 0,
                    translate = 0,
                    scale = 0,
                    shear = 0;
                if (time >= frames[frames.length - TransformConstraintTimeline.ENTRIES]) {
                    // Time is after last frame.
                    var i = frames.length;
                    rotate = frames[i + TransformConstraintTimeline.PREV_ROTATE];
                    translate = frames[i + TransformConstraintTimeline.PREV_TRANSLATE];
                    scale = frames[i + TransformConstraintTimeline.PREV_SCALE];
                    shear = frames[i + TransformConstraintTimeline.PREV_SHEAR];
                } else {
                    // Interpolate between the previous frame and the current frame.
                    var frame = Animation.binarySearch(frames, time, TransformConstraintTimeline.ENTRIES);
                    rotate = frames[frame + TransformConstraintTimeline.PREV_ROTATE];
                    translate = frames[frame + TransformConstraintTimeline.PREV_TRANSLATE];
                    scale = frames[frame + TransformConstraintTimeline.PREV_SCALE];
                    shear = frames[frame + TransformConstraintTimeline.PREV_SHEAR];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / TransformConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TransformConstraintTimeline.PREV_TIME] - frameTime));
                    rotate += (frames[frame + TransformConstraintTimeline.ROTATE] - rotate) * percent;
                    translate += (frames[frame + TransformConstraintTimeline.TRANSLATE] - translate) * percent;
                    scale += (frames[frame + TransformConstraintTimeline.SCALE] - scale) * percent;
                    shear += (frames[frame + TransformConstraintTimeline.SHEAR] - shear) * percent;
                }
                if (pose == MixPose.setup) {
                    var _data = constraint.data;
                    constraint.rotateMix = _data.rotateMix + (rotate - _data.rotateMix) * alpha;
                    constraint.translateMix = _data.translateMix + (translate - _data.translateMix) * alpha;
                    constraint.scaleMix = _data.scaleMix + (scale - _data.scaleMix) * alpha;
                    constraint.shearMix = _data.shearMix + (shear - _data.shearMix) * alpha;
                } else {
                    constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
                    constraint.translateMix += (translate - constraint.translateMix) * alpha;
                    constraint.scaleMix += (scale - constraint.scaleMix) * alpha;
                    constraint.shearMix += (shear - constraint.shearMix) * alpha;
                }
            }
        }]);

        return TransformConstraintTimeline;
    }(CurveTimeline);

    TransformConstraintTimeline.ENTRIES = 5;
    TransformConstraintTimeline.PREV_TIME = -5;
    TransformConstraintTimeline.PREV_ROTATE = -4;
    TransformConstraintTimeline.PREV_TRANSLATE = -3;
    TransformConstraintTimeline.PREV_SCALE = -2;
    TransformConstraintTimeline.PREV_SHEAR = -1;
    TransformConstraintTimeline.ROTATE = 1;
    TransformConstraintTimeline.TRANSLATE = 2;
    TransformConstraintTimeline.SCALE = 3;
    TransformConstraintTimeline.SHEAR = 4;
    spine.TransformConstraintTimeline = TransformConstraintTimeline;

    var PathConstraintPositionTimeline = function (_CurveTimeline8) {
        _inherits(PathConstraintPositionTimeline, _CurveTimeline8);

        function PathConstraintPositionTimeline(frameCount) {
            _classCallCheck(this, PathConstraintPositionTimeline);

            var _this10 = _possibleConstructorReturn(this, (PathConstraintPositionTimeline.__proto__ || Object.getPrototypeOf(PathConstraintPositionTimeline)).call(this, frameCount));

            _this10.frames = Utils.newFloatArray(frameCount * PathConstraintPositionTimeline.ENTRIES);
            return _this10;
        }

        _createClass(PathConstraintPositionTimeline, [{
            key: "getPropertyId",
            value: function getPropertyId() {
                return (TimelineType.pathConstraintPosition << 24) + this.pathConstraintIndex;
            }
            /** Sets the time and value of the specified keyframe. */

        }, {
            key: "setFrame",
            value: function setFrame(frameIndex, time, value) {
                frameIndex *= PathConstraintPositionTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + PathConstraintPositionTimeline.VALUE] = value;
            }
        }, {
            key: "apply",
            value: function apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var frames = this.frames;
                var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            constraint.position = constraint.data.position;
                            return;
                        case MixPose.current:
                            constraint.position += (constraint.data.position - constraint.position) * alpha;
                    }
                    return;
                }
                var position = 0;
                if (time >= frames[frames.length - PathConstraintPositionTimeline.ENTRIES]) // Time is after last frame.
                    position = frames[frames.length + PathConstraintPositionTimeline.PREV_VALUE];else {
                    // Interpolate between the previous frame and the current frame.
                    var frame = Animation.binarySearch(frames, time, PathConstraintPositionTimeline.ENTRIES);
                    position = frames[frame + PathConstraintPositionTimeline.PREV_VALUE];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / PathConstraintPositionTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintPositionTimeline.PREV_TIME] - frameTime));
                    position += (frames[frame + PathConstraintPositionTimeline.VALUE] - position) * percent;
                }
                if (pose == MixPose.setup) constraint.position = constraint.data.position + (position - constraint.data.position) * alpha;else constraint.position += (position - constraint.position) * alpha;
            }
        }]);

        return PathConstraintPositionTimeline;
    }(CurveTimeline);

    PathConstraintPositionTimeline.ENTRIES = 2;
    PathConstraintPositionTimeline.PREV_TIME = -2;
    PathConstraintPositionTimeline.PREV_VALUE = -1;
    PathConstraintPositionTimeline.VALUE = 1;
    spine.PathConstraintPositionTimeline = PathConstraintPositionTimeline;

    var PathConstraintSpacingTimeline = function (_PathConstraintPositi) {
        _inherits(PathConstraintSpacingTimeline, _PathConstraintPositi);

        function PathConstraintSpacingTimeline(frameCount) {
            _classCallCheck(this, PathConstraintSpacingTimeline);

            return _possibleConstructorReturn(this, (PathConstraintSpacingTimeline.__proto__ || Object.getPrototypeOf(PathConstraintSpacingTimeline)).call(this, frameCount));
        }

        _createClass(PathConstraintSpacingTimeline, [{
            key: "getPropertyId",
            value: function getPropertyId() {
                return (TimelineType.pathConstraintSpacing << 24) + this.pathConstraintIndex;
            }
        }, {
            key: "apply",
            value: function apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var frames = this.frames;
                var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            constraint.spacing = constraint.data.spacing;
                            return;
                        case MixPose.current:
                            constraint.spacing += (constraint.data.spacing - constraint.spacing) * alpha;
                    }
                    return;
                }
                var spacing = 0;
                if (time >= frames[frames.length - PathConstraintSpacingTimeline.ENTRIES]) // Time is after last frame.
                    spacing = frames[frames.length + PathConstraintSpacingTimeline.PREV_VALUE];else {
                    // Interpolate between the previous frame and the current frame.
                    var frame = Animation.binarySearch(frames, time, PathConstraintSpacingTimeline.ENTRIES);
                    spacing = frames[frame + PathConstraintSpacingTimeline.PREV_VALUE];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / PathConstraintSpacingTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintSpacingTimeline.PREV_TIME] - frameTime));
                    spacing += (frames[frame + PathConstraintSpacingTimeline.VALUE] - spacing) * percent;
                }
                if (pose == MixPose.setup) constraint.spacing = constraint.data.spacing + (spacing - constraint.data.spacing) * alpha;else constraint.spacing += (spacing - constraint.spacing) * alpha;
            }
        }]);

        return PathConstraintSpacingTimeline;
    }(PathConstraintPositionTimeline);

    spine.PathConstraintSpacingTimeline = PathConstraintSpacingTimeline;

    var PathConstraintMixTimeline = function (_CurveTimeline9) {
        _inherits(PathConstraintMixTimeline, _CurveTimeline9);

        function PathConstraintMixTimeline(frameCount) {
            _classCallCheck(this, PathConstraintMixTimeline);

            var _this12 = _possibleConstructorReturn(this, (PathConstraintMixTimeline.__proto__ || Object.getPrototypeOf(PathConstraintMixTimeline)).call(this, frameCount));

            _this12.frames = Utils.newFloatArray(frameCount * PathConstraintMixTimeline.ENTRIES);
            return _this12;
        }

        _createClass(PathConstraintMixTimeline, [{
            key: "getPropertyId",
            value: function getPropertyId() {
                return (TimelineType.pathConstraintMix << 24) + this.pathConstraintIndex;
            }
            /** Sets the time and mixes of the specified keyframe. */

        }, {
            key: "setFrame",
            value: function setFrame(frameIndex, time, rotateMix, translateMix) {
                frameIndex *= PathConstraintMixTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + PathConstraintMixTimeline.ROTATE] = rotateMix;
                this.frames[frameIndex + PathConstraintMixTimeline.TRANSLATE] = translateMix;
            }
        }, {
            key: "apply",
            value: function apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var frames = this.frames;
                var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            constraint.rotateMix = constraint.data.rotateMix;
                            constraint.translateMix = constraint.data.translateMix;
                            return;
                        case MixPose.current:
                            constraint.rotateMix += (constraint.data.rotateMix - constraint.rotateMix) * alpha;
                            constraint.translateMix += (constraint.data.translateMix - constraint.translateMix) * alpha;
                    }
                    return;
                }
                var rotate = 0,
                    translate = 0;
                if (time >= frames[frames.length - PathConstraintMixTimeline.ENTRIES]) {
                    // Time is after last frame.
                    rotate = frames[frames.length + PathConstraintMixTimeline.PREV_ROTATE];
                    translate = frames[frames.length + PathConstraintMixTimeline.PREV_TRANSLATE];
                } else {
                    // Interpolate between the previous frame and the current frame.
                    var frame = Animation.binarySearch(frames, time, PathConstraintMixTimeline.ENTRIES);
                    rotate = frames[frame + PathConstraintMixTimeline.PREV_ROTATE];
                    translate = frames[frame + PathConstraintMixTimeline.PREV_TRANSLATE];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / PathConstraintMixTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintMixTimeline.PREV_TIME] - frameTime));
                    rotate += (frames[frame + PathConstraintMixTimeline.ROTATE] - rotate) * percent;
                    translate += (frames[frame + PathConstraintMixTimeline.TRANSLATE] - translate) * percent;
                }
                if (pose == MixPose.setup) {
                    constraint.rotateMix = constraint.data.rotateMix + (rotate - constraint.data.rotateMix) * alpha;
                    constraint.translateMix = constraint.data.translateMix + (translate - constraint.data.translateMix) * alpha;
                } else {
                    constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
                    constraint.translateMix += (translate - constraint.translateMix) * alpha;
                }
            }
        }]);

        return PathConstraintMixTimeline;
    }(CurveTimeline);

    PathConstraintMixTimeline.ENTRIES = 3;
    PathConstraintMixTimeline.PREV_TIME = -3;
    PathConstraintMixTimeline.PREV_ROTATE = -2;
    PathConstraintMixTimeline.PREV_TRANSLATE = -1;
    PathConstraintMixTimeline.ROTATE = 1;
    PathConstraintMixTimeline.TRANSLATE = 2;
    spine.PathConstraintMixTimeline = PathConstraintMixTimeline;
})(spine || (spine = {}));
})