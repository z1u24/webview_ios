_$define("pi/render3d/scene_mgr", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var three_1 = require("./three");
var renderer = void 0;
var scene = void 0;
var width = void 0;
var height = void 0;
var isPause = false;
var clock = new three_1.THREE.Clock();
/**
 * @description 数组合并，假设数组的偏移是一样的
 */
var mergeArray = function mergeArray(arr, old, parent, key, resTab) {
    var i = void 0;
    var v = void 0;
    var oldv = void 0;
    if (arr.length !== old.length) {
        parent[key] = arr;
        scene.modify(parent, key);
        return false;
    }
    if (arr.length === 0) {
        return true;
    }
    if (key === 'children') {
        for (i = arr.length - 1; i >= 0; i--) {
            v = arr[i];
            oldv = old[i];
            if (!v) {
                old[i] = v;
                if (oldv) {
                    scene.remove(oldv);
                } else {
                    mergeObject(v, oldv);
                }
            } else if (!oldv) {
                old[i] = v;
                scene.insert(v, parent, resTab);
            } else {
                mergeObject(v, oldv);
            }
        }
    } else {
        for (i = arr.length - 1; i >= 0; i--) {
            if (arr[i] !== old[i]) {
                break;
            }
        }
        if (i >= 0) {
            parent[key] = arr;
            scene.modify(parent, key);
        }
        return i < 0;
    }
};
/**
 * @description 对象合并，假设对象的结构字段是一样的，数组的偏移也是一样的
 */
var mergeObject = function mergeObject(obj, old, resTab, skip) {
    var k = void 0;
    var v = void 0;
    for (k in obj) {
        if (obj.hasOwnProperty(k) && k !== skip) {
            v = obj[k];
            if (k.indexOf('Once') > 0) {
                if (v === old[k]) {
                    continue;
                }
                if (v === null || old[k] === null || v.value !== old[k].value || v.sign !== old[k].sign) {
                    old[k] = v;
                    scene.modify(old, k);
                }
                continue;
            }
            if ((typeof v === "undefined" ? "undefined" : _typeof(v)) === 'object') {
                if (v === null) {
                    if (old[k]) {
                        old[k] = null;
                    }
                    scene.modify(old, k);
                } else if (Array.isArray(v)) {
                    mergeArray(v, old[k], old, k, resTab);
                } else if (old[k]) {
                    mergeObject(v, old[k]);
                } else {
                    old[k] = v;
                    scene.modify(old, k);
                }
            } else if (v !== old[k]) {
                old[k] = v;
                scene.modify(old, k);
            }
        }
    }
};
/**
 * @description 场景管理器
 */
// tslint:disable-next-line:no-unnecessary-class

var SceneManager = function () {
    function SceneManager() {
        _classCallCheck(this, SceneManager);
    }

    _createClass(SceneManager, null, [{
        key: "init",

        /**
         * @description 初始化
         */
        value: function init(w, h) {
            var antialias = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            width = w;
            height = h;
            renderer = new renderer_1.Renderer(width, height, antialias);
        }
        /**
         * @description 设置清空色
         */

    }, {
        key: "setClearColor",
        value: function setClearColor(rgb) {
            var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.0;

            renderer.setClearColor(rgb, alpha);
        }
        /**
         * @description 设置大小
         */

    }, {
        key: "setSize",
        value: function setSize(width, height) {
            renderer.setSize(width, height);
        }
        /**
         * @description 设置暂停
         */

    }, {
        key: "setPause",
        value: function setPause(isEnable) {
            isPause = isEnable;
        }
        /**
         * @description 获取暂停状态
         */

    }, {
        key: "getPause",
        value: function getPause() {
            return isPause;
        }
        /**
         * @description 渲染
         */

    }, {
        key: "render",
        value: function render() {
            isPause || scene.render(clock.getDelta());
        }
        /**
         * @description 射线查询
         */

    }, {
        key: "raycast",
        value: function raycast(x, y) {
            return scene.raycast(x, y);
        }
        /**
         * @description 重置场景，删除老场景，创建新场景
         */

    }, {
        key: "reset",
        value: function reset(data) {
            if (scene) {
                try {
                    scene.destroy();
                } catch (e) {
                    console.log(e);
                }
            }
            scene = renderer.createScene(data);
            scene.insert({
                type: 'Camera',
                ortho: [-width / 2, width / 2, height / 2, -height / 2, -1000, 1000]
            });
        }
        /**
         * @description 设置场景对象的位置
         */
        // tslint:disable-next-line:typedef

    }, {
        key: "setPos",
        value: function setPos(data, x, y, z) {
            data._show.old.position[0] = x;
            data._show.old.position[1] = z || 0;
            data._show.old.position[2] = y;
            if (data._show.old.ref) {
                scene.modify(data._show.old, 'position');
            }
        }
        /**
         * @description 创建指定数据对应的场景对象
         */
        // tslint:disable-next-line:typedef

    }, {
        key: "create",
        value: function create(data, func, parent, resTab) {
            if (parent) {
                if (!parent._show || !parent._show.old || !parent._show.old.ref) {
                    console.log('父节点不存在，无法创建模型');
                    return;
                }
                parent = parent._show.old;
            }
            var obj = JSON.parse(func(undefined, data));
            if (resTab) {
                obj.resTab = resTab;
            }
            data._show = data._show || {};
            data._show.tpl = func;
            data._show.old = obj;
            scene.insert(obj, parent, resTab);
        }
        /**
         * @description 修改指定数据对应的场景对象
         */
        // tslint:disable-next-line:typedef

    }, {
        key: "modify",
        value: function modify(data) {
            if (!data) {
                console.log(data);
            }
            var obj = JSON.parse(data._show.tpl(undefined, data));
            if (data._show.old.ref) {
                var old = data._show.old;
                mergeObject(obj, old, old.resTab, 'position');
            }
        }
        /**
         * @description 设置环境光
         * @param r,g,b 设置rgb分量，0-1
         */
        // tslint:disable-next-line:typedef

    }, {
        key: "setAmbient",
        value: function setAmbient(r, g, b) {}
        // scene.setAmbient(r, g, b);

        /**
         * @description 移除指定数据对应的场景对象
         */
        // tslint:disable-next-line:typedef

    }, {
        key: "remove",
        value: function remove(data) {
            try {
                scene.remove(data._show.old);
            } catch (ex) {
                if (console) {
                    console.log('remove, ex: ', ex);
                }
            }
        }
        /**
         * @description 取canvas
         */

    }, {
        key: "getCanvas",
        value: function getCanvas() {
            return renderer.getCanvas();
        }
    }]);

    return SceneManager;
}();

exports.SceneManager = SceneManager;
})