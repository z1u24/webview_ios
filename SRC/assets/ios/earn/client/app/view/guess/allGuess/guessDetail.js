_$define("earn/client/app/view/guess/allGuess/guessDetail", function (require, exports, module){
"use strict";
/**
 * 竞猜详情-下单
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../../../../pi/ui/root");
var forelet_1 = require("../../../../../../pi/widget/forelet");
var painter_1 = require("../../../../../../pi/widget/painter");
var widget_1 = require("../../../../../../pi/widget/widget");
var rpc_1 = require("../../../net/rpc");
var memstore_1 = require("../../../store/memstore");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var GuessDetail = function (_widget_1$Widget) {
    _inherits(GuessDetail, _widget_1$Widget);

    function GuessDetail() {
        _classCallCheck(this, GuessDetail);

        var _this = _possibleConstructorReturn(this, (GuessDetail.__proto__ || Object.getPrototypeOf(GuessDetail)).apply(this, arguments));

        _this.props = {
            selectTopbar: {},
            guessSTnum: 0.1,
            defaultGuessStNum: 0.1,
            selfSTnum: 0,
            predictEarnTeam1: 0,
            predictEarnTeam2: 0
        };
        return _this;
    }

    _createClass(GuessDetail, [{
        key: "setProps",
        value: function setProps(props) {
            _get(GuessDetail.prototype.__proto__ || Object.getPrototypeOf(GuessDetail.prototype), "setProps", this).call(this, this.props);
            if (props.guessData) {
                this.props.guessData = props.guessData;
            }
            this.getSTnum();
            this.inputChange({ value: this.props.defaultGuessStNum });
        }
    }, {
        key: "create",
        value: function create() {
            _get(GuessDetail.prototype.__proto__ || Object.getPrototypeOf(GuessDetail.prototype), "create", this).call(this);
            console.log();
        }
    }, {
        key: "initData",
        value: function initData() {
            var _this2 = this;

            rpc_1.getOneGuessInfo(this.props.guessData.cid).then(function (res) {
                _this2.props.guessData.team1Num = res.team1Num;
                _this2.props.guessData.team2Num = res.team2Num;
                _this2.paint();
            });
            rpc_1.getSTbalance();
        }
        /**
         * 加油
         * @param team 1:主场队 2:客场队
         */

    }, {
        key: "guess",
        value: function guess(team) {
            var _this3 = this;

            if (this.props.guessSTnum > this.props.selfSTnum) {
                // 余额不足
                root_1.popNew('app-components1-message-message', { content: this.config.value.tips[0] });
                return;
            }
            if (this.props.guessSTnum < this.props.defaultGuessStNum) {
                // 竞猜ST小于0.1
                root_1.popNew('app-components1-message-message', { content: this.config.value.tips[1] });
                return;
            }
            rpc_1.betGuess(this.props.guessData.cid, this.props.guessSTnum, team).then(function (order) {
                rpc_1.queryBetGuess(order.oid).then(function (res) {
                    console.log('下注成功，查询！！！！！', res);
                    root_1.popNew('app-components1-message-message', { content: _this3.config.value.tips[2] });
                    _this3.initData();
                    // this.inputChange({ value:this.props.defaultGuessStNum });
                }).catch(function (err) {
                    root_1.popNew('app-components1-message-message', { content: _this3.config.value.tips[3] });
                    console.log('查询下注失败', err);
                });
            }).catch(function (err) {
                // popNew('app-components1-message-message', { content: this.config.value.tips[3] });
                console.log('下注失败！！！！！', err);
            });
        }
        /**
         * 输入竞猜ST数量
         */

    }, {
        key: "inputChange",
        value: function inputChange(res) {
            if (res.value !== '') {
                this.props.guessSTnum = parseFloat(res.value);
            } else {
                this.props.guessSTnum = this.props.defaultGuessStNum;
            }
            this.props.predictEarnTeam1 = (this.props.guessSTnum * (this.props.guessData.team2Num / this.props.guessData.team1Num + 1)).toFixed(2);
            this.props.predictEarnTeam2 = (this.props.guessSTnum * (this.props.guessData.team1Num / this.props.guessData.team2Num + 1)).toFixed(2);
            this.paint();
        }
        /**
         * 获取账户ST数量
         */

    }, {
        key: "getSTnum",
        value: function getSTnum() {
            this.props.selfSTnum = memstore_1.getStore('balance/ST');
            this.paint();
        }
        /**
         * 去充值
         */

    }, {
        key: "goRecharge",
        value: function goRecharge() {
            var _this4 = this;

            root_1.popNew('app-view-wallet-cloudWallet-rechargeKT', null, function () {
                _this4.initData();
            });
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
                    // this.resetBoxList();
                    break;
                case 1:
                    // 充值
                    this.goRecharge();
                    break;
                case 2:
                    // 加油 
                    this.guess(eventValue);
                    break;
                default:
            }
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

    return GuessDetail;
}(widget_1.Widget);

exports.GuessDetail = GuessDetail;
// ===================================================== 立即执行
memstore_1.register('balance/ST', function (r) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    w && w.getSTnum();
});
})