_$define("earn/server/rpc/stParties.r", function (require, exports, module){
"use strict";
/**
 * ST独立活动
 */

Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../../../pi/util/math");
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var db_1 = require("../../utils/db");
var constant_1 = require("../data/constant");
var guessing_s_1 = require("../data/db/guessing.s");
var item_s_1 = require("../data/db/item.s");
var stParties_s_1 = require("../data/db/stParties.s");
var errorNum_1 = require("../data/errorNum");
var guessingConstant_1 = require("../data/guessingConstant");
var award_t_1 = require("../util/award.t");
var item_util_r_1 = require("../util/item_util.r");
var oauth_lib_1 = require("../util/oauth_lib");
var randomSeedMgr_1 = require("../util/randomSeedMgr");
var itemQuery_s_1 = require("./itemQuery.s");
var user_r_1 = require("./user.r");
// 获取用户账户ST数量
// #[rpc=rpcServer]
exports.get_STNum = function () {
    var coinQueryRes = new itemQuery_s_1.CoinQueryRes();
    coinQueryRes.itemType = constant_1.ST_TYPE;
    var openid = Number(user_r_1.getOpenid());
    var coinType = constant_1.ST_WALLET_TYPE;
    var r = oauth_lib_1.oauth_send(constant_1.WALLET_API_QUERY, { openid: openid, coinType: coinType });
    console.log('http response!!!!!!!!!!!!!!!!!!!!', r);
    if (r.ok) {
        var json = JSON.parse(r.ok);
        if (json.return_code === 1) {
            // 根据平台数据库存储的单位进行转换
            var walletST = json.balance / constant_1.ST_UNIT_NUM;
            coinQueryRes.num = walletST;
            console.log('http success walletST!!!!!!!!!!!!!!!!!!!!', json.balance);
        } else {
            coinQueryRes.resultNum = errorNum_1.REQUEST_WALLET_FAIL;
        }
    } else {
        coinQueryRes.resultNum = errorNum_1.REQUEST_WALLET_FAIL;
    }
    coinQueryRes.resultNum = constant_1.RESULT_SUCCESS;
    return coinQueryRes;
};
// 获取用户账户KT数量
// #[rpc=rpcServer]
exports.get_KTNum = function () {
    var coinQueryRes = new itemQuery_s_1.CoinQueryRes();
    coinQueryRes.itemType = constant_1.KT_TYPE;
    var openid = Number(user_r_1.getOpenid());
    var coinType = constant_1.KT_WALLET_TYPE;
    var r = oauth_lib_1.oauth_send(constant_1.WALLET_API_QUERY, { openid: openid, coinType: coinType });
    console.log('http response!!!!!!!!!!!!!!!!!!!!', r);
    if (r.ok) {
        var json = JSON.parse(r.ok);
        if (json.return_code === 1) {
            // 根据平台数据库存储的单位进行转换
            var walletKT = json.balance / constant_1.KT_UNIT_NUM;
            coinQueryRes.num = walletKT;
        } else {
            coinQueryRes.resultNum = errorNum_1.REQUEST_WALLET_FAIL;
        }
    } else {
        coinQueryRes.resultNum = errorNum_1.REQUEST_WALLET_FAIL;
    }
    coinQueryRes.resultNum = constant_1.RESULT_SUCCESS;
    return coinQueryRes;
};
// ST转盘
// #[rpc=rpcServer]
exports.st_rotary = function (rotaryType) {
    var result = new guessing_s_1.Result();
    var uid = user_r_1.getUid();
    var randomMgr = new randomSeedMgr_1.RandomSeedMgr(math_1.randomInt(1, 10000));
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var stCount = void 0;
    var hasfree = false;
    switch (rotaryType) {
        case constant_1.LEVEL1_ROTARY_AWARD:
            stCount = constant_1.LEVEL1_ROTARY_STCOST;
            var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.FreePlay._$info.name, dbMgr);
            var freePlay = bucket.get(uid)[0]; // 获取是否还有免费的初级转盘次数
            if (!freePlay) break;
            hasfree = freePlay.freeRotary;
            freePlay.freeRotary = false;
            bucket.put(uid, freePlay);
            break;
        case constant_1.LEVEL2_ROTARY_AWARD:
            stCount = constant_1.LEVEL2_ROTARY_STCOST;
            break;
        case constant_1.LEVEL3_ROTARY_AWARD:
            stCount = constant_1.LEVEL3_ROTARY_STCOST;
            break;
        default:
            result.reslutCode = errorNum_1.ROTARY_TYPE_ERROR;
            return result;
    }
    if (hasfree === true) {
        // 如果有免费次数使用免费次数
        var v = [];
        award_t_1.doAward(rotaryType, randomMgr, v);
        var count = v[0][1];
        var newitemType = v[0][0];
        if (newitemType === constant_1.SURPRISE_BRO) {
            // 没有抽中奖品
            var time = new Date().valueOf().toString();
            var _award = new item_s_1.Award(constant_1.NO_AWARD_SORRY, newitemType, 1, uid, constant_1.AWARD_SRC_ROTARY, time);
            result.msg = JSON.stringify(_award);
            result.reslutCode = constant_1.RESULT_SUCCESS;
            return result;
        }
        item_util_r_1.add_itemCount(uid, newitemType, count);
        var award = item_util_r_1.add_award(uid, newitemType, count, constant_1.AWARD_SRC_ROTARY);
        if (!award) {
            result.reslutCode = errorNum_1.DB_ERROR;
            return result;
        }
        result.msg = JSON.stringify(award);
        result.reslutCode = constant_1.RESULT_SUCCESS;
        return result;
    } else {
        // 没有免费次数则向钱包下单
        // 生成订单
        var _time = new Date().valueOf();
        var oid = "" + _time + uid + math_1.randomInt(10000, 99999);
        var orderBucket = new db_1.Bucket(constant_1.WARE_NAME, stParties_s_1.RotaryOrder._$info.name, dbMgr);
        var order = new stParties_s_1.RotaryOrder(oid, uid, rotaryType, stCount, _time.toString(), guessingConstant_1.NOT_PAY_YET);
        orderBucket.put(oid, order);
        var resultJson = oauth_lib_1.wallet_unifiedorder(oid, stCount, 'Rotary');
        if (!resultJson) {
            result.reslutCode = errorNum_1.UNIFIEDORDER_API_FAILD;
            return result;
        }
        // 是否是第一次购买
        var userOrderBucket = new db_1.Bucket(constant_1.WARE_NAME, stParties_s_1.UserRotaryOrderTab._$info.name, dbMgr);
        var userRotaryOrderTab = userOrderBucket.get(uid)[0];
        if (!userRotaryOrderTab) {
            resultJson.isFirst = 1;
        } else {
            resultJson.isFirst = 0;
        }
        resultJson.oid = oid;
        console.log('resultJson!!!!!!!!!!', resultJson);
        result.msg = JSON.stringify(resultJson);
        result.reslutCode = constant_1.RESULT_SUCCESS;
        return result;
    }
};
// 转盘支付查询
// #[rpc=rpcServer]
exports.rotary_pay_query = function (oid) {
    console.log('guessing_pay_query in!!!!!!!!!!!!');
    var uid = user_r_1.getUid();
    var result = new guessing_s_1.Result();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var orderBucket = new db_1.Bucket(constant_1.WARE_NAME, stParties_s_1.RotaryOrder._$info.name, dbMgr);
    var order = orderBucket.get(oid)[0];
    if (!order) {
        result.reslutCode = errorNum_1.ORDER_NOT_EXIST;
        return result;
    }
    // 向钱包服务器查询订单
    var resultJson = oauth_lib_1.wallet_order_query(oid);
    if (resultJson.pay_status !== 'success') {
        console.log('resultJson.pay_status!!!!!!!!!!', resultJson.pay_status);
        result.reslutCode = errorNum_1.GET_ORDERINFO_FAILD;
        return result;
    }
    // 支付成功 更新订单信息
    order.state = guessingConstant_1.BILL_ALREADY_PAY;
    orderBucket.put(oid, order);
    var userOrderBucket = new db_1.Bucket(constant_1.WARE_NAME, stParties_s_1.UserRotaryOrderTab._$info.name, dbMgr);
    var userRotaryOrderTab = userOrderBucket.get(uid)[0];
    if (!userRotaryOrderTab) {
        userRotaryOrderTab = new stParties_s_1.UserRotaryOrderTab(uid, []);
    }
    userRotaryOrderTab.oidList.push(oid);
    userOrderBucket.put(uid, userRotaryOrderTab);
    var rotaryType = order.rotatyType;
    var randomMgr = new randomSeedMgr_1.RandomSeedMgr(math_1.randomInt(1, 10000));
    var v = [];
    award_t_1.doAward(rotaryType, randomMgr, v);
    var count = v[0][1];
    var newitemType = v[0][0];
    if (newitemType === constant_1.SURPRISE_BRO) {
        // 没有抽中奖品
        var time = new Date().valueOf().toString();
        var award = new item_s_1.Award(constant_1.NO_AWARD_SORRY, newitemType, 1, uid, constant_1.AWARD_SRC_ROTARY, time);
        result.msg = JSON.stringify(award);
        result.reslutCode = constant_1.RESULT_SUCCESS;
        return result;
    }
    var convertInfo = exports.get_convert_info(newitemType);
    if (!convertInfo) {
        // 判断奖品是否为虚拟兑换类奖品
        item_util_r_1.add_itemCount(uid, newitemType, count); // 不是可兑换奖品 作为普通物品添加
        var _award2 = item_util_r_1.add_award(uid, newitemType, count, constant_1.AWARD_SRC_ROTARY);
        if (!_award2) {
            result.reslutCode = errorNum_1.DB_ERROR;
            return result;
        }
        result.msg = JSON.stringify(_award2);
        result.reslutCode = constant_1.RESULT_SUCCESS;
        return result;
    } else {
        // 是可兑换奖品 添加兑换码
        var convertAward = exports.get_convert(newitemType);
        if (!convertAward) {
            result.reslutCode = errorNum_1.AWARD_NOT_ENOUGH;
            return result;
        }
        var _award3 = item_util_r_1.add_award(uid, newitemType, count, constant_1.AWARD_SRC_ROTARY, convertAward.convert, convertInfo.name);
        if (!_award3) {
            result.reslutCode = errorNum_1.DB_ERROR;
            return result;
        }
        result.msg = JSON.stringify(_award3);
        result.reslutCode = constant_1.RESULT_SUCCESS;
        return result;
    }
};
// ST开宝箱
// #[rpc=rpcServer]
exports.st_treasurebox = function (treasureboxType) {
    console.log('st_treasurebox in!!!!!!!!!!!!', treasureboxType);
    var result = new guessing_s_1.Result();
    var uid = user_r_1.getUid();
    var randomMgr = new randomSeedMgr_1.RandomSeedMgr(math_1.randomInt(1, 10000));
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var stCount = void 0;
    var hasfree = false;
    switch (treasureboxType) {
        case constant_1.LEVEL1_TREASUREBOX_AWARD:
            stCount = constant_1.LEVEL1_TREASUREBOX_STCOST;
            var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.FreePlay._$info.name, dbMgr);
            var freePlay = bucket.get(uid)[0]; // 获取是否还有免费的初级转盘次数
            if (!freePlay) break;
            hasfree = freePlay.freeBox;
            freePlay.freeBox = false;
            bucket.put(uid, freePlay);
            break;
        case constant_1.LEVEL2_TREASUREBOX_AWARD:
            stCount = constant_1.LEVEL2_TREASUREBOX_STCOST;
            break;
        case constant_1.LEVEL3_TREASUREBOX_AWARD:
            stCount = constant_1.LEVEL3_TREASUREBOX_STCOST;
            break;
        default:
            result.reslutCode = errorNum_1.TREASUREBOX_TYPE_ERROR;
            return result;
    }
    if (hasfree === true) {
        // 如果有免费次数使用免费次数
        var v = [];
        award_t_1.doAward(treasureboxType, randomMgr, v);
        var count = v[0][1];
        var newitemType = v[0][0];
        if (newitemType === constant_1.SURPRISE_BRO) {
            // 没有抽中奖品
            var time = new Date().valueOf().toString();
            var _award4 = new item_s_1.Award(constant_1.NO_AWARD_SORRY, newitemType, 1, uid, constant_1.AWARD_SRC_TREASUREBOX, time);
            result.msg = JSON.stringify(_award4);
            result.reslutCode = constant_1.RESULT_SUCCESS;
            return result;
        }
        item_util_r_1.add_itemCount(uid, newitemType, count);
        var award = item_util_r_1.add_award(uid, newitemType, count, constant_1.AWARD_SRC_TREASUREBOX);
        if (!award) {
            result.reslutCode = errorNum_1.DB_ERROR;
            return result;
        }
        result.msg = JSON.stringify(award);
        result.reslutCode = constant_1.RESULT_SUCCESS;
        return result;
    } else {
        // 没有免费次数则向钱包下单
        // 生成订单
        var _time2 = new Date().valueOf();
        var oid = "" + _time2 + uid + math_1.randomInt(10000, 99999);
        var orderBucket = new db_1.Bucket(constant_1.WARE_NAME, stParties_s_1.BoxOrder._$info.name, dbMgr);
        var order = new stParties_s_1.BoxOrder(oid, uid, treasureboxType, stCount, _time2.toString(), guessingConstant_1.NOT_PAY_YET);
        orderBucket.put(oid, order);
        var resultJson = oauth_lib_1.wallet_unifiedorder(oid, stCount, 'TreasureBox');
        if (!resultJson) {
            result.reslutCode = errorNum_1.UNIFIEDORDER_API_FAILD;
            return result;
        }
        // 是否是第一次购买
        var userOrderBucket = new db_1.Bucket(constant_1.WARE_NAME, stParties_s_1.UserBoxOrderTab._$info.name, dbMgr);
        var userBoxOrderTab = userOrderBucket.get(uid)[0];
        if (!userBoxOrderTab) {
            resultJson.isFirst = 1;
        } else {
            resultJson.isFirst = 0;
        }
        resultJson.oid = oid;
        console.log('resultJson!!!!!!!!!!', resultJson);
        result.msg = JSON.stringify(resultJson);
        result.reslutCode = constant_1.RESULT_SUCCESS;
        return result;
    }
};
// 宝箱支付查询
// #[rpc=rpcServer]
exports.box_pay_query = function (oid) {
    console.log('guessing_pay_query in!!!!!!!!!!!!');
    var uid = user_r_1.getUid();
    var result = new guessing_s_1.Result();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var orderBucket = new db_1.Bucket(constant_1.WARE_NAME, stParties_s_1.BoxOrder._$info.name, dbMgr);
    var order = orderBucket.get(oid)[0];
    if (!order) {
        result.reslutCode = errorNum_1.ORDER_NOT_EXIST;
        return result;
    }
    // 向钱包服务器查询订单
    var resultJson = oauth_lib_1.wallet_order_query(oid);
    if (resultJson.pay_status !== 'success') {
        console.log('resultJson.pay_status!!!!!!!!!!', resultJson.pay_status);
        result.reslutCode = errorNum_1.GET_ORDERINFO_FAILD;
        return result;
    }
    // 支付成功 更新订单信息
    order.state = guessingConstant_1.BILL_ALREADY_PAY;
    orderBucket.put(oid, order);
    var userOrderBucket = new db_1.Bucket(constant_1.WARE_NAME, stParties_s_1.UserBoxOrderTab._$info.name, dbMgr);
    var userBoxOrderTab = userOrderBucket.get(uid)[0];
    if (!userBoxOrderTab) {
        userBoxOrderTab = new stParties_s_1.UserBoxOrderTab(uid, []);
    }
    userBoxOrderTab.oidList.push(oid);
    userOrderBucket.put(uid, userBoxOrderTab);
    var rotaryType = order.boxType;
    var randomMgr = new randomSeedMgr_1.RandomSeedMgr(math_1.randomInt(1, 10000));
    var v = [];
    award_t_1.doAward(rotaryType, randomMgr, v);
    var count = v[0][1];
    var newitemType = v[0][0];
    if (newitemType === constant_1.SURPRISE_BRO) {
        // 没有抽中奖品
        var time = new Date().valueOf().toString();
        var award = new item_s_1.Award(constant_1.NO_AWARD_SORRY, newitemType, 1, uid, constant_1.AWARD_SRC_TREASUREBOX, time);
        result.msg = JSON.stringify(award);
        result.reslutCode = constant_1.RESULT_SUCCESS;
        return result;
    }
    var convertInfo = exports.get_convert_info(newitemType);
    if (!convertInfo) {
        // 判断奖品是否为虚拟兑换类奖品
        item_util_r_1.add_itemCount(uid, newitemType, count); // 不是可兑换奖品 作为普通物品添加
        var _award5 = item_util_r_1.add_award(uid, newitemType, count, constant_1.AWARD_SRC_TREASUREBOX);
        if (!_award5) {
            result.reslutCode = errorNum_1.DB_ERROR;
            return result;
        }
        result.msg = JSON.stringify(_award5);
        result.reslutCode = constant_1.RESULT_SUCCESS;
        return result;
    } else {
        // 是可兑换奖品 添加兑换码
        var convertAward = exports.get_convert(newitemType);
        if (!convertAward) {
            result.reslutCode = errorNum_1.AWARD_NOT_ENOUGH;
            return result;
        }
        var _award6 = item_util_r_1.add_award(uid, newitemType, count, constant_1.AWARD_SRC_TREASUREBOX, convertAward.convert, convertInfo.name);
        if (!_award6) {
            result.reslutCode = errorNum_1.DB_ERROR;
            return result;
        }
        result.msg = JSON.stringify(_award6);
        result.reslutCode = constant_1.RESULT_SUCCESS;
        return result;
    }
};
// 查看兑换列表
// #[rpc=rpcServer]
exports.get_convert_list = function () {
    var result = new guessing_s_1.Result();
    var convertAwardList = new item_s_1.ConvertAwardList();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.ProductInfo._$info.name, dbMgr);
    var iter = bucket.iter(null);
    var list = [];
    do {
        var iterConvert = iter.nextElem();
        console.log('elCfg----------------read---------------', iterConvert);
        if (!iterConvert) {
            break;
        }
        var stConvertCfg = iterConvert[1];
        list.push(stConvertCfg);
    } while (iter);
    convertAwardList.list = list;
    result.reslutCode = constant_1.RESULT_SUCCESS;
    result.msg = JSON.stringify(convertAwardList);
    return result;
};
// ST兑换
// #[rpc=rpcServer]
exports.st_convert = function (awardType) {
    var uid = user_r_1.getUid();
    var awardResponse = new item_s_1.AwardResponse();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.MEMORY_NAME, item_s_1.ProductInfo._$info.name, dbMgr);
    var convertCfg = bucket.get(awardType)[0];
    // 从配置中获取具体兑换信息
    if (!convertCfg) {
        awardResponse.resultNum = errorNum_1.DB_ERROR;
        return awardResponse;
    }
    var stCount = convertCfg.stCount;
    var desc = convertCfg.desc;
    // 扣除相应ST
    if (!item_util_r_1.reduce_itemCount(constant_1.ST_TYPE, stCount)) {
        awardResponse.resultNum = errorNum_1.ST_NOT_ENOUGH;
        return awardResponse;
    }
    // 从数据库获取兑换码
    var convertAward = exports.get_convert(awardType);
    if (!convertAward) {
        awardResponse.resultNum = errorNum_1.AWARD_NOT_ENOUGH;
        return awardResponse;
    }
    convertCfg.leftCount -= 1;
    convertCfg.convertCount += 1;
    bucket.put(awardType, convertCfg);
    var award = item_util_r_1.add_award(uid, awardType, convertCfg.stCount, constant_1.AWARD_SRC_CONVERT, convertAward.convert, desc, convertAward.deadTime);
    if (!award) {
        awardResponse.resultNum = errorNum_1.DB_ERROR;
        return awardResponse;
    }
    awardResponse.award = award;
    awardResponse.resultNum = constant_1.RESULT_SUCCESS;
    return awardResponse;
};
// 获取可兑换的虚拟物品信息
exports.get_convert_info = function (id) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.ProductInfo._$info.name, dbMgr);
    var iter = bucket.iter(null);
    do {
        var iterConvert = iter.nextElem();
        console.log('elCfg----------------read---------------', iterConvert);
        if (!iterConvert) {
            return;
        }
        var stConvertCfg = iterConvert[1];
        if (id === stConvertCfg.id) {
            return stConvertCfg;
        }
    } while (iter);
};
// 添加商品信息
// #[rpc=rpcServer]
exports.add_convert_info = function (convertAwardList) {
    console.log('add_convert_info in !!!!!!!!!!!!!!!!!!!!!!!', convertAwardList);
    var result = new guessing_s_1.Result();
    var productInfoList = convertAwardList.list;
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.ProductInfo._$info.name, dbMgr);
    for (var i = 0; i < productInfoList.length; i++) {
        var pid = productInfoList[i].id;
        console.log('pid !!!!!!!!!!!!!!!!!!!!!!!', pid);
        if (bucket.get(pid)[0]) {
            result.reslutCode = errorNum_1.PRODUCT_ALREADY_EXIST;
            return result;
        }
        productInfoList[i].leftCount = 0;
        productInfoList[i].convertCount = 0;
        bucket.put(pid, productInfoList[i]);
    }
    result.reslutCode = constant_1.RESULT_SUCCESS;
    return result;
};
// 修改商品信息
// #[rpc=rpcServer]
exports.modify_convert_info = function (product) {
    console.log('modify_convert_info in !!!!!!!!!!!!!!!!!!!!!!!', product);
    var result = new guessing_s_1.Result();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.ProductInfo._$info.name, dbMgr);
    var pid = product.id;
    console.log('pid !!!!!!!!!!!!!!!!!!!!!!!', pid);
    if (!bucket.get(pid)[0]) {
        result.reslutCode = errorNum_1.PRODUCT_NOT_EXIST;
        return result;
    }
    bucket.put(pid, product);
    result.reslutCode = constant_1.RESULT_SUCCESS;
    return result;
};
// 添加兑换码
// #[rpc=rpcServer]
exports.add_convert = function (addConvertList) {
    console.log('add_convert in !!!!!!!!!!!!!!!!!!!!!!!', addConvertList);
    var result = new guessing_s_1.Result();
    var addList = addConvertList.list;
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.ProductInfo._$info.name, dbMgr);
    var tabBucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.ConvertTab._$info.name, dbMgr);
    for (var i = 0; i < addList.length; i++) {
        var productInfo = bucket.get(addList[i].typeNum)[0];
        if (!productInfo) {
            result.reslutCode = errorNum_1.PRODUCT_NOT_EXIST;
            return result;
        }
        // const id = get_index_id(AWARD_SRC_CONVERT);
        if (tabBucket.get(addList[i].convert)[0]) {
            result.reslutCode = errorNum_1.CONVERT_ALREADY_EXIST;
            return result;
        }
        console.log('addList[i].convert!!!!!!!!!', tabBucket.get(addList[i].convert)[0]);
        var convertTab = new item_s_1.ConvertTab(addList[i].convert, addList[i].typeNum, true, addList[i].deadTime);
        tabBucket.put(addList[i].convert, convertTab);
        // 相应商品库存加1
        productInfo.leftCount += 1;
        console.log('add_leftCount!!!!!!!!!', productInfo.leftCount);
        bucket.put(addList[i].typeNum, productInfo);
    }
    result.reslutCode = constant_1.RESULT_SUCCESS;
    return result;
};
// 查询是否有初级转盘和宝箱免费次数
// #[rpc=rpcServer]
exports.get_hasFree = function () {
    var uid = user_r_1.getUid();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.FreePlay._$info.name, dbMgr);
    return bucket.get(uid)[0];
};
// 每日首次登陆添加一次免费初级转盘和宝箱次数
exports.add_free_rotary = function () {
    var uid = user_r_1.getUid();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.FreePlay._$info.name, dbMgr);
    var freePlay = new item_s_1.FreePlay();
    freePlay.uid = uid;
    freePlay.freeRotary = true;
    freePlay.freeBox = true;
    bucket.put(uid, freePlay);
};
// 从数据库获取兑换码
exports.get_convert = function (id) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var convertBucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.ConvertTab._$info.name, dbMgr);
    // 从数据库获取兑换码
    var iter = convertBucket.iter(null);
    var convertAward = void 0;
    do {
        var iterConvert = iter.nextElem();
        console.log('elCfg----------------read---------------', iterConvert);
        if (!iterConvert) {
            return;
        }
        var convertTab = iterConvert[1];
        if (convertTab.typeNum === id && convertTab.state === true) {
            convertAward = convertTab;
            break;
        }
    } while (iter);
    if (!convertAward) return;
    // 已发出的兑换码数据库状态改为false
    convertAward.state = false;
    convertBucket.put(convertAward.convert, convertAward);
    return convertAward;
};
})