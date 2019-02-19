_$define("earn/server/rpc/user_item.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用户物品接口
 */
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var db_1 = require("../../utils/db");
var awardCfg_s_1 = require("../../xlsx/awardCfg.s");
var constant_1 = require("../data/constant");
var guessing_s_1 = require("../data/db/guessing.s");
var item_s_1 = require("../data/db/item.s");
var medal_s_1 = require("../data/db/medal.s");
var errorNum_1 = require("../data/errorNum");
var item_util_r_1 = require("../util/item_util.r");
var mining_util_1 = require("../util/mining_util");
var user_r_1 = require("./user.r");
// 添加矿山
// #[rpc=rpcServer]
exports.add_mine = function () {
    // if (get_mine_total(uid) >= MAX_ONEDAY_MINING) return;
    var uid = user_r_1.getUid();
    var itemType = item_util_r_1.get_mine_type();
    var item = item_util_r_1.add_itemCount(uid, itemType, 1);
    return item.value;
};
// 查询指定用户物品信息
// #[rpc=rpcServer]
exports.item_query = function () {
    var uid = user_r_1.getUid();
    console.log('item query in !!!!!!!!!!!!');
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var userItemBucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.Items._$info.name, dbMgr);
    var items = userItemBucket.get(uid)[0];
    if (!items) {
        item_util_r_1.items_init(uid);
        return exports.item_query();
    }
    return items;
};
// 获取指定物品信息
// #[rpc=rpcServer]
exports.get_item = function (itemType) {
    console.log('get_item in !!!!!!!!!!!!');
    var itemInfo = exports.item_query();
    if (!itemInfo) return;
    var items = itemInfo.item;
    for (var _iterator = items, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var item = _ref;

        if (item.value.num === itemType) {
            var resutlItem = new item_s_1.Item();
            resutlItem.enum_type = mining_util_1.get_enumType(itemType);
            resutlItem.value = item.value;
            return resutlItem;
        }
    }
};
// 查询用户所有获奖信息
// #[rpc=rpcServer]
exports.award_query = function (awardQuery) {
    var uid = user_r_1.getUid();
    var src = awardQuery.src;
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var pidList = void 0;
    var awardMap = item_util_r_1.get_award_ids(uid);
    var awardList = new item_s_1.AwardList();
    awardList.uid = uid;
    if (!awardMap.awards) {
        return awardList;
    } else {
        pidList = awardMap.awards;
        var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.Award._$info.name, dbMgr);
        var awards = bucket.get(pidList);
        if (!awardQuery.src) {
            console.log('awards:!!!!!!!!!!!!!!!!!!!', awards);
            awardList.awards = awards;
        } else {
            var srcAwards = [];
            for (var _iterator2 = awards, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var award = _ref2;

                console.log('src:!!!!!!!!!!!!!!!!!!!', award.src);
                if (award.src === src) {
                    srcAwards.push(award);
                    continue;
                }
            }
            console.log('srcAwards:!!!!!!!!!!!!!!!!!!!', srcAwards);
            awardList.awards = srcAwards;
        }
        return awardList;
    }
};
// 查询指定用户所有奖章
// #[rpc=rpcServer]
exports.get_medals = function () {
    var uid = user_r_1.getUid();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, medal_s_1.Medals._$info.name, dbMgr);
    var medals = bucket.get(uid)[0];
    if (!medals) {
        medals = new medal_s_1.Medals();
        medals.uid = uid;
        medals.medals = [];
    }
    return medals;
};
// 查看展示的奖章
// #[rpc=rpcServer]
exports.get_showMedal = function (uid) {
    var showMedalRes = new medal_s_1.ShowMedalRes(constant_1.RESULT_SUCCESS, null);
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, medal_s_1.ShowMedal._$info.name, dbMgr);
    var showMedal = bucket.get(uid)[0];
    if (!showMedal) return showMedalRes;
    showMedalRes.medalType = showMedal.medal;
    return showMedalRes;
};
// 展示奖章
// #[rpc=rpcServer]
exports.show_medal = function (medalType) {
    console.log('show_medal in!!!!!!!!!!!!!!!!!', medalType);
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, medal_s_1.ShowMedal._$info.name, dbMgr);
    var uid = user_r_1.getUid();
    var showMedal = new medal_s_1.ShowMedal(uid, medalType);
    bucket.put(uid, showMedal);
    return new medal_s_1.ShowMedalRes(constant_1.RESULT_SUCCESS, medalType);
};
// 查询指定用户所有成就
// #[rpc=rpcServer]
exports.get_achievements = function () {
    var uid = user_r_1.getUid();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, medal_s_1.Achievements._$info.name, dbMgr);
    var achievements = bucket.get(uid)[0];
    if (!achievements) {
        achievements = new medal_s_1.Achievements();
        achievements.uid = uid;
        achievements.achievements = [];
    }
    return achievements;
};
// 看广告获得奖励
// #[rpc=rpcServer]
exports.get_ad_award = function (adType) {
    var uid = user_r_1.getUid();
    var result = new guessing_s_1.Result();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.DailyWatchAdNum._$info.name, dbMgr);
    var dailyWatchAdNum = void 0;
    var date = item_util_r_1.get_today();
    var pid = uid + ":" + date;
    var timestamps = Math.floor(new Date().valueOf() / 1000);
    console.log('timestamps!!!!!!!!!!!!', timestamps);
    dailyWatchAdNum = bucket.get(pid)[0];
    if (!dailyWatchAdNum) {
        dailyWatchAdNum = new item_s_1.DailyWatchAdNum();
        dailyWatchAdNum.id = pid;
        dailyWatchAdNum.num = 0;
        dailyWatchAdNum.lastTime = 0;
    }
    // 判断当天看广告获得奖励的次数是否达到上限
    if (dailyWatchAdNum.num >= constant_1.MAX_ONEDAY_ADAWARD) {
        result.reslutCode = errorNum_1.ONEDAY_ADAWARD_LIMIT;
        return result;
    }
    // 判断广告时间间隔是否达到最低时间间隔
    if (timestamps - dailyWatchAdNum.lastTime < constant_1.MIN_ADVERTISEMENT_SECONDS) {
        result.reslutCode = errorNum_1.ADVERTISEMENT_TIME_ERROR;
        return result;
    }
    // 根据广告类型从配置中获取奖励
    var cfgBucket = new db_1.Bucket(constant_1.MEMORY_NAME, awardCfg_s_1.AdAwardCfg._$info.name, dbMgr);
    console.log('adType!!!!!!!!!!!!', adType);
    var adAward = cfgBucket.get(adType)[0];
    console.log('adAward!!!!!!!!!!!!', adAward);
    if (!adAward) {
        result.reslutCode = errorNum_1.ADVERTISEMENT_NUM_ERROR;
        return result;
    }
    var awardType = adAward.prop;
    var count = adAward.num;
    var desc = adAward.desc;
    var src = constant_1.AWARD_SRC_ADVERTISEMENT;
    // 添加奖励
    item_util_r_1.add_itemCount(uid, awardType, count);
    var award = item_util_r_1.add_award(uid, awardType, count, src, null, desc);
    if (!award) {
        result.reslutCode = errorNum_1.DB_ERROR;
        return result;
    }
    dailyWatchAdNum.num += 1;
    dailyWatchAdNum.lastTime = timestamps;
    bucket.put(pid, dailyWatchAdNum);
    result.msg = JSON.stringify(award);
    result.reslutCode = constant_1.RESULT_SUCCESS;
    return result;
};
})