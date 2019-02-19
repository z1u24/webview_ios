_$define("pi_pt/rust/pi_serv/js_db", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var sinfo_1 = require("../../../pi/struct/sinfo");
var vec_1 = require("../def/vec");
var mgr_1 = require("../pi_db/mgr");
var db_1 = require("../pi_db/db");
/**
 * 封装类db迭代器， 是其由traiobj转化为具体类型（构建工具暂时不支持traitobj的构建）
 * */

var DBIter = function (_nobject_1$NObject) {
    _inherits(DBIter, _nobject_1$NObject);

    function DBIter() {
        _classCallCheck(this, DBIter);

        /**
         * @param self
         * @return Result<Option<(Arc<Vec<u8>>,Arc<Vec<u8>>)>,String>
         */
        var _this = _possibleConstructorReturn(this, (DBIter.__proto__ || Object.getPrototypeOf(DBIter)).apply(this, arguments));

        _this.next = function () {
            var r = vm_1.syncCall(3763610783, [_this.self]);
            if (r !== undefined && r !== null) {
                r[0] = new vec_1.Vec(r[0]);
                r[1] = new vec_1.Vec(r[1]);
            }
            return r;
        };
        /**
         * @param self
         * @return Result<Option<pi_vm::adapter::JSType>,String>
         */
        _this.nextElem = function () {
            var r = vm_1.syncCall(2701929727, [_this.self]);
            if (r !== undefined && r !== null) {}
            return r;
        };
        return _this;
    }

    return DBIter;
}(nobject_1.NObject);

DBIter._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/js_db.DBIter", 3289224548, new Map(), []);
exports.DBIter = DBIter;
//数据库监听器

var DBToMqttMonitor = function (_nobject_1$NObject2) {
    _inherits(DBToMqttMonitor, _nobject_1$NObject2);

    function DBToMqttMonitor() {
        _classCallCheck(this, DBToMqttMonitor);

        return _possibleConstructorReturn(this, (DBToMqttMonitor.__proto__ || Object.getPrototypeOf(DBToMqttMonitor)).apply(this, arguments));
    }

    return DBToMqttMonitor;
}(nobject_1.NObject);

DBToMqttMonitor._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/js_db.DBToMqttMonitor", 2627601653, new Map(), []);
/**
 * @param mqtt_server:&ServerNode
 * @param cfg:&[u8]
 * @return Result<js_db::DBToMqttMonitor,bon::ReadBonErr>
 */
DBToMqttMonitor.new = function (mqtt_server, cfg) {
    mqtt_server = mqtt_server.self;
    var result = vm_1.call(1993779671, [mqtt_server, cfg]);
    result = new DBToMqttMonitor(result);
    return result;
};
exports.DBToMqttMonitor = DBToMqttMonitor;
// 表的元信息
// pub fn tab_info(mgr: &Mgr, ware_name:String, tab_name: String) -> Option<Arc<TabMeta>> {
//     match mgr.tab_info(&Atom::from(ware_name), &Atom::from(tab_name)) {
//         Some(b) => b.tab_info(tab_name),
//         _ => None
//     }
// }
/*
* 数据库监听器
*/

var JSDBMonitor = function (_nobject_1$NObject3) {
    _inherits(JSDBMonitor, _nobject_1$NObject3);

    function JSDBMonitor() {
        _classCallCheck(this, JSDBMonitor);

        /**
         * @param self
         * @param e:Event
         * @param mgr:Mgr
         */
        var _this3 = _possibleConstructorReturn(this, (JSDBMonitor.__proto__ || Object.getPrototypeOf(JSDBMonitor)).apply(this, arguments));

        _this3.notifyMonitor = function (e, mgr) {
            e = e.self;
            mgr = mgr.self;
            vm_1.call(1168492209, [_this3.self, e, mgr]);
        };
        return _this3;
    }

    return JSDBMonitor;
}(nobject_1.NObject);

JSDBMonitor._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/js_db.JSDBMonitor", 1495847839, new Map(), []);
//构建一个监听器
/**
 * @param handler:String
 * @param factory:VMFactory
 * @return js_db::JSDBMonitor
 */
JSDBMonitor.new = function (handler, factory) {
    factory = factory.self;
    var result = vm_1.call(2153620660, [handler, factory]);
    result = new JSDBMonitor(result);
    return result;
};
exports.JSDBMonitor = JSDBMonitor;
// 取到数据库的迭代器
/**
 * @param tr:&Tr
 * @param ware:String
 * @param tab:String
 * @param key:Option<&[u8]>
 * @param descending:bool
 * @param _filter:Option<String>
 * @return Result<js_db::DBIter,String>
 */
exports.iterDb = function (tr, ware, tab, key, descending, _filter) {
    tr = tr.self;
    if (key !== null && key !== undefined) {}
    if (_filter !== null && _filter !== undefined) {}
    var r = vm_1.syncCall(1967373661, [tr, ware, tab, key, descending, _filter]);
    r = new DBIter(r);
    return r;
};
/**
 * @param mgr:&Mgr
 * @return pi_db::mgr::Mgr
 */
exports.cloneDbMgr = function (mgr) {
    mgr = mgr.self;
    var result = vm_1.call(1420275781, [mgr]);
    result = new mgr_1.Mgr(result);
    return result;
};
// 注册内存数据库
/**
 * @param mgr:&Mgr
 * @param prefix:String
 * @param ware:DB
 * @return bool
 */
exports.registerMemeryDb = function (mgr, prefix, ware) {
    mgr = mgr.self;
    ware = ware.self;
    return vm_1.call(1905006775, [mgr, prefix, ware]);
};
// 注册文件数据库
// pub fn register_file_db(mgr: &Mgr, prefix: String, ware: Lmdb) -> bool {
//     mgr.register(Atom::from(prefix), Arc::new(ware))
// }
//new TabKV
/**
 * @param ware:&str
 * @param tab:&str
 * @param key:&[u8]
 * @param value:&[u8]
 * @return pi_db::db::TabKV
 */
exports.tabkvWithValue = function (ware, tab, key, value) {
    var result = vm_1.call(2097131752, [ware, tab, key, value]);
    result = new db_1.TabKV(result);
    return result;
};
//new TabKV
/**
 * @param ware:&str
 * @param tab:&str
 * @param key:&[u8]
 * @return pi_db::db::TabKV
 */
exports.tabkvNew = function (ware, tab, key) {
    var result = vm_1.call(1247562096, [ware, tab, key]);
    result = new db_1.TabKV(result);
    return result;
};
//TabKV get_value
/**
 * @param tabkv:&TabKV
 * @return Option<Arc<Vec<u8>>>
 */
exports.tabkvGetValue = function (tabkv) {
    tabkv = tabkv.self;
    var result = vm_1.call(1579404380, [tabkv]);
    if (result !== undefined && result !== null) {
        result = new vec_1.Vec(result);
    }
    return result;
};
//插入元信息
/**
 * @param tr:&Tr
 * @param ware:String
 * @param tab:String
 * @param meta_buf:Option<&[u8]>
 * @return Result<(),String>
 */
exports.alter = function (tr, ware, tab, meta_buf) {
    tr = tr.self;
    if (meta_buf !== null && meta_buf !== undefined) {}
    var r = vm_1.syncCall(2680255887, [tr, ware, tab, meta_buf]);
    return r;
};
//修改数据库数据
/**
 * @param tr:&Tr
 * @param items:&JSType
 * @param lock_time:Option<usize>
 * @param read_lock:bool
 * @return Result<(),String>
 */
exports.modify = function (tr, items, lock_time, read_lock) {
    tr = tr.self;
    if (lock_time !== null && lock_time !== undefined) {}
    var r = vm_1.syncCall(2725879080, [tr, items, lock_time, read_lock]);
    return r;
};
//查询数据库
/**
 * @param tr:&Tr
 * @param items:&JSType
 * @param lock_time:Option<usize>
 * @param read_lock:bool
 * @return Result<pi_vm::adapter::JSType,String>
 */
exports.query = function (tr, items, lock_time, read_lock) {
    tr = tr.self;
    if (lock_time !== null && lock_time !== undefined) {}
    var r = vm_1.syncCall(583163851, [tr, items, lock_time, read_lock]);
    return r;
};
// 表的大小
/**
 * @param tr:&Tr
 * @param ware_name:&str
 * @param tab_name:&str
 * @return Result<usize,String>
 */
exports.tabSize = function (tr, ware_name, tab_name) {
    tr = tr.self;
    var r = vm_1.syncCall(2986122496, [tr, ware_name, tab_name]);
    return r;
};
/**
 * @param mgr:&Mgr
 * @param monitor:DBToMqttMonitor
 */
exports.registerDbToMqttMonitor = function (mgr, monitor) {
    mgr = mgr.self;
    monitor = monitor.self;
    vm_1.call(1869880364, [mgr, monitor]);
};
/**
 * @param mgr:&Mgr
 * @param ware:String
 * @param tab:String
 * @param file:String
 * @return Result<(),String>
 */
exports.dump = function (mgr, ware, tab, file) {
    mgr = mgr.self;
    var r = vm_1.syncCall(4281318477, [mgr, ware, tab, file]);
    return r;
};
/**
 * @param mgr:&Mgr
 * @param ware:String
 * @param tab:String
 * @param file:String
 * @return Result<(),String>
 */
exports.restore = function (mgr, ware, tab, file) {
    mgr = mgr.self;
    var r = vm_1.syncCall(479322726, [mgr, ware, tab, file]);
    return r;
};
/**
 * @param mgr:&Mgr
 * @param monitor:JSDBMonitor
 */
exports.registerDbJsDbMonitor = function (mgr, monitor) {
    mgr = mgr.self;
    monitor = monitor.self;
    vm_1.call(2176133173, [mgr, monitor]);
};

var DBWare = function (_nobject_1$NObject4) {
    _inherits(DBWare, _nobject_1$NObject4);

    function DBWare() {
        _classCallCheck(this, DBWare);

        return _possibleConstructorReturn(this, (DBWare.__proto__ || Object.getPrototypeOf(DBWare)).apply(this, arguments));
    }

    return DBWare;
}(nobject_1.NObject);

DBWare._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/js_db.DBWare", 1675843967, new Map(), []);
exports.DBWare = DBWare;
})