_$define("earn/xlsx/competition.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../pi/struct/struct_mgr");
var sinfo_1 = require("../../pi/struct/sinfo");

var LOLTeamInfosCfg = function (_struct_mgr_1$Struct) {
    _inherits(LOLTeamInfosCfg, _struct_mgr_1$Struct);

    function LOLTeamInfosCfg(pid, teamName, area, pic, old) {
        _classCallCheck(this, LOLTeamInfosCfg);

        var _this = _possibleConstructorReturn(this, (LOLTeamInfosCfg.__proto__ || Object.getPrototypeOf(LOLTeamInfosCfg)).call(this));

        if (!old) {
            _this.pid = pid;
            _this.teamName = teamName;
            _this.area = area;
            _this.pic = pic;
        } else {
            _this.pid = pid === undefined ? old.pid : pid;
            _this.teamName = teamName === undefined ? old.teamName : teamName;
            _this.area = area === undefined ? old.area : area;
            _this.pic = pic === undefined ? old.pic : pic;
        }
        return _this;
    }

    _createClass(LOLTeamInfosCfg, [{
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
            this.pid = bb.readInt();
            this.teamName = bb.readUtf8();
            this.area = bb.readUtf8();
            this.pic = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.pid);
            bb.writeUtf8(this.teamName);
            bb.writeUtf8(this.area);
            bb.writeUtf8(this.pic);
        }
    }]);

    return LOLTeamInfosCfg;
}(struct_mgr_1.Struct);

LOLTeamInfosCfg._$info = new sinfo_1.StructInfo("earn/xlsx/competition.LOLTeamInfosCfg", 921333032, new Map([["db", "memory"], ["readonly", "true"], ["primary", "pid"]]), [new sinfo_1.FieldInfo("pid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("teamName", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("area", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("pic", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.LOLTeamInfosCfg = LOLTeamInfosCfg;

var LOLTypeCfg = function (_struct_mgr_1$Struct2) {
    _inherits(LOLTypeCfg, _struct_mgr_1$Struct2);

    function LOLTypeCfg(pid, name, season, pic, old) {
        _classCallCheck(this, LOLTypeCfg);

        var _this2 = _possibleConstructorReturn(this, (LOLTypeCfg.__proto__ || Object.getPrototypeOf(LOLTypeCfg)).call(this));

        if (!old) {
            _this2.pid = pid;
            _this2.name = name;
            _this2.season = season;
            _this2.pic = pic;
        } else {
            _this2.pid = pid === undefined ? old.pid : pid;
            _this2.name = name === undefined ? old.name : name;
            _this2.season = season === undefined ? old.season : season;
            _this2.pic = pic === undefined ? old.pic : pic;
        }
        return _this2;
    }

    _createClass(LOLTypeCfg, [{
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
            this.pid = bb.readInt();
            this.name = bb.readUtf8();
            this.season = bb.readUtf8();
            this.pic = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.pid);
            bb.writeUtf8(this.name);
            bb.writeUtf8(this.season);
            bb.writeUtf8(this.pic);
        }
    }]);

    return LOLTypeCfg;
}(struct_mgr_1.Struct);

LOLTypeCfg._$info = new sinfo_1.StructInfo("earn/xlsx/competition.LOLTypeCfg", 2917795008, new Map([["db", "memory"], ["readonly", "true"], ["primary", "pid"]]), [new sinfo_1.FieldInfo("pid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("season", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("pic", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.LOLTypeCfg = LOLTypeCfg;
})