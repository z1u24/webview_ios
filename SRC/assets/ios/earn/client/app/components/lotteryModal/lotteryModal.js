_$define("earn/client/app/components/lotteryModal/lotteryModal", function (require, exports, module){
"use strict";
/**
 * 中奖提示
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = require("../../../../../pi/widget/widget");
var tools_1 = require("../../utils/tools");
var util_1 = require("../../utils/util");

var LotteryModal = function (_widget_1$Widget) {
    _inherits(LotteryModal, _widget_1$Widget);

    function LotteryModal() {
        _classCallCheck(this, LotteryModal);

        return _possibleConstructorReturn(this, (LotteryModal.__proto__ || Object.getPrototypeOf(LotteryModal)).apply(this, arguments));
    }

    _createClass(LotteryModal, [{
        key: "setProps",
        value: function setProps(props) {
            _get(LotteryModal.prototype.__proto__ || Object.getPrototypeOf(LotteryModal.prototype), "setProps", this).call(this, this.props);
            var prize = util_1.getPrizeInfo(props.awardType);
            this.props = {
                prizeType: props.awardType,
                prizeName: { zh_Hans: "" + prize.zh_hans, zh_Hant: "" + prize.zh_hant, en: '' },
                prizeNum: tools_1.coinUnitchange(props.awardType, props.count),
                prizeUnit: { zh_Hans: "" + prize.unit, zh_Hant: "" + prize.unit, en: '' }
            };
        }
    }, {
        key: "close",
        value: function close(e) {
            this.ok && this.ok();
        }
    }]);

    return LotteryModal;
}(widget_1.Widget);

exports.LotteryModal = LotteryModal;
})