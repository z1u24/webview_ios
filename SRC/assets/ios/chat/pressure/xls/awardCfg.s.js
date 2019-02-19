_$define("chat/pressure/xls/awardCfg.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../pi/struct/sinfo");
exports.isRateAward = function (id) {
    return (id / 100000 | 0) == 4;
};
exports.isWeightAward = function (id) {
    return (id / 100000 | 0) == 3;
};
exports.isAverageAward = function (id) {
    return (id / 100000 | 0) == 2;
};

var AverageAwardCfg = function (_struct_mgr_1$Struct) {
    _inherits(AverageAwardCfg, _struct_mgr_1$Struct);

    function AverageAwardCfg(id, prop, min, max, count, limit, old) {
        _classCallCheck(this, AverageAwardCfg);

        var _this = _possibleConstructorReturn(this, (AverageAwardCfg.__proto__ || Object.getPrototypeOf(AverageAwardCfg)).call(this));

        if (!old) {
            _this.id = id;
            _this.prop = prop;
            _this.min = min;
            _this.max = max;
            _this.count = count;
            _this.limit = limit;
        } else {
            _this.id = id === undefined ? old.id : id;
            _this.prop = prop === undefined ? old.prop : prop;
            _this.min = min === undefined ? old.min : min;
            _this.max = max === undefined ? old.max : max;
            _this.count = count === undefined ? old.count : count;
            _this.limit = limit === undefined ? old.limit : limit;
        }
        return _this;
    }

    _createClass(AverageAwardCfg, [{
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
            this.prop = bb.readInt();
            this.min = bb.readInt();
            this.max = bb.readInt();
            this.count = bb.readInt();
            this.limit = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.id);
            bb.writeInt(this.prop);
            bb.writeInt(this.min);
            bb.writeInt(this.max);
            bb.writeInt(this.count);
            bb.writeInt(this.limit);
        }
    }]);

    return AverageAwardCfg;
}(struct_mgr_1.Struct);

AverageAwardCfg._$info = new sinfo_1.StructInfo("chat/pressure/xls/awardCfg.AverageAwardCfg", 3583620013, new Map([["db", "memory"], ["readonly", "true"], ["primary", "id"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("prop", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("min", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("max", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("limit", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.AverageAwardCfg = AverageAwardCfg;

var WeightAwardCfg = function (_struct_mgr_1$Struct2) {
    _inherits(WeightAwardCfg, _struct_mgr_1$Struct2);

    function WeightAwardCfg(id, prop, min, max, count, limit, weight, module, func, arg, note, old) {
        _classCallCheck(this, WeightAwardCfg);

        var _this2 = _possibleConstructorReturn(this, (WeightAwardCfg.__proto__ || Object.getPrototypeOf(WeightAwardCfg)).call(this));

        if (!old) {
            _this2.id = id;
            _this2.prop = prop;
            _this2.min = min;
            _this2.max = max;
            _this2.count = count;
            _this2.limit = limit;
            _this2.weight = weight;
            _this2.module = module;
            _this2.func = func;
            _this2.arg = arg;
            _this2.note = note;
        } else {
            _this2.id = id === undefined ? old.id : id;
            _this2.prop = prop === undefined ? old.prop : prop;
            _this2.min = min === undefined ? old.min : min;
            _this2.max = max === undefined ? old.max : max;
            _this2.count = count === undefined ? old.count : count;
            _this2.limit = limit === undefined ? old.limit : limit;
            _this2.weight = weight === undefined ? old.weight : weight;
            _this2.module = module === undefined ? old.module : module;
            _this2.func = func === undefined ? old.func : func;
            _this2.arg = arg === undefined ? old.arg : arg;
            _this2.note = note === undefined ? old.note : note;
        }
        return _this2;
    }

    _createClass(WeightAwardCfg, [{
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
            this.prop = bb.readInt();
            this.min = bb.readInt();
            this.max = bb.readInt();
            this.count = bb.readInt();
            this.limit = bb.readInt();
            this.weight = bb.readInt();
            this.module = bb.readUtf8();
            this.func = bb.readUtf8();
            this.arg = bb.readUtf8();
            this.note = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.id);
            bb.writeInt(this.prop);
            bb.writeInt(this.min);
            bb.writeInt(this.max);
            bb.writeInt(this.count);
            bb.writeInt(this.limit);
            bb.writeInt(this.weight);
            bb.writeUtf8(this.module);
            bb.writeUtf8(this.func);
            bb.writeUtf8(this.arg);
            bb.writeUtf8(this.note);
        }
    }]);

    return WeightAwardCfg;
}(struct_mgr_1.Struct);

WeightAwardCfg._$info = new sinfo_1.StructInfo("chat/pressure/xls/awardCfg.WeightAwardCfg", 3377556303, new Map([["db", "memory"], ["readonly", "true"], ["primary", "id"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("prop", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("min", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("max", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("limit", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("weight", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("module", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("func", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("arg", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("note", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.WeightAwardCfg = WeightAwardCfg;

var RateAwardCfg = function (_struct_mgr_1$Struct3) {
    _inherits(RateAwardCfg, _struct_mgr_1$Struct3);

    function RateAwardCfg(id, prop, min, max, count, rate, old) {
        _classCallCheck(this, RateAwardCfg);

        var _this3 = _possibleConstructorReturn(this, (RateAwardCfg.__proto__ || Object.getPrototypeOf(RateAwardCfg)).call(this));

        if (!old) {
            _this3.id = id;
            _this3.prop = prop;
            _this3.min = min;
            _this3.max = max;
            _this3.count = count;
            _this3.rate = rate;
        } else {
            _this3.id = id === undefined ? old.id : id;
            _this3.prop = prop === undefined ? old.prop : prop;
            _this3.min = min === undefined ? old.min : min;
            _this3.max = max === undefined ? old.max : max;
            _this3.count = count === undefined ? old.count : count;
            _this3.rate = rate === undefined ? old.rate : rate;
        }
        return _this3;
    }

    _createClass(RateAwardCfg, [{
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
            this.prop = bb.readInt();
            this.min = bb.readInt();
            this.max = bb.readInt();
            this.count = bb.readInt();
            this.rate = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.id);
            bb.writeInt(this.prop);
            bb.writeInt(this.min);
            bb.writeInt(this.max);
            bb.writeInt(this.count);
            bb.writeInt(this.rate);
        }
    }]);

    return RateAwardCfg;
}(struct_mgr_1.Struct);

RateAwardCfg._$info = new sinfo_1.StructInfo("chat/pressure/xls/awardCfg.RateAwardCfg", 926009637, new Map([["db", "memory"], ["readonly", "true"], ["primary", "id"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("prop", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("min", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("max", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("rate", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.RateAwardCfg = RateAwardCfg;
})