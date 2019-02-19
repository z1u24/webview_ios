_$define("app/components/fourParaItem/fourParaItem", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 4参数列表项组件
 * {"name":"拼手气红包","data":"1 ETH","time":"04-30 14:32:00","describe":"1/4个"}
 * name:左侧标题
 * data:右侧数据
 * time:时间
 * describe：右侧描述，可选
 */
// ================================ 导入
var event_1 = require("../../../pi/widget/event");
var widget_1 = require("../../../pi/widget/widget");
// ================================ 导出

var FourParaItem = function (_widget_1$Widget) {
    _inherits(FourParaItem, _widget_1$Widget);

    function FourParaItem() {
        _classCallCheck(this, FourParaItem);

        return _possibleConstructorReturn(this, (FourParaItem.__proto__ || Object.getPrototypeOf(FourParaItem)).call(this));
    }

    _createClass(FourParaItem, [{
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "doTap",
        value: function doTap(event) {
            event_1.notify(event.node, 'ev-btn-tap', {});
        }
    }]);

    return FourParaItem;
}(widget_1.Widget);

exports.FourParaItem = FourParaItem;
})