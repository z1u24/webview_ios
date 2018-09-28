_$define("app/store/localStorageStore", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 处理localStorage上的数据
 */
// ===================================================== 导入
var tools_1 = require("../utils/tools");
var store_1 = require("./store");
// ===================================================== 导出
// ===================================================== 本地
// ===================================================== 立即执行
var setLocalStorage = function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
};
var getLocalStorage = function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
};
// tslint:disable-next-line:max-func-body-length
exports.initLocalStorageStore = function () {
    store_1.register('walletList', function (walletList) {
        var locWallets = JSON.parse(localStorage.getItem('wallets'));
        if (!locWallets) locWallets = { curWalletId: '', salt: '', walletList: [] };
        locWallets.walletList = walletList;
        localStorage.setItem('wallets', JSON.stringify(locWallets));
    });
    store_1.register('addrs', function (addrs) {
        localStorage.setItem('addrs', JSON.stringify(addrs));
    });
    store_1.register('transactions', function (transactions) {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    });
    store_1.register('curWallet', function (curWallet) {
        var locWallets = JSON.parse(localStorage.getItem('wallets'));
        if (!curWallet || !locWallets || locWallets.walletList.length <= 0) return;
        locWallets.walletList = locWallets.walletList.map(function (v) {
            if (v.walletId === curWallet.walletId) {
                v = curWallet;
                locWallets.curWalletId = curWallet.walletId;
            }
            return v;
        });
        localStorage.setItem('wallets', JSON.stringify(locWallets));
        // ===============================更新walletList
        var walletList = JSON.parse(localStorage.getItem('wallets')).walletList;
        store_1.updateStore('walletList', walletList);
    });
    store_1.register('salt', function (salt) {
        var locWallets = JSON.parse(localStorage.getItem('wallets'));
        if (!locWallets) locWallets = { curWalletId: '', salt: '', walletList: [] };
        locWallets.salt = salt;
        localStorage.setItem('wallets', JSON.stringify(locWallets));
    });
    // 注册是否已阅读隐私协议
    store_1.register('readedPriAgr', function (readed) {
        setLocalStorage('readedPriAgr', readed);
    });
    // 锁屏相关
    store_1.register('lockScreen', function (ls) {
        setLocalStorage('lockScreen', ls);
    });
    // 发送红包记录
    store_1.register('sHisRec', function (sHisRec) {
        var sHisRecMap = new Map(getLocalStorage('sHisRecMap'));
        if (!sHisRec) {
            sHisRecMap.delete(tools_1.getFirstEthAddr());
        } else {
            sHisRecMap.set(tools_1.getFirstEthAddr(), sHisRec);
        }
        setLocalStorage('sHisRecMap', sHisRecMap);
    });
    // 兑换红包记录
    store_1.register('cHisRec', function (cHisRec) {
        var cHisRecMap = new Map(getLocalStorage('cHisRecMap'));
        if (!cHisRec) {
            cHisRecMap.delete(tools_1.getFirstEthAddr());
        } else {
            cHisRecMap.set(tools_1.getFirstEthAddr(), cHisRec);
        }
        setLocalStorage('cHisRecMap', cHisRecMap);
    });
    // 邀请红包记录
    store_1.register('inviteRedBagRec', function (inviteRedBagRec) {
        var inviteRedBagRecMap = new Map(getLocalStorage('inviteRedBagRecMap'));
        if (!inviteRedBagRec) {
            inviteRedBagRecMap.delete(tools_1.getFirstEthAddr());
        } else {
            inviteRedBagRecMap.set(tools_1.getFirstEthAddr(), inviteRedBagRec);
        }
        setLocalStorage('inviteRedBagRecMap', inviteRedBagRecMap);
    });
    // 常用联系人
    store_1.register('TopContacts', function (TopContacts) {
        setLocalStorage('TopContacts', TopContacts);
    });
    // shapeshift交易记录
    store_1.register('shapeShiftTxsMap', function (shapeShiftTxsMap) {
        setLocalStorage('shapeShiftTxsMap', shapeShiftTxsMap);
    });
    // ERC20精度
    store_1.register('ERC20TokenDecimals', function (ERC20TokenDecimals) {
        setLocalStorage('ERC20TokenDecimals', ERC20TokenDecimals);
    });
    store_1.register('lastGetSmsCodeTime', function (lastGetSmsCodeTime) {
        setLocalStorage('lastGetSmsCodeTime', lastGetSmsCodeTime);
    });
    // 本地eth nonce
    store_1.register('nonceMap', function (nonceMap) {
        setLocalStorage('nonceMap', nonceMap);
    });
    // 本地realUserMap
    store_1.register('realUserMap', function (realUserMap) {
        setLocalStorage('realUserMap', realUserMap);
    });
    // 本地realUserMap
    store_1.register('token', function (token) {
        setLocalStorage('token', token);
    });
};
})