_$define("app/view/earn/exchange/openRedEnv", function (require, exports, module){
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
 * open red-envelope
 */
var root_1 = require("../../../../pi/ui/root");
var lang_1 = require("../../../../pi/util/lang");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var interface_1 = require("../../../store/interface");
var memstore_1 = require("../../../store/memstore");
var pull_1 = require("../../../net/pull");
var unitTools_1 = require("../../../utils/unitTools");
var toolMessages_1 = require("../../../utils/toolMessages");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var OpenRedEnvelope = function (_widget_1$Widget) {
    _inherits(OpenRedEnvelope, _widget_1$Widget);

    function OpenRedEnvelope() {
        _classCallCheck(this, OpenRedEnvelope);

        return _possibleConstructorReturn(this, (OpenRedEnvelope.__proto__ || Object.getPrototypeOf(OpenRedEnvelope)).apply(this, arguments));
    }

    _createClass(OpenRedEnvelope, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(OpenRedEnvelope.prototype.__proto__ || Object.getPrototypeOf(OpenRedEnvelope.prototype), "setProps", this).call(this, props, oldProps);
            this.language = this.config.value[lang_1.getLang()];
            this.props = Object.assign({}, this.props, { tag: '', openClick: false });
            if (props.rtype === interface_1.LuckyMoneyType.Normal) {
                this.props.tag = this.language.tips[0];
            } else if (props.rtype === interface_1.LuckyMoneyType.Random) {
                this.props.tag = this.language.tips[1];
            } else if (props.rtype === interface_1.LuckyMoneyType.Invite) {
                this.props.tag = this.language.tips[2];
            }
        }
        /**
         * 开红包
         */

    }, {
        key: "openRedEnv",
        value: function openRedEnv() {
            var _this2 = this;

            this.props.openClick = true;
            this.paint();
            setTimeout(function () {
                return __awaiter(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (!(this.props.inFlag === 'chat')) {
                                        _context.next = 3;
                                        break;
                                    }

                                    _context.next = 3;
                                    return this.convertClick();

                                case 3:
                                    root_1.popNew('app-view-earn-exchange-exchangeDetail', this.props);
                                    root_1.popNew('app-components1-message-message', { content: this.language.successMess });
                                    this.backPrePage();

                                case 6:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            }, 800);
        }
        /**
         * 点击兑换按钮
         */

    }, {
        key: "convertClick",
        value: function convertClick() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var code, close, res;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                code = this.props.cid.trim();

                                if (!(code.length <= 0)) {
                                    _context2.next = 4;
                                    break;
                                }

                                root_1.popNew('app-components1-message-message', { itype: 'error', content: this.language.errorList[0], center: true });
                                return _context2.abrupt("return");

                            case 4:
                                close = root_1.popNew('app-components1-loading-loading', { text: this.language.loading });
                                _context2.next = 7;
                                return this.convertRedEnvelope(code);

                            case 7:
                                res = _context2.sent;

                                close.callback(close.widget);

                                if (res.value) {
                                    _context2.next = 11;
                                    break;
                                }

                                return _context2.abrupt("return");

                            case 11:
                                memstore_1.setStore('activity/luckyMoney/exchange', undefined);
                                pull_1.getServerCloudBalance();
                                this.props.ctypeShow = interface_1.CloudCurrencyType[res.value[0]];
                                this.props.amount = unitTools_1.smallUnit2LargeUnit(interface_1.CloudCurrencyType[res.value[0]], res.value[1]);
                                this.props.rtype = code.slice(0, 2);
                                this.props.suid = res.src_id;

                            case 17:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
        /**
         * 实际兑换
         */

    }, {
        key: "convertRedEnvelope",
        value: function convertRedEnvelope(code) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var perCode, validCode, value, data;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                perCode = code.slice(0, 2);
                                validCode = code.slice(2);
                                value = [];

                                if (!(perCode === interface_1.LuckyMoneyType.Normal || perCode === interface_1.LuckyMoneyType.Random)) {
                                    _context3.next = 9;
                                    break;
                                }

                                _context3.next = 6;
                                return pull_1.convertRedBag(validCode);

                            case 6:
                                value = _context3.sent;
                                _context3.next = 27;
                                break;

                            case 9:
                                if (!(perCode === interface_1.LuckyMoneyType.Invite)) {
                                    _context3.next = 25;
                                    break;
                                }

                                _context3.next = 12;
                                return pull_1.getData('convertRedEnvelope');

                            case 12:
                                data = _context3.sent;

                                if (!data.value) {
                                    _context3.next = 16;
                                    break;
                                }

                                toolMessages_1.showError(-99);
                                return _context3.abrupt("return");

                            case 16:
                                _context3.next = 18;
                                return pull_1.inputInviteCdKey(validCode);

                            case 18:
                                value = _context3.sent;

                                if (value) {
                                    _context3.next = 21;
                                    break;
                                }

                                return _context3.abrupt("return");

                            case 21:
                                value = [interface_1.CloudCurrencyType.ETH, unitTools_1.eth2Wei(0.015).toString()];
                                pull_1.setData({ key: 'convertRedEnvelope', value: new Date().getTime() });
                                _context3.next = 27;
                                break;

                            case 25:
                                root_1.popNew('app-components1-message-message', { content: this.language.errorList[1] });
                                return _context3.abrupt("return", null);

                            case 27:
                                return _context3.abrupt("return", value);

                            case 28:
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
    }]);

    return OpenRedEnvelope;
}(widget_1.Widget);

exports.OpenRedEnvelope = OpenRedEnvelope;
})