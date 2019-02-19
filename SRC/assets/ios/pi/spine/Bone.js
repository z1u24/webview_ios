_$define("pi/spine/Bone", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    var Bone = function () {
        /** @param parent May be null. */
        function Bone(data, skeleton, parent) {
            _classCallCheck(this, Bone);

            this.children = new Array();
            this.x = 0;
            this.y = 0;
            this.rotation = 0;
            this.scaleX = 0;
            this.scaleY = 0;
            this.shearX = 0;
            this.shearY = 0;
            this.ax = 0;
            this.ay = 0;
            this.arotation = 0;
            this.ascaleX = 0;
            this.ascaleY = 0;
            this.ashearX = 0;
            this.ashearY = 0;
            this.appliedValid = false;
            this.a = 0;
            this.b = 0;
            this.worldX = 0;
            this.c = 0;
            this.d = 0;
            this.worldY = 0;
            this.sorted = false;
            if (data == null) throw new Error("data cannot be null.");
            if (skeleton == null) throw new Error("skeleton cannot be null.");
            this.data = data;
            this.skeleton = skeleton;
            this.parent = parent;
            this.setToSetupPose();
        }
        /** Same as {@link #updateWorldTransform()}. This method exists for Bone to implement {@link Updatable}. */


        _createClass(Bone, [{
            key: "update",
            value: function update() {
                this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
            }
            /** Computes the world transform using the parent bone and this bone's local transform. */

        }, {
            key: "updateWorldTransform",
            value: function updateWorldTransform() {
                this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
            }
            /** Computes the world transform using the parent bone and the specified local transform. */

        }, {
            key: "updateWorldTransformWith",
            value: function updateWorldTransformWith(x, y, rotation, scaleX, scaleY, shearX, shearY) {
                this.ax = x;
                this.ay = y;
                this.arotation = rotation;
                this.ascaleX = scaleX;
                this.ascaleY = scaleY;
                this.ashearX = shearX;
                this.ashearY = shearY;
                this.appliedValid = true;
                var parent = this.parent;
                if (parent == null) {
                    // Root bone.
                    var rotationY = rotation + 90 + shearY;
                    var la = MathUtils.cosDeg(rotation + shearX) * scaleX;
                    var lb = MathUtils.cosDeg(rotationY) * scaleY;
                    var lc = MathUtils.sinDeg(rotation + shearX) * scaleX;
                    var ld = MathUtils.sinDeg(rotationY) * scaleY;
                    var skeleton = this.skeleton;
                    if (skeleton.flipX) {
                        x = -x;
                        la = -la;
                        lb = -lb;
                    }
                    if (skeleton.flipY) {
                        y = -y;
                        lc = -lc;
                        ld = -ld;
                    }
                    this.a = la;
                    this.b = lb;
                    this.c = lc;
                    this.d = ld;
                    this.worldX = x + skeleton.x;
                    this.worldY = y + skeleton.y;
                    return;
                }
                var pa = parent.a,
                    pb = parent.b,
                    pc = parent.c,
                    pd = parent.d;
                this.worldX = pa * x + pb * y + parent.worldX;
                this.worldY = pc * x + pd * y + parent.worldY;
                switch (this.data.transformMode) {
                    case TransformMode.Normal:
                        {
                            var _rotationY = rotation + 90 + shearY;
                            var _la = MathUtils.cosDeg(rotation + shearX) * scaleX;
                            var _lb = MathUtils.cosDeg(_rotationY) * scaleY;
                            var _lc = MathUtils.sinDeg(rotation + shearX) * scaleX;
                            var _ld = MathUtils.sinDeg(_rotationY) * scaleY;
                            this.a = pa * _la + pb * _lc;
                            this.b = pa * _lb + pb * _ld;
                            this.c = pc * _la + pd * _lc;
                            this.d = pc * _lb + pd * _ld;
                            return;
                        }
                    case TransformMode.OnlyTranslation:
                        {
                            var _rotationY2 = rotation + 90 + shearY;
                            this.a = MathUtils.cosDeg(rotation + shearX) * scaleX;
                            this.b = MathUtils.cosDeg(_rotationY2) * scaleY;
                            this.c = MathUtils.sinDeg(rotation + shearX) * scaleX;
                            this.d = MathUtils.sinDeg(_rotationY2) * scaleY;
                            break;
                        }
                    case TransformMode.NoRotationOrReflection:
                        {
                            var s = pa * pa + pc * pc;
                            var prx = 0;
                            if (s > 0.0001) {
                                s = Math.abs(pa * pd - pb * pc) / s;
                                pb = pc * s;
                                pd = pa * s;
                                prx = Math.atan2(pc, pa) * MathUtils.radDeg;
                            } else {
                                pa = 0;
                                pc = 0;
                                prx = 90 - Math.atan2(pd, pb) * MathUtils.radDeg;
                            }
                            var rx = rotation + shearX - prx;
                            var ry = rotation + shearY - prx + 90;
                            var _la2 = MathUtils.cosDeg(rx) * scaleX;
                            var _lb2 = MathUtils.cosDeg(ry) * scaleY;
                            var _lc2 = MathUtils.sinDeg(rx) * scaleX;
                            var _ld2 = MathUtils.sinDeg(ry) * scaleY;
                            this.a = pa * _la2 - pb * _lc2;
                            this.b = pa * _lb2 - pb * _ld2;
                            this.c = pc * _la2 + pd * _lc2;
                            this.d = pc * _lb2 + pd * _ld2;
                            break;
                        }
                    case TransformMode.NoScale:
                    case TransformMode.NoScaleOrReflection:
                        {
                            var cos = MathUtils.cosDeg(rotation);
                            var sin = MathUtils.sinDeg(rotation);
                            var za = pa * cos + pb * sin;
                            var zc = pc * cos + pd * sin;
                            var _s = Math.sqrt(za * za + zc * zc);
                            if (_s > 0.00001) _s = 1 / _s;
                            za *= _s;
                            zc *= _s;
                            _s = Math.sqrt(za * za + zc * zc);
                            var r = Math.PI / 2 + Math.atan2(zc, za);
                            var zb = Math.cos(r) * _s;
                            var zd = Math.sin(r) * _s;
                            var _la3 = MathUtils.cosDeg(shearX) * scaleX;
                            var _lb3 = MathUtils.cosDeg(90 + shearY) * scaleY;
                            var _lc3 = MathUtils.sinDeg(shearX) * scaleX;
                            var _ld3 = MathUtils.sinDeg(90 + shearY) * scaleY;
                            if (this.data.transformMode != TransformMode.NoScaleOrReflection ? pa * pd - pb * pc < 0 : this.skeleton.flipX != this.skeleton.flipY) {
                                zb = -zb;
                                zd = -zd;
                            }
                            this.a = za * _la3 + zb * _lc3;
                            this.b = za * _lb3 + zb * _ld3;
                            this.c = zc * _la3 + zd * _lc3;
                            this.d = zc * _lb3 + zd * _ld3;
                            return;
                        }
                }
                if (this.skeleton.flipX) {
                    this.a = -this.a;
                    this.b = -this.b;
                }
                if (this.skeleton.flipY) {
                    this.c = -this.c;
                    this.d = -this.d;
                }
            }
        }, {
            key: "setToSetupPose",
            value: function setToSetupPose() {
                var data = this.data;
                this.x = data.x;
                this.y = data.y;
                this.rotation = data.rotation;
                this.scaleX = data.scaleX;
                this.scaleY = data.scaleY;
                this.shearX = data.shearX;
                this.shearY = data.shearY;
            }
        }, {
            key: "getWorldRotationX",
            value: function getWorldRotationX() {
                return Math.atan2(this.c, this.a) * MathUtils.radDeg;
            }
        }, {
            key: "getWorldRotationY",
            value: function getWorldRotationY() {
                return Math.atan2(this.d, this.b) * MathUtils.radDeg;
            }
        }, {
            key: "getWorldScaleX",
            value: function getWorldScaleX() {
                return Math.sqrt(this.a * this.a + this.c * this.c);
            }
        }, {
            key: "getWorldScaleY",
            value: function getWorldScaleY() {
                return Math.sqrt(this.b * this.b + this.d * this.d);
            }
            /** Computes the individual applied transform values from the world transform. This can be useful to perform processing using
             * the applied transform after the world transform has been modified directly (eg, by a constraint).
             * <p>
             * Some information is ambiguous in the world transform, such as -1,-1 scale versus 180 rotation. */

        }, {
            key: "updateAppliedTransform",
            value: function updateAppliedTransform() {
                this.appliedValid = true;
                var parent = this.parent;
                if (parent == null) {
                    this.ax = this.worldX;
                    this.ay = this.worldY;
                    this.arotation = Math.atan2(this.c, this.a) * MathUtils.radDeg;
                    this.ascaleX = Math.sqrt(this.a * this.a + this.c * this.c);
                    this.ascaleY = Math.sqrt(this.b * this.b + this.d * this.d);
                    this.ashearX = 0;
                    this.ashearY = Math.atan2(this.a * this.b + this.c * this.d, this.a * this.d - this.b * this.c) * MathUtils.radDeg;
                    return;
                }
                var pa = parent.a,
                    pb = parent.b,
                    pc = parent.c,
                    pd = parent.d;
                var pid = 1 / (pa * pd - pb * pc);
                var dx = this.worldX - parent.worldX,
                    dy = this.worldY - parent.worldY;
                this.ax = dx * pd * pid - dy * pb * pid;
                this.ay = dy * pa * pid - dx * pc * pid;
                var ia = pid * pd;
                var id = pid * pa;
                var ib = pid * pb;
                var ic = pid * pc;
                var ra = ia * this.a - ib * this.c;
                var rb = ia * this.b - ib * this.d;
                var rc = id * this.c - ic * this.a;
                var rd = id * this.d - ic * this.b;
                this.ashearX = 0;
                this.ascaleX = Math.sqrt(ra * ra + rc * rc);
                if (this.ascaleX > 0.0001) {
                    var det = ra * rd - rb * rc;
                    this.ascaleY = det / this.ascaleX;
                    this.ashearY = Math.atan2(ra * rb + rc * rd, det) * MathUtils.radDeg;
                    this.arotation = Math.atan2(rc, ra) * MathUtils.radDeg;
                } else {
                    this.ascaleX = 0;
                    this.ascaleY = Math.sqrt(rb * rb + rd * rd);
                    this.ashearY = 0;
                    this.arotation = 90 - Math.atan2(rd, rb) * MathUtils.radDeg;
                }
            }
        }, {
            key: "worldToLocal",
            value: function worldToLocal(world) {
                var a = this.a,
                    b = this.b,
                    c = this.c,
                    d = this.d;
                var invDet = 1 / (a * d - b * c);
                var x = world.x - this.worldX,
                    y = world.y - this.worldY;
                world.x = x * d * invDet - y * b * invDet;
                world.y = y * a * invDet - x * c * invDet;
                return world;
            }
        }, {
            key: "localToWorld",
            value: function localToWorld(local) {
                var x = local.x,
                    y = local.y;
                local.x = x * this.a + y * this.b + this.worldX;
                local.y = x * this.c + y * this.d + this.worldY;
                return local;
            }
        }, {
            key: "worldToLocalRotation",
            value: function worldToLocalRotation(worldRotation) {
                var sin = MathUtils.sinDeg(worldRotation),
                    cos = MathUtils.cosDeg(worldRotation);
                return Math.atan2(this.a * sin - this.c * cos, this.d * cos - this.b * sin) * MathUtils.radDeg;
            }
        }, {
            key: "localToWorldRotation",
            value: function localToWorldRotation(localRotation) {
                var sin = MathUtils.sinDeg(localRotation),
                    cos = MathUtils.cosDeg(localRotation);
                return Math.atan2(cos * this.c + sin * this.d, cos * this.a + sin * this.b) * MathUtils.radDeg;
            }
        }, {
            key: "rotateWorld",
            value: function rotateWorld(degrees) {
                var a = this.a,
                    b = this.b,
                    c = this.c,
                    d = this.d;
                var cos = MathUtils.cosDeg(degrees),
                    sin = MathUtils.sinDeg(degrees);
                this.a = cos * a - sin * c;
                this.b = cos * b - sin * d;
                this.c = sin * a + cos * c;
                this.d = sin * b + cos * d;
                this.appliedValid = false;
            }
        }]);

        return Bone;
    }();

    spine.Bone = Bone;
})(spine || (spine = {}));
})