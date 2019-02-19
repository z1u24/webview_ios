_$define("chat/client/app/widget/messageItem/messageItem", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * textMessage 组件相关处理
 */
// ================================================ 导入
var config_1 = require("../../../../../app/config");
var root_1 = require("../../../../../pi/ui/root");
var event_1 = require("../../../../../pi/widget/event");
var painter_1 = require("../../../../../pi/widget/painter");
var widget_1 = require("../../../../../pi/widget/widget");
var group_s_1 = require("../../../../server/data/db/group.s");
var message_s_1 = require("../../../../server/data/db/message.s");
var user_s_1 = require("../../../../server/data/db/user.s");
var util_1 = require("../../../../utils/util");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var emoji_1 = require("../emoji/emoji");
// ================================================ 导出

var MessageItem = function (_widget_1$Widget) {
    _inherits(MessageItem, _widget_1$Widget);

    function MessageItem() {
        _classCallCheck(this, MessageItem);

        var _this = _possibleConstructorReturn(this, (MessageItem.__proto__ || Object.getPrototypeOf(MessageItem)).call(this));

        _this.props = {
            hIncId: '',
            name: '',
            msg: null,
            me: true,
            time: '',
            chatType: user_s_1.GENERATOR_TYPE.USER,
            isMessageRecallVisible: false,
            avatar: '',
            playRadio: false,
            refusedMsg: false
        };
        return _this;
    }

    _createClass(MessageItem, [{
        key: "setProps",
        value: function setProps(props) {
            _get(MessageItem.prototype.__proto__ || Object.getPrototypeOf(MessageItem.prototype), "setProps", this).call(this, props);
            if (this.props.hIncId) {
                if (this.props.chatType === user_s_1.GENERATOR_TYPE.USER) {
                    this.props.msg = store.getStore("userHistoryMap/" + this.props.hIncId, new message_s_1.UserMsg());
                    this.props.avatar = logic_1.getUserAvatar(this.props.msg.sid) || '../../res/images/user.png';
                } else if (this.props.chatType === user_s_1.GENERATOR_TYPE.GROUP) {
                    this.props.msg = store.getStore("groupHistoryMap/" + this.props.hIncId, new message_s_1.GroupMsg());
                    var gid = util_1.getGidFromHincid(this.props.hIncId);
                    this.props.name = store.getStore("groupUserLinkMap/" + util_1.genGuid(gid, this.props.msg.sid), new group_s_1.GroupUserLink()).userAlias;
                    this.props.avatar = logic_1.getGroupUserAvatar(gid, this.props.msg.sid) || '../../res/images/user.png';
                }
                this.props.msg = exports.parseMessage(util_1.depCopy(this.props.msg));
                this.props.refusedMsg = !this.props.msg.send;
                this.props.me = this.props.msg.sid === store.getStore('uid');
                var time = util_1.depCopy(this.props.msg.time);
                this.props.time = logic_1.timestampFormat(time, 1);
            }
        }
    }, {
        key: "firstPaint",
        value: function firstPaint() {
            var _this2 = this;

            _get(MessageItem.prototype.__proto__ || Object.getPrototypeOf(MessageItem.prototype), "firstPaint", this).call(this);
            // 当消息撤回 更新map
            store.register("userHistoryMap/" + this.props.hIncId, function () {
                _this2.setProps(_this2.props);
                _this2.paint();
            });
            store.register("groupHistoryMap/" + this.props.hIncId, function () {
                _this2.setProps(_this2.props);
                _this2.paint();
            });
        }
        // 点击撤回

    }, {
        key: "recall",
        value: function recall(e) {
            if (this.props.hIncId) {
                // 真实发送成功的消息才可以撤回
                event_1.notify(e.node, 'ev-send', { value: this.props.hIncId, msgType: message_s_1.MSG_TYPE.RECALL });
                this.props.isMessageRecallVisible = false;
                this.paint();
            }
        }
    }, {
        key: "userDetail",
        value: function userDetail() {
            var fg = this.props.chatType === user_s_1.GENERATOR_TYPE.USER ? 1 : 2;
            root_1.popNew('chat-client-app-view-info-userDetail', { uid: this.props.msg.sid, inFlag: fg });
        }
        // 长按打开消息撤回

    }, {
        key: "openMessageRecall",
        value: function openMessageRecall() {
            this.props.isMessageRecallVisible = true;
            this.paint();
        }
        // 点击消息内容

    }, {
        key: "msgDetailClick",
        value: function msgDetailClick(e) {
            this.props.isMessageRecallVisible = false;
            this.paint();
        }
        // 点击打开红包

    }, {
        key: "openRedEnvelope",
        value: function openRedEnvelope() {
            root_1.popNew('app-view-earn-exchange-openRedEnv', {
                inFlag: 'chat',
                cid: this.props.msg.redEnvId,
                message: this.props.msg.msg
            });
        }
        // 点击查看大图

    }, {
        key: "openBigImage",
        value: function openBigImage() {
            var url = this.props.msg.msg.split('"')[1];
            root_1.popNew('chat-client-app-widget-bigImage-bigImage', { img: url });
        }
        // 点击播放语音

    }, {
        key: "playRadioMess",
        value: function playRadioMess(e) {
            var _this3 = this;

            // 关掉所有语音
            var audios = document.getElementsByTagName('audio');
            for (var _iterator = audios, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var i = _ref;

                i.pause();
                i.currentTime = 0;
            }
            var elem = painter_1.getRealNode(e.node).getElementsByTagName('audio')[0];
            if (this.props.playRadio) {
                this.props.playRadio = false;
                console.log('暂停播放语音');
            } else {
                this.props.playRadio = true;
                console.log('开始播放语音');
                elem.play();
                setTimeout(function () {
                    if (elem.currentTime === elem.duration) {
                        _this3.props.playRadio = false;
                        console.log('结束播放语音');
                        elem.pause();
                        elem.currentTime = 0;
                        _this3.paint();
                    }
                }, elem.duration * 1000 + 500); // 多加半秒，确保语音播完
            }
            this.paint();
            event_1.notify(e.node, 'ev-messItem-radio', { hIncId: this.props.hIncId, playRadio: this.props.playRadio });
        }
    }]);

    return MessageItem;
}(widget_1.Widget);

exports.MessageItem = MessageItem;
// 转换文字中的链接
var httpHtml = function httpHtml(str) {
    var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-|:|#)+)/g;
    return str.replace(reg, '<a href="javascript:;" class="linkMsg">$1$2</a>');
};
// 转换表情包
var parseEmoji = function parseEmoji(msg) {
    msg.msg = httpHtml(msg.msg);
    msg.msg = msg.msg.replace(/\[(\S+?)\]/ig, function (match, capture) {
        var url = emoji_1.EMOJIS_MAP.get(capture) || undefined;
        if (url) {
            // FIXME: 不应该写死,应该动态获取
            // url = url.replace('../../','/client/app/');
            return "<img src=\"../../chat/client/app/res/emoji/" + url + "\" alt=\"" + capture + "\" class='emojiMsg'></img>";
        } else {
            return match;
        }
    });
    return msg;
};
// 转换图片;
var parseImg = function parseImg(msg) {
    msg.msg = msg.msg.replace(/\[(\S+?)\]/ig, function (match, url) {
        return "<img src=\"" + config_1.uploadFileUrlPrefix + url + "\" alt=\"img\" class='imgMsg'></img>";
    });
    return msg;
};
// 转换红包
var parseRedEnv = function parseRedEnv(msg) {
    var value = JSON.parse(msg.msg);
    msg.msg = value.message || '恭喜发财，万事如意';
    msg.redEnvId = value.rid;
    return msg;
};
// 转换音频文件
var parseRadio = function parseRadio(msg) {
    var value = JSON.parse(msg.msg);
    msg.msg = value.time + "\"<audio src=\"" + config_1.uploadFileUrlPrefix + value.message + "\">\u8BED\u97F3\u4FE1\u606F</audio>";
    msg.width = value.time;
    return msg;
};
exports.parseMessage = function (msg) {
    switch (msg.mtype) {
        case message_s_1.MSG_TYPE.REDENVELOPE:
            // 红包
            return parseRedEnv(msg);
        case message_s_1.MSG_TYPE.TXT:
            // 文本，表情
            return parseEmoji(msg);
        case message_s_1.MSG_TYPE.IMG:
            // 图片
            return parseImg(msg);
        case message_s_1.MSG_TYPE.VOICE:
            // 语音
            // TODO:
            return parseRadio(msg);
        case message_s_1.MSG_TYPE.VIDEO:
            // 视频
            // TODO:
            return msg;
        default:
            return msg;
    }
};
})