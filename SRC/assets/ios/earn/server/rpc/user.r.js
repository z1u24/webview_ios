_$define("earn/server/rpc/user.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var db_1 = require("../../../pi_pt/db");
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var js_net_1 = require("../../../pi_pt/rust/pi_serv/js_net");
var db_2 = require("../../utils/db");
var CONSTANT = require("../data/constant");
var user_s_1 = require("../data/db/user.s");
var errorNum_1 = require("../data/errorNum");
var util_1 = require("../data/util");
var item_util_r_1 = require("../util/item_util.r");
var regularAward_1 = require("../util/regularAward");
var itemQuery_s_1 = require("./itemQuery.s");
var session_r_1 = require("./session.r");
var stParties_r_1 = require("./stParties.r");
var user_s_2 = require("./user.s");
// #[rpc=rpcServer]
exports.login = function (user) {
    console.log('new login!!!!!!!!!!!!!!!!!!!!!!user:', user);
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var userInfo = new user_s_1.UserInfo();
    var loginReq = new user_s_2.LoginReq();
    var openid = void 0;
    if (user.enum_type === user_s_2.UserType_Enum.WALLET) {
        var walletLoginReq = user.value;
        openid = walletLoginReq.openid;
        var sign = walletLoginReq.sign;
        // TODO 验证签名
        var userAccountBucket = new db_2.Bucket(CONSTANT.WARE_NAME, user_s_1.UserAcc._$info.name, dbMgr);
        var userAccountMapBucket = new db_2.Bucket(CONSTANT.WARE_NAME, user_s_1.UserAccMap._$info.name, dbMgr);
        console.log('------login-------', userAccountBucket.get(openid));
        var v = userAccountBucket.get(openid)[0];
        if (!v) {
            // 注册用户
            var uid = util_1.get_index_id(CONSTANT.INDEX_USER);
            var userAcc = new user_s_1.UserAcc();
            userAcc.uid = uid;
            userAcc.user = openid;
            userAccountBucket.put(openid, userAcc);
            var userAccMap = new user_s_1.UserAccMap(uid, openid);
            userAccountMapBucket.put(uid, userAccMap);
            loginReq.uid = uid;
        } else {
            loginReq.uid = v.uid;
        }
    } else {
        userInfo.uid = -1;
        userInfo.sex = 0;
        return userInfo;
    }
    var mqttServer = rpc_server_1.getEnv().getNativeObject('mqttServer');
    js_net_1.setMqttTopic(mqttServer, "send/" + loginReq.uid.toString(), true, true);
    // save session
    session_r_1.setSession('uid', loginReq.uid.toString(), loginReq.uid.toString());
    var session = rpc_server_1.getEnv().getSession();
    db_1.write(dbMgr, function (tr) {
        session.set(tr, 'uid', loginReq.uid.toString());
        session.set(tr, 'openid', openid);
    });
    // 添加到在线表
    exports.set_user_online(loginReq.uid, session.getId());
    // 判断是否首次登陆
    userInfo.loginCount = exports.get_totalLoginDays();
    if (userInfo.loginCount === 0) {
        // 添加首次登陆奖励
        regularAward_1.firstLogin_award();
    }
    // 判断是否当日首次登陆
    if (exports.isToday_firstLogin()) {
        console.log('is today first login!!!!!!!!!!!!!!!!!!!!!!!!');
        // 当日首次登陆赠送矿山
        regularAward_1.login_add_mine();
        // 当日首次登陆赠送一次免费初级转盘
        stParties_r_1.add_free_rotary();
        // 添加到每日登陆表
        exports.set_user_login(loginReq.uid);
        // 添加连续登陆奖励
        var days = exports.get_loginDays().days;
        regularAward_1.seriesLogin_award(days);
    }
    userInfo.uid = loginReq.uid;
    userInfo.sex = 0;
    console.log('userInfo!!!!!!!!!!!!!!!!!!!!!!!!', userInfo);
    return userInfo;
};
// 本地方法
// 设置在线信息
exports.set_user_online = function (uid, sessionId) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var onlineUsersBucket = new db_2.Bucket('memory', user_s_1.Online._$info.name, dbMgr);
    var onlineUsersMapBucket = new db_2.Bucket('memory', user_s_1.Online._$info.name, dbMgr);
    var online = new user_s_1.Online();
    online.uid = uid;
    online.session_id = sessionId;
    onlineUsersBucket.put(online.uid, online);
    var onlineMap = new user_s_1.OnlineMap();
    onlineMap.session_id = sessionId;
    onlineMap.uid = uid;
    onlineUsersMapBucket.put(onlineMap.session_id, onlineMap);
};
// 本地方法
// 获取用户登陆总天数
exports.get_totalLoginDays = function () {
    console.log('get_totalLoginDays in!!!!!!!!!!!!!!!!!!!!');
    var uid = exports.getUid();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var totalLoginBucket = new db_2.Bucket(CONSTANT.WARE_NAME, user_s_1.TotalLogin._$info.name, dbMgr);
    var totalLogin = totalLoginBucket.get(uid)[0];
    if (!totalLogin) {
        console.log('blank get_totalLoginDays in!!!!!!!!!!!!!!!!!!!!');
        totalLogin = new user_s_1.TotalLogin();
        totalLogin.uid = uid;
        totalLogin.days = 0;
        totalLoginBucket.put(uid, totalLogin);
    }
    return totalLogin.days;
};
// 本地方法
// 设置每日登陆信息
exports.set_user_login = function (uid) {
    console.log('set_user_login in !!!!!!!!!!!!!!!!!!!');
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var dayliLoginBucket = new db_2.Bucket(CONSTANT.WARE_NAME, user_s_1.DayliLogin._$info.name, dbMgr);
    var seriesLoginBucket = new db_2.Bucket(CONSTANT.WARE_NAME, user_s_1.SeriesLogin._$info.name, dbMgr);
    var totalLoginBucket = new db_2.Bucket(CONSTANT.WARE_NAME, user_s_1.TotalLogin._$info.name, dbMgr);
    var today = item_util_r_1.get_today();
    var dayliLoginKey = new user_s_1.DayliLoginKey();
    dayliLoginKey.uid = uid;
    dayliLoginKey.date = today;
    var totalLogin = new user_s_1.TotalLogin();
    totalLogin.uid = uid;
    totalLogin.days = exports.get_totalLoginDays() + 1;
    console.log('totalLogin.days !!!!!!!!!!!!!!!!!!!', totalLogin.days);
    totalLoginBucket.put(uid, totalLogin);
    // 增加连续登陆天数，验证昨天是否登陆，未登录重置为1
    var seriesLogin = seriesLoginBucket.get(uid)[0];
    if (!seriesLogin) {
        console.log('blankSeriesLogin in !!!!!!!!!!!!!!!!!!!');
        var blankSeriesLogin = new user_s_1.SeriesLogin();
        blankSeriesLogin.uid = uid;
        blankSeriesLogin.days = 1;
        seriesLoginBucket.put(uid, blankSeriesLogin);
    } else {
        dayliLoginKey.date = today - 1;
        if (!dayliLoginBucket.get(dayliLoginKey)) {
            seriesLogin.days = 1;
        } else {
            seriesLogin.days += 1;
        }
        seriesLoginBucket.put(uid, seriesLogin);
    }
};
// 本地方法
// 验证是否当日首次登陆
exports.isToday_firstLogin = function () {
    console.log('isToday_firstLogin in!!!!!!!!!!!!!!!!!!!!');
    var uid = exports.getUid();
    var today = item_util_r_1.get_today();
    console.log('today is :!!!!!!!!!!!!!!!!!!!!', today);
    var dayliLoginKey = new user_s_1.DayliLoginKey();
    dayliLoginKey.uid = uid;
    dayliLoginKey.date = today;
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var dayliLoginBucket = new db_2.Bucket(CONSTANT.WARE_NAME, user_s_1.DayliLogin._$info.name, dbMgr);
    var dayliLogin = dayliLoginBucket.get(dayliLoginKey)[0];
    if (!dayliLogin) {
        dayliLogin = new user_s_1.DayliLogin();
        dayliLogin.index = dayliLoginKey;
        dayliLogin.state = true;
        dayliLoginBucket.put(dayliLoginKey, dayliLogin);
        return true;
    }
    return false;
};
// 离线设置
// #[event=net_connect_close]
exports.close_connect = function (e) {
    var sessionId = e.connect_id;
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var onlineUsersBucket = new db_2.Bucket('memory', user_s_1.Online._$info.name, dbMgr);
    var onlineUsersMapBucket = new db_2.Bucket('memory', user_s_1.OnlineMap._$info.name, dbMgr);
    var r = onlineUsersMapBucket.get(sessionId)[0];
    if (r.uid !== -1) {
        onlineUsersMapBucket.delete(r.session_id);
        var onlineUser = onlineUsersBucket.get(r.uid)[0];
        if (onlineUser.session_id !== -1) {
            onlineUsersBucket.delete(r.uid);
        }
    }
};
// 获取连续登陆天数
// #[rpc=rpcServer]
exports.get_loginDays = function () {
    var uid = exports.getUid();
    var seriesDaysRes = new itemQuery_s_1.SeriesDaysRes();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var seriesLoginBucket = new db_2.Bucket(CONSTANT.WARE_NAME, user_s_1.SeriesLogin._$info.name, dbMgr);
    var seriesLogin = seriesLoginBucket.get(uid)[0];
    if (!seriesLogin) {
        seriesDaysRes.resultNum = errorNum_1.DB_ERROR;
        return seriesDaysRes;
    }
    seriesDaysRes.days = seriesLogin.days;
    seriesDaysRes.resultNum = CONSTANT.RESULT_SUCCESS;
    return seriesDaysRes;
};
// 获取用户信息
exports.get_userInfo = function (uid) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_2.Bucket(CONSTANT.WARE_NAME, user_s_1.UserInfo._$info.name, dbMgr);
    console.log('before get_uname!!!!!!!!!!!!!!!!!');
    return bucket.get(uid)[0];
};
// 获取uid
exports.getUid = function () {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var session = rpc_server_1.getEnv().getSession();
    var uid = void 0;
    db_1.read(dbMgr, function (tr) {
        uid = session.get(tr, 'uid');
    });
    return parseInt(uid, 10);
};
// 获取openid
exports.getOpenid = function () {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var session = rpc_server_1.getEnv().getSession();
    var openid = void 0;
    db_1.read(dbMgr, function (tr) {
        openid = session.get(tr, 'openid');
    });
    return openid;
};
})