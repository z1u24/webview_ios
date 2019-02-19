_$define("pi/bigint/big_struct.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../struct/struct_mgr");
var sinfo_1 = require("../struct/sinfo");
var util_1 = require("./util");

var U64 = function (_struct_mgr_1$Struct) {
    _inherits(U64, _struct_mgr_1$Struct);

    function U64(value, old) {
        _classCallCheck(this, U64);

        var _this = _possibleConstructorReturn(this, (U64.__proto__ || Object.getPrototypeOf(U64)).call(this));

        if (!old) {
            _this.value = value;
        } else {
            _this.value = value === undefined ? old.value : value;
        }
        return _this;
    }

    _createClass(U64, [{
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
            this.value = util_1.u64Merge(bb.readBigInt());
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeBigInt(util_1.u64Unwrap(this.value));
        }
    }]);

    return U64;
}(struct_mgr_1.Struct);

U64._$info = new sinfo_1.StructInfo("pi/bigint/big_struct.U64", 2075458578, new Map([["constructor", "true"]]), [new sinfo_1.FieldInfo("value", new sinfo_1.EnumType(sinfo_1.Type.U64), null)]);
exports.U64 = U64;

var U128 = function (_struct_mgr_1$Struct2) {
    _inherits(U128, _struct_mgr_1$Struct2);

    function U128(value, old) {
        _classCallCheck(this, U128);

        var _this2 = _possibleConstructorReturn(this, (U128.__proto__ || Object.getPrototypeOf(U128)).call(this));

        if (!old) {
            _this2.value = value;
        } else {
            _this2.value = value === undefined ? old.value : value;
        }
        return _this2;
    }

    _createClass(U128, [{
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
            this.value = util_1.u128Merge(bb.readBigInt());
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeBigInt(util_1.u128Unwrap(this.value));
        }
    }]);

    return U128;
}(struct_mgr_1.Struct);

U128._$info = new sinfo_1.StructInfo("pi/bigint/big_struct.U128", 873530750, new Map([["constructor", "true"]]), [new sinfo_1.FieldInfo("value", new sinfo_1.EnumType(sinfo_1.Type.U128), null)]);
exports.U128 = U128;
})