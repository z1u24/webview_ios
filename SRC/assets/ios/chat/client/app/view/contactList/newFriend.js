_$define("chat/client/app/view/contactList/newFriend", function (require, exports, module){
"use strict";
/**
 * 新朋友验证状态
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================ 导入
var forelet_1 = require("../../../../../pi/widget/forelet");
var widget_1 = require("../../../../../pi/widget/widget");
var user_s_1 = require("../../../../server/data/db/user.s");
var group_p_1 = require("../../../../server/data/rpc/group.p");
var group_s_1 = require("../../../../server/data/rpc/group.s");
var logger_1 = require("../../../../utils/logger");
var rpc_1 = require("../../../app/net/rpc");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var init_1 = require("../../net/init");
exports.forelet = new forelet_1.Forelet();
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);

var NewFriend = function (_widget_1$Widget) {
    _inherits(NewFriend, _widget_1$Widget);

    function NewFriend() {
        _classCallCheck(this, NewFriend);

        return _possibleConstructorReturn(this, (NewFriend.__proto__ || Object.getPrototypeOf(NewFriend)).apply(this, arguments));
    }

    _createClass(NewFriend, [{
        key: "create",
        value: function create() {
            _get(NewFriend.prototype.__proto__ || Object.getPrototypeOf(NewFriend.prototype), "create", this).call(this);
            var sid = store.getStore('uid').toString();
            this.state = store.getStore('contactMap', new user_s_1.Contact()).get(sid);
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.ok();
        }
        // 同意好友申请

    }, {
        key: "agreeClick",
        value: function agreeClick(e) {
            var v = parseInt(e.value, 10);
            rpc_1.acceptFriend(v, true, function (r) {
                if (r.r !== 1) {
                    logic_1.bottomNotice('添加好友失败');
                }
            });
        }
        // 同意入群邀请（被动）

    }, {
        key: "agreeGroupApply",
        value: function agreeGroupApply(e) {
            var gid = parseInt(e.value, 10);
            logger.debug('agreeGroupApply', gid);
            var agree = new group_s_1.GroupAgree();
            agree.agree = true;
            agree.gid = gid;
            agree.uid = store.getStore("uid");
            init_1.clientRpcFunc(group_p_1.agreeJoinGroup, agree, function (gInfo) {
                if (gInfo.gid < 0) {
                    return;
                }
                store.setStore("groupInfoMap/" + gInfo.gid, gInfo);
            });
        }
    }]);

    return NewFriend;
}(widget_1.Widget);

exports.NewFriend = NewFriend;
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
})