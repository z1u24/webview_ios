_$define("chat/client/app/view/groupManage/groupManage", function (require, exports, module){
"use strict";
/**
 * 群管理相关处理
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../../../pi/ui/root");
var forelet_1 = require("../../../../../pi/widget/forelet");
var widget_1 = require("../../../../../pi/widget/widget");
var group_p_1 = require("../../../../server/data/rpc/group.p");
var logger_1 = require("../../../../utils/logger");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var init_1 = require("../../net/init");
exports.forelet = new forelet_1.Forelet();
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);

var ManageItem = function (_widget_1$Widget) {
    _inherits(ManageItem, _widget_1$Widget);

    function ManageItem() {
        _classCallCheck(this, ManageItem);

        var _this = _possibleConstructorReturn(this, (ManageItem.__proto__ || Object.getPrototypeOf(ManageItem)).apply(this, arguments));

        _this.props = {
            gid: null,
            groupInfo: {},
            adminNum: null,
            applyUserNum: null,
            manageList: [],
            groupSetList: [],
            destroyGroupModalObj: {}
        };
        return _this;
    }

    _createClass(ManageItem, [{
        key: "setProps",
        value: function setProps(props) {
            _get(ManageItem.prototype.__proto__ || Object.getPrototypeOf(ManageItem.prototype), "setProps", this).call(this, props);
            this.props.gid = props.gid;
            this.props.groupInfo = this.getGroupInfo(this.props.gid);
            this.props.adminNum = this.props.groupInfo.adminids.length;
            this.props.applyUserNum = this.props.groupInfo.applyUser.length;
            this.props.manageList = [{ title: '设置管理员', quantity: this.props.adminNum + "/5" }, { title: '转让群主', quantity: '' }, { title: '入群申请', quantity: "" + this.props.applyUserNum }];
            this.props.groupSetList = [{ title: '允许群成员邀请入群', content: '关闭后，群成员不能邀请好友加群' }, { title: '开启进群审核', content: '关闭后，进群不需要经过群主或管理员审核' }];
            this.props.destroyGroupModalObj = { content: '解散后，所有成员将被清出，该群将不存在。', sureText: '确定', cancelText: '取消', style: 'color:#F7931A' };
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

            _get(ManageItem.prototype.__proto__ || Object.getPrototypeOf(ManageItem.prototype), "firstPaint", this).call(this);
            store.register("groupInfoMap/" + this.props.gid, function (r) {
                _this2.props.groupInfo = r;
                _this2.props.adminNum = r.adminids.length;
                _this2.props.applyUserNum = r.applyUser.length;
                logger.debug('=============group manage', _this2.props);
                _this2.setProps(_this2.props);
                _this2.paint();
            });
        }
        // 获取群组信息

    }, {
        key: "getGroupInfo",
        value: function getGroupInfo(gid) {
            var ginfo = store.getStore("groupInfoMap/" + gid);
            logger.debug('============ginfo', ginfo);
            return ginfo;
        }
        // 打开群管理项

    }, {
        key: "openManageItem",
        value: function openManageItem(e) {
            var ownerid = this.props.groupInfo.ownerid;
            var uid = store.getStore('uid');
            logger.debug('==============openManageItem', e.value);
            if (e.value === 2) {
                // 入群申请
                root_1.popNew('chat-client-app-view-groupManage-groupApplyStatus', { gid: this.props.gid });
            } else if (ownerid !== uid) {
                // 是否是群主
                logic_1.bottomNotice('你没有权限执行此操作');
                return;
            }
            if (e.value === 0) {
                // 设置管理员
                root_1.popNew('chat-client-app-view-groupManage-setupAdmin', { gid: this.props.gid });
            } else if (e.value === 1) {
                // 转让群主
                root_1.popNew('chat-client-app-view-groupManage-transferAdmin', { gid: this.props.gid });
            }
        }
        // 解散群

    }, {
        key: "destroyGroup",
        value: function destroyGroup() {
            var _this3 = this;

            var ownerid = this.props.groupInfo.ownerid;
            var uid = store.getStore('uid');
            if (ownerid === uid) {
                root_1.popNew('chat-client-app-widget-modalBox-modalBox', this.props.destroyGroupModalObj, function () {
                    logger.debug('dissolveGroup');
                    init_1.clientRpcFunc(group_p_1.dissolveGroup, _this3.props.gid, function (r) {
                        logger.debug('========dissolveGroup', r);
                        _this3.ok();
                    });
                }, function () {
                    logger.debug('================cancel dissolveGroup');
                });
            }
        }
    }]);

    return ManageItem;
}(widget_1.Widget);

exports.ManageItem = ManageItem;
})