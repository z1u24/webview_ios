_$define("pi_pt/rust/pi_crypto/ed25519", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var hash_value_1 = require("../hash_value");
var hash_value_2 = require("../hash_value");
/**
 * @param public_key:&[u8]
 * @param private_key:&[u8]
 * @return hash_value::H256
 */
exports.exchange = function (public_key, private_key) {
  var result = vm_1.call(266558349, [public_key, private_key]);
  result = new hash_value_1.H256(result);
  return result;
};
/**
 * @param seed:&[u8]
 * @return (hash_value::H512,hash_value::H256)
 */
exports.keypair = function (seed) {
  var result = vm_1.call(2282179587, [seed]);
  result[0] = new hash_value_2.H512(result[0]);
  result[1] = new hash_value_1.H256(result[1]);
  return result;
};
/**
 * @param message:&[u8]
 * @param secret_key:&[u8]
 * @return hash_value::H512
 */
exports.sign = function (message, secret_key) {
  var result = vm_1.call(1005885597, [message, secret_key]);
  result = new hash_value_2.H512(result);
  return result;
};
/**
 * @param message:&[u8]
 * @param public_key:&[u8]
 * @param signature:&[u8]
 * @return bool
 */
exports.verify = function (message, public_key, signature) {
  return vm_1.call(1115867356, [message, public_key, signature]);
};
})