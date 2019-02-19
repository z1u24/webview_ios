_$define("earn/client/app/components/welfareAward/welfareAward", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * welfare award
 */
var widget_1 = require("../../../../../pi/widget/widget");
var rpc_1 = require("../../net/rpc");

var WelfareAward = function (_widget_1$Widget) {
    _inherits(WelfareAward, _widget_1$Widget);

    function WelfareAward() {
        _classCallCheck(this, WelfareAward);

        return _possibleConstructorReturn(this, (WelfareAward.__proto__ || Object.getPrototypeOf(WelfareAward)).apply(this, arguments));
    }

    _createClass(WelfareAward, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            var imgUrl = '../../res/image/';
            if (props.received) {
                imgUrl = imgUrl + "101101boxOpen.png";
            } else {
                imgUrl = imgUrl + "101101box.png";
            }
            // console.log(props);
            this.props = Object.assign({}, props, { imgUrl: imgUrl });
            _get(WelfareAward.prototype.__proto__ || Object.getPrototypeOf(WelfareAward.prototype), "setProps", this).call(this, this.props, oldProps);
        }
    }, {
        key: "openClick",
        value: function openClick() {
            if (!this.props.canReceive) return;
            rpc_1.converInviteAwards(this.props.awardIndex);
        }
    }]);

    return WelfareAward;
}(widget_1.Widget);

exports.WelfareAward = WelfareAward;
})