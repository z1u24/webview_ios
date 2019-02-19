_$define("earn/server/rpc/itemQuery.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../pi/struct/sinfo");

var SpecificMine = function (_struct_mgr_1$Struct) {
    _inherits(SpecificMine, _struct_mgr_1$Struct);

    function SpecificMine() {
        _classCallCheck(this, SpecificMine);

        return _possibleConstructorReturn(this, (SpecificMine.__proto__ || Object.getPrototypeOf(SpecificMine)).apply(this, arguments));
    }

    _createClass(SpecificMine, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.enumType = bb.readInt();
            this.itemType = bb.readInt();
            this.mineNum = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeInt(this.enumType);
            bb.writeInt(this.itemType);
            bb.writeInt(this.mineNum);
        }
    }]);

    return SpecificMine;
}(struct_mgr_1.Struct);

SpecificMine._$info = new sinfo_1.StructInfo("earn/server/rpc/itemQuery.SpecificMine", 1988071471, null, [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("enumType", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("itemType", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("mineNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.SpecificMine = SpecificMine;

var SeedResponse = function (_struct_mgr_1$Struct2) {
    _inherits(SeedResponse, _struct_mgr_1$Struct2);

    function SeedResponse() {
        _classCallCheck(this, SeedResponse);

        return _possibleConstructorReturn(this, (SeedResponse.__proto__ || Object.getPrototypeOf(SeedResponse)).apply(this, arguments));
    }

    _createClass(SeedResponse, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.resultNum = bb.readInt();
            if (!bb.isNil()) {
                this.seed = bb.readInt();
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.resultNum);
            if (this.seed === undefined || this.seed === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.seed);
            }
        }
    }]);

    return SeedResponse;
}(struct_mgr_1.Struct);

SeedResponse._$info = new sinfo_1.StructInfo("earn/server/rpc/itemQuery.SeedResponse", 3691136904, null, [new sinfo_1.FieldInfo("resultNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("seed", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.SeedResponse = SeedResponse;

var MiningResult = function (_struct_mgr_1$Struct3) {
    _inherits(MiningResult, _struct_mgr_1$Struct3);

    function MiningResult() {
        _classCallCheck(this, MiningResult);

        return _possibleConstructorReturn(this, (MiningResult.__proto__ || Object.getPrototypeOf(MiningResult)).apply(this, arguments));
    }

    _createClass(MiningResult, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.itemType = bb.readInt();
            this.mineNum = bb.readInt();
            this.hit = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.itemType);
            bb.writeInt(this.mineNum);
            bb.writeInt(this.hit);
        }
    }]);

    return MiningResult;
}(struct_mgr_1.Struct);

MiningResult._$info = new sinfo_1.StructInfo("earn/server/rpc/itemQuery.MiningResult", 2367936747, null, [new sinfo_1.FieldInfo("itemType", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("mineNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("hit", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.MiningResult = MiningResult;

var SeriesDaysRes = function (_struct_mgr_1$Struct4) {
    _inherits(SeriesDaysRes, _struct_mgr_1$Struct4);

    function SeriesDaysRes() {
        _classCallCheck(this, SeriesDaysRes);

        return _possibleConstructorReturn(this, (SeriesDaysRes.__proto__ || Object.getPrototypeOf(SeriesDaysRes)).apply(this, arguments));
    }

    _createClass(SeriesDaysRes, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.resultNum = bb.readInt();
            if (!bb.isNil()) {
                this.days = bb.readInt();
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.resultNum);
            if (this.days === undefined || this.days === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.days);
            }
        }
    }]);

    return SeriesDaysRes;
}(struct_mgr_1.Struct);

SeriesDaysRes._$info = new sinfo_1.StructInfo("earn/server/rpc/itemQuery.SeriesDaysRes", 3626181425, null, [new sinfo_1.FieldInfo("resultNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("days", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.SeriesDaysRes = SeriesDaysRes;

var CoinQueryRes = function (_struct_mgr_1$Struct5) {
    _inherits(CoinQueryRes, _struct_mgr_1$Struct5);

    function CoinQueryRes() {
        _classCallCheck(this, CoinQueryRes);

        return _possibleConstructorReturn(this, (CoinQueryRes.__proto__ || Object.getPrototypeOf(CoinQueryRes)).apply(this, arguments));
    }

    _createClass(CoinQueryRes, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.resultNum = bb.readInt();
            this.itemType = bb.readInt();
            if (!bb.isNil()) {
                this.num = bb.readInt();
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.resultNum);
            bb.writeInt(this.itemType);
            if (this.num === undefined || this.num === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.num);
            }
        }
    }]);

    return CoinQueryRes;
}(struct_mgr_1.Struct);

CoinQueryRes._$info = new sinfo_1.StructInfo("earn/server/rpc/itemQuery.CoinQueryRes", 2913527901, null, [new sinfo_1.FieldInfo("resultNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("itemType", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.CoinQueryRes = CoinQueryRes;
})