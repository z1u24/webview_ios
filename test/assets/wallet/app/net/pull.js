_$define("app/net/pull", function (require, exports, module){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
 * 主动向后端通讯
 */
var con_mgr_1 = require("../../pi/net/ui/con_mgr");
var root_1 = require("../../pi/ui/root");
var config_1 = require("../config");
var genmnemonic_1 = require("../core/genmnemonic");
var interface_1 = require("../store/interface");
// tslint:disable-next-line:max-line-length
var parse_1 = require("../store/parse");
var store_1 = require("../store/store");
var constants_1 = require("../utils/constants");
var toolMessages_1 = require("../utils/toolMessages");
// tslint:disable-next-line:max-line-length
var tools_1 = require("../utils/tools");
var unitTools_1 = require("../utils/unitTools");
exports.conIp = pi_modules.store.exports.severIp || '127.0.0.1';
// export const conPort = '8080';
exports.conPort = pi_modules.store.exports.severPort || '80';
console.log('conIp=', exports.conIp);
console.log('conPort=', exports.conPort);
// 分享链接前缀
// export const sharePerUrl = `http://share.kupay.io/wallet/app/boot/share.html`;
exports.sharePerUrl = "http://" + exports.conPort + ":" + exports.conIp + "/wallet/phoneRedEnvelope/openRedEnvelope.html";
// 分享下载链接
exports.shareDownload = "http://" + exports.conPort + ":" + exports.conIp + "/wallet/phoneRedEnvelope/download.html";
// 上传图片url
exports.uploadFileUrl = "http://" + exports.conIp + "/service/upload";
// 上传的文件url前缀
exports.uploadFileUrlPrefix = "http://" + exports.conIp + "/service/get_file?sid=";
/**
 * 通用的异步通信
 */
exports.requestAsync = function (msg) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt("return", new Promise(function (resolve, reject) {
                            con_mgr_1.request(msg, function (resp) {
                                if (resp.type) {
                                    console.log("\u9519\u8BEF\u4FE1\u606F\u4E3A" + resp.type);
                                    reject(resp);
                                } else if (resp.result !== 1) {
                                    reject(resp);
                                } else {
                                    resolve(resp);
                                }
                            });
                        }));

                    case 1:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};
/**
 * 验证登录的异步通信
 */
exports.requestLogined = function (msg) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var wallet, passwd, GlobalWallet, sign, wlt, signStr, msgLogin, res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (!(store_1.find('loginState') === interface_1.LoginState.logined)) {
                            _context2.next = 4;
                            break;
                        }

                        return _context2.abrupt("return", exports.requestAsync(msg));

                    case 4:
                        wallet = store_1.find('curWallet');
                        passwd = '';

                        if (store_1.find('hashMap', wallet.walletId)) {
                            _context2.next = 12;
                            break;
                        }

                        _context2.next = 9;
                        return tools_1.popPswBox();

                    case 9:
                        passwd = _context2.sent;

                        if (passwd) {
                            _context2.next = 12;
                            break;
                        }

                        return _context2.abrupt("return");

                    case 12:
                        GlobalWallet = pi_modules.commonjs.exports.relativeGet('app/core/globalWallet').exports.GlobalWallet;
                        sign = pi_modules.commonjs.exports.relativeGet('app/core/genmnemonic').exports.sign;
                        _context2.next = 16;
                        return GlobalWallet.createWlt('ETH', passwd, wallet, 0);

                    case 16:
                        wlt = _context2.sent;
                        signStr = sign(store_1.find('conRandom'), wlt.exportPrivateKey());
                        msgLogin = { type: 'login', param: { sign: signStr } };

                        store_1.updateStore('loginState', interface_1.LoginState.logining);
                        _context2.next = 22;
                        return exports.requestAsync(msgLogin);

                    case 22:
                        res = _context2.sent;

                        if (!(res.result === 1)) {
                            _context2.next = 26;
                            break;
                        }

                        store_1.updateStore('loginState', interface_1.LoginState.logined);
                        return _context2.abrupt("return", exports.requestAsync(msg));

                    case 26:
                        store_1.updateStore('loginState', interface_1.LoginState.logerror);
                        return _context2.abrupt("return");

                    case 28:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
};
/**
 * 登录
 * @param passwd 密码
 */
exports.login = function (passwd) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var close, wallet, GlobalWallet, sign, wlt, signStr, msgLogin, res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (!(store_1.find('loginState') === interface_1.LoginState.logined)) {
                            _context3.next = 2;
                            break;
                        }

                        return _context3.abrupt("return");

                    case 2:
                        close = root_1.popNew('app-components1-loading-loading', { text: tools_1.getStaticLanguage().userInfo.loading });
                        wallet = store_1.find('curWallet');
                        GlobalWallet = pi_modules.commonjs.exports.relativeGet('app/core/globalWallet').exports.GlobalWallet;
                        sign = pi_modules.commonjs.exports.relativeGet('app/core/genmnemonic').exports.sign;
                        _context3.next = 8;
                        return GlobalWallet.createWlt('ETH', passwd, wallet, 0);

                    case 8:
                        wlt = _context3.sent;
                        signStr = sign(store_1.find('conRandom'), wlt.exportPrivateKey());
                        msgLogin = { type: 'login', param: { sign: signStr } };

                        store_1.updateStore('loginState', interface_1.LoginState.logining);
                        _context3.next = 14;
                        return exports.requestAsync(msgLogin);

                    case 14:
                        res = _context3.sent;

                        close.callback(close.widget);
                        if (res.result === 1) {
                            store_1.updateStore('loginState', interface_1.LoginState.logined);
                            root_1.popNew('app-components-message-message', { content: tools_1.getStaticLanguage().userInfo.loginSuccess });
                        } else {
                            store_1.updateStore('loginState', interface_1.LoginState.logerror);
                        }

                    case 17:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
};
/**
 * 申请自动登录token
 */
exports.applyAutoLogin = function () {
    var msg = {
        type: 'wallet/user@set_auto_login',
        param: {
            device_id: tools_1.fetchDeviceId()
        }
    };
    exports.requestAsync(msg).then(function (res) {
        var deviceId = tools_1.fetchDeviceId();
        var decryptToken = tools_1.encrypt(res.token, deviceId);
        store_1.updateStore('token', decryptToken);
    });
};
/**
 * 自动登录
 */
exports.autoLogin = function () {
    var deviceId = tools_1.fetchDeviceId();
    var token = tools_1.decrypt(store_1.find('token'), deviceId);
    var msg = {
        type: 'wallet/user@auto_login',
        param: {
            device_id: deviceId,
            timestamp: new Date().getTime(),
            token: token,
            random: store_1.find('conRandom')
        }
    };
    exports.requestAsync(msg).then(function (res) {
        console.log('自动登录成功-----------', res);
    });
};
/**
 * 创建钱包后默认登录
 * @param mnemonic 助记词
 */
exports.defaultLogin = function (hash) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var getMnemonicByHash, mnemonic, GlobalWallet, wlt, signStr, msgLogin, res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        getMnemonicByHash = pi_modules.commonjs.exports.relativeGet('app/utils/walletTools').exports.getMnemonicByHash;
                        mnemonic = getMnemonicByHash(hash);
                        GlobalWallet = pi_modules.commonjs.exports.relativeGet('app/core/globalWallet').exports.GlobalWallet;
                        wlt = GlobalWallet.createWltByMnemonic(mnemonic, 'ETH', 0);

                        console.log('================', wlt.exportPrivateKey());
                        signStr = genmnemonic_1.sign(store_1.find('conRandom'), wlt.exportPrivateKey());
                        msgLogin = { type: 'login', param: { sign: signStr } };

                        store_1.updateStore('loginState', interface_1.LoginState.logining);
                        _context4.next = 10;
                        return exports.requestAsync(msgLogin);

                    case 10:
                        res = _context4.sent;

                        if (res.result === 1) {
                            store_1.updateStore('loginState', interface_1.LoginState.logined);
                        } else {
                            store_1.updateStore('loginState', interface_1.LoginState.logerror);
                        }

                    case 12:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
};
var defaultConUser = '0x00000000000000000000000000000000000000000';
/**
 * 开启连接并获取验证随机数
 */
exports.openAndGetRandom = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var wallet, oldUser, gwlt;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        wallet = store_1.find('curWallet');

                        if (wallet) {
                            _context5.next = 5;
                            break;
                        }

                        con_mgr_1.setUrl("ws://" + exports.conIp + ":2081");
                        store_1.updateStore('conUser', defaultConUser);
                        return _context5.abrupt("return", doOpen());

                    case 5:
                        oldUser = store_1.find('conUser');

                        if (!(oldUser === wallet.walletId)) {
                            _context5.next = 8;
                            break;
                        }

                        return _context5.abrupt("return");

                    case 8:
                        // const gwlt = GlobalWallet.fromJSON(wallet.gwlt);
                        gwlt = JSON.parse(wallet.gwlt);

                        if (!oldUser) {
                            _context5.next = 14;
                            break;
                        }

                        con_mgr_1.closeCon();
                        store_1.updateStore('conUser', wallet.walletId);
                        store_1.updateStore('conUserPublicKey', gwlt.publicKey);
                        return _context5.abrupt("return");

                    case 14:
                        con_mgr_1.setUrl("ws://" + exports.conIp + ":2081");
                        store_1.updateStore('conUser', wallet.walletId);
                        store_1.updateStore('conUserPublicKey', gwlt.publicKey);
                        return _context5.abrupt("return", doOpen());

                    case 18:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));
};
var doOpen = function doOpen() {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        return _context8.abrupt("return", new Promise(function (resolve, reject) {
                            con_mgr_1.open(function (con) {
                                return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                                    var oldUser;
                                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                        while (1) {
                                            switch (_context6.prev = _context6.next) {
                                                case 0:
                                                    _context6.prev = 0;
                                                    oldUser = store_1.find('conUser');

                                                    if (!(oldUser !== defaultConUser)) {
                                                        _context6.next = 5;
                                                        break;
                                                    }

                                                    _context6.next = 5;
                                                    return exports.getRandom();

                                                case 5:
                                                    resolve(true);
                                                    _context6.next = 11;
                                                    break;

                                                case 8:
                                                    _context6.prev = 8;
                                                    _context6.t0 = _context6["catch"](0);

                                                    reject(false);

                                                case 11:
                                                case "end":
                                                    return _context6.stop();
                                            }
                                        }
                                    }, _callee6, this, [[0, 8]]);
                                }));
                            }, function (result) {
                                console.log("open\u9519\u8BEF\u4FE1\u606F\u4E3A" + result);
                                reject(result);
                            }, function () {
                                return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                        while (1) {
                                            switch (_context7.prev = _context7.next) {
                                                case 0:
                                                    store_1.updateStore('loginState', interface_1.LoginState.init);
                                                    _context7.prev = 1;
                                                    _context7.next = 4;
                                                    return doOpen();

                                                case 4:
                                                    resolve(true);
                                                    _context7.next = 10;
                                                    break;

                                                case 7:
                                                    _context7.prev = 7;
                                                    _context7.t0 = _context7["catch"](1);

                                                    reject(false);

                                                case 10:
                                                case "end":
                                                    return _context7.stop();
                                            }
                                        }
                                    }, _callee7, this, [[1, 7]]);
                                }));
                            });
                        }));

                    case 1:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));
};
/**
 * 获取随机数
 */
exports.getRandom = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var msg, resp, flag, hash;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        if (store_1.find('conUser')) {
                            _context9.next = 2;
                            break;
                        }

                        return _context9.abrupt("return");

                    case 2:
                        msg = { type: 'get_random', param: { account: store_1.find('conUser').slice(2), pk: "04" + store_1.find('conUserPublicKey') } };
                        _context9.next = 5;
                        return exports.requestAsync(msg);

                    case 5:
                        resp = _context9.sent;

                        store_1.updateStore('conRandom', resp.rand);
                        store_1.updateStore('conUid', resp.uid);
                        // 余额
                        exports.getCloudBalance();
                        // eth gasPrice
                        exports.fetchGasPrices();
                        // btc fees
                        exports.fetchBtcFees();
                        // 获取真实用户
                        exports.fetchRealUser();
                        flag = store_1.find('flag');
                        // 第一次创建不需要更新

                        if (!flag.created) {
                            // 用户基础信息
                            exports.getUserInfoFromServer([resp.uid]);
                        }
                        hash = store_1.getBorn('hashMap').get(tools_1.getFirstEthAddr());

                        if (hash) {
                            exports.defaultLogin(hash);
                        }

                    case 16:
                    case "end":
                        return _context9.stop();
                }
            }
        }, _callee9, this);
    }));
};
/**
 * 获取所有的货币余额
 */
exports.getCloudBalance = function () {
    var list = [];
    for (var k in interface_1.CurrencyType) {
        if (config_1.MainChainCoin.hasOwnProperty(k)) {
            list.push(interface_1.CurrencyType[k]);
        }
    }
    var msg = { type: 'wallet/account@get', param: { list: "[" + list + "]" } };
    return exports.requestAsync(msg).then(function (balanceInfo) {
        console.log('balanceInfo', balanceInfo);
        store_1.updateStore('cloudBalance', parse_1.parseCloudBalance(balanceInfo));
    });
};
/**
 * 获取指定类型的货币余额
 */
exports.getBalance = function (currencyType) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var msg;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        msg = { type: 'wallet/account@get', param: { list: "[" + currencyType + "]" } };

                        exports.requestAsync(msg).then(function (r) {
                            // todo 这里更新余额
                        });

                    case 2:
                    case "end":
                        return _context10.stop();
                }
            }
        }, _callee10, this);
    }));
};
/**
 * 获取分红汇总信息
 */
exports.getDividend = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var msg, data, num, yearIncome;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@get_bonus_total', param: {} };
                        _context11.next = 3;
                        return exports.getBonusHistory();

                    case 3:
                        data = _context11.sent;
                        num = data.value !== '' ? unitTools_1.wei2Eth(data.value[0][1]) : 0;
                        yearIncome = (num * 365 / 7).toFixed(4);

                        exports.requestAsync(msg).then(function (data) {
                            var dividend = {
                                totalDivid: unitTools_1.wei2Eth(data.value[0]),
                                totalDays: data.value[1],
                                thisDivid: unitTools_1.wei2Eth(data.value[2]),
                                yearIncome: yearIncome
                            };
                            store_1.updateStore('dividTotal', dividend);
                        });

                    case 7:
                    case "end":
                        return _context11.stop();
                }
            }
        }, _callee11, this);
    }));
};
/**
 * 获取后台发起分红历史记录
 */
exports.getBonusHistory = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var msg;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@get_bonus_history', param: {} };
                        return _context12.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context12.stop();
                }
            }
        }, _callee12, this);
    }));
};
/**
 * 获取挖矿汇总信息
 */
exports.getMining = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var msg;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
                switch (_context13.prev = _context13.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@get_mine_total', param: {} };

                        exports.requestAsync(msg).then(function (data) {
                            var totalNum = unitTools_1.kpt2kt(data.mine_total);
                            var holdNum = unitTools_1.kpt2kt(data.mines);
                            var today = unitTools_1.kpt2kt(data.today);
                            var nowNum = (totalNum - holdNum + today) * 0.25 - today; // 今日可挖数量为矿山剩余量的0.25减去今日已挖
                            if (nowNum <= 0) {
                                nowNum = 0; // 如果今日可挖小于等于0，表示现在不能挖
                            } else if (totalNum - holdNum >= 100) {
                                nowNum = nowNum < 100 && totalNum - holdNum >= 100 ? 100 : nowNum; // 如果今日可挖小于100，且矿山剩余量大于100，则今日可挖100
                            } else {
                                nowNum = totalNum - holdNum; // 如果矿山剩余量小于100，则本次挖完所有剩余量
                            }
                            var mining = {
                                totalNum: totalNum,
                                thisNum: nowNum,
                                holdNum: holdNum
                            };
                            console.log('-------------------', mining);
                            store_1.updateStore('miningTotal', mining);
                        });

                    case 2:
                    case "end":
                        return _context13.stop();
                }
            }
        }, _callee13, this);
    }));
};
/**
 * 获取挖矿历史记录
 */
exports.getMiningHistory = function () {
    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var msg;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
                switch (_context14.prev = _context14.next) {
                    case 0:
                        msg = {
                            type: 'wallet/cloud@get_pool_detail',
                            param: {
                                start: start,
                                count: constants_1.PAGELIMIT
                            }
                        };

                        exports.requestAsync(msg).then(function (data) {
                            var miningHistory = parse_1.parseMiningHistory(data);
                            store_1.updateStore('miningHistory', miningHistory);
                        });

                    case 2:
                    case "end":
                        return _context14.stop();
                }
            }
        }, _callee14, this);
    }));
};
// ==========================================红包start
/**
 * 获取邀请红包码
 */
exports.getInviteCode = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var msg;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@get_invite_code', param: {} };
                        return _context15.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context15.stop();
                }
            }
        }, _callee15, this);
    }));
};
/**
 * 兑换邀请红包
 */
exports.inputInviteCdKey = function (code) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var msg;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
                switch (_context16.prev = _context16.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@input_cd_key', param: { code: code } };
                        _context16.prev = 1;
                        _context16.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        return _context16.abrupt("return", []);

                    case 7:
                        _context16.prev = 7;
                        _context16.t0 = _context16["catch"](1);

                        console.log('input_cd_key--------', _context16.t0);
                        toolMessages_1.showError(_context16.t0 && (_context16.t0.result || _context16.t0.type));
                        return _context16.abrupt("return");

                    case 12:
                    case "end":
                        return _context16.stop();
                }
            }
        }, _callee16, this, [[1, 7]]);
    }));
};
/**
 * 获取邀请红包领取明细
 */
exports.getInviteCodeDetail = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        var msg, data;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
                switch (_context17.prev = _context17.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@get_invite_code_detail', param: {} };
                        _context17.next = 3;
                        return exports.requestAsync(msg);

                    case 3:
                        data = _context17.sent;
                        return _context17.abrupt("return", parse_1.parseMyInviteRedEnv(data.value));

                    case 5:
                    case "end":
                        return _context17.stop();
                }
            }
        }, _callee17, this);
    }));
};
/**
 * 发送红包
 * @param rtype 红包类型
 * @param ctype 货币类型
 * @param totalAmount 总金额
 * @param count 红包数量
 * @param lm 留言
 */
exports.sendRedEnvlope = function (rtype, ctype, totalAmount, redEnvelopeNumber, lm) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
        var msg, res;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
                switch (_context18.prev = _context18.next) {
                    case 0:
                        msg = {
                            type: 'emit_red_bag',
                            param: {
                                type: rtype,
                                priceType: ctype,
                                totalPrice: unitTools_1.largeUnit2SmallUnit(interface_1.CurrencyTypeReverse[ctype], totalAmount),
                                count: redEnvelopeNumber,
                                desc: lm
                            }
                        };
                        _context18.prev = 1;
                        _context18.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        res = _context18.sent;
                        return _context18.abrupt("return", res.value);

                    case 8:
                        _context18.prev = 8;
                        _context18.t0 = _context18["catch"](1);

                        toolMessages_1.showError(_context18.t0 && (_context18.t0.result || _context18.t0.type));
                        return _context18.abrupt("return");

                    case 12:
                    case "end":
                        return _context18.stop();
                }
            }
        }, _callee18, this, [[1, 8]]);
    }));
};
/**
 * 兑换红包
 */
exports.convertRedBag = function (cid) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        var msg, res;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
            while (1) {
                switch (_context19.prev = _context19.next) {
                    case 0:
                        msg = { type: 'convert_red_bag', param: { cid: cid } };
                        _context19.prev = 1;
                        _context19.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        res = _context19.sent;
                        return _context19.abrupt("return", res.value);

                    case 8:
                        _context19.prev = 8;
                        _context19.t0 = _context19["catch"](1);

                        toolMessages_1.showError(_context19.t0 && (_context19.t0.result || _context19.t0.type));
                        return _context19.abrupt("return");

                    case 12:
                    case "end":
                        return _context19.stop();
                }
            }
        }, _callee19, this, [[1, 8]]);
    }));
};
/**
 * 获取红包留言
 * @param cid 兑换码
 */
exports.queryRedBagDesc = function (cid) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
        var msg;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
            while (1) {
                switch (_context20.prev = _context20.next) {
                    case 0:
                        msg = {
                            type: 'query_red_bag_desc',
                            param: {
                                cid: cid
                            }
                        };
                        return _context20.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context20.stop();
                }
            }
        }, _callee20, this);
    }));
};
/**
 * 查询发送红包记录
 */
exports.querySendRedEnvelopeRecord = function (start) {
    var msg = void 0;
    if (start) {
        msg = {
            type: 'query_emit_log',
            param: {
                start: start,
                count: constants_1.PAGELIMIT
            }
        };
    } else {
        msg = {
            type: 'query_emit_log',
            param: {
                count: constants_1.PAGELIMIT
            }
        };
    }
    try {
        exports.requestAsync(msg).then(function (detail) {
            return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
                var data;
                return regeneratorRuntime.wrap(function _callee21$(_context21) {
                    while (1) {
                        switch (_context21.prev = _context21.next) {
                            case 0:
                                data = parse_1.parseSendRedEnvLog(detail.value);

                                store_1.updateStore('sHisRec', data);

                            case 2:
                            case "end":
                                return _context21.stop();
                        }
                    }
                }, _callee21, this);
            }));
        });
    } catch (err) {
        toolMessages_1.showError(err && (err.result || err.type));
        return;
    }
};
/**
 * 查询红包兑换记录
 */
exports.queryConvertLog = function (start) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
        var msg;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
            while (1) {
                switch (_context22.prev = _context22.next) {
                    case 0:
                        msg = void 0;

                        if (start) {
                            msg = {
                                type: 'query_convert_log',
                                param: {
                                    start: start,
                                    count: constants_1.PAGELIMIT
                                }
                            };
                        } else {
                            msg = {
                                type: 'query_convert_log',
                                param: {
                                    count: constants_1.PAGELIMIT
                                }
                            };
                        }
                        _context22.prev = 2;

                        exports.requestAsync(msg).then(function (detail) {
                            var data = parse_1.parseConvertLog(detail);
                            store_1.updateStore('cHisRec', data);
                        });
                        _context22.next = 10;
                        break;

                    case 6:
                        _context22.prev = 6;
                        _context22.t0 = _context22["catch"](2);

                        toolMessages_1.showError(_context22.t0 && (_context22.t0.result || _context22.t0.type));
                        return _context22.abrupt("return");

                    case 10:
                    case "end":
                        return _context22.stop();
                }
            }
        }, _callee22, this, [[2, 6]]);
    }));
};
/**
 * 查询某个红包兑换详情
 */
exports.queryDetailLog = function (uid, rid) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
        var msg, detail;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
            while (1) {
                switch (_context23.prev = _context23.next) {
                    case 0:
                        msg = {
                            type: 'query_detail_log',
                            param: {
                                uid: uid,
                                rid: rid
                            }
                        };

                        if (!(rid === '-1')) {
                            _context23.next = 3;
                            break;
                        }

                        return _context23.abrupt("return");

                    case 3:
                        _context23.prev = 3;
                        _context23.next = 6;
                        return exports.requestAsync(msg);

                    case 6:
                        detail = _context23.sent;
                        return _context23.abrupt("return", parse_1.parseExchangeDetail(detail.value));

                    case 10:
                        _context23.prev = 10;
                        _context23.t0 = _context23["catch"](3);

                        toolMessages_1.showError(_context23.t0 && (_context23.t0.result || _context23.t0.type));
                        return _context23.abrupt("return");

                    case 14:
                    case "end":
                        return _context23.stop();
                }
            }
        }, _callee23, this, [[3, 10]]);
    }));
};
// ==========================================红包end
/**
 * 挖矿
 */
exports.getAward = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
        var msg;
        return regeneratorRuntime.wrap(function _callee24$(_context24) {
            while (1) {
                switch (_context24.prev = _context24.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@get_award', param: {} };
                        return _context24.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context24.stop();
                }
            }
        }, _callee24, this);
    }));
};
/**
 * 矿山增加记录
 */
exports.getMineDetail = function () {
    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
        var msg;
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
            while (1) {
                switch (_context25.prev = _context25.next) {
                    case 0:
                        msg = {
                            type: 'wallet/cloud@grant_detail',
                            param: {
                                start: start,
                                count: constants_1.PAGELIMIT
                            }
                        };

                        exports.requestAsync(msg).then(function (detail) {
                            var list = parse_1.parseMineDetail(detail);
                            store_1.updateStore('addMine', list);
                        });

                    case 2:
                    case "end":
                        return _context25.stop();
                }
            }
        }, _callee25, this);
    }));
};
/**
 * 获取分红历史记录
 */
exports.getDividHistory = function () {
    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee26() {
        var msg;
        return regeneratorRuntime.wrap(function _callee26$(_context26) {
            while (1) {
                switch (_context26.prev = _context26.next) {
                    case 0:
                        msg = {
                            type: 'wallet/cloud@get_bonus_info',
                            param: {
                                start: start,
                                count: constants_1.PAGELIMIT
                            }
                        };

                        exports.requestAsync(msg).then(function (data) {
                            var dividHistory = parse_1.parseDividHistory(data);
                            store_1.updateStore('dividHistory', dividHistory);
                        });

                    case 2:
                    case "end":
                        return _context26.stop();
                }
            }
        }, _callee26, this);
    }));
};
/**
 * 设置客户端数据
 */
exports.setData = function (param) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee27() {
        var msg;
        return regeneratorRuntime.wrap(function _callee27$(_context27) {
            while (1) {
                switch (_context27.prev = _context27.next) {
                    case 0:
                        msg = { type: 'wallet/data@set', param: param };
                        return _context27.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context27.stop();
                }
            }
        }, _callee27, this);
    }));
};
/**
 * 获取客户端数据
 */
exports.getData = function (key) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee28() {
        var msg;
        return regeneratorRuntime.wrap(function _callee28$(_context28) {
            while (1) {
                switch (_context28.prev = _context28.next) {
                    case 0:
                        msg = { type: 'wallet/data@get', param: { key: key } };
                        return _context28.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context28.stop();
                }
            }
        }, _callee28, this);
    }));
};
/**
 * 设置用户基础信息
 */
exports.setUserInfo = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee29() {
        var userInfo, msg;
        return regeneratorRuntime.wrap(function _callee29$(_context29) {
            while (1) {
                switch (_context29.prev = _context29.next) {
                    case 0:
                        if (!(store_1.find("loginState") !== interface_1.LoginState.logined)) {
                            _context29.next = 2;
                            break;
                        }

                        return _context29.abrupt("return");

                    case 2:
                        userInfo = store_1.find('userInfo');
                        msg = { type: 'wallet/user@set_info', param: { value: JSON.stringify(userInfo) } };
                        return _context29.abrupt("return", exports.requestAsync(msg));

                    case 5:
                    case "end":
                        return _context29.stop();
                }
            }
        }, _callee29, this);
    }));
};
/**
 * 获取当前用户信息
 */
exports.getUserInfoFromServer = function (uids) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee30() {
        var msg, res, userInfo;
        return regeneratorRuntime.wrap(function _callee30$(_context30) {
            while (1) {
                switch (_context30.prev = _context30.next) {
                    case 0:
                        msg = { type: 'wallet/user@get_infos', param: { list: "[" + uids.toString() + "]" } };
                        _context30.prev = 1;
                        _context30.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        res = _context30.sent;

                        if (res.value[0]) {
                            userInfo = JSON.parse(tools_1.unicodeArray2Str(res.value[0]));

                            userInfo.fromServer = true;
                            console.log(userInfo);
                            store_1.updateStore('userInfo', userInfo);
                        }
                        _context30.next = 13;
                        break;

                    case 8:
                        _context30.prev = 8;
                        _context30.t0 = _context30["catch"](1);

                        console.log(_context30.t0);
                        toolMessages_1.showError(_context30.t0 && (_context30.t0.result || _context30.t0.type));
                        return _context30.abrupt("return");

                    case 13:
                    case "end":
                        return _context30.stop();
                }
            }
        }, _callee30, this, [[1, 8]]);
    }));
};
/**
 * 批量获取用户信息
 */
exports.getUserList = function (uids) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee31() {
        var msg, res;
        return regeneratorRuntime.wrap(function _callee31$(_context31) {
            while (1) {
                switch (_context31.prev = _context31.next) {
                    case 0:
                        msg = { type: 'wallet/user@get_infos', param: { list: "[" + uids.toString() + "]" } };
                        _context31.prev = 1;
                        _context31.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        res = _context31.sent;

                        if (!res.value[0]) {
                            _context31.next = 7;
                            break;
                        }

                        return _context31.abrupt("return", JSON.parse(tools_1.unicodeArray2Str(res.value[0])));

                    case 7:
                        _context31.next = 13;
                        break;

                    case 9:
                        _context31.prev = 9;
                        _context31.t0 = _context31["catch"](1);

                        toolMessages_1.showError(_context31.t0 && (_context31.t0.result || _context31.t0.type));
                        return _context31.abrupt("return");

                    case 13:
                    case "end":
                        return _context31.stop();
                }
            }
        }, _callee31, this, [[1, 9]]);
    }));
};
/**
 * 处理聊天
 */
exports.doChat = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee32() {
        var msg;
        return regeneratorRuntime.wrap(function _callee32$(_context32) {
            while (1) {
                switch (_context32.prev = _context32.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@chat', param: {} };

                        exports.requestAsync(msg).then(function (r) {
                            // 通信成功
                        });

                    case 2:
                    case "end":
                        return _context32.stop();
                }
            }
        }, _callee32, this);
    }));
};
/**
 * 获取指定货币流水
 */
exports.getAccountDetail = function (coin) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee33() {
        var msg, res, nextStart, detail, canLoadMore, accountDetailMap, accountDetail, _accountDetail$list;

        return regeneratorRuntime.wrap(function _callee33$(_context33) {
            while (1) {
                switch (_context33.prev = _context33.next) {
                    case 0:
                        msg = void 0;

                        if (start) {
                            msg = {
                                type: 'wallet/account@get_detail',
                                param: {
                                    coin: interface_1.CurrencyType[coin],
                                    start: start,
                                    count: constants_1.PAGELIMIT
                                }
                            };
                        } else {
                            msg = {
                                type: 'wallet/account@get_detail',
                                param: {
                                    coin: interface_1.CurrencyType[coin],
                                    count: constants_1.PAGELIMIT
                                }
                            };
                        }
                        _context33.prev = 2;
                        _context33.next = 5;
                        return exports.requestAsync(msg);

                    case 5:
                        res = _context33.sent;
                        nextStart = res.start;
                        detail = parse_1.parseCloudAccountDetail(coin, res.value);
                        canLoadMore = detail.length >= constants_1.PAGELIMIT;
                        accountDetailMap = store_1.getBorn('accountDetail');
                        accountDetail = accountDetailMap.get(interface_1.CurrencyType[coin]) || { list: [] };

                        if (!start) {
                            accountDetail.list = detail;
                        } else {
                            (_accountDetail$list = accountDetail.list).push.apply(_accountDetail$list, _toConsumableArray(detail));
                        }
                        accountDetail.start = nextStart;
                        accountDetail.canLoadMore = canLoadMore;
                        accountDetailMap.set(interface_1.CurrencyType[coin], accountDetail);
                        store_1.updateStore('accountDetail', accountDetailMap);
                        _context33.next = 22;
                        break;

                    case 18:
                        _context33.prev = 18;
                        _context33.t0 = _context33["catch"](2);

                        toolMessages_1.showError(_context33.t0 && (_context33.t0.result || _context33.t0.type));
                        return _context33.abrupt("return");

                    case 22:
                    case "end":
                        return _context33.stop();
                }
            }
        }, _callee33, this, [[2, 18]]);
    }));
};
/**
 * 获取矿山排名列表
 */
exports.getMineRank = function (num) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee34() {
        var msg;
        return regeneratorRuntime.wrap(function _callee34$(_context34) {
            while (1) {
                switch (_context34.prev = _context34.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@mine_top', param: { num: num } };

                        exports.requestAsync(msg).then(function (data) {
                            var mineData = parse_1.parseMineRank(data);
                            store_1.updateStore('mineRank', mineData);
                        });

                    case 2:
                    case "end":
                        return _context34.stop();
                }
            }
        }, _callee34, this);
    }));
};
/**
 * 获取挖矿排名列表
 */
exports.getMiningRank = function (num) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee35() {
        var msg;
        return regeneratorRuntime.wrap(function _callee35$(_context35) {
            while (1) {
                switch (_context35.prev = _context35.next) {
                    case 0:
                        msg = { type: 'wallet/cloud@get_mine_top', param: { num: num } };

                        exports.requestAsync(msg).then(function (data) {
                            var miningData = parse_1.parseMiningRank(data);
                            store_1.updateStore('miningRank', miningData);
                        });

                    case 2:
                    case "end":
                        return _context35.stop();
                }
            }
        }, _callee35, this);
    }));
};
/**
 * 发送验证码
 */
exports.sendCode = function (phone, num) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee36() {
        var msg;
        return regeneratorRuntime.wrap(function _callee36$(_context36) {
            while (1) {
                switch (_context36.prev = _context36.next) {
                    case 0:
                        msg = { type: 'wallet/sms@send_sms_code', param: { phone: phone, num: num, name: '钱包' } };
                        return _context36.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context36.stop();
                }
            }
        }, _callee36, this);
    }));
};
/**
 * 注册手机
 */
exports.regPhone = function (phone, code) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee37() {
        var msg;
        return regeneratorRuntime.wrap(function _callee37$(_context37) {
            while (1) {
                switch (_context37.prev = _context37.next) {
                    case 0:
                        msg = { type: 'wallet/user@reg_phone', param: { phone: phone, code: code } };
                        return _context37.abrupt("return", exports.requestAsync(msg).catch(function (error) {
                            if (error.type === -300) {
                                root_1.popNew('app-components-message-message', { itype: 'error', center: true, content: tools_1.getStaticLanguage().userInfo.bindPhone });
                            } else {
                                // tslint:disable-next-line:max-line-length
                                root_1.popNew('app-components-message-message', { itype: 'error', center: true, content: tools_1.getStaticLanguage().userInfo.wrong + error.type });
                            }
                        }));

                    case 2:
                    case "end":
                        return _context37.stop();
                }
            }
        }, _callee37, this);
    }));
};
/**
 * 获取代理
 */
exports.getProxy = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee38() {
        var msg;
        return regeneratorRuntime.wrap(function _callee38$(_context38) {
            while (1) {
                switch (_context38.prev = _context38.next) {
                    case 0:
                        msg = { type: 'wallet/proxy@get_proxy', param: {} };
                        return _context38.abrupt("return", exports.requestAsync(msg));

                    case 2:
                    case "end":
                        return _context38.stop();
                }
            }
        }, _callee38, this);
    }));
};
/**
 * 矿山增加项目跳转详情
 */
exports.getMineItemJump = function (itemJump) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee39() {
        return regeneratorRuntime.wrap(function _callee39$(_context39) {
            while (1) {
                switch (_context39.prev = _context39.next) {
                    case 0:
                        store_1.updateStore('mineItemJump', itemJump);

                    case 1:
                    case "end":
                        return _context39.stop();
                }
            }
        }, _callee39, this);
    }));
};
// ===============================充值提现
/**
 * 获取服务端eth钱包地址
 */
exports.getBankAddr = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee40() {
        var msg, res;
        return regeneratorRuntime.wrap(function _callee40$(_context40) {
            while (1) {
                switch (_context40.prev = _context40.next) {
                    case 0:
                        msg = {
                            type: 'wallet/bank@get_bank_addr',
                            param: {}
                        };
                        _context40.prev = 1;
                        _context40.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        res = _context40.sent;
                        return _context40.abrupt("return", res.value);

                    case 8:
                        _context40.prev = 8;
                        _context40.t0 = _context40["catch"](1);

                        toolMessages_1.showError(_context40.t0 && (_context40.t0.result || _context40.t0.type));
                        return _context40.abrupt("return");

                    case 12:
                    case "end":
                        return _context40.stop();
                }
            }
        }, _callee40, this, [[1, 8]]);
    }));
};
/**
 * 获取服务端btc钱包地址
 */
exports.getBtcBankAddr = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee41() {
        var msg, res;
        return regeneratorRuntime.wrap(function _callee41$(_context41) {
            while (1) {
                switch (_context41.prev = _context41.next) {
                    case 0:
                        msg = {
                            type: 'wallet/bank@get_btc_bank_addr',
                            param: {}
                        };
                        _context41.prev = 1;
                        _context41.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        res = _context41.sent;
                        return _context41.abrupt("return", res.value);

                    case 8:
                        _context41.prev = 8;
                        _context41.t0 = _context41["catch"](1);

                        toolMessages_1.showError(_context41.t0 && (_context41.t0.result || _context41.t0.type));
                        return _context41.abrupt("return");

                    case 12:
                    case "end":
                        return _context41.stop();
                }
            }
        }, _callee41, this, [[1, 8]]);
    }));
};
/**
 * 向服务器发起充值请求
 */
// tslint:disable-next-line:max-line-length
exports.rechargeToServer = function (fromAddr, toAddr, tx, nonce, gas, value) {
    var coin = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 101;
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee42() {
        var msg, res;
        return regeneratorRuntime.wrap(function _callee42$(_context42) {
            while (1) {
                switch (_context42.prev = _context42.next) {
                    case 0:
                        msg = {
                            type: 'wallet/bank@pay',
                            param: {
                                from: fromAddr,
                                to: toAddr,
                                tx: tx,
                                nonce: nonce,
                                gas: gas,
                                value: value,
                                coin: coin
                            }
                        };
                        _context42.prev = 1;
                        _context42.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        res = _context42.sent;

                        console.log('rechargeToServer', res);
                        return _context42.abrupt("return", true);

                    case 9:
                        _context42.prev = 9;
                        _context42.t0 = _context42["catch"](1);

                        toolMessages_1.showError(_context42.t0 && (_context42.t0.result || _context42.t0.type));
                        return _context42.abrupt("return", false);

                    case 13:
                    case "end":
                        return _context42.stop();
                }
            }
        }, _callee42, this, [[1, 9]]);
    }));
};
/**
 * 向服务器发起充值请求
 */
// tslint:disable-next-line:max-line-length
exports.btcRechargeToServer = function (toAddr, tx, value, fees, oldHash) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee43() {
        var old_tx, msg, res;
        return regeneratorRuntime.wrap(function _callee43$(_context43) {
            while (1) {
                switch (_context43.prev = _context43.next) {
                    case 0:
                        // tslint:disable-next-line:variable-name
                        old_tx = oldHash || 'none';
                        msg = {
                            type: 'wallet/bank@btc_pay',
                            param: {
                                to: toAddr,
                                tx: tx,
                                value: value,
                                fees: fees,
                                old_tx: old_tx
                            }
                        };
                        _context43.prev = 2;
                        _context43.next = 5;
                        return exports.requestAsync(msg);

                    case 5:
                        res = _context43.sent;

                        console.log('btcRechargeToServer', res);
                        return _context43.abrupt("return", true);

                    case 10:
                        _context43.prev = 10;
                        _context43.t0 = _context43["catch"](2);

                        toolMessages_1.showError(_context43.t0 && (_context43.t0.result || _context43.t0.type));
                        return _context43.abrupt("return", false);

                    case 14:
                    case "end":
                        return _context43.stop();
                }
            }
        }, _callee43, this, [[2, 10]]);
    }));
};
/**
 * 提现
 */
exports.withdrawFromServer = function (toAddr, value) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee44() {
        var msg, res;
        return regeneratorRuntime.wrap(function _callee44$(_context44) {
            while (1) {
                switch (_context44.prev = _context44.next) {
                    case 0:
                        msg = {
                            type: 'wallet/bank@to_cash',
                            param: {
                                to: toAddr,
                                value: value
                            }
                        };
                        _context44.prev = 1;
                        _context44.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        res = _context44.sent;

                        console.log('withdrawFromServer', res);
                        return _context44.abrupt("return", res.txid);

                    case 9:
                        _context44.prev = 9;
                        _context44.t0 = _context44["catch"](1);

                        toolMessages_1.showError(_context44.t0 && (_context44.t0.result || _context44.t0.type));
                        return _context44.abrupt("return");

                    case 13:
                    case "end":
                        return _context44.stop();
                }
            }
        }, _callee44, this, [[1, 9]]);
    }));
};
/**
 * btc提现
 */
exports.btcWithdrawFromServer = function (toAddr, value) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee45() {
        var msg, res;
        return regeneratorRuntime.wrap(function _callee45$(_context45) {
            while (1) {
                switch (_context45.prev = _context45.next) {
                    case 0:
                        msg = {
                            type: 'wallet/bank@btc_to_cash',
                            param: {
                                to: toAddr,
                                value: value
                            }
                        };
                        _context45.prev = 1;
                        _context45.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        res = _context45.sent;

                        console.log('btcWithdrawFromServer', res);
                        return _context45.abrupt("return", res.txid);

                    case 9:
                        _context45.prev = 9;
                        _context45.t0 = _context45["catch"](1);

                        toolMessages_1.showError(_context45.t0 && (_context45.t0.result || _context45.t0.type));
                        return _context45.abrupt("return");

                    case 13:
                    case "end":
                        return _context45.stop();
                }
            }
        }, _callee45, this, [[1, 9]]);
    }));
};
/**
 * 充值历史记录
 */
exports.getRechargeLogs = function (coin, start) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee46() {
        var type, msg, res, nextStart, detail, canLoadMore, rechargeLogsMap, rechargeLogs, _rechargeLogs$list;

        return regeneratorRuntime.wrap(function _callee46$(_context46) {
            while (1) {
                switch (_context46.prev = _context46.next) {
                    case 0:
                        // tslint:disable-next-line:no-reserved-keywords
                        type = void 0;

                        if (!(coin === 'BTC')) {
                            _context46.next = 5;
                            break;
                        }

                        type = 'wallet/bank@btc_pay_log';
                        _context46.next = 10;
                        break;

                    case 5:
                        if (!(coin === 'ETH')) {
                            _context46.next = 9;
                            break;
                        }

                        type = 'wallet/bank@pay_log';
                        _context46.next = 10;
                        break;

                    case 9:
                        return _context46.abrupt("return");

                    case 10:
                        msg = void 0;

                        if (start) {
                            msg = {
                                type: type,
                                param: {
                                    start: start,
                                    count: constants_1.PAGELIMIT
                                }
                            };
                        } else {
                            msg = {
                                type: type,
                                param: {
                                    count: constants_1.PAGELIMIT
                                }
                            };
                        }
                        _context46.prev = 12;
                        _context46.next = 15;
                        return exports.requestAsync(msg);

                    case 15:
                        res = _context46.sent;
                        nextStart = res.start.toJSNumber ? res.start.toJSNumber() : res.start;
                        detail = parse_1.parseRechargeWithdrawalLog(coin, res.value);
                        canLoadMore = detail.length >= constants_1.PAGELIMIT;
                        rechargeLogsMap = store_1.getBorn('rechargeLogs');
                        rechargeLogs = rechargeLogsMap.get(interface_1.CurrencyType[coin]) || { list: [] };

                        if (!start) {
                            rechargeLogs.list = detail;
                        } else {
                            (_rechargeLogs$list = rechargeLogs.list).push.apply(_rechargeLogs$list, _toConsumableArray(detail));
                        }
                        rechargeLogs.start = nextStart;
                        rechargeLogs.canLoadMore = canLoadMore;
                        rechargeLogsMap.set(interface_1.CurrencyType[coin], rechargeLogs);
                        store_1.updateStore('rechargeLogs', rechargeLogsMap);
                        _context46.next = 32;
                        break;

                    case 28:
                        _context46.prev = 28;
                        _context46.t0 = _context46["catch"](12);

                        toolMessages_1.showError(_context46.t0 && (_context46.t0.result || _context46.t0.type));
                        return _context46.abrupt("return");

                    case 32:
                    case "end":
                        return _context46.stop();
                }
            }
        }, _callee46, this, [[12, 28]]);
    }));
};
/**
 * 提现历史记录
 */
exports.getWithdrawLogs = function (coin, start) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee47() {
        var type, msg, res, nextStart, detail, canLoadMore, withdrawLogsMap, withdrawLogs, _withdrawLogs$list;

        return regeneratorRuntime.wrap(function _callee47$(_context47) {
            while (1) {
                switch (_context47.prev = _context47.next) {
                    case 0:
                        // tslint:disable-next-line:no-reserved-keywords
                        type = void 0;

                        if (!(coin === 'BTC')) {
                            _context47.next = 5;
                            break;
                        }

                        type = 'wallet/bank@btc_to_cash_log';
                        _context47.next = 10;
                        break;

                    case 5:
                        if (!(coin === 'ETH')) {
                            _context47.next = 9;
                            break;
                        }

                        type = 'wallet/bank@to_cash_log';
                        _context47.next = 10;
                        break;

                    case 9:
                        return _context47.abrupt("return");

                    case 10:
                        msg = void 0;

                        if (start) {
                            msg = {
                                type: type,
                                param: {
                                    start: start,
                                    count: constants_1.PAGELIMIT
                                }
                            };
                        } else {
                            msg = {
                                type: type,
                                param: {
                                    count: constants_1.PAGELIMIT
                                }
                            };
                        }
                        _context47.prev = 12;
                        _context47.next = 15;
                        return exports.requestAsync(msg);

                    case 15:
                        res = _context47.sent;
                        nextStart = res.start.toJSNumber ? res.start.toJSNumber() : res.start;
                        detail = parse_1.parseRechargeWithdrawalLog(coin, res.value);
                        canLoadMore = detail.length >= constants_1.PAGELIMIT;
                        withdrawLogsMap = store_1.getBorn('withdrawLogs');
                        withdrawLogs = withdrawLogsMap.get(interface_1.CurrencyType[coin]) || { list: [] };

                        if (!start) {
                            withdrawLogs.list = detail;
                        } else {
                            (_withdrawLogs$list = withdrawLogs.list).push.apply(_withdrawLogs$list, _toConsumableArray(detail));
                        }
                        withdrawLogs.start = nextStart;
                        withdrawLogs.canLoadMore = canLoadMore;
                        withdrawLogsMap.set(interface_1.CurrencyType[coin], withdrawLogs);
                        store_1.updateStore('withdrawLogs', withdrawLogsMap);
                        _context47.next = 32;
                        break;

                    case 28:
                        _context47.prev = 28;
                        _context47.t0 = _context47["catch"](12);

                        toolMessages_1.showError(_context47.t0 && (_context47.t0.result || _context47.t0.type));
                        return _context47.abrupt("return");

                    case 32:
                    case "end":
                        return _context47.stop();
                }
            }
        }, _callee47, this, [[12, 28]]);
    }));
};
/**
 * 获取理财列表
 */
exports.getProductList = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee48() {
        var msg, res, result;
        return regeneratorRuntime.wrap(function _callee48$(_context48) {
            while (1) {
                switch (_context48.prev = _context48.next) {
                    case 0:
                        msg = {
                            type: 'wallet/manage_money@get_product_list',
                            param: {}
                        };
                        _context48.prev = 1;
                        _context48.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        res = _context48.sent;
                        result = parse_1.parseProductList(res);

                        store_1.updateStore('productList', result);
                        return _context48.abrupt("return", result);

                    case 10:
                        _context48.prev = 10;
                        _context48.t0 = _context48["catch"](1);

                        toolMessages_1.showError(_context48.t0 && (_context48.t0.result || _context48.t0.type));
                        return _context48.abrupt("return", []);

                    case 14:
                    case "end":
                        return _context48.stop();
                }
            }
        }, _callee48, this, [[1, 10]]);
    }));
};
/**
 * 购买理财
 */
exports.buyProduct = function (pid, count) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee49() {
        var msg, res;
        return regeneratorRuntime.wrap(function _callee49$(_context49) {
            while (1) {
                switch (_context49.prev = _context49.next) {
                    case 0:
                        pid = Number(pid);
                        count = Number(count);
                        msg = {
                            type: 'wallet/manage_money@buy',
                            param: {
                                pid: pid,
                                count: count
                            }
                        };
                        _context49.prev = 3;
                        _context49.next = 6;
                        return exports.requestAsync(msg);

                    case 6:
                        res = _context49.sent;

                        console.log('buyProduct', res);

                        if (!(res.result === 1)) {
                            _context49.next = 13;
                            break;
                        }

                        exports.getProductList();
                        return _context49.abrupt("return", true);

                    case 13:
                        return _context49.abrupt("return", false);

                    case 14:
                        _context49.next = 20;
                        break;

                    case 16:
                        _context49.prev = 16;
                        _context49.t0 = _context49["catch"](3);

                        toolMessages_1.showError(_context49.t0 && (_context49.t0.result || _context49.t0.type));
                        return _context49.abrupt("return", false);

                    case 20:
                    case "end":
                        return _context49.stop();
                }
            }
        }, _callee49, this, [[3, 16]]);
    }));
};
/**
 * 购买记录
 */
exports.getPurchaseRecord = function () {
    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee50() {
        var msg, res, record;
        return regeneratorRuntime.wrap(function _callee50$(_context50) {
            while (1) {
                switch (_context50.prev = _context50.next) {
                    case 0:
                        msg = {
                            type: 'wallet/manage_money@get_pay_list',
                            param: {
                                start: start,
                                count: constants_1.PAGELIMIT
                            }
                        };
                        _context50.prev = 1;
                        _context50.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        res = _context50.sent;

                        console.log('getPurchaseRecord', res);
                        record = parse_1.parsePurchaseRecord(res);

                        store_1.updateStore('purchaseRecord', record);
                        _context50.next = 13;
                        break;

                    case 10:
                        _context50.prev = 10;
                        _context50.t0 = _context50["catch"](1);

                        toolMessages_1.showError(_context50.t0 && (_context50.t0.result || _context50.t0.type));

                    case 13:
                    case "end":
                        return _context50.stop();
                }
            }
        }, _callee50, this, [[1, 10]]);
    }));
};
/**
 * 赎回理财产品
 */
exports.buyBack = function (timeStamp) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee51() {
        var msg, res;
        return regeneratorRuntime.wrap(function _callee51$(_context51) {
            while (1) {
                switch (_context51.prev = _context51.next) {
                    case 0:
                        msg = {
                            type: 'wallet/manage_money@sell',
                            param: {
                                time: timeStamp
                            }
                        };
                        _context51.prev = 1;
                        _context51.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        res = _context51.sent;

                        console.log('buyBack', res);
                        return _context51.abrupt("return", true);

                    case 9:
                        _context51.prev = 9;
                        _context51.t0 = _context51["catch"](1);

                        toolMessages_1.showError(_context51.t0 && (_context51.t0.result || _context51.t0.type));
                        return _context51.abrupt("return", false);

                    case 13:
                    case "end":
                        return _context51.stop();
                }
            }
        }, _callee51, this, [[1, 9]]);
    }));
};
/**
 * 获取gasPrice
 */
exports.fetchGasPrices = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee52() {
        var msg, _gasPrice, res, gasPrice;

        return regeneratorRuntime.wrap(function _callee52$(_context52) {
            while (1) {
                switch (_context52.prev = _context52.next) {
                    case 0:
                        msg = {
                            type: 'wallet/bank@get_gas',
                            param: {}
                        };
                        _context52.prev = 1;
                        _context52.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        res = _context52.sent;
                        gasPrice = (_gasPrice = {}, _defineProperty(_gasPrice, interface_1.MinerFeeLevel.STANDARD, Number(res.standard)), _defineProperty(_gasPrice, interface_1.MinerFeeLevel.FAST, Number(res.fast)), _defineProperty(_gasPrice, interface_1.MinerFeeLevel.FASTEST, Number(res.fastest)), _gasPrice);

                        store_1.updateStore('gasPrice', gasPrice);
                        _context52.next = 12;
                        break;

                    case 9:
                        _context52.prev = 9;
                        _context52.t0 = _context52["catch"](1);

                        toolMessages_1.showError(_context52.t0 && (_context52.t0.result || _context52.t0.type));

                    case 12:
                    case "end":
                        return _context52.stop();
                }
            }
        }, _callee52, this, [[1, 9]]);
    }));
};
/**
 * 获取gasPrice
 */
exports.fetchBtcFees = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee53() {
        var msg, _btcMinerFee, res, obj, btcMinerFee;

        return regeneratorRuntime.wrap(function _callee53$(_context53) {
            while (1) {
                switch (_context53.prev = _context53.next) {
                    case 0:
                        msg = {
                            type: 'wallet/bank@get_fees',
                            param: {}
                        };
                        _context53.prev = 1;
                        _context53.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        res = _context53.sent;
                        obj = JSON.parse(res.btc);

                        console.log('fetchBtcFees------------', obj);
                        btcMinerFee = (_btcMinerFee = {}, _defineProperty(_btcMinerFee, interface_1.MinerFeeLevel.STANDARD, Number(obj.low_fee_per_kb)), _defineProperty(_btcMinerFee, interface_1.MinerFeeLevel.FAST, Number(obj.medium_fee_per_kb)), _defineProperty(_btcMinerFee, interface_1.MinerFeeLevel.FASTEST, Number(obj.high_fee_per_kb)), _btcMinerFee);

                        store_1.updateStore('btcMinerFee', btcMinerFee);
                        _context53.next = 14;
                        break;

                    case 11:
                        _context53.prev = 11;
                        _context53.t0 = _context53["catch"](1);

                        toolMessages_1.showError(_context53.t0 && (_context53.t0.result || _context53.t0.type));

                    case 14:
                    case "end":
                        return _context53.stop();
                }
            }
        }, _callee53, this, [[1, 11]]);
    }));
};
// 获取真实用户
exports.fetchRealUser = function () {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee54() {
        var msg, res, realUserMap, conUser;
        return regeneratorRuntime.wrap(function _callee54$(_context54) {
            while (1) {
                switch (_context54.prev = _context54.next) {
                    case 0:
                        msg = {
                            type: 'wallet/user@get_real_user',
                            param: {}
                        };
                        _context54.prev = 1;
                        _context54.next = 4;
                        return exports.requestAsync(msg);

                    case 4:
                        res = _context54.sent;
                        realUserMap = store_1.getBorn('realUserMap');
                        conUser = store_1.find('conUser');

                        if (conUser) {
                            _context54.next = 9;
                            break;
                        }

                        return _context54.abrupt("return");

                    case 9:
                        realUserMap.set(conUser, res.value === 'false' ? false : true);
                        store_1.updateStore('realUserMap', realUserMap);
                        _context54.next = 17;
                        break;

                    case 13:
                        _context54.prev = 13;
                        _context54.t0 = _context54["catch"](1);

                        console.log('wallet/user@get_real_user--------', _context54.t0);
                        toolMessages_1.showError(_context54.t0 && (_context54.t0.result || _context54.t0.type));

                    case 17:
                    case "end":
                        return _context54.stop();
                }
            }
        }, _callee54, this, [[1, 13]]);
    }));
};
// 上传文件
exports.uploadFile = function (base64) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee55() {
        var file, formData;
        return regeneratorRuntime.wrap(function _callee55$(_context55) {
            while (1) {
                switch (_context55.prev = _context55.next) {
                    case 0:
                        file = tools_1.base64ToFile(base64);
                        formData = new FormData();

                        formData.append('upload', file);
                        fetch(exports.uploadFileUrl, {
                            body: formData,
                            cache: 'no-cache',
                            credentials: 'same-origin',
                            headers: {
                                'user-agent': 'Mozilla/4.0 MDN Example'
                            },
                            method: 'POST',
                            mode: 'no-cors',
                            redirect: 'follow',
                            referrer: 'no-referrer' // *client, no-referrer
                        }).then(function (response) {
                            return response.json();
                        }).then(function (res) {
                            console.log('!!!!!!!!!!!', res);
                            if (res.result === 1) {
                                var sid = res.sid;
                                var userInfo = store_1.find('userInfo');
                                userInfo.avatar = sid;
                                userInfo.fromServer = false;
                                store_1.updateStore('userInfo', userInfo);
                            }
                        });

                    case 4:
                    case "end":
                        return _context55.stop();
                }
            }
        }, _callee55, this);
    }));
};
/**
 * 语言设置
 */
exports.languageSet = {
    simpleChinese: {},
    tranditionalChinese: {},
    english: {}
};
})