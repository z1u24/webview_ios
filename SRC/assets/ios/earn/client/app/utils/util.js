_$define("earn/client/app/utils/util", function (require, exports, module){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * common util
 */
var root_1 = require("../../../../pi/ui/root");
var item_s_1 = require("../../../server/data/db/item.s");
var randomSeedMgr_1 = require("../../../server/util/randomSeedMgr");
var awardCfg_s_1 = require("../../../xlsx/awardCfg.s");
var competition_s_1 = require("../../../xlsx/competition.s");
var errorNum_s_1 = require("../../../xlsx/errorNum.s");
var item_s_2 = require("../../../xlsx/item.s");
var cfgMap_1 = require("../store/cfgMap");
var memstore_1 = require("../store/memstore");
var dataCfg_s_1 = require("../xls/dataCfg.s");
var mineType_s_1 = require("../xls/mineType.s");
var constants_1 = require("./constants");
/**
 * 获取用户单个物品数量  kt/st等
 */
exports.getGoodCount = function (itemType) {
    var goods = memstore_1.getStore('goods');
    for (var i = 0; i < goods.length; i++) {
        var good = goods[i];
        if (good.value.num === itemType) {
            return good.value.count;
        }
    }
    return 0;
};
/**
 * 获取锄头对象
 */
exports.getHoeCount = function (hoeType) {
    var goods = memstore_1.getStore('goods');
    for (var i = 0; i < goods.length; i++) {
        var good = goods[i];
        if (good.enum_type === item_s_1.Item_Enum.HOE && good.value.num === hoeType) {
            return good.value.count;
        }
    }
    return 0;
};
/**
 * 获取所有矿山
 */
exports.getAllMines = function () {
    var goods = memstore_1.getStore('goods');
    var mines = [];
    for (var i = 0; i < goods.length; i++) {
        var good = goods[i];
        if (good.enum_type === item_s_1.Item_Enum.MINE) {
            for (var j = 0; j < good.value.count; j++) {
                var hp = good.value.hps[j].hp;
                var itype = good.value.num;
                var mine = {
                    type: itype,
                    id: good.value.hps[j].num,
                    hp: hp
                };
                mines.push(mine);
            }
        }
    }
    // console.log('getAllMines',mines);
    return mines;
};
/**
 * 获取拥有的品质最高的矿山类型
 */
exports.getMaxMineType = function () {
    var goods = memstore_1.getStore('goods');
    var mineType = mineType_s_1.MineType.SmallMine;
    for (var i = 0; i < goods.length; i++) {
        var good = goods[i];
        if (good.enum_type === item_s_1.Item_Enum.MINE) {
            if (good.value.count > 0 && good.value.num > mineType) {
                mineType = good.value.num;
            }
        }
    }
    // console.log('getMaxMineType',mineType);
    return mineType;
};
/**
 * 获取随机显示的矿山列表
 */
exports.randomMines = function () {
    var goods = memstore_1.getStore('goods');
    var mines = [];
    var miningedMines = [];
    for (var i = 0; i < goods.length; i++) {
        var good = goods[i];
        if (good.enum_type === item_s_1.Item_Enum.MINE) {
            for (var j = 0; j < good.value.hps.length; j++) {
                var hp = good.value.hps[j];
                var itype = good.value.num;
                var mine = {
                    type: itype,
                    index: j,
                    hp: hp
                };
                if (itype === mineType_s_1.MineType.SmallMine && hp < exports.getMiningMaxHp(mineType_s_1.MineType.SmallMine)) {
                    miningedMines.push(mine);
                } else if (itype === mineType_s_1.MineType.MidMine && hp < exports.getMiningMaxHp(mineType_s_1.MineType.MidMine)) {
                    miningedMines.push(mine);
                } else if (itype === mineType_s_1.MineType.BigMine && hp < exports.getMiningMaxHp(mineType_s_1.MineType.BigMine)) {
                    miningedMines.push(mine);
                } else {
                    mines.push(mine);
                }
            }
        }
    }
    return [].concat(_toConsumableArray(exports.shuffle(miningedMines)), _toConsumableArray(exports.shuffle(mines)));
};
// 数组乱序
exports.shuffle = function (arr) {
    var length = arr.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
        rand = ~~(Math.random() * (index + 1));
        if (rand !== index) {
            shuffled[index] = shuffled[rand];
        }
        shuffled[rand] = arr[index];
    }
    return shuffled;
};
// 处理挖矿单次事件(一次点击)
var doMining = function doMining(hoeType, seedMgr) {
    var cfgs = cfgMap_1.getMap(awardCfg_s_1.WeightMiningCfg._$info.name);
    var weights = [];
    var filterCfgs = [];
    var maxWeight = 0;
    for (var _iterator = cfgs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var _ref2 = _ref,
            _ref3 = _slicedToArray(_ref2, 2),
            k = _ref3[0],
            cfg = _ref3[1];

        if (cfg.id === hoeType) {
            filterCfgs.push(cfg);
            maxWeight += cfg.weight;
            weights.push(maxWeight);
        }
    }
    // console.log('weights = ',weights);
    var i = getWeightIndex(weights, seedMgr.seed);
    return filterCfgs[i].hits;
};
// 获取权重对应的位置
var getWeightIndex = function getWeightIndex(weights, seed) {
    var rate = randomSeedMgr_1.RandomSeedMgr.randomSeed(seed, 1, weights[weights.length - 1]);
    var i = 0;
    for (i = 0; i < weights.length; i++) {
        if (rate <= weights[i]) break;
    }
    return i;
};
/**
 * 计算挖矿数组
 */
exports.calcMiningArray = function (hoeType, seed) {
    var hits = [];
    var cSeed = seed;
    for (var i = 0; i < constants_1.miningMaxHits; i++) {
        var randomMgr = new randomSeedMgr_1.RandomSeedMgr(cSeed);
        var hit = doMining(hoeType, randomMgr);
        cSeed = randomSeedMgr_1.RandomSeedMgr.randNumber(cSeed);
        hits.push(hit);
    }
    // console.log(`hopeType = ${hoeType}, hits = `,hits);
    return hits;
};
/**
 * 获取矿山最大血量
 * @param mineType 矿山类型
 */
exports.getMiningMaxHp = function (mineType) {
    var cfgs = cfgMap_1.getMap(item_s_2.MineHpCfg._$info.name);
    for (var _iterator2 = cfgs, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref4 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref4 = _i2.value;
        }

        var _ref5 = _ref4,
            _ref6 = _slicedToArray(_ref5, 2),
            k = _ref6[0],
            v = _ref6[1];

        if (v.id === mineType) {
            return v.hp;
        }
    }
    return 0;
};
/**
 * 获取对应奖券TYPE的余票
 * @param ticketType 奖券TYPE
 */
exports.getTicketBalance = function (ticketType) {
    var goods = memstore_1.getStore('goods');
    for (var i = 0; i < goods.length; i++) {
        var good = goods[i];
        if (good.enum_type === item_s_1.Item_Enum.TICKET && good.value.num === ticketType) {
            return good.value.count;
        }
    }
    return 0;
};
/**
 * 获取活动所需对应票数
 *  奖品编号
 */
exports.getTicketNum = function (activityType) {
    var cfgs = cfgMap_1.getMap(dataCfg_s_1.ActTicketNumCfg._$info.name);
    for (var _iterator3 = cfgs, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref7;

        if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref7 = _iterator3[_i3++];
        } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref7 = _i3.value;
        }

        var _ref8 = _ref7,
            _ref9 = _slicedToArray(_ref8, 2),
            k = _ref9[0],
            cfg = _ref9[1];

        if (cfg.actType === activityType) {
            return cfg.ticketNum;
        }
    }
    return 0;
};
/**
 * 获取单个奖品信息
 * @param prizeType 奖品编号
 */
exports.getPrizeInfo = function (prizeType) {
    var cfgs = cfgMap_1.getMap(dataCfg_s_1.PrizeCfg._$info.name);
    var filterCfgs = '';
    for (var _iterator4 = cfgs, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref10;

        if (_isArray4) {
            if (_i4 >= _iterator4.length) break;
            _ref10 = _iterator4[_i4++];
        } else {
            _i4 = _iterator4.next();
            if (_i4.done) break;
            _ref10 = _i4.value;
        }

        var _ref11 = _ref10,
            _ref12 = _slicedToArray(_ref11, 2),
            k = _ref12[0],
            cfg = _ref12[1];

        if (cfg.pid === prizeType) {
            return cfg;
        }
    }
    return filterCfgs;
};
/**
 * 获取项目奖品列表
 */
exports.getPrizeList = function (activityType) {
    var cfgs = cfgMap_1.getMap(awardCfg_s_1.WeightAwardCfg._$info.name);
    var filterCfgs = [];
    for (var _iterator5 = cfgs, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
        var _ref13;

        if (_isArray5) {
            if (_i5 >= _iterator5.length) break;
            _ref13 = _iterator5[_i5++];
        } else {
            _i5 = _iterator5.next();
            if (_i5.done) break;
            _ref13 = _i5.value;
        }

        var _ref14 = _ref13,
            _ref15 = _slicedToArray(_ref14, 2),
            k = _ref15[0],
            cfg = _ref15[1];

        if (cfg.id >= activityType && cfg.id <= activityType + 99) {
            filterCfgs.push(cfg.prop);
        }
    }
    return exports.shuffle(filterCfgs);
};
/**
 * 获取固定项目奖品列表
 */
exports.getRegularPrizeList = function (activityType) {
    var cfgs = cfgMap_1.getMap(awardCfg_s_1.RegularAwardCfg._$info.name);
    var filterCfgs = [];
    for (var _iterator6 = cfgs, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
        var _ref16;

        if (_isArray6) {
            if (_i6 >= _iterator6.length) break;
            _ref16 = _iterator6[_i6++];
        } else {
            _i6 = _iterator6.next();
            if (_i6.done) break;
            _ref16 = _i6.value;
        }

        var _ref17 = _ref16,
            _ref18 = _slicedToArray(_ref17, 2),
            k = _ref18[0],
            cfg = _ref18[1];

        if (cfg.id >= activityType && cfg.id < activityType + 99) {
            filterCfgs.push(cfg);
        }
    }
    return filterCfgs;
};
/**
 * 获取虚拟物品兑换列表
 */
exports.getVirtualExchangeList = function (typeStr, exchangeType) {
    var cfgs = cfgMap_1.getMap(awardCfg_s_1.STConvertCfg._$info.name);
    var filterCfgs = [];
    for (var _iterator7 = cfgs, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
        var _ref19;

        if (_isArray7) {
            if (_i7 >= _iterator7.length) break;
            _ref19 = _iterator7[_i7++];
        } else {
            _i7 = _iterator7.next();
            if (_i7.done) break;
            _ref19 = _i7.value;
        }

        var _ref20 = _ref19,
            _ref21 = _slicedToArray(_ref20, 2),
            k = _ref21[0],
            cfg = _ref21[1];

        if (exchangeType) {
            if (cfg[typeStr] === exchangeType) {
                filterCfgs.push(cfg);
            }
        } else {
            filterCfgs.push(cfg);
        }
    }
    return filterCfgs;
};
/**
 * 获取勋章列表
 * @param typeNum 查询参数
 * @param typeStr 查询列名
 */
exports.getMedalList = function (typeNum, typeStr) {
    var cfgs = cfgMap_1.getMap(item_s_2.MedalCfg._$info.name);
    var filterCfgs = [];
    for (var _iterator8 = cfgs, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
        var _ref22;

        if (_isArray8) {
            if (_i8 >= _iterator8.length) break;
            _ref22 = _iterator8[_i8++];
        } else {
            _i8 = _iterator8.next();
            if (_i8.done) break;
            _ref22 = _i8.value;
        }

        var _ref23 = _ref22,
            _ref24 = _slicedToArray(_ref23, 2),
            k = _ref24[0],
            cfg = _ref24[1];

        if (typeNum === cfg[typeStr]) {
            filterCfgs.push(cfg);
        }
    }
    return filterCfgs;
};
/**
 * 获取成就勋章列表
 */
exports.getACHVmedalList = function (typeNum, typeStr) {
    var cfgs = cfgMap_1.getMap(item_s_2.AchievementMedalCfg._$info.name);
    var filterCfgs = [];
    for (var _iterator9 = cfgs, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
        var _ref25;

        if (_isArray9) {
            if (_i9 >= _iterator9.length) break;
            _ref25 = _iterator9[_i9++];
        } else {
            _i9 = _iterator9.next();
            if (_i9.done) break;
            _ref25 = _i9.value;
        }

        var _ref26 = _ref25,
            _ref27 = _slicedToArray(_ref26, 2),
            k = _ref27[0],
            cfg = _ref27[1];

        if (typeNum === cfg[typeStr]) {
            filterCfgs.push(cfg);
        }
    }
    return filterCfgs;
};
/**
 * 计算用户等级勋章
 */
// export const computeRankMedal = () => {
//     const ktNum = getStore('balance/KT');
//     const medalList = getMedalList(CoinType.KT, 'coinType');
//     const mineMedal = {
//         rankMedal: 8000,
//         desc: {},
//         nowClass:'',
//         nextNeedKt: 0,
//         ktNum
//     };
//     for (let i = 0; i < medalList.length; i++) {
//         const element = medalList[i];
//         if (ktNum >= element.coinNum) {
//             mineMedal.rankMedal = element.id;
//             mineMedal.desc = { zh_Hans: element.desc, zh_Hant: element.descHant, en: '' };
//             mineMedal.nowClass = element.typeNum;  
//             if ((i + 1) <= medalList.length) {
//                 mineMedal.nextNeedKt = medalList[i + 1].coinNum - ktNum;
//             } else {
//                 mineMedal.nextNeedKt = 0;
//             }
//         }
//     }
//     return mineMedal;
// };
/**
 * 展示错误信息
 * @param errorNum 错误编号
 */
exports.showActError = function (errorNum) {
    var cfgs = cfgMap_1.getMap(errorNum_s_1.ErrorNumCfg._$info.name);
    for (var _iterator10 = cfgs, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
        var _ref28;

        if (_isArray10) {
            if (_i10 >= _iterator10.length) break;
            _ref28 = _iterator10[_i10++];
        } else {
            _i10 = _iterator10.next();
            if (_i10.done) break;
            _ref28 = _i10.value;
        }

        var _ref29 = _ref28,
            _ref30 = _slicedToArray(_ref29, 2),
            k = _ref30[0],
            cfg = _ref30[1];

        if (errorNum === cfg.id) {
            root_1.popNew('app-components1-message-message', { content: { zh_Hans: cfg.desc, zh_Hant: cfg.descHant, en: '' } });
        }
    }
};
/**
 * 获取连续登录奖励
 */
exports.getSeriesLoginAwards = function (serielLoginDays) {
    var resetDays = 15; // 奖励重置天数
    var showAwardsDays = 7; // 同时展示几天的奖励
    var multiple = Math.ceil(serielLoginDays / showAwardsDays);
    var showAwardsDaysStart = (multiple - 1) * showAwardsDays + 1;
    var cfgs = cfgMap_1.getMap(awardCfg_s_1.SeriesLoginAwardCfg._$info.name);
    var awards = [];
    for (var i = 0; i < showAwardsDays; i++) {
        var index = (showAwardsDaysStart + i - 1) % resetDays;
        var cfg = JSON.parse(JSON.stringify(cfgs.get(index)));
        cfg.days = showAwardsDaysStart + i;
        awards[i] = cfg;
    }
    return awards;
};
/**
 * 获取队伍信息
 * @param teamNum 可选,队伍编号，不填返回所有
 */
exports.getTeamCfg = function (teamNum) {
    var cfgs = cfgMap_1.getMap(competition_s_1.LOLTeamInfosCfg._$info.name);
    var filterCfgs = [];
    for (var _iterator11 = cfgs, _isArray11 = Array.isArray(_iterator11), _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
        var _ref31;

        if (_isArray11) {
            if (_i11 >= _iterator11.length) break;
            _ref31 = _iterator11[_i11++];
        } else {
            _i11 = _iterator11.next();
            if (_i11.done) break;
            _ref31 = _i11.value;
        }

        var _ref32 = _ref31,
            _ref33 = _slicedToArray(_ref32, 2),
            k = _ref33[0],
            cfg = _ref33[1];

        if (teamNum && teamNum === cfg.pid) {
            return cfg;
        } else {
            filterCfgs.push(cfg);
        }
    }
    return filterCfgs;
};
/**
 * 获取赛事信息
 * @param macthType 可选,赛事编号，不填返回所有
 */
exports.getMacthTypeCfg = function (macthType) {
    var cfgs = cfgMap_1.getMap(competition_s_1.LOLTypeCfg._$info.name);
    var filterCfgs = [];
    for (var _iterator12 = cfgs, _isArray12 = Array.isArray(_iterator12), _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
        var _ref34;

        if (_isArray12) {
            if (_i12 >= _iterator12.length) break;
            _ref34 = _iterator12[_i12++];
        } else {
            _i12 = _iterator12.next();
            if (_i12.done) break;
            _ref34 = _i12.value;
        }

        var _ref35 = _ref34,
            _ref36 = _slicedToArray(_ref35, 2),
            k = _ref36[0],
            cfg = _ref36[1];

        if (macthType && macthType === cfg.pid) {
            return cfg;
        } else {
            filterCfgs.push(cfg);
        }
    }
    return filterCfgs;
};
/**
 * 判断是否有邀请奖励可以领取
 */
exports.canInviteAward = function (invited) {
    return invited.convertedInvitedAward.indexOf(1) >= 0;
};
exports.isLogin = function () {
    var uid = memstore_1.getStore('userInfo/uid');
    if (uid === -1) {
        root_1.popNew('app-components1-message-message', { content: '请登录再玩' });
        return false;
    } else {
        return true;
    }
};
})