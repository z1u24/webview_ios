_$define("app/logic/dataCenter", function (require, exports, module){
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
var config_1 = require("../config");
var api_1 = require("../core/btc/api");
var wallet_1 = require("../core/btc/wallet");
var api_2 = require("../core/eth/api");
var wallet_2 = require("../core/eth/wallet");
var pullWallet_1 = require("../net/pullWallet");
var interface_1 = require("../store/interface");
var store_1 = require("../store/store");
var constants_1 = require("../utils/constants");
var tools_1 = require("../utils/tools");
var unitTools_1 = require("../utils/unitTools");
var walletTools_1 = require("../utils/walletTools");
var bignumber_1 = require("../res/js/bignumber");
/**
 * 创建事件处理器表
 * @example
 */

var DataCenter = function () {
    function DataCenter() {
        _classCallCheck(this, DataCenter);

        this.timerRef = 0;
        this.timerRef1 = 0;
        this.updateFastList = [];
        this.updateList = [];
        // 交易定时器列表
        this.txTimerList = [];
        // 余额定时器列表
        this.balanceTimerList = [];
    }
    /**
     * 初始化
     */


    _createClass(DataCenter, [{
        key: "init",
        value: function init() {
            //获取shapeshift支持货币
            pullWallet_1.getShapeShiftCoins();
            this.exchangeRate('ETH');
            this.exchangeRate('BTC');
            this.timerUpdateBalance(); //更新余额
            this.refreshAllTx();
            // f7a398978d4f9153f9ec7736cbdf7753ed096e230250ae08a4aa1ccea16878e3
            // BtcApi.getAddrTxHistory('miXYqeEJWkf52UyifMYozkCaDYmSVymQTb').then(res=>{
            //     console.error('getAddrTxHistory!!!!!!!!!',res);
            // });
            // this.parseBtcTransactionDetails('miXYqeEJWkf52UyifMYozkCaDYmSVymQTb');
            // const api = new EthApi();
            // api.getTransactionReceipt("0xa5663410fc3322bc1acfd33510e4f6f06cb10092fdb096a779f21d1d2a1199e1").then(console.log);
            // api.getTransaction("0xa5663410fc3322bc1acfd33510e4f6f06cb10092fdb096a779f21d1d2a1199e1").then(console.log);
            this.updateFastList.push(['shapeShiftCoins']);
            this.updateFastList.push(['exchangeRate', 'ETH']);
            this.updateFastList.push(['exchangeRate', 'BTC']);
            // 启动定时器更新
            // if (!this.timerRef) this.openAddrTxCheck();
            // if (!this.timerRef1) this.openCheck();
            // if (!this.currencyExchangeTimer) this.currencyExchangeTimerStart();
        }
        /**
         * 刷新本地钱包
         */

    }, {
        key: "refreshAllTx",
        value: function refreshAllTx() {
            var _this = this;

            // 从缓存中获取地址进行初始化
            var addrs = store_1.find('addrs') || [];
            if (addrs) {
                var wallet = store_1.find('curWallet');
                if (!wallet) return;
                var list = [];
                wallet.currencyRecords.forEach(function (v) {
                    if (wallet.showCurrencys.indexOf(v.currencyName) >= 0) {
                        list = list.concat(v.addrs);
                    }
                });
                addrs.forEach(function (v) {
                    if (list.indexOf(v.addr) >= 0 && wallet.showCurrencys.indexOf(v.currencyName) >= 0) {
                        _this.updateAddrInfo(v.addr, v.currencyName);
                    }
                });
            }
        }
        // 根据地址刷新交易记录

    }, {
        key: "refreshTrans",
        value: function refreshTrans(addr, currencyName) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var txList, i, timerItem;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                txList = walletTools_1.fetchTransactionList(addr, currencyName);
                                i = 0;

                            case 2:
                                if (!(i < txList.length)) {
                                    _context.next = 10;
                                    break;
                                }

                                timerItem = this.fetchTimerItem(txList[i].hash);

                                if (!timerItem) {
                                    _context.next = 6;
                                    break;
                                }

                                return _context.abrupt("continue", 7);

                            case 6:
                                this.timerUpdateTx(addr, currencyName, txList[i].hash);

                            case 7:
                                i++;
                                _context.next = 2;
                                break;

                            case 10:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * 更新地址相关
         */

    }, {
        key: "updateAddrInfo",
        value: function updateAddrInfo(addr, currencyName) {
            this.updateBalance(addr, currencyName); //更新余额
            this.parseTransactionDetails(addr, currencyName); //更新交易记录
        }
        // 获取币币交易交易记录

    }, {
        key: "fetchCurrencyExchangeTx",
        value: function fetchCurrencyExchangeTx() {
            var wallet = store_1.find('curWallet');
            if (!wallet) return;
            var curAllAddrs = tools_1.getAddrsAll(wallet);
            curAllAddrs.forEach(function (item) {
                pullWallet_1.getTransactionsByAddr(item);
            });
        }
        /****************************************************************************************************
         * 私有函数
         ******************************************************************************************/
        // 普通检测

    }, {
        key: "openCheck",
        value: function openCheck() {
            var _this2 = this;

            this.timerRef = setTimeout(function () {
                _this2.timerRef = 0;
                _this2.openCheck();
            }, 5 * 1000);
            if (this.updateFastList.length > 0) return;
            if (this.updateList.length > 0) {
                // todo doupdate
                return;
            }
            // 检查地址--放于最后一步
            // this.checkAddr();
        }
        // 币币交易记录定时器

    }, {
        key: "currencyExchangeTimerStart",
        value: function currencyExchangeTimerStart() {
            var _this3 = this;

            this.fetchCurrencyExchangeTx();
            this.currencyExchangeTimer = setTimeout(function () {
                _this3.currencyExchangeTimerStart();
            }, 30 * 1000);
        }
        //检查地址

    }, {
        key: "checkAddr",
        value: function checkAddr() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var walletList, list, addrs, wallet, currencyRecord, addAddrs;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                walletList = store_1.find('walletList');

                                if (!(!walletList || walletList.length <= 0)) {
                                    _context2.next = 3;
                                    break;
                                }

                                return _context2.abrupt("return");

                            case 3:
                                list = [];

                                walletList.forEach(function (v, i) {
                                    if (store_1.getBorn('hashMap').get(v.walletId)) {
                                        v.currencyRecords.forEach(function (v1, i1) {
                                            if (!v1.updateAddr) list.push([i, i1]);
                                        });
                                    }
                                });

                                if (!list[0]) {
                                    _context2.next = 30;
                                    break;
                                }

                                addrs = store_1.find('addrs') || [];
                                wallet = walletList[list[0][0]];
                                currencyRecord = wallet.currencyRecords[list[0][1]];

                                console.log('checkAddr', currencyRecord.currencyName);
                                addAddrs = void 0;

                                if (!(currencyRecord.currencyName === 'ETH')) {
                                    _context2.next = 17;
                                    break;
                                }

                                _context2.next = 14;
                                return this.checkEthAddr(wallet, currencyRecord);

                            case 14:
                                addAddrs = _context2.sent;
                                _context2.next = 27;
                                break;

                            case 17:
                                if (!(currencyRecord.currencyName === 'BTC')) {
                                    _context2.next = 23;
                                    break;
                                }

                                _context2.next = 20;
                                return this.checkBtcAddr(wallet, currencyRecord);

                            case 20:
                                addAddrs = _context2.sent;
                                _context2.next = 27;
                                break;

                            case 23:
                                if (!config_1.ERC20Tokens[currencyRecord.currencyName]) {
                                    _context2.next = 27;
                                    break;
                                }

                                _context2.next = 26;
                                return this.checkEthERC20TokenAddr(wallet, currencyRecord);

                            case 26:
                                addAddrs = _context2.sent;

                            case 27:
                                if (addAddrs.length > 0) {
                                    addrs = addrs.concat(addAddrs);
                                    store_1.updateStore('addrs', addrs);
                                }
                                currencyRecord.updateAddr = true;
                                store_1.updateStore('walletList', walletList);

                            case 30:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
        /**
         * 解析交易详情
         */

    }, {
        key: "parseTransactionDetails",
        value: function parseTransactionDetails(addr, currencyName) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!config_1.ERC20Tokens[currencyName]) {
                                    _context3.next = 3;
                                    break;
                                }

                                this.parseEthERC20TokenTransactionDetails(addr, currencyName);
                                return _context3.abrupt("return");

                            case 3:
                                _context3.t0 = currencyName;
                                _context3.next = _context3.t0 === 'ETH' ? 6 : _context3.t0 === 'BTC' ? 8 : 10;
                                break;

                            case 6:
                                this.parseEthTransactionDetails(addr);
                                return _context3.abrupt("break", 10);

                            case 8:
                                this.parseBtcTransactionDetails(addr);
                                return _context3.abrupt("break", 10);

                            case 10:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
        // 解析erc20交易详情

    }, {
        key: "parseEthERC20TokenTransactionDetails",
        value: function parseEthERC20TokenTransactionDetails(addr, currencyName) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _this4 = this;

                var api, contractAddress, res;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                api = new api_2.Api();
                                contractAddress = config_1.ERC20Tokens[currencyName].contractAddr;
                                _context4.prev = 2;
                                _context4.next = 5;
                                return api.getTokenTransferEvents(contractAddress, addr);

                            case 5:
                                res = _context4.sent;

                                res.result.forEach(function (v) {
                                    if (_this4.neededUpdate(currencyName, v.hash, addr)) {
                                        _this4.getERC20TransactionByHash(currencyName, v.hash, addr);
                                    }
                                });
                                _context4.next = 12;
                                break;

                            case 9:
                                _context4.prev = 9;
                                _context4.t0 = _context4["catch"](2);

                                console.log('parseEthERC20TokenTransactionDetails------', _context4.t0);

                            case 12:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[2, 9]]);
            }));
        }
    }, {
        key: "neededUpdate",
        value: function neededUpdate(currencyName, hash, addr) {
            var txList = walletTools_1.fetchTransactionList(addr, currencyName);
            for (var i = 0; i < txList.length; i++) {
                if (txList[i].hash === hash && txList[i].currencyName === currencyName && txList[i].status === interface_1.TxStatus.SUCCESS) {
                    return false;
                }
            }
            return true;
        }
        // 解析eth交易详情

    }, {
        key: "parseEthTransactionDetails",
        value: function parseEthTransactionDetails(addr) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var api, r, ethTrans, i, hash;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                api = new api_2.Api();
                                _context5.next = 3;
                                return api.getAllTransactionsOf(addr);

                            case 3:
                                r = _context5.sent;
                                ethTrans = this.filterEthTrans(r.result);

                                for (i = 0; i < ethTrans.length; i++) {
                                    hash = ethTrans[i].hash;

                                    if (this.neededUpdate('ETH', hash, addr)) {
                                        this.getEthTransactionByHash(hash, addr);
                                    }
                                    ;
                                }

                            case 6:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));
        }
        // 解析btc交易详情

    }, {
        key: "parseBtcTransactionDetails",
        value: function parseBtcTransactionDetails(addr) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var _this5 = this;

                var info;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return api_1.BtcApi.getAddrTxHistory(addr);

                            case 2:
                                info = _context6.sent;

                                if (info) {
                                    _context6.next = 5;
                                    break;
                                }

                                return _context6.abrupt("return");

                            case 5:
                                if (info.txs) {
                                    info.txs.forEach(function (v) {
                                        var hash = v.txid;
                                        if (_this5.neededUpdate('BTC', hash, addr)) {
                                            _this5.getBTCTransactionByHash(hash, addr);
                                        }
                                        ;
                                    });
                                }

                            case 6:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));
        }
        //更新本地交易记录

    }, {
        key: "updateTransactionLocalStorage",
        value: function updateTransactionLocalStorage(tx) {
            var trans = store_1.find('transactions') || [];
            var index = -1;
            for (var i = 0; i < trans.length; i++) {
                if (trans[i].hash === tx.hash) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                trans.splice(index, 1, tx);
            } else {
                trans.push(tx);
            }
            store_1.updateStore('transactions', trans);
        }
        //获取eth交易详情

    }, {
        key: "getEthTransactionByHash",
        value: function getEthTransactionByHash(hash, addr) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var api, res1, res2, blockHash, res3, blockHeight, confirmedBlockNumber, pay, needConfirmedBlockNumber, status, gasPrice, fee, localTx, record;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                if (hash) {
                                    _context7.next = 2;
                                    break;
                                }

                                return _context7.abrupt("return");

                            case 2:
                                api = new api_2.Api();
                                _context7.next = 5;
                                return api.getTransactionReceipt(hash);

                            case 5:
                                res1 = _context7.sent;

                                if (res1) {
                                    _context7.next = 8;
                                    break;
                                }

                                return _context7.abrupt("return");

                            case 8:
                                _context7.next = 10;
                                return api.getTransaction(hash);

                            case 10:
                                res2 = _context7.sent;
                                blockHash = res1.blockHash;
                                _context7.next = 14;
                                return api.getBlock(blockHash);

                            case 14:
                                res3 = _context7.sent;
                                _context7.t0 = Number;
                                _context7.next = 18;
                                return api.getBlockNumber();

                            case 18:
                                _context7.t1 = _context7.sent;
                                blockHeight = (0, _context7.t0)(_context7.t1);
                                confirmedBlockNumber = blockHeight - res1.blockNumber + 1;
                                pay = unitTools_1.wei2Eth(res2.value);
                                needConfirmedBlockNumber = tools_1.getConfirmBlockNumber('ETH', pay);
                                status = parseInt(res1.status) === 1 ? confirmedBlockNumber >= needConfirmedBlockNumber ? interface_1.TxStatus.SUCCESS : interface_1.TxStatus.CONFIRMED : interface_1.TxStatus.FAILED;
                                gasPrice = new bignumber_1.BigNumber(res2.gasPrice);
                                fee = unitTools_1.wei2Eth(gasPrice.times(res1.gasUsed));
                                localTx = walletTools_1.fetchLocalTxByHash(addr, 'BTC', hash);
                                record = Object.assign({}, localTx, { hash: hash, txType: addr.toLowerCase() === res1.from.toLowerCase() ? localTx ? localTx.txType : interface_1.TxType.TRANSFER : interface_1.TxType.RECEIPT, fromAddr: res1.from, toAddr: res1.to, pay: pay,
                                    fee: fee, time: res3.timestamp * 1000, info: res2.input, currencyName: 'ETH', status: status,
                                    confirmedBlockNumber: confirmedBlockNumber,
                                    needConfirmedBlockNumber: needConfirmedBlockNumber, nonce: res2.nonce, addr: addr });

                                this.updateTransactionLocalStorage(record);
                                console.log('定时更新交易记录', {
                                    tx: record,
                                    time: new Date().getTime()
                                });

                            case 30:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));
        }
        //获取erc20交易详情

    }, {
        key: "getERC20TransactionByHash",
        value: function getERC20TransactionByHash(currencyName, hash, addr) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var api, res1, res2, blockHash, res3, blockHeight, confirmedBlockNumber, obj, pay, toAddr, needConfirmedBlockNumber, status, gasPrice, fee, localTx, record;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                if (hash) {
                                    _context8.next = 2;
                                    break;
                                }

                                return _context8.abrupt("return");

                            case 2:
                                api = new api_2.Api();
                                _context8.next = 5;
                                return api.getTransactionReceipt(hash);

                            case 5:
                                res1 = _context8.sent;

                                if (res1) {
                                    _context8.next = 8;
                                    break;
                                }

                                return _context8.abrupt("return");

                            case 8:
                                _context8.next = 10;
                                return api.getTransaction(hash);

                            case 10:
                                res2 = _context8.sent;
                                blockHash = res1.blockHash;
                                _context8.next = 14;
                                return api.getBlock(blockHash);

                            case 14:
                                res3 = _context8.sent;
                                _context8.t0 = Number;
                                _context8.next = 18;
                                return api.getBlockNumber();

                            case 18:
                                _context8.t1 = _context8.sent;
                                blockHeight = (0, _context8.t0)(_context8.t1);
                                confirmedBlockNumber = blockHeight - res1.blockNumber + 1;
                                obj = this.parseErc20Input(res2.input);
                                pay = unitTools_1.smallUnit2LargeUnit(currencyName, obj.pay);
                                toAddr = obj.toAddr;
                                needConfirmedBlockNumber = tools_1.getConfirmBlockNumber(currencyName, pay);
                                status = parseInt(res1.status) === 1 ? confirmedBlockNumber >= needConfirmedBlockNumber ? interface_1.TxStatus.SUCCESS : interface_1.TxStatus.CONFIRMED : interface_1.TxStatus.FAILED;
                                gasPrice = new bignumber_1.BigNumber(res2.gasPrice);
                                fee = unitTools_1.wei2Eth(gasPrice.times(res1.gasUsed));
                                localTx = walletTools_1.fetchLocalTxByHash(addr, 'BTC', hash);
                                record = Object.assign({}, localTx, { hash: hash, txType: addr.toLowerCase() === res1.from.toLowerCase() ? localTx ? localTx.txType : interface_1.TxType.TRANSFER : interface_1.TxType.RECEIPT, fromAddr: res1.from, toAddr: toAddr,
                                    pay: pay,
                                    fee: fee, time: res3.timestamp * 1000, info: '', currencyName: currencyName,
                                    status: status,
                                    confirmedBlockNumber: confirmedBlockNumber,
                                    needConfirmedBlockNumber: needConfirmedBlockNumber, nonce: res2.nonce, addr: addr });

                                this.updateTransactionLocalStorage(record);
                                console.log('定时更新交易记录', {
                                    tx: record,
                                    time: new Date().getTime()
                                });

                            case 32:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));
        }
        // 获取btc交易详情

    }, {
        key: "getBTCTransactionByHash",
        value: function getBTCTransactionByHash(hash, addr) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                var v;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                if (hash) {
                                    _context9.next = 2;
                                    break;
                                }

                                return _context9.abrupt("return");

                            case 2:
                                _context9.next = 4;
                                return api_1.BtcApi.getTxInfo(hash);

                            case 4:
                                v = _context9.sent;

                                this.parseBtcTransactionTxRecord(addr, v);

                            case 6:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));
        }
        //解析erc20 input

    }, {
        key: "parseErc20Input",
        value: function parseErc20Input(input) {
            var toAddr = "0x" + input.slice(34, 74);
            var pay = Number("0x" + input.slice(74));
            return {
                toAddr: toAddr,
                pay: pay
            };
        }
        // 过滤eth交易记录，过滤掉token的交易记录

    }, {
        key: "filterEthTrans",
        value: function filterEthTrans(trans) {
            return trans.filter(function (item) {
                if (item.to.length === 0) return false;
                if (item.input.indexOf(constants_1.ethTokenTransferCode) === 0) return false;
                return true;
            });
        }
        /**
         * 解析btc交易详情记录
         */

    }, {
        key: "parseBtcTransactionTxRecord",
        value: function parseBtcTransactionTxRecord(addr, tx) {
            if (!tx) return;
            var value = 0;
            var inputs = tx.vin.map(function (v) {
                return v.addr;
            });
            var outputs = tx.vout.map(function (v) {
                if (!value) {
                    if (inputs.indexOf(addr) >= 0) {
                        value = parseFloat(v.value);
                    } else if (addr === v.scriptPubKey.addresses[0]) {
                        value = parseFloat(v.value);
                    }
                }
                return v.scriptPubKey.addresses[0];
            });
            var fromAddr = void 0;
            var toAddr = void 0;
            if (inputs && inputs.indexOf(addr) >= 0) {
                fromAddr = addr;
                toAddr = outputs[0];
            } else {
                fromAddr = inputs[0];
                toAddr = addr;
            }
            var pay = value;
            var needConfirmedBlockNumber = tools_1.getConfirmBlockNumber('BTC', pay);
            var status = tx.confirmations > 0 ? tx.confirmations >= needConfirmedBlockNumber ? interface_1.TxStatus.SUCCESS : interface_1.TxStatus.CONFIRMED : interface_1.TxStatus.PENDING;
            var hash = tx.txid;
            var localTx = walletTools_1.fetchLocalTxByHash(addr, 'BTC', hash);
            var record = Object.assign({}, localTx, { hash: tx.txid, addr: addr, txType: addr === fromAddr ? localTx ? localTx.txType : interface_1.TxType.TRANSFER : interface_1.TxType.RECEIPT, fromAddr: fromAddr,
                toAddr: toAddr,
                pay: pay, time: tx.time * 1000, status: status, confirmedBlockNumber: tx.confirmations, needConfirmedBlockNumber: needConfirmedBlockNumber, info: "", currencyName: 'BTC', fee: tx.fees, nonce: -1 });
            this.updateTransactionLocalStorage(record);
            console.log('定时更新交易', { tx: record, time: new Date().getTime() });
        }
        //定时器更新余额

    }, {
        key: "timerUpdateBalance",
        value: function timerUpdateBalance() {
            var _this6 = this;

            this.balanceTimerList.forEach(function (item) {
                clearTimeout(item.timer);
            });
            var wallet = store_1.find('curWallet');
            if (!wallet) return;
            var showCurrencys = wallet.showCurrencys;
            showCurrencys.forEach(function (currencyName) {
                var addrs1 = tools_1.getAddrsByCurrencyName(wallet, currencyName);
                addrs1.forEach(function (addr) {
                    _this6.updateBalance(addr, currencyName);
                });
            });
        }
        //获取余额更新间隔

    }, {
        key: "getBalanceUpdateDelay",
        value: function getBalanceUpdateDelay(addr, currencyName) {
            var second = 1000;
            var minute = 60 * second;
            var txList = walletTools_1.fetchTransactionList(addr, currencyName);
            var now = new Date().getTime();
            var delay = 5 * minute; //默认5分钟更新
            if (currencyName === 'BTC') {
                delay = 30 * minute;
            }
            for (var i = 0; i < txList.length; i++) {
                if (txList[i].status === interface_1.TxStatus.PENDING && now - txList[i].time < 10 * minute) {
                    delay = 10 * second;
                    if (currencyName === 'BTC') {
                        delay = 10 * minute;
                    }
                    break;
                }
            }
            return delay;
        }
        /**
         * 更新余额
         */

    }, {
        key: "updateBalance",
        value: function updateBalance(addr, currencyName) {
            var _this7 = this;

            var timerItem = this.fetchBalanceTimer(addr, currencyName);
            if (timerItem) {
                clearTimeout(timerItem.timer);
            }
            if (config_1.ERC20Tokens[currencyName]) {
                var balanceOfCode = wallet_2.EthWallet.tokenOperations('balanceof', currencyName, addr);
                // console.log('balanceOfCode',balanceOfCode);
                var api = new api_2.Api();
                api.ethCall(config_1.ERC20Tokens[currencyName].contractAddr, balanceOfCode).then(function (r) {
                    // tslint:disable-next-line:radix
                    var num = unitTools_1.ethTokenDivideDecimals(Number(r), currencyName);
                    // console.log(currencyName,num);
                    _this7.setBalance(addr, currencyName, num);
                });
            }
            switch (currencyName) {
                case 'ETH':
                    var _api = new api_2.Api();
                    _api.getBalance(addr).then(function (r) {
                        var num = unitTools_1.wei2Eth(r.result);
                        _this7.setBalance(addr, currencyName, num);
                    });
                    break;
                case 'BTC':
                    api_1.BtcApi.getBalance(addr).then(function (r) {
                        _this7.setBalance(addr, currencyName, unitTools_1.sat2Btc(r));
                    });
                    break;
                default:
            }
            var delay = this.getBalanceUpdateDelay(addr, currencyName);
            var timer = setTimeout(function () {
                console.log('定时更新余额', {
                    delay: delay,
                    addr: addr,
                    currencyName: currencyName,
                    time: new Date().getTime()
                });
                _this7.updateBalance(addr, currencyName);
            }, delay);
            this.resetBalanceTimerList(addr, currencyName, timer);
        }
        //重置余额定时器列表

    }, {
        key: "resetBalanceTimerList",
        value: function resetBalanceTimerList(addr, currencyName, timer) {
            var index = -1;
            for (var i = 0; i < this.balanceTimerList.length; i++) {
                if (this.balanceTimerList[i].addr === addr && this.balanceTimerList[i].currencyName === currencyName) {
                    index = i;
                    break;
                }
            }
            var timerObj = {
                addr: addr,
                currencyName: currencyName,
                timer: timer
            };
            if (index >= 0) {
                this.balanceTimerList.splice(index, 1, timerObj);
            } else {
                this.balanceTimerList.push(timerObj);
            }
        }
    }, {
        key: "fetchBalanceTimer",
        value: function fetchBalanceTimer(addr, currencyName) {
            for (var i = 0; i < this.balanceTimerList.length; i++) {
                if (this.balanceTimerList[i].addr === addr && this.balanceTimerList[i].currencyName === currencyName) {
                    return this.balanceTimerList[i];
                }
            }
        }
        /**
         * 设置余额
         */

    }, {
        key: "setBalance",
        value: function setBalance(addr, currencyName, num) {
            var addrs = store_1.find('addrs') || [];
            var isUpdate = false;
            addrs = addrs.map(function (v) {
                if (v.addr === addr && v.currencyName === currencyName && v.balance !== num) {
                    v.balance = num;
                    isUpdate = true;
                }
                return v;
            });
            if (isUpdate) {
                store_1.updateStore('addrs', addrs);
            }
        }
        // 汇率获取更新

    }, {
        key: "exchangeRate",
        value: function exchangeRate(currencyName) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                var ethApi, ethRate, btcRate;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.t0 = currencyName;
                                _context10.next = _context10.t0 === 'ETH' ? 3 : _context10.t0 === 'BTC' ? 9 : 14;
                                break;

                            case 3:
                                ethApi = new api_2.Api();
                                _context10.next = 6;
                                return ethApi.getExchangeRate();

                            case 6:
                                ethRate = _context10.sent;

                                store_1.updateStore('exchangeRateJson', store_1.getBorn('exchangeRateJson').set('ETH', ethRate));
                                return _context10.abrupt("break", 14);

                            case 9:
                                _context10.next = 11;
                                return api_1.BtcApi.getExchangeRate();

                            case 11:
                                btcRate = _context10.sent;

                                store_1.updateStore('exchangeRateJson', store_1.getBorn('exchangeRateJson').set('BTC', btcRate));
                                return _context10.abrupt("break", 14);

                            case 14:
                            case "end":
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));
        }
        /**
         * 检查eth地址
         */

    }, {
        key: "checkEthAddr",
        value: function checkEthAddr(wallet, currencyRecord) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
                var mnemonic, ethWallet, cnt, addrs, i, address;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _context11.next = 2;
                                return walletTools_1.getMnemonic(wallet, '');

                            case 2:
                                mnemonic = _context11.sent;
                                ethWallet = wallet_2.EthWallet.fromMnemonic(mnemonic, constants_1.lang);
                                _context11.next = 6;
                                return ethWallet.scanUsedAddress();

                            case 6:
                                cnt = _context11.sent;
                                addrs = [];

                                for (i = 1; i < cnt; i++) {
                                    address = ethWallet.selectAddress(i);

                                    currencyRecord.addrs.push(address);
                                    addrs.push(tools_1.initAddr(address, 'ETH'));
                                }
                                return _context11.abrupt("return", addrs);

                            case 10:
                            case "end":
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));
        }
        /**
         * 检查btc地址
         */

    }, {
        key: "checkBtcAddr",
        value: function checkBtcAddr(wallet, currencyRecord) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
                var mnemonic, btcWallet, cnt, addrs, i, address;
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                _context12.next = 2;
                                return walletTools_1.getMnemonic(wallet, '');

                            case 2:
                                mnemonic = _context12.sent;
                                btcWallet = wallet_1.BTCWallet.fromMnemonic(mnemonic, constants_1.btcNetwork, constants_1.lang);

                                btcWallet.unlock();
                                _context12.next = 7;
                                return btcWallet.scanUsedAddress();

                            case 7:
                                cnt = _context12.sent;
                                addrs = [];

                                for (i = 1; i < cnt; i++) {
                                    address = btcWallet.derive(i);

                                    currencyRecord.addrs.push(address);
                                    addrs.push(tools_1.initAddr(address, 'BTC'));
                                }
                                btcWallet.lock();
                                return _context12.abrupt("return", addrs);

                            case 12:
                            case "end":
                                return _context12.stop();
                        }
                    }
                }, _callee12, this);
            }));
        }
        /**
         * 检查eth erc20 token地址
         */

    }, {
        key: "checkEthERC20TokenAddr",
        value: function checkEthERC20TokenAddr(wallet, currencyRecord) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
                var mnemonic, ethWallet, cnt, addrs, i, address;
                return regeneratorRuntime.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                _context13.next = 2;
                                return walletTools_1.getMnemonic(wallet, '');

                            case 2:
                                mnemonic = _context13.sent;
                                ethWallet = wallet_2.EthWallet.fromMnemonic(mnemonic, constants_1.lang);
                                _context13.next = 6;
                                return ethWallet.scanTokenUsedAddress(config_1.ERC20Tokens[currencyRecord.currencyName].contractAddr);

                            case 6:
                                cnt = _context13.sent;
                                addrs = [];

                                for (i = 1; i < cnt; i++) {
                                    address = ethWallet.selectAddress(i);

                                    currencyRecord.addrs.push(address);
                                    addrs.push(tools_1.initAddr(address, currencyRecord.currencyName));
                                }
                                return _context13.abrupt("return", addrs);

                            case 10:
                            case "end":
                                return _context13.stop();
                        }
                    }
                }, _callee13, this);
            }));
        }
        // 更新交易状态

    }, {
        key: "updateTxStatus",
        value: function updateTxStatus(hash, currencyName, addr) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                if (currencyName === 'ETH') {
                                    this.getEthTransactionByHash(hash, addr);
                                } else if (currencyName === 'BTC') {
                                    this.getBTCTransactionByHash(hash, addr);
                                } else {
                                    this.getERC20TransactionByHash(currencyName, hash, addr);
                                }

                            case 1:
                            case "end":
                                return _context14.stop();
                        }
                    }
                }, _callee14, this);
            }));
        }
        //定时更新交易

    }, {
        key: "timerUpdateTxWithdraw",
        value: function timerUpdateTxWithdraw(tx) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
                var _this8 = this;

                var addr, currencyName, hash, newTx, delay, status, timer;
                return regeneratorRuntime.wrap(function _callee15$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                addr = tx.addr;
                                currencyName = tx.currencyName;
                                hash = tx.hash;
                                newTx = walletTools_1.fetchLocalTxByHash(addr, currencyName, hash);
                                delay = this.calUpdateDelay(tx);
                                status = tx.status;

                                if (!(status === interface_1.TxStatus.SUCCESS)) {
                                    _context15.next = 8;
                                    break;
                                }

                                return _context15.abrupt("return");

                            case 8:
                                this.updateTxStatus(tx && tx.hash, currencyName, addr);

                                if (delay) {
                                    _context15.next = 11;
                                    break;
                                }

                                return _context15.abrupt("return");

                            case 11:
                                timer = setTimeout(function () {
                                    _this8.timerUpdateTxWithdraw(newTx || tx);
                                }, delay);

                                this.resetTimer(tx.hash, timer);

                            case 13:
                            case "end":
                                return _context15.stop();
                        }
                    }
                }, _callee15, this);
            }));
        }
        //定时更新交易

    }, {
        key: "timerUpdateTx",
        value: function timerUpdateTx(addr, currencyName, hash) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
                var _this9 = this;

                var tx, delay, status, timer;
                return regeneratorRuntime.wrap(function _callee16$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                tx = walletTools_1.fetchLocalTxByHash(addr, currencyName, hash);
                                delay = this.calUpdateDelay(tx);
                                status = tx.status;

                                if (!(status === interface_1.TxStatus.SUCCESS)) {
                                    _context16.next = 5;
                                    break;
                                }

                                return _context16.abrupt("return", tx);

                            case 5:
                                this.updateTxStatus(tx && tx.hash, currencyName, addr);

                                if (delay) {
                                    _context16.next = 8;
                                    break;
                                }

                                return _context16.abrupt("return");

                            case 8:
                                console.log(currencyName + "--------delay", delay);
                                timer = setTimeout(function () {
                                    _this9.timerUpdateTx(addr, currencyName, hash);
                                }, delay);

                                this.resetTimer(tx.hash, timer);

                            case 11:
                            case "end":
                                return _context16.stop();
                        }
                    }
                }, _callee16, this);
            }));
        }
        //通过hash获取timer item

    }, {
        key: "fetchTimerItem",
        value: function fetchTimerItem(hash) {
            var timerItem = void 0;
            for (var i = 0; i < this.txTimerList.length; i++) {
                if (this.txTimerList[i].hash === hash) {
                    timerItem = this.txTimerList[i];
                    return timerItem;
                }
            }
        }
        //通过hash清楚定时器

    }, {
        key: "clearTimer",
        value: function clearTimer(hash) {
            var timerItem = void 0;
            for (var i = 0; i < this.txTimerList.length; i++) {
                if (this.txTimerList[i].hash === hash) {
                    timerItem = this.txTimerList[i];
                    clearTimeout(timerItem.timer);
                    this.txTimerList.splice(i, 1);
                    return;
                }
            }
        }
        //修改timer

    }, {
        key: "resetTimer",
        value: function resetTimer(hash, timer) {
            var index = -1;
            for (var i = 0; i < this.txTimerList.length; i++) {
                if (this.txTimerList[i].hash === hash) {
                    index = i;
                    break;
                }
            }
            var timerObj = {
                hash: hash,
                timer: timer
            };
            if (index >= 0) {
                this.txTimerList.splice(index, 1, timerObj);
            } else {
                this.txTimerList.push(timerObj);
            }
        }
        // 计算更新eth delay

    }, {
        key: "calUpdateDelay",
        value: function calUpdateDelay(tx) {
            var second = 1000;
            var minute = 60 * second;
            var hour = 60 * minute;
            var currencyName = tx.currencyName;
            var curTime = new Date().getTime();
            var interval = curTime - tx.time;
            if (tx.status === interface_1.TxStatus.PENDING) {
                if (currencyName === 'BTC') {
                    if (interval < 4 * hour) {
                        //4小时以内
                        return 10 * minute;
                    } else {
                        return 30 * minute;
                    }
                } else {
                    if (interval < 10 * minute) {
                        //10分钟以内
                        return 10 * second;
                    } else {
                        //超过7天
                        return 5 * minute;
                    }
                }
            } else if (tx.status === interface_1.TxStatus.CONFIRMED) {
                if (currencyName === 'BTC') {
                    return 10 * minute;
                } else {
                    return 10 * second;
                }
            }
        }
    }]);

    return DataCenter;
}();

exports.DataCenter = DataCenter;
// ============================================ 立即执行
/**
 * 消息处理列表
 */
exports.dataCenter = new DataCenter();
})