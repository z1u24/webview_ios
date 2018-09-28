_$define("app/view/earn/redEnvelope/redEnvHistory", function (require, exports, module){
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
 * RedEnvHistory
 */
var root_1 = require("../../../../pi/ui/root");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var pull_1 = require("../../../net/pull");
var store_1 = require("../../../store/store");
var constants_1 = require("../../../utils/constants");
var tools_1 = require("../../../utils/tools");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var RedEnvHistory = function (_widget_1$Widget) {
    _inherits(RedEnvHistory, _widget_1$Widget);

    function RedEnvHistory() {
        _classCallCheck(this, RedEnvHistory);

        return _possibleConstructorReturn(this, (RedEnvHistory.__proto__ || Object.getPrototypeOf(RedEnvHistory)).apply(this, arguments));
    }

    _createClass(RedEnvHistory, [{
        key: "create",
        value: function create() {
            var _this2 = this;

            var _super = function _super(name) {
                return _get(RedEnvHistory.prototype.__proto__ || Object.getPrototypeOf(RedEnvHistory.prototype), name, _this2);
            };
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var cfg;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _super("create").call(this);
                                cfg = tools_1.getLanguage(this);

                                this.state = {
                                    recordList: [
                                        // { rid:'1111',rtype:0,ctypeShow:'KT',timeShow:'04-30 14:32:00',amount:1 },
                                        // { rid:'1111',rtype:0,ctypeShow:'KT',timeShow:'04-30 14:32:00',amount:1 },
                                        // { rid:'1111',rtype:0,ctypeShow:'KT',timeShow:'04-30 14:32:00',amount:1 }               
                                    ],
                                    start: undefined,
                                    refresh: true,
                                    hasMore: false,
                                    showMoreTips: true,
                                    sendNumber: 0,
                                    isScroll: false,
                                    rtypeShow: [cfg.redEnvType[0], cfg.redEnvType[1], cfg.redEnvType[2]],
                                    cfgData: cfg
                                };
                                this.initData();

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * 更新数据
         */

    }, {
        key: "initData",
        value: function initData() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var data, sHisRec, hList;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return pull_1.getInviteCodeDetail();

                            case 2:
                                data = _context2.sent;
                                // 获取邀请红包记录
                                if (data) {
                                    this.state.recordList.push({
                                        rid: '-1',
                                        rtype: 2,
                                        ctypeShow: 'ETH',
                                        timeShow: '',
                                        amount: 0.5,
                                        curNum: data[1],
                                        totalNum: 20
                                    });
                                }
                                sHisRec = store_1.find('sHisRec');

                                if (sHisRec) {
                                    hList = sHisRec.list;

                                    if (hList && hList.length > this.state.recordList.length) {
                                        console.log('load more from local');
                                    } else {
                                        console.log('load more from server');
                                        pull_1.querySendRedEnvelopeRecord(this.state.start);
                                    }
                                } else {
                                    console.log('load more from server');
                                    pull_1.querySendRedEnvelopeRecord(this.state.start);
                                }
                                this.loadMore();

                            case 7:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
        /**
         * 返回上一页
         */

    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
        // 实际加载数据

    }, {
        key: "loadMore",
        value: function loadMore() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var sHisRec, hList, start;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                sHisRec = store_1.find('sHisRec');

                                if (sHisRec) {
                                    _context3.next = 3;
                                    break;
                                }

                                return _context3.abrupt("return");

                            case 3:
                                hList = sHisRec.list;
                                start = this.state.recordList.length;

                                this.state.recordList = this.state.recordList.concat(hList.slice(start, start + constants_1.PAGELIMIT));
                                this.state.sendNumber = sHisRec.sendNumber;
                                this.state.start = sHisRec.start;
                                this.state.hasMore = this.state.sendNumber > this.state.recordList.length;
                                this.state.showMoreTips = this.state.sendNumber >= constants_1.PAGELIMIT;
                                this.initRedEn();

                            case 11:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
        /**
         * 更新红包已领取数量
         */

    }, {
        key: "initRedEn",
        value: function initRedEn() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var i, data;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.t0 = regeneratorRuntime.keys(this.state.recordList);

                            case 1:
                                if ((_context4.t1 = _context4.t0()).done) {
                                    _context4.next = 9;
                                    break;
                                }

                                i = _context4.t1.value;
                                _context4.next = 5;
                                return pull_1.queryDetailLog(store_1.find('conUid'), this.state.recordList[i].rid);

                            case 5:
                                data = _context4.sent;

                                if (data) {
                                    this.state.recordList[i].curNum = data[2];
                                    this.state.recordList[i].totalNum = data[3];
                                } else {
                                    this.state.recordList[i].curNum = 0;
                                    this.state.recordList[i].totalNum = 0;
                                }
                                _context4.next = 1;
                                break;

                            case 9:
                                this.paint();

                            case 10:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        }
        /**
         * 页面滑动，加载更多列表
         */

    }, {
        key: "getMoreList",
        value: function getMoreList() {
            var _this3 = this;

            var h1 = document.getElementById('redEnvHistory').offsetHeight;
            var h2 = document.getElementById('historyRecords').offsetHeight;
            var scrollTop = document.getElementById('redEnvHistory').scrollTop;
            if (this.state.hasMore && this.state.refresh && h2 - h1 - scrollTop < 20) {
                this.state.refresh = false;
                setTimeout(function () {
                    _this3.loadMore();
                    _this3.state.refresh = true;
                }, 500);
            }
            if (scrollTop > 0) {
                this.state.isScroll = true;
                if (this.state.isScroll) {
                    this.paint();
                }
            } else {
                this.state.isScroll = false;
                this.paint();
            }
        }
        /**
         * 查看详情
         */

    }, {
        key: "goDetail",
        value: function goDetail(ind) {
            root_1.popNew('app-view-earn-redEnvelope-redEnvDetail', this.state.recordList[ind]);
        }
    }]);

    return RedEnvHistory;
}(widget_1.Widget);

exports.RedEnvHistory = RedEnvHistory;
// =====================================本地
store_1.register('sHisRec', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.loadMore();
    }
});
})