_$define("app/view/mine/account/home", function (require, exports, module){
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
 * account home
 */
var root_1 = require("../../../../pi/ui/root");
var resize_1 = require("../../../../pi/widget/resize/resize");
var widget_1 = require("../../../../pi/widget/widget");
var globalWallet_1 = require("../../../core/globalWallet");
var native_1 = require("../../../logic/native");
var pull_1 = require("../../../net/pull");
var store_1 = require("../../../store/store");
var account_1 = require("../../../utils/account");
var tools_1 = require("../../../utils/tools");
var walletTools_1 = require("../../../utils/walletTools");

var AccountHome = function (_widget_1$Widget) {
    _inherits(AccountHome, _widget_1$Widget);

    function AccountHome() {
        _classCallCheck(this, AccountHome);

        return _possibleConstructorReturn(this, (AccountHome.__proto__ || Object.getPrototypeOf(AccountHome)).apply(this, arguments));
    }

    _createClass(AccountHome, [{
        key: "create",
        value: function create() {
            _get(AccountHome.prototype.__proto__ || Object.getPrototypeOf(AccountHome.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            var userInfo = tools_1.getUserInfo();
            var wallet = store_1.find('curWallet');
            var gwlt = wallet ? JSON.parse(wallet.gwlt) : null;
            var backup = gwlt.mnemonicBackup;
            this.state = {
                avatar: userInfo.avatar,
                nickName: userInfo.nickName,
                isUpdatingWalletName: false,
                backup: backup,
                cfgData: tools_1.getLanguage(this)
            };
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "walletNameInputBlur",
        value: function walletNameInputBlur(e) {
            var v = e.currentTarget.value.trim();
            var input = document.querySelector('#walletNameInput');
            if (!account_1.walletNameAvailable(v)) {
                tools_1.popNewMessage(this.state.cfgData.tips[0]);
                input.value = this.state.nickName;
                this.state.isUpdatingWalletName = false;
                return;
            }
            if (v !== this.state.nickName) {
                this.state.nickName = v;
                var wallet = store_1.find('curWallet');
                var gwlt = globalWallet_1.GlobalWallet.fromJSON(wallet.gwlt);
                gwlt.nickName = v;
                wallet.gwlt = gwlt.toJSON();
                store_1.updateStore('curWallet', wallet);
                var userInfo = store_1.find('userInfo');
                userInfo.nickName = v;
                userInfo.fromServer = false;
                store_1.updateStore('userInfo', userInfo);
            }
            input.value = v;
            this.state.isUpdatingWalletName = false;
        }
        // 修改钱包名称

    }, {
        key: "walletNameInputFocus",
        value: function walletNameInputFocus() {
            this.state.isUpdatingWalletName = true;
        }
    }, {
        key: "pageClick",
        value: function pageClick() {
            if (this.state.isUpdatingWalletName) {
                var walletNameInput = document.querySelector('#walletNameInput');
                walletNameInput.blur();
                return;
            }
        }
    }, {
        key: "backupWalletClick",
        value: function backupWalletClick() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var psw, ret;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.state.isUpdatingWalletName) {
                                    _context.next = 3;
                                    break;
                                }

                                this.pageClick();
                                return _context.abrupt("return");

                            case 3:
                                _context.next = 5;
                                return tools_1.popPswBox();

                            case 5:
                                psw = _context.sent;

                                if (psw) {
                                    _context.next = 8;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 8:
                                _context.next = 10;
                                return walletTools_1.backupMnemonic(psw);

                            case 10:
                                ret = _context.sent;

                                if (ret) {
                                    root_1.popNew('app-view-wallet-backup-index', Object.assign({}, ret));
                                }

                            case 12:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        // 导出私钥

    }, {
        key: "exportPrivateKeyClick",
        value: function exportPrivateKeyClick() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var wallet, psw, close, mnemonic;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!this.state.isUpdatingWalletName) {
                                    _context2.next = 3;
                                    break;
                                }

                                this.pageClick();
                                return _context2.abrupt("return");

                            case 3:
                                wallet = store_1.find('curWallet');
                                _context2.next = 6;
                                return tools_1.popPswBox();

                            case 6:
                                psw = _context2.sent;

                                if (psw) {
                                    _context2.next = 9;
                                    break;
                                }

                                return _context2.abrupt("return");

                            case 9:
                                close = root_1.popNew('app-components1-loading-loading', { text: this.state.cfgData.loading });
                                _context2.prev = 10;
                                _context2.next = 13;
                                return walletTools_1.getMnemonic(wallet, psw);

                            case 13:
                                mnemonic = _context2.sent;

                                if (mnemonic) {
                                    root_1.popNew('app-view-mine-account-exportPrivateKey', { mnemonic: mnemonic });
                                } else {
                                    tools_1.popNewMessage(this.state.cfgData.tips[1]);
                                }
                                _context2.next = 21;
                                break;

                            case 17:
                                _context2.prev = 17;
                                _context2.t0 = _context2["catch"](10);

                                console.log(_context2.t0);
                                tools_1.popNewMessage(this.state.cfgData.tips[1]);

                            case 21:
                                close.callback(close.widget);

                            case 22:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[10, 17]]);
            }));
        }
    }, {
        key: "uploadAvatar",
        value: function uploadAvatar() {
            var _this2 = this;

            native_1.selectImage(function (width, height, base64) {
                resize_1.resize({ url: base64, width: 140, ratio: 0.3, type: 'jpeg' }, function (res) {
                    console.log('resize---------', res);
                    _this2.state.chooseImage = true;
                    // tslint:disable-next-line:max-line-length
                    // this.state.avatarHtml = `<div style="background-image: url(${res.base64});width: 100%;height: 100%;position: absolute;top: 0;background-size: cover;background-position: center;background-repeat: no-repeat;border-radius:50%"></div>`;
                    _this2.state.avatar = res.base64;
                    _this2.paint();
                    pull_1.uploadFile(_this2.state.avatar);
                });
            });
        }
    }]);

    return AccountHome;
}(widget_1.Widget);

exports.AccountHome = AccountHome;
})