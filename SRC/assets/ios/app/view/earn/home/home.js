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
var lang_1 = require("../../../../pi/util/lang");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var pull_1 = require("../../../net/pull");
var interface_1 = require("../../../store/interface");
var memstore_1 = require("../../../store/memstore");
var tools_1 = require("../../../utils/tools");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var PlayHome = function (_widget_1$Widget) {
    _inherits(PlayHome, _widget_1$Widget);

    function PlayHome() {
        _classCallCheck(this, PlayHome);

        return _possibleConstructorReturn(this, (PlayHome.__proto__ || Object.getPrototypeOf(PlayHome)).apply(this, arguments));
    }

    _createClass(PlayHome, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(PlayHome.prototype.__proto__ || Object.getPrototypeOf(PlayHome.prototype), "setProps", this).call(this, props, oldProps);
            this.init();
            this.initEvent();
        }
        /**
         * 初始化数据
         */

    }, {
        key: "init",
        value: function init() {
            var _this2 = this;

            this.language = this.config.value[lang_1.getLang()];
            this.props = Object.assign({}, this.props, { ktBalance: 0.00, ethBalance: 0.00, holdMines: 0, mines: 0, hasWallet: false, mineLast: 0, rankNum: 1, page: ['app-view-earn-mining-rankList', 'app-view-earn-mining-dividend', 'app-view-earn-redEnvelope-writeRedEnv', 'app-view-earn-exchange-exchange', 'app-view-earn-mining-addMine' // 任务
                ], doMining: false, firstClick: true, isAbleBtn: false, miningNum: " <div class=\"miningNum\" style=\"animation:{{it1.doMining?'move 0.5s':''}}\">\n                <span>+{{it1.thisNum}}</span>\n            </div>", scroll: false, scrollHeight: 0, refresh: false, avatar: 'res/image1/default_avatar.png' });
            setTimeout(function () {
                _this2.scrollPage();
            });
            this.initData();
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
            if (!tools_1.hasWallet()) return;
            root_1.popNew(this.props.page[ind], { ktBalance: this.props.ktBalance });
        }
        /**
         * 挖矿说明
         */

    }, {
        key: "miningDesc",
        value: function miningDesc() {
            // tslint:disable-next-line:max-line-length
            root_1.popNew('app-components-allModalBox-modalBox1', this.language.miningDesc);
        }
        /**
         * 点击挖矿按钮
         */

    }, {
        key: "doPadding",
        value: function doPadding() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this3 = this;

                var child;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (tools_1.hasWallet()) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 2:
                                if (!(this.props.mines > 0 && this.props.firstClick)) {
                                    _context.next = 9;
                                    break;
                                }

                                _context.next = 5;
                                return pull_1.getAward();

                            case 5:
                                this.props.firstClick = false;
                                setTimeout(function () {
                                    _this3.initEvent();
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
                                this.props.doMining = true;
                                this.props.isAbleBtn = true;
                                this.paint();
                                setTimeout(function () {
                                    _this3.props.isAbleBtn = false;
                                    _this3.paint();
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
         * 屏幕滑动
         */

    }, {
        key: "scrollPage",
        value: function scrollPage() {
            var scrollTop = document.getElementById('earn-home').scrollTop;
            this.props.scrollHeight = scrollTop;
            if (scrollTop > 0) {
                this.props.scroll = true;
                if (this.props.scroll) {
                    this.paint();
                }
            } else {
                this.props.scroll = false;
                this.paint();
            }
        }
        /**
         * 刷新页面
         */

    }, {
        key: "refreshPage",
        value: function refreshPage() {
            var _this4 = this;

            this.props.refresh = true;
            this.paint();
            this.initEvent();
            setTimeout(function () {
                _this4.props.refresh = false;
                _this4.paint();
            }, 1000);
        }
        /**
         * 进入活动详情
         */

    }, {
        key: "doActivity",
        value: function doActivity(ind) {
            if (!tools_1.hasWallet()) return;
            switch (ind) {
                case 0:
                    root_1.popNew('app-view-earn-ticketCenter-ticketCenter');
                    // popNew('app-view-earn-activity-verifyPhone');
                    break;
                case 1:
                    root_1.popNew('app-view-earn-activity-inviteFriend');
                    break;
                default:
            }
        }
    }, {
        key: "openDemo",
        value: function openDemo() {
            root_1.popNew('app-view-demo-client-demo');
        }
        /**
         * 获取更新数据
         */

    }, {
        key: "initData",
        value: function initData() {
            var wallet = memstore_1.getStore('wallet');
            if (!wallet) {
                this.paint();
                return;
            }
            this.props.hasWallet = true;
            var cloudBalances = memstore_1.getCloudBalances();
            if (cloudBalances) {
                this.props.ktBalance = tools_1.formatBalance(cloudBalances.get(interface_1.CloudCurrencyType.KT));
                this.props.ethBalance = tools_1.formatBalance(cloudBalances.get(interface_1.CloudCurrencyType.ETH));
            }
            var mining = memstore_1.getStore('activity/mining');
            if (mining.total) {
                if (mining.total.thisNum > 0) {
                    this.props.isAbleBtn = true;
                }
                this.props.mines = tools_1.formatBalance(mining.total.thisNum);
                this.props.mineLast = tools_1.formatBalance(mining.total.totalNum - mining.total.holdNum);
                this.props.holdMines = tools_1.formatBalance(mining.total.holdNum);
            } else {
                this.props.isAbleBtn = false;
            }
            if (mining.total && mining.miningRank) {
                this.props.rankNum = mining.miningRank.myRank;
            }
            var userInfo = tools_1.getUserInfo();
            if (userInfo) {
                this.props.avatar = userInfo.avatar ? userInfo.avatar : 'app/res/image1/default_avatar.png';
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
            if (this.props.isActive && this.props.hasWallet) {
                pull_1.getServerCloudBalance();
                pull_1.getMining();
                pull_1.getMiningRank(100);
                // // tslint:disable-next-line:no-debugger
                // debugger;
            }
        }
    }]);

    return PlayHome;
}(widget_1.Widget);

exports.PlayHome = PlayHome;
// ===================================================== 本地
// ===================================================== 立即执行
memstore_1.register('cloud/cloudWallets', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
memstore_1.register('user', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.init();
    }
});
memstore_1.register('user/info', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
memstore_1.register('activity/mining/addMine', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initEvent();
    }
});
memstore_1.register('activity/mining/total', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
memstore_1.register('activity/mining/miningRank', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
memstore_1.register('activity', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.init(); // 注销钱包后初始化
    }
});
memstore_1.register('setting/language', function (r) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.language = w.config.value[r];
        w.paint();
    }
});
memstore_1.register('user/conRandom', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
        w.initEvent();
    }
});
})