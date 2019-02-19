_$define("earn/client/app/view/exchange/comfirmExchange", function (require, exports, module){
"use strict";
/**
 * 兑换确认
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = require("../../../../../pi/widget/widget");
var rpc_1 = require("../../net/rpc");

var ComfirmExchange = function (_widget_1$Widget) {
    _inherits(ComfirmExchange, _widget_1$Widget);

    function ComfirmExchange() {
        _classCallCheck(this, ComfirmExchange);

        return _possibleConstructorReturn(this, (ComfirmExchange.__proto__ || Object.getPrototypeOf(ComfirmExchange)).apply(this, arguments));
    }

    _createClass(ComfirmExchange, [{
        key: "setProps",
        value: function setProps(props) {
            _get(ComfirmExchange.prototype.__proto__ || Object.getPrototypeOf(ComfirmExchange.prototype), "setProps", this).call(this, this.props);
            this.props = Object.assign({}, this.props, { detail: props.detail });
        }
    }, {
        key: "cancelClick",
        value: function cancelClick() {
            this.cancel && this.cancel();
        }
    }, {
        key: "comfirmClick",
        value: function comfirmClick() {
            rpc_1.exchangeVirtual(this.props.detail.id).then(function (res) {
                console.log(res);
            });
            this.ok && this.ok();
        }
    }]);

    return ComfirmExchange;
}(widget_1.Widget);

exports.ComfirmExchange = ComfirmExchange;
})