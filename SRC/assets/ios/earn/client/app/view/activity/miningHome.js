_$define("earn/client/app/view/activity/miningHome", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * digging mines home
 */
var native_1 = require("../../../../../app/logic/native");
var root_1 = require("../../../../../pi/ui/root");
var forelet_1 = require("../../../../../pi/widget/forelet");
var widget_1 = require("../../../../../pi/widget/widget");
var item_s_1 = require("../../../../server/data/db/item.s");
var rpc_1 = require("../../net/rpc");
var memstore_1 = require("../../store/memstore");
var constants_1 = require("../../utils/constants");
var tools_1 = require("../../utils/tools");
var util_1 = require("../../utils/util");
var hoeType_s_1 = require("../../xls/hoeType.s");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var MiningHome = function (_widget_1$Widget) {
    _inherits(MiningHome, _widget_1$Widget);

    function MiningHome() {
        _classCallCheck(this, MiningHome);

        var _this = _possibleConstructorReturn(this, (MiningHome.__proto__ || Object.getPrototypeOf(MiningHome)).apply(this, arguments));

        _this.hits = [];
        _this.mineStyle = ['right:305px;top:292px;', 'left:165px;top:462px;', 'right:118px;top:436px;', 'left:128px;top:645px;', 'right:197px;top:777px;', 'left:76px;top:853px;', 'right:22px;top:921px;', 'left:259px;top:937px;'];
        return _this;
    }

    _createClass(MiningHome, [{
        key: "create",
        value: function create() {
            _get(MiningHome.prototype.__proto__ || Object.getPrototypeOf(MiningHome.prototype), "create", this).call(this);
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.props = {
                mineMax: constants_1.MineMax,
                ironHoe: util_1.getHoeCount(hoeType_s_1.HoeType.IronHoe),
                goldHoe: util_1.getHoeCount(hoeType_s_1.HoeType.GoldHoe),
                diamondHoe: util_1.getHoeCount(hoeType_s_1.HoeType.DiamondHoe),
                hoeSelectedLeft: 0,
                hoeType: hoeType_s_1.HoeType,
                hoeSelected: -1,
                mineType: -1,
                mineId: -1,
                countDownStart: false,
                miningCount: 0,
                countDown: constants_1.hoeUseDuration,
                countDownTimer: 0,
                miningTips: { zh_Hans: '', zh_Hant: '', en: '' },
                haveMines: util_1.getAllMines(),
                lossHp: 1,
                allAwardType: item_s_1.Item_Enum,
                awardTypes: {},
                miningedNumber: memstore_1.getStore('mine/miningedNumber'),
                zIndex: -1 // z-index数值
            };
            this.mineLocationInit(); // 矿山位置初始化
            this.hoeSelectedLeft(); // 计算选中锄头剩余数
        }
    }, {
        key: "signInClick",
        value: function signInClick() {
            root_1.popNew('earn-client-app-view-activity-signIn');
        }
    }, {
        key: "welfareClick",
        value: function welfareClick() {
            root_1.popNew('earn-client-app-view-activity-inviteAward');
        }
    }, {
        key: "closeClick",
        value: function closeClick() {
            memstore_1.setStore('flags/earnHomeHidden', false);
        }
    }, {
        key: "mineLocationInit",
        value: function mineLocationInit() {
            var mineStyle = util_1.shuffle(this.mineStyle);
            for (var i = 0; i < this.props.haveMines.length; i++) {
                if (this.props.haveMines[i].location) continue;
                this.props.haveMines[i].location = mineStyle[i];
            }
        }
    }, {
        key: "selectHoeClick",
        value: function selectHoeClick(e, hopeType) {
            if (this.props.countDownStart) return;
            this.props.hoeSelected = hopeType;
            this.hoeSelectedLeft();
            if (this.props.mineType === -1 || this.props.mineId === -1) {
                this.props.miningTips = { zh_Hans: '请选择矿山', zh_Hant: '請選擇礦山', en: '' };
            } else {
                this.props.miningTips = { zh_Hans: '开始挖矿', zh_Hant: '開始挖礦', en: '' };
            }
            this.paint();
        }
    }, {
        key: "hoeSelectedLeft",
        value: function hoeSelectedLeft() {
            if (this.props.hoeSelected === hoeType_s_1.HoeType.IronHoe) {
                this.props.hoeSelectedLeft = this.props.ironHoe;
            } else if (this.props.hoeSelected === hoeType_s_1.HoeType.GoldHoe) {
                this.props.hoeSelectedLeft = this.props.goldHoe;
            } else if (this.props.hoeSelected === hoeType_s_1.HoeType.DiamondHoe) {
                this.props.hoeSelectedLeft = this.props.diamondHoe;
            } else {
                this.props.hoeSelectedLeft = 0;
            }
        }
    }, {
        key: "mineClick",
        value: function mineClick(e) {
            var _this2 = this;

            var itype = e.itype;
            var mineId = e.mineId;
            if (this.props.miningedNumber >= constants_1.MineMax) return;
            // 未开始挖矿前选择矿山
            if ((this.props.mineId !== mineId || this.props.mineType !== itype) && !this.props.countDownStart) {
                this.props.mineId = mineId;
                this.props.mineType = itype;
                if (this.props.hoeSelected === -1) {
                    this.props.miningTips = { zh_Hans: '请选择锄头', zh_Hant: '請選擇鋤頭', en: '' };
                } else {
                    this.props.miningTips = { zh_Hans: '开始挖矿', zh_Hant: '開始挖礦', en: '' };
                }
                this.paint();
                return;
            }
            // 中途挖其他矿去了
            if (this.props.mineId !== mineId || this.props.mineType !== itype) return;
            // 准备开始挖矿
            if (!this.props.countDownStart) {
                if (this.props.hoeSelectedLeft <= 0) return;
                rpc_1.readyMining(this.props.hoeSelected).then(function (r) {
                    var hits = util_1.calcMiningArray(_this2.props.hoeSelected, r.seed);
                    _this2.hits = hits;
                    _this2.paint();
                });
                this.props.countDownStart = true;
                this.props.miningTips = { zh_Hans: "", zh_Hant: "", en: '' };
                this.countDown();
                this.paint();
                return;
            }
            this.props.miningCount++;
            this.bloodLoss();
            this.paint();
        }
        // 矿山掉血

    }, {
        key: "bloodLoss",
        value: function bloodLoss() {
            for (var i = 0; i < this.props.haveMines.length; i++) {
                var mine = this.props.haveMines[i];
                if (mine.type === this.props.mineType && mine.id === this.props.mineId) {
                    this.props.lossHp = this.hits[this.props.miningCount - 1] || 1;
                    // console.log('lossHp  ==',this.props.lossHp);
                    mine.hp -= this.props.lossHp;
                    if (mine.hp <= 0) {
                        this.deleteBoomMine();
                    }
                    break;
                }
            }
        }
        // 爆炸矿山消失

    }, {
        key: "deleteBoomMine",
        value: function deleteBoomMine() {
            var _this3 = this;

            var mineType = this.props.mineType;
            var mineId = this.props.mineId;
            requestAnimationFrame(function () {
                _this3.props.haveMines = _this3.props.haveMines.filter(function (item) {
                    return item.type !== mineType || item.id !== mineId;
                });
            });
            this.initMiningState();
            this.paint();
        }
    }, {
        key: "countDown",
        value: function countDown() {
            var _this4 = this;

            this.props.countDownTimer = setTimeout(function () {
                _this4.countDown();
                _this4.props.countDown--;
                _this4.props.miningTips = { zh_Hans: "", zh_Hant: "", en: '' };
                if (!_this4.props.countDown) {
                    _this4.initMiningState();
                }
                _this4.paint();
            }, 1000);
        }
    }, {
        key: "initMiningState",
        value: function initMiningState() {
            var _this5 = this;

            rpc_1.startMining(this.props.mineType, this.props.mineId, this.props.miningCount).then(function (r) {
                rpc_1.getRankList();
                if (r.leftHp <= 0) {
                    rpc_1.getTodayMineNum();
                    _this5.paint();
                    _this5.props.awardTypes[r.awards[0].enum_type] = tools_1.coinUnitchange(r.awards[0].value.num, r.awards[0].value.count);
                }
            });
            this.props.mineId = -1;
            this.props.mineType = -1;
            this.props.countDownStart = false;
            this.props.countDown = constants_1.hoeUseDuration;
            this.props.hoeSelected = -1;
            this.props.miningTips = { zh_Hans: '', zh_Hant: '', en: '' };
            this.props.miningCount = 0;
            clearTimeout(this.props.countDownTimer);
        }
    }, {
        key: "updateMine",
        value: function updateMine() {
            this.props.ironHoe = util_1.getHoeCount(hoeType_s_1.HoeType.IronHoe);
            this.props.goldHoe = util_1.getHoeCount(hoeType_s_1.HoeType.GoldHoe);
            this.props.diamondHoe = util_1.getHoeCount(hoeType_s_1.HoeType.DiamondHoe);
            this.hoeSelectedLeft();
            if (this.props.haveMines.length === 0) {
                this.props.haveMines = util_1.getAllMines();
                this.mineLocationInit();
            }
            console.log('haveMines =', this.props.haveMines);
            this.paint();
        }
    }, {
        key: "updateMiningedNumber",
        value: function updateMiningedNumber(miningedNumber) {
            this.props.miningedNumber = miningedNumber;
            this.paint();
        }
    }, {
        key: "watchAdClick",
        value: function watchAdClick() {
            native_1.watchAd(2, function (err, res) {
                console.log('ad err = ', err);
                console.log('ad res = ', res);
            });
        }
    }]);

    return MiningHome;
}(widget_1.Widget);

exports.MiningHome = MiningHome;
// ===================================================== 立即执行
memstore_1.register('goods', function (goods) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    w && w.updateMine();
});
memstore_1.register('mine/miningedNumber', function (miningedNumber) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    w && w.updateMiningedNumber(miningedNumber);
});
memstore_1.register('flags/earnHomeHidden', function (earnHomeHidden) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (earnHomeHidden) {
        setTimeout(function () {
            w.props.zIndex = 0;
            w.paint();
        }, 500);
    } else {
        w.props.zIndex = -1;
        w.paint();
    }
});
})