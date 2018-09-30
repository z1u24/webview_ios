_$define("app/store/interface", function (require, exports, module){
"use strict";
/**
 * 内存中的数据结构
 */

var _exports$priorityMap;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", { value: true });
// 创建钱包方式
var CreateWalletType;
(function (CreateWalletType) {
    CreateWalletType[CreateWalletType["Random"] = 1] = "Random";
    CreateWalletType[CreateWalletType["Image"] = 2] = "Image";
    CreateWalletType[CreateWalletType["StrandarImport"] = 3] = "StrandarImport";
    CreateWalletType[CreateWalletType["ImageImport"] = 4] = "ImageImport";
    CreateWalletType[CreateWalletType["FragmentImport"] = 5] = "FragmentImport"; // 片段导入
})(CreateWalletType = exports.CreateWalletType || (exports.CreateWalletType = {}));
// 枚举登录状态
var LoginState;
(function (LoginState) {
    LoginState[LoginState["init"] = 0] = "init";
    LoginState[LoginState["logining"] = 1] = "logining";
    LoginState[LoginState["logined"] = 2] = "logined";
    LoginState[LoginState["relogining"] = 3] = "relogining";
    LoginState[LoginState["logouting"] = 4] = "logouting";
    LoginState[LoginState["logouted"] = 5] = "logouted";
    LoginState[LoginState["logerror"] = 6] = "logerror";
})(LoginState = exports.LoginState || (exports.LoginState = {}));
// 云端货币类型
var CurrencyType;
(function (CurrencyType) {
    CurrencyType[CurrencyType["KT"] = 100] = "KT";
    CurrencyType[CurrencyType["ETH"] = 101] = "ETH";
    CurrencyType[CurrencyType["BTC"] = 102] = "BTC";
})(CurrencyType = exports.CurrencyType || (exports.CurrencyType = {}));
// 枚举云端货币类型
exports.CurrencyTypeReverse = {
    100: 'KT',
    101: 'ETH',
    102: 'BTC'
};
// 红包类型
var RedEnvelopeType;
(function (RedEnvelopeType) {
    RedEnvelopeType["Normal"] = "00";
    RedEnvelopeType["Random"] = "01";
    RedEnvelopeType["Invite"] = "99";
})(RedEnvelopeType = exports.RedEnvelopeType || (exports.RedEnvelopeType = {}));
// 矿工费等级
var MinerFeeLevel;
(function (MinerFeeLevel) {
    MinerFeeLevel[MinerFeeLevel["STANDARD"] = 0] = "STANDARD";
    MinerFeeLevel[MinerFeeLevel["FAST"] = 1] = "FAST";
    MinerFeeLevel[MinerFeeLevel["FASTEST"] = 2] = "FASTEST";
})(MinerFeeLevel = exports.MinerFeeLevel || (exports.MinerFeeLevel = {}));
// btc矿工费等级
exports.priorityMap = (_exports$priorityMap = {}, _defineProperty(_exports$priorityMap, MinerFeeLevel.STANDARD, 36), _defineProperty(_exports$priorityMap, MinerFeeLevel.FAST, 18), _defineProperty(_exports$priorityMap, MinerFeeLevel.FASTEST, 12), _exports$priorityMap);
// 交易状态
var TxStatus;
(function (TxStatus) {
    TxStatus[TxStatus["PENDING"] = 0] = "PENDING";
    TxStatus[TxStatus["CONFIRMED"] = 1] = "CONFIRMED";
    TxStatus[TxStatus["FAILED"] = 2] = "FAILED";
    TxStatus[TxStatus["SUCCESS"] = 3] = "SUCCESS"; // 成功  一定的区块确认后认为succss
})(TxStatus = exports.TxStatus || (exports.TxStatus = {}));
// 交易类型
var TxType;
(function (TxType) {
    TxType[TxType["TRANSFER"] = 1] = "TRANSFER";
    TxType[TxType["RECEIPT"] = 2] = "RECEIPT";
    TxType[TxType["RECHARGE"] = 3] = "RECHARGE";
    TxType[TxType["EXCHANGE"] = 4] = "EXCHANGE"; // 币币兑换
})(TxType = exports.TxType || (exports.TxType = {}));
var TaskSid;
(function (TaskSid) {
    TaskSid[TaskSid["recharge"] = 301] = "recharge";
    TaskSid[TaskSid["withdraw"] = 302] = "withdraw";
    TaskSid[TaskSid["createWlt"] = 1001] = "createWlt";
    TaskSid[TaskSid["firstChargeEth"] = 1002] = "firstChargeEth";
    TaskSid[TaskSid["bindPhone"] = 1003] = "bindPhone";
    TaskSid[TaskSid["chargeEth"] = 1004] = "chargeEth";
    TaskSid[TaskSid["inviteFriends"] = 1005] = "inviteFriends";
    TaskSid[TaskSid["buyFinancial"] = 1007] = "buyFinancial";
    TaskSid[TaskSid["transfer"] = 1008] = "transfer";
    TaskSid[TaskSid["bonus"] = 1009] = "bonus";
    TaskSid[TaskSid["mines"] = 1010] = "mines";
    TaskSid[TaskSid["chat"] = 1011] = "chat";
    TaskSid[TaskSid["financialManagement"] = 330] = "financialManagement";
    TaskSid[TaskSid["redEnvelope"] = 340] = "redEnvelope"; // 红包
})(TaskSid = exports.TaskSid || (exports.TaskSid = {}));
})