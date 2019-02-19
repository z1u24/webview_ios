_$define("chat/server/data/db/group.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../../pi/struct/sinfo");
var GROUP_STATE;
(function (GROUP_STATE) {
    GROUP_STATE[GROUP_STATE["CREATED"] = 0] = "CREATED";
    GROUP_STATE[GROUP_STATE["DISSOLVE"] = 1] = "DISSOLVE";
})(GROUP_STATE = exports.GROUP_STATE || (exports.GROUP_STATE = {}));
var JOIN_METHOD;
(function (JOIN_METHOD) {
    JOIN_METHOD[JOIN_METHOD["USER_APPLY"] = 0] = "USER_APPLY";
    JOIN_METHOD[JOIN_METHOD["MEMBER_INVITE"] = 1] = "MEMBER_INVITE";
})(JOIN_METHOD = exports.JOIN_METHOD || (exports.JOIN_METHOD = {}));

var GroupInfo = function (_struct_mgr_1$Struct) {
    _inherits(GroupInfo, _struct_mgr_1$Struct);

    function GroupInfo() {
        _classCallCheck(this, GroupInfo);

        return _possibleConstructorReturn(this, (GroupInfo.__proto__ || Object.getPrototypeOf(GroupInfo)).apply(this, arguments));
    }

    _createClass(GroupInfo, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.gid = bb.readInt();
            this.name = bb.readUtf8();
            this.ownerid = bb.readInt();
            this.adminids = bb.readArray(function () {
                return bb.readInt();
            });
            this.memberids = bb.readArray(function () {
                return bb.readInt();
            });
            this.annoceids = bb.readArray(function () {
                return bb.readUtf8();
            });
            this.hid = bb.readUtf8();
            this.create_time = bb.readInt();
            this.dissolve_time = bb.readInt();
            this.join_method = bb.readInt();
            this.note = bb.readUtf8();
            this.state = bb.readInt();
            this.applyUser = bb.readArray(function () {
                return bb.readInt();
            });
            this.avatar = bb.readUtf8();
            this.need_agree = bb.readBool();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.gid);
            bb.writeUtf8(this.name);
            bb.writeInt(this.ownerid);
            bb.writeArray(this.adminids, function (el) {
                bb.writeInt(el);
            });
            bb.writeArray(this.memberids, function (el) {
                bb.writeInt(el);
            });
            bb.writeArray(this.annoceids, function (el) {
                bb.writeUtf8(el);
            });
            bb.writeUtf8(this.hid);
            bb.writeInt(this.create_time);
            bb.writeInt(this.dissolve_time);
            bb.writeInt(this.join_method);
            bb.writeUtf8(this.note);
            bb.writeInt(this.state);
            bb.writeArray(this.applyUser, function (el) {
                bb.writeInt(el);
            });
            bb.writeUtf8(this.avatar);
            bb.writeBool(this.need_agree);
        }
    }]);

    return GroupInfo;
}(struct_mgr_1.Struct);

GroupInfo._$info = new sinfo_1.StructInfo("chat/server/data/db/group.GroupInfo", 32518888, new Map([["primary", "gid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("gid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("ownerid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("adminids", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32)), null), new sinfo_1.FieldInfo("memberids", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32)), null), new sinfo_1.FieldInfo("annoceids", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str)), null), new sinfo_1.FieldInfo("hid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("create_time", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("dissolve_time", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("join_method", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("note", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("state", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("applyUser", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32)), null), new sinfo_1.FieldInfo("avatar", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("need_agree", new sinfo_1.EnumType(sinfo_1.Type.Bool), null)]);
exports.GroupInfo = GroupInfo;

var GroupUserLink = function (_struct_mgr_1$Struct2) {
    _inherits(GroupUserLink, _struct_mgr_1$Struct2);

    function GroupUserLink() {
        _classCallCheck(this, GroupUserLink);

        return _possibleConstructorReturn(this, (GroupUserLink.__proto__ || Object.getPrototypeOf(GroupUserLink)).apply(this, arguments));
    }

    _createClass(GroupUserLink, [{
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
            this.groupAlias = bb.readUtf8();
            this.userAlias = bb.readUtf8();
            this.hid = bb.readUtf8();
            this.join_time = bb.readInt();
            this.avatar = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.guid);
            bb.writeUtf8(this.groupAlias);
            bb.writeUtf8(this.userAlias);
            bb.writeUtf8(this.hid);
            bb.writeInt(this.join_time);
            bb.writeUtf8(this.avatar);
        }
    }]);

    return GroupUserLink;
}(struct_mgr_1.Struct);

GroupUserLink._$info = new sinfo_1.StructInfo("chat/server/data/db/group.GroupUserLink", 676246572, new Map([["primary", "guid"], ["db", "file"], ["dbMonitor", "true"]]), [new sinfo_1.FieldInfo("guid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("groupAlias", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("userAlias", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("hid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("join_time", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("avatar", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.GroupUserLink = GroupUserLink;
})