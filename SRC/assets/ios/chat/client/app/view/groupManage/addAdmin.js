_$define("chat/client/app/view/groupManage/addAdmin", function (require, exports, module){
"use strict";
/**
 * 添加管理员
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = require("../../../../../pi/widget/widget");
var group_p_1 = require("../../../../server/data/rpc/group.p");
var group_s_1 = require("../../../../server/data/rpc/group.s");
var logger_1 = require("../../../../utils/logger");
var util_1 = require("../../../../utils/util");
var store = require("../../data/store");
var init_1 = require("../../net/init");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);

var AddAdmin = function (_widget_1$Widget) {
    _inherits(AddAdmin, _widget_1$Widget);

    function AddAdmin() {
        _classCallCheck(this, AddAdmin);

        var _this = _possibleConstructorReturn(this, (AddAdmin.__proto__ || Object.getPrototypeOf(AddAdmin)).apply(this, arguments));

        _this.props = {
            gid: null,
            ginfo: {},
            applyAdminMembers: []
        };
        return _this;
    }

    _createClass(AddAdmin, [{
        key: "setProps",
        value: function setProps(props) {
            _get(AddAdmin.prototype.__proto__ || Object.getPrototypeOf(AddAdmin.prototype), "setProps", this).call(this, props);
            this.props.gid = props.gid;
            this.props.ginfo = this.getGroupInfo(this.props.gid);
            this.props.applyAdminMembers = [];
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.ok();
        }
    }, {
        key: "getGroupInfo",
        value: function getGroupInfo(gid) {
            var ginfo = store.getStore("groupInfoMap/" + gid);
            logger.debug('============ginfo', ginfo);
            return ginfo;
        }
        // 添加管理员

    }, {
        key: "addAdminMember",
        value: function addAdminMember(e) {
            var uid = e.value;
            logger.debug('添加管理员', uid);
            if (this.props.applyAdminMembers.findIndex(function (item) {
                return item === uid;
            }) === -1) {
                this.props.applyAdminMembers.push(uid);
            } else {
                this.props.applyAdminMembers = util_1.delValueFromArray(uid, this.props.applyAdminMembers);
            }
            logger.debug("applyAdminMembers is : " + JSON.stringify(this.props.applyAdminMembers));
        }
        // 点击添加

    }, {
        key: "completeAddAdmin",
        value: function completeAddAdmin() {
            var _this2 = this;

            if (this.props.applyAdminMembers.length <= 0) {
                return;
            }
            var guidsAdmin = new group_s_1.GuidsAdminArray();
            var guids = this.props.applyAdminMembers.map(function (item) {
                return util_1.genGuid(_this2.props.gid, item);
            });
            logger.debug('===============', guids, typeof guids === "undefined" ? "undefined" : _typeof(guids));
            guidsAdmin.guids = guids;
            init_1.clientRpcFunc(group_p_1.addAdmin, guidsAdmin, function (r) {
                logger.debug('=============completeAddAdmin', r);
            });
        }
    }]);

    return AddAdmin;
}(widget_1.Widget);

exports.AddAdmin = AddAdmin;
})