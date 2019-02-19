_$define("pi/browser/speech_recognition", function (require, exports, module){
"use strict";
/**
 * 语音识别：语音变文字
 */

Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("./event");
var callback = void 0;
/**
 * @todo 目前的语音识别，停止说话后，就会结束；还没有考虑按着一直说的功能
 */
exports.start = function (cb) {
    if (callback) {
        return false;
    }
    callback = cb;
    event_1.callNative('YNSpeech', 'startListening');
    return true;
};
/**
 * 语音识别停止录音，但是识别将继续。
 */
exports.stop = function () {
    event_1.callNative('YNSpeech', 'stopListening');
};
/**
 * 语音识别取消录音，识别也取消。
 */
exports.cancel = function () {
    callback = undefined;
    event_1.callNative('YNSpeech', 'cancelListening');
};
/**
 * 语音识别销毁，释放资源
 */
exports.desdroty = function () {
    callback = undefined;
    event_1.callNative('YNSpeech', 'destroyListening');
};
/**
 * 语音回调函数
 * code: 为0代表成功，此时msg代表识别的字符串
 * code: 其他代表失败，此时msg代表错误信息
 */
/* tslint:disable:variable-name */
exports._callback = function (code, msg) {
    if (callback) {
        callback(code, msg);
        callback = undefined;
    }
};
})