_$define("earn/utils/util", function (require, exports, module){
"use strict";
/**
 * 一些通用方法
 */

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================================= 导入
var bon_1 = require("../../pi/util/bon");
var util_1 = require("../../pi/util/util");
// ================================================================= 导出
/**
 * 是否是空字符串
 * @param str string
 */
exports.notEmptyString = function (str) {
    if (str === undefined || str === null || str === '') {
        return false;
    }
    return true;
};
/**
 * 深拷贝
 * @param v value
 */
exports.depCopy = function (v) {
    return JSON.parse(JSON.stringify(v));
};
/**
 * 转换为bonBuffer
 * @param key key
 */
exports.toBonBuffer = function (key) {
    return util_1.ab2hex(new bon_1.BonBuffer().write(key).getBuffer());
};
/**
 * tpl不支持map所以需要将map转换为array
 */
exports.map2Arr = function (m) {
    var arr = [];
    for (var _iterator = m, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var _ref2 = _ref,
            _ref3 = _slicedToArray(_ref2, 2),
            v = _ref3[1];

        arr.push(v);
    }
    return exports.depCopy(arr);
};
/**
 * 通过user生成hid
 * @param sid sender id
 * @param rid reader id
 */
exports.genUserHid = function (sid, rid) {
    return sid > rid ? "u" + rid + sid : "u" + sid + rid;
};
/**
 * 通过groupid生成hid
 * @param gid group id
 */
exports.genGroupHid = function (gid) {
    return "g" + gid;
};
/**
 * generate the uuid
 * @param sid sender id
 * @param rid reader id
 */
exports.genUuid = function (sid, rid) {
    return sid + ":" + rid;
};
/**
 * generate the history increament id
 * @param hid history id
 * @param index index
 */
exports.genHIncId = function (hid, index) {
    return hid + ":" + index;
};
/**
 * generate new id from the old one
 * @param oldId old id
 */
exports.genNewIdFromOld = function (oldId) {
    return oldId + 1;
};
/**
 * generate group user id
 * @param group id
 * @param user id
 */
exports.genGuid = function (gid, uid) {
    return gid + ":" + uid;
};
/**
 * generate announcement increament id
 * @param gid group id
 * @param index  index
 */
exports.genAnnounceIncId = function (gid, index) {
    return gid + ":" + index;
};
/**
 * 删除value
 * @param value value
 * @param arr array
 */
exports.delValueFromArray = function (value, arr) {
    return arr.filter(function (ele) {
        return ele !== value;
    });
};
/**
 * generate next index
 * @param index index
 */
exports.genNextMessageIndex = function (index) {
    return index + 1;
};
/**
 * getHid
 * @param hIncId a:b
 */
exports.getHidFromhIncId = function (hIncId) {
    return hIncId.split(':')[0];
};
/**
 * get index
 * @param hIncId a:b
 */
exports.getIndexFromHIncId = function (hIncId) {
    return parseInt(hIncId.split(':')[1], 10);
};
/**
 * get gid
 * @param guid group user id
 */
exports.getGidFromGuid = function (guid) {
    return parseInt(guid.split(':')[0], 10);
};
/**
 * get uid
 * @param guid group user id
 */
exports.getUidFromGuid = function (guid) {
    return parseInt(guid.split(':')[1], 10);
};
/**
 * get rid
 */
exports.getUidFromUuid = function (uuid) {
    return parseInt(uuid.split(':')[1], 10);
};
})