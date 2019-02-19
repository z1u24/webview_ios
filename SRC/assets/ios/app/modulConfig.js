_$define("app/modulConfig", function (require, exports, module){
"use strict";
/**
 *  app模块配置
 */

Object.defineProperty(exports, "__esModule", { value: true });
// ---------app模块功能配置----------------------------
var appModulConfig = {
    APP_CHAT: true,
    APP_WALLET: true,
    APP_EARN: false,
    APP_PLAY: true,
    FINANCIAL_SERVICES: false,
    GITHUB: true,
    WALLET_NAME: 'KuPlay',
    WALLET_WEBSITE: 'http://www.kupay.io',
    LOGIN_IMG: 'app/res/image/login_bg.png',
    WALLET_LOGO: 'app/res/image/img_logo.png',
    WECHAT_HELPER: 'app/res/image/wechat_robot.jpg',
    WECHAT_ACCOUNT: 'app/res/image/wechat_pn.jpg',
    PAY_DOMAIN: 'http://app.herominer.net' // 支付注册域名
};
exports.getModulConfig = function (modulName) {
    if (appModulConfig.hasOwnProperty(modulName)) {
        return appModulConfig[modulName];
    } else {
        return false;
    }
};
})