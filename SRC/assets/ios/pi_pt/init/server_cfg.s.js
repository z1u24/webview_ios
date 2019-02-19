_$define("pi_pt/init/server_cfg.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../pi/struct/struct_mgr");
var sinfo_1 = require("../../pi/struct/sinfo");

var Server = function (_struct_mgr_1$Struct) {
    _inherits(Server, _struct_mgr_1$Struct);

    function Server(name, nobjs, old) {
        _classCallCheck(this, Server);

        var _this = _possibleConstructorReturn(this, (Server.__proto__ || Object.getPrototypeOf(Server)).call(this));

        if (!old) {
            _this.name = name;
            _this.nobjs = nobjs;
        } else {
            _this.name = name === undefined ? old.name : name;
            _this.nobjs = nobjs === undefined ? old.nobjs : nobjs;
        }
        return _this;
    }

    _createClass(Server, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.name = bb.readUtf8();
            this.nobjs = bb.readArray(function () {
                return bb.readUtf8();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.name);
            bb.writeArray(this.nobjs, function (el) {
                bb.writeUtf8(el);
            });
        }
    }]);

    return Server;
}(struct_mgr_1.Struct);

Server._$info = new sinfo_1.StructInfo("pi_pt/init/server_cfg.Server", 2738949988, new Map([["constructor", "true"], ["hasmgr", "false"], ["primary", "name"], ["db", "memory"]]), [new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("nobjs", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str)), null)]);
exports.Server = Server;

var AsyncCfg = function (_struct_mgr_1$Struct2) {
    _inherits(AsyncCfg, _struct_mgr_1$Struct2);

    function AsyncCfg(nobjs, old) {
        _classCallCheck(this, AsyncCfg);

        var _this2 = _possibleConstructorReturn(this, (AsyncCfg.__proto__ || Object.getPrototypeOf(AsyncCfg)).call(this));

        if (!old) {
            _this2.nobjs = nobjs;
        } else {
            _this2.nobjs = nobjs === undefined ? old.nobjs : nobjs;
        }
        return _this2;
    }

    _createClass(AsyncCfg, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.nobjs = bb.readArray(function () {
                return bb.readUtf8();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeArray(this.nobjs, function (el) {
                bb.writeUtf8(el);
            });
        }
    }]);

    return AsyncCfg;
}(struct_mgr_1.Struct);

AsyncCfg._$info = new sinfo_1.StructInfo("pi_pt/init/server_cfg.AsyncCfg", 477142005, new Map([["constructor", "true"], ["hasmgr", "false"], ["db", "memory"]]), [new sinfo_1.FieldInfo("nobjs", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str)), null)]);
exports.AsyncCfg = AsyncCfg;

var RawNetMgr = function (_struct_mgr_1$Struct3) {
    _inherits(RawNetMgr, _struct_mgr_1$Struct3);

    function RawNetMgr(name, nobjs, old) {
        _classCallCheck(this, RawNetMgr);

        var _this3 = _possibleConstructorReturn(this, (RawNetMgr.__proto__ || Object.getPrototypeOf(RawNetMgr)).call(this));

        if (!old) {
            _this3.name = name;
            _this3.nobjs = nobjs;
        } else {
            _this3.name = name === undefined ? old.name : name;
            _this3.nobjs = nobjs === undefined ? old.nobjs : nobjs;
        }
        return _this3;
    }

    _createClass(RawNetMgr, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.name = bb.readUtf8();
            this.nobjs = bb.readArray(function () {
                return bb.readUtf8();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.name);
            bb.writeArray(this.nobjs, function (el) {
                bb.writeUtf8(el);
            });
        }
    }]);

    return RawNetMgr;
}(struct_mgr_1.Struct);

RawNetMgr._$info = new sinfo_1.StructInfo("pi_pt/init/server_cfg.RawNetMgr", 4281216668, new Map([["constructor", "true"], ["hasmgr", "false"], ["primary", "name"], ["db", "memory"]]), [new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("nobjs", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str)), null)]);
exports.RawNetMgr = RawNetMgr;

var RawNetCfg = function (_struct_mgr_1$Struct4) {
    _inherits(RawNetCfg, _struct_mgr_1$Struct4);

    function RawNetCfg(addr, protocol, connectEvent, netMgr, nobjs, old) {
        _classCallCheck(this, RawNetCfg);

        var _this4 = _possibleConstructorReturn(this, (RawNetCfg.__proto__ || Object.getPrototypeOf(RawNetCfg)).call(this));

        if (!old) {
            _this4.addr = addr;
            _this4.protocol = protocol;
            _this4.connectEvent = connectEvent;
            _this4.netMgr = netMgr;
            _this4.nobjs = nobjs;
        } else {
            _this4.addr = addr === undefined ? old.addr : addr;
            _this4.protocol = protocol === undefined ? old.protocol : protocol;
            _this4.connectEvent = connectEvent === undefined ? old.connectEvent : connectEvent;
            _this4.netMgr = netMgr === undefined ? old.netMgr : netMgr;
            _this4.nobjs = nobjs === undefined ? old.nobjs : nobjs;
        }
        return _this4;
    }

    _createClass(RawNetCfg, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.addr = bb.readUtf8();
            this.protocol = bb.readUtf8();
            this.connectEvent = bb.readBool();
            this.netMgr = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.netMgr) : RawNetMgr);
            this.nobjs = bb.readArray(function () {
                return bb.readUtf8();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.addr);
            bb.writeUtf8(this.protocol);
            bb.writeBool(this.connectEvent);
            bb.writeBonCode(this.netMgr);
            bb.writeArray(this.nobjs, function (el) {
                bb.writeUtf8(el);
            });
        }
    }]);

    return RawNetCfg;
}(struct_mgr_1.Struct);

RawNetCfg._$info = new sinfo_1.StructInfo("pi_pt/init/server_cfg.RawNetCfg", 2237254822, new Map([["constructor", "true"], ["hasmgr", "false"], ["db", "memory"]]), [new sinfo_1.FieldInfo("addr", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("protocol", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("connectEvent", new sinfo_1.EnumType(sinfo_1.Type.Bool), null), new sinfo_1.FieldInfo("netMgr", new sinfo_1.EnumType(sinfo_1.Type.Struct, RawNetMgr._$info), null), new sinfo_1.FieldInfo("nobjs", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str)), null)]);
exports.RawNetCfg = RawNetCfg;

var TlsNetMgr = function (_struct_mgr_1$Struct5) {
    _inherits(TlsNetMgr, _struct_mgr_1$Struct5);

    function TlsNetMgr(name, recvBuffSize, nobjs, old) {
        _classCallCheck(this, TlsNetMgr);

        var _this5 = _possibleConstructorReturn(this, (TlsNetMgr.__proto__ || Object.getPrototypeOf(TlsNetMgr)).call(this));

        if (!old) {
            _this5.name = name;
            _this5.recvBuffSize = recvBuffSize;
            _this5.nobjs = nobjs;
        } else {
            _this5.name = name === undefined ? old.name : name;
            _this5.recvBuffSize = recvBuffSize === undefined ? old.recvBuffSize : recvBuffSize;
            _this5.nobjs = nobjs === undefined ? old.nobjs : nobjs;
        }
        return _this5;
    }

    _createClass(TlsNetMgr, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.name = bb.readUtf8();
            this.recvBuffSize = bb.readInt();
            this.nobjs = bb.readArray(function () {
                return bb.readUtf8();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.name);
            bb.writeInt(this.recvBuffSize);
            bb.writeArray(this.nobjs, function (el) {
                bb.writeUtf8(el);
            });
        }
    }]);

    return TlsNetMgr;
}(struct_mgr_1.Struct);

TlsNetMgr._$info = new sinfo_1.StructInfo("pi_pt/init/server_cfg.TlsNetMgr", 4120026155, new Map([["constructor", "true"], ["hasmgr", "false"], ["primary", "name"], ["db", "memory"]]), [new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("recvBuffSize", new sinfo_1.EnumType(sinfo_1.Type.Usize), null), new sinfo_1.FieldInfo("nobjs", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str)), null)]);
exports.TlsNetMgr = TlsNetMgr;

var TlsNetCfg = function (_struct_mgr_1$Struct6) {
    _inherits(TlsNetCfg, _struct_mgr_1$Struct6);

    function TlsNetCfg(addr, protocol, certPath, keyPath, connectEvent, netMgr, nobjs, old) {
        _classCallCheck(this, TlsNetCfg);

        var _this6 = _possibleConstructorReturn(this, (TlsNetCfg.__proto__ || Object.getPrototypeOf(TlsNetCfg)).call(this));

        if (!old) {
            _this6.addr = addr;
            _this6.protocol = protocol;
            _this6.certPath = certPath;
            _this6.keyPath = keyPath;
            _this6.connectEvent = connectEvent;
            _this6.netMgr = netMgr;
            _this6.nobjs = nobjs;
        } else {
            _this6.addr = addr === undefined ? old.addr : addr;
            _this6.protocol = protocol === undefined ? old.protocol : protocol;
            _this6.certPath = certPath === undefined ? old.certPath : certPath;
            _this6.keyPath = keyPath === undefined ? old.keyPath : keyPath;
            _this6.connectEvent = connectEvent === undefined ? old.connectEvent : connectEvent;
            _this6.netMgr = netMgr === undefined ? old.netMgr : netMgr;
            _this6.nobjs = nobjs === undefined ? old.nobjs : nobjs;
        }
        return _this6;
    }

    _createClass(TlsNetCfg, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.addr = bb.readUtf8();
            this.protocol = bb.readUtf8();
            this.certPath = bb.readUtf8();
            this.keyPath = bb.readUtf8();
            this.connectEvent = bb.readBool();
            this.netMgr = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.netMgr) : TlsNetMgr);
            this.nobjs = bb.readArray(function () {
                return bb.readUtf8();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.addr);
            bb.writeUtf8(this.protocol);
            bb.writeUtf8(this.certPath);
            bb.writeUtf8(this.keyPath);
            bb.writeBool(this.connectEvent);
            bb.writeBonCode(this.netMgr);
            bb.writeArray(this.nobjs, function (el) {
                bb.writeUtf8(el);
            });
        }
    }]);

    return TlsNetCfg;
}(struct_mgr_1.Struct);

TlsNetCfg._$info = new sinfo_1.StructInfo("pi_pt/init/server_cfg.TlsNetCfg", 1731680444, new Map([["constructor", "true"], ["hasmgr", "false"], ["db", "memory"]]), [new sinfo_1.FieldInfo("addr", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("protocol", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("certPath", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("keyPath", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("connectEvent", new sinfo_1.EnumType(sinfo_1.Type.Bool), null), new sinfo_1.FieldInfo("netMgr", new sinfo_1.EnumType(sinfo_1.Type.Struct, TlsNetMgr._$info), null), new sinfo_1.FieldInfo("nobjs", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str)), null)]);
exports.TlsNetCfg = TlsNetCfg;
var NetCfg_Enum;
(function (NetCfg_Enum) {
    NetCfg_Enum[NetCfg_Enum["Raw"] = 1] = "Raw";
    NetCfg_Enum[NetCfg_Enum["Tls"] = 2] = "Tls";
})(NetCfg_Enum = exports.NetCfg_Enum || (exports.NetCfg_Enum = {}));

var NetCfg = function (_struct_mgr_1$Struct7) {
    _inherits(NetCfg, _struct_mgr_1$Struct7);

    function NetCfg(type, value) {
        _classCallCheck(this, NetCfg);

        var _this7 = _possibleConstructorReturn(this, (NetCfg.__proto__ || Object.getPrototypeOf(NetCfg)).call(this));

        _this7.enum_type = type;
        _this7.value = value;
        return _this7;
    }

    _createClass(NetCfg, [{
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
                    this.value = bb.readBonCode(RawNetCfg);
                    break;
                case 2:
                    this.value = bb.readBonCode(TlsNetCfg);
                    break;
                default:
                    throw new Error("bonDecode type error, A is not exist index:" + t);
            }
        }
    }]);

    return NetCfg;
}(struct_mgr_1.Struct);

NetCfg._$info = new sinfo_1.EnumInfo('pi_pt/init/server_cfg.NetCfg', 215588187, new Map([["constructor", "true"], ["hasmgr", "false"], ["db", "memory"]]), [new sinfo_1.EnumType(sinfo_1.Type.Struct, RawNetCfg._$info), new sinfo_1.EnumType(sinfo_1.Type.Struct, TlsNetCfg._$info)]);
exports.NetCfg = NetCfg;

var MqttCfg = function (_struct_mgr_1$Struct8) {
    _inherits(MqttCfg, _struct_mgr_1$Struct8);

    function MqttCfg(net, send_buf_size, recv_timeout, name, nobjs, old) {
        _classCallCheck(this, MqttCfg);

        var _this8 = _possibleConstructorReturn(this, (MqttCfg.__proto__ || Object.getPrototypeOf(MqttCfg)).call(this));

        if (!old) {
            _this8.net = net;
            _this8.send_buf_size = send_buf_size;
            _this8.recv_timeout = recv_timeout;
            _this8.name = name;
            _this8.nobjs = nobjs;
        } else {
            _this8.net = net === undefined ? old.net : net;
            _this8.send_buf_size = send_buf_size === undefined ? old.send_buf_size : send_buf_size;
            _this8.recv_timeout = recv_timeout === undefined ? old.recv_timeout : recv_timeout;
            _this8.name = name === undefined ? old.name : name;
            _this8.nobjs = nobjs === undefined ? old.nobjs : nobjs;
        }
        return _this8;
    }

    _createClass(MqttCfg, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.net = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.net) : NetCfg);
            this.send_buf_size = bb.readInt();
            this.recv_timeout = bb.readInt();
            this.name = bb.readUtf8();
            this.nobjs = bb.readArray(function () {
                return bb.readUtf8();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeBonCode(this.net);
            bb.writeInt(this.send_buf_size);
            bb.writeInt(this.recv_timeout);
            bb.writeUtf8(this.name);
            bb.writeArray(this.nobjs, function (el) {
                bb.writeUtf8(el);
            });
        }
    }]);

    return MqttCfg;
}(struct_mgr_1.Struct);

MqttCfg._$info = new sinfo_1.StructInfo("pi_pt/init/server_cfg.MqttCfg", 1659901787, new Map([["constructor", "true"], ["hasmgr", "false"], ["primary", "name"], ["db", "memory"]]), [new sinfo_1.FieldInfo("net", new sinfo_1.EnumType(sinfo_1.Type.Enum, NetCfg._$info), null), new sinfo_1.FieldInfo("send_buf_size", new sinfo_1.EnumType(sinfo_1.Type.Usize), null), new sinfo_1.FieldInfo("recv_timeout", new sinfo_1.EnumType(sinfo_1.Type.Usize), null), new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("nobjs", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str)), null)]);
exports.MqttCfg = MqttCfg;

var RpcCfg = function (_struct_mgr_1$Struct9) {
    _inherits(RpcCfg, _struct_mgr_1$Struct9);

    function RpcCfg(mqtt, name, nobjs, old) {
        _classCallCheck(this, RpcCfg);

        var _this9 = _possibleConstructorReturn(this, (RpcCfg.__proto__ || Object.getPrototypeOf(RpcCfg)).call(this));

        if (!old) {
            _this9.mqtt = mqtt;
            _this9.name = name;
            _this9.nobjs = nobjs;
        } else {
            _this9.mqtt = mqtt === undefined ? old.mqtt : mqtt;
            _this9.name = name === undefined ? old.name : name;
            _this9.nobjs = nobjs === undefined ? old.nobjs : nobjs;
        }
        return _this9;
    }

    _createClass(RpcCfg, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.mqtt = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.mqtt) : MqttCfg);
            this.name = bb.readUtf8();
            this.nobjs = bb.readArray(function () {
                return bb.readUtf8();
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeBonCode(this.mqtt);
            bb.writeUtf8(this.name);
            bb.writeArray(this.nobjs, function (el) {
                bb.writeUtf8(el);
            });
        }
    }]);

    return RpcCfg;
}(struct_mgr_1.Struct);

RpcCfg._$info = new sinfo_1.StructInfo("pi_pt/init/server_cfg.RpcCfg", 2771089818, new Map([["constructor", "true"], ["hasmgr", "false"], ["primary", "name"], ["db", "memory"]]), [new sinfo_1.FieldInfo("mqtt", new sinfo_1.EnumType(sinfo_1.Type.Struct, MqttCfg._$info), null), new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("nobjs", new sinfo_1.EnumType(sinfo_1.Type.Arr, new sinfo_1.EnumType(sinfo_1.Type.Str)), null)]);
exports.RpcCfg = RpcCfg;
var DbType_Enum;
(function (DbType_Enum) {
    DbType_Enum[DbType_Enum["File"] = 1] = "File";
    DbType_Enum[DbType_Enum["Memory"] = 2] = "Memory";
})(DbType_Enum = exports.DbType_Enum || (exports.DbType_Enum = {}));

var DbType = function (_struct_mgr_1$Struct10) {
    _inherits(DbType, _struct_mgr_1$Struct10);

    function DbType(type, value) {
        _classCallCheck(this, DbType);

        var _this10 = _possibleConstructorReturn(this, (DbType.__proto__ || Object.getPrototypeOf(DbType)).call(this));

        _this10.enum_type = type;
        _this10.value = value;
        return _this10;
    }

    _createClass(DbType, [{
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeInt(this.enum_type);
            switch (this.enum_type) {
                case 1:
                    bb.writeUtf8(this.value);
                    break;
                case 2:
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
                    this.value = bb.readUtf8();
                    break;
                case 2:
                    break;
                default:
                    throw new Error("bonDecode type error, A is not exist index:" + t);
            }
        }
    }]);

    return DbType;
}(struct_mgr_1.Struct);

DbType._$info = new sinfo_1.EnumInfo('pi_pt/init/server_cfg.DbType', 2978819213, null, [new sinfo_1.EnumType(sinfo_1.Type.Str), null]);
exports.DbType = DbType;

var DbCfg = function (_struct_mgr_1$Struct11) {
    _inherits(DbCfg, _struct_mgr_1$Struct11);

    function DbCfg(name, dbType, old) {
        _classCallCheck(this, DbCfg);

        var _this11 = _possibleConstructorReturn(this, (DbCfg.__proto__ || Object.getPrototypeOf(DbCfg)).call(this));

        if (!old) {
            _this11.name = name;
            _this11.dbType = dbType;
        } else {
            _this11.name = name === undefined ? old.name : name;
            _this11.dbType = dbType === undefined ? old.dbType : dbType;
        }
        return _this11;
    }

    _createClass(DbCfg, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.name = bb.readUtf8();
            this.dbType = bb.readBonCode(this._$EnumTypeMap ? this._$EnumTypeMap(this.dbType) : DbType);
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.name);
            bb.writeBonCode(this.dbType);
        }
    }]);

    return DbCfg;
}(struct_mgr_1.Struct);

DbCfg._$info = new sinfo_1.StructInfo("pi_pt/init/server_cfg.DbCfg", 2191614828, new Map([["constructor", "true"], ["hasmgr", "false"], ["primary", "name"]]), [new sinfo_1.FieldInfo("name", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("dbType", new sinfo_1.EnumType(sinfo_1.Type.Enum, DbType._$info), null)]);
exports.DbCfg = DbCfg;

var HttpsCfg = function (_struct_mgr_1$Struct12) {
    _inherits(HttpsCfg, _struct_mgr_1$Struct12);

    function HttpsCfg(ip, port, keep_alive_timeout, handle_timeout, root, uploadRoot, gen_head, old) {
        _classCallCheck(this, HttpsCfg);

        var _this12 = _possibleConstructorReturn(this, (HttpsCfg.__proto__ || Object.getPrototypeOf(HttpsCfg)).call(this));

        if (!old) {
            _this12.ip = ip;
            _this12.port = port;
            _this12.keep_alive_timeout = keep_alive_timeout;
            _this12.handle_timeout = handle_timeout;
            _this12.root = root;
            _this12.uploadRoot = uploadRoot;
            _this12.gen_head = gen_head;
        } else {
            _this12.ip = ip === undefined ? old.ip : ip;
            _this12.port = port === undefined ? old.port : port;
            _this12.keep_alive_timeout = keep_alive_timeout === undefined ? old.keep_alive_timeout : keep_alive_timeout;
            _this12.handle_timeout = handle_timeout === undefined ? old.handle_timeout : handle_timeout;
            _this12.root = root === undefined ? old.root : root;
            _this12.uploadRoot = uploadRoot === undefined ? old.uploadRoot : uploadRoot;
            _this12.gen_head = gen_head === undefined ? old.gen_head : gen_head;
        }
        return _this12;
    }

    _createClass(HttpsCfg, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.ip = bb.readUtf8();
            this.port = bb.readInt();
            this.keep_alive_timeout = bb.readInt();
            this.handle_timeout = bb.readInt();
            this.root = bb.readUtf8();
            if (!bb.isNil()) {
                this.uploadRoot = bb.readUtf8();
            }
            if (!bb.isNil()) {
                this.gen_head = bb.readMap(function () {
                    return [bb.readUtf8(), bb.readUtf8()];
                });
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.ip);
            bb.writeInt(this.port);
            bb.writeInt(this.keep_alive_timeout);
            bb.writeInt(this.handle_timeout);
            bb.writeUtf8(this.root);
            if (this.uploadRoot === undefined || this.uploadRoot === null) {
                bb.writeNil();
            } else {
                bb.writeUtf8(this.uploadRoot);
            }
            if (this.gen_head === undefined || this.gen_head === null) {
                bb.writeNil();
            } else {
                bb.writeMap(this.gen_head, function (k, v) {
                    bb.writeUtf8(k);
                    bb.writeUtf8(v);
                });
            }
        }
    }]);

    return HttpsCfg;
}(struct_mgr_1.Struct);

HttpsCfg._$info = new sinfo_1.StructInfo("pi_pt/init/server_cfg.HttpsCfg", 307306082, new Map([["constructor", "true"], ["hasmgr", "false"], ["db", "memory"]]), [new sinfo_1.FieldInfo("ip", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("port", new sinfo_1.EnumType(sinfo_1.Type.U16), null), new sinfo_1.FieldInfo("keep_alive_timeout", new sinfo_1.EnumType(sinfo_1.Type.Usize), null), new sinfo_1.FieldInfo("handle_timeout", new sinfo_1.EnumType(sinfo_1.Type.Usize), null), new sinfo_1.FieldInfo("root", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("uploadRoot", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Str)), null), new sinfo_1.FieldInfo("gen_head", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Map, [new sinfo_1.EnumType(sinfo_1.Type.Str), new sinfo_1.EnumType(sinfo_1.Type.Str)])), null)]);
exports.HttpsCfg = HttpsCfg;

var HttpsTlsCfg = function (_struct_mgr_1$Struct13) {
    _inherits(HttpsTlsCfg, _struct_mgr_1$Struct13);

    function HttpsTlsCfg(ip, port, keep_alive_timeout, handle_timeout, root, uploadRoot, certPath, keyPath, gen_head, old) {
        _classCallCheck(this, HttpsTlsCfg);

        var _this13 = _possibleConstructorReturn(this, (HttpsTlsCfg.__proto__ || Object.getPrototypeOf(HttpsTlsCfg)).call(this));

        if (!old) {
            _this13.ip = ip;
            _this13.port = port;
            _this13.keep_alive_timeout = keep_alive_timeout;
            _this13.handle_timeout = handle_timeout;
            _this13.root = root;
            _this13.uploadRoot = uploadRoot;
            _this13.certPath = certPath;
            _this13.keyPath = keyPath;
            _this13.gen_head = gen_head;
        } else {
            _this13.ip = ip === undefined ? old.ip : ip;
            _this13.port = port === undefined ? old.port : port;
            _this13.keep_alive_timeout = keep_alive_timeout === undefined ? old.keep_alive_timeout : keep_alive_timeout;
            _this13.handle_timeout = handle_timeout === undefined ? old.handle_timeout : handle_timeout;
            _this13.root = root === undefined ? old.root : root;
            _this13.uploadRoot = uploadRoot === undefined ? old.uploadRoot : uploadRoot;
            _this13.certPath = certPath === undefined ? old.certPath : certPath;
            _this13.keyPath = keyPath === undefined ? old.keyPath : keyPath;
            _this13.gen_head = gen_head === undefined ? old.gen_head : gen_head;
        }
        return _this13;
    }

    _createClass(HttpsTlsCfg, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.ip = bb.readUtf8();
            this.port = bb.readInt();
            this.keep_alive_timeout = bb.readInt();
            this.handle_timeout = bb.readInt();
            this.root = bb.readUtf8();
            if (!bb.isNil()) {
                this.uploadRoot = bb.readUtf8();
            }
            this.certPath = bb.readUtf8();
            this.keyPath = bb.readUtf8();
            if (!bb.isNil()) {
                this.gen_head = bb.readMap(function () {
                    return [bb.readUtf8(), bb.readUtf8()];
                });
            }
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.ip);
            bb.writeInt(this.port);
            bb.writeInt(this.keep_alive_timeout);
            bb.writeInt(this.handle_timeout);
            bb.writeUtf8(this.root);
            if (this.uploadRoot === undefined || this.uploadRoot === null) {
                bb.writeNil();
            } else {
                bb.writeUtf8(this.uploadRoot);
            }
            bb.writeUtf8(this.certPath);
            bb.writeUtf8(this.keyPath);
            if (this.gen_head === undefined || this.gen_head === null) {
                bb.writeNil();
            } else {
                bb.writeMap(this.gen_head, function (k, v) {
                    bb.writeUtf8(k);
                    bb.writeUtf8(v);
                });
            }
        }
    }]);

    return HttpsTlsCfg;
}(struct_mgr_1.Struct);

HttpsTlsCfg._$info = new sinfo_1.StructInfo("pi_pt/init/server_cfg.HttpsTlsCfg", 4262329943, new Map([["constructor", "true"], ["hasmgr", "false"], ["db", "memory"]]), [new sinfo_1.FieldInfo("ip", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("port", new sinfo_1.EnumType(sinfo_1.Type.U16), null), new sinfo_1.FieldInfo("keep_alive_timeout", new sinfo_1.EnumType(sinfo_1.Type.Usize), null), new sinfo_1.FieldInfo("handle_timeout", new sinfo_1.EnumType(sinfo_1.Type.Usize), null), new sinfo_1.FieldInfo("root", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("uploadRoot", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Str)), null), new sinfo_1.FieldInfo("certPath", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("keyPath", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("gen_head", new sinfo_1.EnumType(sinfo_1.Type.Option, new sinfo_1.EnumType(sinfo_1.Type.Map, [new sinfo_1.EnumType(sinfo_1.Type.Str), new sinfo_1.EnumType(sinfo_1.Type.Str)])), null)]);
exports.HttpsTlsCfg = HttpsTlsCfg;
})