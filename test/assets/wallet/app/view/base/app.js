_$define("app/view/base/app", function (require, exports, module){
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
 * 首页
 */
// ================================ 导入
var forelet_1 = require("../../../pi/widget/forelet");
var widget_1 = require("../../../pi/widget/widget");
var pull_1 = require("../../net/pull");
var interface_1 = require("../../store/interface");
var store_1 = require("../../store/store");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var App = function (_widget_1$Widget) {
    _inherits(App, _widget_1$Widget);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));

        _this.old = {};
        return _this;
    }

    _createClass(App, [{
        key: "create",
        value: function create() {
            _get(App.prototype.__proto__ || Object.getPrototypeOf(App.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            var isActive = 3;
            this.old[isActive] = true;
            var loading = localStorage.getItem('level_3_page_loaded') ? false : true;
            localStorage.removeItem('level_3_page_loaded');
            this.state = {
                type: 2,
                isActive: isActive,
                old: this.old,
                loading: loading,
                tabBarList: [{
                    text: '玩',
                    icon: 'play.png',
                    iconActive: 'play_active.png',
                    components: 'app-view-play-home-home'
                }, {
                    text: '聊',
                    icon: 'chat.png',
                    iconActive: 'chat_active.png',
                    components: 'app-view-chat-home-home'
                }, {
                    text: '赚',
                    icon: 'earn.png',
                    iconActive: 'earn_active.png',
                    components: 'app-view-earn-home-home'
                }, {
                    text: '钱',
                    icon: 'wallet.png',
                    iconActive: 'wallet_active.png',
                    components: 'app-view-wallet-home-home'
                }]
            };
        }
    }, {
        key: "closeLoading",
        value: function closeLoading() {
            this.state.loading = false;
            this.paint();
        }
    }, {
        key: "tabBarChangeListener",
        value: function tabBarChangeListener(event, index) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(this.state.isActive === index)) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 2:
                                this.state.isActive = index;
                                this.old[index] = true;
                                this.paint();

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }]);

    return App;
}(widget_1.Widget);

exports.App = App;
// ===================================================== 本地
// ===================================================== 立即执行
store_1.register('level_2_page_loaded', function (loaded) {
    var dataCenter = pi_modules.commonjs.exports.relativeGet('app/logic/dataCenter').exports.dataCenter;
    dataCenter.init();
});
store_1.register('level_3_page_loaded', function (loaded) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.closeLoading();
    } else {
        // 处理导航页过程中资源已经加载完毕
        localStorage.setItem('level_3_page_loaded', '1');
    }
});
// 用户信息变化
store_1.register('userInfo', function (userInfo) {
    var conRandom = store_1.find('conRandom');
    if (conRandom && !userInfo.fromServer) {
        pull_1.setUserInfo();
    }
});
// 连接建立 登录
store_1.register('conRandom', function (conRandom) {
    if (store_1.find('token')) {
        pull_1.autoLogin();
    }
    // popNew('app-components-modalBoxInput-modalBoxInput',{ itype:'password',title:'请登录',content:[] },(r) => {
    //     login(r);
    // });
});
// 登录状态成功
store_1.register('loginState', function (loginState) {
    if (loginState === interface_1.LoginState.logined) {
        var userInfo = store_1.find('userInfo');
        if (!userInfo.fromServer) {
            pull_1.setUserInfo();
        }
        if (!store_1.find('token')) {
            pull_1.applyAutoLogin();
        }
    }
});
})