_$define("earn/server/data/db/session.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../../pi/struct/sinfo");

var Session = function (_struct_mgr_1$Struct) {
    _inherits(Session, _struct_mgr_1$Struct);

    function Session() {
        _classCallCheck(this, Session);

        return _possibleConstructorReturn(this, (Session.__proto__ || Object.getPrototypeOf(Session)).apply(this, arguments));
    }

    _createClass(Session, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.key = bb.readUtf8();
            this.value = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.key);
            bb.writeUtf8(this.value);
        }
    }]);

    return Session;
}(struct_mgr_1.Struct);

Session._$info = new sinfo_1.StructInfo("earn/server/data/db/session.Session", 3183563572, null, [new sinfo_1.FieldInfo("key", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("value", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.Session = Session;

var SessionTab = function (_struct_mgr_1$Struct2) {
    _inherits(SessionTab, _struct_mgr_1$Struct2);

    function SessionTab() {
        _classCallCheck(this, SessionTab);

        return _possibleConstructorReturn(this, (SessionTab.__proto__ || Object.getPrototypeOf(SessionTab)).apply(this, arguments));
    }

    _createClass(SessionTab, [{
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
            var _this3 = this;

            this.id = bb.readUtf8();
            this.sessions = bb.readArray(function () {
                return bb.readBonCode(_this3._$EnumTypeMap ? _this3._$EnumTypeMap(_this3.sessions) : Session);
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.id);
            bb.writeArray(this.sessions, function (el) {
                bb.writeBonCode(el);
            });
        }
    }]);

    return SessionTab;
}(struct_mgr_1.Struct);

SessionTab._$info = new sinfo_1.StructInfo("earn/server/data/db/session.SessionTab", 1728330998, new Map([["primary", "id"], ["db", "memory"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("sessions", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, Session._$info)), null)]);
exports.SessionTab = SessionTab;
})