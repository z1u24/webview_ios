_$define("earn/server/data/errorNum", function (require, exports, module){
"use strict";
/**
 * 错误编码
 */

Object.defineProperty(exports, "__esModule", { value: true });
// 数据库错误 
exports.DB_ERROR = 600;
// 物品数量错误
exports.ITEM_NUM_ERROR = 700;
// 配置错误
exports.CONFIG_ERROR = 800;
// 该类型矿山数量不足
exports.MINE_NOT_ENOUGH = 1101;
// 挖矿数量已达限制
exports.MINENUM_OVER_LIMIT = 1102;
// 获取随机种子失败
exports.GET_RANDSEED_FAIL = 1103;
// 该类型锄头数量不足
exports.HOE_NOT_ENOUGH = 1104;
// 10秒内点击次数异常
exports.ARE_YOU_SUPERMAN = 1105;
// 这座矿山不存在
exports.MINE_NOT_EXIST = 1106;
// 当日看广告次数已达上限
exports.ONEDAY_ADAWARD_LIMIT = 1107;
// 广告编号错误
exports.ADVERTISEMENT_NUM_ERROR = 1108;
// 看广告时间间隔小于最低时间间隔
exports.ADVERTISEMENT_TIME_ERROR = 1109;
// 邀请人数不足兑换奖励
exports.INVITE_NOT_ENOUGH = 2101;
// 邀请奖励已经领取
exports.INVITE_AWARD_ALREADY_TAKEN = 2102;
// 已兑换过邀请码
exports.INVITE_CONVERT_REPEAT = 2103;
// ST数量不足
exports.ST_NOT_ENOUGH = 3101;
// 转盘类型错误
exports.ROTARY_TYPE_ERROR = 3102;
// 宝箱类型错误
exports.TREASUREBOX_TYPE_ERROR = 3103;
// ST数量错误
exports.ST_NUM_ERROR = 4101;
// 比赛不存在
exports.COMPETITION_NOT_EXIST = 4102;
// 比赛已经封盘
exports.COMPETITION_ALREADY_CLOSE = 4103;
// 单场比赛竞猜总投注超过上限
exports.GUESSINGNUM_BEYOUND_LIMIT = 4104;
// 比赛结果已出
exports.COMPETITION_RESULT_EXIST = 4105;
// 比赛结果未出
exports.COMPETITION_RESULT_NOT_EXIST = 4106;
// 竞猜已结算
exports.GUESSING_ALREADY_SETTLED = 4107;
// 生成订单失败
exports.UNIFIEDORDER_API_FAILD = 4108;
// 竞猜不存在
exports.GUESSING_NOT_EXIST = 4109;
// 获取订单信息失败
exports.GET_ORDERINFO_FAILD = 4110;
// 订单不存在
exports.ORDER_NOT_EXIST = 4111;
// 用户奖券不足
exports.TICKET_NOT_ENOUGH = 7101;
// 奖券类型错误
exports.TICKET_TYPE_ERROR = 7102;
// 奖品已经兑完
exports.AWARD_NOT_ENOUGH = 7103;
// 商品已存在
exports.PRODUCT_ALREADY_EXIST = 7104;
// 商品不存在
exports.PRODUCT_NOT_EXIST = 7105;
// 兑换码已存在
exports.CONVERT_ALREADY_EXIST = 7106;
// 获取排行数据失败
exports.TOP_DATA_FAIL = 8101;
// 向钱包服务器请求数据失败
exports.REQUEST_WALLET_FAIL = 8102;
// 默认错误代码
exports.DEFAULT_ERROR_NUMBER = -1;
})