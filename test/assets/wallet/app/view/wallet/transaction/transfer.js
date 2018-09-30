_$define("app/view/wallet/transaction/transfer", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
 * 转账
 */
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var config_1 = require("../../../config");
var native_1 = require("../../../logic/native");
var pullWallet_1 = require("../../../net/pullWallet");
var interface_1 = require("../../../store/interface");
var constants_1 = require("../../../utils/constants");
// tslint:disable-next-line:max-line-length
var tools_1 = require("../../../utils/tools");
var unitTools_1 = require("../../../utils/unitTools");

var Transfer = function (_widget_1$Widget) {
    _inherits(Transfer, _widget_1$Widget);

    function Transfer() {
        _classCallCheck(this, Transfer);

        return _possibleConstructorReturn(this, (Transfer.__proto__ || Object.getPrototypeOf(Transfer)).apply(this, arguments));
    }

    _createClass(Transfer, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            var _this2 = this;

            var _super = function _super(name) {
                return _get(Transfer.prototype.__proto__ || Object.getPrototypeOf(Transfer.prototype), name, _this2);
            };
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _super("setProps").call(this, props, oldProps);
                                this.init();

                            case 2:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "init",
        value: function init() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var cn, toa, list, i, obj, tx, curLevel;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                cn = this.props.currencyName === 'ETH' || config_1.ERC20Tokens[this.props.currencyName] ? 'ETH' : 'BTC';
                                toa = constants_1.timeOfArrival[cn];
                                list = [];

                                for (i = 0; i < toa.length; i++) {
                                    obj = Object.assign({}, toa[i], { minerFee: '0.000000' });

                                    list.push(obj);
                                }
                                tx = this.props.tx;

                                console.log(tx);
                                curLevel = tx ? tx.minerFeeLevel + 1 : interface_1.MinerFeeLevel.STANDARD;

                                this.state = {
                                    fromAddr: tools_1.getCurrentAddrByCurrencyName(this.props.currencyName),
                                    toAddr: tx ? tx.toAddr : '',
                                    amount: tx ? tx.pay : 0,
                                    balance: tools_1.getCurrentAddrBalanceByCurrencyName(this.props.currencyName),
                                    minerFee: list[curLevel].minerFee,
                                    minerFeeList: list,
                                    curLevel: curLevel,
                                    minLevel: curLevel,
                                    inputDisabled: tx ? true : false,
                                    cfgData: tools_1.getLanguage(this)
                                };
                                this.updateMinerFeeList();

                            case 9:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
        // 更新矿工费

    }, {
        key: "updateMinerFeeList",
        value: function updateMinerFeeList() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var cn, toa, list, obj, gasLimit, i, _obj;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                cn = this.props.currencyName === 'ETH' || config_1.ERC20Tokens[this.props.currencyName] ? 'ETH' : 'BTC';
                                toa = constants_1.timeOfArrival[cn];
                                list = [];
                                _context3.next = 5;
                                return pullWallet_1.estimateMinerFee(this.props.currencyName);

                            case 5:
                                obj = _context3.sent;
                                gasLimit = obj.gasLimit;
                                // const btcMinerFee = obj.btcMinerFee;

                                for (i = 0; i < toa.length; i++) {
                                    _obj = Object.assign({}, toa[i], {
                                        // tslint:disable-next-line:max-line-length
                                        minerFee: cn === 'ETH' ? unitTools_1.wei2Eth(gasLimit * tools_1.fetchGasPrice(toa[i].level)) : unitTools_1.sat2Btc(tools_1.fetchBtcMinerFee(toa[i].level)) });

                                    list.push(_obj);
                                }
                                this.state.minerFeeList = list;
                                this.state.minerFee = list[this.state.curLevel].minerFee;
                                this.paint();

                            case 11:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "speedDescClick",
        value: function speedDescClick() {
            root_1.popNew('app-components-modalBox-modalBox1', this.state.cfgData.modalBox);
        }
    }, {
        key: "chooseMinerFee",
        value: function chooseMinerFee() {
            var _this3 = this;

            root_1.popNew('app-components-modalBox-chooseModalBox', {
                currencyName: this.props.currencyName,
                minerFeeList: this.state.minerFeeList,
                curLevel: this.state.curLevel,
                minLevel: this.state.minLevel
            }, function (index) {
                _this3.state.curLevel = _this3.state.minerFeeList[index].level;
                _this3.state.minerFee = _this3.state.minerFeeList[index].minerFee;
                _this3.paint();
            });
        }
        // 收款地址变化

    }, {
        key: "toAddrChange",
        value: function toAddrChange(e) {
            this.state.toAddr = e.value;
            this.paint();
        }
        // 转账金额变化

    }, {
        key: "amountChange",
        value: function amountChange(e) {
            this.state.amount = Number(e.value);
            this.paint();
        }
        // 转账

    }, {
        key: "nextClick",
        value: function nextClick() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var minerFeeLevel, currencyName, fromAddr, toAddr, pay, passwd, t, tx, ret, _tx;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (this.state.toAddr) {
                                    _context4.next = 3;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { content: this.state.cfgData.tips[0] });
                                return _context4.abrupt("return");

                            case 3:
                                if (this.state.amount) {
                                    _context4.next = 6;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { content: this.state.cfgData.tips[1] });
                                return _context4.abrupt("return");

                            case 6:
                                if (!(this.state.balance < this.state.amount + this.state.minerFee)) {
                                    _context4.next = 9;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { content: this.state.cfgData.tips[2] });
                                return _context4.abrupt("return");

                            case 9:
                                minerFeeLevel = this.state.curLevel;
                                currencyName = this.props.currencyName;
                                fromAddr = this.state.fromAddr;
                                toAddr = this.state.toAddr;
                                pay = this.state.amount;
                                _context4.next = 16;
                                return tools_1.popPswBox();

                            case 16:
                                passwd = _context4.sent;

                                if (passwd) {
                                    _context4.next = 19;
                                    break;
                                }

                                return _context4.abrupt("return");

                            case 19:
                                t = new Date();
                                tx = {
                                    hash: '',
                                    addr: fromAddr,
                                    txType: interface_1.TxType.TRANSFER,
                                    fromAddr: fromAddr,
                                    toAddr: toAddr,
                                    pay: pay,
                                    time: t.getTime(),
                                    status: interface_1.TxStatus.PENDING,
                                    confirmedBlockNumber: 0,
                                    needConfirmedBlockNumber: 0,
                                    info: '',
                                    currencyName: currencyName,
                                    fee: this.state.minerFee,
                                    nonce: undefined,
                                    minerFeeLevel: minerFeeLevel
                                };
                                ret = void 0;

                                if (this.props.tx) {
                                    _context4.next = 28;
                                    break;
                                }

                                _context4.next = 25;
                                return pullWallet_1.transfer(passwd, tx);

                            case 25:
                                ret = _context4.sent;
                                _context4.next = 33;
                                break;

                            case 28:
                                _tx = Object.assign({}, this.props.tx);

                                _tx.minerFeeLevel = minerFeeLevel;
                                _context4.next = 32;
                                return pullWallet_1.resendNormalTransfer(passwd, _tx);

                            case 32:
                                ret = _context4.sent;

                            case 33:
                                if (ret) {
                                    this.ok && this.ok();
                                }

                            case 34:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        }
    }, {
        key: "doScanClick",
        value: function doScanClick() {
            var _this4 = this;

            native_1.doScanQrCode(function (res) {
                console.log(res);
                _this4.state.toAddr = res;
                _this4.paint();
            });
        }
    }]);

    return Transfer;
}(widget_1.Widget);

exports.Transfer = Transfer;
})