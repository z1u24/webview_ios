_$define("app/view/wallet/financialManagement/holdedFmDetail", function (require, exports, module){
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
 * 购买的理财详情
 */
var widget_1 = require("../../../../pi/widget/widget");
var tools_1 = require("../../../utils/tools");
var pull_1 = require("../../../net/pull");
var walletTools_1 = require("../../../utils/walletTools");
var store_1 = require("../../../store/store");

var holdedFmDetail = function (_widget_1$Widget) {
    _inherits(holdedFmDetail, _widget_1$Widget);

    function holdedFmDetail() {
        _classCallCheck(this, holdedFmDetail);

        return _possibleConstructorReturn(this, (holdedFmDetail.__proto__ || Object.getPrototypeOf(holdedFmDetail)).apply(this, arguments));
    }

    _createClass(holdedFmDetail, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(holdedFmDetail.prototype.__proto__ || Object.getPrototypeOf(holdedFmDetail.prototype), "setProps", this).call(this, props, oldProps);
            console.log(this.props.product);
            var stateShow = props.product.state === 1 ? '收益中' : '已赎回';
            var stateBg = props.product.state === 1 ? '' : 'bg1';
            var btnText = props.product.state === 1 ? '赎回' : '已赎回';
            var btnBgColor = props.product.state === 1 ? 'blue' : 'white';
            this.state = {
                stateShow: stateShow,
                stateBg: stateBg,
                btnText: btnText,
                btnBgColor: btnBgColor
            };
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "redemptionClick",
        value: function redemptionClick() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var psw, close, verify, result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(this.props.product.state !== 1)) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 2:
                                _context.next = 4;
                                return tools_1.popPswBox();

                            case 4:
                                psw = _context.sent;

                                if (psw) {
                                    _context.next = 7;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 7:
                                close = tools_1.popNewLoading('赎回中...');
                                _context.next = 10;
                                return walletTools_1.VerifyIdentidy(store_1.find('curWallet'), psw);

                            case 10:
                                verify = _context.sent;

                                if (verify) {
                                    _context.next = 15;
                                    break;
                                }

                                tools_1.popNewMessage('密码错误');
                                close.callback(close.widget);
                                return _context.abrupt("return");

                            case 15:
                                _context.next = 17;
                                return pull_1.buyBack(this.props.product.purchaseTimeStamp);

                            case 17:
                                result = _context.sent;

                                close.callback(close.widget);
                                if (result) {
                                    tools_1.popNewMessage('赎回成功');
                                    pull_1.getPurchaseRecord();
                                } else {
                                    tools_1.popNewMessage('赎回失败');
                                }

                            case 20:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }]);

    return holdedFmDetail;
}(widget_1.Widget);

exports.holdedFmDetail = holdedFmDetail;
})