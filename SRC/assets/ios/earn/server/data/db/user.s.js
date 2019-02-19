_$define("earn/server/data/db/user.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../../pi/struct/sinfo");

var UserAcc = function (_struct_mgr_1$Struct) {
    _inherits(UserAcc, _struct_mgr_1$Struct);

    function UserAcc() {
        _classCallCheck(this, UserAcc);

        return _possibleConstructorReturn(this, (UserAcc.__proto__ || Object.getPrototypeOf(UserAcc)).apply(this, arguments));
    }

    _createClass(UserAcc, [{
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

    return UserAcc;
}(struct_mgr_1.Struct);

UserAcc._$info = new sinfo_1.StructInfo("earn/server/data/db/user.UserAcc", 1822066610, new Map([["primary", "user"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("user", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.UserAcc = UserAcc;

var UserAccMap = function (_struct_mgr_1$Struct2) {
    _inherits(UserAccMap, _struct_mgr_1$Struct2);

    function UserAccMap(uid, openid, old) {
        _classCallCheck(this, UserAccMap);

        var _this2 = _possibleConstructorReturn(this, (UserAccMap.__proto__ || Object.getPrototypeOf(UserAccMap)).call(this));

        if (!old) {
            _this2.uid = uid;
            _this2.openid = openid;
        } else {
            _this2.uid = uid === undefined ? old.uid : uid;
            _this2.openid = openid === undefined ? old.openid : openid;
        }
        return _this2;
    }

    _createClass(UserAccMap, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.openid = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeUtf8(this.openid);
        }
    }]);

    return UserAccMap;
}(struct_mgr_1.Struct);

UserAccMap._$info = new sinfo_1.StructInfo("earn/server/data/db/user.UserAccMap", 3585513635, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("openid", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.UserAccMap = UserAccMap;

var UserInfo = function (_struct_mgr_1$Struct3) {
    _inherits(UserInfo, _struct_mgr_1$Struct3);

    function UserInfo() {
        _classCallCheck(this, UserInfo);

        return _possibleConstructorReturn(this, (UserInfo.__proto__ || Object.getPrototypeOf(UserInfo)).apply(this, arguments));
    }

    _createClass(UserInfo, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.name = bb.readUtf8();
            this.avatar = bb.readUtf8();
            this.sex = bb.readInt();
            this.tel = bb.readUtf8();
            this.note = bb.readUtf8();
            this.loginCount = bb.readInt();
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
            bb.writeInt(this.loginCount);
        }
    }]);

    return UserInfo;
}(struct_mgr_1.Struct);

UserInfo._$info = new sinfo_1.StructInfo("earn/server/data/db/user.UserInfo", 1556791355, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("avatar", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("sex", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("tel", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("note", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("loginCount", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.UserInfo = UserInfo;

var IDIndex = function (_struct_mgr_1$Struct4) {
    _inherits(IDIndex, _struct_mgr_1$Struct4);

    function IDIndex() {
        _classCallCheck(this, IDIndex);

        return _possibleConstructorReturn(this, (IDIndex.__proto__ || Object.getPrototypeOf(IDIndex)).apply(this, arguments));
    }

    _createClass(IDIndex, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.index = bb.readUtf8();
            this.id = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.index);
            bb.writeInt(this.id);
        }
    }]);

    return IDIndex;
}(struct_mgr_1.Struct);

IDIndex._$info = new sinfo_1.StructInfo("earn/server/data/db/user.IDIndex", 4020325710, new Map([["primary", "index"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("index", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.IDIndex = IDIndex;

var Online = function (_struct_mgr_1$Struct5) {
    _inherits(Online, _struct_mgr_1$Struct5);

    function Online() {
        _classCallCheck(this, Online);

        return _possibleConstructorReturn(this, (Online.__proto__ || Object.getPrototypeOf(Online)).apply(this, arguments));
    }

    _createClass(Online, [{
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
            this.session_id = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeInt(this.session_id);
        }
    }]);

    return Online;
}(struct_mgr_1.Struct);

Online._$info = new sinfo_1.StructInfo("earn/server/data/db/user.Online", 3717481381, new Map([["primary", "uid"], ["db", "memory"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("session_id", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.Online = Online;

var OnlineMap = function (_struct_mgr_1$Struct6) {
    _inherits(OnlineMap, _struct_mgr_1$Struct6);

    function OnlineMap() {
        _classCallCheck(this, OnlineMap);

        return _possibleConstructorReturn(this, (OnlineMap.__proto__ || Object.getPrototypeOf(OnlineMap)).apply(this, arguments));
    }

    _createClass(OnlineMap, [{
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
            this.session_id = bb.readInt();
            this.uid = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.session_id);
            bb.writeInt(this.uid);
        }
    }]);

    return OnlineMap;
}(struct_mgr_1.Struct);

OnlineMap._$info = new sinfo_1.StructInfo("earn/server/data/db/user.OnlineMap", 1176035516, new Map([["primary", "session_id"], ["db", "memory"]]), [new sinfo_1.FieldInfo("session_id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.OnlineMap = OnlineMap;

var DayliLoginKey = function (_struct_mgr_1$Struct7) {
    _inherits(DayliLoginKey, _struct_mgr_1$Struct7);

    function DayliLoginKey() {
        _classCallCheck(this, DayliLoginKey);

        return _possibleConstructorReturn(this, (DayliLoginKey.__proto__ || Object.getPrototypeOf(DayliLoginKey)).apply(this, arguments));
    }

    _createClass(DayliLoginKey, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.date = bb.readInt();
            this.uid = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.date);
            bb.writeInt(this.uid);
        }
    }]);

    return DayliLoginKey;
}(struct_mgr_1.Struct);

DayliLoginKey._$info = new sinfo_1.StructInfo("earn/server/data/db/user.DayliLoginKey", 501264440, null, [new sinfo_1.FieldInfo("date", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.DayliLoginKey = DayliLoginKey;

var DayliLogin = function (_struct_mgr_1$Struct8) {
    _inherits(DayliLogin, _struct_mgr_1$Struct8);

    function DayliLogin() {
        _classCallCheck(this, DayliLogin);

        return _possibleConstructorReturn(this, (DayliLogin.__proto__ || Object.getPrototypeOf(DayliLogin)).apply(this, arguments));
    }

    _createClass(DayliLogin, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.index = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.index) : DayliLoginKey);
            this.state = bb.readBool();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeBonCode(this.index);
            bb.writeBool(this.state);
        }
    }]);

    return DayliLogin;
}(struct_mgr_1.Struct);

DayliLogin._$info = new sinfo_1.StructInfo("earn/server/data/db/user.DayliLogin", 2927217573, new Map([["primary", "index"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("index", new sinfo_1.EnumType(sinfo_1.Type.Struct, DayliLoginKey._$info), null), new sinfo_1.FieldInfo("state", new sinfo_1.EnumType(sinfo_1.Type.Bool), null)]);
exports.DayliLogin = DayliLogin;

var SeriesLogin = function (_struct_mgr_1$Struct9) {
    _inherits(SeriesLogin, _struct_mgr_1$Struct9);

    function SeriesLogin() {
        _classCallCheck(this, SeriesLogin);

        return _possibleConstructorReturn(this, (SeriesLogin.__proto__ || Object.getPrototypeOf(SeriesLogin)).apply(this, arguments));
    }

    _createClass(SeriesLogin, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.days = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeInt(this.days);
        }
    }]);

    return SeriesLogin;
}(struct_mgr_1.Struct);

SeriesLogin._$info = new sinfo_1.StructInfo("earn/server/data/db/user.SeriesLogin", 2008571396, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("days", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.SeriesLogin = SeriesLogin;

var TotalLogin = function (_struct_mgr_1$Struct10) {
    _inherits(TotalLogin, _struct_mgr_1$Struct10);

    function TotalLogin() {
        _classCallCheck(this, TotalLogin);

        return _possibleConstructorReturn(this, (TotalLogin.__proto__ || Object.getPrototypeOf(TotalLogin)).apply(this, arguments));
    }

    _createClass(TotalLogin, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.days = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeInt(this.days);
        }
    }]);

    return TotalLogin;
}(struct_mgr_1.Struct);

TotalLogin._$info = new sinfo_1.StructInfo("earn/server/data/db/user.TotalLogin", 2582810821, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("days", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.TotalLogin = TotalLogin;

var InviteNumTab = function (_struct_mgr_1$Struct11) {
    _inherits(InviteNumTab, _struct_mgr_1$Struct11);

    function InviteNumTab() {
        _classCallCheck(this, InviteNumTab);

        return _possibleConstructorReturn(this, (InviteNumTab.__proto__ || Object.getPrototypeOf(InviteNumTab)).apply(this, arguments));
    }

    _createClass(InviteNumTab, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.inviteNum = bb.readInt();
            if (!bb.isNil()) {
                this.usedNum = bb.readArray(function () {
                    return bb.readInt();
                });
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeInt(this.inviteNum);
            if (this.usedNum === undefined || this.usedNum === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.usedNum, function (el) {
                    bb.writeInt(el);
                });
            }
        }
    }]);

    return InviteNumTab;
}(struct_mgr_1.Struct);

InviteNumTab._$info = new sinfo_1.StructInfo("earn/server/data/db/user.InviteNumTab", 4207788948, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("inviteNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("usedNum", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32))), null)]);
exports.InviteNumTab = InviteNumTab;

var InviteTab = function (_struct_mgr_1$Struct12) {
    _inherits(InviteTab, _struct_mgr_1$Struct12);

    function InviteTab() {
        _classCallCheck(this, InviteTab);

        return _possibleConstructorReturn(this, (InviteTab.__proto__ || Object.getPrototypeOf(InviteTab)).apply(this, arguments));
    }

    _createClass(InviteTab, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            if (!bb.isNil()) {
                this.fuid = bb.readArray(function () {
                    return bb.readInt();
                });
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            if (this.fuid === undefined || this.fuid === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.fuid, function (el) {
                    bb.writeInt(el);
                });
            }
        }
    }]);

    return InviteTab;
}(struct_mgr_1.Struct);

InviteTab._$info = new sinfo_1.StructInfo("earn/server/data/db/user.InviteTab", 3509446966, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("fuid", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32))), null)]);
exports.InviteTab = InviteTab;
})