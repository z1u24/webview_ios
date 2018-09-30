_$define("app/view/mine/setting/setting", function (require, exports, module){
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
 * setting
 */
// =============================================导入
var root_1 = require("../../../../pi/ui/root");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var pull_1 = require("../../../net/pull");
var store_1 = require("../../../store/store");
var tools_1 = require("../../../utils/tools");
var walletTools_1 = require("../../../utils/walletTools");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var Setting = function (_widget_1$Widget) {
    _inherits(Setting, _widget_1$Widget);

    function Setting() {
        _classCallCheck(this, Setting);

        return _possibleConstructorReturn(this, (Setting.__proto__ || Object.getPrototypeOf(Setting)).call(this));
    }

    _createClass(Setting, [{
        key: "create",
        value: function create() {
            _get(Setting.prototype.__proto__ || Object.getPrototypeOf(Setting.prototype), "create", this).call(this);
            var cfg = tools_1.getLanguage(this);
            this.state = {
                lockScreenPsw: '',
                openLockScreen: false,
                lockScreenTitle: '',
                numberOfErrors: 0,
                errorTips: cfg.errorTips,
                itemList: [{ title: cfg.itemTitle[3], list: cfg.languageSet, selected: 0 }, { title: cfg.itemTitle[4], list: ['CNY', 'USD'], selected: 0 }, { title: cfg.itemTitle[5], list: cfg.changeColor, selected: 0 }],
                userHead: '../../../res/image/default_avater_big.png',
                userName: cfg.defaultName,
                userInput: false,
                wallet: null,
                cfgData: cfg
            };
            this.initData();
        }
    }, {
        key: "initData",
        value: function initData() {
            var userInfo = store_1.find('userInfo');
            if (userInfo) {
                this.state.userHead = userInfo.avatar ? userInfo.avatar : '../../../res/image/default_avater_big.png';
                this.state.userName = userInfo.nickName ? userInfo.nickName : this.state.cfgData.defaultName;
            }
            var wallet = store_1.find('curWallet');
            if (wallet) {
                this.state.wallet = wallet;
            }
            var ls = store_1.find('lockScreen');
            if (ls) {
                this.state.lockScreenPsw = ls.psw;
                this.state.openLockScreen = ls.psw && ls.open !== false;
            }
            this.paint();
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
        /**
         * 判断当前用户是否已经创建钱包
         */

    }, {
        key: "judgeWallet",
        value: function judgeWallet() {
            if (this.state.wallet) {
                return true;
            }
            root_1.popNew('app-components-modalBox-modalBox', this.state.cfgData.modalBox1, function () {
                root_1.popNew('app-view-wallet-create-home');
            });
            return false;
        }
        /**
         * 处理锁屏开关切换
         */

    }, {
        key: "onSwitchChange",
        value: function onSwitchChange() {
            var _this2 = this;

            if (this.state.openLockScreen) {
                // 如果锁屏开关打开则直接关闭
                var ls = store_1.find('lockScreen');
                ls.open = !this.state.openLockScreen;
                store_1.updateStore('lockScreen', ls);
            } else if (this.state.wallet) {
                root_1.popNew('app-components-keyboard-keyboard', { title: this.state.cfgData.keyboardTitle[0] }, function (r) {
                    console.error(r);
                    _this2.state.lockScreenPsw = r;
                    _this2.reSetLockPsw();
                }, function () {
                    _this2.closeLockPsw();
                    return false;
                });
            } else {
                // tslint:disable-next-line:max-line-length
                root_1.popNew('app-components-modalBox-modalBox', this.state.cfgData.modalBox1, function () {
                    root_1.popNew('app-view-wallet-create-home');
                }, function () {
                    _this2.closeLockPsw();
                });
            }
            this.state.openLockScreen = !this.state.openLockScreen;
            this.paint();
        }
        /**
         * 关闭锁屏开关
         */

    }, {
        key: "closeLockPsw",
        value: function closeLockPsw() {
            this.state.openLockScreen = false;
            this.state.lockScreenPsw = '';
            this.paint();
        }
        /**
         * 重复锁屏密码
         */

    }, {
        key: "reSetLockPsw",
        value: function reSetLockPsw() {
            var _this3 = this;

            root_1.popNew('app-components-keyboard-keyboard', { title: this.state.cfgData.keyboardTitle[1] }, function (r) {
                if (_this3.state.lockScreenPsw !== r) {
                    root_1.popNew('app-components-message-message', { content: _this3.state.cfgData.tips[0] });
                    _this3.reSetLockPsw();
                } else {
                    var hash256 = tools_1.lockScreenHash(r);
                    var ls = store_1.find('lockScreen');
                    ls.psw = hash256;
                    ls.open = true;
                    store_1.updateStore('lockScreen', ls);
                    root_1.popNew('app-components-message-message', { content: _this3.state.cfgData.tips[1] });
                }
            }, function () {
                _this3.closeLockPsw();
            });
        }
        /**
         * 输入原锁屏密码
         */

    }, {
        key: "oldLockPsw",
        value: function oldLockPsw(ind) {
            var _this4 = this;

            if (ind > 2) {
                // tslint:disable-next-line:max-line-length
                root_1.popNew('app-components-modalBoxInput-modalBoxInput', this.state.cfgData.modalBoxInput, function (r) {
                    var wallet = store_1.find('curWallet');
                    var fg = walletTools_1.VerifyIdentidy(wallet, r);
                    // const fg = true;
                    if (fg) {
                        root_1.popNew('app-components-keyboard-keyboard', { title: _this4.state.cfgData.keyboardTitle[0] }, function (r) {
                            _this4.state.lockScreenPsw = r;
                            _this4.reSetLockPsw();
                        }, function () {
                            _this4.closeLockPsw();
                            return false;
                        });
                    }
                });
            } else {
                root_1.popNew('app-components-keyboard-keyboard', { title: this.state.errorTips[ind] }, function (r) {
                    if (tools_1.lockScreenVerify(r)) {
                        root_1.popNew('app-components-keyboard-keyboard', { title: _this4.state.cfgData.keyboardTitle[0] }, function (r) {
                            _this4.state.lockScreenPsw = r;
                            _this4.reSetLockPsw();
                        }, function () {
                            _this4.closeLockPsw();
                            return false;
                        });
                    } else {
                        _this4.oldLockPsw(++ind);
                    }
                });
            }
        }
        /**
         * 点击切换基础属性
         */

    }, {
        key: "itemClick",
        value: function itemClick(ind) {
            var _this5 = this;

            if (!this.judgeWallet()) {
                return;
            }
            if (ind === 0) {
                root_1.popNew('app-view-mine-setting-phone');
            } else if (ind === 1) {
                root_1.popNew('app-view-mine-setting-changePsw');
            } else {
                var data = this.state.itemList[ind - 2];
                console.log(data);
                root_1.popNew('app-view-mine-setting-itemList', data, function (index) {
                    _this5.state.itemList[ind - 2].selected = index;
                    // if (ind === 2) {
                    //     updateStore('languageSet',{ selected:index,languageList:this.state.cfgData.languageSet });  // 更新语言设置
                    // }
                    _this5.paint();
                });
            }
        }
        /**
         * 点击可输入用户名
         */

    }, {
        key: "changeInput",
        value: function changeInput() {
            if (!this.judgeWallet()) {
                return;
            }
            this.state.userInput = true;
            this.paint();
        }
        /**
         * 监听用户名修改
         */

    }, {
        key: "userNameChange",
        value: function userNameChange(e) {
            if (e.value !== this.state.userName) {
                this.state.userName = e.value;
            }
        }
        /**
         * 取消聚焦后更新用户名
         */

    }, {
        key: "userNameConfirm",
        value: function userNameConfirm() {
            var userInfo = store_1.find('userInfo');
            if (userInfo.nickName !== this.state.userName) {
                userInfo.nickName = this.state.userName;
                store_1.updateStore('userInfo', userInfo);
                pull_1.setUserInfo();
            }
        }
        /**
         * 备份
         */

    }, {
        key: "backUp",
        value: function backUp() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var psw, ret;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return tools_1.popPswBox();

                            case 2:
                                psw = _context.sent;

                                if (psw) {
                                    _context.next = 5;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 5:
                                _context.next = 7;
                                return walletTools_1.backupMnemonic(psw);

                            case 7:
                                ret = _context.sent;

                                if (ret) {
                                    root_1.popNew('app-view-wallet-backup-index', Object.assign({}, ret));
                                    this.ok && this.ok();
                                }

                            case 9:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * 注销账户
         */

    }, {
        key: "logOut",
        value: function logOut() {
            var _this6 = this;

            if (!this.judgeWallet()) {
                return;
            }
            root_1.popNew('app-components-modalBox-modalBox', this.state.cfgData.modalBox2, function () {
                _this6.backUp();
                console.log('备份');
            }, function () {
                root_1.popNew('app-components-modalBox-modalBox', { title: '', content: _this6.state.cfgData.tips[2], style: 'color:#F7931A;' }, function () {
                    tools_1.logoutAccount();
                    _this6.backPrePage();
                    console.log('注销账户');
                });
            });
        }
    }]);

    return Setting;
}(widget_1.Widget);

exports.Setting = Setting;
// ================================================本地，立即执行
store_1.register('languageSet', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
store_1.register('userInfo', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
store_1.register('curWallet', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
store_1.register('lockScreen', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
})