_$define("pi/browser/cameraPicker", function (require, exports, module){
"use strict";
/**
 * 打开照相机
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var base64_1 = require("../util/base64");
var native_1 = require("./native");
// ========================= export

var CameraPicker = function (_native_1$NativeObjec) {
    _inherits(CameraPicker, _native_1$NativeObjec);

    function CameraPicker() {
        _classCallCheck(this, CameraPicker);

        return _possibleConstructorReturn(this, (CameraPicker.__proto__ || Object.getPrototypeOf(CameraPicker)).apply(this, arguments));
    }

    _createClass(CameraPicker, [{
        key: "takePhoto",
        value: function takePhoto(param) {
            var old = param.success;
            if (old) {
                param.success = function (base64) {
                    var buffer = base64_1.base64ToArrayBuffer(base64);
                    old(buffer);
                };
            }
            this.call('takePhoto', param);
        }
    }]);

    return CameraPicker;
}(native_1.NativeObject);

exports.CameraPicker = CameraPicker;
native_1.registerSign(CameraPicker, {
    takePhoto: []
});
})