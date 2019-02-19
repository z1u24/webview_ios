_$define("app/logic/native", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 一些底层操作
 */
var device_1 = require("../../pi/browser/device");
var imagePicker_1 = require("../../pi/browser/imagePicker");
var qrcode_1 = require("../../pi/browser/qrcode");
var shareToPlatforms_1 = require("../../pi/browser/shareToPlatforms");
var webview_1 = require("../../pi/browser/webview");
var root_1 = require("../../pi/ui/root");
var memstore_1 = require("../store/memstore");
exports.selectImage = function (ok, cancel) {
    console.log('选择图片');
    var imagePicker = new imagePicker_1.ImagePicker();
    imagePicker.init();
    imagePicker.selectFromLocal({
        success: function success(width, height, url) {
            ok && ok(width, height, url);
            close && close.callback(close.widget);
        },
        fail: function fail(result) {
            cancel && cancel(result);
            close && close.callback(close.widget);
        },
        useCamera: 1,
        single: 1,
        max: 1
    });
    var close = void 0;
    setTimeout(function () {
        close = root_1.popNew('app-components1-loading-loading', { text: { zh_Hans: '导入中...', zh_Hant: '導入中...', en: '' } });
    }, 100);
    return imagePicker;
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
 * 获取设备信息
 */
exports.getDeviceId = function (okCB) {
    var deviceIdProvider = new device_1.DeviceIdProvider();
    deviceIdProvider.getUUId(function (result) {
        console.log("\u83B7\u53D6\u8BBE\u5907\u7684\u552F\u4E00id\u6210\u529F" + JSON.stringify(result));
        okCB && okCB(result);
    });
};
/**
 * 获取设备信息
 */
exports.getDeviceInfo = function (okCB, errCB) {
    var systemInfo = new SystemInfoProvider();
    systemInfo.init();
    systemInfo.getDeviceInfo({
        success: function success(result) {
            console.log("\u83B7\u53D6\u8BBE\u5907\u7684\u4FE1\u606F\u6210\u529F" + JSON.stringify(result));
            okCB && okCB(result);
        },
        fail: function fail(result) {
            console.log("\u83B7\u53D6\u8BBE\u5907\u7684\u4FE1\u606F\u5931\u8D25" + JSON.stringify(result));
            errCB && errCB(result);
        }
    });
};
/**
 * 截屏
 */
exports.makeScreenShot = function (okCB, errCB) {
    var stp = new shareToPlatforms_1.ShareToPlatforms();
    stp.init();
    stp.makeScreenShot({
        success: function success(result) {
            okCB && okCB(result);
        },
        fail: function fail(result) {
            errCB && errCB(result);
        }
    });
};
/**
 * 获取屏幕刘海与下部分高度
 */
exports.getScreenModify = function () {
    webview_1.WebViewManager.getScreenModify(function (high, low) {
        var calHigh = high / window.devicePixelRatio * 2;
        var calLow = low / window.devicePixelRatio * 2;
        memstore_1.setStore('setting/topHeight', calHigh);
        memstore_1.setStore('setting/bottomHeight', calLow);
    });
};
})