_$define("pi_pt/rust/pi_crypto/hash", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var bigInt = require("../../../pi/bigint/biginteger");
var util_1 = require("../../../pi/bigint/util");
var hash_value_1 = require("../hash_value");
var hash_value_2 = require("../hash_value");
var hash_value_3 = require("../hash_value");
/// RIPEMD160
/**
 * @param input:&[u8]
 * @return hash_value::H160
 */
exports.ripemd160 = function (input) {
  var result = vm_1.call(1476345609, [input]);
  result = new hash_value_1.H160(result);
  return result;
};
/// Sha3-Keccak256
/**
 * @param input:&[u8]
 * @return hash_value::H256
 */
exports.keccak256 = function (input) {
  var result = vm_1.call(2108893530, [input]);
  result = new hash_value_2.H256(result);
  return result;
};
/// Sha3-Keccak256 and RIPEMD160
/**
 * @param input:&[u8]
 * @return hash_value::H160
 */
exports.dhash160 = function (input) {
  var result = vm_1.call(842379557, [input]);
  result = new hash_value_1.H160(result);
  return result;
};
/// Double Sha3-Keccak256
/**
 * @param input:&[u8]
 * @return hash_value::H256
 */
exports.dhash256 = function (input) {
  var result = vm_1.call(1125159944, [input]);
  result = new hash_value_2.H256(result);
  return result;
};
/// SipHash-2-4
/**
 * @param key0:u64
 * @param key1:u64
 * @param input:&[u8]
 * @return u64
 */
exports.siphash24 = function (key0, key1, input) {
  key0 = util_1.u64ToBuffer(key0);
  key1 = util_1.u64ToBuffer(key1);
  var result = vm_1.call(796485226, [key0, key1, input]);
  result = bigInt(result);
  return result;
};
/// Data checksum
/**
 * @param data:&[u8]
 * @return hash_value::H32
 */
exports.checksum = function (data) {
  var result = vm_1.call(235181891, [data]);
  result = new hash_value_3.H32(result);
  return result;
};
})