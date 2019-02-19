_$define("earn/client/app/view/mineRank/rankItem", function (require, exports, module){
"use strict";
/**
 * 单个排名列表组件
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = require("../../../../../pi/widget/widget");

var RankItem = function (_widget_1$Widget) {
    _inherits(RankItem, _widget_1$Widget);

    function RankItem() {
        _classCallCheck(this, RankItem);

        return _possibleConstructorReturn(this, (RankItem.__proto__ || Object.getPrototypeOf(RankItem)).call(this));
    }

    return RankItem;
}(widget_1.Widget);

exports.RankItem = RankItem;
})