_$define("earn/client/app/utils/tools", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dataEnum_s_1 = require("../xls/dataEnum.s");
/**
 * 工具类函数
 */
// 时间戳格式化 毫秒为单位
exports.timestampFormat = function (timestamp) {
    if (typeof timestamp === 'string') {
        // tslint:disable-next-line:radix
        timestamp = parseInt(timestamp);
    }
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    var day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    var hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
    var minutes = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    var seconds = date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
};
exports.timestampFormatWeek = function (timestamp) {
    if (typeof timestamp === 'string') {
        // tslint:disable-next-line:radix
        timestamp = parseInt(timestamp);
    }
    var weekAry = ['日', '一', '二', '三', '四', '五', '六'];
    var date = new Date(timestamp);
    return "\u661F\u671F" + weekAry[date.getDay()];
};
/**
 * st小转大单位
 * @param stNum st数量
 */
exports.st2ST = function (stNum) {
    var ST = 0;
    if (stNum !== 0) {
        ST = stNum / 100;
    }
    return ST;
};
/**
 * ST大转小单位
 * @param STNum ST数量
 */
exports.ST2st = function (STNum) {
    var st = 0;
    if (STNum !== 0) {
        st = STNum * 100;
    }
    return st;
};
/**
 * eth小转大单位
 * @param ethNum eth数量
 */
exports.eth2ETH = function (ethNum) {
    var ETH = 0;
    if (ethNum !== 0) {
        ETH = ethNum / 1000;
    }
    return ETH;
};
/**
 * eth小转大单位
 * @param btcNum eth数量
 */
exports.btc2BTC = function (btcNum) {
    var BTC = 0;
    if (btcNum !== 0) {
        BTC = btcNum / 10000;
    }
    return BTC;
};
/**
 * 显示货币单位转换
 */
exports.coinUnitchange = function (coinType, count) {
    switch (coinType) {
        case dataEnum_s_1.CoinType.BTC:
            return exports.btc2BTC(count);
        case dataEnum_s_1.CoinType.ETH:
            return exports.eth2ETH(count);
        case dataEnum_s_1.CoinType.ST:
            return exports.st2ST(count);
        default:
            return count;
    }
};
})