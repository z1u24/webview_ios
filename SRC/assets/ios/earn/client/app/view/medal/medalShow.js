_$define("earn/client/app/view/medal/medalShow", function (require, exports, module){
"use strict";
/**
 * 勋章成就 --主页
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../../../pi/ui/root");
var widget_1 = require("../../../../../pi/widget/widget");
var rpc_1 = require("../../net/rpc");
var util_1 = require("../../utils/util");
var MedalType;
(function (MedalType) {
    MedalType[MedalType["rankMedal"] = 0] = "rankMedal";
    MedalType[MedalType["ACHVmedal"] = 1] = "ACHVmedal"; // 成就勋章
})(MedalType = exports.MedalType || (exports.MedalType = {}));

var MedalShow = function (_widget_1$Widget) {
    _inherits(MedalShow, _widget_1$Widget);

    function MedalShow() {
        _classCallCheck(this, MedalShow);

        var _this = _possibleConstructorReturn(this, (MedalShow.__proto__ || Object.getPrototypeOf(MedalShow)).apply(this, arguments));

        _this.props = {
            pi_norouter: true,
            medalImg: '',
            medalSite: {},
            imgScale: 1,
            moveX: 0,
            moveY: 0,
            condition: 0,
            medalTitle: {} // 勋章称号
        };
        return _this;
    }

    _createClass(MedalShow, [{
        key: "setProps",
        value: function setProps(props) {
            _get(MedalShow.prototype.__proto__ || Object.getPrototypeOf(MedalShow.prototype), "setProps", this).call(this, this.props);
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
            this.props = Object.assign({}, this.props, { medalId: props.medalId, medalImg: "medal" + props.medalId, medalSite: props.medalSite, isHave: props.isHave, medalType: props.medalType });
        }
    }, {
        key: "attach",
        value: function attach() {
            this.computeSite();
        }
        /**
         * 计算原来位置、大小
         */

    }, {
        key: "computeSite",
        value: function computeSite() {
            var _this2 = this;

            var $medal = document.getElementById('medalShow').getBoundingClientRect();
            var clientWidth = document.documentElement.clientWidth;
            var scaling = clientWidth / 750; // 页面缩放比例
            this.props.imgScale = this.props.medalSite.width / $medal.width;
            this.props.moveX = Math.round(this.props.medalSite.left - $medal.left - ($medal.width - this.props.medalSite.width) / 2) / scaling;
            this.props.moveY = Math.round(this.props.medalSite.top - $medal.top - ($medal.height - this.props.medalSite.height) / 2) / scaling;
            this.paint();
            setTimeout(function () {
                _this2.props.imgScale = 1;
                _this2.props.moveX = 0;
                _this2.props.moveY = 0;
                _this2.paint();
            }, 200);
        }
        /**
         * 挂出去展示勋章
         */

    }, {
        key: "putoutMedal",
        value: function putoutMedal() {
            var _this3 = this;

            rpc_1.showMedal(this.props.medalId).then(function (res) {
                if (res.resultNum === 1) {
                    root_1.popNew('app-components1-message-message', { content: _this3.config.value.tips[0] });
                    rpc_1.getRankList();
                } else {
                    root_1.popNew('app-components1-message-message', { content: _this3.config.value.tips[1] });
                }
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

    return MedalShow;
}(widget_1.Widget);

exports.MedalShow = MedalShow;
})