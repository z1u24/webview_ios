_$define("pi/render3d/babylon/engine", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./babylon.d.ts"/>
var res_mgr_1 = require("../../util/res_mgr");
var loader_1 = require("./loader");
var offline_provider_1 = require("./offline_provider");

var Engine = function (_BABYLON$Engine) {
    _inherits(Engine, _BABYLON$Engine);

    _createClass(Engine, null, [{
        key: "prepare",
        value: function prepare(resTab) {
            var loader = new loader_1.ResLoader(resTab);
            Engine.loader = loader;
            //提供脱机资源加载
            BABYLON.Engine.OfflineProviderFactory = function (_urlToScene, _callbackManifestChecked, _disableManifestCheck) {
                BABYLON.Tools.SetImmediate(function () {
                    _callbackManifestChecked(true);
                });
                return new offline_provider_1.OfflineProvider(new res_mgr_1.ResTab()); //每场景一个OfflineProvider
            };
            loader_1.GLTF2Loader.resLoader = loader;
            //修改默认的gltf文件加载类
            BABYLON.GLTFFileLoader._CreateGLTFLoaderV2 = function (parent) {
                return new loader_1.GLTF2Loader(parent);
            };
        }
    }]);

    function Engine(canvasOrContext, antialias, options) {
        var adaptToDeviceRatio = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        _classCallCheck(this, Engine);

        if (!Engine.loader) {
            throw "loader is not exist!, Please call 'Engine.setResTab' first.";
        }

        var _this = _possibleConstructorReturn(this, (Engine.__proto__ || Object.getPrototypeOf(Engine)).call(this, canvasOrContext, antialias, options, adaptToDeviceRatio));

        _this.piEngine = true;
        _this.loader = Engine.loader;
        return _this;
    }
    //创建Texture


    _createClass(Engine, [{
        key: "createTexture",
        value: function createTexture(urlArg, noMipmap, invertY, scene) {
            var samplingMode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Engine.TEXTURE_TRILINEAR_SAMPLINGMODE;
            var onLoad = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
            var onError = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
            var buffer = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
            var fallback = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;
            var format = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : null;
            var forcedExtension = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;

            var tex = BABYLON.Engine.prototype.createTexture.call(this, urlArg, noMipmap, invertY, scene, samplingMode, onLoad, onError, buffer, fallback, format, forcedExtension);
            //将tex添加到资源表
            Engine.loader.createTexture(tex);
            return tex;
        }
    }]);

    return Engine;
}(BABYLON.Engine);

exports.Engine = Engine;
})