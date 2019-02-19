_$define("app/view/base/main", function (require, exports, module){
"use strict";
/**
 * @file 入口文件，用于登录，唤起hall界面
 * @author henk<speoth@163.com>
 */

Object.defineProperty(exports, "__esModule", { value: true });
var exitApp_1 = require("../../../pi/browser/exitApp");
var root_1 = require("../../../pi/ui/root");
var forelet_1 = require("../../../pi/widget/forelet");
var util_1 = require("../../../pi/widget/util");
var native_1 = require("../../logic/native");
var memstore_1 = require("../../store/memstore");
var tools_1 = require("../../utils/tools");
// ============================== 导出
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');
exports.run = function (cb) {
    util_1.addWidget(document.body, 'pi-ui-root');
    // 数据检查
    checkUpdate();
    // 打开首页面
    root_1.popNew('app-view-base-app');
    console.log('---------------------------------------------');
    // 锁屏页面
    popNewPage();
    // 预先从底层获取一些数据
    preFetchFromNative();
    console.timeEnd('home enter');
    // 后台切前台
    backToFront();
    // 解决进入时闪一下问题
    setTimeout(function () {
        if (cb) cb();
    }, 100);
};
/**
 * 界面入口
 */
var popNewPage = function popNewPage() {
    if (ifNeedUnlockScreen()) {
        root_1.popNew('app-components1-lockScreenPage-lockScreenPage', {
            openApp: true
        });
    }
};
/**
 * 预先从底层获取一些数据
 */
var preFetchFromNative = function preFetchFromNative() {
    var deviceId = memstore_1.getStore('setting/deviceId');
    if (!deviceId) {
        tools_1.fetchDeviceId().then(function (hash256deviceId) {
            memstore_1.setStore('setting/deviceId', hash256deviceId);
        });
    }
    // const deviceInfo = getStore('setting/deviceInfo');
    // if (!deviceInfo) {
    //     fetchDeviceInfo().then(info => {
    //         setStore('setting/deviceInfo',info);
    //     });
    // }
    native_1.getScreenModify();
};
var checkUpdate = function checkUpdate() {
    // todo
};
/**
 * 后台切换到前台
 * onBackPressed
 */
var backToFront = function backToFront() {
    window.handle_app_lifecycle_listener = function (iType) {
        if (iType === 'onAppResumed' && ifNeedUnlockScreen()) {
            root_1.popNew('app-components1-lockScreenPage-lockScreenPage', {
                openApp: true
            });
        } else if (iType === 'onBackPressed') {
            if (root_1.backList.length === 1) {
                var exitApp = new exitApp_1.ExitApp();
                exitApp.init();
                exitApp.ToHome({});
            } else {
                root_1.backCall();
            }
            // (<any>window).onpopstate();
            // widget.ok && widget.ok();
        }
    };
};
// ============================== 立即执行
/**
 * 是否需要解锁屏幕
 */
var ifNeedUnlockScreen = function ifNeedUnlockScreen() {
    var unlockScreen = document.getElementById('keyboard');
    if (unlockScreen) return false;
    var ls = memstore_1.getStore('setting/lockScreen', {});
    var lockScreenPsw = ls.psw;
    var openLockScreen = ls.open !== false;
    return lockScreenPsw && openLockScreen;
};
})