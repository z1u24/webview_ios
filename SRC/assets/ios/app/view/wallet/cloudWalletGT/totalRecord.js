_$define("app/view/wallet/cloudWalletGT/totalRecord", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * other record
 */
var root_1 = require("../../../../pi/ui/root");
var lang_1 = require("../../../../pi/util/lang");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var pull_1 = require("../../../net/pull");
var interface_1 = require("../../../store/interface");
var memstore_1 = require("../../../store/memstore");
var tools_1 = require("../../../utils/tools");
var walletTools_1 = require("../../../utils/walletTools");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var TotalRecord = function (_widget_1$Widget) {
    _inherits(TotalRecord, _widget_1$Widget);

    function TotalRecord() {
        _classCallCheck(this, TotalRecord);

        return _possibleConstructorReturn(this, (TotalRecord.__proto__ || Object.getPrototypeOf(TotalRecord)).apply(this, arguments));
    }

    _createClass(TotalRecord, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(TotalRecord.prototype.__proto__ || Object.getPrototypeOf(TotalRecord.prototype), "setProps", this).call(this, props, oldProps);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.language = this.config.value[lang_1.getLang()];
            this.props = Object.assign({}, this.props, { recordList: [], canLoadMore: false, isRefreshing: false });
            if (this.props.isActive) {
                pull_1.getAccountDetail(this.props.currencyName, 1);
            }
            this.updateRecordList();
        }
        /**
         * 更新交易列表
         */

    }, {
        key: "updateRecordList",
        value: function updateRecordList() {
            if (!this.props.currencyName) return;
            var cloudWallets = memstore_1.getStore('cloud/cloudWallets');
            var data = cloudWallets.get(interface_1.CloudCurrencyType[this.props.currencyName]).otherLogs;
            this.props.otherNext = data.start;
            this.props.recordList = this.parseList(data.list);
            this.props.recordList.sort(function (v1, v2) {
                return v2.time - v1.time;
            });
            this.props.canLoadMore = data.canLoadMore;
            this.props.isRefreshing = false;
            this.paint();
        }
        /**
         * 解析全部记录
         */

    }, {
        key: "parseList",
        value: function parseList(list) {
            var _this2 = this;

            list.forEach(function (item) {
                item.amountShow = item.amount >= 0 ? "+" + item.amount + " " + _this2.props.currencyName : item.amount + " " + _this2.props.currencyName;
                item.timeShow = tools_1.timestampFormat(item.time).slice(5);
                item.iconShow = "" + item.behaviorIcon;
            });
            return list;
        }
        /**
         * 查看详情界面
         */

    }, {
        key: "recordListItemClick",
        value: function recordListItemClick(e, index) {
            if (this.props.recordList[index].oid) {
                root_1.popNew('app-view-wallet-cloudWalletGT-transactionDetails', { oid: this.props.recordList[index].oid });
            }
        }
        /**
         * 请求更多数据
         */

    }, {
        key: "loadMore",
        value: function loadMore() {
            pull_1.getAccountDetail(this.props.currencyName, 0, this.props.otherNext);
        }
        /**
         * 加载更多数据
         */

    }, {
        key: "getMoreList",
        value: function getMoreList() {
            var h1 = document.getElementById('recharge-scroller-container').offsetHeight;
            var h2 = document.getElementById('recharge-content-container').offsetHeight;
            var scrollTop = document.getElementById('recharge-scroller-container').scrollTop;
            if (this.props.canLoadMore && !this.props.isRefreshing && h2 - h1 - scrollTop < 20) {
                this.props.isRefreshing = true;
                this.paint();
                console.log('加载中，请稍后~~~');
                this.loadMore();
            }
        }
        /**
         * 更新交易状态
         */

    }, {
        key: "updateTransaction",
        value: function updateTransaction() {
            var list = this.props.rechargeList.concat(this.props.withdrawList);
            list.forEach(function (item) {
                var txDetail = walletTools_1.fetchLocalTxByHash1(item.hash);
                var obj = tools_1.parseStatusShow(txDetail);
                item.statusShow = obj.text;
            });
            this.paint();
        }
    }]);

    return TotalRecord;
}(widget_1.Widget);

exports.TotalRecord = TotalRecord;
// 云端记录变化
memstore_1.register('cloud/cloudWallets', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateRecordList();
    }
});
})