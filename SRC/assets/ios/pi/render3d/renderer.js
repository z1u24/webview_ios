_$define("pi/render3d/renderer", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var scene_1 = require("./scene");
var three_1 = require("./three");
/**
 * @description Renderer
 */

var Renderer = function () {
    /**
     * @description 构造函数
     * @param antialias 是否抗锯齿，默认不开
     */
    function Renderer(width, height) {
        var antialias = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var ratio = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.0;

        _classCallCheck(this, Renderer);

        this.canUseVertexTexture = false;
        this.impl = new three_1.THREE.WebGLRenderer({
            alpha: true,
            antialias: antialias
        });
        this.size = {
            width: width,
            height: height
        };
        this.impl.autoClear = true;
        this.impl.setSize(width, height);
        this.impl.setPixelRatio(ratio);
        if (this.impl.capabilities) {
            var nVertexUniforms = this.impl.capabilities.maxVertexUniforms;
            var maxBones = Math.floor((nVertexUniforms - 60) / 4);
            if (maxBones < 40) {
                console.log("+++ warning: maxBones = " + maxBones + " < 40, useVertexTexture: " + this.canUseVertexTexture);
                this.canUseVertexTexture = this.impl.capabilities.floatVertexTextures > 0;
            }
        }
    }
    /**
     * @description 是否可用顶点纹理
     */


    _createClass(Renderer, [{
        key: "useVertexTexture",
        value: function useVertexTexture() {
            return this.canUseVertexTexture;
        }
        /**
         * @description 设置canvas的清空色
         * rgb：十六进制整数表示的颜色值，0xRRGGBB
         * alpha: [0, 1]
         */
        // tslint:disable-next-line:typedef

    }, {
        key: "setClearColor",
        value: function setClearColor(rgb, alpha) {
            this.impl.setClearColor(rgb, alpha);
        }
        /**
         * @description 是否设备丢失
         */

    }, {
        key: "isContextLost",
        value: function isContextLost() {
            return this.impl.isContextLost();
        }
        /**
         * @description 强制设备丢失
         */

    }, {
        key: "forceContextLoss",
        value: function forceContextLoss() {
            this.impl.forceContextLoss();
        }
        /**
         * 更新几何体
         */
        // tslint:disable-next-line:typedef

    }, {
        key: "updateGeometry",
        value: function updateGeometry(mesh) {
            this.impl.updateGeometry(mesh);
        }
        /**
         * 设置纹理
         */
        // tslint:disable-next-line:typedef

    }, {
        key: "setTexture2D",
        value: function setTexture2D(texture) {
            this.impl.setTexture2D(texture, 0);
        }
        /**
         * @description 取Threejs渲染器
         */

    }, {
        key: "getThreeRenderer",
        value: function getThreeRenderer() {
            return this.impl;
        }
        /**
         * @description 返回canvas标签
         */

    }, {
        key: "getCanvas",
        value: function getCanvas() {
            return this.impl.domElement;
        }
        /**
         * @description 设置canvas和webgl环境的宽高
         */
        // tslint:disable-next-line:typedef

    }, {
        key: "setSize",
        value: function setSize(width, height) {
            this.size.width = width;
            this.size.height = height;
            this.impl.setSize(width, height);
        }
        /**
         * @description 获取canvas和webgl环境的宽高
         */

    }, {
        key: "getSize",
        value: function getSize() {
            return this.size;
        }
        /**
         * @description 创建对应的渲染场景
         * @return Scene的实例
         */

    }, {
        key: "createScene",
        value: function createScene(data) {
            return scene_1.createScene(this, data);
        }
    }]);

    return Renderer;
}();

exports.Renderer = Renderer;
})