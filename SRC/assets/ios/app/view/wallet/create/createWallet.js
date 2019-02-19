_$define("app/view/wallet/create/createWallet", function (require, exports, module){
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
 * create wallet
 */
var root_1 = require("../../../../pi/ui/root");
var lang_1 = require("../../../../pi/util/lang");
var widget_1 = require("../../../../pi/widget/widget");
var localWallet_1 = require("../../../logic/localWallet");
var native_1 = require("../../../logic/native");
var pull_1 = require("../../../net/pull");
var account_1 = require("../../../utils/account");
var tools_1 = require("../../../utils/tools");
var walletTools_1 = require("../../../utils/walletTools");
var home_1 = require("./home");

var CreateWallet = function (_widget_1$Widget) {
    _inherits(CreateWallet, _widget_1$Widget);

    function CreateWallet() {
        _classCallCheck(this, CreateWallet);

        return _possibleConstructorReturn(this, (CreateWallet.__proto__ || Object.getPrototypeOf(CreateWallet)).apply(this, arguments));
    }

    _createClass(CreateWallet, [{
        key: "init",
        value: function init() {
            this.language = this.config.value[lang_1.getLang()];
            this.props = Object.assign({}, this.props, { itype: this.props.itype, walletName: '', walletPsw: '', walletPswConfirm: '', pswEqualed: false, userProtocolReaded: false, walletPswAvailable: false, chooseImage: false, avatarHtml: '', imagePicker: null });
            console.log(this.props);
        }
    }, {
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(CreateWallet.prototype.__proto__ || Object.getPrototypeOf(CreateWallet.prototype), "setProps", this).call(this, props, oldProps);
            this.init();
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.cancel && this.cancel();
        }
    }, {
        key: "walletNameChange",
        value: function walletNameChange(e) {
            this.props.walletName = e.value;
            this.paint();
        }
    }, {
        key: "checkBoxClick",
        value: function checkBoxClick(e) {
            this.props.userProtocolReaded = e.newType === 'true' ? true : false;
            this.paint();
        }
    }, {
        key: "pswConfirmChange",
        value: function pswConfirmChange(r) {
            this.props.walletPswConfirm = r.value;
            this.props.pswEqualed = account_1.pswEqualed(this.props.walletPsw, this.props.walletPswConfirm);
            this.paint();
        }
        // 密码格式正确通知

    }, {
        key: "pswChange",
        value: function pswChange(res) {
            this.props.walletPswAvailable = res.success;
            this.props.walletPsw = res.password;
            this.props.pswEqualed = account_1.pswEqualed(this.props.walletPsw, this.props.walletPswConfirm);
            this.paint();
        }
        // 清除密码

    }, {
        key: "pwsClear",
        value: function pwsClear() {
            this.props.walletPsw = '';
            this.paint();
        }
    }, {
        key: "selectImageClick",
        value: function selectImageClick() {
            var _this2 = this;

            this.props.imagePicker = native_1.selectImage(function (width, height, url) {
                console.log('selectImage url = ', url);
                // tslint:disable-next-line:max-line-length
                _this2.props.avatarHtml = "<div style=\"background-image: url(" + url + ");width: 100%;height: 100%;position: absolute;top: 0;background-size: cover;background-position: center;background-repeat: no-repeat;border-radius:50%\"></div>";
                _this2.props.chooseImage = true;
                _this2.paint();
            });
        }
    }, {
        key: "randomPlayName",
        value: function randomPlayName() {
            this.props.walletName = walletTools_1.playerName();
            document.getElementById('random').classList.add('random');
            setTimeout(function () {
                document.getElementById('random').classList.remove('random');
            }, 1000);
            this.paint();
        }
    }, {
        key: "createClick",
        value: function createClick() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var option, secrectHash, mnemonic, fragments, w;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (this.props.userProtocolReaded) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 2:
                                if (account_1.walletNameAvailable(this.props.walletName)) {
                                    _context.next = 5;
                                    break;
                                }

                                root_1.popNew('app-components1-message-message', { content: this.language.tips[0] });
                                return _context.abrupt("return");

                            case 5:
                                if (!(!this.props.walletPsw || !this.props.walletPswConfirm)) {
                                    _context.next = 8;
                                    break;
                                }

                                root_1.popNew('app-components1-message-message', { content: this.language.tips[1] });
                                return _context.abrupt("return");

                            case 8:
                                if (this.props.walletPswAvailable) {
                                    _context.next = 11;
                                    break;
                                }

                                root_1.popNew('app-components1-message-message', { content: this.language.tips[2] });
                                return _context.abrupt("return");

                            case 11:
                                if (this.props.pswEqualed) {
                                    _context.next = 14;
                                    break;
                                }

                                root_1.popNew('app-components1-message-message', { content: this.language.tips[3] });
                                return _context.abrupt("return");

                            case 14:
                                option = {
                                    psw: this.props.walletPsw,
                                    nickName: this.props.walletName
                                };

                                if (this.props.itype === localWallet_1.CreateWalletType.StrandarImport) {
                                    option.mnemonic = this.props.mnemonic;
                                } else if (this.props.itype === localWallet_1.CreateWalletType.FragmentImport) {
                                    option.fragment1 = this.props.fragment1;
                                    option.fragment2 = this.props.fragment2;
                                }
                                if (option.nickName === 'kuplay' && option.psw === '12345678') {
                                    this.props.itype = localWallet_1.CreateWalletType.StrandarImport;
                                    option.mnemonic = 'coast medal disease change switch destroy moment leisure nominee pitch social fresh';
                                }
                                console.time('pi_create createWallet all need');
                                _context.next = 20;
                                return localWallet_1.createWallet(this.props.itype, option);

                            case 20:
                                secrectHash = _context.sent;

                                console.timeEnd('pi_create createWallet all need');
                                if (!secrectHash) {
                                    tools_1.popNewMessage(this.language.tips[3]);
                                }
                                mnemonic = walletTools_1.getMnemonicByHash(secrectHash);
                                fragments = walletTools_1.fetchMnemonicFragment(secrectHash);
                                // requestAnimationFrame(() => {
                                //     popNew('app-components1-modalBox-modalBox', getStaticLanguage().createSuccess, () => {
                                //         popNew('app-view-wallet-backup-index', { mnemonic: mnemonic, fragments: fragments,pi_norouter:true });
                                //     });
                                // });

                                pull_1.openConnect(secrectHash);
                                if (this.props.chooseImage) {
                                    this.props.imagePicker.getContent({
                                        success: function success(buffer) {
                                            tools_1.imgResize(buffer, function (res) {
                                                pull_1.uploadFile(res.base64);
                                            });
                                        }
                                    });
                                }
                                w = home_1.forelet.getWidget(home_1.WIDGET_NAME);

                                if (w) {
                                    w.ok && w.ok();
                                }
                                this.ok && this.ok();

                            case 30:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * 查看隐私条约
         */

    }, {
        key: "agreementClick",
        value: function agreementClick() {
            root_1.popNew('app-view-mine-other-privacypolicy');
        }
    }]);

    return CreateWallet;
}(widget_1.Widget);

exports.CreateWallet = CreateWallet;
})