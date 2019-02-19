_$define("chat/server/data/rpc/group.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../../pi/struct/sinfo");

var MemberIdArray = function (_struct_mgr_1$Struct) {
    _inherits(MemberIdArray, _struct_mgr_1$Struct);

    function MemberIdArray() {
        _classCallCheck(this, MemberIdArray);

        return _possibleConstructorReturn(this, (MemberIdArray.__proto__ || Object.getPrototypeOf(MemberIdArray)).apply(this, arguments));
    }

    _createClass(MemberIdArray, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.arr = bb.readArray(function () {
                return bb.readInt();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.arr, function (el) {
                bb.writeInt(el);
            });
        }
    }]);

    return MemberIdArray;
}(struct_mgr_1.Struct);

MemberIdArray._$info = new sinfo_1.StructInfo("chat/server/data/rpc/group.MemberIdArray", 2609681020, null, [new sinfo_1.FieldInfo("arr", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.MemberIdArray = MemberIdArray;

var GroupCreate = function (_struct_mgr_1$Struct2) {
    _inherits(GroupCreate, _struct_mgr_1$Struct2);

    function GroupCreate() {
        _classCallCheck(this, GroupCreate);

        return _possibleConstructorReturn(this, (GroupCreate.__proto__ || Object.getPrototypeOf(GroupCreate)).apply(this, arguments));
    }

    _createClass(GroupCreate, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.name = bb.readUtf8();
            this.note = bb.readUtf8();
            this.avatar = bb.readUtf8();
            this.need_agree = bb.readBool();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.name);
            bb.writeUtf8(this.note);
            bb.writeUtf8(this.avatar);
            bb.writeBool(this.need_agree);
        }
    }]);

    return GroupCreate;
}(struct_mgr_1.Struct);

GroupCreate._$info = new sinfo_1.StructInfo("chat/server/data/rpc/group.GroupCreate", 1051423718, null, [new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("note", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("avatar", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("need_agree", new sinfo_1.EnumType(sinfo_1.Type.Bool), null)]);
exports.GroupCreate = GroupCreate;

var GroupAgree = function (_struct_mgr_1$Struct3) {
    _inherits(GroupAgree, _struct_mgr_1$Struct3);

    function GroupAgree() {
        _classCallCheck(this, GroupAgree);

        return _possibleConstructorReturn(this, (GroupAgree.__proto__ || Object.getPrototypeOf(GroupAgree)).apply(this, arguments));
    }

    _createClass(GroupAgree, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.gid = bb.readInt();
            this.uid = bb.readInt();
            this.agree = bb.readBool();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.gid);
            bb.writeInt(this.uid);
            bb.writeBool(this.agree);
        }
    }]);

    return GroupAgree;
}(struct_mgr_1.Struct);

GroupAgree._$info = new sinfo_1.StructInfo("chat/server/data/rpc/group.GroupAgree", 3905904030, null, [new sinfo_1.FieldInfo("gid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("agree", new sinfo_1.EnumType(sinfo_1.Type.Bool), null)]);
exports.GroupAgree = GroupAgree;

var Invite = function (_struct_mgr_1$Struct4) {
    _inherits(Invite, _struct_mgr_1$Struct4);

    function Invite() {
        _classCallCheck(this, Invite);

        return _possibleConstructorReturn(this, (Invite.__proto__ || Object.getPrototypeOf(Invite)).apply(this, arguments));
    }

    _createClass(Invite, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.gid = bb.readInt();
            this.rid = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.gid);
            bb.writeInt(this.rid);
        }
    }]);

    return Invite;
}(struct_mgr_1.Struct);

Invite._$info = new sinfo_1.StructInfo("chat/server/data/rpc/group.Invite", 2413783933, null, [new sinfo_1.FieldInfo("gid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("rid", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.Invite = Invite;
var INVITE_TYPE;
(function (INVITE_TYPE) {
    INVITE_TYPE[INVITE_TYPE["normal"] = 0] = "normal";
    INVITE_TYPE[INVITE_TYPE["game"] = 1] = "game";
})(INVITE_TYPE = exports.INVITE_TYPE || (exports.INVITE_TYPE = {}));

var InviteArray = function (_struct_mgr_1$Struct5) {
    _inherits(InviteArray, _struct_mgr_1$Struct5);

    function InviteArray() {
        _classCallCheck(this, InviteArray);

        return _possibleConstructorReturn(this, (InviteArray.__proto__ || Object.getPrototypeOf(InviteArray)).apply(this, arguments));
    }

    _createClass(InviteArray, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this6 = this;

            this.arr = bb.readArray(function () {
                return bb.readBonCode(_this6._$EnumTypeMap ? _this6._$EnumTypeMap(_this6.arr) : Invite);
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

    return InviteArray;
}(struct_mgr_1.Struct);

InviteArray._$info = new sinfo_1.StructInfo("chat/server/data/rpc/group.InviteArray", 2142149180, null, [new sinfo_1.FieldInfo("arr", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, Invite._$info)), null)]);
exports.InviteArray = InviteArray;

var NotifyAdmin = function (_struct_mgr_1$Struct6) {
    _inherits(NotifyAdmin, _struct_mgr_1$Struct6);

    function NotifyAdmin() {
        _classCallCheck(this, NotifyAdmin);

        return _possibleConstructorReturn(this, (NotifyAdmin.__proto__ || Object.getPrototypeOf(NotifyAdmin)).apply(this, arguments));
    }

    _createClass(NotifyAdmin, [{
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

    return NotifyAdmin;
}(struct_mgr_1.Struct);

NotifyAdmin._$info = new sinfo_1.StructInfo("chat/server/data/rpc/group.NotifyAdmin", 671892964, null, [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.NotifyAdmin = NotifyAdmin;

var GroupMembers = function (_struct_mgr_1$Struct7) {
    _inherits(GroupMembers, _struct_mgr_1$Struct7);

    function GroupMembers() {
        _classCallCheck(this, GroupMembers);

        return _possibleConstructorReturn(this, (GroupMembers.__proto__ || Object.getPrototypeOf(GroupMembers)).apply(this, arguments));
    }

    _createClass(GroupMembers, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.members = bb.readArray(function () {
                return bb.readInt();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.members, function (el) {
                bb.writeInt(el);
            });
        }
    }]);

    return GroupMembers;
}(struct_mgr_1.Struct);

GroupMembers._$info = new sinfo_1.StructInfo("chat/server/data/rpc/group.GroupMembers", 1064650443, null, [new sinfo_1.FieldInfo("members", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.GroupMembers = GroupMembers;

var GuidsAdminArray = function (_struct_mgr_1$Struct8) {
    _inherits(GuidsAdminArray, _struct_mgr_1$Struct8);

    function GuidsAdminArray() {
        _classCallCheck(this, GuidsAdminArray);

        return _possibleConstructorReturn(this, (GuidsAdminArray.__proto__ || Object.getPrototypeOf(GuidsAdminArray)).apply(this, arguments));
    }

    _createClass(GuidsAdminArray, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.guids = bb.readArray(function () {
                return bb.readUtf8();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.guids, function (el) {
                bb.writeUtf8(el);
            });
        }
    }]);

    return GuidsAdminArray;
}(struct_mgr_1.Struct);

GuidsAdminArray._$info = new sinfo_1.StructInfo("chat/server/data/rpc/group.GuidsAdminArray", 372317141, null, [new sinfo_1.FieldInfo("guids", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str)), null)]);
exports.GuidsAdminArray = GuidsAdminArray;

var NewGroup = function (_struct_mgr_1$Struct9) {
    _inherits(NewGroup, _struct_mgr_1$Struct9);

    function NewGroup() {
        _classCallCheck(this, NewGroup);

        return _possibleConstructorReturn(this, (NewGroup.__proto__ || Object.getPrototypeOf(NewGroup)).apply(this, arguments));
    }

    _createClass(NewGroup, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.gid = bb.readInt();
            this.name = bb.readUtf8();
            this.avatar = bb.readUtf8();
            this.note = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.gid);
            bb.writeUtf8(this.name);
            bb.writeUtf8(this.avatar);
            bb.writeUtf8(this.note);
        }
    }]);

    return NewGroup;
}(struct_mgr_1.Struct);

NewGroup._$info = new sinfo_1.StructInfo("chat/server/data/rpc/group.NewGroup", 3402660394, null, [new sinfo_1.FieldInfo("gid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("avatar", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("note", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.NewGroup = NewGroup;
})