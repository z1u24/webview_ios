_$define("pi_pt/rust/pi_serv/js_httpc", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var util_1 = require("../../../pi/bigint/util");
var sinfo_1 = require("../../../pi/struct/sinfo");
var httpc_1 = require("../httpc");
var httpc_2 = require("../httpc");
/*
* http客户端选项
*/

var HttpClientOptions = function (_nobject_1$NObject) {
    _inherits(HttpClientOptions, _nobject_1$NObject);

    function HttpClientOptions() {
        _classCallCheck(this, HttpClientOptions);

        return _possibleConstructorReturn(this, (HttpClientOptions.__proto__ || Object.getPrototypeOf(HttpClientOptions)).apply(this, arguments));
    }

    return HttpClientOptions;
}(nobject_1.NObject);

HttpClientOptions._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/js_httpc.HttpClientOptions", 1131624585, new Map(), []);
/**
 * @return
 */
HttpClientOptions.default = function () {
    var result = vm_1.call(373179692, []);
    result = new HttpClientOptions(result);
    return result;
};
//gzip: 是否gzip压缩, referer: bool, count:  重定向最大次数, timeout: 请求超时时间（ms）
/**
 * @param https:bool
 * @param gzip:bool
 * @param referer:bool
 * @param count:isize
 * @param timeout:u64
 * @return
 */
HttpClientOptions.normal = function (https, gzip, referer, count, timeout) {
    timeout = util_1.u64ToBuffer(timeout);
    var result = vm_1.call(145125716, [https, gzip, referer, count, timeout]);
    result = new HttpClientOptions(result);
    return result;
};
//cert_file: 根证书路径, identity_file: 个人证书, pk: 私钥字符串, gzip: 是否gzip压缩, referer: bool, count:  重定向最大次数, timeout: 请求超时时间（ms）
//路径以"/"分隔
/**
 * @param cert_file:String
 * @param identity_file:String
 * @param pk:String
 * @param gzip:bool
 * @param referer:bool
 * @param count:isize
 * @param timeout:u64
 * @return
 */
HttpClientOptions.vaildHost = function (cert_file, identity_file, pk, gzip, referer, count, timeout) {
    timeout = util_1.u64ToBuffer(timeout);
    var result = vm_1.call(2887071833, [cert_file, identity_file, pk, gzip, referer, count, timeout]);
    result = new HttpClientOptions(result);
    return result;
};
//proxy_url:代理服务器的url, gzip: 是否gzip压缩, referer: bool, count:  重定向最大次数, timeout: 请求超时时间（ms）
/**
 * @param proxy_url:String
 * @param https:bool
 * @param gzip:bool
 * @param referer:bool
 * @param count:isize
 * @param timeout:u64
 * @return
 */
HttpClientOptions.proxy = function (proxy_url, https, gzip, referer, count, timeout) {
    timeout = util_1.u64ToBuffer(timeout);
    var result = vm_1.call(2011091417, [proxy_url, https, gzip, referer, count, timeout]);
    result = new HttpClientOptions(result);
    return result;
};
/**
 * @param cert_file:String
 * @param identity_file:String
 * @param pk:String
 * @param proxy_url:String
 * @param gzip:bool
 * @param referer:bool
 * @param count:isize
 * @param timeout:u64
 * @return
 */
HttpClientOptions.validHostProxy = function (cert_file, identity_file, pk, proxy_url, gzip, referer, count, timeout) {
    timeout = util_1.u64ToBuffer(timeout);
    var result = vm_1.call(2937777264, [cert_file, identity_file, pk, proxy_url, gzip, referer, count, timeout]);
    result = new HttpClientOptions(result);
    return result;
};
exports.HttpClientOptions = HttpClientOptions;
/*
* http的Body
*/

var HttpClientBody = function (_nobject_1$NObject2) {
    _inherits(HttpClientBody, _nobject_1$NObject2);

    function HttpClientBody() {
        _classCallCheck(this, HttpClientBody);

        //获取指定关键字的json值
        /**
         * @param self
         * @param key:String
         * @return Option<&String>
         */
        var _this2 = _possibleConstructorReturn(this, (HttpClientBody.__proto__ || Object.getPrototypeOf(HttpClientBody)).apply(this, arguments));

        _this2.getJsonVal = function (key) {
            var result = vm_1.call(2175286088, [_this2.self, key]);
            if (result !== undefined && result !== null) {}
            return result;
        };
        //增加json键值对，返回键值对数量
        /**
         * @param self
         * @param key:String
         * @param value:String
         * @return usize
         */
        _this2.addJsonKv = function (key, value) {
            return vm_1.call(1065006446, [_this2.self, key, value]);
        };
        //移除指定关键字的json键值对，返回被移除的值
        /**
         * @param self
         * @param key:String
         * @return Option<String>
         */
        _this2.removeJsonKv = function (key) {
            var result = vm_1.call(1500292772, [_this2.self, key]);
            if (result !== undefined && result !== null) {}
            return result;
        };
        //清空所有json键值对
        /**
         * @param self
         */
        _this2.clearJsonKvs = function () {
            vm_1.call(2345066455, [_this2.self]);
        };
        //增加表单键值对
        /**
         * @param self
         * @param key:String
         * @param value:String
         * @return
         */
        _this2.addFormKv = function (key, value) {
            var result = vm_1.call(1016322459, [_this2.self, key, value]);
            result = new HttpClientBody(result);
            return result;
        };
        //增加表单文件
        /**
         * @param self
         * @param key:String
         * @param file:String
         * @return Result<Self,String>
         */
        _this2.addFormFile = function (key, file) {
            var result = vm_1.call(2344044784, [_this2.self, key, file]);
            result = new HttpClientBody(result);
            return result;
        };
        return _this2;
    }

    return HttpClientBody;
}(nobject_1.NObject);

HttpClientBody._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/js_httpc.HttpClientBody", 2404566785, new Map(), []);
//创建body
/**
 * @param body:Vec<u8>
 * @return
 */
HttpClientBody.bodyVec = function (body) {
    body = body.self;
    var result = vm_1.call(2113618061, [body]);
    result = new HttpClientBody(result);
    return result;
};
//创建body
/**
 * @param body:String
 * @return
 */
HttpClientBody.bodyString = function (body) {
    var result = vm_1.call(794872933, [body]);
    result = new HttpClientBody(result);
    return result;
};
//创建json
/**
 * @param key:Atom
 * @param value:String
 * @return
 */
HttpClientBody.jsonString = function (key, value) {
    key = key.self;
    var result = vm_1.call(965054041, [key, value]);
    result = new HttpClientBody(result);
    return result;
};
//创建表单
/**
 * @param key:String
 * @param value:String
 * @return
 */
HttpClientBody.formString = function (key, value) {
    var result = vm_1.call(2118843620, [key, value]);
    result = new HttpClientBody(result);
    return result;
};
exports.HttpClientBody = HttpClientBody;
//创建
/**
 * @param options:HttpClientOptions
 * @return Result<Arc<httpc::HttpClient>,String>
 */
exports.createHttpClient = function (options) {
    options = options.self;
    var result = vm_1.call(997239765, [options]);
    result = new httpc_1.HttpClient(result);
    return result;
};
/**
 * @param client:&Arc<httpc::HttpClient>
 * @param url:Atom
 * @param body:HttpClientBody<T>
 * @param (
 * @return Result<(Arc<httpc::HttpClient>,httpc::HttpClientResponse),String>
 */
exports.getVecAsync = function (client, url, body, callback) {
    var callback_ = function callback_(r) {
        r[0] = new httpc_1.HttpClient(r[0]);
        r[1] = new httpc_2.HttpClientResponse(r[1]);
        callback(r);
    };
    client = client.self;
    url = url.self;
    body = body.self;
    vm_1.asyncCall(739596726, [client, url, body], callback_);
};
exports.getVec = function (client, url, body) {
    client = client.self;
    url = url.self;
    body = body.self;
    var r = vm_1.syncCall(2282211344, [client, url, body]);
    r[0] = new httpc_1.HttpClient(r[0]);
    r[1] = new httpc_2.HttpClientResponse(r[1]);
    return r;
};
/**
 * @param client:&Arc<httpc::HttpClient>
 * @param url:Atom
 * @param body:HttpClientBody<T>
 * @param (
 * @return Result<(Arc<httpc::HttpClient>,httpc::HttpClientResponse),String>
 */
exports.getStringAsync = function (client, url, body, callback) {
    var callback_ = function callback_(r) {
        r[0] = new httpc_1.HttpClient(r[0]);
        r[1] = new httpc_2.HttpClientResponse(r[1]);
        callback(r);
    };
    client = client.self;
    url = url.self;
    body = body.self;
    vm_1.asyncCall(2173630691, [client, url, body], callback_);
};
exports.getString = function (client, url, body) {
    client = client.self;
    url = url.self;
    body = body.self;
    var r = vm_1.syncCall(4177861558, [client, url, body]);
    r[0] = new httpc_1.HttpClient(r[0]);
    r[1] = new httpc_2.HttpClientResponse(r[1]);
    return r;
};
/**
 * @param client:&Arc<httpc::HttpClient>
 * @param url:Atom
 * @param body:HttpClientBody<T>
 * @param (
 * @return Result<(Arc<httpc::HttpClient>,httpc::HttpClientResponse),String>
 */
exports.postVecAsync = function (client, url, body, callback) {
    var callback_ = function callback_(r) {
        r[0] = new httpc_1.HttpClient(r[0]);
        r[1] = new httpc_2.HttpClientResponse(r[1]);
        callback(r);
    };
    client = client.self;
    url = url.self;
    body = body.self;
    vm_1.asyncCall(1358301807, [client, url, body], callback_);
};
exports.postVec = function (client, url, body) {
    client = client.self;
    url = url.self;
    body = body.self;
    var r = vm_1.syncCall(3729751590, [client, url, body]);
    r[0] = new httpc_1.HttpClient(r[0]);
    r[1] = new httpc_2.HttpClientResponse(r[1]);
    return r;
};
/**
 * @param client:&Arc<httpc::HttpClient>
 * @param url:Atom
 * @param body:HttpClientBody<T>
 * @param (
 * @return Result<(Arc<httpc::HttpClient>,httpc::HttpClientResponse),String>
 */
exports.postStringAsync = function (client, url, body, callback) {
    var callback_ = function callback_(r) {
        r[0] = new httpc_1.HttpClient(r[0]);
        r[1] = new httpc_2.HttpClientResponse(r[1]);
        callback(r);
    };
    client = client.self;
    url = url.self;
    body = body.self;
    vm_1.asyncCall(3423707807, [client, url, body], callback_);
};
exports.postString = function (client, url, body) {
    client = client.self;
    url = url.self;
    body = body.self;
    var r = vm_1.syncCall(2383978915, [client, url, body]);
    r[0] = new httpc_1.HttpClient(r[0]);
    r[1] = new httpc_2.HttpClientResponse(r[1]);
    return r;
};
})