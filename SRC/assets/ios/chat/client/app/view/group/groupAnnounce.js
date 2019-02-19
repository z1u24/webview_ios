_$define("chat/client/app/view/group/groupAnnounce", function (require, exports, module){
"use strict";
/**
 * 群公告
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
var group_s_1 = require("../../../../server/data/db/group.s");
var message_s_1 = require("../../../../server/data/db/message.s");
var message_p_1 = require("../../../../server/data/rpc/message.p");
var message_s_2 = require("../../../../server/data/rpc/message.s");
var logger_1 = require("../../../../utils/logger");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var init_1 = require("../../net/init");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);

var GroupAnnounce = function (_widget_1$Widget) {
    _inherits(GroupAnnounce, _widget_1$Widget);

    function GroupAnnounce() {
        _classCallCheck(this, GroupAnnounce);

        var _this = _possibleConstructorReturn(this, (GroupAnnounce.__proto__ || Object.getPrototypeOf(GroupAnnounce)).apply(this, arguments));

        _this.props = {
            gid: null,
            aIncIdArray: [],
            isOwner: false,
            createTime: ''
        };
        return _this;
    }

    _createClass(GroupAnnounce, [{
        key: "setProps",
        value: function setProps(props) {
            _get(GroupAnnounce.prototype.__proto__ || Object.getPrototypeOf(GroupAnnounce.prototype), "setProps", this).call(this, props);
            var gInfo = store.getStore("groupInfoMap/" + this.props.gid, new group_s_1.GroupInfo());
            this.props.aIncIdArray = gInfo.annoceids;
            var uid = store.getStore('uid');
            var ownerid = gInfo.ownerid;
            if (uid === ownerid) {
                this.props.isOwner = true;
            }
            this.props.createTime = logic_1.timestampFormat(gInfo.create_time, 2);
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.ok();
        }
    }, {
        key: "firstPaint",
        value: function firstPaint() {
            var _this2 = this;

            _get(GroupAnnounce.prototype.__proto__ || Object.getPrototypeOf(GroupAnnounce.prototype), "firstPaint", this).call(this);
            store.register("announceHistoryMap", function () {
                _this2.setProps(_this2.props);
                _this2.paint();
            });
        }
        // 编辑群公告

    }, {
        key: "editGroupAnnounce",
        value: function editGroupAnnounce() {
            var _this3 = this;

            root_1.popNew('chat-client-app-widget-pageEdit-pageEdit', { title: '编辑群公告', needTitle: true }, function (r) {
                var message = new message_s_2.GroupSend();
                message.gid = _this3.props.gid;
                message.msg = JSON.stringify(r);
                message.mtype = message_s_1.MSG_TYPE.NOTICE;
                message.time = new Date().getTime();
                init_1.clientRpcFunc(message_p_1.sendGroupMessage, message, function () {
                    logic_1.bottomNotice('发布群公告成功');
                });
            });
        }
        // 查看公告详情

    }, {
        key: "goDetail",
        value: function goDetail(aIncId) {
            if (aIncId) {
                root_1.popNew('chat-client-app-view-group-announceDetail', { aIncId: aIncId });
            } else {
                root_1.popNew('chat-client-app-view-group-announceDetail', { title: '本群须知', content: '欢迎大家入群' });
            }
        }
    }]);

    return GroupAnnounce;
}(widget_1.Widget);

exports.GroupAnnounce = GroupAnnounce;
})