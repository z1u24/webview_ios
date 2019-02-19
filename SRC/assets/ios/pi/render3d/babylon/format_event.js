_$define("pi/render3d/babylon/format_event", function (require, exports, module){
"use strict";
/// <reference path="./babylon.d.ts"/>

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var format_canvas_display_1 = require("./format_canvas_display");
// canvas 事件属性列表 - ( 搜索 babylon.max.js )
var attrList = ["type", "pointerId", "button", "pointerType", "target", "srcElement", "movementX", "mozMovementX", "webkitMovementX", "msMovementX", "movementY", "mozMovementY", "webkitMovementY", "msMovementY", "keyCode", "ctrlKey", "sourceEvent", "gamepad", "alpha", "beta", "gamma"];
// canvas 事件方法属性列表 - ( 搜索 babylon.max.js )
var funcList = ["preventDefault"];
// 是否在 Dom 环境中运行
var flagRunInDom = false;
var _canvas = void 0;
/**
 * 标准化事件响应的方法类
 */

var FormatEvent = function () {
    function FormatEvent() {
        _classCallCheck(this, FormatEvent);
    }

    _createClass(FormatEvent, null, [{
        key: "format",
        value: function format(canvas, scene, engine) {
            FormatEvent.formatWay1(canvas, scene, engine);
            // formatWay2(  canvas, scene, engine  );
        }
        /**
         * 标识 babylon 在 Dom 结构中运行
         */

    }, {
        key: "setFlagRunInDom",
        value: function setFlagRunInDom() {
            flagRunInDom = true;
        }
        /**
         * 标准化方法1
         * @param canvas
         * @param scene
         * @param engine
         */

    }, {
        key: "formatWay1",
        value: function formatWay1(canvas, scene, engine) {
            var _scene = scene;
            var oldUp = _scene._onPointerUp,
                oldDown = _scene._onPointerDown,
                oldMove = _scene._onPointerMove;
            var eventPrefix = BABYLON.Tools.GetPointerPrefix();
            _canvas = canvas;
            canvas.removeEventListener(eventPrefix + "move", oldMove);
            canvas.removeEventListener(eventPrefix + "down", oldDown);
            window.removeEventListener(eventPrefix + "up", oldUp);
            // engine.setHardwareScalingLevel(  getRootScale() );
            // 改造 engine 获取到的 cavas 显示矩形范围
            engine.getRenderingCanvasClientRect = function () {
                if (!engine._renderingCanvas) {
                    return null;
                }
                return FormatEvent.getBoundingClientRect();
                // return getBoundingClientRect2();
            };
            // Wheel
            _scene._onPointerUp = function (evt) {
                var e = void 0;
                e = FormatEvent.formatTransEvent(evt);
                oldUp(e);
            };
            _scene._onPointerDown = function (evt) {
                var e = void 0;
                e = FormatEvent.formatTransEvent(evt);
                oldDown(e);
            };
            _scene._onPointerMove = function (evt) {
                var e = void 0;
                e = FormatEvent.formatTransEvent(evt);
                oldMove(e);
            };
            canvas.addEventListener(eventPrefix + "move", _scene._onPointerMove, false);
            // Whee
            canvas.addEventListener(eventPrefix + "down", _scene._onPointerDown, false);
            window.addEventListener(eventPrefix + "up", _scene._onPointerUp, false);
            // 屏蔽浏览器环境菜单
            canvas.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            });
        }
        /**
         * 标准化方法 2
         * @param canvas
         * @param scene
         * @param engine
         */

    }, {
        key: "formatWay2",
        value: function formatWay2(canvas, scene, engine) {
            var _scene = scene;
            var oldUp = _scene._onPointerUp,
                oldDown = _scene._onPointerDown,
                oldMove = _scene._onPointerMove;
            var eventPrefix = BABYLON.Tools.GetPointerPrefix();
            canvas.removeEventListener(eventPrefix + "move", oldMove);
            canvas.removeEventListener(eventPrefix + "down", oldDown);
            window.removeEventListener(eventPrefix + "up", oldUp);
            // engine.setHardwareScalingLevel(  getRootScale() );
            // 改造 engine 获取到的 cavas 显示矩形范围
            engine.getRenderingCanvasClientRect = function () {
                if (!engine._renderingCanvas) {
                    return null;
                }
                // return getBoundingClientRect();
                return FormatEvent.getBoundingClientRect2();
            };
            // (Tese 02)
            // let oldRootPICK = host._rootContainer._processPicking.bind(host._rootContainer);
            // host._rootContainer._processPicking = function (x, y, type, pointerId, buttonIndex) {
            //     oldRootPICK(x / FormatCanvasDisplay.getRootScale(), y / FormatCanvasDisplay.getRootScale(), type, pointerId, buttonIndex);
            // };
            // Wheel
            _scene._onPointerUp = function (evt) {
                var e = void 0;
                e = FormatEvent.formatTransEvent2(evt);
                oldUp(e);
            };
            _scene._onPointerDown = function (evt) {
                var e = void 0;
                e = FormatEvent.formatTransEvent2(evt);
                oldDown(e);
            };
            _scene._onPointerMove = function (evt) {
                var e = void 0;
                e = FormatEvent.formatTransEvent2(evt);
                oldMove(e);
            };
            canvas.addEventListener(eventPrefix + "move", _scene._onPointerMove, false);
            // Whee
            canvas.addEventListener(eventPrefix + "down", _scene._onPointerDown, false);
            window.addEventListener(eventPrefix + "up", _scene._onPointerUp, false);
            // 屏蔽浏览器环境菜单
            canvas.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            });
        }
        /**
         * 修改 事件 (Tese 01)
         * @param evt
         */

    }, {
        key: "formatTransEvent",
        value: function formatTransEvent(evt) {
            var e = {},
                rect = FormatEvent.getBoundingClientRect();
            var parentClientX = void 0,
                parentClientY = void 0;
            if (flagRunInDom) {
                parentClientX = evt.clientX;
                parentClientY = evt.clientY;
            } else {
                parentClientX = evt.clientX;
                parentClientY = evt.clientY;
            }
            // 处理旋转 (顺时针90)
            if (format_canvas_display_1.FormatCanvasDisplay.getIsRotate()) {
                e.clientX = parentClientY;
                e.clientY = format_canvas_display_1.FormatCanvasDisplay.getClientW() - parentClientX;
            } else {
                e.clientX = parentClientX;
                e.clientY = parentClientY;
            }
            // 处理缩放, x 方向 点击进入 canvas 范围
            if (e.clientX > rect.x) {
                // 处理缩放, x 方向 点击超出 canvas 范围
                if (e.clientX > rect.x + rect.width * format_canvas_display_1.FormatCanvasDisplay.getRootScale()) {
                    e.clientX = rect.width + (e.clientX - rect.width * format_canvas_display_1.FormatCanvasDisplay.getRootScale());
                } else {
                    e.clientX = rect.x + (e.clientX - rect.x) / format_canvas_display_1.FormatCanvasDisplay.getRootScale();
                }
            }
            // 处理缩放, y 方向 点击进入 canvas 范围
            if (e.clientY > rect.y) {
                // 处理缩放, y 方向 点击超出 canvas 范围
                if (e.clientY > rect.y + rect.height * format_canvas_display_1.FormatCanvasDisplay.getRootScale()) {
                    e.clientY = rect.height + (e.clientY - rect.height * format_canvas_display_1.FormatCanvasDisplay.getRootScale());
                } else {
                    e.clientY = rect.y + (e.clientY - rect.y) / format_canvas_display_1.FormatCanvasDisplay.getRootScale();
                }
            }
            // 握住原生事件
            FormatEvent.recordEventAttr(evt, e);
            return e;
        }
        /**
         * 另一种 修改事件 的测试 (Tese 02)
         * @param evt
         */

    }, {
        key: "formatTransEvent2",
        value: function formatTransEvent2(evt) {
            var e = {};
            var rect = FormatEvent.getBoundingClientRect();
            // 处理旋转 (顺时针90)
            if (format_canvas_display_1.FormatCanvasDisplay.getIsRotate()) {
                e.clientX = evt.clientY;
                e.clientY = format_canvas_display_1.FormatCanvasDisplay.getClientW() - evt.clientX;
            } else {
                e.clientX = evt.clientX;
                e.clientY = evt.clientY;
            }
            // 握住原生事件
            FormatEvent.recordEventAttr(evt, e);
            return e;
        }
        /**
         * 复制事件信息
         * @param evt
         * @param e
         */

    }, {
        key: "recordEventAttr",
        value: function recordEventAttr(evt, e) {
            attrList.forEach(function (key) {
                e[key] = evt[key];
            });
            funcList.forEach(function (key) {
                e[key] = evt[key];
                e[key] = function () {
                    evt[key]();
                };
            });
        }
        /**
         * 自定义 canvas 范围, 处理 canvas 旋转和缩放 产生的变化
         *
         *  背景：
         *      事件捕获使用的坐标：
         *          事件在 UI 上的坐标, 对全屏UI 而言 即在 canvas 内部的 ( x, y )  )
         *
         *      pos0    缩放的canvas上的坐标
         *      diffPos 实际canvas上的坐标
         *      联系： pos0  = diffPos * 缩放比例
         *
         *      GUI 使用 pos0 在 缩放后大小 区域 进行事件捕获
         *
         *      GUI 内部计算 pos0:  clientX - canvas.left = pos0.x
         *                         clientY - canvas.top  = pos0.y
         *
         *  目标:  使得计算出的 pos0 的值等于 diffPos
         *
         *  方案:  改造 clientX， canvas.left,  clientY， canvas.top
         *
         *
         */

    }, {
        key: "getBoundingClientRect",
        value: function getBoundingClientRect() {
            if (format_canvas_display_1.FormatCanvasDisplay.getIsRotate()) {
                return {
                    x: (format_canvas_display_1.FormatCanvasDisplay.getClientH() - format_canvas_display_1.FormatCanvasDisplay.getDisplayW()) / 2,
                    y: (format_canvas_display_1.FormatCanvasDisplay.getClientW() - format_canvas_display_1.FormatCanvasDisplay.getDisplayH()) / 2,
                    left: (format_canvas_display_1.FormatCanvasDisplay.getClientH() - format_canvas_display_1.FormatCanvasDisplay.getDisplayW()) / 2,
                    top: (format_canvas_display_1.FormatCanvasDisplay.getClientW() - format_canvas_display_1.FormatCanvasDisplay.getDisplayH()) / 2,
                    right: (format_canvas_display_1.FormatCanvasDisplay.getClientH() + format_canvas_display_1.FormatCanvasDisplay.getRootW()) / 2,
                    bottom: (format_canvas_display_1.FormatCanvasDisplay.getClientW() + format_canvas_display_1.FormatCanvasDisplay.getRootH()) / 2,
                    width: format_canvas_display_1.FormatCanvasDisplay.getRootW(),
                    height: format_canvas_display_1.FormatCanvasDisplay.getRootH()
                };
            } else {
                return {
                    x: (format_canvas_display_1.FormatCanvasDisplay.getClientW() - format_canvas_display_1.FormatCanvasDisplay.getDisplayW()) / 2,
                    y: (format_canvas_display_1.FormatCanvasDisplay.getClientH() - format_canvas_display_1.FormatCanvasDisplay.getDisplayH()) / 2,
                    left: (format_canvas_display_1.FormatCanvasDisplay.getClientW() - format_canvas_display_1.FormatCanvasDisplay.getDisplayW()) / 2,
                    top: (format_canvas_display_1.FormatCanvasDisplay.getClientH() - format_canvas_display_1.FormatCanvasDisplay.getDisplayH()) / 2,
                    right: (format_canvas_display_1.FormatCanvasDisplay.getClientW() + format_canvas_display_1.FormatCanvasDisplay.getRootW()) / 2,
                    bottom: (format_canvas_display_1.FormatCanvasDisplay.getClientH() + format_canvas_display_1.FormatCanvasDisplay.getRootH()) / 2,
                    width: format_canvas_display_1.FormatCanvasDisplay.getRootW(),
                    height: format_canvas_display_1.FormatCanvasDisplay.getRootH()
                };
            }
        }
        /**
         * 简单处理 canvas 旋转 产生的变化
         */

    }, {
        key: "getBoundingClientRect2",
        value: function getBoundingClientRect2() {
            if (format_canvas_display_1.FormatCanvasDisplay.getIsRotate()) {
                return {
                    x: (format_canvas_display_1.FormatCanvasDisplay.getClientH() - format_canvas_display_1.FormatCanvasDisplay.getDisplayW()) / 2,
                    y: (format_canvas_display_1.FormatCanvasDisplay.getClientW() - format_canvas_display_1.FormatCanvasDisplay.getDisplayH()) / 2,
                    left: (format_canvas_display_1.FormatCanvasDisplay.getClientH() - format_canvas_display_1.FormatCanvasDisplay.getDisplayW()) / 2,
                    top: (format_canvas_display_1.FormatCanvasDisplay.getClientW() - format_canvas_display_1.FormatCanvasDisplay.getDisplayH()) / 2,
                    right: (format_canvas_display_1.FormatCanvasDisplay.getClientH() + format_canvas_display_1.FormatCanvasDisplay.getDisplayW()) / 2,
                    bottom: (format_canvas_display_1.FormatCanvasDisplay.getClientW() + format_canvas_display_1.FormatCanvasDisplay.getDisplayH()) / 2,
                    width: format_canvas_display_1.FormatCanvasDisplay.getDisplayW(),
                    height: format_canvas_display_1.FormatCanvasDisplay.getDisplayH()
                };
            } else {
                return {
                    x: (format_canvas_display_1.FormatCanvasDisplay.getClientW() - format_canvas_display_1.FormatCanvasDisplay.getDisplayW()) / 2,
                    y: (format_canvas_display_1.FormatCanvasDisplay.getClientH() - format_canvas_display_1.FormatCanvasDisplay.getDisplayH()) / 2,
                    left: (format_canvas_display_1.FormatCanvasDisplay.getClientW() - format_canvas_display_1.FormatCanvasDisplay.getDisplayW()) / 2,
                    top: (format_canvas_display_1.FormatCanvasDisplay.getClientH() - format_canvas_display_1.FormatCanvasDisplay.getDisplayH()) / 2,
                    right: (format_canvas_display_1.FormatCanvasDisplay.getClientW() + format_canvas_display_1.FormatCanvasDisplay.getDisplayW()) / 2,
                    bottom: (format_canvas_display_1.FormatCanvasDisplay.getClientH() + format_canvas_display_1.FormatCanvasDisplay.getDisplayH()) / 2,
                    width: format_canvas_display_1.FormatCanvasDisplay.getDisplayW(),
                    height: format_canvas_display_1.FormatCanvasDisplay.getDisplayH()
                };
            }
        }
    }]);

    return FormatEvent;
}();

exports.FormatEvent = FormatEvent;
})