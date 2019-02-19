_$define("earn/server/rpc/invite.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 邀请用户
 */
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var db_1 = require("../../utils/db");
var constant_1 = require("../data/constant");
var guessing_s_1 = require("../data/db/guessing.s");
var invite_s_1 = require("../data/db/invite.s");
var item_s_1 = require("../data/db/item.s");
var user_s_1 = require("../data/db/user.s");
var errorNum_1 = require("../data/errorNum");
var util_1 = require("../data/util");
var oauth_lib_1 = require("../util/oauth_lib");
var regularAward_1 = require("../util/regularAward");
var user_r_1 = require("./user.r");
// 获取邀请人数
// #[rpc=rpcServer]
exports.get_inviteNum = function () {
    console.log('get_inviteNum in !!!!!!!!!!!!!!!!!!!!!!!!');
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var uid = user_r_1.getUid();
    // 获取openid
    var openid = Number(user_r_1.getOpenid());
    // 去钱包服务器获取已邀请人数
    var inviteNum = 0;
    var r = oauth_lib_1.oauth_send(constant_1.WALLET_API_INVITENUM, { openid: openid });
    if (r.ok) {
        var json = JSON.parse(r.ok);
        if (json.return_code === 1) {
            inviteNum = json.num;
        }
    }
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, user_s_1.InviteNumTab._$info.name, dbMgr);
    var inviteNumTab = bucket.get(uid)[0];
    if (!inviteNumTab) {
        inviteNumTab = new user_s_1.InviteNumTab();
        inviteNumTab.uid = uid;
        inviteNumTab.inviteNum = 0;
        inviteNumTab.usedNum = [];
    }
    // 更新数据库中的邀请人数
    var length = inviteNumTab.usedNum.length; // 可领取邀请奖励宝箱的个数
    var awardCount = Math.floor(inviteNum / constant_1.MIN_INVITE_NUM); // 每三个邀请人数添加一个可领取宝箱
    console.log('awardCount!!!!!!!!!!!!!!!!!!!!!!!!', awardCount);
    if (length < awardCount) {
        for (var i = 0; i < awardCount - length; i++) {
            inviteNumTab.usedNum.push(1);
            continue;
        }
    }
    inviteNumTab.inviteNum = inviteNum;
    bucket.put(uid, inviteNumTab);
    return inviteNumTab;
};
// 获取邀请奖励
// #[rpc=rpcServer]
exports.get_invite_awards = function (index) {
    console.log('get_invite_awards in !!!!!!!!!!!!!!!!!!!!!!!!');
    var uid = user_r_1.getUid();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, user_s_1.InviteNumTab._$info.name, dbMgr);
    var inviteNumTab = exports.get_inviteNum();
    var awardResponse = new item_s_1.InviteAwardRes();
    var inviteNumStart = index * constant_1.MIN_INVITE_NUM + 1;
    var inviteNumEnd = inviteNumStart + constant_1.MIN_INVITE_NUM;
    awardResponse.award = [];
    if (!inviteNumTab.usedNum[index]) {
        awardResponse.resultNum = errorNum_1.INVITE_NOT_ENOUGH;
        return awardResponse;
    }
    if (inviteNumTab.usedNum[index] === 0) {
        awardResponse.resultNum = errorNum_1.INVITE_AWARD_ALREADY_TAKEN;
        return awardResponse;
    }
    for (var i = inviteNumStart; i < inviteNumEnd; i++) {
        console.log('i !!!!!!!!!!!!!!!!!!!!!!!!', i);
        var award = regularAward_1.invite_award(uid, i);
        awardResponse.award.push(award);
    }
    if (!awardResponse.award) {
        awardResponse.resultNum = errorNum_1.DB_ERROR;
        return awardResponse;
    }
    // 添加已领取记录
    inviteNumTab.usedNum[index] = 0;
    console.log('inviteNumTab.usedNum !!!!!!!!!!!!!!!!!!!!!!!!', inviteNumTab.usedNum);
    bucket.put(uid, inviteNumTab);
    awardResponse.resultNum = constant_1.RESULT_SUCCESS;
    return awardResponse;
};
// 兑换邀请码
// #[rpc=rpcServer]
exports.cdkey = function (code) {
    var result = new guessing_s_1.Result();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var uid = user_r_1.getUid();
    // 获取openid
    var openid = Number(user_r_1.getOpenid());
    var cdkey = util_1.getcdkey(uid, code);
    var InviteBucket = new db_1.Bucket('file', invite_s_1.Invite._$info.name, dbMgr);
    var v = InviteBucket.get(cdkey)[0];
    var invite = new invite_s_1.Invite();
    if (!v) {
        // 去钱包服务器兑换邀请码
        var r = oauth_lib_1.oauth_send(constant_1.WALLET_API_CDKEY, { openid: openid, code: code });
        if (r.ok) {
            var json = JSON.parse(r.ok);
            if (json.return_code === 1) {
                // 增加邀请奖励
                var inviteOpenid = json.openid; // 邀请人openid
                // 获取邀请人uid
                var bucket = new db_1.Bucket(constant_1.WARE_NAME, user_s_1.UserAcc._$info.name, dbMgr);
                var iuser = bucket.get(inviteOpenid)[0];
                var iuid = void 0; // 邀请人uid
                var friendsNum = void 0; // 邀请人已邀请人数
                if (!iuser) {
                    iuid = -1;
                    friendsNum = 1;
                } else {
                    iuid = iuser.uid;
                    // 获取邀请人已邀请人数
                    var invites = exports.get_invite_friends(inviteOpenid, iuid);
                    invites.inviteNum += 1;
                    friendsNum = invites.inviteNum;
                    // 添加邀请人邀请记录
                    var inviteBucket = new db_1.Bucket(constant_1.WARE_NAME, user_s_1.InviteNumTab._$info.name, dbMgr);
                    inviteBucket.put(iuid, invites);
                }
                invite.code = cdkey;
                invite.items = []; // 奖品列表
                var item = regularAward_1.invite_award(iuid, friendsNum);
                invite.items.push(item);
                InviteBucket.put(cdkey, invite);
                result.msg = JSON.stringify(invite);
                result.reslutCode = constant_1.RESULT_SUCCESS;
                return result;
            } else {
                result.reslutCode = json.return_code;
                return result;
            }
        } else {
            result.reslutCode = errorNum_1.REQUEST_WALLET_FAIL;
            return result;
        }
    } else {
        result.reslutCode = errorNum_1.INVITE_CONVERT_REPEAT;
        return result;
    }
};
// 获取已邀请的好友
exports.get_invite_friends = function (openid, uid) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    // 去钱包服务器获取已邀请人数
    var inviteNum = 0;
    var r = oauth_lib_1.oauth_send(constant_1.WALLET_API_INVITENUM, { openid: openid });
    if (r.ok) {
        var json = JSON.parse(r.ok);
        if (json.return_code === 1) {
            inviteNum = json.num;
        }
    }
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, user_s_1.InviteNumTab._$info.name, dbMgr);
    var inviteNumTab = bucket.get(uid)[0];
    if (!inviteNumTab) {
        inviteNumTab = new user_s_1.InviteNumTab();
        inviteNumTab.uid = uid;
        inviteNumTab.inviteNum = 0;
        inviteNumTab.usedNum = [];
    }
    // 更新数据库中的邀请人数
    var length = inviteNumTab.usedNum.length; // 可领取邀请奖励宝箱的个数
    var awardCount = Math.floor(inviteNum / constant_1.MIN_INVITE_NUM); // 每三个邀请人数添加一个可领取宝箱
    console.log('awardCount!!!!!!!!!!!!!!!!!!!!!!!!', awardCount);
    if (length < awardCount) {
        for (var i = 0; i < awardCount - length; i++) {
            inviteNumTab.usedNum.push(1);
            continue;
        }
    }
    inviteNumTab.inviteNum = inviteNum;
    bucket.put(uid, inviteNumTab);
    return inviteNumTab;
};
})