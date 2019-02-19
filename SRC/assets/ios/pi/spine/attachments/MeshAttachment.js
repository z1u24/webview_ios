_$define("pi/spine/attachments/MeshAttachment", function (require, exports, module){
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
    var MeshAttachment = function (_VertexAttachment) {
        _inherits(MeshAttachment, _VertexAttachment);

        function MeshAttachment(name) {
            _classCallCheck(this, MeshAttachment);

            var _this = _possibleConstructorReturn(this, (MeshAttachment.__proto__ || Object.getPrototypeOf(MeshAttachment)).call(this, name));

            _this.color = new Color(1, 1, 1, 1);
            _this.inheritDeform = false;
            _this.tempColor = new Color(0, 0, 0, 0);
            return _this;
        }

        _createClass(MeshAttachment, [{
            key: "updateUVs",
            value: function updateUVs() {
                var u = 0,
                    v = 0,
                    width = 0,
                    height = 0;
                if (this.region == null) {
                    u = v = 0;
                    width = height = 1;
                } else {
                    u = this.region.u;
                    v = this.region.v;
                    width = this.region.u2 - u;
                    height = this.region.v2 - v;
                }
                var regionUVs = this.regionUVs;
                if (this.uvs == null || this.uvs.length != regionUVs.length) this.uvs = Utils.newFloatArray(regionUVs.length);
                var uvs = this.uvs;
                if (this.region.rotate) {
                    for (var i = 0, n = uvs.length; i < n; i += 2) {
                        uvs[i] = u + regionUVs[i + 1] * width;
                        uvs[i + 1] = v + height - regionUVs[i] * height;
                    }
                } else {
                    for (var _i = 0, _n = uvs.length; _i < _n; _i += 2) {
                        uvs[_i] = u + regionUVs[_i] * width;
                        uvs[_i + 1] = v + regionUVs[_i + 1] * height;
                    }
                }
            }
        }, {
            key: "applyDeform",
            value: function applyDeform(sourceAttachment) {
                return this == sourceAttachment || this.inheritDeform && this.parentMesh == sourceAttachment;
            }
        }, {
            key: "getParentMesh",
            value: function getParentMesh() {
                return this.parentMesh;
            }
            /** @param parentMesh May be null. */

        }, {
            key: "setParentMesh",
            value: function setParentMesh(parentMesh) {
                this.parentMesh = parentMesh;
                if (parentMesh != null) {
                    this.bones = parentMesh.bones;
                    this.vertices = parentMesh.vertices;
                    this.worldVerticesLength = parentMesh.worldVerticesLength;
                    this.regionUVs = parentMesh.regionUVs;
                    this.triangles = parentMesh.triangles;
                    this.hullLength = parentMesh.hullLength;
                    this.worldVerticesLength = parentMesh.worldVerticesLength;
                }
            }
        }]);

        return MeshAttachment;
    }(VertexAttachment);

    spine.MeshAttachment = MeshAttachment;
})(spine || (spine = {}));
})