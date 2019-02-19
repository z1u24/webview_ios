_$define("chat/client/app/view/chat/messageRecord", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 最新会话列表项
 */
// ================================================ 导入
var widget_1 = require("../../../../../pi/widget/widget");
var group_s_1 = require("../../../../server/data/db/group.s");
var message_s_1 = require("../../../../server/data/db/message.s");
var user_s_1 = require("../../../../server/data/db/user.s");
var util_1 = require("../../../../utils/util");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
// ================================================ 导出

var MessageRecord = function (_widget_1$Widget) {
    _inherits(MessageRecord, _widget_1$Widget);

    function MessageRecord() {
        _classCallCheck(this, MessageRecord);

        var _this = _possibleConstructorReturn(this, (MessageRecord.__proto__ || Object.getPrototypeOf(MessageRecord)).call(this));

        _this.bindCB = _this.updateMessage.bind(_this);
        return _this;
    }

    _createClass(MessageRecord, [{
        key: "setProps",
        value: function setProps(props) {
            var _this2 = this;

            _get(MessageRecord.prototype.__proto__ || Object.getPrototypeOf(MessageRecord.prototype), "setProps", this).call(this, props);
            var sid = store.getStore("uid");
            var hid = void 0;
            var hincId = void 0; // 最新一条消息的ID
            if (props.chatType === user_s_1.GENERATOR_TYPE.USER) {
                // 单聊
                this.props.name = logic_1.getFriendAlias(this.props.rid);
                this.props.avatar = logic_1.getUserAvatar(this.props.rid) || '../../res/images/user.png';
                hid = util_1.genUserHid(sid, this.props.rid);
                var hIncIdArr = store.getStore("userChatMap/" + hid, []);
                hincId = hIncIdArr.length > 0 ? hIncIdArr[hIncIdArr.length - 1] : undefined;
                this.props.lastMessage = hincId ? store.getStore("userHistoryMap/" + hincId, '') : new message_s_1.UserMsg();
            } else {
                // 群聊
                var groupInfo = store.getStore("groupInfoMap/" + this.props.rid, new group_s_1.GroupInfo());
                this.props.name = groupInfo.name;
                this.props.avatar = logic_1.getGroupAvatar(this.props.rid) || '../../res/images/groups.png';
                hid = util_1.genGroupHid(this.props.rid);
                var _hIncIdArr = store.getStore("groupChatMap/" + hid, []);
                hincId = _hIncIdArr.length > 0 ? _hIncIdArr[_hIncIdArr.length - 1] : undefined;
                this.props.lastMessage = hincId ? store.getStore("groupHistoryMap/" + hincId, '') : new message_s_1.GroupMsg();
            }
            // 计算有多少条新消息记录
            var lastHincId = store.getStore("lastRead/" + hid, { msgId: undefined }).msgId; // 最后阅读的一条消息ID
            var count1 = hincId ? util_1.getIndexFromHIncId(hincId) : -1; // 收到的最新消息ID
            var count2 = lastHincId ? util_1.getIndexFromHIncId(lastHincId) : -1; // 已读的最后一条消息ID
            this.props.unReadCount = count1 > count2 && count1 - count2;
            // 消息额外设置，免打扰|置顶
            var setting = store.getStore('setting', { msgTop: [], msgAvoid: [] });
            this.props.msgTop = setting.msgTop.findIndex(function (item) {
                return item === hid;
            }) > -1;
            this.props.msgAvoid = setting.msgAvoid.findIndex(function (item) {
                return item === hid;
            }) > -1;
            // 最新一条消息内容处理，空结构体等于true
            if (this.props.lastMessage.time) {
                var time = util_1.depCopy(this.props.lastMessage.time);
                this.props.time = logic_1.timestampFormat(time, 1);
                this.props.msg = util_1.depCopy(this.props.lastMessage.msg);
                if (this.props.lastMessage.mtype === message_s_1.MSG_TYPE.IMG) {
                    this.props.msg = '[图片]';
                } else if (this.props.lastMessage.mtype === message_s_1.MSG_TYPE.RECALL) {
                    this.props.msg = '[消息撤回]';
                } else if (this.props.lastMessage.mtype === message_s_1.MSG_TYPE.NOTICE) {
                    this.props.msg = '[新公告]';
                } else if (this.props.lastMessage.mtype === message_s_1.MSG_TYPE.RENOTICE) {
                    this.props.msg = '[公告撤回]';
                } else if (this.props.lastMessage.mtype === message_s_1.MSG_TYPE.REDENVELOPE) {
                    this.props.msg = '[快抢红包]';
                } else if (this.props.lastMessage.mtype === message_s_1.MSG_TYPE.VOICE) {
                    this.props.msg = '[语音]';
                }
            } else {
                var mess = store.getStore('lastChat', []);
                var index = mess.findIndex(function (item) {
                    return item[0] === _this2.props.rid && item[2] === _this2.props.chatType;
                });
                this.props.time = index > -1 && logic_1.timestampFormat(mess[index][1], 1);
                this.props.msg = '';
            }
        }
    }, {
        key: "firstPaint",
        value: function firstPaint() {
            _get(MessageRecord.prototype.__proto__ || Object.getPrototypeOf(MessageRecord.prototype), "firstPaint", this).call(this);
            if (this.props.chatType === user_s_1.GENERATOR_TYPE.USER) {
                var hid = util_1.genUserHid(store.getStore('uid'), this.props.rid);
                store.register("userChatMap/" + hid, this.bindCB);
                store.register("lastRead/" + hid, this.bindCB);
            } else {
                var _hid = util_1.genGroupHid(this.props.rid);
                store.register("groupChatMap/" + _hid, this.bindCB);
                store.register("lastRead/" + _hid, this.bindCB);
            }
            store.register('setting', this.bindCB);
        }
    }, {
        key: "updateMessage",
        value: function updateMessage() {
            this.setProps(this.props);
            this.paint();
        }
    }, {
        key: "destroy",
        value: function destroy() {
            store.unregister("userChatMap/" + util_1.genUserHid(store.getStore('uid'), this.props.rid), this.bindCB);
            store.unregister("groupChatMap/" + util_1.genGroupHid(this.props.rid), this.bindCB);
            store.unregister("lastRead/" + util_1.genUserHid(store.getStore('uid'), this.props.rid), this.bindCB);
            store.unregister("lastRead/" + util_1.genGroupHid(this.props.rid), this.bindCB);
            return _get(MessageRecord.prototype.__proto__ || Object.getPrototypeOf(MessageRecord.prototype), "destroy", this).call(this);
        }
    }]);

    return MessageRecord;
}(widget_1.Widget);

exports.MessageRecord = MessageRecord;
})