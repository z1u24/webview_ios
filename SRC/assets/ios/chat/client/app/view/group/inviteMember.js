_$define("chat/client/app/view/group/inviteMember", function (require, exports, module){
"use strict";
/**
 * 邀请成员
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var forelet_1 = require("../../../../../pi/widget/forelet");
var widget_1 = require("../../../../../pi/widget/widget");
var user_s_1 = require("../../../../server/data/db/user.s");
var group_p_1 = require("../../../../server/data/rpc/group.p");
var group_s_1 = require("../../../../server/data/rpc/group.s");
var logger_1 = require("../../../../utils/logger");
var util_1 = require("../../../../utils/util");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var init_1 = require("../../net/init");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);
exports.forelet = new forelet_1.Forelet();

var InviteMember = function (_widget_1$Widget) {
    _inherits(InviteMember, _widget_1$Widget);

    function InviteMember() {
        _classCallCheck(this, InviteMember);

        var _this = _possibleConstructorReturn(this, (InviteMember.__proto__ || Object.getPrototypeOf(InviteMember)).apply(this, arguments));

        _this.props = {
            gid: null,
            ginfo: {},
            applyGroupMembers: []
        };
        return _this;
    }

    _createClass(InviteMember, [{
        key: "setProps",
        value: function setProps(props) {
            _get(InviteMember.prototype.__proto__ || Object.getPrototypeOf(InviteMember.prototype), "setProps", this).call(this, props);
            this.props.gid = props.gid;
            this.props.ginfo = this.getGroupInfo(this.props.gid);
            this.props.applyGroupMembers = [];
            var sid = store.getStore('uid').toString();
            this.state = store.getStore('contactMap', new user_s_1.Contact()).get(sid);
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.ok();
        }
    }, {
        key: "getGroupInfo",
        value: function getGroupInfo(gid) {
            var ginfo = store.getStore("groupInfoMap/" + gid);
            logger.debug('============ginfo', ginfo);
            return ginfo;
        }
        // 添加群成员

    }, {
        key: "addGroupMember",
        value: function addGroupMember(e) {
            var uid = e.value;
            logger.debug('====邀请成员', uid);
            if (this.props.applyGroupMembers.findIndex(function (item) {
                return item === uid;
            }) === -1) {
                this.props.applyGroupMembers.push(uid);
            } else {
                this.props.applyGroupMembers = util_1.delValueFromArray(uid, this.props.applyGroupMembers);
            }
            logger.debug("applyGroupMembers is : " + JSON.stringify(this.props.applyGroupMembers));
        }
        // 点击添加

    }, {
        key: "completeAddGroupMember",
        value: function completeAddGroupMember() {
            var _this2 = this;

            if (this.props.applyGroupMembers.length <= 0) {
                logic_1.bottomNotice('请至少选择一位邀请好友');
                return;
            }
            var invites = new group_s_1.InviteArray();
            invites.arr = [];
            this.props.applyGroupMembers.forEach(function (id) {
                var invite = new group_s_1.Invite();
                invite.gid = _this2.props.gid;
                invite.rid = id;
                invites.arr.push(invite);
            });
            init_1.clientRpcFunc(group_p_1.inviteUsers, invites, function (r) {
                if (r.r !== 1) {
                    logic_1.bottomNotice("\u9080\u8BF7\u597D\u53CB\u5165\u7FA4\u5931\u8D25");
                }
                logic_1.bottomNotice('成功发送邀请好友信息');
                _this2.ok();
            });
        }
    }]);

    return InviteMember;
}(widget_1.Widget);

exports.InviteMember = InviteMember;
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