_$define("chat/server/data/db/message.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../../pi/struct/sinfo");
var MSG_TYPE;
(function (MSG_TYPE) {
    MSG_TYPE[MSG_TYPE["TXT"] = 1] = "TXT";
    MSG_TYPE[MSG_TYPE["IMG"] = 2] = "IMG";
    MSG_TYPE[MSG_TYPE["VOICE"] = 3] = "VOICE";
    MSG_TYPE[MSG_TYPE["VIDEO"] = 4] = "VIDEO";
    MSG_TYPE[MSG_TYPE["RECALL"] = 5] = "RECALL";
    MSG_TYPE[MSG_TYPE["NOTICE"] = 6] = "NOTICE";
    MSG_TYPE[MSG_TYPE["RENOTICE"] = 7] = "RENOTICE";
    MSG_TYPE[MSG_TYPE["ADDUSER"] = 8] = "ADDUSER";
    MSG_TYPE[MSG_TYPE["REDENVELOPE"] = 9] = "REDENVELOPE";
    MSG_TYPE[MSG_TYPE["CREATEGROUP"] = 10] = "CREATEGROUP";
    MSG_TYPE[MSG_TYPE["ADDGROUP"] = 11] = "ADDGROUP";
    MSG_TYPE[MSG_TYPE["COMPLAINT"] = 12] = "COMPLAINT";
})(MSG_TYPE = exports.MSG_TYPE || (exports.MSG_TYPE = {}));

var UserMsg = function (_struct_mgr_1$Struct) {
    _inherits(UserMsg, _struct_mgr_1$Struct);

    function UserMsg() {
        _classCallCheck(this, UserMsg);

        return _possibleConstructorReturn(this, (UserMsg.__proto__ || Object.getPrototypeOf(UserMsg)).apply(this, arguments));
    }

    _createClass(UserMsg, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.sid = bb.readInt();
            this.mtype = bb.readInt();
            this.msg = bb.readUtf8();
            this.time = bb.readInt();
            this.send = bb.readBool();
            this.read = bb.readBool();
            this.cancel = bb.readBool();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.sid);
            bb.writeInt(this.mtype);
            bb.writeUtf8(this.msg);
            bb.writeInt(this.time);
            bb.writeBool(this.send);
            bb.writeBool(this.read);
            bb.writeBool(this.cancel);
        }
    }]);

    return UserMsg;
}(struct_mgr_1.Struct);

UserMsg._$info = new sinfo_1.StructInfo("chat/server/data/db/message.UserMsg", 3509325398, null, [new sinfo_1.FieldInfo("sid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("mtype", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("msg", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("time", new sinfo_1.EnumType(sinfo_1.Type.Usize), null), new sinfo_1.FieldInfo("send", new sinfo_1.EnumType(sinfo_1.Type.Bool), null), new sinfo_1.FieldInfo("read", new sinfo_1.EnumType(sinfo_1.Type.Bool), null), new sinfo_1.FieldInfo("cancel", new sinfo_1.EnumType(sinfo_1.Type.Bool), null)]);
exports.UserMsg = UserMsg;

var GroupMsg = function (_struct_mgr_1$Struct2) {
    _inherits(GroupMsg, _struct_mgr_1$Struct2);

    function GroupMsg() {
        _classCallCheck(this, GroupMsg);

        return _possibleConstructorReturn(this, (GroupMsg.__proto__ || Object.getPrototypeOf(GroupMsg)).apply(this, arguments));
    }

    _createClass(GroupMsg, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.sid = bb.readInt();
            this.mtype = bb.readInt();
            this.msg = bb.readUtf8();
            this.time = bb.readInt();
            this.send = bb.readBool();
            this.cancel = bb.readBool();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.sid);
            bb.writeInt(this.mtype);
            bb.writeUtf8(this.msg);
            bb.writeInt(this.time);
            bb.writeBool(this.send);
            bb.writeBool(this.cancel);
        }
    }]);

    return GroupMsg;
}(struct_mgr_1.Struct);

GroupMsg._$info = new sinfo_1.StructInfo("chat/server/data/db/message.GroupMsg", 643842481, null, [new sinfo_1.FieldInfo("sid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("mtype", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("msg", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("time", new sinfo_1.EnumType(sinfo_1.Type.Usize), null), new sinfo_1.FieldInfo("send", new sinfo_1.EnumType(sinfo_1.Type.Bool), null), new sinfo_1.FieldInfo("cancel", new sinfo_1.EnumType(sinfo_1.Type.Bool), null)]);
exports.GroupMsg = GroupMsg;

var Announcement = function (_struct_mgr_1$Struct3) {
    _inherits(Announcement, _struct_mgr_1$Struct3);

    function Announcement() {
        _classCallCheck(this, Announcement);

        return _possibleConstructorReturn(this, (Announcement.__proto__ || Object.getPrototypeOf(Announcement)).apply(this, arguments));
    }

    _createClass(Announcement, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.sid = bb.readInt();
            this.mtype = bb.readInt();
            this.msg = bb.readUtf8();
            this.time = bb.readInt();
            this.send = bb.readBool();
            this.cancel = bb.readBool();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.sid);
            bb.writeInt(this.mtype);
            bb.writeUtf8(this.msg);
            bb.writeInt(this.time);
            bb.writeBool(this.send);
            bb.writeBool(this.cancel);
        }
    }]);

    return Announcement;
}(struct_mgr_1.Struct);

Announcement._$info = new sinfo_1.StructInfo("chat/server/data/db/message.Announcement", 1488065635, null, [new sinfo_1.FieldInfo("sid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("mtype", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("msg", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("time", new sinfo_1.EnumType(sinfo_1.Type.Usize), null), new sinfo_1.FieldInfo("send", new sinfo_1.EnumType(sinfo_1.Type.Bool), null), new sinfo_1.FieldInfo("cancel", new sinfo_1.EnumType(sinfo_1.Type.Bool), null)]);
exports.Announcement = Announcement;

var UserHistory = function (_struct_mgr_1$Struct4) {
    _inherits(UserHistory, _struct_mgr_1$Struct4);

    function UserHistory() {
        _classCallCheck(this, UserHistory);

        return _possibleConstructorReturn(this, (UserHistory.__proto__ || Object.getPrototypeOf(UserHistory)).apply(this, arguments));
    }

    _createClass(UserHistory, [{
        key: "addMeta",
        value: function addMeta(mgr) {
            if (this._$meta) return;
            this.msg && this.msg.addMeta(mgr);
            struct_mgr_1.addToMeta(mgr, this);
        }
    }, {
        key: "removeMeta",
        value: function removeMeta() {
            struct_mgr_1.removeFromMeta(this);
            this.msg && this.msg.removeMeta();
        }
    }, {
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.hIncId = bb.readUtf8();
            this.msg = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.msg) : UserMsg);
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.hIncId);
            bb.writeBonCode(this.msg);
        }
    }]);

    return UserHistory;
}(struct_mgr_1.Struct);

UserHistory._$info = new sinfo_1.StructInfo("chat/server/data/db/message.UserHistory", 1894689728, new Map([["primary", "hIncId"], ["db", "file"], ["dbMonitor", "true"]]), [new sinfo_1.FieldInfo("hIncId", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("msg", new sinfo_1.EnumType(sinfo_1.Type.Struct, UserMsg._$info), null)]);
exports.UserHistory = UserHistory;

var GroupHistory = function (_struct_mgr_1$Struct5) {
    _inherits(GroupHistory, _struct_mgr_1$Struct5);

    function GroupHistory() {
        _classCallCheck(this, GroupHistory);

        return _possibleConstructorReturn(this, (GroupHistory.__proto__ || Object.getPrototypeOf(GroupHistory)).apply(this, arguments));
    }

    _createClass(GroupHistory, [{
        key: "addMeta",
        value: function addMeta(mgr) {
            if (this._$meta) return;
            this.msg && this.msg.addMeta(mgr);
            struct_mgr_1.addToMeta(mgr, this);
        }
    }, {
        key: "removeMeta",
        value: function removeMeta() {
            struct_mgr_1.removeFromMeta(this);
            this.msg && this.msg.removeMeta();
        }
    }, {
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.hIncId = bb.readUtf8();
            this.msg = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.msg) : GroupMsg);
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.hIncId);
            bb.writeBonCode(this.msg);
        }
    }]);

    return GroupHistory;
}(struct_mgr_1.Struct);

GroupHistory._$info = new sinfo_1.StructInfo("chat/server/data/db/message.GroupHistory", 2984785667, new Map([["primary", "hIncId"], ["db", "file"], ["dbMonitor", "true"]]), [new sinfo_1.FieldInfo("hIncId", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("msg", new sinfo_1.EnumType(sinfo_1.Type.Struct, GroupMsg._$info), null)]);
exports.GroupHistory = GroupHistory;

var AnnounceHistory = function (_struct_mgr_1$Struct6) {
    _inherits(AnnounceHistory, _struct_mgr_1$Struct6);

    function AnnounceHistory() {
        _classCallCheck(this, AnnounceHistory);

        return _possibleConstructorReturn(this, (AnnounceHistory.__proto__ || Object.getPrototypeOf(AnnounceHistory)).apply(this, arguments));
    }

    _createClass(AnnounceHistory, [{
        key: "addMeta",
        value: function addMeta(mgr) {
            if (this._$meta) return;
            this.announce && this.announce.addMeta(mgr);
            struct_mgr_1.addToMeta(mgr, this);
        }
    }, {
        key: "removeMeta",
        value: function removeMeta() {
            struct_mgr_1.removeFromMeta(this);
            this.announce && this.announce.removeMeta();
        }
    }, {
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.aIncId = bb.readUtf8();
            this.announce = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.announce) : Announcement);
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.aIncId);
            bb.writeBonCode(this.announce);
        }
    }]);

    return AnnounceHistory;
}(struct_mgr_1.Struct);

AnnounceHistory._$info = new sinfo_1.StructInfo("chat/server/data/db/message.AnnounceHistory", 258960833, new Map([["primary", "aIncId"], ["db", "file"], ["dbMonitor", "true"]]), [new sinfo_1.FieldInfo("aIncId", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("announce", new sinfo_1.EnumType(sinfo_1.Type.Struct, Announcement._$info), null)]);
exports.AnnounceHistory = AnnounceHistory;

var MsgLock = function (_struct_mgr_1$Struct7) {
    _inherits(MsgLock, _struct_mgr_1$Struct7);

    function MsgLock() {
        _classCallCheck(this, MsgLock);

        return _possibleConstructorReturn(this, (MsgLock.__proto__ || Object.getPrototypeOf(MsgLock)).apply(this, arguments));
    }

    _createClass(MsgLock, [{
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
            this.hid = bb.readUtf8();
            this.current = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.hid);
            bb.writeInt(this.current);
        }
    }]);

    return MsgLock;
}(struct_mgr_1.Struct);

MsgLock._$info = new sinfo_1.StructInfo("chat/server/data/db/message.MsgLock", 2621969715, new Map([["primary", "hid"], ["db", "file"], ["dbMonitor", "true"]]), [new sinfo_1.FieldInfo("hid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("current", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.MsgLock = MsgLock;

var UserHistoryCursor = function (_struct_mgr_1$Struct8) {
    _inherits(UserHistoryCursor, _struct_mgr_1$Struct8);

    function UserHistoryCursor() {
        _classCallCheck(this, UserHistoryCursor);

        return _possibleConstructorReturn(this, (UserHistoryCursor.__proto__ || Object.getPrototypeOf(UserHistoryCursor)).apply(this, arguments));
    }

    _createClass(UserHistoryCursor, [{
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
            this.cursor = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.uuid);
            bb.writeInt(this.cursor);
        }
    }]);

    return UserHistoryCursor;
}(struct_mgr_1.Struct);

UserHistoryCursor._$info = new sinfo_1.StructInfo("chat/server/data/db/message.UserHistoryCursor", 1069557091, new Map([["primary", "uuid"], ["db", "file"]]), [new sinfo_1.FieldInfo("uuid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("cursor", new sinfo_1.EnumType(sinfo_1.Type.I32), null)]);
exports.UserHistoryCursor = UserHistoryCursor;

var GroupHistoryCursor = function (_struct_mgr_1$Struct9) {
    _inherits(GroupHistoryCursor, _struct_mgr_1$Struct9);

    function GroupHistoryCursor() {
        _classCallCheck(this, GroupHistoryCursor);

        return _possibleConstructorReturn(this, (GroupHistoryCursor.__proto__ || Object.getPrototypeOf(GroupHistoryCursor)).apply(this, arguments));
    }

    _createClass(GroupHistoryCursor, [{
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
            this.guid = bb.readUtf8();
            this.cursor = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.guid);
            bb.writeInt(this.cursor);
        }
    }]);

    return GroupHistoryCursor;
}(struct_mgr_1.Struct);

GroupHistoryCursor._$info = new sinfo_1.StructInfo("chat/server/data/db/message.GroupHistoryCursor", 2372808082, new Map([["primary", "guid"], ["db", "file"]]), [new sinfo_1.FieldInfo("guid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("cursor", new sinfo_1.EnumType(sinfo_1.Type.I32), null)]);
exports.GroupHistoryCursor = GroupHistoryCursor;
})