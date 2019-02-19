_$define("chat/client/app/widget/userEdit/userEdit", function (require, exports, module){
"use strict";
/*
** userEdit 组件相关处理
**
*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ===========================导入
var widget_1 = require("../../../../../pi/widget/widget");
// ===========================导出

var UserEdit = function (_widget_1$Widget) {
    _inherits(UserEdit, _widget_1$Widget);

    function UserEdit() {
        _classCallCheck(this, UserEdit);

        var _this = _possibleConstructorReturn(this, (UserEdit.__proto__ || Object.getPrototypeOf(UserEdit)).call(this));

        _this.props = {
            avatorPath: "emoji.png",
            userName: "好友用户名",
            otherInfo: "ox59b49493bb587g"
        };
        return _this;
    }

    return UserEdit;
}(widget_1.Widget);

exports.UserEdit = UserEdit;
})