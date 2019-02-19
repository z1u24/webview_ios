_$define("pi/spine/attachments/Attachment", function (require, exports, module){
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
    var Attachment = function Attachment(name) {
        _classCallCheck(this, Attachment);

        if (name == null) throw new Error("name cannot be null.");
        this.name = name;
    };

    spine.Attachment = Attachment;

    var VertexAttachment = function (_Attachment) {
        _inherits(VertexAttachment, _Attachment);

        function VertexAttachment(name) {
            _classCallCheck(this, VertexAttachment);

            var _this = _possibleConstructorReturn(this, (VertexAttachment.__proto__ || Object.getPrototypeOf(VertexAttachment)).call(this, name));

            _this.id = (VertexAttachment.nextID++ & 65535) << 11;
            _this.worldVerticesLength = 0;
            return _this;
        }
        /** Transforms local vertices to world coordinates.
         * @param start The index of the first local vertex value to transform. Each vertex has 2 values, x and y.
         * @param count The number of world vertex values to output. Must be <= {@link #getWorldVerticesLength()} - start.
         * @param worldVertices The output world vertices. Must have a length >= offset + count.
         * @param offset The worldVertices index to begin writing values. */


        _createClass(VertexAttachment, [{
            key: "computeWorldVertices",
            value: function computeWorldVertices(slot, start, count, worldVertices, offset, stride) {
                count = offset + (count >> 1) * stride;
                var skeleton = slot.bone.skeleton;
                var deformArray = slot.attachmentVertices;
                var vertices = this.vertices;
                var bones = this.bones;
                if (bones == null) {
                    if (deformArray.length > 0) vertices = deformArray;
                    var bone = slot.bone;
                    var x = bone.worldX;
                    var y = bone.worldY;
                    var a = bone.a,
                        b = bone.b,
                        c = bone.c,
                        d = bone.d;
                    for (var _v = start, w = offset; w < count; _v += 2, w += stride) {
                        var vx = vertices[_v],
                            vy = vertices[_v + 1];
                        worldVertices[w] = vx * a + vy * b + x;
                        worldVertices[w + 1] = vx * c + vy * d + y;
                    }
                    return;
                }
                var v = 0,
                    skip = 0;
                for (var i = 0; i < start; i += 2) {
                    var n = bones[v];
                    v += n + 1;
                    skip += n;
                }
                var skeletonBones = skeleton.bones;
                if (deformArray.length == 0) {
                    for (var _w = offset, _b = skip * 3; _w < count; _w += stride) {
                        var wx = 0,
                            wy = 0;
                        var _n = bones[v++];
                        _n += v;
                        for (; v < _n; v++, _b += 3) {
                            var _bone = skeletonBones[bones[v]];
                            var _vx = vertices[_b],
                                _vy = vertices[_b + 1],
                                weight = vertices[_b + 2];
                            wx += (_vx * _bone.a + _vy * _bone.b + _bone.worldX) * weight;
                            wy += (_vx * _bone.c + _vy * _bone.d + _bone.worldY) * weight;
                        }
                        worldVertices[_w] = wx;
                        worldVertices[_w + 1] = wy;
                    }
                } else {
                    var deform = deformArray;
                    for (var _w2 = offset, _b2 = skip * 3, f = skip << 1; _w2 < count; _w2 += stride) {
                        var _wx = 0,
                            _wy = 0;
                        var _n2 = bones[v++];
                        _n2 += v;
                        for (; v < _n2; v++, _b2 += 3, f += 2) {
                            var _bone2 = skeletonBones[bones[v]];
                            var _vx2 = vertices[_b2] + deform[f],
                                _vy2 = vertices[_b2 + 1] + deform[f + 1],
                                _weight = vertices[_b2 + 2];
                            _wx += (_vx2 * _bone2.a + _vy2 * _bone2.b + _bone2.worldX) * _weight;
                            _wy += (_vx2 * _bone2.c + _vy2 * _bone2.d + _bone2.worldY) * _weight;
                        }
                        worldVertices[_w2] = _wx;
                        worldVertices[_w2 + 1] = _wy;
                    }
                }
            }
            /** Returns true if a deform originally applied to the specified attachment should be applied to this attachment. */

        }, {
            key: "applyDeform",
            value: function applyDeform(sourceAttachment) {
                return this == sourceAttachment;
            }
        }]);

        return VertexAttachment;
    }(Attachment);

    VertexAttachment.nextID = 0;
    spine.VertexAttachment = VertexAttachment;
})(spine || (spine = {}));
})