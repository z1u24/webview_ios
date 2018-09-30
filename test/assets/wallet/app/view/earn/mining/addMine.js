_$define("app/view/earn/mining/addMine", function (require, exports, module){
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
 * 做任务
 */
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
        key: "create",
        value: function create() {
            _get(Dividend.prototype.__proto__ || Object.getPrototypeOf(Dividend.prototype), "create", this).call(this);
            var cfg = tools_1.getLanguage(this);
            this.state = {
                data: [{
                    isComplete: false,
                    itemImg: '../../res/image/addMine_create.png',
                    itemName: cfg.data[0][0],
                    itemShort: cfg.data[0][1],
                    itemDetail: cfg.data[0][2],
                    itemJump: 'walletCreate',
                    show: false
                }, {
                    isComplete: false,
                    itemImg: '../../res/image/addMine_verify.png',
                    itemName: cfg.data[1][0],
                    itemShort: cfg.data[1][1],
                    itemDetail: cfg.data[1][2],
                    itemJump: 'bindPhone',
                    show: false
                }, {
                    isComplete: false,
                    itemImg: '../../res/image/addMine_store.png',
                    itemName: cfg.data[2][0],
                    itemShort: cfg.data[2][1],
                    itemDetail: cfg.data[2][2],
                    itemJump: 'storeCoin',
                    show: false
                }, {
                    isComplete: false,
                    itemImg: '../../res/image/addMine_share.png',
                    itemName: cfg.data[3][0],
                    itemShort: cfg.data[3][1],
                    itemDetail: cfg.data[3][2],
                    itemJump: 'shareFriend',
                    show: false
                }, {
                    isComplete: false,
                    itemImg: '../../res/image/addMine_buy.png',
                    itemName: cfg.data[4][0],
                    itemShort: cfg.data[4][1],
                    itemDetail: cfg.data[4][2],
                    itemJump: 'buyFinancial',
                    show: false
                }, {
                    isComplete: false,
                    itemImg: '../../res/image/addMine_chat.png',
                    itemName: cfg.data[5][0],
                    itemShort: cfg.data[5][1],
                    itemDetail: cfg.data[5][2],
                    itemJump: 'toChat',
                    show: false
                }],
                cfgData: cfg
            };
            this.initData();
            pull_1.getMineDetail();
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
        /**
         * 挖矿项目跳转
         * @param ind 挖矿项目参数
         */

    }, {
        key: "goDetail",
        value: function goDetail(ind) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var itemJump, inviteCodeInfo;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (this.state.data[ind].isComplete) {
                                    _context.next = 12;
                                    break;
                                }

                                itemJump = this.state.data[ind].itemJump;

                                pull_1.getMineItemJump(itemJump);

                                if (!(itemJump === 'shareFriend')) {
                                    _context.next = 10;
                                    break;
                                }

                                _context.next = 6;
                                return pull_1.getInviteCode();

                            case 6:
                                inviteCodeInfo = _context.sent;

                                if (!(inviteCodeInfo.result !== 1)) {
                                    _context.next = 9;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 9:
                                root_1.popNew('app-view-earn-redEnvelope-sendRedEnv', {
                                    rid: inviteCodeInfo.cid,
                                    rtype: 99,
                                    message: this.state.cfgData.defaultMess
                                });

                            case 10:
                                if (itemJump === 'bindPhone') {
                                    // 绑定手机
                                    root_1.popNew('app-view-mine-setting-phone');
                                }
                                if (itemJump === 'buyFinancial') {
                                    // 购买理财 
                                    root_1.popNew('app-view-wallet-financialManagement-home');
                                }

                            case 12:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * 展示或隐藏详细描述
         */

    }, {
        key: "show",
        value: function show(ind) {
            this.state.data[ind].show = !this.state.data[ind].show;
            this.paint();
        }
        /**
         * 获取更新数据
         */

    }, {
        key: "initData",
        value: function initData() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var detail, i;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                detail = store_1.find('addMine');
                                // tslint:disable-next-line:max-line-length
                                // const detail = [{isComplete:true},{isComplete:false},{isComplete:false},{isComplete:false},{isComplete:false},{isComplete:false}];

                                if (detail) {
                                    for (i in detail) {
                                        this.state.data[i].isComplete = detail[i].isComplete;
                                    }
                                }
                                this.paint();

                            case 3:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }]);

    return Dividend;
}(widget_1.Widget);

exports.Dividend = Dividend;
store_1.register('addMine', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
})