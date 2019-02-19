_$define("app/api/JSAPI", function (require, exports, module){
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
/**
 * 授权、支付等API
 */
var root_1 = require("../../pi/ui/root");
var pull_1 = require("../net/pull");
var tools_1 = require("../utils/tools");
var walletTools_1 = require("../utils/walletTools");
/**
 * 授权接口
 * @param payload 需要授权内容
 * @param callback 回调
 */
exports.authorize = function (payload, callback) {
    console.log('authorize called', payload);
    exports.getOpenId(payload.appId, function (res) {
        var ret = {};
        ret.openId = res.openid;
        if (payload.avatar) {
            ret.avatar = tools_1.getUserInfo().avatar;
        }
        if (payload.nickName) {
            ret.nickName = tools_1.getUserInfo().nickName;
        }
        callback(undefined, ret);
    }, function (err) {
        callback(err);
    });
};
/**
 * 授权用户openID接口
 * @param appId appId
 * @param okCb 成功回调
 * @param failCb 失败回调
 */
exports.getOpenId = function (appId, okCb, failCb) {
    if (!appId) {
        failCb && failCb(new Error('appId is not available'));
        return;
    }
    // const authorize = JSON.parse(localStorage.getItem('authorize')) || {};
    // if (authorize[appId]) {
    //     okCb && okCb(authorize[appId]);
    //     return;
    // }
    var msg = { type: 'get_openid', param: { appid: appId } };
    pull_1.requestAsync(msg).then(function (resData) {
        // authorize[appId] = resData;
        // localStorage.setItem('authorize',JSON.stringify(authorize));
        okCb && okCb(resData);
    }).catch(function (err) {
        failCb && failCb(err);
    });
    // popNew('app-components1-modalBox-modalBox', {
    //     title: { zh_Hans:'是否授权',zh_Hant:'是否授權',en:'' },
    //     content: { zh_Hans:'授权成功将获取您的基本信息',zh_Hant:'授權成功將獲取您的基本信息',en:'' },
    //     sureText: { zh_Hans:'授权',zh_Hant:'授權',en:'' },
    //     cancelText: { zh_Hans:'取消',zh_Hant:'取消',en:'' }
    // },async () => {
    //     const msg = { type: 'get_openid', param: { appid:appId } };
    //     const close = popNew('app-components1-loading-loading', { text:'授权中...' });        
    //     try {
    //         const resData:any = await requestAsync(msg);
    //         close.callback(close.widget);
    //         if (resData.result === 1) {
    //             authorize[appId] = resData;
    //             localStorage.setItem('authorize',JSON.stringify(authorize));
    //             okCb && okCb(resData);
    //         } else {
    //             failCb && failCb(resData); 
    //         }
    //     } catch (err) {
    //         console.log('get_openid--------',err);
    //         failCb && failCb(err); 
    //         close.callback(close.widget);
    //     }
    // },() => {
    //     failCb && failCb(new Error('Deauthorization'));
    // });
};
/**
 * 启动支付接口(验证订单，展示订单信息)
 * @param order 订单信息,后台返回的订单json
 */
exports.openPayment = function (order, okCb, failCb) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        var msg, resData;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (order) {
                            _context2.next = 3;
                            break;
                        }

                        failCb && failCb(new Error('order is not available'));
                        return _context2.abrupt("return");

                    case 3:
                        if (typeof order !== 'string') {
                            order = JSON.stringify(order);
                        }
                        msg = { type: 'wallet/order@order_start', param: { json: order } };
                        _context2.prev = 5;
                        _context2.next = 8;
                        return pull_1.requestAsync(msg);

                    case 8:
                        resData = _context2.sent;

                        if (resData.result === 1) {
                            root_1.popNew('app-components1-modalBoxInput-modalBoxInput', {
                                title: '输入密码',
                                content: ["\u5546\u54C1\uFF1A" + resData.body, "\u603B\u989D\uFF1A" + resData.total_fee + "ST"],
                                itype: 'password'
                            }, function (r) {
                                return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    var loading, secretHash;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    loading = root_1.popNew('app-components1-loading-loading', { text: '支付中...' });
                                                    _context.next = 3;
                                                    return walletTools_1.VerifyIdentidy(r);

                                                case 3:
                                                    secretHash = _context.sent;

                                                    loading.callback(loading.widget);
                                                    if (secretHash) {
                                                        exports.pay(JSON.parse(order), secretHash, okCb, failCb);
                                                    } else {
                                                        root_1.popNew('app-components1-message-message', { content: '密码错误' });
                                                        exports.openPayment(order, okCb, failCb);
                                                    }

                                                case 6:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this);
                                }));
                            }, function () {
                                failCb && failCb(new Error('transactionId is not available'));
                            });
                        } else {
                            failCb && failCb(resData);
                        }
                        _context2.next = 15;
                        break;

                    case 12:
                        _context2.prev = 12;
                        _context2.t0 = _context2["catch"](5);

                        // console.log('order_start--------',err);
                        failCb && failCb(_context2.t0);

                    case 15:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[5, 12]]);
    }));
};
/**
 * 支付接口(输入密码进行支付)
 * @param psw 钱包密码
 * @param transactionId 交易id
 */
exports.pay = function (order, secretHash, okCb, failCb) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var json, signStr, msg, resData;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (order) {
                            _context3.next = 3;
                            break;
                        }

                        failCb && failCb(new Error('transactionId is not available'));
                        return _context3.abrupt("return");

                    case 3:
                        json = {
                            appid: order.appid,
                            transaction_id: order.transaction_id,
                            nonce_str: Math.random().toFixed(5)
                        };
                        signStr = getSign(json, secretHash);
                        msg = {
                            type: 'wallet/order@pay',
                            param: {
                                appid: json.appid,
                                transaction_id: json.transaction_id,
                                nonce_str: json.nonce_str,
                                sign: signStr
                            }
                        };
                        _context3.prev = 6;
                        _context3.next = 9;
                        return pull_1.requestAsync(msg);

                    case 9:
                        resData = _context3.sent;

                        if (resData.result === 1) {
                            okCb && okCb(resData);
                        } else {
                            failCb && failCb(resData);
                        }
                        _context3.next = 16;
                        break;

                    case 13:
                        _context3.prev = 13;
                        _context3.t0 = _context3["catch"](6);

                        // console.log('pay--------',err);
                        failCb && failCb(_context3.t0);

                    case 16:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[6, 13]]);
    }));
};
/**
 * 关闭交易
 * @param transactionId 交易id
 */
exports.closePayment = function (transactionId, okCb, failCb) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var msg, resData;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        if (transactionId) {
                            _context4.next = 3;
                            break;
                        }

                        failCb && failCb(new Error('transactionId is not available'));
                        return _context4.abrupt("return");

                    case 3:
                        msg = { type: 'wallet/order@close_order', param: { transaction_id: transactionId } };
                        _context4.prev = 4;
                        _context4.next = 7;
                        return pull_1.requestAsync(msg);

                    case 7:
                        resData = _context4.sent;

                        if (resData.result !== 1) {
                            failCb && failCb(new Error('closePayment is failed'));
                        } else {
                            okCb && okCb();
                        }
                        _context4.next = 14;
                        break;

                    case 11:
                        _context4.prev = 11;
                        _context4.t0 = _context4["catch"](4);

                        failCb && failCb(new Error('closePayment is failed'));

                    case 14:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[4, 11]]);
    }));
};
/**
 * 获取签名
 * @param json 签名json
 */
var getSign = function getSign(json, secretHash) {
    var getMnemonicByHash = pi_modules.commonjs.exports.relativeGet('app/utils/walletTools').exports.getMnemonicByHash;
    var mnemonic = getMnemonicByHash(secretHash);
    var GlobalWallet = pi_modules.commonjs.exports.relativeGet('app/core/globalWallet').exports.GlobalWallet;
    var wlt = GlobalWallet.createWltByMnemonic(mnemonic, 'ETH', 0);
    var sign = pi_modules.commonjs.exports.relativeGet('app/core/genmnemonic').exports.sign;
    return sign(jsonUriSort(json), wlt.exportPrivateKey());
};
/**
 * 拼接字符串为uri并按照字典排序;
 * @param json 拼接json
 */
var jsonUriSort = function jsonUriSort(json) {
    var keys = Object.keys(json).sort();
    var msg = '';
    for (var index in keys) {
        var key = keys[index];
        if (msg === '') {
            msg += key + "=" + json[key];
        } else {
            msg += "&" + key + "=" + json[key];
        }
    }
    return msg;
};
})