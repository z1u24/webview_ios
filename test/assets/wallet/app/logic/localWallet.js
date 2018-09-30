_$define("app/logic/localWallet", function (require, exports, module){
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
 * 本地钱包相关操作
 */
var root_1 = require("../../pi/ui/root");
var base64_1 = require("../../pi/util/base64");
var canvas_1 = require("../../pi/util/canvas");
var genmnemonic_1 = require("../core/genmnemonic");
var globalWallet_1 = require("../core/globalWallet");
var pull_1 = require("../net/pull");
var interface_1 = require("../store/interface");
var store_1 = require("../store/store");
var ahash_1 = require("../utils/ahash");
var constants_1 = require("../utils/constants");
var secretsBase_1 = require("../utils/secretsBase");
var tools_1 = require("../utils/tools");
var walletTools_1 = require("../utils/walletTools");
var dataCenter_1 = require("./dataCenter");
/**
 * 创建钱包
 * @param itype 创建钱包方式 1 随机 2 图片 3 标准导入 4 照片导入 5 片段导入
 * @param option 相关参数
 */
exports.createWallet = function (itype, option) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var close, hash, _close, _hash, _close2, _hash2, _close3, _hash3, _close4, _hash4;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(itype === interface_1.CreateWalletType.Random)) {
                            _context.next = 11;
                            break;
                        }

                        close = root_1.popNew('app-components1-loading-loading', { text: '创建中...' });
                        _context.next = 4;
                        return tools_1.calcHashValuePromise(option.psw, store_1.find('salt'));

                    case 4:
                        hash = _context.sent;

                        exports.createWalletRandom(hash, option);
                        close.callback(close.widget);
                        // 刷新本地钱包
                        dataCenter_1.dataCenter.refreshAllTx();
                        return _context.abrupt("return", hash);

                    case 11:
                        if (!(itype === interface_1.CreateWalletType.Image)) {
                            _context.next = 23;
                            break;
                        }

                        _close = root_1.popNew('app-components1-loading-loading', { text: '创建中...' });
                        _context.next = 15;
                        return tools_1.calcHashValuePromise(option.psw, store_1.find('salt'));

                    case 15:
                        _hash = _context.sent;
                        _context.next = 18;
                        return exports.createWalletByImage(_hash, option);

                    case 18:
                        _close.callback(_close.widget);
                        // 刷新本地钱包
                        dataCenter_1.dataCenter.refreshAllTx();
                        return _context.abrupt("return", _hash);

                    case 23:
                        if (!(itype === interface_1.CreateWalletType.StrandarImport)) {
                            _context.next = 34;
                            break;
                        }

                        _close2 = root_1.popNew('app-components1-loading-loading', { text: '导入中...' });
                        _context.next = 27;
                        return tools_1.calcHashValuePromise(option.psw, store_1.find('salt'));

                    case 27:
                        _hash2 = _context.sent;

                        exports.importWalletByMnemonic(_hash2, option);
                        _close2.callback(_close2.widget);
                        // 刷新本地钱包
                        dataCenter_1.dataCenter.refreshAllTx();
                        return _context.abrupt("return", _hash2);

                    case 34:
                        if (!(itype === interface_1.CreateWalletType.ImageImport)) {
                            _context.next = 46;
                            break;
                        }

                        _close3 = root_1.popNew('app-components1-loading-loading', { text: '导入中...' });
                        _context.next = 38;
                        return tools_1.calcHashValuePromise(option.psw, store_1.find('salt'));

                    case 38:
                        _hash3 = _context.sent;
                        _context.next = 41;
                        return exports.createWalletByImage(_hash3, option);

                    case 41:
                        _close3.callback(_close3.widget);
                        // 刷新本地钱包
                        dataCenter_1.dataCenter.refreshAllTx();
                        return _context.abrupt("return", _hash3);

                    case 46:
                        if (!(itype === interface_1.CreateWalletType.FragmentImport)) {
                            _context.next = 55;
                            break;
                        }

                        _close4 = root_1.popNew('app-components1-loading-loading', { text: '导入中...' });
                        _context.next = 50;
                        return tools_1.calcHashValuePromise(option.psw, store_1.find('salt'));

                    case 50:
                        _hash4 = _context.sent;

                        exports.importWalletByFragment(_hash4, option);
                        _close4.callback(_close4.widget);
                        // 刷新本地钱包
                        dataCenter_1.dataCenter.refreshAllTx();
                        return _context.abrupt("return", _hash4);

                    case 55:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};
/**
 * 随机创建钱包
 */
exports.createWalletRandom = function (hash, option) {
    var _wallet$currencyRecor;

    var salt = store_1.find('salt');
    var gwlt = globalWallet_1.GlobalWallet.generate(hash, option.nickName);
    // 创建钱包基础数据
    var wallet = {
        walletId: gwlt.glwtId,
        avatar: '',
        gwlt: gwlt.toJSON(),
        showCurrencys: constants_1.defalutShowCurrencys,
        currencyRecords: []
    };
    (_wallet$currencyRecor = wallet.currencyRecords).push.apply(_wallet$currencyRecor, _toConsumableArray(gwlt.currencyRecords));
    var walletList = store_1.find('walletList');
    walletList.push(wallet);
    store_1.updateStore('walletList', walletList);
    store_1.updateStore('curWallet', wallet);
    store_1.updateStore('salt', salt);
    var addrs = store_1.find('addrs') || [];
    addrs.push.apply(addrs, _toConsumableArray(gwlt.addrs));
    store_1.updateStore('addrs', addrs);
    store_1.updateStore('userInfo', { nickName: option.nickName, avatar: option.avatar, fromServer: false });
    pull_1.openAndGetRandom();
};
/**
 * 图片创建钱包
 * @param option 参数
 */
exports.createWalletByImage = function (hash, option) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _wallet$currencyRecor2;

        var ahash, vault, walletList, addrs, salt, gwlt, wallet;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log('createWalletByImage-------', hash, option);
                        _context2.next = 3;
                        return getImageAhash(option.imageBase64);

                    case 3:
                        ahash = _context2.sent;
                        _context2.next = 6;
                        return imgToHash(ahash, option.imagePsw);

                    case 6:
                        vault = _context2.sent;
                        walletList = store_1.find('walletList');
                        addrs = store_1.find('addrs') || [];
                        salt = store_1.find('salt');
                        gwlt = globalWallet_1.GlobalWallet.generate(hash, option.nickName, vault);
                        // 创建钱包基础数据

                        wallet = {
                            walletId: gwlt.glwtId,
                            avatar: '',
                            gwlt: gwlt.toJSON(),
                            showCurrencys: constants_1.defalutShowCurrencys,
                            currencyRecords: []
                        };

                        (_wallet$currencyRecor2 = wallet.currencyRecords).push.apply(_wallet$currencyRecor2, _toConsumableArray(gwlt.currencyRecords));
                        walletList.push(wallet);
                        store_1.updateStore('walletList', walletList);
                        store_1.updateStore('curWallet', wallet);
                        store_1.updateStore('salt', salt);
                        addrs.push.apply(addrs, _toConsumableArray(gwlt.addrs));
                        store_1.updateStore('addrs', addrs);
                        store_1.updateStore('userInfo', { nickName: option.nickName, avatar: option.avatar, fromServer: false });
                        pull_1.openAndGetRandom();

                    case 21:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
};
/**
 * 获取图片ahash
 * @param imageBase64 base64
 */
var getImageAhash = function getImageAhash(imageBase64) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
            var ab = canvas_1.drawImg(img);
            var r = ahash_1.ahash(new Uint8Array(ab), img.width, img.height, 4);
            resolve(r);
        };
        img.onerror = function (e) {
            reject(e);
        };
        img.src = imageBase64;
    });
};
/**
 *
 * @param imagePsw 图片密码
 * @param ahash ahash
 */
var imgToHash = function imgToHash(ahash, imagePsw) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var sha3Hash, hash, sha3Hash1, len, sha3Hash2;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        sha3Hash = genmnemonic_1.sha3(ahash + imagePsw, false);
                        _context3.next = 3;
                        return tools_1.calcHashValuePromise(sha3Hash);

                    case 3:
                        hash = _context3.sent;
                        sha3Hash1 = genmnemonic_1.sha3(hash, true);
                        len = sha3Hash1.length;
                        // 生成助记词的随机数仅需要128位即可，这里对256位随机数进行折半取异或的处理

                        sha3Hash2 = tools_1.getXOR(sha3Hash1.slice(0, len / 2), sha3Hash1.slice(len / 2));
                        // console.log(choosedImg, inputWords, sha3Hash, hash, sha3Hash1, sha3Hash2);

                        return _context3.abrupt("return", genmnemonic_1.generateByHash(sha3Hash2));

                    case 8:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
};
/**
 * 通过助记词导入钱包
 */
exports.importWalletByMnemonic = function (hash, option) {
    var _wallet$currencyRecor3;

    var walletList = store_1.find('walletList');
    var salt = store_1.find('salt');
    var addrs = store_1.find('addrs') || [];
    var gwlt = null;
    console.time('import');
    gwlt = globalWallet_1.GlobalWallet.fromMnemonic(hash, option.mnemonic);
    console.timeEnd('import');
    gwlt.nickName = option.nickName;
    var wallet = {
        walletId: gwlt.glwtId,
        avatar: '',
        gwlt: gwlt.toJSON(),
        showCurrencys: constants_1.defalutShowCurrencys,
        currencyRecords: []
    };
    (_wallet$currencyRecor3 = wallet.currencyRecords).push.apply(_wallet$currencyRecor3, _toConsumableArray(gwlt.currencyRecords));
    walletList.push(wallet);
    store_1.updateStore('walletList', walletList);
    store_1.updateStore('curWallet', wallet);
    store_1.updateStore('salt', salt);
    addrs.push.apply(addrs, _toConsumableArray(gwlt.addrs));
    store_1.updateStore('addrs', addrs);
    store_1.updateStore('userInfo', { nickName: option.nickName, avatar: option.avatar, fromServer: false });
    pull_1.openAndGetRandom();
    return true;
};
/**
 * 冗余助记词导入
 */
exports.importWalletByFragment = function (hash, option) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var shares, comb, mnemonic;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        shares = [option.fragment1, option.fragment2].map(function (v) {
                            return tools_1.u8ArrayToHexstr(new Uint8Array(base64_1.base64ToArrayBuffer(v)));
                        });
                        comb = secretsBase_1.restoreSecret(shares);
                        mnemonic = genmnemonic_1.toMnemonic(constants_1.lang, tools_1.hexstrToU8Array(comb));

                        option.mnemonic = mnemonic;
                        exports.importWalletByMnemonic(hash, option);

                    case 5:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
};
/**
 * 添加新地址
 */
exports.createNewAddr = function (passwd, currencyName) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var close, wallet, mnemonic, currencyRecord, address;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        close = tools_1.popNewLoading('添加中...');
                        wallet = store_1.find('curWallet');
                        _context5.next = 4;
                        return walletTools_1.getMnemonic(wallet, passwd);

                    case 4:
                        mnemonic = _context5.sent;

                        close.callback(close.widget);

                        if (!mnemonic) {
                            _context5.next = 15;
                            break;
                        }

                        currencyRecord = wallet.currencyRecords.filter(function (v) {
                            return v.currencyName === currencyName;
                        })[0];
                        address = globalWallet_1.GlobalWallet.getWltAddrByMnemonic(mnemonic, currencyName, currencyRecord.addrs.length);

                        if (address) {
                            _context5.next = 11;
                            break;
                        }

                        return _context5.abrupt("return");

                    case 11:
                        walletTools_1.addNewAddr(currencyName, address, '');
                        tools_1.popNewMessage('添加成功');
                        _context5.next = 16;
                        break;

                    case 15:
                        tools_1.popNewMessage('密码错误');

                    case 16:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));
};
// 删除助记词
exports.deleteMnemonic = function () {
    var curWalletId = store_1.find('curWallet').walletId;
    var walletList = store_1.find('walletList').map(function (v) {
        if (v.walletId === curWalletId) {
            // isUpdate = true;
            var gwlt = globalWallet_1.GlobalWallet.fromJSON(v.gwlt);
            gwlt.mnemonicBackup = true;
            v.gwlt = gwlt.toJSON();
            store_1.updateStore('curWallet', v);
        }
        return v;
    });
    store_1.updateStore('walletList', walletList);
};
})