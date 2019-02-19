_$define("chat/client/app/widget/announceItem/announceItem", function (require, exports, module){
"use strict";
/**
 * 群公告项
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================ 导入
var widget_1 = require("../../../../../pi/widget/widget");
var message_s_1 = require("../../../../server/data/db/message.s");
var logger_1 = require("../../../../utils/logger");
var util_1 = require("../../../../utils/util");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);

var AnnounceItem = function (_widget_1$Widget) {
    _inherits(AnnounceItem, _widget_1$Widget);

    function AnnounceItem() {
        _classCallCheck(this, AnnounceItem);

        var _this = _possibleConstructorReturn(this, (AnnounceItem.__proto__ || Object.getPrototypeOf(AnnounceItem)).apply(this, arguments));

        _this.props = {
            aIncId: '',
            announce: null,
            time: '',
            noticeTitle: ''
        };
        return _this;
    }

    _createClass(AnnounceItem, [{
        key: "setProps",
        value: function setProps(props) {
            _get(AnnounceItem.prototype.__proto__ || Object.getPrototypeOf(AnnounceItem.prototype), "setProps", this).call(this, props);
            logger.debug(props.aIncId, '=============', this.props.aIncId);
            var announce = store.getStore("announceHistoryMap/" + this.props.aIncId, new message_s_1.Announcement());
            this.props.announce = announce;
            if (announce) {
                var notice = util_1.depCopy(announce.msg);
                this.props.noticeTitle = JSON.parse(notice).title;
                this.props.time = logic_1.timestampFormat(announce.time, 3);
            }
            logger.debug('====this.props.announce', announce);
        }
    }, {
        key: "firstPaint",
        value: function firstPaint() {
            var _this2 = this;

            _get(AnnounceItem.prototype.__proto__ || Object.getPrototypeOf(AnnounceItem.prototype), "firstPaint", this).call(this);
            store.register("announceHistoryMap/" + this.props.aIncId, function () {
                _this2.setProps(_this2.props);
                _this2.paint();
            });
        }
    }]);

    return AnnounceItem;
}(widget_1.Widget);

exports.AnnounceItem = AnnounceItem;
})