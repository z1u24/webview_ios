_$define("app/utils/pay", function (require, exports, module){
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
var webview_1 = require("../../pi/browser/webview");
var root_1 = require("../../pi/ui/root");
var modulConfig_1 = require("../modulConfig");
var pull_1 = require("../net/pull");
var toolMessages_1 = require("./toolMessages");
var tools_1 = require("./tools");
/**
 * 确认订单支付接口
 * @param orderDetail 订单详情
 * @param okCb 成功回调
 * @param failCb 失败回调
 */
exports.confirmPay = function (orderDetail, okCb, failCb) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var msg, loading, resData, jumpData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (exports.checkOrder(orderDetail)) {
                            _context.next = 3;
                            break;
                        }

                        failCb && failCb('order is not ready');
                        return _context.abrupt("return");

                    case 3:
                        msg = { type: 'order_pay', param: orderDetail };
                        loading = root_1.popNew('app-components1-loading-loading', { text: { zh_Hans: '充值中...', zh_Hant: '充值中...', en: '' } });
                        _context.prev = 5;
                        _context.next = 8;
                        return pull_1.requestAsync(msg);

                    case 8:
                        resData = _context.sent;

                        if (resData.result === 1) {
                            // 下单成功
                            jumpData = {
                                oid: resData.oid,
                                mweb_url: ''
                            };

                            if (orderDetail.payType === 'alipay') {
                                // 支付宝H5支付
                                fetch('https://openapi.alipay.com/gateway.do', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                    },
                                    body: URLencode(resData.JsData) // 这里是请求对象
                                }).then(function (res) {
                                    jumpData.mweb_url = res.url;
                                    exports.jumpAlipay(jumpData, okCb, failCb);
                                }).catch(function (err) {
                                    failCb && failCb(err);
                                });
                            } else if (orderDetail.payType === 'wxpay') {
                                // 微信H5支付
                                jumpData.mweb_url = JSON.parse(resData.JsData).mweb_url;
                                exports.jumpWxpay(jumpData, okCb, failCb);
                            }
                        } else {
                            toolMessages_1.showError(resData.result);
                            failCb && failCb(resData);
                        }
                        setTimeout(function () {
                            loading.callback(loading.widget);
                        }, 5000);
                        _context.next = 18;
                        break;

                    case 13:
                        _context.prev = 13;
                        _context.t0 = _context["catch"](5);

                        toolMessages_1.showError(_context.t0 && (_context.t0.result || _context.t0.type));
                        failCb && failCb(_context.t0);
                        loading.callback(loading.widget);

                    case 18:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[5, 13]]);
    }));
};
/**
 * 检查订单
 * @param order 订单详情
 */
exports.checkOrder = function (order) {
    if (!order.total) {
        return false;
    }
    if (!order.num) {
        return false;
    }
    if (!order.payType) {
        return false;
    }
    if (!order.body) {
        return false;
    }
    return true;
};
/**
 * 跳转微信支付
 * @param order 订单支付跳转信息
 * @param okCb 成功回调
 * @param failCb 失败回调
 */
exports.jumpWxpay = function (order, okCb, failCb) {
    webview_1.WebViewManager.newView('payWebView', order.mweb_url, { Referer: modulConfig_1.getModulConfig('PAY_DOMAIN') });
    setTimeout(function () {
        root_1.popNew('app-components1-modalBox-modalBox', {
            title: '',
            content: { zh_Hans: '请确认支付是否已完成？', zh_Hant: '请确认支付是否已完成？', en: '' },
            style: 'color:#F7931A;',
            sureText: { zh_Hans: '支付成功', zh_Hant: '支付成功', en: '' },
            cancelText: { zh_Hans: '重新支付', zh_Hant: '重新支付', en: '' }
        }, function () {
            okCb && okCb(order);
            webview_1.WebViewManager.freeView('payWebView');
        }, function () {
            failCb && failCb();
            webview_1.WebViewManager.freeView('payWebView');
        });
    }, 5000);
};
/**
 * 跳转支付宝支付
 * @param order 订单支付跳转信息
 * @param okCb 成功回调
 * @param failCb 失败回调
 */
exports.jumpAlipay = function (order, okCb, failCb) {
    var $payIframe = document.createElement('iframe');
    $payIframe.setAttribute('sandbox', 'allow-scripts allow-top-navigation');
    $payIframe.setAttribute('src', order.mweb_url);
    $payIframe.setAttribute('style', 'position:absolute;width:0px;height:0px;visibility:hidden;');
    document.body.appendChild($payIframe);
    setTimeout(function () {
        root_1.popNew('app-components1-modalBox-modalBox', {
            title: '',
            content: { zh_Hans: '请确认支付是否已完成？', zh_Hant: '请确认支付是否已完成？', en: '' },
            style: 'color:#F7931A;',
            sureText: { zh_Hans: '支付成功', zh_Hant: '支付成功', en: '' },
            cancelText: { zh_Hans: '重新支付', zh_Hant: '重新支付', en: '' }
        }, function () {
            okCb && okCb(order);
            document.body.removeChild($payIframe);
        }, function () {
            failCb && failCb();
            document.body.removeChild($payIframe);
        });
    }, 5000);
};
/**
 * 查询订单支付状态
 * @param oid 查询订单号
 * @param okCb 成功回调
 * @param failCb 失败回调
 */
exports.getPayState = function (oid, okCb, failCb) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var msg, resData;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (oid) {
                            _context2.next = 3;
                            break;
                        }

                        failCb && failCb('oid is not ready');
                        return _context2.abrupt("return");

                    case 3:
                        msg = { type: 'order_query', param: { oid: oid } };
                        _context2.prev = 4;
                        _context2.next = 7;
                        return pull_1.requestAsync(msg);

                    case 7:
                        resData = _context2.sent;

                        if (resData.result === 1) {
                            okCb && okCb(resData);
                        } else {
                            toolMessages_1.showError(resData.result);
                            failCb && failCb(resData);
                        }
                        _context2.next = 16;
                        break;

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2["catch"](4);

                        console.log('order_query--------', _context2.t0);
                        tools_1.popNewMessage({ zh_Hans: '获取订单信息失败', zh_Hant: '获取订单信息失败', en: '' });
                        failCb && failCb(_context2.t0);

                    case 16:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[4, 11]]);
    }));
};
/**
 * 查询订单详情
 * @param oid 查询订单号
 * @param okCb 成功回调
 * @param failCb 失败回调
 */
exports.getOrderDetail = function (oid, okCb, failCb) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var msg, resData;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (oid) {
                            _context3.next = 3;
                            break;
                        }

                        failCb && failCb('oid is not ready');
                        return _context3.abrupt("return");

                    case 3:
                        msg = { type: 'get_order_detail', param: { oid: oid } };
                        _context3.prev = 4;
                        _context3.next = 7;
                        return pull_1.requestAsync(msg);

                    case 7:
                        resData = _context3.sent;

                        if (resData.result === 1) {
                            okCb && okCb(resData);
                        } else {
                            toolMessages_1.showError(resData.result);
                            failCb && failCb(resData);
                        }
                        _context3.next = 16;
                        break;

                    case 11:
                        _context3.prev = 11;
                        _context3.t0 = _context3["catch"](4);

                        console.log('get_order_detail--------', _context3.t0);
                        tools_1.popNewMessage({ zh_Hans: '获取订单信息失败', zh_Hant: '获取订单信息失败', en: '' });
                        failCb && failCb(_context3.t0);

                    case 16:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[4, 11]]);
    }));
};
/**
 * 特殊字符转码
 * @param sStr str
 */
var URLencode = function URLencode(sStr) {
    var signStr = sStr.split('&');
    // tslint:disable-next-line:max-line-length
    signStr[0] = "sign=" + escape(signStr[0].slice(5)).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F');
    return signStr.join('&');
};
})