_$define("earn/client/app/view/guess/allGuess/allGuess", function (require, exports, module){
"use strict";
/**
 * 竞猜主页-全部
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = require("../../../../../../pi/widget/widget");
var rpc_1 = require("../../../net/rpc");

var AllGuess = function (_widget_1$Widget) {
    _inherits(AllGuess, _widget_1$Widget);

    function AllGuess() {
        _classCallCheck(this, AllGuess);

        var _this = _possibleConstructorReturn(this, (AllGuess.__proto__ || Object.getPrototypeOf(AllGuess)).apply(this, arguments));

        _this.props = {
            guessList: []
        };
        return _this;
    }

    _createClass(AllGuess, [{
        key: "create",
        value: function create() {
            var _this2 = this;

            _get(AllGuess.prototype.__proto__ || Object.getPrototypeOf(AllGuess.prototype), "create", this).call(this);
            rpc_1.getAllGuess().then(function (res) {
                _this2.props.guessList = _this2.processData(res);
                _this2.paint();
            });
        }
    }, {
        key: "processData",
        value: function processData(ary) {
            var map = {};
            var list = [];
            ary.forEach(function (element) {
                var timeStr = element.time.slice(0, 10);
                if (!map[timeStr]) {
                    list.push({
                        time: timeStr,
                        week: element.week,
                        data: [element]
                    });
                    map[timeStr] = timeStr;
                } else {
                    list.forEach(function (element1) {
                        if (element1.time.slice(0, 10) === timeStr) {
                            element1.data.push(element);
                        }
                    });
                }
            });
            console.log(list);
            return list;
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

    return AllGuess;
}(widget_1.Widget);

exports.AllGuess = AllGuess;
})