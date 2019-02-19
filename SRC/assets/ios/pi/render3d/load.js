_$define("pi/render3d/load", function (require, exports, module){
"use strict";
/**
 *
 */
// ============================== 导入

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var mod_1 = require("../lang/mod");
var _CANVAS = require("../util/canvas");
var log_1 = require("../util/log");
var res_mgr_1 = require("../util/res_mgr");
var util_1 = require("../util/util");
var drc_parser_1 = require("./drc_parser");
var three_1 = require("./three");
var texture_atlas_1 = require("./texture_atlas");
exports.RES_PATH = 'res/';
var TERRAIN_PATH = 'terrain/';

var Animation = function Animation() {
    _classCallCheck(this, Animation);
};

exports.Animation = Animation;
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
            if (this.link) {
                this.link.dispose();
                this.link.image = null;
                this.link = null;
                this.args = null;
            }
        }
    }]);

    return TextureRes;
}(res_mgr_1.Res);

exports.TextureRes = TextureRes;
/**
 * @description Geometry资源
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
            if (Array.isArray(this.link)) {
                for (var _iterator = this.link, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                    var _ref;

                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }

                    var value = _ref;

                    value.dispose();
                }
            } else if (this.link) {
                this.link.dispose();
            }
        }
    }]);

    return GeometryRes;
}(res_mgr_1.Res);

exports.GeometryRes = GeometryRes;
// 分割url成两部分
var splitPath = function splitPath(url) {
    var urlPath = '';
    var urlFile = url;
    var result = /(.*)\/(.*)/.exec(url);
    // tslint:disable-next-line:prefer-type-cast
    if (result) {
        ;

        var _result = _slicedToArray(result, 3);

        urlPath = _result[1];
        urlFile = _result[2];
    }return { urlPath: urlPath, urlFile: urlFile };
};
/**
 * @description 获取 geo 自动转换成同名的drc, drc必须在depend中存在
 * @example
 */
var getTransDrcName = function getTransDrcName(name) {
    var suf = mod_1.butil.fileSuffix(name);
    if (suf !== 'geo') {
        return name;
    }
    var s = name.slice(0, name.length - suf.length) + "drc";
    return mod_1.depend.get(s) ? s : name;
};
// 从场景或者配置中找到资源
// tslint:disable-next-line:no-reserved-keywords
exports.findRes = function (content, type, key) {
    var res = [];
    var isRes = function isRes(name) {
        if (typeof name !== 'string') {
            return false;
        }
        return name.endsWith('.ai') || name.endsWith('.geo') || name.endsWith('.drc') || name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.skl') || name.endsWith('.rtpl') || name.endsWith('.json') || name.endsWith('.atlas');
    };
    var findFromScene = function findFromScene(con) {
        for (var k in con) {
            var v = con[k];
            if ((typeof v === "undefined" ? "undefined" : _typeof(v)) === 'object') {
                if (v === null) {
                    continue;
                } else {
                    findFromScene(v);
                }
            } else if (v && isRes(con[k])) {
                res.push(con[k]);
            }
        }
    };
    var findFromCfg = function findFromCfg(con, k) {
        var v = con[k];
        if (!con[k]) {
            throw new Error('找不到对应的key');
        }
        for (var i in v.res) {
            res.push(v.res[i]);
        }
        res.push(v.tpl);
        if (v.aniControl) {
            var ani = con.ainMod[v.aniControl];
            for (var j = 0; j < ani; j++) {
                res.push(ani[j]);
            }
        }
    };
    if (type === 'scene') {
        findFromScene(content);
    } else if (type === 'cfg') {
        if (key) {
            findFromCfg(content, key);
        } else {
            for (var k in content) {
                if (k !== 'ainMod') {
                    findFromCfg(content, k);
                }
            }
        }
    }
    return util_1.unique(res);
};
exports.configMap = new Map();
// 资源配置路径表，键是去去掉前缀的资源路径，值是全路径
exports.resConfigPathMap = new Map();
exports.getConfigMap = function () {
    return exports.configMap;
};
// 从配置表里面寻找文件，找不到抛异常 
exports.findConfigFile = function (path) {
    if (!path.startsWith('RES_TYPE_IMGTEXT')) {
        path = exports.resConfigPathMap.get(path);
    }
    var data = exports.configMap.get(path);
    if (!data) {
        var content = "findFile 404, path = " + path;
        log_1.warn(log_1.LogLevel.warn, content);
        throw new Error(content);
    }
    if (data instanceof ArrayBuffer && !path.endsWith('.ai') && !path.endsWith('.rtpl')) {
        data = util_1.toJson(mod_1.butil.utf8Decode(data));
        exports.configMap.set(path, data);
    }
    return data;
};
exports.addSceneRes = function (fileArray) {
    var resPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var resTab = new res_mgr_1.ResTab();
    resTab.timeout = 0;
    if (!resPrefix.endsWith('/')) resPrefix += '/';
    // 空字符串对应的全局路径
    exports.resConfigPathMap.set('', resPrefix);

    var _loop = function _loop(path) {
        if (!path.startsWith(resPrefix)) {
            return "continue";
        }
        // 纪录局部路径和全局路径的键
        exports.resConfigPathMap.set(path.slice(resPrefix.length), path);
        var isJson = jsonSuffixs.some(function (value) {
            return path.endsWith(value);
        });
        if (isJson) {
            exports.configMap.set(path, fileArray[path]);
        } else if (res_mgr_1.BlobType[mod_1.butil.fileSuffix(path)]) {
            resTab.load(res_mgr_1.RES_TYPE_BLOB + ":" + path, res_mgr_1.RES_TYPE_BLOB, path, fileArray);
        } else {
            resTab.load(res_mgr_1.RES_TYPE_FILE + ":" + path, res_mgr_1.RES_TYPE_FILE, path, fileArray);
        }
    };

    for (var path in fileArray) {
        var _ret = _loop(path);

        if (_ret === "continue") continue;
    }
    resTab.release();
};
var jsonSuffixs = ['.scene', '.rtpl', '.json', '.nav'];
var meshGeo = function meshGeo(res, renderer, mesh) {
    if (mesh._isDestroy) {
        return;
    }
    mesh.boundingBox = mesh.boundingBox || new three_1.THREE.Box3();
    mesh.setGeometry(res.link);
    mesh.boundingBox.union(res.link.boundingBox);
    renderer.updateGeometry(mesh);
};
exports.meshTex = function (tex, material, texKey, index, mesh, renderer) {
    var texData = material[texKey];
    if (texData.mapping) tex.mapping = texData.mapping;
    if (texData.wrap) {
        tex.wrapS = texData.wrap[0];
        tex.wrapT = texData.wrap[1];
    }
    if (texData.filter) {
        tex.magFilter = texData.filter[0];
        tex.minFilter = texData.filter[1];
    }
    if (texData.generateMipmaps !== undefined) tex.generateMipmaps = texData.generateMipmaps;
    if (mesh.material) {
        mesh.setTexture(tex, texKey, index);
    }
};
// 所有纹理，包括光照贴图等
exports.setMaterials = function (resTab, renderer, mesh, render, callBack, geotype) {
    if (!render || !render.material) {
        return;
    }
    var materials = render.material;
    var mapKeyOR = {
        map: 'mapst', lightMap: 'lightmapst', _Splat0: '_splat0st',
        _Splat1: '_splat1st', _Splat2: '_splat2st', _Control: '_controlst', ASMMap: 'asmmapst', NAHMap: 'nahmapst', EmissionMap: 'emissionmapst'
    };
    var func = function func(material, index) {
        for (var k in mapKeyOR) {
            if (material[k]) {
                if (material[k].offset || material[k].repeat) {
                    material[mapKeyOR[k]] = getST(material[k]);
                }
                exports.loadImgTexture(material[k].image, renderer, resTab, mod_1.butil.curryFirst(callBack, material, k, index, mesh, renderer));
            }
        }
    };
    if (geotype === 'Plane' && Array.isArray(materials)) {
        func(materials[0], -1);
        mesh.setMaterial(materials[0]);
    } else if (Array.isArray(materials)) {
        for (var i = 0; i < materials.length; i++) {
            var material = materials[i];
            func(material, i);
            mesh.setMaterial(material, i);
        }
    } else {
        func(render.material, -1);
        mesh.setMaterial(render.material);
    }
};
var getST = function getST(obj) {
    var or = [1, 1, 0, 0];
    if (obj.repeat) {
        or[0] = obj.repeat[0];
        or[1] = obj.repeat[1];
    }
    if (obj.offset) {
        or[2] = obj.offset[0];
        or[3] = obj.offset[1];
    }
    return or;
};
var terrainGeo = function terrainGeo(res, tmesh) {
    if (tmesh._isDestroy) {
        return;
    }
    tmesh.boundingBox = tmesh.boundingBox || new three_1.THREE.Box3();
    var geometry = res.link;
    tmesh.setGeometry(geometry);
    tmesh.boundingBox.union(geometry.boundingBox);
};
var terrainTex = function terrainTex(tex, texData, property, index, tmesh) {
    if (tmesh._isDestroy) {
        return;
    }
    if (texData.mapping) tex.mapping = texData.mapping;
    if (texData.wrapS) tex.wrapS = texData.wrapS;
    if (texData.wrapT) tex.wrapT = texData.wrapT;
    if (texData.generateMipmaps !== undefined) tex.generateMipmaps = texData.generateMipmaps;
    tex.needsUpdate = true;
    tmesh.setTexture(property, tex);
};
var parseGeoImpl = function parseGeoImpl(data, callBack) {
    var i32 = new Int32Array(data, 16, 3);
    var vtCount = i32[0]; // 顶点数量 4字节
    var subCount = i32[1]; // 子网格数量 4字节
    var decLength = i32[2]; // 描述信息字节数 4字节
    var subSLlen = subCount * 4 * 2;
    var subSL = new Int32Array(data, 28, subCount * 2); // 子网格的索引偏移， 子网格索引数量; subSLlen字节
    var dec = new Int32Array(data, subCount * 4 * 2 + 28, decLength / 4); // 描述信息
    var attrDes = [['index', 1], ['position', 3], ['normal', 3], ['tangent', 3], ['skinIndex', 4], ['uv', 2], ['uv2', 2], ['uv3', 2], ['uv4', 2], ['skinWeight', 4], ['color', 4]];
    var geometry = new three_1.THREE.BufferGeometry();
    var addAttribute = function addAttribute(offset, length, geometry, attrDes) {
        var attr = new Float32Array(data, offset, length / 4);
        geometry.addAttribute(attrDes[0], new three_1.THREE.BufferAttribute(attr, attrDes[1]));
    };
    var addUv2 = function addUv2(offset, length, geometry) {
        if (length > 0) {
            var attr = new Float32Array(data, offset, length / 4);
            geometry.addAttribute('uv2', new three_1.THREE.BufferAttribute(attr, 2));
        }
    };
    var setIndex = function setIndex(offset, length, geometry) {
        var indices = void 0;
        if (length < 65536 * 2) {
            indices = new Uint16Array(data, offset, length / 2);
        } else {
            indices = new Uint32Array(data, offset, length / 4);
        }
        geometry.setIndex(new three_1.THREE.BufferAttribute(indices, 1));
    };
    var i = 0;
    while (i < dec.length) {
        // tslint:disable-next-line:no-reserved-keywords
        var type = dec[i];
        if (type === 0) {
            setIndex(dec[i + 1], dec[i + 2], geometry);
        } else if (type === 6) {
            addUv2(dec[i + 1], dec[i + 2], geometry);
        } else {
            addAttribute(dec[i + 1], dec[i + 2], geometry, attrDes[type]);
        }
        i += 3;
    }
    for (i = 0; i < subCount; i++) {
        geometry.addGroup(subSL[i * 2], subSL[i * 2 + 1], i);
    }
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.elementsNeedUpdate = true;
    callBack(geometry);
};
exports.parseDrcImpl = function (data, callBack) {
    var t = new Int32Array(data, 0, 2); // [子网格数量， 描述信息长度]
    var subCount = new Int32Array(data, 0, 2)[0]; // 子网格数量
    var decL = new Int32Array(data, 0, 2)[1]; // 描述信息长度
    var subSL = new Int32Array(data, 8, subCount * 2); // 子网格的索引偏移， 子网格索引数量;
    var dec = new Int32Array(data, subCount * 2 * 4 + 8, decL / 4); // 描述信息； 类型， id，类型， id.....
    var info = data.slice(subCount * 2 * 4 + decL + 8, data.byteLength); // 详细信息(drc格式的数据)
    // tslint:disable:prefer-type-cast
    var attrDes = [['index', 1], ['position', 3, 'POSITION'], ['normal', 3, 'NORMAL'], ['tangent', 3], ['skinIndex', 4, 'GENERIC'], ['uv', 2, 'TEX_COORD'], ['uv2', 2, 'TEX_COORD'], ['uv3', 2,, 'TEX_COORD'], ['uv4', 2,, 'TEX_COORD'], ['skinWeight', 4, 'GENERIC'], ['color', 4, 'COLOR']];
    var attrMap = {};
    for (var i = 0; i < dec.length / 2; i++) {
        attrMap[attrDes[dec[i * 2]][0]] = dec[i * 2 + 1];
    }
    drc_parser_1.decodeDrc(info, attrMap, function (geometry) {
        for (var _i2 = 0; _i2 < subCount; _i2++) {
            geometry.addGroup(subSL[_i2 * 2], subSL[_i2 * 2 + 1], _i2);
        }
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();
        geometry.elementsNeedUpdate = true;
        callBack(geometry);
    });
};
/**
 * data
 * 16字节: ANIMATION_1.0
 * 4字节: 描述信息偏移量
 * 4字节: 描述信息长度
 * float二进制数据
 * 描述信息：
 *
 * property:["position.x","position.y","position.z"],  // 属性名称
 * length: [],                                         // 与property一一对应，为每个属性的关键帧帧数
 * keys: ["time"，"value", "inTangent", "outTangent"], // 目前只有4个元素，关键帧导出信息的Key
 * content: [offset, offset, offset, offset],          // 描述每帧、每个key的数据的offset
 */
var parseAnimation = function parseAnimation(name, data) {
    if (!data) {
        console.error('  no arrayBuffer in data');
        return null;
    }
    var desOffset = new Int32Array(data, 16, 1)[0];
    var desLen = new Int32Array(data, 20, 1)[0];
    var des = JSON.parse(three_1.THREE.AnimationUtils.utf8Decode(data.slice(desOffset, desOffset + desLen)));
    var tracks = [];
    var duration = -1;
    var clipName = name || 'default';
    var keyLen = des.keys.length;
    var keys = des.keys;
    var indexMap = {
        time: undefined,
        value: undefined,
        inTangent: undefined,
        outTangent: undefined
    };
    for (var i = 0; i < keyLen; i++) {
        indexMap[keys[i]] = i;
    }
    if (indexMap.time === undefined) {
        throw new Error('动画文件缺少times属性');
    }
    if (!indexMap.value === undefined) {
        throw new Error('动画文件缺少values属性');
    }
    for (var _i3 = 0; _i3 < des.property.length; _i3++) {
        var begin = _i3 * keyLen;
        var tvLen = (des.content[begin + 1] - des.content[begin]) / 4;
        var times = new Float32Array(data, des.content[begin + indexMap.time], tvLen);
        var values = new Float32Array(data, des.content[begin + indexMap.value], tvLen);
        var inTangent = void 0;
        var outTangent = void 0;
        if (indexMap.inTangent !== undefined) {
            if (des.content[begin + indexMap.inTangent] !== -1) {
                inTangent = new Float32Array(data, des.content[begin + indexMap.inTangent], tvLen);
            }
        }
        if (indexMap.outTangent !== undefined) {
            if (des.content[begin + indexMap.outTangent] !== -1) {
                outTangent = new Float32Array(data, des.content[begin + indexMap.outTangent], tvLen);
            }
        }
        if (outTangent === undefined) {
            outTangent = inTangent;
        }
        if (times.length !== 0) {
            var mode = three_1.THREE.InterpolateLinear;
            if (inTangent) {
                mode = three_1.THREE.InterpolateSmooth;
            }
            var attr = des.property[_i3];
            var track = new three_1.THREE.KeyframeTrack(attr, times, values, mode);
            track.setTangent(inTangent, outTangent);
            tracks.push(track);
        }
        if (times[times.length - 1] > duration) {
            duration = times[times.length - 1];
        }
    }
    if (tracks.length === 0) {
        return null;
    }
    var clip = new three_1.THREE.AnimationClip(clipName, duration, tracks);
    return clip;
};
var parseSkeleton = function parseSkeleton(data) {
    var transformLen = new Int32Array(data, 16, 1)[0];
    var indexLen = new Int32Array(data, 20, 1)[0];
    var nameLen = new Int32Array(data, 24, 1)[0];
    var transforms = new Float32Array(data, 28, transformLen / 4);
    var indexs = new Int16Array(data, transformLen + 28, indexLen / 2);
    var names = mod_1.butil.utf8Decode(data.slice(indexLen + transformLen + 28, indexLen + transformLen + nameLen + 28)).split(',');
    var bones = [];
    for (var i = 0; i < names.length; i++) {
        var start = i * 10;
        var bone = {};
        bone.name = names[i];
        bone.parent = indexs[i];
        bone.pos = [transforms[start], transforms[start + 1], transforms[start + 2]];
        bone.rotq = [transforms[start + 3], transforms[start + 4], transforms[start + 5], transforms[start + 6]];
        bone.scl = [transforms[start + 7], transforms[start + 8], transforms[start + 9]];
        bones[i] = bone;
    }
    return bones;
};
exports.parseGeometry = function (path, resTab, callBack) {
    var p = exports.resConfigPathMap.get(path);
    path = p !== undefined ? p : exports.resConfigPathMap.get('') + path;
    path = getTransDrcName(path);
    var key = exports.RES_TYPE_GEOMETRY + ":" + path;
    var data = new GeometryData();
    data.resTab = resTab;
    if (path.split('.')[1] === 'drc') {
        data.parseFun = exports.parseDrcImpl;
    } else {
        data.parseFun = parseGeoImpl;
    }
    resTab.load(key, exports.RES_TYPE_GEOMETRY, path, data, callBack);
};
/**
 * 加载动画，返回动画clip
 */
exports.loadAnimation = function (name, fileName, resTab, cb) {
    fileName = exports.RES_PATH + fileName;
    var path = exports.resConfigPathMap.get(fileName);
    path = path !== undefined ? path : exports.resConfigPathMap.get('') + fileName;
    var key = exports.RES_TYPE_ANIMATION + ":" + path;
    var data = new AnimationData();
    data.resTab = resTab;
    data.name = name;
    resTab.load(key, exports.RES_TYPE_ANIMATION, path, data, function (clip) {
        cb(clip);
    });
};
/**
 * 加载网格
 */
exports.newloadMesh = function (renderer, geo, render, resTab) {
    var mesh = new three_1.THREE.Mesh();
    var url = geo.res;
    exports.setMaterials(resTab, renderer, mesh, render, exports.meshTex);
    exports.parseGeometry(exports.RES_PATH + url, resTab, mod_1.butil.curryFirst(meshGeo, renderer, mesh));
    return mesh;
};
/**
 * 加载网格(不包含材质)
 */
exports.newloadGeo = function (renderer, geo, impl, resTab) {
    if (geo.type === 'BufferGeometry') {
        var url = geo.res;
        exports.parseGeometry(exports.RES_PATH + url, resTab, mod_1.butil.curryFirst(meshGeo, renderer, impl));
    } else if (geo.type === 'Plane') {
        impl.setGeometry(exports.createPlane(resTab, geo.width || 1, geo.height || 1, 1, 1, geo.horizontalAlign, geo.verticalAlign));
        renderer.updateGeometry(impl);
    } else {
        impl.setGeometry(exports.createBox(resTab, geo.width || 1, geo.height || 1, geo.longness || 1));
        renderer.updateGeometry(impl);
    }
};
/**
 * 加载骨骼网格
 */
exports.newloadSkeletonMesh = function (renderer, skinnedMeshRender, resTab, maxBones, useVertexTexture) {
    var mesh = new three_1.THREE.SkinnedMesh();
    mesh.setMaxBones(maxBones);
    mesh.setUseVertexTexture(useVertexTexture);
    var url = skinnedMeshRender.geometry.res;
    mesh.setBoundBone(skinnedMeshRender.bounds, skinnedMeshRender.rootbone);
    if (skinnedMeshRender.boundVisible) {
        mesh.setBoundVisible();
    }
    exports.setMaterials(resTab, renderer, mesh, skinnedMeshRender, exports.meshTex);
    exports.parseGeometry(exports.RES_PATH + url, resTab, mod_1.butil.curryFirst(meshGeo, renderer, mesh));
    return mesh;
};
exports.createBox = function (resTab, x, y, z) {
    var key = exports.RES_TYPE_GEOMETRY + "-Box:" + x + "," + y + "," + z;
    var res = resTab.get(key);
    if (res) return res.link;
    var box = new three_1.THREE.BoxBufferGeometry(x, y, z);
    resTab.createRes(key, exports.RES_TYPE_GEOMETRY, undefined, GeometryRes, box);
    return box;
};
/**
 * 加载规则的几何体(目前只实现了立方体)
 */
exports.newloadShape = function (renderer, geo, render, resTab) {
    var g = void 0;
    // tslint:disable-next-line:prefer-const
    var m = void 0;
    g = exports.createBox(resTab, geo.width || 1, geo.height || 1, geo.longness || 1);
    var materials = render.material;
    if (render.attachment === '2D') {
        m.enableLight = false;
    }
    var mesh = new three_1.THREE.Mesh(g);
    render.material[1] = render.material[0];
    render.material[2] = render.material[0];
    render.material[3] = render.material[0];
    render.material[4] = render.material[0];
    render.material[5] = render.material[0];
    exports.setMaterials(resTab, renderer, mesh, render, exports.meshTex);
    return mesh;
};
/**
 * 加载四边形
 */
exports.newloadPlane = function (renderer, geo, render, resTab) {
    var g = void 0;
    // tslint:disable-next-line:prefer-const
    var m = void 0;
    g = exports.createPlane(resTab, geo.width || 1, geo.height || 1, 1, 1, geo.horizontalAlign, geo.verticalAlign);
    var mesh = new three_1.THREE.Mesh(g);
    exports.setMaterials(resTab, renderer, mesh, render, exports.meshTex, geo.type);
    return mesh;
};
exports.createPlane = function (resTab, w, h, cw, ch, horizontalAlign, verticalAlign) {
    var key = "geometry-Plane:" + w + "," + h + "," + cw + "," + ch + "," + horizontalAlign + "," + verticalAlign;
    var res = resTab.get(key);
    if (res) return res.link;
    var plane = new three_1.THREE.PlaneBufferGeometry(w, h, cw, ch, horizontalAlign, verticalAlign);
    resTab.createRes(key, exports.RES_TYPE_GEOMETRY, undefined, GeometryRes, plane);
    return plane;
};
/**
 * 加载并解析骨骼
 */
exports.newloadSkeleton = function (fileName, resTab, callBack) {
    var url = exports.RES_PATH + fileName;
    var path = exports.resConfigPathMap.get(url);
    path = path !== undefined ? path : exports.resConfigPathMap.get('') + url;
    var key = exports.RES_TYPE_SKELETON + ":" + path;
    resTab.load(key, exports.RES_TYPE_SKELETON, path, resTab, function (bones) {
        callBack(bones.link);
    });
};
exports.loadTerrain = function (url, renderer) {
    var resTab = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var cb = arguments[3];

    var json = exports.findConfigFile(TERRAIN_PATH + url);
    var paths = [{ name: TERRAIN_PATH + json.image1 }, { name: TERRAIN_PATH + json.image2 }, { name: TERRAIN_PATH + json.image3 }];
    exports.loadImgTextures(paths, renderer, resTab, function (texs) {
        var blend = json.blend;
        var terrain = new three_1.THREE.Terrain(json.width, json.height, blend.width, blend.height);
        terrain.setTexture(0, texs[0]);
        terrain.setTexture(1, texs[1]);
        terrain.setTexture(2, texs[2]);
        terrain.setTextureIsReady();
        texs = undefined;
        // Blend
        terrain.setBlendSeed(blend.seed[0], blend.seed[1], blend.seed[2], blend.seed[3]);
        terrain.setBlendCoff(blend.constCoff1, blend.linearCoff1, blend.constCoff2, blend.linearCoff2);
        terrain.setBlendFrequency(blend.frequency1, blend.frequency2, blend.frequency3);
        terrain.setBlendClamp(blend.oneClamp, blend.zeroClamp, blend.middleValue);
        terrain.updateBlend(renderer.getThreeRenderer());
        cb && cb(terrain);
    });
};
/**
 * 加载文字
 */
exports.loadText = function (text, textCon, renderer, resTab) {
    var textcfg = textCon.textcfg;
    var key = _CANVAS.getImgTextKey(textcfg, 'texture');
    var res = resTab.get(key);
    var fun = function fun(texture) {
        var shows = !textCon.show ? [] : textCon.show.split('');
        var uvs = [];
        for (var i = 0; i < shows.length; i++) {
            if (!texture.args.charUV[shows[i]]) {
                throw new Error('loadText: charUV isn\'t exist');
            }
            uvs.push(texture.args.charUV[shows[i]]);
        }
        text.setTexture(texture.link);
        if (!uvs || uvs.length === 0) {
            text.visible = false;
            return;
        } else {
            text.visible = true;
        }
        var alignModHorizon = textCon.horizontalAlign || 'left';
        var alignModVertical = textCon.verticalAlign || 'top';
        // tslint:disable-next-line:max-line-length
        var gk = exports.RES_TYPE_GEOMETRY + ":" + key + "|" + textCon.show + "|" + texture.args.width + "|" + texture.args.height + "|" + textCon.width + "|" + alignModHorizon + "|" + alignModVertical;
        var geometry = void 0;
        var textSize = {};
        var res = resTab.get(gk);
        if (res) {
            geometry = res.link;
        } else {
            geometry = text.createTxPlaneBufferGeometry(uvs, texture.args.width, texture.args.height, textCon.width, alignModHorizon, alignModVertical, textSize);
            resTab.createRes(gk, 'geometry', undefined, GeometryRes, geometry);
        }
        text.setGeometry(geometry);
    };
    if (res) {
        fun(res);
    } else {
        var data = new TexData(resTab, renderer);
        resTab.load(key, exports.RES_TYPE_TEXTURE, { type: _CANVAS.RES_TYPE_IMGTEXT, cfg: textcfg }, data, fun);
    }
};
// tslint:disable:max-classes-per-file

var TexData =
// tslint:disable-next-line:typedef
function TexData(resTab, renderer) {
    _classCallCheck(this, TexData);

    this.resTab = resTab;
    this.renderer = renderer;
};
/**
 * @description 加载图片纹理
 * @param cb 回调，只有一个参数，Texture
 */


exports.loadImgTexture = function (image, renderer, resTab, cb) {
    var url = exports.RES_PATH + image.name;
    var filter = image.filter;
    var p = exports.resConfigPathMap.get(url);
    url = p !== undefined ? p : exports.resConfigPathMap.get('') + url;
    var key = exports.RES_TYPE_TEXTURE + ":" + url;
    if (filter) {
        key += " | " + _CANVAS.getImgFilterKey({ arr: filter, img: url, path: '' });
    }
    var texData = new TexData(resTab, renderer);
    resTab.load(key, exports.RES_TYPE_TEXTURE, image, texData, function (texRes) {
        return cb && setTimeout(function () {
            return cb(texRes.link);
        }, 0);
    });
};
exports.loadImgTextures = function (images, renderer, resTab, cb) {
    var num = images.length;
    var result = [];

    var _loop2 = function _loop2(i) {
        exports.loadImgTexture(images[i], renderer, resTab, function (tex) {
            result[i] = tex;
            if (--num === 0) cb && cb(result);
        });
    };

    for (var i = 0; i < images.length; ++i) {
        _loop2(i);
    }
};
exports.loadImage = function (image, resTab, cb) {
    var arg = void 0;
    var key = exports.RES_TYPE_IMAGE + ":";
    if (image.type === _CANVAS.RES_TYPE_IMGTEXT) {
        arg = { sourceType: _CANVAS.RES_TYPE_IMGTEXT, value: image.cfg };
        key += _CANVAS.getImgTextKey(image.cfg);
    } else {
        var url = exports.RES_PATH + image.name;
        var filter = image.filter;
        var p = exports.resConfigPathMap.get(url);
        url = p !== undefined ? p : exports.resConfigPathMap.get('') + url;
        key += url;
        if (filter) {
            arg = { sourceType: _CANVAS.RES_TYPE_IMGFILTER, value: { arr: filter, img: url, path: '' } };
            key += " | " + _CANVAS.getImgFilterKey(arg.value);
        } else {
            arg = { sourceType: res_mgr_1.RES_TYPE_BLOB, value: url };
        }
    }
    loadRes[arg.sourceType](resTab, arg.value, function (res) {
        var img = new Image();
        img.decoding = "async";
        img.onload = function () {
            cb(img, res.args);
        };
        img.src = res.link;
    });
};
/**
 * 解析字符串
 * @param url
 */
exports.parseUrl = function (url) {
    url = exports.RES_PATH + url;
    var p = exports.resConfigPathMap.get(exports.RES_PATH + url);
    url = p !== undefined ? p : exports.resConfigPathMap.get('') + url;
    return url;
};
/**
 * 加载字符串
 * @param url
 * @param resTab
 * @param cb
 */
exports.loadString = function (url, resTab, cb) {
    url = exports.parseUrl(url);
    var key = exports.RES_TYPE_STRING + ":" + url;
    resTab.load(key, exports.RES_TYPE_STRING, url, resTab, function (texRes) {
        cb && setTimeout(function () {
            return cb(texRes.link);
        }, 0);
    });
};
/**
 * 加载骨骼纹理
 * @param url
 * @param resTab
 * @param cb
 */
exports.loadTextureAtlas = function (url, resTab, cb) {
    url = exports.parseUrl(url);
    var key = exports.RES_TYPE_TEXTURE_ATLAS + ":" + url;
    resTab.load(key, exports.RES_TYPE_TEXTURE_ATLAS, url, resTab, function (texRes) {
        cb && setTimeout(function () {
            return cb(texRes.link);
        }, 0);
    });
};
var loadRes = {};
loadRes[res_mgr_1.RES_TYPE_BLOB] = function (resTab, path, cb) {
    var key = res_mgr_1.RES_TYPE_BLOB + ":" + path;
    var res = resTab.get(key);
    if (res) cb(res);else {
        resTab.load(key, res_mgr_1.RES_TYPE_BLOB, path, undefined, cb, function (error) {
            throw new Error("load.ts loadRes" + res_mgr_1.RES_TYPE_BLOB + " failed, path = " + path + ", error = " + error.reason);
        });
    }
};
loadRes[_CANVAS.RES_TYPE_IMGTEXT] = function (resTab, textCfg, cb) {
    var key = _CANVAS.getImgTextKey(textCfg);
    var res = resTab.get(key);
    if (res) {
        cb(res);
        textCfg.charUV = res.args.charUV;
    } else {
        resTab.load(key, _CANVAS.RES_TYPE_IMGTEXT, textCfg, undefined, cb);
    }
};
loadRes[_CANVAS.RES_TYPE_IMGFILTER] = function (resTab, imgFilterCfg, cb) {
    var key = _CANVAS.getImgFilterKey(imgFilterCfg);
    var res = resTab.get(key);
    if (res) {
        cb(res);
    } else {
        resTab.load(key, _CANVAS.RES_TYPE_IMGFILTER, imgFilterCfg, resTab, cb);
    }
};

var GeometryData = function GeometryData() {
    _classCallCheck(this, GeometryData);
};

exports.GeometryData = GeometryData;
// tslint:disable-next-line:no-reserved-keywords
var createGeometryRes = function createGeometryRes(name, type, path, data) {
    var key = res_mgr_1.RES_TYPE_FILE + ":" + path;
    data.resTab.load(key, res_mgr_1.RES_TYPE_FILE, path, undefined, function (bufferRes) {
        data.parseFun(bufferRes.link, function (geo) {
            res_mgr_1.loadOK(name, type, path, GeometryRes, geo);
        });
    }, function (err) {
        throw new Error("createGeometryRes failed, key = " + key + ", err = " + err.reason);
    });
};
// tslint:disable-next-line:no-reserved-keywords
var createTextureRes = function createTextureRes(name, type, image, data) {
    var tex = new three_1.THREE.Texture();
    var r = exports.loadImage(image, data.resTab, function (img, args) {
        tex.image = img;
        tex.isReady = true;
        tex.needsUpdate = true;
        res_mgr_1.loadOK(name, type, args, TextureRes, tex);
    });
};
// tslint:disable-next-line:no-reserved-keywords
exports.createSkeletonRes = function (key, type, path, resTab) {
    resTab.load(res_mgr_1.RES_TYPE_FILE + ":" + path, res_mgr_1.RES_TYPE_FILE, path, resTab, function (res) {
        res_mgr_1.loadOK(key, type, path, res_mgr_1.Res, parseSkeleton(res.link));
    });
};
/**
 * 创建字符串类型资源
 * @param key
 * @param type
 * @param path
 * @param resTab
 */
var createStringRes = function createStringRes(name, type, path, resTab) {
    resTab.load(res_mgr_1.RES_TYPE_FILE + ":" + path, res_mgr_1.RES_TYPE_FILE, path, resTab, function (res) {
        res_mgr_1.loadOK(name, type, path, res_mgr_1.Res, mod_1.butil.utf8Decode(res.link));
    });
};
var createTextureAtlasRes = function createTextureAtlasRes(name, type, path, resTab) {
    var key = exports.RES_TYPE_STRING + ":" + path;
    resTab.load(key, exports.RES_TYPE_STRING, path, resTab, function (texRes) {
        res_mgr_1.loadOK(name, type, path, res_mgr_1.Res, new texture_atlas_1.TextureAtlas(texRes.link));
    });
};
/**
 * 手动 创建纹理
 * @param url 	资源路径
 * @param res 	res 表
 * @param w 	图片宽
 * @param h 	图片高
 */
exports.getNewTexture = function (url, res, w, h) {
    var _url = exports.parseUrl(url);
    var key = exports.RES_TYPE_TEXTURE + ":" + _url;
    var image = new Image();
    image.decoding = "async";
    image.src = "../" + _url;
    image.width = w;
    image.height = h;
    return new texture_atlas_1.ThreeJsTexture(image, res.get(key).link.texture);
};
exports.findTexture = function (url, res) {
    var _url = exports.parseUrl(url);
    var key = exports.RES_TYPE_TEXTURE + ":" + _url;
    return res.get(key).link;
};

var AnimationData = function AnimationData() {
    _classCallCheck(this, AnimationData);
};

exports.AnimationData = AnimationData;
// tslint:disable-next-line:no-reserved-keywords
exports.createAnimationRes = function (key, type, path, data) {
    var resTab = data.resTab;
    resTab.load(res_mgr_1.RES_TYPE_FILE + ":" + path, res_mgr_1.RES_TYPE_FILE, path, resTab, function (res) {
        res_mgr_1.loadOK(key, type, path, res_mgr_1.Res, parseAnimation(data.name, res.link));
    });
};
exports.RES_TYPE_SKELETON = 'skeleton';
exports.RES_TYPE_ANIMATION = 'animation';
exports.RES_TYPE_TEXTURE = 'texture';
exports.RES_TYPE_IMAGE = 'image';
exports.RES_TYPE_GEOMETRY = 'geometry';
exports.RES_TYPE_STRING = 'string';
exports.RES_TYPE_TEXTURE_ATLAS = 'textureAtlas';
exports.RES_TYPE_TEXTURE_ATLAS_IMAGE = 'textureAtlasImage';
res_mgr_1.register(exports.RES_TYPE_SKELETON, exports.createSkeletonRes);
res_mgr_1.register(exports.RES_TYPE_ANIMATION, exports.createAnimationRes);
res_mgr_1.register(exports.RES_TYPE_TEXTURE, createTextureRes);
res_mgr_1.register(exports.RES_TYPE_GEOMETRY, createGeometryRes);
res_mgr_1.register(exports.RES_TYPE_STRING, createStringRes);
res_mgr_1.register(exports.RES_TYPE_TEXTURE_ATLAS, createTextureAtlasRes);
})