_$define("earn/server/util/oauth_lib", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../../../pi/util/math");
var constant_1 = require("../data/constant");
var user_r_1 = require("../rpc/user.r");
var http = require("./http_client");
// 签名
exports.sign = function (msg, privateKey) {
    // const sig = new KJUR.crypto.Signature({ alg: KJUR.jws.JWS.jwsalg2sigalg.ES256 });
    // sig.init({ d: privateKey, curve: 'secp256k1' });
    // sig.updateString(msg);
    // return sig.sign();
    return 'testsign';
};
// json转字符串为uri并按照字典排序
exports.json_uri_sort = function (json) {
    var keys = Object.keys(json).sort();
    var msg = '';
    for (var index in keys) {
        var key = keys[index];
        if (msg === '') {
            // msg += key + '=' + json[key];
            msg = "" + msg + key + "=" + json[key];
        } else {
            // msg += '&' + key + '=' + json[key];
            msg = msg + "&" + key + "=" + json[key];
        }
    }
    return msg;
};
exports.oauth_send = function (uri, body) {
    console.log('oauth_send!!!!!!!', uri, body);
    // 增加时间戳
    body.timestamp = new Date().getTime();
    // 签名
    var signStr = exports.sign(exports.json_uri_sort(body), constant_1.WALLET_SERVER_KEY);
    body.sign = signStr;
    var url = "" + constant_1.WALLET_SERVER_URL + uri;
    console.log('!!!!!!!!!url:', url);
    var client = http.createClient();
    http.addHeader(client, 'content-type', 'application/json');
    return http.post(client, url, body);
};
// 向钱包账户发起余额更改请求
exports.oauth_alter_balance = function (itemType, oid, count) {
    console.log('挖矿测试 oid-------------------', oid);
    var coinType = void 0;
    var num = void 0;
    switch (itemType) {
        case constant_1.BTC_TYPE:
            coinType = constant_1.BTC_WALLET_TYPE;
            num = (count * constant_1.BTC_UNIT_NUM).toString();
            break;
        case constant_1.ETH_TYPE:
            coinType = constant_1.ETH_WALLET_TYPE;
            var coinNum = count * constant_1.ETH_UNIT_NUM;
            num = coinNum.toString();
            console.log('ETH_NUM!!!!!!!!!!!!!!!!!:', num);
            break;
        case constant_1.ST_TYPE:
            coinType = constant_1.ST_WALLET_TYPE;
            num = (count * constant_1.ST_UNIT_NUM).toString();
            break;
        case constant_1.KT_TYPE:
            coinType = constant_1.KT_WALLET_TYPE;
            num = (count * constant_1.KT_UNIT_NUM).toString();
            break;
        default:
    }
    var openid = Number(user_r_1.getOpenid());
    console.log('coinType!!!!!!!!!!!!!!!!!!!!', coinType);
    var r = exports.oauth_send(constant_1.WALLET_API_ALTER, { openid: openid, coinType: coinType, num: num, oid: oid });
    console.log('http response!!!!!!!!!!!!!!!!!!!!', r);
    if (r.ok) {
        var json = JSON.parse(r.ok);
        if (json.return_code === 1) {
            num = json.num;
            return num;
        } else {
            return;
        }
    } else {
        return;
    }
};
// 第三方应用生成订单
exports.wallet_unifiedorder = function (oid, stNum, body) {
    var appid = constant_1.WALLET_APPID;
    var mch_id = constant_1.WALLET_MCH_ID;
    var total_fee = stNum * constant_1.ST_UNIT_NUM;
    var out_trade_no = oid;
    var nonce_str = "" + math_1.randomInt(100000, 999999);
    var signBody = { appid: appid, mch_id: mch_id, body: body, out_trade_no: out_trade_no, total_fee: total_fee, nonce_str: nonce_str };
    var signStr = exports.sign(exports.json_uri_sort(signBody), constant_1.WALLET_SERVER_KEY);
    var requestBody = { appid: appid, mch_id: mch_id, sign: signStr, body: body, out_trade_no: out_trade_no, total_fee: total_fee, nonce_str: nonce_str };
    var url = "" + constant_1.WALLET_SERVER_URL + constant_1.WALLET_API_UNIFIEDORDER;
    var client = http.createClient();
    http.addHeader(client, 'content-type', 'application/json');
    var r = http.post(client, url, requestBody);
    if (r.ok) {
        var json = JSON.parse(r.ok);
        if (json.return_code === 1) {
            console.log('returnJson!!!!!!!!!!!!', json);
            return json;
        } else {
            return;
        }
    } else {
        return;
    }
};
// 第三方应用查询订单
exports.wallet_order_query = function (oid) {
    var appid = constant_1.WALLET_APPID;
    var mch_id = constant_1.WALLET_MCH_ID;
    var out_trade_no = oid;
    var nonce_str = "" + math_1.randomInt(100000, 999999);
    var signBody = { appid: appid, mch_id: mch_id, out_trade_no: out_trade_no, nonce_str: nonce_str };
    var signStr = exports.sign(exports.json_uri_sort(signBody), constant_1.WALLET_SERVER_KEY);
    var requestBody = { appid: appid, mch_id: mch_id, sign: signStr, out_trade_no: out_trade_no, nonce_str: nonce_str };
    var url = "" + constant_1.WALLET_SERVER_URL + constant_1.WALLET_ORDER_QUERY;
    var client = http.createClient();
    http.addHeader(client, 'content-type', 'application/json');
    var r = http.post(client, url, requestBody);
    if (r.ok) {
        var json = JSON.parse(r.ok);
        if (json.return_code === 1) {
            return json;
        } else {
            return;
        }
    } else {
        return;
    }
};
})