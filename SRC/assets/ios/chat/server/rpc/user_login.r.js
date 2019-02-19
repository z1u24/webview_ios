_$define("chat/server/rpc/user_login.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var user_login_s_1 = require("./user_login.s");
var js_net_1 = require("../../../pi_pt/rust/pi_serv/js_net");
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
//#[rpc=rpcServer]
exports.userLogin = function (userLoginRequest) {
    var mqttServer = rpc_server_1.getEnv().getNativeObject("mqttServer");
    var uid = userLoginRequest.uid;
    // TODO: how to delete topic when user offline ?
    js_net_1.setMqttTopic(mqttServer, uid, true, true);
    // this is only for test purpose
    if (uid === 'group') {
        js_net_1.setMqttTopic(mqttServer, 'gid-123', true, true);
    }
    var response = new user_login_s_1.userLoginResponse();
    response.ack = true;
    return response;
};
})