_$define("pi_pt/util", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.printlnU8 = function (data) {
    var r = "\n[";
    for (var i = 0; i < data.length; i++) {
        r += data[i] + ",";
    }
    r += "]";
    console.log(r);
};
})