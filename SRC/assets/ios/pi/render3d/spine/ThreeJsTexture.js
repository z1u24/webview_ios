_$define("pi/render3d/spine/ThreeJsTexture", function (require, exports, module){
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
    var threejs;
    (function (threejs) {
        var ThreeJsTexture = function (_Texture) {
            _inherits(ThreeJsTexture, _Texture);

            function ThreeJsTexture(image) {
                _classCallCheck(this, ThreeJsTexture);

                var _this = _possibleConstructorReturn(this, (ThreeJsTexture.__proto__ || Object.getPrototypeOf(ThreeJsTexture)).call(this, image));

                _this.texture = new THREE.Texture(image);
                _this.texture.flipY = false;
                _this.texture.needsUpdate = true;
                return _this;
            }

            _createClass(ThreeJsTexture, [{
                key: "setFilters",
                value: function setFilters(minFilter, magFilter) {
                    this.texture.minFilter = ThreeJsTexture.toThreeJsTextureFilter(minFilter);
                    this.texture.magFilter = ThreeJsTexture.toThreeJsTextureFilter(magFilter);
                }
            }, {
                key: "setWraps",
                value: function setWraps(uWrap, vWrap) {
                    this.texture.wrapS = ThreeJsTexture.toThreeJsTextureWrap(uWrap);
                    this.texture.wrapT = ThreeJsTexture.toThreeJsTextureWrap(vWrap);
                }
            }, {
                key: "dispose",
                value: function dispose() {
                    this.texture.dispose();
                }
            }], [{
                key: "toThreeJsTextureFilter",
                value: function toThreeJsTextureFilter(filter) {
                    if (filter === TextureFilter.Linear) return THREE.LinearFilter;else if (filter === TextureFilter.MipMap) return THREE.LinearMipMapLinearFilter; // also includes TextureFilter.MipMapLinearLinear
                    else if (filter === TextureFilter.MipMapLinearNearest) return THREE.LinearMipMapNearestFilter;else if (filter === TextureFilter.MipMapNearestLinear) return THREE.NearestMipMapLinearFilter;else if (filter === TextureFilter.MipMapNearestNearest) return THREE.NearestMipMapNearestFilter;else if (filter === TextureFilter.Nearest) return THREE.NearestFilter;else throw new Error("Unknown texture filter: " + filter);
                }
            }, {
                key: "toThreeJsTextureWrap",
                value: function toThreeJsTextureWrap(wrap) {
                    if (wrap === TextureWrap.ClampToEdge) return THREE.ClampToEdgeWrapping;else if (wrap === TextureWrap.MirroredRepeat) return THREE.MirroredRepeatWrapping;else if (wrap === TextureWrap.Repeat) return THREE.RepeatWrapping;else throw new Error("Unknown texture wrap: " + wrap);
                }
            }]);

            return ThreeJsTexture;
        }(Texture);

        threejs.ThreeJsTexture = ThreeJsTexture;
    })(threejs = spine.threejs || (spine.threejs = {}));
})(spine || (spine = {}));
})