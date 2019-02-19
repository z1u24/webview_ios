_$define("pi_pt/rust/httpc", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../vm/vm");
var nobject_1 = require("../vm/nobject");
var sinfo_1 = require("../../pi/struct/sinfo");
var atom_1 = require("./atom");
var vec_1 = require("./def/vec");
/*
* http客户端
*/

var HttpClient = function (_nobject_1$NObject) {
    _inherits(HttpClient, _nobject_1$NObject);

    function HttpClient() {
        _classCallCheck(this, HttpClient);

        /**
         * @param self
         * @return usize
         */
        var _this = _possibleConstructorReturn(this, (HttpClient.__proto__ || Object.getPrototypeOf(HttpClient)).apply(this, arguments));

        _this.headersSizeSharedHttpc = function () {
            return vm_1.call(29226352, [_this.self]);
        };
        /**
         * @param self
         * @return Option<Vec<atom::Atom>>
         */
        _this.headersKeysSharedHttpc = function () {
            var result = vm_1.call(3576683825, [_this.self]);
            if (result !== undefined && result !== null) {
                result = new vec_1.Vec(result);
            }
            return result;
        };
        /**
         * @param self
         * @param key:Atom
         * @return Option<Vec<atom::Atom>>
         */
        _this.getHeaderSharedHttpc = function (key) {
            key = key.self;
            var result = vm_1.call(2476662030, [_this.self, key]);
            if (result !== undefined && result !== null) {
                result = new vec_1.Vec(result);
            }
            return result;
        };
        return _this;
    }

    return HttpClient;
}(nobject_1.NObject);

HttpClient._$info = new sinfo_1.StructInfo("pi_pt/rust/httpc/.HttpClient", 2358639479, new Map(), []);
/**
 * @param client:&mutArc<HttpClient>
 * @param key:Atom
 * @param value:Atom
 * @return usize
 */
HttpClient.addHeaderSharedHttpc = function (client, key, value) {
    client = client.self;
    key = key.self;
    value = value.self;
    return vm_1.call(3526501959, [client, key, value]);
};
/**
 * @param client:&mutArc<HttpClient>
 * @param key:Atom
 * @return usize
 */
HttpClient.removeHeaderSharedHttpc = function (client, key) {
    client = client.self;
    key = key.self;
    return vm_1.call(2025875773, [client, key]);
};
/**
 * @param client:&mutArc<HttpClient>
 */
HttpClient.clearHeadersSharedHttpc = function (client) {
    client = client.self;
    vm_1.call(2970107566, [client]);
};
exports.HttpClient = HttpClient;
/*
* http响应
*/

var HttpClientResponse = function (_nobject_1$NObject2) {
    _inherits(HttpClientResponse, _nobject_1$NObject2);

    function HttpClientResponse() {
        _classCallCheck(this, HttpClientResponse);

        //获取响应url
        /**
         * @param self
         * @return atom::Atom
         */
        var _this2 = _possibleConstructorReturn(this, (HttpClientResponse.__proto__ || Object.getPrototypeOf(HttpClientResponse)).apply(this, arguments));

        _this2.url = function () {
            var result = vm_1.call(3825034130, [_this2.self]);
            result = new atom_1.Atom(result);
            return result;
        };
        //判断是否是消息
        /**
         * @param self
         * @return bool
         */
        _this2.isInfo = function () {
            return vm_1.call(986662685, [_this2.self]);
        };
        //判断是否成功
        /**
         * @param self
         * @return bool
         */
        _this2.isOk = function () {
            return vm_1.call(4079869020, [_this2.self]);
        };
        //判断是否是重定向
        /**
         * @param self
         * @return bool
         */
        _this2.isRedirect = function () {
            return vm_1.call(2008399665, [_this2.self]);
        };
        //判断是否是客户端错误
        /**
         * @param self
         * @return bool
         */
        _this2.isClientError = function () {
            return vm_1.call(208103417, [_this2.self]);
        };
        //判断是否是服务器端错误
        /**
         * @param self
         * @return bool
         */
        _this2.isServerError = function () {
            return vm_1.call(1117881293, [_this2.self]);
        };
        //判断是否是未知状态
        /**
         * @param self
         * @return bool
         */
        _this2.isUndefined = function () {
            return vm_1.call(45575971, [_this2.self]);
        };
        //获取响应状态
        /**
         * @param self
         * @return u16
         */
        _this2.status = function () {
            return vm_1.call(3889629654, [_this2.self]);
        };
        //获取响应状态描述
        /**
         * @param self
         * @return Option<atom::Atom>
         */
        _this2.statusInfo = function () {
            var result = vm_1.call(484341674, [_this2.self]);
            if (result !== undefined && result !== null) {
                result = new atom_1.Atom(result);
            }
            return result;
        };
        //获取响应头条目数量
        /**
         * @param self
         * @return usize
         */
        _this2.headersSize = function () {
            return vm_1.call(677141052, [_this2.self]);
        };
        //获取响应头所有条目关键字
        /**
         * @param self
         * @return Option<Vec<atom::Atom>>
         */
        _this2.headersKeys = function () {
            var result = vm_1.call(1258454971, [_this2.self]);
            if (result !== undefined && result !== null) {
                result = new vec_1.Vec(result);
            }
            return result;
        };
        //获取指定关键字的响应头条目，一个关键字可以有多个条目
        /**
         * @param self
         * @param key:Atom
         * @return Option<Vec<atom::Atom>>
         */
        _this2.getHeader = function (key) {
            key = key.self;
            var result = vm_1.call(2914686338, [_this2.self, key]);
            if (result !== undefined && result !== null) {
                result = new vec_1.Vec(result);
            }
            return result;
        };
        //获取文本格式的响应体
        /**
         * @param self
         * @return Result<String>
         */
        _this2.text = function () {
            var result = vm_1.call(2925270627, [_this2.self]);
            return result;
        };
        //获取二进制的响应体
        /**
         * @param self
         * @return Result<Vec<u8>>
         */
        _this2.bin = function () {
            var result = vm_1.call(2657372573, [_this2.self]);
            result = new vec_1.Vec(result);
            return result;
        };
        return _this2;
    }

    return HttpClientResponse;
}(nobject_1.NObject);

HttpClientResponse._$info = new sinfo_1.StructInfo("pi_pt/rust/httpc/.HttpClientResponse", 4221998835, new Map(), []);
exports.HttpClientResponse = HttpClientResponse;
})