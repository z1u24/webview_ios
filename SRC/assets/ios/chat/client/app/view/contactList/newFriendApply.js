_$define("chat/client/app/view/contactList/newFriendApply", function (require, exports, module){
"use strict";
/**
 * 新朋友验证信息
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================ 导入
var root_1 = require("../../../../../pi/ui/root");
var widget_1 = require("../../../../../pi/widget/widget");
var user_s_1 = require("../../../../server/data/db/user.s");
var group_p_1 = require("../../../../server/data/rpc/group.p");
var group_s_1 = require("../../../../server/data/rpc/group.s");
var logger_1 = require("../../../../utils/logger");
var rpc_1 = require("../../../app/net/rpc");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var init_1 = require("../../net/init");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);

var NewFriendApply = function (_widget_1$Widget) {
    _inherits(NewFriendApply, _widget_1$Widget);

    function NewFriendApply() {
        _classCallCheck(this, NewFriendApply);

        var _this = _possibleConstructorReturn(this, (NewFriendApply.__proto__ || Object.getPrototypeOf(NewFriendApply)).apply(this, arguments));

        _this.props = {
            id: null,
            guid: null,
            name: '',
            applyInfo: '',
            chatType: user_s_1.GENERATOR_TYPE.USER,
            isSolve: '',
            title: '',
            activeToGGid: null
        };
        return _this;
    }

    _createClass(NewFriendApply, [{
        key: "setProps",
        value: function setProps(props) {
            _get(NewFriendApply.prototype.__proto__ || Object.getPrototypeOf(NewFriendApply.prototype), "setProps", this).call(this, props);
            logger.debug('===============new friend apply props', props);
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.ok();
        }
        // 点击拒绝添加好友/群

    }, {
        key: "rejectBtn",
        value: function rejectBtn(e) {
            var _this2 = this;

            logic_1.rippleShow(e);
            setTimeout(function () {
                _this2.props.isSolve = '已拒绝';
                _this2.paint();
            }, 500);
            if (this.props.chatType === 'user') {
                rpc_1.acceptFriend(this.props.id, false, function (r) {
                    // TODO:
                });
            } else if (!this.props.activeToGGid) {
                logger.debug('==============group reject');
                var agree = new group_s_1.GroupAgree();
                agree.agree = false;
                agree.gid = this.props.id;
                agree.uid = store.getStore("uid");
                init_1.clientRpcFunc(group_p_1.agreeJoinGroup, agree, function (gInfo) {
                    // TODO
                });
            } else {
                var _agree = new group_s_1.GroupAgree();
                _agree.gid = this.props.activeToGGid;
                _agree.uid = this.props.id;
                _agree.agree = false;
                init_1.clientRpcFunc(group_p_1.acceptUser, _agree, function (r) {
                    // TODO
                });
            }
        }
        // 点击同意添加好友/群

    }, {
        key: "agreeBtn",
        value: function agreeBtn(e) {
            var _this3 = this;

            logic_1.rippleShow(e);
            setTimeout(function () {
                _this3.props.isSolve = '已同意';
                _this3.paint();
            }, 500);
            if (this.props.chatType === 'user') {
                rpc_1.acceptFriend(this.props.id, true, function (r) {
                    // TODO
                });
            } else if (!this.props.activeToGGid) {
                logger.debug('==============group agree');
                var agree = new group_s_1.GroupAgree();
                agree.agree = true;
                agree.gid = this.props.id;
                agree.uid = store.getStore("uid");
                init_1.clientRpcFunc(group_p_1.agreeJoinGroup, agree, function (gInfo) {
                    store.setStore("groupInfoMap/" + gInfo.gid, gInfo);
                });
            } else {
                var _agree2 = new group_s_1.GroupAgree();
                _agree2.gid = this.props.activeToGGid;
                _agree2.uid = this.props.id;
                _agree2.agree = true;
                logger.debug('==========active GroupApplyInfo agree', _agree2);
                init_1.clientRpcFunc(group_p_1.acceptUser, _agree2, function (r) {
                    // TODO
                });
            }
        }
        // 点击查看用户或群组详情

    }, {
        key: "goDetail",
        value: function goDetail() {
            if (this.props.chatType === user_s_1.GENERATOR_TYPE.USER) {
                root_1.popNew('chat-client-app-view-info-userDetail', { uid: this.props.id, inFlag: 3 }); // 陌生人，仅查看基础信息
            } else if (this.props.activeToGGid) {
                root_1.popNew('chat-client-app-view-info-userDetail', { uid: this.props.id });
            } else {
                root_1.popNew('chat-client-app-view-group-groupInfo', { gid: this.props.id, inFlag: 2 }); // 未加入的群组
            }
        }
    }]);

    return NewFriendApply;
}(widget_1.Widget);

exports.NewFriendApply = NewFriendApply;
})