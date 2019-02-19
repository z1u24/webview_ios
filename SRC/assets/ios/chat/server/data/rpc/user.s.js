_$define("chat/server/data/rpc/user.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../../pi/struct/sinfo");

var UserAgree = function (_struct_mgr_1$Struct) {
    _inherits(UserAgree, _struct_mgr_1$Struct);

    function UserAgree() {
        _classCallCheck(this, UserAgree);

        return _possibleConstructorReturn(this, (UserAgree.__proto__ || Object.getPrototypeOf(UserAgree)).apply(this, arguments));
    }

    _createClass(UserAgree, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.agree = bb.readBool();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeBool(this.agree);
        }
    }]);

    return UserAgree;
}(struct_mgr_1.Struct);

UserAgree._$info = new sinfo_1.StructInfo("chat/server/data/rpc/user.UserAgree", 3838971680, null, [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("agree", new sinfo_1.EnumType(sinfo_1.Type.Bool), null)]);
exports.UserAgree = UserAgree;

var FriendAlias = function (_struct_mgr_1$Struct2) {
    _inherits(FriendAlias, _struct_mgr_1$Struct2);

    function FriendAlias() {
        _classCallCheck(this, FriendAlias);

        return _possibleConstructorReturn(this, (FriendAlias.__proto__ || Object.getPrototypeOf(FriendAlias)).apply(this, arguments));
    }

    _createClass(FriendAlias, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.rid = bb.readInt();
            this.alias = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.rid);
            bb.writeUtf8(this.alias);
        }
    }]);

    return FriendAlias;
}(struct_mgr_1.Struct);

FriendAlias._$info = new sinfo_1.StructInfo("chat/server/data/rpc/user.FriendAlias", 3281404534, null, [new sinfo_1.FieldInfo("rid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("alias", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.FriendAlias = FriendAlias;
})