_$define("earn/server/util/mining_util", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var db_1 = require("../../../pi_pt/db");
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var db_2 = require("../../utils/db");
var awardCfg_s_1 = require("../../xlsx/awardCfg.s");
var constant_1 = require("../data/constant");
var item_s_1 = require("../data/db/item.s");
var mining_r_1 = require("../rpc/mining.r");
var user_item_r_1 = require("../rpc/user_item.r");
var award_1 = require("./award");
// 处理挖矿单次事件(一次点击)
exports.doMining = function (hoeType, seedMgr) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var cfgs = [];
    var weights = [];
    var maxWeights = 0;
    db_1.read(dbMgr, function (tr) {
        var maxCount = 0;
        var pid = hoeType * 100 + 1;
        var iterCfg = db_1.iterDb(tr, constant_1.MEMORY_NAME, awardCfg_s_1.WeightMiningCfg._$info.name, pid, false, null);
        do {
            var elCfg = iterCfg.nextElem();
            // console.log('elCfg----------------read---------------', elCfg);
            if (!elCfg) return;
            var _cfg = elCfg[1];
            if (maxCount <= 0) maxCount = _cfg.count;
            cfgs.push(_cfg);
            maxWeights = _cfg.weight + maxWeights;
            weights.push(maxWeights);
            maxCount--;
        } while (maxCount > 0);
    });
    var i = award_1.getWeightIndex(weights, seedMgr.seed);
    var cfg = cfgs[i];
    var hits = void 0;
    hits = cfg.hits;
    return hits;
};
// 添加用户挖矿山总数
exports.add_miningTotal = function (uid) {
    console.log('add_miningTotal in!!!!!!!!!!!!!!!!!!!!!!!');
    var miningtotal = mining_r_1.get_totalminingNum(uid);
    var miningMap = new item_s_1.MiningMap();
    miningMap.total = miningtotal.total;
    miningMap.uid = uid;
    console.log('miningMap !!!!!!!!!!!!!!!!!!!!!!!', miningMap);
    miningtotal.total = miningtotal.total + 1;
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_2.Bucket(constant_1.WARE_NAME, item_s_1.TotalMiningNum._$info.name, dbMgr);
    bucket.put(uid, miningtotal);
    var mapBucket = new db_2.Bucket(constant_1.WARE_NAME, item_s_1.TotalMiningMap._$info.name, dbMgr);
    console.log('miningtotal !!!!!!!!!!!!!!!!!!!!!!!', miningtotal);
    var totalMiningMap = mapBucket.get(miningMap)[0];
    if (!totalMiningMap) {
        console.log('blanktotalMiningMap in!!!!!!!!!!!!!!!!!!!!!!!', totalMiningMap);
        var blanktotalMiningMap = new item_s_1.TotalMiningMap();
        var blankminingMap = new item_s_1.MiningMap();
        blankminingMap.uid = uid;
        blankminingMap.total = 1;
        blanktotalMiningMap.miningMap = blankminingMap;
        blanktotalMiningMap.openid = miningtotal.openid;
        mapBucket.put(blankminingMap, blanktotalMiningMap);
    } else {
        mapBucket.delete(miningMap);
        miningMap.total = miningtotal.total;
        totalMiningMap.miningMap = miningMap;
        console.log('totalMiningMap write !!!!!!!!!!!!!!!!!!!!!!!', totalMiningMap);
        mapBucket.put(miningMap, totalMiningMap);
    }
};
// 添加挖矿获取KT总数
exports.add_miningKTTotal = function (uid, ktNum) {
    console.log('add_miningKTTotal in!!!!!!!!!!!!!!!!!!!!!!!');
    var miningKTTotal = mining_r_1.get_miningKTNum(uid);
    var miningKTMap = new item_s_1.MiningKTMap();
    miningKTMap.uid = uid;
    miningKTMap.ktNum = miningKTTotal.total;
    miningKTTotal.total = miningKTTotal.total + ktNum;
    miningKTTotal.medal = user_item_r_1.get_showMedal(uid).medalType;
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_2.Bucket(constant_1.WARE_NAME, item_s_1.MiningKTNum._$info.name, dbMgr);
    bucket.put(uid, miningKTTotal);
    var mapBucket = new db_2.Bucket(constant_1.WARE_NAME, item_s_1.MiningKTMapTab._$info.name, dbMgr);
    console.log('miningKTTotal !!!!!!!!!!!!!!!!!!!!!!!', miningKTTotal);
    var miningKTMapTab = mapBucket.get(miningKTMap)[0];
    if (!miningKTMapTab) {
        console.log('blankMiningMapTab in!!!!!!!!!!!!!!!!!!!!!!!', miningKTMapTab);
        var blankMiningMapTab = new item_s_1.MiningKTMapTab();
        var blankminingKTMap = new item_s_1.MiningKTMap();
        blankminingKTMap.uid = uid;
        blankminingKTMap.ktNum = ktNum;
        blankMiningMapTab.miningKTMap = blankminingKTMap;
        blankMiningMapTab.openid = miningKTTotal.openid;
        mapBucket.put(blankminingKTMap, blankMiningMapTab);
    } else {
        mapBucket.delete(miningKTMap);
        miningKTMap.ktNum = miningKTTotal.total;
        miningKTMapTab.medal = miningKTTotal.medal;
        miningKTMapTab.miningKTMap = miningKTMap;
        console.log('miningKTMapTab write !!!!!!!!!!!!!!!!!!!!!!!', miningKTMapTab);
        mapBucket.put(miningKTMap, miningKTMapTab);
    }
};
// 获取物品枚举编号
exports.get_enumType = function (itemType) {
    switch (itemType) {
        case constant_1.SMALL_MINE_TYPE:
            return constant_1.MINE_ENUM_NUM;
        case constant_1.MIDDLE_MINE_TYPE:
            return constant_1.MINE_ENUM_NUM;
        case constant_1.HUGE_MINE_TYPE:
            return constant_1.MINE_ENUM_NUM;
        case constant_1.IRON_HOE_TYPE:
            return constant_1.HOE_ENUM_NUM;
        case constant_1.GOLD_HOE_TYPE:
            return constant_1.HOE_ENUM_NUM;
        case constant_1.DIAMOND_HOE_TYPE:
            return constant_1.HOE_ENUM_NUM;
        case constant_1.BTC_TYPE:
            return constant_1.BTC_ENUM_NUM;
        case constant_1.ETH_TYPE:
            return constant_1.ETH_ENUM_NUM;
        case constant_1.ST_TYPE:
            return constant_1.ST_ENUM_NUM;
        case constant_1.KT_TYPE:
            return constant_1.KT_ENUM_NUM;
        case constant_1.SILVER_TICKET_TYPE:
            return constant_1.TICKET_ENUM_NUM;
        case constant_1.GOLD_TICKET_TYPE:
            return constant_1.TICKET_ENUM_NUM;
        case constant_1.RAINBOW_TICKET_TYPE:
            return constant_1.TICKET_ENUM_NUM;
        default:
            return;
    }
};
// 获取抽奖配置id
exports.get_cfgAwardid = function (itemType) {
    switch (itemType) {
        case constant_1.SMALL_MINE_TYPE:
            return constant_1.SMALL_MINE_TYPE_AWARD;
        case constant_1.MIDDLE_MINE_TYPE:
            return constant_1.MIDDLE_MINE_TYPE_AWARD;
        case constant_1.HUGE_MINE_TYPE:
            return constant_1.HUGE_MINE_TYPE_AWARD;
        default:
            return;
    }
};
})