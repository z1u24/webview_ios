_$define("earn/client/app/view/guess/home", function (require, exports, module){
"use strict";
/**
 * 竞猜主页
 */

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
var JSAPI_1 = require("../../../../../app/api/JSAPI");
var pay_1 = require("../../../../../app/utils/pay");
var root_1 = require("../../../../../pi/ui/root");
var widget_1 = require("../../../../../pi/widget/widget");

var GuessHome = function (_widget_1$Widget) {
    _inherits(GuessHome, _widget_1$Widget);

    function GuessHome() {
        _classCallCheck(this, GuessHome);

        var _this = _possibleConstructorReturn(this, (GuessHome.__proto__ || Object.getPrototypeOf(GuessHome)).apply(this, arguments));

        _this.props = {
            selectTopbar: {},
            topbarList: [{
                name: 'filter',
                title: { zh_Hans: '筛选', zh_Hant: '篩選', en: '' },
                component: 'earn-client-app-view-guess-allGuess-filterGuess'
            }, {
                name: 'all',
                title: { zh_Hans: '全部', zh_Hant: '全部', en: '' },
                component: 'earn-client-app-view-guess-allGuess-allGuess'
            }, {
                name: 'self',
                title: { zh_Hans: '我的', zh_Hant: '我的', en: '' },
                component: 'earn-client-app-view-guess-selfGuess-selfGuess'
            }],
            showMoreSetting: false,
            noPassword: false
        };
        return _this;
    }

    _createClass(GuessHome, [{
        key: "create",
        value: function create() {
            _get(GuessHome.prototype.__proto__ || Object.getPrototypeOf(GuessHome.prototype), "create", this).call(this);
            this.props.selectTopbar = this.props.topbarList[1];
            // queryNoPWD('101', (res, msg) => {
            //     if (!res) {
            //         this.props.noPassword = true;
            //     } else {
            //         this.props.noPassword = false;
            //     }
            //     this.paint();
            // });
            // inviteUsersToGroup();
        }
        /**
         * 更多设置
         */

    }, {
        key: "goSetting",
        value: function goSetting() {
            var _this2 = this;

            JSAPI_1.queryNoPWD('101', function (res, msg) {
                if (!res) {
                    _this2.props.noPassword = true;
                } else {
                    _this2.props.noPassword = false;
                }
                _this2.props.showMoreSetting = !_this2.props.showMoreSetting;
                _this2.paint();
            });
        }
        /**
         * 关闭设置
         */

    }, {
        key: "closeSetting",
        value: function closeSetting() {
            this.props.showMoreSetting = false;
            this.paint();
        }
        /**
         * 修改topbar
         */

    }, {
        key: "changeTopbar",
        value: function changeTopbar(index) {
            this.props.selectTopbar = this.props.topbarList[index];
            this.paint();
        }
        /**
         * 设置免密支付
         */

    }, {
        key: "setting",
        value: function setting() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this3 = this;

                var state;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                state = 0;

                                if (this.props.noPassword === false) {
                                    state = 1;
                                }
                                pay_1.walletSetNoPSW('101', '15', state, function (res, msg) {
                                    console.log(res, msg);
                                    if (!res) {
                                        _this3.props.noPassword = !_this3.props.noPassword;
                                        root_1.popNew('app-components1-message-message', { content: _this3.config.value.tips[0] });
                                        _this3.paint();
                                    } else {
                                        root_1.popNew('app-components1-message-message', { content: _this3.config.value.tips[1] });
                                    }
                                });
                                this.closeSetting();

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * 返回
         */

    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }]);

    return GuessHome;
}(widget_1.Widget);

exports.GuessHome = GuessHome;
})