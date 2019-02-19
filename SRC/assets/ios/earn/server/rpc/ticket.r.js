_$define("earn/server/rpc/ticket.r", function (require, exports, module){
"use strict";
/**
 * 奖券接口
 */

Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../../../pi/util/math");
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var db_1 = require("../../utils/db");
var awardCfg_s_1 = require("../../xlsx/awardCfg.s");
var constant_1 = require("../data/constant");
var item_s_1 = require("../data/db/item.s");
var errorNum_1 = require("../data/errorNum");
var award_t_1 = require("../util/award.t");
var item_util_r_1 = require("../util/item_util.r");
var oauth_lib_1 = require("../util/oauth_lib");
var randomSeedMgr_1 = require("../util/randomSeedMgr");
var itemQuery_s_1 = require("./itemQuery.s");
var user_r_1 = require("./user.r");
// 获取可领奖券的KT数
// #[rpc=rpcServer]
exports.get_ticket_KTNum = function () {
    console.log('get_ticket_KTNum!!!!!!!!!!!!!!!!!!!!');
    var uid = user_r_1.getUid();
    var kTQueryRes = new itemQuery_s_1.CoinQueryRes();
    kTQueryRes.itemType = constant_1.KT_TYPE;
    var walletKT = void 0;
    var openid = Number(user_r_1.getOpenid());
    var coinType = constant_1.KT_WALLET_TYPE;
    var r = oauth_lib_1.oauth_send(constant_1.WALLET_API_QUERY, { openid: openid, coinType: coinType });
    console.log('http response!!!!!!!!!!!!!!!!!!!!', r);
    if (r.ok) {
        var json = JSON.parse(r.ok);
        if (json.return_code === 1) {
            // 根据平台数据库存储的单位进行转换
            walletKT = json.balance * constant_1.KT_UNIT_NUM;
            console.log('http success walletKT!!!!!!!!!!!!!!!!!!!!', json.balance);
            var dbMgr = rpc_server_1.getEnv().getDbMgr();
            var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.UsedKT._$info.name, dbMgr);
            var usedKT = bucket.get(uid)[0];
            if (!usedKT) {
                var blank = new item_s_1.UsedKT();
                blank.uid = uid;
                blank.KTNum = 0;
                bucket.put(uid, blank);
                usedKT = blank;
            }
            var usefulKT = walletKT - usedKT.KTNum;
            kTQueryRes.num = usefulKT;
            console.log('kTQueryRes.KTNum!!!!!!!!!!!!!!!!!!!!', kTQueryRes.num);
        } else {
            kTQueryRes.resultNum = errorNum_1.REQUEST_WALLET_FAIL;
        }
    } else {
        kTQueryRes.resultNum = errorNum_1.REQUEST_WALLET_FAIL;
    }
    kTQueryRes.resultNum = constant_1.RESULT_SUCCESS;
    return kTQueryRes;
};
// 合成奖券
// #[rpc=rpcServer]
exports.ticket_compose = function (itemType) {
    var uid = user_r_1.getUid();
    console.log('ticket_compose!!!!!!!!!!!!!!!!!!!!', itemType);
    var randomMgr = new randomSeedMgr_1.RandomSeedMgr(math_1.randomInt(1, 10000));
    var tickeType = itemType;
    var pid = void 0;
    switch (tickeType) {
        case constant_1.SILVER_TICKET_TYPE:
            pid = constant_1.COMPOSE_GOLD_TICKET;
            break;
        case constant_1.GOLD_HOE_TYPE:
            pid = constant_1.COMPOSE_RAINBOW_TICKET;
            break;
        default:
            return;
    }
    if (!item_util_r_1.reduce_itemCount(itemType, constant_1.TICKET_COMPOSE_COUNT)) return;
    var v = [];
    award_t_1.doAward(pid, randomMgr, v);
    var count = v[0][1] - 1;
    console.log('count!!!!!!!!!!!!!!!!!!!!', count);
    var newitemType = v[0][0];
    return item_util_r_1.add_itemCount(uid, newitemType, count);
};
// 大转盘
// #[rpc=rpcServer]
exports.ticket_rotary = function (itemType) {
    console.log('ticket_rotary!!!!!!!!!!!!!!!!!!!!', itemType);
    var uid = user_r_1.getUid();
    var randomMgr = new randomSeedMgr_1.RandomSeedMgr(math_1.randomInt(1, 10000));
    var tickeType = itemType;
    var awardResponse = new item_s_1.AwardResponse();
    var pid = void 0;
    switch (tickeType) {
        case constant_1.SILVER_TICKET_TYPE:
            pid = constant_1.SILVER_TICKET_ROTARY;
            break;
        case constant_1.GOLD_TICKET_TYPE:
            pid = constant_1.GOLD_TICKET_ROTARY;
            break;
        case constant_1.RAINBOW_TICKET_TYPE:
            pid = constant_1.RAINBOW_TICKET_ROTARY;
            break;
        default:
            awardResponse.resultNum = errorNum_1.TICKET_TYPE_ERROR;
            return awardResponse;
    }
    console.log('pid!!!!!!!!!!!!!!!!!!!!', pid);
    if (!item_util_r_1.reduce_itemCount(itemType, constant_1.TICKET_ROTARY_COUNT)) {
        awardResponse.resultNum = errorNum_1.TICKET_NOT_ENOUGH;
        return awardResponse;
    }
    var v = [];
    award_t_1.doAward(pid, randomMgr, v);
    var count = v[0][1];
    var newitemType = v[0][0];
    item_util_r_1.add_itemCount(uid, newitemType, count);
    var award = item_util_r_1.add_award(uid, newitemType, count, constant_1.AWARD_SRC_ROTARY);
    if (!award) {
        awardResponse.resultNum = errorNum_1.DB_ERROR;
        return awardResponse;
    }
    awardResponse.resultNum = constant_1.RESULT_SUCCESS;
    awardResponse.award = award;
    return awardResponse;
};
// 奖券开宝箱
// #[rpc=rpcServer]
exports.ticket_treasurebox = function (itemType) {
    console.log('ticket_treasurebox!!!!!!!!!!!!!!!!!!!!', itemType);
    var uid = user_r_1.getUid();
    var randomMgr = new randomSeedMgr_1.RandomSeedMgr(math_1.randomInt(1, 10000));
    var tickeType = itemType;
    var awardResponse = new item_s_1.AwardResponse();
    var pid = void 0;
    switch (tickeType) {
        case constant_1.SILVER_TICKET_TYPE:
            pid = constant_1.SILVER_TICKET_TREASUREBOX;
            break;
        case constant_1.GOLD_TICKET_TYPE:
            pid = constant_1.GOLD_TICKET_TREASUREBOX;
            break;
        case constant_1.RAINBOW_TICKET_TYPE:
            pid = constant_1.RAINBOW_TICKET_TREASUREBOX;
            break;
        default:
            awardResponse.resultNum = errorNum_1.TICKET_TYPE_ERROR;
            return awardResponse;
    }
    console.log('pid!!!!!!!!!!!!!!!!!!!!', pid);
    if (!item_util_r_1.reduce_itemCount(itemType, constant_1.TICKET_ROTARY_COUNT)) {
        awardResponse.resultNum = errorNum_1.TICKET_NOT_ENOUGH;
        return awardResponse;
    }
    var v = [];
    award_t_1.doAward(pid, randomMgr, v);
    var count = v[0][1];
    var newitemType = v[0][0];
    item_util_r_1.add_itemCount(uid, newitemType, count);
    var award = item_util_r_1.add_award(uid, newitemType, count, constant_1.AWARD_SRC_TREASUREBOX);
    if (!award) {
        awardResponse.resultNum = errorNum_1.DB_ERROR;
        return awardResponse;
    }
    awardResponse.resultNum = constant_1.RESULT_SUCCESS;
    awardResponse.award = award;
    return awardResponse;
};
// 奖券兑换
// #[rpc=rpcServer]
exports.ticket_convert = function (awardType) {
    var uid = user_r_1.getUid();
    var awardResponse = new item_s_1.AwardResponse();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.MEMORY_NAME, awardCfg_s_1.TicketConvertCfg._$info.name, dbMgr);
    var convertCfg = bucket.get(awardType)[0];
    // 从配置中获取具体兑换信息
    if (!convertCfg) {
        awardResponse.resultNum = errorNum_1.DB_ERROR;
        return awardResponse;
    }
    var silverTicketCount = convertCfg.count[0];
    var goldTicketCount = convertCfg.count[1];
    var rainbowTicketCount = convertCfg.count[2];
    var desc = convertCfg.desc;
    if (silverTicketCount !== 0) {
        if (!item_util_r_1.reduce_itemCount(constant_1.SILVER_TICKET_TYPE, silverTicketCount)) {
            awardResponse.resultNum = errorNum_1.TICKET_NOT_ENOUGH;
            return awardResponse;
        }
    }
    if (goldTicketCount !== 0) {
        if (!item_util_r_1.reduce_itemCount(constant_1.GOLD_TICKET_TYPE, goldTicketCount)) {
            awardResponse.resultNum = errorNum_1.TICKET_NOT_ENOUGH;
            return awardResponse;
        }
    }
    if (rainbowTicketCount !== 0) {
        if (!item_util_r_1.reduce_itemCount(constant_1.RAINBOW_TICKET_TYPE, rainbowTicketCount)) {
            awardResponse.resultNum = errorNum_1.TICKET_NOT_ENOUGH;
            return awardResponse;
        }
    }
    var convertBucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.ConvertTab._$info.name, dbMgr);
    // 从数据库获取兑换码
    var iter = convertBucket.iter(null);
    var convertAward = void 0;
    do {
        var iterConvert = iter.nextElem();
        console.log('elCfg----------------read---------------', iterConvert);
        if (!iterConvert) {
            awardResponse.resultNum = errorNum_1.AWARD_NOT_ENOUGH;
            return awardResponse;
        }
        var convertTab = iterConvert[1];
        if (convertTab.typeNum === awardType && convertTab.state === true) {
            convertAward = convertTab;
            break;
        }
    } while (iter);
    var award = item_util_r_1.add_award(uid, awardType, convertCfg.num, constant_1.AWARD_SRC_CONVERT, convertAward.convert, desc);
    if (!award) {
        awardResponse.resultNum = errorNum_1.DB_ERROR;
        return awardResponse;
    }
    // 已发出的兑换码数据库状态改为false
    convertAward.state = false;
    convertBucket.put(convertAward.id, convertAward);
    awardResponse.award = award;
    awardResponse.resultNum = constant_1.RESULT_SUCCESS;
    return awardResponse;
};
})