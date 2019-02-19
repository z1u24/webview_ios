_$define("app/net/pullWallet", function (require, exports, module){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
var webview_1 = require("../../pi/browser/webview");
var root_1 = require("../../pi/ui/root");
var util_1 = require("../../pi/util/util");
var config_1 = require("../config");
var api_1 = require("../core/btc/api");
var api_2 = require("../core/eth/api");
var wallet_1 = require("../core/eth/wallet");
var globalWallet_1 = require("../core/globalWallet");
var dataCenter_1 = require("../logic/dataCenter");
var interface_1 = require("../store/interface");
var constants_1 = require("../utils/constants");
var toolMessages_1 = require("../utils/toolMessages");
// tslint:disable-next-line:max-line-length
var tools_1 = require("../utils/tools");
var unitTools_1 = require("../utils/unitTools");
var walletTools_1 = require("../utils/walletTools");
// tslint:disable-next-line:max-line-length
var pull_1 = require("./pull");
/**
 * 供其他的webview调用
 */
exports.rpcProviderSendAsync = function (payload, callback) {
    wallet_1.initWeb3();
    if (payload.method === 'eth_accounts') {
        var addr = tools_1.getCurrentEthAddr();
        addr = addr ? [addr] : [];
        callback(null, { jsonrpc: '2.0', result: addr, id: payload.id });
    } else if (payload.method === 'eth_sendTransaction') {
        // alert(`payload is ${JSON.stringify(payload)}`);
        var ethPayload = {
            fromAddr: payload.params[0].from,
            toAddr: payload.params[0].to,
            pay: payload.params[0].value,
            currencyName: 'ETH',
            data: payload.params[0].data
        };
        try {
            var promise = exports.transfer3(payload.passwd, ethPayload);
            promise.then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    err = _ref2[0],
                    hash = _ref2[1];

                console.log("wallet rpcProviderSendAsync err is " + err + ", hash is " + hash);
                if (err) {
                    callback(err);
                } else {
                    callback(null, { jsonrpc: '2.0', result: hash, id: payload.id });
                }
            }).catch(function (err) {
                console.log("wallet rpcProviderSendAsync err is catch");
                callback(err);
            });
        } catch (e) {
            console.log("transfer3 catch throw");
            callback(e);
        }
    } else {
        if (wallet_1.web3 && wallet_1.web3.currentProvider && wallet_1.web3.currentProvider.sendAsync) {
            wallet_1.web3.currentProvider.sendAsync(payload, callback);
        }
    }
    // 关闭webview定时器
    webview_1.WebViewManager.endTimer();
};
/**
 * 普通转账
 */
exports.transfer3 = function (psw, txPayload) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var fromAddr, currencyName, minerFeeLevel, minerFeeList, fee, txRecord, addrIndex, hash, wltPromise, api, nonce, localNonce, gasLimitPromise, chainNoncePromise, _ref3, _ref4, wlt, gasLimit, chainNonce, newGasLimit, newNonce, txObj, tx;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        console.time('transfer3 need time = ');

                        if (!(psw.length <= 0)) {
                            _context.next = 4;
                            break;
                        }

                        return _context.abrupt("return", ['have no password']);

                    case 4:
                        fromAddr = txPayload.fromAddr;
                        currencyName = txPayload.currencyName;
                        minerFeeLevel = interface_1.MinerFeeLevel.Standard;
                        minerFeeList = tools_1.fetchMinerFeeList(currencyName);
                        fee = minerFeeList[minerFeeLevel].minerFee;
                        txRecord = {
                            hash: '',
                            addr: fromAddr,
                            txType: interface_1.TxType.Transfer,
                            fromAddr: fromAddr,
                            toAddr: txPayload.toAddr,
                            pay: unitTools_1.wei2Eth(txPayload.pay),
                            time: 0,
                            status: interface_1.TxStatus.Pending,
                            confirmedBlockNumber: 0,
                            needConfirmedBlockNumber: 0,
                            info: '',
                            currencyName: currencyName,
                            fee: fee,
                            nonce: undefined,
                            minerFeeLevel: minerFeeLevel
                        };
                        addrIndex = walletTools_1.getWltAddrIndex(fromAddr, currencyName);
                        hash = void 0;

                        if (!(addrIndex >= 0)) {
                            _context.next = 41;
                            break;
                        }

                        console.time('transfer3 wltPromise');
                        wltPromise = globalWallet_1.GlobalWallet.createWlt(currencyName, psw, addrIndex).then(function (wlt) {
                            console.timeEnd('transfer3 wltPromise');
                            return wlt;
                        });
                        api = new api_2.Api();
                        nonce = txRecord.nonce;
                        localNonce = tools_1.getEthNonce(fromAddr);
                        // 0xe209a49a0000000000000000000000000000000000000000000000000000000000000001
                        // toAddr  0x0e7f42cdf739c06dd3c1c32fab5e50ec9620102a

                        console.time('transfer3 gasLimitPromise');
                        // tslint:disable-next-line:max-line-length
                        gasLimitPromise = api.estimateGas({ to: txPayload.toAddr, from: txPayload.fromAddr, value: txPayload.pay, data: txPayload.data }).then(function (gasLimit) {
                            console.timeEnd('transfer3 gasLimitPromise');
                            return gasLimit;
                        });

                        console.time('transfer3 chainNoncePromise');
                        chainNoncePromise = api.getTransactionCount(fromAddr).then(function (chainNonce) {
                            console.timeEnd('transfer3 chainNoncePromise');
                            return chainNonce;
                        });

                        console.time('transfer3 all promise need');
                        _context.next = 25;
                        return Promise.all([wltPromise, gasLimitPromise, chainNoncePromise]);

                    case 25:
                        _ref3 = _context.sent;
                        _ref4 = _slicedToArray(_ref3, 3);
                        wlt = _ref4[0];
                        gasLimit = _ref4[1];
                        chainNonce = _ref4[2];

                        console.timeEnd('transfer3 all promise need');
                        // TODO  直接使用预估出来的gasLimit交易有可能失败   零时解决
                        newGasLimit = Math.floor(gasLimit * constants_1.erc20GasLimitRate);
                        newNonce = nonce;

                        if (!util_1.isNumber(nonce)) {
                            newNonce = localNonce && localNonce >= chainNonce ? localNonce : chainNonce;
                        }
                        txObj = {
                            to: txPayload.toAddr,
                            nonce: newNonce,
                            gasPrice: tools_1.fetchGasPrice(minerFeeLevel),
                            gasLimit: newGasLimit,
                            value: txPayload.pay,
                            data: txPayload.data
                        };
                        tx = wlt.signRawTransaction(txObj);

                        console.time('transfer3 sendRawTransaction need time =');
                        _context.next = 39;
                        return api.sendRawTransaction(tx);

                    case 39:
                        hash = _context.sent;

                        console.timeEnd('transfer3 sendRawTransaction need time =');

                    case 41:
                        if (!hash) {
                            _context.next = 49;
                            break;
                        }

                        txRecord.hash = hash;
                        tools_1.updateLocalTx(txRecord);
                        dataCenter_1.dataCenter.updateAddrInfo(txRecord.addr, txRecord.currencyName);
                        console.timeEnd('transfer3 need time = ');
                        return _context.abrupt("return", [undefined, hash]);

                    case 49:
                        return _context.abrupt("return", ['send transaction failed']);

                    case 50:
                        _context.next = 55;
                        break;

                    case 52:
                        _context.prev = 52;
                        _context.t0 = _context["catch"](0);
                        return _context.abrupt("return", [_context.t0, undefined]);

                    case 55:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 52]]);
    }));
};
/**
 * 普通转账
 */
exports.transfer = function (psw, txPayload, success, fail) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var fromAddr, currencyName, needConfirmedBlockNumber, txRecord, ret, addrIndex, res, tx;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        fromAddr = txPayload.fromAddr;
                        currencyName = txPayload.currencyName;
                        needConfirmedBlockNumber = tools_1.getConfirmBlockNumber(currencyName, txPayload.pay);
                        txRecord = {
                            hash: '',
                            addr: fromAddr,
                            txType: interface_1.TxType.Transfer,
                            fromAddr: fromAddr,
                            toAddr: txPayload.toAddr,
                            pay: txPayload.pay,
                            time: 0,
                            status: interface_1.TxStatus.Pending,
                            confirmedBlockNumber: 0,
                            needConfirmedBlockNumber: needConfirmedBlockNumber,
                            info: '',
                            currencyName: currencyName,
                            fee: txPayload.fee,
                            nonce: undefined,
                            minerFeeLevel: txPayload.minerFeeLevel
                        };
                        _context2.prev = 4;
                        ret = void 0;
                        addrIndex = walletTools_1.getWltAddrIndex(fromAddr, currencyName);

                        if (!(addrIndex >= 0)) {
                            _context2.next = 25;
                            break;
                        }

                        if (!(currencyName === 'ETH')) {
                            _context2.next = 14;
                            break;
                        }

                        _context2.next = 11;
                        return exports.doEthTransfer(psw, addrIndex, txRecord);

                    case 11:
                        ret = _context2.sent;
                        _context2.next = 25;
                        break;

                    case 14:
                        if (!(currencyName === 'BTC')) {
                            _context2.next = 21;
                            break;
                        }

                        _context2.next = 17;
                        return exports.doBtcTransfer(psw, addrIndex, txRecord);

                    case 17:
                        res = _context2.sent;

                        if (res) {
                            ret = {
                                hash: res.txid,
                                nonce: 0
                            };
                        }
                        _context2.next = 25;
                        break;

                    case 21:
                        if (!config_1.ERC20Tokens[currencyName]) {
                            _context2.next = 25;
                            break;
                        }

                        _context2.next = 24;
                        return exports.doERC20TokenTransfer(psw, addrIndex, txRecord);

                    case 24:
                        ret = _context2.sent;

                    case 25:
                        if (!ret) {
                            _context2.next = 30;
                            break;
                        }

                        tx = Object.assign({}, txRecord, { hash: ret.hash, nonce: ret.nonce, time: new Date().getTime() });

                        success(tx);
                        _context2.next = 31;
                        break;

                    case 30:
                        throw new Error('send transaction failed');

                    case 31:
                        _context2.next = 36;
                        break;

                    case 33:
                        _context2.prev = 33;
                        _context2.t0 = _context2["catch"](4);

                        fail(_context2.t0);

                    case 36:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[4, 33]]);
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
exports.doEthTransfer = function (psw, addrIndex, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var wltPromise, api, fromAddr, toAddr, minerFeeLevel, pay, info, nonce, localNonce, chainNoncePromise, gasLimitPromise, _ref5, _ref6, wlt, chainNonce, gasLimit, newNonce, txObj, tx, hash;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        wltPromise = globalWallet_1.GlobalWallet.createWlt('ETH', psw, addrIndex);
                        api = new api_2.Api();
                        fromAddr = txRecord.fromAddr;
                        toAddr = txRecord.toAddr;
                        minerFeeLevel = txRecord.minerFeeLevel || interface_1.MinerFeeLevel.Standard;
                        pay = txRecord.pay;
                        info = txRecord.info;
                        nonce = txRecord.nonce;
                        localNonce = tools_1.getEthNonce(fromAddr);
                        chainNoncePromise = void 0;

                        if (!util_1.isNumber(nonce)) {
                            chainNoncePromise = api.getTransactionCount(fromAddr);
                        } else {
                            chainNoncePromise = Promise.resolve(localNonce);
                        }
                        gasLimitPromise = exports.estimateGasETH(toAddr, info);
                        _context4.next = 14;
                        return Promise.all([wltPromise, chainNoncePromise, gasLimitPromise]);

                    case 14:
                        _ref5 = _context4.sent;
                        _ref6 = _slicedToArray(_ref5, 3);
                        wlt = _ref6[0];
                        chainNonce = _ref6[1];
                        gasLimit = _ref6[2];
                        newNonce = localNonce && localNonce >= chainNonce ? localNonce : chainNonce;
                        txObj = {
                            to: toAddr,
                            nonce: newNonce,
                            gasPrice: tools_1.fetchGasPrice(minerFeeLevel),
                            gasLimit: gasLimit,
                            value: unitTools_1.eth2Wei(pay),
                            data: info
                        };
                        tx = wlt.signRawTransaction(txObj);
                        _context4.next = 24;
                        return api.sendRawTransaction(tx);

                    case 24:
                        hash = _context4.sent;

                        if (!util_1.isNumber(nonce) && hash) {
                            tools_1.setEthNonce(newNonce + 1, fromAddr);
                        }
                        return _context4.abrupt("return", {
                            hash: hash,
                            nonce: newNonce
                        });

                    case 27:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
};
/**
 * ETH交易签名
 */
exports.signRawTransactionETH = function (psw, fromAddr, toAddr, pay, minerFeeLevel, info, nonce) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var addrIndex, wlt, api, localNonce, chainNonce, gasLimit, txObj;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        addrIndex = walletTools_1.getWltAddrIndex(fromAddr, 'ETH');

                        if (!(addrIndex >= 0)) {
                            _context5.next = 19;
                            break;
                        }

                        _context5.next = 5;
                        return globalWallet_1.GlobalWallet.createWlt('ETH', psw, addrIndex);

                    case 5:
                        wlt = _context5.sent;
                        api = new api_2.Api();

                        if (nonce) {
                            _context5.next = 13;
                            break;
                        }

                        localNonce = tools_1.getEthNonce(fromAddr);
                        _context5.next = 11;
                        return api.getTransactionCount(fromAddr);

                    case 11:
                        chainNonce = _context5.sent;

                        nonce = localNonce && localNonce >= chainNonce ? localNonce : chainNonce;

                    case 13:
                        _context5.next = 15;
                        return exports.estimateGasETH(toAddr, info);

                    case 15:
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

                    case 19:
                        _context5.next = 24;
                        break;

                    case 21:
                        _context5.prev = 21;
                        _context5.t0 = _context5["catch"](0);

                        toolMessages_1.doErrorShow(_context5.t0);

                    case 24:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[0, 21]]);
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
exports.estimateGasERC20 = function (currencyName, toAddr, fromAddr, amount) {
    var api = new api_2.Api();
    var transferCode = wallet_1.EthWallet.tokenOperations('transfer', currencyName, toAddr, unitTools_1.ethTokenMultiplyDecimals(amount, currencyName));
    return api.estimateGas({ to: config_1.ERC20Tokens[currencyName].contractAddr, from: fromAddr, value: '0x0', data: transferCode });
};
/**
 * 处理eth代币转账
 */
// tslint:disable-next-line:max-line-length
exports.doERC20TokenTransfer = function (psw, addrIndex, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var wltPromise, api, fromAddr, toAddr, minerFeeLevel, pay, nonce, currencyName, localNonce, chainNoncePromise, gasLimitPromise, _ref7, _ref8, wlt, chainNonce, gasLimit, newNonce, newGasLimit, transferCode, txObj, tx, hash;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        wltPromise = globalWallet_1.GlobalWallet.createWlt('ETH', psw, addrIndex);
                        api = new api_2.Api();
                        fromAddr = txRecord.fromAddr;
                        toAddr = txRecord.toAddr;
                        minerFeeLevel = txRecord.minerFeeLevel;
                        pay = txRecord.pay;
                        nonce = txRecord.nonce;
                        currencyName = txRecord.currencyName;
                        localNonce = tools_1.getEthNonce(fromAddr);
                        chainNoncePromise = void 0;

                        if (!util_1.isNumber(nonce)) {
                            chainNoncePromise = api.getTransactionCount(fromAddr);
                        } else {
                            chainNoncePromise = Promise.resolve(localNonce);
                        }
                        gasLimitPromise = exports.estimateGasERC20(currencyName, toAddr, fromAddr, '0x0');
                        _context7.next = 14;
                        return Promise.all([wltPromise, chainNoncePromise, gasLimitPromise]);

                    case 14:
                        _ref7 = _context7.sent;
                        _ref8 = _slicedToArray(_ref7, 3);
                        wlt = _ref8[0];
                        chainNonce = _ref8[1];
                        gasLimit = _ref8[2];
                        newNonce = localNonce && localNonce >= chainNonce ? localNonce : chainNonce;
                        // TODO  零时解决

                        newGasLimit = Math.floor(gasLimit * 4);

                        console.log('newGasLimit-------------', newGasLimit);
                        transferCode = wallet_1.EthWallet.tokenOperations('transfer', currencyName, toAddr, unitTools_1.ethTokenMultiplyDecimals(pay, currencyName));
                        txObj = {
                            to: config_1.ERC20Tokens[currencyName].contractAddr,
                            nonce: newNonce,
                            gasPrice: tools_1.fetchGasPrice(minerFeeLevel),
                            gasLimit: newGasLimit,
                            value: 0,
                            data: transferCode
                        };

                        console.log('txObj---------------', txObj);
                        tx = wlt.signRawTransaction(txObj);
                        _context7.next = 28;
                        return api.sendRawTransaction(tx);

                    case 28:
                        hash = _context7.sent;

                        if (!util_1.isNumber(nonce) && hash) {
                            tools_1.setEthNonce(newNonce + 1, fromAddr);
                        }
                        return _context7.abrupt("return", {
                            hash: hash,
                            nonce: newNonce
                        });

                    case 31:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, this);
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
exports.doBtcTransfer = function (psw, addrIndex, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var wlt, toAddr, pay, fromAddr, minerFeeLevel, output, retArr, rawHexString;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        _context9.next = 2;
                        return globalWallet_1.GlobalWallet.createWlt('BTC', psw, addrIndex);

                    case 2:
                        wlt = _context9.sent;
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
                        _context9.next = 12;
                        return wlt.init();

                    case 12:
                        _context9.next = 14;
                        return wlt.buildRawTransactionFromSingleAddress(fromAddr, output, tools_1.fetchBtcMinerFee(minerFeeLevel));

                    case 14:
                        retArr = _context9.sent;

                        wlt.lock();
                        // const rawHexString: string = retArr[0];
                        // console.log('rawTx',rawHexString);
                        rawHexString = retArr.rawTx;

                        console.log('rawTx==========', rawHexString);
                        return _context9.abrupt("return", api_1.BtcApi.sendRawTransaction(rawHexString));

                    case 19:
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
exports.resendBtcTransfer = function (psw, addrIndex, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var wlt, minerFeeLevel, hash, retArr, rawHexString;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        _context10.next = 2;
                        return globalWallet_1.GlobalWallet.createWlt('BTC', psw, addrIndex);

                    case 2:
                        wlt = _context10.sent;
                        minerFeeLevel = txRecord.minerFeeLevel;
                        hash = txRecord.hash;

                        wlt.unlock();
                        _context10.next = 8;
                        return wlt.init();

                    case 8:
                        _context10.next = 10;
                        return wlt.resendTx(hash, tools_1.fetchBtcMinerFee(minerFeeLevel));

                    case 10:
                        retArr = _context10.sent;

                        wlt.lock();
                        rawHexString = retArr.rawTx;
                        // console.log(rawHexString);

                        return _context10.abrupt("return", api_1.BtcApi.sendRawTransaction(rawHexString));

                    case 14:
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
        var addrIndex, wlt, output, retArr;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        _context11.prev = 0;
                        addrIndex = walletTools_1.getWltAddrIndex(fromAddr, 'BTC');

                        if (!(addrIndex >= 0)) {
                            _context11.next = 16;
                            break;
                        }

                        _context11.next = 5;
                        return globalWallet_1.GlobalWallet.createWlt('BTC', psw, addrIndex);

                    case 5:
                        wlt = _context11.sent;
                        output = {
                            toAddr: toAddr,
                            amount: pay,
                            chgAddr: fromAddr
                        };

                        console.log('output----------------', output);
                        wlt.unlock();
                        _context11.next = 11;
                        return wlt.init();

                    case 11:
                        _context11.next = 13;
                        return wlt.buildRawTransactionFromSingleAddress(fromAddr, output, tools_1.fetchBtcMinerFee(minerFeeLevel));

                    case 13:
                        retArr = _context11.sent;

                        wlt.lock();
                        return _context11.abrupt("return", retArr);

                    case 16:
                        _context11.next = 21;
                        break;

                    case 18:
                        _context11.prev = 18;
                        _context11.t0 = _context11["catch"](0);

                        toolMessages_1.doErrorShow(_context11.t0);

                    case 21:
                    case "end":
                        return _context11.stop();
                }
            }
        }, _callee11, this, [[0, 18]]);
    }));
};
/**
 * BTC重发交易签名
 */
exports.resendSignRawTransactionBTC = function (hash, psw, fromAddr, minerFeeLevel) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var addrIndex, wlt, retArr;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        _context12.prev = 0;
                        addrIndex = walletTools_1.getWltAddrIndex(fromAddr, 'BTC');

                        if (!(addrIndex >= 0)) {
                            _context12.next = 14;
                            break;
                        }

                        _context12.next = 5;
                        return globalWallet_1.GlobalWallet.createWlt('BTC', psw, addrIndex);

                    case 5:
                        wlt = _context12.sent;

                        wlt.unlock();
                        _context12.next = 9;
                        return wlt.init();

                    case 9:
                        _context12.next = 11;
                        return wlt.resendTx(hash, tools_1.fetchBtcMinerFee(minerFeeLevel));

                    case 11:
                        retArr = _context12.sent;

                        wlt.lock();
                        return _context12.abrupt("return", retArr);

                    case 14:
                        _context12.next = 19;
                        break;

                    case 16:
                        _context12.prev = 16;
                        _context12.t0 = _context12["catch"](0);

                        toolMessages_1.doErrorShow(_context12.t0);

                    case 19:
                    case "end":
                        return _context12.stop();
                }
            }
        }, _callee12, this, [[0, 16]]);
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
// // ===================================================shapeShift相关start
// // tslint:disable-next-line:max-line-length
// const shapeShiftClientToken = {
//     createdAt:'2018-12-11T08:30:52.242Z',
//     updatedAt:'2018-12-11T08:30:52.242Z',
//     id:'959a71bc-a5d4-4483-8d10-c1cc7668d72c',
//     clientId:'bc401c5a-3ff3-4bc7-9ffb-72449dcfae80',
//     expiresAt:'2019-12-11T08:30:52.242Z',
//     token:'44Aq9s8cHBrDXUJsiXeU7ER9AtaR6JZ5i3qtz1oY7gYn',
//     userId:null,
//     deletedAt:null 
// };
// /**
//  * 获取shapeShift所支持的币种
//  */
// export const getShapeShiftCoins = () => {
//     fetch(`${shapeShiftUrlPrex}getcoins`).then(res => res.json()).then(res => {
//         // console.log(res);
//         const list = [];
//         for (const k in res) {
//             list.push(res[k]);
//         }
//         // console.log(list);
//         setStore('third/shapeShiftCoins', list);
//     });
// };
// /**
//  * 
//  * @param pair 交易对
//  */
// export const getMarketInfo = (pair:string) => {
//     fetch(`${shapeShiftUrlPrex}marketinfo/${pair}`).then(res => res.json()).then(res => {
//         // console.log(res);
//         setStore('third/shapeShiftMarketInfo', res);
//     });
// };
// /**
//  * 开始进行币币兑换
//  * @param withdrawalAddress 入账币种的地址
//  * @param returnAddress 失败后的退款地址
//  * @param pair 交易对
//  */
// export const beginShift = (withdrawalAddress:string,returnAddress:string,pair:string,success?:Function,fail?:Function) => {
//     const bodyData = {
//         amount: 1,
//         withdrawal: '0x5041F19dC1659E33848cc0f77cbF7447de562917',
//         returnAddress: '1N17uHdvY6fNwtutM1G5EAZFPLC43B59rB',
//         pair: 'BTC_ETH'
//     };
//     fetch(`${shapeShiftUrlPrex}sendamount`,{
//         method: 'POST', // or 'PUT'
//         body: JSON.stringify(bodyData), // data can be `string` or {object}!
//         headers: new Headers({
//             'Content-Type': 'application/json',
//             Authorization: `Bearer CZfRLxjor2E49vTfTZDjaeeR78nMMi1rKypV9GRBsmt2`
//         })
//     }).then(res => res.json()).then(res => {
//         console.log(res);
//         // setStore('third/shapeShiftMarketInfo', res);
//     });
// };
// /**
//  * 获取币币交易记录
//  * @param addr 要获取交易记录的地址
//  */
// export const getTransactionsByAddr = async (addr: string) => {
//     const addrLowerCase = addr.toLowerCase();
//     const transactions = (addr: string): Promise<any> => {
//         return new Promise((resolve, reject) => {
//             shapeshift.transactions('shapeshiftApiPrivateKey', addr, (err, transactions) => {
//                 if (err || transactions.length === 0) {
//                     reject(err || new Error('null array'));
//                 }
//                 resolve(transactions);
//             });
//         });
//     };
//     const getTxByHash = (txs: any[], hash: string) => {
//         for (let i = 0; i < txs.length; i++) {
//             // tslint:disable-next-line:possible-timing-attack
//             if (txs[i].inputTXID === hash) {
//                 return i;
//             }
//         }
//         return -1;
//     };
//     const shapeShiftTxsMap = getStore('third/shapeShiftTxsMap');
//     const shapeShiftTxs =  shapeShiftTxsMap.get(addrLowerCase) || { addr:addrLowerCase,list:[] };
//     let count = shapeshiftTransactionRequestNumber;
//     while (count >= 0) {
//         let txs;
//         try {
//             txs = await transactions(addrLowerCase);
//         } catch (err) {
//             // console.error(err);
//         }
//         if (txs) {
//             console.log('shapeshifttx',txs);
//             txs.forEach(tx => {
//                 const index = getTxByHash(shapeShiftTxs.list || [], tx.inputTXID);
//                 if (index >= 0) {
//                     shapeShiftTxs.list[index] = tx;
//                 } else {
//                     shapeShiftTxs.list.push(tx);
//                 }
//             });
//             shapeShiftTxsMap.set(addrLowerCase,shapeShiftTxs);
//             setStore('third/shapeShiftTxsMap',shapeShiftTxsMap);
//             return;
//         }
//         count--;
//         console.log(count);
//     }
//     setStore('third/shapeShiftTxsMap',shapeShiftTxsMap);
// };
// // ===================================================shapeShift相关end
// ===================================================== 本地
// ================================重发
/**
 * 普通转账重发
 */
exports.resendNormalTransfer = function (psw, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var loading, fromAddr, currencyName, ret, addrIndex, res, t, tx, oldHash;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        console.log('----------resendNormalTransfer--------------');
                        loading = root_1.popNew('app-components1-loading-loading', { text: tools_1.getStaticLanguage().transfer.againSend });
                        fromAddr = txRecord.fromAddr;
                        currencyName = txRecord.currencyName;
                        ret = void 0;
                        _context14.prev = 5;
                        addrIndex = walletTools_1.getWltAddrIndex(fromAddr, currencyName);

                        if (!(addrIndex >= 0)) {
                            _context14.next = 27;
                            break;
                        }

                        if (!(currencyName === 'ETH')) {
                            _context14.next = 15;
                            break;
                        }

                        _context14.next = 11;
                        return exports.doEthTransfer(psw, addrIndex, txRecord);

                    case 11:
                        ret = _context14.sent;

                        console.log('--------------ret', ret);
                        _context14.next = 27;
                        break;

                    case 15:
                        if (!(currencyName === 'BTC')) {
                            _context14.next = 23;
                            break;
                        }

                        _context14.next = 18;
                        return exports.resendBtcTransfer(psw, addrIndex, txRecord);

                    case 18:
                        res = _context14.sent;

                        console.log('btc res-----', res);
                        ret = {
                            hash: res.txid,
                            nonce: -1
                        };
                        _context14.next = 27;
                        break;

                    case 23:
                        if (!config_1.ERC20Tokens[currencyName]) {
                            _context14.next = 27;
                            break;
                        }

                        _context14.next = 26;
                        return exports.doERC20TokenTransfer(psw, addrIndex, txRecord);

                    case 26:
                        ret = _context14.sent;

                    case 27:
                        _context14.next = 33;
                        break;

                    case 29:
                        _context14.prev = 29;
                        _context14.t0 = _context14["catch"](5);

                        console.log(_context14.t0.message);
                        toolMessages_1.doErrorShow(_context14.t0);

                    case 33:
                        _context14.prev = 33;

                        loading.callback(loading.widget);
                        return _context14.finish(33);

                    case 36:
                        if (ret) {
                            t = new Date();
                            tx = Object.assign({}, txRecord, { hash: ret.hash, time: t.getTime() });
                            oldHash = txRecord.hash;

                            tools_1.deletLocalTx(txRecord);
                            tools_1.updateLocalTx(tx);
                            dataCenter_1.dataCenter.clearTxTimer(oldHash); // 删除定时器
                            dataCenter_1.dataCenter.updateAddrInfo(tx.addr, tx.currencyName);
                            root_1.popNew('app-components1-message-message', { content: tools_1.getStaticLanguage().transfer.againSuccess });
                            root_1.popNew('app-view-wallet-transaction-transactionDetails', { hash: tx.hash });
                        }
                        return _context14.abrupt("return", ret);

                    case 38:
                    case "end":
                        return _context14.stop();
                }
            }
        }, _callee14, this, [[5, 29, 33, 36]]);
    }));
};
/**
 * 充值重发
 */
exports.resendRecharge = function (psw, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var loading, tx, oldHash;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        console.log('----------resendRecharge--------------');
                        loading = root_1.popNew('app-components1-loading-loading', { text: tools_1.getStaticLanguage().transfer.againSend });
                        tx = void 0;
                        _context15.prev = 3;

                        if (!(txRecord.currencyName === 'BTC')) {
                            _context15.next = 10;
                            break;
                        }

                        _context15.next = 7;
                        return exports.resendBtcRecharge(psw, txRecord);

                    case 7:
                        tx = _context15.sent;
                        _context15.next = 13;
                        break;

                    case 10:
                        _context15.next = 12;
                        return exports.ethRecharge(psw, txRecord);

                    case 12:
                        tx = _context15.sent;

                    case 13:
                        _context15.next = 19;
                        break;

                    case 15:
                        _context15.prev = 15;
                        _context15.t0 = _context15["catch"](3);

                        console.log(_context15.t0.message);
                        toolMessages_1.doErrorShow(_context15.t0);

                    case 19:
                        _context15.prev = 19;

                        loading.callback(loading.widget);
                        return _context15.finish(19);

                    case 22:
                        if (tx) {
                            oldHash = txRecord.hash;

                            tools_1.deletLocalTx(txRecord);
                            tools_1.updateLocalTx(tx);
                            dataCenter_1.dataCenter.clearTxTimer(oldHash); // 删除定时器
                            dataCenter_1.dataCenter.updateAddrInfo(tx.addr, tx.currencyName);
                            pull_1.getRechargeLogs(tx.currencyName);
                            root_1.popNew('app-components1-message-message', { content: tools_1.getStaticLanguage().transfer.againSuccess });
                            root_1.popNew('app-view-wallet-transaction-transactionDetails', { hash: tx.hash });
                        }
                        return _context15.abrupt("return", tx.hash);

                    case 24:
                    case "end":
                        return _context15.stop();
                }
            }
        }, _callee15, this, [[3, 15, 19, 22]]);
    }));
};
// ================================重发
exports.recharge = function (psw, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var tx, close;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
                switch (_context16.prev = _context16.next) {
                    case 0:
                        tx = void 0;
                        close = root_1.popNew('app-components1-loading-loading', { text: tools_1.getStaticLanguage().transfer.recharge });

                        if (!(txRecord.currencyName === 'BTC')) {
                            _context16.next = 8;
                            break;
                        }

                        _context16.next = 5;
                        return exports.btcRecharge(psw, txRecord);

                    case 5:
                        tx = _context16.sent;
                        _context16.next = 11;
                        break;

                    case 8:
                        _context16.next = 10;
                        return exports.ethRecharge(psw, txRecord);

                    case 10:
                        tx = _context16.sent;

                    case 11:
                        close.callback(close.widget);

                        if (!tx) {
                            _context16.next = 20;
                            break;
                        }

                        root_1.popNew('app-components1-message-message', { content: tools_1.getStaticLanguage().transfer.rechargeSuccess });
                        tools_1.updateLocalTx(tx);
                        console.log("recharge tx is ", tx);
                        dataCenter_1.dataCenter.updateAddrInfo(tx.addr, tx.currencyName);
                        pull_1.getRechargeLogs(tx.currencyName);
                        root_1.popNew('app-view-wallet-transaction-transactionDetails', { hash: tx.hash });
                        return _context16.abrupt("return", tx.hash);

                    case 20:
                    case "end":
                        return _context16.stop();
                }
            }
        }, _callee16, this);
    }));
};
/**
 * eth充值
 */
exports.ethRecharge = function (psw, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        var toAddr, fromAddr, minerFeeLevel, gasPrice, pay, info, gasLimit, minerFee, nonce, obj, signedTX, hash, canTransfer, h, t, record;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        _context17.next = 2;
                        return pull_1.getBankAddr();

                    case 2:
                        toAddr = _context17.sent;

                        if (toAddr) {
                            _context17.next = 5;
                            break;
                        }

                        return _context17.abrupt("return");

                    case 5:
                        fromAddr = txRecord.fromAddr;
                        minerFeeLevel = txRecord.minerFeeLevel;
                        gasPrice = tools_1.fetchGasPrice(minerFeeLevel);
                        pay = txRecord.pay;
                        info = txRecord.info;
                        _context17.next = 12;
                        return exports.estimateGasETH(toAddr, info);

                    case 12:
                        gasLimit = _context17.sent;
                        minerFee = unitTools_1.wei2Eth(gasLimit * tools_1.fetchGasPrice(minerFeeLevel));
                        nonce = txRecord.nonce;
                        _context17.next = 17;
                        return exports.signRawTransactionETH(psw, fromAddr, toAddr, pay, minerFeeLevel, info, nonce);

                    case 17:
                        obj = _context17.sent;

                        if (obj) {
                            _context17.next = 20;
                            break;
                        }

                        return _context17.abrupt("return");

                    case 20:
                        signedTX = obj.signedTx;
                        hash = "0x" + obj.hash;

                        nonce = Number(obj.nonce);
                        _context17.next = 25;
                        return pull_1.rechargeToServer(fromAddr, toAddr, hash, nonce, gasPrice, unitTools_1.eth2Wei(pay));

                    case 25:
                        canTransfer = _context17.sent;

                        if (canTransfer) {
                            _context17.next = 28;
                            break;
                        }

                        return _context17.abrupt("return");

                    case 28:
                        _context17.next = 30;
                        return exports.sendRawTransactionETH(signedTX);

                    case 30:
                        h = _context17.sent;

                        if (h) {
                            _context17.next = 33;
                            break;
                        }

                        return _context17.abrupt("return");

                    case 33:
                        if (!txRecord.nonce) {
                            tools_1.setEthNonce(nonce + 1, fromAddr);
                        }
                        // 维护本地交易记录
                        t = new Date();
                        // tslint:disable-next-line:no-unnecessary-local-variable

                        record = Object.assign({}, txRecord, { nonce: nonce,
                            hash: hash,
                            toAddr: toAddr, time: t.getTime(), fee: minerFee, minerFeeLevel: minerFeeLevel });
                        return _context17.abrupt("return", record);

                    case 37:
                    case "end":
                        return _context17.stop();
                }
            }
        }, _callee17, this);
    }));
};
/**
 * btc充值
 */
exports.btcRecharge = function (psw, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
        var toAddr, fromAddr, minerFeeLevel, pay, minerFee, obj, oldHash, signedTX, hash, canTransfer, h, t, record;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
                switch (_context18.prev = _context18.next) {
                    case 0:
                        _context18.next = 2;
                        return pull_1.getBtcBankAddr();

                    case 2:
                        toAddr = _context18.sent;

                        if (toAddr) {
                            _context18.next = 5;
                            break;
                        }

                        return _context18.abrupt("return");

                    case 5:
                        fromAddr = txRecord.fromAddr;
                        minerFeeLevel = txRecord.minerFeeLevel;
                        pay = txRecord.pay;
                        minerFee = tools_1.fetchBtcMinerFee(minerFeeLevel);
                        _context18.next = 11;
                        return exports.signRawTransactionBTC(psw, fromAddr, toAddr, pay, minerFeeLevel);

                    case 11:
                        obj = _context18.sent;

                        if (obj) {
                            _context18.next = 14;
                            break;
                        }

                        return _context18.abrupt("return");

                    case 14:
                        oldHash = txRecord.hash;
                        signedTX = obj.rawTx;
                        hash = obj.hash;
                        _context18.next = 19;
                        return pull_1.btcRechargeToServer(toAddr, hash, unitTools_1.btc2Sat(pay).toString(), minerFee, oldHash);

                    case 19:
                        canTransfer = _context18.sent;

                        if (canTransfer) {
                            _context18.next = 22;
                            break;
                        }

                        return _context18.abrupt("return");

                    case 22:
                        _context18.next = 24;
                        return exports.sendRawTransactionBTC(signedTX);

                    case 24:
                        h = _context18.sent;

                        if (h) {
                            _context18.next = 27;
                            break;
                        }

                        return _context18.abrupt("return");

                    case 27:
                        // 维护本地交易记录
                        t = new Date();
                        // tslint:disable-next-line:no-unnecessary-local-variable

                        record = Object.assign({}, txRecord, { hash: hash,
                            toAddr: toAddr, time: t.getTime(), fee: minerFee, minerFeeLevel: minerFeeLevel });
                        return _context18.abrupt("return", record);

                    case 30:
                    case "end":
                        return _context18.stop();
                }
            }
        }, _callee18, this);
    }));
};
/**
 * btc重发充值
 */
exports.resendBtcRecharge = function (psw, txRecord) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        var toAddr, fromAddr, minerFeeLevel, pay, minerFee, ret, oldHash, hash, signedTx, canTransfer, h, t, record;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
            while (1) {
                switch (_context19.prev = _context19.next) {
                    case 0:
                        _context19.next = 2;
                        return pull_1.getBtcBankAddr();

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
                        pay = txRecord.pay;
                        minerFee = tools_1.fetchBtcMinerFee(minerFeeLevel);
                        _context19.next = 11;
                        return exports.resendSignRawTransactionBTC(txRecord.hash, psw, fromAddr, minerFeeLevel);

                    case 11:
                        ret = _context19.sent;

                        if (ret) {
                            _context19.next = 14;
                            break;
                        }

                        return _context19.abrupt("return");

                    case 14:
                        oldHash = txRecord.hash;
                        hash = ret.newTxid;
                        signedTx = ret.rawTx;
                        _context19.next = 19;
                        return pull_1.btcRechargeToServer(toAddr, hash, unitTools_1.btc2Sat(pay).toString(), minerFee, oldHash);

                    case 19:
                        canTransfer = _context19.sent;

                        if (canTransfer) {
                            _context19.next = 22;
                            break;
                        }

                        return _context19.abrupt("return");

                    case 22:
                        _context19.next = 24;
                        return exports.sendRawTransactionBTC(signedTx);

                    case 24:
                        h = _context19.sent;

                        if (h) {
                            _context19.next = 27;
                            break;
                        }

                        return _context19.abrupt("return");

                    case 27:
                        // 维护本地交易记录
                        t = new Date();
                        // tslint:disable-next-line:no-unnecessary-local-variable

                        record = Object.assign({}, txRecord, { hash: hash, time: t.getTime(), fee: minerFee, minerFeeLevel: minerFeeLevel });
                        return _context19.abrupt("return", record);

                    case 30:
                    case "end":
                        return _context19.stop();
                }
            }
        }, _callee19, this);
    }));
};
/**
 *
 * 提现
 */
exports.withdraw = function (passwd, toAddr, currencyName, amount) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
            while (1) {
                switch (_context20.prev = _context20.next) {
                    case 0:
                        if (!(currencyName === 'BTC')) {
                            _context20.next = 4;
                            break;
                        }

                        return _context20.abrupt("return", exports.btcWithdraw(passwd, toAddr, amount));

                    case 4:
                        return _context20.abrupt("return", exports.ethWithdraw(passwd, toAddr, amount));

                    case 5:
                    case "end":
                        return _context20.stop();
                }
            }
        }, _callee20, this);
    }));
};
// eth提现
exports.ethWithdraw = function (passwd, toAddr, amount) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
        var close, secretHash, hash, tx;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
            while (1) {
                switch (_context21.prev = _context21.next) {
                    case 0:
                        close = root_1.popNew('app-components1-loading-loading', { text: tools_1.getStaticLanguage().transfer.withdraw });
                        _context21.next = 3;
                        return walletTools_1.VerifyIdentidy(passwd);

                    case 3:
                        secretHash = _context21.sent;

                        if (secretHash) {
                            _context21.next = 8;
                            break;
                        }

                        close.callback(close.widget);
                        root_1.popNew('app-components1-message-message', { content: tools_1.getStaticLanguage().transfer.wrongPsw });
                        return _context21.abrupt("return");

                    case 8:
                        _context21.next = 10;
                        return pull_1.withdrawFromServer(toAddr, unitTools_1.eth2Wei(amount), secretHash);

                    case 10:
                        hash = _context21.sent;

                        close.callback(close.widget);
                        if (hash) {
                            root_1.popNew('app-components1-message-message', { content: tools_1.getStaticLanguage().transfer.withdrawSuccess });
                            tx = {
                                hash: hash,
                                addr: toAddr,
                                txType: interface_1.TxType.Receipt,
                                fromAddr: '',
                                toAddr: toAddr,
                                pay: Number(amount),
                                time: new Date().getTime(),
                                status: interface_1.TxStatus.Pending,
                                confirmedBlockNumber: 0,
                                needConfirmedBlockNumber: 0,
                                info: '',
                                currencyName: 'ETH',
                                fee: 0,
                                nonce: undefined
                            };

                            dataCenter_1.dataCenter.timerUpdateTxWithdraw(tx);
                            pull_1.getWithdrawLogs('ETH');
                            tools_1.updateLocalTx(tx);
                        }
                        return _context21.abrupt("return", hash);

                    case 14:
                    case "end":
                        return _context21.stop();
                }
            }
        }, _callee21, this);
    }));
};
// btc提现
exports.btcWithdraw = function (passwd, toAddr, amount) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
        var close, secretHash, hash, tx;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
            while (1) {
                switch (_context22.prev = _context22.next) {
                    case 0:
                        close = root_1.popNew('app-components1-loading-loading', { text: tools_1.getStaticLanguage().transfer.withdraw });
                        _context22.next = 3;
                        return walletTools_1.VerifyIdentidy(passwd);

                    case 3:
                        secretHash = _context22.sent;

                        if (secretHash) {
                            _context22.next = 8;
                            break;
                        }

                        close.callback(close.widget);
                        root_1.popNew('app-components1-message-message', { content: tools_1.getStaticLanguage().transfer.wrongPsw });
                        return _context22.abrupt("return");

                    case 8:
                        _context22.next = 10;
                        return pull_1.btcWithdrawFromServer(toAddr, unitTools_1.btc2Sat(amount).toString(), secretHash);

                    case 10:
                        hash = _context22.sent;

                        close.callback(close.widget);
                        if (hash) {
                            root_1.popNew('app-components1-message-message', { content: tools_1.getStaticLanguage().transfer.withdrawSuccess });
                            tx = {
                                hash: hash,
                                addr: toAddr,
                                txType: interface_1.TxType.Receipt,
                                fromAddr: '',
                                toAddr: toAddr,
                                pay: Number(amount),
                                time: new Date().getTime(),
                                status: interface_1.TxStatus.Pending,
                                confirmedBlockNumber: 0,
                                needConfirmedBlockNumber: 0,
                                info: '',
                                currencyName: 'BTC',
                                fee: 0,
                                nonce: undefined
                            };

                            dataCenter_1.dataCenter.timerUpdateTxWithdraw(tx);
                            pull_1.getWithdrawLogs('BTC');
                            tools_1.updateLocalTx(tx);
                        }
                        return _context22.abrupt("return", hash);

                    case 14:
                    case "end":
                        return _context22.stop();
                }
            }
        }, _callee22, this);
    }));
};
})