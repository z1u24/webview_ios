_$define("pi/math/spatial", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description 空间属性
 */
var matrix4_1 = require("./matrix4");
var quaternion_1 = require("./quaternion");
var vector3_1 = require("./vector3");

var Spatial = function () {
    /**
     * @description 构造
     */
    function Spatial() {
        _classCallCheck(this, Spatial);

        this.needUpdate = false;
        this.position = new vector3_1.Vector3();
        this.quaternion = new quaternion_1.Quaternion();
        this.scale = new vector3_1.Vector3();
        this.matrix = new matrix4_1.Matrix4();
    }
    /**
     * @description 设置位置
     */
    // tslint:disable-next-line:typedef


    _createClass(Spatial, [{
        key: "setPostion",
        value: function setPostion(x, y, z) {
            this.position.set(x, y, z);
            this.needUpdate = true;
            return this;
        }
        /**
         * @description 设置方位
         */
        // tslint:disable-next-line:typedef

    }, {
        key: "setQuaternion",
        value: function setQuaternion(x, y, z, w) {
            this.quaternion.set(x, y, z, w);
            this.needUpdate = true;
            return this;
        }
        /**
         * @description 设置缩放
         */
        // tslint:disable-next-line:typedef

    }, {
        key: "setScale",
        value: function setScale(x, y, z) {
            this.scale.set(x, y, z);
            this.needUpdate = true;
            return this;
        }
        // tslint:disable-next-line:no-reserved-keywords

    }, {
        key: "set",
        value: function set(postion, quaternion, scale) {
            this.needUpdate = true;
            this.position.copy(postion);
            this.quaternion.copy(quaternion);
            this.scale.copy(scale);
            return this;
        }
        /**
         * @description 克隆
         */

    }, {
        key: "clone",
        value: function clone(spatial) {
            return new Spatial().copy(this);
        }
        /**
         * @description 拷贝
         */

    }, {
        key: "copy",
        value: function copy(spatial) {
            this.position.copy(spatial.position);
            this.quaternion.copy(spatial.quaternion);
            this.scale.copy(spatial.scale);
            this.needUpdate = true;
        }
        /**
         * @description 更新矩阵
         */

    }, {
        key: "update",
        value: function update() {
            if (this.needUpdate) {
                this.needUpdate = false;
                this.matrix.compose(this.position, this.quaternion, this.scale);
            }
        }
    }]);

    return Spatial;
}();

exports.Spatial = Spatial;
})