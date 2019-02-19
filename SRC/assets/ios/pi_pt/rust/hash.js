_$define("pi_pt/rust/hash", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../vm/vm");
var nobject_1 = require("../vm/nobject");
var sinfo_1 = require("../../pi/struct/sinfo");

var H32 = function (_nobject_1$NObject) {
    _inherits(H32, _nobject_1$NObject);

    function H32() {
        _classCallCheck(this, H32);

        /**
         * @param self
         * @return [u8,4]
         */
        var _this = _possibleConstructorReturn(this, (H32.__proto__ || Object.getPrototypeOf(H32)).apply(this, arguments));

        _this.take = function () {
            var result = vm_1.call(3776200155, [_this.self]);
            return result;
        };
        /**
         * @param self
         * @return String
         */
        _this.tohex = function () {
            return vm_1.call(2655400174, [_this.self]);
        };
        /**
         * @param self
         * @param other:&H32
         * @return i8
         */
        _this.cmp = function (other) {
            other = other.self;
            return vm_1.call(4080635904, [_this.self, other]);
        };
        return _this;
    }

    return H32;
}(nobject_1.NObject);

H32._$info = new sinfo_1.StructInfo("pi_pt/rust/hash/.H32", 961528204, new Map(), []);
/**
 * @param buf:&[u8]
 * @return hash::H32
 */
H32.fromBuf = function (buf) {
    var result = vm_1.call(444306144, [buf]);
    result = new H32(result);
    return result;
};
/**
 * @param hex:&str
 * @return hash::H32
 */
H32.fromhex = function (hex) {
    var result = vm_1.call(640799706, [hex]);
    result = new H32(result);
    return result;
};
exports.H32 = H32;

var H48 = function (_nobject_1$NObject2) {
    _inherits(H48, _nobject_1$NObject2);

    function H48() {
        _classCallCheck(this, H48);

        /**
         * @param self
         * @return [u8,6]
         */
        var _this2 = _possibleConstructorReturn(this, (H48.__proto__ || Object.getPrototypeOf(H48)).apply(this, arguments));

        _this2.take = function () {
            var result = vm_1.call(702574989, [_this2.self]);
            return result;
        };
        /**
         * @param self
         * @return String
         */
        _this2.tohex = function () {
            return vm_1.call(3679689648, [_this2.self]);
        };
        /**
         * @param self
         * @param other:&H48
         * @return i8
         */
        _this2.cmp = function (other) {
            other = other.self;
            return vm_1.call(3601455854, [_this2.self, other]);
        };
        return _this2;
    }

    return H48;
}(nobject_1.NObject);

H48._$info = new sinfo_1.StructInfo("pi_pt/rust/hash/.H48", 209715136, new Map(), []);
/**
 * @param buf:&[u8]
 * @return hash::H48
 */
H48.fromBuf = function (buf) {
    var result = vm_1.call(1365606331, [buf]);
    result = new H48(result);
    return result;
};
/**
 * @param hex:&str
 * @return hash::H48
 */
H48.fromhex = function (hex) {
    var result = vm_1.call(3968952281, [hex]);
    result = new H48(result);
    return result;
};
exports.H48 = H48;

var H160 = function (_nobject_1$NObject3) {
    _inherits(H160, _nobject_1$NObject3);

    function H160() {
        _classCallCheck(this, H160);

        /**
         * @param self
         * @return [u8,20]
         */
        var _this3 = _possibleConstructorReturn(this, (H160.__proto__ || Object.getPrototypeOf(H160)).apply(this, arguments));

        _this3.take = function () {
            var result = vm_1.call(3927864906, [_this3.self]);
            return result;
        };
        /**
         * @param self
         * @return String
         */
        _this3.tohex = function () {
            return vm_1.call(1290828860, [_this3.self]);
        };
        /**
         * @param self
         * @param other:&H160
         * @return i8
         */
        _this3.cmp = function (other) {
            other = other.self;
            return vm_1.call(1395856100, [_this3.self, other]);
        };
        return _this3;
    }

    return H160;
}(nobject_1.NObject);

H160._$info = new sinfo_1.StructInfo("pi_pt/rust/hash/.H160", 536126312, new Map(), []);
/**
 * @param buf:&[u8]
 * @return hash::H160
 */
H160.fromBuf = function (buf) {
    var result = vm_1.call(3024861218, [buf]);
    result = new H160(result);
    return result;
};
/**
 * @param hex:&str
 * @return hash::H160
 */
H160.fromhex = function (hex) {
    var result = vm_1.call(3933772904, [hex]);
    result = new H160(result);
    return result;
};
exports.H160 = H160;

var H256 = function (_nobject_1$NObject4) {
    _inherits(H256, _nobject_1$NObject4);

    function H256() {
        _classCallCheck(this, H256);

        /**
         * @param self
         * @return [u8,32]
         */
        var _this4 = _possibleConstructorReturn(this, (H256.__proto__ || Object.getPrototypeOf(H256)).apply(this, arguments));

        _this4.take = function () {
            var result = vm_1.call(4065712353, [_this4.self]);
            return result;
        };
        /**
         * @param self
         * @return String
         */
        _this4.tohex = function () {
            return vm_1.call(4173242765, [_this4.self]);
        };
        /**
         * @param self
         * @param other:&H256
         * @return i8
         */
        _this4.cmp = function (other) {
            other = other.self;
            return vm_1.call(234413511, [_this4.self, other]);
        };
        return _this4;
    }

    return H256;
}(nobject_1.NObject);

H256._$info = new sinfo_1.StructInfo("pi_pt/rust/hash/.H256", 2448676432, new Map(), []);
/**
 * @param buf:&[u8]
 * @return hash::H256
 */
H256.fromBuf = function (buf) {
    var result = vm_1.call(155840530, [buf]);
    result = new H256(result);
    return result;
};
/**
 * @param hex:&str
 * @return hash::H256
 */
H256.fromhex = function (hex) {
    var result = vm_1.call(1103597055, [hex]);
    result = new H256(result);
    return result;
};
exports.H256 = H256;

var H512 = function (_nobject_1$NObject5) {
    _inherits(H512, _nobject_1$NObject5);

    function H512() {
        _classCallCheck(this, H512);

        /**
         * @param self
         * @return [u8,64]
         */
        var _this5 = _possibleConstructorReturn(this, (H512.__proto__ || Object.getPrototypeOf(H512)).apply(this, arguments));

        _this5.take = function () {
            var result = vm_1.call(3659472819, [_this5.self]);
            return result;
        };
        /**
         * @param self
         * @return String
         */
        _this5.tohex = function () {
            return vm_1.call(768602447, [_this5.self]);
        };
        /**
         * @param self
         * @param other:&H512
         * @return i8
         */
        _this5.cmp = function (other) {
            other = other.self;
            return vm_1.call(3293705496, [_this5.self, other]);
        };
        return _this5;
    }

    return H512;
}(nobject_1.NObject);

H512._$info = new sinfo_1.StructInfo("pi_pt/rust/hash/.H512", 154771902, new Map(), []);
/**
 * @param buf:&[u8]
 * @return hash::H512
 */
H512.fromBuf = function (buf) {
    var result = vm_1.call(3857186173, [buf]);
    result = new H512(result);
    return result;
};
/**
 * @param hex:&str
 * @return hash::H512
 */
H512.fromhex = function (hex) {
    var result = vm_1.call(2370856657, [hex]);
    result = new H512(result);
    return result;
};
exports.H512 = H512;

var H520 = function (_nobject_1$NObject6) {
    _inherits(H520, _nobject_1$NObject6);

    function H520() {
        _classCallCheck(this, H520);

        /**
         * @param self
         * @return [u8,65]
         */
        var _this6 = _possibleConstructorReturn(this, (H520.__proto__ || Object.getPrototypeOf(H520)).apply(this, arguments));

        _this6.take = function () {
            var result = vm_1.call(3987195607, [_this6.self]);
            return result;
        };
        /**
         * @param self
         * @return String
         */
        _this6.tohex = function () {
            return vm_1.call(1178325458, [_this6.self]);
        };
        /**
         * @param self
         * @param other:&H520
         * @return i8
         */
        _this6.cmp = function (other) {
            other = other.self;
            return vm_1.call(1817272802, [_this6.self, other]);
        };
        return _this6;
    }

    return H520;
}(nobject_1.NObject);

H520._$info = new sinfo_1.StructInfo("pi_pt/rust/hash/.H520", 1610417349, new Map(), []);
/**
 * @param buf:&[u8]
 * @return hash::H520
 */
H520.fromBuf = function (buf) {
    var result = vm_1.call(57500088, [buf]);
    result = new H520(result);
    return result;
};
/**
 * @param hex:&str
 * @return hash::H520
 */
H520.fromhex = function (hex) {
    var result = vm_1.call(1046314649, [hex]);
    result = new H520(result);
    return result;
};
exports.H520 = H520;
})