_$define("pi_pt/db", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JsDb = require("./rust/pi_serv/js_db");
var bon_1 = require("../pi/util/bon");
var js_base_1 = require("./rust/pi_serv/js_base");
/**
 * 读数据
 * @param timeout 超时时间， 默认10毫秒， 超时将抛出异常
*/
exports.read = function (mgr, txhd) {
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

    var time = new Date().getTime();
    while (timeout > 0) {
        var tr = mgr.transaction(false);
        var r = void 0;
        try {
            r = txhd(tr);
        } catch (error) {
            js_base_1.dropNativeObj(tr.self);
            throw error;
        }
        try {
            tr.prepare();
            tr.commit();
            js_base_1.dropNativeObj(tr.self);
            return r;
        } catch (error) {
            console.log(error);
            timeout = timeout - (new Date().getTime() - time);
            try {
                tr.rollback();
            } catch (error) {
                console.log("rollback fail", error);
            }
        }
        js_base_1.dropNativeObj(tr.self);
    }
    throw new Error("read timeout");
};
/**
 * 写数据
 * @param timeout 超时时间， 默认10毫秒， 超时将抛出异常
*/
exports.write = function (mgr, txhd) {
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

    var time = new Date().getTime();
    while (timeout > 0) {
        var tr = mgr.transaction(true);
        var r = void 0;
        try {
            r = txhd(tr);
        } catch (error) {
            js_base_1.dropNativeObj(tr.self);
            throw error;
        }
        try {
            tr.prepare();
            tr.commit();
            js_base_1.dropNativeObj(tr.self);
            return r;
        } catch (error) {
            timeout = timeout - (new Date().getTime() - time);
            tr.rollback();
            js_base_1.dropNativeObj(tr.self);
        }
    }
    throw new Error("write timeout");
};
/**
 * 修改数据库的数据
 * @return Array<Item>
 */
exports.modify = function (tr, items, lock_time, read_lock) {
    var arr = [];
    for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var value = null;
        if (it.value !== undefined && it.value !== null) {
            //if( it.tab === "config/db/User.UserId"){
            //console.log("userId1111----------------------------", it.tab, it.value);
            //}
            value = new bon_1.BonBuffer().write(it.value).getBuffer();
        }
        arr.push([it.ware, it.tab, new bon_1.BonBuffer().write(it.key).getBuffer(), value]);
    }
    JsDb.modify(tr, arr, lock_time, read_lock);
};
/**
 * 查询数据库的数据
 */
exports.query = function (tr, items, lock_time, read_lock) {
    var arr = [];
    for (var i = 0; i < items.length; i++) {
        var it = items[i];
        arr.push([it.ware, it.tab, new bon_1.BonBuffer().write(it.key).getBuffer()]);
    }
    return JsDb.query(tr, arr, lock_time, read_lock);
};
/**
 * 插入元信息
 */
exports.alter = function (tr, ware, tab, meta) {
    var bb = new bon_1.BonBuffer();
    if (meta) {
        meta.bonEncode(bb);
    }
    JsDb.alter(tr, ware, tab, meta ? bb.getBuffer() : null);
};
/**
 * 插入元信息
 */
exports.iterDb = function (tr, ware, tab, key, descending, _filter) {
    if (key === null || key === undefined) {
        return JsDb.iterDb(tr, ware, tab, null, descending, _filter);
    }
    return JsDb.iterDb(tr, ware, tab, new bon_1.BonBuffer().write(key).getBuffer(), descending, _filter);
};
})