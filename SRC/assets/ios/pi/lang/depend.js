_$define("pi/lang/depend", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../struct/struct_mgr");
var sinfo_1 = require("../struct/sinfo");

var FeilDes = function (_struct_mgr_1$Struct) {
    _inherits(FeilDes, _struct_mgr_1$Struct);

    //构造方法， depend形如{"js": ["a/b/c", "d/e/f"]}
    function FeilDes(path, sign, time, size, depend, children) {
        _classCallCheck(this, FeilDes);

        var _this = _possibleConstructorReturn(this, (FeilDes.__proto__ || Object.getPrototypeOf(FeilDes)).call(this));

        _this.path = path;
        _this.sign = sign;
        _this.size = size;
        _this.time = time;
        if (depend) {
            _this.depend = new Map();
            for (var k in depend) {
                _this.depend.set(k, depend[k]);
            }
        }
        _this.children = children;
        return _this;
    }

    _createClass(FeilDes, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.path = bb.readUtf8();
            this.sign = bb.readUtf8();
            this.time = bb.readInt();
            this.size = bb.readInt();
            this.depend = bb.readMap(function () {
                return [bb.readUtf8(), bb.readArray(function () {
                    return bb.readUtf8();
                })];
            });
            this.children = bb.readMap(function () {
                return [bb.readUtf8(), bb.readBonCode(FeilDes)];
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.path);
            bb.writeUtf8(this.sign);
            bb.writeInt(this.time);
            bb.writeInt(this.size);
            bb.writeMap(this.depend, function (k, v) {
                bb.writeUtf8(k);
                bb.writeArray(v, function (el) {
                    bb.writeUtf8(el);
                });
            });
            bb.writeMap(this.children, function (k, v) {
                bb.writeUtf8(k);
                bb.writeBonCode(v);
            });
        }
    }]);

    return FeilDes;
}(struct_mgr_1.Struct);

exports.FeilDes = FeilDes;

var Depend = function (_struct_mgr_1$Struct2) {
    _inherits(Depend, _struct_mgr_1$Struct2);

    function Depend() {
        _classCallCheck(this, Depend);

        var _this2 = _possibleConstructorReturn(this, (Depend.__proto__ || Object.getPrototypeOf(Depend)).apply(this, arguments));

        _this2.fileMap = new Map();
        // 将目录放入到文件表中
        _this2.initDir = function (f, map) {
            var i,
                dir,
                info,
                s,
                suf = "",
                path = f.path,
                i = path.lastIndexOf("."),
                j = path.lastIndexOf("/");
            if (i > j) suf = path.slice(i + 1);
            j = 0;
            while ((i = path.indexOf("/", j)) >= 0) {
                dir = path.slice(j, i + 1);
                info = map[dir];
                if (!info) {
                    map[dir] = info = new FeilDes(path.slice(0, i), null, null, 0, null, null);
                    this.fileMap[path.slice(0, i + 1)] = info;
                }
                info.size += f.size;
                map = info.children;
                j = i + 1;
            }
            if (info) map[path.slice(j)] = f;
        };
        return _this2;
    }

    _createClass(Depend, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.fileMap = bb.readMap(function () {
                return [bb.readUtf8(), bb.readBonCode(FeilDes)];
            });
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeMap(this.fileMap, function (k, v) {
                bb.writeUtf8(k);
                bb.writeBonCode(v);
            });
        }
    }, {
        key: "addDepend",
        value: function addDepend(files, root) {
            var i,
                f,
                dir,
                fileMap = new Map();
            for (i = files.length - 1; i >= 0; i--) {
                var fi = files[i];
                f = new FeilDes(fi.path, fi.sign, fi.time, fi.size, fi.depend, fi.children);
                fileMap[f.path] = f;
                this.initDir(f, fileMap);
            }
        }
    }, {
        key: "get",
        value: function get(path) {
            return this.fileMap[path];
        }
    }, {
        key: "getFileMap",

        // 获得文件表
        value: function getFileMap() {
            return this.fileMap;
        }
    }]);

    return Depend;
}(struct_mgr_1.Struct);

Depend._$sinfo = new sinfo_1.StructInfo("Depend", 111111111, null, []);
exports.Depend = Depend;
})