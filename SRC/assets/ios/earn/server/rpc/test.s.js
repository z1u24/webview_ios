_$define("earn/server/rpc/test.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../pi/struct/sinfo");

var Test = function (_struct_mgr_1$Struct) {
    _inherits(Test, _struct_mgr_1$Struct);

    function Test() {
        _classCallCheck(this, Test);

        return _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).apply(this, arguments));
    }

    _createClass(Test, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.r = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.r);
        }
    }]);

    return Test;
}(struct_mgr_1.Struct);

Test._$info = new sinfo_1.StructInfo("earn/server/rpc/test.Test", 2026197977, null, [new sinfo_1.FieldInfo("r", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.Test = Test;

var Hits = function (_struct_mgr_1$Struct2) {
    _inherits(Hits, _struct_mgr_1$Struct2);

    function Hits() {
        _classCallCheck(this, Hits);

        return _possibleConstructorReturn(this, (Hits.__proto__ || Object.getPrototypeOf(Hits)).apply(this, arguments));
    }

    _createClass(Hits, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.r = bb.readArray(function () {
                return bb.readInt();
            });
            this.seed = bb.readArray(function () {
                return bb.readInt();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.r, function (el) {
                bb.writeInt(el);
            });
            bb.writeArray(this.seed, function (el) {
                bb.writeInt(el);
            });
        }
    }]);

    return Hits;
}(struct_mgr_1.Struct);

Hits._$info = new sinfo_1.StructInfo("earn/server/rpc/test.Hits", 3041375580, null, [new sinfo_1.FieldInfo("r", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32)), null), new sinfo_1.FieldInfo("seed", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.Hits = Hits;

var IsOk = function (_struct_mgr_1$Struct3) {
    _inherits(IsOk, _struct_mgr_1$Struct3);

    function IsOk() {
        _classCallCheck(this, IsOk);

        return _possibleConstructorReturn(this, (IsOk.__proto__ || Object.getPrototypeOf(IsOk)).apply(this, arguments));
    }

    _createClass(IsOk, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.isok = bb.readBool();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeBool(this.isok);
        }
    }]);

    return IsOk;
}(struct_mgr_1.Struct);

IsOk._$info = new sinfo_1.StructInfo("earn/server/rpc/test.IsOk", 2406167830, null, [new sinfo_1.FieldInfo("isok", new sinfo_1.EnumType(sinfo_1.Type.Bool), null)]);
exports.IsOk = IsOk;
})