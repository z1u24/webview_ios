_$define("chat/client/app/view/contactList/contactItem", function (require, exports, module){
"use strict";
/**
 * contactItem 组件相关处理
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = require("../../../../../pi/widget/widget");
var group_s_1 = require("../../../../server/data/db/group.s");
var user_s_1 = require("../../../../server/data/db/user.s");
var util_1 = require("../../../../utils/util");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
// ================================================ 导出

var ContactItem = function (_widget_1$Widget) {
    _inherits(ContactItem, _widget_1$Widget);

    function ContactItem() {
        _classCallCheck(this, ContactItem);

        var _this = _possibleConstructorReturn(this, (ContactItem.__proto__ || Object.getPrototypeOf(ContactItem)).apply(this, arguments));

        _this.props = {
            id: null,
            name: '',
            chatType: user_s_1.GENERATOR_TYPE.USER,
            text: '',
            totalNew: null
        };
        return _this;
    }

    _createClass(ContactItem, [{
        key: "setProps",
        value: function setProps(props) {
            _get(ContactItem.prototype.__proto__ || Object.getPrototypeOf(ContactItem.prototype), "setProps", this).call(this, props);
            this.props.show = true;
            if (!this.props.text) {
                if (this.props.chatType === user_s_1.GENERATOR_TYPE.USER) {
                    if (this.props.id !== store.getStore('uid')) {
                        this.props.name = logic_1.getFriendAlias(this.props.id);
                    } else {
                        this.props.name = util_1.depCopy(store.getStore("userInfoMap/" + this.props.id, new user_s_1.UserInfo()).name);
                        this.props.name += '(本人)';
                    }
                    this.props.img = logic_1.getUserAvatar(this.props.id) || '../../res/images/user.png';
                } else {
                    var group = store.getStore("groupInfoMap/" + this.props.id, new group_s_1.GroupInfo());
                    this.props.name = group.name;
                    this.props.show = group.state === group_s_1.GROUP_STATE.CREATED;
                    this.props.img = logic_1.getGroupAvatar(this.props.id) || '../../res/images/groups.png';
                }
            }
        }
    }]);

    return ContactItem;
}(widget_1.Widget);

exports.ContactItem = ContactItem;
})