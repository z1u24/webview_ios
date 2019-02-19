_$define("earn/server/rpc/guessingCompetition.r", function (require, exports, module){
"use strict";
/**
 * 竞猜
 */

Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../../../pi/util/math");
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var db_1 = require("../../utils/db");
var constant_1 = require("../data/constant");
var guessing_s_1 = require("../data/db/guessing.s");
var user_s_1 = require("../data/db/user.s");
var errorNum_1 = require("../data/errorNum");
var guessingConstant_1 = require("../data/guessingConstant");
var util_1 = require("../data/util");
var oauth_lib_1 = require("../util/oauth_lib");
var user_r_1 = require("./user.r");
// 获取主页面比赛信息
// #[rpc=rpcServer]
exports.get_main_competitions = function () {
    console.log('get_main_competitions in!!!!!!!!!!!!');
    var result = new guessing_s_1.Result();
    var mainPageList = [];
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.Competition._$info.name, dbMgr);
    var jackpotBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.CompJackpots._$info.name, dbMgr);
    var date = new Date().valueOf();
    var iter = bucket.iter(null, true);
    do {
        console.log('iterEle in!!!!!!!!!!!!');
        var iterEle = iter.nextElem();
        console.log('iterEle in!!!!!!!!!!!!', iterEle);
        if (!iterEle) break;
        var competition = iterEle[1];
        if (date - parseInt(competition.time, 10) > exports.get_oneday_ms() && competition.result !== 0) break;
        var mainPageComp = new guessing_s_1.MainPageComp();
        var jackpots = jackpotBucket.get(competition.cid)[0];
        console.log('jackpots in!!!!!!!!!!!!', jackpots);
        if (!jackpots) {
            result.reslutCode = errorNum_1.DB_ERROR;
            return result;
        }
        mainPageComp.comp = competition;
        // mainPageComp.team1num = jackpots.guessings1.length;
        // mainPageComp.team2num = jackpots.guessings2.length;
        mainPageComp.team1num = jackpots.jackpot1;
        mainPageComp.team2num = jackpots.jackpot2;
        mainPageList.push(mainPageComp);
    } while (iter);
    var mainPageCompList = new guessing_s_1.MainPageCompList();
    mainPageCompList.list = mainPageList;
    result.msg = JSON.stringify(mainPageCompList);
    result.reslutCode = constant_1.RESULT_SUCCESS;
    console.log('result in!!!!!!!!!!!!', result);
    return result;
};
// 获取竞猜奖池信息
// #[rpc=rpcServer]
exports.get_compJackpots = function (cid) {
    console.log('get_compJackpots in!!!!!!!!!!!!');
    var result = new guessing_s_1.Result();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.CompJackpots._$info.name, dbMgr);
    var jackpots = bucket.get(cid)[0];
    if (!jackpots) {
        result.reslutCode = errorNum_1.DB_ERROR;
        return result;
    }
    result.msg = JSON.stringify(jackpots);
    result.reslutCode = constant_1.RESULT_SUCCESS;
    return result;
};
// 竞猜投注
// #[rpc=rpcServer]
exports.start_guessing = function (guessingReq) {
    console.log('start_guessing in!!!!!!!!!!!!');
    var result = new guessing_s_1.Result();
    var cid = guessingReq.cid;
    var num = guessingReq.num;
    console.log('cid!!!!!!!!!!!!', cid);
    if (!num || num < guessingConstant_1.EACH_GUESSING_MIN || num > guessingConstant_1.EACH_GUESSING_LIMIT || num % guessingConstant_1.EACH_GUESSING_MIN !== 0) {
        result.reslutCode = errorNum_1.ST_NUM_ERROR;
        return result;
    }
    var teamSide = guessingReq.teamSide;
    var date = new Date().valueOf();
    var uid = user_r_1.getUid();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var compBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.Competition._$info.name, dbMgr);
    var competition = compBucket.get(cid)[0];
    if (!competition) {
        result.reslutCode = errorNum_1.COMPETITION_NOT_EXIST;
        return result;
    }
    // 验证该场比赛是否封盘
    if (date >= parseInt(competition.time, 10) || competition.result !== 0) {
        result.reslutCode = errorNum_1.COMPETITION_ALREADY_CLOSE;
        return result;
    }
    var guessingKey = new guessing_s_1.GuessingKey();
    guessingKey.uid = uid;
    guessingKey.cid = cid;
    // 验证用户单场比赛的竞猜金额是否达到上限
    var userGuessBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.UserGuessing._$info.name, dbMgr);
    var userGuessing = userGuessBucket.get(guessingKey)[0];
    if (!userGuessing) userGuessing = new guessing_s_1.UserGuessing(guessingKey, 0);
    userGuessing.total += num;
    if (userGuessing.total > guessingConstant_1.EACH_COMPETITION_LIMIT) {
        result.reslutCode = errorNum_1.GUESSINGNUM_BEYOUND_LIMIT;
        return result;
    }
    userGuessBucket.put(guessingKey, userGuessing);
    guessingKey.index = util_1.get_index_id("" + uid + cid);
    // 生成竞猜对象
    var guessingBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.Guessing._$info.name, dbMgr);
    var guessing = new guessing_s_1.Guessing(guessingKey, teamSide, null, num, null, date.toString());
    guessingBucket.put(guessingKey, guessing);
    // 生成订单
    var time = new Date().valueOf();
    var oid = "" + time + uid + math_1.randomInt(10000, 99999);
    var guessingOrderBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.GuessingOrder._$info.name, dbMgr);
    var guessingOrder = new guessing_s_1.GuessingOrder(oid, guessingKey, guessingConstant_1.NOT_PAY_YET);
    guessingOrderBucket.put(oid, guessingOrder);
    var resultJson = oauth_lib_1.wallet_unifiedorder(oid, num, 'LOL Guessing');
    if (!resultJson) {
        result.reslutCode = errorNum_1.UNIFIEDORDER_API_FAILD;
        return result;
    }
    // 是否是第一次购买
    var guessingKeyListBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.GuessingKeyList._$info.name, dbMgr);
    var guessingKeyList = guessingKeyListBucket.get(uid)[0];
    if (!guessingKeyList) {
        resultJson.isFirst = 1;
    } else {
        resultJson.isFirst = 0;
    }
    resultJson.oid = oid;
    console.log('resultJson!!!!!!!!!!', resultJson);
    result.msg = JSON.stringify(resultJson);
    result.reslutCode = constant_1.RESULT_SUCCESS;
    return result;
};
// 竞猜支付回调
// export const guessing_callback = () => {
// };
// 竞猜支付查询
// #[rpc=rpcServer]
exports.guessing_pay_query = function (oid) {
    console.log('guessing_pay_query in!!!!!!!!!!!!');
    var uid = user_r_1.getUid();
    var result = new guessing_s_1.Result();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var guessingOrderBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.GuessingOrder._$info.name, dbMgr);
    var guessingOrder = guessingOrderBucket.get(oid)[0];
    if (!guessingOrder) {
        result.reslutCode = errorNum_1.ORDER_NOT_EXIST;
        return result;
    }
    var guessingKey = guessingOrder.gid;
    var guessingBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.Guessing._$info.name, dbMgr);
    var guessing = guessingBucket.get(guessingKey)[0];
    if (!guessing) {
        result.reslutCode = errorNum_1.GUESSING_NOT_EXIST;
        return result;
    }
    var resultJson = oauth_lib_1.wallet_order_query(oid);
    if (resultJson.pay_status !== 'success') {
        console.log('resultJson.pay_status!!!!!!!!!!', resultJson.pay_status);
        result.reslutCode = errorNum_1.GET_ORDERINFO_FAILD;
        return result;
    }
    // 支付成功
    guessingOrder.state = guessingConstant_1.BILL_ALREADY_PAY;
    guessingOrderBucket.put(oid, guessingOrder);
    var num = guessing.num;
    // 获取该场比赛奖金池信息
    var jackpotsBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.CompJackpots._$info.name, dbMgr);
    var jackpots = jackpotsBucket.get(guessingKey.cid)[0];
    if (!jackpots) {
        result.reslutCode = errorNum_1.DB_ERROR;
        return result;
    }
    // 根据用户选择的队伍增加相应奖金池的数量
    var rate = void 0;
    var benefit = void 0;
    if (guessing.teamSide === guessingConstant_1.HOST_TEAM_NUM) {
        jackpots.jackpot1 += num;
        rate = jackpots.jackpot2 / jackpots.jackpot1 + 1;
        benefit = rate * num;
        jackpots.guessings1.push(guessingKey);
    }
    if (guessing.teamSide === guessingConstant_1.GUEST_TEAM_NUM) {
        jackpots.jackpot2 += num;
        rate = jackpots.jackpot1 / jackpots.jackpot2 + 1;
        benefit = rate * num;
        jackpots.guessings2.push(guessingKey);
    }
    jackpotsBucket.put(guessingKey.cid, jackpots);
    var guessingKeyListBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.GuessingKeyList._$info.name, dbMgr);
    var guessingKeyList = guessingKeyListBucket.get(uid)[0];
    if (!guessingKeyList) guessingKeyList = new guessing_s_1.GuessingKeyList(uid, []);
    guessingKeyList.list.push(guessingKey);
    guessingKeyListBucket.put(uid, guessingKeyList);
    // 更新竞猜信息
    guessing.rate = rate;
    guessing.benefit = benefit;
    guessingBucket.put(guessingKey, guessing);
    // 返回竞猜结果
    result.msg = JSON.stringify(guessing);
    result.reslutCode = constant_1.RESULT_SUCCESS;
    return result;
};
// 获取用户已参与的竞猜信息
// #[rpc=rpcServer]
exports.get_user_guessingInfo = function () {
    console.log('get_user_guessingInfo in!!!!!!!!!!!!');
    var result = new guessing_s_1.Result();
    var userGuessingList = new guessing_s_1.UserGuessingList();
    userGuessingList.list = [];
    var uid = user_r_1.getUid();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var compBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.Competition._$info.name, dbMgr);
    var jackpotBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.CompJackpots._$info.name, dbMgr);
    var guessingBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.Guessing._$info.name, dbMgr);
    var guessingKeyListBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.GuessingKeyList._$info.name, dbMgr);
    var guessingKeyList = guessingKeyListBucket.get(uid)[0];
    if (!guessingKeyList) {
        result.reslutCode = constant_1.RESULT_SUCCESS;
        result.msg = JSON.stringify(userGuessingList);
        return result;
    }
    console.log('guessingKeyList !!!!!!!!!!!!!', guessingKeyList);
    for (var i = guessingKeyList.list.length - 1; i >= 0; i--) {
        var guessingKey = guessingKeyList.list[i];
        console.log('guessingKey !!!!!!!!!!!!!', guessingKey);
        var cid = guessingKey.cid;
        var guessing = guessingBucket.get(guessingKey)[0];
        var competition = compBucket.get(cid)[0];
        var jackpots = jackpotBucket.get(cid)[0];
        // const team1num = jackpots.guessings1.length;
        // const team2num = jackpots.guessings2.length;
        var team1num = jackpots.jackpot1;
        var team2num = jackpots.jackpot2;
        var userGuessingInfo = new guessing_s_1.UserGuessingInfo(competition, team1num, team2num, guessing);
        userGuessingList.list.push(userGuessingInfo);
    }
    result.msg = JSON.stringify(userGuessingList);
    result.reslutCode = constant_1.RESULT_SUCCESS;
    return result;
};
// 获取可参与竞猜的比赛信息
// #[rpc=rpcServer]
exports.get_competitions = function (compType) {
    var competitionList = new guessing_s_1.CompetitionList();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.PreCompetitionList._$info.name, dbMgr);
    var preCompetitionList = bucket.get(compType)[0];
    if (!preCompetitionList) {
        competitionList.list = [];
        return competitionList;
    }
    var keyList = preCompetitionList.list;
    var CompetitionBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.Competition._$info.name, dbMgr);
    var list = CompetitionBucket.get(keyList);
    competitionList.list = list;
    return competitionList;
};
// 新增比赛
// #[rpc=rpcServer]
exports.add_competitions = function (addComp) {
    console.log('add_competitions in !!!!!!!!!!!!!!', addComp);
    var result = new guessing_s_1.Result();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.Competition._$info.name, dbMgr);
    var cid = util_1.get_index_id("competiton");
    var time = exports.get_timestamps(addComp.time).toString();
    console.log('time in !!!!!!!!!!!!!!', time);
    var competition = new guessing_s_1.Competition(cid, addComp.team1, addComp.team2, time, addComp.matchType, 0, 0);
    if (addComp.team1num > guessingConstant_1.INIT_JACKPOTS_MAX || addComp.team2num > guessingConstant_1.INIT_JACKPOTS_MAX) {
        result.reslutCode = errorNum_1.GUESSINGNUM_BEYOUND_LIMIT;
        return result;
    }
    var jackpotBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.CompJackpots._$info.name, dbMgr);
    var jackpots = new guessing_s_1.CompJackpots(cid, addComp.team1num, addComp.team2num, [], []);
    if (bucket.put(cid, competition) && jackpotBucket.put(cid, jackpots)) {
        result.reslutCode = constant_1.RESULT_SUCCESS;
    } else {
        result.reslutCode = errorNum_1.DB_ERROR;
    }
    return result;
};
// 输入比赛结果
// #[rpc=rpcServer]
exports.input_competition_result = function (compResult) {
    console.log('input_competition_result in !!!!!!!!!!!!!!', compResult);
    var result = new guessing_s_1.Result();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.Competition._$info.name, dbMgr);
    var competition = bucket.get(compResult.cid)[0];
    if (!competition) {
        result.reslutCode = errorNum_1.COMPETITION_NOT_EXIST;
        return result;
    }
    if (competition.result !== guessingConstant_1.RESULT_NOT_EXIST) {
        result.reslutCode = errorNum_1.COMPETITION_RESULT_EXIST;
        return result;
    }
    competition.result = compResult.result;
    bucket.put(compResult.cid, competition);
    result.reslutCode = constant_1.RESULT_SUCCESS;
    return result;
};
// 结算奖励
// #[rpc=rpcServer]
exports.settle_guessing_award = function (cid) {
    console.log('settle_guessing_award in', cid);
    var result = new guessing_s_1.Result();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.Competition._$info.name, dbMgr);
    var competition = bucket.get(cid)[0];
    if (!competition) {
        result.reslutCode = errorNum_1.COMPETITION_NOT_EXIST;
        return result;
    }
    if (competition.result === guessingConstant_1.RESULT_NOT_EXIST) {
        result.reslutCode = errorNum_1.COMPETITION_RESULT_NOT_EXIST;
        return result;
    }
    if (competition.state !== 0) {
        result.reslutCode = errorNum_1.GUESSING_ALREADY_SETTLED;
        return result;
    }
    // 开始结算 竞猜结算状态更新为结算中
    competition.state = guessingConstant_1.GUESSING_IS_SETTLING;
    bucket.put(cid, competition);
    var jackpotBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.CompJackpots._$info.name, dbMgr);
    var jackpots = jackpotBucket.get(cid)[0];
    if (!jackpots) {
        result.reslutCode = errorNum_1.DB_ERROR;
        return result;
    }
    var guessings = void 0;
    var loserguessings = void 0;
    var winnersJackpots = void 0;
    var losersJackpot = void 0;
    if (competition.result === guessingConstant_1.RESULT_TEAM1_WIN) {
        guessings = jackpots.guessings1;
        loserguessings = jackpots.guessings2;
        winnersJackpots = jackpots.jackpot1;
        losersJackpot = jackpots.jackpot2;
    }
    if (competition.result === guessingConstant_1.RESULT_TEAM2_WIN) {
        guessings = jackpots.guessings2;
        loserguessings = jackpots.guessings1;
        winnersJackpots = jackpots.jackpot2;
        losersJackpot = jackpots.jackpot1;
    }
    var guessingBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.Guessing._$info.name, dbMgr);
    for (var _iterator = guessings, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var guessingKey = _ref;

        var guessing = guessingBucket.get(guessingKey)[0];
        if (!guessing) continue;
        // 竞猜获胜的一方根据投注比例瓜分对方的奖金池
        var awardNum = Math.floor(guessing.num / winnersJackpots * losersJackpot + guessing.num);
        var uid = guessingKey.uid;
        var accountMapBucket = new db_1.Bucket(constant_1.WARE_NAME, user_s_1.UserAccMap._$info.name, dbMgr);
        var accountMap = accountMapBucket.get(uid)[0];
        if (!accountMap) continue;
        var openid = Number(accountMap.openid);
        // 向钱包发放奖励
        add_guessing_st(openid, awardNum);
        // 写入用户竞猜的实际收益
        guessing.benefit = awardNum;
        guessingBucket.put(guessingKey, guessing);
    }
    for (var _iterator2 = loserguessings, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
        }

        var loserguessingKey = _ref2;

        var _guessing = guessingBucket.get(loserguessingKey)[0];
        if (!_guessing) continue;
        // 写入用户竞猜的实际收益
        _guessing.benefit = 0;
        guessingBucket.put(loserguessingKey, _guessing);
    }
    // 竞猜结算状态更新为已结算
    competition.state = guessingConstant_1.GUESSING_HAS_SETTLED;
    bucket.put(cid, competition);
    result.reslutCode = constant_1.RESULT_SUCCESS;
    return result;
};
// 取消比赛 退还下注额
// #[rpc=rpcServer]
exports.cancle_guessing = function (cid) {
    console.log('settle_guessing_award in', cid);
    var result = new guessing_s_1.Result();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.Competition._$info.name, dbMgr);
    var competition = bucket.get(cid)[0];
    if (!competition) {
        result.reslutCode = errorNum_1.COMPETITION_NOT_EXIST;
        return result;
    }
    // 比赛已经结算 无法取消比赛
    if (competition.state !== guessingConstant_1.NOT_SETTLE_YET) {
        result.reslutCode = errorNum_1.GUESSING_ALREADY_SETTLED;
        return result;
    }
    // 开始退还下注额 竞猜结算状态更新为结算中
    competition.state = guessingConstant_1.GUESSING_IS_SETTLING;
    bucket.put(cid, competition);
    var jackpotBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.CompJackpots._$info.name, dbMgr);
    var jackpots = jackpotBucket.get(cid)[0];
    if (!jackpots) {
        result.reslutCode = errorNum_1.DB_ERROR;
        return result;
    }
    var guessings = jackpots.guessings1.concat(jackpots.guessings2);
    // 退还下注额
    var guessingBucket = new db_1.Bucket(constant_1.WARE_NAME, guessing_s_1.Guessing._$info.name, dbMgr);
    for (var _iterator3 = guessings, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
        } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
        }

        var guessingKey = _ref3;

        var guessing = guessingBucket.get(guessingKey)[0];
        if (!guessing) continue;
        var uid = guessingKey.uid;
        var accountMapBucket = new db_1.Bucket(constant_1.WARE_NAME, user_s_1.UserAccMap._$info.name, dbMgr);
        var accountMap = accountMapBucket.get(uid)[0];
        if (!accountMap) continue;
        var openid = Number(accountMap.openid);
        // 向钱包退还下注额
        add_guessing_st(openid, guessing.num);
        // 写入用户竞猜的实际收益
        guessing.rate = 1;
        guessing.benefit = guessing.num;
        guessingBucket.put(guessingKey, guessing);
    }
    // 更新竞猜结果和结算状态
    competition.result = guessingConstant_1.COMPETITION_HAS_CANCLED;
    competition.state = guessingConstant_1.GUESSING_HAS_SETTLED;
    bucket.put(cid, competition);
    result.reslutCode = constant_1.RESULT_SUCCESS;
    return result;
};
// 获取一天的毫秒数
exports.get_oneday_ms = function () {
    return 1000 * 60 * 60 * 24;
};
// 时间戳转换
exports.get_timestamps = function (timeStr) {
    return new Date(timeStr).valueOf() - 28800000;
};
// 向钱包账户添加竞猜奖励的ST
var add_guessing_st = function add_guessing_st(openid, stnum) {
    var coinType = constant_1.ST_WALLET_TYPE;
    var num = (stnum * constant_1.ST_UNIT_NUM).toString();
    var time = new Date().valueOf();
    var oid = "" + time + openid + math_1.randomInt(10000, 99999);
    var r = oauth_lib_1.oauth_send(constant_1.WALLET_API_ALTER, { openid: openid, coinType: coinType, num: num, oid: oid });
    console.log('http response!!!!!!!!!!!!!!!!!!!!', r);
    if (r.ok) {
        var json = JSON.parse(r.ok);
        if (json.return_code === 1) {
            return json.num;
        } else {
            return;
        }
    } else {
        return;
    }
};
})