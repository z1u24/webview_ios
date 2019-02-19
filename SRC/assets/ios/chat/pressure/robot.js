_$define("chat/pressure/robot", function (require, exports, module){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../../pi/util/math");
var store = require("../client/app/data/store");
var message_s_1 = require("../server/data/db/message.s");
var test_1 = require("./test");
var randomSeedMgr_1 = require("./util/randomSeedMgr");
var util_1 = require("./util/util");
// 机器人状态
var RobotState;
(function (RobotState) {
    RobotState[RobotState["RUN"] = 0] = "RUN";
    RobotState[RobotState["STOP"] = 1] = "STOP";
})(RobotState || (RobotState = {}));
/**
 * 机器人模块
 */
var test = void 0;
// 状态
var state = void 0;
// 定时器
var timer = void 0;
// 用户信息
var userInfo = void 0;
// 启动
exports.start = function (userType, user, pwd) {
    test = new test_1.Test();
    store.initStore();
    if (state !== RobotState.RUN) {
        // 登录
        test.login(userType, user, pwd, function (r) {
            userInfo = r;
            // 启动任务
            exports.task();
        });
        console.log('robot start!!!');
    }
    state = RobotState.RUN;
};
// 停止
exports.stop = function () {
    state = RobotState.STOP;
    // 清理当前定时器
    clearTimeout(timer);
};
// 加好友
exports.addFind = function () {
    // 随机添加好友
    var addUser = math_1.randomInt(10001, userInfo.uid - 1).toString();
    // 判断是否是好友，不是则添加
    var friends = (store.getStore("contactMap/" + userInfo.uid) || { friends: [] }).friends;
    if (friends.findIndex(function (item) {
        return item.toString() === addUser;
    }) === -1) {
        test.addFind(addUser);
    }
};
// 邀请入群
exports.inviteGroup = function () {
    // 获取当前的群
    var oldGroup = (store.getStore("contactMap/" + userInfo.uid) || { group: [] }).group;
    if (oldGroup.length === 0) {
        // 创建群
        test.createGroup("test" + userInfo.uid);
    }
    // 判断是否超过上限
    for (var _iterator = oldGroup, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var gid = _ref;

        var memberids = (store.getStore("groupInfoMap/" + gid) || { memberids: [] }).memberids;
        if (memberids.length <= 100) {
            var friends = (store.getStore("contactMap/" + userInfo.uid) || { friends: [] }).friends;

            var _loop = function _loop() {
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) return "break";
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) return "break";
                    _ref2 = _i2.value;
                }

                var find = _ref2;

                if (memberids.findIndex(function (item) {
                    return item === find;
                }) === -1) {
                    test.inviteGroup(gid, find);
                    return {
                        v: void 0
                    };
                }
            };

            _loop2: for (var _iterator2 = friends, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                var _ret = _loop();

                switch (_ret) {
                    case "break":
                        break _loop2;

                    default:
                        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
                }
            }
        }
    }
};
// 单聊
exports.chat = function () {
    var friends = (store.getStore("contactMap/" + userInfo.uid) || { friends: [] }).friends;
    if (friends.length === 0) return;
    // 随机选择好友
    var find = friends[math_1.randomInt(0, friends.length - 1)];
    // 随机选择发送的内容 TODO
    test.chat(find, message_s_1.MSG_TYPE.TXT, userInfo.uid + ":\u53D1\u9001\u5355\u804A\u6D4B\u8BD5");
};
// 群聊
exports.groupchat = function () {
    var groups = (store.getStore("contactMap/" + userInfo.uid) || { group: [] }).group;
    if (groups.length === 0) return;
    // 随机选择群
    var gid = groups[math_1.randomInt(0, groups.length - 1)];
    // 随机选择发送内容 TODO
    test.groupchat(gid, message_s_1.MSG_TYPE.TXT, gid + ":\u7FA4\u6D88\u606F\u6D4B\u8BD5");
};
// 任务池
exports.task = function () {
    var seedMgr = new randomSeedMgr_1.RandomSeedMgr(math_1.randomInt(1, 10000));
    // 获取任务ID
    var r = util_1.getTask(300101, seedMgr);
    console.log('获取任务ID r:', r);
    pi_modules[r.module].exports[r.func].apply(undefined, JSON.parse(r.arg));
    var sleep = 1000;
    if (state === RobotState.RUN) {
        timer = setTimeout(function () {
            exports.task();
        }, sleep);
    }
};
})