_$define("pi/render3d/babylon/offline_provider", function (require, exports, module){
"use strict";
/// <reference path="./babylon.d.ts"/>

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var res_mgr_1 = require("../../util/res_mgr");
var util_1 = require("../../util/util");
//实现babylon的脱机提供者， 从外部ResTab获取数据

var OfflineProvider = function () {
    function OfflineProvider(resTab) {
        _classCallCheck(this, OfflineProvider);

        this.enableSceneOffline = true;
        this.enableTexturesOffline = true;
        this.resTab = new res_mgr_1.ResTab();
        this.resTab = resTab;
    }

    _createClass(OfflineProvider, [{
        key: "open",
        value: function open(successCallback, _errorCallback) {
            successCallback();
        }
    }, {
        key: "loadImage",
        value: function loadImage(url, image) {
            image.src = url;
        }
    }, {
        key: "loadFile",
        value: function loadFile(url, sceneLoaded, _progressCallBack, errorCallback, _useArrayBuffer) {
            this.resTab.load(res_mgr_1.RES_TYPE_FILE + ":" + url, res_mgr_1.RES_TYPE_FILE, url, null, function (r) {
                if (url.endsWith(".gltf")) {
                    sceneLoaded(util_1.utf8Decode(r.link));
                } else {
                    sceneLoaded(r.link);
                }
            }, errorCallback);
        }
    }, {
        key: "loadAnimationKeys",
        value: function loadAnimationKeys(name) {
            var r = this.resTab.get(anmationKey(name));
            if (r) {
                return r.link;
            } else {
                return null;
            }
        }
    }, {
        key: "createAnimationKeys",
        value: function createAnimationKeys(name, keys) {
            this.resTab.load(anmationKey(name), BABYLON_ANIMATION_TYPE, keys, null, null, function () {
                console.log("createAnimationKeys fail!, name:", name);
            });
        }
    }, {
        key: "release",
        value: function release() {
            this.resTab.release();
        }
    }]);

    return OfflineProvider;
}();

exports.OfflineProvider = OfflineProvider;
/**
 * @description 纹理资源
 * @example
 */

var AnimationKeysRes = function (_res_mgr_1$Res) {
    _inherits(AnimationKeysRes, _res_mgr_1$Res);

    function AnimationKeysRes() {
        _classCallCheck(this, AnimationKeysRes);

        return _possibleConstructorReturn(this, (AnimationKeysRes.__proto__ || Object.getPrototypeOf(AnimationKeysRes)).apply(this, arguments));
    }

    _createClass(AnimationKeysRes, [{
        key: "create",

        /**
         * @description 创建
         * @example
         */
        value: function create(data) {
            this.link = data;
        }
    }]);

    return AnimationKeysRes;
}(res_mgr_1.Res);

exports.AnimationKeysRes = AnimationKeysRes;
var BABYLON_ANIMATION_TYPE = "babyblon_animationkeys";
var anmationKey = function anmationKey(name) {
    return BABYLON_ANIMATION_TYPE + ":" + name;
};
var createGeometryRes = function createGeometryRes(name, type, keys, _) {
    return res_mgr_1.loadOK(name, type, null, AnimationKeysRes, keys);
};
res_mgr_1.register(BABYLON_ANIMATION_TYPE, function (name, type, keys, _) {
    createGeometryRes(name, type, keys, _);
});
})