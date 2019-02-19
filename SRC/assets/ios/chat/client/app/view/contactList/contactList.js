_$define("chat/client/app/view/contactList/contactList", function (require, exports, module){
"use strict";
/**
 * 通讯录
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================ 导入
var root_1 = require("../../../../../pi/ui/root");
var forelet_1 = require("../../../../../pi/widget/forelet");
var widget_1 = require("../../../../../pi/widget/widget");
var user_s_1 = require("../../../../server/data/db/user.s");
var logger_1 = require("../../../../utils/logger");
var store = require("../../data/store");
exports.forelet = new forelet_1.Forelet();
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);

var ContactList = function (_widget_1$Widget) {
    _inherits(ContactList, _widget_1$Widget);

    function ContactList() {
        _classCallCheck(this, ContactList);

        var _this = _possibleConstructorReturn(this, (ContactList.__proto__ || Object.getPrototypeOf(ContactList)).apply(this, arguments));

        _this.props = {
            sid: store.getStore('uid')
        };
        return _this;
    }

    _createClass(ContactList, [{
        key: "create",
        value: function create() {
            _get(ContactList.prototype.__proto__ || Object.getPrototypeOf(ContactList.prototype), "create", this).call(this);
            var sid = store.getStore('uid').toString();
            this.state = store.getStore('contactMap', new user_s_1.Contact()).get(sid);
        }
        // 返回上一页

    }, {
        key: "goBack",
        value: function goBack() {
            this.ok();
        }
    }, {
        key: "goNext",
        value: function goNext(i, uid) {
            switch (i) {
                case 0:
                    root_1.popNew('chat-client-app-view-contactList-newFriend'); // 新好友验证
                    break;
                case 1:
                    root_1.popNew("chat-client-app-view-group-groupList"); // 群聊列表
                    break;
                case 2:
                    root_1.popNew('chat-client-app-view-info-user'); // 本人信息
                    break;
                case 3:
                    root_1.popNew('chat-client-app-view-info-userDetail', { uid: uid }); // 好友详情
                    break;
                default:
            }
        }
    }]);

    return ContactList;
}(widget_1.Widget);

exports.ContactList = ContactList;
// ================================================ 本地
store.register('contactMap', function (r) {
    // 这是一个特别的map，map里一定只有一个元素,只是为了和后端保持统一，才定义为map
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

        exports.forelet.paint(value);
    }
});
store.register('friendLinkMap', function () {
    var w = exports.forelet.getWidget(WIDGET_NAME);
    if (w) {
        w.paint(true);
    }
});
})