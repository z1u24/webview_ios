_$define("pi/render3d/scene", function (require, exports, module){
"use strict";
/**
 *
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var _CANVAS = require("../util/canvas");
var _LOAD = require("./load");
var ps_1 = require("./particlesystem/ps");
var three_1 = require("./three");
var spine_1 = require("./spine");

var PlayObj = function PlayObj() {
    _classCallCheck(this, PlayObj);
};

exports.createScene = function (renderer, data) {
    return new SceneImpl(renderer, data);
};
// tslint:disable:variable-name
var _size = {
    width: 0,
    height: 0
};
var _tmpPt = new three_1.THREE.Vector3();
var _tmpV4 = new three_1.THREE.Vector4();
var _tmpMat = new three_1.THREE.Matrix4();
exports.parseSkeleton = function () {
    return null;
};

var SceneImpl = function () {
    function SceneImpl(renderer, data) {
        _classCallCheck(this, SceneImpl);

        // 是否已经释放
        this.destroyed = false;
        this.renderer = renderer;
        // THREE.WebGLRenderer的句柄
        this.impl3D = renderer.getThreeRenderer();
        this.post = new three_1.THREE.PostRender(this.impl3D);
        this.width = this.impl3D.domElement.width;
        this.height = this.impl3D.domElement.height;
        var cap = this.impl3D.capabilities;
        this.maxBones = Math.floor((cap.maxVertexUniforms - 60) / 4);
        this.useVertexTexture = cap.floatVertexTextures > 0;
        this.scene = new three_1.THREE.Scene();
        this.scene2D = new three_1.THREE.Scene();
        this.scene2D.add(new three_1.THREE.AmbientLight([1, 1, 1]));
        this.meshArray = [];
        this.attachmentArray = [];
        this.camera = undefined;
        this.camera2D = undefined;
        this.terrain = undefined;
        this.raycaster = new three_1.THREE.Raycaster();
        this.raycast3DArray = [];
        this.raycast2DArray = [];
        if (!data) return;
        if (data.terrain) {
            this.initTerrain(data.terrain.path, data.resTab, data.terrain.scale);
        }
        if (data.fog) {
            this.initFog(data.fog);
        }
        if (data.lights) {
            for (var i = 0; i < data.lights.length; i++) {
                var impl = this.initLight(data.lights[i]);
                if (impl) {
                    this.scene.add(impl);
                }
            }
        }
        if (data.skybox) {
            this.initSkybox(data.skybox, data.resTab);
        }
        if (data.staticObj) {
            this.insertScene(data.staticObj, data.resTab);
        }
    }

    _createClass(SceneImpl, [{
        key: "setScene2DFactor",
        value: function setScene2DFactor(wFactor, hFactor) {
            this.scene2D.scale.set(wFactor, hFactor, 1);
        }
    }, {
        key: "getCameraObject",
        value: function getCameraObject() {
            return this.cameraObject;
        }
    }, {
        key: "raycast",
        value: function raycast(x, y, ignoreObj) {
            if (this.destroyed) {
                throw new Error('THREE.PiScene.raycast failed, scene is destroyed!');
            }
            if (!this.camera) {
                throw new Error('THREE.PiScene.raycast failed, no 3d camera!');
            }
            var size = this.renderer.getSize();
            var mouse = {
                x: x / size.width * 2 - 1,
                y: -(y / size.height) * 2 + 1
            };
            // 2D 相机优先
            if (this.camera2D) {
                this.raycaster.setFromCamera(mouse, this.camera2D);
                var _r = void 0;
                var _intersects = this.raycaster.intersectObjects(this.raycast2DArray, false, ignoreObj);
                if (_intersects.length > 0) {
                    var inter = _intersects[0]; // 按距离升序排列
                    _r = {
                        type: 'mesh',
                        id: inter.object.rayID
                    };
                    return _r;
                }
            }
            this.raycaster.setFromCamera(mouse, this.camera);
            // 保证地形永远放到最后一个
            if (this.terrain) {
                this.raycast3DArray.push(this.terrain);
            }
            var r = void 0;
            var intersects = this.raycaster.intersectObjects(this.raycast3DArray, false, ignoreObj);
            if (this.terrain) {
                this.raycast3DArray.pop();
            }
            if (intersects.length > 0) {
                var _inter = intersects[0]; // 按距离升序排列
                // 注：约定了网格地形的ID为负数
                if (_inter.object.rayID < 0) {
                    r = {
                        type: 'terrain',
                        data: [_inter.point.x, _inter.point.y, _inter.point.z],
                        id: _inter.object.rayID
                    };
                } else if (_inter.object === this.terrain) {
                    r = {
                        type: 'terrain',
                        data: [_inter.point.x, _inter.point.y, _inter.point.z]
                    };
                } else {
                    r = {
                        type: 'mesh',
                        id: _inter.object.rayID
                    };
                }
            }
            return r;
        }
        /**
         * 释放场景
         */

    }, {
        key: "destroy",
        value: function destroy() {
            if (!this.destroyed) {
                this.terrain && this.terrain.dispose();
                this.attachmentArray.length = 0;
                var dispose = function dispose(root) {
                    root.dispose && root.dispose();
                    var children = root.children;
                    if (!children) {
                        return;
                    }
                    for (var i = 0; i < children.length; i++) {
                        dispose(children[i]);
                    }
                };
                dispose(this.scene);
                dispose(this.scene2D);
                if (this.skybox) {
                    this.skybox.dispose();
                }
                this.meshArray.length = 0;
                this.raycast3DArray = [];
                this.raycast2DArray = [];
                delete this.camera;
                delete this.camera2D;
                this.scene.children = [];
                this.scene2D.children = [];
                delete this.scene;
                delete this.scene2D;
                this.destroyed = true;
            }
        }
        /**
         * 渲染，高层控帧
         */

    }, {
        key: "render",
        value: function render(deltaMS, isAutoClear) {
            // 更新spine骨骼动画
            this.meshArray.forEach(function (v) {
                if (v.name === "spine" && v.visible) {
                    v.update(deltaMS);
                }
            });
            if (isAutoClear !== undefined) this.impl3D.autoClear = isAutoClear;
            if (this.camera.posts && this.camera.posts.length > 0) {
                var src = this.createRenderTarget();
                this.impl3D.render(this.scene, this.camera, deltaMS, src);
                for (var i = 0; i < this.camera.posts.length; i++) {
                    if (i < this.camera.posts.length - 1) {
                        var dist = this.createRenderTarget();
                        this.camera.posts[i].onRenderImage(this.post, src, dist, deltaMS);
                        src = dist;
                    } else {
                        this.camera.posts[i].onRenderImage(this.post, src, null, deltaMS);
                    }
                }
            } else {
                this.impl3D.render(this.scene, this.camera, deltaMS);
            }
            this.impl3D.autoClear = true;
            if (this.camera2D) {
                this.updateScreenPoints();
                this.impl3D.autoClear = false;
                this.impl3D.render(this.scene2D, this.camera2D, deltaMS);
                this.impl3D.autoClear = true;
            }
        }
    }, {
        key: "createRenderTarget",
        value: function createRenderTarget() {
            if (!this.renderTargets) {
                this.renderTargets = [];
            }
            if (!this.renderTargets[0]) {
                this.renderTargets[0] = new three_1.THREE.WebGLRenderTarget(this.width, this.height);
            }
            var temp = this.renderTargets[0];
            this.renderTargets[0] = this.renderTargets[1];
            this.renderTargets[1] = temp;
            return temp;
        }
        /**
         * json = [{
         *   ref: 当传进来的json数据没有该值时候，创建对象；然后返回的数据带着这个字段；
         *
         *   attachSkeleton: true, // 代表该对象用父对象的骨骼动画
         *
         *   material: {
         *      住：仅在创建时候使用一次！
         *      查看material.js文件，描述参数
         *   }
         *   children: [],
         *
         *   // 仅当type为"Mesh" 或者时有效，而且不能通过update方法修改
         *   shape: "Circle", "Quad", "Sphere"
         *
         *   color: 0xFF777777,
         *   texture: "a.png",
         *
         *   gray: true, false
         *
         *   config: "配置路径",
         *
         *   type: "Mesh", "Camera", "Node", "Text", "PointLight", "SpotLight"
         *   attachment: "2D", "3D"（默认）
         *
         *   parentBone: 如果有该字段，表示该对象是骨骼绑定方式，这里填父对象骨头名字
         *
         *   // 空间信息，相对关系，Node
         *   position: [x, y, z],
         *   rotate:  [x, y, z], 旋转的欧拉角，供相机使用
         *   lookatOnce: [x, y, z],  正面朝向的目标点的位置；供角色使用
         *   scale: [1, 1, 1],
         *   rayID: 有该字段的对象，才可以参与射线检测（射线检测不包含子对象）
         *
         *   // type为 "PointLight"（点光源） 时，才会有如下字段
         *   startAtten: 1.0,
         *   endAtten: 0.0,
         *   diffuse: 0xFFFFFF,
         *   specular: 0x0
         *
         *   // type为 "SpotLight"（聚光灯） 时，才会有如下字段
         *   startAtten: 1.0,
         *   endAtten: 0.0,
         *
         *   spotDirection: [x, y, z],
         *   spotCosCutoff: 1.0,
         *   spotExponent: 1.0,
         *
         *   diffuse: 0xFFFFFF,
         *   specular: 0x0
         *
         *   // type为 "Text" 时，才会有如下字段
         *   text: "显示的字符串",
         *   material: {
         *       设置在canvas的context
         *   }
         *
         *   // type 为 "mesh"时，才会有如下字段（准确的说，只有带skeleton时才会有）
         *   uvAnim: true代表循环播放uv动画，false代表播放一次uv动画
         *   modelAnim: true代表循环播放model动画，false代表播放一次动画
         *   animationSpeed: 速度，默认为1.0
         *   animationLoop: 默认的循环动作
         *   animationOnce: 当该字段有值时，会播放一次该动画，然后回到loop动画
         *   animationDir: 播放动画的方向，默认正向播放
         *
         *   // type 为 "camera"时，才会有如下字段
         *
         *   perspective: [fov, aspect, near, far],
         *   ortho: [left, right, top, bottom, near, far]
         * }];
         */
        /**
         * 将obj放到parent上
         * 如果obj没有ref字段，则会创建一个新的
         */

    }, {
        key: "insert",
        value: function insert(obj, parent, resTab) {
            if (this.destroyed) {
                throw new Error('THREE.PiScene.insert failed, scene is destroyed!');
            }
            var root = obj.attachment === '2D' ? this.scene2D : this.scene;
            parent = parent || {
                attachment: obj.attachment,
                ref: {
                    impl: root,
                    attachment: obj.attachment // 3D对应3D场景，2D对应2D场景
                }
            };
            if (!obj.ref) {
                var resCount = { tatal: 0, curr: 0 };
                this.initSceneChildren(parent, [obj], resCount, resTab);
            } else {
                throw new Error('insert failed, obj.ref is already exist');
            }
        }
        /**
         * 将obj放到parent上
         * 如果obj没有ref字段，则会创建一个新的
         */

    }, {
        key: "insertScene",
        value: function insertScene(obj, resTab) {
            if (this.destroyed) {
                throw new Error('THREE.PiScene.insert failed, scene is destroyed!');
            }
            var root = obj.attachment === '2D' ? this.scene2D : this.scene;
            var parent = {
                attachment: obj.attachment,
                ref: {
                    impl: root,
                    attachment: obj.attachment // 3D对应3D场景，2D对应2D场景
                }
            };
            if (!obj.ref) {
                var resCount = { tatal: 0, curr: 0 };
                this.initSceneChildren(parent, [obj], resCount, resTab);
            } else {
                throw new Error('insert failed, obj.ref is already exist');
            }
        }
        /**
         * 修改obj的itemKey字段
         * 注：obj必须要有ref字段
         */

    }, {
        key: "modify",
        value: function modify(obj, keys) {
            if (this.destroyed) {
                throw new Error('THREE.PiScene.modify failed, scene is destroyed!');
            }
            if (!obj.ref) {
                throw new Error('THREE.PiScene.modify failed ! ');
            }
            var propertyIndex = keys[keys.length - 1]; // 找到属性数组中的最后一个属性
            var targetObj = findProperty(obj, keys);
            if (this[propertyIndex]) {
                this[propertyIndex].call(this, targetObj[propertyIndex], obj.ref.impl, keys, obj.resTab);
            } else {
                var targetimpl = findProperty(obj.ref.impl, keys);
                targetimpl[propertyIndex] = targetObj[propertyIndex];
            }
        }
        /**
         * 删除obj的ref
         */

    }, {
        key: "remove",
        value: function remove(obj) {
            if (this.destroyed) {
                throw new Error('THREE.PiScene.remove failed, scene is destroyed!');
            }
            if (!obj || !obj.ref) return;
            var impl = obj.ref.impl;
            if (!impl) return;
            impl.parent && impl.parent.remove(impl);
            this.removeRef(obj);
            this._remove(impl);
        }
        /**
         * 删除ref
         */

    }, {
        key: "removeRef",
        value: function removeRef(obj) {
            if (!obj || !obj.ref) return;
            delete obj.ref;
            if (!obj.children) {
                return;
            }
            for (var i = 0; i < obj.children.length; i++) {
                this.removeRef(obj.children[i]);
            }
        }
        /**
         * 工具方法：用于转换3D坐标到屏幕
         * pt: 3D坐标 [x, y, z]
         * result: 结果，2D坐标 [x, y, z]
         */

    }, {
        key: "getScreenPoint",
        value: function getScreenPoint(pt, result) {
            _tmpMat.multiplyMatrices(this.camera.projectionMatrix, _tmpMat.getInverse(this.camera.matrixWorld));
            this.impl3D.getSize(_size);
            _tmpV4.set(pt[0], pt[1], pt[2], 1.0);
            _tmpV4.applyMatrix4(_tmpMat);
            // tslint:disable:binary-expression-operand-order
            result[0] = -0.5 * _size.width * _tmpV4.x / _tmpV4.w;
            result[1] = 0.5 * _size.height * _tmpV4.y / _tmpV4.w;
            result[2] = 0.5 * _tmpV4.z / _tmpV4.w;
        }
    }, {
        key: "initSkybox",
        value: function initSkybox(cfg, resTab) {
            var geo = { width: 8000, height: 8000, longness: 8000 };
            var render = { material: [] };
            for (var i = 0; i < cfg.length; i++) {
                var map = { image: { name: cfg[i] } };
                render.material[i] = {};
                render.material[i].map = map;
            }
            this.skybox = _LOAD.newloadShape(this.renderer, geo, render, resTab);
            this.scene.add(this.skybox);
        }
        // ------------------- 下面是私有方法 ----------------------------
        // tslint:disable:function-name

    }, {
        key: "_remove",
        value: function _remove(impl) {
            var i = void 0;
            var index = void 0;
            // 射线检测
            index = this.raycast3DArray.indexOf(impl);
            if (index >= 0) {
                this.raycast3DArray.splice(index, 1);
            }
            index = this.raycast2DArray.indexOf(impl);
            if (index >= 0) {
                this.raycast2DArray.splice(index, 1);
            }
            //  顶层的2D物体     
            index = this.attachmentArray.indexOf(impl);
            if (index >= 0) {
                delete impl.__piAttachment;
                this.attachmentArray.splice(index, 1);
            }
            index = this.meshArray.indexOf(impl);
            if (index >= 0) {
                this.meshArray.splice(index, 1);
            }
            impl.dispose && impl.dispose();
            // 删除3D节点对应的2D子节点
            var r = [];
            var d = [];
            for (i = 0; i < this.attachmentArray.length; ++i) {
                if (impl === this.attachmentArray[i].__piAttachment) {
                    this.scene2D.remove(this.attachmentArray[i]);
                    d.push(this.attachmentArray[i]);
                } else {
                    r.push(this.attachmentArray[i]);
                }
            }
            this.attachmentArray = r;
            for (i = 0; i < d.length; ++i) {
                this._remove(d[i]);
            }
            d = undefined;
            for (i = 0; impl.children && i < impl.children.length; ++i) {
                this._remove(impl.children[i]);
            }
            impl.children.length = 0;
        }
        // 更新，位置3D变2D

    }, {
        key: "updateScreenPoints",
        value: function updateScreenPoints() {
            if (this.attachmentArray.length > 0) {
                _tmpMat.multiplyMatrices(this.camera.projectionMatrix, _tmpMat.getInverse(this.camera.matrixWorld));
            }
            this.impl3D.getSize(_size);
            for (var i = 0; i < this.attachmentArray.length; ++i) {
                var impl = this.attachmentArray[i];
                var pimpl = impl.__piAttachment;
                var p = pimpl.getWorldPosition(_tmpPt);
                _tmpV4.set(p.x, p.y, p.z, 1.0);
                _tmpV4.applyMatrix4(_tmpMat);
                p.set(_tmpV4.x / _tmpV4.w, _tmpV4.y / _tmpV4.w, _tmpV4.z / _tmpV4.w);
                p.set(-p.x * _size.width * 0.5, p.y * _size.height * 0.5, 0);
                if (!impl.__piPosition) {
                    impl.__piPosition = impl.position.clone();
                }
                impl.position.addVectors(p, impl.__piPosition);
            }
        }
    }, {
        key: "addToRaycastList",
        value: function addToRaycastList(obj, mesh) {
            if (obj.rayID) {
                mesh.rayID = obj.rayID;
                if (obj.rayID < 0) {
                    this.raycast3DArray.push(mesh);
                } else {
                    if (obj.attachment === '2D') {
                        this.raycast2DArray.unshift(mesh);
                    } else {
                        this.raycast3DArray.unshift(mesh);
                    }
                }
            }
        }
    }, {
        key: "gray",
        value: function gray(obj) {
            if (obj.gray !== undefined) {
                var m = obj.ref.impl;
                m.setGray(obj.gray);
            }
        }
    }, {
        key: "childVisible",
        value: function childVisible(obj) {
            if (obj.childVisible !== undefined) {
                obj.ref.impl.childVisible = obj.childVisible;
                // obj.ref.impl.visible = obj.childVisible;
            }
        }
    }, {
        key: "boneVisible",
        value: function boneVisible(obj) {
            if (obj.boneVisible !== undefined) {
                obj.ref.impl.boneVisible = obj.boneVisible;
            }
        }
        /**
         * 注：地形文件必须放在 res/terrain目录
         */

    }, {
        key: "initTerrain",
        value: function initTerrain(configName, resTab, scale) {
            var _this = this;

            _LOAD.loadTerrain(configName, this.renderer, resTab, function (terrain) {
                if (_this.destroyed) {
                    terrain.dispose();
                    return;
                }
                _this.terrain = terrain;
                if (scale) {
                    _this.terrain.scale.fromArray(scale);
                }
                _this.scene.add(_this.terrain);
            });
        }
    }, {
        key: "initFog",
        value: function initFog(fog) {
            if (fog.type === 'Linear') {
                this.scene.fog = new three_1.THREE.Fog(fog.color, fog.near, fog.far);
            } else if (fog.type === 'Exp') {
                this.scene.fog = new three_1.THREE.FogExp2(fog.color, fog.density);
            }
        }
        // =========================================================初始化场景
        // tslint:disable:cyclomatic-complexity

    }, {
        key: "initSceneChildren",
        value: function initSceneChildren(parent, children, resCount, resTab) {
            var _this2 = this;

            if (!children || children.length === 0) {
                parent.ref.impl.childReadyOk();
                return;
            }
            var skeletonRes = void 0;
            var boneChildren = [];
            var skinnedMesh = void 0;
            var spineRes = void 0;
            for (var i = 0; children && i < children.length; ++i) {
                var obj = children[i];
                var impl = void 0;
                if (!obj) {
                    parent.ref.impl.childReadyOk();
                    continue;
                }
                if (obj.type === 'Skeleton') {
                    skeletonRes = obj.res;
                    parent.ref.impl.isSkeletonAnimation = true;
                    resCount.tatal++;
                    continue;
                }
                obj.resTab = resTab;
                children[i].resTab = resTab;
                // (!obj.spineLitener && parent.spineLitener) && (obj.spineLitener = parent.spineLitener);
                // if (obj.type === "spine") {
                // 	spineRes = obj.spine;
                // 	resCount.tatal++;
                // 	continue;
                // }
                if (obj.camera) {
                    this.cameraObject = obj;
                }
                impl = this.initObjectComponent(obj);
                impl.attachment = obj.attachment;
                // 2D相机返回undefined
                if (!impl) continue;
                children[i].ref = {
                    impl: impl
                };
                obj.ref = {
                    impl: impl
                };
                !obj.spineLitener && parent.spineLitener && (obj.spineLitener = parent.spineLitener);
                if (obj.type === "spine") {
                    spineRes = obj.spine;
                    resCount.tatal++;
                    continue;
                }
                this.meshArray.push(impl);
                this.addToRaycastList(obj, impl);
                if (obj.animator) {
                    impl.aniControl = obj.animator.controller;
                    if (obj.animator.aniBox) {
                        impl.aniBox = {};
                        for (var k in obj.animator.aniBox) {
                            if (k === '_$hash') {
                                continue;
                            }
                            var center = obj.animator.aniBox[k].center;
                            var size = obj.animator.aniBox[k].size;
                            var max = new three_1.THREE.Vector3(center[0] + size[0], center[1] + size[1], center[2] + size[2]);
                            var min = new three_1.THREE.Vector3(center[0] - size[0], center[1] - size[1], center[2] - size[2]);
                            impl.aniBox[k] = new three_1.THREE.Box3(min, max);
                        }
                    }
                }
                impl.name = obj.name;
                if (obj.bindBone) {
                    boneChildren.push(obj);
                    parent.ref.impl.childReadyOk();
                } else {
                    this.addChild(parent, obj);
                }
                this.initOtherComponent(obj); // 初始化组件
                if (obj.ref.impl instanceof three_1.THREE.Light) {
                    if (obj.ref.impl.target) {
                        parent.ref.impl.add(obj.ref.impl.target);
                    }
                }
                // 不是和骨骼节点一起插入进场景的蒙皮模型，需要去场景数上找到对应骨骼
                if (obj.skinnedMeshRender && !skeletonRes) {
                    skinnedMesh = obj;
                }
                if (!obj.children && obj.animator && obj.animator.playAnim) {
                    var option = obj.animator.playAnim;
                    this.playAnim(option, obj.ref.impl, undefined, resTab);
                }
                obj.children && (impl.childrenCount = obj.children.length);
                this.initSceneChildren(obj, obj.children, resCount, resTab);
            }
            // 不是和骨骼节点一起插入进场景的蒙皮模型，需要去场景数上找到对应骨骼
            if (skinnedMesh && !skeletonRes) {
                var skTemp = parent ? parent.ref.impl : null;
                if (skTemp) {
                    skinnedMesh.ref.impl.setSkeleton(skTemp, skinnedMesh.bones);
                }
            }
            // 如果父节点上存在skeleton, 并且有需要绑在骨头上的子节点, 则将这些节点绑在父节点的skeleton上
            if (parent && parent.ref && parent.ref.impl.skeleton && boneChildren.length > 0) {
                bindBone(parent.ref.impl.skeleton, boneChildren);
            }
            // 初始化骨骼
            if (skeletonRes && parent) {
                _LOAD.newloadSkeleton(skeletonRes, resTab, function (bones) {
                    // 将加载到的骨头添加到骨骼的包装节点和需要使用该骨骼的节点上
                    var skel = parent.ref.impl.setSkeletonChild(bones);
                    for (var _i = 0; _i < children.length; _i++) {
                        var child = children[_i];
                        if (child.skinnedMeshRender && child.ref) {
                            var sBonesIndex = child.skinnedMeshRender.bones;
                            if (sBonesIndex) {
                                child.ref.impl.setSkeleton(skel, sBonesIndex);
                            }
                            child.ref.impl.bones = bones;
                        }
                    }
                    // 含有bindBone属性的节点，应该添加到对应骨头的子节点上
                    bindBone(skel, boneChildren);
                    resCount.curr++;
                    _this2.loadResOk(resCount);
                });
            }
            // 初始化spine数据
            if (spineRes) {
                _LOAD.loadString("" + spineRes.proRes, resTab, function (r) {
                    // _LOAD.loadImgTexture( { name: `${spineRes.imgRes}` }, null, resTab, (r) => {
                    // loadTextureAtlas 返回 TextureAtlas
                    // loadTextureAtlas 加载Atlas后解析, 创建TextureAtlas，并解析配置，获得需要的资源文件(在pages[].name); 再加载资源，成功后设置TextureAtlas各纹理
                    _LOAD.loadTextureAtlas("" + spineRes.atlas, resTab, function (r) {
                        // loadOk = true;
                        var imgArr = [];
                        var textureAtlas = r;
                        textureAtlas.pages.forEach(function (ele) {
                            imgArr.push({ name: ele.name });
                        });
                        _LOAD.loadImgTextures(imgArr, null, resTab, function (r) {
                            // 资源加载成功后 设置纹理
                            // textureAtlas.setPageAndRegionTexture( _LOAD.getNewTexture, resTab );
                            var textures = {};
                            imgArr.forEach(function (ele) {
                                ele && (textures["" + ele.name] = _LOAD.findTexture(ele.name, resTab));
                            });
                            textureAtlas.setPageAndRegionTexture2(textures);
                            for (var _i2 = 0; _i2 < children.length; _i2++) {
                                var child = children[_i2];
                                if (child.type === "spine") {
                                    // console.log(child)
                                    var _impl = _this2.initSpine(child);
                                    child.ref.impl = _impl;
                                    // child.ref = {
                                    // 	impl: impl
                                    // };
                                    _this2.meshArray.push(_impl);
                                    // this.addToRaycastList(child, impl);
                                    _this2.addChild(parent, child);
                                    resCount.curr++;
                                    _this2.loadResOk(resCount);
                                }
                            }
                        });
                    });
                    // });
                });
            }
            if (parent.animator && parent.animator.playAnim) {
                var _option = parent.animator.playAnim;
                this.playAnim(_option, parent.ref.impl, undefined, resTab);
            }
            this.loadResOk(resCount);
        }
        // 添加子节点

    }, {
        key: "addChild",
        value: function addChild(parent, child) {
            // 2D节点挂在3D节点上
            if (child.attachment === '2D' && parent.attachment !== '2D') {
                this.scene2D.add(child.ref.impl);
                child.ref.impl.__piAttachment = parent.ref.impl;
                this.attachmentArray.push(child.ref.impl);
            } else {
                parent.ref.impl.add(child.ref.impl);
            }
        }
        // 完成资源加载

    }, {
        key: "loadResOk",
        value: function loadResOk(resCount) {
            if (resCount.tatal === resCount.curr) {
                resCount.tatal = resCount.curr = 0;
            }
        }
    }, {
        key: "createSceneAmbientLight",
        value: function createSceneAmbientLight(obj) {
            return new three_1.THREE.AmbientLight(obj.color);
        }
    }, {
        key: "createSceneDirectionLight",
        value: function createSceneDirectionLight(obj) {
            return new three_1.THREE.DirectionalLight(obj.direction, obj.diffuse, obj.specular);
        }
    }, {
        key: "createScenePointLight",
        value: function createScenePointLight(obj) {
            return new three_1.THREE.PointLight(obj.isUseNormal, obj.startAtten, obj.endAtten, obj.diffuse, obj.specular);
        }
    }, {
        key: "createSceneSpotLight",
        value: function createSceneSpotLight(obj) {
            return new three_1.THREE.SpotLight(obj.startAtten, obj.endAtten, obj.spotDirection, obj.spotCosCutoff, obj.spotExponent, obj.diffuse, obj.specular);
        }
    }, {
        key: "initObjectComponent",
        value: function initObjectComponent(obj) {
            var impl = void 0;
            impl = impl || this.initMeshAndMeshRender(obj.meshRender, obj.geometry, obj.resTab);
            impl = impl || this.initSkinnedMeshRender(obj.skinnedMeshRender, obj.resTab);
            impl = impl || this.initCamera(obj.camera);
            impl = impl || this.initTextCon(obj.textCon, obj.resTab);
            impl = impl || this.initLight(obj.light);
            impl = impl || this.initParticleSystem(obj.particlesystem, obj.attachment, obj.resTab);
            impl = impl || this.initBox(obj.box);
            impl = impl || this.initSpine(obj);
            impl = impl || this.initObject3D();
            return impl;
        }
    }, {
        key: "initOtherComponent",
        value: function initOtherComponent(obj) {
            this.initBoxCollider(obj.boxCollider, obj.ref.impl);
            this.initTransform(obj.transform, obj.ref.impl, obj.textCon && obj.textCon.textcfg);
            this.initAnimator(obj.animator, obj.ref.impl, obj.resTab);
            if (obj.lookatOnce) {
                this.lookatOnce(obj.lookatOnce, obj.ref.impl);
            }
            this.childVisible(obj);
            this.boneVisible(obj);
            this.initWave(obj.wave, obj.ref.impl);
            this.initLut(obj.lut, obj.ref.impl, obj.resTab);
        }
    }, {
        key: "initWave",
        value: function initWave(wave, impl) {
            if (wave) {
                this.wave(wave, impl);
            }
        }
    }, {
        key: "initLut",
        value: function initLut(lut, impl, resTab) {
            if (lut) {
                if (!impl.lut) {
                    impl.lut = new three_1.THREE.LutEffect();
                }
                if (!impl.posts) {
                    impl.posts = [];
                }
                impl.posts.push(impl.lut);
                _LOAD.loadImgTexture({ name: lut }, this.renderer, resTab, function (texture) {
                    impl.lut.setTexture(texture);
                });
            }
        }
    }, {
        key: "initBoxCollider",
        value: function initBoxCollider(boxCollider, impl) {
            if (boxCollider) {
                var min = new three_1.THREE.Vector3();
                min.fromArray(boxCollider.min);
                var max = new three_1.THREE.Vector3();
                max.fromArray(boxCollider.max);
                impl.settingBound = new three_1.THREE.Box3(min, max);
            }
        }
    }, {
        key: "initTransform",
        value: function initTransform(transform, impl, textcfg) {
            if (!transform) {
                return;
            }
            this.position(transform.position, impl);
            this.scale(transform.scale, impl, textcfg);
            this.rotate(transform.rotate, impl);
        }
    }, {
        key: "initAnimator",
        value: function initAnimator(animator, impl, resTab) {
            if (!animator) {
                return;
            }
            impl.aniControl = animator.controller; // 设置动画控制器
        }
    }, {
        key: "initTextCon",
        value: function initTextCon(textCon, resTab) {
            if (!textCon) {
                return;
            }
            var textcfg = textCon.textcfg;
            var impl = void 0;
            if (textcfg.isCommon) {
                impl = new three_1.THREE.ImageText(textCon);
                _LOAD.loadText(impl, textCon, this.renderer, resTab);
            } else {
                textcfg.text = textCon.show;
                impl = new three_1.THREE.Text2D(textCon, resTab, _LOAD.GeometryRes, _LOAD.TextureRes, _CANVAS);
            }
            return impl;
        }
    }, {
        key: "initSkinnedMeshRender",
        value: function initSkinnedMeshRender(skinnedMeshRender, resTab) {
            if (!skinnedMeshRender) {
                return;
            }
            var impl = _LOAD.newloadSkeletonMesh(this.renderer, skinnedMeshRender, resTab, this.maxBones, this.useVertexTexture);
            this.visible(skinnedMeshRender.visible, impl);
            return impl;
        }
    }, {
        key: "initLight",
        value: function initLight(light) {
            if (!light) {
                return;
            }
            var impl = void 0;
            if (light.type === 'Ambient') {
                impl = this.ambientLight = new three_1.THREE.AmbientLight(light.color);
            } else if (light.type === 'Direction') {
                impl = new three_1.THREE.DirectionalLight(light.direction, light.diffuse, light.specular);
            }
            return impl;
        }
    }, {
        key: "initParticleSystem",
        value: function initParticleSystem(particlesystem, attachment, resTab) {
            if (!particlesystem) {
                return;
            }
            var scene = attachment === '2D' ? this.scene2D : this.scene;
            var impl = new ps_1.ParticleSystem(particlesystem, scene, this.renderer, resTab);
            return impl;
        }
    }, {
        key: "initMeshAndMeshRender",
        value: function initMeshAndMeshRender(meshRender, geo, resTab) {
            if (!meshRender) {
                return;
            }
            var impl = void 0;
            if (geo.type === 'BufferGeometry') {
                impl = _LOAD.newloadMesh(this.renderer, geo, meshRender, resTab);
            } else if (geo.type === 'Plane') {
                impl = _LOAD.newloadPlane(this.renderer, geo, meshRender, resTab);
            } else {
                impl = _LOAD.newloadShape(this.renderer, geo, meshRender, resTab);
            }
            this.visible(meshRender.visible, impl);
            return impl;
        }
    }, {
        key: "initCamera",
        value: function initCamera(camera) {
            if (!camera) {
                return;
            }
            var impl = void 0;
            if (camera.perspective) {
                var fov = camera.perspective[0];
                var aspect = camera.perspective[1];
                var near = camera.perspective[2];
                var far = camera.perspective[3];
                impl = this.camera = new three_1.THREE.PerspectiveCamera(fov, aspect, near, far);
            } else if (camera.ortho) {
                var l = camera.ortho[0];
                var r = camera.ortho[1];
                var t = camera.ortho[2];
                var b = camera.ortho[3];
                var n = camera.ortho[4];
                var f = camera.ortho[5];
                //impl = this.camera2D = new THREE.OrthographicCamera(l, r, t, b, n, f);
                impl = new three_1.THREE.OrthographicCamera(l, r, t, b, n, f);
                if (!this.camera) {
                    this.camera = impl;
                    // this.camera2D = impl;
                } else {
                    this.camera2D = impl;
                }
            }
            return impl;
        }
        /**
         * 初始化spine数据
         * @param spine
         * @param resTab
         */

    }, {
        key: "initSpine",
        value: function initSpine(obj) {
            if (!obj.spine) return;
            function start() {
                obj.spineLitener && obj.spineLitener.start && obj.spineLitener.start(skeletonMesh);
            }
            ;
            function end() {
                obj.spineLitener && obj.spineLitener.end && obj.spineLitener.end(skeletonMesh);
            }
            ;
            function complete() {
                obj.spineLitener && obj.spineLitener.complete && obj.spineLitener.complete(skeletonMesh);
            }
            ;
            function disposed() {
                obj.spineLitener && obj.spineLitener.dispose && obj.spineLitener.dispose(skeletonMesh);
            }
            ;
            var res = void 0;
            var spineCfg = obj.spine;
            // res = resTab.get(`${_LOAD.RES_TYPE_TEXTURE_ATLAS_IMAGE}:${_LOAD.parseUrl(spineCfg.imgRes)}`);
            // if (!res) return new THREE.Object3D();
            // res = resTab.get(`${_LOAD.RES_TYPE_TEXTURE}:${_LOAD.parseUrl(spineCfg.proRes)}`);
            // if (!res) return new THREE.Object3D();
            res = obj.resTab.get(_LOAD.RES_TYPE_TEXTURE_ATLAS + ":" + _LOAD.parseUrl(spineCfg.atlas));
            if (!res) return;
            var atlas = res.link;
            // Create a AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
            var atlasLoader = new spine_1.Spine.AtlasAttachmentLoader(atlas);
            // Create a SkeletonJson instance for parsing the .json file.
            var skeletonJson = new spine_1.Spine.SkeletonJson(atlasLoader);
            // Set the scale to apply during parsing, parse the file, and create a new skeleton.
            skeletonJson.scale = spineCfg.scale || 1;
            // const data = assetManager.get(skeletonFile);
            var data = obj.resTab.get(_LOAD.RES_TYPE_STRING + ":" + _LOAD.parseUrl(spineCfg.proRes)).link;
            var skeletonData = skeletonJson.readSkeletonData(data);
            // Create a SkeletonMesh from the data and attach it to the scene
            // 内部处理有调整部分代码
            var skeletonMesh = new spine_1.Spine.threejs.SkeletonMesh(skeletonData);
            skeletonMesh.name = "spine";
            if (spineCfg.position) {
                skeletonMesh.position.set(spineCfg.position[0], spineCfg.position[1], spineCfg.position[2]);
            }
            skeletonMesh.state.setAnimation(0, spineCfg.aniName, spineCfg.isLoop);
            skeletonMesh.state.addListener({
                start: start,
                end: end,
                complete: complete,
                disposed: disposed
            });
            return skeletonMesh;
        }
    }, {
        key: "modifySpine",
        value: function modifySpine(skeletonMesh, aniName, isLoop, listener) {
            skeletonMesh.state.setAnimation(0, aniName, isLoop);
        }
    }, {
        key: "initBox",
        value: function initBox(boxCfg) {
            if (!boxCfg) return;
            var geometry = new three_1.THREE.BoxGeometry(boxCfg.geometry.width, boxCfg.geometry.height, boxCfg.geometry.depth);
            var material = new three_1.THREE.MeshBasicMaterial({ color: boxCfg.material.color, wireframe: true, opacity: boxCfg.material.opacity === undefined ? 1 : boxCfg.material.opacity });
            return new three_1.THREE.Mesh(geometry, material);
        }
    }, {
        key: "initObject3D",
        value: function initObject3D() {
            return new three_1.THREE.Object3D();
        }
    }, {
        key: "position",
        value: function position(_position, impl) {
            if (!_position) {
                _position = [0, 0, 0];
            }
            impl.position.fromArray(_position);
        }
    }, {
        key: "ortho",
        value: function ortho(_ortho, impl) {
            if (_ortho && impl.type === "OrthographicCamera") {
                impl.setProjection(_ortho[0], _ortho[1], _ortho[2], _ortho[3], _ortho[4], _ortho[5]);
            }
        }
    }, {
        key: "scale",
        value: function scale(_scale, impl, textcfg) {
            var s = _scale ? [_scale[0], _scale[1], _scale[2]] : [1, 1, 1];
            if (textcfg) {
                var zoomfactor = textcfg.zoomfactor ? textcfg.zoomfactor : 1;
                s[0] = s[0] / zoomfactor;
                s[1] = s[1] / zoomfactor;
            }
            impl.scale.fromArray(s);
        }
    }, {
        key: "rotate",
        value: function rotate(_rotate, impl) {
            if (!_rotate) {
                _rotate = [0, 0, 0];
            }
            impl.rotation.fromArray(_rotate);
        }
    }, {
        key: "lookatOnce",
        value: function lookatOnce(obj, impl) {
            if (obj.value) {
                _tmpPt.fromArray(obj.value);
                if (!_tmpPt.equals(impl.position)) {
                    impl.lookAt(_tmpPt);
                }
            }
        }
    }, {
        key: "lookat",
        value: function lookat(value, impl) {
            if (value) {
                _tmpPt.fromArray(value);
                if (!_tmpPt.equals(impl.position)) {
                    impl.lookAt(_tmpPt);
                }
            }
        }
    }, {
        key: "playAnim",
        value: function playAnim(option, impl, attr, resTab) {
            var content = impl.aniControl[option.name];
            if (!content) {
                console.warn("\u63A7\u5236\u5668\u4E0A\u4E0D\u5B58\u5728\u52A8\u753B\uFF1A" + option.name);
                return;
            }
            _LOAD.loadAnimation(option.name, content, resTab, function (clip) {
                impl.playAnim(clip.link, option.isOnce, option.speed, option.id);
            });
        }
    }, {
        key: "color",
        value: function color(_color, impl, attr) {
            var obj = findProperty(impl, attr);
            obj.color = new three_1.THREE.Color(_color);
        }
    }, {
        key: "visible",
        value: function visible(isVisible, impl) {
            if (isVisible !== undefined) {
                impl.visible = isVisible;
            }
        }
    }, {
        key: "textCon",
        value: function textCon(_textCon, impl, attr, resTab) {
            if (_textCon.textcfg.isCommon) {
                _LOAD.loadText(impl, _textCon, this.renderer, resTab);
            } else {
                _textCon.textcfg.text = _textCon.show;
                impl.setText(_textCon, resTab, _LOAD.GeometryRes, _LOAD.TextureRes, _CANVAS);
            }
        }
    }, {
        key: "image",
        value: function image(_image, impl, attr, resTab) {
            var target = findProperty(impl, attr);
            _LOAD.loadImage(_image, resTab, function (img) {
                target.image = img;
                target.needsUpdate = true;
            });
        }
    }, {
        key: "map",
        value: function map(texture, impl, attr, resTab) {
            var target = findProperty(impl, attr);
            _LOAD.loadImgTexture(texture.image, this.renderer, resTab, function (texture) {
                target.map = texture;
            });
        }
    }, {
        key: "geometry",
        value: function geometry(geo, impl, attr, resTab) {
            _LOAD.newloadGeo(this.renderer, geo, impl, resTab);
        }
    }, {
        key: "wave",
        value: function wave(_wave, impl) {
            if (!impl.wave) {
                impl.wave = new three_1.THREE.WaveEffect(_wave);
            }
            if (!impl.posts) {
                impl.posts = [];
            }
            impl.posts.push(impl.wave);
        }
    }]);

    return SceneImpl;
}();

var findProperty = function findProperty(obj, attr) {
    var target = obj;
    if (attr.length === 1) {
        return target;
    }
    for (var i = 0; i < attr.length - 1; i++) {
        if (obj instanceof three_1.THREE.Object3D && attr[i].endsWith('Render')) {
            continue;
        }
        target = target[attr[i]];
        if (!target) {
            throw new Error('属性不存在');
        }
    }
    return target;
};
var bindBone = function bindBone(skeleton, objs) {
    var bones = skeleton.bones;
    for (var i = 0; i < objs.length; i++) {
        for (var j = 0; j < bones.length; j++) {
            if (bones[j].name === objs[i].bindBone) {
                bones[j].add(objs[i].ref.impl);
            }
        }
    }
};
})