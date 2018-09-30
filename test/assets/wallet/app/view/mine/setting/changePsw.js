_$define("app/view/mine/setting/changePsw", function (require, exports, module){
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
 * changePSW
 */
// =============================================导入
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var globalWallet_1 = require("../../../core/globalWallet");
var store_1 = require("../../../store/store");
var account_1 = require("../../../utils/account");
var tools_1 = require("../../../utils/tools");
// ================================================导出

var ChangePSW = function (_widget_1$Widget) {
    _inherits(ChangePSW, _widget_1$Widget);

    function ChangePSW() {
        _classCallCheck(this, ChangePSW);

        return _possibleConstructorReturn(this, (ChangePSW.__proto__ || Object.getPrototypeOf(ChangePSW)).call(this));
    }

    _createClass(ChangePSW, [{
        key: "create",
        value: function create() {
            _get(ChangePSW.prototype.__proto__ || Object.getPrototypeOf(ChangePSW.prototype), "create", this).call(this);
            this.state = {
                oldPassword: '',
                newPassword: '',
                rePassword: '',
                cfgData: tools_1.getLanguage(this),
                pswEqualed: false,
                pswAvailable: false
            };
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "oldPswChange",
        value: function oldPswChange(e) {
            this.state.oldPassword = e.value;
        }
    }, {
        key: "newPswChange",
        value: function newPswChange(e) {
            this.state.pswAvailable = e.success;
            this.state.newPassword = e.password;
            this.state.pswEqualed = account_1.pswEqualed(this.state.newPassword, this.state.rePassword) && e.success;
            this.paint();
        }
    }, {
        key: "rePswChange",
        value: function rePswChange(e) {
            this.state.rePassword = e.value;
            this.state.pswEqualed = account_1.pswEqualed(this.state.newPassword, this.state.rePassword) && this.state.pswAvailable;
            this.paint();
        }
        /**
         * 点击确认按钮
         */

    }, {
        key: "btnClicked",
        value: function btnClicked() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var oldPassword, newPassword, rePassword, wallet, loading, gwlt;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                oldPassword = this.state.oldPassword;
                                newPassword = this.state.newPassword;
                                rePassword = this.state.rePassword;
                                wallet = store_1.find('curWallet');

                                if (!(!oldPassword || !newPassword || !rePassword)) {
                                    _context.next = 7;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { content: this.state.cfgData.tips[0] });
                                return _context.abrupt("return");

                            case 7:
                                if (this.state.pswAvailable) {
                                    _context.next = 10;
                                    break;
                                }

                                // tslint:disable-next-line:max-line-length
                                root_1.popNew('app-components-message-message', { content: this.state.cfgData.tips[1] });
                                return _context.abrupt("return");

                            case 10:
                                if (this.state.pswEqualed) {
                                    _context.next = 13;
                                    break;
                                }

                                // tslint:disable-next-line:max-line-length
                                root_1.popNew('app-components-message-messagebox', { content: this.state.cfgData.tips[2] });
                                return _context.abrupt("return");

                            case 13:
                                // 验证全部通过，开始设置新密码
                                loading = root_1.popNew('app-components1-loading-loading', { text: this.state.cfgData.loading });
                                gwlt = globalWallet_1.GlobalWallet.fromJSON(wallet.gwlt);
                                _context.next = 17;
                                return gwlt.passwordChange(oldPassword, newPassword);

                            case 17:
                                wallet.gwlt = gwlt.toJSON();
                                loading.callback(loading.widget);
                                this.backPrePage();

                            case 20:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }]);

    return ChangePSW;
}(widget_1.Widget);

exports.ChangePSW = ChangePSW;
})