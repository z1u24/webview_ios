_$define("pi/render3d/babylon/loader", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./babylon.d.ts"/>
var res_mgr_1 = require("../../util/res_mgr");
var geometry_1 = require("./geometry");

var ResLoader = function () {
    function ResLoader(resTab) {
        _classCallCheck(this, ResLoader);

        this.resTab = resTab;
    }

    _createClass(ResLoader, [{
        key: "loadTexture",
        value: function loadTexture(url, noMipmap, sampling) {
            var r = this.resTab.get(textureKey(url, noMipmap, sampling));
            if (r) {
                return r.link;
            } else {
                return null;
            }
        }
    }, {
        key: "createTexture",
        value: function createTexture(texture) {
            //该load 是一个同步过程
            this.resTab.load(textureKey(texture.url, !texture.generateMipMaps, texture.samplingMode), BABYLON_TEXTURE_TYPE, texture, null, null, function () {
                console.log("createTexture fail!, url:", texture.url, "noMipmap:", texture.generateMipMaps, "sampling:", texture.samplingMode);
            });
        }
        //调用此方法应该保证resTab中存在该texture

    }, {
        key: "releaseTexture",
        value: function releaseTexture(texture) {
            if (!texture.url) {
                return false;
            }
            var res = this.resTab.get(textureKey(texture.url, !texture.generateMipMaps, texture.samplingMode));
            if (!res) {
                return false;
            }
            this.resTab.delete(res);
            return true;
        }
    }, {
        key: "loadGeometry",
        value: function loadGeometry(id) {
            var r = this.resTab.get(geometryKey(id));
            if (r) {
                return r.link;
            } else {
                return null;
            }
        }
    }, {
        key: "createGeometry",
        value: function createGeometry(geometry) {
            //该load 是一个同步过程
            this.resTab.load(geometryKey(geometry.id), BABYLON_GEOMETRY_TYPE, geometry, null, null, function () {
                console.log("createGeometry fail!, url:", geometry.id);
            });
        }
        //调用此方法应该保证resTab中存在该texture

    }, {
        key: "releaseGeometry",
        value: function releaseGeometry(id) {
            var res = this.resTab.get(geometryKey(id));
            this.resTab.delete(res);
        }
    }]);

    return ResLoader;
}();

exports.ResLoader = ResLoader;
/**
 * @description 纹理资源
 * @example
 */

var TextureRes = function (_res_mgr_1$Res) {
    _inherits(TextureRes, _res_mgr_1$Res);

    function TextureRes() {
        _classCallCheck(this, TextureRes);

        return _possibleConstructorReturn(this, (TextureRes.__proto__ || Object.getPrototypeOf(TextureRes)).apply(this, arguments));
    }

    _createClass(TextureRes, [{
        key: "create",

        /**
         * @description 创建
         * @example
         */
        value: function create(data) {
            this.link = data;
        }
        /**
         * @description 销毁，需要子类重载
         * @example
         */

    }, {
        key: "destroy",
        value: function destroy() {
            var r = this.link;
            if (r) {
                r._engine._releaseTexture(r);
                r._webGLTexture = null;
                r.previous = null;
                r.next = null;
            }
        }
    }]);

    return TextureRes;
}(res_mgr_1.Res);

exports.TextureRes = TextureRes;
/**
 * @description 纹理资源
 * @example
 */

var GeometryRes = function (_res_mgr_1$Res2) {
    _inherits(GeometryRes, _res_mgr_1$Res2);

    function GeometryRes() {
        _classCallCheck(this, GeometryRes);

        return _possibleConstructorReturn(this, (GeometryRes.__proto__ || Object.getPrototypeOf(GeometryRes)).apply(this, arguments));
    }

    _createClass(GeometryRes, [{
        key: "create",

        /**
         * @description 创建
         * @example
         */
        value: function create(data) {
            this.link = data;
        }
        /**
         * @description 销毁，需要子类重载
         * @example
         */

    }, {
        key: "destroy",
        value: function destroy() {
            var r = this.link;
            if (r) {
                BABYLON.Geometry.prototype.dispose.call(r);
            }
        }
    }]);

    return GeometryRes;
}(res_mgr_1.Res);

exports.GeometryRes = GeometryRes;
/**
 * 对Babylon的GLTFLoader进行扩展， 其目的是接管其VertexBuffer的加载, 对其进行缓冲！
 * 使用该扩展类， 你始终应该保证accessor引用的buffer是紧凑的数据（accessor没有bytesStride字段）， 并保证数据的offset可以整除数据类型的长度
 */

var GLTF2Loader = function (_BABYLON$GLTF2$GLTFLo) {
    _inherits(GLTF2Loader, _BABYLON$GLTF2$GLTFLo);

    function GLTF2Loader() {
        _classCallCheck(this, GLTF2Loader);

        return _possibleConstructorReturn(this, (GLTF2Loader.__proto__ || Object.getPrototypeOf(GLTF2Loader)).apply(this, arguments));
    }

    _createClass(GLTF2Loader, [{
        key: "_loadVertexBufferViewAsync",

        //重载_loadVertexBufferViewAsync方法， 使其返回值为ArrayBufferView
        value: function _loadVertexBufferViewAsync(bufferView, _kind) {
            if (bufferView._babylonBuffer) {
                return bufferView._babylonBuffer;
            }
            bufferView._babylonBuffer = this.loadBufferViewAsync("#/bufferViews/" + bufferView.index, bufferView).then(function (data) {
                return data;
            });
            return bufferView._babylonBuffer;
        }
        //重载_loadVertexAccessorAsync方法， 使其不支持sparse， 并且偏移量只能是其类型长度的倍数

    }, {
        key: "_loadVertexAccessorAsync",
        value: function _loadVertexAccessorAsync(context, accessor, kind) {
            var _this4 = this;

            if (accessor._babylonVertexBuffer) {
                return accessor._babylonVertexBuffer;
            }
            if (accessor.sparse || accessor.byteOffset && accessor.byteOffset % BABYLON.VertexBuffer.GetTypeByteLength(accessor.componentType) !== 0) {
                throw new Error("Accessor does not support s, and its cost should be integer multiple of its type.");
            }
            var bufferView = BABYLON.GLTF2.ArrayItem.Get(context + "/bufferView", this.gltf.bufferViews, accessor.bufferView);
            accessor._babylonVertexBuffer = this._loadVertexBufferViewAsync(bufferView, kind).then(function (babylonBuffer) {
                var size = BABYLON.GLTF2.GLTFLoader._GetNumComponents(context, accessor.type);
                return new BABYLON.VertexBuffer(_this4.babylonScene.getEngine(), babylonBuffer, kind, false, false, null, false, accessor.byteOffset, size, accessor.componentType, accessor.normalized, true);
            });
            return accessor._babylonVertexBuffer;
        }
        //重载_loadVertexDataAsync， 缓存geo

    }, {
        key: "_loadVertexDataAsync",
        value: function _loadVertexDataAsync(context, primitive, babylonMesh) {
            var _this5 = this;

            var accessor = BABYLON.GLTF2.ArrayItem.Get(context + "/indices", this.gltf.accessors, primitive.indices);
            var bufferView = BABYLON.GLTF2.ArrayItem.Get("#/accessors/" + accessor.index + "/bufferView", this.gltf.bufferViews, accessor.bufferView);
            var buffer = BABYLON.GLTF2.ArrayItem.Get("#/bufferViews/" + bufferView.index + "/buffer", this.gltf.buffers, bufferView.buffer);
            var url = this._rootUrl + buffer.uri;
            var r = GLTF2Loader.resLoader.loadGeometry(url);
            if (r) {
                return new Promise(function () {
                    return r;
                });
            } else {
                var the = this;
                var extensionPromise = the._extensionsLoadVertexDataAsync(context, primitive, babylonMesh);
                if (extensionPromise) {
                    return extensionPromise;
                }
                var attributes = primitive.attributes;
                if (!attributes) {
                    throw new Error(context + ": Attributes are missing");
                }
                var promises = new Array();
                var babylonGeometry = new geometry_1.Geometry(url, this.babylonScene);
                GLTF2Loader.resLoader.createGeometry(babylonGeometry);
                if (primitive.indices == undefined) {
                    babylonMesh.isUnIndexed = true;
                } else {
                    promises.push(the._loadIndicesAccessorAsync("#/accessors/" + accessor.index, accessor).then(function (data) {
                        babylonGeometry.setIndices(data);
                    }));
                }
                var loadAttribute = function loadAttribute(attribute, kind, callback) {
                    if (attributes[attribute] == undefined) {
                        return;
                    }
                    babylonMesh._delayInfo = babylonMesh._delayInfo || [];
                    if (babylonMesh._delayInfo.indexOf(kind) === -1) {
                        babylonMesh._delayInfo.push(kind);
                    }
                    var accessor = BABYLON.GLTF2.ArrayItem.Get(context + "/attributes/" + attribute, _this5.gltf.accessors, attributes[attribute]);
                    promises.push(_this5._loadVertexAccessorAsync("#/accessors/" + accessor.index, accessor, kind).then(function (babylonVertexBuffer) {
                        babylonGeometry.setVerticesBuffer(babylonVertexBuffer, accessor.count);
                    }));
                    if (callback) {
                        callback(accessor);
                    }
                };
                loadAttribute("POSITION", BABYLON.VertexBuffer.PositionKind);
                loadAttribute("NORMAL", BABYLON.VertexBuffer.NormalKind);
                loadAttribute("TANGENT", BABYLON.VertexBuffer.TangentKind);
                loadAttribute("TEXCOORD_0", BABYLON.VertexBuffer.UVKind);
                loadAttribute("TEXCOORD_1", BABYLON.VertexBuffer.UV2Kind);
                loadAttribute("JOINTS_0", BABYLON.VertexBuffer.MatricesIndicesKind);
                loadAttribute("WEIGHTS_0", BABYLON.VertexBuffer.MatricesWeightsKind);
                loadAttribute("COLOR_0", BABYLON.VertexBuffer.ColorKind, function (accessor) {
                    if (accessor.type === BABYLON.GLTF2.AccessorType.VEC4) {
                        babylonMesh.hasVertexAlpha = true;
                    }
                });
                return Promise.all(promises).then(function () {
                    return babylonGeometry;
                });
            }
        }
        //重载_loadAnimationChannelAsync， 缓存keys

    }, {
        key: "_loadAnimationChannelAsync",
        value: function _loadAnimationChannelAsync(context, animationContext, animation, channel, babylonAnimationGroup) {
            var _this6 = this;

            var targetNode = BABYLON.GLTF2.ArrayItem.Get(context + "/target/node", this.gltf.nodes, channel.target.node);
            // Ignore animations that have no animation targets.
            if (channel.target.path === BABYLON.GLTF2.AnimationChannelTargetPath.WEIGHTS && !targetNode._numMorphTargets || channel.target.path !== BABYLON.GLTF2.AnimationChannelTargetPath.WEIGHTS && !targetNode._babylonMesh) {
                return Promise.resolve();
            }
            // Ignore animations targeting TRS of skinned nodes.
            // See https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins (second implementation note)
            if (targetNode.skin != undefined && channel.target.path !== BABYLON.GLTF2.AnimationChannelTargetPath.WEIGHTS) {
                return Promise.resolve();
            }
            var sampler = BABYLON.GLTF2.ArrayItem.Get(context + "/sampler", animation.samplers, channel.sampler);
            var inputAccessor = BABYLON.GLTF2.ArrayItem.Get(animationContext + "/samplers/" + channel.sampler + "/input", this.gltf.accessors, sampler.input);
            var bufferView = BABYLON.GLTF2.ArrayItem.Get("#/bufferView", this.gltf.bufferViews, inputAccessor.bufferView);
            var buffer = BABYLON.GLTF2.ArrayItem.Get("#/bufferViews/" + bufferView.index + "/buffer", this.gltf.buffers, bufferView.buffer);
            var url = this._rootUrl + buffer.uri;
            var targetPath = void 0;
            var animationType = void 0;
            switch (channel.target.path) {
                case BABYLON.GLTF2.AnimationChannelTargetPath.TRANSLATION:
                    {
                        targetPath = "position";
                        animationType = BABYLON.Animation.ANIMATIONTYPE_VECTOR3;
                        break;
                    }
                case BABYLON.GLTF2.AnimationChannelTargetPath.ROTATION:
                    {
                        targetPath = "rotationQuaternion";
                        animationType = BABYLON.Animation.ANIMATIONTYPE_QUATERNION;
                        break;
                    }
                case BABYLON.GLTF2.AnimationChannelTargetPath.SCALE:
                    {
                        targetPath = "scaling";
                        animationType = BABYLON.Animation.ANIMATIONTYPE_VECTOR3;
                        break;
                    }
                case BABYLON.GLTF2.AnimationChannelTargetPath.WEIGHTS:
                    {
                        targetPath = "influence";
                        animationType = BABYLON.Animation.ANIMATIONTYPE_FLOAT;
                        break;
                    }
                default:
                    {
                        throw new Error(context + "/target/path: Invalid value (" + channel.target.path + ")");
                    }
            }
            var influenceAnim = function influenceAnim(keys) {
                var _loop = function _loop(targetIndex) {
                    var animationName = babylonAnimationGroup.name + "_channel" + babylonAnimationGroup.targetedAnimations.length;
                    var babylonAnimation = new BABYLON.Animation(animationName, targetPath, 1, animationType);
                    var iKeys = _this6.babylonScene.offlineProvider.loadAnimationKeys(url + "_" + 0);
                    if (!iKeys) {
                        iKeys = keys.map(function (key) {
                            return {
                                frame: key.frame,
                                inTangent: key.inTangent ? key.inTangent[targetIndex] : undefined,
                                value: key.value[targetIndex],
                                outTangent: key.outTangent ? key.outTangent[targetIndex] : undefined
                            };
                        });
                        _this6.babylonScene.offlineProvider.createAnimationKeys(url + "_" + 0, iKeys);
                    }
                    babylonAnimation.setKeys(iKeys);
                    _this6._forEachPrimitive(targetNode, function (babylonMesh) {
                        var morphTarget = babylonMesh.morphTargetManager.getTarget(targetIndex);
                        var babylonAnimationClone = babylonAnimation.clone();
                        morphTarget.animations.push(babylonAnimationClone);
                        babylonAnimationGroup.addTargetedAnimation(babylonAnimationClone, morphTarget);
                    });
                };

                for (var targetIndex = 0; targetIndex < targetNode._numMorphTargets; targetIndex++) {
                    _loop(targetIndex);
                }
            };
            if (targetPath === "influence") {
                if (!this.babylonScene.offlineProvider.loadAnimationKeys(url + "_" + 0)) {
                    this._loadAnimationKeysAsync(context, animationContext, animation, channel, url).then(function (keys) {
                        influenceAnim(keys);
                    });
                } else {
                    influenceAnim(null);
                }
            } else {
                this._loadAnimationKeysAsync(context, animationContext, animation, channel, url).then(function (keys) {
                    var animationName = babylonAnimationGroup.name + "_channel" + babylonAnimationGroup.targetedAnimations.length;
                    var babylonAnimation = new BABYLON.Animation(animationName, targetPath, 1, animationType);
                    babylonAnimation.setKeys(keys);
                    if (targetNode._babylonBones) {
                        var babylonAnimationTargets = [targetNode._babylonMesh].concat(_toConsumableArray(targetNode._babylonBones));
                        for (var _iterator = babylonAnimationTargets, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                            var _ref;

                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref = _iterator[_i++];
                            } else {
                                _i = _iterator.next();
                                if (_i.done) break;
                                _ref = _i.value;
                            }

                            var babylonAnimationTarget = _ref;

                            babylonAnimationTarget.animations.push(babylonAnimation);
                        }
                        babylonAnimationGroup.addTargetedAnimation(babylonAnimation, babylonAnimationTargets);
                    } else {
                        targetNode._babylonMesh.animations.push(babylonAnimation);
                        babylonAnimationGroup.addTargetedAnimation(babylonAnimation, targetNode._babylonMesh);
                    }
                });
            }
        }
        //增加_loadAnimationKeysAsync方法， 缓存keys

    }, {
        key: "_loadAnimationKeysAsync",
        value: function _loadAnimationKeysAsync(context, animationContext, animation, channel, key) {
            var _this7 = this;

            var r = this.babylonScene.offlineProvider.loadAnimationKeys(key);
            if (r) {
                return new Promise(function () {
                    return r;
                });
            }
            var targetNode = BABYLON.GLTF2.ArrayItem.Get(context + "/target/node", this.gltf.nodes, channel.target.node);
            var targetPath = void 0;
            var sampler = BABYLON.GLTF2.ArrayItem.Get(context + "/sampler", animation.samplers, channel.sampler);
            return this._loadAnimationSamplerAsync(animationContext + "/samplers/" + channel.sampler, sampler).then(function (data) {
                var outputBufferOffset = 0;
                var getNextOutputValue = void 0;
                switch (targetPath) {
                    case "position":
                        {
                            getNextOutputValue = function getNextOutputValue() {
                                var value = BABYLON.Vector3.FromArray(data.output, outputBufferOffset);
                                outputBufferOffset += 3;
                                return value;
                            };
                            break;
                        }
                    case "rotationQuaternion":
                        {
                            getNextOutputValue = function getNextOutputValue() {
                                var value = BABYLON.Quaternion.FromArray(data.output, outputBufferOffset);
                                outputBufferOffset += 4;
                                return value;
                            };
                            break;
                        }
                    case "scaling":
                        {
                            getNextOutputValue = function getNextOutputValue() {
                                var value = BABYLON.Vector3.FromArray(data.output, outputBufferOffset);
                                outputBufferOffset += 3;
                                return value;
                            };
                            break;
                        }
                    case "influence":
                        {
                            getNextOutputValue = function getNextOutputValue() {
                                var value = new Array(targetNode._numMorphTargets);
                                for (var i = 0; i < targetNode._numMorphTargets; i++) {
                                    value[i] = data.output[outputBufferOffset++];
                                }
                                return value;
                            };
                            break;
                        }
                }
                var getNextKey = void 0;
                switch (data.interpolation) {
                    case BABYLON.GLTF2.AnimationSamplerInterpolation.STEP:
                        {
                            getNextKey = function getNextKey(frameIndex) {
                                return {
                                    frame: data.input[frameIndex],
                                    value: getNextOutputValue(),
                                    interpolation: BABYLON.AnimationKeyInterpolation.STEP
                                };
                            };
                            break;
                        }
                    case BABYLON.GLTF2.AnimationSamplerInterpolation.LINEAR:
                        {
                            getNextKey = function getNextKey(frameIndex) {
                                return {
                                    frame: data.input[frameIndex],
                                    value: getNextOutputValue()
                                };
                            };
                            break;
                        }
                    case BABYLON.GLTF2.AnimationSamplerInterpolation.CUBICSPLINE:
                        {
                            getNextKey = function getNextKey(frameIndex) {
                                return {
                                    frame: data.input[frameIndex],
                                    inTangent: getNextOutputValue(),
                                    value: getNextOutputValue(),
                                    outTangent: getNextOutputValue()
                                };
                            };
                            break;
                        }
                }
                var keys = new Array(data.input.length);
                for (var frameIndex = 0; frameIndex < data.input.length; frameIndex++) {
                    keys[frameIndex] = getNextKey(frameIndex);
                }
                _this7.babylonScene.offlineProvider.createAnimationKeys(key, keys); //缓存关键帧
                return keys;
            });
        }
    }]);

    return GLTF2Loader;
}(BABYLON.GLTF2.GLTFLoader);

exports.GLTF2Loader = GLTF2Loader;
var textureKey = function textureKey(url, noMipmap, sampling) {
    return BABYLON_TEXTURE_TYPE + ":" + url + "_" + noMipmap + "_" + (sampling ? true : false);
};
var geometryKey = function geometryKey(id) {
    return BABYLON_GEOMETRY_TYPE + ":" + id;
};
var createTextureRes = function createTextureRes(name, type, texture, _) {
    return res_mgr_1.loadOK(name, type, null, TextureRes, texture);
};
var createGeometryRes = function createGeometryRes(name, type, geometry, _) {
    return res_mgr_1.loadOK(name, type, null, GeometryRes, geometry);
};
var BABYLON_TEXTURE_TYPE = "babylon_texture";
var BABYLON_GEOMETRY_TYPE = "babylon_geometry";
res_mgr_1.register(BABYLON_TEXTURE_TYPE, function (name, type, texture, _) {
    createTextureRes(name, type, texture, _);
});
res_mgr_1.register(BABYLON_GEOMETRY_TYPE, function (name, type, geometry, _) {
    createGeometryRes(name, type, geometry, _);
});
})