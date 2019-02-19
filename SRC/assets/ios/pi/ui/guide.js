_$define("pi/ui/guide", function (require, exports, module){
"use strict";
/*
 * 引导模块
 * 包括引导状态表{state1:[{name:"gs1",...},{name:"g2",...}],state2:[{name:"gs2",...},{name:"g2",...}],...}，引导组件和引导强制组件
 * 当开始指定引导状态时，弹出引导强制组件，查找和监听引导组件的初始化，负责整个引导过程。
 * 通过监听器，可以在开始和结束时记录到后台，和衔接剧情等。
 * 引导组件应该嵌在指定的按钮组件内，负责通知引导模块有指定引导状态的按钮初始化。
 * 监听按钮是否按下，如果当前在指定引导类型上，刷新引导强制组件。
 * 引导强制组件保证只有按钮组件的区域可以被按下。
 *
 * 考虑如果在一个状态下，用户异常退出，用户重新登录后需要修复到该状态，而该状态可能需要从主界面引导才可以进入该状态。这个引导过程应该定义一个单独的修复状态。可以采用state1_fix的命名来定义。由应用代码来判断和调用。
 *
 * 在一个状态下，用户异常退出，还有可能导致该状态无法继续（比如物品已经被用掉了）。这种情况，应该减少一个状态下的步数，来保证状态内数据的原子性。并可以通过代码来跳过异常状态。
 *
 * @example <app-ui-guide>"g2"</app-ui-guide>
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("../util/event");
var html_1 = require("../util/html");
var widget_1 = require("../widget/widget");
var root_1 = require("./root");
// ============================== 导出
/**
 * @description 导出的监听器列表
 * @example
 */
exports.listenerList = event_1.createHandlerList();
/**
 * @description 导出组件Widget类
 * @example
 */

var Guide = function (_widget_1$Widget) {
    _inherits(Guide, _widget_1$Widget);

    function Guide() {
        _classCallCheck(this, Guide);

        var _this = _possibleConstructorReturn(this, (Guide.__proto__ || Object.getPrototypeOf(Guide)).apply(this, arguments));

        _this.id = maxID++;
        _this.painted = false;
        return _this;
    }
    /**
     * @description 第一次计算后调用，此时创建了真实的dom，但并没有加入到dom树上，一般在渲染循环外调用
     * @example
     */


    _createClass(Guide, [{
        key: "firstPaint",
        value: function firstPaint() {
            _get(Guide.prototype.__proto__ || Object.getPrototypeOf(Guide.prototype), "firstPaint", this).call(this);
            widgetMap.set(this.id, this);
        }
        /**
         * @description 添加到dom树后调用，在渲染循环内调用
         * @example
         */

    }, {
        key: "attach",
        value: function attach() {
            if (!cur) {
                return;
            }
            var show = stateTable[cur][step];
            if (this.props === show.name) {
                guideForce(this, show);
            }
        }
        /**
         * @description 绘制方法，
         * @param reset表示新旧数据差异很大，不做差异计算，直接生成dom
         * @example
         */

    }, {
        key: "paint",
        value: function paint(reset) {
            if (this.painted) {
                return;
            }
            this.painted = true;
            _get(Guide.prototype.__proto__ || Object.getPrototypeOf(Guide.prototype), "paint", this).call(this, reset);
        }
        /**
         * @description 销毁时调用，一般在渲染循环外调用
         * @example
         */

    }, {
        key: "destroy",
        value: function destroy() {
            if (!_get(Guide.prototype.__proto__ || Object.getPrototypeOf(Guide.prototype), "destroy", this).call(this)) {
                return;
            }
            widgetMap.delete(this.id);
        }
        /**
         * @description 销毁时调用，一般在渲染循环外调用
         * @example
         */

    }, {
        key: "guide",
        value: function guide() {
            if (!cur) {
                return;
            }
            var steps = stateTable[cur];
            if (this.props !== steps[step].name) {
                return;
            }
            if (step < steps.length - 1) {
                step++;
                if (!guideFind()) {
                    // 如果没有找到当前存在的引导组件，则强制引导组件回到初始态
                    guideForceWidget.setProps({ x: 0, y: 0, w: 0, h: 0, show: {} });
                    guideForceWidget.paint();
                }
            } else {
                // 引导结束
                root_1.setForbidBack(false);
                if (guideForceWidget) {
                    root_1.destory(guideForceWidget);
                }
                guideForceWidget = null;
                exports.listenerList({ type: 'guideOver', state: cur });
                cur = '';
            }
        }
    }]);

    return Guide;
}(widget_1.Widget);

exports.Guide = Guide;
/**
 * @description 初始化引导状态表
 * @param stateTab 引导状态表
 * @example
 */
exports.init = function (stateTab) {
    stateTable = stateTab;
};
/**
 * @description 开始指定的引导状态
 * @param state 引导状态
 * @example
 */
exports.start = function (state) {
    cur = state;
    step = 0;
    root_1.setForbidBack(true);
    if (!guideForceWidget) {
        guideForceWidget = root_1.open(guideForceWidgetName, { height: 0, left: 0, top: 0, width: 0 });
    }
    guideFind();
    exports.listenerList({ type: 'guideStart', state: cur });
};
/**
 * @description 获得引导强制组件的名称
 */
exports.getGuideForceWidgetName = function () {
    return guideForceWidgetName;
};
/**
 * @description 设置引导强制组件的名称
 * @param widgetName  "app-ui-guideforce"
 */
exports.setGuideForceWidgetName = function (widgetName) {
    guideForceWidgetName = widgetName;
};
// ============================== 本地
/**
 * @description 引导状态表
 */
var stateTable = {};
/**
 * @description 当前状态
 */
var cur = '';
/**
 * @description 当前状态的步数
 */
var step = 0;
/**
 * @description Widget自增ID,用于区分创建的Widget
 */
var maxID = 1;
/**
 * @description 引导强制组件的名称
 */
var widgetMap = new Map();
/**
 * @description 引导强制组件的名称
 */
var guideForceWidgetName = '';
/**
 * @description 引导强制组件
 */
var guideForceWidget = null;
/**
 * @description 寻找指定的引导组件
 */
var guideFind = function guideFind() {
    var show = stateTable[cur][step];
    for (var _iterator = widgetMap.values(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var w = _ref;

        if (w.props === show.name) {
            guideForce(w, show);
            return true;
        }
    }
    return false;
};
/**
 * @description 刷新强制引导组件
 */
var guideForce = function guideForce(w, show) {
    var el = w.tree.link;
    var pos = { x: 0, y: 0, w: el.offsetWidth, h: el.offsetHeight, show: show };
    var p = html_1.offsetPos(el, root_1.getRoot(), pos);
    if (!p) {
        pos.x = pos.y = pos.w = pos.h = 0;
    }
    guideForceWidget.setProps(pos);
    guideForceWidget.paint();
};
// ============================== 立即执行
})