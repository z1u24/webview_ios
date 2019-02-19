_$define("app/components1/modalBox/newUserWelfare", function (require, exports, module){
"use strict";
/**
 * 新用户福利
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../pi/ui/root");
var widget_1 = require("../../../pi/widget/widget");

var NewUserWelfare = function (_widget_1$Widget) {
    _inherits(NewUserWelfare, _widget_1$Widget);

    function NewUserWelfare() {
        _classCallCheck(this, NewUserWelfare);

        var _this = _possibleConstructorReturn(this, (NewUserWelfare.__proto__ || Object.getPrototypeOf(NewUserWelfare)).apply(this, arguments));

        _this.props = { pi_norouter: true };
        return _this;
    }

    _createClass(NewUserWelfare, [{
        key: "goLogin",
        value: function goLogin() {
            this.ok && this.ok();
            root_1.popNew('app-view-wallet-create-home');
        }
    }, {
        key: "close",
        value: function close(e) {
            this.ok && this.ok();
        }
    }]);

    return NewUserWelfare;
}(widget_1.Widget);

exports.NewUserWelfare = NewUserWelfare;
})