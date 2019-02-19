_$define("earn/client/app/utils/constants", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 一些常量
 */
// 数据库名
exports.WARE_NAME = 'file';
exports.MEMORY_NAME = 'memory';
// 锄头的使用持续时间
exports.hoeUseDuration = 10;
//  每天最多挖的矿山数
exports.MineMax = 8;
// hoeUseDuration时间类可点击的最大次数
exports.miningMaxHits = 200;
// 邀请人数领取奖励的倍数
exports.inviteAwardsMultiple = 3;
})