_$define("earn/client/app/xls/dataEnum.s", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ActivityType;
(function (ActivityType) {
    ActivityType[ActivityType["ComposeGold"] = 100501] = "ComposeGold";
    ActivityType[ActivityType["ComposeDiamond"] = 100601] = "ComposeDiamond";
    ActivityType[ActivityType["PrimaryTurntable"] = 100701] = "PrimaryTurntable";
    ActivityType[ActivityType["MiddleTurntable"] = 100801] = "MiddleTurntable";
    ActivityType[ActivityType["AdvancedTurntable"] = 100901] = "AdvancedTurntable";
    ActivityType[ActivityType["PrimaryChest"] = 101001] = "PrimaryChest";
    ActivityType[ActivityType["MiddleChest"] = 101101] = "MiddleChest";
    ActivityType[ActivityType["AdvancedChest"] = 101201] = "AdvancedChest";
    ActivityType[ActivityType["NewUserWelfare"] = 600101] = "NewUserWelfare";
})(ActivityType = exports.ActivityType || (exports.ActivityType = {}));
var AwardSrcNum;
(function (AwardSrcNum) {
    AwardSrcNum[AwardSrcNum["all"] = 0] = "all";
    AwardSrcNum[AwardSrcNum["mine"] = 1] = "mine";
    AwardSrcNum[AwardSrcNum["rotary"] = 2] = "rotary";
    AwardSrcNum[AwardSrcNum["treasurebox"] = 3] = "treasurebox";
    AwardSrcNum[AwardSrcNum["convert"] = 4] = "convert";
    AwardSrcNum[AwardSrcNum["login"] = 5] = "login";
    AwardSrcNum[AwardSrcNum["invite"] = 6] = "invite";
})(AwardSrcNum = exports.AwardSrcNum || (exports.AwardSrcNum = {}));
var CoinType;
(function (CoinType) {
    CoinType[CoinType["BTC"] = 3001] = "BTC";
    CoinType[CoinType["ETH"] = 4001] = "ETH";
    CoinType[CoinType["ST"] = 5001] = "ST";
    CoinType[CoinType["KT"] = 6001] = "KT";
})(CoinType = exports.CoinType || (exports.CoinType = {}));
})