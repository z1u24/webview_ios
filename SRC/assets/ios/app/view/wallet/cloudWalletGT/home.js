_$define("app/view/wallet/cloudWalletGT/home", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ST 交易记录主页
 */
var root_1 = require("../../../../pi/ui/root");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var pull_1 = require("../../../net/pull");
var interface_1 = require("../../../store/interface");
var memstore_1 = require("../../../store/memstore");
// tslint:disable-next-line:max-line-length
var tools_1 = require("../../../utils/tools");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var CloudWalletHome = function (_widget_1$Widget) {
    _inherits(CloudWalletHome, _widget_1$Widget);

    function CloudWalletHome() {
        _classCallCheck(this, CloudWalletHome);

        return _possibleConstructorReturn(this, (CloudWalletHome.__proto__ || Object.getPrototypeOf(CloudWalletHome)).apply(this, arguments));
    }

    _createClass(CloudWalletHome, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(CloudWalletHome.prototype.__proto__ || Object.getPrototypeOf(CloudWalletHome.prototype), "setProps", this).call(this, props, oldProps);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            var currencyName = this.props.currencyName;
            var balance = tools_1.formatBalance(memstore_1.getCloudBalances().get(interface_1.CloudCurrencyType[currencyName]));
            var balanceValue = tools_1.formatBalanceValue(tools_1.fetchBalanceValueOfCoin('ST', balance));
            var color = memstore_1.getStore('setting/changeColor', 'redUp');
            this.props = Object.assign({}, this.props, { tabs: [{
                    tab: { zh_Hans: '全部', zh_Hant: '全部', en: '' },
                    components: 'app-view-wallet-cloudWalletGT-totalRecord'
                }, {
                    tab: { zh_Hans: '入账', zh_Hant: '入賬', en: '' },
                    components: 'app-view-wallet-cloudWalletGT-rechargeRecord'
                }, {
                    tab: { zh_Hans: '出账', zh_Hant: '出賬', en: '' },
                    components: 'app-view-wallet-cloudWalletGT-withdrawRecord'
                }], activeNum: 0, gain: tools_1.fetchGTGain(), rate: tools_1.formatBalanceValue(tools_1.fetchBalanceValueOfCoin('ST', 1)), balance: balance,
                balanceValue: balanceValue, currencyUnitSymbol: tools_1.getCurrencyUnitSymbol(), redUp: color === 'redUp' });
        }
    }, {
        key: "updateBalance",
        value: function updateBalance() {
            var currencyName = this.props.currencyName;
            this.props.balance = memstore_1.getCloudBalances().get(interface_1.CloudCurrencyType[currencyName]);
            this.props.balanceValue = tools_1.formatBalanceValue(tools_1.fetchBalanceValueOfCoin('ST', this.props.balance));
            this.props.gain = tools_1.fetchGTGain();
            this.props.rate = tools_1.formatBalanceValue(tools_1.fetchBalanceValueOfCoin('ST', 1));
            this.paint();
        }
    }, {
        key: "tabsChangeClick",
        value: function tabsChangeClick(event, value) {
            this.props.activeNum = value;
            this.paint();
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
        /**
         * 充值
         */

    }, {
        key: "rechargeClick",
        value: function rechargeClick() {
            // popNew('app-view-wallet-cloudWalletGT-transactionDetails',{ oid:'100' });
            root_1.popNew('app-view-wallet-cloudWalletGT-rechargeGT');
        }
        /**
         * 更新事件
         */

    }, {
        key: "initEvent",
        value: function initEvent() {
            pull_1.getAccountDetail(this.props.currencyName, 0);
            // getRechargeLogs(this.props.currencyName);
            // getWithdrawLogs(this.props.currencyName);
        }
    }, {
        key: "currencyUnitChange",
        value: function currencyUnitChange() {
            this.props.currencyUnitSymbol = tools_1.getCurrencyUnitSymbol();
            this.paint();
        }
        /**
         * 刷新页面
         */

    }, {
        key: "refreshPage",
        value: function refreshPage() {
            this.initEvent();
        }
    }]);

    return CloudWalletHome;
}(widget_1.Widget);

exports.CloudWalletHome = CloudWalletHome;
// ===========================
// 余额变化
memstore_1.register('cloud/cloudWallets', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateBalance();
    }
});
// 汇率变化
memstore_1.register('third/USD2CNYRate', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateBalance();
    }
});
// 金价变化
memstore_1.register('third/goldPrice', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateBalance();
    }
});
// 货币单位变化
memstore_1.register('setting/currencyUnit', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.currencyUnitChange();
    }
});
})