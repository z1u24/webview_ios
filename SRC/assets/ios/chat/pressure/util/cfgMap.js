_$define("chat/pressure/util/cfgMap", function (require, exports, module){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 处理配置表获取
 */
// ===================================================== 导入
var cfg_1 = require("../../../pi/util/cfg");
var util_1 = require("../../../pi/util/util");
// ===================================================== 导出
// 获取map
exports.getMap = function (table, key) {
    if (!util_1.isString(table)) {
        if (key) {
            table = exports.tableNameAddKey(table._$info.name, table._$info.notes.get('primary'));
        } else {
            table = exports.tableNameAddKey(table._$info.name);
        }
    }
    if (!initMap.has(table)) setMap(table);
    if (!initMap.has(table)) return;
    if (key !== undefined && key !== null) return initMap.get(table).get(key);
    return initMap.get(table);
};
/**
 * 表名与主键的组合
 */
exports.tableNameAddKey = function (tableName, key) {
    if (!tableName) return tableName;
    if (!key) return tableName;
    return tableName + "#" + key;
};
// ===================================================== 本地
/**
 * 深度克隆
 * @param   obj 待克隆的对象
 * @return      生成的对象
 */
exports.clone = function (obj) {
    var o = void 0;
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object') {
        if (Array.isArray(obj)) {
            o = [];
            for (var _iterator = obj, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var v = _ref;

                o.push(exports.clone(v));
            }
        } else if (obj instanceof Map) {
            o = new Map();
            obj.forEach(function (v, k) {
                return o.set(k, exports.clone(v));
            });
        } else {
            o = {};
            Object.getOwnPropertyNames(obj).map(function (k) {
                return o[k] = exports.clone(obj[k]);
            });
        }
    } else {
        o = obj;
    }
    return o;
};
// 设置map
var setMap = function setMap(key) {
    if (cfg_1.cfgMgr.map.has(key)) {
        var tempMap = exports.clone(originCfg.get(key));
        /*  const tempMap = new Map();
         for (const [k, v] of originCfg.get(key)) {
             const values = clone(v);
             for (const m in values) {
                 if (typeof values[m] === 'string' && !isNaN(values[m])) {
                     values[m] = +values[m];
                 }
             }
             tempMap.set(k, values);
         } */
        initMap.set(key, tempMap);
    }
};
// ===================================================== 立即执行
var originCfg = cfg_1.cfgMgr.map;
var initMap = new Map();
})