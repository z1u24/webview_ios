_$define("earn/client/app/view/guess/allGuess/filterGuess", function (require, exports, module){
"use strict";
/**
 * 竞猜主页-筛选
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = require("../../../../../../pi/widget/widget");
var rpc_1 = require("../../../net/rpc");

var FilterGuess = function (_widget_1$Widget) {
    _inherits(FilterGuess, _widget_1$Widget);

    function FilterGuess() {
        _classCallCheck(this, FilterGuess);

        var _this = _possibleConstructorReturn(this, (FilterGuess.__proto__ || Object.getPrototypeOf(FilterGuess)).apply(this, arguments));

        _this.props = {
            guessList: [],
            selectMacth: {
                list: []
            }
        };
        return _this;
    }

    _createClass(FilterGuess, [{
        key: "create",
        value: function create() {
            var _this2 = this;

            _get(FilterGuess.prototype.__proto__ || Object.getPrototypeOf(FilterGuess.prototype), "create", this).call(this);
            rpc_1.getAllGuess().then(function (res) {
                _this2.props.guessList = _this2.processData(res);
                _this2.changeTopbar(0);
                _this2.paint();
            });
        }
    }, {
        key: "processData",
        value: function processData(ary) {
            var _this3 = this;

            var matchMap = {};
            var matchList = [];
            ary.forEach(function (element) {
                var matchType = element.matchType;
                if (!matchMap[matchType]) {
                    matchList.push({
                        matchType: matchType,
                        matchName: element.matchName,
                        list: [element]
                    });
                    matchMap[matchType] = matchType;
                } else {
                    matchList.forEach(function (element1) {
                        if (element1.matchType === matchType) {
                            element1.list.push(element);
                        }
                    });
                }
            });
            matchList.forEach(function (element) {
                element.list = _this3.processDayList(element.list);
            });
            console.log(matchList);
            return matchList;
        }
    }, {
        key: "processDayList",
        value: function processDayList(ary) {
            var dayMap = {};
            var dayList = [];
            ary.forEach(function (element) {
                var timeStr = element.time.slice(0, 10);
                if (!dayMap[timeStr]) {
                    dayList.push({
                        time: timeStr,
                        week: element.week,
                        list: [element]
                    });
                    dayMap[timeStr] = timeStr;
                } else {
                    dayList.forEach(function (element1) {
                        if (element1.time.slice(0, 10) === timeStr) {
                            element1.list.push(element);
                        }
                    });
                }
            });
            return dayList;
        }
        /**
         * 修改筛选比赛
         * @param index 选择序号
         */

    }, {
        key: "changeTopbar",
        value: function changeTopbar(index) {
            this.props.selectMacth = this.props.guessList[index];
            console.log(this.props.selectMacth);
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

    return FilterGuess;
}(widget_1.Widget);

exports.FilterGuess = FilterGuess;
})