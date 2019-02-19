_$define("pi/browser/speech_synthesizer", function (require, exports, module){
"use strict";
/**
 * 语音合成：文字变语音
 */

Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("./event");
var isInit = false;
var callback = void 0;
/**
 * 语音合成开始播放
 * @param info 合成字符串
 * @param callback 语音合成回调，参数:1.code,2.msg
 */
exports.start = function (info, cb) {
    if (callback) {
        return false;
    }
    if (!isInit) {
        event_1.callNative('YNSpeech', 'speechInit');
        isInit = true;
    }
    callback = cb;
    event_1.callNative('YNSpeech', 'speechPlay', info);
    return true;
};
/**
 * 语音合成停止播放
 */
exports.stop = function () {
    if (!isInit) {
        throw new Error('SpeechSynthesizer.stop invaid call: uninit');
    }
    event_1.callNative('YNSpeech', 'speechStop');
};
/**
 *  语音合成暂停播放
 */
exports.pause = function () {
    if (!isInit) {
        throw new Error('SpeechSynthesizer.pause invaid call: uninit');
    }
    event_1.callNative('YNSpeech', 'speechPause');
};
/**
 *  语音合成继续播放
 */
exports.resume = function () {
    if (!isInit) {
        throw new Error('SpeechSynthesizer.resume invaid call: uninit');
    }
    event_1.callNative('YNSpeech', 'speechResume');
};
/**
 * 语音回调函数
 * code: 为0代表成功，其他数值代表失败；
 * msg，当code不为0时候，msg代表错误信息
 */
/* tslint:disable:variable-name */
exports._callback = function (code, msg) {
    if (callback) {
        callback(code, msg);
        callback = undefined;
    }
};
})