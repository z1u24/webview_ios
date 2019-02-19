_$define("app/core/globalWallet", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * global wallet
 */
var config_1 = require("../config");
var constants_1 = require("../utils/constants");
var tools_1 = require("../utils/tools");
var walletTools_1 = require("../utils/walletTools");
var wallet_1 = require("./btc/wallet");
var cipher_1 = require("./crypto/cipher");
var wallet_2 = require("./eth/wallet");
var genmnemonic_1 = require("./genmnemonic");
var cipher = new cipher_1.Cipher();
/* tslint:disable: variable-name */

var GlobalWallet = function () {
    function GlobalWallet() {
        _classCallCheck(this, GlobalWallet);

        this._currencyRecords = [];
        this._isBackup = false; // 助记词备份
    }

    _createClass(GlobalWallet, [{
        key: "toJSON",

        /**********************************************
         * 公共内部函数
         * *******************************************************************/
        /**
         * 当前对象转化为json字符串
         */
        value: function toJSON() {
            var wlt = {
                glwtId: this._glwtId,
                vault: this._vault,
                isBackup: this._isBackup,
                publicKey: this._publicKey
            };
            return JSON.stringify(wlt);
        }
    }, {
        key: "glwtId",
        get: function get() {
            return this._glwtId;
        }
    }, {
        key: "currencyRecords",
        get: function get() {
            return this._currencyRecords;
        }
    }, {
        key: "vault",
        get: function get() {
            return this._vault;
        }
    }, {
        key: "isBackup",
        set: function set(isBackup) {
            this._isBackup = isBackup;
        },
        get: function get() {
            return this._isBackup;
        }
    }, {
        key: "publicKey",
        get: function get() {
            return this._publicKey;
        }
    }], [{
        key: "fromJSON",
        value: function fromJSON(jsonstring) {
            var wlt = JSON.parse(jsonstring);
            var gwlt = new GlobalWallet();
            gwlt._glwtId = wlt.glwtId;
            gwlt._vault = wlt.vault;
            gwlt._isBackup = wlt.isBackup;
            gwlt._publicKey = wlt.publicKey;
            return gwlt;
        }
        /**
         * 通过助记词导入钱包
         */

    }, {
        key: "fromMnemonic",
        value: function fromMnemonic(secrectHash, mnemonic) {
            var gwlt = new GlobalWallet();
            var vault = genmnemonic_1.getRandomValuesByMnemonic(constants_1.lang, mnemonic);
            gwlt._vault = cipher.encrypt(secrectHash, tools_1.u8ArrayToHexstr(vault));
            gwlt._glwtId = this.initGwlt(gwlt, mnemonic);
            gwlt._publicKey = wallet_2.EthWallet.getPublicKeyByMnemonic(mnemonic, constants_1.lang);
            return gwlt;
        }
        /**
         * create GlobalWallet
         * @param passwd password
         * @param walletName  wallet name
         * @param passphrase passphrase
         */

    }, {
        key: "generate",
        value: function generate(secrectHash, vault) {
            var gwlt = new GlobalWallet();
            vault = vault || genmnemonic_1.generateRandomValues(constants_1.strength);
            console.time('pi_create generate encrypt need');
            gwlt._vault = cipher.encrypt(secrectHash, tools_1.u8ArrayToHexstr(vault));
            console.timeEnd('pi_create generate encrypt need');
            console.time('pi_create generate toMnemonic need');
            var mnemonic = genmnemonic_1.toMnemonic(constants_1.lang, vault);
            console.timeEnd('pi_create generate toMnemonic need');
            console.time('pi_create generate initGwlt need');
            gwlt._glwtId = this.initGwlt(gwlt, mnemonic);
            console.timeEnd('pi_create generate initGwlt need');
            console.time('pi_create generate getPublicKeyByMnemonic need');
            gwlt._publicKey = wallet_2.EthWallet.getPublicKeyByMnemonic(mnemonic, constants_1.lang);
            console.timeEnd('pi_create generate getPublicKeyByMnemonic need');
            return gwlt;
        }
        /**
         * 动态创建钱包(地址)对象
         */

    }, {
        key: "createWlt",
        value: function createWlt(currencyName, passwd, i) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var mnemonic;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return walletTools_1.getMnemonic(passwd);

                            case 2:
                                mnemonic = _context.sent;
                                return _context.abrupt("return", this.createWltByMnemonic(mnemonic, currencyName, i));

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * 通过助记词创建对应钱包对象
         */

    }, {
        key: "createWltByMnemonic",
        value: function createWltByMnemonic(mnemonic, currencyName, i) {
            var wlt = void 0;
            if (currencyName === 'ETH') {
                console.time('trans EthWallet.fromMnemonic');
                var ethWallet = wallet_2.EthWallet.fromMnemonic(mnemonic, constants_1.lang);
                console.timeEnd('trans EthWallet.fromMnemonic');
                console.time('trans ethWallet.selectAddressWlt');
                wlt = ethWallet.selectAddressWlt(i);
                console.timeEnd('trans ethWallet.selectAddressWlt');
            } else if (currencyName === 'BTC') {
                wlt = wallet_1.BTCWallet.fromMnemonic(mnemonic, config_1.btcNetwork, constants_1.lang);
            } else if (config_1.ERC20Tokens[currencyName]) {
                var _ethWallet = wallet_2.EthWallet.fromMnemonic(mnemonic, constants_1.lang);
                wlt = _ethWallet.selectAddressWlt(i);
            }
            return wlt;
        }
        /**
         *
         * 通过助记词获得指定位置的钱包地址
         */

    }, {
        key: "getWltAddrByMnemonic",
        value: function getWltAddrByMnemonic(mnemonic, currencyName, i) {
            var addr = void 0;
            if (currencyName === 'ETH') {
                var ethWallet = wallet_2.EthWallet.fromMnemonic(mnemonic, constants_1.lang);
                addr = ethWallet.selectAddress(i);
            } else if (currencyName === 'BTC') {
                var wlt = wallet_1.BTCWallet.fromMnemonic(mnemonic, config_1.btcNetwork, constants_1.lang);
                wlt.unlock();
                addr = wlt.derive(i);
                wlt.lock();
            } else if (config_1.ERC20Tokens[currencyName]) {
                var _ethWallet2 = wallet_2.EthWallet.fromMnemonic(mnemonic, constants_1.lang);
                addr = _ethWallet2.selectAddress(i);
            }
            return addr;
        }
        /*****************************************
         * 私有静态函数
         * ************************************************************
         /**
         * init GlobalWallet
         * @param passwd password
         * @param walletName  wallet name
         * @param passphrase passphrase
         */

    }, {
        key: "initGwlt",
        value: function initGwlt(gwlt, mnemonic) {
            // 创建ETH钱包
            console.time('pi_create createEthGwlt');
            var ethCurrencyRecord = this.createEthGwlt(mnemonic);
            console.timeEnd('pi_create createEthGwlt');
            gwlt._currencyRecords.push(ethCurrencyRecord);
            // 创建BTC钱包
            console.time('pi_create createBtcGwlt');
            var btcCurrencyRecord = this.createBtcGwlt(mnemonic);
            console.timeEnd('pi_create createBtcGwlt');
            gwlt._currencyRecords.push(btcCurrencyRecord);
            var ethTokenList = [];
            for (var k in config_1.ERC20Tokens) {
                if (config_1.ERC20Tokens.hasOwnProperty(k)) {
                    ethTokenList.push(k);
                }
            }
            // ETH代币创建
            ethTokenList.forEach(function (tokenName) {
                var ethAddrInfo = ethCurrencyRecord.addrs[0];
                var erc20AddrInfo = {
                    addr: ethAddrInfo.addr,
                    balance: 0,
                    txHistory: [],
                    nonce: 0
                };
                var tokenRecord = Object.assign({}, ethCurrencyRecord, { currencyName: tokenName, addrs: [erc20AddrInfo] });
                gwlt._currencyRecords.push(tokenRecord);
            });
            return ethCurrencyRecord.currentAddr;
        }
    }, {
        key: "createEthGwlt",
        value: function createEthGwlt(mnemonic) {
            console.time('pi_create EthWallet.fromMnemonic');
            var ethWallet = wallet_2.EthWallet.fromMnemonic(mnemonic, constants_1.lang);
            console.timeEnd('pi_create EthWallet.fromMnemonic');
            console.time('pi_create ethWallet.selectAddress');
            var address = ethWallet.selectAddress(0);
            console.timeEnd('pi_create ethWallet.selectAddress');
            var addrInfo = {
                addr: address,
                balance: 0,
                txHistory: [],
                nonce: 0 // 本地维护的nonce(对BTC无效)
            };
            // tslint:disable-next-line:no-unnecessary-local-variable
            var currencyRecord = {
                currencyName: 'ETH',
                currentAddr: address,
                addrs: [addrInfo],
                updateAddr: false
            };
            return currencyRecord;
        }
    }, {
        key: "createBtcGwlt",
        value: function createBtcGwlt(mnemonic) {
            console.time('pi_create BTCWallet.fromMnemonic');
            var btcWallet = wallet_1.BTCWallet.fromMnemonic(mnemonic, config_1.btcNetwork, constants_1.lang);
            console.timeEnd('pi_create BTCWallet.fromMnemonic');
            btcWallet.unlock();
            console.time('pi_create btcWallet.derive');
            var address = btcWallet.derive(0);
            console.timeEnd('pi_create btcWallet.derive');
            btcWallet.lock();
            var addrInfo = {
                addr: address,
                balance: 0,
                txHistory: [],
                nonce: 0 // 本地维护的nonce(对BTC无效)
            };
            // tslint:disable-next-line:no-unnecessary-local-variable
            var currencyRecord = {
                currencyName: 'BTC',
                currentAddr: address,
                addrs: [addrInfo],
                updateAddr: false
            };
            return currencyRecord;
        }
    }]);

    return GlobalWallet;
}();

exports.GlobalWallet = GlobalWallet;
})