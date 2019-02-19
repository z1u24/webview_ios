_$define("pi/browser/audio_recorder", function (require, exports, module){
"use strict";
/**
 * 音频录制器，底层封
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var base64_1 = require("../util/base64");
var native_1 = require("./native");

var AudioRecorder = function (_native_1$NativeObjec) {
    _inherits(AudioRecorder, _native_1$NativeObjec);

    function AudioRecorder() {
        _classCallCheck(this, AudioRecorder);

        var _this = _possibleConstructorReturn(this, (AudioRecorder.__proto__ || Object.getPrototypeOf(AudioRecorder)).call(this));

        _this.init();
        return _this;
    }

    _createClass(AudioRecorder, [{
        key: "start",
        value: function start(cb) {
            this.call("start", {
                success: function success() {
                    cb && cb(true);
                },
                fail: function fail() {
                    cb && cb(false);
                }
            });
        }
    }, {
        key: "stop",
        value: function stop(cb) {
            this.call("stop", {
                success: function success(base64) {
                    var data = base64_1.base64ToArrayBuffer(base64);
                    cb && cb(data);
                },
                fail: function fail() {
                    cb && cb();
                }
            });
        }
    }]);

    return AudioRecorder;
}(native_1.NativeObject);

exports.AudioRecorder = AudioRecorder;
;
native_1.registerSign(AudioRecorder, {
    start: [],
    stop: []
});
// 测试是否支持AAC格式
// const accSupportPromise = (function () {
// 	if (!window.AudioContext) {
// 		return Promise.resolve(false);
// 	}
// 	// AAC数据
// 	const aacData = new Int8Array([-1, -15, -20, 64, 1, -65, -4, 0, 0, 20, 3, -23, 28, -1, -15, -20, 64, 1, -65, -4, 0, 0, 20, 3, -23, 28]);
// 	return new AudioContext()
// 		.decodeAudioData(aacData.buffer)
// 		.then(() => {
// 			return true;
// 		}).catch(() => {
// 			return false;
// 		});
// })();
})