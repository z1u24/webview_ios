_$define("chat/client/app/widget/newPassword/newPassword", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("../../../../../pi/widget/event");
var painter_1 = require("../../../../../pi/widget/painter");
var widget_1 = require("../../../../../pi/widget/widget");

var ImgRankItem = function (_widget_1$Widget) {
    _inherits(ImgRankItem, _widget_1$Widget);

    function ImgRankItem() {
        _classCallCheck(this, ImgRankItem);

        return _possibleConstructorReturn(this, (ImgRankItem.__proto__ || Object.getPrototypeOf(ImgRankItem)).call(this));
    }

    _createClass(ImgRankItem, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(ImgRankItem.prototype.__proto__ || Object.getPrototypeOf(ImgRankItem.prototype), "setProps", this).call(this, props, oldProps);
            this.state = {
                password: '',
                rePassword: '',
                secret: 0,
                showTips: true,
                pswSuccess: false,
                repSuccess: false,
                showIconPsw: false,
                showIconRep: false,
                showPsw: false,
                showRep: false // 明文显示重复密码
            };
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
        /**
         * 密码输入状态变化
         */

    }, {
        key: "pswChange",
        value: function pswChange(event) {
            var psw = event.value;
            this.state.password = psw;
            this.state.showIconPsw = true;
            var secret = 0;
            var limit = this.props.limit ? this.props.limit : 1;
            var length = this.props.length ? this.props.length : 8;
            if (psw.length < length && psw.length > 0) {
                secret = 1;
                this.state.showTips = true;
                this.state.pswSuccess = false;
            } else {
                secret = this.strongJudge(psw);
            }
            if (limit === 1 && psw.length >= length) {
                // 符合最小长度限制
                this.state.showTips = false;
                this.state.pswSuccess = true;
                event_1.notify(event.node, 'ev-psw-change', { password: psw, success: true });
            } else if (limit === 2 && secret > 1) {
                // 符合最小长度和包含两种数据类型以上限制
                this.state.showTips = false;
                this.state.pswSuccess = true;
                event_1.notify(event.node, 'ev-psw-change', { password: psw, success: true });
            } else {
                // 不符合规则限制
                event_1.notify(event.node, 'ev-psw-change', { password: psw, success: false });
            }
            this.state.secret = secret > 3 ? 3 : secret; // 只有三种强度水平显示
            this.paint();
        }
        /**
         * 重复密码输入状态变化
         */

    }, {
        key: "repChange",
        value: function repChange(event) {
            var rep = event.value;
            this.state.rePassword = rep;
            this.state.showIconRep = true;
            if (this.state.password === rep) {
                this.state.repSuccess = this.state.pswSuccess;
            } else {
                this.state.repSuccess = false;
            }
            this.paint();
        }
        /**
         * 选中密码输入框后图标切换
         */

    }, {
        key: "pswIconChange",
        value: function pswIconChange() {
            if (this.state.password !== '') {
                this.state.showIconPsw = true;
            } else {
                this.state.showIconPsw = false;
            }
            this.paint();
        }
        /**
         * 选中重复密码输入框后图标切换
         */

    }, {
        key: "repIconChange",
        value: function repIconChange() {
            if (this.state.rePassword !== '') {
                this.state.showIconRep = true;
            } else {
                this.state.showIconRep = false;
            }
            this.paint();
        }
        /**
         * 密码明密文切换
         */

    }, {
        key: "isShowPsw",
        value: function isShowPsw() {
            this.state.showPsw = !this.state.showPsw;
            var input = painter_1.getRealNode(this.tree).getElementsByTagName('input')[0];
            input.setAttribute('type', this.state.showPsw ? 'text' : 'password');
            this.paint();
        }
        /**
         * 重复密码明密文切换
         */

    }, {
        key: "isShowRep",
        value: function isShowRep() {
            this.state.showRep = !this.state.showRep;
            var input = painter_1.getRealNode(this.tree).getElementsByTagName('input')[1];
            input.setAttribute('type', this.state.showRep ? 'text' : 'password');
            this.paint();
        }
        /**
         * 清空密码输入框
         */

    }, {
        key: "clearPsw",
        value: function clearPsw() {
            this.state.password = '';
            this.state.secret = 0;
            var input = painter_1.getRealNode(this.tree).getElementsByTagName('input')[0];
            input.value = '';
        }
        /**
         * 清空重复密码输入框
         */

    }, {
        key: "clearRep",
        value: function clearRep() {
            this.state.rePassword = '';
            var input = painter_1.getRealNode(this.tree).getElementsByTagName('input')[1];
            input.value = '';
        }
        /**
         * 判断密码强度
         * @param psw 密码
         */

    }, {
        key: "strongJudge",
        value: function strongJudge(psw) {
            var reg1 = /[0-9]+/;
            var reg2 = /[a-z]+/;
            var reg3 = /[A-Z]+/;
            var reg4 = /[!"#$%&'()*+,\-./:;<=>?@\[\]^_`{\|}~]+/; // 特殊字符集
            var num = 0;
            if (reg1.test(psw)) {
                num++;
            }
            if (reg2.test(psw)) {
                num++;
            }
            if (reg3.test(psw)) {
                num++;
            }
            if (reg4.test(psw)) {
                num++;
            }
            return num;
        }
    }]);

    return ImgRankItem;
}(widget_1.Widget);

exports.ImgRankItem = ImgRankItem;
})