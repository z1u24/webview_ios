_$define("earn/client/app/xls/dataCfg.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../../pi/struct/sinfo");

var PrizeCfg = function (_struct_mgr_1$Struct) {
    _inherits(PrizeCfg, _struct_mgr_1$Struct);

    function PrizeCfg(pid, zh_hans, zh_hant, unit, old) {
        _classCallCheck(this, PrizeCfg);

        var _this = _possibleConstructorReturn(this, (PrizeCfg.__proto__ || Object.getPrototypeOf(PrizeCfg)).call(this));

        if (!old) {
            _this.pid = pid;
            _this.zh_hans = zh_hans;
            _this.zh_hant = zh_hant;
            _this.unit = unit;
        } else {
            _this.pid = pid === undefined ? old.pid : pid;
            _this.zh_hans = zh_hans === undefined ? old.zh_hans : zh_hans;
            _this.zh_hant = zh_hant === undefined ? old.zh_hant : zh_hant;
            _this.unit = unit === undefined ? old.unit : unit;
        }
        return _this;
    }

    _createClass(PrizeCfg, [{
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
            this.zh_hans = bb.readUtf8();
            this.zh_hant = bb.readUtf8();
            this.unit = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.pid);
            bb.writeUtf8(this.zh_hans);
            bb.writeUtf8(this.zh_hant);
            bb.writeUtf8(this.unit);
        }
    }]);

    return PrizeCfg;
}(struct_mgr_1.Struct);

PrizeCfg._$info = new sinfo_1.StructInfo("earn/client/app/xls/dataCfg.PrizeCfg", 3682465628, new Map([["db", "memory"], ["readonly", "true"], ["primary", "pid"]]), [new sinfo_1.FieldInfo("pid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("zh_hans", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("zh_hant", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("unit", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.PrizeCfg = PrizeCfg;

var ActTicketNumCfg = function (_struct_mgr_1$Struct2) {
    _inherits(ActTicketNumCfg, _struct_mgr_1$Struct2);

    function ActTicketNumCfg(actType, ticketNum, desc, old) {
        _classCallCheck(this, ActTicketNumCfg);

        var _this2 = _possibleConstructorReturn(this, (ActTicketNumCfg.__proto__ || Object.getPrototypeOf(ActTicketNumCfg)).call(this));

        if (!old) {
            _this2.actType = actType;
            _this2.ticketNum = ticketNum;
            _this2.desc = desc;
        } else {
            _this2.actType = actType === undefined ? old.actType : actType;
            _this2.ticketNum = ticketNum === undefined ? old.ticketNum : ticketNum;
            _this2.desc = desc === undefined ? old.desc : desc;
        }
        return _this2;
    }

    _createClass(ActTicketNumCfg, [{
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
            this.actType = bb.readInt();
            this.ticketNum = bb.readInt();
            this.desc = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.actType);
            bb.writeInt(this.ticketNum);
            bb.writeUtf8(this.desc);
        }
    }]);

    return ActTicketNumCfg;
}(struct_mgr_1.Struct);

ActTicketNumCfg._$info = new sinfo_1.StructInfo("earn/client/app/xls/dataCfg.ActTicketNumCfg", 771945773, new Map([["db", "memory"], ["readonly", "true"]]), [new sinfo_1.FieldInfo("actType", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("ticketNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("desc", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.ActTicketNumCfg = ActTicketNumCfg;
})