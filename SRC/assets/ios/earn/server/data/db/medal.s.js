_$define("earn/server/data/db/medal.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../../pi/struct/sinfo");

var Medals = function (_struct_mgr_1$Struct) {
    _inherits(Medals, _struct_mgr_1$Struct);

    function Medals() {
        _classCallCheck(this, Medals);

        return _possibleConstructorReturn(this, (Medals.__proto__ || Object.getPrototypeOf(Medals)).apply(this, arguments));
    }

    _createClass(Medals, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.medals = bb.readArray(function () {
                return bb.readInt();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeArray(this.medals, function (el) {
                bb.writeInt(el);
            });
        }
    }]);

    return Medals;
}(struct_mgr_1.Struct);

Medals._$info = new sinfo_1.StructInfo("earn/server/data/db/medal.Medals", 3126339572, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("medals", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.Medals = Medals;

var Achievements = function (_struct_mgr_1$Struct2) {
    _inherits(Achievements, _struct_mgr_1$Struct2);

    function Achievements() {
        _classCallCheck(this, Achievements);

        return _possibleConstructorReturn(this, (Achievements.__proto__ || Object.getPrototypeOf(Achievements)).apply(this, arguments));
    }

    _createClass(Achievements, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.achievements = bb.readArray(function () {
                return bb.readInt();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeArray(this.achievements, function (el) {
                bb.writeInt(el);
            });
        }
    }]);

    return Achievements;
}(struct_mgr_1.Struct);

Achievements._$info = new sinfo_1.StructInfo("earn/server/data/db/medal.Achievements", 4047113383, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("achievements", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.Achievements = Achievements;

var AddMedal = function (_struct_mgr_1$Struct3) {
    _inherits(AddMedal, _struct_mgr_1$Struct3);

    function AddMedal(uid, medalType, old) {
        _classCallCheck(this, AddMedal);

        var _this3 = _possibleConstructorReturn(this, (AddMedal.__proto__ || Object.getPrototypeOf(AddMedal)).call(this));

        if (!old) {
            _this3.uid = uid;
            _this3.medalType = medalType;
        } else {
            _this3.uid = uid === undefined ? old.uid : uid;
            _this3.medalType = medalType === undefined ? old.medalType : medalType;
        }
        return _this3;
    }

    _createClass(AddMedal, [{
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
            this.uid = bb.readInt();
            this.medalType = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeInt(this.medalType);
        }
    }]);

    return AddMedal;
}(struct_mgr_1.Struct);

AddMedal._$info = new sinfo_1.StructInfo("earn/server/data/db/medal.AddMedal", 2164474500, new Map([["constructor", "true"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("medalType", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.AddMedal = AddMedal;

var ShowMedal = function (_struct_mgr_1$Struct4) {
    _inherits(ShowMedal, _struct_mgr_1$Struct4);

    function ShowMedal(uid, medal, old) {
        _classCallCheck(this, ShowMedal);

        var _this4 = _possibleConstructorReturn(this, (ShowMedal.__proto__ || Object.getPrototypeOf(ShowMedal)).call(this));

        if (!old) {
            _this4.uid = uid;
            _this4.medal = medal;
        } else {
            _this4.uid = uid === undefined ? old.uid : uid;
            _this4.medal = medal === undefined ? old.medal : medal;
        }
        return _this4;
    }

    _createClass(ShowMedal, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            if (!bb.isNil()) {
                this.medal = bb.readInt();
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            if (this.medal === undefined || this.medal === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.medal);
            }
        }
    }]);

    return ShowMedal;
}(struct_mgr_1.Struct);

ShowMedal._$info = new sinfo_1.StructInfo("earn/server/data/db/medal.ShowMedal", 2386058047, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("medal", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.ShowMedal = ShowMedal;

var ShowMedalRes = function (_struct_mgr_1$Struct5) {
    _inherits(ShowMedalRes, _struct_mgr_1$Struct5);

    function ShowMedalRes(resultNum, medalType, old) {
        _classCallCheck(this, ShowMedalRes);

        var _this5 = _possibleConstructorReturn(this, (ShowMedalRes.__proto__ || Object.getPrototypeOf(ShowMedalRes)).call(this));

        if (!old) {
            _this5.resultNum = resultNum;
            _this5.medalType = medalType;
        } else {
            _this5.resultNum = resultNum === undefined ? old.resultNum : resultNum;
            _this5.medalType = medalType === undefined ? old.medalType : medalType;
        }
        return _this5;
    }

    _createClass(ShowMedalRes, [{
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
            this.resultNum = bb.readInt();
            if (!bb.isNil()) {
                this.medalType = bb.readInt();
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.resultNum);
            if (this.medalType === undefined || this.medalType === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.medalType);
            }
        }
    }]);

    return ShowMedalRes;
}(struct_mgr_1.Struct);

ShowMedalRes._$info = new sinfo_1.StructInfo("earn/server/data/db/medal.ShowMedalRes", 1981396567, new Map([["constructor", "true"]]), [new sinfo_1.FieldInfo("resultNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("medalType", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.ShowMedalRes = ShowMedalRes;
})