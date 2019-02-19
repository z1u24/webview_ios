_$define("chat/client/app/widget/featureBar/featureBar", function (require, exports, module){
"use strict";
/**
 * featureBar 组件相关处理
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ===========================导入
var event_1 = require("../../../../../pi/widget/event");
var widget_1 = require("../../../../../pi/widget/widget");
// ===========================导出

var FeatureBar = function (_widget_1$Widget) {
    _inherits(FeatureBar, _widget_1$Widget);

    function FeatureBar() {
        _classCallCheck(this, FeatureBar);

        var _this = _possibleConstructorReturn(this, (FeatureBar.__proto__ || Object.getPrototypeOf(FeatureBar)).apply(this, arguments));

        _this.props = {
            iconPath: 'emoji.png',
            text: 'Evan Wood'
        };
        return _this;
    }
    // 点击更多


    _createClass(FeatureBar, [{
        key: "more",
        value: function more(e) {
            event_1.notify(e.node, 'ev-getMore', {});
        }
    }]);

    return FeatureBar;
}(widget_1.Widget);

exports.FeatureBar = FeatureBar;
})