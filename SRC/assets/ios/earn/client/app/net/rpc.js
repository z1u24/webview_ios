_$define("earn/client/app/net/rpc", function (require, exports, module){
"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * rpc通信
 */
var JSAPI_1 = require("../../../../app/api/JSAPI");
var pull_1 = require("../../../../app/net/pull");
var memstore_1 = require("../../../../app/store/memstore");
var pay_1 = require("../../../../app/utils/pay");
var root_1 = require("../../../../pi/ui/root");
var guessing_s_1 = require("../../../server/data/db/guessing.s");
var item_s_1 = require("../../../server/data/db/item.s");
var guessingCompetition_p_1 = require("../../../server/rpc/guessingCompetition.p");
var invite_p_1 = require("../../../server/rpc/invite.p");
var itemQuery_s_1 = require("../../../server/rpc/itemQuery.s");
var mining_p_1 = require("../../../server/rpc/mining.p");
var stParties_p_1 = require("../../../server/rpc/stParties.p");
var test_p_1 = require("../../../server/rpc/test.p");
var user_p_1 = require("../../../server/rpc/user.p");
var user_s_1 = require("../../../server/rpc/user.s");
var user_item_p_1 = require("../../../server/rpc/user_item.p");
var memstore_2 = require("../store/memstore");
var tools_1 = require("../utils/tools");
var util_1 = require("../utils/util");
var dataEnum_s_1 = require("../xls/dataEnum.s");
var autologin_1 = require("./autologin");
var init_1 = require("./init");
/**
 * 钱包用户登录活动
 */
exports.goLoginActivity = function () {
    console.log('goLoginActivity -----------------');
    JSAPI_1.getOpenId('101', function (r) {
        var openid = r.openid.toString();
        if (openid) {
            init_1.login(autologin_1.UserType.WALLET, openid, 'sign', function (res) {
                memstore_2.setStore('userInfo', Object.assign({}, res));
                if (res.loginCount === 0) {
                    // 新用户第一次登录
                    root_1.popNew('earn-client-app-components-newUserLogin-newUserLogin');
                }
                exports.getSTbalance(); // 获取ST余额
                exports.getKTbalance(); // 获取KT余额   
                exports.getUserInfo(parseInt(openid, 10), 'self'); // 获取用户信息
                exports.getInvitedNumberOfPerson().then(function (invite) {
                    if (util_1.canInviteAward(invite)) {
                        root_1.popNew('earn-client-app-view-activity-inviteAward');
                    }
                }); // 获取邀请成功人数
                exports.getTodayMineNum();
                exports.getRankList();
            });
        }
    }, function (err) {
        console.log('[活动]获取openid失败！！------------', err);
    });
};
/**
 * 用户登录
 */
exports.loginActivity = function (userid, sign, cb) {
    var userType = new user_s_1.UserType();
    userType.enum_type = user_s_1.UserType_Enum.WALLET;
    var walletLoginReq = new user_s_1.WalletLoginReq();
    walletLoginReq.openid = userid;
    walletLoginReq.sign = sign;
    userType.value = walletLoginReq;
    init_1.clientRpcFunc(user_p_1.login, userType, function (res) {
        memstore_2.setStore('userInfo', res);
        console.log('[活动]登录成功！！--------------', res);
        cb(res);
    });
};
/**
 * 获取用户信息
 */
exports.getUserInfo = function (openid, self) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var userInfo, walletUserInfo, activityUserInfo;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return pull_1.getOneUserInfo([openid], 1);

                    case 2:
                        userInfo = _context.sent;

                        if (!self) {
                            _context.next = 12;
                            break;
                        }

                        // 钱包用户
                        walletUserInfo = memstore_1.getStore('user/info');
                        activityUserInfo = memstore_2.getStore('userInfo');

                        console.log('[活动]localUserInfo---------------', walletUserInfo);
                        activityUserInfo = Object.assign({}, activityUserInfo, { avatar: walletUserInfo.avatar, name: walletUserInfo.nickName });
                        memstore_2.setStore('userInfo', activityUserInfo);
                        return _context.abrupt("return", activityUserInfo);

                    case 12:
                        return _context.abrupt("return", {
                            avatar: userInfo.avatar,
                            name: userInfo.nickName,
                            tel: userInfo.phoneNumber
                        });

                    case 13:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};
/**
 * 获取所有物品
 */
exports.getAllGoods = function () {
    init_1.clientRpcFunc(user_item_p_1.item_query, null, function (r) {
        console.log('getAllGoods ', r);
        memstore_2.setStore('goods', r.item);
    });
};
// 获取ST数量
exports.getSTbalance = function () {
    init_1.clientRpcFunc(stParties_p_1.get_STNum, null, function (r) {
        console.log('rpc-getSTbalance--ST余额---------------', r);
        if (r.resultNum === 1) {
            memstore_2.setStore('balance/ST', tools_1.st2ST(r.num));
        } else {
            util_1.showActError(r.resultNum);
        }
    });
};
/**
 * 获取KT余额
 */
exports.getKTbalance = function () {
    init_1.clientRpcFunc(stParties_p_1.get_KTNum, null, function (r) {
        console.log('rpc-getSTbalance--KT余额---------------', r);
        if (r.resultNum === 1) {
            memstore_2.setStore('balance/KT', tools_1.coinUnitchange(dataEnum_s_1.CoinType.KT, r.num));
        } else {
            util_1.showActError(r.resultNum);
        }
    });
};
/**
 * 准备挖矿
 */
exports.readyMining = function (hoeType) {
    return new Promise(function (resolve) {
        console.log('beginMining hoeType = ', hoeType);
        init_1.clientRpcFunc(mining_p_1.mining, hoeType, function (r) {
            console.log('beginMining ', r);
            resolve(r);
        });
    });
};
/**
 * 开始挖矿
 */
exports.startMining = function (mineType, mineId, diggingCount) {
    return new Promise(function (resolve, reject) {
        var result = new itemQuery_s_1.MiningResult();
        result.itemType = mineType;
        result.mineNum = mineId;
        result.hit = diggingCount;
        console.log('startMining result = ', result);
        init_1.clientRpcFunc(mining_p_1.mining_result, result, function (r) {
            console.log('startMining MiningResponse = ', r);
            resolve(r);
            if (r.resultNum === 1) {
                resolve(r);
            } else {
                // showActError(r.resultNum);TODO
                reject(r);
            }
        });
    });
};
/**
 * 获取今天已挖矿山数
 */
exports.getTodayMineNum = function () {
    var uid = memstore_2.getStore('userInfo/uid');
    init_1.clientRpcFunc(mining_p_1.get_todayMineNum, uid, function (r) {
        console.log('getTodayMineNum TodayMineNum = ', r);
        memstore_2.setStore('mine/miningedNumber', r.mineNum);
    });
};
/**
 * 开宝箱下单
 */
exports.openChest = function (activityType) {
    return new Promise(function (resolve, reject) {
        var itemType = activityType;
        init_1.clientRpcFunc(stParties_p_1.st_treasurebox, itemType, function (r) {
            console.log('[活动]rpc-openChest-resData-------------', r);
            // if (r.resultNum === 1) {
            //     getSTbalance();
            //     resolve(r);
            // } else {
            //     // showActError(r.resultNum);
            //     reject(r);
            // }
            if (r.reslutCode === 1) {
                var order = JSON.parse(r.msg);
                if (order.oid) {
                    pay_1.walletPay(order, '101', '15', function (res, msg) {
                        console.log('chest PAY', res, order);
                        if (!res) {
                            resolve(order);
                        } else {
                            util_1.showActError(res);
                            reject(res);
                        }
                    });
                } else {
                    // 免费机会返回
                    resolve(order);
                }
            } else {
                util_1.showActError(r.reslutCode);
                reject(r);
            }
        });
    });
};
/**
 * 开宝箱订单查询
 */
exports.queryChestOrder = function (oid) {
    console.log(oid);
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(stParties_p_1.box_pay_query, oid, function (r) {
            console.log('[活动]rpc-queryChestOrder---------------', r);
            if (r.reslutCode === 1) {
                var msg = JSON.parse(r.msg);
                resolve(msg);
            } else {
                util_1.showActError(r.reslutCode);
                reject(r);
            }
        });
    });
};
/**
 * 转转盘
 */
exports.openTurntable = function (activityType) {
    return new Promise(function (resolve, reject) {
        var itemType = activityType;
        init_1.clientRpcFunc(stParties_p_1.st_rotary, itemType, function (r) {
            console.log('[活动]rpc-openTurntable-resData---------------', r);
            // if (r.resultNum === 1) {
            //     getSTbalance();
            //     resolve(r);
            // } else {
            //     showActError(r.resultNum);
            //     reject(r);
            // }
            if (r.reslutCode === 1) {
                var order = JSON.parse(r.msg);
                if (order.oid) {
                    pay_1.walletPay(order, '101', '15', function (res, msg) {
                        console.log('chest PAY', res, order);
                        if (!res) {
                            resolve(order);
                        } else {
                            util_1.showActError(res);
                            reject(res);
                        }
                    });
                } else {
                    // 免费机会返回
                    resolve(order);
                }
            } else {
                util_1.showActError(r.reslutCode);
                reject(r);
            }
        });
    });
};
/**
 * 大转盘订单查询
 */
exports.queryTurntableOrder = function (oid) {
    console.log(oid);
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(stParties_p_1.rotary_pay_query, oid, function (r) {
            console.log('[活动]rpc-queryChestOrder---------------', r);
            if (r.reslutCode === 1) {
                var msg = JSON.parse(r.msg);
                resolve(msg);
            } else {
                util_1.showActError(r.reslutCode);
                reject(r);
            }
        });
    });
};
/**
 * 查询中奖、兑换记录
 * @param itype 记录种类
 */
exports.getAwardHistory = function (itype) {
    return new Promise(function (resolve, reject) {
        var awardQuery = new item_s_1.AwardQuery();
        if (itype !== 0) {
            awardQuery.src = dataEnum_s_1.AwardSrcNum[itype];
        }
        init_1.clientRpcFunc(user_item_p_1.award_query, awardQuery, function (r) {
            console.log('[活动]rpc-getAwardHistory-resData---------------', r);
            var resData = [];
            r.awards.forEach(function (element) {
                var data = Object.assign({}, util_1.getPrizeInfo(element.awardType), { time: tools_1.timestampFormat(element.time), count: tools_1.coinUnitchange(element.awardType, element.count) });
                resData.push(data);
            });
            resolve(resData);
        });
    });
};
/**
 * 获取挖矿排名
 */
exports.getRankList = function () {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(mining_p_1.get_miningKTTop, 50, function (r) {
            console.log('[活动]rpc-getRankList-resData---------------', r);
            if (r.resultNum === 1) {
                var mine = memstore_2.getStore('mine');
                mine.miningRank = r.myNum || 0;
                mine.miningKTnum = r.myKTNum || 0;
                mine.miningMedalId = r.myMedal;
                memstore_2.setStore('mine', mine);
                resolve(r);
            } else {
                util_1.showActError(r.resultNum);
                reject(r);
            }
        });
    });
};
/**
 * 获取连续登录天数
 */
exports.getLoginDays = function () {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(user_p_1.get_loginDays, null, function (r) {
            console.log('[活动]rpc-getLoginDays---------------', r);
            if (r.resultNum === 1) {
                resolve(r);
            } else {
                // showActError(r.resultNum);TODO
                reject(r);
            }
        });
    });
};
/**
 * 获取拥有的成就勋章
 */
exports.getACHVmedal = function () {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(user_item_p_1.get_achievements, null, function (r) {
            console.log('[活动]rpc-getACHVmedal--成就勋章---------------', r);
            // if (r.resultNum === 1) {
            memstore_2.setStore('ACHVmedals', r.achievements);
            resolve(r);
            // } else {
            //     showActError(r.resultNum);
            //     reject(r);
            // }
        });
    });
};
/**
 * 展示勋章
 * @param medalId 需要展示勋章的id
 */
exports.showMedal = function (medalId) {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(user_item_p_1.show_medal, medalId, function (r) {
            console.log('[活动]rpc-show_medal--挂出勋章---------------', r);
            // if (r.resultNum === 1) {
            resolve(r);
            // } else {
            //     showActError(r.resultNum);
            //     reject(r);
            // }
        });
    });
};
/**
 * 获取展示勋章
 */
exports.getShowMedal = function () {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(user_item_p_1.get_showMedal, null, function (r) {
            console.log('[活动]rpc-show_medal--挂出勋章---------------', r);
            // if (r.resultNum === 1) {
            resolve(r);
            // } else {
            //     showActError(r.resultNum);
            //     reject(r);
            // }
        });
    });
};
/**
 * 获取虚拟物品兑换列表
 */
exports.getExchangeVirtualList = function () {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(stParties_p_1.get_convert_list, null, function (r) {
            console.log('[活动]rpc-getExchangeVirtualList--虚拟物品兑换列表---------------', r);
            if (r.reslutCode === 1) {
                var list = JSON.parse(r.msg);
                resolve(list);
            } else {
                util_1.showActError(r.reslutCode);
                reject(r);
            }
        });
    });
};
/**
 * 兑换虚拟物品
 * @param VirtualId 虚拟物品ID
 */
exports.exchangeVirtual = function (VirtualId) {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(stParties_p_1.st_convert, VirtualId, function (r) {
            console.log('[活动]rpc-exchangeVirtual---------------', r);
            if (r.resultNum === 1) {
                resolve(r);
            } else {
                util_1.showActError(r.resultNum);
                reject(r);
            }
        });
    });
};
/**
 * 获取兑换记录列表
 */
exports.getExchangeHistory = function () {
    return new Promise(function (resolve, reject) {
        var awardQuery = new item_s_1.AwardQuery();
        awardQuery.src = dataEnum_s_1.AwardSrcNum[4];
        init_1.clientRpcFunc(user_item_p_1.award_query, awardQuery, function (r) {
            console.log('[活动]rpc-getExchangeHistory-resData---------------', r);
            resolve(r);
        });
    });
};
exports.addST = function () {
    init_1.clientRpcFunc(test_p_1.bigint_test, null, function (r) {
        console.log('[活动]rpc-bigint_test---------------', r);
        exports.getSTbalance();
    });
};
/**
 * 获取已经邀请的人数
 */
exports.getInvitedNumberOfPerson = function () {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(invite_p_1.get_inviteNum, null, function (r) {
            console.log('[活动]rpc-getInvitedNumberOfPerson---------------', r);
            var invite = {
                invitedNumberOfPerson: r.inviteNum,
                convertedInvitedAward: r.usedNum
            };
            memstore_2.setStore('invited', invite);
            resolve(invite);
        });
    });
};
/**
 * 兑换邀请奖励
 */
exports.converInviteAwards = function (index) {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(invite_p_1.get_invite_awards, index, function (r) {
            console.log('[活动]rpc-converInviteAwards---------------', r);
            resolve(r);
            exports.getInvitedNumberOfPerson();
        });
    });
};
/**
 * 活动是否能每日第一次免费
 */
exports.isFirstFree = function () {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(stParties_p_1.get_hasFree, null, function (r) {
            console.log('[活动]rpc-isFirstFree---------------', r);
            // if (r.resultNum === 1) {
            resolve(r);
            // } else {
            //     showActError(r.resultNum);
            //     reject(r);
            // }
        });
    });
};
// ----------------------------------------------------------------------------------------------------------------------------------------
// 竞猜rpc通信;
/**
 * 获取所有比赛信息
 */
exports.getAllGuess = function () {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(guessingCompetition_p_1.get_main_competitions, null, function (r) {
            console.log('[活动]rpc-getAllGuess---------------', r);
            if (r.reslutCode === 1) {
                var compList = JSON.parse(r.msg);
                var resData = [];
                compList.list.forEach(function (element) {
                    var data = {
                        cid: element.comp.cid,
                        matchType: element.comp.matchType,
                        matchName: util_1.getMacthTypeCfg(element.comp.matchType).season + util_1.getMacthTypeCfg(element.comp.matchType).name,
                        team1: util_1.getTeamCfg(element.comp.team1).teamName,
                        team2: util_1.getTeamCfg(element.comp.team2).teamName,
                        time: tools_1.timestampFormat(element.comp.time),
                        week: tools_1.timestampFormatWeek(element.comp.time),
                        result: element.comp.result,
                        state: element.comp.state,
                        team1Num: tools_1.coinUnitchange(dataEnum_s_1.CoinType.ST, element.team1num),
                        team2Num: tools_1.coinUnitchange(dataEnum_s_1.CoinType.ST, element.team2num)
                    };
                    resData.push(data);
                });
                console.log('比赛信息!!!!!!!!：', resData);
                resolve(resData);
            } else {
                util_1.showActError(r.reslutCode);
                reject(r);
            }
        });
    });
};
/**
 * 下注竞猜
 */
exports.betGuess = function (cid, num, teamSide) {
    return new Promise(function (resolve, reject) {
        var guessingReq = new guessing_s_1.GuessingReq();
        guessingReq.cid = cid;
        guessingReq.num = tools_1.ST2st(num);
        guessingReq.teamSide = teamSide;
        init_1.clientRpcFunc(guessingCompetition_p_1.start_guessing, guessingReq, function (r) {
            console.log('[活动]rpc-betGuess---------------', r);
            if (r.reslutCode === 1) {
                var order = JSON.parse(r.msg);
                pay_1.walletPay(order, '101', '15', function (res, msg) {
                    if (!res) {
                        resolve(order);
                    } else {
                        util_1.showActError(res);
                        reject(res);
                    }
                });
            } else {
                util_1.showActError(r.reslutCode);
                reject(r);
            }
        });
    });
};
/**
 * 竞猜下注成功后查询
 * @param order 订单信息
 */
exports.queryBetGuess = function (oid) {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(guessingCompetition_p_1.guessing_pay_query, oid, function (r) {
            console.log('[活动]rpc-queryBetGuess---------------', r);
            if (r.reslutCode === 1) {
                var msg = JSON.parse(r.msg);
                resolve(msg);
            } else {
                util_1.showActError(r.reslutCode);
                reject(r);
            }
        });
    });
};
/**
 * 获取我的竞猜
 */
exports.getMyGuess = function () {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(guessingCompetition_p_1.get_user_guessingInfo, null, function (r) {
            console.log('[活动]rpc-getMyGuess---------------', r);
            if (r.reslutCode === 1) {
                var compList = JSON.parse(r.msg);
                var resData = [];
                compList.list.forEach(function (element) {
                    var data = {
                        guessData: {
                            cid: element.competition.cid,
                            matchType: element.competition.matchType,
                            matchName: util_1.getMacthTypeCfg(element.competition.matchType).season + util_1.getMacthTypeCfg(element.competition.matchType).name,
                            team1: util_1.getTeamCfg(element.competition.team1).teamName,
                            team2: util_1.getTeamCfg(element.competition.team2).teamName,
                            time: tools_1.timestampFormat(element.competition.time),
                            week: tools_1.timestampFormatWeek(element.competition.time),
                            result: element.competition.result,
                            state: element.competition.state,
                            team1Num: tools_1.coinUnitchange(dataEnum_s_1.CoinType.ST, element.team1num),
                            team2Num: tools_1.coinUnitchange(dataEnum_s_1.CoinType.ST, element.team2num)
                        },
                        guessing: {
                            time: tools_1.timestampFormat(element.guessing.time),
                            guessTeam: util_1.getTeamCfg(element.competition["team" + element.guessing.teamSide]).teamName,
                            guessSide: element.guessing.teamSide,
                            benefit: element.guessing.benefit,
                            guessSTnum: element.guessing.num
                        }
                    };
                    resData.push(data);
                });
                console.log('获取我的竞猜成功!!!!!!!!：', compList);
                resolve(resData);
            } else {
                util_1.showActError(r.reslutCode);
                reject(r);
            }
        });
    });
};
/**
 * 获取单个竞猜奖池信息
 */
exports.getOneGuessInfo = function (cid) {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(guessingCompetition_p_1.get_compJackpots, cid, function (r) {
            console.log('[活动]rpc-getOneGuessInfo---------------', r);
            if (r.reslutCode === 1) {
                var data = JSON.parse(r.msg);
                var reaData = {
                    uid: data.uid,
                    team1Num: tools_1.coinUnitchange(dataEnum_s_1.CoinType.ST, data.jackpot1),
                    team2Num: tools_1.coinUnitchange(dataEnum_s_1.CoinType.ST, data.jackpot2)
                };
                resolve(reaData);
            } else {
                util_1.showActError(r.reslutCode);
                reject(r);
            }
        });
    });
};
})