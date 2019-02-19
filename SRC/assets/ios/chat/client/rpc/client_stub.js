_$define("chat/client/rpc/client_stub", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用于测试
 */
var mqtt_c_1 = require("../../../pi/net/mqtt_c");
var rpc_1 = require("../../../pi/net/rpc");
var bon_1 = require("../../../pi/util/bon");
var rpc_r_s_1 = require("../../../pi_pt/net/rpc_r.s");
var message_s_1 = require("../../server/data/rpc/message.s");
var SERVER_IP = '192.168.9.29';
// const SERVER_IP = '127.0.0.1';
var SERVER_PORT = 1234;
var createMqttClient = function createMqttClient(onSuccess, onFailure) {
    var options = {
        timeout: 3,
        keepAliveInterval: 60,
        cleanSession: false,
        useSSL: false,
        mqttVersion: 3,
        onSuccess: onSuccess,
        onFailure: onFailure
    };
    return new mqtt_c_1.Client(SERVER_IP, SERVER_PORT, 'clientId-wcd14PDgoZ', null, options);
};
var rpcFn = function rpcFn(rpcName, client, req, resp, timeout, callback) {
    var rpc = rpc_1.create(client, self.__mgr);
    rpcFunc(rpcName, rpc, req, resp, callback, timeout);
};
var rpcFunc = function rpcFunc(rpcName, rpc, req, respClass, callback, timeout) {
    rpc(rpcName, req, function (r) {
        if (!respClass || r instanceof respClass) {
            return callback(r);
        } else if (r instanceof rpc_r_s_1.Error) {
            console.log("RPCError:" + r.info);
        } else {
            console.log("RPCError:\u8FD4\u56DE\u7C7B\u578B" + r.constructor.name + "\u4E0E" + respClass.name + "\u7C7B\u578B\u4E0D\u5339\u914D\uFF01");
        }
    }, timeout);
};
exports.callRemoteRpc = function (rpcName, rpcRequest, rpcResponseType, callback) {
    var timeout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1000;

    var mqttClient = createMqttClient(function () {
        rpcFn(rpcName, mqttClient, rpcRequest, rpcResponseType, timeout, callback);
    }, function (error) {
        console.log(error);
    });
};
exports.subscribeChannel = function (channelId) {
    var mqttClient = createMqttClient(function () {
        mqttClient.onMessage(function (topic, payload) {
            if (topic === channelId) {
                var bon = new bon_1.BonBuffer(payload);
                var message = new message_s_1.UserSend();
                message.bonDecode(bon);
                console.log('received message: ', message);
            }
        });
        mqttClient.subscribe(channelId, {
            qos: 0,
            onSuccess: function onSuccess() {
                console.log('sub to channel success: ', channelId);
            },
            onFailure: function onFailure(e) {
                console.log(e);
            }
        });
    }, function (error) {
        console.log(error);
    });
};
})