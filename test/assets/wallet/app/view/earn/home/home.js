_$define("app/view/earn/home/home", function (require, exports, module){
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
var root_1 = require("../../../../pi/ui/root");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var pull_1 = require("../../../net/pull");
var interface_1 = require("../../../store/interface");
var store_1 = require("../../../store/store");
var tools_1 = require("../../../utils/tools");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var PlayHome = function (_widget_1$Widget) {
    _inherits(PlayHome, _widget_1$Widget);

    function PlayHome() {
        _classCallCheck(this, PlayHome);

        return _possibleConstructorReturn(this, (PlayHome.__proto__ || Object.getPrototypeOf(PlayHome)).call(this));
    }

    _createClass(PlayHome, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(PlayHome.prototype.__proto__ || Object.getPrototypeOf(PlayHome.prototype), "setProps", this).call(this, props, oldProps);
            this.init();
            if (this.props.isActive && this.state.hasWallet) {
                this.initEvent();
            }
        }
        /**
         * 初始化数据
         */

    }, {
        key: "init",
        value: function init() {
            this.state = {
                ktBalance: 0.00,
                ethBalance: 0.00,
                mines: 0,
                hasWallet: false,
                mineLast: 0,
                rankNum: 1,
                page: ['app-view-earn-mining-rankList', 'app-view-earn-mining-dividend', 'app-view-earn-redEnvelope-writeRedEnv', 'app-view-earn-exchange-exchange', 'app-view-earn-mining-addMine'],
                doMining: false,
                firstClick: true,
                isAbleBtn: false,
                miningNum: " <div class=\"miningNum\" style=\"animation:{{it1.doMining?'move 0.5s':''}}\">\n                <span>+{{it1.thisNum}}</span>\n            </div>",
                cfgData: tools_1.getLanguage(this)
            };
            this.initDate();
        }
        /**
         * 判断当前用户是否已经创建钱包
         */

    }, {
        key: "judgeWallet",
        value: function judgeWallet() {
            if (this.state.hasWallet) {
                return true;
            }
            root_1.popNew('app-components-modalBox-modalBox', this.state.cfgData.login, function () {
                root_1.popNew('app-view-wallet-create-home');
            });
            return false;
        }
        /**
         * 打开我的设置
         */

    }, {
        key: "showMine",
        value: function showMine() {
            root_1.popNew('app-view-mine-home-home');
        }
        /**
         * 返回上一页
         */

    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
        /**
         * 跳转到下一页
         */

    }, {
        key: "goNextPage",
        value: function goNextPage(ind) {
            if (!this.judgeWallet()) {
                return;
            }
            root_1.popNew(this.state.page[ind], { ktBalance: this.state.ktBalance });
        }
        /**
         * 挖矿说明
         */

    }, {
        key: "miningDesc",
        value: function miningDesc() {
            // tslint:disable-next-line:max-line-length
            root_1.popNew('app-components-modalBox-modalBox1', this.state.cfgData.miningDesc);
        }
        /**
         * 点击挖矿按钮
         */

    }, {
        key: "doPadding",
        value: function doPadding() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this2 = this;

                var child;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (this.judgeWallet()) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 2:
                                if (!(this.state.mines > 0 && this.state.firstClick)) {
                                    _context.next = 9;
                                    break;
                                }

                                _context.next = 5;
                                return pull_1.getAward();

                            case 5:
                                this.state.firstClick = false;
                                setTimeout(function () {
                                    _this2.initEvent();
                                    _this2.paint();
                                }, 300);
                                _context.next = 15;
                                break;

                            case 9:
                                // 添加一个新的数字动画效果并移除旧的
                                child = document.createElement('span');

                                child.setAttribute('class', 'miningNum');
                                child.setAttribute('style', 'animation:miningEnlarge 0.5s');
                                // tslint:disable-next-line:no-inner-html
                                child.innerHTML = '<span>+0</span>';
                                document.getElementsByClassName('miningNum').item(0).remove();
                                document.getElementById('mining').appendChild(child);

                            case 15:
                                this.state.doMining = true;
                                this.state.isAbleBtn = true;
                                this.paint();
                                setTimeout(function () {
                                    _this2.state.isAbleBtn = false;
                                    _this2.paint();
                                }, 100);

                            case 19:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * 获取更新数据
         */

    }, {
        key: "initDate",
        value: function initDate() {
            var wallet = store_1.find('curWallet');
            if (!wallet) {
                this.paint();
                return;
            }
            this.state.hasWallet = true;
            var cloudBalance = store_1.getBorn('cloudBalance');
            if (cloudBalance) {
                this.state.ktBalance = tools_1.formatBalance(cloudBalance.get(interface_1.CurrencyType.KT));
                this.state.ethBalance = tools_1.formatBalance(cloudBalance.get(interface_1.CurrencyType.ETH));
            }
            var mining = store_1.find('miningTotal');
            if (mining) {
                if (mining.thisNum > 0) {
                    this.state.isAbleBtn = true;
                }
                this.state.mines = mining.thisNum;
                this.state.mineLast = mining.totalNum - mining.holdNum;
            } else {
                this.state.isAbleBtn = false;
            }
            var rank = store_1.find('miningRank');
            if (rank) {
                this.state.rankNum = rank.myRank;
            }
            this.paint();
        }
        /**
         * 初始化事件
         */

    }, {
        key: "initEvent",
        value: function initEvent() {
            // 这里发起通信
            pull_1.getCloudBalance();
            pull_1.getMining();
            pull_1.getMiningRank(100);
        }
    }]);

    return PlayHome;
}(widget_1.Widget);

exports.PlayHome = PlayHome;
// ===================================================== 本地
// ===================================================== 立即执行
store_1.register('cloudBalance', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initDate();
    }
});
store_1.register('miningTotal', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initDate();
    }
});
store_1.register('miningRank', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initDate();
    }
});
store_1.register('curWallet', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.init(); // 注销钱包后初始化
    }
});
})