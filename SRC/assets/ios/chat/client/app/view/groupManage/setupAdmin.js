_$define("chat/client/app/view/groupManage/setupAdmin", function (require, exports, module){
"use strict";
/**
 * 设置管理员
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../../../pi/ui/root");
var widget_1 = require("../../../../../pi/widget/widget");
var group_p_1 = require("../../../../server/data/rpc/group.p");
var logger_1 = require("../../../../utils/logger");
var util_1 = require("../../../../utils/util");
var store = require("../../data/store");
var init_1 = require("../../net/init");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);

var SetupAdmin = function (_widget_1$Widget) {
    _inherits(SetupAdmin, _widget_1$Widget);

    function SetupAdmin() {
        _classCallCheck(this, SetupAdmin);

        var _this = _possibleConstructorReturn(this, (SetupAdmin.__proto__ || Object.getPrototypeOf(SetupAdmin)).apply(this, arguments));

        _this.props = {
            gid: null,
            ginfo: {}
        };
        return _this;
    }

    _createClass(SetupAdmin, [{
        key: "setProps",
        value: function setProps(props) {
            _get(SetupAdmin.prototype.__proto__ || Object.getPrototypeOf(SetupAdmin.prototype), "setProps", this).call(this, props);
            this.props.gid = props.gid;
            this.props.ginfo = this.getGroupInfo(this.props.gid);
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

            _get(SetupAdmin.prototype.__proto__ || Object.getPrototypeOf(SetupAdmin.prototype), "firstPaint", this).call(this);
            store.register("groupInfoMap/" + this.props.gid, function (r) {
                _this2.props.ginfo = r;
                _this2.paint();
            });
        }
    }, {
        key: "getGroupInfo",
        value: function getGroupInfo(gid) {
            var ginfo = store.getStore("groupInfoMap/" + gid);
            logger.debug('============ginfo', ginfo);
            return ginfo;
        }
        // 打开添加管理员页面

    }, {
        key: "openAddAdmin",
        value: function openAddAdmin() {
            root_1.popNew('chat-client-app-view-groupManage-addAdmin', { gid: this.props.gid });
        }
        // 移除管理员

    }, {
        key: "removeAdmin",
        value: function removeAdmin(uid) {
            var guid = util_1.genGuid(this.props.gid, uid);
            init_1.clientRpcFunc(group_p_1.delAdmin, guid, function (r) {
                logger.debug('==============removeAdmin', r);
            });
        }
    }]);

    return SetupAdmin;
}(widget_1.Widget);

exports.SetupAdmin = SetupAdmin;
})