_$define("pi/browser/bluetooth", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 蓝牙打印机模块
 *
 */
var base64_1 = require("../util/base64");
var event_1 = require("./event");
/**
 * java回调类型
 * FindAdapter:打印机寻找回调类型
 * ConnectSocket:打印机连接回调类型
 */
var CallbackType;
(function (CallbackType) {
    CallbackType[CallbackType["FindAdapter"] = 0] = "FindAdapter";
    CallbackType[CallbackType["ConnectSocket"] = 1] = "ConnectSocket";
    CallbackType[CallbackType["OnResumeType"] = 2] = "OnResumeType";
    CallbackType[CallbackType["StateReceiver"] = 3] = "StateReceiver";
    CallbackType[CallbackType["WriteType"] = 4] = "WriteType";
})(CallbackType || (CallbackType = {}));
/**
 * 蓝牙打印机
 */
var findCallback = void 0;
var OnResumeCallback = void 0;
var StateReceiverCallback = void 0;
var WriteCallback = void 0;
var gID = 10;
var isInit = false;
var connectCBMap = {};
if (!isInit) {
    isInit = true;
    event_1.callNative('YNBlueTooth', 'blueToothInit');
}

var Bluetooth = function () {
    function Bluetooth() {
        _classCallCheck(this, Bluetooth);

        this.socketID = '';
        if (!isInit) {
            isInit = true;
            event_1.callNative('YNBlueTooth', 'blueToothInit');
        }
    }

    _createClass(Bluetooth, [{
        key: "isOpen",
        value: function isOpen() {
            if (!isInit) {
                throw new Error('blueTooth.isBluetoothOn = false call: uninit');
            }
            return event_1.callNative('YNBlueTooth', 'isBluetoothOn');
        }
        /**
         * 蓝牙弹窗打开
         */

    }, {
        key: "open",
        value: function open() {
            event_1.callNative('YNBlueTooth', 'bluetoothOpen');
        }
        /**
         * 蓝牙跳转系统打开
         */

    }, {
        key: "openSystem",
        value: function openSystem() {
            event_1.callNative('YNBlueTooth', 'bluetoothOpenSystem');
        }
        /**
         * 蓝牙从所有已配对设备中找出打印设备，并返回设备名字的java数组
         */

    }, {
        key: "fillAdapter",
        value: function fillAdapter(cb) {
            if (this.isOpen()) {
                findCallback = cb;
                event_1.callNative('YNBlueTooth', 'blueToothFillAdapter');
            } else {
                cb(-1);
            }
        }
        /**
         * 蓝牙socket连接，判断传入的下标对应的名字是否正确，正确才会尝试连接
         */

    }, {
        key: "connectSocket",
        value: function connectSocket(code, name, address, cb) {
            if (this.isOpen()) {
                this.connectCBID = ++gID;
                this.connectCB = cb;
                connectCBMap[this.connectCBID] = this;
                event_1.callNative('YNBlueTooth', 'blueToothConnectSocket', code, name, address, this.connectCBID);
            } else {
                cb(-1);
            }
        }
        /**
         * 蓝牙写flush
         */

    }, {
        key: "flush",
        value: function flush() {
            event_1.callNative('YNBlueTooth', 'blueToothFlush', this.socketID);
        }
        /**
         * 蓝牙写write
         */

    }, {
        key: "writeString",
        value: function writeString(info) {
            event_1.callNative('YNBlueTooth', 'blueToothWriteString', info, this.socketID);
        }
        /**
         * 蓝牙写byte数组
         */

    }, {
        key: "writeBytes",
        value: function writeBytes(bytes) {
            var param = base64_1.arrayBufferToBase64(bytes.buffer);
            event_1.callNative('YNBlueTooth', 'blueToothWriteBytes', param, this.socketID);
        }
        /**
         * 蓝牙打印整数
         */

    }, {
        key: "writeInt",
        value: function writeInt(i) {
            event_1.callNative('YNBlueTooth', 'blueToothWriteInt', i, this.socketID);
        }
        /**
         * 蓝牙改变字符串编码方式，默认info = "GBK"
         */

    }, {
        key: "setEncodeChar",
        value: function setEncodeChar(info) {
            event_1.callNative('YNBlueTooth', 'setEncodeChar', info, this.socketID);
        }
        /**
         * 蓝牙socket关闭
         */

    }, {
        key: "closeSocket",
        value: function closeSocket() {
            event_1.callNative('YNBlueTooth', 'blueToothCloseSocket', this.socketID);
            this.socketID = '';
            delete connectCBMap[this.socketID];
        }
        /**
         * 蓝牙改变UUID,默认UUID为打印机通用uid = "00001101-0000-1000-8000-00805F9B34FB"
         */

    }, {
        key: "setUUID",
        value: function setUUID(uid) {
            event_1.callNative('YNBlueTooth', 'blueToothChangeUUID', uid);
        }
        /**
         * getGBK
         */

    }, {
        key: "getGbk",
        value: function getGbk(info) {
            var s = event_1.callNative('YNBlueTooth', 'blueToothGetGbk', info);
            return new Uint8Array(base64_1.base64ToArrayBuffer(s));
        }
        /**
         * onResultActivity
         */

    }, {
        key: "setResumeCallback",
        value: function setResumeCallback(cb) {
            OnResumeCallback = cb;
        }
        /**
         * setStateReceiverback
         */

    }, {
        key: "setStateReceiverback",
        value: function setStateReceiverback(cb) {
            StateReceiverCallback = cb;
        }
        /**
         * setWriteReceiverback
         */

    }, {
        key: "setWriteReceiverback",
        value: function setWriteReceiverback(cb) {
            WriteCallback = cb;
        }
    }]);

    return Bluetooth;
}();

exports.Bluetooth = Bluetooth;
/**
 * 蓝牙回调函数
 * code: 为0代表成功，此时msg代表识别的字符串
 * code: 其他代表失败，此时msg代表错误信息
 */
exports.blueToothCallback = function (cbType, code, msg) {
    var userParam = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    var cb = void 0;
    switch (cbType) {
        case CallbackType.FindAdapter:
            cb = findCallback;
            break;
        case CallbackType.ConnectSocket:
            var obj = connectCBMap[userParam];
            if (obj) {
                if (code === 0) obj.socketID = msg;
                obj.connectCB(code, msg);
            }
            break;
        case CallbackType.OnResumeType:
            cb = OnResumeCallback;
            break;
        case CallbackType.StateReceiver:
            cb = StateReceiverCallback;
            break;
        case CallbackType.WriteType:
            cb = WriteCallback;
            break;
        default:
    }
    if (isInit && cb) {
        cb(code, msg);
    }
};
})