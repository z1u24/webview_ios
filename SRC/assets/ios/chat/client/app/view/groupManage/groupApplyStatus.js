_$define("chat/client/app/view/groupManage/groupApplyStatus", function (require, exports, module){
"use strict";
/**
 * 入群申请验证状态
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var forelet_1 = require("../../../../../pi/widget/forelet");
var widget_1 = require("../../../../../pi/widget/widget");
var group_p_1 = require("../../../../server/data/rpc/group.p");
var group_s_1 = require("../../../../server/data/rpc/group.s");
var logger_1 = require("../../../../utils/logger");
var store = require("../../data/store");
var init_1 = require("../../net/init");
exports.forelet = new forelet_1.Forelet();
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);

var GroupApplyStatus = function (_widget_1$Widget) {
    _inherits(GroupApplyStatus, _widget_1$Widget);

    function GroupApplyStatus() {
        _classCallCheck(this, GroupApplyStatus);

        var _this = _possibleConstructorReturn(this, (GroupApplyStatus.__proto__ || Object.getPrototypeOf(GroupApplyStatus)).apply(this, arguments));

        _this.props = {
            gid: null,
            groupInfo: {}
        };
        return _this;
    }

    _createClass(GroupApplyStatus, [{
        key: "setProps",
        value: function setProps(props) {
            _get(GroupApplyStatus.prototype.__proto__ || Object.getPrototypeOf(GroupApplyStatus.prototype), "setProps", this).call(this, props);
            this.props.groupInfo = this.getGroupInfo(this.props.gid);
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.ok();
        }
        // 获取群组信息

    }, {
        key: "getGroupInfo",
        value: function getGroupInfo(gid) {
            var ginfo = store.getStore("groupInfoMap/" + gid);
            logger.debug('============ginfo', ginfo);
            return ginfo;
        }
    }, {
        key: "firstPaint",
        value: function firstPaint() {
            var _this2 = this;

            _get(GroupApplyStatus.prototype.__proto__ || Object.getPrototypeOf(GroupApplyStatus.prototype), "firstPaint", this).call(this);
            store.register("groupInfoMap/" + this.props.gid, function (r) {
                _this2.props.groupInfo = r;
                _this2.paint();
            });
        }
        // 同意入群申请（主动）

    }, {
        key: "agreeJoinGroup",
        value: function agreeJoinGroup(e) {
            var uid = parseInt(e.value, 10);
            var gid = this.props.gid;
            var agree = new group_s_1.GroupAgree();
            agree.gid = gid;
            agree.uid = uid;
            agree.agree = true;
            logger.debug('==========agreeJoinGroup agree', agree);
            init_1.clientRpcFunc(group_p_1.acceptUser, agree, function (r) {
                logger.debug('==========agreeJoinGroup result', r);
            });
        }
    }]);

    return GroupApplyStatus;
}(widget_1.Widget);

exports.GroupApplyStatus = GroupApplyStatus;
})