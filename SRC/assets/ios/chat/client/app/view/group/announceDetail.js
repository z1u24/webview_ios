_$define("chat/client/app/view/group/announceDetail", function (require, exports, module){
"use strict";
/**
 * 群公告详细
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
var constant_1 = require("../../../../server/data/constant");
var message_s_1 = require("../../../../server/data/db/message.s");
var message_p_1 = require("../../../../server/data/rpc/message.p");
var message_s_2 = require("../../../../server/data/rpc/message.s");
var util_1 = require("../../../../utils/util");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var init_1 = require("../../net/init");
// ================================================ 导出

var AnnounceDetail = function (_widget_1$Widget) {
    _inherits(AnnounceDetail, _widget_1$Widget);

    function AnnounceDetail() {
        _classCallCheck(this, AnnounceDetail);

        return _possibleConstructorReturn(this, (AnnounceDetail.__proto__ || Object.getPrototypeOf(AnnounceDetail)).apply(this, arguments));
    }

    _createClass(AnnounceDetail, [{
        key: "setProps",
        value: function setProps(props) {
            _get(AnnounceDetail.prototype.__proto__ || Object.getPrototypeOf(AnnounceDetail.prototype), "setProps", this).call(this, props);
            if (props.aIncId) {
                var announce = store.getStore("announceHistoryMap/" + props.aIncId, new message_s_1.Announcement());
                if (announce.msg) {
                    var notice = util_1.depCopy(announce.msg);
                    this.props.title = JSON.parse(notice).title;
                    this.props.content = JSON.parse(notice).content;
                }
            }
        }
        // 点击撤回公告

    }, {
        key: "deleteAnnounce",
        value: function deleteAnnounce(e) {
            var _this2 = this;

            root_1.popNew('chat-client-app-widget-openLink-openLink', { text: '确认删除' }, function () {
                var message = new message_s_2.GroupSend();
                message.gid = util_1.getGidFromHincid(_this2.props.aIncId);
                message.msg = _this2.props.aIncId;
                message.mtype = message_s_1.MSG_TYPE.RENOTICE;
                message.time = new Date().getTime();
                init_1.clientRpcFunc(message_p_1.sendGroupMessage, message, function (r) {
                    // TODO
                    if (r.hIncId === constant_1.DEFAULT_ERROR_STR) {
                        logic_1.bottomNotice('撤回公告失败');
                        return;
                    } else {
                        logic_1.bottomNotice('撤回公告成功');
                        _this2.ok();
                    }
                });
            });
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.ok();
        }
    }]);

    return AnnounceDetail;
}(widget_1.Widget);

exports.AnnounceDetail = AnnounceDetail;
})