_$define("chat/client/app/view/chat/chat", function (require, exports, module){
"use strict";
/**
 * 单聊
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
var painter_1 = require("../../../../../pi/widget/painter");
var widget_1 = require("../../../../../pi/widget/widget");
var constant_1 = require("../../../../server/data/constant");
var group_s_1 = require("../../../../server/data/db/group.s");
var message_s_1 = require("../../../../server/data/db/message.s");
var user_s_1 = require("../../../../server/data/db/user.s");
var message_p_1 = require("../../../../server/data/rpc/message.p");
var message_s_2 = require("../../../../server/data/rpc/message.s");
var logger_1 = require("../../../../utils/logger");
var util_1 = require("../../../../utils/util");
var parse_1 = require("../../data/parse");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var native_1 = require("../../logic/native");
var init_1 = require("../../net/init");
var messageItem_1 = require("../../widget/messageItem/messageItem");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);
exports.forelet = new forelet_1.Forelet();

var Chat = function (_widget_1$Widget) {
    _inherits(Chat, _widget_1$Widget);

    function Chat() {
        _classCallCheck(this, Chat);

        var _this = _possibleConstructorReturn(this, (Chat.__proto__ || Object.getPrototypeOf(Chat)).call(this));

        _this.bindCB = _this.updateChat.bind(_this);
        return _this;
    }

    _createClass(Chat, [{
        key: "setProps",
        value: function setProps(props) {
            _get(Chat.prototype.__proto__ || Object.getPrototypeOf(Chat.prototype), "setProps", this).call(this, props);
            this.props.sid = store.getStore('uid');
            this.props.inputMessage = '';
            this.props.newMsg = undefined;
            this.props.onRadio = null;
            if (this.props.chatType === user_s_1.GENERATOR_TYPE.GROUP) {
                this.props.hid = store.getStore("groupInfoMap/" + this.props.id, { hid: '' }).hid;
                this.initGroup();
            } else {
                this.props.hid = store.getStore("friendLinkMap/" + util_1.genUuid(this.props.sid, this.props.id), { hid: '' }).hid;
                this.initUser();
            }
            this.latestMsg();
        }
        /**
         * 好友聊天初始化
         */

    }, {
        key: "initUser",
        value: function initUser() {
            this.props.name = logic_1.getFriendAlias(this.props.id);
            var hIncIdArr = store.getStore("userChatMap/" + this.props.hid, []);
            this.props.hidIncArray = hIncIdArr;
            // 更新上次阅读到哪一条记录
            var hincId = hIncIdArr.length > 0 ? hIncIdArr[hIncIdArr.length - 1] : undefined;
            var lastRead = store.getStore("lastRead/" + this.props.hid, { msgId: undefined, msgType: user_s_1.GENERATOR_TYPE.USER });
            lastRead.msgId = hincId;
            store.setStore("lastRead/" + this.props.hid, lastRead);
        }
        /**
         * 群组聊天初始化
         */

    }, {
        key: "initGroup",
        value: function initGroup() {
            this.props.hidIncArray = store.getStore("groupChatMap/" + this.props.hid, []);
            var gInfo = store.getStore("groupInfoMap/" + this.props.id, new group_s_1.GroupInfo());
            var lastRead = store.getStore("lastRead/" + this.props.hid, { msgId: undefined, msgType: user_s_1.GENERATOR_TYPE.GROUP });
            this.props.name = gInfo.name + "(" + gInfo.memberids.length + ")";
            var annouces = gInfo.annoceids;
            var lastAnnounce = annouces && annouces.length > 0 ? annouces[annouces.length - 1] : undefined;
            // 最新一条公告是否已读
            var count1 = lastAnnounce ? util_1.getIndexFromHIncId(lastAnnounce) : -1;
            var count2 = lastRead.msgId ? util_1.getIndexFromHIncId(lastRead.msgId) : -1;
            this.props.lastAnnounce = count1 > count2 ? lastAnnounce : undefined;
            // 更新上次阅读到哪一条记录        
            var hincId = this.props.hidIncArray.length > 0 ? this.props.hidIncArray[this.props.hidIncArray.length - 1] : undefined;
            lastRead.msgId = hincId;
            store.setStore("lastRead/" + this.props.hid, lastRead);
            // 是否已被踢出群或群已经解散
            if (gInfo.state === group_s_1.GROUP_STATE.DISSOLVE) {
                logic_1.bottomNotice('该群已被解散');
                this.ok();
            } else if (gInfo.memberids.indexOf(this.props.sid) < 0) {
                logic_1.bottomNotice('您已离开该群');
                this.ok();
            }
        }
    }, {
        key: "firstPaint",
        value: function firstPaint() {
            var _this2 = this;

            _get(Chat.prototype.__proto__ || Object.getPrototypeOf(Chat.prototype), "firstPaint", this).call(this);
            setTimeout(function () {
                _this2.getScrollElem().classList.add('scrollSmooth'); // 进入页面时需要快速定位，之后需要平滑滚动
                painter_1.getRealNode(_this2.tree).style.visibility = 'visible'; // 滚动完成后才显示页面 
            }, 500);
            if (this.props.chatType === user_s_1.GENERATOR_TYPE.GROUP) {
                store.register("groupChatMap/" + this.props.hid, this.bindCB);
                store.register("groupInfoMap/" + this.props.id, this.bindCB);
            } else {
                store.register("userChatMap/" + this.props.hid, this.bindCB);
            }
        }
        /**
         * 更新聊天记录
         */

    }, {
        key: "updateChat",
        value: function updateChat() {
            this.setProps(this.props);
            this.paint();
        }
        /**
         * 发送图片消息之前,预览
         */

    }, {
        key: "sendImgBefore",
        value: function sendImgBefore(e) {
            var message = {
                msg: e.value,
                mtype: e.mtype,
                time: Date.now()
            };
            this.props.newMsg = {
                hIncId: null,
                name: this.props.name,
                me: true,
                msg: message,
                time: logic_1.timestampFormat(message.time, 1),
                chatType: this.props.chatType
            };
            this.paint();
        }
        /**
         * 发送真实消息
         */

    }, {
        key: "send",
        value: function send(e) {
            var _this3 = this;

            this.props.inputMessage = e.value;
            if (this.props.chatType === user_s_1.GENERATOR_TYPE.GROUP) {
                logger.debug('====群组聊天信息发送', e);
                var message = new message_s_2.GroupSend();
                message.gid = this.props.id;
                message.msg = this.props.inputMessage;
                message.mtype = e.msgType || message_s_1.MSG_TYPE.TXT;
                message.time = new Date().getTime();
                if (e.msgType < 5) {
                    this.props.newMsg = {
                        hIncId: null,
                        name: this.props.name,
                        me: true,
                        msg: messageItem_1.parseMessage(util_1.depCopy(message)),
                        time: logic_1.timestampFormat(message.time, 1),
                        chatType: this.props.chatType
                    };
                }
                init_1.clientRpcFunc(message_p_1.sendGroupMessage, message, function (r) {
                    if (r.hIncId === constant_1.DEFAULT_ERROR_STR) {
                        logic_1.bottomNotice('消息发送失败！');
                        return;
                    }
                });
            } else {
                logger.debug('=========单聊信息发送', e);
                var info = new message_s_2.UserSend();
                info.msg = this.props.inputMessage;
                info.mtype = e.msgType || message_s_1.MSG_TYPE.TXT;
                info.rid = this.props.id;
                info.time = new Date().getTime();
                if (e.msgType < 5) {
                    this.props.newMsg = {
                        hIncId: null,
                        name: this.props.name,
                        me: true,
                        msg: messageItem_1.parseMessage(util_1.depCopy(info)),
                        time: logic_1.timestampFormat(info.time, 1),
                        chatType: this.props.chatType
                    };
                }
                init_1.clientRpcFunc(message_p_1.sendUserMessage, info, function (r) {
                    var nextside = _this3.props.id;
                    if (!r.msg.send) {
                        // 对方将我拉入黑名单中，消息被拒收
                        if (!document.querySelector('.msgRefusedFlag')) {
                            var item = document.createElement('div');
                            item.setAttribute('style', 'font-size: 24px;text-align: center;color: #888;margin: 20px;');
                            item.setAttribute('class', 'msgRefusedFlag');
                            item.innerText = "\u6D88\u606F\u5DF2\u53D1\u51FA\uFF0C\u4F46\u88AB\u5BF9\u65B9\u62D2\u6536\u4E86\u3002";
                            document.getElementById('chatMessageBox').appendChild(item);
                        }
                    } else if (r.hIncId === constant_1.DEFAULT_ERROR_STR) {
                        // 对方不是我的好友
                        var _item = document.createElement('div');
                        _item.setAttribute('style', 'font-size: 24px;text-align: center;color: #888;margin: 20px;');
                        _item.innerText = "\u5BF9\u65B9\u4E0D\u662F\u4F60\u7684\u597D\u53CB\uFF0C\u7ACB\u5373";
                        var innerItem = document.createElement('span');
                        innerItem.setAttribute('style', 'color:#3FA2F7;border:10px solid transparent;');
                        innerItem.innerText = '添加好友';
                        innerItem.addEventListener('click', function () {
                            root_1.popNew('chat-client-app-view-chat-addUser', { rid: _this3.props.id });
                        });
                        _item.appendChild(innerItem);
                        document.getElementById('chatMessageBox').appendChild(_item);
                        return;
                    }
                    parse_1.updateUserMessage(nextside, r);
                });
            }
            this.props.inputMessage = '';
            this.paint();
            this.latestMsg();
        }
        /**
         * 输入框内容变化
         */

    }, {
        key: "msgChange",
        value: function msgChange(e) {
            this.props.inputMessage = e.value;
            this.paint();
        }
        /**
         * 点击页面
         */

    }, {
        key: "pageClick",
        value: function pageClick() {
            this.props.isOnEmoji = false;
            this.props.isOnTools = false;
            this.paint();
        }
        /**
         * 打开表情库
         */

    }, {
        key: "openEmoji",
        value: function openEmoji() {
            this.props.isOnEmoji = !this.props.isOnEmoji;
            this.props.isOnTools = false;
            this.paint();
            this.latestMsg();
        }
        /**
         * 打开更多功能
         */

    }, {
        key: "openTools",
        value: function openTools() {
            this.props.isOnTools = !this.props.isOnTools;
            this.props.isOnEmoji = false;
            this.paint();
            this.latestMsg();
        }
        /**
         * 输入框聚焦
         */

    }, {
        key: "inputFocus",
        value: function inputFocus() {
            this.props.isOnEmoji = false;
            this.props.isOnTools = false;
            this.paint();
            this.latestMsg();
        }
        /**
         * 选择表情
         */

    }, {
        key: "pickEmoji",
        value: function pickEmoji(emoji) {
            this.props.inputMessage += "[" + emoji + "]";
            this.paint();
        }
        // 关闭公告

    }, {
        key: "closeAnnounce",
        value: function closeAnnounce() {
            this.props.lastAnnounce = undefined;
            this.paint();
        }
        /**
         * 定位最新消息
         */

    }, {
        key: "latestMsg",
        value: function latestMsg() {
            var _this4 = this;

            setTimeout(function () {
                var links = document.getElementsByClassName('linkMsg');

                var _loop = function _loop() {
                    if (_isArray) {
                        if (_i >= _iterator.length) return "break";
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) return "break";
                        _ref = _i.value;
                    }

                    var i = _ref;

                    i.addEventListener('click', function () {
                        native_1.openNewActivity(i.innerHTML, '其他网页');
                        console.log(i.innerHTML);
                    });
                };

                for (var _iterator = links, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                    var _ref;

                    var _ret = _loop();

                    if (_ret === "break") break;
                }
                _this4.getScrollElem().scrollTop = _this4.getScrollElem().scrollHeight;
                _this4.paint();
            }, 100);
        }
        /**
         * 获取滚动区元素
         */

    }, {
        key: "getScrollElem",
        value: function getScrollElem() {
            return painter_1.getRealNode(this.tree.children[1]);
        }
        /**
         * 查看群详细信息
         */

    }, {
        key: "groupDetail",
        value: function groupDetail() {
            root_1.popNew('chat-client-app-view-group-groupInfo', { gid: this.props.id, inFlag: 1 });
        }
        /**
         * 点击某个语音消息，关闭其他语言播放
         */

    }, {
        key: "stopRadio",
        value: function stopRadio(e) {
            this.props.onRadio = e;
            this.paint();
        }
    }, {
        key: "destroy",
        value: function destroy() {
            if (this.props.chatType === user_s_1.GENERATOR_TYPE.GROUP) {
                store.unregister("groupChatMap/" + this.props.hid, this.bindCB);
                store.unregister("groupInfoMap/" + this.props.id, this.bindCB);
            } else {
                store.unregister("userChatMap/" + this.props.hid, this.bindCB);
            }
            return _get(Chat.prototype.__proto__ || Object.getPrototypeOf(Chat.prototype), "destroy", this).call(this);
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.ok();
        }
    }]);

    return Chat;
}(widget_1.Widget);

exports.Chat = Chat;
})