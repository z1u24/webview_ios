_$define("chat/client/app/widget/groupSetItem/groupSetItem", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * groupSetItem 组件相关处理
 */
// ===========================导入
var widget_1 = require("../../../../../pi/widget/widget");
// ===========================导出

var ManageItem = function (_widget_1$Widget) {
    _inherits(ManageItem, _widget_1$Widget);

    function ManageItem() {
        _classCallCheck(this, ManageItem);

        var _this = _possibleConstructorReturn(this, (ManageItem.__proto__ || Object.getPrototypeOf(ManageItem)).call(this));

        _this.props = {
            groupSetList: [{
                title: '设置管理员',
                content: '关闭后，群成员将不能邀请好友加群'
            }, {
                title: '转让管理员',
                content: '关闭后，群成员将不能邀请好友加群'
            }]
        };
        return _this;
    }

    return ManageItem;
}(widget_1.Widget);

exports.ManageItem = ManageItem;
})