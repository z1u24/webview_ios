_$define("earn/server/rpc/user.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../pi/struct/sinfo");

var WalletLoginReq = function (_struct_mgr_1$Struct) {
    _inherits(WalletLoginReq, _struct_mgr_1$Struct);

    function WalletLoginReq() {
        _classCallCheck(this, WalletLoginReq);

        return _possibleConstructorReturn(this, (WalletLoginReq.__proto__ || Object.getPrototypeOf(WalletLoginReq)).apply(this, arguments));
    }

    _createClass(WalletLoginReq, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.openid = bb.readUtf8();
            this.sign = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.openid);
            bb.writeUtf8(this.sign);
        }
    }]);

    return WalletLoginReq;
}(struct_mgr_1.Struct);

WalletLoginReq._$info = new sinfo_1.StructInfo("earn/server/rpc/user.WalletLoginReq", 1667562175, null, [new sinfo_1.FieldInfo("openid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("sign", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.WalletLoginReq = WalletLoginReq;

var LoginReply = function (_struct_mgr_1$Struct2) {
    _inherits(LoginReply, _struct_mgr_1$Struct2);

    function LoginReply() {
        _classCallCheck(this, LoginReply);

        return _possibleConstructorReturn(this, (LoginReply.__proto__ || Object.getPrototypeOf(LoginReply)).apply(this, arguments));
    }

    _createClass(LoginReply, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.status = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.status);
        }
    }]);

    return LoginReply;
}(struct_mgr_1.Struct);

LoginReply._$info = new sinfo_1.StructInfo("earn/server/rpc/user.LoginReply", 2070172439, null, [new sinfo_1.FieldInfo("status", new sinfo_1.EnumType(sinfo_1.Type.U8), null)]);
exports.LoginReply = LoginReply;

var LoginReq = function (_struct_mgr_1$Struct3) {
    _inherits(LoginReq, _struct_mgr_1$Struct3);

    function LoginReq() {
        _classCallCheck(this, LoginReq);

        return _possibleConstructorReturn(this, (LoginReq.__proto__ || Object.getPrototypeOf(LoginReq)).apply(this, arguments));
    }

    _createClass(LoginReq, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
        }
    }]);

    return LoginReq;
}(struct_mgr_1.Struct);

LoginReq._$info = new sinfo_1.StructInfo("earn/server/rpc/user.LoginReq", 1126724060, null, [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.LoginReq = LoginReq;
var UserType_Enum;
(function (UserType_Enum) {
    UserType_Enum[UserType_Enum["DEF"] = 1] = "DEF";
    UserType_Enum[UserType_Enum["WALLET"] = 2] = "WALLET";
})(UserType_Enum = exports.UserType_Enum || (exports.UserType_Enum = {}));

var UserType = function (_struct_mgr_1$Struct4) {
    _inherits(UserType, _struct_mgr_1$Struct4);

    function UserType(type, value) {
        _classCallCheck(this, UserType);

        var _this4 = _possibleConstructorReturn(this, (UserType.__proto__ || Object.getPrototypeOf(UserType)).call(this));

        _this4.enum_type = type;
        _this4.value = value;
        return _this4;
    }

    _createClass(UserType, [{
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.enum_type);
            switch (this.enum_type) {
                case 1:
                    bb.writeBonCode(this.value);
                    break;
                case 2:
                    bb.writeBonCode(this.value);
                    break;
                default:
                    throw new Error("bonEncode type error, A is not exist index:" + this.enum_type);
            }
        }
    }, {
        key: "bonDecode",
        value: function bonDecode(bb) {
            var t = bb.readInt();
            this.enum_type = t;
            switch (t) {
                case 1:
                    this.value = bb.readBonCode(LoginReq);
                    break;
                case 2:
                    this.value = bb.readBonCode(WalletLoginReq);
                    break;
                default:
                    throw new Error("bonDecode type error, A is not exist index:" + t);
            }
        }
    }]);

    return UserType;
}(struct_mgr_1.Struct);

UserType._$info = new sinfo_1.EnumInfo('earn/server/rpc/user.UserType', 1695207970, null, [new sinfo_1.EnumType(sinfo_1.Type.Struct, LoginReq._$info), new sinfo_1.EnumType(sinfo_1.Type.Struct, WalletLoginReq._$info)]);
exports.UserType = UserType;

var SendMessage = function (_struct_mgr_1$Struct5) {
    _inherits(SendMessage, _struct_mgr_1$Struct5);

    function SendMessage() {
        _classCallCheck(this, SendMessage);

        return _possibleConstructorReturn(this, (SendMessage.__proto__ || Object.getPrototypeOf(SendMessage)).apply(this, arguments));
    }

    _createClass(SendMessage, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.msgType = bb.readInt();
            if (!bb.isNil()) {
                this.msg = bb.readInt();
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeInt(this.msgType);
            if (this.msg === undefined || this.msg === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.msg);
            }
        }
    }]);

    return SendMessage;
}(struct_mgr_1.Struct);

SendMessage._$info = new sinfo_1.StructInfo("earn/server/rpc/user.SendMessage", 2626059649, null, [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("msgType", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("msg", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.SendMessage = SendMessage;

var AutoLogin = function (_struct_mgr_1$Struct6) {
    _inherits(AutoLogin, _struct_mgr_1$Struct6);

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

AutoLogin._$info = new sinfo_1.StructInfo("earn/server/rpc/user.AutoLogin", 2549555956, null, [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("token", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.AutoLogin = AutoLogin;

var AutoLoginResult = function (_struct_mgr_1$Struct7) {
    _inherits(AutoLoginResult, _struct_mgr_1$Struct7);

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

AutoLoginResult._$info = new sinfo_1.StructInfo("earn/server/rpc/user.AutoLoginResult", 970019314, null, [new sinfo_1.FieldInfo("code", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.AutoLoginResult = AutoLoginResult;

var GetToken = function (_struct_mgr_1$Struct8) {
    _inherits(GetToken, _struct_mgr_1$Struct8);

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

GetToken._$info = new sinfo_1.StructInfo("earn/server/rpc/user.GetToken", 1968238455, null, [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.GetToken = GetToken;

var Token = function (_struct_mgr_1$Struct9) {
    _inherits(Token, _struct_mgr_1$Struct9);

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

Token._$info = new sinfo_1.StructInfo("earn/server/rpc/user.Token", 2470814116, null, [new sinfo_1.FieldInfo("code", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("token", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.Token = Token;
})