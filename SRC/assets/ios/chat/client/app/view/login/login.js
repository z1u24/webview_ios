_$define("chat/client/app/view/login/login", function (require, exports, module){
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
var painter_1 = require("../../../../../pi/widget/painter");
var widget_1 = require("../../../../../pi/widget/widget");
var message_s_1 = require("../../../../server/data/rpc/message.s");
var logger_1 = require("../../../../utils/logger");
var initStore_1 = require("../../data/initStore");
var store = require("../../data/store");
var init_1 = require("../../net/init");
var rpc_1 = require("../../net/rpc");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);
// ================================================ 导出

var Login = function (_widget_1$Widget) {
    _inherits(Login, _widget_1$Widget);

    function Login() {
        _classCallCheck(this, Login);

        var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this));

        _this.props = {
            uid: null,
            passwd: '',
            visible: false,
            isClear: false // 密码是否可清除
        };
        return _this;
    }

    _createClass(Login, [{
        key: "inputName",
        value: function inputName(e) {
            this.props.uid = parseInt(e.value, 10);
        }
    }, {
        key: "inputPasswd",
        value: function inputPasswd(e) {
            this.props.passwd = e.value;
            if (e.value) {
                this.props.isClear = true;
            } else {
                this.props.isClear = false;
            }
            this.paint();
        }
    }, {
        key: "openRegister",
        value: function openRegister() {
            root_1.popNew('chat-client-app-view-register-register');
        }
    }, {
        key: "login",
        value: function login(e) {
            var _this2 = this;

            // 让所有输入框的失去焦点
            var inputs = painter_1.getRealNode(this.tree).getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].blur();
            }
            rpc_1.login(this.props.uid, this.props.passwd, function (r) {
                if (r.uid > 0) {
                    store.setStore("uid", r.uid);
                    store.setStore("userInfoMap/" + r.uid, r);
                    init_1.init(r.uid);
                    root_1.popNew('chat-client-app-view-chat-contact', { sid: _this2.props.uid });
                    init_1.subscribe(_this2.props.uid.toString(), message_s_1.SendMsg, function (v) {
                        if (v.code === 1) {
                            initStore_1.getFriendHistory(v.rid);
                        }
                        // updateUserMessage(v.msg.sid, v);
                    });
                }
            });
        }
        /**
         * 切换密码是否可见
         */

    }, {
        key: "changeEye",
        value: function changeEye() {
            this.props.visible = !this.props.visible;
            this.paint();
        }
    }]);

    return Login;
}(widget_1.Widget);

exports.Login = Login;
// ================================================ 本地
})