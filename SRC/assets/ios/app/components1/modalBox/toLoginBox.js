_$define("app/components1/modalBox/toLoginBox", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 去登录 modalbox
 */
var widget_1 = require("../../../pi/widget/widget");

var ModalBox = function (_widget_1$Widget) {
    _inherits(ModalBox, _widget_1$Widget);

    function ModalBox() {
        _classCallCheck(this, ModalBox);

        var _this = _possibleConstructorReturn(this, (ModalBox.__proto__ || Object.getPrototypeOf(ModalBox)).apply(this, arguments));

        _this.props = { pi_norouter: true };
        return _this;
    }

    _createClass(ModalBox, [{
        key: "cancelBtnClick",
        value: function cancelBtnClick(e) {
            this.cancel && this.cancel();
        }
    }, {
        key: "okBtnClick",
        value: function okBtnClick(e) {
            this.ok && this.ok();
        }
    }]);

    return ModalBox;
}(widget_1.Widget);

exports.ModalBox = ModalBox;
})