_$define("app/view/earn/redEnvelope/sendRedEnv", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * sendRedEnv
 */
var shareToPlatforms_1 = require("../../../../pi/browser/shareToPlatforms");
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var pull_1 = require("../../../net/pull");
var interface_1 = require("../../../store/interface");
var tools_1 = require("../../../utils/tools");

var SendRedEnv = function (_widget_1$Widget) {
    _inherits(SendRedEnv, _widget_1$Widget);

    function SendRedEnv() {
        _classCallCheck(this, SendRedEnv);

        return _possibleConstructorReturn(this, (SendRedEnv.__proto__ || Object.getPrototypeOf(SendRedEnv)).apply(this, arguments));
    }

    _createClass(SendRedEnv, [{
        key: "create",
        value: function create() {
            _get(SendRedEnv.prototype.__proto__ || Object.getPrototypeOf(SendRedEnv.prototype), "create", this).call(this);
            this.state = {
                cfgData: tools_1.getLanguage(this)
            };
        }
        /**
         * 发红包
         */

    }, {
        key: "sendRedEnv",
        value: function sendRedEnv() {
            var url = '';
            var title = '';
            if (this.props.rtype === 0) {
                // tslint:disable-next-line:max-line-length
                url = pull_1.sharePerUrl + "?type=" + interface_1.RedEnvelopeType.Normal + "&rid=" + this.props.rid + "&lm=" + window.encodeURIComponent(this.props.message);
                title = this.state.cfgData.redEnvType[0];
            } else if (this.props.rtype === 1) {
                // tslint:disable-next-line:max-line-length
                url = pull_1.sharePerUrl + "?type=" + interface_1.RedEnvelopeType.Random + "&rid=" + this.props.rid + "&lm=" + window.encodeURIComponent(this.props.message);
                title = this.state.cfgData.redEnvType[1];
            } else {
                url = pull_1.sharePerUrl + "?cid=" + this.props.rid + "&type=" + interface_1.RedEnvelopeType.Invite;
                title = this.state.cfgData.redEnvType[2];
            }
            root_1.popNew('app-components-share-share', {
                shareType: shareToPlatforms_1.ShareToPlatforms.TYPE_LINK,
                url: url,
                title: title,
                content: this.props.message
            });
            console.error(url);
            // this.backPrePage();
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }]);

    return SendRedEnv;
}(widget_1.Widget);

exports.SendRedEnv = SendRedEnv;
})