_$define("earn/client/app/store/memstore", function (require, exports, module){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file store
 * @author donghr
 */
// ============================================ 导入
var event_1 = require("../../../../pi/util/event");
// ============================================ 导出
/**
 * 判断是否是对象
 */
var isObject = function isObject(value) {
    var vtype = typeof value === "undefined" ? "undefined" : _typeof(value);
    return value !== null && (vtype === 'object' || vtype === 'function');
};
/**
 * 数据深拷贝
 */
exports.deepCopy = function (v) {
    if (!v || v instanceof Promise || !isObject(v)) return v;
    if (v instanceof Map) {
        return new Map(JSON.parse(JSON.stringify(v)));
    }
    var newobj = v.constructor === Array ? [] : {};
    for (var i in v) {
        newobj[i] = isObject(v[i]) ? exports.deepCopy(v[i]) : v[i];
    }
    return newobj;
};
/**
 * 根据路径获取数据
 */
exports.getStore = function (path) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    var ret = store;
    for (var _iterator = path.split('/'), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var key = _ref;

        if (key in ret) {
            ret = ret[key];
        } else {
            // 路径中有和store内部不同的键，肯定是bug
            // tslint:disable-next-line:prefer-template
            throw new Error('getStore Failed, path = ' + path);
        }
    }
    var deepRet = exports.deepCopy(ret);
    return typeof deepRet === 'boolean' || typeof deepRet === 'number' ? deepRet : deepRet || defaultValue;
};
/**
 * 更新store并通知
 */
exports.setStore = function (path, data) {
    var notified = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var keyArr = path.split('/');
    var notifyPath = [];
    for (var i = 0; i < keyArr.length; i++) {
        // tslint:disable-next-line:prefer-template
        var _path = i === 0 ? keyArr[i] : notifyPath[i - 1] + '/' + keyArr[i];
        notifyPath.push(_path);
    }
    // console.log(notifyPath);
    // 原有的最后一个键
    var lastKey = keyArr.pop();
    var parent = store;
    for (var _iterator2 = keyArr, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
        }

        var key = _ref2;

        if (key in parent) {
            parent = parent[key];
        } else {
            // 路径中有和store内部不同的键，肯定是bug
            // tslint:disable-next-line:prefer-template
            throw new Error('setStore Failed, path = ' + path);
        }
    }
    parent[lastKey] = exports.deepCopy(data);
    if (notified) {
        for (var _i3 = notifyPath.length - 1; _i3 >= 0; _i3--) {
            handlerMap.notify(notifyPath[_i3], exports.getStore(notifyPath[_i3]));
        }
    }
};
/**
 * 注册消息处理器
 */
exports.register = function (keyName, cb) {
    handlerMap.add(keyName, cb);
};
/**
 * 取消注册消息处理器
 */
exports.unregister = function (keyName, cb) {
    handlerMap.remove(keyName, cb);
};
// ======================================================== 本地
// ============================================ 立即执行
/**
 * 消息处理列表
 */
var handlerMap = new event_1.HandlerMap();
// 全局内存数据库
var store = {
    userInfo: {
        uid: -1,
        name: '',
        avatar: '',
        note: '',
        sex: 0,
        tel: ''
    },
    flags: {},
    mine: {
        miningedNumber: 0,
        miningRank: 0,
        miningKTnum: 0,
        miningMedalId: 8001
    },
    goods: [],
    balance: {
        ST: 0,
        KT: 0
    },
    ACHVmedals: [],
    invited: {
        invitedNumberOfPerson: 0,
        convertedInvitedAward: []
    }
};
})