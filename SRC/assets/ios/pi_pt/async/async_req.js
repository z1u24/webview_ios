_$define("pi_pt/async/async_req", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 异步调用模块， 负责发起调用的参数序列化， 接收请求的参数反序列化， 函数调用， 调用返回值的序列化， 收到回应值的反序列化
 * 最多支持10个参数， 参数中， 不能将一个NativeObject嵌套在一个复杂类型内部
 * 返回值也不能将NativeObject嵌套在一个复杂类型内部
 */
var vm_1 = require("../vm/vm");
var bon_1 = require("../../pi/util/bon");
var async_resp_1 = require("./async_resp");
exports.asyncCall = function (name, args, callback) {
    var back = function back(r, nobjs) {
        callback(async_resp_1.readany(new bon_1.BonBuffer(r), nobjs)); //解析返回值， 调用回调
    };
    //序列化参数
    var index = vm_1.callbacks.register(back);
    var bb = new bon_1.BonBuffer();
    var nobjs = [];
    async_resp_1.writeArray(args, bb, nobjs);
    //异步掉用
    vm_1.NativeObject.call(1, [name, bb.getBuffer(), nobjs, index]);
};
exports.syncCall = function (name, args) {
    var bb = new bon_1.BonBuffer();
    var nobjs = [];
    async_resp_1.writeArray(args, bb, nobjs);
    //阻塞步调用
    vm_1.NativeObject.call(1, [name, bb.getBuffer(), nobjs, null]);
    var r = vm_1.__thread_yield();
    return async_resp_1.readany(new bon_1.BonBuffer(r[0]), r[1]);
};
})