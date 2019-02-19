_$define("pi/browser/zxing", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var event_1 = require("./event");
var callback = void 0;
exports.start = function (cb) {
    if (callback) {
        return false;
    }
    callback = cb;
    event_1.callNative('YNZxing', 'startActivityForResult');
    return true;
};
/* tslint:disable:variable-name */
exports._callBack = function (code, msg) {
    if (callback) {
        callback(code, msg);
        callback = undefined;
    }
};
})