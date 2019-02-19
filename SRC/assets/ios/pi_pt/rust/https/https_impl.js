_$define("pi_pt/rust/https/https_impl", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
/*
* 启动http协议的指定服务器
*/
/**
 * @param handler:H
 * @param ip:Atom
 * @param port:u16
 * @param keep_alive_timeout:usize
 * @param handle_timeout:u32
 */
exports.startHttpMount = function (handler, ip, port, keep_alive_timeout, handle_timeout) {
  handler = handler.self;
  ip = ip.self;
  vm_1.call(374744388, [handler, ip, port, keep_alive_timeout, handle_timeout]);
};
/*
* 启动https协议的指定服务器
*/
/**
 * @param handler:H
 * @param ip:Atom
 * @param port:u16
 * @param keep_alive_timeout:usize
 * @param handle_timeout:u32
 * @param cert_file:Atom
 * @param key_file:Atom
 */
exports.startHttpsMount = function (handler, ip, port, keep_alive_timeout, handle_timeout, cert_file, key_file) {
  handler = handler.self;
  ip = ip.self;
  cert_file = cert_file.self;
  key_file = key_file.self;
  vm_1.call(3415190104, [handler, ip, port, keep_alive_timeout, handle_timeout, cert_file, key_file]);
};
})