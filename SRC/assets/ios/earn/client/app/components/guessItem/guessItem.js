_$define("earn/client/app/components/guessItem/guessItem", function (require, exports, module){
"use strict";
/**
 * 竞猜组件
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../../../pi/ui/root");
var widget_1 = require("../../../../../pi/widget/widget");

var GuessItem = function (_widget_1$Widget) {
    _inherits(GuessItem, _widget_1$Widget);

    function GuessItem() {
        _classCallCheck(this, GuessItem);

        var _this = _possibleConstructorReturn(this, (GuessItem.__proto__ || Object.getPrototypeOf(GuessItem)).apply(this, arguments));

        _this.props = {
            guessBtn: true,
            guessData: {
                team1: 'ok',
                team2: 'ok',
                time: '2000-10-02 15:26:30',
                week: '星期五',
                result: 1,
                state: 2,
                team1Num: 1,
                team2Num: 1
            },
            showOdds: false,
            showBtn: false,
            timer: {},
            oddsTeam1: 0,
            oddsTeam2: 0
        };
        return _this;
    }

    _createClass(GuessItem, [{
        key: "setProps",
        value: function setProps(props) {
            _get(GuessItem.prototype.__proto__ || Object.getPrototypeOf(GuessItem.prototype), "setProps", this).call(this, this.props);
            if (props.guessData) {
                this.props.guessData = props.guessData;
            }
            if (props.showOdds) {
                this.props.showOdds = props.showOdds;
            }
            if (props.showBtn) {
                this.props.showBtn = props.showBtn;
            }
            this.props.guessBtn = true; // 初始化
            this.timer();
            this.oddsCompute();
            this.paint();
        }
        /**
         * 计算比赛时间
         */

    }, {
        key: "timer",
        value: function timer() {
            var _this2 = this;

            var compareTime = function compareTime() {
                var nowDate = new Date();
                var guessDate = new Date(_this2.props.guessData.time);
                if (nowDate > guessDate || _this2.props.guessData.result === 3) {
                    _this2.props.guessBtn = false;
                    clearInterval(_this2.props.timer);
                    _this2.paint();
                }
            };
            compareTime();
            this.props.timer = setInterval(function () {
                compareTime();
            }, 1000);
        }
        /**
         * 赔率计算
         */

    }, {
        key: "oddsCompute",
        value: function oddsCompute() {
            if (this.props.guessData.team2Num === 0) {
                this.props.oddsTeam1 = 1;
            } else {
                this.props.oddsTeam1 = (this.props.guessData.team2Num / this.props.guessData.team1Num + 1).toFixed(1);
            }
            if (this.props.guessData.team1Num === 0) {
                this.props.oddsTeam2 = 1;
            } else {
                this.props.oddsTeam2 = (this.props.guessData.team1Num / this.props.guessData.team2Num + 1).toFixed(1);
            }
            this.paint();
        }
    }, {
        key: "destroy",
        value: function destroy() {
            clearInterval(this.props.timer);
            return true;
        }
        /**
         * 点击效果
         */

    }, {
        key: "btnClick",
        value: function btnClick($dom, btnType) {
            $dom.className = 'btnClick';
            setTimeout(function () {
                $dom.className = '';
            }, 100);
            switch (btnType) {
                case 0:
                    this.goGuess();
                    break;
                default:
            }
        }
        /**
         * 竞猜详情
         */

    }, {
        key: "goGuess",
        value: function goGuess() {
            if (this.props.showBtn) {
                if (this.props.guessBtn) {
                    root_1.popNew('earn-client-app-view-guess-allGuess-guessDetail', { guessData: this.props.guessData });
                } else {
                    root_1.popNew('app-components1-message-message', { content: this.config.value.tips[0] });
                }
            }
        }
    }]);

    return GuessItem;
}(widget_1.Widget);

exports.GuessItem = GuessItem;
})