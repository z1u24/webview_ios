_$define("earn/server/rpc/send_message.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../pi/struct/sinfo");

var SendMsg = function (_struct_mgr_1$Struct) {
    _inherits(SendMsg, _struct_mgr_1$Struct);

    function SendMsg() {
        _classCallCheck(this, SendMsg);

        return _possibleConstructorReturn(this, (SendMsg.__proto__ || Object.getPrototypeOf(SendMsg)).apply(this, arguments));
    }

    _createClass(SendMsg, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.cmd = bb.readUtf8();
            this.msg = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.cmd);
            bb.writeUtf8(this.msg);
        }
    }]);

    return SendMsg;
}(struct_mgr_1.Struct);

SendMsg._$info = new sinfo_1.StructInfo("earn/server/rpc/send_message.SendMsg", 3970679613, null, [new sinfo_1.FieldInfo("cmd", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("msg", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.SendMsg = SendMsg;
})