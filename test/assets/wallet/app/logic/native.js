_$define("app/logic/native", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var imagePicker_1 = require("../../pi/browser/imagePicker");
var qrcode_1 = require("../../pi/browser/qrcode");
var systemInfoProvider_1 = require("../../pi/browser/systemInfoProvider");
var webViewHelper_1 = require("../../pi/browser/webViewHelper");
var root_1 = require("../../pi/ui/root");
/**
 * 一些底层操作
 */
exports.selectImage = function (ok, cancel) {
    console.log('选择图片');
    var close = root_1.popNew('app-components1-loading-loading', { text: '导入中...' });
    var image = new imagePicker_1.ImagePicker();
    image.init();
    image.selectFromLocal({
        success: function success(width, height, result) {
            ok && ok(width, height, result);
            close.callback(close.widget);
        },
        fail: function fail(result) {
            cancel && cancel(result);
            close.callback(close.widget);
            root_1.popNew('app-components-message-message', { content: '导入失败' });
        },
        useCamera: 1,
        single: 1,
        max: 1
    });
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
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '测试';

    var newWebView = new webViewHelper_1.WebViewHelper();
    newWebView.init();
    newWebView.open({
        success: function success(result) {},
        fail: function fail(result) {},
        loadUrl: url,
        title: title
    });
};
/**
 * 获取设备信息
 */
exports.getDeviceInfo = function () {
    var systemInfo = new systemInfoProvider_1.SystemInfoProvider();
    systemInfo.init();
    systemInfo.getDeviceInfo({
        success: function success(result) {
            console.log('获取设备的系统信息成功\t' + result);
        },
        fail: function fail(result) {
            console.log('获取设备的系统信息失败\t' + result);
        }
    });
};
})