_$define("chat/client/app/widget/input/textarea", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 输入框的逻辑处理
 * {input:"",placehold:"",disabled:false,clearable:false,itype:"text",style:"",autofacus:false,maxLength:1}
 * input?: 初始内容
 * placeHolder?: 提示文字
 * disabled?: 是否禁用
 * clearable?: 是否可清空
 * itype?: 输入框类型 text number password integer
 * style?: 样式
 * autofocus?: 是否自动获取焦点
 * maxLength?: 输入最大长度，仅对text和password类型输入有效
 * 外部可监听 ev-input-change，ev-input-blur，ev-input-focus，ev-input-clear事件
 */
var event_1 = require("../../../../../pi/widget/event");
var painter_1 = require("../../../../../pi/widget/painter");
var widget_1 = require("../../../../../pi/widget/widget");

var Input = function (_widget_1$Widget) {
    _inherits(Input, _widget_1$Widget);

    function Input() {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));

        _this.state = {
            currentValue: '',
            inputLock: false
        };
        return _this;
    }

    _createClass(Input, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(Input.prototype.__proto__ || Object.getPrototypeOf(Input.prototype), "setProps", this).call(this, props, oldProps);
            this.state.currentValue = props.input ? props.input : '';
        }
        /**
         * 绘制方法
         * @param reset 表示新旧数据差异很大，不做差异计算，直接生成dom
         */

    }, {
        key: "paint",
        value: function paint(reset) {
            if (!this.tree) {
                _get(Input.prototype.__proto__ || Object.getPrototypeOf(Input.prototype), "paint", this).call(this, reset);
            }
            if (!this.props) {
                this.props = {};
            }
            var textarea = this.getInput();
            textarea.value = this.state.currentValue;
            textarea.scrollTop = textarea.scrollHeight - textarea.style.height;
            painter_1.paintWidget(this, reset);
        }
        /**
         * 获取真实输入框dom
         */

    }, {
        key: "getInput",
        value: function getInput() {
            return painter_1.getRealNode(this.tree.children[1]);
        }
        /**
         * 用户开始进行非直接输入(中文输入)的时候触发，
         * 而在非直接输入结束。
         */

    }, {
        key: "compositionstart",
        value: function compositionstart() {
            this.state.inputLock = true;
        }
        /**
         * 用户输入完成,点击候选词或确认按钮时触发
         */

    }, {
        key: "compositionend",
        value: function compositionend(e) {
            this.state.inputLock = false;
            this.change(e); // 部分浏览器compositionend事件在input事件之前触发，导致输入值为空
        }
        /**
         * 输入事件
         */

    }, {
        key: "change",
        value: function change(event) {
            if (this.state.inputLock) {
                return;
            }
            var currentValue = event.currentTarget.value;
            // 最大长度限制
            if (this.props.maxLength) {
                currentValue = String(currentValue).slice(0, this.props.maxLength);
            }
            this.state.currentValue = currentValue;
            event_1.notify(event.node, 'ev-input-change', { value: this.state.currentValue });
            this.paint();
        }
        /**
         * 失焦事件
         */

    }, {
        key: "onBlur",
        value: function onBlur(event) {
            event_1.notify(event.node, 'ev-input-blur', { value: this.state.currentValue });
        }
        /**
         * 聚焦事件
         */

    }, {
        key: "onFocus",
        value: function onFocus(event) {
            event_1.notify(event.node, 'ev-input-focus', {});
        }
        /**
         * 返回正确的行数
         */

    }, {
        key: "getRows",
        value: function getRows(value) {
            var len = 1;
            if (value.match(/\n/g)) {
                len = value.match(/\n/g).length + 1;
                len = len < 5 ? len : 5;
            }
            return len;
        }
    }]);

    return Input;
}(widget_1.Widget);

exports.Input = Input;
})