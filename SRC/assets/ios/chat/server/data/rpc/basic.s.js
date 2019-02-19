_$define("chat/server/data/rpc/basic.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../../pi/struct/sinfo");
var user_s_1 = require("../db/user.s");
var group_s_1 = require("../db/group.s");
var message_s_1 = require("../db/message.s");

var Result = function (_struct_mgr_1$Struct) {
    _inherits(Result, _struct_mgr_1$Struct);

    function Result() {
        _classCallCheck(this, Result);

        return _possibleConstructorReturn(this, (Result.__proto__ || Object.getPrototypeOf(Result)).apply(this, arguments));
    }

    _createClass(Result, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.r = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.r);
        }
    }]);

    return Result;
}(struct_mgr_1.Struct);

Result._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.Result", 97163079, null, [new sinfo_1.FieldInfo("r", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.Result = Result;

var UserRegister = function (_struct_mgr_1$Struct2) {
    _inherits(UserRegister, _struct_mgr_1$Struct2);

    function UserRegister() {
        _classCallCheck(this, UserRegister);

        return _possibleConstructorReturn(this, (UserRegister.__proto__ || Object.getPrototypeOf(UserRegister)).apply(this, arguments));
    }

    _createClass(UserRegister, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.name = bb.readUtf8();
            this.passwdHash = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.name);
            bb.writeUtf8(this.passwdHash);
        }
    }]);

    return UserRegister;
}(struct_mgr_1.Struct);

UserRegister._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.UserRegister", 2272294545, null, [new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("passwdHash", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.UserRegister = UserRegister;
var ORDER;
(function (ORDER) {
    ORDER[ORDER["INC"] = 0] = "INC";
    ORDER[ORDER["DEC"] = 1] = "DEC";
})(ORDER = exports.ORDER || (exports.ORDER = {}));

var AnnouceFragment = function (_struct_mgr_1$Struct3) {
    _inherits(AnnouceFragment, _struct_mgr_1$Struct3);

    function AnnouceFragment() {
        _classCallCheck(this, AnnouceFragment);

        return _possibleConstructorReturn(this, (AnnouceFragment.__proto__ || Object.getPrototypeOf(AnnouceFragment)).apply(this, arguments));
    }

    _createClass(AnnouceFragment, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.aid = bb.readInt();
            this.from = bb.readInt();
            this.order = bb.readInt();
            this.size = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.aid);
            bb.writeInt(this.from);
            bb.writeInt(this.order);
            bb.writeInt(this.size);
        }
    }]);

    return AnnouceFragment;
}(struct_mgr_1.Struct);

AnnouceFragment._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.AnnouceFragment", 2537764436, null, [new sinfo_1.FieldInfo("aid", new sinfo_1.EnumType(sinfo_1.Type.Usize), null), new sinfo_1.FieldInfo("from", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("order", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("size", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.AnnouceFragment = AnnouceFragment;

var UserArray = function (_struct_mgr_1$Struct4) {
    _inherits(UserArray, _struct_mgr_1$Struct4);

    function UserArray() {
        _classCallCheck(this, UserArray);

        return _possibleConstructorReturn(this, (UserArray.__proto__ || Object.getPrototypeOf(UserArray)).apply(this, arguments));
    }

    _createClass(UserArray, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this5 = this;

            this.arr = bb.readArray(function () {
                return bb.readBonCode(_this5._$EnumTypeMap ? _this5._$EnumTypeMap(_this5.arr) : user_s_1.UserInfo);
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.arr, function (el) {
                bb.writeBonCode(el);
            });
        }
    }]);

    return UserArray;
}(struct_mgr_1.Struct);

UserArray._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.UserArray", 2515790571, null, [new sinfo_1.FieldInfo("arr", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, user_s_1.UserInfo._$info)), null)]);
exports.UserArray = UserArray;

var GroupArray = function (_struct_mgr_1$Struct5) {
    _inherits(GroupArray, _struct_mgr_1$Struct5);

    function GroupArray() {
        _classCallCheck(this, GroupArray);

        return _possibleConstructorReturn(this, (GroupArray.__proto__ || Object.getPrototypeOf(GroupArray)).apply(this, arguments));
    }

    _createClass(GroupArray, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this7 = this;

            this.arr = bb.readArray(function () {
                return bb.readBonCode(_this7._$EnumTypeMap ? _this7._$EnumTypeMap(_this7.arr) : group_s_1.GroupInfo);
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.arr, function (el) {
                bb.writeBonCode(el);
            });
        }
    }]);

    return GroupArray;
}(struct_mgr_1.Struct);

GroupArray._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.GroupArray", 1354294467, null, [new sinfo_1.FieldInfo("arr", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, group_s_1.GroupInfo._$info)), null)]);
exports.GroupArray = GroupArray;

var FriendLinkArray = function (_struct_mgr_1$Struct6) {
    _inherits(FriendLinkArray, _struct_mgr_1$Struct6);

    function FriendLinkArray() {
        _classCallCheck(this, FriendLinkArray);

        return _possibleConstructorReturn(this, (FriendLinkArray.__proto__ || Object.getPrototypeOf(FriendLinkArray)).apply(this, arguments));
    }

    _createClass(FriendLinkArray, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this9 = this;

            this.arr = bb.readArray(function () {
                return bb.readBonCode(_this9._$EnumTypeMap ? _this9._$EnumTypeMap(_this9.arr) : user_s_1.FriendLink);
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.arr, function (el) {
                bb.writeBonCode(el);
            });
        }
    }]);

    return FriendLinkArray;
}(struct_mgr_1.Struct);

FriendLinkArray._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.FriendLinkArray", 2077736548, null, [new sinfo_1.FieldInfo("arr", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, user_s_1.FriendLink._$info)), null)]);
exports.FriendLinkArray = FriendLinkArray;

var GroupUserLinkArray = function (_struct_mgr_1$Struct7) {
    _inherits(GroupUserLinkArray, _struct_mgr_1$Struct7);

    function GroupUserLinkArray() {
        _classCallCheck(this, GroupUserLinkArray);

        return _possibleConstructorReturn(this, (GroupUserLinkArray.__proto__ || Object.getPrototypeOf(GroupUserLinkArray)).apply(this, arguments));
    }

    _createClass(GroupUserLinkArray, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this11 = this;

            this.arr = bb.readArray(function () {
                return bb.readBonCode(_this11._$EnumTypeMap ? _this11._$EnumTypeMap(_this11.arr) : group_s_1.GroupUserLink);
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.arr, function (el) {
                bb.writeBonCode(el);
            });
        }
    }]);

    return GroupUserLinkArray;
}(struct_mgr_1.Struct);

GroupUserLinkArray._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.GroupUserLinkArray", 2617440862, null, [new sinfo_1.FieldInfo("arr", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, group_s_1.GroupUserLink._$info)), null)]);
exports.GroupUserLinkArray = GroupUserLinkArray;

var GroupHistoryArray = function (_struct_mgr_1$Struct8) {
    _inherits(GroupHistoryArray, _struct_mgr_1$Struct8);

    function GroupHistoryArray() {
        _classCallCheck(this, GroupHistoryArray);

        return _possibleConstructorReturn(this, (GroupHistoryArray.__proto__ || Object.getPrototypeOf(GroupHistoryArray)).apply(this, arguments));
    }

    _createClass(GroupHistoryArray, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this13 = this;

            this.newMess = bb.readInt();
            this.arr = bb.readArray(function () {
                return bb.readBonCode(_this13._$EnumTypeMap ? _this13._$EnumTypeMap(_this13.arr) : message_s_1.GroupHistory);
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.newMess);
            bb.writeArray(this.arr, function (el) {
                bb.writeBonCode(el);
            });
        }
    }]);

    return GroupHistoryArray;
}(struct_mgr_1.Struct);

GroupHistoryArray._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.GroupHistoryArray", 2914149564, null, [new sinfo_1.FieldInfo("newMess", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("arr", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, message_s_1.GroupHistory._$info)), null)]);
exports.GroupHistoryArray = GroupHistoryArray;

var UserHistoryArray = function (_struct_mgr_1$Struct9) {
    _inherits(UserHistoryArray, _struct_mgr_1$Struct9);

    function UserHistoryArray() {
        _classCallCheck(this, UserHistoryArray);

        return _possibleConstructorReturn(this, (UserHistoryArray.__proto__ || Object.getPrototypeOf(UserHistoryArray)).apply(this, arguments));
    }

    _createClass(UserHistoryArray, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this15 = this;

            this.newMess = bb.readInt();
            this.arr = bb.readArray(function () {
                return bb.readBonCode(_this15._$EnumTypeMap ? _this15._$EnumTypeMap(_this15.arr) : message_s_1.UserHistory);
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.newMess);
            bb.writeArray(this.arr, function (el) {
                bb.writeBonCode(el);
            });
        }
    }]);

    return UserHistoryArray;
}(struct_mgr_1.Struct);

UserHistoryArray._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.UserHistoryArray", 1430657996, null, [new sinfo_1.FieldInfo("newMess", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("arr", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, message_s_1.UserHistory._$info)), null)]);
exports.UserHistoryArray = UserHistoryArray;

var AnnouceIds = function (_struct_mgr_1$Struct10) {
    _inherits(AnnouceIds, _struct_mgr_1$Struct10);

    function AnnouceIds() {
        _classCallCheck(this, AnnouceIds);

        return _possibleConstructorReturn(this, (AnnouceIds.__proto__ || Object.getPrototypeOf(AnnouceIds)).apply(this, arguments));
    }

    _createClass(AnnouceIds, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.arr = bb.readArray(function () {
                return bb.readUtf8();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.arr, function (el) {
                bb.writeUtf8(el);
            });
        }
    }]);

    return AnnouceIds;
}(struct_mgr_1.Struct);

AnnouceIds._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.AnnouceIds", 2781061830, null, [new sinfo_1.FieldInfo("arr", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str)), null)]);
exports.AnnouceIds = AnnouceIds;

var AnnounceHistoryArray = function (_struct_mgr_1$Struct11) {
    _inherits(AnnounceHistoryArray, _struct_mgr_1$Struct11);

    function AnnounceHistoryArray() {
        _classCallCheck(this, AnnounceHistoryArray);

        return _possibleConstructorReturn(this, (AnnounceHistoryArray.__proto__ || Object.getPrototypeOf(AnnounceHistoryArray)).apply(this, arguments));
    }

    _createClass(AnnounceHistoryArray, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this18 = this;

            this.arr = bb.readArray(function () {
                return bb.readBonCode(_this18._$EnumTypeMap ? _this18._$EnumTypeMap(_this18.arr) : message_s_1.AnnounceHistory);
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.arr, function (el) {
                bb.writeBonCode(el);
            });
        }
    }]);

    return AnnounceHistoryArray;
}(struct_mgr_1.Struct);

AnnounceHistoryArray._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.AnnounceHistoryArray", 2763830433, null, [new sinfo_1.FieldInfo("arr", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, message_s_1.AnnounceHistory._$info)), null)]);
exports.AnnounceHistoryArray = AnnounceHistoryArray;

var GetUserInfoReq = function (_struct_mgr_1$Struct12) {
    _inherits(GetUserInfoReq, _struct_mgr_1$Struct12);

    function GetUserInfoReq() {
        _classCallCheck(this, GetUserInfoReq);

        return _possibleConstructorReturn(this, (GetUserInfoReq.__proto__ || Object.getPrototypeOf(GetUserInfoReq)).apply(this, arguments));
    }

    _createClass(GetUserInfoReq, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uids = bb.readArray(function () {
                return bb.readInt();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.uids, function (el) {
                bb.writeInt(el);
            });
        }
    }]);

    return GetUserInfoReq;
}(struct_mgr_1.Struct);

GetUserInfoReq._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.GetUserInfoReq", 3147793361, null, [new sinfo_1.FieldInfo("uids", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Usize)), null)]);
exports.GetUserInfoReq = GetUserInfoReq;

var GetGroupInfoReq = function (_struct_mgr_1$Struct13) {
    _inherits(GetGroupInfoReq, _struct_mgr_1$Struct13);

    function GetGroupInfoReq() {
        _classCallCheck(this, GetGroupInfoReq);

        return _possibleConstructorReturn(this, (GetGroupInfoReq.__proto__ || Object.getPrototypeOf(GetGroupInfoReq)).apply(this, arguments));
    }

    _createClass(GetGroupInfoReq, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.gids = bb.readArray(function () {
                return bb.readInt();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.gids, function (el) {
                bb.writeInt(el);
            });
        }
    }]);

    return GetGroupInfoReq;
}(struct_mgr_1.Struct);

GetGroupInfoReq._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.GetGroupInfoReq", 2856997917, null, [new sinfo_1.FieldInfo("gids", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Usize)), null)]);
exports.GetGroupInfoReq = GetGroupInfoReq;

var GetContactReq = function (_struct_mgr_1$Struct14) {
    _inherits(GetContactReq, _struct_mgr_1$Struct14);

    function GetContactReq() {
        _classCallCheck(this, GetContactReq);

        return _possibleConstructorReturn(this, (GetContactReq.__proto__ || Object.getPrototypeOf(GetContactReq)).apply(this, arguments));
    }

    _createClass(GetContactReq, [{
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

    return GetContactReq;
}(struct_mgr_1.Struct);

GetContactReq._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.GetContactReq", 2530690556, null, [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.Usize), null)]);
exports.GetContactReq = GetContactReq;

var GetFriendLinksReq = function (_struct_mgr_1$Struct15) {
    _inherits(GetFriendLinksReq, _struct_mgr_1$Struct15);

    function GetFriendLinksReq() {
        _classCallCheck(this, GetFriendLinksReq);

        return _possibleConstructorReturn(this, (GetFriendLinksReq.__proto__ || Object.getPrototypeOf(GetFriendLinksReq)).apply(this, arguments));
    }

    _createClass(GetFriendLinksReq, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uuid = bb.readArray(function () {
                return bb.readUtf8();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.uuid, function (el) {
                bb.writeUtf8(el);
            });
        }
    }]);

    return GetFriendLinksReq;
}(struct_mgr_1.Struct);

GetFriendLinksReq._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.GetFriendLinksReq", 628012644, null, [new sinfo_1.FieldInfo("uuid", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str)), null)]);
exports.GetFriendLinksReq = GetFriendLinksReq;

var LoginReq = function (_struct_mgr_1$Struct16) {
    _inherits(LoginReq, _struct_mgr_1$Struct16);

    function LoginReq() {
        _classCallCheck(this, LoginReq);

        return _possibleConstructorReturn(this, (LoginReq.__proto__ || Object.getPrototypeOf(LoginReq)).apply(this, arguments));
    }

    _createClass(LoginReq, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.passwdHash = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeUtf8(this.passwdHash);
        }
    }]);

    return LoginReq;
}(struct_mgr_1.Struct);

LoginReq._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.LoginReq", 2547021879, null, [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("passwdHash", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.LoginReq = LoginReq;

var WalletLoginReq = function (_struct_mgr_1$Struct17) {
    _inherits(WalletLoginReq, _struct_mgr_1$Struct17);

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

WalletLoginReq._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.WalletLoginReq", 1767631509, null, [new sinfo_1.FieldInfo("openid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("sign", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.WalletLoginReq = WalletLoginReq;
var UserType_Enum;
(function (UserType_Enum) {
    UserType_Enum[UserType_Enum["DEF"] = 1] = "DEF";
    UserType_Enum[UserType_Enum["WALLET"] = 2] = "WALLET";
})(UserType_Enum = exports.UserType_Enum || (exports.UserType_Enum = {}));

var UserType = function (_struct_mgr_1$Struct18) {
    _inherits(UserType, _struct_mgr_1$Struct18);

    function UserType(type, value) {
        _classCallCheck(this, UserType);

        var _this25 = _possibleConstructorReturn(this, (UserType.__proto__ || Object.getPrototypeOf(UserType)).call(this));

        _this25.enum_type = type;
        _this25.value = value;
        return _this25;
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

UserType._$info = new sinfo_1.EnumInfo('chat/server/data/rpc/basic.UserType', 1467398399, null, [new sinfo_1.EnumType(sinfo_1.Type.Struct, LoginReq._$info), new sinfo_1.EnumType(sinfo_1.Type.Struct, WalletLoginReq._$info)]);
exports.UserType = UserType;

var LoginReply = function (_struct_mgr_1$Struct19) {
    _inherits(LoginReply, _struct_mgr_1$Struct19);

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

LoginReply._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.LoginReply", 1290079720, null, [new sinfo_1.FieldInfo("status", new sinfo_1.EnumType(sinfo_1.Type.U8), null)]);
exports.LoginReply = LoginReply;

var UserHistoryFlag = function (_struct_mgr_1$Struct20) {
    _inherits(UserHistoryFlag, _struct_mgr_1$Struct20);

    function UserHistoryFlag() {
        _classCallCheck(this, UserHistoryFlag);

        return _possibleConstructorReturn(this, (UserHistoryFlag.__proto__ || Object.getPrototypeOf(UserHistoryFlag)).apply(this, arguments));
    }

    _createClass(UserHistoryFlag, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.rid = bb.readInt();
            this.start = bb.readInt();
            this.end = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.rid);
            bb.writeInt(this.start);
            bb.writeInt(this.end);
        }
    }]);

    return UserHistoryFlag;
}(struct_mgr_1.Struct);

UserHistoryFlag._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.UserHistoryFlag", 4006120980, null, [new sinfo_1.FieldInfo("rid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("start", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("end", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.UserHistoryFlag = UserHistoryFlag;

var GroupHistoryFlag = function (_struct_mgr_1$Struct21) {
    _inherits(GroupHistoryFlag, _struct_mgr_1$Struct21);

    function GroupHistoryFlag() {
        _classCallCheck(this, GroupHistoryFlag);

        return _possibleConstructorReturn(this, (GroupHistoryFlag.__proto__ || Object.getPrototypeOf(GroupHistoryFlag)).apply(this, arguments));
    }

    _createClass(GroupHistoryFlag, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.gid = bb.readInt();
            this.start = bb.readInt();
            this.end = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.gid);
            bb.writeInt(this.start);
            bb.writeInt(this.end);
        }
    }]);

    return GroupHistoryFlag;
}(struct_mgr_1.Struct);

GroupHistoryFlag._$info = new sinfo_1.StructInfo("chat/server/data/rpc/basic.GroupHistoryFlag", 229723152, null, [new sinfo_1.FieldInfo("gid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("start", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("end", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.GroupHistoryFlag = GroupHistoryFlag;
})