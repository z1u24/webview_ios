_$define("app/ipConfig", function (require, exports, module){
"use strict";
/**
 * 服务IP配置
 */

Object.defineProperty(exports, "__esModule", { value: true });
// 资源服务器ip
exports.sourceIp = pi_modules.store.exports.severIp || '127.0.0.1';
// 资源服务器port
exports.sourcePort = pi_modules.store.exports.severPort || '80';
// erlang逻辑服务器ip
// app.herominer.net
exports.erlangLogicIp = exports.sourceIp;
// erlang逻辑服务器port
exports.erlangLogicPort = '2081';
// 活动逻辑服务器ip
exports.activeLogicIp = exports.sourceIp;
// 活动逻辑服务器port
exports.activeLogicPort = 2234;
// 聊天逻辑服务器ip 
// 外网正式 39.104.203.151
exports.chatLogicIp = '39.104.203.151';
// 聊天逻辑服务器port
// 外网正式 9080
exports.chatLogicPort = 9080;
console.log('sourceIp=', exports.sourceIp);
console.log('sourcePort=', exports.sourcePort);
console.log('erlangLogicIp=', exports.erlangLogicIp);
console.log('erlangLogicPort=', exports.erlangLogicPort);
console.log('activeLogicIp=', exports.activeLogicIp);
console.log('activeLogicPort=', exports.activeLogicPort);
console.log('chatLogicIp=', exports.chatLogicIp);
console.log('chatLogicPort=', exports.chatLogicPort);
})