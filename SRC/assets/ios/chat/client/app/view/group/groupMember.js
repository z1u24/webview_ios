_$define("chat/client/app/view/group/groupMember", function (require, exports, module){
"use strict";
/**
 * 群组成员
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../../../pi/ui/root");
var widget_1 = require("../../../../../pi/widget/widget");
var group_s_1 = require("../../../../server/data/db/group.s");
var group_p_1 = require("../../../../server/data/rpc/group.p");
var logger_1 = require("../../../../utils/logger");
var util_1 = require("../../../../utils/util");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var init_1 = require("../../net/init");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);

var GroupMember = function (_widget_1$Widget) {
    _inherits(GroupMember, _widget_1$Widget);

    function GroupMember() {
        _classCallCheck(this, GroupMember);

        var _this = _possibleConstructorReturn(this, (GroupMember.__proto__ || Object.getPrototypeOf(GroupMember)).call(this));

        _this.props = {
            gid: null,
            groupInfo: {},
            deleteBtn: false,
            isAdmin: false
        };
        _this.bindCB = _this.updateInfo.bind(_this);
        return _this;
    }

    _createClass(GroupMember, [{
        key: "setProps",
        value: function setProps(props) {
            _get(GroupMember.prototype.__proto__ || Object.getPrototypeOf(GroupMember.prototype), "setProps", this).call(this, props);
            this.props.groupInfo = this.getGroupInfo();
            this.props.deleteBtn = this.props.deleteBtn || false;
            var uid = store.getStore('uid');
            if (this.props.groupInfo.adminids.indexOf(uid) > -1) {
                // 当前用户是管理员
                this.props.isAdmin = true;
            }
            if (this.props.groupInfo.memberids.indexOf(uid) < 0) {
                logic_1.bottomNotice('您已被移除该群');
                this.ok();
            } else if (this.props.groupInfo.state === group_s_1.GROUP_STATE.DISSOLVE) {
                logic_1.bottomNotice('该群已被解散');
                this.ok();
            }
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.ok();
        }
    }, {
        key: "firstPaint",
        value: function firstPaint() {
            _get(GroupMember.prototype.__proto__ || Object.getPrototypeOf(GroupMember.prototype), "firstPaint", this).call(this);
            store.register("groupInfoMap/" + this.props.gid, this.bindCB);
        }
        // 获取群组信息

    }, {
        key: "getGroupInfo",
        value: function getGroupInfo() {
            var ginfo = store.getStore("groupInfoMap/" + this.props.gid);
            logger.debug('============groupmember ginfo', ginfo);
            return ginfo;
        }
        // 打开邀请成员

    }, {
        key: "inviteMember",
        value: function inviteMember() {
            root_1.popNew('chat-client-app-view-group-inviteMember', { gid: this.props.gid });
        }
        // 进入移除成员操作状态

    }, {
        key: "deleteMember",
        value: function deleteMember() {
            this.props.deleteBtn = true;
            this.paint();
        }
        // 移除成员

    }, {
        key: "removeMember",
        value: function removeMember(uid) {
            var guid = util_1.genGuid(this.props.gid, uid);
            init_1.clientRpcFunc(group_p_1.delMember, guid, function (r) {
                logger.debug('===============removeMember', r);
            });
        }
        // 群组信息变化更新

    }, {
        key: "updateInfo",
        value: function updateInfo() {
            this.setProps(this.props);
            this.paint();
        }
    }, {
        key: "destroy",
        value: function destroy() {
            store.unregister("groupInfoMap/" + this.props.gid, this.bindCB);
            return _get(GroupMember.prototype.__proto__ || Object.getPrototypeOf(GroupMember.prototype), "destroy", this).call(this);
        }
    }]);

    return GroupMember;
}(widget_1.Widget);

exports.GroupMember = GroupMember;
})