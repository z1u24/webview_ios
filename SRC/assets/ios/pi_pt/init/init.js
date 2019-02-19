_$define("pi_pt/init/init", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var js_lib_1 = require("../rust/pi_serv/js_lib");
var depend_1 = require("../rust/pi_serv/depend");
var mgr_1 = require("../rust/pi_db/mgr");
var MetaInit = require("../../pi/struct/meta_init");
var env_1 = require("./env");
var hotfix_1 = require("../rust/pi_serv/hotfix");
var env = new env_1.Env(new mgr_1.Mgr(self._$db_mgr), new depend_1.Depend(self._$depend));
delete self._$depend;
delete self._$db_mgr;
MetaInit.init();
//创建一个灰度管理器
var grayMgrNobjs = js_lib_1.Nobjs.new();
exports.grayMgr = hotfix_1.GrayMgr.new(env.getDbMgr(), grayMgrNobjs);
exports.getEnv = function () {
    return env;
};
exports.addNativeObj = function (name, value, cfg, cloneFun) {
    if (cloneFun) {
        exports.grayMgr.setObj(name, cloneFun(value).self, value.constructor._$info.name, name);
    }
    env.setNativeObject(name, [value, cloneFun]);
    if (cfg._$listener) {
        for (var i = 0; i < cfg._$listener.length; i++) {
            cfg._$listener[i](value);
        }
        cfg._$listener = undefined;
    }
};
exports.getNativeObj = function (name) {
    return env.getNativeObject(name);
};
exports.createNobjs = function (nobj_names) {
    var nobjs = js_lib_1.Nobjs.new();
    if (!nobj_names) {
        return nobjs;
    }
    for (var j = 0; j < nobj_names.length; j++) {
        var obj = exports.getNativeObj(nobj_names[j]);
        nobjs.setObj(nobj_names[j], obj.self, obj.constructor._$info.name, nobj_names[j]);
    }
    return nobjs;
};
exports.nobjsPath = function (nobj_names) {
    var ret = [];
    for (var j = 0; j < nobj_names.length; j++) {
        var obj = exports.getNativeObj(nobj_names[j]);
        var r = obj.constructor._$info.name.slice(0, obj.constructor._$info.name.lastIndexOf("."));
        if (ret.indexOf(r) < 0) {
            ret.push(r + ".js");
        }
    }
    return ret;
};
exports.addNobjListener = function (cfg, listener) {
    if (cfg._$listener) {
        cfg._$listener.push(listener);
    } else {
        cfg._$listener = [];
        cfg._$listener.push(listener);
    }
};
})