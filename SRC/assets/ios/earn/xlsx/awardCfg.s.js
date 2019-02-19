_$define("earn/xlsx/awardCfg.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../pi/struct/struct_mgr");
var sinfo_1 = require("../../pi/struct/sinfo");

var WeightMiningCfg = function (_struct_mgr_1$Struct) {
    _inherits(WeightMiningCfg, _struct_mgr_1$Struct);

    function WeightMiningCfg(pid, id, hits, count, weight, old) {
        _classCallCheck(this, WeightMiningCfg);

        var _this = _possibleConstructorReturn(this, (WeightMiningCfg.__proto__ || Object.getPrototypeOf(WeightMiningCfg)).call(this));

        if (!old) {
            _this.pid = pid;
            _this.id = id;
            _this.hits = hits;
            _this.count = count;
            _this.weight = weight;
        } else {
            _this.pid = pid === undefined ? old.pid : pid;
            _this.id = id === undefined ? old.id : id;
            _this.hits = hits === undefined ? old.hits : hits;
            _this.count = count === undefined ? old.count : count;
            _this.weight = weight === undefined ? old.weight : weight;
        }
        return _this;
    }

    _createClass(WeightMiningCfg, [{
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
            this.id = bb.readInt();
            this.hits = bb.readInt();
            this.count = bb.readInt();
            this.weight = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.pid);
            bb.writeInt(this.id);
            bb.writeInt(this.hits);
            bb.writeInt(this.count);
            bb.writeInt(this.weight);
        }
    }]);

    return WeightMiningCfg;
}(struct_mgr_1.Struct);

WeightMiningCfg._$info = new sinfo_1.StructInfo("earn/xlsx/awardCfg.WeightMiningCfg", 3821023968, new Map([["db", "memory"], ["readonly", "true"], ["primary", "pid"]]), [new sinfo_1.FieldInfo("pid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("hits", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("weight", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.WeightMiningCfg = WeightMiningCfg;
exports.isRateAward = function (id) {
    return (id / 100000 | 0) == 4;
};
exports.isWeightAward = function (id) {
    return (id / 100000 | 0) == 1;
};
exports.isAverageAward = function (id) {
    return (id / 100000 | 0) == 2;
};

var AverageAwardCfg = function (_struct_mgr_1$Struct2) {
    _inherits(AverageAwardCfg, _struct_mgr_1$Struct2);

    function AverageAwardCfg(id, prop, min, max, count, limit, old) {
        _classCallCheck(this, AverageAwardCfg);

        var _this2 = _possibleConstructorReturn(this, (AverageAwardCfg.__proto__ || Object.getPrototypeOf(AverageAwardCfg)).call(this));

        if (!old) {
            _this2.id = id;
            _this2.prop = prop;
            _this2.min = min;
            _this2.max = max;
            _this2.count = count;
            _this2.limit = limit;
        } else {
            _this2.id = id === undefined ? old.id : id;
            _this2.prop = prop === undefined ? old.prop : prop;
            _this2.min = min === undefined ? old.min : min;
            _this2.max = max === undefined ? old.max : max;
            _this2.count = count === undefined ? old.count : count;
            _this2.limit = limit === undefined ? old.limit : limit;
        }
        return _this2;
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

AverageAwardCfg._$info = new sinfo_1.StructInfo("earn/xlsx/awardCfg.AverageAwardCfg", 3719797890, new Map([["db", "memory"], ["readonly", "true"], ["primary", "id"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("prop", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("min", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("max", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("limit", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.AverageAwardCfg = AverageAwardCfg;

var WeightAwardCfg = function (_struct_mgr_1$Struct3) {
    _inherits(WeightAwardCfg, _struct_mgr_1$Struct3);

    function WeightAwardCfg(id, prop, min, max, count, limit, weight, old) {
        _classCallCheck(this, WeightAwardCfg);

        var _this3 = _possibleConstructorReturn(this, (WeightAwardCfg.__proto__ || Object.getPrototypeOf(WeightAwardCfg)).call(this));

        if (!old) {
            _this3.id = id;
            _this3.prop = prop;
            _this3.min = min;
            _this3.max = max;
            _this3.count = count;
            _this3.limit = limit;
            _this3.weight = weight;
        } else {
            _this3.id = id === undefined ? old.id : id;
            _this3.prop = prop === undefined ? old.prop : prop;
            _this3.min = min === undefined ? old.min : min;
            _this3.max = max === undefined ? old.max : max;
            _this3.count = count === undefined ? old.count : count;
            _this3.limit = limit === undefined ? old.limit : limit;
            _this3.weight = weight === undefined ? old.weight : weight;
        }
        return _this3;
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
        }
    }]);

    return WeightAwardCfg;
}(struct_mgr_1.Struct);

WeightAwardCfg._$info = new sinfo_1.StructInfo("earn/xlsx/awardCfg.WeightAwardCfg", 4241672753, new Map([["db", "memory"], ["readonly", "true"], ["primary", "id"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("prop", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("min", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("max", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("limit", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("weight", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.WeightAwardCfg = WeightAwardCfg;

var RateAwardCfg = function (_struct_mgr_1$Struct4) {
    _inherits(RateAwardCfg, _struct_mgr_1$Struct4);

    function RateAwardCfg(id, prop, min, max, count, rate, old) {
        _classCallCheck(this, RateAwardCfg);

        var _this4 = _possibleConstructorReturn(this, (RateAwardCfg.__proto__ || Object.getPrototypeOf(RateAwardCfg)).call(this));

        if (!old) {
            _this4.id = id;
            _this4.prop = prop;
            _this4.min = min;
            _this4.max = max;
            _this4.count = count;
            _this4.rate = rate;
        } else {
            _this4.id = id === undefined ? old.id : id;
            _this4.prop = prop === undefined ? old.prop : prop;
            _this4.min = min === undefined ? old.min : min;
            _this4.max = max === undefined ? old.max : max;
            _this4.count = count === undefined ? old.count : count;
            _this4.rate = rate === undefined ? old.rate : rate;
        }
        return _this4;
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

RateAwardCfg._$info = new sinfo_1.StructInfo("earn/xlsx/awardCfg.RateAwardCfg", 4021666337, new Map([["db", "memory"], ["readonly", "true"], ["primary", "id"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("prop", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("min", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("max", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("rate", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.RateAwardCfg = RateAwardCfg;

var STConvertCfg = function (_struct_mgr_1$Struct5) {
    _inherits(STConvertCfg, _struct_mgr_1$Struct5);

    function STConvertCfg(id, num, count, name, value, desc, progress, tips, level, old) {
        _classCallCheck(this, STConvertCfg);

        var _this5 = _possibleConstructorReturn(this, (STConvertCfg.__proto__ || Object.getPrototypeOf(STConvertCfg)).call(this));

        if (!old) {
            _this5.id = id;
            _this5.num = num;
            _this5.count = count;
            _this5.name = name;
            _this5.value = value;
            _this5.desc = desc;
            _this5.progress = progress;
            _this5.tips = tips;
            _this5.level = level;
        } else {
            _this5.id = id === undefined ? old.id : id;
            _this5.num = num === undefined ? old.num : num;
            _this5.count = count === undefined ? old.count : count;
            _this5.name = name === undefined ? old.name : name;
            _this5.value = value === undefined ? old.value : value;
            _this5.desc = desc === undefined ? old.desc : desc;
            _this5.progress = progress === undefined ? old.progress : progress;
            _this5.tips = tips === undefined ? old.tips : tips;
            _this5.level = level === undefined ? old.level : level;
        }
        return _this5;
    }

    _createClass(STConvertCfg, [{
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
            this.num = bb.readInt();
            this.count = bb.readInt();
            this.name = bb.readUtf8();
            this.value = bb.readUtf8();
            this.desc = bb.readUtf8();
            this.progress = bb.readUtf8();
            this.tips = bb.readUtf8();
            this.level = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.id);
            bb.writeInt(this.num);
            bb.writeInt(this.count);
            bb.writeUtf8(this.name);
            bb.writeUtf8(this.value);
            bb.writeUtf8(this.desc);
            bb.writeUtf8(this.progress);
            bb.writeUtf8(this.tips);
            bb.writeInt(this.level);
        }
    }]);

    return STConvertCfg;
}(struct_mgr_1.Struct);

STConvertCfg._$info = new sinfo_1.StructInfo("earn/xlsx/awardCfg.STConvertCfg", 386197142, new Map([["db", "memory"], ["readonly", "true"], ["primary", "id"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("value", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("desc", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("progress", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("tips", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("level", new sinfo_1.EnumType(sinfo_1.Type.U8), null)]);
exports.STConvertCfg = STConvertCfg;

var RegularAwardCfg = function (_struct_mgr_1$Struct6) {
    _inherits(RegularAwardCfg, _struct_mgr_1$Struct6);

    function RegularAwardCfg(id, prop, num, count, desc, old) {
        _classCallCheck(this, RegularAwardCfg);

        var _this6 = _possibleConstructorReturn(this, (RegularAwardCfg.__proto__ || Object.getPrototypeOf(RegularAwardCfg)).call(this));

        if (!old) {
            _this6.id = id;
            _this6.prop = prop;
            _this6.num = num;
            _this6.count = count;
            _this6.desc = desc;
        } else {
            _this6.id = id === undefined ? old.id : id;
            _this6.prop = prop === undefined ? old.prop : prop;
            _this6.num = num === undefined ? old.num : num;
            _this6.count = count === undefined ? old.count : count;
            _this6.desc = desc === undefined ? old.desc : desc;
        }
        return _this6;
    }

    _createClass(RegularAwardCfg, [{
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
            this.num = bb.readInt();
            this.count = bb.readInt();
            this.desc = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.id);
            bb.writeInt(this.prop);
            bb.writeInt(this.num);
            bb.writeInt(this.count);
            bb.writeUtf8(this.desc);
        }
    }]);

    return RegularAwardCfg;
}(struct_mgr_1.Struct);

RegularAwardCfg._$info = new sinfo_1.StructInfo("earn/xlsx/awardCfg.RegularAwardCfg", 819296989, new Map([["db", "memory"], ["readonly", "true"], ["primary", "id"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("prop", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("desc", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.RegularAwardCfg = RegularAwardCfg;

var SeriesLoginAwardCfg = function (_struct_mgr_1$Struct7) {
    _inherits(SeriesLoginAwardCfg, _struct_mgr_1$Struct7);

    function SeriesLoginAwardCfg(days, prop, num, count, desc, old) {
        _classCallCheck(this, SeriesLoginAwardCfg);

        var _this7 = _possibleConstructorReturn(this, (SeriesLoginAwardCfg.__proto__ || Object.getPrototypeOf(SeriesLoginAwardCfg)).call(this));

        if (!old) {
            _this7.days = days;
            _this7.prop = prop;
            _this7.num = num;
            _this7.count = count;
            _this7.desc = desc;
        } else {
            _this7.days = days === undefined ? old.days : days;
            _this7.prop = prop === undefined ? old.prop : prop;
            _this7.num = num === undefined ? old.num : num;
            _this7.count = count === undefined ? old.count : count;
            _this7.desc = desc === undefined ? old.desc : desc;
        }
        return _this7;
    }

    _createClass(SeriesLoginAwardCfg, [{
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
            this.days = bb.readInt();
            this.prop = bb.readInt();
            this.num = bb.readInt();
            this.count = bb.readInt();
            this.desc = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.days);
            bb.writeInt(this.prop);
            bb.writeInt(this.num);
            bb.writeInt(this.count);
            bb.writeUtf8(this.desc);
        }
    }]);

    return SeriesLoginAwardCfg;
}(struct_mgr_1.Struct);

SeriesLoginAwardCfg._$info = new sinfo_1.StructInfo("earn/xlsx/awardCfg.SeriesLoginAwardCfg", 1157614270, new Map([["db", "memory"], ["readonly", "true"], ["primary", "days"]]), [new sinfo_1.FieldInfo("days", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("prop", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("desc", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.SeriesLoginAwardCfg = SeriesLoginAwardCfg;

var InviteAwardCfg = function (_struct_mgr_1$Struct8) {
    _inherits(InviteAwardCfg, _struct_mgr_1$Struct8);

    function InviteAwardCfg(id, prop, num, count, desc, old) {
        _classCallCheck(this, InviteAwardCfg);

        var _this8 = _possibleConstructorReturn(this, (InviteAwardCfg.__proto__ || Object.getPrototypeOf(InviteAwardCfg)).call(this));

        if (!old) {
            _this8.id = id;
            _this8.prop = prop;
            _this8.num = num;
            _this8.count = count;
            _this8.desc = desc;
        } else {
            _this8.id = id === undefined ? old.id : id;
            _this8.prop = prop === undefined ? old.prop : prop;
            _this8.num = num === undefined ? old.num : num;
            _this8.count = count === undefined ? old.count : count;
            _this8.desc = desc === undefined ? old.desc : desc;
        }
        return _this8;
    }

    _createClass(InviteAwardCfg, [{
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
            this.num = bb.readInt();
            this.count = bb.readInt();
            this.desc = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.id);
            bb.writeInt(this.prop);
            bb.writeInt(this.num);
            bb.writeInt(this.count);
            bb.writeUtf8(this.desc);
        }
    }]);

    return InviteAwardCfg;
}(struct_mgr_1.Struct);

InviteAwardCfg._$info = new sinfo_1.StructInfo("earn/xlsx/awardCfg.InviteAwardCfg", 2692640554, new Map([["db", "memory"], ["readonly", "true"], ["primary", "id"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("prop", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("desc", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.InviteAwardCfg = InviteAwardCfg;

var AdAwardCfg = function (_struct_mgr_1$Struct9) {
    _inherits(AdAwardCfg, _struct_mgr_1$Struct9);

    function AdAwardCfg(pid, prop, num, desc, old) {
        _classCallCheck(this, AdAwardCfg);

        var _this9 = _possibleConstructorReturn(this, (AdAwardCfg.__proto__ || Object.getPrototypeOf(AdAwardCfg)).call(this));

        if (!old) {
            _this9.pid = pid;
            _this9.prop = prop;
            _this9.num = num;
            _this9.desc = desc;
        } else {
            _this9.pid = pid === undefined ? old.pid : pid;
            _this9.prop = prop === undefined ? old.prop : prop;
            _this9.num = num === undefined ? old.num : num;
            _this9.desc = desc === undefined ? old.desc : desc;
        }
        return _this9;
    }

    _createClass(AdAwardCfg, [{
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
            this.prop = bb.readInt();
            this.num = bb.readInt();
            this.desc = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.pid);
            bb.writeInt(this.prop);
            bb.writeInt(this.num);
            bb.writeUtf8(this.desc);
        }
    }]);

    return AdAwardCfg;
}(struct_mgr_1.Struct);

AdAwardCfg._$info = new sinfo_1.StructInfo("earn/xlsx/awardCfg.AdAwardCfg", 1792593562, new Map([["db", "memory"], ["readonly", "true"], ["primary", "pid"]]), [new sinfo_1.FieldInfo("pid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("prop", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("desc", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.AdAwardCfg = AdAwardCfg;
})