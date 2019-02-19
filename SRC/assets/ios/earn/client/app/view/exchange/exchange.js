_$define("earn/client/app/view/exchange/exchange", function (require, exports, module){
"use strict";
/**
 * 奖券兑换-首页
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../../../pi/ui/root");
var forelet_1 = require("../../../../../pi/widget/forelet");
var widget_1 = require("../../../../../pi/widget/widget");
var rpc_1 = require("../../net/rpc");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var Exchange = function (_widget_1$Widget) {
    _inherits(Exchange, _widget_1$Widget);

    function Exchange() {
        _classCallCheck(this, Exchange);

        var _this = _possibleConstructorReturn(this, (Exchange.__proto__ || Object.getPrototypeOf(Exchange)).apply(this, arguments));

        _this.props = {
            list: []
        };
        return _this;
    }

    _createClass(Exchange, [{
        key: "create",
        value: function create() {
            _get(Exchange.prototype.__proto__ || Object.getPrototypeOf(Exchange.prototype), "create", this).call(this);
            this.initData();
        }
        /**
         * 初始数据
         */

    }, {
        key: "initData",
        value: function initData() {
            var _this2 = this;

            rpc_1.getExchangeVirtualList().then(function (res) {
                console.log(res);
                _this2.props.list = res.list;
                _this2.paint();
            });
            this.paint();
        }
        /**
         * 查看历史记录
         */

    }, {
        key: "goHistory",
        value: function goHistory() {
            root_1.popNew('earn-client-app-view-exchange-exchangeHistory');
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

    return Exchange;
}(widget_1.Widget);

exports.Exchange = Exchange;
// ===================================================== 立即执行
// register('goods',(goods:Item[]) => {
//     const w:any = forelet.getWidget(WIDGET_NAME);
//     w && w.initData();
// });
})