_$define("pi_pt/rust/pi_serv/util", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var vec_1 = require("../def/vec");
/**
 * @param path:&str
 * @return Vec<u8>
 */
exports.readFile = function (path) {
  var result = vm_1.call(2239806005, [path]);
  result = new vec_1.Vec(result);
  return result;
};
})