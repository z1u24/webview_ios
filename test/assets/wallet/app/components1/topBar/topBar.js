_$define("app/components1/topBar/topBar", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * topbar头部标题栏
 * {"title":"领红包","background":"orange","centerTitle":true,nextImg:""}
 * title: 标题
 * centerTitle：标题是否居中，默认否
 * background：背景色，传递色值，或者渐变色，默认白色
 * nextImg:右侧图标路径
 */
// ================================ 导入
var event_1 = require("../../../pi/widget/event");
var widget_1 = require("../../../pi/widget/widget");
// ================================ 导出

var TopBar = function (_widget_1$Widget) {
    _inherits(TopBar, _widget_1$Widget);

    function TopBar() {
        _classCallCheck(this, TopBar);

        return _possibleConstructorReturn(this, (TopBar.__proto__ || Object.getPrototypeOf(TopBar)).call(this));
    }

    _createClass(TopBar, [{
        key: "backPrePage",
        value: function backPrePage(event) {
            event_1.notify(event.node, 'ev-back-click', {});
        }
    }, {
        key: "goNext",
        value: function goNext(event) {
            event_1.notify(event.node, 'ev-next-click', {});
        }
    }]);

    return TopBar;
}(widget_1.Widget);

exports.TopBar = TopBar;
})