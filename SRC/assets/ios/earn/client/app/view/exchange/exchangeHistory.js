_$define("earn/client/app/view/exchange/exchangeHistory", function (require, exports, module){
"use strict";
/**
 * 奖券兑换 --兑换记录
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = require("../../../../../pi/widget/widget");
var rpc_1 = require("../../net/rpc");

var ExchangeHistory = function (_widget_1$Widget) {
    _inherits(ExchangeHistory, _widget_1$Widget);

    function ExchangeHistory() {
        _classCallCheck(this, ExchangeHistory);

        var _this = _possibleConstructorReturn(this, (ExchangeHistory.__proto__ || Object.getPrototypeOf(ExchangeHistory)).apply(this, arguments));

        _this.props = {
            type: 0,
            history: [
                // {
                //     img:'../../res/image/dividend_history_none.png',
                //     name:'haha',
                //     time:'2018.12.28'
                // }
            ]
        };
        return _this;
    }

    _createClass(ExchangeHistory, [{
        key: "create",
        value: function create() {
            _get(ExchangeHistory.prototype.__proto__ || Object.getPrototypeOf(ExchangeHistory.prototype), "create", this).call(this);
            this.initData();
        }
    }, {
        key: "initData",
        value: function initData() {
            var _this2 = this;

            rpc_1.getExchangeHistory().then(function (res) {
                _this2.props.history = res.awards;
                _this2.paint();
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

    return ExchangeHistory;
}(widget_1.Widget);

exports.ExchangeHistory = ExchangeHistory;
})