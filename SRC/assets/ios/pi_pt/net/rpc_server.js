_$define("pi_pt/net/rpc_server", function (require, exports, module){
"use strict";
/**
 * _$rpc负责rpc路由，和响应结果
 * rpc函数有且仅有一个参数, 该参数必须是pi/struct/struct_mgr.Struct类型
 * rpc函数返回值类型也必须是Struct， 当无返回值时， 将默认构建一个pi/net/rpc_r.Ok的实例作为rpc的返回值， 当rpc函数内部抛出异常时， 将默认构建pi/net/rpc_r.Error的实例作为返回值
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var mgr_1 = require("../rust/pi_db/mgr");
var session_1 = require("../rust/mqtt/session");
var bon_1 = require("../../pi/util/bon");
var rpc_r_s_1 = require("./rpc_r.s");
var util_1 = require("../../pi/struct/util");
var js_net_1 = require("../rust/pi_serv/js_net");
var util_2 = require("../../pi/struct/util");
var MetaInit = require("../../pi/struct/meta_init");
var session_2 = require("../session");
var env_1 = require("../init/env");

var RpcEnv = function (_env_1$Env) {
    _inherits(RpcEnv, _env_1$Env);

    function RpcEnv(dbMgr, depend, mqttSession, session, nobjs) {
        _classCallCheck(this, RpcEnv);

        var _this = _possibleConstructorReturn(this, (RpcEnv.__proto__ || Object.getPrototypeOf(RpcEnv)).call(this, dbMgr, depend, nobjs));

        _this.mqttSession = mqttSession;
        _this.session = session;
        return _this;
    }

    _createClass(RpcEnv, [{
        key: "getMqttSession",
        value: function getMqttSession() {
            return this.mqttSession;
        }
    }, {
        key: "getSession",
        value: function getSession() {
            return this.session;
        }
    }]);

    return RpcEnv;
}(env_1.Env);

exports.RpcEnv = RpcEnv;
var env = void 0;
exports.getEnv = function () {
    return env;
};
//初始化元信息
MetaInit.init();
var structMgr = MetaInit.mgr;
exports.Path = "pi_pt/net/rpc_server";
var _$rpc = function _$rpc(topic, buffer, mgr, session, nobjs, sokectId) {
    //console.log("_$rpc------------------------------------", topic);
    var mqttSession = new session_1.Session(session);
    env = new RpcEnv(new mgr_1.Mgr(mgr), null, mqttSession, new session_2.Session(sokectId), nobjs);
    var index = topic.lastIndexOf(".");
    var mod = topic.slice(0, index) + ".r";
    var funName = topic.slice(index + 1, topic.length);
    var bb = new bon_1.BonBuffer();
    try {
        //printlnU8(buffer);
        var param = util_2.read(new bon_1.BonBuffer(buffer), structMgr);
        //printlnU8(buffer);
        var r = pi_modules[mod].exports[funName](param);
        //rcp方法可以没有返回值， 当有返回值时， 其返回值类型必须的Struct
        if (r === undefined) {
            util_1.writeBon(new rpc_r_s_1.OK(), bb);
        } else {
            util_1.write(r, bb);
        }
        //console.log("mqttRespond------------------------------------", topic);
        js_net_1.mqttRespond(mqttSession, topic, bb.getBuffer());
    } catch (error) {
        console.log("rpc_error:" + error);
        var e = new rpc_r_s_1.Error();
        e.code = 0;
        e.info = error;
        util_1.writeBon(e, bb);
        console.log("mqttRespond error------------------------------------", topic);
        js_net_1.mqttRespond(mqttSession, topic, bb.getBuffer());
        ///throw error;
    }
};
self._$rpc = _$rpc;
})