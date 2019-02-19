_$define("app/view/mine/other/shareDownload", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 分享下载链接页面
 */
var shareToPlatforms_1 = require("../../../../pi/browser/shareToPlatforms");
var root_1 = require("../../../../pi/ui/root");
var lang_1 = require("../../../../pi/util/lang");
var widget_1 = require("../../../../pi/widget/widget");
var native_1 = require("../../../logic/native");
var tools_1 = require("../../../utils/tools");

var ShareDownload = function (_widget_1$Widget) {
    _inherits(ShareDownload, _widget_1$Widget);

    function ShareDownload() {
        _classCallCheck(this, ShareDownload);

        return _possibleConstructorReturn(this, (ShareDownload.__proto__ || Object.getPrototypeOf(ShareDownload)).apply(this, arguments));
    }

    _createClass(ShareDownload, [{
        key: "create",
        value: function create() {
            _get(ShareDownload.prototype.__proto__ || Object.getPrototypeOf(ShareDownload.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.language = this.config.value[lang_1.getLang()];
            var userInfo = tools_1.getUserInfo();
            this.props = {
                nickName: userInfo.nickName,
                avatar: userInfo.avatar
            };
        }
    }, {
        key: "firstPaint",
        value: function firstPaint() {
            console.log('firstPaint');
        }
    }, {
        key: "attach",
        value: function attach() {
            var _this2 = this;

            console.log('attach');
            setTimeout(function () {
                _this2.shareClick();
            }, 1000);
        }
    }, {
        key: "shareClick",
        value: function shareClick() {
            var _this3 = this;

            native_1.makeScreenShot(function () {
                root_1.popNew('app-components-share-share', { shareType: shareToPlatforms_1.ShareToPlatforms.TYPE_SCREEN });
            }, function () {
                root_1.popNew('app-components-message-message', { content: _this3.language.tips[0] });
            });
        }
    }, {
        key: "backClick",
        value: function backClick() {
            this.ok && this.ok();
        }
    }]);

    return ShareDownload;
}(widget_1.Widget);

exports.ShareDownload = ShareDownload;
})