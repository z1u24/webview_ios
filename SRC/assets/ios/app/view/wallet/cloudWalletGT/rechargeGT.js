_$define("app/view/wallet/cloudWalletGT/rechargeGT", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ST 充值页面
 */
var root_1 = require("../../../../pi/ui/root");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var pull_1 = require("../../../net/pull");
var interface_1 = require("../../../store/interface");
var memstore_1 = require("../../../store/memstore");
var pay_1 = require("../../../utils/pay");
var tools_1 = require("../../../utils/tools");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var RechargeGT = function (_widget_1$Widget) {
    _inherits(RechargeGT, _widget_1$Widget);

    function RechargeGT() {
        _classCallCheck(this, RechargeGT);

        var _this = _possibleConstructorReturn(this, (RechargeGT.__proto__ || Object.getPrototypeOf(RechargeGT)).call(this));

        _this.props = {
            payType: 'wxpay',
            goldPrice: 200,
            total: 0,
            num: 0.00,
            balance: tools_1.formatBalance(memstore_1.getCloudBalances().get(interface_1.CloudCurrencyType.ST))
        };
        return _this;
    }

    _createClass(RechargeGT, [{
        key: "create",
        value: function create() {
            _get(RechargeGT.prototype.__proto__ || Object.getPrototypeOf(RechargeGT.prototype), "create", this).call(this);
            pull_1.getGoldPrice(1);
            setTimeout(function () {
                pull_1.getGoldPrice(1);
            }, 500000);
        }
    }, {
        key: "initData",
        value: function initData() {
            if (memstore_1.getStore('third/goldPrice/price') !== 0) {
                this.props.num = Math.floor(this.props.total / memstore_1.getStore('third/goldPrice/price') * 100 * 1000000) / 1000000;
            }
            this.props.balance = tools_1.formatBalance(memstore_1.getCloudBalances().get(interface_1.CloudCurrencyType.ST));
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
        /**
         * 修改支付方式
         * @param payType 支付方式
         */

    }, {
        key: "changPay",
        value: function changPay(payType) {
            this.props.payType = payType;
            this.paint();
        }
        /**
         * 修改金额
         */

    }, {
        key: "amountChange",
        value: function amountChange(e) {
            if (e.value === '') {
                this.props.total = 0;
            } else {
                this.props.total = parseFloat(e.value);
            }
            this.props.num = Math.floor(this.props.total / memstore_1.getStore('third/goldPrice/price') * 100 * 1000000) / 1000000;
            this.paint();
        }
        /**
         * 充值事件
         */

    }, {
        key: "rechargeClick",
        value: function rechargeClick() {
            var _this2 = this;

            if (this.props.total === 0) {
                tools_1.popNewMessage({ zh_Hans: '请输入充值GT数量', zh_Hant: '请输入充值GT数量', en: '' });
                return;
            }
            var orderDetail = {
                total: Math.floor(this.props.total * 100),
                body: 'ST',
                num: this.props.num * 1000000,
                payType: this.props.payType,
                type: interface_1.CloudCurrencyType.ST // 充值类型
            };
            pay_1.confirmPay(orderDetail, function (res) {
                _this2.props.num = 0.00;
                _this2.props.total = 0.00;
                _this2.props.payType = 'alipay';
                root_1.popNew('app-view-wallet-cloudWalletGT-transactionDetails', { oid: res.oid, firstQuery: true });
                pull_1.getServerCloudBalance();
                pull_1.getAccountDetail('ST', 1);
                _this2.paint();
            }, function () {
                pull_1.getServerCloudBalance();
            });
        }
    }]);

    return RechargeGT;
}(widget_1.Widget);

exports.RechargeGT = RechargeGT;
// gasPrice变化
memstore_1.register('third/goldPrice', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
// 余额变化
memstore_1.register('cloud/cloudWallets', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
})