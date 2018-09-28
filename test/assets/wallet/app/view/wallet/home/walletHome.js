_$define("app/view/wallet/home/walletHome", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * wallet home
 */
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var tools_1 = require("../../../utils/tools");
var forelet_1 = require("../../../../pi/widget/forelet");
var store_1 = require("../../../store/store");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var WalletHome = function (_widget_1$Widget) {
    _inherits(WalletHome, _widget_1$Widget);

    function WalletHome() {
        _classCallCheck(this, WalletHome);

        return _possibleConstructorReturn(this, (WalletHome.__proto__ || Object.getPrototypeOf(WalletHome)).apply(this, arguments));
    }

    _createClass(WalletHome, [{
        key: "create",
        value: function create() {
            _get(WalletHome.prototype.__proto__ || Object.getPrototypeOf(WalletHome.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.state = {
                totalAsset: tools_1.formatBalanceValue(tools_1.fetchTotalAssets()),
                assetList: tools_1.fetchWalletAssetList()
            };
        }
    }, {
        key: "updateBalance",
        value: function updateBalance() {
            this.state.totalAsset = tools_1.formatBalanceValue(tools_1.fetchTotalAssets());
            this.state.assetList = tools_1.fetchWalletAssetList();
            this.paint();
        }
        // 添加资产

    }, {
        key: "addAssetClick",
        value: function addAssetClick() {
            if (!tools_1.hasWallet()) return;
            root_1.popNew('app-view-wallet-localWallet-addAsset');
        }
        // 条目点击

    }, {
        key: "itemClick",
        value: function itemClick(e) {
            if (!tools_1.hasWallet()) return;
            var index = e.index;
            var v = this.state.assetList[index];
            root_1.popNew('app-view-wallet-transaction-home', { currencyName: v.currencyName, gain: v.gain });
        }
    }]);

    return WalletHome;
}(widget_1.Widget);

exports.WalletHome = WalletHome;
// ==================本地
// 当前钱包变化
store_1.register('curWallet', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateBalance();
    }
});
//地址变化
store_1.register('addrs', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateBalance();
    }
});
// 汇率变化
store_1.register('exchangeRateJson', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateBalance();
    }
});
// 货币涨跌幅度变化
store_1.register('coinGain', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateBalance();
    }
});
})