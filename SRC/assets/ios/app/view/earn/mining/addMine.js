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
var lang_1 = require("../../../../pi/util/lang");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
var pull_1 = require("../../../net/pull");
var memstore_1 = require("../../../store/memstore");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var Dividend = function (_widget_1$Widget) {
    _inherits(Dividend, _widget_1$Widget);

    function Dividend() {
        _classCallCheck(this, Dividend);

        var _this = _possibleConstructorReturn(this, (Dividend.__proto__ || Object.getPrototypeOf(Dividend)).call(this));

        _this.props = {
            data: [{
                isComplete: false,
                itemImg: '../../res/image/addMine_create.png',
                itemName: { zh_Hans: '创建钱包', zh_Hant: '創建錢包', en: '' },
                itemShort: { zh_Hans: '有个钱包是一切的基础', zh_Hant: '有個錢包是一切的基礎', en: '' },
                btnName: { zh_Hans: '去创建', zh_Hant: '去創建', en: '' },
                components: 'app-view-wallet-create-home',
                modulIsShow: true
            }, {
                isComplete: false,
                itemImg: '../../res/image/addMine_verify.png',
                itemName: { zh_Hans: '验证手机号', zh_Hant: '驗證手機號', en: '' },
                itemShort: { zh_Hans: '确认为真实用户的唯一标准', zh_Hant: '確認為真實用戶的唯一標準', en: '' },
                btnName: { zh_Hans: '去验证', zh_Hant: '去驗證', en: '' },
                components: 'app-view-mine-setting-phone',
                modulIsShow: true
            }, {
                isComplete: false,
                itemImg: '../../res/image/addMine_store.png',
                itemName: { zh_Hans: '充值KT', zh_Hant: '充值KT', en: '' },
                itemShort: { zh_Hans: '充KT送ST', zh_Hant: '充KT送ST', en: '' },
                btnName: { zh_Hans: '去充值', zh_Hant: '去充值', en: '' },
                components: 'app-view-wallet-cloudWallet-rechargeKT',
                modulIsShow: true
            }, {
                isComplete: false,
                itemImg: '../../res/image/addMine_share.png',
                itemName: { zh_Hans: '填写邀请码', zh_Hant: '填寫邀請碼', en: '' },
                itemShort: { zh_Hans: '填写好友邀请码领奖励', zh_Hant: '填寫好友邀請碼領獎勵', en: '' },
                btnName: { zh_Hans: '去填写', zh_Hant: '去填写', en: '' },
                components: 'app-view-earn-exchange-exchange',
                modulIsShow: true
            }, {
                isComplete: false,
                itemImg: '../../res/image/addMine_chat.png',
                itemName: { zh_Hans: '邀请好友', zh_Hant: '邀请好友', en: '' },
                itemShort: { zh_Hans: '成功邀请送奖励', zh_Hant: '成功邀请送奖励', en: '' },
                btnName: { zh_Hans: '去邀请', zh_Hant: '去邀請', en: '' },
                components: 'earn-client-app-view-activity-inviteFriend',
                modulIsShow: true
            }]
        };
        return _this;
    }

    _createClass(Dividend, [{
        key: "setProps",
        value: function setProps(props) {
            _get(Dividend.prototype.__proto__ || Object.getPrototypeOf(Dividend.prototype), "setProps", this).call(this, this.props);
        }
    }, {
        key: "create",
        value: function create() {
            _get(Dividend.prototype.__proto__ || Object.getPrototypeOf(Dividend.prototype), "create", this).call(this);
            this.language = this.config.value[lang_1.getLang()];
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
                var components;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.props.data[ind].isComplete) {
                                    components = this.props.data[ind].components;

                                    root_1.popNew(components);
                                }

                            case 1:
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
        key: "initData",
        value: function initData() {
            var detail = memstore_1.getStore('activity/mining/addMine');
            // tslint:disable-next-line:max-line-length
            if (detail && detail.length > 0) {
                for (var i in this.props.data) {
                    this.props.data[i].isComplete = detail[i].isComplete;
                    this.props.data[i].itemKT = detail[i].itemNum;
                }
            }
            this.paint();
        }
    }]);

    return Dividend;
}(widget_1.Widget);

exports.Dividend = Dividend;
memstore_1.register('activity/mining/addMine', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        w.initData();
    }
});
})