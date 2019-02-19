_$define("chat/client/app/view/chat/contact", function (require, exports, module){
"use strict";
/**
 * 最近会话列表
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================ 导入
var config_1 = require("../../../../../app/config");
var walletStore = require("../../../../../app/store/memstore");
var root_1 = require("../../../../../pi/ui/root");
var forelet_1 = require("../../../../../pi/widget/forelet");
var widget_1 = require("../../../../../pi/widget/widget");
var user_s_1 = require("../../../../server/data/db/user.s");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var native_1 = require("../../logic/native");
var init_1_1 = require("../../net/init_1");
exports.forelet = new forelet_1.Forelet();
var WIDGET_NAME = module.id.replace(/\//g, '-');

var Contact = function (_widget_1$Widget) {
    _inherits(Contact, _widget_1$Widget);

    function Contact() {
        _classCallCheck(this, Contact);

        return _possibleConstructorReturn(this, (Contact.__proto__ || Object.getPrototypeOf(Contact)).apply(this, arguments));
    }

    _createClass(Contact, [{
        key: "setProps",
        value: function setProps(props) {
            _get(Contact.prototype.__proto__ || Object.getPrototypeOf(Contact.prototype), "setProps", this).call(this, props);
            this.props.messageList = [];
            this.props.isUtilVisible = false;
            this.props.utilList = [{ iconPath: 'adress-book.png', utilText: '通讯录' }, { iconPath: 'add-blue.png', utilText: '添加好友' }, { iconPath: 'group-chat.png', utilText: '创建群聊' }, { iconPath: 'scan.png', utilText: '扫一扫' }, { iconPath: 'add-friend.png', utilText: '我的信息' }];
            // 判断是否从钱包项目进入
            // if (navigator.userAgent.indexOf('YINENG_ANDROID') > -1 || navigator.userAgent.indexOf('YINENG_IOS') > -1) {  
            this.props.hasWallet = !!walletStore.getStore('wallet');
            this.props.isLogin = walletStore.getStore('user/isLogin', false); // 钱包是否登陆
            var wUser = walletStore.getStore('user/info', { nickName: '' }); // 钱包
            var uid = store.getStore('uid', 0);
            var cUser = store.getStore("userInfoMap/" + uid, new user_s_1.UserInfo()); // 聊天
            this.props.avatar = logic_1.getUserAvatar(uid);
            // 钱包修改了姓名、头像等，或钱包退出登陆
            if (wUser.nickName !== cUser.name || wUser.avatar !== cUser.avatar) {
                if (this.props.isLogin && uid) {
                    // 钱包、聊天已登陆
                    init_1_1.setUserInfo();
                    this.props.avatar = "" + config_1.uploadFileUrlPrefix + wUser.avatar;
                    this.paint();
                } else {
                    store.initStore();
                    this.state = []; // 清空记录 lastChat
                    // closeConnection();
                    this.paint(true);
                }
            }
            // }
        }
    }, {
        key: "firstPaint",
        value: function firstPaint() {
            var _this2 = this;

            _get(Contact.prototype.__proto__ || Object.getPrototypeOf(Contact.prototype), "firstPaint", this).call(this);
            walletStore.register('user/info', function () {
                _this2.setProps(_this2.props);
            });
            walletStore.register('user/isLogin', function () {
                _this2.setProps(_this2.props);
            });
        }
    }, {
        key: "chat",
        value: function chat(e, id, chatType) {
            logic_1.rippleShow(e);
            this.closeMore();
            root_1.popNew('chat-client-app-view-chat-chat', { id: id, chatType: chatType });
        }
        // 打开更多功能

    }, {
        key: "getMore",
        value: function getMore() {
            if (this.props.isLogin) {
                this.props.isUtilVisible = !this.props.isUtilVisible;
                this.paint();
            } else {
                logic_1.bottomNotice('请先登陆钱包');
            }
        }
    }, {
        key: "closeMore",
        value: function closeMore() {
            this.props.isUtilVisible = false;
            this.paint();
        }
    }, {
        key: "handleFatherTap",
        value: function handleFatherTap(e) {
            var _this3 = this;

            switch (e.index) {
                case 0:
                    // 点击通讯录
                    root_1.popNew('chat-client-app-view-contactList-contactList');
                    break;
                case 1:
                    // 点击添加好友
                    root_1.popNew('chat-client-app-view-chat-addUser');
                    break;
                case 2:
                    // 创建群聊 setGroupChat
                    root_1.popNew('chat-client-app-view-group-setGroupChat');
                    break;
                case 3:
                    // 扫一扫   
                    native_1.doScanQrCode(function (res) {
                        root_1.popNew('chat-client-app-view-chat-addUser', { rid: res });
                        console.log(res);
                        _this3.paint();
                    });
                    break;
                case 4:
                    root_1.popNew('chat-client-app-view-info-user');
                    break;
                default:
            }
            this.closeMore();
            this.paint();
        }
    }]);

    return Contact;
}(widget_1.Widget);

exports.Contact = Contact;
var STATE = {
    lastChat: [],
    contactMap: ''
};
store.register("lastChat", function (r) {
    STATE.lastChat = r;
    exports.forelet.paint(STATE);
});
store.register('contactMap', function (r) {
    for (var _iterator = r.values(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var value = _ref;

        STATE.contactMap = value;
        exports.forelet.paint(STATE);
    }
});
store.register('friendLinkMap', function () {
    var w = exports.forelet.getWidget(WIDGET_NAME);
    if (w) {
        w.paint(true);
    }
});
})