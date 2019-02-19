_$define("chat/utils/net", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var init_1 = require("../../pi_pt/init/init");
var js_net_1 = require("../../pi_pt/rust/pi_serv/js_net");
// let mqttServer = getNativeObj("mqttServer");
// mqttPublish(mqttServer, false, 0, "a/b/c", new Uint8Array([1,1,1]));
var mqttServer = init_1.getNativeObj("mqttServer"); //使用服务名取到服务的实例
js_net_1.setMqttTopic(mqttServer, "a/b/c", true, true); //注册主题，允许该主题被订阅和发布
exports.setTopic = function (topic) {
    js_net_1.setMqttTopic(mqttServer, topic, true, true);
    console.log("subscribe topic: ", topic);
};
})