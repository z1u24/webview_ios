_$define("earn/client/app/view/openBox/openBox", function (require, exports, module){
"use strict";
/**
 * 开宝箱 - 首页
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../../../pi/ui/root");
var forelet_1 = require("../../../../../pi/widget/forelet");
var painter_1 = require("../../../../../pi/widget/painter");
var widget_1 = require("../../../../../pi/widget/widget");
var rpc_1 = require("../../net/rpc");
var memstore_1 = require("../../store/memstore");
var util_1 = require("../../utils/util");
var dataEnum_s_1 = require("../../xls/dataEnum.s");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');
var BoxState;
(function (BoxState) {
    BoxState[BoxState["unOpenBox"] = 0] = "unOpenBox";
    BoxState[BoxState["prizeBox"] = 1] = "prizeBox";
    BoxState[BoxState["emptyBox"] = 2] = "emptyBox";
})(BoxState || (BoxState = {}));

var OpenBox = function (_widget_1$Widget) {
    _inherits(OpenBox, _widget_1$Widget);

    function OpenBox() {
        _classCallCheck(this, OpenBox);

        var _this = _possibleConstructorReturn(this, (OpenBox.__proto__ || Object.getPrototypeOf(OpenBox)).apply(this, arguments));

        _this.props = {
            showTip: { zh_Hans: '', zh_Hant: '', en: '' },
            isOpening: false,
            boxList: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            STbalance: 0,
            chestList: [{
                type: dataEnum_s_1.ActivityType.PrimaryChest,
                name: { zh_Hans: '银券', zh_Hant: '銀券', en: '' },
                needTicketNum: util_1.getTicketNum(dataEnum_s_1.ActivityType.PrimaryChest)
            }, {
                type: dataEnum_s_1.ActivityType.MiddleChest,
                name: { zh_Hans: '金券', zh_Hant: '金券', en: '' },
                needTicketNum: util_1.getTicketNum(dataEnum_s_1.ActivityType.MiddleChest)
            }, {
                type: dataEnum_s_1.ActivityType.AdvancedChest,
                name: { zh_Hans: '彩券', zh_Hant: '彩券', en: '' },
                needTicketNum: util_1.getTicketNum(dataEnum_s_1.ActivityType.AdvancedChest)
            }],
            selectChest: {},
            isFirstPlay: true,
            ledShow: false,
            LEDTimer: {}
        };
        return _this;
    }

    _createClass(OpenBox, [{
        key: "create",
        value: function create() {
            var _this2 = this;

            _get(OpenBox.prototype.__proto__ || Object.getPrototypeOf(OpenBox.prototype), "create", this).call(this);
            if (util_1.isLogin()) {
                rpc_1.isFirstFree().then(function (res) {
                    _this2.props.isFirstPlay = res.freeBox;
                    _this2.setChestTip(2);
                });
                this.initData();
                this.ledTimer();
            }
            // inviteUsersToGroup();
        }
    }, {
        key: "attach",
        value: function attach() {
            if (!util_1.isLogin()) {
                this.backPrePage();
            } else {
                this.change(0);
            }
        }
        /**
         * 初始数据
         */

    }, {
        key: "initData",
        value: function initData() {
            this.props.STbalance = memstore_1.getStore('balance/ST');
            this.paint();
        }
        /**
         * 打开宝箱
         * @param num 宝箱序数
         */

    }, {
        key: "openBox",
        value: function openBox(e, boxIndex) {
            var _this3 = this;

            if (this.props.isOpening) {
                return;
            }
            if (this.props.boxList[boxIndex] !== 0) {
                // 宝箱已打开
                root_1.popNew('app-components1-message-message', { content: this.config.value.tips[1] });
                return;
            }
            if (this.props.STbalance < this.props.selectChest.needTicketNum) {
                // 奖券不够
                if (!(this.props.selectChest.type === dataEnum_s_1.ActivityType.PrimaryChest && this.props.isFirstPlay)) {
                    root_1.popNew('app-components1-message-message', { content: this.config.value.tips[0] });
                    return;
                }
            }
            this.startOpenChest(e);
            rpc_1.openChest(this.props.selectChest.type).then(function (order) {
                if (order.oid) {
                    // 非免费机会开奖
                    rpc_1.queryChestOrder(order.oid).then(function (res) {
                        _this3.goLottery(e, boxIndex, res);
                    }).catch(function (err) {
                        _this3.endOpenChest(e, boxIndex, BoxState.unOpenBox);
                        console.log('查询开宝箱订单失败', err);
                    });
                } else {
                    // 免费机会开奖
                    _this3.props.isFirstPlay = false;
                    _this3.goLottery(e, boxIndex, order);
                }
            }).catch(function (err) {
                _this3.endOpenChest(e, boxIndex, BoxState.unOpenBox);
            });
        }
        /**
         * 设置宝箱提示
         */
        /**
         *
         * @param tipIndex 提示序号 0:免费,1:空宝箱,2:售价
         */

    }, {
        key: "setChestTip",
        value: function setChestTip() {
            var _this4 = this;

            var tipIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var chestTips = this.config.value.chestTips;
            switch (tipIndex) {
                case 0:
                    this.props.showTip = chestTips[0];
                    this.paint();
                    break;
                case 1:
                    this.props.showTip = chestTips[1];
                    this.paint();
                    setTimeout(function () {
                        _this4.setChestTip(2);
                        _this4.paint();
                    }, 1000);
                    break;
                case 2:
                    if (this.props.isFirstPlay && this.props.selectChest.type === dataEnum_s_1.ActivityType.PrimaryChest) {
                        this.setChestTip(0);
                    } else {
                        this.props.showTip = { zh_Hans: "\u552E\u4EF7\uFF1A" + this.props.selectChest.needTicketNum + "ST/1\u4E2A", zh_Hant: "\u552E\u50F9\uFF1A" + this.props.selectChest.needTicketNum + "ST/1\u500B", en: '' };
                    }
                    this.paint();
                    break;
                default:
            }
        }
        /**
         * 开奖
         * @param order 中奖信息
         */

    }, {
        key: "goLottery",
        value: function goLottery(e, boxIndex, order) {
            if (order.awardType !== 9527) {
                root_1.popNew('earn-client-app-components-lotteryModal-lotteryModal', order);
                this.endOpenChest(e, boxIndex, BoxState.prizeBox);
            } else {
                this.endOpenChest(e, boxIndex, BoxState.emptyBox);
            }
        }
        /**
         * 结束开宝箱
         */

    }, {
        key: "endOpenChest",
        value: function endOpenChest(e, boxIndex, boxState) {
            var $chest = painter_1.getRealNode(e.node);
            $chest.style.animation = 'none';
            this.props.isOpening = false;
            this.props.boxList[boxIndex] = boxState;
            switch (boxState) {
                case BoxState.emptyBox:
                    this.setChestTip(1);
                    break;
                case BoxState.prizeBox:
                    this.setChestTip(2);
                    break;
                case BoxState.unOpenBox:
                    this.setChestTip(2);
                    // popNew('app-components1-message-message', { content: this.config.value.tips[2] });
                    break;
                default:
            }
            this.paint();
        }
        /**
         * 开始开宝箱
         */

    }, {
        key: "startOpenChest",
        value: function startOpenChest(e) {
            var $chest = painter_1.getRealNode(e.node);
            $chest.style.animation = 'openChest 0.2s ease infinite';
            this.props.isOpening = true;
            this.paint();
        }
        /**
         * 重置所有宝箱
         */

    }, {
        key: "resetBoxList",
        value: function resetBoxList() {
            var _this5 = this;

            this.props.boxList.forEach(function (element, i) {
                var $chest = document.getElementsByClassName('chest-img')[i];
                $chest.style.animation = 'resetChest 0.5s ease';
                _this5.props.boxList[i] = 0;
            });
            this.paint();
            setTimeout(function () {
                _this5.props.boxList.forEach(function (element, i) {
                    var $chest = document.getElementsByClassName('chest-img')[i];
                    $chest.style.animation = 'none';
                });
                _this5.paint();
            }, 500);
        }
        /**
         * 更改宝箱类型
         * @param index 序号
         */

    }, {
        key: "change",
        value: function change(index) {
            this.resetBoxList();
            this.props.selectChest = this.props.chestList[index];
            this.setChestTip(2);
            this.paint();
        }
        /**
         * led定时器
         */

    }, {
        key: "ledTimer",
        value: function ledTimer() {
            var _this6 = this;

            this.props.LEDTimer = setInterval(function () {
                _this6.props.ledShow = !_this6.props.ledShow;
                _this6.paint();
            }, 1000);
        }
        /**
         * 点击效果
         */

    }, {
        key: "btnClick",
        value: function btnClick(e, eventType, eventValue) {
            var $dom = painter_1.getRealNode(e.node);
            $dom.className = 'btnClick';
            setTimeout(function () {
                $dom.className = '';
            }, 100);
            switch (eventType) {// 重置宝箱
                case 0:
                    this.resetBoxList();
                    break;
                case 1:
                    // 充值
                    this.goRecharge();
                    break;
                case 2:
                    // 更换宝箱类型
                    this.change(eventValue);
                    break;
                default:
            }
        }
        /**
         * 去充值
         */

    }, {
        key: "goRecharge",
        value: function goRecharge() {
            var _this7 = this;

            // addST();
            root_1.popNew('app-view-wallet-cloudWallet-rechargeKT', null, function () {
                _this7.refresh();
            });
        }
        /**
         * 刷新页面
         */

    }, {
        key: "refresh",
        value: function refresh() {
            rpc_1.getSTbalance();
        }
        /**
         * 查看历史记录
         */

    }, {
        key: "goHistory",
        value: function goHistory() {
            root_1.popNew('earn-client-app-view-myProduct-myProduct', { type: 3 });
        }
    }, {
        key: "destroy",
        value: function destroy() {
            clearInterval(this.props.LEDTimer);
            return true;
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

    return OpenBox;
}(widget_1.Widget);

exports.OpenBox = OpenBox;
// ===================================================== 立即执行
memstore_1.register('userInfo/uid', function (r) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    w && w.initData();
});
memstore_1.register('balance/ST', function (r) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    w && w.initData();
});
})