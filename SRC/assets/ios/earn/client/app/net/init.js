_$define("earn/client/app/net/init", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================ 导入
var ipConfig_1 = require("../../../../app/ipConfig");
var memstore_1 = require("../../../../app/store/memstore");
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var bon_1 = require("../../../../pi/util/bon");
var autologin_1 = require("./autologin");
var rpc_1 = require("./rpc");
// import { initPush } from './receive';
// ================================================ 导出
exports.sourceIp = ipConfig_1.activeLogicIp;
exports.sourcePort = ipConfig_1.activeLogicPort;
/**
 * 客户端初始化
 */
exports.initClient = function () {
    if (!rootClient) {
        mqtt = new autologin_1.AutoLoginMgr(exports.sourceIp, exports.sourcePort);
        rootClient = mqtt.connection(function () {
            rpc_1.goLoginActivity();
        });
    }
    // initPush();
};
// 登录
exports.login = function (userType, user, pwd, cb) {
    mqtt.login(userType, user, pwd, cb);
};
/**
 * rpc 调用
 * @param name  method name
 * @param req request
 * @param callback  callback
 * @param timeout  timeout
 */
exports.clientRpcFunc = function (name, req, callback) {
    var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2000;

    if (!clientRpc) {
        if (mqtt.getState()) {
            clientRpc = mqtt.getRpc();
        } else {
            return;
        }
    }
    if (!mqtt.getState()) {
        console.log("\u7F51\u7EDC\u8FDE\u63A5\u4E2D\uFF01\uFF01\uFF01\uFF01");
        return;
    }
    clientRpc(name, req, function (r) {
        if (!r) {
            console.log(name + " \u5931\u8D25\u4E86\uFF0C\u8FD4\u56DE\u7ED3\u679C " + r);
        } else {
            return callback(r);
        }
    }, timeout);
};
/**
 * 注册了所有可以rpc调用的结构体
 * @param fileMap file map
 */
exports.registerRpcStruct = function (fileMap) {
    if (!self.__mgr) {
        self.__mgr = new struct_mgr_1.StructMgr();
    }
    for (var k in fileMap) {
        if (!k.endsWith('.s.js')) {
            continue;
        }
        var filePath = k.slice(0, k.length - pi_modules.butil.exports.fileSuffix(k).length - 1);
        var exp = pi_modules[filePath] && pi_modules[filePath].exports;
        for (var kk in exp) {
            if (struct_mgr_1.Struct.isPrototypeOf(exp[kk]) && exp[kk]._$info && exp[kk]._$info.name) {
                if (!self.__mgr.lookup(exp[kk]._$info.name_hash)) {
                    self.__mgr.register(exp[kk]._$info.name_hash, exp[kk], exp[kk]._$info.name);
                }
            }
        }
    }
};
/**
 * 订阅主题
 * @param platerTopic topic
 * @param cb callback
 */
exports.subscribe = function (platerTopic, returnStruct, cb) {
    var subMgr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    if (!rootClient) return;
    var option = {
        qos: 0,
        onSuccess: function onSuccess() {
            console.log('subsuccess!===============================', platerTopic);
        },
        onFailure: function onFailure(e) {
            console.log('subfail!=============================== ', e);
        }
    };
    rootClient.onMessage(function (topic, payload) {
        if (topic === platerTopic) {
            var o = new bon_1.BonBuffer(payload).readBonCode(returnStruct);
            cb(o);
            console.log('listen db success!', o);
        }
    });
    rootClient.subscribe(platerTopic, option); // 订阅主题
    subMgr && mqtt.subMgr.update(platerTopic, returnStruct, cb);
};
/**
 * 取消订阅主题
 * @param platerTopic topic
 * @param cb callback
 */
exports.unSubscribe = function (platerTopic) {
    if (!rootClient) return;
    rootClient.unsubscribe(platerTopic); // 订阅主题
    mqtt.subMgr.del(platerTopic);
};
// ================================================ 本地
// MQTT管理
var mqtt = void 0;
// 客户端
var rootClient = void 0;
// root RPC
var clientRpc = void 0;
// 监听wallet登录
memstore_1.register('user/isLogin', function (isLogin) {
    if (isLogin) {
        exports.initClient();
    }
});
})