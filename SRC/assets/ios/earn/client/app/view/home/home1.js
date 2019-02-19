_$define("earn/client/app/view/home/home1", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * earn home
 */
// ================================ 导入
var tools_1 = require("../../../../../app/utils/tools");
var root_1 = require("../../../../../pi/ui/root");
var lang_1 = require("../../../../../pi/util/lang");
var forelet_1 = require("../../../../../pi/widget/forelet");
var widget_1 = require("../../../../../pi/widget/widget");
var memstore_1 = require("../../store/memstore");
var util_1 = require("../../utils/util");
var hoeType_s_1 = require("../../xls/hoeType.s");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var EarnHome = function (_widget_1$Widget) {
    _inherits(EarnHome, _widget_1$Widget);

    function EarnHome() {
        _classCallCheck(this, EarnHome);

        return _possibleConstructorReturn(this, (EarnHome.__proto__ || Object.getPrototypeOf(EarnHome)).apply(this, arguments));
    }

    _createClass(EarnHome, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(EarnHome.prototype.__proto__ || Object.getPrototypeOf(EarnHome.prototype), "setProps", this).call(this, props, oldProps);
            this.init();
        }
        /**
         * 初始化数据
         */

    }, {
        key: "init",
        value: function init() {
            var _this2 = this;

            this.language = this.config.value[lang_1.getLang()];
            var mine = memstore_1.getStore('mine');
            console.log('home--------mine-----------------', mine);
            this.props = Object.assign({}, this.props, { scroll: false, scrollHeight: 0, refresh: false, avatar: '../../res/image1/default_avatar.png', hotActivities: [{
                    img: 'btn_yun_1.png',
                    title: '每日登录',
                    desc: '连续登录有大奖',
                    components: 'earn-client-app-view-activity-signIn'
                }, {
                    img: 'btn_yun_2.png',
                    title: '做任务',
                    desc: '可以抽奖兑换物品',
                    components: 'app-view-earn-mining-addMine'
                }, {
                    img: 'btn_yun_3.png',
                    title: '邀请好友',
                    desc: '累计邀请有好礼',
                    components: 'earn-client-app-view-activity-inviteFriend'
                }, {
                    img: 'btn_yun_4.png',
                    title: '验证手机',
                    desc: '确认是真实用户',
                    components: 'app-view-mine-setting-phone'
                }], applicationWelfares: [{
                    img: 'btn_yun_5.png',
                    title: '领分红',
                    desc: '根据KT领分红',
                    components: 'app-view-earn-mining-dividend'
                }, {
                    img: 'btn_yun_6.png',
                    title: '发红包',
                    desc: '试试朋友的手气',
                    components: 'app-view-earn-redEnvelope-writeRedEnv'
                }, {
                    img: 'btn_yun_7.png',
                    title: '充KT送ST',
                    desc: '赠品可以玩游戏',
                    components: 'app-view-wallet-cloudWallet-rechargeKT'
                }, {
                    img: 'btn_yun_8.png',
                    title: '兑换码',
                    desc: '兑换礼物和红包',
                    components: 'app-view-earn-exchange-exchange'
                }], ironHoe: util_1.getHoeCount(hoeType_s_1.HoeType.IronHoe), goldHoe: util_1.getHoeCount(hoeType_s_1.HoeType.GoldHoe), diamondHoe: util_1.getHoeCount(hoeType_s_1.HoeType.DiamondHoe), hoeType: hoeType_s_1.HoeType, hoeSelected: -1, maxMineType: util_1.getMaxMineType(), upAnimate: '', downAnimate: '', animateStart: false, miningKTnum: mine.miningKTnum, miningRank: mine.miningRank, miningMedalId: mine.miningMedalId });
            this.paint();
            setTimeout(function () {
                _this2.scrollPage();
            }, 17);
            // this.getMiningInfo();
            // console.log(this.props.hoeType);
        }
        /**
         * 热门活动进入
         */

    }, {
        key: "goHotActivity",
        value: function goHotActivity(ind) {
            if (!tools_1.hasWallet()) return;
            var page = this.props.hotActivities[ind].components;
            root_1.popNew(page);
        }
        /**
         * 应用福利
         */

    }, {
        key: "goApplicationWelfares",
        value: function goApplicationWelfares(ind) {
            if (!tools_1.hasWallet()) return;
            var page = this.props.applicationWelfares[ind].components;
            root_1.popNew(page);
        }
        /**
         * 挖矿点击展开
         */

    }, {
        key: "miningClick",
        value: function miningClick() {
            if (!tools_1.hasWallet()) return;
            this.props.upAnimate = 'put-out-up';
            this.props.downAnimate = 'put-out-down';
            this.props.animateStart = true;
            memstore_1.setStore('flags/earnHomeHidden', true);
            setTimeout(function () {
                document.getElementById('earn-home').scrollTop = 0;
            }, 500);
            this.paint();
        }
        /**
         * 屏幕滑动
         */

    }, {
        key: "scrollPage",
        value: function scrollPage() {
            var scrollTop = document.getElementById('earn-home').scrollTop;
            this.props.scrollHeight = scrollTop;
            if (scrollTop > 0) {
                this.props.scroll = true;
                if (this.props.scroll) {
                    this.paint();
                }
            } else {
                this.props.scroll = false;
                this.paint();
            }
        }
        /**
         * 刷新页面
         */

    }, {
        key: "refreshPage",
        value: function refreshPage() {
            var _this3 = this;

            this.props.refresh = true;
            this.paint();
            setTimeout(function () {
                _this3.props.refresh = false;
                _this3.paint();
            }, 1000);
        }
        /**
         * 获取挖矿排名信息
         */

    }, {
        key: "updateMiningInfo",
        value: function updateMiningInfo(mine) {
            this.props.miningRank = mine.miningRank;
            this.props.miningKTnum = mine.miningKTnum;
            this.props.miningMedalId = mine.miningMedalId;
            this.paint();
        }
        /**
         * 采矿说明点击..
         */

    }, {
        key: "miningInstructionsClick",
        value: function miningInstructionsClick() {
            root_1.popNew('earn-client-app-view-activity-miningRule');
        }
    }, {
        key: "goMineRank",
        value: function goMineRank() {
            if (!tools_1.hasWallet()) return;
            root_1.popNew('earn-client-app-view-mineRank-mineRank');
        }
    }]);

    return EarnHome;
}(widget_1.Widget);

exports.EarnHome = EarnHome;
// ===================================================== 本地
// ===================================================== 立即执行
memstore_1.register('flags/earnHomeHidden', function (earnHomeHidden) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (!earnHomeHidden) {
        w.props.upAnimate = 'reset-put-out';
        w.props.downAnimate = 'reset-put-out';
        setTimeout(function () {
            w.props.upAnimate = '';
            w.props.downAnimate = '';
            w.props.animateStart = false;
            w.paint();
        }, 500);
        w.paint();
    }
});
memstore_1.register('mine', function (mine) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    w && w.updateMiningInfo(mine);
});
})