_$define("earn/server/data/db/item.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../../pi/struct/sinfo");

var MineHp = function (_struct_mgr_1$Struct) {
    _inherits(MineHp, _struct_mgr_1$Struct);

    function MineHp() {
        _classCallCheck(this, MineHp);

        return _possibleConstructorReturn(this, (MineHp.__proto__ || Object.getPrototypeOf(MineHp)).apply(this, arguments));
    }

    _createClass(MineHp, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.num = bb.readInt();
            this.hp = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.num);
            bb.writeInt(this.hp);
        }
    }]);

    return MineHp;
}(struct_mgr_1.Struct);

MineHp._$info = new sinfo_1.StructInfo("earn/server/data/db/item.MineHp", 2303708327, null, [new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("hp", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.MineHp = MineHp;

var Mine = function (_struct_mgr_1$Struct2) {
    _inherits(Mine, _struct_mgr_1$Struct2);

    function Mine() {
        _classCallCheck(this, Mine);

        return _possibleConstructorReturn(this, (Mine.__proto__ || Object.getPrototypeOf(Mine)).apply(this, arguments));
    }

    _createClass(Mine, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this3 = this;

            this.num = bb.readInt();
            this.count = bb.readInt();
            this.hps = bb.readArray(function () {
                return function () {
                    if (!bb.isNil()) {
                        return bb.readBonCode(_this3._$EnumTypeMap ? _this3._$EnumTypeMap(_this3.hps) : MineHp);
                    }
                    ;
                }();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.num);
            bb.writeInt(this.count);
            bb.writeArray(this.hps, function (el) {
                if (el === undefined || el === null) {
                    bb.writeNil();
                } else {
                    bb.writeBonCode(el);
                }
            });
        }
    }]);

    return Mine;
}(struct_mgr_1.Struct);

Mine._$info = new sinfo_1.StructInfo("earn/server/data/db/item.Mine", 1100672633, null, [new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("hps", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Struct, MineHp._$info))), null)]);
exports.Mine = Mine;

var Hoe = function (_struct_mgr_1$Struct3) {
    _inherits(Hoe, _struct_mgr_1$Struct3);

    function Hoe() {
        _classCallCheck(this, Hoe);

        return _possibleConstructorReturn(this, (Hoe.__proto__ || Object.getPrototypeOf(Hoe)).apply(this, arguments));
    }

    _createClass(Hoe, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.num = bb.readInt();
            this.count = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.num);
            bb.writeInt(this.count);
        }
    }]);

    return Hoe;
}(struct_mgr_1.Struct);

Hoe._$info = new sinfo_1.StructInfo("earn/server/data/db/item.Hoe", 1052097167, null, [new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.Hoe = Hoe;

var BTC = function (_struct_mgr_1$Struct4) {
    _inherits(BTC, _struct_mgr_1$Struct4);

    function BTC() {
        _classCallCheck(this, BTC);

        return _possibleConstructorReturn(this, (BTC.__proto__ || Object.getPrototypeOf(BTC)).apply(this, arguments));
    }

    _createClass(BTC, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.num = bb.readInt();
            this.count = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.num);
            bb.writeInt(this.count);
        }
    }]);

    return BTC;
}(struct_mgr_1.Struct);

BTC._$info = new sinfo_1.StructInfo("earn/server/data/db/item.BTC", 3359963136, null, [new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.BTC = BTC;

var ETH = function (_struct_mgr_1$Struct5) {
    _inherits(ETH, _struct_mgr_1$Struct5);

    function ETH() {
        _classCallCheck(this, ETH);

        return _possibleConstructorReturn(this, (ETH.__proto__ || Object.getPrototypeOf(ETH)).apply(this, arguments));
    }

    _createClass(ETH, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.num = bb.readInt();
            this.count = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.num);
            bb.writeInt(this.count);
        }
    }]);

    return ETH;
}(struct_mgr_1.Struct);

ETH._$info = new sinfo_1.StructInfo("earn/server/data/db/item.ETH", 2347228622, null, [new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.ETH = ETH;

var ST = function (_struct_mgr_1$Struct6) {
    _inherits(ST, _struct_mgr_1$Struct6);

    function ST() {
        _classCallCheck(this, ST);

        return _possibleConstructorReturn(this, (ST.__proto__ || Object.getPrototypeOf(ST)).apply(this, arguments));
    }

    _createClass(ST, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.num = bb.readInt();
            this.count = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.num);
            bb.writeInt(this.count);
        }
    }]);

    return ST;
}(struct_mgr_1.Struct);

ST._$info = new sinfo_1.StructInfo("earn/server/data/db/item.ST", 1865491617, null, [new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.ST = ST;

var KT = function (_struct_mgr_1$Struct7) {
    _inherits(KT, _struct_mgr_1$Struct7);

    function KT() {
        _classCallCheck(this, KT);

        return _possibleConstructorReturn(this, (KT.__proto__ || Object.getPrototypeOf(KT)).apply(this, arguments));
    }

    _createClass(KT, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.num = bb.readInt();
            this.count = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.num);
            bb.writeInt(this.count);
        }
    }]);

    return KT;
}(struct_mgr_1.Struct);

KT._$info = new sinfo_1.StructInfo("earn/server/data/db/item.KT", 3765770121, null, [new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.KT = KT;

var Ticket = function (_struct_mgr_1$Struct8) {
    _inherits(Ticket, _struct_mgr_1$Struct8);

    function Ticket() {
        _classCallCheck(this, Ticket);

        return _possibleConstructorReturn(this, (Ticket.__proto__ || Object.getPrototypeOf(Ticket)).apply(this, arguments));
    }

    _createClass(Ticket, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.num = bb.readInt();
            this.count = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.num);
            bb.writeInt(this.count);
        }
    }]);

    return Ticket;
}(struct_mgr_1.Struct);

Ticket._$info = new sinfo_1.StructInfo("earn/server/data/db/item.Ticket", 3285135783, null, [new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.Ticket = Ticket;
var Item_Enum;
(function (Item_Enum) {
    Item_Enum[Item_Enum["MINE"] = 1] = "MINE";
    Item_Enum[Item_Enum["HOE"] = 2] = "HOE";
    Item_Enum[Item_Enum["BTC"] = 3] = "BTC";
    Item_Enum[Item_Enum["ETH"] = 4] = "ETH";
    Item_Enum[Item_Enum["ST"] = 5] = "ST";
    Item_Enum[Item_Enum["KT"] = 6] = "KT";
    Item_Enum[Item_Enum["TICKET"] = 7] = "TICKET";
})(Item_Enum = exports.Item_Enum || (exports.Item_Enum = {}));

var Item = function (_struct_mgr_1$Struct9) {
    _inherits(Item, _struct_mgr_1$Struct9);

    function Item(type, value) {
        _classCallCheck(this, Item);

        var _this10 = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this));

        _this10.enum_type = type;
        _this10.value = value;
        return _this10;
    }

    _createClass(Item, [{
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.enum_type);
            switch (this.enum_type) {
                case 1:
                    bb.writeBonCode(this.value);
                    break;
                case 2:
                    bb.writeBonCode(this.value);
                    break;
                case 3:
                    bb.writeBonCode(this.value);
                    break;
                case 4:
                    bb.writeBonCode(this.value);
                    break;
                case 5:
                    bb.writeBonCode(this.value);
                    break;
                case 6:
                    bb.writeBonCode(this.value);
                    break;
                case 7:
                    bb.writeBonCode(this.value);
                    break;
                default:
                    throw new Error("bonEncode type error, A is not exist index:" + this.enum_type);
            }
        }
    }, {
        key: "bonDecode",
        value: function bonDecode(bb) {
            var t = bb.readInt();
            this.enum_type = t;
            switch (t) {
                case 1:
                    this.value = bb.readBonCode(Mine);
                    break;
                case 2:
                    this.value = bb.readBonCode(Hoe);
                    break;
                case 3:
                    this.value = bb.readBonCode(BTC);
                    break;
                case 4:
                    this.value = bb.readBonCode(ETH);
                    break;
                case 5:
                    this.value = bb.readBonCode(ST);
                    break;
                case 6:
                    this.value = bb.readBonCode(KT);
                    break;
                case 7:
                    this.value = bb.readBonCode(Ticket);
                    break;
                default:
                    throw new Error("bonDecode type error, A is not exist index:" + t);
            }
        }
    }]);

    return Item;
}(struct_mgr_1.Struct);

Item._$info = new sinfo_1.EnumInfo('earn/server/data/db/item.Item', 2691328868, null, [new sinfo_1.EnumType(sinfo_1.Type.Struct, Mine._$info), new sinfo_1.EnumType(sinfo_1.Type.Struct, Hoe._$info), new sinfo_1.EnumType(sinfo_1.Type.Struct, BTC._$info), new sinfo_1.EnumType(sinfo_1.Type.Struct, ETH._$info), new sinfo_1.EnumType(sinfo_1.Type.Struct, ST._$info), new sinfo_1.EnumType(sinfo_1.Type.Struct, KT._$info), new sinfo_1.EnumType(sinfo_1.Type.Struct, Ticket._$info)]);
exports.Item = Item;

var ItemResponse = function (_struct_mgr_1$Struct10) {
    _inherits(ItemResponse, _struct_mgr_1$Struct10);

    function ItemResponse() {
        _classCallCheck(this, ItemResponse);

        return _possibleConstructorReturn(this, (ItemResponse.__proto__ || Object.getPrototypeOf(ItemResponse)).apply(this, arguments));
    }

    _createClass(ItemResponse, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.resultNum = bb.readInt();
            if (!bb.isNil()) {
                this.item = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.item) : Item);
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.resultNum);
            if (this.item === undefined || this.item === null) {
                bb.writeNil();
            } else {
                bb.writeBonCode(this.item);
            }
        }
    }]);

    return ItemResponse;
}(struct_mgr_1.Struct);

ItemResponse._$info = new sinfo_1.StructInfo("earn/server/data/db/item.ItemResponse", 3351800316, null, [new sinfo_1.FieldInfo("resultNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("item", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Enum, Item._$info)), null)]);
exports.ItemResponse = ItemResponse;

var MiningResponse = function (_struct_mgr_1$Struct11) {
    _inherits(MiningResponse, _struct_mgr_1$Struct11);

    function MiningResponse() {
        _classCallCheck(this, MiningResponse);

        return _possibleConstructorReturn(this, (MiningResponse.__proto__ || Object.getPrototypeOf(MiningResponse)).apply(this, arguments));
    }

    _createClass(MiningResponse, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this13 = this;

            this.resultNum = bb.readInt();
            if (!bb.isNil()) {
                this.leftHp = bb.readInt();
            }
            if (!bb.isNil()) {
                this.awards = bb.readArray(function () {
                    return bb.readBonCode(_this13._$EnumTypeMap ? _this13._$EnumTypeMap(_this13.awards) : Item);
                });
            }
            if (!bb.isNil()) {
                this.mine = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.mine) : Mine);
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.resultNum);
            if (this.leftHp === undefined || this.leftHp === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.leftHp);
            }
            if (this.awards === undefined || this.awards === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.awards, function (el) {
                    bb.writeBonCode(el);
                });
            }
            if (this.mine === undefined || this.mine === null) {
                bb.writeNil();
            } else {
                bb.writeBonCode(this.mine);
            }
        }
    }]);

    return MiningResponse;
}(struct_mgr_1.Struct);

MiningResponse._$info = new sinfo_1.StructInfo("earn/server/data/db/item.MiningResponse", 140782823, null, [new sinfo_1.FieldInfo("resultNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("leftHp", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null), new sinfo_1.FieldInfo("awards", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Enum, Item._$info))), null), new sinfo_1.FieldInfo("mine", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Struct, Mine._$info)), null)]);
exports.MiningResponse = MiningResponse;

var Items = function (_struct_mgr_1$Struct12) {
    _inherits(Items, _struct_mgr_1$Struct12);

    function Items() {
        _classCallCheck(this, Items);

        return _possibleConstructorReturn(this, (Items.__proto__ || Object.getPrototypeOf(Items)).apply(this, arguments));
    }

    _createClass(Items, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this15 = this;

            this.uid = bb.readInt();
            this.item = bb.readArray(function () {
                return bb.readBonCode(_this15._$EnumTypeMap ? _this15._$EnumTypeMap(_this15.item) : Item);
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeArray(this.item, function (el) {
                bb.writeBonCode(el);
            });
        }
    }]);

    return Items;
}(struct_mgr_1.Struct);

Items._$info = new sinfo_1.StructInfo("earn/server/data/db/item.Items", 2516898507, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("item", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Enum, Item._$info)), null)]);
exports.Items = Items;

var ItemsResponse = function (_struct_mgr_1$Struct13) {
    _inherits(ItemsResponse, _struct_mgr_1$Struct13);

    function ItemsResponse() {
        _classCallCheck(this, ItemsResponse);

        return _possibleConstructorReturn(this, (ItemsResponse.__proto__ || Object.getPrototypeOf(ItemsResponse)).apply(this, arguments));
    }

    _createClass(ItemsResponse, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.resultNum = bb.readInt();
            if (!bb.isNil()) {
                this.item = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.item) : Items);
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.resultNum);
            if (this.item === undefined || this.item === null) {
                bb.writeNil();
            } else {
                bb.writeBonCode(this.item);
            }
        }
    }]);

    return ItemsResponse;
}(struct_mgr_1.Struct);

ItemsResponse._$info = new sinfo_1.StructInfo("earn/server/data/db/item.ItemsResponse", 2927901224, null, [new sinfo_1.FieldInfo("resultNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("item", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Struct, Items._$info)), null)]);
exports.ItemsResponse = ItemsResponse;

var Award = function (_struct_mgr_1$Struct14) {
    _inherits(Award, _struct_mgr_1$Struct14);

    function Award(id, awardType, count, uid, src, time, desc, convert, deadTime, old) {
        _classCallCheck(this, Award);

        var _this17 = _possibleConstructorReturn(this, (Award.__proto__ || Object.getPrototypeOf(Award)).call(this));

        if (!old) {
            _this17.id = id;
            _this17.awardType = awardType;
            _this17.count = count;
            _this17.uid = uid;
            _this17.src = src;
            _this17.time = time;
            _this17.desc = desc;
            _this17.convert = convert;
            _this17.deadTime = deadTime;
        } else {
            _this17.id = id === undefined ? old.id : id;
            _this17.awardType = awardType === undefined ? old.awardType : awardType;
            _this17.count = count === undefined ? old.count : count;
            _this17.uid = uid === undefined ? old.uid : uid;
            _this17.src = src === undefined ? old.src : src;
            _this17.time = time === undefined ? old.time : time;
            _this17.desc = desc === undefined ? old.desc : desc;
            _this17.convert = convert === undefined ? old.convert : convert;
            _this17.deadTime = deadTime === undefined ? old.deadTime : deadTime;
        }
        return _this17;
    }

    _createClass(Award, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.id = bb.readUtf8();
            this.awardType = bb.readInt();
            this.count = bb.readInt();
            this.uid = bb.readInt();
            this.src = bb.readUtf8();
            this.time = bb.readUtf8();
            if (!bb.isNil()) {
                this.desc = bb.readUtf8();
            }
            if (!bb.isNil()) {
                this.convert = bb.readUtf8();
            }
            if (!bb.isNil()) {
                this.deadTime = bb.readUtf8();
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.id);
            bb.writeInt(this.awardType);
            bb.writeInt(this.count);
            bb.writeInt(this.uid);
            bb.writeUtf8(this.src);
            bb.writeUtf8(this.time);
            if (this.desc === undefined || this.desc === null) {
                bb.writeNil();
            } else {
                bb.writeUtf8(this.desc);
            }
            if (this.convert === undefined || this.convert === null) {
                bb.writeNil();
            } else {
                bb.writeUtf8(this.convert);
            }
            if (this.deadTime === undefined || this.deadTime === null) {
                bb.writeNil();
            } else {
                bb.writeUtf8(this.deadTime);
            }
        }
    }]);

    return Award;
}(struct_mgr_1.Struct);

Award._$info = new sinfo_1.StructInfo("earn/server/data/db/item.Award", 4216992079, new Map([["primary", "id"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("awardType", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("src", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("time", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("desc", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Str)), null), new sinfo_1.FieldInfo("convert", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Str)), null), new sinfo_1.FieldInfo("deadTime", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Str)), null)]);
exports.Award = Award;

var AwardMap = function (_struct_mgr_1$Struct15) {
    _inherits(AwardMap, _struct_mgr_1$Struct15);

    function AwardMap() {
        _classCallCheck(this, AwardMap);

        return _possibleConstructorReturn(this, (AwardMap.__proto__ || Object.getPrototypeOf(AwardMap)).apply(this, arguments));
    }

    _createClass(AwardMap, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            if (!bb.isNil()) {
                this.awards = bb.readArray(function () {
                    return bb.readUtf8();
                });
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            if (this.awards === undefined || this.awards === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.awards, function (el) {
                    bb.writeUtf8(el);
                });
            }
        }
    }]);

    return AwardMap;
}(struct_mgr_1.Struct);

AwardMap._$info = new sinfo_1.StructInfo("earn/server/data/db/item.AwardMap", 2093328558, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("awards", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str))), null)]);
exports.AwardMap = AwardMap;

var SpecialAward = function (_struct_mgr_1$Struct16) {
    _inherits(SpecialAward, _struct_mgr_1$Struct16);

    function SpecialAward() {
        _classCallCheck(this, SpecialAward);

        return _possibleConstructorReturn(this, (SpecialAward.__proto__ || Object.getPrototypeOf(SpecialAward)).apply(this, arguments));
    }

    _createClass(SpecialAward, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.id = bb.readUtf8();
            this.awardType = bb.readInt();
            this.count = bb.readInt();
            this.uid = bb.readInt();
            this.openid = bb.readUtf8();
            this.src = bb.readUtf8();
            this.time = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.id);
            bb.writeInt(this.awardType);
            bb.writeInt(this.count);
            bb.writeInt(this.uid);
            bb.writeUtf8(this.openid);
            bb.writeUtf8(this.src);
            bb.writeUtf8(this.time);
        }
    }]);

    return SpecialAward;
}(struct_mgr_1.Struct);

SpecialAward._$info = new sinfo_1.StructInfo("earn/server/data/db/item.SpecialAward", 1957759141, new Map([["primary", "id"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("awardType", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("count", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("openid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("src", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("time", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.SpecialAward = SpecialAward;

var AwardQuery = function (_struct_mgr_1$Struct17) {
    _inherits(AwardQuery, _struct_mgr_1$Struct17);

    function AwardQuery() {
        _classCallCheck(this, AwardQuery);

        return _possibleConstructorReturn(this, (AwardQuery.__proto__ || Object.getPrototypeOf(AwardQuery)).apply(this, arguments));
    }

    _createClass(AwardQuery, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            if (!bb.isNil()) {
                this.src = bb.readUtf8();
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            if (this.src === undefined || this.src === null) {
                bb.writeNil();
            } else {
                bb.writeUtf8(this.src);
            }
        }
    }]);

    return AwardQuery;
}(struct_mgr_1.Struct);

AwardQuery._$info = new sinfo_1.StructInfo("earn/server/data/db/item.AwardQuery", 453205950, null, [new sinfo_1.FieldInfo("src", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Str)), null)]);
exports.AwardQuery = AwardQuery;

var AwardList = function (_struct_mgr_1$Struct18) {
    _inherits(AwardList, _struct_mgr_1$Struct18);

    function AwardList() {
        _classCallCheck(this, AwardList);

        return _possibleConstructorReturn(this, (AwardList.__proto__ || Object.getPrototypeOf(AwardList)).apply(this, arguments));
    }

    _createClass(AwardList, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this22 = this;

            this.uid = bb.readInt();
            if (!bb.isNil()) {
                this.awards = bb.readArray(function () {
                    return bb.readBonCode(_this22._$EnumTypeMap ? _this22._$EnumTypeMap(_this22.awards) : Award);
                });
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            if (this.awards === undefined || this.awards === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.awards, function (el) {
                    bb.writeBonCode(el);
                });
            }
        }
    }]);

    return AwardList;
}(struct_mgr_1.Struct);

AwardList._$info = new sinfo_1.StructInfo("earn/server/data/db/item.AwardList", 949519590, null, [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("awards", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, Award._$info))), null)]);
exports.AwardList = AwardList;

var MineSeed = function (_struct_mgr_1$Struct19) {
    _inherits(MineSeed, _struct_mgr_1$Struct19);

    function MineSeed() {
        _classCallCheck(this, MineSeed);

        return _possibleConstructorReturn(this, (MineSeed.__proto__ || Object.getPrototypeOf(MineSeed)).apply(this, arguments));
    }

    _createClass(MineSeed, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.seed = bb.readInt();
            this.hoeType = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeInt(this.seed);
            bb.writeInt(this.hoeType);
        }
    }]);

    return MineSeed;
}(struct_mgr_1.Struct);

MineSeed._$info = new sinfo_1.StructInfo("earn/server/data/db/item.MineSeed", 2399242333, new Map([["primary", "uid"], ["db", "memory"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("seed", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("hoeType", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.MineSeed = MineSeed;

var TodayMineNum = function (_struct_mgr_1$Struct20) {
    _inherits(TodayMineNum, _struct_mgr_1$Struct20);

    function TodayMineNum() {
        _classCallCheck(this, TodayMineNum);

        return _possibleConstructorReturn(this, (TodayMineNum.__proto__ || Object.getPrototypeOf(TodayMineNum)).apply(this, arguments));
    }

    _createClass(TodayMineNum, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.id = bb.readUtf8();
            this.mineNum = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.id);
            bb.writeInt(this.mineNum);
        }
    }]);

    return TodayMineNum;
}(struct_mgr_1.Struct);

TodayMineNum._$info = new sinfo_1.StructInfo("earn/server/data/db/item.TodayMineNum", 3770542213, new Map([["primary", "id"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("mineNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.TodayMineNum = TodayMineNum;

var TotalMiningNum = function (_struct_mgr_1$Struct21) {
    _inherits(TotalMiningNum, _struct_mgr_1$Struct21);

    function TotalMiningNum() {
        _classCallCheck(this, TotalMiningNum);

        return _possibleConstructorReturn(this, (TotalMiningNum.__proto__ || Object.getPrototypeOf(TotalMiningNum)).apply(this, arguments));
    }

    _createClass(TotalMiningNum, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.openid = bb.readUtf8();
            this.total = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeUtf8(this.openid);
            bb.writeInt(this.total);
        }
    }]);

    return TotalMiningNum;
}(struct_mgr_1.Struct);

TotalMiningNum._$info = new sinfo_1.StructInfo("earn/server/data/db/item.TotalMiningNum", 2162443034, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("openid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("total", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.TotalMiningNum = TotalMiningNum;

var MiningMap = function (_struct_mgr_1$Struct22) {
    _inherits(MiningMap, _struct_mgr_1$Struct22);

    function MiningMap() {
        _classCallCheck(this, MiningMap);

        return _possibleConstructorReturn(this, (MiningMap.__proto__ || Object.getPrototypeOf(MiningMap)).apply(this, arguments));
    }

    _createClass(MiningMap, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.total = bb.readInt();
            this.uid = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.total);
            bb.writeInt(this.uid);
        }
    }]);

    return MiningMap;
}(struct_mgr_1.Struct);

MiningMap._$info = new sinfo_1.StructInfo("earn/server/data/db/item.MiningMap", 2655504595, null, [new sinfo_1.FieldInfo("total", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.MiningMap = MiningMap;

var TotalMiningMap = function (_struct_mgr_1$Struct23) {
    _inherits(TotalMiningMap, _struct_mgr_1$Struct23);

    function TotalMiningMap() {
        _classCallCheck(this, TotalMiningMap);

        return _possibleConstructorReturn(this, (TotalMiningMap.__proto__ || Object.getPrototypeOf(TotalMiningMap)).apply(this, arguments));
    }

    _createClass(TotalMiningMap, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.miningMap = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.miningMap) : MiningMap);
            this.openid = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeBonCode(this.miningMap);
            bb.writeUtf8(this.openid);
        }
    }]);

    return TotalMiningMap;
}(struct_mgr_1.Struct);

TotalMiningMap._$info = new sinfo_1.StructInfo("earn/server/data/db/item.TotalMiningMap", 1245353546, new Map([["primary", "miningMap"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("miningMap", new sinfo_1.EnumType(sinfo_1.Type.Struct, MiningMap._$info), null), new sinfo_1.FieldInfo("openid", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.TotalMiningMap = TotalMiningMap;

var MiningKTNum = function (_struct_mgr_1$Struct24) {
    _inherits(MiningKTNum, _struct_mgr_1$Struct24);

    function MiningKTNum() {
        _classCallCheck(this, MiningKTNum);

        return _possibleConstructorReturn(this, (MiningKTNum.__proto__ || Object.getPrototypeOf(MiningKTNum)).apply(this, arguments));
    }

    _createClass(MiningKTNum, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.openid = bb.readUtf8();
            this.total = bb.readInt();
            if (!bb.isNil()) {
                this.medal = bb.readInt();
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeUtf8(this.openid);
            bb.writeInt(this.total);
            if (this.medal === undefined || this.medal === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.medal);
            }
        }
    }]);

    return MiningKTNum;
}(struct_mgr_1.Struct);

MiningKTNum._$info = new sinfo_1.StructInfo("earn/server/data/db/item.MiningKTNum", 1985639808, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("openid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("total", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("medal", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.MiningKTNum = MiningKTNum;

var MiningKTMap = function (_struct_mgr_1$Struct25) {
    _inherits(MiningKTMap, _struct_mgr_1$Struct25);

    function MiningKTMap() {
        _classCallCheck(this, MiningKTMap);

        return _possibleConstructorReturn(this, (MiningKTMap.__proto__ || Object.getPrototypeOf(MiningKTMap)).apply(this, arguments));
    }

    _createClass(MiningKTMap, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.ktNum = bb.readInt();
            this.uid = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.ktNum);
            bb.writeInt(this.uid);
        }
    }]);

    return MiningKTMap;
}(struct_mgr_1.Struct);

MiningKTMap._$info = new sinfo_1.StructInfo("earn/server/data/db/item.MiningKTMap", 335772361, null, [new sinfo_1.FieldInfo("ktNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.MiningKTMap = MiningKTMap;

var MiningKTMapTab = function (_struct_mgr_1$Struct26) {
    _inherits(MiningKTMapTab, _struct_mgr_1$Struct26);

    function MiningKTMapTab() {
        _classCallCheck(this, MiningKTMapTab);

        return _possibleConstructorReturn(this, (MiningKTMapTab.__proto__ || Object.getPrototypeOf(MiningKTMapTab)).apply(this, arguments));
    }

    _createClass(MiningKTMapTab, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.miningKTMap = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.miningKTMap) : MiningKTMap);
            this.openid = bb.readUtf8();
            if (!bb.isNil()) {
                this.medal = bb.readInt();
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeBonCode(this.miningKTMap);
            bb.writeUtf8(this.openid);
            if (this.medal === undefined || this.medal === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.medal);
            }
        }
    }]);

    return MiningKTMapTab;
}(struct_mgr_1.Struct);

MiningKTMapTab._$info = new sinfo_1.StructInfo("earn/server/data/db/item.MiningKTMapTab", 905754647, new Map([["primary", "miningKTMap"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("miningKTMap", new sinfo_1.EnumType(sinfo_1.Type.Struct, MiningKTMap._$info), null), new sinfo_1.FieldInfo("openid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("medal", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.MiningKTMapTab = MiningKTMapTab;

var FreePlay = function (_struct_mgr_1$Struct27) {
    _inherits(FreePlay, _struct_mgr_1$Struct27);

    function FreePlay() {
        _classCallCheck(this, FreePlay);

        return _possibleConstructorReturn(this, (FreePlay.__proto__ || Object.getPrototypeOf(FreePlay)).apply(this, arguments));
    }

    _createClass(FreePlay, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.freeRotary = bb.readBool();
            this.freeBox = bb.readBool();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeBool(this.freeRotary);
            bb.writeBool(this.freeBox);
        }
    }]);

    return FreePlay;
}(struct_mgr_1.Struct);

FreePlay._$info = new sinfo_1.StructInfo("earn/server/data/db/item.FreePlay", 3565907974, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("freeRotary", new sinfo_1.EnumType(sinfo_1.Type.Bool), null), new sinfo_1.FieldInfo("freeBox", new sinfo_1.EnumType(sinfo_1.Type.Bool), null)]);
exports.FreePlay = FreePlay;

var MineKTTop = function (_struct_mgr_1$Struct28) {
    _inherits(MineKTTop, _struct_mgr_1$Struct28);

    function MineKTTop() {
        _classCallCheck(this, MineKTTop);

        return _possibleConstructorReturn(this, (MineKTTop.__proto__ || Object.getPrototypeOf(MineKTTop)).apply(this, arguments));
    }

    _createClass(MineKTTop, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this33 = this;

            if (!bb.isNil()) {
                this.topList = bb.readArray(function () {
                    return bb.readBonCode(_this33._$EnumTypeMap ? _this33._$EnumTypeMap(_this33.topList) : MiningKTMapTab);
                });
            }
            if (!bb.isNil()) {
                this.myNum = bb.readInt();
            }
            this.myKTNum = bb.readInt();
            if (!bb.isNil()) {
                this.myMedal = bb.readInt();
            }
            this.resultNum = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            if (this.topList === undefined || this.topList === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.topList, function (el) {
                    bb.writeBonCode(el);
                });
            }
            if (this.myNum === undefined || this.myNum === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.myNum);
            }
            bb.writeInt(this.myKTNum);
            if (this.myMedal === undefined || this.myMedal === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.myMedal);
            }
            bb.writeInt(this.resultNum);
        }
    }]);

    return MineKTTop;
}(struct_mgr_1.Struct);

MineKTTop._$info = new sinfo_1.StructInfo("earn/server/data/db/item.MineKTTop", 3709518490, null, [new sinfo_1.FieldInfo("topList", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, MiningKTMapTab._$info))), null), new sinfo_1.FieldInfo("myNum", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null), new sinfo_1.FieldInfo("myKTNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("myMedal", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null), new sinfo_1.FieldInfo("resultNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.MineKTTop = MineKTTop;

var UsedKT = function (_struct_mgr_1$Struct29) {
    _inherits(UsedKT, _struct_mgr_1$Struct29);

    function UsedKT() {
        _classCallCheck(this, UsedKT);

        return _possibleConstructorReturn(this, (UsedKT.__proto__ || Object.getPrototypeOf(UsedKT)).apply(this, arguments));
    }

    _createClass(UsedKT, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.KTNum = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeInt(this.KTNum);
        }
    }]);

    return UsedKT;
}(struct_mgr_1.Struct);

UsedKT._$info = new sinfo_1.StructInfo("earn/server/data/db/item.UsedKT", 3784198423, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("KTNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.UsedKT = UsedKT;

var MineTop = function (_struct_mgr_1$Struct30) {
    _inherits(MineTop, _struct_mgr_1$Struct30);

    function MineTop() {
        _classCallCheck(this, MineTop);

        return _possibleConstructorReturn(this, (MineTop.__proto__ || Object.getPrototypeOf(MineTop)).apply(this, arguments));
    }

    _createClass(MineTop, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this36 = this;

            if (!bb.isNil()) {
                this.topList = bb.readArray(function () {
                    return bb.readBonCode(_this36._$EnumTypeMap ? _this36._$EnumTypeMap(_this36.topList) : TotalMiningMap);
                });
            }
            if (!bb.isNil()) {
                this.myNum = bb.readInt();
            }
            this.resultNum = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            if (this.topList === undefined || this.topList === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.topList, function (el) {
                    bb.writeBonCode(el);
                });
            }
            if (this.myNum === undefined || this.myNum === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.myNum);
            }
            bb.writeInt(this.resultNum);
        }
    }]);

    return MineTop;
}(struct_mgr_1.Struct);

MineTop._$info = new sinfo_1.StructInfo("earn/server/data/db/item.MineTop", 2897920351, null, [new sinfo_1.FieldInfo("topList", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, TotalMiningMap._$info))), null), new sinfo_1.FieldInfo("myNum", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null), new sinfo_1.FieldInfo("resultNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.MineTop = MineTop;

var ConvertTab = function (_struct_mgr_1$Struct31) {
    _inherits(ConvertTab, _struct_mgr_1$Struct31);

    function ConvertTab(convert, typeNum, state, deadTime, old) {
        _classCallCheck(this, ConvertTab);

        var _this37 = _possibleConstructorReturn(this, (ConvertTab.__proto__ || Object.getPrototypeOf(ConvertTab)).call(this));

        if (!old) {
            _this37.convert = convert;
            _this37.typeNum = typeNum;
            _this37.state = state;
            _this37.deadTime = deadTime;
        } else {
            _this37.convert = convert === undefined ? old.convert : convert;
            _this37.typeNum = typeNum === undefined ? old.typeNum : typeNum;
            _this37.state = state === undefined ? old.state : state;
            _this37.deadTime = deadTime === undefined ? old.deadTime : deadTime;
        }
        return _this37;
    }

    _createClass(ConvertTab, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.convert = bb.readUtf8();
            this.typeNum = bb.readInt();
            if (!bb.isNil()) {
                this.state = bb.readBool();
            }
            this.deadTime = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.convert);
            bb.writeInt(this.typeNum);
            if (this.state === undefined || this.state === null) {
                bb.writeNil();
            } else {
                bb.writeBool(this.state);
            }
            bb.writeUtf8(this.deadTime);
        }
    }]);

    return ConvertTab;
}(struct_mgr_1.Struct);

ConvertTab._$info = new sinfo_1.StructInfo("earn/server/data/db/item.ConvertTab", 3974043144, new Map([["primary", "convert"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("convert", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("typeNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("state", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Bool)), null), new sinfo_1.FieldInfo("deadTime", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.ConvertTab = ConvertTab;

var AwardResponse = function (_struct_mgr_1$Struct32) {
    _inherits(AwardResponse, _struct_mgr_1$Struct32);

    function AwardResponse() {
        _classCallCheck(this, AwardResponse);

        return _possibleConstructorReturn(this, (AwardResponse.__proto__ || Object.getPrototypeOf(AwardResponse)).apply(this, arguments));
    }

    _createClass(AwardResponse, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.resultNum = bb.readInt();
            if (!bb.isNil()) {
                this.award = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.award) : Award);
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.resultNum);
            if (this.award === undefined || this.award === null) {
                bb.writeNil();
            } else {
                bb.writeBonCode(this.award);
            }
        }
    }]);

    return AwardResponse;
}(struct_mgr_1.Struct);

AwardResponse._$info = new sinfo_1.StructInfo("earn/server/data/db/item.AwardResponse", 2611342172, null, [new sinfo_1.FieldInfo("resultNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("award", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Struct, Award._$info)), null)]);
exports.AwardResponse = AwardResponse;

var InviteAwardRes = function (_struct_mgr_1$Struct33) {
    _inherits(InviteAwardRes, _struct_mgr_1$Struct33);

    function InviteAwardRes() {
        _classCallCheck(this, InviteAwardRes);

        return _possibleConstructorReturn(this, (InviteAwardRes.__proto__ || Object.getPrototypeOf(InviteAwardRes)).apply(this, arguments));
    }

    _createClass(InviteAwardRes, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this40 = this;

            this.resultNum = bb.readInt();
            if (!bb.isNil()) {
                this.award = bb.readArray(function () {
                    return bb.readBonCode(_this40._$EnumTypeMap ? _this40._$EnumTypeMap(_this40.award) : Award);
                });
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.resultNum);
            if (this.award === undefined || this.award === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.award, function (el) {
                    bb.writeBonCode(el);
                });
            }
        }
    }]);

    return InviteAwardRes;
}(struct_mgr_1.Struct);

InviteAwardRes._$info = new sinfo_1.StructInfo("earn/server/data/db/item.InviteAwardRes", 3540998965, null, [new sinfo_1.FieldInfo("resultNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("award", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, Award._$info))), null)]);
exports.InviteAwardRes = InviteAwardRes;

var DailyWatchAdNum = function (_struct_mgr_1$Struct34) {
    _inherits(DailyWatchAdNum, _struct_mgr_1$Struct34);

    function DailyWatchAdNum() {
        _classCallCheck(this, DailyWatchAdNum);

        return _possibleConstructorReturn(this, (DailyWatchAdNum.__proto__ || Object.getPrototypeOf(DailyWatchAdNum)).apply(this, arguments));
    }

    _createClass(DailyWatchAdNum, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.id = bb.readUtf8();
            this.num = bb.readInt();
            this.lastTime = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.id);
            bb.writeInt(this.num);
            bb.writeInt(this.lastTime);
        }
    }]);

    return DailyWatchAdNum;
}(struct_mgr_1.Struct);

DailyWatchAdNum._$info = new sinfo_1.StructInfo("earn/server/data/db/item.DailyWatchAdNum", 1028158107, new Map([["primary", "id"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("lastTime", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.DailyWatchAdNum = DailyWatchAdNum;

var ProductInfo = function (_struct_mgr_1$Struct35) {
    _inherits(ProductInfo, _struct_mgr_1$Struct35);

    function ProductInfo(id, stCount, name, value, desc, progress, tips, level, pic, leftCount, convertCount, old) {
        _classCallCheck(this, ProductInfo);

        var _this42 = _possibleConstructorReturn(this, (ProductInfo.__proto__ || Object.getPrototypeOf(ProductInfo)).call(this));

        if (!old) {
            _this42.id = id;
            _this42.stCount = stCount;
            _this42.name = name;
            _this42.value = value;
            _this42.desc = desc;
            _this42.progress = progress;
            _this42.tips = tips;
            _this42.level = level;
            _this42.pic = pic;
            _this42.leftCount = leftCount;
            _this42.convertCount = convertCount;
        } else {
            _this42.id = id === undefined ? old.id : id;
            _this42.stCount = stCount === undefined ? old.stCount : stCount;
            _this42.name = name === undefined ? old.name : name;
            _this42.value = value === undefined ? old.value : value;
            _this42.desc = desc === undefined ? old.desc : desc;
            _this42.progress = progress === undefined ? old.progress : progress;
            _this42.tips = tips === undefined ? old.tips : tips;
            _this42.level = level === undefined ? old.level : level;
            _this42.pic = pic === undefined ? old.pic : pic;
            _this42.leftCount = leftCount === undefined ? old.leftCount : leftCount;
            _this42.convertCount = convertCount === undefined ? old.convertCount : convertCount;
        }
        return _this42;
    }

    _createClass(ProductInfo, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.id = bb.readInt();
            this.stCount = bb.readInt();
            this.name = bb.readUtf8();
            this.value = bb.readUtf8();
            this.desc = bb.readUtf8();
            this.progress = bb.readUtf8();
            this.tips = bb.readUtf8();
            this.level = bb.readInt();
            if (!bb.isNil()) {
                this.pic = bb.readUtf8();
            }
            if (!bb.isNil()) {
                this.leftCount = bb.readInt();
            }
            if (!bb.isNil()) {
                this.convertCount = bb.readInt();
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.id);
            bb.writeInt(this.stCount);
            bb.writeUtf8(this.name);
            bb.writeUtf8(this.value);
            bb.writeUtf8(this.desc);
            bb.writeUtf8(this.progress);
            bb.writeUtf8(this.tips);
            bb.writeInt(this.level);
            if (this.pic === undefined || this.pic === null) {
                bb.writeNil();
            } else {
                bb.writeUtf8(this.pic);
            }
            if (this.leftCount === undefined || this.leftCount === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.leftCount);
            }
            if (this.convertCount === undefined || this.convertCount === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.convertCount);
            }
        }
    }]);

    return ProductInfo;
}(struct_mgr_1.Struct);

ProductInfo._$info = new sinfo_1.StructInfo("earn/server/data/db/item.ProductInfo", 600563621, new Map([["primary", "id"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("id", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("stCount", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("value", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("desc", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("progress", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("tips", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("level", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("pic", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Str)), null), new sinfo_1.FieldInfo("leftCount", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null), new sinfo_1.FieldInfo("convertCount", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.ProductInfo = ProductInfo;

var ConvertAwardList = function (_struct_mgr_1$Struct36) {
    _inherits(ConvertAwardList, _struct_mgr_1$Struct36);

    function ConvertAwardList() {
        _classCallCheck(this, ConvertAwardList);

        return _possibleConstructorReturn(this, (ConvertAwardList.__proto__ || Object.getPrototypeOf(ConvertAwardList)).apply(this, arguments));
    }

    _createClass(ConvertAwardList, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this44 = this;

            this.list = bb.readArray(function () {
                return bb.readBonCode(_this44._$EnumTypeMap ? _this44._$EnumTypeMap(_this44.list) : ProductInfo);
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.list, function (el) {
                bb.writeBonCode(el);
            });
        }
    }]);

    return ConvertAwardList;
}(struct_mgr_1.Struct);

ConvertAwardList._$info = new sinfo_1.StructInfo("earn/server/data/db/item.ConvertAwardList", 2490771704, null, [new sinfo_1.FieldInfo("list", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, ProductInfo._$info)), null)]);
exports.ConvertAwardList = ConvertAwardList;

var AddConvert = function (_struct_mgr_1$Struct37) {
    _inherits(AddConvert, _struct_mgr_1$Struct37);

    function AddConvert(typeNum, convert, deadTime, old) {
        _classCallCheck(this, AddConvert);

        var _this45 = _possibleConstructorReturn(this, (AddConvert.__proto__ || Object.getPrototypeOf(AddConvert)).call(this));

        if (!old) {
            _this45.typeNum = typeNum;
            _this45.convert = convert;
            _this45.deadTime = deadTime;
        } else {
            _this45.typeNum = typeNum === undefined ? old.typeNum : typeNum;
            _this45.convert = convert === undefined ? old.convert : convert;
            _this45.deadTime = deadTime === undefined ? old.deadTime : deadTime;
        }
        return _this45;
    }

    _createClass(AddConvert, [{
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
            this.typeNum = bb.readInt();
            this.convert = bb.readUtf8();
            this.deadTime = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.typeNum);
            bb.writeUtf8(this.convert);
            bb.writeUtf8(this.deadTime);
        }
    }]);

    return AddConvert;
}(struct_mgr_1.Struct);

AddConvert._$info = new sinfo_1.StructInfo("earn/server/data/db/item.AddConvert", 732769795, new Map([["constructor", "true"]]), [new sinfo_1.FieldInfo("typeNum", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("convert", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("deadTime", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.AddConvert = AddConvert;

var AddConvertList = function (_struct_mgr_1$Struct38) {
    _inherits(AddConvertList, _struct_mgr_1$Struct38);

    function AddConvertList() {
        _classCallCheck(this, AddConvertList);

        return _possibleConstructorReturn(this, (AddConvertList.__proto__ || Object.getPrototypeOf(AddConvertList)).apply(this, arguments));
    }

    _createClass(AddConvertList, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this47 = this;

            this.list = bb.readArray(function () {
                return bb.readBonCode(_this47._$EnumTypeMap ? _this47._$EnumTypeMap(_this47.list) : AddConvert);
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.list, function (el) {
                bb.writeBonCode(el);
            });
        }
    }]);

    return AddConvertList;
}(struct_mgr_1.Struct);

AddConvertList._$info = new sinfo_1.StructInfo("earn/server/data/db/item.AddConvertList", 141921725, null, [new sinfo_1.FieldInfo("list", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, AddConvert._$info)), null)]);
exports.AddConvertList = AddConvertList;
})