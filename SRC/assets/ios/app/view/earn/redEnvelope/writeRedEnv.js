_$define("app/view/earn/redEnvelope/writeRedEnv", function (require, exports, module){
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
 * sendRedEnv
 */
// =============================================导入
var root_1 = require("../../../../pi/ui/root");
var lang_1 = require("../../../../pi/util/lang");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var pull_1 = require("../../../net/pull");
var interface_1 = require("../../../store/interface");
var memstore_1 = require("../../../store/memstore");
var walletTools_1 = require("../../../utils/walletTools");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var WriteRedEnv = function (_widget_1$Widget) {
    _inherits(WriteRedEnv, _widget_1$Widget);

    function WriteRedEnv() {
        _classCallCheck(this, WriteRedEnv);

        var _this = _possibleConstructorReturn(this, (WriteRedEnv.__proto__ || Object.getPrototypeOf(WriteRedEnv)).call(this));

        _this.props = {
            list: [],
            selected: 0,
            showPin: false,
            totalAmount: 0,
            totalNum: 0,
            oneAmount: 0,
            message: '',
            realUser: memstore_1.getStore('user/info/isRealUser'),
            forceHide: false,
            ktBalance: 0,
            inFlag: ''
        };
        return _this;
    }

    _createClass(WriteRedEnv, [{
        key: "create",
        value: function create() {
            _get(WriteRedEnv.prototype.__proto__ || Object.getPrototypeOf(WriteRedEnv.prototype), "create", this).call(this);
            this.language = this.config.value[lang_1.getLang()];
            this.updateBalance();
            if (!this.props.realUser) {
                pull_1.getRealUser();
            }
        }
    }, {
        key: "setProps",
        value: function setProps(props) {
            _get(WriteRedEnv.prototype.__proto__ || Object.getPrototypeOf(WriteRedEnv.prototype), "setProps", this).call(this, this.props);
            this.props = Object.assign({}, this.props, { ktBalance: props.ktBalance, inFlag: props.inFlag });
        }
        /**
         * 更新真实用户
         */

    }, {
        key: "updateRealUser",
        value: function updateRealUser() {
            this.props.realUser = memstore_1.getStore('user/info/isRealUser');
        }
        /**
         * 更新余额
         */

    }, {
        key: "updateBalance",
        value: function updateBalance() {
            var list = [{ img: '../../res/image/currency/KT.png', name: 'KT', num: 500 }, { img: '../../res/image/currency/BTC.png', name: 'BTC', num: 0.01 }, { img: '../../res/image/currency/ETH.png', name: 'ETH', num: 0.5 }];
            var data = memstore_1.getCloudBalances();
            for (var i in list) {
                list[i].num = data.get(interface_1.CloudCurrencyType[list[i].name]) || 0;
            }
            this.props.list = list;
            this.paint(true);
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok(null);
        }
    }, {
        key: "goHistory",
        value: function goHistory() {
            var _this2 = this;

            this.props.forceHide = true;
            this.paint();
            root_1.popNew('app-view-earn-redEnvelope-redEnvHistory');
            setTimeout(function () {
                _this2.props.forceHide = false;
                _this2.paint();
            }, 100);
        }
        /**
         * 切换拼手气和普通红包
         */

    }, {
        key: "changePin",
        value: function changePin() {
            this.props.showPin = !this.props.showPin;
            if (this.props.showPin) {
                this.props.totalAmount = this.props.oneAmount;
            } else {
                this.props.totalAmount = parseFloat((this.props.oneAmount * this.props.totalNum).toPrecision(12));
            }
            this.paint();
        }
        /**
         * 修改金额
         */

    }, {
        key: "changeAmount",
        value: function changeAmount(e) {
            if (this.props.showPin) {
                this.props.oneAmount = Number(e.value);
                this.props.totalAmount = Number(e.value);
            } else {
                this.props.oneAmount = Number(e.value);
                this.props.totalAmount = parseFloat((this.props.oneAmount * this.props.totalNum).toPrecision(12));
            }
            this.paint();
        }
        /**
         * 修改数量
         */

    }, {
        key: "changeNumber",
        value: function changeNumber(e) {
            this.props.totalNum = Number(e.value);
            if (!this.props.showPin) {
                this.props.totalAmount = parseFloat((this.props.oneAmount * this.props.totalNum).toPrecision(12));
            }
            this.paint();
        }
        /**
         * 修改留言
         */

    }, {
        key: "changeMessage",
        value: function changeMessage(e) {
            this.props.message = e.value;
            this.paint();
        }
        /**
         * 切换货币
         */

    }, {
        key: "changeCoin",
        value: function changeCoin(e) {
            this.props.selected = e.selected;
            this.props.oneAmount = 0;
            this.props.totalNum = 0;
            this.props.totalAmount = 0;
            this.props.message = '';
            this.paint();
        }
        /**
         * 点击发红包按钮
         */

    }, {
        key: "send",
        value: function send() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _this3 = this;

                var curCoin, mess1, mess2;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                curCoin = this.props.list[this.props.selected];

                                if (!(Number(this.props.totalNum) === 0)) {
                                    _context2.next = 4;
                                    break;
                                }

                                root_1.popNew('app-components1-message-message', { content: this.language.tips[2] });
                                return _context2.abrupt("return");

                            case 4:
                                if (!(Number(this.props.oneAmount) === 0 && Number(this.props.totalAmount) === 0)) {
                                    _context2.next = 7;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { content: this.language.tips[1] });
                                return _context2.abrupt("return");

                            case 7:
                                if (!(this.props.totalAmount > curCoin.num)) {
                                    _context2.next = 10;
                                    break;
                                }

                                root_1.popNew('app-components1-message-message', { content: this.language.tips[3] });
                                return _context2.abrupt("return");

                            case 10:
                                if (!(this.props.message.length > 20)) {
                                    _context2.next = 13;
                                    break;
                                }

                                root_1.popNew('app-components1-message-message', { content: this.language.tips[4] });
                                return _context2.abrupt("return");

                            case 13:
                                if (this.props.message === '') {
                                    this.props.message = this.language.messTitle[1];
                                }

                                if (this.props.realUser) {
                                    _context2.next = 17;
                                    break;
                                }

                                root_1.popNew('app-components1-message-message', { content: this.language.tips[5] });
                                return _context2.abrupt("return");

                            case 17:
                                if (!(this.props.selected === 0)) {
                                    _context2.next = 21;
                                    break;
                                }

                                if (!(Number(this.props.totalAmount) < this.props.totalNum)) {
                                    _context2.next = 21;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { content: this.language.tips[7] });
                                return _context2.abrupt("return");

                            case 21:
                                this.inputBlur();
                                // tslint:disable-next-line:max-line-length
                                mess1 = "" + this.language.phrase[0] + this.props.totalAmount + curCoin.name + " / " + this.props.totalNum + " " + this.language.phrase[1];
                                // tslint:disable-next-line:max-line-length

                                mess2 = this.language.phrase[2] + (this.props.showPin ? this.language.redEnvType[1] : this.language.redEnvType[0]);

                                root_1.popNew('app-components1-modalBoxInput-modalBoxInput', {
                                    title: curCoin.name + this.language.phrase[3],
                                    content: [mess1, mess2],
                                    placeholder: this.language.phrase[4],
                                    itype: 'password'
                                }, function (r) {
                                    return __awaiter(_this3, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                        var close, secretHash;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        close = root_1.popNew('app-components1-loading-loading', { text: this.language.loading });
                                                        _context.next = 3;
                                                        return walletTools_1.VerifyIdentidy(r);

                                                    case 3:
                                                        secretHash = _context.sent;

                                                        close.callback(close.widget);
                                                        if (secretHash) {
                                                            this.sendRedEnv(secretHash);
                                                        } else {
                                                            root_1.popNew('app-components1-message-message', { content: this.language.tips[6] });
                                                        }

                                                    case 6:
                                                    case "end":
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, this);
                                    }));
                                });

                            case 25:
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
        value: function sendRedEnv(secretHash) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _this4 = this;

                var curCoin, lm, rtype, ctype, totalAmount, totalNum, rid;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                curCoin = this.props.list[this.props.selected];
                                lm = this.props.message; // 留言

                                rtype = this.props.showPin ? interface_1.LuckyMoneyType.Random : interface_1.LuckyMoneyType.Normal; // 0 等额红包  1 拼手气红包

                                ctype = Number(interface_1.CloudCurrencyType[curCoin.name]); // 货币类型

                                totalAmount = Number(this.props.totalAmount); // 红包总金额

                                totalNum = this.props.totalNum; // 红包总个数

                                _context3.next = 8;
                                return pull_1.sendRedEnvlope(rtype, ctype, totalAmount, totalNum, lm, secretHash);

                            case 8:
                                rid = _context3.sent;

                                // if (!rid) return;
                                setTimeout(function () {
                                    _this4.props.oneAmount = 0;
                                    _this4.props.totalNum = 0;
                                    _this4.props.totalAmount = 0;
                                    _this4.props.message = '';
                                    pull_1.getServerCloudBalance(); // 更新余额
                                    memstore_1.setStore('activity/luckyMoney/sends', undefined); // 更新红包记录
                                    _this4.paint(true);
                                });
                                if (this.props.inFlag === 'chat') {
                                    console.log('发红包成功了');
                                    this.ok({
                                        message: lm,
                                        rid: rid // 红包的ID
                                    });
                                } else {
                                    root_1.popNew('app-view-earn-redEnvelope-sendRedEnv', {
                                        message: lm,
                                        rid: rid,
                                        rtype: rtype,
                                        cname: curCoin.name
                                    });
                                }
                                // if (!this.props.showPin) {
                                //     // tslint:disable-next-line:max-line-length
                                //     console.log('url', `${sharePerUrl}?type=${LuckyMoneyType.Normal}&rid=${rid}&lm=${(<any>window).encodeURIComponent(lm)}`);
                                // } else {
                                //     // tslint:disable-next-line:max-line-length
                                //     console.log('url', `${sharePerUrl}?type=${LuckyMoneyType.Random}&rid=${rid}&lm=${(<any>window).encodeURIComponent(lm)}`);
                                // }

                            case 11:
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
memstore_1.register('cloud/cloudWallets', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateBalance();
    }
});
memstore_1.register('user/info/isRealUser', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.updateRealUser();
    }
});
})