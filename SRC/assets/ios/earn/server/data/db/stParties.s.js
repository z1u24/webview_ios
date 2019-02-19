_$define("earn/server/data/db/stParties.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../../pi/struct/sinfo");

var RotaryOrder = function (_struct_mgr_1$Struct) {
    _inherits(RotaryOrder, _struct_mgr_1$Struct);

    function RotaryOrder(oid, uid, rotatyType, stNum, time, state, old) {
        _classCallCheck(this, RotaryOrder);

        var _this = _possibleConstructorReturn(this, (RotaryOrder.__proto__ || Object.getPrototypeOf(RotaryOrder)).call(this));

        if (!old) {
            _this.oid = oid;
            _this.uid = uid;
            _this.rotatyType = rotatyType;
            _this.stNum = stNum;
            _this.time = time;
            _this.state = state;
        } else {
            _this.oid = oid === undefined ? old.oid : oid;
            _this.uid = uid === undefined ? old.uid : uid;
            _this.rotatyType = rotatyType === undefined ? old.rotatyType : rotatyType;
            _this.stNum = stNum === undefined ? old.stNum : stNum;
            _this.time = time === undefined ? old.time : time;
            _this.state = state === undefined ? old.state : state;
        }
        return _this;
    }

    _createClass(RotaryOrder, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.oid = bb.readUtf8();
            this.uid = bb.readInt();
            this.rotatyType = bb.readInt();
            this.stNum = bb.readInt();
            this.time = bb.readUtf8();
            this.state = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.oid);
            bb.writeInt(this.uid);
            bb.writeInt(this.rotatyType);
            bb.writeInt(this.stNum);
            bb.writeUtf8(this.time);
            bb.writeInt(this.state);
        }
    }]);

    return RotaryOrder;
}(struct_mgr_1.Struct);

RotaryOrder._$info = new sinfo_1.StructInfo("earn/server/data/db/stParties.RotaryOrder", 2066314144, new Map([["primary", "oid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("oid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("rotatyType", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("stNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("time", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("state", new sinfo_1.EnumType(sinfo_1.Type.U8), null)]);
exports.RotaryOrder = RotaryOrder;

var BoxOrder = function (_struct_mgr_1$Struct2) {
    _inherits(BoxOrder, _struct_mgr_1$Struct2);

    function BoxOrder(oid, uid, boxType, stNum, time, state, old) {
        _classCallCheck(this, BoxOrder);

        var _this2 = _possibleConstructorReturn(this, (BoxOrder.__proto__ || Object.getPrototypeOf(BoxOrder)).call(this));

        if (!old) {
            _this2.oid = oid;
            _this2.uid = uid;
            _this2.boxType = boxType;
            _this2.stNum = stNum;
            _this2.time = time;
            _this2.state = state;
        } else {
            _this2.oid = oid === undefined ? old.oid : oid;
            _this2.uid = uid === undefined ? old.uid : uid;
            _this2.boxType = boxType === undefined ? old.boxType : boxType;
            _this2.stNum = stNum === undefined ? old.stNum : stNum;
            _this2.time = time === undefined ? old.time : time;
            _this2.state = state === undefined ? old.state : state;
        }
        return _this2;
    }

    _createClass(BoxOrder, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.oid = bb.readUtf8();
            this.uid = bb.readInt();
            this.boxType = bb.readInt();
            this.stNum = bb.readInt();
            this.time = bb.readUtf8();
            this.state = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.oid);
            bb.writeInt(this.uid);
            bb.writeInt(this.boxType);
            bb.writeInt(this.stNum);
            bb.writeUtf8(this.time);
            bb.writeInt(this.state);
        }
    }]);

    return BoxOrder;
}(struct_mgr_1.Struct);

BoxOrder._$info = new sinfo_1.StructInfo("earn/server/data/db/stParties.BoxOrder", 3920967192, new Map([["primary", "oid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("oid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("boxType", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("stNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("time", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("state", new sinfo_1.EnumType(sinfo_1.Type.U8), null)]);
exports.BoxOrder = BoxOrder;

var UserRotaryOrderTab = function (_struct_mgr_1$Struct3) {
    _inherits(UserRotaryOrderTab, _struct_mgr_1$Struct3);

    function UserRotaryOrderTab(uid, oidList, old) {
        _classCallCheck(this, UserRotaryOrderTab);

        var _this3 = _possibleConstructorReturn(this, (UserRotaryOrderTab.__proto__ || Object.getPrototypeOf(UserRotaryOrderTab)).call(this));

        if (!old) {
            _this3.uid = uid;
            _this3.oidList = oidList;
        } else {
            _this3.uid = uid === undefined ? old.uid : uid;
            _this3.oidList = oidList === undefined ? old.oidList : oidList;
        }
        return _this3;
    }

    _createClass(UserRotaryOrderTab, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            if (!bb.isNil()) {
                this.oidList = bb.readArray(function () {
                    return bb.readUtf8();
                });
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            if (this.oidList === undefined || this.oidList === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.oidList, function (el) {
                    bb.writeUtf8(el);
                });
            }
        }
    }]);

    return UserRotaryOrderTab;
}(struct_mgr_1.Struct);

UserRotaryOrderTab._$info = new sinfo_1.StructInfo("earn/server/data/db/stParties.UserRotaryOrderTab", 3841948291, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("oidList", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str))), null)]);
exports.UserRotaryOrderTab = UserRotaryOrderTab;

var UserBoxOrderTab = function (_struct_mgr_1$Struct4) {
    _inherits(UserBoxOrderTab, _struct_mgr_1$Struct4);

    function UserBoxOrderTab(uid, oidList, old) {
        _classCallCheck(this, UserBoxOrderTab);

        var _this4 = _possibleConstructorReturn(this, (UserBoxOrderTab.__proto__ || Object.getPrototypeOf(UserBoxOrderTab)).call(this));

        if (!old) {
            _this4.uid = uid;
            _this4.oidList = oidList;
        } else {
            _this4.uid = uid === undefined ? old.uid : uid;
            _this4.oidList = oidList === undefined ? old.oidList : oidList;
        }
        return _this4;
    }

    _createClass(UserBoxOrderTab, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            if (!bb.isNil()) {
                this.oidList = bb.readArray(function () {
                    return bb.readUtf8();
                });
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            if (this.oidList === undefined || this.oidList === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.oidList, function (el) {
                    bb.writeUtf8(el);
                });
            }
        }
    }]);

    return UserBoxOrderTab;
}(struct_mgr_1.Struct);

UserBoxOrderTab._$info = new sinfo_1.StructInfo("earn/server/data/db/stParties.UserBoxOrderTab", 554772564, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("oidList", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str))), null)]);
exports.UserBoxOrderTab = UserBoxOrderTab;
})