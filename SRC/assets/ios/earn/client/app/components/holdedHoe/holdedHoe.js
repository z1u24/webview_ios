_$define("earn/client/app/components/holdedHoe/holdedHoe", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * holded hoe
 */
var event_1 = require("../../../../../pi/widget/event");
var widget_1 = require("../../../../../pi/widget/widget");
var hoeType_s_1 = require("../../xls/hoeType.s");

var HoldedHoe = function (_widget_1$Widget) {
    _inherits(HoldedHoe, _widget_1$Widget);

    function HoldedHoe() {
        _classCallCheck(this, HoldedHoe);

        return _possibleConstructorReturn(this, (HoldedHoe.__proto__ || Object.getPrototypeOf(HoldedHoe)).apply(this, arguments));
    }

    _createClass(HoldedHoe, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            var imgUrl = '../../res/image/';
            if (props.hoeType === hoeType_s_1.HoeType.IronHoe) {
                imgUrl = imgUrl + "iron_hoe.png";
            } else if (props.hoeType === hoeType_s_1.HoeType.GoldHoe) {
                imgUrl = imgUrl + "gold_hoe.png";
            } else if (props.hoeType === hoeType_s_1.HoeType.DiamondHoe) {
                imgUrl = imgUrl + "diamond_hoe.png";
            }
            this.props = Object.assign({}, props, { imgUrl: imgUrl });
            _get(HoldedHoe.prototype.__proto__ || Object.getPrototypeOf(HoldedHoe.prototype), "setProps", this).call(this, this.props, oldProps);
            // console.log(this.props,this.props.selected === this.props.hoeType);
        }
    }, {
        key: "selectHoeClick",
        value: function selectHoeClick(event) {
            event_1.notify(event.node, 'ev-hoe-click', {});
        }
    }]);

    return HoldedHoe;
}(widget_1.Widget);

exports.HoldedHoe = HoldedHoe;
})