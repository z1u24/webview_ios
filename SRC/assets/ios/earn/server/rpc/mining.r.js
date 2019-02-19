_$define("earn/server/rpc/mining.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 挖矿接口
 */
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var db_1 = require("../../utils/db");
var awardCfg_s_1 = require("../../xlsx/awardCfg.s");
var constant_1 = require("../data/constant");
var item_s_1 = require("../data/db/item.s");
var errorNum_1 = require("../data/errorNum");
var award_t_1 = require("../util/award.t");
var item_util_r_1 = require("../util/item_util.r");
var mining_util_1 = require("../util/mining_util");
var randomSeedMgr_1 = require("../util/randomSeedMgr");
var itemQuery_s_1 = require("./itemQuery.s");
var user_r_1 = require("./user.r");
var user_item_r_1 = require("./user_item.r");
// 获取挖矿几率的随机种子
// #[rpc=rpcServer]
exports.mining = function (itemType) {
    var seedResponse = new itemQuery_s_1.SeedResponse();
    // 相应锄头数量减1
    if (!item_util_r_1.reduce_itemCount(itemType, 1)) {
        seedResponse.resultNum = errorNum_1.HOE_NOT_ENOUGH;
        return seedResponse;
    }
    // 获取随机种子并写入内存表
    var seed = Math.floor(Math.random() * 233280 + 1);
    var uid = user_r_1.getUid();
    var hoeType = itemType;
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var seedBucket = new db_1.Bucket(constant_1.MEMORY_NAME, item_s_1.MineSeed._$info.name, dbMgr);
    seedBucket.put(uid, [seed, hoeType]);
    seedResponse.seed = seed;
    seedResponse.resultNum = constant_1.RESULT_SUCCESS;
    return seedResponse;
};
// 返回挖矿结果
// #[rpc=rpcServer]
exports.mining_result = function (result) {
    console.log('!!!!!!!!!!!!!!mining_result in');
    var miningResponse = new item_s_1.MiningResponse();
    var count = result.hit;
    // 10s内点击次数超过设定上限
    if (count > constant_1.MAX_HUMAN_HITS) {
        miningResponse.resultNum = errorNum_1.ARE_YOU_SUPERMAN;
        return miningResponse;
    }
    var itemType = result.itemType;
    if (user_item_r_1.get_item(itemType).value.count === 0) {
        miningResponse.resultNum = errorNum_1.MINE_NOT_ENOUGH;
        return miningResponse;
    }
    var mineNum = result.mineNum;
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var seedBucket = new db_1.Bucket(constant_1.MEMORY_NAME, item_s_1.MineSeed._$info.name, dbMgr);
    var uid = user_r_1.getUid();
    var todayMineNum = exports.get_todayMineNum();
    // 当日已达最大挖矿数量
    // if (todayMineNum.mineNum >= MAX_ONEDAY_MINING) {
    //     miningResponse.resultNum = MINENUM_OVER_LIMIT;
    //     return miningResponse;
    // }
    var seedAndHoe = seedBucket.get(uid)[0];
    if (!seedAndHoe) {
        miningResponse.resultNum = errorNum_1.GET_RANDSEED_FAIL;
        return miningResponse;
    }
    var seed = seedAndHoe.seed;
    var hoeType = seedAndHoe.hoeType;
    var sumHits = 0;
    for (var i = 0; i < count; i++) {
        var randomMgr = new randomSeedMgr_1.RandomSeedMgr(seed);
        var hit = mining_util_1.doMining(hoeType, randomMgr);
        sumHits = sumHits + hit;
        seed = randomSeedMgr_1.RandomSeedMgr.randNumber(seed);
    }
    var leftHp = item_util_r_1.reduce_mine(itemType, mineNum, sumHits);
    if (!leftHp && leftHp !== 0) {
        console.log('!!!!!!!!!!!!!!leftHp:', leftHp);
        miningResponse.resultNum = errorNum_1.MINE_NOT_EXIST;
        return miningResponse;
    }
    if (leftHp > 0) {
        miningResponse.leftHp = leftHp;
    } else {
        miningResponse.leftHp = 0; // 当前矿山血量小于等于0时，添加奖励
        var v = [];
        var _randomMgr = new randomSeedMgr_1.RandomSeedMgr(seed);
        var mineType = itemType;
        var pid = mining_util_1.get_cfgAwardid(mineType); // 权重配置主键
        award_t_1.doAward(pid, _randomMgr, v);
        console.log('award result!!!!!!!!!!!!!!!!!:', v);
        var itemNum = v[0][0];
        console.log('itemNum!!!!!!!!!!!!!!!!!:', itemNum);
        var itemCount = v[0][1];
        var item = item_util_r_1.add_itemCount(uid, itemNum, itemCount);
        var awards = [];
        awards.push(item);
        item_util_r_1.add_award(uid, itemNum, itemCount, constant_1.AWARD_SRC_MINE);
        if (itemNum === constant_1.KT_TYPE) mining_util_1.add_miningKTTotal(uid, itemCount); // 奖品为KT时添加挖矿获取KT总数
        // 挖开第一个矿山额外奖励
        var totalMiningNum = exports.get_totalminingNum(uid);
        if (totalMiningNum.total === 0) {
            var regularBucket = new db_1.Bucket(constant_1.MEMORY_NAME, awardCfg_s_1.RegularAwardCfg._$info.name, dbMgr);
            var firstAwardCfg = regularBucket.get(constant_1.FIRST_MINING_AWARD)[0];
            if (!firstAwardCfg) {
                miningResponse.resultNum = errorNum_1.CONFIG_ERROR;
                return miningResponse;
            }
            var firstAward = item_util_r_1.add_itemCount(uid, firstAwardCfg.prop, firstAwardCfg.num);
            item_util_r_1.add_award(uid, firstAwardCfg.prop, firstAwardCfg.num, constant_1.AWARD_SRC_MINE);
            awards.push(firstAward);
        }
        miningResponse.awards = awards;
        // 添加奖章
        item_util_r_1.mining_add_medal(uid, itemNum);
        // 用户挖矿数量+1
        todayMineNum.mineNum = todayMineNum.mineNum + 1;
        var mineNumBucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.TodayMineNum._$info.name, dbMgr);
        mineNumBucket.put(todayMineNum.id, todayMineNum);
        mining_util_1.add_miningTotal(uid);
        // 矿山数量为0时，添加矿山
        if (item_util_r_1.get_mine_total() === 0) {
            var mine = user_item_r_1.add_mine();
            miningResponse.mine = mine;
        }
    }
    miningResponse.resultNum = constant_1.RESULT_SUCCESS;
    return miningResponse;
};
// 签到奖励(连续登陆)
// export const get_loginAward = ():ItemResponse => {
//     const itemResponse = new ItemResponse();
//     const uid = getUid();
//     // 获取连续登陆天数
//     const daysRes = get_loginDays();
//     if (!daysRes) {
//         itemResponse.resultNum = DB_ERROR;
//         return itemResponse;
//     }
//     const days = daysRes.days;
//     const awardItem = seriesLogin_award(days);
//     if (!awardItem) {
//         itemResponse.resultNum = CONFIG_ERROR;
//         return itemResponse;
//     }
//     itemResponse.item = awardItem;
//     itemResponse.resultNum = RESULT_SUCCESS;
//     return itemResponse;
// };
// 查询用户当日挖矿山数量
// #[rpc=rpcServer]
exports.get_todayMineNum = function () {
    var uid = user_r_1.getUid();
    console.log('get_todayMineNum in!!!!!!!!!!!!!!!!!');
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.TodayMineNum._$info.name, dbMgr);
    var today = item_util_r_1.get_today();
    console.log('today:!!!!!!!!!!!!!!!!!', today);
    var id = uid + ":" + today;
    console.log('id:!!!!!!!!!!!!!!!!!', id);
    var todayMineNum = bucket.get(id)[0];
    if (!todayMineNum) {
        console.log('blanktodayMineNum:!!!!!!!!!!!!!!!!!', id);
        var blanktodayMineNum = new item_s_1.TodayMineNum();
        blanktodayMineNum.id = id;
        blanktodayMineNum.mineNum = 0;
        return blanktodayMineNum;
    } else {
        return todayMineNum;
    }
};
// 获取用户挖矿山总数
// #[rpc=rpcServer]
exports.get_totalminingNum = function (uid) {
    console.log('get_totalminingNum in!!!!!!!!!!!!!!!!!');
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.TotalMiningNum._$info.name, dbMgr);
    var totalMiningNum = bucket.get(uid)[0];
    if (!totalMiningNum) {
        var blanktotalMiningNum = new item_s_1.TotalMiningNum();
        blanktotalMiningNum.uid = uid;
        var openid = user_r_1.getOpenid();
        console.log('openid !!!!!!!!!!!!!!!!!', openid);
        blanktotalMiningNum.openid = openid;
        blanktotalMiningNum.total = 0;
        return blanktotalMiningNum;
    } else {
        return totalMiningNum;
    }
};
// 获取用户挖矿得到KT总数
// #[rpc=rpcServer]
exports.get_miningKTNum = function (uid) {
    console.log('get_miningKTNum in!!!!!!!!!!!!!!!!!');
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.MiningKTNum._$info.name, dbMgr);
    var miningKTNum = bucket.get(uid)[0];
    if (!miningKTNum) {
        var blankMiningKTNum = new item_s_1.MiningKTNum();
        blankMiningKTNum.uid = uid;
        var openid = user_r_1.getOpenid();
        console.log('openid !!!!!!!!!!!!!!!!!', openid);
        blankMiningKTNum.openid = openid;
        blankMiningKTNum.total = 0;
        return blankMiningKTNum;
    } else {
        return miningKTNum;
    }
};
// 挖矿得到KT排行
// #[rpc=rpcServer]
exports.get_miningKTTop = function (topNum) {
    console.log('get_miningTop in!!!!!!!!!!!!!!!!!');
    var uid = user_r_1.getUid();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var mapbucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.MiningKTMapTab._$info.name, dbMgr);
    var iter = mapbucket.iter(null, true);
    var mineTop = new item_s_1.MineKTTop();
    mineTop.myKTNum = exports.get_miningKTNum(uid).total;
    mineTop.myMedal = user_item_r_1.get_showMedal(uid).medalType;
    var mineTopList = [];
    for (var i = 0; i < topNum; i++) {
        var iterEle = iter.nextElem();
        if (!iterEle) break;
        var mineKTMapTab = iterEle[1];
        console.log('elCfg----------------read---------------', mineKTMapTab);
        if (mineKTMapTab.miningKTMap.uid === uid) mineTop.myNum = i + 1;
        mineKTMapTab.medal = user_item_r_1.get_showMedal(mineKTMapTab.miningKTMap.uid).medalType;
        mineTopList.push(mineKTMapTab);
        console.log('mineTopList!!!!!!!!!!!!!!!!!', mineTopList);
        continue;
    }
    if (!mineTopList) {
        mineTop.resultNum = errorNum_1.TOP_DATA_FAIL;
        return mineTop;
    }
    if (!mineTop.myNum) mineTop.myNum = 0;
    mineTop.topList = mineTopList;
    mineTop.resultNum = constant_1.RESULT_SUCCESS;
    return mineTop;
};
// 挖矿总数排行
// #[rpc=rpcServer]
exports.get_miningTop = function (topNum) {
    console.log('get_miningTop in!!!!!!!!!!!!!!!!!');
    var uid = user_r_1.getUid();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var mapbucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.TotalMiningMap._$info.name, dbMgr);
    var iter = mapbucket.iter(null, true);
    var mineTop = new item_s_1.MineTop();
    var mineTopList = [];
    // const num = topQuery.top > iter._$getSinfo.length ? iter._$getSinfo.length : topQuery.top;
    for (var i = 0; i < topNum; i++) {
        var mineTotalMapEle = iter.nextElem();
        if (!mineTotalMapEle) break;
        var mineTotalMap = mineTotalMapEle[1];
        console.log('elCfg----------------read---------------', mineTotalMap);
        if (mineTotalMap.miningMap.uid === uid) mineTop.myNum = i + 1;
        mineTopList.push(mineTotalMap);
        console.log('mineTopList!!!!!!!!!!!!!!!!!', mineTopList);
        continue;
    }
    if (!mineTopList) {
        mineTop.resultNum = errorNum_1.TOP_DATA_FAIL;
        return mineTop;
    }
    if (!mineTop.myNum) mineTop.myNum = 0;
    mineTop.topList = mineTopList;
    mineTop.resultNum = constant_1.RESULT_SUCCESS;
    return mineTop;
};
})