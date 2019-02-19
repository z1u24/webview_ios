_$define("chat/client/app/logic/native", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 一些底层操作
 */
var audio_recorder_1 = require("../../../../pi/browser/audio_recorder");
var cameraPicker_1 = require("../../../../pi/browser/cameraPicker");
var imagePicker_1 = require("../../../../pi/browser/imagePicker");
var qrcode_1 = require("../../../../pi/browser/qrcode");
var webview_1 = require("../../../../pi/browser/webview");
var store_1 = require("../data/store");
var logic_1 = require("./logic");
/**
 * 选择图片
 */
exports.selectImage = function (ok, cancel) {
    console.log('选择图片');
    var image = new imagePicker_1.ImagePicker();
    image.init();
    image.selectFromLocal({
        success: function success(width, height, url) {
            ok && ok(width, height, url);
        },
        fail: function fail(result) {
            cancel && cancel(result);
        },
        useCamera: 0,
        single: 1,
        max: 1
    });
    return image;
};
/**
 * 打开照相机
 */
exports.openCamera = function (ok, cancel) {
    console.log('打开照相机');
    var camera = new cameraPicker_1.CameraPicker();
    camera.init();
    camera.takePhoto({
        success: function success(res) {
            ok && ok(res);
        },
        fail: function fail(result) {
            cancel && cancel(result);
        }
    });
    return camera;
};
/**
 * 二维码扫描
 */
exports.doScanQrCode = function (ok, cancel) {
    var qrcode = new qrcode_1.QRCode();
    qrcode.init();
    qrcode.scan({
        success: function success(res) {
            ok && ok(res);
            console.log('scan-------------', res);
        },
        fail: function fail(r) {
            cancel && cancel();
            console.log("scan fail:" + r);
        }
    });
    qrcode.close({
        success: function success(r) {
            console.log("close result:" + r);
        }
    });
};
/**
 * 打开新网页
 */
exports.openNewActivity = function (url) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    webview_1.WebViewManager.open(title, url + "?" + Math.random(), title, '');
};
/**
 * 语音录制开始
 */
var recorder = new audio_recorder_1.AudioRecorder();
exports.startRadio = function () {
    recorder.start(function (success) {
        if (success) {
            console.log('录音开始');
        } else {
            logic_1.bottomNotice('录音开始，录制失败');
        }
    });
};
/**
 * 语音录制结束
 */
exports.endRadio = function (cb) {
    recorder.stop(function (data) {
        if (data) {
            cb(data);
            console.log('录音结束');
        } else {
            logic_1.bottomNotice('录音结束，传送失败');
        }
    });
};
exports.getChatUid = function () {
    return store_1.getStore('uid');
};
})