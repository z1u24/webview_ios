_$define("chat/server/tests/foo.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../pi/struct/sinfo");

var UserInfo = function (_struct_mgr_1$Struct) {
    _inherits(UserInfo, _struct_mgr_1$Struct);

    function UserInfo() {
        _classCallCheck(this, UserInfo);

        return _possibleConstructorReturn(this, (UserInfo.__proto__ || Object.getPrototypeOf(UserInfo)).apply(this, arguments));
    }

    _createClass(UserInfo, [{
        key: "addMeta",
        value: function addMeta(mgr) {
            if (this._$meta) return;
            struct_mgr_1.addToMeta(mgr, this);
        }
    }, {
        key: "removeMeta",
        value: function removeMeta() {
            struct_mgr_1.removeFromMeta(this);
        }
    }, {
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.phone = bb.readUtf8();
            this.ethAddr = bb.readUtf8();
            this.note = bb.readUtf8();
            this.bio = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeUtf8(this.phone);
            bb.writeUtf8(this.ethAddr);
            bb.writeUtf8(this.note);
            bb.writeUtf8(this.bio);
        }
    }]);

    return UserInfo;
}(struct_mgr_1.Struct);

UserInfo._$info = new sinfo_1.StructInfo("chat/server/tests/foo.UserInfo", 862206019, new Map([["primary", "uid"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.Usize), null), new sinfo_1.FieldInfo("phone", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("ethAddr", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("note", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("bio", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.UserInfo = UserInfo;
})