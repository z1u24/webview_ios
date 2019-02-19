_$define("app/view/wallet/cloudWallet/rechargeKT", function (require, exports, module){
"use strict";
/**
 * 充值KT
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = require("../../../../pi/widget/widget");
var forelet_1 = require("../../../../pi/widget/forelet");
var memstore_1 = require("../../../store/memstore");
var tools_1 = require("../../../utils/tools");
var interface_1 = require("../../../store/interface");
var pull_1 = require("../../../net/pull");
var root_1 = require("../../../../pi/ui/root");
var pay_1 = require("../../../utils/pay");
var unitTools_1 = require("../../../utils/unitTools");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var RechargeKT = function (_widget_1$Widget) {
    _inherits(RechargeKT, _widget_1$Widget);

    function RechargeKT() {
        _classCallCheck(this, RechargeKT);

        var _this = _possibleConstructorReturn(this, (RechargeKT.__proto__ || Object.getPrototypeOf(RechargeKT)).call(this));

        _this.props = {
            payType: 'wxpay',
            payList: [{ KTnum: 20, sellPrize: 20 }, { KTnum: 50, sellPrize: 50 }, { KTnum: 100, sellPrize: 100 }, { KTnum: 200, sellPrize: 200 }, { KTnum: 500, sellPrize: 500 }, { KTnum: 1000, sellPrize: 1000 }],
            giveST: 0,
            selectPayItem: {},
            STprice: 1,
            total: 0,
            num: 0.00
        };
        return _this;
    }

    _createClass(RechargeKT, [{
        key: "create",
        value: function create() {
            _get(RechargeKT.prototype.__proto__ || Object.getPrototypeOf(RechargeKT.prototype), "create", this).call(this);
            pull_1.getGoldPrice(1);
            setTimeout(function () {
                pull_1.getGoldPrice(1);
            }, 500000);
        }
    }, {
        key: "initData",
        value: function initData() {
            this.props.STprice = memstore_1.getStore('third/goldPrice/price');
            this.paint();
        }
    }, {
        key: "rechargeClick",
        value: function rechargeClick() {
            var _this2 = this;

            if (this.props.total < 20) {
                tools_1.popNewMessage({ zh_Hans: '最少充值20KT', zh_Hant: '最少充值20KT', en: '' });
                return;
            }
            var orderDetail = {
                total: this.props.total * 100,
                body: 'KT',
                num: unitTools_1.kt2kpt(this.props.num),
                payType: this.props.payType,
                type: interface_1.CloudCurrencyType.KT // 充值类型
            };
            pay_1.confirmPay(orderDetail, function (res) {
                _this2.props.num = 0.00;
                _this2.props.total = 0.00;
                _this2.props.payType = 'alipay';
                root_1.popNew('app-view-wallet-cloudWalletGT-transactionDetails', { oid: res.oid, firstQuery: true });
                pull_1.getServerCloudBalance();
                pull_1.getAccountDetail(interface_1.CloudCurrencyType[100], 1);
                _this2.paint();
            }, function () {
                pull_1.getServerCloudBalance();
            });
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
         * 修改支付KT数量的选择
         */

    }, {
        key: "changePayItem",
        value: function changePayItem(index) {
            if (index !== -1) {
                this.props.selectPayItem = this.props.payList[index];
                this.props.num = this.props.selectPayItem.KTnum;
                this.props.total = this.props.num * 1;
                this.props.giveST = Math.floor(this.props.num / (this.props.STprice * 1.15) * 100) / 100;
            } else {
                this.props.selectPayItem = {};
                this.props.num = 0;
                this.props.total = this.props.num * 1;
                this.props.giveST = 0;
            }
            this.paint();
        }
        /**
         * 修改充值金额
         */

    }, {
        key: "amountChange",
        value: function amountChange(e) {
            this.changePayItem(-1);
            if (e.value === '') {
                this.props.total = 0;
            } else {
                this.props.total = e.value;
            }
            this.props.num = this.props.total / 1;
            this.props.giveST = Math.floor(this.props.num / (this.props.STprice * 1.15) * 100) / 100;
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

    return RechargeKT;
}(widget_1.Widget);

exports.RechargeKT = RechargeKT;
// 余额变化
memstore_1.register('cloud/cloudWallets', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
})