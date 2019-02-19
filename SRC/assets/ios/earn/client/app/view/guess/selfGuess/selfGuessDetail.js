_$define("earn/client/app/view/guess/selfGuess/selfGuessDetail", function (require, exports, module){
"use strict";
/**
 * 竞猜主页-我的-详情
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("../../../../../../app/logic/native");
var shareToPlatforms_1 = require("../../../../../../pi/browser/shareToPlatforms");
var root_1 = require("../../../../../../pi/ui/root");
var widget_1 = require("../../../../../../pi/widget/widget");

var SelfGuessDetail = function (_widget_1$Widget) {
    _inherits(SelfGuessDetail, _widget_1$Widget);

    function SelfGuessDetail() {
        _classCallCheck(this, SelfGuessDetail);

        var _this = _possibleConstructorReturn(this, (SelfGuessDetail.__proto__ || Object.getPrototypeOf(SelfGuessDetail)).apply(this, arguments));

        _this.props = {};
        return _this;
    }

    _createClass(SelfGuessDetail, [{
        key: "setProps",
        value: function setProps(props) {
            _get(SelfGuessDetail.prototype.__proto__ || Object.getPrototypeOf(SelfGuessDetail.prototype), "setProps", this).call(this, this.props);
            if (props.guessData) {
                this.props.guessData = props.guessData;
            }
            if (props.guessing) {
                this.props.guessing = props.guessing;
            }
            this.paint();
        }
    }, {
        key: "create",
        value: function create() {
            _get(SelfGuessDetail.prototype.__proto__ || Object.getPrototypeOf(SelfGuessDetail.prototype), "create", this).call(this);
            console.log();
        }
        /**
         * 分享
         */

    }, {
        key: "shareClick",
        value: function shareClick() {
            var _this2 = this;

            native_1.makeScreenShot(function () {
                root_1.popNew('app-components-share-share', { shareType: shareToPlatforms_1.ShareToPlatforms.TYPE_SCREEN });
            }, function () {
                root_1.popNew('app-components1-message-message', { content: _this2.config.value.tips });
            });
        }
        /**
         * 继续竞猜
         */

    }, {
        key: "continueGuess",
        value: function continueGuess() {
            root_1.popNew('earn-client-app-view-guess-allGuess-guessDetail', { guessData: this.props.guessData });
        }
        /**
         * 返回
         */

    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }]);

    return SelfGuessDetail;
}(widget_1.Widget);

exports.SelfGuessDetail = SelfGuessDetail;
})