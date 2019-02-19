_$define("chat/client/app/view/groupManage/transferAdmin", function (require, exports, module){
"use strict";
/**
 * 转让群主
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
var util_1 = require("../../../../utils/util");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var init_1 = require("../../net/init");
var WIDGET_NAME = module.id.replace(/\//g, '-');
exports.forelet = new forelet_1.Forelet();
var logger = new logger_1.Logger(WIDGET_NAME);

var TransferGroupOwner = function (_widget_1$Widget) {
    _inherits(TransferGroupOwner, _widget_1$Widget);

    function TransferGroupOwner() {
        _classCallCheck(this, TransferGroupOwner);

        var _this = _possibleConstructorReturn(this, (TransferGroupOwner.__proto__ || Object.getPrototypeOf(TransferGroupOwner)).apply(this, arguments));

        _this.props = {
            gid: null,
            ginfo: {}
        };
        return _this;
    }

    _createClass(TransferGroupOwner, [{
        key: "setProps",
        value: function setProps(props) {
            _get(TransferGroupOwner.prototype.__proto__ || Object.getPrototypeOf(TransferGroupOwner.prototype), "setProps", this).call(this, props);
            this.props.gid = props.gid;
            this.props.ginfo = this.getGroupInfo(this.props.gid);
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
    }, {
        key: "openConfirmTranBox",
        value: function openConfirmTranBox(uid) {
            var _this2 = this;

            var modalObj = { content: "\"" + uid + "\"\u5C06\u6210\u4E3A\u65B0\u7FA4\u4E3B\uFF0C\u786E\u8BA4\u540E\u60A8\u5C06\u4F60\u5931\u53BB\u7FA4\u4E3B\u8EAB\u4EFD\u3002", sureText: '确定', cancelText: '取消', style: 'color:#F7931A' };
            var guid = util_1.genGuid(this.props.gid, uid);
            root_1.popNew('chat-client-app-widget-modalBox-modalBox', modalObj, function () {
                init_1.clientRpcFunc(group_p_1.setOwner, guid, function (r) {
                    logic_1.bottomNotice('转让群主成功');
                    _this2.ok();
                });
            }, function () {
                logger.debug('=============== cancel transGroupOwner');
            });
            this.paint();
        }
    }]);

    return TransferGroupOwner;
}(widget_1.Widget);

exports.TransferGroupOwner = TransferGroupOwner;
})