_$define("chat/client/app/data/store", function (require, exports, module){
"use strict";
/**
 * 数据存储
 */

Object.defineProperty(exports, "__esModule", { value: true });
// ============================================ 导入
var event_1 = require("../../../../pi/util/event");
var initStore_1 = require("./initStore");
// ============================================ 导出
/**
 * 根据路径获取数据
 */
exports.getStore = function (path) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    var ret = exports.store;
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
        } else if (ret instanceof Map) {
            ret = ret.get(key);
        } else {
            // 路径中有和store内部不同的键，肯定是bug
            // tslint:disable-next-line:prefer-template
            throw new Error('getStore Failed, path = ' + path);
        }
    }
    return ret || defaultValue;
};
/**
 * 更新store并通知
 */
exports.setStore = function (path, data) {
    var notified = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var path2value = function path2value() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var returnValue = exports.store;
        for (var i = 0; i < args[0].length; i++) {
            returnValue = returnValue[args[0][i]];
        }
        return returnValue;
    };
    var keyArr = path.split('/');
    // 原有的最后一个键
    var lastKey = keyArr.pop();
    var parent = exports.store;
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
        } else if (parent instanceof Map) {
            parent = parent.get(key);
        } else {
            // 路径中有和store内部不同的键，肯定是bug
            // tslint:disable-next-line:prefer-template
            throw new Error('setStore Failed, path = ' + path);
        }
    }
    if (parent instanceof Map) {
        parent.set(lastKey, data);
    } else {
        parent[lastKey] = data;
    }
    /**
     * 写的不好，只能支持普通json和最后一层为map的情况，不支持map嵌套
     */
    if (notified) {
        handlerMap.notify(path, data);
        path = path.substring(0, path.lastIndexOf('/'));
        while (path.length > 0) {
            handlerMap.notify(path, path2value(path.split('/')));
            path = path.substring(0, path.lastIndexOf('/'));
        }
    }
};
/**
 * 注册监听特定的数据
 * @param keyName the name of the key
 * @param cb callback
 */
exports.register = function (keyName, cb) {
    handlerMap.add(keyName, cb);
};
/**
 * 取消注册
 * @param keyName the name of the key
 * @param cb callback
 */
exports.unregister = function (keyName, cb) {
    handlerMap.remove(keyName, cb);
};
/**
 * store初始化
 */
exports.initStore = function () {
    registerDataChange();
    exports.store = {
        uid: null,
        readGroupTimeMap: new Map(),
        groupInfoMap: new Map(),
        groupUserLinkMap: new Map(),
        userHistoryMap: new Map(),
        groupHistoryMap: new Map(),
        announceHistoryMap: new Map(),
        msgLockMap: new Map(),
        userInfoMap: new Map(),
        userCredentialMap: new Map(),
        accountGeneratorMap: new Map(),
        friendLinkMap: new Map(),
        contactMap: new Map(),
        addressInfoMap: new Map(),
        userChatMap: new Map(),
        groupChatMap: new Map(),
        lastChat: [],
        lastRead: new Map(),
        setting: null
    };
};
/**
 * 注册监听事件
 */
var registerDataChange = function registerDataChange() {
    exports.register('uid', function () {
        initStore_1.initAccount(); // 登陆成功后更新当前用户的历史数据
    });
    exports.register('userChatMap', function () {
        initStore_1.userChatChange(); // 新的聊天数据
    });
    exports.register('userInfoMap', function () {
        initStore_1.friendChange(); // 好友数据更新
    });
    exports.register('friendLinkMap', function () {
        initStore_1.friendChange(); // 好友数据更新
    });
    exports.register('groupChatMap', function () {
        initStore_1.groupChatChange(); // 群组聊天数据更新
    });
    exports.register('groupUserLinkMap', function () {
        initStore_1.groupUserLinkChange(); // 群组用户数据更新
    });
    exports.register('lastChat', function () {
        initStore_1.lastChatChange(); // 最近会话更新
    });
    exports.register('lastRead', function () {
        initStore_1.lastReadChange(); // 已读消息游标更新
    });
    exports.register('setting', function () {
        initStore_1.settingChange();
    });
};
// ============================================ 可执行
var handlerMap = new event_1.HandlerMap();
exports.initStore();
})