_$define("earn/xlsx/item.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../pi/struct/struct_mgr");
var sinfo_1 = require("../../pi/struct/sinfo");

var MineHpCfg = function (_struct_mgr_1$Struct) {
    _inherits(MineHpCfg, _struct_mgr_1$Struct);

    function MineHpCfg(id, hp, old) {
        _classCallCheck(this, MineHpCfg);

        var _this = _possibleConstructorReturn(this, (MineHpCfg.__proto__ || Object.getPrototypeOf(MineHpCfg)).call(this));

        if (!old) {
            _this.id = id;
            _this.hp = hp;
        } else {
            _this.id = id === undefined ? old.id : id;
            _this.hp = hp === undefined ? old.hp : hp;
        }
        return _this;
    }

    _createClass(MineHpCfg, [{
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
            this.hp = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.id);
            bb.writeInt(this.hp);
        }
    }]);

    return MineHpCfg;
}(struct_mgr_1.Struct);

MineHpCfg._$info = new sinfo_1.StructInfo("earn/xlsx/item.MineHpCfg", 933876624, new Map([["db", "memory"], ["readonly", "true"], ["primary", "id"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("hp", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.MineHpCfg = MineHpCfg;

var ItemInitCfg = function (_struct_mgr_1$Struct2) {
    _inherits(ItemInitCfg, _struct_mgr_1$Struct2);

    function ItemInitCfg(id, typeNum, enumNum, count, desc, old) {
        _classCallCheck(this, ItemInitCfg);

        var _this2 = _possibleConstructorReturn(this, (ItemInitCfg.__proto__ || Object.getPrototypeOf(ItemInitCfg)).call(this));

        if (!old) {
            _this2.id = id;
            _this2.typeNum = typeNum;
            _this2.enumNum = enumNum;
            _this2.count = count;
            _this2.desc = desc;
        } else {
            _this2.id = id === undefined ? old.id : id;
            _this2.typeNum = typeNum === undefined ? old.typeNum : typeNum;
            _this2.enumNum = enumNum === undefined ? old.enumNum : enumNum;
            _this2.count = count === undefined ? old.count : count;
            _this2.desc = desc === undefined ? old.desc : desc;
        }
        return _this2;
    }

    _createClass(ItemInitCfg, [{
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
            this.typeNum = bb.readInt();
            this.enumNum = bb.readInt();
            this.count = bb.readInt();
            this.desc = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.id);
            bb.writeInt(this.typeNum);
            bb.writeInt(this.enumNum);
            bb.writeInt(this.count);
            bb.writeUtf8(this.desc);
        }
    }]);

    return ItemInitCfg;
}(struct_mgr_1.Struct);

ItemInitCfg._$info = new sinfo_1.StructInfo("earn/xlsx/item.ItemInitCfg", 2227285451, new Map([["db", "memory"], ["readonly", "true"], ["primary", "id"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("typeNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("enumNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("desc", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.ItemInitCfg = ItemInitCfg;

var MedalCfg = function (_struct_mgr_1$Struct3) {
    _inherits(MedalCfg, _struct_mgr_1$Struct3);

    function MedalCfg(id, typeNum, coinType, coinNum, desc, descHant, old) {
        _classCallCheck(this, MedalCfg);

        var _this3 = _possibleConstructorReturn(this, (MedalCfg.__proto__ || Object.getPrototypeOf(MedalCfg)).call(this));

        if (!old) {
            _this3.id = id;
            _this3.typeNum = typeNum;
            _this3.coinType = coinType;
            _this3.coinNum = coinNum;
            _this3.desc = desc;
            _this3.descHant = descHant;
        } else {
            _this3.id = id === undefined ? old.id : id;
            _this3.typeNum = typeNum === undefined ? old.typeNum : typeNum;
            _this3.coinType = coinType === undefined ? old.coinType : coinType;
            _this3.coinNum = coinNum === undefined ? old.coinNum : coinNum;
            _this3.desc = desc === undefined ? old.desc : desc;
            _this3.descHant = descHant === undefined ? old.descHant : descHant;
        }
        return _this3;
    }

    _createClass(MedalCfg, [{
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
            this.typeNum = bb.readUtf8();
            this.coinType = bb.readInt();
            this.coinNum = bb.readInt();
            this.desc = bb.readUtf8();
            this.descHant = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.id);
            bb.writeUtf8(this.typeNum);
            bb.writeInt(this.coinType);
            bb.writeInt(this.coinNum);
            bb.writeUtf8(this.desc);
            bb.writeUtf8(this.descHant);
        }
    }]);

    return MedalCfg;
}(struct_mgr_1.Struct);

MedalCfg._$info = new sinfo_1.StructInfo("earn/xlsx/item.MedalCfg", 1219254930, new Map([["db", "memory"], ["readonly", "true"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("typeNum", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("coinType", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("coinNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("desc", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("descHant", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.MedalCfg = MedalCfg;

var AchievementMedalCfg = function (_struct_mgr_1$Struct4) {
    _inherits(AchievementMedalCfg, _struct_mgr_1$Struct4);

    function AchievementMedalCfg(id, typeNum, coinType, coinNum, desc, descHant, old) {
        _classCallCheck(this, AchievementMedalCfg);

        var _this4 = _possibleConstructorReturn(this, (AchievementMedalCfg.__proto__ || Object.getPrototypeOf(AchievementMedalCfg)).call(this));

        if (!old) {
            _this4.id = id;
            _this4.typeNum = typeNum;
            _this4.coinType = coinType;
            _this4.coinNum = coinNum;
            _this4.desc = desc;
            _this4.descHant = descHant;
        } else {
            _this4.id = id === undefined ? old.id : id;
            _this4.typeNum = typeNum === undefined ? old.typeNum : typeNum;
            _this4.coinType = coinType === undefined ? old.coinType : coinType;
            _this4.coinNum = coinNum === undefined ? old.coinNum : coinNum;
            _this4.desc = desc === undefined ? old.desc : desc;
            _this4.descHant = descHant === undefined ? old.descHant : descHant;
        }
        return _this4;
    }

    _createClass(AchievementMedalCfg, [{
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
            this.typeNum = bb.readUtf8();
            this.coinType = bb.readInt();
            this.coinNum = bb.readInt();
            this.desc = bb.readUtf8();
            this.descHant = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.id);
            bb.writeUtf8(this.typeNum);
            bb.writeInt(this.coinType);
            bb.writeInt(this.coinNum);
            bb.writeUtf8(this.desc);
            bb.writeUtf8(this.descHant);
        }
    }]);

    return AchievementMedalCfg;
}(struct_mgr_1.Struct);

AchievementMedalCfg._$info = new sinfo_1.StructInfo("earn/xlsx/item.AchievementMedalCfg", 1619628561, new Map([["db", "memory"], ["readonly", "true"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("typeNum", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("coinType", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("coinNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("desc", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("descHant", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.AchievementMedalCfg = AchievementMedalCfg;
})