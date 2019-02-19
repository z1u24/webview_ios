_$define("app/view/wallet/cloudWalletGT/transactionDetails", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var pay_1 = require("../../../utils/pay");
var tools_1 = require("../../../utils/tools");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');
var PayState;
(function (PayState) {
    PayState[PayState["\u672A\u652F\u4ED8"] = 0] = "\u672A\u652F\u4ED8";
    PayState[PayState["\u652F\u4ED8\u6210\u529F"] = 1] = "\u652F\u4ED8\u6210\u529F";
    PayState[PayState["\u652F\u4ED8\u5F02\u5E38"] = 2] = "\u652F\u4ED8\u5F02\u5E38";
    PayState[PayState["\u67E5\u8BE2\u5931\u8D25"] = 3] = "\u67E5\u8BE2\u5931\u8D25";
})(PayState || (PayState = {}));

var TransactionDetails = function (_widget_1$Widget) {
    _inherits(TransactionDetails, _widget_1$Widget);

    function TransactionDetails() {
        _classCallCheck(this, TransactionDetails);

        var _this = _possibleConstructorReturn(this, (TransactionDetails.__proto__ || Object.getPrototypeOf(TransactionDetails)).apply(this, arguments));

        _this.props = {
            oid: '',
            firstQuery: false,
            state: '失败',
            transactionTime: '0',
            transactionType: '未支付',
            money: 0,
            GTNum: 0
        };
        return _this;
    }

    _createClass(TransactionDetails, [{
        key: "setProps",
        value: function setProps(props) {
            this.props.oid = props.oid;
            this.props.firstQuery = props.firstQuery || false;
            _get(TransactionDetails.prototype.__proto__ || Object.getPrototypeOf(TransactionDetails.prototype), "setProps", this).call(this, this.props);
            this.initData();
        }
        /**
         * 获取数据
         */

    }, {
        key: "initData",
        value: function initData() {
            var _this2 = this;

            if (this.props.firstQuery) {
                pay_1.getPayState(this.props.oid, function (res) {
                    _this2.setData(res);
                }, function (err) {
                    _this2.props.state = PayState[3];
                    _this2.paint();
                });
            } else {
                pay_1.getOrderDetail(this.props.oid, function (res) {
                    _this2.setData(res);
                }, function (err) {
                    _this2.props.state = PayState[3];
                    _this2.paint();
                });
            }
        }
    }, {
        key: "setData",
        value: function setData(res) {
            this.props.state = PayState[res.state];
            this.props.GTNum = res.num / 1000000;
            this.props.money = res.total / 100;
            this.props.transactionTime = tools_1.timestampFormat(res.time * 1000);
            this.props.transactionType = res.payType === 'alipay' ? '支付宝支付' : '微信支付';
            this.paint();
        }
        /**
         * 返回
         */

    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }]);

    return TransactionDetails;
}(widget_1.Widget);

exports.TransactionDetails = TransactionDetails;
})