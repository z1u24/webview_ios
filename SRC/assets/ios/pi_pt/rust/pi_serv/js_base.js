_$define("pi_pt/rust/pi_serv/js_base", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var bigInt = require("../../../pi/bigint/biginteger");
var sinfo_1 = require("../../../pi/struct/sinfo");
var sinfo_2 = require("../sinfo");
var pi_vm_impl_1 = require("../pi_vm/pi_vm_impl");
var js_async_1 = require("./js_async");
var vec_1 = require("../def/vec");
//创建一个Arc<StructInfo>
/**
 * @param data:&[u8]
 * @return Result<Arc<sinfo::StructInfo>,bon::ReadBonErr>
 */
exports.createSinfo = function (data) {
  var result = vm_1.call(1347190475, [data]);
  result = new sinfo_2.StructInfo(result);
  return result;
};
//clone vm工厂（VMFactory没有显示实现clone方法， 无法导出， 需要封装）
/**
 * @param factory:&VMFactory
 * @return pi_vm::pi_vm_impl::VMFactory
 */
exports.cloneVmFactory = function (factory) {
  factory = factory.self;
  var result = vm_1.call(3993207385, [factory]);
  result = new pi_vm_impl_1.VMFactory(result);
  return result;
};
/**
 * @param arh:AsyncRequestHandler
 * @return Arc<js_async::AsyncRequestHandler>
 */
exports.arcNewAsyncRequestHandler = function (arh) {
  arh = arh.self;
  var result = vm_1.call(4111533257, [arh]);
  result = new js_async_1.AsyncRequestHandler(result);
  return result;
};
//为async注册handler
/**
 * @param topic:String
 * @param handler:&Arc<AsyncRequestHandler>
 */
exports.registerAsyncHandler = function (topic, handler) {
  handler = handler.self;
  vm_1.call(3272869145, [topic, handler]);
};
//new一个arc
/**
 * @param v:&Arc<T>
 * @return &Vec<u8>
 */
exports.arcDerefVec = function (v) {
  v = v.self;
  var result = vm_1.call(3741531906, [v]);
  result = new vec_1.Vec(result);
  return result;
};
//getdepend
/**
 * @param dp:&Depend
 * @param path:&[String]
 * @return Vec<String>
 */
exports.getDepend = function (dp, path) {
  dp = dp.self;
  var result = vm_1.call(509141093, [dp, path]);
  result = new vec_1.Vec(result);
  return result;
};
//休眠
/**
 * @param ms:u32
 */
exports.sleep = function (ms) {
  vm_1.syncCall(1810043215, [ms]);
};
/**
 * @param ms:u32
 * @param () => void
 * @return usize
 */
exports.setTimeoutAsync = function (ms, f) {
  var f_ = f;
  vm_1.asyncCall(3344344275, [ms], f_);
};
/**
 * @param index:usize
 */
exports.clearTimeout = function (index) {
  vm_1.call(3285798497, [index]);
};
//创建一个随机对象
/**
 * @return js_base::Rand
 */
exports.createRand = function () {
  var result = vm_1.call(59144274, []);
  result = new Rand(result);
  return result;
};
//取到一个随机值
/**
 * @param or:&mutRand
 * @return u32
 */
exports.nextU32 = function (or) {
  or = or.self;
  return vm_1.call(3881780156, [or]);
};
//取到一个随机值
/**
 * @param or:&mutRand
 * @return u64
 */
exports.nextU64 = function (or) {
  or = or.self;
  var result = vm_1.call(3908949488, [or]);
  result = bigInt(result);
  return result;
};
//取到一个随机值
/**
 * @param or:&mutRand
 * @param len:usize
 * @return Vec<u8>
 */
exports.fillBytes = function (or, len) {
  or = or.self;
  var result = vm_1.call(2556550051, [or, len]);
  result = new vec_1.Vec(result);
  return result;
};
//取到一个随机值
/**
 * @param or:&mutRand
 * @param len:usize
 * @return Result<Vec<u8>,String>
 */
exports.tryFillBytes = function (or, len) {
  or = or.self;
  var result = vm_1.call(957759389, [or, len]);
  result = new vec_1.Vec(result);
  return result;
};
//销毁nativeobject
/**
 * @param t:&JSType
 * @return Result<bool,String>
 */
exports.dropNativeObj = function (t) {
  var result = vm_1.call(370495443, [t]);
  return result;
};
/**
 */
exports.end = function () {
  vm_1.call(2041214057, []);
};

var Rand = function (_nobject_1$NObject) {
  _inherits(Rand, _nobject_1$NObject);

  function Rand() {
    _classCallCheck(this, Rand);

    return _possibleConstructorReturn(this, (Rand.__proto__ || Object.getPrototypeOf(Rand)).apply(this, arguments));
  }

  return Rand;
}(nobject_1.NObject);

Rand._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/js_base.Rand", 3355421248, new Map(), []);
exports.Rand = Rand;
})