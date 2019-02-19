_$define("pi/spine/attachments/RegionAttachment", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    var RegionAttachment = function (_Attachment) {
        _inherits(RegionAttachment, _Attachment);

        function RegionAttachment(name) {
            _classCallCheck(this, RegionAttachment);

            var _this = _possibleConstructorReturn(this, (RegionAttachment.__proto__ || Object.getPrototypeOf(RegionAttachment)).call(this, name));

            _this.x = 0;
            _this.y = 0;
            _this.scaleX = 1;
            _this.scaleY = 1;
            _this.rotation = 0;
            _this.width = 0;
            _this.height = 0;
            _this.color = new Color(1, 1, 1, 1);
            _this.offset = Utils.newFloatArray(8);
            _this.uvs = Utils.newFloatArray(8);
            _this.tempColor = new Color(1, 1, 1, 1);
            return _this;
        }

        _createClass(RegionAttachment, [{
            key: "updateOffset",
            value: function updateOffset() {
                var regionScaleX = this.width / this.region.originalWidth * this.scaleX;
                var regionScaleY = this.height / this.region.originalHeight * this.scaleY;
                var localX = -this.width / 2 * this.scaleX + this.region.offsetX * regionScaleX;
                var localY = -this.height / 2 * this.scaleY + this.region.offsetY * regionScaleY;
                var localX2 = localX + this.region.width * regionScaleX;
                var localY2 = localY + this.region.height * regionScaleY;
                var radians = this.rotation * Math.PI / 180;
                var cos = Math.cos(radians);
                var sin = Math.sin(radians);
                var localXCos = localX * cos + this.x;
                var localXSin = localX * sin;
                var localYCos = localY * cos + this.y;
                var localYSin = localY * sin;
                var localX2Cos = localX2 * cos + this.x;
                var localX2Sin = localX2 * sin;
                var localY2Cos = localY2 * cos + this.y;
                var localY2Sin = localY2 * sin;
                var offset = this.offset;
                offset[RegionAttachment.OX1] = localXCos - localYSin;
                offset[RegionAttachment.OY1] = localYCos + localXSin;
                offset[RegionAttachment.OX2] = localXCos - localY2Sin;
                offset[RegionAttachment.OY2] = localY2Cos + localXSin;
                offset[RegionAttachment.OX3] = localX2Cos - localY2Sin;
                offset[RegionAttachment.OY3] = localY2Cos + localX2Sin;
                offset[RegionAttachment.OX4] = localX2Cos - localYSin;
                offset[RegionAttachment.OY4] = localYCos + localX2Sin;
            }
        }, {
            key: "setRegion",
            value: function setRegion(region) {
                this.region = region;
                var uvs = this.uvs;
                if (region.rotate) {
                    uvs[2] = region.u;
                    uvs[3] = region.v2;
                    uvs[4] = region.u;
                    uvs[5] = region.v;
                    uvs[6] = region.u2;
                    uvs[7] = region.v;
                    uvs[0] = region.u2;
                    uvs[1] = region.v2;
                } else {
                    uvs[0] = region.u;
                    uvs[1] = region.v2;
                    uvs[2] = region.u;
                    uvs[3] = region.v;
                    uvs[4] = region.u2;
                    uvs[5] = region.v;
                    uvs[6] = region.u2;
                    uvs[7] = region.v2;
                }
            }
        }, {
            key: "computeWorldVertices",
            value: function computeWorldVertices(bone, worldVertices, offset, stride) {
                var vertexOffset = this.offset;
                var x = bone.worldX,
                    y = bone.worldY;
                var a = bone.a,
                    b = bone.b,
                    c = bone.c,
                    d = bone.d;
                var offsetX = 0,
                    offsetY = 0;
                offsetX = vertexOffset[RegionAttachment.OX1];
                offsetY = vertexOffset[RegionAttachment.OY1];
                worldVertices[offset] = offsetX * a + offsetY * b + x; // br
                worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
                offset += stride;
                offsetX = vertexOffset[RegionAttachment.OX2];
                offsetY = vertexOffset[RegionAttachment.OY2];
                worldVertices[offset] = offsetX * a + offsetY * b + x; // bl
                worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
                offset += stride;
                offsetX = vertexOffset[RegionAttachment.OX3];
                offsetY = vertexOffset[RegionAttachment.OY3];
                worldVertices[offset] = offsetX * a + offsetY * b + x; // ul
                worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
                offset += stride;
                offsetX = vertexOffset[RegionAttachment.OX4];
                offsetY = vertexOffset[RegionAttachment.OY4];
                worldVertices[offset] = offsetX * a + offsetY * b + x; // ur
                worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
            }
        }]);

        return RegionAttachment;
    }(Attachment);

    RegionAttachment.OX1 = 0;
    RegionAttachment.OY1 = 1;
    RegionAttachment.OX2 = 2;
    RegionAttachment.OY2 = 3;
    RegionAttachment.OX3 = 4;
    RegionAttachment.OY3 = 5;
    RegionAttachment.OX4 = 6;
    RegionAttachment.OY4 = 7;
    RegionAttachment.X1 = 0;
    RegionAttachment.Y1 = 1;
    RegionAttachment.C1R = 2;
    RegionAttachment.C1G = 3;
    RegionAttachment.C1B = 4;
    RegionAttachment.C1A = 5;
    RegionAttachment.U1 = 6;
    RegionAttachment.V1 = 7;
    RegionAttachment.X2 = 8;
    RegionAttachment.Y2 = 9;
    RegionAttachment.C2R = 10;
    RegionAttachment.C2G = 11;
    RegionAttachment.C2B = 12;
    RegionAttachment.C2A = 13;
    RegionAttachment.U2 = 14;
    RegionAttachment.V2 = 15;
    RegionAttachment.X3 = 16;
    RegionAttachment.Y3 = 17;
    RegionAttachment.C3R = 18;
    RegionAttachment.C3G = 19;
    RegionAttachment.C3B = 20;
    RegionAttachment.C3A = 21;
    RegionAttachment.U3 = 22;
    RegionAttachment.V3 = 23;
    RegionAttachment.X4 = 24;
    RegionAttachment.Y4 = 25;
    RegionAttachment.C4R = 26;
    RegionAttachment.C4G = 27;
    RegionAttachment.C4B = 28;
    RegionAttachment.C4A = 29;
    RegionAttachment.U4 = 30;
    RegionAttachment.V4 = 31;
    spine.RegionAttachment = RegionAttachment;
})(spine || (spine = {}));
})