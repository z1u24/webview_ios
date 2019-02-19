_$define("chat/client/app/view/contactList/applyUser", function (require, exports, module){
"use strict";
/**
 * applyUser 组件相关处理
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================ 导入
var root_1 = require("../../../../../pi/ui/root");
var event_1 = require("../../../../../pi/widget/event");
var widget_1 = require("../../../../../pi/widget/widget");
var user_s_1 = require("../../../../server/data/db/user.s");
var logger_1 = require("../../../../utils/logger");
var store = require("../../data/store");
var basic_p_1 = require("../../../../server/data/rpc/basic.p");
var basic_s_1 = require("../../../../server/data/rpc/basic.s");
var util_1 = require("../../../../utils/util");
var init_1 = require("../../net/init");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);

var ApplyUser = function (_widget_1$Widget) {
    _inherits(ApplyUser, _widget_1$Widget);

    function ApplyUser() {
        _classCallCheck(this, ApplyUser);

        var _this = _possibleConstructorReturn(this, (ApplyUser.__proto__ || Object.getPrototypeOf(ApplyUser)).apply(this, arguments));

        _this.props = {
            id: null,
            guid: null,
            name: '',
            chatType: user_s_1.GENERATOR_TYPE.USER,
            applyInfo: '',
            isActiveToGroup: true,
            isagree: false,
            activeToGGid: null
        };
        return _this;
    }

    _createClass(ApplyUser, [{
        key: "setProps",
        value: function setProps(props) {
            var _this2 = this;

            _get(ApplyUser.prototype.__proto__ || Object.getPrototypeOf(ApplyUser.prototype), "setProps", this).call(this, props);
            this.props.isagree = false;
            if (this.props.chatType === user_s_1.GENERATOR_TYPE.USER) {
                logger.debug('------------', store.getStore("userInfoMap/" + this.props.id));
                var userInfo = store.getStore("userInfoMap/" + this.props.id);
                this.props.name = userInfo ? userInfo.name : '';
                this.props.applyInfo = '请求添加你为好友';
            }
            if (this.props.chatType === user_s_1.GENERATOR_TYPE.GROUP) {
                if (this.props.isActiveToGroup) {
                    // 主动申请加群
                    var info = new basic_s_1.GetUserInfoReq();
                    info.uids = [this.props.id];
                    init_1.clientRpcFunc(basic_p_1.getUsersInfo, info, function (r) {
                        if (r.arr.length > 0) {
                            _this2.props.name = r.arr[0].name;
                            _this2.props.applyInfo = "\u7528\u6237" + _this2.props.name + "\u7533\u8BF7\u8FDB\u7FA4";
                            _this2.paint();
                        }
                    });
                } else {
                    // 被动进群
                    var gid = util_1.getGidFromGuid(this.props.guid);
                    var rid = util_1.getUidFromGuid(this.props.guid);
                    var ginfo = store.getStore("groupInfoMap/" + gid);
                    var _userInfo = store.getStore("userInfoMap/" + rid);
                    this.props.name = ginfo ? ginfo.name : '';
                    this.props.applyInfo = (_userInfo ? _userInfo.name : '') + "\u9080\u8BF7\u4F60\u52A0\u5165\u7FA4";
                    this.props.id = gid;
                }
            }
        }
        // 查看申请详细信息 

    }, {
        key: "viewApplyDetail",
        value: function viewApplyDetail() {
            if (this.props.chatType === user_s_1.GENERATOR_TYPE.USER) {
                root_1.popNew('chat-client-app-view-contactList-newFriendApply', Object.assign({}, this.props, { title: '新的朋友' }));
            }
            if (this.props.chatType === user_s_1.GENERATOR_TYPE.GROUP) {
                if (this.props.isActiveToGroup) {
                    // 主动申请加群
                    root_1.popNew('chat-client-app-view-contactList-newFriendApply', Object.assign({}, this.props, { title: '申请入群' }));
                } else {
                    // 被动进群
                    root_1.popNew('chat-client-app-view-contactList-newFriendApply', Object.assign({}, this.props, { title: '邀请入群' }));
                }
            }
        }
    }, {
        key: "agreenBtn",
        value: function agreenBtn(e) {
            if (this.props.chatType === user_s_1.GENERATOR_TYPE.USER) {
                event_1.notify(e.node, 'ev-agree-friend', { value: this.props.id });
            }
            if (this.props.chatType === user_s_1.GENERATOR_TYPE.GROUP) {
                if (this.props.isActiveToGroup) {
                    // 主动申请加群
                    event_1.notify(e.node, 'ev-agree-joinGroup', { value: this.props.id });
                } else {
                    // 被动进群
                    event_1.notify(e.node, 'ev-agree-group', { value: util_1.getGidFromGuid(this.props.guid) });
                }
            }
            this.props.isagree = true;
            this.paint();
        }
    }]);

    return ApplyUser;
}(widget_1.Widget);

exports.ApplyUser = ApplyUser;
})