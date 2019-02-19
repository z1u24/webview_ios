_$define("earn/server/data/db/invite.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../../pi/struct/sinfo");
var item_s_1 = require("./item.s");

var Invite = function (_struct_mgr_1$Struct) {
    _inherits(Invite, _struct_mgr_1$Struct);

    function Invite() {
        _classCallCheck(this, Invite);

        return _possibleConstructorReturn(this, (Invite.__proto__ || Object.getPrototypeOf(Invite)).apply(this, arguments));
    }

    _createClass(Invite, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this2 = this;

            this.code = bb.readUtf8();
            this.items = bb.readArray(function () {
                return bb.readBonCode(_this2._$EnumTypeMap ? _this2._$EnumTypeMap(_this2.items) : item_s_1.Award);
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.code);
            bb.writeArray(this.items, function (el) {
                bb.writeBonCode(el);
            });
        }
    }]);

    return Invite;
}(struct_mgr_1.Struct);

Invite._$info = new sinfo_1.StructInfo("earn/server/data/db/invite.Invite", 2135307962, new Map([["primary", "code"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("code", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("items", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, item_s_1.Award._$info)), null)]);
exports.Invite = Invite;
})