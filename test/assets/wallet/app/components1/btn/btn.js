_$define("app/components1/btn/btn", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 按钮组件
 * {"name":"塞钱进红包","types":"big","color":"blue","style":""}
 * name:按钮名字
 * type:big|small,默认big
 * color:blue|green|orange|yellow|white|transparent，可选
 * style:额外CSS，可选
 * 外部监听 ev-btn-tap 点击事件
 */
// ================================ 导入
var event_1 = require("../../../pi/widget/event");
var widget_1 = require("../../../pi/widget/widget");
// ================================ 导出

var Btn = function (_widget_1$Widget) {
    _inherits(Btn, _widget_1$Widget);

    function Btn() {
        _classCallCheck(this, Btn);

        var _this = _possibleConstructorReturn(this, (Btn.__proto__ || Object.getPrototypeOf(Btn)).call(this));

        _this.state = {
            isAbleBtn: false
        };
        return _this;
    }

    _createClass(Btn, [{
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "doTap",
        value: function doTap(event) {
            var _this2 = this;

            this.state.isAbleBtn = true;
            this.paint();
            setTimeout(function () {
                _this2.state.isAbleBtn = false;
                _this2.paint();
            }, 200);
            event_1.notify(event.node, 'ev-btn-tap', {});
        }
    }]);

    return Btn;
}(widget_1.Widget);

exports.Btn = Btn;
})