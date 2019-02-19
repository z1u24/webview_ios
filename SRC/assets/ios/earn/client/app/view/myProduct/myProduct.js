_$define("earn/client/app/view/myProduct/myProduct", function (require, exports, module){
"use strict";
/**
 * 我的物品、中奖记录
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../../../pi/ui/root");
var widget_1 = require("../../../../../pi/widget/widget");
var rpc_1 = require("../../net/rpc");

var MyProduct = function (_widget_1$Widget) {
    _inherits(MyProduct, _widget_1$Widget);

    function MyProduct() {
        _classCallCheck(this, MyProduct);

        var _this = _possibleConstructorReturn(this, (MyProduct.__proto__ || Object.getPrototypeOf(MyProduct)).apply(this, arguments));

        _this.props = {
            historyType: 0,
            history: []
        };
        return _this;
    }

    _createClass(MyProduct, [{
        key: "setProps",
        value: function setProps(props) {
            _get(MyProduct.prototype.__proto__ || Object.getPrototypeOf(MyProduct.prototype), "setProps", this).call(this, this.props);
            this.props = Object.assign({}, this.props, { historyType: props.type });
            this.initData();
        }
        /**
         * 初始化数据
         */

    }, {
        key: "initData",
        value: function initData() {
            var _this2 = this;

            rpc_1.getAwardHistory(this.props.historyType).then(function (res) {
                if (_this2.props.historyType === 0) {
                    var dealData = [];
                    res.forEach(function (element) {
                        if (element.pid < 2000 || element.pid > 2100) {
                            // 排除锄头系列
                            dealData.unshift(element);
                        }
                    });
                    _this2.props.history = dealData;
                } else {
                    _this2.props.history = res.reverse();
                }
                _this2.paint();
            });
        }
    }, {
        key: "goProductDetail",
        value: function goProductDetail(index) {
            if (this.props.history[index].pid > 500000) {
                // 虚拟物品进入详情
                root_1.popNew('earn-client-app-view-myProduct-productDetail', { name: this.props.history[index].name, detailhistoryType: 1 });
            }
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

    return MyProduct;
}(widget_1.Widget);

exports.MyProduct = MyProduct;
})