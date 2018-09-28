_$define("app/view/earn/mining/dividend", function (require, exports, module){
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
var store_1 = require("../../../store/store");
var tools_1 = require("../../../utils/tools");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var Dividend = function (_widget_1$Widget) {
    _inherits(Dividend, _widget_1$Widget);

    function Dividend() {
        _classCallCheck(this, Dividend);

        return _possibleConstructorReturn(this, (Dividend.__proto__ || Object.getPrototypeOf(Dividend)).call(this));
    }

    _createClass(Dividend, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(Dividend.prototype.__proto__ || Object.getPrototypeOf(Dividend.prototype), "setProps", this).call(this, props, oldProps);
            this.state = {
                totalDivid: 0,
                totalDays: 0,
                thisDivid: 0,
                yearIncome: 0,
                doMining: false,
                firstClick: true,
                isAbleBtn: false,
                miningNum: " <div class=\"miningNum\" style=\"animation:{{it1.doMining?'move 1s':''}}\">\n                <span>+{{it1.thisNum}}</span>\n            </div>",
                scroll: false,
                dividHistory: [// 分红历史记录
                    // { num:0.02,time:'04-30  14:32:00' },
                    // { num:0.02,time:'04-30  14:32:00' },
                    // { num:0.02,time:'04-30  14:32:00' }
                ],
                ktBalance: this.props.ktBalance,
                cfgData: tools_1.getLanguage(this)
            };
            this.initData();
            this.initEvent();
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
        /**
         * 查看分红说明
         */

    }, {
        key: "goDetail",
        value: function goDetail() {
            root_1.popNew('app-view-earn-mining-dividendDetail');
        }
        /**
         * 获取更新数据
         */

    }, {
        key: "initData",
        value: function initData() {
            var data = store_1.find('dividTotal');
            if (data) {
                this.state.totalDivid = data.totalDivid;
                this.state.totalDays = data.totalDays;
                this.state.thisDivid = data.thisDivid;
                this.state.yearIncome = Number(data.yearIncome) === 0 ? this.state.cfgData.noneYearIncome : data.yearIncome;
            }
            var history = store_1.find('dividHistory');
            if (history) {
                this.state.dividHistory = history;
            }
            this.paint();
        }
        /**
         * 页面滑动
         */

    }, {
        key: "pageScroll",
        value: function pageScroll() {
            if (document.getElementById('content').scrollTop > 0) {
                this.state.scroll = true;
                if (this.state.scroll) {
                    this.paint();
                }
            } else {
                this.state.scroll = false;
                this.paint();
            }
        }
        /**
         * 点击领分红
         */

    }, {
        key: "doMining",
        value: function doMining() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this2 = this;

                var child;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (this.state.thisDivid > 0 && this.state.firstClick) {
                                    // 如果本次可挖大于0并且是首次点击，则需要真正的领分红操作并刷新数据
                                    // await getAward();  // 领分红
                                    this.state.firstClick = false;
                                    setTimeout(function () {
                                        pull_1.getMining();
                                        _this2.initEvent();
                                        _this2.paint();
                                    }, 500);
                                } else {
                                    // 添加一个新的数字动画效果并移除旧的
                                    child = document.createElement('div');

                                    child.setAttribute('class', 'dividendNum');
                                    child.setAttribute('style', 'animation:dividendMove 0.5s');
                                    // tslint:disable-next-line:no-inner-html
                                    child.innerHTML = '<span>+0</span>';
                                    document.getElementsByClassName('dividendNum').item(0).remove();
                                    document.getElementById('dividendBtn').appendChild(child);
                                }
                                this.state.doMining = true;
                                this.state.isAbleBtn = true;
                                this.paint();
                                setTimeout(function () {
                                    _this2.state.isAbleBtn = false;
                                    _this2.paint();
                                }, 100);

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * 初始化事件
         */

    }, {
        key: "initEvent",
        value: function initEvent() {
            // 这里发起通信
            pull_1.getDividend();
            pull_1.getDividHistory();
        }
    }]);

    return Dividend;
}(widget_1.Widget);

exports.Dividend = Dividend;
// ===================================================== 本地
// ===================================================== 立即执行
store_1.register('dividTotal', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
store_1.register('dividHistory', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
})