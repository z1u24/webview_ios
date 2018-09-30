_$define("index/rpc_call.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../pi/struct/struct_mgr");
var sinfo_1 = require("../pi/struct/sinfo");

var getTransaction = function (_struct_mgr_1$Struct) {
    _inherits(getTransaction, _struct_mgr_1$Struct);

    function getTransaction() {
        _classCallCheck(this, getTransaction);

        return _possibleConstructorReturn(this, (getTransaction.__proto__ || Object.getPrototypeOf(getTransaction)).apply(this, arguments));
    }

    _createClass(getTransaction, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.name = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.name);
        }
    }]);

    return getTransaction;
}(struct_mgr_1.Struct);

getTransaction._$info = new sinfo_1.StructInfo("index/rpc_call.getTransaction", 2071017002, null, [new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.getTransaction = getTransaction;

var getTokenTransaction = function (_struct_mgr_1$Struct2) {
    _inherits(getTokenTransaction, _struct_mgr_1$Struct2);

    function getTokenTransaction() {
        _classCallCheck(this, getTokenTransaction);

        return _possibleConstructorReturn(this, (getTokenTransaction.__proto__ || Object.getPrototypeOf(getTokenTransaction)).apply(this, arguments));
    }

    _createClass(getTokenTransaction, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.contractAddress = bb.readUtf8();
            this.userAddress = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.contractAddress);
            bb.writeUtf8(this.userAddress);
        }
    }]);

    return getTokenTransaction;
}(struct_mgr_1.Struct);

getTokenTransaction._$info = new sinfo_1.StructInfo("index/rpc_call.getTokenTransaction", 270483795, null, [new sinfo_1.FieldInfo("contractAddress", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("userAddress", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.getTokenTransaction = getTokenTransaction;

var Transation = function (_struct_mgr_1$Struct3) {
    _inherits(Transation, _struct_mgr_1$Struct3);

    function Transation() {
        _classCallCheck(this, Transation);

        return _possibleConstructorReturn(this, (Transation.__proto__ || Object.getPrototypeOf(Transation)).apply(this, arguments));
    }

    _createClass(Transation, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.arr = bb.readArray(function () {
                return bb.readUtf8();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.arr, function (el) {
                bb.writeUtf8(el);
            });
        }
    }]);

    return Transation;
}(struct_mgr_1.Struct);

Transation._$info = new sinfo_1.StructInfo("index/rpc_call.Transation", 1226236420, null, [new sinfo_1.FieldInfo("arr", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str)), null)]);
exports.Transation = Transation;

var TokenTransation = function (_struct_mgr_1$Struct4) {
    _inherits(TokenTransation, _struct_mgr_1$Struct4);

    function TokenTransation() {
        _classCallCheck(this, TokenTransation);

        return _possibleConstructorReturn(this, (TokenTransation.__proto__ || Object.getPrototypeOf(TokenTransation)).apply(this, arguments));
    }

    _createClass(TokenTransation, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.hash = bb.readUtf8();
            this.count = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.hash);
            bb.writeUtf8(this.count);
        }
    }]);

    return TokenTransation;
}(struct_mgr_1.Struct);

TokenTransation._$info = new sinfo_1.StructInfo("index/rpc_call.TokenTransation", 1123875098, null, [new sinfo_1.FieldInfo("hash", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.TokenTransation = TokenTransation;

var TokenTransations = function (_struct_mgr_1$Struct5) {
    _inherits(TokenTransations, _struct_mgr_1$Struct5);

    function TokenTransations() {
        _classCallCheck(this, TokenTransations);

        return _possibleConstructorReturn(this, (TokenTransations.__proto__ || Object.getPrototypeOf(TokenTransations)).apply(this, arguments));
    }

    _createClass(TokenTransations, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this6 = this;

            this.from = bb.readArray(function () {
                return bb.readBonCode(_this6._$EnumTypeMap ? _this6._$EnumTypeMap(_this6.from) : TokenTransation);
            });
            this.to = bb.readArray(function () {
                return bb.readBonCode(_this6._$EnumTypeMap ? _this6._$EnumTypeMap(_this6.to) : TokenTransation);
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.from, function (el) {
                bb.writeBonCode(el);
            });
            bb.writeArray(this.to, function (el) {
                bb.writeBonCode(el);
            });
        }
    }]);

    return TokenTransations;
}(struct_mgr_1.Struct);

TokenTransations._$info = new sinfo_1.StructInfo("index/rpc_call.TokenTransations", 2336361671, null, [new sinfo_1.FieldInfo("from", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, TokenTransation._$info)), null), new sinfo_1.FieldInfo("to", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, TokenTransation._$info)), null)]);
exports.TokenTransations = TokenTransations;

var Player = function (_struct_mgr_1$Struct6) {
    _inherits(Player, _struct_mgr_1$Struct6);

    function Player() {
        _classCallCheck(this, Player);

        return _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).apply(this, arguments));
    }

    _createClass(Player, [{
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
            this.name = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.name);
        }
    }]);

    return Player;
}(struct_mgr_1.Struct);

Player._$info = new sinfo_1.StructInfo("index/rpc_call.Player", 618707818, new Map([["store", "memory"]]), [new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.Player = Player;
})