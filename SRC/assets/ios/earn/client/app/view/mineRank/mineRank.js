_$define("earn/client/app/view/mineRank/mineRank", function (require, exports, module){
"use strict";
/**
 * 挖矿排名
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
var pull_1 = require("../../../../../app/net/pull");
var forelet_1 = require("../../../../../pi/widget/forelet");
var widget_1 = require("../../../../../pi/widget/widget");
var rpc_1 = require("../../net/rpc");
var subscribedb_1 = require("../../net/subscribedb");
var memstore_1 = require("../../store/memstore");
var tools_1 = require("../../utils/tools");
var dataEnum_s_1 = require("../../xls/dataEnum.s");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');
console.log('module-----------------', module);

var MineRank = function (_widget_1$Widget) {
    _inherits(MineRank, _widget_1$Widget);

    function MineRank() {
        _classCallCheck(this, MineRank);

        var _this = _possibleConstructorReturn(this, (MineRank.__proto__ || Object.getPrototypeOf(MineRank)).apply(this, arguments));

        _this.props = {
            notice: [
                // '一颗大蒜苗挖到了0.1ETH',
                // '二颗大蒜苗挖到了0.2ETH',
                // '三颗大蒜苗挖到了0.3ETH',
                // '四颗大蒜苗挖到了0.4ETH',
                // '五颗大蒜苗挖到了0.5ETH'
            ],
            noticeShow: 0,
            myRank: { rank: 0, avatar: '', userName: '......', ktNum: 0, medal: null },
            rankList: [
                // { rank: 1,avatar: '', userName: "啊实打实的", ktNum: 500 , medal: null},
                // { rank: 2,avatar: '', userName: "啊实打实的", ktNum: 500 , medal: null},
                // { rank: 3,avatar: '', userName: "啊实打实的", ktNum: 500 , medal: null},
                // { rank: 4,avatar: '', userName: "啊实打实的", ktNum: 500 , medal: null}
            ],
            topbarList: [{
                name: 'allRankList',
                title: { zh_Hans: '全部排名', zh_Hant: '全部排名', en: '' }
            }, {
                name: 'friendRankList',
                title: { zh_Hans: '好友排名', zh_Hant: '好友排名', en: '' }
            }],
            topbarSel: 0
        };
        return _this;
    }

    _createClass(MineRank, [{
        key: "create",
        value: function create() {
            var _this2 = this;

            _get(MineRank.prototype.__proto__ || Object.getPrototypeOf(MineRank.prototype), "create", this).call(this);
            this.initData();
            subscribedb_1.subscribeSpecialAward(function (r) {
                return __awaiter(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var userInfo, dataStr;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (!r) {
                                        _context.next = 8;
                                        break;
                                    }

                                    console.log('[活动]挖矿特殊奖励公告----------------', r);
                                    _context.next = 4;
                                    return pull_1.getUserList([r.openid], 1);

                                case 4:
                                    userInfo = _context.sent;
                                    dataStr = userInfo[0].nickName + "\u6316\u5230\u4E86" + tools_1.coinUnitchange(r.awardType, r.count) + dataEnum_s_1.CoinType[r.awardType];

                                    this.props.notice.push(dataStr);
                                    // this.props.notice.shift();
                                    console.log('this.props.notice----------------', this.props.notice);

                                case 8:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            });
            this.noticeChange();
        }
        /**
         * 通告改变
         */

    }, {
        key: "noticeChange",
        value: function noticeChange() {
            var _this3 = this;

            setTimeout(function () {
                _this3.props.noticeShow++;
                if (_this3.props.noticeShow >= _this3.props.notice.length) {
                    _this3.props.noticeShow = 0;
                }
                _this3.noticeChange();
            }, 5000);
            this.paint();
        }
        /**
         * 更新props数据
         */

    }, {
        key: "initData",
        value: function initData() {
            var _this4 = this;

            rpc_1.getRankList().then(function (res) {
                return __awaiter(_this4, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.next = 2;
                                    return this.processData(res.topList);

                                case 2:
                                    this.props.rankList = _context2.sent;

                                    // console.log('rankList------------------------',this.props.rankList);
                                    this.props.myRank.avatar = memstore_1.getStore('userInfo/avatar');
                                    this.props.myRank.userName = memstore_1.getStore('userInfo/name');
                                    this.props.myRank.rank = res.myNum;
                                    this.props.myRank.ktNum = res.myKTNum;
                                    this.props.myRank.medal = res.myMedal;
                                    this.paint();

                                case 9:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));
            });
        }
        // 处理排行榜

    }, {
        key: "processData",
        value: function processData(data) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var resData, openidAry, userInfoList, i, element, elementUser, res;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                resData = [];
                                openidAry = []; // 挖矿用户openid数组

                                if (!(data.length !== 0)) {
                                    _context3.next = 8;
                                    break;
                                }

                                data.forEach(function (element) {
                                    // tslint:disable-next-line:radix
                                    openidAry.push(parseInt(element.openid));
                                });
                                _context3.next = 6;
                                return pull_1.getUserList(openidAry, 1);

                            case 6:
                                userInfoList = _context3.sent;

                                for (i = 0; i < data.length; i++) {
                                    element = data[i];
                                    elementUser = userInfoList[i];
                                    res = {
                                        avatar: elementUser.avatar,
                                        userName: elementUser.nickName,
                                        rank: i + 1,
                                        ktNum: element.miningKTMap.ktNum,
                                        medal: element.medal
                                    };

                                    resData.push(res);
                                }

                            case 8:
                                console.log('批量获取挖矿用户信息--------------------------', resData);
                                return _context3.abrupt("return", resData);

                            case 10:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
        /**
         * 导航栏切换
         * @param index 选择导航栏
         */

    }, {
        key: "topbarChange",
        value: function topbarChange(index) {
            this.props.topbarSel = index;
            document.getElementById('rankList').scrollTop = 0;
            this.paint();
        }
        /**
         * 刷新页面
         */

    }, {
        key: "refresh",
        value: function refresh() {
            this.initData();
        }
        /**
         * 返回上一页
         */

    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }]);

    return MineRank;
}(widget_1.Widget);

exports.MineRank = MineRank;
// ===================================================== 立即执行
memstore_1.register('userInfo', function (r) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    w && w.initData();
});
})