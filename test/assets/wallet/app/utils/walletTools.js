_$define("app/utils/walletTools", function (require, exports, module){
"use strict";

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
 * 和第3方库相关的一些工具函数
 */
var config_1 = require("../config");
var wallet_1 = require("../core/btc/wallet");
var cipher_1 = require("../core/crypto/cipher");
var helper_1 = require("../core/eth/helper");
var wallet_2 = require("../core/eth/wallet");
var genmnemonic_1 = require("../core/genmnemonic");
var globalWallet_1 = require("../core/globalWallet");
var dataCenter_1 = require("../logic/dataCenter");
var store_1 = require("../store/store");
var constants_1 = require("./constants");
var tools_1 = require("./tools");
var pull_1 = require("../net/pull");
var secretsBase_1 = require("./secretsBase");
var base64_1 = require("../../pi/util/base64");
var nameWareHouse_1 = require("./nameWareHouse");
/**
 * 获取新的地址信息
 * @param currencyName 货币类型
 */
exports.getNewAddrInfo = function (currencyName, wallet) {
    var currencyRecord = wallet.currencyRecords.filter(function (v) {
        return v.currencyName === currencyName;
    })[0];
    if (!currencyRecord) return;
    var addrs = store_1.find('addrs');
    var firstAddr = addrs.filter(function (v) {
        return v.addr === currencyRecord.addrs[0];
    })[0];
    var address = void 0;
    if (currencyName === 'ETH' || config_1.ERC20Tokens[currencyName]) {
        var wlt = wallet_2.EthWallet.fromJSON(firstAddr.wlt);
        var newWlt = wlt.selectAddressWlt(currencyRecord.addrs.length);
        address = newWlt.address;
    } else if (currencyName === 'BTC') {
        var _wlt = wallet_1.BTCWallet.fromJSON(firstAddr.wlt);
        _wlt.unlock();
        address = _wlt.derive(currencyRecord.addrs.length);
        _wlt.lock();
    }
    return address;
};
/**
 * 添加新的地址
 * @param currencyName 货币类型
 * @param address 新的地址
 * @param addrName 新的地址名
 * @param wltJson 新的地址钱包对象
 */
exports.addNewAddr = function (currencyName, address, addrName) {
    var wallet = store_1.find('curWallet');
    var addrs = store_1.find('addrs') || [];
    wallet.currencyRecords.forEach(function (currencyRecord) {
        if (currencyRecord.currencyName === currencyName) {
            currencyRecord.addrs.push(address);
            currencyRecord.currentAddr = address;
        }
    });
    var newAddrInfo = tools_1.initAddr(address, currencyName, addrName);
    addrs.push(newAddrInfo);
    dataCenter_1.dataCenter.updateAddrInfo(address, addrName);
    store_1.updateStore('addrs', addrs);
    store_1.updateStore('curWallet', wallet);
    return newAddrInfo;
};
/**
 * 是否是有效地址
 * @param currencyName 货币类型
 * @param addr 地址
 */
exports.effectiveAddr = function (currencyName, addr) {
    var flag = false;
    if (currencyName === 'ETH') {
        // 0xa6e83b630bf8af41a9278427b6f2a35dbc5f20e3
        // alert(addr);
        var per = 'iban:';
        if (addr.indexOf(per) === 0) {
            var lastIndex = addr.indexOf('?');
            addr = lastIndex >= 0 ? addr.slice(per.length, lastIndex) : addr.slice(per.length);
            if (helper_1.isValidIban(addr)) {
                addr = helper_1.ibanToAddress(addr);
            }
        }
        flag = addr.indexOf('0x') === 0 && addr.length === 42;
    } else if (currencyName === 'BTC') {
        // alert(addr);
        var _per = 'bitcoin:';
        if (addr.indexOf(_per) === 0) {
            var _lastIndex = addr.indexOf('?');
            addr = _lastIndex >= 0 ? addr.slice(_per.length, _lastIndex) : addr.slice(_per.length);
        }
        // alert(addr.length);
        // mw8VtNKY81RjLz52BqxUkJx57pcsQe4eNB
        flag = addr.length === 34;
    }
    return [flag, addr];
};
/**
 * 验证身份
 */
exports.VerifyIdentidy = function (wallet, passwd) {
    var useCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var hash, gwlt, cipher, r;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return tools_1.calcHashValuePromise(passwd, store_1.find('salt'));

                    case 2:
                        hash = _context.sent;
                        gwlt = globalWallet_1.GlobalWallet.fromJSON(wallet.gwlt);
                        _context.prev = 4;
                        cipher = new cipher_1.Cipher();
                        r = cipher.decrypt(hash, gwlt.vault);
                        return _context.abrupt("return", true);

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context["catch"](4);

                        console.log(_context.t0);
                        return _context.abrupt("return", false);

                    case 14:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 10]]);
    }));
};
/**
 * 获取助记词
 */
exports.getMnemonic = function (wallet, passwd) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var hash, gwlt, cipher, r;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return tools_1.calcHashValuePromise(passwd, store_1.find('salt'));

                    case 2:
                        hash = _context2.sent;
                        gwlt = globalWallet_1.GlobalWallet.fromJSON(wallet.gwlt);
                        _context2.prev = 4;
                        cipher = new cipher_1.Cipher();
                        r = cipher.decrypt(hash, gwlt.vault);
                        return _context2.abrupt("return", genmnemonic_1.toMnemonic(constants_1.lang, tools_1.hexstrToU8Array(r)));

                    case 10:
                        _context2.prev = 10;
                        _context2.t0 = _context2["catch"](4);

                        console.log(_context2.t0);
                        return _context2.abrupt("return", '');

                    case 14:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[4, 10]]);
    }));
};
/**
 * 获取助记词16进制字符串
 */
exports.getMnemonicHexstr = function (wallet, hash) {
    var gwlt = globalWallet_1.GlobalWallet.fromJSON(wallet.gwlt);
    try {
        var cipher = new cipher_1.Cipher();
        return cipher.decrypt(hash, gwlt.vault);
    } catch (error) {
        console.log(error);
        return '';
    }
};
/**
 * 获取某个地址的交易记录
 */
exports.fetchTransactionList = function (addr, currencyName) {
    if (!addr) return [];
    // 从缓存中取出对应地址的交易记录
    var transactions = store_1.find('transactions') || [];
    var txList = [];
    txList = transactions.filter(function (v) {
        return v.addr === addr && v.currencyName === currencyName;
    });
    return txList.sort(function (a, b) {
        return b.time - a.time;
    });
};
/**
 * 根据交易hash获取指定地址上本地交易详情
 */
exports.fetchLocalTxByHash = function (addr, currencyName, hash) {
    var txList = exports.fetchTransactionList(addr, currencyName);
    for (var i = 0; i < txList.length; i++) {
        if (txList[i].hash === hash) {
            return txList[i];
        }
    }
};
/**
 * 根据交易hash获取所有地址上本地交易详情
 */
exports.fetchLocalTxByHash1 = function (hash) {
    var txList = store_1.find('transactions') || [];
    for (var i = 0; i < txList.length; i++) {
        if (txList[i].hash === hash) {
            return txList[i];
        }
    }
};
// 购买理财
exports.purchaseProduct = function (psw, productId, amount) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var close, pswCorrect, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        close = tools_1.popNewLoading('正在购买...');
                        _context3.next = 3;
                        return exports.VerifyIdentidy(store_1.find('curWallet'), psw, false);

                    case 3:
                        pswCorrect = _context3.sent;

                        if (pswCorrect) {
                            _context3.next = 8;
                            break;
                        }

                        close.callback(close.widget);
                        tools_1.popNewMessage('密码不正确');
                        return _context3.abrupt("return");

                    case 8:
                        _context3.next = 10;
                        return pull_1.buyProduct(productId, amount);

                    case 10:
                        data = _context3.sent;

                        close.callback(close.widget);
                        if (data) {
                            tools_1.popNewMessage('购买成功');
                            pull_1.getCloudBalance();
                            console.log('data', data);
                            pull_1.getPurchaseRecord(); // 购买之后获取购买记录
                        }
                        return _context3.abrupt("return", data);

                    case 14:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
};
//获取助记词片段
exports.fetchMnemonicFragment = function (hash) {
    var mnemonicHexstr = exports.getMnemonicHexstr(store_1.find('curWallet'), hash);
    if (!mnemonicHexstr) return;
    var shares = secretsBase_1.shareSecret(mnemonicHexstr, constants_1.MAX_SHARE_LEN, constants_1.MIN_SHARE_LEN).map(function (v) {
        return base64_1.arrayBufferToBase64(tools_1.hexstrToU8Array(v).buffer);
    });
    console.log('fetchMnemonicFragment-----------', shares);
    return shares;
};
// 备份助记词
exports.backupMnemonic = function (passwd) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var close, hash, mnemonic, fragments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        close = tools_1.popNewLoading('导出中...');
                        _context4.next = 3;
                        return tools_1.calcHashValuePromise(passwd, store_1.find('salt'));

                    case 3:
                        hash = _context4.sent;

                        console.log('hash!!!!!!!!!!!!', hash);
                        close.callback(close.widget);
                        mnemonic = exports.getMnemonicByHash(hash);
                        fragments = exports.fetchMnemonicFragment(hash);

                        if (mnemonic) {
                            _context4.next = 11;
                            break;
                        }

                        tools_1.popNewMessage('密码错误');
                        return _context4.abrupt("return");

                    case 11:
                        return _context4.abrupt("return", {
                            mnemonic: mnemonic,
                            fragments: fragments
                        });

                    case 12:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
};
//根据hash获取助记词
exports.getMnemonicByHash = function (hash) {
    var gwlt = globalWallet_1.GlobalWallet.fromJSON(store_1.find('curWallet').gwlt);
    try {
        var cipher = new cipher_1.Cipher();
        var r = cipher.decrypt(hash, gwlt.vault);
        return genmnemonic_1.toMnemonic(constants_1.lang, tools_1.hexstrToU8Array(r));
    } catch (error) {
        console.log(error);
        return '';
    }
};
/**
 * 获取随机名字
 */
exports.playerName = function () {
    var num1 = nameWareHouse_1.nameWare[0].length;
    var num2 = nameWareHouse_1.nameWare[1].length;
    var name = "";
    name = tools_1.unicodeArray2Str(nameWareHouse_1.nameWare[0][Math.floor(Math.random() * num1)]) + tools_1.unicodeArray2Str(nameWareHouse_1.nameWare[1][Math.floor(Math.random() * num2)]);
    return name;
};
})