_$define("pi/browser/ad_unoin", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 广告
 */
var native_1 = require("./native");
var GDTAD = 0;
var DYAD = 0;

var ADUnion = function (_native_1$NativeObjec) {
    _inherits(ADUnion, _native_1$NativeObjec);

    function ADUnion() {
        _classCallCheck(this, ADUnion);

        return _possibleConstructorReturn(this, (ADUnion.__proto__ || Object.getPrototypeOf(ADUnion)).apply(this, arguments));
    }

    _createClass(ADUnion, null, [{
        key: "getADNumber",
        value: function getADNumber(cb) {
            cb(GDTAD, DYAD);
        }
        // adtype:1.广点通  2.字节跳动

    }, {
        key: "showRewardVideoAD",
        value: function showRewardVideoAD(ADType, cb) {
            adMrg.call('showRewardVideoAD', { ADType: ADType,
                success: function success(str) {
                    if (ADType === 1) {
                        GDTAD = GDTAD < 1 ? 0 : GDTAD - 1;
                    } else {
                        DYAD = DYAD < 1 ? 0 : DYAD - 1;
                    }
                    cb(undefined, str);
                },
                fail: function fail(str) {
                    cb(str, undefined);
                }
            });
        }
        // adtype:1.广点通  2.字节跳动

    }, {
        key: "loadRewardVideoAD",
        value: function loadRewardVideoAD(ADType, cb) {
            adMrg.call('loadRewardVideoAD', { ADType: ADType,
                success: function success(str) {
                    if (ADType === 1) {
                        GDTAD = GDTAD + 1;
                    } else {
                        DYAD = DYAD + 1;
                    }
                    cb(undefined, str);
                },
                fail: function fail(str) {
                    cb(str, undefined);
                }
            });
        }
    }]);

    return ADUnion;
}(native_1.NativeObject);

exports.ADUnion = ADUnion;
native_1.registerSign(ADUnion, {
    showRewardVideoAD: [{
        name: 'ADType',
        type: native_1.ParamType.Number
    }],
    loadRewardVideoAD: [{
        name: 'ADType',
        type: native_1.ParamType.Number
    }]
});
var adMrg = new ADUnion();
adMrg.init();
})