_$define("pi_pt/rust/pi_db/mgr", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 基于2pc的db管理器，每个db实现需要将自己注册到管理器上
 */
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var sinfo_1 = require("../../../pi/struct/sinfo");
var db_1 = require("./db");
var vec_1 = require("../def/vec");
// 表库及事务管理器

var Mgr = function (_nobject_1$NObject) {
    _inherits(Mgr, _nobject_1$NObject);

    function Mgr() {
        _classCallCheck(this, Mgr);

        // 表的元信息
        /**
         * @param self
         * @param ware_name:&Atom
         * @param tab_name:&Atom
         * @return Option<Arc<pi_db::db::TabMeta>>
         */
        var _this = _possibleConstructorReturn(this, (Mgr.__proto__ || Object.getPrototypeOf(Mgr)).apply(this, arguments));

        _this.tabInfo = function (ware_name, tab_name) {
            ware_name = ware_name.self;
            tab_name = tab_name.self;
            var result = vm_1.call(258785726, [_this.self, ware_name, tab_name]);
            if (result !== undefined && result !== null) {
                result = new db_1.TabMeta(result);
            }
            return result;
        };
        // 创建事务
        /**
         * @param self
         * @param writable:bool
         * @return pi_db::mgr::Tr
         */
        _this.transaction = function (writable) {
            var result = vm_1.call(951191934, [_this.self, writable]);
            result = new Tr(result);
            return result;
        };
        return _this;
    }

    return Mgr;
}(nobject_1.NObject);

Mgr._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_db/mgr.Mgr", 733545086, new Map(), []);
// 注册管理器
/**
 * @param gen:GuidGen
 * @return
 */
Mgr.new = function (gen) {
    gen = gen.self;
    var result = vm_1.call(4081023775, [gen]);
    result = new Mgr(result);
    return result;
};
exports.Mgr = Mgr;

var Tr = function (_nobject_1$NObject2) {
    _inherits(Tr, _nobject_1$NObject2);

    function Tr() {
        _classCallCheck(this, Tr);

        // 预提交一个事务
        /**
         * @param self
         * @return Result<(),String>
         */
        var _this2 = _possibleConstructorReturn(this, (Tr.__proto__ || Object.getPrototypeOf(Tr)).apply(this, arguments));

        _this2.prepare = function () {
            var r = vm_1.syncCall(3803008464, [_this2.self]);
            return r;
        };
        // 提交一个事务
        /**
         * @param self
         * @return Result<(),String>
         */
        _this2.commit = function () {
            var r = vm_1.syncCall(1346774966, [_this2.self]);
            return r;
        };
        // 回滚一个事务
        /**
         * @param self
         * @return Result<(),String>
         */
        _this2.rollback = function () {
            var r = vm_1.syncCall(977907218, [_this2.self]);
            return r;
        };
        // 查询
        /**
         * @param self
         * @param arr:Vec<TabKV>
         * @param lock_time:Option<usize>
         * @param read_lock:bool
         * @return Result<Vec<pi_db::db::TabKV>,String>
         */
        _this2.query = function (arr, lock_time, read_lock) {
            arr = arr.self;
            if (lock_time !== null && lock_time !== undefined) {}
            var r = vm_1.syncCall(1841891766, [_this2.self, arr, lock_time, read_lock]);
            r = new vec_1.Vec(r);
            return r;
        };
        // 修改，插入、删除及更新
        /**
         * @param self
         * @param arr:Vec<TabKV>
         * @param lock_time:Option<usize>
         * @param read_lock:bool
         * @return Result<(),String>
         */
        _this2.modify = function (arr, lock_time, read_lock) {
            arr = arr.self;
            if (lock_time !== null && lock_time !== undefined) {}
            var r = vm_1.syncCall(685881041, [_this2.self, arr, lock_time, read_lock]);
            return r;
        };
        // 创建、修改或删除表
        /**
         * @param self
         * @param ware_name:&Atom
         * @param tab_name:&Atom
         * @param meta:Option<Arc<TabMeta>>
         * @return Result<(),String>
         */
        _this2.alter = function (ware_name, tab_name, meta) {
            ware_name = ware_name.self;
            tab_name = tab_name.self;
            if (meta !== null && meta !== undefined) {
                meta = meta.self;
            }
            var r = vm_1.syncCall(3786000589, [_this2.self, ware_name, tab_name, meta]);
            return r;
        };
        return _this2;
    }

    return Tr;
}(nobject_1.NObject);

Tr._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_db/mgr.Tr", 761534130, new Map(), []);
exports.Tr = Tr;
})