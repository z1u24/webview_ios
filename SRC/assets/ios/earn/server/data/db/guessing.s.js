_$define("earn/server/data/db/guessing.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../../pi/struct/sinfo");

var Competition = function (_struct_mgr_1$Struct) {
    _inherits(Competition, _struct_mgr_1$Struct);

    function Competition(cid, team1, team2, time, matchType, result, state, old) {
        _classCallCheck(this, Competition);

        var _this = _possibleConstructorReturn(this, (Competition.__proto__ || Object.getPrototypeOf(Competition)).call(this));

        if (!old) {
            _this.cid = cid;
            _this.team1 = team1;
            _this.team2 = team2;
            _this.time = time;
            _this.matchType = matchType;
            _this.result = result;
            _this.state = state;
        } else {
            _this.cid = cid === undefined ? old.cid : cid;
            _this.team1 = team1 === undefined ? old.team1 : team1;
            _this.team2 = team2 === undefined ? old.team2 : team2;
            _this.time = time === undefined ? old.time : time;
            _this.matchType = matchType === undefined ? old.matchType : matchType;
            _this.result = result === undefined ? old.result : result;
            _this.state = state === undefined ? old.state : state;
        }
        return _this;
    }

    _createClass(Competition, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.cid = bb.readInt();
            this.team1 = bb.readInt();
            this.team2 = bb.readInt();
            this.time = bb.readUtf8();
            this.matchType = bb.readInt();
            this.result = bb.readInt();
            this.state = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.cid);
            bb.writeInt(this.team1);
            bb.writeInt(this.team2);
            bb.writeUtf8(this.time);
            bb.writeInt(this.matchType);
            bb.writeInt(this.result);
            bb.writeInt(this.state);
        }
    }]);

    return Competition;
}(struct_mgr_1.Struct);

Competition._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.Competition", 1745006612, new Map([["primary", "cid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("cid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("team1", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("team2", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("time", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("matchType", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("result", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("state", new sinfo_1.EnumType(sinfo_1.Type.U8), null)]);
exports.Competition = Competition;

var PreCompetitionList = function (_struct_mgr_1$Struct2) {
    _inherits(PreCompetitionList, _struct_mgr_1$Struct2);

    function PreCompetitionList(compType, list, old) {
        _classCallCheck(this, PreCompetitionList);

        var _this2 = _possibleConstructorReturn(this, (PreCompetitionList.__proto__ || Object.getPrototypeOf(PreCompetitionList)).call(this));

        if (!old) {
            _this2.compType = compType;
            _this2.list = list;
        } else {
            _this2.compType = compType === undefined ? old.compType : compType;
            _this2.list = list === undefined ? old.list : list;
        }
        return _this2;
    }

    _createClass(PreCompetitionList, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.compType = bb.readInt();
            if (!bb.isNil()) {
                this.list = bb.readArray(function () {
                    return bb.readInt();
                });
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.compType);
            if (this.list === undefined || this.list === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.list, function (el) {
                    bb.writeInt(el);
                });
            }
        }
    }]);

    return PreCompetitionList;
}(struct_mgr_1.Struct);

PreCompetitionList._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.PreCompetitionList", 258886112, new Map([["primary", "compType"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("compType", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("list", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.U32))), null)]);
exports.PreCompetitionList = PreCompetitionList;

var CompetitionList = function (_struct_mgr_1$Struct3) {
    _inherits(CompetitionList, _struct_mgr_1$Struct3);

    function CompetitionList() {
        _classCallCheck(this, CompetitionList);

        return _possibleConstructorReturn(this, (CompetitionList.__proto__ || Object.getPrototypeOf(CompetitionList)).apply(this, arguments));
    }

    _createClass(CompetitionList, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this4 = this;

            if (!bb.isNil()) {
                this.list = bb.readArray(function () {
                    return bb.readBonCode(_this4._$EnumTypeMap ? _this4._$EnumTypeMap(_this4.list) : Competition);
                });
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            if (this.list === undefined || this.list === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.list, function (el) {
                    bb.writeBonCode(el);
                });
            }
        }
    }]);

    return CompetitionList;
}(struct_mgr_1.Struct);

CompetitionList._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.CompetitionList", 3414148675, null, [new sinfo_1.FieldInfo("list", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, Competition._$info))), null)]);
exports.CompetitionList = CompetitionList;

var MainPageComp = function (_struct_mgr_1$Struct4) {
    _inherits(MainPageComp, _struct_mgr_1$Struct4);

    function MainPageComp() {
        _classCallCheck(this, MainPageComp);

        return _possibleConstructorReturn(this, (MainPageComp.__proto__ || Object.getPrototypeOf(MainPageComp)).apply(this, arguments));
    }

    _createClass(MainPageComp, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.comp = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.comp) : Competition);
            if (!bb.isNil()) {
                this.team1num = bb.readInt();
            }
            if (!bb.isNil()) {
                this.team2num = bb.readInt();
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeBonCode(this.comp);
            if (this.team1num === undefined || this.team1num === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.team1num);
            }
            if (this.team2num === undefined || this.team2num === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.team2num);
            }
        }
    }]);

    return MainPageComp;
}(struct_mgr_1.Struct);

MainPageComp._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.MainPageComp", 849609373, null, [new sinfo_1.FieldInfo("comp", new sinfo_1.EnumType(sinfo_1.Type.Struct, Competition._$info), null), new sinfo_1.FieldInfo("team1num", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null), new sinfo_1.FieldInfo("team2num", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.MainPageComp = MainPageComp;

var MainPageCompList = function (_struct_mgr_1$Struct5) {
    _inherits(MainPageCompList, _struct_mgr_1$Struct5);

    function MainPageCompList() {
        _classCallCheck(this, MainPageCompList);

        return _possibleConstructorReturn(this, (MainPageCompList.__proto__ || Object.getPrototypeOf(MainPageCompList)).apply(this, arguments));
    }

    _createClass(MainPageCompList, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this7 = this;

            if (!bb.isNil()) {
                this.list = bb.readArray(function () {
                    return bb.readBonCode(_this7._$EnumTypeMap ? _this7._$EnumTypeMap(_this7.list) : MainPageComp);
                });
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            if (this.list === undefined || this.list === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.list, function (el) {
                    bb.writeBonCode(el);
                });
            }
        }
    }]);

    return MainPageCompList;
}(struct_mgr_1.Struct);

MainPageCompList._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.MainPageCompList", 567200329, null, [new sinfo_1.FieldInfo("list", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, MainPageComp._$info))), null)]);
exports.MainPageCompList = MainPageCompList;

var GuessingKey = function (_struct_mgr_1$Struct6) {
    _inherits(GuessingKey, _struct_mgr_1$Struct6);

    function GuessingKey() {
        _classCallCheck(this, GuessingKey);

        return _possibleConstructorReturn(this, (GuessingKey.__proto__ || Object.getPrototypeOf(GuessingKey)).apply(this, arguments));
    }

    _createClass(GuessingKey, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.uid = bb.readInt();
            this.cid = bb.readInt();
            if (!bb.isNil()) {
                this.index = bb.readInt();
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            bb.writeInt(this.cid);
            if (this.index === undefined || this.index === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.index);
            }
        }
    }]);

    return GuessingKey;
}(struct_mgr_1.Struct);

GuessingKey._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.GuessingKey", 3558803387, null, [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("cid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("index", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null)]);
exports.GuessingKey = GuessingKey;

var Guessing = function (_struct_mgr_1$Struct7) {
    _inherits(Guessing, _struct_mgr_1$Struct7);

    function Guessing(gid, teamSide, rate, num, benefit, time, old) {
        _classCallCheck(this, Guessing);

        var _this9 = _possibleConstructorReturn(this, (Guessing.__proto__ || Object.getPrototypeOf(Guessing)).call(this));

        if (!old) {
            _this9.gid = gid;
            _this9.teamSide = teamSide;
            _this9.rate = rate;
            _this9.num = num;
            _this9.benefit = benefit;
            _this9.time = time;
        } else {
            _this9.gid = gid === undefined ? old.gid : gid;
            _this9.teamSide = teamSide === undefined ? old.teamSide : teamSide;
            _this9.rate = rate === undefined ? old.rate : rate;
            _this9.num = num === undefined ? old.num : num;
            _this9.benefit = benefit === undefined ? old.benefit : benefit;
            _this9.time = time === undefined ? old.time : time;
        }
        return _this9;
    }

    _createClass(Guessing, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.gid = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.gid) : GuessingKey);
            this.teamSide = bb.readInt();
            if (!bb.isNil()) {
                this.rate = bb.readf();
            }
            this.num = bb.readInt();
            if (!bb.isNil()) {
                this.benefit = bb.readInt();
            }
            this.time = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeBonCode(this.gid);
            bb.writeInt(this.teamSide);
            if (this.rate === undefined || this.rate === null) {
                bb.writeNil();
            } else {
                bb.writeF32(this.rate);
            }
            bb.writeInt(this.num);
            if (this.benefit === undefined || this.benefit === null) {
                bb.writeNil();
            } else {
                bb.writeInt(this.benefit);
            }
            bb.writeUtf8(this.time);
        }
    }]);

    return Guessing;
}(struct_mgr_1.Struct);

Guessing._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.Guessing", 814543141, new Map([["primary", "gid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("gid", new sinfo_1.EnumType(sinfo_1.Type.Struct, GuessingKey._$info), null), new sinfo_1.FieldInfo("teamSide", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("rate", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.F32)), null), new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("benefit", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.U32)), null), new sinfo_1.FieldInfo("time", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.Guessing = Guessing;

var GuessingOrder = function (_struct_mgr_1$Struct8) {
    _inherits(GuessingOrder, _struct_mgr_1$Struct8);

    function GuessingOrder(oid, gid, state, old) {
        _classCallCheck(this, GuessingOrder);

        var _this10 = _possibleConstructorReturn(this, (GuessingOrder.__proto__ || Object.getPrototypeOf(GuessingOrder)).call(this));

        if (!old) {
            _this10.oid = oid;
            _this10.gid = gid;
            _this10.state = state;
        } else {
            _this10.oid = oid === undefined ? old.oid : oid;
            _this10.gid = gid === undefined ? old.gid : gid;
            _this10.state = state === undefined ? old.state : state;
        }
        return _this10;
    }

    _createClass(GuessingOrder, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.oid = bb.readUtf8();
            this.gid = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.gid) : GuessingKey);
            this.state = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.oid);
            bb.writeBonCode(this.gid);
            bb.writeInt(this.state);
        }
    }]);

    return GuessingOrder;
}(struct_mgr_1.Struct);

GuessingOrder._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.GuessingOrder", 2685179360, new Map([["primary", "oid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("oid", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("gid", new sinfo_1.EnumType(sinfo_1.Type.Struct, GuessingKey._$info), null), new sinfo_1.FieldInfo("state", new sinfo_1.EnumType(sinfo_1.Type.U8), null)]);
exports.GuessingOrder = GuessingOrder;

var CompJackpots = function (_struct_mgr_1$Struct9) {
    _inherits(CompJackpots, _struct_mgr_1$Struct9);

    function CompJackpots(cid, jackpot1, jackpot2, guessings1, guessings2, old) {
        _classCallCheck(this, CompJackpots);

        var _this11 = _possibleConstructorReturn(this, (CompJackpots.__proto__ || Object.getPrototypeOf(CompJackpots)).call(this));

        if (!old) {
            _this11.cid = cid;
            _this11.jackpot1 = jackpot1;
            _this11.jackpot2 = jackpot2;
            _this11.guessings1 = guessings1;
            _this11.guessings2 = guessings2;
        } else {
            _this11.cid = cid === undefined ? old.cid : cid;
            _this11.jackpot1 = jackpot1 === undefined ? old.jackpot1 : jackpot1;
            _this11.jackpot2 = jackpot2 === undefined ? old.jackpot2 : jackpot2;
            _this11.guessings1 = guessings1 === undefined ? old.guessings1 : guessings1;
            _this11.guessings2 = guessings2 === undefined ? old.guessings2 : guessings2;
        }
        return _this11;
    }

    _createClass(CompJackpots, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this12 = this;

            this.cid = bb.readInt();
            this.jackpot1 = bb.readInt();
            this.jackpot2 = bb.readInt();
            if (!bb.isNil()) {
                this.guessings1 = bb.readArray(function () {
                    return bb.readBonCode(_this12._$EnumTypeMap ? _this12._$EnumTypeMap(_this12.guessings1) : GuessingKey);
                });
            }
            if (!bb.isNil()) {
                this.guessings2 = bb.readArray(function () {
                    return bb.readBonCode(_this12._$EnumTypeMap ? _this12._$EnumTypeMap(_this12.guessings2) : GuessingKey);
                });
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.cid);
            bb.writeInt(this.jackpot1);
            bb.writeInt(this.jackpot2);
            if (this.guessings1 === undefined || this.guessings1 === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.guessings1, function (el) {
                    bb.writeBonCode(el);
                });
            }
            if (this.guessings2 === undefined || this.guessings2 === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.guessings2, function (el) {
                    bb.writeBonCode(el);
                });
            }
        }
    }]);

    return CompJackpots;
}(struct_mgr_1.Struct);

CompJackpots._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.CompJackpots", 3470189388, new Map([["primary", "cid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("cid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("jackpot1", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("jackpot2", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("guessings1", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, GuessingKey._$info))), null), new sinfo_1.FieldInfo("guessings2", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, GuessingKey._$info))), null)]);
exports.CompJackpots = CompJackpots;

var GuessingKeyList = function (_struct_mgr_1$Struct10) {
    _inherits(GuessingKeyList, _struct_mgr_1$Struct10);

    function GuessingKeyList(uid, list, old) {
        _classCallCheck(this, GuessingKeyList);

        var _this13 = _possibleConstructorReturn(this, (GuessingKeyList.__proto__ || Object.getPrototypeOf(GuessingKeyList)).call(this));

        if (!old) {
            _this13.uid = uid;
            _this13.list = list;
        } else {
            _this13.uid = uid === undefined ? old.uid : uid;
            _this13.list = list === undefined ? old.list : list;
        }
        return _this13;
    }

    _createClass(GuessingKeyList, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this14 = this;

            this.uid = bb.readInt();
            if (!bb.isNil()) {
                this.list = bb.readArray(function () {
                    return bb.readBonCode(_this14._$EnumTypeMap ? _this14._$EnumTypeMap(_this14.list) : GuessingKey);
                });
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.uid);
            if (this.list === undefined || this.list === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.list, function (el) {
                    bb.writeBonCode(el);
                });
            }
        }
    }]);

    return GuessingKeyList;
}(struct_mgr_1.Struct);

GuessingKeyList._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.GuessingKeyList", 1977831723, new Map([["primary", "uid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("uid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("list", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, GuessingKey._$info))), null)]);
exports.GuessingKeyList = GuessingKeyList;

var UserGuessingInfo = function (_struct_mgr_1$Struct11) {
    _inherits(UserGuessingInfo, _struct_mgr_1$Struct11);

    function UserGuessingInfo(competition, team1num, team2num, guessing, old) {
        _classCallCheck(this, UserGuessingInfo);

        var _this15 = _possibleConstructorReturn(this, (UserGuessingInfo.__proto__ || Object.getPrototypeOf(UserGuessingInfo)).call(this));

        if (!old) {
            _this15.competition = competition;
            _this15.team1num = team1num;
            _this15.team2num = team2num;
            _this15.guessing = guessing;
        } else {
            _this15.competition = competition === undefined ? old.competition : competition;
            _this15.team1num = team1num === undefined ? old.team1num : team1num;
            _this15.team2num = team2num === undefined ? old.team2num : team2num;
            _this15.guessing = guessing === undefined ? old.guessing : guessing;
        }
        return _this15;
    }

    _createClass(UserGuessingInfo, [{
        key: "addMeta",
        value: function addMeta(mgr) {
            if (this._$meta) return;
            this.competition && this.competition.addMeta(mgr);
            this.guessing && this.guessing.addMeta(mgr);
            struct_mgr_1.addToMeta(mgr, this);
        }
    }, {
        key: "removeMeta",
        value: function removeMeta() {
            struct_mgr_1.removeFromMeta(this);
            this.competition && this.competition.removeMeta();
            this.guessing && this.guessing.removeMeta();
        }
    }, {
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.competition = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.competition) : Competition);
            this.team1num = bb.readInt();
            this.team2num = bb.readInt();
            this.guessing = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.guessing) : Guessing);
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeBonCode(this.competition);
            bb.writeInt(this.team1num);
            bb.writeInt(this.team2num);
            bb.writeBonCode(this.guessing);
        }
    }]);

    return UserGuessingInfo;
}(struct_mgr_1.Struct);

UserGuessingInfo._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.UserGuessingInfo", 2139570087, new Map([["constructor", "true"]]), [new sinfo_1.FieldInfo("competition", new sinfo_1.EnumType(sinfo_1.Type.Struct, Competition._$info), null), new sinfo_1.FieldInfo("team1num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("team2num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("guessing", new sinfo_1.EnumType(sinfo_1.Type.Struct, Guessing._$info), null)]);
exports.UserGuessingInfo = UserGuessingInfo;

var UserGuessingList = function (_struct_mgr_1$Struct12) {
    _inherits(UserGuessingList, _struct_mgr_1$Struct12);

    function UserGuessingList() {
        _classCallCheck(this, UserGuessingList);

        return _possibleConstructorReturn(this, (UserGuessingList.__proto__ || Object.getPrototypeOf(UserGuessingList)).apply(this, arguments));
    }

    _createClass(UserGuessingList, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            var _this17 = this;

            if (!bb.isNil()) {
                this.list = bb.readArray(function () {
                    return bb.readBonCode(_this17._$EnumTypeMap ? _this17._$EnumTypeMap(_this17.list) : UserGuessingInfo);
                });
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            if (this.list === undefined || this.list === null) {
                bb.writeNil();
            } else {
                bb.writeArray(this.list, function (el) {
                    bb.writeBonCode(el);
                });
            }
        }
    }]);

    return UserGuessingList;
}(struct_mgr_1.Struct);

UserGuessingList._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.UserGuessingList", 1866589498, null, [new sinfo_1.FieldInfo("list", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Struct, UserGuessingInfo._$info))), null)]);
exports.UserGuessingList = UserGuessingList;

var UserGuessing = function (_struct_mgr_1$Struct13) {
    _inherits(UserGuessing, _struct_mgr_1$Struct13);

    function UserGuessing(gid, total, old) {
        _classCallCheck(this, UserGuessing);

        var _this18 = _possibleConstructorReturn(this, (UserGuessing.__proto__ || Object.getPrototypeOf(UserGuessing)).call(this));

        if (!old) {
            _this18.gid = gid;
            _this18.total = total;
        } else {
            _this18.gid = gid === undefined ? old.gid : gid;
            _this18.total = total === undefined ? old.total : total;
        }
        return _this18;
    }

    _createClass(UserGuessing, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.gid = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.gid) : GuessingKey);
            this.total = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeBonCode(this.gid);
            bb.writeInt(this.total);
        }
    }]);

    return UserGuessing;
}(struct_mgr_1.Struct);

UserGuessing._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.UserGuessing", 1346744038, new Map([["primary", "gid"], ["db", "file"], ["dbMonitor", "true"], ["hasmgr", "false"], ["constructor", "true"]]), [new sinfo_1.FieldInfo("gid", new sinfo_1.EnumType(sinfo_1.Type.Struct, GuessingKey._$info), null), new sinfo_1.FieldInfo("total", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.UserGuessing = UserGuessing;

var GuessingReq = function (_struct_mgr_1$Struct14) {
    _inherits(GuessingReq, _struct_mgr_1$Struct14);

    function GuessingReq() {
        _classCallCheck(this, GuessingReq);

        return _possibleConstructorReturn(this, (GuessingReq.__proto__ || Object.getPrototypeOf(GuessingReq)).apply(this, arguments));
    }

    _createClass(GuessingReq, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.cid = bb.readInt();
            this.teamSide = bb.readInt();
            this.num = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.cid);
            bb.writeInt(this.teamSide);
            bb.writeInt(this.num);
        }
    }]);

    return GuessingReq;
}(struct_mgr_1.Struct);

GuessingReq._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.GuessingReq", 1916906907, null, [new sinfo_1.FieldInfo("cid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("teamSide", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("num", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.GuessingReq = GuessingReq;

var AddCompetition = function (_struct_mgr_1$Struct15) {
    _inherits(AddCompetition, _struct_mgr_1$Struct15);

    function AddCompetition(team1, team2, time, matchType, team1num, team2num, old) {
        _classCallCheck(this, AddCompetition);

        var _this20 = _possibleConstructorReturn(this, (AddCompetition.__proto__ || Object.getPrototypeOf(AddCompetition)).call(this));

        if (!old) {
            _this20.team1 = team1;
            _this20.team2 = team2;
            _this20.time = time;
            _this20.matchType = matchType;
            _this20.team1num = team1num;
            _this20.team2num = team2num;
        } else {
            _this20.team1 = team1 === undefined ? old.team1 : team1;
            _this20.team2 = team2 === undefined ? old.team2 : team2;
            _this20.time = time === undefined ? old.time : time;
            _this20.matchType = matchType === undefined ? old.matchType : matchType;
            _this20.team1num = team1num === undefined ? old.team1num : team1num;
            _this20.team2num = team2num === undefined ? old.team2num : team2num;
        }
        return _this20;
    }

    _createClass(AddCompetition, [{
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
            this.team1 = bb.readInt();
            this.team2 = bb.readInt();
            this.time = bb.readUtf8();
            this.matchType = bb.readInt();
            this.team1num = bb.readInt();
            this.team2num = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.team1);
            bb.writeInt(this.team2);
            bb.writeUtf8(this.time);
            bb.writeInt(this.matchType);
            bb.writeInt(this.team1num);
            bb.writeInt(this.team2num);
        }
    }]);

    return AddCompetition;
}(struct_mgr_1.Struct);

AddCompetition._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.AddCompetition", 3774551731, new Map([["constructor", "true"]]), [new sinfo_1.FieldInfo("team1", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("team2", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("time", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("matchType", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("team1num", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("team2num", new sinfo_1.EnumType(sinfo_1.Type.U32), null)]);
exports.AddCompetition = AddCompetition;

var CompResult = function (_struct_mgr_1$Struct16) {
    _inherits(CompResult, _struct_mgr_1$Struct16);

    function CompResult(cid, result, old) {
        _classCallCheck(this, CompResult);

        var _this21 = _possibleConstructorReturn(this, (CompResult.__proto__ || Object.getPrototypeOf(CompResult)).call(this));

        if (!old) {
            _this21.cid = cid;
            _this21.result = result;
        } else {
            _this21.cid = cid === undefined ? old.cid : cid;
            _this21.result = result === undefined ? old.result : result;
        }
        return _this21;
    }

    _createClass(CompResult, [{
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
            this.cid = bb.readInt();
            this.result = bb.readInt();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.cid);
            bb.writeInt(this.result);
        }
    }]);

    return CompResult;
}(struct_mgr_1.Struct);

CompResult._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.CompResult", 946702468, new Map([["constructor", "true"]]), [new sinfo_1.FieldInfo("cid", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("result", new sinfo_1.EnumType(sinfo_1.Type.U8), null)]);
exports.CompResult = CompResult;

var Result = function (_struct_mgr_1$Struct17) {
    _inherits(Result, _struct_mgr_1$Struct17);

    function Result() {
        _classCallCheck(this, Result);

        return _possibleConstructorReturn(this, (Result.__proto__ || Object.getPrototypeOf(Result)).apply(this, arguments));
    }

    _createClass(Result, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.reslutCode = bb.readInt();
            if (!bb.isNil()) {
                this.msg = bb.readUtf8();
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.reslutCode);
            if (this.msg === undefined || this.msg === null) {
                bb.writeNil();
            } else {
                bb.writeUtf8(this.msg);
            }
        }
    }]);

    return Result;
}(struct_mgr_1.Struct);

Result._$info = new sinfo_1.StructInfo("earn/server/data/db/guessing.Result", 2231518801, null, [new sinfo_1.FieldInfo("reslutCode", new sinfo_1.EnumType(sinfo_1.Type.U32), null), new sinfo_1.FieldInfo("msg", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Str)), null)]);
exports.Result = Result;
})