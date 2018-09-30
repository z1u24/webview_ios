_$define("app/view/wallet/cloudWallet/recharge", function (require, exports, module){
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
 * Recharge
 */
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var config_1 = require("../../../config");
var pullWallet_1 = require("../../../net/pullWallet");
var interface_1 = require("../../../store/interface");
var constants_1 = require("../../../utils/constants");
// tslint:disable-next-line:max-line-length
var tools_1 = require("../../../utils/tools");
var unitTools_1 = require("../../../utils/unitTools");

var Recharge = function (_widget_1$Widget) {
    _inherits(Recharge, _widget_1$Widget);

    function Recharge() {
        _classCallCheck(this, Recharge);

        return _possibleConstructorReturn(this, (Recharge.__proto__ || Object.getPrototypeOf(Recharge)).apply(this, arguments));
    }

    _createClass(Recharge, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(Recharge.prototype.__proto__ || Object.getPrototypeOf(Recharge.prototype), "setProps", this).call(this, props, oldProps);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var cn, toa, list, i, obj, tx, curLevel;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
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
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        // 更新矿工费

    }, {
        key: "updateMinerFeeList",
        value: function updateMinerFeeList() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var cn, toa, list, obj, gasLimit, i, _obj;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                cn = this.props.currencyName === 'ETH' || config_1.ERC20Tokens[this.props.currencyName] ? 'ETH' : 'BTC';
                                toa = constants_1.timeOfArrival[cn];
                                list = [];
                                _context2.next = 5;
                                return pullWallet_1.estimateMinerFee(this.props.currencyName);

                            case 5:
                                obj = _context2.sent;
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
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
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
        // 提币金额变化

    }, {
        key: "amountChange",
        value: function amountChange(e) {
            this.state.amount = Number(e.value);
            this.paint();
        }
        // 选择矿工费

    }, {
        key: "chooseMinerFee",
        value: function chooseMinerFee() {
            var _this2 = this;

            root_1.popNew('app-components-modalBox-chooseModalBox', {
                currencyName: this.props.currencyName,
                minerFeeList: this.state.minerFeeList,
                curLevel: this.state.curLevel,
                minLevel: this.state.minLevel
            }, function (index) {
                _this2.state.curLevel = _this2.state.minerFeeList[index].level;
                _this2.state.minerFee = _this2.state.minerFeeList[index].minerFee;
                _this2.paint();
            });
        }
        // 转账

    }, {
        key: "nextClick",
        value: function nextClick() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var minerFeeLevel, currencyName, fromAddr, pay, passwd, t, oldTx, tx, ret;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (this.state.amount) {
                                    _context3.next = 3;
                                    break;
                                }

                                tools_1.popNewMessage(this.state.cfgData.tips[0]);
                                return _context3.abrupt("return");

                            case 3:
                                if (!(this.state.balance < this.state.amount + this.state.minerFee)) {
                                    _context3.next = 6;
                                    break;
                                }

                                tools_1.popNewMessage(this.state.cfgData.tips[1]);
                                return _context3.abrupt("return");

                            case 6:
                                minerFeeLevel = this.state.curLevel;
                                currencyName = this.props.currencyName;
                                fromAddr = this.state.fromAddr;
                                pay = this.state.amount;
                                _context3.next = 12;
                                return tools_1.popPswBox();

                            case 12:
                                passwd = _context3.sent;

                                if (passwd) {
                                    _context3.next = 15;
                                    break;
                                }

                                return _context3.abrupt("return");

                            case 15:
                                t = new Date();
                                oldTx = this.props.tx;
                                tx = {
                                    hash: '',
                                    txType: interface_1.TxType.RECHARGE,
                                    fromAddr: fromAddr,
                                    toAddr: '',
                                    pay: pay,
                                    time: t.getTime(),
                                    status: interface_1.TxStatus.PENDING,
                                    confirmedBlockNumber: 0,
                                    needConfirmedBlockNumber: 0,
                                    info: '',
                                    currencyName: currencyName,
                                    fee: this.state.minerFee,
                                    nonce: oldTx && oldTx.nonce,
                                    minerFeeLevel: minerFeeLevel,
                                    addr: fromAddr
                                };
                                ret = void 0;

                                if (this.props.tx) {
                                    tx.hash = this.props.tx.hash;
                                    ret = pullWallet_1.resendRecharge(passwd, tx);
                                } else {
                                    ret = pullWallet_1.recharge(passwd, tx);
                                }
                                if (ret) {
                                    this.ok && this.ok();
                                }

                            case 21:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }]);

    return Recharge;
}(widget_1.Widget);

exports.Recharge = Recharge;
})