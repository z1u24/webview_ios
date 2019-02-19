_$define("chat/server/data/db/user.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../../pi/struct/sinfo");
var SEXY;
(function (SEXY) {
    SEXY[SEXY["FAMALE"] = 0] = "FAMALE";
    SEXY[SEXY["MALE"] = 1] = "MALE";
})(SEXY = exports.SEXY || (exports.SEXY = {}));
var GENERATOR_TYPE;
(function (GENERATOR_TYPE) {
    GENERATOR_TYPE["USER"] = "user";
    GENERATOR_TYPE["GROUP"] = "group";
})(GENERATOR_TYPE = exports.GENERATOR_TYPE || (exports.GENERATOR_TYPE = {}));

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
            this.name = bb.readUtf8();
            this.avatar = bb.readUtf8();
            this.sex = bb.readInt();
            this.tel = bb.readUtf8();
            this.note = bb.readUtf8();
            this.wallet_addr = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeUtf8(this.name);
            bb.writeUtf8(this.avatar);
            bb.writeInt(this.sex);
            bb.writeUtf8(this.tel);
            bb.writeUtf8(this.note);
            bb.writeUtf8(this.wallet_addr);
        }
    }]);

    return UserInfo;
}(struct_mgr_1.Struct);

UserInfo._$info = new sinfo_1.StructInfo("chat/server/data/db/user.UserInfo", 1769539731, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("avatar", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("sex", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("tel", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("note", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("wallet_addr", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.UserInfo = UserInfo;

var UserCredential = function (_struct_mgr_1$Struct2) {
    _inherits(UserCredential, _struct_mgr_1$Struct2);

    function UserCredential() {
        _classCallCheck(this, UserCredential);

        return _possibleConstructorReturn(this, (UserCredential.__proto__ || Object.getPrototypeOf(UserCredential)).apply(this, arguments));
    }

    _createClass(UserCredential, [{
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
            this.passwdHash = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeUtf8(this.passwdHash);
        }
    }]);

    return UserCredential;
}(struct_mgr_1.Struct);

UserCredential._$info = new sinfo_1.StructInfo("chat/server/data/db/user.UserCredential", 2717825780, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("passwdHash", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.UserCredential = UserCredential;

var UserAccount = function (_struct_mgr_1$Struct3) {
    _inherits(UserAccount, _struct_mgr_1$Struct3);

    function UserAccount() {
        _classCallCheck(this, UserAccount);

        return _possibleConstructorReturn(this, (UserAccount.__proto__ || Object.getPrototypeOf(UserAccount)).apply(this, arguments));
    }

    _createClass(UserAccount, [{
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
            this.user = bb.readUtf8();
            this.uid = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.user);
            bb.writeInt(this.uid);
        }
    }]);

    return UserAccount;
}(struct_mgr_1.Struct);

UserAccount._$info = new sinfo_1.StructInfo("chat/server/data/db/user.UserAccount", 2938095008, new Map([["primary", "user"], ["db", "file"], ["dbMonitor", "true"]]), [new sinfo_1.FieldInfo("user", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.UserAccount = UserAccount;

var UserFind = function (_struct_mgr_1$Struct4) {
    _inherits(UserFind, _struct_mgr_1$Struct4);

    function UserFind() {
        _classCallCheck(this, UserFind);

        return _possibleConstructorReturn(this, (UserFind.__proto__ || Object.getPrototypeOf(UserFind)).apply(this, arguments));
    }

    _createClass(UserFind, [{
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
            this.user = bb.readUtf8();
            this.uid = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.user);
            bb.writeInt(this.uid);
        }
    }]);

    return UserFind;
}(struct_mgr_1.Struct);

UserFind._$info = new sinfo_1.StructInfo("chat/server/data/db/user.UserFind", 965565401, new Map([["primary", "user"], ["db", "file"], ["dbMonitor", "true"]]), [new sinfo_1.FieldInfo("user", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.UserFind = UserFind;

var AccountGenerator = function (_struct_mgr_1$Struct5) {
    _inherits(AccountGenerator, _struct_mgr_1$Struct5);

    function AccountGenerator() {
        _classCallCheck(this, AccountGenerator);

        return _possibleConstructorReturn(this, (AccountGenerator.__proto__ || Object.getPrototypeOf(AccountGenerator)).apply(this, arguments));
    }

    _createClass(AccountGenerator, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.index = bb.readUtf8();
            this.currentIndex = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.index);
            bb.writeInt(this.currentIndex);
        }
    }]);

    return AccountGenerator;
}(struct_mgr_1.Struct);

AccountGenerator._$info = new sinfo_1.StructInfo("chat/server/data/db/user.AccountGenerator", 3845367897, new Map([["primary", "index"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("index", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("currentIndex", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.AccountGenerator = AccountGenerator;

var FriendLink = function (_struct_mgr_1$Struct6) {
    _inherits(FriendLink, _struct_mgr_1$Struct6);

    function FriendLink() {
        _classCallCheck(this, FriendLink);

        return _possibleConstructorReturn(this, (FriendLink.__proto__ || Object.getPrototypeOf(FriendLink)).apply(this, arguments));
    }

    _createClass(FriendLink, [{
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
            this.uuid = bb.readUtf8();
            this.alias = bb.readUtf8();
            this.hid = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.uuid);
            bb.writeUtf8(this.alias);
            bb.writeUtf8(this.hid);
        }
    }]);

    return FriendLink;
}(struct_mgr_1.Struct);

FriendLink._$info = new sinfo_1.StructInfo("chat/server/data/db/user.FriendLink", 3103252508, new Map([["primary", "uuid"], ["db", "file"], ["dbMonitor", "true"]]), [new sinfo_1.FieldInfo("uuid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("alias", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("hid", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.FriendLink = FriendLink;

var Contact = function (_struct_mgr_1$Struct7) {
    _inherits(Contact, _struct_mgr_1$Struct7);

    function Contact() {
        _classCallCheck(this, Contact);

        return _possibleConstructorReturn(this, (Contact.__proto__ || Object.getPrototypeOf(Contact)).apply(this, arguments));
    }

    _createClass(Contact, [{
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
            this.friends = bb.readArray(function () {
                return bb.readInt();
            });
            this.temp_chat = bb.readArray(function () {
                return bb.readInt();
            });
            this.group = bb.readArray(function () {
                return bb.readInt();
            });
            this.applyUser = bb.readArray(function () {
                return bb.readInt();
            });
            this.applyGroup = bb.readArray(function () {
                return bb.readUtf8();
            });
            this.blackList = bb.readArray(function () {
                return bb.readInt();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeArray(this.friends, function (el) {
                bb.writeInt(el);
            });
            bb.writeArray(this.temp_chat, function (el) {
                bb.writeInt(el);
            });
            bb.writeArray(this.group, function (el) {
                bb.writeInt(el);
            });
            bb.writeArray(this.applyUser, function (el) {
                bb.writeInt(el);
            });
            bb.writeArray(this.applyGroup, function (el) {
                bb.writeUtf8(el);
            });
            bb.writeArray(this.blackList, function (el) {
                bb.writeInt(el);
            });
        }
    }]);

    return Contact;
}(struct_mgr_1.Struct);

Contact._$info = new sinfo_1.StructInfo("chat/server/data/db/user.Contact", 2474863549, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("friends", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32)), null), new sinfo_1.FieldInfo("temp_chat", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32)), null), new sinfo_1.FieldInfo("group", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32)), null), new sinfo_1.FieldInfo("applyUser", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32)), null), new sinfo_1.FieldInfo("applyGroup", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str)), null), new sinfo_1.FieldInfo("blackList", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.Contact = Contact;

var OnlineUsers = function (_struct_mgr_1$Struct8) {
    _inherits(OnlineUsers, _struct_mgr_1$Struct8);

    function OnlineUsers() {
        _classCallCheck(this, OnlineUsers);

        return _possibleConstructorReturn(this, (OnlineUsers.__proto__ || Object.getPrototypeOf(OnlineUsers)).apply(this, arguments));
    }

    _createClass(OnlineUsers, [{
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
            this.sessionId = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeInt(this.sessionId);
        }
    }]);

    return OnlineUsers;
}(struct_mgr_1.Struct);

OnlineUsers._$info = new sinfo_1.StructInfo("chat/server/data/db/user.OnlineUsers", 1381957601, new Map([["primary", "uid"], ["db", "memory"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("sessionId", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.OnlineUsers = OnlineUsers;

var OnlineUsersReverseIndex = function (_struct_mgr_1$Struct9) {
    _inherits(OnlineUsersReverseIndex, _struct_mgr_1$Struct9);

    function OnlineUsersReverseIndex() {
        _classCallCheck(this, OnlineUsersReverseIndex);

        return _possibleConstructorReturn(this, (OnlineUsersReverseIndex.__proto__ || Object.getPrototypeOf(OnlineUsersReverseIndex)).apply(this, arguments));
    }

    _createClass(OnlineUsersReverseIndex, [{
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
            this.sessionId = bb.readInt();
            this.uid = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.sessionId);
            bb.writeInt(this.uid);
        }
    }]);

    return OnlineUsersReverseIndex;
}(struct_mgr_1.Struct);

OnlineUsersReverseIndex._$info = new sinfo_1.StructInfo("chat/server/data/db/user.OnlineUsersReverseIndex", 1368545686, new Map([["primary", "sessionId"], ["db", "memory"]]), [new sinfo_1.FieldInfo("sessionId", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.OnlineUsersReverseIndex = OnlineUsersReverseIndex;

var FrontStoreData = function (_struct_mgr_1$Struct10) {
    _inherits(FrontStoreData, _struct_mgr_1$Struct10);

    function FrontStoreData() {
        _classCallCheck(this, FrontStoreData);

        return _possibleConstructorReturn(this, (FrontStoreData.__proto__ || Object.getPrototypeOf(FrontStoreData)).apply(this, arguments));
    }

    _createClass(FrontStoreData, [{
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
            this.value = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeUtf8(this.value);
        }
    }]);

    return FrontStoreData;
}(struct_mgr_1.Struct);

FrontStoreData._$info = new sinfo_1.StructInfo("chat/server/data/db/user.FrontStoreData", 2236816187, new Map([["primary", "uid"], ["db", "file"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("value", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.FrontStoreData = FrontStoreData;
})