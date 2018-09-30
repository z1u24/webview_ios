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
var store_1 = require("../store/store");
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
        this._addrs = [];
        this._mnemonicBackup = false; // 助记词备份
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
                nickName: this._nickName,
                vault: this._vault,
                mnemonicBackup: this._mnemonicBackup,
                publicKey: this._publicKey
            };
            return JSON.stringify(wlt);
        }
        /**
         * 修改密码
         */

    }, {
        key: "passwordChange",
        value: function passwordChange(oldPsw, newPsw) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var salt, oldHash, newHash, oldVault;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                salt = store_1.find('salt');
                                _context.next = 3;
                                return tools_1.calcHashValuePromise(oldPsw, salt);

                            case 3:
                                oldHash = _context.sent;
                                _context.next = 6;
                                return tools_1.calcHashValuePromise(newPsw, salt);

                            case 6:
                                newHash = _context.sent;

                                // console.log('passwordChange hash', oldHash, this._vault, oldPsw, newHash, newPsw);
                                oldVault = cipher.decrypt(oldHash, this._vault);

                                this._vault = cipher.encrypt(newHash, oldVault);

                            case 9:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "glwtId",
        get: function get() {
            return this._glwtId;
        }
    }, {
        key: "nickName",
        get: function get() {
            return this._nickName;
        },
        set: function set(name) {
            this._nickName = name;
        }
    }, {
        key: "currencyRecords",
        get: function get() {
            return this._currencyRecords;
        }
    }, {
        key: "addrs",
        get: function get() {
            return this._addrs;
        }
    }, {
        key: "vault",
        get: function get() {
            return this._vault;
        }
    }, {
        key: "mnemonicBackup",
        set: function set(mnemonicBackup) {
            this._mnemonicBackup = mnemonicBackup;
        },
        get: function get() {
            return this._mnemonicBackup;
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
            gwlt._nickName = wlt.nickName;
            gwlt._vault = wlt.vault;
            gwlt._mnemonicBackup = wlt.mnemonicBackup;
            gwlt._publicKey = wlt.publicKey;
            return gwlt;
        }
        /**
         * 通过助记词导入钱包
         */

    }, {
        key: "fromMnemonic",
        value: function fromMnemonic(hash, mnemonic) {
            var gwlt = new GlobalWallet();
            var vault = genmnemonic_1.getRandomValuesByMnemonic(constants_1.lang, mnemonic);
            gwlt._vault = cipher.encrypt(hash, tools_1.u8ArrayToHexstr(vault));
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
        value: function generate(hash, walletName, vault) {
            var gwlt = new GlobalWallet();
            gwlt._nickName = walletName;
            vault = vault || genmnemonic_1.generateRandomValues(constants_1.strength);
            gwlt._vault = cipher.encrypt(hash, tools_1.u8ArrayToHexstr(vault));
            // console.log('generate hash', hash, gwlt._vault, passwd, u8ArrayToHexstr(vault));
            var mnemonic = genmnemonic_1.toMnemonic(constants_1.lang, vault);
            gwlt._glwtId = this.initGwlt(gwlt, mnemonic);
            gwlt._publicKey = wallet_2.EthWallet.getPublicKeyByMnemonic(mnemonic, constants_1.lang);
            // dataCenter.addAddr(ethGwlt.addr.addr, ethGwlt.addr.addrName, ethGwlt.addr.currencyName);
            // dataCenter.addAddr(btcGwlt.addr.addr, btcGwlt.addr.addrName, btcGwlt.addr.currencyName);
            return gwlt;
        }
        /**
         * 动态创建钱包(地址)对象
         */

    }, {
        key: "createWlt",
        value: function createWlt(currencyName, passwd, wallet, i) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var mnemonic;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return walletTools_1.getMnemonic(wallet, passwd);

                            case 2:
                                mnemonic = _context2.sent;
                                return _context2.abrupt("return", this.createWltByMnemonic(mnemonic, currencyName, i));

                            case 4:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
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
                var ethWallet = wallet_2.EthWallet.fromMnemonic(mnemonic, constants_1.lang);
                wlt = ethWallet.selectAddressWlt(i);
            } else if (currencyName === 'BTC') {
                wlt = wallet_1.BTCWallet.fromMnemonic(mnemonic, constants_1.btcNetwork, constants_1.lang);
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
                var wlt = wallet_1.BTCWallet.fromMnemonic(mnemonic, constants_1.btcNetwork, constants_1.lang);
                wlt.unlock();
                addr = wlt.derive(i);
                wlt.lock();
            } else if (config_1.ERC20Tokens[currencyName]) {
                var _ethWallet2 = wallet_2.EthWallet.fromMnemonic(mnemonic, constants_1.lang);
                addr = _ethWallet2.selectAddress(i);
            }
            return addr;
        }
        /**
         * 获取钱包地址的位置
         */

    }, {
        key: "getWltAddrIndex",
        value: function getWltAddrIndex(wallet, addr, currencyName) {
            var currencyRecord = wallet.currencyRecords.filter(function (v) {
                return v.currencyName === currencyName;
            })[0];
            if (!currencyRecord) return -1;
            return currencyRecord.addrs.indexOf(addr);
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
            var ethGwlt = this.createEthGwlt(mnemonic);
            gwlt._currencyRecords.push(ethGwlt.currencyRecord);
            gwlt._addrs.push(ethGwlt.addr);
            // 创建BTC钱包
            var btcGwlt = this.createBtcGwlt(mnemonic);
            gwlt._currencyRecords.push(btcGwlt.currencyRecord);
            gwlt._addrs.push(btcGwlt.addr);
            var ethTokenList = [];
            for (var k in config_1.ERC20Tokens) {
                if (config_1.ERC20Tokens.hasOwnProperty(k)) {
                    ethTokenList.push(k);
                }
            }
            // ETH代币创建
            ethTokenList.forEach(function (tokenName) {
                var tokenRecord = Object.assign({}, ethGwlt.currencyRecord, { currencyName: tokenName });
                var tokenAddr = Object.assign({}, ethGwlt.addr, { currencyName: tokenName });
                gwlt._currencyRecords.push(tokenRecord);
                gwlt._addrs.push(tokenAddr);
            });
            // dataCenter.addAddr(ethGwlt.addr.addr, ethGwlt.addr.addrName, ethGwlt.addr.currencyName);
            // dataCenter.addAddr(btcGwlt.addr.addr, btcGwlt.addr.addrName, btcGwlt.addr.currencyName);
            return ethGwlt.addr.addr;
        }
    }, {
        key: "createEthGwlt",
        value: function createEthGwlt(mnemonic) {
            var ethWallet = wallet_2.EthWallet.fromMnemonic(mnemonic, constants_1.lang);
            var address = ethWallet.selectAddress(0);
            var currencyRecord = {
                currencyName: 'ETH',
                currentAddr: address,
                addrs: [address],
                updateAddr: false
            };
            var addr = tools_1.initAddr(address, 'ETH');
            return {
                currencyRecord: currencyRecord,
                addr: addr
            };
        }
    }, {
        key: "createBtcGwlt",
        value: function createBtcGwlt(mnemonic) {
            // todo 测试阶段，使用测试链，后续改为主链
            var btcWallet = wallet_1.BTCWallet.fromMnemonic(mnemonic, constants_1.btcNetwork, constants_1.lang);
            btcWallet.unlock();
            var address = btcWallet.derive(0);
            btcWallet.lock();
            var currencyRecord = {
                currencyName: 'BTC',
                currentAddr: address,
                addrs: [address],
                updateAddr: false
            };
            var addr = tools_1.initAddr(address, 'BTC');
            return {
                currencyRecord: currencyRecord,
                addr: addr
            };
        }
    }]);

    return GlobalWallet;
}();

exports.GlobalWallet = GlobalWallet;
})