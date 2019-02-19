_$define("chat/server/rpc/session.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../pi/struct/sinfo");

var AutoLogin = function (_struct_mgr_1$Struct) {
    _inherits(AutoLogin, _struct_mgr_1$Struct);

    function AutoLogin() {
        _classCallCheck(this, AutoLogin);

        return _possibleConstructorReturn(this, (AutoLogin.__proto__ || Object.getPrototypeOf(AutoLogin)).apply(this, arguments));
    }

    _createClass(AutoLogin, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readUtf8();
            this.token = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.uid);
            bb.writeUtf8(this.token);
        }
    }]);

    return AutoLogin;
}(struct_mgr_1.Struct);

AutoLogin._$info = new sinfo_1.StructInfo("chat/server/rpc/session.AutoLogin", 1947997813, null, [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("token", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.AutoLogin = AutoLogin;

var AutoLoginResult = function (_struct_mgr_1$Struct2) {
    _inherits(AutoLoginResult, _struct_mgr_1$Struct2);

    function AutoLoginResult() {
        _classCallCheck(this, AutoLoginResult);

        return _possibleConstructorReturn(this, (AutoLoginResult.__proto__ || Object.getPrototypeOf(AutoLoginResult)).apply(this, arguments));
    }

    _createClass(AutoLoginResult, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.code = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.code);
        }
    }]);

    return AutoLoginResult;
}(struct_mgr_1.Struct);

AutoLoginResult._$info = new sinfo_1.StructInfo("chat/server/rpc/session.AutoLoginResult", 816959142, null, [new sinfo_1.FieldInfo("code", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.AutoLoginResult = AutoLoginResult;

var GetToken = function (_struct_mgr_1$Struct3) {
    _inherits(GetToken, _struct_mgr_1$Struct3);

    function GetToken() {
        _classCallCheck(this, GetToken);

        return _possibleConstructorReturn(this, (GetToken.__proto__ || Object.getPrototypeOf(GetToken)).apply(this, arguments));
    }

    _createClass(GetToken, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.uid);
        }
    }]);

    return GetToken;
}(struct_mgr_1.Struct);

GetToken._$info = new sinfo_1.StructInfo("chat/server/rpc/session.GetToken", 1791970873, null, [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.GetToken = GetToken;

var Token = function (_struct_mgr_1$Struct4) {
    _inherits(Token, _struct_mgr_1$Struct4);

    function Token() {
        _classCallCheck(this, Token);

        return _possibleConstructorReturn(this, (Token.__proto__ || Object.getPrototypeOf(Token)).apply(this, arguments));
    }

    _createClass(Token, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.code = bb.readInt();
            this.token = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.code);
            bb.writeUtf8(this.token);
        }
    }]);

    return Token;
}(struct_mgr_1.Struct);

Token._$info = new sinfo_1.StructInfo("chat/server/rpc/session.Token", 254306678, null, [new sinfo_1.FieldInfo("code", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("token", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.Token = Token;
})