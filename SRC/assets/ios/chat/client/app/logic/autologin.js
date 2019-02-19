_$define("chat/client/app/logic/autologin", function (require, exports, module){
"use strict";
/**
 * 自动登录
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
// =====================================导入
var walletStore = require("../../../../../app/store/memstore");
var mqtt_c_1 = require("../../../../pi/net/mqtt_c");
var rpc_1 = require("../../../../pi/net/rpc");
var session_p_1 = require("../../../server/rpc/session.p");
var session_s_1 = require("../../../server/rpc/session.s");
var store = require("../data/store");
var init_1 = require("../net/init");
var init_1_1 = require("../net/init_1");
var receive_1 = require("../net/receive");
var rpc_2 = require("../net/rpc");
// 用户类型
var UserType;
(function (UserType) {
    UserType[UserType["DEF"] = 1] = "DEF";
    UserType[UserType["WALLET"] = 2] = "WALLET";
})(UserType = exports.UserType || (exports.UserType = {}));
// 重登录状态
var ReLoginState;
(function (ReLoginState) {
    ReLoginState[ReLoginState["START"] = 0] = "START";
    ReLoginState[ReLoginState["ING"] = 1] = "ING";
    ReLoginState[ReLoginState["END"] = 2] = "END";
    ReLoginState[ReLoginState["ERROR"] = 3] = "ERROR";
})(ReLoginState = exports.ReLoginState || (exports.ReLoginState = {}));
// 自动登录管理

var AutoLoginMgr = function () {
    function AutoLoginMgr(server, port) {
        _classCallCheck(this, AutoLoginMgr);

        this.conState = false;
        this.server = server ? server : '127.0.0.1';
        this.port = port ? port : 9080;
        this.subMgr = new SubMgr();
    }
    // 连接服务器


    _createClass(AutoLoginMgr, [{
        key: "connection",
        value: function connection() {
            var _this = this;

            var options = {
                reconnect: true,
                timeout: 3,
                keepAliveInterval: 30,
                cleanSession: false,
                useSSL: false,
                mqttVersion: 3,
                onSuccess: function onSuccess() {
                    _this.clientRpc = rpc_1.create(_this.rootClient, self.__mgr);
                    console.log('reconnect 连接成功！！！！！！！');
                    // 连接成功
                    _this.conState = true;
                    var wLogin = walletStore.getStore('user/isLogin', false); // 钱包是否已经登陆
                    var cLogin = store.getStore('uid', 0); // 聊天是否已经登陆
                    if (wLogin && !cLogin) {
                        init_1_1.walletSignIn();
                    }
                    if (_this.relogin === ReLoginState.START) {
                        console.log("\u8FDE\u63A5\u6210\u529F\uFF01\uFF01\uFF01");
                        _this.relogin = ReLoginState.ING;
                        _this.autoLogin();
                    } else if (_this.relogin === ReLoginState.ING) {
                        console.log("\u91CD\u65B0\u6253\u5F00APP\uFF01\uFF01\uFF01");
                    }
                },
                onFailure: function onFailure(r) {
                    console.log('connect fail', r);
                }
            };
            // rootClient = new Client('127.0.0.1', 1234, 'clientId-wcd14PDgoZ', null, options);
            var client = new mqtt_c_1.Client(this.server, this.port, 'clientId-wcd14PDgoZ', null, options);
            this.rootClient = client;
            client.setOnConnectionLost(function (r) {
                // 连接断开调用
                console.log("\u8FDE\u63A5\u65AD\u5F00\uFF01\uFF01\uFF01");
                _this.conState = false;
                _this.relogin = ReLoginState.START;
            });
            return client;
        }
        // 重连

    }, {
        key: "reconnect",
        value: function reconnect() {
            if (this.rootClient) {
                this.rootClient.reconnect();
            }
        }
        // 获取MATT客户端

    }, {
        key: "getClient",
        value: function getClient() {
            return this.rootClient;
        }
        // 获取rpc方法

    }, {
        key: "getRpc",
        value: function getRpc() {
            return this.clientRpc;
        }
        // 登录

    }, {
        key: "login",
        value: function login(userType, user, pwd, cb) {
            var _this2 = this;

            this.userType = userType;
            this.user = user;
            this.pwd = pwd;
            this.loginCb = cb;
            if (userType === UserType.DEF) {
                rpc_2.login(Number(user), pwd, function (r) {
                    _this2.uid = r.uid.toString();
                    receive_1.initReceive(r.uid);
                    // 获取自动登录凭证
                    _this2.getToken();
                    cb(r);
                });
            } else if (userType === UserType.WALLET) {
                rpc_2.walletLogin(user, pwd, function (r) {
                    _this2.uid = r.uid.toString();
                    receive_1.initReceive(r.uid);
                    // 获取自动登录凭证
                    _this2.getToken();
                    cb(r);
                });
            }
        }
        // 获取TOKEN

    }, {
        key: "getToken",
        value: function getToken() {
            var _this3 = this;

            var token = new session_s_1.GetToken();
            token.uid = this.uid;
            init_1.clientRpcFunc(session_p_1.getToken, token, function (r) {
                console.log('!!!!!!!!!!!!!!token:', r);
                // this.autoLogin(uid, r.token);
                _this3.token = r.token;
            });
        }
        // 自动登录

    }, {
        key: "autoLogin",
        value: function autoLogin() {
            var _this4 = this;

            var login = new session_s_1.AutoLogin();
            login.token = this.token;
            login.uid = this.uid;
            init_1.clientRpcFunc(session_p_1.auto_login, login, function (r) {
                console.log('!!!!!!!!!!!!!!token:', r);
                if (r.code === 1) {
                    _this4.relogin = ReLoginState.END;
                    // 重新订阅topic
                    _this4.subMgr.reSubs();
                } else {
                    _this4.relogin = ReLoginState.ERROR;
                    // 登录
                    _this4.login(_this4.userType, _this4.user, _this4.pwd, _this4.loginCb);
                    // 重新订阅topic
                    _this4.subMgr.reSubs();
                }
            });
        }
        // 设置连接状态

    }, {
        key: "setState",
        value: function setState(state) {
            this.conState = state;
        }
        // 获取连接状态

    }, {
        key: "getState",
        value: function getState() {
            return this.conState;
        }
    }]);

    return AutoLoginMgr;
}();

exports.AutoLoginMgr = AutoLoginMgr;
// 订阅主题管理

var SubMgr = function () {
    function SubMgr() {
        _classCallCheck(this, SubMgr);

        this.subs = new Map();
    }
    // 更新订阅主题


    _createClass(SubMgr, [{
        key: "update",
        value: function update(topic, returnStruct, cb) {
            this.subs.set(topic, { returnStruct: returnStruct, cb: cb });
        }
        // 移除订阅主题

    }, {
        key: "del",
        value: function del(topic) {
            this.subs.delete(topic);
        }
        // 获取主题map

    }, {
        key: "getSubs",
        value: function getSubs() {
            return this.subs;
        }
        // 重新定义所有主题

    }, {
        key: "reSubs",
        value: function reSubs() {
            var map = this.subs;
            map.forEach(function (value, topic, _map) {
                var returnStruct = value.returnStruct;
                var cb = value.cb;
                init_1.subscribe(topic, returnStruct, cb, false);
            });
        }
    }]);

    return SubMgr;
}();
})