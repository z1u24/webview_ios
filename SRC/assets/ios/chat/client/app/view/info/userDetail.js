_$define("chat/client/app/view/info/userDetail", function (require, exports, module){
"use strict";
/**
 * 联系人详细信息
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../../../pi/ui/root");
var widget_1 = require("../../../../../pi/widget/widget");
var constant_1 = require("../../../../server/data/constant");
var message_s_1 = require("../../../../server/data/db/message.s");
var user_s_1 = require("../../../../server/data/db/user.s");
var basic_p_1 = require("../../../../server/data/rpc/basic.p");
var basic_s_1 = require("../../../../server/data/rpc/basic.s");
var message_p_1 = require("../../../../server/data/rpc/message.p");
var message_s_2 = require("../../../../server/data/rpc/message.s");
var user_p_1 = require("../../../../server/data/rpc/user.p");
var user_s_2 = require("../../../../server/data/rpc/user.s");
var logger_1 = require("../../../../utils/logger");
var util_1 = require("../../../../utils/util");
var parse_1 = require("../../data/parse");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var init_1 = require("../../net/init");
var rpc_1 = require("../../net/rpc");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);
// ================================================ 导出

var UserDetail = function (_widget_1$Widget) {
    _inherits(UserDetail, _widget_1$Widget);

    function UserDetail() {
        _classCallCheck(this, UserDetail);

        var _this = _possibleConstructorReturn(this, (UserDetail.__proto__ || Object.getPrototypeOf(UserDetail)).call(this));

        _this.props = {
            uid: null,
            inFlag: 0,
            isContactorOpVisible: false,
            utilList: [],
            userInfo: {},
            alias: '',
            isFriend: true,
            avatar: '',
            setting: null,
            msgAvoid: false,
            msgTop: false
        };
        return _this;
    }

    _createClass(UserDetail, [{
        key: "setProps",
        value: function setProps(props) {
            var _this2 = this;

            _get(UserDetail.prototype.__proto__ || Object.getPrototypeOf(UserDetail.prototype), "setProps", this).call(this, props);
            this.props.userInfo = {};
            if (props.inFlag === 3) {
                this.props.utilList = [{ utilText: '加入黑名单' }, { utilText: '举报' }];
            } else if (props.uid === constant_1.CUSTOMER_SERVICE) {
                this.props.utilList = [{ utilText: '修改备注' }, { utilText: '清空聊天记录' }];
            } else {
                this.props.utilList = [{ utilText: '修改备注' }, { utilText: '清空聊天记录' }, { utilText: '加入黑名单' }, { utilText: '删除好友' }, { utilText: '举报' }];
            }
            this.props.isContactorOpVisible = false;
            this.props.isFriend = true;
            this.props.userInfo = store.getStore("userInfoMap/" + this.props.uid, new user_s_1.UserInfo());
            this.props.alias = logic_1.getFriendAlias(this.props.uid);
            if (!this.props.alias) {
                this.getUserData(this.props.uid);
            }
            logger.debug(props);
            this.props.avatar = logic_1.getUserAvatar(this.props.uid) || '../../res/images/img_avatar1.png';
            var setting = store.getStore('setting', { msgAvoid: [], msgTop: [] });
            var sid = store.getStore('uid');
            this.props.setting = setting;
            this.props.msgTop = setting.msgTop.findIndex(function (item) {
                return item === util_1.genUserHid(sid, _this2.props.uid);
            }) > -1;
            this.props.msgAvoid = setting.msgAvoid.findIndex(function (item) {
                return item === util_1.genUserHid(sid, _this2.props.uid);
            }) > -1;
        }
        // 非好友获取信息

    }, {
        key: "getUserData",
        value: function getUserData(uid) {
            var _this3 = this;

            var info = new basic_s_1.GetUserInfoReq();
            info.uids = [uid];
            this.props.isFriend = false;
            init_1.clientRpcFunc(basic_p_1.getUsersInfo, info, function (r) {
                if (r && r.arr.length > 0) {
                    _this3.props.userInfo = r.arr[0];
                    _this3.paint();
                } else {
                    console.error('获取用户信息失败', r);
                }
            });
        }
        // 点击...展开联系人操作列表

    }, {
        key: "handleMoreContactor",
        value: function handleMoreContactor() {
            this.props.isContactorOpVisible = !this.props.isContactorOpVisible;
            var blackText = this.blackPerson ? '移出黑名单' : '加入黑名单';
            if (this.props.inFlag === 3) {
                this.props.utilList[0].utilText = blackText;
            } else if (this.props.uid !== constant_1.CUSTOMER_SERVICE) {
                this.props.utilList[2].utilText = blackText;
            }
            this.paint();
        }
        // 开始对话

    }, {
        key: "startChat",
        value: function startChat(e) {
            logic_1.rippleShow(e);
            this.pageClick();
            root_1.popNew('chat-client-app-view-chat-chat', { id: this.props.uid, chatType: user_s_1.GENERATOR_TYPE.USER });
        }
        // 添加好友

    }, {
        key: "addUser",
        value: function addUser(e) {
            var _this4 = this;

            logic_1.rippleShow(e);
            this.pageClick();
            rpc_1.applyFriend(this.props.uid.toString(), function (r) {
                if (r.r === 0) {
                    logic_1.bottomNotice(_this4.props.uid + "\u5DF2\u7ECF\u662F\u4F60\u7684\u597D\u53CB");
                }
            });
        }
        // 点击联系人操作列表项

    }, {
        key: "handleFatherTap",
        value: function handleFatherTap(e) {
            var _this5 = this;

            this.props.isContactorOpVisible = false;
            this.paint();
            if (this.props.inFlag === 3) {
                switch (e.index) {
                    case 0:
                        // 加入或移出黑名单
                        this.blackList();
                        break;
                    case 1:
                        // 举报
                        this.complaint();
                        break;
                    default:
                }
                return;
            }
            switch (e.index) {
                case 0:
                    // 修改备注
                    this.changeFriendAlias();
                    break;
                case 1:
                    // 清空聊天记录
                    root_1.popNew('chat-client-app-widget-modalBox-modalBox', { title: '清空聊天记录', content: "\u786E\u5B9A\u6E05\u7A7A\u548C" + this.props.userInfo.name + "\u7684\u804A\u5929\u8BB0\u5F55\u5417" }, function () {
                        var sid = store.getStore('uid');
                        store.setStore("userChatMap/" + util_1.genUserHid(sid, _this5.props.uid), []);
                    });
                    break;
                case 2:
                    // 加入或移出黑名单
                    this.blackList();
                    break;
                case 3:
                    // 删除联系人
                    root_1.popNew('chat-client-app-widget-modalBox-modalBox', { title: '删除联系人', content: "\u5C06\u8054\u7CFB\u4EBA" + this.props.userInfo.name + "\u5220\u9664\uFF0C\u540C\u65F6\u5220\u9664\u804A\u5929\u8BB0\u5F55", sureText: '删除' }, function () {
                        _this5.delFriend(_this5.props.uid);
                        _this5.goBack();
                    });
                    break;
                case 4:
                    // 举报
                    this.complaint();
                    break;
                default:
            }
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.ok();
        }
        /**
         * 举报用户
         */

    }, {
        key: "complaint",
        value: function complaint() {
            var _this6 = this;

            var content = ['色情暴力', '骚扰谩骂', '广告欺诈', '病毒木马', '反动政治', '其它'];
            root_1.popNew('chat-client-app-widget-complaint-complaint', { title: '', content: content }, function (selected) {
                if (selected.length === 0) {
                    // 未选择举报类型不能举报
                    logic_1.bottomNotice('您未选择举报类型');
                }
                var mess = "\u4E3E\u62A5\u7528\u6237@" + _this6.props.userInfo.name;
                for (var _iterator = selected, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

                    mess += "\u201C" + content[i] + "\u201D";
                }
                var info = new message_s_2.UserSend();
                info.msg = mess;
                info.mtype = message_s_1.MSG_TYPE.COMPLAINT;
                info.rid = constant_1.CUSTOMER_SERVICE;
                info.time = new Date().getTime();
                init_1.clientRpcFunc(message_p_1.sendUserMessage, info, function (r) {
                    parse_1.updateUserMessage(constant_1.CUSTOMER_SERVICE, r);
                });
            });
        }
        /**
         *
         * 加入或移除黑名单
         */

    }, {
        key: "blackList",
        value: function blackList() {
            var _this7 = this;

            if (this.blackPerson) {
                init_1.clientRpcFunc(user_p_1.removeFromBlackList, this.props.uid, function (r) {
                    if (r.r === 1) {
                        _this7.blackPerson = false;
                    }
                });
            } else {
                root_1.popNew('chat-client-app-widget-modalBox-modalBox', { title: '加入黑名单', content: '加入黑名单，您不再收到对方的消息。' }, function () {
                    init_1.clientRpcFunc(user_p_1.addToBlackList, _this7.props.uid, function (r) {
                        if (r.r === 1) {
                            _this7.blackPerson = true;
                            var sid = store.getStore('uid');
                            var lastRead = store.getStore("lastRead");
                            lastRead.delete(util_1.genUserHid(sid, _this7.props.uid)); // 删除本地游标
                            store.setStore("lastRead", lastRead);
                            var lastChat = store.getStore("lastChat", []);
                            var index = lastChat.findIndex(function (item) {
                                return item[0] === _this7.props.uid && item[2] === user_s_1.GENERATOR_TYPE.USER;
                            });
                            if (index > -1) {
                                lastChat.splice(index, 1); // 删除最近对话记录
                                store.setStore('lastChat', lastChat);
                            }
                            store.setStore("userChatMap/" + util_1.genUserHid(sid, _this7.props.uid), []); // 删除聊天记录
                        }
                    });
                });
            }
        }
        /**
         * 删除好友
         * @param uid 用户ID
         */

    }, {
        key: "delFriend",
        value: function delFriend(uid) {
            rpc_1.delFriend(uid, function (r) {
                if (r && r.r === 1) {
                    // 删除成功取消订阅好友消息并清空本地数据
                    init_1.unSubscribe(uid.toString());
                    var sid = store.getStore('uid');
                    var userChatMap = store.getStore('userChatMap', new Map());
                    userChatMap.delete(util_1.genUserHid(sid, uid)); // 删除聊天记录
                    store.setStore('userChatMap', userChatMap);
                    var userInfoMap = store.getStore('userInfoMap', new Map());
                    userInfoMap.delete(uid); // 删除用户信息
                    store.setStore('userInfoMap', userInfoMap);
                    var lastChat = store.getStore("lastChat", []);
                    var index = lastChat.findIndex(function (item) {
                        return item[0] === uid && item[2] === user_s_1.GENERATOR_TYPE.USER;
                    });
                    if (index > -1) {
                        // 删除最近对话记录
                        lastChat.splice(index, 1);
                        store.setStore('lastChat', lastChat);
                    }
                } else {
                    logic_1.bottomNotice('删除好友失败');
                }
            });
        }
        /**
         * 页面点击
         */

    }, {
        key: "pageClick",
        value: function pageClick() {
            this.props.isContactorOpVisible = false;
            this.paint();
        }
        /**
         * 修改好友备注
         */

    }, {
        key: "changeFriendAlias",
        value: function changeFriendAlias() {
            var _this8 = this;

            root_1.popNew('chat-client-app-widget-pageEdit-pageEdit', { title: '修改备注', contentInput: this.props.alias }, function (res) {
                var friend = new user_s_2.FriendAlias();
                friend.rid = _this8.props.uid;
                friend.alias = res.content;
                init_1.clientRpcFunc(user_p_1.changeFriendAlias, friend, function (r) {
                    if (r.r === 1) {
                        var sid = store.getStore('uid');
                        var friendlink = store.getStore("friendLinkMap/" + util_1.genUuid(sid, _this8.props.uid), {});
                        friendlink.alias = friend.alias;
                        store.setStore("friendLinkMap/" + util_1.genUuid(sid, _this8.props.uid), friendlink);
                        _this8.props.alias = friend.alias;
                        _this8.paint();
                        logic_1.bottomNotice('修改好友备注成功');
                    } else {
                        logic_1.bottomNotice('修改好友备注失败');
                    }
                });
            });
        }
        /**
         * 点击复制
         */

    }, {
        key: "doCopy",
        value: function doCopy(i) {
            if (i === 0) {
                logic_1.copyToClipboard(this.props.uid);
            } else if (i === 1) {
                logic_1.copyToClipboard(this.props.userInfo.wallet_addr);
            } else {
                logic_1.copyToClipboard(this.props.userInfo.tel);
            }
            this.props.isContactorOpVisible = false;
            this.paint();
            logic_1.bottomNotice('复制成功');
        }
        /**
         * 设置消息免打扰
         */

    }, {
        key: "msgAvoid",
        value: function msgAvoid(e) {
            this.props.msgAvoid = e.newType;
            var setting = this.props.setting;
            var sid = store.getStore('uid');
            var hid = util_1.genUserHid(sid, this.props.uid);
            var index = setting.msgAvoid.findIndex(function (item) {
                return item === hid;
            });
            if (e.newType) {
                index === -1 && setting.msgAvoid.push(hid);
            } else {
                setting.msgAvoid.splice(index, 1);
            }
            this.props.setting = setting;
            store.setStore('setting', setting);
            init_1.clientRpcFunc(basic_p_1.setData, JSON.stringify(setting), function (res) {
                // TODO
                console.log(res);
            });
        }
        /**
         * 设置消息置顶
         */

    }, {
        key: "msgTop",
        value: function msgTop(e) {
            this.props.msgTop = e.newType;
            var setting = this.props.setting;
            var sid = store.getStore('uid');
            var hid = util_1.genUserHid(sid, this.props.uid);
            var index = setting.msgTop.findIndex(function (item) {
                return item === hid;
            });
            if (e.newType) {
                index === -1 && setting.msgTop.push(hid);
            } else {
                setting.msgTop.splice(index, 1);
            }
            this.props.setting = setting;
            store.setStore('setting', setting);
            this.pushLastChat(e.newType, setting);
            init_1.clientRpcFunc(basic_p_1.setData, JSON.stringify(setting), function (res) {
                // TODO
                console.log(res);
            });
        }
    }, {
        key: "pushLastChat",
        value: function pushLastChat(fg, setting) {
            var _this9 = this;

            var lastChat = store.getStore("lastChat", []);
            var ind = lastChat.findIndex(function (item) {
                return item[0] === _this9.props.uid && item[2] === user_s_1.GENERATOR_TYPE.USER;
            });
            ind > -1 && lastChat.splice(ind, 1);
            if (fg) {
                // 置顶放到最前面
                lastChat.unshift([this.props.uid, Date.now(), user_s_1.GENERATOR_TYPE.USER]); // 向前压入数组中
            } else {
                // 取消置顶放到置顶消息后
                var len = setting.msgTop.length;
                lastChat.splice(len, 0, [this.props.uid, Date.now(), user_s_1.GENERATOR_TYPE.USER]); // 压入到置顶消息后
            }
            store.setStore("lastChat", lastChat);
        }
    }]);

    return UserDetail;
}(widget_1.Widget);

exports.UserDetail = UserDetail;
})