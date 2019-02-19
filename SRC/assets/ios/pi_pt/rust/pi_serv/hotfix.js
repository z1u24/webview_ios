_$define("pi_pt/rust/pi_serv/hotfix", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var sinfo_1 = require("../../../pi/struct/sinfo");
var gray_1 = require("../gray");
//灰度管理器

var GrayMgr = function (_nobject_1$NObject) {
    _inherits(GrayMgr, _nobject_1$NObject);

    function GrayMgr() {
        _classCallCheck(this, GrayMgr);

        /**
         * @param self
         * @param key:&str
         * @param mgr:&Mgr
         * @param factor:VMFactory
         * @return bool
         */
        var _this = _possibleConstructorReturn(this, (GrayMgr.__proto__ || Object.getPrototypeOf(GrayMgr)).apply(this, arguments));

        _this.updateGray = function (key, mgr, factor) {
            mgr = mgr.self;
            factor = factor.self;
            return vm_1.call(2753091108, [_this.self, key, mgr, factor]);
        };
        /**
         * @param self
         * @param key:&str
         * @return bool
         */
        _this.hasGrayTab = function (key) {
            return vm_1.call(2997074552, [_this.self, key]);
        };
        /**
         * @param self
         * @param key:&str
         * @return Option<Arc<RwLock<gray::GrayTab<js_lib::JSGray>>>>
         */
        _this.getGrayTab = function (key) {
            var result = vm_1.call(4222745849, [_this.self, key]);
            if (result !== undefined && result !== null) {
                result = new gray_1.GrayTab(result);
            }
            return result;
        };
        /**
         * @param self
         * @param gray_tab:&Arc<RwLock<GrayTab<JSGray>>>
         * @return Result<(),String>
         */
        _this.addGrayTab = function (gray_tab) {
            gray_tab = gray_tab.self;
            var result = vm_1.call(1272018599, [_this.self, gray_tab]);
            return result;
        };
        /**
         * @param self
         * @param _version:usize
         * @return bool
         */
        _this.removeGray = function (_version) {
            return vm_1.call(2013391265, [_this.self, _version]);
        };
        /**
         * @param self
         * @param key:String
         * @param obj:&JSType
         * @param path:String
         * @param name:String
         * @return Result<bool,String>
         */
        _this.setObj = function (key, obj, path, name) {
            var result = vm_1.call(56672718, [_this.self, key, obj, path, name]);
            return result;
        };
        return _this;
    }

    return GrayMgr;
}(nobject_1.NObject);

GrayMgr._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/hotfix.GrayMgr", 3355816649, new Map(), []);
/**
 * @param mgr:&Mgr
 * @param nobjs:&Nobjs
 * @return hotfix::GrayMgr
 */
GrayMgr.new = function (mgr, nobjs) {
    mgr = mgr.self;
    nobjs = nobjs.self;
    var result = vm_1.call(1942014446, [mgr, nobjs]);
    result = new GrayMgr(result);
    return result;
};
exports.GrayMgr = GrayMgr;

var GrayMgrMutax = function (_nobject_1$NObject2) {
    _inherits(GrayMgrMutax, _nobject_1$NObject2);

    function GrayMgrMutax() {
        _classCallCheck(this, GrayMgrMutax);

        return _possibleConstructorReturn(this, (GrayMgrMutax.__proto__ || Object.getPrototypeOf(GrayMgrMutax)).apply(this, arguments));
    }

    return GrayMgrMutax;
}(nobject_1.NObject);

GrayMgrMutax._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/hotfix.GrayMgrMutax", 646865374, new Map(), []);
exports.GrayMgrMutax = GrayMgrMutax;
//
/**
 * @param gray_mgr:GrayMgr
 * @return Arc<Mutex<hotfix::GrayMgr>>
 */
exports.graymgrToArc = function (gray_mgr) {
    gray_mgr = gray_mgr.self;
    var result = vm_1.call(3591490542, [gray_mgr]);
    result = new GrayMgr(result);
    return result;
};
//监听depned的变化， 根据depend文件的变化修改灰度
/**
 * @param gray_mgr:Arc<Mutex<GrayMgr>>
 * @param path:String
 */
exports.hotfixListen = function (gray_mgr, path) {
    gray_mgr = gray_mgr.self;
    vm_1.call(3668445806, [gray_mgr, path]);
};
})