_$define("pi_pt/init/util", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../db");
var vec_1 = require("../rust/def/vec");
var js_db_1 = require("../rust/pi_serv/js_db");
var js_base_1 = require("../rust/pi_serv/js_base");
var pi_vm_impl_1 = require("../rust/pi_vm/pi_vm_impl");
var bonmgr_1 = require("../rust/pi_vm/bonmgr");
var bon_1 = require("../../pi/util/bon");
var js_lib_1 = require("../rust/pi_serv/js_lib");
exports.createVMFactory = function (mgr, depend, file) {
    var vmf = pi_vm_impl_1.VMFactory.new(0, bonmgr_1.NativeObjsAuth.withNone());
    var dp = js_base_1.getDepend(depend, file).asSliceString();
    var map = new Map();
    var codeItems = vec_1.Vec.newTabKV();
    for (var i = 0; i < dp.length; i++) {
        if (map.get(dp[i])) {
            continue;
        }
        map.set(dp[i], true);
        var bb = new bon_1.BonBuffer();
        bb.writeUtf8(dp[i]);
        var item = js_db_1.tabkvNew("memory", "_$code", bb.getBuffer());
        codeItems.pushTabKV(item);
    }
    var codes = db_1.read(mgr, function (tr) {
        var codeResult = tr.query(codeItems, 1000, false);
        return codeResult.asSliceTabKV();
    });
    for (var _i = 0; _i < codes.length; _i++) {
        var v = js_db_1.tabkvGetValue(codes[_i]);
        vmf = vmf.append(v);
    }
    return vmf;
};
exports.createNobjs = function (nobj_names, env) {
    var nobjs = js_lib_1.Nobjs.new();
    if (!nobj_names) {
        return nobjs;
    }
    for (var j = 0; j < nobj_names.length; j++) {
        var obj = env.getNativeObject(nobj_names[j]);
        nobjs.setObj(nobj_names[j], obj.self, obj.constructor._$info.name, nobj_names[j]);
    }
    return nobjs;
};
exports.nobjsPath = function (nobj_names, env) {
    var ret = [];
    for (var j = 0; j < nobj_names.length; j++) {
        var obj = env.getNativeObject(nobj_names[j]);
        var r = obj.constructor._$info.name.slice(0, obj.constructor._$info.name.lastIndexOf("."));
        if (ret.indexOf(r) < 0) {
            ret.push(r + ".js");
        }
    }
    return ret;
};
})