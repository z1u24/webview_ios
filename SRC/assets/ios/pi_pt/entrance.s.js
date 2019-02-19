_$define("pi_pt/entrance.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../pi/struct/struct_mgr");
var sinfo_1 = require("../pi/struct/sinfo");

var Entrance = function (_struct_mgr_1$Struct) {
    _inherits(Entrance, _struct_mgr_1$Struct);

    function Entrance(path, note, old) {
        _classCallCheck(this, Entrance);

        var _this = _possibleConstructorReturn(this, (Entrance.__proto__ || Object.getPrototypeOf(Entrance)).call(this));

        if (!old) {
            _this.path = path;
            _this.note = note;
        } else {
            _this.path = path === undefined ? old.path : path;
            _this.note = note === undefined ? old.note : note;
        }
        return _this;
    }

    _createClass(Entrance, [{
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
            this.note = bb.readMap(function () {
                return [bb.readUtf8(), bb.readUtf8()];
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.path);
            bb.writeMap(this.note, function (k, v) {
                bb.writeUtf8(k);
                bb.writeUtf8(v);
            });
        }
    }]);

    return Entrance;
}(struct_mgr_1.Struct);

Entrance._$info = new sinfo_1.StructInfo("pi_pt/entrance.Entrance", 2071721816, new Map([["constructor", "true"], ["primary", "path"], ["db", "memory"]]), [new sinfo_1.FieldInfo("path", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("note", new sinfo_1.EnumType(sinfo_1.Type.Map, [new sinfo_1.EnumType(sinfo_1.Type.Str), new sinfo_1.EnumType(sinfo_1.Type.Str)]), null)]);
exports.Entrance = Entrance;
})