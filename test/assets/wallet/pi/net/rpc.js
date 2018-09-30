_$define("pi/net/rpc", function (require, exports, module){
"use strict";
/**
 * RPC， 远程方法调用
 * 采用 mqtt上定义的每会话的$req和$resp主题，来发送请求和接受响应
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../struct/util");
var bon_1 = require("../util/bon");
/**
 * 创建一个RPC函数
 * @example
 */
exports.create = function (client, mgr) {
    var mqttRpc = new MqttRpc(client, mgr);
    client.onMessage(function (topic, payload) {
        if (topic === "$r") {
            var bb = new bon_1.BonBuffer(payload, 0, payload.length);
            var rid = bb.readU32(); //消息开始表示此次请求的id
            var timeout = bb.readU8();
            if (mqttRpc.wait[rid]) {
                mqttRpc.wait[rid](util_1.read(bb, mgr));
                delete mqttRpc.wait[rid];
            }
        }
    });
    return function (req, callback, timeout) {
        mqttRpc.call(req, callback, timeout);
    };
};

var MqttRpc = function () {
    function MqttRpc(client, mgr) {
        _classCallCheck(this, MqttRpc);

        this.rid = 1;
        this.wait = {};
        this.client = client;
        this.mgr = mgr;
    }

    _createClass(MqttRpc, [{
        key: "call",

        //远程调用
        value: function call(req, callback, timeout) {
            var bb = new bon_1.BonBuffer();
            this.wait[this.rid] = callback;
            bb.writeU32(this.rid++);
            bb.writeU8(timeout);
            this.rid >= 0xffffffff && (this.rid = 1);
            util_1.writeBon(req, bb);
            this.client.publish(req.constructor._$info.name, bb.getBuffer(), 0, true);
        }
    }]);

    return MqttRpc;
}();
})