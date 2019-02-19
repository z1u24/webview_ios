_$define("earn/client/app/view/components/newMedalAlert", function (require, exports, module){
"use strict";
/**
 * 勋章成就 -- 新获勋章提示
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("../../../../../app/logic/native");
var shareToPlatforms_1 = require("../../../../../pi/browser/shareToPlatforms");
var root_1 = require("../../../../../pi/ui/root");
var widget_1 = require("../../../../../pi/widget/widget");
var memstore_1 = require("../../store/memstore");
var util_1 = require("../../utils/util");

var NewMedalAlert = function (_widget_1$Widget) {
    _inherits(NewMedalAlert, _widget_1$Widget);

    function NewMedalAlert() {
        _classCallCheck(this, NewMedalAlert);

        var _this = _possibleConstructorReturn(this, (NewMedalAlert.__proto__ || Object.getPrototypeOf(NewMedalAlert)).apply(this, arguments));

        _this.props = {
            medalId: 0,
            medalType: 0,
            medalImg: '',
            condition: 0,
            medalTitle: {},
            userInfo: memstore_1.getStore('userInfo')
        };
        return _this;
    }

    _createClass(NewMedalAlert, [{
        key: "setProps",
        value: function setProps(props) {
            _get(NewMedalAlert.prototype.__proto__ || Object.getPrototypeOf(NewMedalAlert.prototype), "setProps", this).call(this, this.props);
            var medalInfo = void 0;
            if (props.medalType === 0) {
                medalInfo = util_1.getMedalList(props.medalId, 'id');
                this.props.condition = medalInfo[0].coinNum;
                this.props.medalTitle = { zh_Hans: medalInfo[0].desc, zh_Hant: medalInfo[0].descHant, en: '' };
            } else if (props.medalType === 1) {
                medalInfo = util_1.getACHVmedalList(props.medalId, 'id');
                this.props.condition = '挖到0.5ETH取得成就';
                this.props.medalTitle = { zh_Hans: medalInfo[0].desc, zh_Hant: medalInfo[0].descHant, en: '' };
            }
            this.props = Object.assign({}, this.props, { medalImg: "medal" + props.medalId, medalId: props.medalId, medalType: props.medalType });
            console.log(this.props);
        }
    }, {
        key: "shareWX",
        value: function shareWX() {
            var _this2 = this;

            native_1.makeScreenShot(function () {
                var stp = new shareToPlatforms_1.ShareToPlatforms();
                stp.init();
                stp.shareScreenShot({
                    success: function success(result) {
                        console.log('share success callback');
                    },
                    fail: function fail(result) {
                        console.log('share fail callback');
                    },
                    platform: shareToPlatforms_1.ShareToPlatforms.PLATFORM_WEBCHAT
                });
            }, function () {
                root_1.popNew('app-components1-message-message', { content: _this2.config.value.tips });
            });
        }
        /**
         * 返回上一页
         */

    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }]);

    return NewMedalAlert;
}(widget_1.Widget);

exports.NewMedalAlert = NewMedalAlert;
})