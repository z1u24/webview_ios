_$define("earn/client/app/view/medal/collect", function (require, exports, module){
"use strict";
/**
 * 我的收藏 --主页
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
var forelet_1 = require("../../../../../pi/widget/forelet");
var painter_1 = require("../../../../../pi/widget/painter");
var widget_1 = require("../../../../../pi/widget/widget");
var memstore_1 = require("../../store/memstore");
var util_1 = require("../../utils/util");
var medalShow_1 = require("./medalShow");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var Collect = function (_widget_1$Widget) {
    _inherits(Collect, _widget_1$Widget);

    function Collect() {
        _classCallCheck(this, Collect);

        var _this = _possibleConstructorReturn(this, (Collect.__proto__ || Object.getPrototypeOf(Collect)).apply(this, arguments));

        _this.props = {
            scrollHeight: 0,
            medalList: [],
            myCollect: [],
            percentage: 0
        };
        return _this;
    }

    _createClass(Collect, [{
        key: "create",
        value: function create() {
            var _this2 = this;

            _get(Collect.prototype.__proto__ || Object.getPrototypeOf(Collect.prototype), "create", this).call(this);
            var list = util_1.getACHVmedalList('偶然成就', 'typeNum');
            list.forEach(function (element) {
                var data = { title: { zh_Hans: element.desc, zh_Hant: element.descHant, en: '' }, img: "medal" + element.id, id: element.id, isHave: false };
                _this2.props.medalList.push(data);
            });
            this.initData();
        }
        /**
         * 更新props数据
         */

    }, {
        key: "initData",
        value: function initData() {
            var _this3 = this;

            this.props.myCollect = memstore_1.getStore('ACHVmedals');
            this.props.medalList.forEach(function (element) {
                element.isHave = _this3.props.myCollect.includes(element.id);
            });
            this.props.percentage = Math.floor(this.props.myCollect.length / this.props.medalList.length * 100);
            this.paint();
        }
        /**
         * 屏幕滑动
         */

    }, {
        key: "scrollPage",
        value: function scrollPage(e) {
            var scrollTop = e.target.scrollTop;
            this.props.scrollHeight = scrollTop;
            this.paint();
        }
        /**
         * 分享
         */

    }, {
        key: "shareClick",
        value: function shareClick() {
            var _this4 = this;

            // popNew('earn-client-app-view-components-newMedalAlert', {
            //     // tslint:disable-next-line:radix
            //     medalId:8001,
            //     medalType:''
            // });
            native_1.makeScreenShot(function () {
                root_1.popNew('app-components-share-share', { shareType: shareToPlatforms_1.ShareToPlatforms.TYPE_SCREEN });
            }, function () {
                root_1.popNew('app-components1-message-message', { content: _this4.config.value.tips });
            });
        }
        /**
         * 勋章展示
         */

    }, {
        key: "medalShow",
        value: function medalShow(e, index) {
            var _this5 = this;

            var $realDom = painter_1.getRealNode(e.node);
            var medalSite = {
                top: Math.floor($realDom.getBoundingClientRect().top),
                left: Math.floor($realDom.getBoundingClientRect().left),
                width: $realDom.getBoundingClientRect().width,
                height: $realDom.getBoundingClientRect().height
            };
            var $realDomStyle = $realDom.style;
            $realDomStyle.visibility = "hidden";
            root_1.popNew('earn-client-app-view-medal-medalShow', {
                medalId: this.props.medalList[index].id,
                medalSite: medalSite,
                isHave: this.props.medalList[index].isHave,
                medalType: medalShow_1.MedalType.ACHVmedal
            }, function () {
                $realDomStyle.visibility = "visible";
                _this5.paint();
            });
            this.paint();
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

    return Collect;
}(widget_1.Widget);

exports.Collect = Collect;
// ===================================================== 立即执行
memstore_1.register('ACHVmedals', function (r) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    w && w.initData();
});
})