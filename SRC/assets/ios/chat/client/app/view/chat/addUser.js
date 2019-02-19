_$define("chat/client/app/view/chat/addUser", function (require, exports, module){
"use strict";
/**
 * 添加好友
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
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var native_1 = require("../../logic/native");
var rpc_1 = require("../../net/rpc");
// ================================================ 导出
exports.forelet = new forelet_1.Forelet();

var AddUser = function (_widget_1$Widget) {
    _inherits(AddUser, _widget_1$Widget);

    function AddUser() {
        _classCallCheck(this, AddUser);

        var _this = _possibleConstructorReturn(this, (AddUser.__proto__ || Object.getPrototypeOf(AddUser)).call(this));

        _this.props = {
            sid: null,
            rid: null
        };
        return _this;
    }

    _createClass(AddUser, [{
        key: "create",
        value: function create() {
            _get(AddUser.prototype.__proto__ || Object.getPrototypeOf(AddUser.prototype), "create", this).call(this);
            var sid = store.getStore('uid').toString();
            this.state = store.getStore('contactMap', new user_s_1.Contact()).get(sid);
        }
    }, {
        key: "back",
        value: function back() {
            this.ok();
        }
    }, {
        key: "inputUid",
        value: function inputUid(e) {
            this.props.rid = e.value;
            this.paint();
        }
        /**
         * 添加好友
         */

    }, {
        key: "applyFriend",
        value: function applyFriend() {
            var _this2 = this;

            var sid = store.getStore('uid');
            if (!this.props.rid) {
                logic_1.bottomNotice('请输入好友ID');
                return;
            }
            if (this.props.rid === sid.toString()) {
                logic_1.bottomNotice('不能添加自己为好友');
                return;
            }
            rpc_1.applyFriend(this.props.rid, function (r) {
                if (r.r === 0) {
                    logic_1.bottomNotice("\u4F60\u4EEC\u5DF2\u7ECF\u662F\u597D\u53CB\u4E86");
                    return;
                } else if (r.r === -2) {
                    logic_1.bottomNotice("\u7528\u6237\u4E0D\u5B58\u5728");
                    return;
                }
                logic_1.bottomNotice('发送成功');
                _this2.paint();
            });
        }
    }, {
        key: "chat",
        value: function chat(uid) {
            root_1.popNew('chat-client-app-view-chat-chat', { id: uid, chatType: user_s_1.GENERATOR_TYPE.USER });
        }
    }, {
        key: "goNext",
        value: function goNext(e, i) {
            var _this3 = this;

            switch (i) {
                case 0:
                    native_1.doScanQrCode(function (res) {
                        _this3.props.rid = res;
                        console.log(res);
                        _this3.paint();
                    });
                    break;
                case 1:
                    root_1.popNew('app-view-mine-other-addFriend'); // 展示我的二维码
                    break;
                case 2:
                    logic_1.rippleShow(e);
                    this.applyFriend(); // 添加好友
                    break;
                default:
            }
        }
    }]);

    return AddUser;
}(widget_1.Widget);

exports.AddUser = AddUser;
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
})