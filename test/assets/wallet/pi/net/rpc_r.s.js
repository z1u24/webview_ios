_$define("pi/net/rpc_r.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../struct/struct_mgr");
var sinfo_1 = require("../struct/sinfo");

var OK = function (_struct_mgr_1$Struct) {
    _inherits(OK, _struct_mgr_1$Struct);

    function OK() {
        _classCallCheck(this, OK);

        return _possibleConstructorReturn(this, (OK.__proto__ || Object.getPrototypeOf(OK)).apply(this, arguments));
    }

    _createClass(OK, [{
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
        value: function bonDecode(bb) {}
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {}
    }]);

    return OK;
}(struct_mgr_1.Struct);

OK._$info = new sinfo_1.StructInfo("pi/net/rpc_r.OK", 2671742573, new Map([["type", "rpc"]]), []);
exports.OK = OK;

var OK_I = function (_struct_mgr_1$Struct2) {
    _inherits(OK_I, _struct_mgr_1$Struct2);

    function OK_I() {
        _classCallCheck(this, OK_I);

        return _possibleConstructorReturn(this, (OK_I.__proto__ || Object.getPrototypeOf(OK_I)).apply(this, arguments));
    }

    _createClass(OK_I, [{
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
            this.value = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.value);
        }
    }]);

    return OK_I;
}(struct_mgr_1.Struct);

OK_I._$info = new sinfo_1.StructInfo("pi/net/rpc_r.OK_I", 722477464, new Map([["type", "rpc"]]), [new sinfo_1.FieldInfo("value", new sinfo_1.EnumType(sinfo_1.Type.I32), null)]);
exports.OK_I = OK_I;

var OK_S = function (_struct_mgr_1$Struct3) {
    _inherits(OK_S, _struct_mgr_1$Struct3);

    function OK_S() {
        _classCallCheck(this, OK_S);

        return _possibleConstructorReturn(this, (OK_S.__proto__ || Object.getPrototypeOf(OK_S)).apply(this, arguments));
    }

    _createClass(OK_S, [{
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
            this.value = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.value);
        }
    }]);

    return OK_S;
}(struct_mgr_1.Struct);

OK_S._$info = new sinfo_1.StructInfo("pi/net/rpc_r.OK_S", 1882083963, new Map([["type", "rpc"]]), [new sinfo_1.FieldInfo("value", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.OK_S = OK_S;

var Error = function (_struct_mgr_1$Struct4) {
    _inherits(Error, _struct_mgr_1$Struct4);

    function Error() {
        _classCallCheck(this, Error);

        return _possibleConstructorReturn(this, (Error.__proto__ || Object.getPrototypeOf(Error)).apply(this, arguments));
    }

    _createClass(Error, [{
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
            this.code = bb.readInt();
            this.info = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.code);
            bb.writeUtf8(this.info);
        }
    }]);

    return Error;
}(struct_mgr_1.Struct);

Error._$info = new sinfo_1.StructInfo("pi/net/rpc_r.Error", 2102366875, new Map([["type", "rpc"]]), [new sinfo_1.FieldInfo("code", new sinfo_1.EnumType(sinfo_1.Type.I32), null), new sinfo_1.FieldInfo("info", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.Error = Error;

var Req = function (_struct_mgr_1$Struct5) {
    _inherits(Req, _struct_mgr_1$Struct5);

    function Req() {
        _classCallCheck(this, Req);

        return _possibleConstructorReturn(this, (Req.__proto__ || Object.getPrototypeOf(Req)).apply(this, arguments));
    }

    _createClass(Req, [{
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
            this.path = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.path);
        }
    }]);

    return Req;
}(struct_mgr_1.Struct);

Req._$info = new sinfo_1.StructInfo("pi/net/rpc_r.Req", 3608827980, new Map([["type", "rpc"]]), [new sinfo_1.FieldInfo("path", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.Req = Req;
})