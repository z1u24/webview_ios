_$define("app/net/pullWallet", function (require, exports, module){
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
 * 主动向钱包通讯
 */
// ===================================================== 导入
var root_1 = require("../../pi/ui/root");
var util_1 = require("../../pi/util/util");
var config_1 = require("../config");
var api_1 = require("../core/btc/api");
var api_2 = require("../core/eth/api");
var wallet_1 = require("../core/eth/wallet");
var globalWallet_1 = require("../core/globalWallet");
var shapeshift_1 = require("../exchange/shapeshift/shapeshift");
var dataCenter_1 = require("../logic/dataCenter");
var interface_1 = require("../store/interface");
var store_1 = require("../store/store");
var constants_1 = require("../utils/constants");
var toolMessages_1 = require("../utils/toolMessages");
var tools_1 = require("../utils/tools");
var unitTools_1 = require("../utils/unitTools");
var walletTools_1 = require("../utils/walletTools");
// tslint:disable-next-line:max-line-length
var pull_1 = require("./pull");
// ===================================================== 导出
/**
 * 交易
 */
exports.transfer = function (psw, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var wallet, fromAddr, currencyName, ret, loading, addrIndex, wlt, res, tx, trans;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        wallet = store_1.find('curWallet');
                        fromAddr = txRecord.fromAddr;
                        currencyName = txRecord.currencyName;
                        ret = void 0;
                        loading = root_1.popNew('app-components1-loading-loading', { text: tools_1.getStaticLanguage().transfer.loading });
                        _context.prev = 5;
                        addrIndex = globalWallet_1.GlobalWallet.getWltAddrIndex(wallet, fromAddr, currencyName);

                        if (!(addrIndex >= 0)) {
                            _context.next = 29;
                            break;
                        }

                        _context.next = 10;
                        return globalWallet_1.GlobalWallet.createWlt(currencyName, psw, wallet, addrIndex);

                    case 10:
                        wlt = _context.sent;

                        if (!(currencyName === 'ETH')) {
                            _context.next = 18;
                            break;
                        }

                        _context.next = 14;
                        return exports.doEthTransfer(wlt, txRecord);

                    case 14:
                        ret = _context.sent;

                        console.log('--------------ret', ret);
                        _context.next = 29;
                        break;

                    case 18:
                        if (!(currencyName === 'BTC')) {
                            _context.next = 25;
                            break;
                        }

                        _context.next = 21;
                        return exports.doBtcTransfer(wlt, txRecord);

                    case 21:
                        res = _context.sent;

                        ret = {
                            hash: res.txid,
                            nonce: 0
                        };
                        _context.next = 29;
                        break;

                    case 25:
                        if (!config_1.ERC20Tokens[currencyName]) {
                            _context.next = 29;
                            break;
                        }

                        _context.next = 28;
                        return exports.doERC20TokenTransfer(wlt, txRecord);

                    case 28:
                        ret = _context.sent;

                    case 29:
                        _context.next = 35;
                        break;

                    case 31:
                        _context.prev = 31;
                        _context.t0 = _context["catch"](5);

                        console.log(_context.t0.message);
                        toolMessages_1.doErrorShow(_context.t0);

                    case 35:
                        _context.prev = 35;

                        loading.callback(loading.widget);
                        return _context.finish(35);

                    case 38:
                        if (ret) {
                            tx = Object.assign({}, txRecord, { hash: ret.hash, nonce: ret.nonce });
                            // addRecord(currencyName, fromAddr, tx);

                            trans = store_1.find('transactions');

                            trans.push(tx);
                            store_1.updateStore('transactions', trans);
                            dataCenter_1.dataCenter.refreshTrans(tx.addr, tx.currencyName);
                            root_1.popNew('app-components-message-message', { content: tools_1.getStaticLanguage().transfer.transSuccess });
                            root_1.popNew('app-view-wallet-transaction-transactionDetails', { hash: tx.hash });
                        }
                        return _context.abrupt("return", ret);

                    case 40:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[5, 31, 35, 38]]);
    }));
};
/**
 * 预估矿工费
 * @param currencyName 货币名称
 * @param options 可选项,货币为ETH或ERC20时必传
 */
exports.estimateMinerFee = function (currencyName) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var toAddr, pay, gasLimit, btcMinerFee;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        toAddr = config_1.defaultEthToAddr;
                        pay = 0;
                        gasLimit = 21000;
                        btcMinerFee = void 0;

                        if (!(currencyName === 'ETH')) {
                            _context2.next = 10;
                            break;
                        }

                        _context2.next = 7;
                        return exports.estimateGasETH(toAddr);

                    case 7:
                        gasLimit = _context2.sent;
                        _context2.next = 18;
                        break;

                    case 10:
                        if (!(currencyName === 'BTC')) {
                            _context2.next = 14;
                            break;
                        }

                        // todo 获取BTC矿工费估值
                        // for (const k in priorityMap) {
                        //     const nbBlocks = priorityMap[k];
                        //     const feeObj = await estimateMinerFeeBTC(nbBlocks);
                        //     console.log('estimateMinerFee---------------',feeObj);
                        //     btcMinerFee[nbBlocks] = formatBalance(feeObj[nbBlocks]);
                        // }
                        btcMinerFee = store_1.find('btcMinerFee');
                        _context2.next = 18;
                        break;

                    case 14:
                        if (!config_1.ERC20Tokens[currencyName]) {
                            _context2.next = 18;
                            break;
                        }

                        _context2.next = 17;
                        return exports.estimateGasERC20(currencyName, toAddr, pay);

                    case 17:
                        gasLimit = _context2.sent;

                    case 18:
                        return _context2.abrupt("return", {
                            gasLimit: gasLimit,
                            btcMinerFee: btcMinerFee
                        });

                    case 19:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
};
// =====================================================ETH
/**
 * 预估ETH的gas limit
 */
exports.estimateGasETH = function (toAddr, data) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var api;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        api = new api_2.Api();
                        return _context3.abrupt("return", api.estimateGas({ to: toAddr, data: data }));

                    case 2:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
};
/**
 * 处理ETH转账
 */
exports.doEthTransfer = function (wlt, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var api, fromAddr, toAddr, minerFeeLevel, pay, info, nonce, nonceMap, newNonce, localNonce, chainNonce, gasLimit, txObj, tx, hash;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        api = new api_2.Api();
                        fromAddr = txRecord.fromAddr;
                        toAddr = txRecord.toAddr;
                        minerFeeLevel = txRecord.minerFeeLevel || interface_1.MinerFeeLevel.STANDARD;
                        pay = txRecord.pay;
                        info = txRecord.info;
                        nonce = txRecord.nonce;
                        nonceMap = store_1.getBorn('nonceMap');
                        newNonce = nonce;

                        if (util_1.isNumber(nonce)) {
                            _context4.next = 16;
                            break;
                        }

                        localNonce = nonceMap.get(fromAddr);
                        _context4.next = 13;
                        return api.getTransactionCount(fromAddr);

                    case 13:
                        chainNonce = _context4.sent;

                        newNonce = localNonce && localNonce >= chainNonce ? localNonce : chainNonce;
                        nonceMap.set(fromAddr, newNonce + 1);

                    case 16:
                        _context4.next = 18;
                        return exports.estimateGasETH(toAddr, info);

                    case 18:
                        gasLimit = _context4.sent;
                        txObj = {
                            to: toAddr,
                            nonce: newNonce,
                            gasPrice: tools_1.fetchGasPrice(minerFeeLevel),
                            gasLimit: gasLimit,
                            value: unitTools_1.eth2Wei(pay),
                            data: info
                        };
                        tx = wlt.signRawTransaction(txObj);
                        _context4.prev = 21;
                        _context4.next = 24;
                        return api.sendRawTransaction(tx);

                    case 24:
                        hash = _context4.sent;

                        if (!util_1.isNumber(nonce)) {
                            store_1.updateStore('nonceMap', nonceMap);
                        }
                        return _context4.abrupt("return", {
                            hash: hash,
                            nonce: newNonce
                        });

                    case 29:
                        _context4.prev = 29;
                        _context4.t0 = _context4["catch"](21);

                        console.log(_context4.t0.message);
                        toolMessages_1.doErrorShow(_context4.t0);

                    case 33:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[21, 29]]);
    }));
};
/**
 * ETH交易签名
 */
exports.signRawTransactionETH = function (psw, fromAddr, toAddr, pay, minerFeeLevel, info, nonce) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var wallet, addrIndex, wlt, api, nonceMap, localNonce, chainNonce, gasLimit, txObj;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        wallet = store_1.find('curWallet');
                        _context5.prev = 1;
                        addrIndex = globalWallet_1.GlobalWallet.getWltAddrIndex(wallet, fromAddr, 'ETH');

                        if (!(addrIndex >= 0)) {
                            _context5.next = 21;
                            break;
                        }

                        _context5.next = 6;
                        return globalWallet_1.GlobalWallet.createWlt('ETH', psw, wallet, addrIndex);

                    case 6:
                        wlt = _context5.sent;
                        api = new api_2.Api();

                        if (nonce) {
                            _context5.next = 15;
                            break;
                        }

                        nonceMap = store_1.getBorn('nonceMap');
                        localNonce = nonceMap.get(fromAddr);
                        _context5.next = 13;
                        return api.getTransactionCount(fromAddr);

                    case 13:
                        chainNonce = _context5.sent;

                        nonce = localNonce && localNonce >= chainNonce ? localNonce : chainNonce;

                    case 15:
                        _context5.next = 17;
                        return exports.estimateGasETH(toAddr, info);

                    case 17:
                        gasLimit = _context5.sent;
                        txObj = {
                            to: toAddr,
                            nonce: nonce,
                            gasPrice: tools_1.fetchGasPrice(minerFeeLevel),
                            gasLimit: gasLimit,
                            value: unitTools_1.eth2Wei(pay),
                            data: info
                        };

                        console.log('txObj--------------', txObj);
                        return _context5.abrupt("return", wlt.signRawTransactionHash(txObj));

                    case 21:
                        _context5.next = 26;
                        break;

                    case 23:
                        _context5.prev = 23;
                        _context5.t0 = _context5["catch"](1);

                        toolMessages_1.doErrorShow(_context5.t0);

                    case 26:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[1, 23]]);
    }));
};
/**
 * 发送ETH交易
 * @param signedTx 签名交易
 */
exports.sendRawTransactionETH = function (signedTx) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var api, hash;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        api = new api_2.Api();
                        hash = '';
                        _context6.prev = 2;
                        _context6.next = 5;
                        return api.sendRawTransaction(signedTx);

                    case 5:
                        hash = _context6.sent;
                        _context6.next = 11;
                        break;

                    case 8:
                        _context6.prev = 8;
                        _context6.t0 = _context6["catch"](2);

                        toolMessages_1.doErrorShow(_context6.t0);

                    case 11:
                        return _context6.abrupt("return", hash);

                    case 12:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[2, 8]]);
    }));
};
// ==============================================ERC20
// 预估ETH ERC20Token的gas limit
exports.estimateGasERC20 = function (currencyName, toAddr, amount) {
    var api = new api_2.Api();
    var transferCode = wallet_1.EthWallet.tokenOperations('transfer', currencyName, toAddr, unitTools_1.ethTokenMultiplyDecimals(amount, currencyName));
    return api.estimateGas({ to: config_1.ERC20Tokens[currencyName].contractAddr, data: transferCode });
};
/**
 * 处理eth代币转账
 */
// tslint:disable-next-line:max-line-length
exports.doERC20TokenTransfer = function (wlt, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var api, fromAddr, toAddr, minerFeeLevel, pay, nonce, currencyName, nonceMap, newNonce, localNonce, chainNonce, transferCode, gasLimit, txObj, tx, hash;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        api = new api_2.Api();
                        fromAddr = txRecord.fromAddr;
                        toAddr = txRecord.toAddr;
                        minerFeeLevel = txRecord.minerFeeLevel;
                        pay = txRecord.pay;
                        nonce = txRecord.nonce;
                        currencyName = txRecord.currencyName;
                        nonceMap = store_1.getBorn('nonceMap');
                        newNonce = nonce;

                        if (util_1.isNumber(nonce)) {
                            _context7.next = 16;
                            break;
                        }

                        localNonce = nonceMap.get(fromAddr);
                        _context7.next = 13;
                        return api.getTransactionCount(fromAddr);

                    case 13:
                        chainNonce = _context7.sent;

                        newNonce = localNonce && localNonce >= chainNonce ? localNonce : chainNonce;
                        nonceMap.set(fromAddr, newNonce + 1);

                    case 16:
                        transferCode = wallet_1.EthWallet.tokenOperations('transfer', currencyName, toAddr, unitTools_1.ethTokenMultiplyDecimals(pay, currencyName));
                        _context7.next = 19;
                        return exports.estimateGasERC20(currencyName, toAddr, pay);

                    case 19:
                        gasLimit = _context7.sent;

                        // TODO  零时解决
                        gasLimit = Math.floor(gasLimit * 4);
                        console.log('gasLimit-------------', gasLimit);
                        txObj = {
                            to: config_1.ERC20Tokens[currencyName].contractAddr,
                            nonce: newNonce,
                            gasPrice: tools_1.fetchGasPrice(minerFeeLevel),
                            gasLimit: gasLimit,
                            value: 0,
                            data: transferCode
                        };

                        console.log('txObj---------------', txObj);
                        tx = wlt.signRawTransaction(txObj);
                        _context7.prev = 25;
                        _context7.next = 28;
                        return api.sendRawTransaction(tx);

                    case 28:
                        hash = _context7.sent;

                        if (!util_1.isNumber(nonce)) {
                            store_1.updateStore('nonceMap', nonceMap);
                        }
                        return _context7.abrupt("return", {
                            hash: hash,
                            nonce: newNonce
                        });

                    case 33:
                        _context7.prev = 33;
                        _context7.t0 = _context7["catch"](25);

                        console.log(_context7.t0.message);
                        toolMessages_1.doErrorShow(_context7.t0);

                    case 37:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, this, [[25, 33]]);
    }));
};
// ==================================================BTC
// 预估BTC矿工费
exports.estimateMinerFeeBTC = function () {
    var nbBlocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 12;
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        return _context8.abrupt("return", api_1.BtcApi.estimateFee(nbBlocks));

                    case 1:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));
};
/**
 * 处理BTC转账
 */
exports.doBtcTransfer = function (wlt, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var toAddr, pay, fromAddr, minerFeeLevel, output, retArr, rawHexString;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        toAddr = txRecord.toAddr;
                        pay = txRecord.pay;
                        fromAddr = txRecord.fromAddr;
                        minerFeeLevel = txRecord.minerFeeLevel;
                        output = {
                            toAddr: toAddr,
                            amount: pay,
                            chgAddr: fromAddr
                        };

                        console.log('output----------------', output);
                        wlt.unlock();
                        _context9.next = 9;
                        return wlt.init();

                    case 9:
                        _context9.next = 11;
                        return wlt.buildRawTransactionFromSingleAddress(fromAddr, output, tools_1.fetchBtcMinerFee(minerFeeLevel));

                    case 11:
                        retArr = _context9.sent;

                        wlt.lock();
                        // const rawHexString: string = retArr[0];
                        // console.log('rawTx',rawHexString);
                        rawHexString = retArr.rawTx;
                        return _context9.abrupt("return", api_1.BtcApi.sendRawTransaction(rawHexString));

                    case 15:
                    case "end":
                        return _context9.stop();
                }
            }
        }, _callee9, this);
    }));
};
/**
 * btc重发
 */
exports.resendBtcTransfer = function (wlt, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var minerFeeLevel, hash, retArr, rawHexString;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        minerFeeLevel = txRecord.minerFeeLevel;
                        hash = txRecord.hash;

                        wlt.unlock();
                        _context10.next = 5;
                        return wlt.init();

                    case 5:
                        _context10.next = 7;
                        return wlt.resendTx(hash, tools_1.fetchBtcMinerFee(minerFeeLevel));

                    case 7:
                        retArr = _context10.sent;

                        wlt.lock();
                        rawHexString = retArr.rawTx;
                        // console.log(rawHexString);

                        return _context10.abrupt("return", api_1.BtcApi.sendRawTransaction(rawHexString));

                    case 11:
                    case "end":
                        return _context10.stop();
                }
            }
        }, _callee10, this);
    }));
};
/**
 * BTC交易签名
 */
exports.signRawTransactionBTC = function (psw, fromAddr, toAddr, pay, minerFeeLevel) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var wallet, addrIndex, wlt, output, retArr;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        wallet = store_1.find('curWallet');
                        _context11.prev = 1;
                        addrIndex = globalWallet_1.GlobalWallet.getWltAddrIndex(wallet, fromAddr, 'BTC');

                        if (!(addrIndex >= 0)) {
                            _context11.next = 17;
                            break;
                        }

                        _context11.next = 6;
                        return globalWallet_1.GlobalWallet.createWlt('BTC', psw, wallet, addrIndex);

                    case 6:
                        wlt = _context11.sent;
                        output = {
                            toAddr: toAddr,
                            amount: pay,
                            chgAddr: fromAddr
                        };

                        console.log('output----------------', output);
                        wlt.unlock();
                        _context11.next = 12;
                        return wlt.init();

                    case 12:
                        _context11.next = 14;
                        return wlt.buildRawTransactionFromSingleAddress(fromAddr, output, tools_1.fetchBtcMinerFee(minerFeeLevel));

                    case 14:
                        retArr = _context11.sent;

                        wlt.lock();
                        return _context11.abrupt("return", retArr);

                    case 17:
                        _context11.next = 22;
                        break;

                    case 19:
                        _context11.prev = 19;
                        _context11.t0 = _context11["catch"](1);

                        toolMessages_1.doErrorShow(_context11.t0);

                    case 22:
                    case "end":
                        return _context11.stop();
                }
            }
        }, _callee11, this, [[1, 19]]);
    }));
};
/**
 * BTC重发交易签名
 */
exports.resendSignRawTransactionBTC = function (hash, psw, fromAddr, minerFeeLevel) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var wallet, addrIndex, wlt, retArr;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        wallet = store_1.find('curWallet');
                        _context12.prev = 1;
                        addrIndex = globalWallet_1.GlobalWallet.getWltAddrIndex(wallet, fromAddr, 'BTC');

                        if (!(addrIndex >= 0)) {
                            _context12.next = 15;
                            break;
                        }

                        _context12.next = 6;
                        return globalWallet_1.GlobalWallet.createWlt('BTC', psw, wallet, addrIndex);

                    case 6:
                        wlt = _context12.sent;

                        wlt.unlock();
                        _context12.next = 10;
                        return wlt.init();

                    case 10:
                        _context12.next = 12;
                        return wlt.resendTx(hash, tools_1.fetchBtcMinerFee(minerFeeLevel));

                    case 12:
                        retArr = _context12.sent;

                        wlt.lock();
                        return _context12.abrupt("return", retArr);

                    case 15:
                        _context12.next = 20;
                        break;

                    case 17:
                        _context12.prev = 17;
                        _context12.t0 = _context12["catch"](1);

                        toolMessages_1.doErrorShow(_context12.t0);

                    case 20:
                    case "end":
                        return _context12.stop();
                }
            }
        }, _callee12, this, [[1, 17]]);
    }));
};
/**
 * 发送BTC交易
 * @param signedTx 签名交易
 */
exports.sendRawTransactionBTC = function (rawHexString) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var hash, ret;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        hash = '';
                        _context13.prev = 1;
                        _context13.next = 4;
                        return api_1.BtcApi.sendRawTransaction(rawHexString);

                    case 4:
                        ret = _context13.sent;

                        hash = ret.txid;
                        _context13.next = 11;
                        break;

                    case 8:
                        _context13.prev = 8;
                        _context13.t0 = _context13["catch"](1);

                        toolMessages_1.doErrorShow(_context13.t0);

                    case 11:
                        return _context13.abrupt("return", hash);

                    case 12:
                    case "end":
                        return _context13.stop();
                }
            }
        }, _callee13, this, [[1, 8]]);
    }));
};
// ===================================================shapeShift相关start
/**
 * 获取shapeShift所支持的币种
 */
exports.getShapeShiftCoins = function () {
    shapeshift_1.shapeshift.coins(function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        var list = [];
        for (var k in data) {
            list.push(data[k]);
        }
        store_1.updateStore('shapeShiftCoins', list);
    });
};
/**
 *
 * @param pair 交易对
 */
exports.getMarketInfo = function (pair) {
    shapeshift_1.shapeshift.marketInfo(pair, function (err, marketInfo) {
        if (err) {
            console.error(err);
            return;
        }
        store_1.updateStore('shapeShiftMarketInfo', marketInfo);
    });
};
/**
 * 开始进行币币兑换
 * @param withdrawalAddress 入账币种的地址
 * @param returnAddress 失败后的退款地址
 * @param pair 交易对
 */
exports.beginShift = function (withdrawalAddress, returnAddress, pair, success, fail) {
    var options = {
        returnAddress: returnAddress,
        apiKey: constants_1.shapeshiftApiPublicKey
    };
    shapeshift_1.shapeshift.shift(withdrawalAddress, pair, options, function (err, returnData) {
        return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
            return regeneratorRuntime.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            console.log('returnData', returnData);

                            if (!err) {
                                _context14.next = 4;
                                break;
                            }

                            fail && fail(err);
                            return _context14.abrupt("return");

                        case 4:
                            // ShapeShift owned BTC address that you send your BTC to
                            // const depositAddress = returnData.deposit;
                            // NOTE: `depositAmount`, `expiration`, and `quotedRate` are only returned if
                            // you set `options.amount`
                            // amount to send to ShapeShift (type string)
                            // const shiftAmount = returnData.depositAmount;
                            // Time before rate expires (type number, time from epoch in seconds)
                            // const expiration = new Date(returnData.expiration * 1000);
                            // rate of exchange, 1 BTC for ??? LTC (type string)
                            // const rate = returnData.quotedRate;
                            // you need to actually then send your BTC to ShapeShift
                            // you could use module `spend`: https://www.npmjs.com/package/spend
                            // CONVERT AMOUNT TO SATOSHIS IF YOU USED `spend`
                            // spend(SS_BTC_WIF, depositAddress, shiftAmountSatoshis, function (err, txId) { /.. ../ })
                            // later, you can then check the deposit status
                            success && success(returnData);

                        case 5:
                        case "end":
                            return _context14.stop();
                    }
                }
            }, _callee14, this);
        }));
    });
};
/**
 * 获取币币交易记录
 * @param addr 要获取交易记录的地址
 */
exports.getTransactionsByAddr = function (addr) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var addrLowerCase, transactions, getTxByHash, shapeShiftTxsMap, shapeShiftTxs, count, txs;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        addrLowerCase = addr.toLowerCase();

                        transactions = function transactions(addr) {
                            return new Promise(function (resolve, reject) {
                                shapeshift_1.shapeshift.transactions(constants_1.shapeshiftApiPrivateKey, addr, function (err, transactions) {
                                    if (err || transactions.length === 0) {
                                        reject(err || new Error('null array'));
                                    }
                                    resolve(transactions);
                                });
                            });
                        };

                        getTxByHash = function getTxByHash(txs, hash) {
                            for (var i = 0; i < txs.length; i++) {
                                // tslint:disable-next-line:possible-timing-attack
                                if (txs[i].inputTXID === hash) {
                                    return i;
                                }
                            }
                            return -1;
                        };

                        shapeShiftTxsMap = store_1.getBorn('shapeShiftTxsMap');
                        shapeShiftTxs = shapeShiftTxsMap.get(addrLowerCase) || { addr: addrLowerCase, list: [] };
                        count = constants_1.shapeshiftTransactionRequestNumber;

                    case 6:
                        if (!(count >= 0)) {
                            _context15.next = 26;
                            break;
                        }

                        txs = void 0;
                        _context15.prev = 8;
                        _context15.next = 11;
                        return transactions(addrLowerCase);

                    case 11:
                        txs = _context15.sent;
                        _context15.next = 16;
                        break;

                    case 14:
                        _context15.prev = 14;
                        _context15.t0 = _context15["catch"](8);

                    case 16:
                        if (!txs) {
                            _context15.next = 22;
                            break;
                        }

                        console.log('shapeshifttx', txs);
                        txs.forEach(function (tx) {
                            var index = getTxByHash(shapeShiftTxs.list || [], tx.inputTXID);
                            if (index >= 0) {
                                shapeShiftTxs.list[index] = tx;
                            } else {
                                shapeShiftTxs.list.push(tx);
                            }
                        });
                        shapeShiftTxsMap.set(addrLowerCase, shapeShiftTxs);
                        store_1.updateStore('shapeShiftTxsMap', shapeShiftTxsMap);
                        return _context15.abrupt("return");

                    case 22:
                        count--;
                        console.log(count);
                        _context15.next = 6;
                        break;

                    case 26:
                        store_1.updateStore('shapeShiftTxsMap', shapeShiftTxsMap);

                    case 27:
                    case "end":
                        return _context15.stop();
                }
            }
        }, _callee15, this, [[8, 14]]);
    }));
};
// ===================================================shapeShift相关end
// ===================================================== 本地
// ================================重发
/**
 * 普通转账重发
 */
exports.resendNormalTransfer = function (psw, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var loading, wallet, fromAddr, currencyName, ret, addrIndex, wlt, res, t, tx, oldHash, index, trans, i;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
                switch (_context16.prev = _context16.next) {
                    case 0:
                        console.log('----------resendNormalTransfer--------------');
                        loading = root_1.popNew('app-components1-loading-loading', { text: tools_1.getStaticLanguage().transfer.againSend });
                        wallet = store_1.find('curWallet');
                        fromAddr = txRecord.fromAddr;
                        currencyName = txRecord.currencyName;
                        ret = void 0;
                        _context16.prev = 6;
                        addrIndex = globalWallet_1.GlobalWallet.getWltAddrIndex(wallet, fromAddr, currencyName);

                        if (!(addrIndex >= 0)) {
                            _context16.next = 31;
                            break;
                        }

                        _context16.next = 11;
                        return globalWallet_1.GlobalWallet.createWlt(currencyName, psw, wallet, addrIndex);

                    case 11:
                        wlt = _context16.sent;

                        if (!(currencyName === 'ETH')) {
                            _context16.next = 19;
                            break;
                        }

                        _context16.next = 15;
                        return exports.doEthTransfer(wlt, txRecord);

                    case 15:
                        ret = _context16.sent;

                        console.log('--------------ret', ret);
                        _context16.next = 31;
                        break;

                    case 19:
                        if (!(currencyName === 'BTC')) {
                            _context16.next = 27;
                            break;
                        }

                        _context16.next = 22;
                        return exports.resendBtcTransfer(wlt, txRecord);

                    case 22:
                        res = _context16.sent;

                        console.log('btc res-----', res);
                        ret = {
                            hash: res.txid,
                            nonce: -1
                        };
                        _context16.next = 31;
                        break;

                    case 27:
                        if (!config_1.ERC20Tokens[currencyName]) {
                            _context16.next = 31;
                            break;
                        }

                        _context16.next = 30;
                        return exports.doERC20TokenTransfer(wlt, txRecord);

                    case 30:
                        ret = _context16.sent;

                    case 31:
                        _context16.next = 37;
                        break;

                    case 33:
                        _context16.prev = 33;
                        _context16.t0 = _context16["catch"](6);

                        console.log(_context16.t0.message);
                        toolMessages_1.doErrorShow(_context16.t0);

                    case 37:
                        _context16.prev = 37;

                        loading.callback(loading.widget);
                        return _context16.finish(37);

                    case 40:
                        if (!ret) {
                            _context16.next = 60;
                            break;
                        }

                        t = new Date();
                        tx = Object.assign({}, txRecord, { hash: ret.hash, time: t.getTime() });
                        oldHash = txRecord.hash;
                        index = -1;
                        trans = store_1.find('transactions');
                        i = 0;

                    case 47:
                        if (!(i < trans.length)) {
                            _context16.next = 54;
                            break;
                        }

                        if (!(trans[i].hash === oldHash)) {
                            _context16.next = 51;
                            break;
                        }

                        index = i;
                        return _context16.abrupt("break", 54);

                    case 51:
                        i++;
                        _context16.next = 47;
                        break;

                    case 54:
                        trans.splice(index, 1, tx); // 删除重发前的本地记录
                        store_1.updateStore('transactions', trans);
                        dataCenter_1.dataCenter.clearTimer(oldHash); // 删除定时器
                        dataCenter_1.dataCenter.refreshTrans(tx.fromAddr, tx.currencyName);
                        root_1.popNew('app-components-message-message', { content: tools_1.getStaticLanguage().transfer.againSuccess });
                        root_1.popNew('app-view-wallet-transaction-transactionDetails', { hash: tx.hash });

                    case 60:
                        return _context16.abrupt("return", ret);

                    case 61:
                    case "end":
                        return _context16.stop();
                }
            }
        }, _callee16, this, [[6, 33, 37, 40]]);
    }));
};
/**
 * 充值重发
 */
exports.resendRecharge = function (psw, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        var loading, tx, oldHash, index, trans, i;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        console.log('----------resendRecharge--------------');
                        loading = root_1.popNew('app-components1-loading-loading', { text: tools_1.getStaticLanguage().transfer.againSend });
                        tx = void 0;
                        _context17.prev = 3;

                        if (!(txRecord.currencyName === 'BTC')) {
                            _context17.next = 10;
                            break;
                        }

                        _context17.next = 7;
                        return exports.resendBtcRecharge(psw, txRecord);

                    case 7:
                        tx = _context17.sent;
                        _context17.next = 13;
                        break;

                    case 10:
                        _context17.next = 12;
                        return exports.ethRecharge(psw, txRecord);

                    case 12:
                        tx = _context17.sent;

                    case 13:
                        _context17.next = 19;
                        break;

                    case 15:
                        _context17.prev = 15;
                        _context17.t0 = _context17["catch"](3);

                        console.log(_context17.t0.message);
                        toolMessages_1.doErrorShow(_context17.t0);

                    case 19:
                        _context17.prev = 19;

                        loading.callback(loading.widget);
                        return _context17.finish(19);

                    case 22:
                        if (!tx) {
                            _context17.next = 41;
                            break;
                        }

                        oldHash = txRecord.hash;
                        index = -1;
                        trans = store_1.find('transactions');
                        i = 0;

                    case 27:
                        if (!(i < trans.length)) {
                            _context17.next = 34;
                            break;
                        }

                        if (!(trans[i].hash === oldHash)) {
                            _context17.next = 31;
                            break;
                        }

                        index = i;
                        return _context17.abrupt("break", 34);

                    case 31:
                        i++;
                        _context17.next = 27;
                        break;

                    case 34:
                        trans.splice(index, 1, tx); // 删除重发前的本地记录
                        store_1.updateStore('transactions', trans);
                        dataCenter_1.dataCenter.clearTimer(oldHash); // 删除定时器
                        dataCenter_1.dataCenter.refreshTrans(tx.fromAddr, tx.currencyName);
                        pull_1.getRechargeLogs(tx.currencyName);
                        root_1.popNew('app-components-message-message', { content: tools_1.getStaticLanguage().transfer.againSuccess });
                        root_1.popNew('app-view-wallet-transaction-transactionDetails', { hash: tx.hash });

                    case 41:
                        return _context17.abrupt("return", tx.hash);

                    case 42:
                    case "end":
                        return _context17.stop();
                }
            }
        }, _callee17, this, [[3, 15, 19, 22]]);
    }));
};
// ================================重发
exports.recharge = function (psw, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
        var tx, close, trans;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
                switch (_context18.prev = _context18.next) {
                    case 0:
                        tx = void 0;
                        close = root_1.popNew('app-components1-loading-loading', { text: tools_1.getStaticLanguage().transfer.recharge });

                        if (!(txRecord.currencyName === 'BTC')) {
                            _context18.next = 8;
                            break;
                        }

                        _context18.next = 5;
                        return exports.btcRecharge(psw, txRecord);

                    case 5:
                        tx = _context18.sent;
                        _context18.next = 11;
                        break;

                    case 8:
                        _context18.next = 10;
                        return exports.ethRecharge(psw, txRecord);

                    case 10:
                        tx = _context18.sent;

                    case 11:
                        close.callback(close.widget);
                        if (tx) {
                            root_1.popNew('app-components-message-message', { content: tools_1.getStaticLanguage().transfer.rechargeSuccess });
                            trans = store_1.find('transactions');

                            trans.push(tx);
                            store_1.updateStore('transactions', trans);
                            dataCenter_1.dataCenter.refreshTrans(tx.fromAddr, tx.currencyName);
                            pull_1.getRechargeLogs(tx.currencyName);
                            root_1.popNew('app-view-wallet-transaction-transactionDetails', { hash: tx.hash });
                        }
                        return _context18.abrupt("return", tx.hash);

                    case 14:
                    case "end":
                        return _context18.stop();
                }
            }
        }, _callee18, this);
    }));
};
/**
 * eth充值
 */
exports.ethRecharge = function (psw, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        var toAddr, fromAddr, minerFeeLevel, gasPrice, pay, info, gasLimit, minerFee, nonce, obj, signedTX, hash, canTransfer, h, nonceMap, t, record;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
            while (1) {
                switch (_context19.prev = _context19.next) {
                    case 0:
                        _context19.next = 2;
                        return pull_1.getBankAddr();

                    case 2:
                        toAddr = _context19.sent;

                        if (toAddr) {
                            _context19.next = 5;
                            break;
                        }

                        return _context19.abrupt("return");

                    case 5:
                        fromAddr = txRecord.fromAddr;
                        minerFeeLevel = txRecord.minerFeeLevel;
                        gasPrice = tools_1.fetchGasPrice(minerFeeLevel);
                        pay = txRecord.pay;
                        info = txRecord.info;
                        _context19.next = 12;
                        return exports.estimateGasETH(toAddr, info);

                    case 12:
                        gasLimit = _context19.sent;
                        minerFee = unitTools_1.wei2Eth(gasLimit * tools_1.fetchGasPrice(minerFeeLevel));
                        nonce = txRecord.nonce;
                        _context19.next = 17;
                        return exports.signRawTransactionETH(psw, fromAddr, toAddr, pay, minerFeeLevel, info, nonce);

                    case 17:
                        obj = _context19.sent;

                        if (obj) {
                            _context19.next = 20;
                            break;
                        }

                        return _context19.abrupt("return");

                    case 20:
                        signedTX = obj.signedTx;
                        hash = "0x" + obj.hash;

                        nonce = Number(obj.nonce);
                        _context19.next = 25;
                        return pull_1.rechargeToServer(fromAddr, toAddr, hash, nonce, gasPrice, unitTools_1.eth2Wei(pay));

                    case 25:
                        canTransfer = _context19.sent;

                        if (canTransfer) {
                            _context19.next = 28;
                            break;
                        }

                        return _context19.abrupt("return");

                    case 28:
                        _context19.next = 30;
                        return exports.sendRawTransactionETH(signedTX);

                    case 30:
                        h = _context19.sent;

                        if (h) {
                            _context19.next = 33;
                            break;
                        }

                        return _context19.abrupt("return");

                    case 33:
                        if (!txRecord.nonce) {
                            nonceMap = store_1.getBorn('nonceMap');

                            nonceMap.set(fromAddr, nonce + 1);
                            store_1.updateStore('nonceMap', nonceMap);
                        }
                        // 维护本地交易记录
                        t = new Date();
                        // tslint:disable-next-line:no-unnecessary-local-variable

                        record = Object.assign({}, txRecord, { nonce: nonce,
                            hash: hash,
                            toAddr: toAddr, time: t.getTime(), fee: minerFee, minerFeeLevel: minerFeeLevel });
                        return _context19.abrupt("return", record);

                    case 37:
                    case "end":
                        return _context19.stop();
                }
            }
        }, _callee19, this);
    }));
};
/**
 * btc充值
 */
exports.btcRecharge = function (psw, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
        var toAddr, fromAddr, minerFeeLevel, pay, minerFee, obj, oldHash, signedTX, hash, canTransfer, h, t, record;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
            while (1) {
                switch (_context20.prev = _context20.next) {
                    case 0:
                        _context20.next = 2;
                        return pull_1.getBtcBankAddr();

                    case 2:
                        toAddr = _context20.sent;

                        if (toAddr) {
                            _context20.next = 5;
                            break;
                        }

                        return _context20.abrupt("return");

                    case 5:
                        fromAddr = txRecord.fromAddr;
                        minerFeeLevel = txRecord.minerFeeLevel;
                        pay = txRecord.pay;
                        minerFee = tools_1.fetchBtcMinerFee(minerFeeLevel);
                        _context20.next = 11;
                        return exports.signRawTransactionBTC(psw, fromAddr, toAddr, pay, minerFeeLevel);

                    case 11:
                        obj = _context20.sent;

                        if (obj) {
                            _context20.next = 14;
                            break;
                        }

                        return _context20.abrupt("return");

                    case 14:
                        oldHash = txRecord.hash;
                        signedTX = obj.rawTx;
                        hash = obj.hash;
                        _context20.next = 19;
                        return pull_1.btcRechargeToServer(toAddr, hash, unitTools_1.btc2Sat(pay).toString(), minerFee, oldHash);

                    case 19:
                        canTransfer = _context20.sent;

                        if (canTransfer) {
                            _context20.next = 22;
                            break;
                        }

                        return _context20.abrupt("return");

                    case 22:
                        _context20.next = 24;
                        return exports.sendRawTransactionBTC(signedTX);

                    case 24:
                        h = _context20.sent;

                        if (h) {
                            _context20.next = 27;
                            break;
                        }

                        return _context20.abrupt("return");

                    case 27:
                        // 维护本地交易记录
                        t = new Date();
                        // tslint:disable-next-line:no-unnecessary-local-variable

                        record = Object.assign({}, txRecord, { hash: hash,
                            toAddr: toAddr, time: t.getTime(), fee: minerFee, minerFeeLevel: minerFeeLevel });
                        return _context20.abrupt("return", record);

                    case 30:
                    case "end":
                        return _context20.stop();
                }
            }
        }, _callee20, this);
    }));
};
/**
 * btc重发充值
 */
exports.resendBtcRecharge = function (psw, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
        var toAddr, fromAddr, minerFeeLevel, pay, minerFee, ret, oldHash, hash, signedTx, canTransfer, h, t, record;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
            while (1) {
                switch (_context21.prev = _context21.next) {
                    case 0:
                        _context21.next = 2;
                        return pull_1.getBtcBankAddr();

                    case 2:
                        toAddr = _context21.sent;

                        if (toAddr) {
                            _context21.next = 5;
                            break;
                        }

                        return _context21.abrupt("return");

                    case 5:
                        fromAddr = txRecord.fromAddr;
                        minerFeeLevel = txRecord.minerFeeLevel;
                        pay = txRecord.pay;
                        minerFee = tools_1.fetchBtcMinerFee(minerFeeLevel);
                        _context21.next = 11;
                        return exports.resendSignRawTransactionBTC(txRecord.hash, psw, fromAddr, minerFeeLevel);

                    case 11:
                        ret = _context21.sent;

                        if (ret) {
                            _context21.next = 14;
                            break;
                        }

                        return _context21.abrupt("return");

                    case 14:
                        oldHash = txRecord.hash;
                        hash = ret.newTxid;
                        signedTx = ret.rawTx;
                        _context21.next = 19;
                        return pull_1.btcRechargeToServer(toAddr, hash, unitTools_1.btc2Sat(pay).toString(), minerFee, oldHash);

                    case 19:
                        canTransfer = _context21.sent;

                        if (canTransfer) {
                            _context21.next = 22;
                            break;
                        }

                        return _context21.abrupt("return");

                    case 22:
                        _context21.next = 24;
                        return exports.sendRawTransactionBTC(signedTx);

                    case 24:
                        h = _context21.sent;

                        if (h) {
                            _context21.next = 27;
                            break;
                        }

                        return _context21.abrupt("return");

                    case 27:
                        // 维护本地交易记录
                        t = new Date();
                        // tslint:disable-next-line:no-unnecessary-local-variable

                        record = Object.assign({}, txRecord, { hash: hash, time: t.getTime(), fee: minerFee, minerFeeLevel: minerFeeLevel });
                        return _context21.abrupt("return", record);

                    case 30:
                    case "end":
                        return _context21.stop();
                }
            }
        }, _callee21, this);
    }));
};
/**
 *
 * 提现
 */
exports.withdraw = function (passwd, toAddr, currencyName, amount) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
            while (1) {
                switch (_context22.prev = _context22.next) {
                    case 0:
                        if (!(currencyName === 'BTC')) {
                            _context22.next = 4;
                            break;
                        }

                        return _context22.abrupt("return", exports.btcWithdraw(passwd, toAddr, amount));

                    case 4:
                        return _context22.abrupt("return", exports.ethWithdraw(passwd, toAddr, amount));

                    case 5:
                    case "end":
                        return _context22.stop();
                }
            }
        }, _callee22, this);
    }));
};
// eth提现
exports.ethWithdraw = function (passwd, toAddr, amount) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
        var wallet, close, verify, hash, tx;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
            while (1) {
                switch (_context23.prev = _context23.next) {
                    case 0:
                        wallet = store_1.find('curWallet');
                        close = root_1.popNew('app-components1-loading-loading', { text: tools_1.getStaticLanguage().transfer.withdraw });
                        _context23.next = 4;
                        return walletTools_1.VerifyIdentidy(wallet, passwd);

                    case 4:
                        verify = _context23.sent;

                        if (verify) {
                            _context23.next = 9;
                            break;
                        }

                        close.callback(close.widget);
                        root_1.popNew('app-components-message-message', { content: tools_1.getStaticLanguage().transfer.wrongPsw });
                        return _context23.abrupt("return");

                    case 9:
                        _context23.next = 11;
                        return pull_1.withdrawFromServer(toAddr, unitTools_1.eth2Wei(amount));

                    case 11:
                        hash = _context23.sent;

                        close.callback(close.widget);
                        if (hash) {
                            root_1.popNew('app-components-message-message', { content: tools_1.getStaticLanguage().transfer.withdrawSuccess });
                            tx = {
                                hash: hash,
                                addr: toAddr,
                                txType: interface_1.TxType.RECEIPT,
                                fromAddr: '',
                                toAddr: toAddr,
                                pay: Number(amount),
                                time: new Date().getTime(),
                                status: interface_1.TxStatus.PENDING,
                                confirmedBlockNumber: 0,
                                needConfirmedBlockNumber: 0,
                                info: '',
                                currencyName: 'ETH',
                                fee: 0,
                                nonce: undefined
                            };

                            dataCenter_1.dataCenter.timerUpdateTxWithdraw(tx);
                            pull_1.getWithdrawLogs('ETH');
                        }
                        return _context23.abrupt("return", hash);

                    case 15:
                    case "end":
                        return _context23.stop();
                }
            }
        }, _callee23, this);
    }));
};
// btc提现
exports.btcWithdraw = function (passwd, toAddr, amount) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
        var wallet, close, verify, hash, tx;
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
            while (1) {
                switch (_context24.prev = _context24.next) {
                    case 0:
                        wallet = store_1.find('curWallet');
                        close = root_1.popNew('app-components1-loading-loading', { text: tools_1.getStaticLanguage().transfer.withdraw });
                        _context24.next = 4;
                        return walletTools_1.VerifyIdentidy(wallet, passwd);

                    case 4:
                        verify = _context24.sent;

                        if (verify) {
                            _context24.next = 9;
                            break;
                        }

                        close.callback(close.widget);
                        root_1.popNew('app-components-message-message', { content: tools_1.getStaticLanguage().transfer.wrongPsw });
                        return _context24.abrupt("return");

                    case 9:
                        _context24.next = 11;
                        return pull_1.btcWithdrawFromServer(toAddr, unitTools_1.btc2Sat(amount).toString());

                    case 11:
                        hash = _context24.sent;

                        close.callback(close.widget);
                        if (hash) {
                            root_1.popNew('app-components-message-message', { content: tools_1.getStaticLanguage().transfer.withdrawSuccess });
                            tx = {
                                hash: hash,
                                addr: toAddr,
                                txType: interface_1.TxType.RECEIPT,
                                fromAddr: '',
                                toAddr: toAddr,
                                pay: Number(amount),
                                time: new Date().getTime(),
                                status: interface_1.TxStatus.PENDING,
                                confirmedBlockNumber: 0,
                                needConfirmedBlockNumber: 0,
                                info: '',
                                currencyName: 'BTC',
                                fee: 0,
                                nonce: undefined
                            };

                            dataCenter_1.dataCenter.timerUpdateTxWithdraw(tx);
                            pull_1.getWithdrawLogs('BTC');
                        }
                        return _context24.abrupt("return", hash);

                    case 15:
                    case "end":
                        return _context24.stop();
                }
            }
        }, _callee24, this);
    }));
};
})