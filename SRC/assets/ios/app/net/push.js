_$define("app/net/push", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 后端主动推消息给后端
 */
var con_mgr_1 = require("../../pi/net/ui/con_mgr");
var root_1 = require("../../pi/ui/root");
var memstore_1 = require("../store/memstore");
var constants_1 = require("../utils/constants");
var tools_1 = require("../utils/tools");
var pull_1 = require("./pull");
// ===================================================== 导入
// ===================================================== 导出
/**
 * 主动推送初始化
 */
exports.initPush = function () {
    // 监听指令事件
    setPushListener('cmd', function (res) {
        console.log('强制下线==========================', res);
        con_mgr_1.setBottomLayerReloginMsg('', '', '');
        var cmd = res.cmd;
        if (cmd === constants_1.CMD.FORCELOGOUT) {
            tools_1.logoutAccount();
        } else if (cmd === constants_1.CMD.FORCELOGOUTDEL) {
            tools_1.logoutAccountDel();
        }
        return function () {
            root_1.popNew('app-components1-modalBox-modalBox', {
                sureText: { zh_Hans: '重新登录', zh_Hant: '重新登錄', en: '' },
                cancelText: { zh_Hans: '退出', zh_Hant: '退出', en: '' },
                title: { zh_Hans: '下线通知', zh_Hant: '下線通知', en: '' },
                content: { zh_Hans: '您的账户已被下线，如非本人操作，则助记词可能已泄露。', zh_Hant: '您的賬戶已被下線，如非本人操作，則助記詞可能已洩露。', en: '' }
            }, function () {
                setTimeout(function () {
                    for (var i = root_1.backList.length; i > 1; i--) {
                        root_1.backCall();
                    }
                    root_1.popNew('app-view-wallet-create-home');
                }, 100);
            }, function () {
                setTimeout(function () {
                    for (var i = root_1.backList.length; i > 1; i--) {
                        root_1.backCall();
                    }
                }, 100);
            });
        };
    });
    // 监听充值成功事件
    setPushListener('event_pay_ok', function (res) {
        var value = res.value.toJSNumber ? res.value.toJSNumber() : res.value;
        pull_1.getServerCloudBalance().then(function (res) {
            console.log('服务器推送成功 云端余额更新==========================', res);
        });
        console.log('服务器推送成功==========================', res);
        return function () {
            tools_1.popNewMessage(tools_1.getStaticLanguage().transfer.rechargeTips);
        };
    });
    // 监听余额变化事件
    // setMsgHandler('alter_balance_ok',(res) => {
    // if (res.coinType === CloudCurrencyType.KT) {
    //     popNew('app-view-earn-mining-addMineAlert',{ addNum:kpt2kt(res.num) });
    // }
    //     console.log('服务器推送成功==========================',res);
    // });
    // // 监听KT增加事件
    // setMsgHandler('event_kt_alert',(res) => {
    //     popNew('app-view-earn-mining-addMineAlert',{ addNum:kpt2kt(res.num),iconType:'KT' });
    //     console.log('服务器推送成功==========================',res);
    // });
};
// ===================================================== 本地
// 推送回调列表
var pushCallBackList = [];
/**
 * 设置推送监听,对setMsgHandler的封装
 *
 */
var setPushListener = function setPushListener(key, callback) {
    con_mgr_1.setMsgHandler(key, function (res) {
        var popTips = callback(res);
        var flags = memstore_1.getStore('flags');
        var loaded = flags.level_2_page_loaded; // 资源已经加载完成
        if (loaded) {
            popTips && popTips(res);
        } else {
            pushCallBackList.push(function () {
                popTips && popTips(res);
            });
        }
    });
};
memstore_1.register('flags/level_2_page_loaded', function (loaded) {
    // 将缓冲池中的回调函数都执行
    for (var _iterator = pushCallBackList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var cb = _ref;

        cb();
    }
    pushCallBackList = [];
});
})