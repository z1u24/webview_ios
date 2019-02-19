_$define("chat/client/app/view/register/registerSuccess", function (require, exports, module){
"use strict";
/**
 * 注册成功
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================ 导入
var widget_1 = require("../../../../../pi/widget/widget");
var logger_1 = require("../../../../utils/logger");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);
// ================================================ 导出

var RegisterSuccess = function (_widget_1$Widget) {
    _inherits(RegisterSuccess, _widget_1$Widget);

    function RegisterSuccess() {
        _classCallCheck(this, RegisterSuccess);

        var _this = _possibleConstructorReturn(this, (RegisterSuccess.__proto__ || Object.getPrototypeOf(RegisterSuccess)).apply(this, arguments));

        _this.props = {
            uid: null
        };
        return _this;
    }

    _createClass(RegisterSuccess, [{
        key: "goChat",
        value: function goChat() {
            this.ok();
        }
    }]);

    return RegisterSuccess;
}(widget_1.Widget);

exports.RegisterSuccess = RegisterSuccess;
})