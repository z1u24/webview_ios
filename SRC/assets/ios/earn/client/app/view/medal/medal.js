_$define("earn/client/app/view/medal/medal", function (require, exports, module){
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
var native_1 = require("../../../../../app/logic/native");
var shareToPlatforms_1 = require("../../../../../pi/browser/shareToPlatforms");
var root_1 = require("../../../../../pi/ui/root");
var forelet_1 = require("../../../../../pi/widget/forelet");
var painter_1 = require("../../../../../pi/widget/painter");
var widget_1 = require("../../../../../pi/widget/widget");
var rpc_1 = require("../../net/rpc");
var memstore_1 = require("../../store/memstore");
var util_1 = require("../../utils/util");
var dataEnum_s_1 = require("../../xls/dataEnum.s");
var medalShow_1 = require("./medalShow");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var Medal = function (_widget_1$Widget) {
    _inherits(Medal, _widget_1$Widget);

    function Medal() {
        _classCallCheck(this, Medal);

        return _possibleConstructorReturn(this, (Medal.__proto__ || Object.getPrototypeOf(Medal)).apply(this, arguments));
    }

    _createClass(Medal, [{
        key: "create",
        value: function create() {
            _get(Medal.prototype.__proto__ || Object.getPrototypeOf(Medal.prototype), "create", this).call(this);
            this.props = {
                scrollHeight: 0,
                medalList: [{
                    name: '平民',
                    title: this.config.value.rankName[0],
                    medal: []
                }, {
                    name: '中产',
                    title: this.config.value.rankName[1],
                    medal: []
                }, {
                    name: '富人',
                    title: this.config.value.rankName[2],
                    medal: []
                }],
                mineMedal: {
                    rankMedal: 8000,
                    desc: { zh_Hans: '无', zh_Hant: '无', en: '' },
                    nextNeedKt: 1,
                    nowClass: '无',
                    ktNum: 0
                },
                totalMedal: 0,
                collectMedal: 0
            };
            rpc_1.getKTbalance();
            this.initData();
        }
        /**
         * 更新props数据
         */

    }, {
        key: "initData",
        value: function initData() {
            var _this2 = this;

            var medalList = util_1.getMedalList(dataEnum_s_1.CoinType.KT, 'coinType');
            // this.props.mineMedal = computeRankMedal();
            var ktNum = memstore_1.getStore('balance/KT');

            var _loop = function _loop() {
                if (_isArray) {
                    if (_i >= _iterator.length) return "break";
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) return "break";
                    _ref = _i.value;
                }

                var element1 = _ref;

                element1.medal = [];
                medalList.forEach(function (element, i) {
                    var medal = { title: { zh_Hans: element.desc, zh_Hant: element.descHant, en: '' }, img: "medal" + element.id, id: element.id, isHave: false };
                    if (element.coinNum < ktNum) {
                        medal.isHave = true;
                        _this2.props.mineMedal.rankMedal = element.id;
                        _this2.props.mineMedal.desc = medal.title;
                        _this2.props.mineMedal.nextNeedKt = medalList[i + 1].coinNum - ktNum;
                        _this2.props.mineMedal.nowClass = element.typeNum;
                        _this2.props.mineMedal.ktNum = ktNum;
                    }
                    if (element1.name === element.typeNum) {
                        // 添加到勋章等级列表
                        element1.medal.push(medal);
                    }
                });
            };

            for (var _iterator = this.props.medalList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                var _ret = _loop();

                if (_ret === "break") break;
            }
            console.log(this.props.medalList);
            console.log(this.props.mineMedal);
            this.props.totalMedal = util_1.getACHVmedalList('偶然成就', 'typeNum').length;
            rpc_1.getACHVmedal().then(function (res) {
                _this2.props.collectMedal = res.achievements.length;
                _this2.paint();
            });
            this.paint();
        }
        /**
         * 勋章展示
         */

    }, {
        key: "medalShow",
        value: function medalShow(e, medalId) {
            var _this3 = this;

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
                medalId: medalId,
                medalSite: medalSite,
                isHave: this.props.mineMedal.rankMedal >= medalId,
                medalType: medalShow_1.MedalType.rankMedal
            }, function () {
                $realDomStyle.visibility = "visible";
                _this3.paint();
            });
            this.paint();
        }
        /**
         * 分享
         */

    }, {
        key: "shareClick",
        value: function shareClick() {
            var _this4 = this;

            native_1.makeScreenShot(function () {
                root_1.popNew('app-components-share-share', { shareType: shareToPlatforms_1.ShareToPlatforms.TYPE_SCREEN });
            }, function () {
                root_1.popNew('app-components1-message-message', { content: _this4.config.value.tips });
            });
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
         * 跳转我的收藏
         */

    }, {
        key: "goMyCollect",
        value: function goMyCollect() {
            root_1.popNew('earn-client-app-view-medal-collect');
        }
        /**
         * 刷新页面
         */

    }, {
        key: "refresh",
        value: function refresh() {
            this.initData();
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

    return Medal;
}(widget_1.Widget);

exports.Medal = Medal;
// ===================================================== 立即执行
memstore_1.register('good', function (goods) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    w && w.initData();
});
memstore_1.register('balance/KT', function (goods) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    w && w.initData();
});
})