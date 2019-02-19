_$define("pi/ui/countdown", function (require, exports, module){
"use strict";
/*
 * 倒计时
 * props = {"now_time":10000,"cd_time":10000,"cd_interval":1000}
 * props必须有cd_time属性，表示倒计时的持续时间，可以是时间段的毫秒数，也可以是代表时间点的字符串（yyyy-MM-dd HH:mm:ss）毫秒。
 * props可以有now_time属性(使用时间不是本地时间,请转)，表示现在时间，可以是时间点的毫秒数，也可以是代表时间点的字符串（yyyy-MM-dd HH:mm:ss）毫秒
 * props可以有cd_interval属性，表示倒计时的计时频率，单位毫秒，默认1000。
 * props可以有cd_not_zerofill，表示是否不补零,默认补零.
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
/**
 * @description 导出组件Widget类
 * @example
 */

var CountDown = function (_widget_1$Widget) {
    _inherits(CountDown, _widget_1$Widget);

    function CountDown() {
        _classCallCheck(this, CountDown);

        var _this = _possibleConstructorReturn(this, (CountDown.__proto__ || Object.getPrototypeOf(CountDown)).apply(this, arguments));

        _this.timerRef = 0;
        return _this;
    }
    /**
     * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
     * @example
     */


    _createClass(CountDown, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            var _this2 = this;

            this.timerRef && clearTimeout(this.timerRef);
            // tslint:disable-next-line:no-this-assignment
            var scope = this;
            this.props = props;
            initCd_time(props);
            var flag = interval(props, scope);
            if (!flag) return;
            var func = function func() {
                flag = interval(props, scope);
                if (!flag) {
                    clearTimeout(_this2.timerRef);
                    _this2.timerRef = 0;
                } else {
                    _this2.paint();
                    _this2.timerRef = setTimeout(func, props.cd_interval || 1000);
                }
            };
            this.timerRef = setTimeout(func, props.cd_interval || 1000);
        }
        /**
         * @description 销毁时调用，一般在渲染循环外调用
         * @example
         */

    }, {
        key: "destroy",
        value: function destroy() {
            if (!_get(CountDown.prototype.__proto__ || Object.getPrototypeOf(CountDown.prototype), "destroy", this).call(this)) {
                return false;
            }
            this.timerRef && clearTimeout(this.timerRef);
            return true;
        }
    }]);

    return CountDown;
}(widget_1.Widget);

exports.CountDown = CountDown;
// 显示数字
var show = function show(e, time, carry, zerofill, callBack) {
    var t = void 0;
    var i = void 0;
    var s = void 0;
    t = Math.floor(time / carry);
    time = time % carry;
    s = '';
    if (!e.cd_not_zerofill && zerofill > 0) {
        i = t > 0 ? Math.floor(Math.log10(t)) + 1 : 1;
        for (; i < zerofill; i++) {
            s += '0';
        }
    }
    if (callBack) callBack(s + t);
    return time;
};
// 定时调用倒计时
var interval = function interval(e, wt) {
    var now = new Date().getTime();
    if (e.cd_time > 0) {
        if (now > e.cd_time) {
            task_mgr_1.set(event_1.notify, [wt.parentNode, 'ev-countdownend', null], 90000, 1);
            e.cd_time = 0;
            return false;
        } else {
            e.cdInfo = calcCd(e, now);
            return true;
        }
    }
};
// 倒计时使用本地当前时间和cd_time计算倒计时时间，但外部传入的倒计时开始时间可能与本地时间有一定差距，需要将它们的差加到cd_time上
// tslint:disable-next-line:variable-name
var initCd_time = function initCd_time(props) {
    if (typeof props.cd_time === 'string' && props.cd_time.constructor === String) {
        props.cd_time = strToMs(props.cd_time);
    }
    if (typeof props.now_time === 'string' && props.now_time.constructor === String) {
        props.now_time = strToMs(props.now_time);
    }
    var now = new Date().getTime();
    props.cd_time += now - props.now_time || now;
};
// 计算倒计时
var calcCd = function calcCd(e, now) {
    now = e.cd_time - now;
    // tslint:disable-next-line:no-object-literal-type-assertion
    var cdInfo = {};
    now = show(e, now, 24 * 60 * 60 * 1000, 0, function (time) {
        cdInfo.date = time;
    });
    now = show(e, now, 60 * 60 * 1000, 2, function (time) {
        cdInfo.hour = time;
    });
    now = show(e, now, 60 * 1000, 2, function (time) {
        cdInfo.minute = time;
    });
    now = show(e, now, 1000, 2, function (time) {
        cdInfo.second = time;
    });
    now = show(e, now, 1, 3, function (time) {
        cdInfo.ms = time;
    });
    cdInfo.tms = e.cd_time - now;
    return cdInfo;
};
// 将字符串时间转化成时间点的毫秒数
var strToMs = function strToMs(timeStr) {
    try {
        var arr = timeStr.split(' ');
        var date = new Date();
        var temp = void 0;
        if (arr[0]) {
            temp = arr[0].split('-');
            // tslint:disable:radix
            date.setFullYear(parseInt(temp[0].replace(/\b(0+)/gi, '')));
            date.setMonth(parseInt(temp[1].replace(/\b(0+)/gi, '')) - 1);
            date.setDate(parseInt(temp[2].replace(/\b(0+)/gi, '')));
        }
        if (!arr[1]) {
            temp = [];
        } else {
            temp = arr[1].split('-');
        }
        date.setHours(parseInt((temp[0] || '0').replace(/\b(0+)/gi, '')) || 0);
        date.setMinutes(parseInt((temp[1] || '0').replace(/\b(0+)/gi, '')) || 0);
        date.setSeconds(parseInt((temp[2] || '0').replace(/\b(0+)/gi, '')) || 0);
        return date.getTime();
    } catch (error) {
        throw new Error("invalid time str: " + timeStr);
    }
};
})