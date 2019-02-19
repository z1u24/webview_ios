_$define("app/core/config", function (require, exports, module){
"use strict";

var _exports$config;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
/**
 * config file
 */
exports.config = (_exports$config = {
    // 当前网络处于什么环境  dev--开发，prod--发布
    dev_mode: config_1.dev_mode
}, _defineProperty(_exports$config, config_1.DevMode.Ropsten, {
    // https://api.blockcypher.com/v1/btc/main
    // tslint:disable-next-line:no-http-string
    BtcApiBaseUrl: 'http://39.104.129.43:3002/insight-api',
    BtcMarketPriceOracleUrl: 'https://api.coinmarketcap.com/v2/ticker/1/?convert=CNY',
    // http://192.168.33.115:8545       
    EthApiBaseUrl: 'https://ropsten.infura.io/Y4zS49bjsYwtRU3Tt4Yj',
    EthMarketPriceOracleUrl: 'https://api.coinmarketcap.com/v2/ticker/1027/?convert=CNY',
    EthscanRopstenUrl: 'http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=',
    EthscanRopstenTokenTransferEvent: 'https://api-ropsten.etherscan.io/api?module=account&action=tokentx'
}), _defineProperty(_exports$config, config_1.DevMode.Rinkeby, {
    // https://api.blockcypher.com/v1/btc/main
    // tslint:disable-next-line:no-http-string
    BtcApiBaseUrl: 'http://39.104.129.43:3002/insight-api',
    BtcMarketPriceOracleUrl: 'https://api.coinmarketcap.com/v2/ticker/1/?convert=CNY',
    // https://rinkeby.infura.io/Y4zS49bjsYwtRU3Tt4Yj
    // http://192.168.33.115:8545       
    EthApiBaseUrl: 'https://rinkeby.infura.io/Y4zS49bjsYwtRU3Tt4Yj',
    EthMarketPriceOracleUrl: 'https://api.coinmarketcap.com/v2/ticker/1027/?convert=CNY',
    EthscanRopstenUrl: 'http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=',
    EthscanRopstenTokenTransferEvent: 'https://api-rinkeby.etherscan.io/api?module=account&action=tokentx'
}), _defineProperty(_exports$config, config_1.DevMode.Prod, {
    BtcApiBaseUrl: 'http://39.104.129.43:3001/insight-api',
    BtcMarketPriceOracleUrl: 'https://api.coinmarketcap.com/v2/ticker/1/?convert=CNY',
    EthApiBaseUrl: 'https://mainnet.infura.io/Y4zS49bjsYwtRU3Tt4Yj',
    EthMarketPriceOracleUrl: 'https://api.coinmarketcap.com/v2/ticker/1027/?convert=CNY',
    EthscanRopstenUrl: 'http://api.etherscan.io/api?module=account&action=txlist&address=',
    EthscanRopstenTokenTransferEvent: 'https://api.etherscan.io/api?module=account&action=tokentx'
}), _exports$config);
exports.getEthApiBaseUrl = function () {
    var ETH_API_BASE_URL = void 0;
    if (exports.config.dev_mode === config_1.DevMode.Ropsten) {
        ETH_API_BASE_URL = exports.config[config_1.DevMode.Ropsten].EthApiBaseUrl;
    } else if (exports.config.dev_mode === config_1.DevMode.Rinkeby) {
        ETH_API_BASE_URL = exports.config[config_1.DevMode.Rinkeby].EthApiBaseUrl;
    } else if (exports.config.dev_mode === config_1.DevMode.Prod) {
        ETH_API_BASE_URL = exports.config[config_1.DevMode.Prod].EthApiBaseUrl;
    }
    return ETH_API_BASE_URL;
};
})