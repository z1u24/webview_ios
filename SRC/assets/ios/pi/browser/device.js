_$define("pi/browser/device", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取设备信息
 */
var native_1 = require("./native");

var DeviceIdProvider = function (_native_1$NativeObjec) {
    _inherits(DeviceIdProvider, _native_1$NativeObjec);

    function DeviceIdProvider() {
        _classCallCheck(this, DeviceIdProvider);

        var _this = _possibleConstructorReturn(this, (DeviceIdProvider.__proto__ || Object.getPrototypeOf(DeviceIdProvider)).call(this));

        _this.init();
        return _this;
    }
    /* tslint:disable:function-name */
    /**
     *
     * @param success uuid：设备唯一标识  string
     */


    _createClass(DeviceIdProvider, [{
        key: "getUUId",
        value: function getUUId(success) {
            this.call('getUUId', { success: success });
        }
        /**
         *
         * @param success
         * 1.manufacturer  设备制造商 string
         * 2.model 设备名称  string
         * 3.version 系统版本号 string
         */

    }, {
        key: "getSystem",
        value: function getSystem(success) {
            this.call('getSystem', { success: success });
        }
        /**
         *
         * @param success
         * 1.total  系统总内存 string  GB
         * 2.avail  当前可用内存 string  GB
         */

    }, {
        key: "getMemSize",
        value: function getMemSize(success) {
            this.call('getMemSize', { success: success });
        }
        /**
         *
         * @param success netWorkStatus 网络状态 int 0:没有网络  1:wifi连接  2:2G  3:3G  4:4G   5:手机流量
         */

    }, {
        key: "getNetWorkStatus",
        value: function getNetWorkStatus(success) {
            this.call('getNetWorkStatus', { success: success });
        }
        /**
         *
         * @param success operator 网络供应商  string  若为空则没有sim卡
         */

    }, {
        key: "getOperatorName",
        value: function getOperatorName(success) {
            this.call('getOperatorName', { success: success });
        }
    }]);

    return DeviceIdProvider;
}(native_1.NativeObject);

exports.DeviceIdProvider = DeviceIdProvider;
native_1.registerSign(DeviceIdProvider, {
    getUUId: [],
    getSystem: [],
    getMemSize: [],
    getNetWorkStatus: [],
    getOperatorName: []
});
})