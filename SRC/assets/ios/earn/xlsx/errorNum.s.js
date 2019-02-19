_$define("earn/xlsx/errorNum.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../pi/struct/struct_mgr");
var sinfo_1 = require("../../pi/struct/sinfo");

var ErrorNumCfg = function (_struct_mgr_1$Struct) {
    _inherits(ErrorNumCfg, _struct_mgr_1$Struct);

    function ErrorNumCfg(id, desc, descHant, old) {
        _classCallCheck(this, ErrorNumCfg);

        var _this = _possibleConstructorReturn(this, (ErrorNumCfg.__proto__ || Object.getPrototypeOf(ErrorNumCfg)).call(this));

        if (!old) {
            _this.id = id;
            _this.desc = desc;
            _this.descHant = descHant;
        } else {
            _this.id = id === undefined ? old.id : id;
            _this.desc = desc === undefined ? old.desc : desc;
            _this.descHant = descHant === undefined ? old.descHant : descHant;
        }
        return _this;
    }

    _createClass(ErrorNumCfg, [{
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
            this.id = bb.readInt();
            this.desc = bb.readUtf8();
            this.descHant = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.id);
            bb.writeUtf8(this.desc);
            bb.writeUtf8(this.descHant);
        }
    }]);

    return ErrorNumCfg;
}(struct_mgr_1.Struct);

ErrorNumCfg._$info = new sinfo_1.StructInfo("earn/xlsx/errorNum.ErrorNumCfg", 453396476, new Map([["db", "memory"], ["readonly", "true"], ["primary", "id"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("desc", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("descHant", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.ErrorNumCfg = ErrorNumCfg;
})