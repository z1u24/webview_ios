_$define("app/utils/constants", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("../store/interface");
/**
 * 一些常用常量
 */
// 分页每页条目数量
exports.PAGELIMIT = 10;
// 默认显示得ETH代币
exports.defaultEthToken = [];
// 默认显示货币列表
exports.defalutShowCurrencys = ['ETH', 'BTC', 'TRX', 'BNB', 'WTC', 'VEN'];
// 默认不可更改显示货币列表
exports.notSwtichShowCurrencys = ['ETH', 'BTC'];
//
exports.strength = 128;
// 语言
exports.lang = 'english';
// eth代币transfer交易编码前缀
exports.ethTokenTransferCode = '0xa9059cbb';
// shapeshift autologin token
exports.shapeshiftAutoToken = 'CZfRLxjor2E49vTfTZDjaeeR78nMMi1rKypV9GRBsmt2';
// 如果shapeshift交易记录返回[],请求的最多次数,超过默认没有交易记录
exports.shapeshiftTransactionRequestNumber = 5;
// 发红包所支持的货币
exports.redEnvelopeSupportCurrency = ['KT', 'ETH'];
// 默认ETH gasLimit
exports.defaultGasLimit = 21000;
// 重发时间间隔(超过间隔还未成功即可重发)
exports.resendInterval = 3 * 1000;
// 最小提现金额
exports.withdrawLimit = {
    KT: 1000,
    ETH: 0.01,
    BTC: 0.001
};
// 不同矿工费的到账时间
exports.timeOfArrival = {
    ETH: [{
        level: interface_1.MinerFeeLevel.Standard,
        text: { zh_Hans: '标准', zh_Hant: '標準', en: '' },
        time: { zh_Hans: '1-3分钟', zh_Hant: '1-3分鐘', en: '' }
    }, {
        level: interface_1.MinerFeeLevel.Fast,
        text: { zh_Hans: '快', zh_Hant: '快', en: '' },
        time: { zh_Hans: '30-60秒', zh_Hant: '30-60秒', en: '' }
    }, {
        level: interface_1.MinerFeeLevel.Fastest,
        text: { zh_Hans: '最快', zh_Hant: '最快', en: '' },
        time: { zh_Hans: '10-30秒', zh_Hant: '10-30秒', en: '' }
    }],
    BTC: [{
        level: interface_1.MinerFeeLevel.Standard,
        text: { zh_Hans: '标准', zh_Hant: '標準', en: '' },
        time: { zh_Hans: '2-3小时', zh_Hant: '2-3小時', en: '' }
    }, {
        level: interface_1.MinerFeeLevel.Fast,
        text: { zh_Hans: '快', zh_Hant: '快', en: '' },
        time: { zh_Hans: '0.5-1小时', zh_Hant: '0.5-1小時', en: '' }
    }, {
        level: interface_1.MinerFeeLevel.Fastest,
        text: { zh_Hans: '最快', zh_Hant: '最快', en: '' },
        time: { zh_Hans: '1-30分钟', zh_Hant: '1-30分鐘', en: '' }
    }]
};
// 助记词片段分享最大数
exports.MAX_SHARE_LEN = 3;
// 助记词片段分享最小数
exports.MIN_SHARE_LEN = 2;
// 交易所需区块确认数
exports.currencyConfirmBlockNumber = {
    ETH: [{
        value: 1,
        number: 7
    }, {
        value: 2,
        number: 12
    }, {
        value: 4,
        number: 16
    }, {
        value: 7,
        number: 20
    }, {
        value: 10,
        number: 30
    }, {
        value: Number.MAX_VALUE,
        number: 40
    }],
    BTC: [{
        value: 0.1,
        number: 2
    }, {
        value: 0.2,
        number: 3
    }, {
        value: 0.4,
        number: 4
    }, {
        value: 0.7,
        number: 5
    }, {
        value: 1,
        number: 6
    }, {
        value: Number.MAX_VALUE,
        number: 7
    }],
    ERC20: 7
};
// 打开第三方查询网址eth
exports.etherscanUrl = 'https://ropsten.etherscan.io/tx/';
// 打开第三方查询网址btc
exports.blockchainUrl = 'https://testnet.blockchain.info/tx/';
/**
 * 一些指令
 */
var CMD;
(function (CMD) {
    CMD[CMD["FORCELOGOUT"] = 1] = "FORCELOGOUT";
    CMD[CMD["FORCELOGOUTDEL"] = 2] = "FORCELOGOUTDEL"; // 强制下线删除数据
})(CMD = exports.CMD || (exports.CMD = {}));
/**
 * 预估出来的erc20 gasLimit倍数
 */
exports.erc20GasLimitRate = 2;
// 默认顶部留出40px高度
exports.topHeight = 40;
})