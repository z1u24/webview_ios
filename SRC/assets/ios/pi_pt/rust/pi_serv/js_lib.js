_$define("pi_pt/rust/pi_serv/js_lib", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var bigInt = require("../../../pi/bigint/biginteger");
var sinfo_1 = require("../../../pi/struct/sinfo");
var gray_1 = require("../gray");
//本地对象

var Nobjs = function (_nobject_1$NObject) {
    _inherits(Nobjs, _nobject_1$NObject);

    function Nobjs() {
        _classCallCheck(this, Nobjs);

        //设置NativeObject， obj应该是本地对象的所有权, 如果灰度表中存在名为key的对象， 将会覆盖
        /**
         * @param self
         * @param key:String
         * @param obj:&JSType
         * @param path:String
         * @param name:String
         * @return Result<bool,String>
         */
        var _this = _possibleConstructorReturn(this, (Nobjs.__proto__ || Object.getPrototypeOf(Nobjs)).apply(this, arguments));

        _this.setObj = function (key, obj, path, name) {
            var result = vm_1.call(1332820780, [_this.self, key, obj, path, name]);
            return result;
        };
        return _this;
    }

    return Nobjs;
}(nobject_1.NObject);

Nobjs._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/js_lib.Nobjs", 1422904849, new Map(), []);
/**
 * @return
 */
Nobjs.new = function () {
    var result = vm_1.call(1099259475, []);
    result = new Nobjs(result);
    return result;
};
exports.Nobjs = Nobjs;
//灰度

var JSGray = function (_nobject_1$NObject2) {
    _inherits(JSGray, _nobject_1$NObject2);

    function JSGray() {
        _classCallCheck(this, JSGray);

        //设置NativeObject， obj应该是本地对象的所有权, 如果灰度表中存在名为key的对象， 将会覆盖
        /**
         * @param self
         * @param key:String
         * @param obj:&JSType
         * @param path:String
         * @param name:String
         * @return Result<bool,String>
         */
        var _this2 = _possibleConstructorReturn(this, (JSGray.__proto__ || Object.getPrototypeOf(JSGray)).apply(this, arguments));

        _this2.setObj = function (key, obj, path, name) {
            var result = vm_1.call(691063210, [_this2.self, key, obj, path, name]);
            return result;
        };
        return _this2;
    }

    return JSGray;
}(nobject_1.NObject);

JSGray._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/js_lib.JSGray", 2566315655, new Map(), []);
/**
 * @param mgr:&Mgr
 * @param factory:VMFactory
 * @param name:&str
 * @param nobjs:&Nobjs
 * @return
 */
JSGray.new = function (mgr, factory, name, nobjs) {
    mgr = mgr.self;
    factory = factory.self;
    nobjs = nobjs.self;
    var result = vm_1.call(2697841501, [mgr, factory, name, nobjs]);
    result = new JSGray(result);
    return result;
};
exports.JSGray = JSGray;
/**
 * @param gray:JSGray
 * @return Arc<RwLock<gray::GrayTab<js_lib::JSGray>>>
 */
exports.createGrayTab = function (gray) {
    gray = gray.self;
    var result = vm_1.call(3635855143, [gray]);
    result = new gray_1.GrayTab(result);
    return result;
};
/**
 * @param guid:&GuidGen
 * @param ctrl_id:u16
 * @return u128
 */
exports.guidGen = function (guid, ctrl_id) {
    guid = guid.self;
    var result = vm_1.call(3557646357, [guid, ctrl_id]);
    result = bigInt(result);
    return result;
};
})