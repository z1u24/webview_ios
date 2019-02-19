_$define("pi/ui/slidetab", function (require, exports, module){
"use strict";
/*
 * 滑动选项卡
 * 用户可以单击选项，来切换卡片，也可以滑动或快速滑动卡片来切换卡片。滑动到头后，有橡皮筋效果。
 * 根据提示条目显示红点提示或数量提示
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ============================== 导入
var time_1 = require("../lang/time");
var tween_1 = require("../math/tween");
var html_1 = require("../util/html");
var task_mgr_1 = require("../util/task_mgr");
var painter_1 = require("../widget/painter");
var virtual_node_1 = require("../widget/virtual_node");
var widget_1 = require("../widget/widget");
// ============================== 导出
/**
 * @description 定时器的定时时间，毫秒
 */
exports.TimerTime = 30;
/**
 * @description 运动速度，宽度100%/秒
 */
exports.Speed = 100;
/**
 * @description 导出组件Widget类
 * @example
 */

var SlideTab = function (_widget_1$Widget) {
    _inherits(SlideTab, _widget_1$Widget);

    function SlideTab() {
        _classCallCheck(this, SlideTab);

        var _this = _possibleConstructorReturn(this, (SlideTab.__proto__ || Object.getPrototypeOf(SlideTab)).apply(this, arguments));

        _this.transform = ''; // transform的兼容键
        _this.end = 0; // 结束位置，为(卡片数量-1)*-100
        _this.container = undefined; // 卡片的容器
        _this.containerWidth = 0;
        _this.timerRef = undefined;
        _this.startTime = 0; // 定时运动的起始时间
        _this.startOffset = 0; // 定时运动的起始位置
        _this.swipe = 0; // 挥动的方向，0为无挥动，-1左，1右
        _this.lastOffset = 0;
        _this.moving = 0;
        return _this;
    }
    /**
     * @description 第一次计算后调用，此时创建了真实的dom，但并没有加入到dom树上，一般在渲染循环外调用
     * @example
     */


    _createClass(SlideTab, [{
        key: "firstPaint",
        value: function firstPaint() {
            _get(SlideTab.prototype.__proto__ || Object.getPrototypeOf(SlideTab.prototype), "firstPaint", this).call(this);
            this.props = this.props || { cur: 0, old: {} };
            this.transform = html_1.getSupportedProperty('transform');
            this.end = -(this.config.value.arr.length - 1) * 100;
        }
        /**
         * @description 定住移动的卡片或初始化
         * @example
         */

    }, {
        key: "poiseStart",
        value: function poiseStart(e) {
            this.moving = 0;
            if (!this.container) {
                this.container = painter_1.getRealNode(virtual_node_1.findNodeByAttr(this.tree, 'container'));
                this.containerWidth = this.container.getBoundingClientRect().width;
            }
            if (this.timerRef) {
                task_mgr_1.clearTimer(this.timerRef);
                var r = tween(this);
                this.timerRef = null;
                this.lastOffset = r === false ? -this.props.cur * 100 : r;
            } else {
                this.lastOffset = -this.props.cur * 100;
            }
        }
        /**
         * @description 松开移动的卡片
         * @example
         */

    }, {
        key: "poiseEnd",
        value: function poiseEnd(e) {
            if (this.moving > 0 || this.timerRef) {
                return;
            }
            if (this.lastOffset === -this.props.cur * 100) {
                return;
            }
            this.timerRef = task_mgr_1.setTimer(tween, [this], exports.TimerTime);
            this.startTime = time_1.now();
            this.startOffset = this.lastOffset;
            this.moving = 2;
        }
        /**
         * @description 处理tpl里面的on-move事件
         * @example
         */

    }, {
        key: "moveTab",
        value: function moveTab(e) {
            var d = this.lastOffset + (e.x - e.startX) * 100 / this.containerWidth;
            if (d > 0) {
                // 左边拉到头
                d = tween_1.calc(d > 100 ? 100 : d, 0, 100, 100, tween_1.cubicOut) / 3;
            } else if (d < this.end) {
                // 右边拉到头
                d = this.end - tween_1.calc(this.end - d > 100 ? 100 : this.end - d, 0, 100, 100, tween_1.cubicOut) / 3;
            }
            // tslint:disable-next-line:prefer-template
            painter_1.paintCmd3(this.container.style, this.transform, 'translateX(' + d + '%)');
            this.moving = 1;
            if (e.subType === 'over') {
                this.timerRef = task_mgr_1.setTimer(tween, [this], exports.TimerTime);
                this.startTime = time_1.now();
                this.startOffset = d;
                this.moving = 2;
                if (e.swipe) {
                    this.swipe = e.x - e.lastX > 0 ? 1 : -1;
                } else {
                    this.swipe = 0;
                }
            }
        }
        /**
         * @description 选择按钮切换
         * @example
         */

    }, {
        key: "change",
        value: function change(e) {
            if (e.cmd === this.props.cur) {
                return;
            }
            if (this.timerRef) {
                task_mgr_1.clearTimer(this.timerRef);
                this.timerRef = null;
            }
            this.props.cur = e.cmd;
            this.paint();
        }
    }]);

    return SlideTab;
}(widget_1.Widget);

exports.SlideTab = SlideTab;
// ============================== 本地
/**
 * @description 定时器调用运动函数
 * @example
 */
var tween = function tween(widget) {
    var d = void 0;
    var time = time_1.now() - widget.startTime;
    if (widget.startOffset > 0) {
        // 左边弹回
        d = widget.startOffset * 1000 / exports.Speed;
        if (time > d) {
            d = 0;
            task_mgr_1.clearTimer(widget.timerRef);
            widget.timerRef = null;
        } else {
            d = tween_1.calc(time, widget.startOffset, 0, d, tween_1.quadIn);
        }
    } else if (widget.startOffset < widget.end) {
        // 右边弹回
        d = (widget.end - widget.startOffset) * 1000 / exports.Speed;
        if (time > d) {
            d = widget.end;
            task_mgr_1.clearTimer(widget.timerRef);
            widget.timerRef = null;
        } else {
            d = tween_1.calc(time, widget.startOffset, widget.end, d, tween_1.quadIn);
        }
    } else if (widget.swipe !== 0) {
        // 挥动
        var end = widget.startOffset % 100;
        end = widget.swipe > 0 ? widget.startOffset - end : widget.startOffset - end - 100;
        d = stop(widget, end, time);
        if (d === false) {
            return false;
        }
    } else {
        // 平稳运动，中间根据起始位置靠那边，决定运动方向
        var _end = widget.startOffset % 100;
        _end = _end > -50 ? widget.startOffset - _end : widget.startOffset - _end - 100;
        d = stop(widget, _end, time);
        if (d === false) {
            return false;
        }
    }
    // tslint:disable-next-line:prefer-template
    painter_1.paintCmd3(widget.container.style, widget.transform, 'translateX(' + d + '%)');
    return d;
};
/**
 * @description 停止，判断是否刷新
 * @example
 */
var stop = function stop(widget, end, time) {
    var d = Math.abs(end - widget.startOffset) * 1000 / exports.Speed;
    if (time > d) {
        d = end;
        task_mgr_1.clearTimer(widget.timerRef);
        widget.timerRef = null;
        if (widget.props.cur !== -end / 100) {
            widget.props.cur = -end / 100;
            widget.paint();
            return false;
        }
    } else {
        d = tween_1.calc(time, widget.startOffset, end, d, tween_1.sinOut);
    }
    return d;
};
// ============================== 立即执行
})