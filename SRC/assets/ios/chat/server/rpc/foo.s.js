_$define("chat/server/rpc/foo.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../pi/struct/sinfo");

var FooRpc = function (_struct_mgr_1$Struct) {
    _inherits(FooRpc, _struct_mgr_1$Struct);

    function FooRpc() {
        _classCallCheck(this, FooRpc);

        return _possibleConstructorReturn(this, (FooRpc.__proto__ || Object.getPrototypeOf(FooRpc)).apply(this, arguments));
    }

    _createClass(FooRpc, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.name = bb.readUtf8();
            this.age = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.name);
            bb.writeInt(this.age);
        }
    }]);

    return FooRpc;
}(struct_mgr_1.Struct);

FooRpc._$info = new sinfo_1.StructInfo("chat/server/rpc/foo.FooRpc", 3483197322, null, [new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("age", new sinfo_1.EnumType(sinfo_1.Type.U8), null)]);
exports.FooRpc = FooRpc;

var FooRpcResp = function (_struct_mgr_1$Struct2) {
    _inherits(FooRpcResp, _struct_mgr_1$Struct2);

    function FooRpcResp() {
        _classCallCheck(this, FooRpcResp);

        return _possibleConstructorReturn(this, (FooRpcResp.__proto__ || Object.getPrototypeOf(FooRpcResp)).apply(this, arguments));
    }

    _createClass(FooRpcResp, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.name = bb.readUtf8();
            this.age = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.name);
            bb.writeInt(this.age);
        }
    }]);

    return FooRpcResp;
}(struct_mgr_1.Struct);

FooRpcResp._$info = new sinfo_1.StructInfo("chat/server/rpc/foo.FooRpcResp", 1926854070, null, [new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("age", new sinfo_1.EnumType(sinfo_1.Type.U8), null)]);
exports.FooRpcResp = FooRpcResp;
})