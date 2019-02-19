_$define("app/view/earn/mining/addMineAlert", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 矿上增加提醒
 */
var widget_1 = require("../../../../pi/widget/widget");

var AddMineAlert = function (_widget_1$Widget) {
    _inherits(AddMineAlert, _widget_1$Widget);

    function AddMineAlert() {
        _classCallCheck(this, AddMineAlert);

        var _this = _possibleConstructorReturn(this, (AddMineAlert.__proto__ || Object.getPrototypeOf(AddMineAlert)).call(this));

        _this.props = {
            addNum: '0',
            iconType: 'KT'
        };
        return _this;
    }
    /**
     * 返回上一页
     */


    _createClass(AddMineAlert, [{
        key: "close",
        value: function close() {
            this.ok && this.ok();
        }
    }]);

    return AddMineAlert;
}(widget_1.Widget);

exports.AddMineAlert = AddMineAlert;
})