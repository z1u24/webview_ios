_$define("earn/server/util/regularAward", function (require, exports, module){
"use strict";
/**
 * 日常奖励
 */

Object.defineProperty(exports, "__esModule", { value: true });
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var db_1 = require("../../utils/db");
var awardCfg_s_1 = require("../../xlsx/awardCfg.s");
var constant_1 = require("../data/constant");
var item_s_1 = require("../data/db/item.s");
var user_r_1 = require("../rpc/user.r");
var user_item_r_1 = require("../rpc/user_item.r");
var item_util_r_1 = require("./item_util.r");
// 首次登陆奖励
exports.firstLogin_award = function () {
    console.log('firstLogin_award in !!!!!!!!!!!!!!!!!!!');
    var uid = user_r_1.getUid();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var cfgBucket = new db_1.Bucket(constant_1.MEMORY_NAME, awardCfg_s_1.RegularAwardCfg._$info.name, dbMgr);
    var cfgs = [];
    var items = [];
    var iter = cfgBucket.iter(constant_1.FIRST_LOGIN_AWARD);
    var maxCount = 0;
    do {
        var iterEle = iter.nextElem();
        if (!iterEle) return;
        console.log('elCfg----------------read---------------', iterEle);
        var regularCfg = iterEle[1];
        if (maxCount <= 0) maxCount = regularCfg.count;
        cfgs.push(regularCfg);
        maxCount--;
    } while (maxCount > 0);
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

        var cfg = _ref;

        var item = item_util_r_1.add_itemCount(uid, cfg.prop, cfg.num);
        item_util_r_1.add_award(uid, cfg.prop, cfg.num, constant_1.AWARD_SRC_LOGIN, null, cfg.desc);
        items.push(item);
    }
    var awards = new item_s_1.Items();
    awards.item = items;
    awards.uid = uid;
    return awards;
};
// 连续登陆奖励
exports.seriesLogin_award = function (days) {
    var uid = user_r_1.getUid();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var cfgBucket = new db_1.Bucket(constant_1.MEMORY_NAME, awardCfg_s_1.SeriesLoginAwardCfg._$info.name, dbMgr);
    var id = void 0;
    if (days <= constant_1.SERIES_LOGIN_CIRCLE) {
        id = days;
    } else {
        id = days % constant_1.SERIES_LOGIN_CIRCLE;
    }
    var awardCfg = cfgBucket.get(id)[0];
    if (!awardCfg) return;
    var item = item_util_r_1.add_itemCount(uid, awardCfg.prop, awardCfg.num);
    item_util_r_1.add_award(uid, awardCfg.prop, awardCfg.num, constant_1.AWARD_SRC_LOGIN, null, awardCfg.desc);
    return item;
};
/**
 * 添加邀请奖励
 * @param uid 邀请人uid
 * @param num 被邀请的人数
 */
exports.invite_award = function (uid, num) {
    console.log('invite_award in !!!!!!!!!!!!!!!!!!!!!!!!');
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var cfgBucket = new db_1.Bucket(constant_1.MEMORY_NAME, awardCfg_s_1.InviteAwardCfg._$info.name, dbMgr);
    var id = void 0;
    if (num <= constant_1.INVITE_AWARD_CIRCLE) {
        id = num;
    } else {
        var r = (num - constant_1.INVITE_AWARD_CIRCLE) % constant_1.INVITE_AWARD_CIRCLE_LENGTH;
        switch (r) {
            case 1:
                id = constant_1.INVITE_AWARD_CIRCLE_LEVEL1;
                break;
            case 2:
                id = constant_1.INVITE_AWARD_CIRCLE_LEVEL2;
                break;
            case 0:
                id = constant_1.INVITE_AWARD_CIRCLE_LEVEL3;
                break;
            default:
                return;
        }
    }
    var awardCfg = cfgBucket.get(id)[0];
    if (!awardCfg) return;
    // 发放奖励给邀请人
    item_util_r_1.add_itemCount(uid, awardCfg.prop, awardCfg.num);
    return item_util_r_1.add_award(uid, awardCfg.prop, awardCfg.num, constant_1.AWARD_SRC_INVITE, null, awardCfg.desc);
};
// 登陆赠送矿山
exports.login_add_mine = function () {
    if (item_util_r_1.get_mine_total() < constant_1.MAX_ONEDAY_MINING) {
        return user_item_r_1.add_mine();
    }
    return;
};
// export const invite_award = (iuid:number, num:number):Item => {
//     const uid = getUid();
//     const dbMgr = getEnv().getDbMgr();
//     const cfgBucket = new Bucket(MEMORY_NAME, InviteAwardCfg._$info.name, dbMgr);
//     let id;
//     if (num <= INVITE_AWARD_CIRCLE) {
//         id = num;
//     } else {
//         const r = (num - INVITE_AWARD_CIRCLE) % INVITE_AWARD_CIRCLE_LENGTH;
//         switch (r) {
//             case 1:
//                 id = INVITE_AWARD_CIRCLE_LEVEL1;
//                 break;
//             case 2:
//                 id = INVITE_AWARD_CIRCLE_LEVEL2;
//                 break;
//             case 0:
//                 id = INVITE_AWARD_CIRCLE_LEVEL3;
//                 break;
//             default:
//                 return;
//         }
//     }
//     const awardCfg = cfgBucket.get<number, [InviteAwardCfg]>(id)[0];
//     if (!awardCfg) return;
//     // 发放奖励给被邀请人
//     const item = add_itemCount(uid, awardCfg.prop, awardCfg.num);
//     add_award(uid, awardCfg.prop, awardCfg.num, AWARD_SRC_INVITE, null, awardCfg.desc);
//     // 邀请人未登陆过平台 则不予发放平台奖励给邀请人
//     if (iuid === -1) return item;
//     add_itemCount(iuid, awardCfg.prop, awardCfg.num);
//     add_award(iuid, awardCfg.prop, awardCfg.num, AWARD_SRC_INVITE, null, awardCfg.desc);
//     return item;
// };
// // 登陆赠送矿山
// export const login_add_mine = ():Mine => {
//     if (get_mine_total() < MAX_ONEDAY_MINING) {
//         return add_mine();
//     }
//     return;
// };
})