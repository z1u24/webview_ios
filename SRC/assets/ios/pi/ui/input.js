_$define("pi/ui/input", function (require, exports, module){
"use strict";
/*
 * 输入框，要求props为{sign:string|number, text?:string, readOnly?:string, focus?:boolean, id?:string|number}, 注意text要转义引号
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ============================== 导入
var event_1 = require("../widget/event");
var painter_1 = require("../widget/painter");
var widget_1 = require("../widget/widget");
// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */

var Input = function (_widget_1$Widget) {
    _inherits(Input, _widget_1$Widget);

    function Input() {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));

        _this.lastSign = 0;
        _this.lastText = undefined;
        _this.readOnly = undefined;
        return _this;
    }
    /**
     * @description 绘制方法，
     * @param reset 表示新旧数据差异很大，不做差异计算，直接生成dom
     * @example
     */


    _createClass(Input, [{
        key: "paint",
        value: function paint(reset) {
            if (!this.tree) {
                _get(Input.prototype.__proto__ || Object.getPrototypeOf(Input.prototype), "paint", this).call(this, reset);
            }
            if (!this.props) {
                this.props = {};
            }
            if (this.lastSign === this.props.sign) {
                return;
            }
            this.lastSign = this.props.sign;
            if (this.props.text !== undefined) {
                this.lastText = this.props.text;
                painter_1.paintCmd3(this.getInput(), 'value', this.lastText);
            }
            var r = this.props.readOnly;
            if (r === null) {
                r = undefined;
            }
            if (this.readOnly !== r) {
                this.readOnly = r;
                painter_1.paintCmd3(this.getInput(), 'readOnly', r || 'false');
            }
        }
        /**
         * @description 添加到dom树后调用，在渲染循环内调用
         * @example
         */

    }, {
        key: "attach",
        value: function attach() {
            this.props.focus && focus();
        }
        /**
         * @description 失焦
         * @example
         */

    }, {
        key: "getInput",
        value: function getInput() {
            return painter_1.getRealNode(this.tree);
        }
        /**
         * @description 输入事件
         * @example
         */
        // tslint:disable:typedef

    }, {
        key: "onInput",
        value: function onInput(e) {
            event_1.notify(this.parentNode, 'ev-input-text', { native: e, id: this.props.id, text: e.target.value });
        }
        /**
         * @description 失焦事件
         * @example
         */

    }, {
        key: "onBlur",
        value: function onBlur(e) {
            event_1.notify(this.parentNode, 'ev-input-blur', { native: e, id: this.props.id, text: e.target.value });
        }
        /**
         * @description 聚焦事件
         * @example
         */

    }, {
        key: "onFocus",
        value: function onFocus(e) {
            event_1.notify(this.parentNode, 'ev-input-focus', { native: e, id: this.props.id, text: e.target.value });
        }
        /**
         * @description 失焦
         * @example
         */

    }, {
        key: "blur",
        value: function blur() {
            this.getInput().blur();
        }
        /**
         * @description 聚焦
         * @example
         */

    }, {
        key: "focus",
        value: function focus() {
            this.getInput().focus();
        }
    }]);

    return Input;
}(widget_1.Widget);

exports.Input = Input;
// ============================== 本地
// ============================== 立即执行
})