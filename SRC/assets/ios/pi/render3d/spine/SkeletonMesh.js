_$define("pi/render3d/spine/SkeletonMesh", function (require, exports, module){
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
        var SkeletonMeshMaterial = function (_THREE$ShaderMaterial) {
            _inherits(SkeletonMeshMaterial, _THREE$ShaderMaterial);

            function SkeletonMeshMaterial() {
                _classCallCheck(this, SkeletonMeshMaterial);

                var vertexShader = "\n\t\t\t\tattribute vec4 color;\n\t\t\t\tvarying vec2 vUv;\n\t\t\t\tvarying vec4 vColor;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tvColor = color;\n\t\t\t\t\tgl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);\n\t\t\t\t}\n\t\t\t";
                var fragmentShader = "\n\t\t\t\tuniform sampler2D map;\n\t\t\t\tvarying vec2 vUv;\n\t\t\t\tvarying vec4 vColor;\n\t\t\t\tvoid main(void) {\n\t\t\t\t\tgl_FragColor = texture2D(map, vUv)*vColor;\n\t\t\t\t}\n\t\t\t";
                var parameters = {
                    uniforms: {
                        map: { type: "t", value: null }
                    },
                    vertexShader: vertexShader,
                    fragmentShader: fragmentShader,
                    side: THREE.DoubleSide,
                    transparent: true,
                    alphaTest: 0.5
                };
                return _possibleConstructorReturn(this, (SkeletonMeshMaterial.__proto__ || Object.getPrototypeOf(SkeletonMeshMaterial)).call(this, parameters));
            }

            return SkeletonMeshMaterial;
        }(THREE.ShaderMaterial);

        threejs.SkeletonMeshMaterial = SkeletonMeshMaterial;

        var SkeletonMesh = function (_THREE$Object3D) {
            _inherits(SkeletonMesh, _THREE$Object3D);

            function SkeletonMesh(skeletonData) {
                _classCallCheck(this, SkeletonMesh);

                var _this2 = _possibleConstructorReturn(this, (SkeletonMesh.__proto__ || Object.getPrototypeOf(SkeletonMesh)).call(this));

                _this2.tempPos = new Vector2();
                _this2.tempUv = new Vector2();
                _this2.tempLight = new Color();
                _this2.tempDark = new Color();
                _this2.zOffset = 0.1;
                _this2.batches = new Array();
                _this2.nextBatchIndex = 0;
                _this2.clipper = new SkeletonClipping();
                _this2.vertices = Utils.newFloatArray(1024);
                _this2.tempColor = new Color();
                _this2.skeleton = new Skeleton(skeletonData);
                var animData = new AnimationStateData(skeletonData);
                _this2.state = new AnimationState(animData);
                return _this2;
            }

            _createClass(SkeletonMesh, [{
                key: "update",
                value: function update(deltaTime) {
                    var state = this.state;
                    var skeleton = this.skeleton;
                    state.update(deltaTime);
                    state.apply(skeleton);
                    skeleton.updateWorldTransform();
                    this.updateGeometry();
                }
            }, {
                key: "clearBatches",
                value: function clearBatches() {
                    for (var i = 0; i < this.batches.length; i++) {
                        this.batches[i].clear();
                        this.batches[i].visible = false;
                    }
                    this.nextBatchIndex = 0;
                }
            }, {
                key: "nextBatch",
                value: function nextBatch() {
                    if (this.batches.length == this.nextBatchIndex) {
                        var _batch = new MeshBatcher();
                        this.add(_batch);
                        this.batches.push(_batch);
                    }
                    var batch = this.batches[this.nextBatchIndex++];
                    batch.visible = true;
                    return batch;
                }
            }, {
                key: "updateGeometry",
                value: function updateGeometry() {
                    this.clearBatches();
                    var tempPos = this.tempPos;
                    var tempUv = this.tempUv;
                    var tempLight = this.tempLight;
                    var tempDark = this.tempDark;
                    var numVertices = 0;
                    var verticesLength = 0;
                    var indicesLength = 0;
                    var blendMode = null;
                    var clipper = this.clipper;
                    var vertices = this.vertices;
                    var triangles = null;
                    var uvs = null;
                    var drawOrder = this.skeleton.drawOrder;
                    var batch = this.nextBatch();
                    batch.begin();
                    var z = 0;
                    var zOffset = this.zOffset;
                    for (var i = 0, n = drawOrder.length; i < n; i++) {
                        var vertexSize = clipper.isClipping() ? 2 : SkeletonMesh.VERTEX_SIZE;
                        var slot = drawOrder[i];
                        var attachment = slot.getAttachment();
                        var attachmentColor = null;
                        var texture = null;
                        var numFloats = 0;
                        if (attachment instanceof RegionAttachment) {
                            var region = attachment;
                            attachmentColor = region.color;
                            vertices = this.vertices;
                            numFloats = vertexSize * 4;
                            region.computeWorldVertices(slot.bone, vertices, 0, vertexSize);
                            triangles = SkeletonMesh.QUAD_TRIANGLES;
                            uvs = region.uvs;
                            texture = region.region.renderObject.texture;
                        } else if (attachment instanceof MeshAttachment) {
                            var mesh = attachment;
                            attachmentColor = mesh.color;
                            vertices = this.vertices;
                            numFloats = (mesh.worldVerticesLength >> 1) * vertexSize;
                            if (numFloats > vertices.length) {
                                vertices = this.vertices = spine.Utils.newFloatArray(numFloats);
                            }
                            mesh.computeWorldVertices(slot, 0, mesh.worldVerticesLength, vertices, 0, vertexSize);
                            triangles = mesh.triangles;
                            uvs = mesh.uvs;
                            texture = mesh.region.renderObject.texture;
                        } else if (attachment instanceof ClippingAttachment) {
                            var clip = attachment;
                            clipper.clipStart(slot, clip);
                            continue;
                        } else continue;
                        if (texture != null) {
                            var skeleton = slot.bone.skeleton;
                            var skeletonColor = skeleton.color;
                            var slotColor = slot.color;
                            var alpha = skeletonColor.a * slotColor.a * attachmentColor.a;
                            var color = this.tempColor;
                            color.set(skeletonColor.r * slotColor.r * attachmentColor.r, skeletonColor.g * slotColor.g * attachmentColor.g, skeletonColor.b * slotColor.b * attachmentColor.b, alpha);
                            var finalVertices = void 0;
                            var finalVerticesLength = void 0;
                            var finalIndices = void 0;
                            var finalIndicesLength = void 0;
                            if (clipper.isClipping()) {
                                clipper.clipTriangles(vertices, numFloats, triangles, triangles.length, uvs, color, null, false);
                                var clippedVertices = clipper.clippedVertices;
                                var clippedTriangles = clipper.clippedTriangles;
                                if (this.vertexEffect != null) {
                                    var vertexEffect = this.vertexEffect;
                                    var verts = clippedVertices;
                                    for (var v = 0, _n = clippedVertices.length; v < _n; v += vertexSize) {
                                        tempPos.x = verts[v];
                                        tempPos.y = verts[v + 1];
                                        tempLight.setFromColor(color);
                                        tempDark.set(0, 0, 0, 0);
                                        tempUv.x = verts[v + 6];
                                        tempUv.y = verts[v + 7];
                                        vertexEffect.transform(tempPos, tempUv, tempLight, tempDark);
                                        verts[v] = tempPos.x;
                                        verts[v + 1] = tempPos.y;
                                        verts[v + 2] = tempLight.r;
                                        verts[v + 3] = tempLight.g;
                                        verts[v + 4] = tempLight.b;
                                        verts[v + 5] = tempLight.a;
                                        verts[v + 6] = tempUv.x;
                                        verts[v + 7] = tempUv.y;
                                    }
                                }
                                finalVertices = clippedVertices;
                                finalVerticesLength = clippedVertices.length;
                                finalIndices = clippedTriangles;
                                finalIndicesLength = clippedTriangles.length;
                            } else {
                                var _verts = vertices;
                                if (this.vertexEffect != null) {
                                    var _vertexEffect = this.vertexEffect;
                                    for (var _v = 0, u = 0, _n2 = numFloats; _v < _n2; _v += vertexSize, u += 2) {
                                        tempPos.x = _verts[_v];
                                        tempPos.y = _verts[_v + 1];
                                        tempLight.setFromColor(color);
                                        tempDark.set(0, 0, 0, 0);
                                        tempUv.x = uvs[u];
                                        tempUv.y = uvs[u + 1];
                                        _vertexEffect.transform(tempPos, tempUv, tempLight, tempDark);
                                        _verts[_v] = tempPos.x;
                                        _verts[_v + 1] = tempPos.y;
                                        _verts[_v + 2] = tempLight.r;
                                        _verts[_v + 3] = tempLight.g;
                                        _verts[_v + 4] = tempLight.b;
                                        _verts[_v + 5] = tempLight.a;
                                        _verts[_v + 6] = tempUv.x;
                                        _verts[_v + 7] = tempUv.y;
                                    }
                                } else {
                                    for (var _v2 = 2, _u = 0, _n3 = numFloats; _v2 < _n3; _v2 += vertexSize, _u += 2) {
                                        _verts[_v2] = color.r;
                                        _verts[_v2 + 1] = color.g;
                                        _verts[_v2 + 2] = color.b;
                                        _verts[_v2 + 3] = color.a;
                                        _verts[_v2 + 4] = uvs[_u];
                                        _verts[_v2 + 5] = uvs[_u + 1];
                                    }
                                }
                                finalVertices = vertices;
                                finalVerticesLength = numFloats;
                                finalIndices = triangles;
                                finalIndicesLength = triangles.length;
                            }
                            if (finalVerticesLength == 0 || finalIndicesLength == 0) continue;
                            // Start new batch if this one can't hold vertices/indices
                            if (!batch.canBatch(finalVerticesLength, finalIndicesLength)) {
                                batch.end();
                                batch = this.nextBatch();
                                batch.begin();
                            }
                            // FIXME per slot blending would require multiple material support
                            //let slotBlendMode = slot.data.blendMode;
                            //if (slotBlendMode != blendMode) {
                            //	blendMode = slotBlendMode;
                            //	batcher.setBlendMode(getSourceGLBlendMode(this._gl, blendMode, premultipliedAlpha), getDestGLBlendMode(this._gl, blendMode));
                            //}
                            var batchMaterial = batch.material;
                            if (batchMaterial.uniforms.map.value == null) {
                                batchMaterial.uniforms.map.value = texture.texture;
                            }
                            if (batchMaterial.uniforms.map.value != texture.texture) {
                                batch.end();
                                batch = this.nextBatch();
                                batch.begin();
                                batchMaterial = batch.material;
                                batchMaterial.uniforms.map.value = texture.texture;
                            }
                            batchMaterial.needsUpdate = true;
                            batch.batch(finalVertices, finalVerticesLength, finalIndices, finalIndicesLength, z);
                            z += zOffset;
                        }
                        clipper.clipEndWithSlot(slot);
                    }
                    clipper.clipEnd();
                    batch.end();
                }
            }]);

            return SkeletonMesh;
        }(THREE.Object3D);

        SkeletonMesh.QUAD_TRIANGLES = [0, 1, 2, 2, 3, 0];
        SkeletonMesh.VERTEX_SIZE = 2 + 2 + 4;
        threejs.SkeletonMesh = SkeletonMesh;
    })(threejs = spine.threejs || (spine.threejs = {}));
})(spine || (spine = {}));
})