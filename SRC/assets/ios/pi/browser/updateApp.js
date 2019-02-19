_$define("pi/browser/updateApp", function (require, exports, module){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("./native");
/**
 * 版本文件内容如下，其中：主版本或次版本变动必须强制更新；更新版本变动，可以让用户选择是否更新
 * {
 *     version: 主版本.次版本.更新版本.其他信息
 *     appName: "****.apk" | "****.ipa"
 * }
 */
var VERSION_FILE_NAME = "version.json";

var AppUpdater = function (_native_1$NativeObjec) {
    _inherits(AppUpdater, _native_1$NativeObjec);

    function AppUpdater(url) {
        _classCallCheck(this, AppUpdater);

        var _this2 = _possibleConstructorReturn(this, (AppUpdater.__proto__ || Object.getPrototypeOf(AppUpdater)).call(this));

        _this2.url = url;
        return _this2;
    }

    _createClass(AppUpdater, [{
        key: "getVersions",
        value: function getVersions() {
            var _this3 = this;

            this.localVersion = new Promise(function (resolve) {
                _this3.call("getVersion", {
                    success: function success(version) {
                        var result = version.split(".");
                        resolve(result);
                    }
                });
            });
            var _this = this;
            this.remoteVersion = fetch(this.url + "/" + VERSION_FILE_NAME).then(function (res) {
                return res.json();
            }).then(function (_ref) {
                var version = _ref.version,
                    appName = _ref.appName;

                var result = version.split(".");
                _this.appName = appName;
                return result;
            });
        }
    }, {
        key: "needUpdate",
        value: function needUpdate(cb) {
            Promise.all([this.localVersion, this.remoteVersion]).then(function (_ref2) {
                var _ref3 = _slicedToArray(_ref2, 2),
                    local = _ref3[0],
                    remote = _ref3[1];

                var forceUpdate = false;
                var needUpdate = false;
                forceUpdate = local[0] !== remote[0] || local[1] !== remote[1];
                needUpdate = forceUpdate || local[2] !== remote[2];
                cb({
                    needUpdate: needUpdate,
                    forceUpdate: forceUpdate,
                    localVersion: local,
                    remoteVersion: remote
                });
            }).catch(function () {
                cb({
                    needUpdate: false,
                    forceUpdate: false,
                    localVersion: ["0", "0", "0", "0"],
                    remoteVersion: ["0", "0", "0", "0"]
                });
            });
        }
    }, {
        key: "updateApp",
        value: function updateApp() {
            var _this4 = this;

            var _this = this;
            Promise.all([this.localVersion, this.remoteVersion]).then(function () {
                _this4.call("updateApp", {
                    url: _this.url + "/" + _this.appName
                });
            });
        }
    }]);

    return AppUpdater;
}(native_1.NativeObject);

native_1.registerSign(AppUpdater, {
    updateApp: [{
        name: "url",
        type: native_1.ParamType.String
    }],
    getVersion: []
});
// ======================= implements
var updater = undefined;
exports.setServerUrl = function (url) {
    if (updater) {
        throw new Error("Updater is even set url");
    }
    updater = new AppUpdater(url);
    updater.init();
    updater.getVersions();
};
/**
 * cb({
 *    localVersion: [],
 *    remoteVersion: [],
 *    needUpdate: true | false,
 *    forceUpdate: true | flase
 * })
 */
exports.needUpdate = function (cb) {
    if (!updater) {
        throw new Error("updater App needUpdate failed, url havn't set");
    }
    updater.needUpdate(cb);
};
exports.updateApp = function () {
    if (!updater) {
        throw new Error("updater App failed, url havn't set");
    }
    updater.updateApp();
};
})