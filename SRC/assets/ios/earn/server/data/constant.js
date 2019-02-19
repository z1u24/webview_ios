_$define("earn/server/data/constant", function (require, exports, module){
"use strict";
/**
 * 常量定义
 */

Object.defineProperty(exports, "__esModule", { value: true });
// 自增IDkey
// 用户id
exports.INDEX_USER = 'uid';
exports.INDEX_PRIZE = 'prizeid';
// 成功返回
exports.RESULT_SUCCESS = 1;
// 物品枚举类型
exports.MINE_ENUM_NUM = 1;
exports.HOE_ENUM_NUM = 2;
exports.BTC_ENUM_NUM = 3;
exports.ETH_ENUM_NUM = 4;
exports.ST_ENUM_NUM = 5;
exports.KT_ENUM_NUM = 6;
exports.TICKET_ENUM_NUM = 7;
// 物品类型总数
exports.MAX_TYPE_NUM = 13;
// 物品类型编号
exports.SMALL_MINE_TYPE = 1001;
exports.MIDDLE_MINE_TYPE = 1002;
exports.HUGE_MINE_TYPE = 1003;
exports.IRON_HOE_TYPE = 2001;
exports.GOLD_HOE_TYPE = 2002;
exports.DIAMOND_HOE_TYPE = 2003;
exports.BTC_TYPE = 3001;
exports.ETH_TYPE = 4001;
exports.ST_TYPE = 5001;
exports.KT_TYPE = 6001;
exports.SILVER_TICKET_TYPE = 7001;
exports.GOLD_TICKET_TYPE = 7002;
exports.RAINBOW_TICKET_TYPE = 7003;
// 勋章类型编号
exports.MEDAL_KT0 = 8001;
exports.MEDAL_KT20 = 8002;
exports.MEDAL_KT50 = 8003;
exports.MEDAL_KT100 = 8004;
exports.MEDAL_KT200 = 8005;
exports.MEDAL_KT500 = 8006;
exports.MEDAL_KT1000 = 8007;
exports.MEDAL_KT2000 = 8008;
exports.MEDAL_KT5000 = 8009;
exports.MEDAL_KT10000 = 8010;
exports.MEDAL_KT20000 = 8011;
exports.MEDAL_KT50000 = 8012;
exports.MEDAL_KT100000 = 8013;
exports.MEDAL_KT500000 = 8014;
exports.MEDAL_KT1000000 = 8015;
exports.MEDAL_ST = 8016;
exports.MEDAL_ETH = 8017;
exports.MEDAL_BTC = 8018;
// 消息推送类型编号
exports.MESSAGE_TYPE_ADDMEDAL = 'add_medal'; // 添加奖章
// 标准单位转换为数据库储存单位的比例
// BTC单位 10^4 精度为小数点后4位
exports.BTC_UNIT_NUM = Math.pow(10, 4);
// ETH 单位:10^15 精度为小数点后3位
exports.ETH_UNIT_NUM = Math.pow(10, 15);
// ST 单位:10^4 精度为小数点后2位
exports.ST_UNIT_NUM = Math.pow(10, 4);
// KT 单位:10^8 即KT为整数
exports.KT_UNIT_NUM = Math.pow(10, 9);
// 人类10秒最快手速
exports.MAX_HUMAN_HITS = 200;
// 一天最多挖矿数量
exports.MAX_ONEDAY_MINING = 8;
// 每人每天看广告可获得奖励次数
exports.MAX_ONEDAY_ADAWARD = 20;
// 激励视频广告最低间隔时间
exports.MIN_ADVERTISEMENT_SECONDS = 15;
// 连续登陆奖励循环天数
exports.SERIES_LOGIN_CIRCLE = 15;
// 邀请好友开始循环奖励人数
exports.INVITE_AWARD_CIRCLE = 15;
// 邀请好友循环奖励长度
exports.INVITE_AWARD_CIRCLE_LENGTH = 3;
// 邀请好友第二级循环奖励
exports.INVITE_AWARD_CIRCLE_LEVEL1 = 16;
// 邀请好友第一级循环奖励
exports.INVITE_AWARD_CIRCLE_LEVEL2 = 17;
// 邀请好友第三级循环奖励
exports.INVITE_AWARD_CIRCLE_LEVEL3 = 18;
// ================ 固定奖励 ===================
// 首次登陆奖励
exports.FIRST_LOGIN_AWARD = 600101;
// 首次挖开矿山奖励
exports.FIRST_MINING_AWARD = 600401;
// 特殊奖励id
exports.THE_ELDER_SCROLLS = 'skyRim';
// 奖品来源
exports.AWARD_SRC_LOGIN = 'login';
exports.AWARD_SRC_INVITE = 'invite';
exports.AWARD_SRC_MINE = 'mine';
exports.AWARD_SRC_ROTARY = 'rotary';
exports.AWARD_SRC_TREASUREBOX = 'treasurebox';
exports.AWARD_SRC_CONVERT = 'convert';
exports.AWARD_SRC_ADVERTISEMENT = 'advertisement';
// ================ 概率奖励 ===================
// 抽奖配置id
exports.SMALL_MINE_TYPE_AWARD = 100101; // 小矿山挖矿
exports.MIDDLE_MINE_TYPE_AWARD = 100201; // 中矿山挖矿
exports.HUGE_MINE_TYPE_AWARD = 100301; // 大矿山挖矿
exports.GET_RANDOM_MINE = 100401; // 获取矿山
exports.COMPOSE_GOLD_TICKET = 100501; // 合成金券
exports.COMPOSE_RAINBOW_TICKET = 100601; // 合成彩券
exports.LEVEL1_ROTARY_AWARD = 100701; // 初级大转盘
exports.LEVEL2_ROTARY_AWARD = 100801; // 中级大转盘
exports.LEVEL3_ROTARY_AWARD = 100901; // 高级大转盘
exports.LEVEL1_TREASUREBOX_AWARD = 101001; // 初级宝箱
exports.LEVEL2_TREASUREBOX_AWARD = 101101; // 中级宝箱
exports.LEVEL3_TREASUREBOX_AWARD = 101201; // 高级宝箱
// 合成消耗奖券
exports.TICKET_COMPOSE_COUNT = 3;
// 大转盘消耗奖券
exports.TICKET_ROTARY_COUNT = 2;
// 开宝箱消耗奖券
exports.TICKET_TREASUREBOX_COUNT = 2;
// 获取邀请奖励最小人数
exports.MIN_INVITE_NUM = 3;
// 初级转盘消耗ST数
exports.LEVEL1_ROTARY_STCOST = 10;
// 中级转盘消耗ST数
exports.LEVEL2_ROTARY_STCOST = 100;
// 高级转盘消耗ST数
exports.LEVEL3_ROTARY_STCOST = 1000;
// 初级宝箱消耗ST数
exports.LEVEL1_TREASUREBOX_STCOST = 10;
// 中级宝箱消耗ST数
exports.LEVEL2_TREASUREBOX_STCOST = 100;
// 高级宝箱消耗ST数
exports.LEVEL3_TREASUREBOX_STCOST = 1000;
// 没有奖品
exports.SURPRISE_BRO = 9527;
exports.NO_AWARD_SORRY = 'noaward';
// 数据库名
exports.WARE_NAME = 'file';
exports.MEMORY_NAME = 'memory';
// 钱包服务器地址
exports.WALLET_SERVER_URL = 'http://127.0.0.1:8099';
// appid
exports.WALLET_APPID = '101';
// mch_id
exports.WALLET_MCH_ID = '15';
// 私钥
exports.WALLET_SERVER_KEY = 'xxxxxxxxx';
// 兑换邀请码
exports.WALLET_API_CDKEY = '/oAuth/cdkey';
// 查询余额
exports.WALLET_API_QUERY = '/oAuth/balancequery';
// 修改余额
exports.WALLET_API_ALTER = '/oAuth/alterbalance';
// 邀请人数
exports.WALLET_API_INVITENUM = '/oAuth/invite';
// 生成钱包订单
exports.WALLET_API_UNIFIEDORDER = '/pay/unifiedorder';
// 订单查询
exports.WALLET_ORDER_QUERY = '/pay/orderquery';
// 货币类型
exports.KT_WALLET_TYPE = 100;
exports.ETH_WALLET_TYPE = 101;
exports.BTC_WALLET_TYPE = 102;
exports.ST_WALLET_TYPE = 103;
})