_$define("chat/client/app/view/register/register", function (require, exports, module){
"use strict";
/**
 * 登录
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================ 导入
var root_1 = require("../../../../../pi/ui/root");
var widget_1 = require("../../../../../pi/widget/widget");
var logger_1 = require("../../../../utils/logger");
var rpc_1 = require("../../net/rpc");
var randomName_1 = require("../../widget/randomName/randomName");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);
// ================================================ 导出

var Login = function (_widget_1$Widget) {
    _inherits(Login, _widget_1$Widget);

    function Login() {
        _classCallCheck(this, Login);

        var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).apply(this, arguments));

        _this.props = {
            name: randomName_1.playerName(),
            passwd: '',
            success: false
        };
        return _this;
    }

    _createClass(Login, [{
        key: "back",
        value: function back(e) {
            this.ok();
        }
    }, {
        key: "inputName",
        value: function inputName(e) {
            this.props.name = e.value;
        }
    }, {
        key: "inputPasswd",
        value: function inputPasswd(e) {
            this.props.passwd = e.password;
            this.props.success = e.success;
        }
    }, {
        key: "register",
        value: function register(e) {
            var _this2 = this;

            rpc_1.register(this.props.name, this.props.passwd, function (r) {
                logger.debug(JSON.stringify(r));
                _this2.ok();
                root_1.popNew('chat-client-app-view-register-registerSuccess', { uid: r.uid });
            });
        }
    }]);

    return Login;
}(widget_1.Widget);

exports.Login = Login;
})