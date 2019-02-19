_$define("chat/client/app/widget/selectUser/selectUser", function (require, exports, module){
"use strict";
/**
 * selectUser 组件相关处理
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================ 导入
var event_1 = require("../../../../../pi/widget/event");
var widget_1 = require("../../../../../pi/widget/widget");
var user_s_1 = require("../../../../server/data/db/user.s");
var store = require("../../data/store");
// ================================================ 导出

var SelectUser = function (_widget_1$Widget) {
    _inherits(SelectUser, _widget_1$Widget);

    function SelectUser() {
        _classCallCheck(this, SelectUser);

        var _this = _possibleConstructorReturn(this, (SelectUser.__proto__ || Object.getPrototypeOf(SelectUser)).apply(this, arguments));

        _this.props = {
            id: null,
            name: '',
            chatType: user_s_1.GENERATOR_TYPE.USER,
            isSelect: false
        };
        return _this;
    }

    _createClass(SelectUser, [{
        key: "setProps",
        value: function setProps(props) {
            _get(SelectUser.prototype.__proto__ || Object.getPrototypeOf(SelectUser.prototype), "setProps", this).call(this, props);
            this.props.id = props.id;
            this.props.chatType = props.chatType;
            if (this.props.chatType === user_s_1.GENERATOR_TYPE.USER) {
                // 好友别名
                var userInfo = store.getStore("userInfoMap/" + this.props.id, new user_s_1.UserInfo());
                this.props.name = userInfo ? userInfo.name : '';
            }
            if (this.props.chatType === user_s_1.GENERATOR_TYPE.GROUP) {
                // 群名片
                var _userInfo = store.getStore("userInfoMap/" + this.props.id, new user_s_1.UserInfo());
                this.props.name = _userInfo ? _userInfo.name : '';
            }
        }
        // 点击改变选中状态

    }, {
        key: "changeSelect",
        value: function changeSelect(event) {
            this.props.isSelect = !this.props.isSelect;
            event_1.notify(event.node, 'ev-addMember', { value: this.props.id });
            this.paint();
        }
    }]);

    return SelectUser;
}(widget_1.Widget);

exports.SelectUser = SelectUser;
})