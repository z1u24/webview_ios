_$define("app/view/wallet/transaction/home", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * transaction home
 */
var root_1 = require("../../../../pi/ui/root");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var store_1 = require("../../../store/store");
// tslint:disable-next-line:max-line-length
var tools_1 = require("../../../utils/tools");
var walletTools_1 = require("../../../utils/walletTools");
var dataCenter_1 = require("../../../logic/dataCenter");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var TransactionHome = function (_widget_1$Widget) {
    _inherits(TransactionHome, _widget_1$Widget);

    function TransactionHome() {
        _classCallCheck(this, TransactionHome);

        return _possibleConstructorReturn(this, (TransactionHome.__proto__ || Object.getPrototypeOf(TransactionHome)).apply(this, arguments));
    }

    _createClass(TransactionHome, [{
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(TransactionHome.prototype.__proto__ || Object.getPrototypeOf(TransactionHome.prototype), "setProps", this).call(this, props, oldProps);
            dataCenter_1.dataCenter.refreshTrans(tools_1.getCurrentAddrInfo(this.props.currencyName).addr, this.props.currencyName);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            var currencyName = this.props.currencyName;
            var balance = tools_1.formatBalance(tools_1.getCurrentAddrBalanceByCurrencyName(currencyName));
            var rate = store_1.getBorn('exchangeRateJson').get(currencyName).CNY;
            var balanceValue = rate * balance;
            var txList = this.parseTxList();
            var canConvert = this.canConvert();
            this.state = {
                balance: balance,
                balanceValue: tools_1.formatBalanceValue(balanceValue),
                rate: tools_1.formatBalanceValue(rate),
                txList: txList,
                canConvert: canConvert
            };
        }
        // 解析txList

    }, {
        key: "parseTxList",
        value: function parseTxList() {
            var currencyName = this.props.currencyName;
            var curAddr = tools_1.getCurrentAddrByCurrencyName(currencyName);
            var txList = walletTools_1.fetchTransactionList(curAddr, currencyName);
            txList.forEach(function (item) {
                item.TimeShow = tools_1.timestampFormat(item.time).slice(5);
                item.statusShow = tools_1.parseStatusShow(item).text;
                item.txTypeShow = tools_1.parseTxTypeShow(item.txType);
            });
            return txList;
        }
    }, {
        key: "canConvert",
        value: function canConvert() {
            var convertCurrencys = tools_1.currencyExchangeAvailable();
            for (var i = 0; i < convertCurrencys.length; i++) {
                if (convertCurrencys[i].symbol === this.props.currencyName) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: "txListItemClick",
        value: function txListItemClick(e, index) {
            root_1.popNew('app-view-wallet-transaction-transactionDetails', { hash: this.state.txList[index].hash });
        }
    }, {
        key: "doTransferClick",
        value: function doTransferClick() {
            root_1.popNew('app-view-wallet-transaction-transfer', { currencyName: this.props.currencyName });
        }
    }, {
        key: "doReceiptClick",
        value: function doReceiptClick() {
            root_1.popNew('app-view-wallet-transaction-receipt', { currencyName: this.props.currencyName });
        }
    }, {
        key: "chooseAddrClick",
        value: function chooseAddrClick() {
            root_1.popNew('app-view-wallet-transaction-chooseAddr', { currencyName: this.props.currencyName });
        }
    }, {
        key: "updateRate",
        value: function updateRate() {
            this.state.rate = tools_1.formatBalanceValue(store_1.getBorn('exchangeRateJson').get(this.props.currencyName).CNY);
            this.paint();
        }
    }, {
        key: "updateTransaction",
        value: function updateTransaction() {
            this.init();
            this.paint();
        }
    }, {
        key: "convertCurrencyClick",
        value: function convertCurrencyClick() {
            root_1.popNew('app-view-wallet-coinConvert-coinConvert', { currencyName: this.props.currencyName });
        }
    }]);

    return TransactionHome;
}(widget_1.Widget);

exports.TransactionHome = TransactionHome;
// ==========================本地
//地址变化
store_1.register('addrs', function (addrs) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.init();
        w.paint();
    }
});
// 汇率变化
store_1.register('exchangeRateJson', function (exchangeRateJson) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateRate();
    }
});
//当前钱包变化
store_1.register('curWallet', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.init();
        w.paint();
    }
});
//交易记录变化
store_1.register('transactions', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateTransaction();
    }
});
})