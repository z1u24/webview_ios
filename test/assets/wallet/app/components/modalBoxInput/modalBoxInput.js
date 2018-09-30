_$define("app/components/modalBoxInput/modalBoxInput", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 带输入框的模态框
 * {title:"提示",content:"温馨提示",sureText:"sure",cancelText:"cancel",placeholder:"",itype:"text"}
 * title：标题
 * content：内容数组，如果需要分行显示
 * sureText:确认按钮名称
 * cancelText：取消按钮名称
 * itype:输入数据类型，text，number，password
 * placeholder:输入框提示语
 * 外部监听 ev-sure，ev-forgetPsw 事件,event.value获取输入框中数据
 */
var widget_1 = require("../../../pi/widget/widget");
var tools_1 = require("../../utils/tools");

var ModalBoxInput = function (_widget_1$Widget) {
    _inherits(ModalBoxInput, _widget_1$Widget);

    function ModalBoxInput() {
        _classCallCheck(this, ModalBoxInput);

        return _possibleConstructorReturn(this, (ModalBoxInput.__proto__ || Object.getPrototypeOf(ModalBoxInput)).apply(this, arguments));
    }

    _createClass(ModalBoxInput, [{
        key: "create",
        value: function create() {
            _get(ModalBoxInput.prototype.__proto__ || Object.getPrototypeOf(ModalBoxInput.prototype), "create", this).call(this);
            this.state = {
                currentValue: '',
                cfgData: tools_1.getLanguage(this)
            };
        }
        /**
         * 点击取消按钮
         */

    }, {
        key: "cancelBtnClick",
        value: function cancelBtnClick(e) {
            this.cancel && this.cancel();
        }
        /**
         * 点击确认按钮
         */

    }, {
        key: "okBtnClick",
        value: function okBtnClick(e) {
            this.ok && this.ok(this.state.currentValue);
        }
        /**
         * 忘记密码
         */

    }, {
        key: "foegetPsw",
        value: function foegetPsw(e) {}
        // this.ok && this.ok();        

        /**
         * 输入框变化
         */

    }, {
        key: "change",
        value: function change(e) {
            this.state.currentValue = e.value;
            this.paint();
        }
    }]);

    return ModalBoxInput;
}(widget_1.Widget);

exports.ModalBoxInput = ModalBoxInput;
})