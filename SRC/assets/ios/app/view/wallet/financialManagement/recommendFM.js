_$define("app/view/wallet/financialManagement/recommendFM", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 推荐理财
 */
var root_1 = require("../../../../pi/ui/root");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var pull_1 = require("../../../net/pull");
var memstore_1 = require("../../../store/memstore");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var RecommendFM = function (_widget_1$Widget) {
    _inherits(RecommendFM, _widget_1$Widget);

    function RecommendFM() {
        _classCallCheck(this, RecommendFM);

        return _possibleConstructorReturn(this, (RecommendFM.__proto__ || Object.getPrototypeOf(RecommendFM)).apply(this, arguments));
    }

    _createClass(RecommendFM, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(RecommendFM.prototype.__proto__ || Object.getPrototypeOf(RecommendFM.prototype), "setProps", this).call(this, props, oldProps);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.props = Object.assign({}, this.props, { productList: [] });
            if (this.props.isActive) {
                pull_1.getProductList();
            }
        }
    }, {
        key: "updateProductList",
        value: function updateProductList(productList) {
            this.props.productList = productList;
            this.paint();
        }
    }, {
        key: "fmListItemClick",
        value: function fmListItemClick(e, index) {
            var product = this.props.productList[index];
            root_1.popNew('app-view-wallet-financialManagement-productDetail', { product: product });
        }
    }]);

    return RecommendFM;
}(widget_1.Widget);

exports.RecommendFM = RecommendFM;
// 理财产品变化
memstore_1.register('activity/financialManagement/products', function (productList) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateProductList(productList);
    }
});
})