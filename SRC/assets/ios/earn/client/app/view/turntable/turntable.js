_$define("earn/client/app/view/turntable/turntable", function (require, exports, module){
"use strict";
/**
 * 大转盘 - 首页
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("../../../../../app/logic/native");
var store_1 = require("../../../../../chat/client/app/data/store");
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

var Turntable = function (_widget_1$Widget) {
    _inherits(Turntable, _widget_1$Widget);

    function Turntable() {
        _classCallCheck(this, Turntable);

        var _this = _possibleConstructorReturn(this, (Turntable.__proto__ || Object.getPrototypeOf(Turntable)).apply(this, arguments));

        _this.props = {
            selectTurntable: {},
            turnNum: 0,
            isTurn: false,
            STbalance: 0,
            prizeList: [],
            turntableList: [{
                type: dataEnum_s_1.ActivityType.PrimaryTurntable,
                name: { zh_Hans: '银券', zh_Hant: '銀券', en: '' },
                needTicketNum: util_1.getTicketNum(dataEnum_s_1.ActivityType.PrimaryTurntable),
                turntableName: { zh_Hans: '初级转盘', zh_Hant: '初級轉盤', en: '' }
            }, {
                type: dataEnum_s_1.ActivityType.MiddleTurntable,
                name: { zh_Hans: '金券', zh_Hant: '金券', en: '' },
                needTicketNum: util_1.getTicketNum(dataEnum_s_1.ActivityType.MiddleTurntable),
                turntableName: { zh_Hans: '中级转盘', zh_Hant: '中級轉盤', en: '' }
            }, {
                type: dataEnum_s_1.ActivityType.AdvancedTurntable,
                name: { zh_Hans: '彩券', zh_Hant: '彩券', en: '' },
                needTicketNum: util_1.getTicketNum(dataEnum_s_1.ActivityType.AdvancedTurntable),
                turntableName: { zh_Hans: '高级转盘', zh_Hant: '高級轉盤', en: '' }
            }],
            showTip: { zh_Hans: '', zh_Hant: '', en: '' },
            isFirstPlay: true
        };
        return _this;
    }

    _createClass(Turntable, [{
        key: "create",
        value: function create() {
            _get(Turntable.prototype.__proto__ || Object.getPrototypeOf(Turntable.prototype), "create", this).call(this);
            if (util_1.isLogin()) {
                this.change(0);
                this.initTurntable();
                this.initData();
            }
            console.log('聊天uid', [store_1.getStore('uid')]);
            // inviteUsersToGroup(10001,[getChatStore('uid')],(r) => {
            //     console.log('加群回调---------------',r);
            // });
        }
    }, {
        key: "attach",
        value: function attach() {
            if (!util_1.isLogin()) {
                this.backPrePage();
            }
        }
        /**
         * 初始转盘
         */

    }, {
        key: "initTurntable",
        value: function initTurntable() {
            // 奖品配置  
            var prizeList = util_1.getPrizeList(this.props.selectTurntable.type);
            this.props.prizeList = [];
            for (var i = 0, length = prizeList.length; i < length; i++) {
                var prizeItem = {
                    awardType: prizeList[i],
                    deg: -360 / length * i
                };
                this.props.prizeList.push(prizeItem);
            }
            this.paint();
        }
        /**
         * 初始数据
         */

    }, {
        key: "initData",
        value: function initData() {
            var _this2 = this;

            this.props.STbalance = memstore_1.getStore('balance/ST');
            rpc_1.isFirstFree().then(function (res) {
                _this2.props.isFirstPlay = res.freeRotary;
                _this2.setChestTip(2);
            });
            this.paint();
        }
        /**
         * 开奖
         */
        // public goLottery(e:any) {
        //     if (this.props.isTurn) {// 正在转
        //         return;
        //     }
        //     const $turnTableBtn = getRealNode(e.node);
        //     $turnTableBtn.className = 'startTurnTable';
        //     setTimeout(() => {
        //         $turnTableBtn.className = '';
        //     }, 100);
        //     if (this.props.STbalance < this.props.selectTurntable.needTicketNum) {    // 余票不足
        //         if (!((this.props.selectTurntable.type === ActivityType.PrimaryTurntable) && this.props.isFirstPlay)) {
        //             popNew('app-components1-message-message',{ content:this.config.value.tips[0] });
        //             return;
        //         }
        //     }
        //     this.props.isFirstPlay = false;
        //     this.setChestTip(2);
        //     this.startLottery();
        //     openTurntable(this.props.selectTurntable.type).then((res) => {
        //         this.changeDeg(res);
        //     }).catch((err) => {
        //         this.changeDeg(err);
        //     });
        // }
        /**
         * 开奖
         */

    }, {
        key: "goLottery",
        value: function goLottery(e) {
            var _this3 = this;

            if (this.props.isTurn) {
                // 正在转
                return;
            }
            var $turnTableBtn = painter_1.getRealNode(e.node);
            $turnTableBtn.className = 'startTurnTable';
            setTimeout(function () {
                $turnTableBtn.className = '';
            }, 100);
            if (this.props.STbalance < this.props.selectTurntable.needTicketNum) {
                // 余票不足
                if (!(this.props.selectTurntable.type === dataEnum_s_1.ActivityType.PrimaryTurntable && this.props.isFirstPlay)) {
                    root_1.popNew('app-components1-message-message', { content: this.config.value.tips[0] });
                    return;
                }
            }
            rpc_1.openTurntable(this.props.selectTurntable.type).then(function (order) {
                if (order.oid) {
                    // 非免费机会开奖
                    rpc_1.queryTurntableOrder(order.oid).then(function (res) {
                        root_1.popNew('app-components1-message-message', { content: _this3.config.value.tips[1] });
                        _this3.props.isFirstPlay = false;
                        _this3.setChestTip(2);
                        console.log('转盘开奖成功！', res);
                        _this3.changeDeg(res);
                    }).catch(function (err) {
                        console.log('查询转盘订单失败', err);
                    });
                } else {
                    // 免费机会开奖
                    _this3.props.isFirstPlay = false;
                    _this3.changeDeg(order);
                }
            }).catch(function (err) {
                // this.changeDeg(err);
                console.log('转盘下单失败', err);
            });
        }
        /**
         * 开始开奖
         */

    }, {
        key: "startLottery",
        value: function startLottery() {
            var $turnStyle = document.getElementById('turntable').style;
            this.props.isTurn = true;
            $turnStyle.transition = 'transform 2s linear';
            $turnStyle.transform = 'rotate(720deg)';
        }
        /**
         * 修改转动角度
         */

    }, {
        key: "changeDeg",
        value: function changeDeg(resData) {
            var _this4 = this;

            console.log('changeDeg------------------', resData);
            var $turnStyle = document.getElementById('turntable').style;
            // if (resData.resultNum && resData.resultNum === 1) {   // 请求成功
            //     this.props.prizeList.forEach(element => {
            //         if (element.awardType === resData.award.awardType) {
            //             this.props.turnNum = element.deg;
            //             if (resData.award.awardType === 5001) {
            //                 console.log(this.props.turnNum);
            //             }
            //         }
            //     });
            // } else { // 请求失败
            //     this.props.prizeList.forEach(element => {
            //         if (element.awardType === 9527) {
            //             this.props.turnNum = element.deg;   
            //         }
            //     });
            // }
            this.props.prizeList.forEach(function (element) {
                if (element.awardType === resData.awardType) {
                    _this4.props.turnNum = element.deg;
                }
            });
            $turnStyle.transition = 'transform 7s ease-in-out';
            $turnStyle.transform = "rotate(" + (this.props.turnNum + 2880) + "deg)";
            // setTimeout(() => {
            //     this.endLottery();
            //     if (resData.resultNum === 1 && resData.award.awardType !== 9527) {
            //         popNew('earn-client-app-components-lotteryModal-lotteryModal', resData.award);
            //     }
            //     this.paint();
            // }, 4000);
            setTimeout(function () {
                _this4.endLottery();
                if (resData.awardType !== 9527) {
                    root_1.popNew('earn-client-app-components-lotteryModal-lotteryModal', resData);
                }
                _this4.paint();
            }, 7000);
        }
        /**
         * 结束开奖
         */

    }, {
        key: "endLottery",
        value: function endLottery() {
            var $turnStyle = document.getElementById('turntable').style;
            this.props.isTurn = false;
            $turnStyle.transition = 'none';
            $turnStyle.transform = "rotate(" + this.props.turnNum + "deg)";
        }
        /**
         * 去充值
         */

    }, {
        key: "goRecharge",
        value: function goRecharge() {
            var _this5 = this;

            root_1.popNew('app-view-wallet-cloudWallet-rechargeKT', null, function () {
                _this5.refresh();
            });
        }
        /**
         * 更改宝箱类型
         * @param index 序号
         */

    }, {
        key: "change",
        value: function change(index) {
            if (this.props.isTurn) {
                return;
            }
            this.props.selectTurntable = this.props.turntableList[index];
            this.setChestTip(2);
            this.initTurntable();
            this.paint();
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
            switch (eventType) {// 看广告
                case 0:
                    this.toWatchAd();
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
         * 设置转盘提示
         * @param tipIndex 提示序号 0:免费,1:空,2:售价
         */

    }, {
        key: "setChestTip",
        value: function setChestTip() {
            var _this6 = this;

            var tipIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var turntableTips = this.config.value.turntableTips;
            switch (tipIndex) {
                case 0:
                    this.props.showTip = turntableTips[0];
                    this.paint();
                    break;
                case 1:
                    this.props.showTip = turntableTips[1];
                    this.paint();
                    setTimeout(function () {
                        _this6.setChestTip(2);
                        _this6.paint();
                    }, 2000);
                    break;
                case 2:
                    if (this.props.isFirstPlay && this.props.selectTurntable.type === dataEnum_s_1.ActivityType.PrimaryTurntable) {
                        this.setChestTip(0);
                    } else {
                        this.props.showTip = { zh_Hans: "\u552E\u4EF7\uFF1A" + this.props.selectTurntable.needTicketNum + "ST/1\u4E2A", zh_Hant: "\u552E\u50F9\uFF1A" + this.props.selectTurntable.needTicketNum + "ST/1\u500B", en: '' };
                    }
                    this.paint();
                    break;
                default:
            }
        }
        /**
         * 去看广告
         */

    }, {
        key: "toWatchAd",
        value: function toWatchAd() {
            native_1.watchAd(1, function (err, res) {
                console.log('ad err = ', err);
                console.log('ad res = ', res);
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
            root_1.popNew('earn-client-app-view-myProduct-myProduct', { type: 2 });
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

    return Turntable;
}(widget_1.Widget);

exports.Turntable = Turntable;
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