_$define("chat/client/app/view/info/user", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 我的个人信息
 */
// ================================================ 导入
var root_1 = require("../../../../../pi/ui/root");
var widget_1 = require("../../../../../pi/widget/widget");
var user_s_1 = require("../../../../server/data/db/user.s");
var user_p_1 = require("../../../../server/data/rpc/user.p");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var init_1 = require("../../net/init");

var User = function (_widget_1$Widget) {
    _inherits(User, _widget_1$Widget);

    function User() {
        _classCallCheck(this, User);

        var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this));

        _this.props = {
            sid: 0,
            info: new user_s_1.UserInfo(),
            tel: '',
            name: '',
            phoneEdit: false,
            avatar: ''
        };
        return _this;
    }

    _createClass(User, [{
        key: "create",
        value: function create() {
            _get(User.prototype.__proto__ || Object.getPrototypeOf(User.prototype), "create", this).call(this);
            this.props.sid = store.getStore('uid');
            this.props.info = store.getStore("userInfoMap/" + this.props.sid, new user_s_1.UserInfo());
            this.props.tel = this.props.info.tel || '未知';
            this.props.name = this.props.info.name;
            this.props.avatar = logic_1.getUserAvatar(this.props.sid) || '../../res/images/img_avatar1.png';
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.ok();
        }
        /**
         * 页面点击
         */

    }, {
        key: "pageClick",
        value: function pageClick() {
            var userinfo = store.getStore("userInfoMap/" + this.props.sid, new user_s_1.UserInfo());
            this.props.name = this.props.name || userinfo.name;
            this.props.tel = this.props.tel || '未知';
            this.props.phoneEdit = false;
            this.paint();
        }
        // /**
        //  * 点击后可编辑昵称
        //  */
        // public editName() {
        //     this.props.nameEdit = true;
        //     this.paint();
        // }
        /**
         * 昵称更改
         */

    }, {
        key: "nameChange",
        value: function nameChange() {
            var _this2 = this;

            root_1.popNew('chat-client-app-widget-pageEdit-pageEdit', { title: '修改昵称', contentInput: this.props.name }, function (res) {
                var userinfo = store.getStore("userInfoMap/" + _this2.props.sid, new user_s_1.UserInfo());
                var test = new user_s_1.UserInfo();
                test.uid = _this2.props.sid;
                test.name = res.content;
                test.tel = userinfo.tel;
                test.avatar = userinfo.avatar;
                test.sex = userinfo.sex;
                test.note = userinfo.note;
                init_1.clientRpcFunc(user_p_1.changeUserInfo, test, function (r) {
                    // todo
                    if (r.uid !== -1) {
                        store.setStore("userInfoMap/" + _this2.props.sid, test);
                        logic_1.bottomNotice('修改个人信息成功');
                    }
                });
            });
        }
        /**
         * 点击后可编辑电话号码
         */

    }, {
        key: "editPhone",
        value: function editPhone() {
            this.props.phoneEdit = true;
            this.paint();
        }
        /**
         * 电话更改
         */

    }, {
        key: "phoneChange",
        value: function phoneChange(e) {
            this.props.tel = e.value;
            this.paint();
        }
        /**
         * 修改个人信息
         */

    }, {
        key: "changeUserInfo",
        value: function changeUserInfo() {
            var _this3 = this;

            var userinfo = store.getStore("userInfoMap/" + this.props.sid, new user_s_1.UserInfo());
            var test = new user_s_1.UserInfo();
            test.uid = this.props.sid;
            test.name = this.props.name;
            test.tel = this.props.tel;
            test.avatar = userinfo.avatar;
            test.sex = userinfo.sex;
            test.note = userinfo.note;
            init_1.clientRpcFunc(user_p_1.changeUserInfo, test, function (r) {
                // todo
                if (r.uid !== -1) {
                    store.setStore("userInfoMap/" + _this3.props.sid, test);
                    logic_1.bottomNotice('修改个人信息成功');
                }
            });
        }
        /**
         * 点击复制
         */

    }, {
        key: "doCopy",
        value: function doCopy(i) {
            if (i === 0) {
                logic_1.copyToClipboard(this.props.sid);
            } else if (i === 1) {
                logic_1.copyToClipboard(this.props.info.wallet_addr);
            } else {
                logic_1.copyToClipboard(this.props.info.tel);
            }
            logic_1.bottomNotice('复制成功');
        }
    }]);

    return User;
}(widget_1.Widget);

exports.User = User;
})