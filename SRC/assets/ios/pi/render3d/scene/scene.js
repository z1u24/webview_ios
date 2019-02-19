_$define("pi/render3d/scene/scene", function (require, exports, module){
"use strict";
/*
 * 场景模块
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ============================== 导入
var frame_mgr_1 = require("../../widget/frame_mgr");
var widget_1 = require("../../widget/widget");
var forelet_1 = require("../../widget/forelet");
var painter_1 = require("../../widget/painter");
// ============================== 导出
/**
 * @description 导出给组件用的forelet
 * @example
 */
exports.forelet = new forelet_1.Forelet();
var scene_mgr_1 = require("../../render3d/scene_mgr");
exports.cfg = {
    width: 420,
    height: 700,
    antialias: false
};
var frame = void 0;
var isInitMgr = false;
exports.init = function () {
    if (isInitMgr) return;
    isInitMgr = true;
    scene_mgr_1.SceneManager.init(exports.cfg.width, exports.cfg.height, exports.cfg.antialias);
    scene_mgr_1.SceneManager.reset({
        lights: [{
            type: 'Ambient',
            color: [1.0, 1.0, 1.0]
        }]
    });
    // 场景的渲染循环
    var FPS = 31;
    frame = frame_mgr_1.create();
    // tslint:disable-next-line:no-string-based-set-interval
    frame.setInterval(1000 / FPS);
    frame_mgr_1.setInterval(frame);
    frame.setPermanent(scene_mgr_1.SceneManager.render.bind(scene_mgr_1.SceneManager));
};
// ============================== 本地
// ============================== 立即执行
// 监听添加widget
exports.forelet.listener = function (cmd, widget) {
    if (cmd === 'firstPaint') {
        var canvas = scene_mgr_1.SceneManager.getCanvas();
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        painter_1.paintCmd3(painter_1.getRealNode(widget.tree), 'appendChild', [canvas]);
    }
};
var clickCB = null;
// 设置点击回调，主要是场景查询
exports.setClickCallback = function (cb) {
    clickCB = cb;
};
/**
 * @description 设置帧率统计回调
 * @param interval 调用回调的间隔时间，单位:毫秒
 * @param cb 回调函数，参数是frame_mgr的lastStat对象
 *
 */
exports.setFrameStateCallback = function (cb, interval) {
    frame.setStat(cb, interval);
};

var Scene = function (_widget_1$Widget) {
    _inherits(Scene, _widget_1$Widget);

    function Scene() {
        _classCallCheck(this, Scene);

        return _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this));
    }

    _createClass(Scene, [{
        key: "onRayCast",
        value: function onRayCast(event) {
            var scale = exports.cfg.width;
            var x = event.x * (exports.cfg.width / window.innerWidth);
            var y = event.y * (exports.cfg.height / window.innerHeight);
            var result = scene_mgr_1.SceneManager.raycast(x, y);
            clickCB && clickCB(result);
        }
    }]);

    return Scene;
}(widget_1.Widget);

exports.Scene = Scene;
})