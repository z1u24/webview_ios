_$define("pi/ui/selectnumber", function (require, exports, module){
"use strict";
/*
 * 选数量对话框
 * props = {count?:number ||, maxCount?:number, minCount?:number, interval?:number}
 * props可以有count, 默认为1
 * props可以有maxCount, 默认为Number.MAX_SAFE_INTEGER
 * props可以有minCount, 默认为0
 * props可以有interval, 默认为200毫秒
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var task_mgr_1 = require("../util/task_mgr");
var event_1 = require("../widget/event");
var widget_1 = require("../widget/widget");
var INTERVAL = 200;
// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */

var SelectNumber = function (_widget_1$Widget) {
    _inherits(SelectNumber, _widget_1$Widget);

    function SelectNumber() {
        _classCallCheck(this, SelectNumber);

        var _this = _possibleConstructorReturn(this, (SelectNumber.__proto__ || Object.getPrototypeOf(SelectNumber)).apply(this, arguments));

        _this.timerRef = 0;
        return _this;
    }
    /**
     * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
     * @example
     */


    _createClass(SelectNumber, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            props.count = props.count || 1;
            props.minCount = props.minCount || 0;
            props.maxCount = props.maxCount || Number.MAX_SAFE_INTEGER;
            props.interval = props.interval || INTERVAL;
            this.props = props;
        }
        /**
         * @description 按下事件
         * @example
         */
        // tslint:disable-next-line:typedef

    }, {
        key: "down",
        value: function down(step) {
            this.props.step = step;
            // tslint:disable-next-line:no-this-assignment
            var w = this;
            this.timerRef = setTimeout(function () {
                changeCount(w, step, true);
            }, 800);
        }
        /**
         * @description 鼠标或手指抬起事件
         * @example
         */
        // tslint:disable-next-line:typedef

    }, {
        key: "up",
        value: function up(e) {
            if (this.timerRef) {
                clearTimeout(this.timerRef);
                this.timerRef = 0;
            }
            changeCount(this, this.props.step, false);
            task_mgr_1.set(event_1.notify, [this.parentNode, 'ev-selectcount', { count: this.props.count }], 90000, 1);
        }
        /**
         * @description 销毁时调用，一般在渲染循环外调用
         * @example
         */

    }, {
        key: "destroy",
        value: function destroy() {
            if (!_get(SelectNumber.prototype.__proto__ || Object.getPrototypeOf(SelectNumber.prototype), "destroy", this).call(this)) {
                return false;
            }
            this.timerRef && clearTimeout(this.timerRef);
            return true;
        }
    }]);

    return SelectNumber;
}(widget_1.Widget);

exports.SelectNumber = SelectNumber;
/**
 * @description 更改选择数量
 * @param startTimeout--是否开启定时器
 * @example
 */
var changeCount = function changeCount(w, step, startTimeout) {
    var to = w.props.count + step;
    if (step > 0) {
        if (to >= w.props.maxCount) {
            w.props.count = w.props.maxCount;
            w.timerRef = 0;
        } else {
            w.props.count = to;
            if (startTimeout) {
                w.timerRef = setTimeout(function () {
                    changeCount(w, step, true);
                }, w.props.interval);
            }
        }
    } else if (step < 0) {
        if (to <= w.props.minCount) {
            w.props.count = w.props.minCount;
            w.timerRef = 0;
        } else {
            w.props.count = to;
            if (startTimeout) {
                w.timerRef = setTimeout(function () {
                    changeCount(w, step, true);
                }, w.props.interval);
            }
        }
    }
    w.paint();
};
})