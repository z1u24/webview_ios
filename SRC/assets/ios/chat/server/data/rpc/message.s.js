_$define("chat/server/data/rpc/message.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../../pi/struct/sinfo");

var AnnounceSend = function (_struct_mgr_1$Struct) {
    _inherits(AnnounceSend, _struct_mgr_1$Struct);

    function AnnounceSend() {
        _classCallCheck(this, AnnounceSend);

        return _possibleConstructorReturn(this, (AnnounceSend.__proto__ || Object.getPrototypeOf(AnnounceSend)).apply(this, arguments));
    }

    _createClass(AnnounceSend, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.gid = bb.readInt();
            this.mtype = bb.readInt();
            this.msg = bb.readUtf8();
            this.time = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.gid);
            bb.writeInt(this.mtype);
            bb.writeUtf8(this.msg);
            bb.writeInt(this.time);
        }
    }]);

    return AnnounceSend;
}(struct_mgr_1.Struct);

AnnounceSend._$info = new sinfo_1.StructInfo("chat/server/data/rpc/message.AnnounceSend", 3980802610, null, [new sinfo_1.FieldInfo("gid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("mtype", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("msg", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("time", new sinfo_1.EnumType(sinfo_1.Type.Usize), null)]);
exports.AnnounceSend = AnnounceSend;

var UserSend = function (_struct_mgr_1$Struct2) {
    _inherits(UserSend, _struct_mgr_1$Struct2);

    function UserSend() {
        _classCallCheck(this, UserSend);

        return _possibleConstructorReturn(this, (UserSend.__proto__ || Object.getPrototypeOf(UserSend)).apply(this, arguments));
    }

    _createClass(UserSend, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.rid = bb.readInt();
            this.mtype = bb.readInt();
            this.msg = bb.readUtf8();
            this.time = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.rid);
            bb.writeInt(this.mtype);
            bb.writeUtf8(this.msg);
            bb.writeInt(this.time);
        }
    }]);

    return UserSend;
}(struct_mgr_1.Struct);

UserSend._$info = new sinfo_1.StructInfo("chat/server/data/rpc/message.UserSend", 1179219154, null, [new sinfo_1.FieldInfo("rid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("mtype", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("msg", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("time", new sinfo_1.EnumType(sinfo_1.Type.Usize), null)]);
exports.UserSend = UserSend;

var GroupSend = function (_struct_mgr_1$Struct3) {
    _inherits(GroupSend, _struct_mgr_1$Struct3);

    function GroupSend() {
        _classCallCheck(this, GroupSend);

        return _possibleConstructorReturn(this, (GroupSend.__proto__ || Object.getPrototypeOf(GroupSend)).apply(this, arguments));
    }

    _createClass(GroupSend, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.gid = bb.readInt();
            this.mtype = bb.readInt();
            this.msg = bb.readUtf8();
            this.time = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.gid);
            bb.writeInt(this.mtype);
            bb.writeUtf8(this.msg);
            bb.writeInt(this.time);
        }
    }]);

    return GroupSend;
}(struct_mgr_1.Struct);

GroupSend._$info = new sinfo_1.StructInfo("chat/server/data/rpc/message.GroupSend", 1762321327, null, [new sinfo_1.FieldInfo("gid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("mtype", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("msg", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("time", new sinfo_1.EnumType(sinfo_1.Type.Usize), null)]);
exports.GroupSend = GroupSend;

var HistoryCursor = function (_struct_mgr_1$Struct4) {
    _inherits(HistoryCursor, _struct_mgr_1$Struct4);

    function HistoryCursor() {
        _classCallCheck(this, HistoryCursor);

        return _possibleConstructorReturn(this, (HistoryCursor.__proto__ || Object.getPrototypeOf(HistoryCursor)).apply(this, arguments));
    }

    _createClass(HistoryCursor, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.code = bb.readInt();
            this.cursor = bb.readInt();
            this.last = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.code);
            bb.writeInt(this.cursor);
            bb.writeInt(this.last);
        }
    }]);

    return HistoryCursor;
}(struct_mgr_1.Struct);

HistoryCursor._$info = new sinfo_1.StructInfo("chat/server/data/rpc/message.HistoryCursor", 452972435, null, [new sinfo_1.FieldInfo("code", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("cursor", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("last", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.HistoryCursor = HistoryCursor;

var SendMsg = function (_struct_mgr_1$Struct5) {
    _inherits(SendMsg, _struct_mgr_1$Struct5);

    function SendMsg() {
        _classCallCheck(this, SendMsg);

        return _possibleConstructorReturn(this, (SendMsg.__proto__ || Object.getPrototypeOf(SendMsg)).apply(this, arguments));
    }

    _createClass(SendMsg, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.code = bb.readInt();
            this.rid = bb.readInt();
            this.last = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.code);
            bb.writeInt(this.rid);
            bb.writeInt(this.last);
        }
    }]);

    return SendMsg;
}(struct_mgr_1.Struct);

SendMsg._$info = new sinfo_1.StructInfo("chat/server/data/rpc/message.SendMsg", 3272782018, null, [new sinfo_1.FieldInfo("code", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("rid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("last", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.SendMsg = SendMsg;
})