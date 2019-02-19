_$define("chat/client/app/view/group/groupInfo", function (require, exports, module){
"use strict";
/**
 * 群信息
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
var user_s_1 = require("../../../../server/data/db/user.s");
var basic_p_1 = require("../../../../server/data/rpc/basic.p");
var group_p_1 = require("../../../../server/data/rpc/group.p");
var group_s_2 = require("../../../../server/data/rpc/group.s");
var logger_1 = require("../../../../utils/logger");
var util_1 = require("../../../../utils/util");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var native_1 = require("../../logic/native");
var init_1 = require("../../net/init");
var upload_1 = require("../../net/upload");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);

var GroupInfos = function (_widget_1$Widget) {
    _inherits(GroupInfos, _widget_1$Widget);

    function GroupInfos() {
        _classCallCheck(this, GroupInfos);

        var _this = _possibleConstructorReturn(this, (GroupInfos.__proto__ || Object.getPrototypeOf(GroupInfos)).call(this));

        _this.props = {
            gid: null,
            groupInfo: {},
            members: [],
            isGroupOpVisible: false,
            utilList: [],
            editable: false,
            groupAlias: '',
            isOwner: false,
            isAdmin: false,
            scrollHeight: 0,
            setting: null,
            msgAvoid: false,
            msgTop: false,
            inFlag: 0,
            avatar: '',
            avatarHtml: ''
        };
        _this.bindCB = _this.updateInfo.bind(_this);
        return _this;
    }

    _createClass(GroupInfos, [{
        key: "setProps",
        value: function setProps(props) {
            var _this2 = this;

            _get(GroupInfos.prototype.__proto__ || Object.getPrototypeOf(GroupInfos.prototype), "setProps", this).call(this, props);
            this.props.utilList = [
            // { utilText : '发送名片' },
            { utilText: '清空聊天记录' }, { utilText: '退出该群' }];
            this.props.isGroupOpVisible = false;
            this.props.editable = false;
            gid = this.props.gid;
            var ginfo = store.getStore("groupInfoMap/" + this.props.gid, new group_s_1.GroupInfo());
            this.props.groupInfo = ginfo;
            this.props.groupAlias = util_1.depCopy(ginfo.name);
            this.props.avatar = logic_1.getGroupAvatar(this.props.gid) || '../../res/images/img_avatar1.png';
            var uid = store.getStore('uid');
            this.props.members = this.props.groupInfo.memberids || [];
            if (uid === this.props.groupInfo.ownerid) {
                this.props.isOwner = true;
            }
            if (ginfo.adminids.indexOf(uid) > -1) {
                this.props.isAdmin = true;
            }
            this.props.setting = store.getStore('setting', { msgAvoid: [], msgTop: [] });
            this.props.msgTop = this.props.setting.msgTop.findIndex(function (item) {
                return item === util_1.genGroupHid(_this2.props.gid);
            }) > -1;
            this.props.msgAvoid = this.props.setting.msgAvoid.findIndex(function (item) {
                return item === util_1.genGroupHid(_this2.props.gid);
            }) > -1;
        }
    }, {
        key: "firstPaint",
        value: function firstPaint() {
            _get(GroupInfos.prototype.__proto__ || Object.getPrototypeOf(GroupInfos.prototype), "firstPaint", this).call(this);
            exports.getGroupUserLinkInfo(this.props.gid);
            store.register("groupInfoMap/" + this.props.gid, this.bindCB);
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.ok();
        }
        // 重新上传群头像

    }, {
        key: "selectAvatar",
        value: function selectAvatar() {
            var _this3 = this;

            var imagePicker = native_1.selectImage(function (width, height, url) {
                console.log('selectImage url = ', url);
                // tslint:disable-next-line:max-line-length
                _this3.props.avatarHtml = "<div style=\"background-image: url(" + url + ");width: 190px;height: 190px;background-size: cover;background-position: center;background-repeat: no-repeat;border-radius:50%\"></div>";
                _this3.paint();
                var loading = root_1.popNew('app-components1-loading-loading', { text: '图片上传中' });
                imagePicker.getContent({
                    success: function success(buffer) {
                        var _this4 = this;

                        upload_1.imgResize(buffer, function (res) {
                            upload_1.uploadFile(upload_1.arrayBuffer2File(res.ab), function (url) {
                                logic_1.bottomNotice('图片上传成功');
                                loading.callback(loading.widget);
                                var ginfo = store.getStore("groupInfoMap/" + gid, new group_s_1.GroupInfo());
                                var newGroup = new group_s_2.NewGroup();
                                newGroup.gid = gid;
                                newGroup.name = ginfo.name;
                                newGroup.avatar = url;
                                newGroup.note = '';
                                init_1.clientRpcFunc(group_p_1.updateGroupInfo, newGroup, function (r) {
                                    if (r.r === 1) {
                                        _this4.props.groupInfo.avatar = url;
                                        store.setStore("groupInfoMap/" + _this4.props.gid, _this4.props.groupInfo);
                                        logger.debug('==========修改群头像成功');
                                    }
                                });
                            });
                        });
                    }
                });
            });
        }
        // 群信息更多 

    }, {
        key: "handleMoreGroup",
        value: function handleMoreGroup() {
            this.props.isGroupOpVisible = !this.props.isGroupOpVisible;
            this.paint();
        }
        // 点击群信息更多操作列表项

    }, {
        key: "handleFatherTap",
        value: function handleFatherTap(e) {
            var _this5 = this;

            this.props.isGroupOpVisible = false;
            switch (e.index) {
                // case 0: // 发送名片
                //     break;
                case 0:
                    // 清空聊天记录
                    root_1.popNew('chat-client-app-widget-modalBox-modalBox', { title: '清空聊天记录', content: '确定清空聊天记录吗' }, function () {
                        store.setStore("groupChatMap/" + util_1.genGroupHid(_this5.props.gid), []);
                    });
                    break;
                case 1:
                    // 退出群
                    root_1.popNew('chat-client-app-widget-modalBox-modalBox', { content: '退出后，将不再接收此群任何消息', style: 'color:#F7931A' }, function () {
                        init_1.clientRpcFunc(group_p_1.userExitGroup, _this5.props.gid, function (r) {
                            console.log('========deleteGroup', r);
                            if (r.r === 1) {
                                // 退出成功关闭当前页面
                                logic_1.bottomNotice('退出群组成功');
                                _this5.ok();
                            } else {
                                logic_1.bottomNotice('群主不能退出');
                            }
                        });
                    });
                    break;
                default:
            }
            this.paint();
        }
        // 页面点击

    }, {
        key: "pageClick",
        value: function pageClick() {
            this.props.editable = false;
            this.props.isGroupOpVisible = false;
            this.paint();
        }
        // 点击后可编辑群别名

    }, {
        key: "editGroupAlias",
        value: function editGroupAlias() {
            this.props.editable = true;
            this.props.isGroupOpVisible = false;
            this.paint();
        }
    }, {
        key: "groupAliasChange",
        value: function groupAliasChange(e) {
            this.props.groupAlias = e.target.value;
            this.paint();
        }
        // 修改群名

    }, {
        key: "changeGroupAlias",
        value: function changeGroupAlias() {
            var _this6 = this;

            var newGroup = new group_s_2.NewGroup();
            newGroup.gid = this.props.gid;
            newGroup.name = this.props.groupAlias || this.props.groupInfo.name;
            newGroup.avatar = this.props.groupInfo.avatar;
            newGroup.note = '';
            init_1.clientRpcFunc(group_p_1.updateGroupInfo, newGroup, function (r) {
                if (r.r === 1) {
                    _this6.props.groupInfo.name = _this6.props.groupAlias;
                    store.setStore("groupInfoMap/" + _this6.props.gid, _this6.props.groupInfo);
                    logger.debug('==========修改群名成功', _this6.props.groupAlias);
                }
            });
        }
        // 打开群公告

    }, {
        key: "openGroupAnnounce",
        value: function openGroupAnnounce() {
            this.pageClick();
            root_1.popNew('chat-client-app-view-group-groupAnnounce', { gid: this.props.gid });
        }
        // 打开群管理

    }, {
        key: "openGroupManage",
        value: function openGroupManage() {
            this.props.isGroupOpVisible = false;
            this.paint();
            var ownerid = this.props.groupInfo.ownerid;
            var adminids = this.props.groupInfo.adminids;
            var uid = store.getStore('uid');
            logger.debug('============openGroupManage', ownerid, adminids, uid);
            if (ownerid === uid || adminids.indexOf(uid) > -1) {
                root_1.popNew('chat-client-app-view-groupManage-groupManage', { gid: this.props.gid });
            } else {
                logic_1.bottomNotice('您没有权限执行此操作');
            }
        }
        // 打开群聊天

    }, {
        key: "openGroupChat",
        value: function openGroupChat(e) {
            logic_1.rippleShow(e);
            this.pageClick();
            root_1.popNew('chat-client-app-view-chat-chat', { id: this.props.gid, chatType: user_s_1.GENERATOR_TYPE.GROUP });
        }
        // 打开群成员

    }, {
        key: "openGroupMember",
        value: function openGroupMember() {
            this.pageClick();
            root_1.popNew('chat-client-app-view-group-groupMember', { gid: this.props.gid });
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
            return _get(GroupInfos.prototype.__proto__ || Object.getPrototypeOf(GroupInfos.prototype), "destroy", this).call(this);
        }
        /**
         * 屏幕滑动
         */

    }, {
        key: "scrollPage",
        value: function scrollPage() {
            var scrollTop = document.getElementById('groupInfo').scrollTop;
            this.props.scrollHeight = scrollTop;
            this.paint();
        }
        /**
         * 设置消息免打扰
         */

    }, {
        key: "msgAvoid",
        value: function msgAvoid(e) {
            this.props.msgAvoid = e.newType;
            var setting = this.props.setting;
            var hid = util_1.genGroupHid(this.props.gid);
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
            var hid = util_1.genGroupHid(this.props.gid);
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
            var _this7 = this;

            var lastChat = store.getStore("lastChat", []);
            var ind = lastChat.findIndex(function (item) {
                return item[0] === _this7.props.gid && item[2] === user_s_1.GENERATOR_TYPE.GROUP;
            });
            ind > -1 && lastChat.splice(ind, 1);
            if (fg) {
                // 置顶放到最前面
                lastChat.unshift([this.props.gid, Date.now(), user_s_1.GENERATOR_TYPE.GROUP]); // 向前压入数组中
            } else {
                // 取消置顶放到置顶消息后
                var len = setting.msgTop.length;
                lastChat.splice(len, 0, [this.props.gid, Date.now(), user_s_1.GENERATOR_TYPE.GROUP]); // 压入到置顶消息后
            }
            store.setStore("lastChat", lastChat);
        }
        /**
         * 申请加入群组
         */

    }, {
        key: "applyGroup",
        value: function applyGroup() {
            init_1.clientRpcFunc(group_p_1.applyJoinGroup, this.props.gid, function (r) {
                logger.debug('===========主动添加群聊返回', r);
                if (r.r === -2) {
                    logic_1.bottomNotice('您申请的群不存在');
                } else if (r.r === -1) {
                    logic_1.bottomNotice('您已经是该群的成员');
                }
            });
        }
    }]);

    return GroupInfos;
}(widget_1.Widget);

exports.GroupInfos = GroupInfos;
var MAX_DURING = 600;
var gid = void 0; // 群ID
// 获取群内成员信息
exports.getGroupUserLinkInfo = function (gid) {
    if (Date.now() - store.getStore("readGroupTimeMap/" + gid, -1) > MAX_DURING) {
        init_1.clientRpcFunc(group_p_1.getGroupUserLink, gid, function (r) {
            logger.debug('===============', r);
            // 判断是否返回成功
            if (r.arr.length > 0) {
                r.arr.forEach(function (item) {
                    store.setStore("groupUserLinkMap/" + item.guid, item);
                });
                store.setStore("readGroupTimeMap/" + gid, Date.now());
            }
        });
    }
};
})