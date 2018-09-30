_$define("app/view/earn/redEnvelope/writeRedEnv", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
 * sendRedEnv
 */
// =============================================导入
var root_1 = require("../../../../pi/ui/root");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var pull_1 = require("../../../net/pull");
var interface_1 = require("../../../store/interface");
var store_1 = require("../../../store/store");
var tools_1 = require("../../../utils/tools");
var walletTools_1 = require("../../../utils/walletTools");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var WriteRedEnv = function (_widget_1$Widget) {
    _inherits(WriteRedEnv, _widget_1$Widget);

    function WriteRedEnv() {
        _classCallCheck(this, WriteRedEnv);

        return _possibleConstructorReturn(this, (WriteRedEnv.__proto__ || Object.getPrototypeOf(WriteRedEnv)).call(this));
    }

    _createClass(WriteRedEnv, [{
        key: "create",
        value: function create() {
            var realUser = store_1.getBorn('realUserMap').get(store_1.find('conUser'));
            this.state = {
                list: [],
                selected: 0,
                showPin: false,
                totalAmount: 0,
                totalNum: 0,
                oneAmount: 0,
                message: '',
                realUser: realUser,
                cfgData: tools_1.getLanguage(this)
            };
            var list = [{ img: '../../res/image/currency/KT.png', name: 'KT', num: 500 }, { img: '../../res/image/currency/BTC.png', name: 'BTC', num: 0.01 }, { img: '../../res/image/currency/ETH.png', name: 'ETH', num: 0.5 }];
            var data = store_1.getBorn('cloudBalance');
            for (var i in list) {
                list[i].num = data.get(interface_1.CurrencyType[list[i].name]) || 0;
            }
            this.state.list = list;
            if (!realUser) {
                pull_1.fetchRealUser();
            }
        }
        /**
         * 更新真实用户
         */

    }, {
        key: "updateRealUser",
        value: function updateRealUser(realUserMap) {
            this.state.realUser = realUserMap.get(store_1.find('conUser'));
        }
        /**
         * 更新余额
         */

    }, {
        key: "updateBalance",
        value: function updateBalance() {
            var list = [{ img: '../../res/image/currency/KT.png', name: 'KT', num: 500 }, { img: '../../res/image/currency/BTC.png', name: 'BTC', num: 0.01 }, { img: '../../res/image/currency/ETH.png', name: 'ETH', num: 0.5 }];
            var data = store_1.getBorn('cloudBalance');
            for (var i in list) {
                list[i].num = data.get(interface_1.CurrencyType[list[i].name]) || 0;
            }
            this.state.list = list;
            this.paint();
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "goHistory",
        value: function goHistory() {
            root_1.popNew('app-view-earn-redEnvelope-redEnvHistory');
        }
        /**
         * 切换拼手气和普通红包
         */

    }, {
        key: "changePin",
        value: function changePin() {
            this.state.showPin = !this.state.showPin;
            if (this.state.showPin) {
                this.state.totalAmount = this.state.oneAmount;
            } else {
                this.state.totalAmount = this.state.oneAmount * this.state.totalNum;
            }
            this.paint();
        }
        /**
         * 修改金额
         */

    }, {
        key: "changeAmount",
        value: function changeAmount(e) {
            if (this.state.showPin) {
                this.state.totalAmount = e.value;
            } else {
                this.state.oneAmount = e.value;
                this.state.totalAmount = this.state.oneAmount * this.state.totalNum;
            }
            this.paint();
        }
        /**
         * 修改数量
         */

    }, {
        key: "changeNumber",
        value: function changeNumber(e) {
            this.state.totalNum = Number(e.value);
            if (!this.state.showPin) {
                this.state.totalAmount = this.state.oneAmount * this.state.totalNum;
            }
            this.paint();
        }
        /**
         * 切换货币
         */

    }, {
        key: "changeCoin",
        value: function changeCoin(e) {
            this.state.selected = e.selected;
            this.paint();
        }
        /**
         * 点击发红包按钮
         */

    }, {
        key: "send",
        value: function send() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _this2 = this;

                var curCoin, mess1, mess2;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!(this.state.totalAmount === 0)) {
                                    _context2.next = 3;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { content: this.state.cfgData.tips[1] });
                                return _context2.abrupt("return");

                            case 3:
                                if (!(this.state.totalNum === 0)) {
                                    _context2.next = 6;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { content: this.state.cfgData.tips[2] });
                                return _context2.abrupt("return");

                            case 6:
                                curCoin = this.state.list[this.state.selected];

                                if (!(this.state.totalAmount > curCoin.num)) {
                                    _context2.next = 10;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { content: this.state.cfgData.tips[3] });
                                return _context2.abrupt("return");

                            case 10:
                                if (!(this.state.message.length > 20)) {
                                    _context2.next = 13;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { content: this.state.cfgData.tips[4] });
                                return _context2.abrupt("return");

                            case 13:
                                if (this.state.message === '') {
                                    this.state.message = this.state.cfgData.messTitle[1];
                                }

                                if (this.state.realUser) {
                                    _context2.next = 17;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { content: this.state.cfgData.tips[5] });
                                return _context2.abrupt("return");

                            case 17:
                                this.inputBlur();
                                mess1 = this.state.cfgData.phrase[0] + this.state.totalAmount + curCoin.name + this.state.cfgData.phrase[1];
                                // tslint:disable-next-line:max-line-length

                                mess2 = this.state.cfgData.phrase[2] + (this.state.showPin ? this.state.cfgData.redEnvType[1] : this.state.cfgData.redEnvType[0]);

                                root_1.popNew('app-components-modalBoxInput-modalBoxInput', {
                                    title: curCoin.name + this.state.cfgData.phrase[3],
                                    content: [mess1, mess2],
                                    placeholder: this.state.cfgData.phrase[4],
                                    itype: 'password'
                                }, function (r) {
                                    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                        var close, wallet, fg;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        close = root_1.popNew('app-components1-loading-loading', { text: this.state.cfgData.loading });
                                                        wallet = store_1.find('curWallet');
                                                        _context.next = 4;
                                                        return walletTools_1.VerifyIdentidy(wallet, r);

                                                    case 4:
                                                        fg = _context.sent;

                                                        if (fg) {
                                                            this.sendRedEnv();
                                                            close.callback(close.widget);
                                                        } else {
                                                            root_1.popNew('app-components-message-message', { content: this.state.cfgData.tips[6] });
                                                        }

                                                    case 6:
                                                    case "end":
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, this);
                                    }));
                                });

                            case 21:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
        /**
         * 实际发红包
         */

    }, {
        key: "sendRedEnv",
        value: function sendRedEnv() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var curCoin, lm, rtype, ctype, totalAmount, totalNum, rid;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                curCoin = this.state.list[this.state.selected];
                                lm = this.state.message; // 留言

                                rtype = this.state.showPin ? 1 : 0; // 0 等额红包  1 拼手气红包

                                ctype = Number(interface_1.CurrencyType[curCoin.name]); // 货币类型

                                totalAmount = Number(this.state.totalAmount); // 红包总金额

                                totalNum = this.state.totalNum; // 红包总个数

                                _context3.next = 8;
                                return pull_1.sendRedEnvlope(rtype, ctype, totalAmount, totalNum, lm);

                            case 8:
                                rid = _context3.sent;

                                if (rid) {
                                    _context3.next = 11;
                                    break;
                                }

                                return _context3.abrupt("return");

                            case 11:
                                root_1.popNew('app-view-earn-redEnvelope-sendRedEnv', {
                                    message: this.state.message,
                                    rid: rid,
                                    rtype: rtype,
                                    cname: curCoin.name
                                });
                                this.state.oneAmount = 0;
                                this.state.totalNum = 0;
                                this.state.totalAmount = 0;
                                this.state.message = '';
                                this.paint();
                                store_1.updateStore('sHisRec', undefined); // 更新红包记录
                                pull_1.getCloudBalance(); // 更新余额
                                if (!this.state.showPin) {
                                    // tslint:disable-next-line:max-line-length
                                    console.log('url', pull_1.sharePerUrl + "?type=" + interface_1.RedEnvelopeType.Normal + "&rid=" + rid + "&lm=" + window.encodeURIComponent(lm));
                                } else {
                                    // tslint:disable-next-line:max-line-length
                                    console.log('url', pull_1.sharePerUrl + "?type=" + interface_1.RedEnvelopeType.Random + "&rid=" + rid + "&lm=" + window.encodeURIComponent(lm));
                                }

                            case 20:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
        /**
         * 输入框取消聚焦
         */

    }, {
        key: "inputBlur",
        value: function inputBlur() {
            var inputs = document.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].blur();
            }
        }
    }]);

    return WriteRedEnv;
}(widget_1.Widget);

exports.WriteRedEnv = WriteRedEnv;
// =====================================本地
store_1.register('cloudBalance', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateBalance();
    }
});
store_1.register('realUserMap', function (realUserMap) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateRealUser(realUserMap);
    }
});
})