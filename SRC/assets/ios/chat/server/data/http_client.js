_$define("chat/server/data/http_client", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var atom_1 = require("../../../pi_pt/rust/atom");
var httpc_1 = require("../../../pi_pt/rust/httpc");
var js_httpc_1 = require("../../../pi_pt/rust/pi_serv/js_httpc");
/**
 * 创建客户端
 */
exports.createClient = function () {
    return js_httpc_1.createHttpClient(js_httpc_1.HttpClientOptions.default());
};
/**
 * 添加头信息
 * 'content-type':'application/json'
 */
exports.addHeader = function (client, key, value) {
    httpc_1.HttpClient.addHeaderSharedHttpc(client, atom_1.Atom.fromFrom(key), atom_1.Atom.fromFrom(value));
};
/**
 * jsonrpc
 * @param url -localhost + port
 * @param param -body
 */
exports.post = function (client, url, param) {
    console.log('!!!!!!!!!!param:', param, JSON.stringify(param));
    var body = js_httpc_1.HttpClientBody.bodyString(JSON.stringify(param));
    var result = { ok: null, err: null };
    try {
        var r = js_httpc_1.postString(client, atom_1.Atom.fromFrom(url), body);
        if (typeof r[1] === 'string' && r[1].endsWith('Result is Err') || typeof r[1].self === 'string' && r[1].self.endsWith('Result is Err')) {
            result.err = r[1];
            return result;
        } else {
            result.ok = r[1].text();
            return result;
        }
    } catch (e) {
        console.log('http request error:!!!!!!!!!!!!!!!!!!!', e);
        result.err = e;
        return result;
    }
};
/**
 * formdatarpc
 * @param url url
 * @param key formdata key
 * @param value formdata value
 */
exports.formPost = function (client, url, key, value) {
    var body = js_httpc_1.HttpClientBody.formString(key, value);
    var result = { ok: null, err: null };
    try {
        var r = js_httpc_1.postString(client, atom_1.Atom.fromFrom(url), body);
        if (typeof r[1] === 'string' && r[1].endsWith('Result is Err') || typeof r[1].self === 'string' && r[1].self.endsWith('Result is Err')) {
            result.err = r[1];
            return result;
        } else {
            result.ok = r[1].text();
            return result;
        }
    } catch (e) {
        console.log('http request error:!!!!!!!!!!!!!!!!!!!', e);
        result.err = e;
        return result;
    }
};
})