_$define("chat/server/rpc/user_login.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../pi/struct/sinfo");

var userLogin = function (_struct_mgr_1$Struct) {
    _inherits(userLogin, _struct_mgr_1$Struct);

    function userLogin() {
        _classCallCheck(this, userLogin);

        return _possibleConstructorReturn(this, (userLogin.__proto__ || Object.getPrototypeOf(userLogin)).apply(this, arguments));
    }

    _createClass(userLogin, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readUtf8();
            this.passwdHash = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.uid);
            bb.writeUtf8(this.passwdHash);
        }
    }]);

    return userLogin;
}(struct_mgr_1.Struct);

userLogin._$info = new sinfo_1.StructInfo("chat/server/rpc/user_login.userLogin", 229632246, null, [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("passwdHash", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.userLogin = userLogin;

var userLoginResponse = function (_struct_mgr_1$Struct2) {
    _inherits(userLoginResponse, _struct_mgr_1$Struct2);

    function userLoginResponse() {
        _classCallCheck(this, userLoginResponse);

        return _possibleConstructorReturn(this, (userLoginResponse.__proto__ || Object.getPrototypeOf(userLoginResponse)).apply(this, arguments));
    }

    _createClass(userLoginResponse, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.ack = bb.readBool();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeBool(this.ack);
        }
    }]);

    return userLoginResponse;
}(struct_mgr_1.Struct);

userLoginResponse._$info = new sinfo_1.StructInfo("chat/server/rpc/user_login.userLoginResponse", 2481310891, null, [new sinfo_1.FieldInfo("ack", new sinfo_1.EnumType(sinfo_1.Type.Bool), null)]);
exports.userLoginResponse = userLoginResponse;
})