_$define("app/utils/tools", function (require, exports, module){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
 * common tools
 */
var argonHash_1 = require("../../pi/browser/argonHash");
var root_1 = require("../../pi/ui/root");
var config_1 = require("../config");
var cipher_1 = require("../core/crypto/cipher");
var pull_1 = require("../net/pull");
// tslint:disable-next-line:max-line-length
var interface_1 = require("../store/interface");
var store_1 = require("../store/store");
var constants_1 = require("./constants");
var con_mgr_1 = require("../../pi/net/ui/con_mgr");
exports.depCopy = function (v) {
    return JSON.parse(JSON.stringify(v));
};
/**
 * 获取指定id的钱包
 */
exports.getWalletByWalletId = function (wallets, walletId) {
    if (!(wallets && wallets.length > 0)) return null;
    for (var i = 0; i < wallets.length; i++) {
        if (wallets[i].walletId === walletId) return wallets[i];
    }
    return null;
};
/**
 * 获取指定id钱包的index
 */
exports.getWalletIndexByWalletId = function (wallets, walletId) {
    if (!(wallets && wallets.length > 0)) {
        return -1;
    }
    for (var i = 0; i < wallets.length; i++) {
        if (wallets[i].walletId === walletId) return i;
    }
    return -1;
};
/**
 * 获取当前钱包对应货币正在使用的地址信息
 * @param currencyName 货币类型
 */
exports.getCurrentAddrInfo = function (currencyName) {
    var addrs = store_1.find('addrs') || [];
    var wallet = store_1.find('curWallet');
    var currencyRecord = wallet.currencyRecords.filter(function (item) {
        return item.currencyName === currencyName;
    })[0];
    // tslint:disable-next-line:no-unnecessary-local-variable
    var addrInfo = addrs.filter(function (item) {
        return item.addr === currencyRecord.currentAddr && item.currencyName === currencyName;
    })[0];
    return addrInfo;
};
/**
 * 通过地址id获取地址信息
 * @param addrId  address id
 */
exports.getAddrById = function (addrId, currencyName) {
    var list = store_1.find('addrs') || [];
    return list.filter(function (v) {
        return v.addr === addrId && v.currencyName === currencyName;
    })[0];
};
/**
 * 通过地址id重置地址
 * @param addrId address id
 * @param data  新地址
 * @param notified 是否通知数据发生改变
 */
exports.resetAddrById = function (addrId, currencyName, data) {
    var list = store_1.find('addrs') || [];
    list = list.map(function (v) {
        if (v.addr === addrId && v.currencyName === currencyName) return data;
        return v;
    });
    store_1.updateStore('addrs', list);
};
/**
 * 获取钱包下的所有地址
 * @param wallet wallet obj
 */
exports.getAddrsAll = function (wallet) {
    var currencyRecords = wallet.currencyRecords;
    var retAddrs = [];
    currencyRecords.forEach(function (item) {
        retAddrs.push.apply(retAddrs, _toConsumableArray(item.addrs));
    });
    // 去除数组中重复的地址
    return [].concat(_toConsumableArray(new Set(retAddrs)));
};
/**
 * 获取钱包下指定货币类型的所有地址
 * @param wallet wallet obj
 */
exports.getAddrsByCurrencyName = function (wallet, currencyName) {
    var currencyRecords = wallet.currencyRecords;
    var retAddrs = [];
    var len = currencyRecords.length;
    for (var i = 0; i < len; i++) {
        if (currencyRecords[i].currencyName === currencyName) {
            retAddrs.push.apply(retAddrs, _toConsumableArray(currencyRecords[i].addrs));
            break;
        }
    }
    return retAddrs;
};
/**
 * 获取钱包下指定货币类型的所有地址信息
 * @param wallet wallet obj
 */
exports.getAddrsInfoByCurrencyName = function (currencyName) {
    var wallet = store_1.find('curWallet');
    var currencyRecords = wallet.currencyRecords;
    var retAddrInfo = [];
    var len = currencyRecords.length;
    for (var i = 0; i < len; i++) {
        if (currencyRecords[i].currencyName === currencyName) {
            for (var j = 0; j < currencyRecords[i].addrs.length; j++) {
                var addr = currencyRecords[i].addrs[j];
                var obj = {
                    addr: addr,
                    balance: exports.getAddrInfoByAddr(addr, currencyName).balance
                };
                retAddrInfo.push(obj);
            }
            break;
        }
    }
    return retAddrInfo;
};
/**
 * 通过地址获取地址余额
 */
exports.getAddrInfoByAddr = function (addr, currencyName) {
    var addrs = store_1.find('addrs') || [];
    return addrs.filter(function (v) {
        return v.addr === addr && v.currencyName === currencyName;
    })[0];
};
// 随机生成RGB颜色
exports.randomRgbColor = function () {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")"; // 返回rgb(r,g,b)格式颜色
};
/**
 * 解析显示的账号信息
 * @param str 需要解析的字符串
 */
exports.parseAccount = function (str) {
    if (str.length <= 29) return str;
    return str.slice(0, 8) + "..." + str.slice(str.length - 8, str.length);
};
exports.getDefaultAddr = function (addr) {
    var addrStr = addr.toString();
    return addrStr.slice(0, 3) + "..." + addrStr.slice(-3);
};
/**
 * 转化显示时间
 * @param t date
 */
exports.parseDate = function (t) {
    // tslint:disable-next-line:max-line-length
    return t.getUTCFullYear() + "-" + addPerZero(t.getUTCMonth() + 1, 2) + "-" + addPerZero(t.getUTCDate(), 2) + " " + addPerZero(t.getHours(), 2) + ":" + addPerZero(t.getMinutes(), 2);
};
/**
 * 转化显示时间格式为‘04-30 14:32:00’
 */
exports.transDate = function (t) {
    // tslint:disable-next-line:max-line-length
    return addPerZero(t.getUTCMonth() + 1, 2) + "-" + addPerZero(t.getUTCDate(), 2) + " " + addPerZero(t.getHours(), 2) + ":" + addPerZero(t.getMinutes(), 2) + ":" + addPerZero(t.getSeconds(), 2);
};
/**
 * 数字前边加0
 */
var addPerZero = function addPerZero(num, len) {
    var numStr = num.toString();
    var perLen = len - numStr.length;
    if (perLen <= 0) return numStr;
    var list = [];
    list.length = perLen;
    return list.fill('0').join('') + numStr;
};
// 数组乱序
exports.shuffle = function (arr) {
    var length = arr.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
        rand = ~~(Math.random() * (index + 1));
        if (rand !== index) {
            shuffled[index] = shuffled[rand];
        }
        shuffled[rand] = arr[index];
    }
    return shuffled;
};
/**
 * 获取字符串有效长度
 * @param str 字符串
 *
 * 中文字符算2个字符
 */
exports.getStrLen = function (str) {
    if (str === null) return 0;
    if (typeof str !== 'string') {
        str += '';
    }
    return str.replace(/[^\x00-\xff]/g, '01').length;
};
/**
 * 截取字符串
 * @param str 字符串
 * @param start 开始位置
 * @param len 截取长度
 */
exports.sliceStr = function (str, start, len) {
    if (str === null) return '';
    if (typeof str !== 'string') str += '';
    var r = '';
    for (var i = start; i < str.length; i++) {
        len--;
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
            len--;
        }
        if (len < 0) break;
        r += str[i];
    }
    return r;
};
// 函数防抖
exports.debounce = function (fn) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

    var timer = null;
    return function () {
        for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
            rest[_key] = arguments[_key];
        }

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function () {
            fn.apply(undefined, rest);
        }, wait);
    };
};
/**
 * 解析url中指定key的值
 * @param url url地址
 * @param key 键
 */
exports.urlParams = function (url, key) {
    var ret = url.match(new RegExp("(\\?|&)" + key + "=(.*?)(&|$)"));
    return ret && decodeURIComponent(ret[2]);
};
/**
 * 金额格式化
 * @param banlance 金额
 */
exports.formatBalance = function (banlance) {
    if (!banlance) return 0;
    return Number(banlance.toFixed(6));
};
/**
 * 余额格式化
 */
exports.formatBalanceValue = function (value) {
    return value.toFixed(2);
};
/**
 * 字符串转u8Arr
 *
 * @param str 输入字符串
 */
exports.str2arr = function (str) {
    var len = str.length;
    var arr = [];
    var arr32 = void 0;
    var i = void 0;
    var offset = 0;
    if (len >= 32) {
        for (i = 0; i < 8; i++) {
            arr[i] = (str.charCodeAt(i * 4) & 0xff) << 24 | (str.charCodeAt(i * 4 + 1) & 0xff) << 16 | (str.charCodeAt(i * 4 + 2) & 0xff) << 8 | str.charCodeAt(i * 4 + 3) & 0xff;
        }
    }
    arr32 = new Uint32Array(new ArrayBuffer(32));
    for (i = 0; i < 8; i++) {
        arr32[i] = arr[offset++];
    }
    return new Uint8Array(arr32.buffer, 0, 32);
};
/**
 * u16Arr转字符串
 *
 * @param buf 输入buff
 */
exports.ab2str = function (buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
};
/**
 * 字符串转u16Arr
 *
 * @param str 输入字符串
 */
exports.str2ab = function (str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
};
/**
 * 字节数组转十六进制字符串
 * @param arr 传入数组
 */
exports.bytes2Str = function (arr) {
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        var tmp = arr[i].toString(16);
        if (tmp.length === 1) {
            tmp = "0" + tmp;
        }
        str += tmp;
    }
    return str;
};
/**
 * 十六进制字符串转字节数组
 * @param str 传入字符串
 */
exports.str2Bytes = function (str) {
    var pos = 0;
    var len = str.length;
    if (len % 2 !== 0) return null;
    len /= 2;
    var hexA = [];
    for (var i = 0; i < len; i++) {
        var s = str.substr(pos, 2);
        var v = parseInt(s, 16);
        hexA.push(v);
        pos += 2;
    }
    return hexA;
};
/**
 * 十六进制字符串转u8数组
 *
 * @param str 输入字符串
 */
exports.hexstrToU8Array = function (str) {
    if (str.length % 2 > 0) str = "0" + str;
    var r = new Uint8Array(str.length / 2);
    for (var i = 0; i < str.length; i += 2) {
        var high = parseInt(str.charAt(i), 16);
        var low = parseInt(str.charAt(i + 1), 16);
        r[i / 2] = high * 16 + low;
    }
    return r;
};
/**
 * u8数组转十六进制字符串
 *
 * @param u8Array 输入数组
 */
exports.u8ArrayToHexstr = function (u8Array) {
    var str = '';
    for (var i = 0; i < u8Array.length; i++) {
        str += Math.floor(u8Array[i] / 16).toString(16);
        str += (u8Array[i] % 16).toString(16);
        // str += u8Array[i].toString(16);
    }
    if (str[0] === '0') str = str.slice(1);
    return str;
};
/**
 * 简化加密助记词
 *
 * @param cipherMnemonic 加密助记词
 */
exports.simplifyCipherMnemonic = function (cipherMnemonic) {
    var r = JSON.parse(cipherMnemonic);
    var newJson = { iv: r.iv, ct: r.ct, salt: r.salt };
    return JSON.stringify(newJson);
};
/**
 * 还原加密助记词
 *
 * @param cipherMnemonic 加密助记词
 */
exports.reductionCipherMnemonic = function (cipherMnemonic) {
    var r = JSON.parse(cipherMnemonic);
    var newJson = {
        iv: r.iv, ct: r.ct, salt: r.salt, v: 1, iter: 10000, ks: 128, ts: 64,
        mode: 'ccm', adata: '', cipher: 'aes', keySize: 128, tagSize: 64
    };
    return JSON.stringify(newJson);
};
/**
 * 获取指定货币下余额总数
 * @param currencyName 货币名称
 */
exports.fetchBalanceOfCurrency = function (currencyName) {
    var wallet = store_1.find('curWallet');
    if (!wallet) return 0;
    var localAddrs = store_1.find('addrs') || [];
    var balance = 0;
    var addrs = [];
    for (var i = 0; i < wallet.currencyRecords.length; i++) {
        if (wallet.currencyRecords[i].currencyName === currencyName) {
            addrs = wallet.currencyRecords[i].addrs;
            break;
        }
    }
    localAddrs.forEach(function (item) {
        if (addrs.indexOf(item.addr) >= 0 && item.currencyName === currencyName) {
            balance += item.balance;
        }
    });
    return balance;
};
/**
 * 获取总资产
 */
exports.fetchTotalAssets = function () {
    var wallet = store_1.find('curWallet');
    if (!wallet) return 0;
    var totalAssets = 0;
    wallet.currencyRecords.forEach(function (item) {
        if (wallet.showCurrencys.indexOf(item.currencyName) >= 0) {
            var balance = exports.fetchBalanceOfCurrency(item.currencyName);
            totalAssets += balance * store_1.find('exchangeRateJson', item.currencyName).CNY;
        }
    });
    return totalAssets;
};
/**
 * 获取异或值
 * @param first 前段
 * @param second 后段
 */
exports.getXOR = function (first, second) {
    if (first.length !== second.length) return '';
    var arr = [];
    for (var i = 0; i < first.length; i++) {
        var m = parseInt(first.substr(i, 1), 16);
        var k = parseInt(second.substr(i, 1), 16);
        arr.push((m ^ k).toString(16));
    }
    return arr.join('');
};
// 复制到剪切板
exports.copyToClipboard = function (copyText) {
    var input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', copyText);
    input.setAttribute('style', 'position:absolute;top:-9999px;');
    document.body.appendChild(input);
    input.setSelectionRange(0, 9999);
    input.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
    }
    document.body.removeChild(input);
};
/**
 * 获取memery hash
 */
exports.calcHashValuePromise = function (pwd, salt) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var hash, argonHash;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        hash = void 0;
                        argonHash = new argonHash_1.ArgonHash();

                        argonHash.init();
                        // tslint:disable-next-line:no-unnecessary-local-variable
                        _context.next = 5;
                        return argonHash.calcHashValuePromise({ pwd: pwd, salt: salt });

                    case 5:
                        hash = _context.sent;
                        return _context.abrupt("return", hash);

                    case 7:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};
/**
 * 基础打开弹窗界面封装
 */
exports.openBasePage = function (foreletName) {
    var foreletParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // tslint:disable-next-line:typedef
    return new Promise(function (resolve, reject) {
        root_1.popNew(foreletName, foreletParams, function (ok) {
            // this.windowSet.delete(foreletName);
            resolve(ok);
        }, function (cancel) {
            // this.windowSet.delete(foreletName);
            reject(cancel);
        });
    });
};
exports.popPswBox = function () {
    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var psw;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return openMessageboxPsw(content);

                    case 3:
                        psw = _context2.sent;
                        return _context2.abrupt("return", psw);

                    case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2["catch"](0);
                        return _context2.abrupt("return");

                    case 10:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 7]]);
    }));
};
// 弹出提示框
exports.popNewMessage = function (content) {
    return root_1.popNew('app-components-message-message', { content: content });
};
// 弹出loading
exports.popNewLoading = function (text) {
    return root_1.popNew('app-components1-loading-loading', { text: text });
};
/**
 * 打开密码输入框
 */
var openMessageboxPsw = function openMessageboxPsw(content) {
    // tslint:disable-next-line:typedef
    return new Promise(function (resolve, reject) {
        root_1.popNew('app-components-modalBoxInput-modalBoxInput', { itype: 'password', title: '请输入密码', content: content }, function (r) {
            resolve(r);
        }, function (cancel) {
            reject(cancel);
        });
    });
};
// 计算字符串长度包含中文 中文长度加2 英文加1
exports.getByteLen = function (val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) !== null) {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
};
// 计算支持的币币兑换的币种
exports.currencyExchangeAvailable = function () {
    var shapeshiftCoins = store_1.find('shapeShiftCoins');
    var currencyArr = [];
    for (var i in config_1.MainChainCoin) {
        currencyArr.push(i);
    }
    for (var _i in config_1.ERC20Tokens) {
        currencyArr.push(_i);
    }
    return shapeshiftCoins.filter(function (item) {
        return item.status === 'available' && currencyArr.indexOf(item.symbol) >= 0;
    });
};
// 根据货币名获取当前正在使用的地址
exports.getCurrentAddrByCurrencyName = function (currencyName) {
    var wallet = store_1.find('curWallet');
    var currencyRecords = wallet.currencyRecords;
    var curAddr = '';
    for (var i = 0; i < currencyRecords.length; i++) {
        if (currencyRecords[i].currencyName === currencyName) {
            curAddr = currencyRecords[i].currentAddr;
            break;
        }
    }
    return curAddr;
};
// 根据货币名获取当前正在使用的地址的余额
exports.getCurrentAddrBalanceByCurrencyName = function (currencyName) {
    var curAddr = exports.getCurrentAddrByCurrencyName(currencyName);
    console.log('curAddr', curAddr);
    var addrs = store_1.find('addrs') || [];
    for (var i = 0; i < addrs.length; i++) {
        if (addrs[i].currencyName === currencyName && addrs[i].addr === curAddr) {
            return addrs[i].balance || 0;
        }
    }
    return 0;
};
// 时间戳格式化 毫秒为单位
exports.timestampFormat = function (timestamp) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    var day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    var hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
    var minutes = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    var seconds = date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
};
// 获取当前钱包第一个ETH地址
exports.getFirstEthAddr = function () {
    var wallet = store_1.find('curWallet');
    if (!wallet) return;
    var currencyRecords = wallet.currencyRecords;
    for (var i = 0; i < currencyRecords.length; i++) {
        if (currencyRecords[i].currencyName === 'ETH') {
            return currencyRecords[i].addrs[0];
        }
    }
};
// unicode数组转字符串
exports.unicodeArray2Str = function (arr) {
    var str = '';
    if (!arr || arr === 'null') {
        return str;
    }
    for (var i = 0; i < arr.length; i++) {
        str += String.fromCharCode(arr[i]);
    }
    return str;
};
/**
 * 计算日期间隔
 */
exports.GetDateDiff = function (startDate, endDate) {
    var Y = startDate.getFullYear() + "-";
    var M = (startDate.getMonth() + 1 < 10 ? "0" + (startDate.getMonth() + 1) : startDate.getMonth() + 1) + "-";
    var D = "" + startDate.getDate();
    startDate = new Date("" + Y + M + D);
    var startTime = startDate.getTime();
    Y = endDate.getFullYear() + "-";
    M = (endDate.getMonth() + 1 < 10 ? "0" + (endDate.getMonth() + 1) : endDate.getMonth() + 1) + "-";
    D = "" + endDate.getDate();
    endDate = new Date("" + Y + M + D);
    var endTime = endDate.getTime();
    return Math.floor(Math.abs(startTime - endTime) / (1000 * 60 * 60 * 24));
};
// 时间戳格式化 毫秒为单位
exports.timestampFormatToDate = function (timestamp) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    var day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    return year + "-" + month + "-" + day;
};
/**
 * 密码加密
 * @param plainText 需要加密的文本
 */
exports.encrypt = function (plainText, salt) {
    var cipher = new cipher_1.Cipher();
    return cipher.encrypt(salt, plainText);
};
/**
 * 密码解密
 * @param cipherText 需要解密的文本
 */
exports.decrypt = function (cipherText, salt) {
    var cipher = new cipher_1.Cipher();
    return cipher.decrypt(salt, cipherText);
};
// hash256;
exports.sha256 = function (data) {
    var cipher = new cipher_1.Cipher();
    return cipher.sha256(data);
};
// 锁屏密码验证
exports.lockScreenVerify = function (psw) {
    var hash256 = exports.sha256(psw + store_1.find('salt'));
    var localHash256 = store_1.find('lockScreen').psw;
    return hash256 === localHash256;
};
// 锁屏密码hash算法
exports.lockScreenHash = function (psw) {
    return exports.sha256(psw + store_1.find('salt'));
};
// ==========================================================new version tools
// 获取gasPrice
exports.fetchGasPrice = function (minerFeeLevel) {
    return store_1.find('gasPrice')[minerFeeLevel];
};
// 获取btc miner fee
exports.fetchBtcMinerFee = function (minerFeeLevel) {
    return store_1.find('btcMinerFee')[minerFeeLevel];
};
// 获取默认币种汇率
exports.fetchDefaultExchangeRateJson = function () {
    var rateJson = new Map();
    // 主链汇率
    for (var k in config_1.MainChainCoin) {
        if (config_1.MainChainCoin.hasOwnProperty(k)) {
            rateJson.set(k, config_1.MainChainCoin[k].rate);
        }
    }
    // erc20汇率
    for (var _k in config_1.ERC20Tokens) {
        if (config_1.ERC20Tokens.hasOwnProperty(_k)) {
            rateJson.set(_k, config_1.ERC20Tokens[_k].rate);
        }
    }
    return rateJson;
};
/**
 * 获取本地钱包资产列表
 */
exports.fetchWalletAssetList = function () {
    var coinGain = store_1.getBorn('coinGain');
    var wallet = store_1.find('curWallet');
    var showCurrencys = wallet && wallet.showCurrencys || constants_1.defalutShowCurrencys;
    var assetList = [];
    for (var k in config_1.MainChainCoin) {
        var item = {};
        if (config_1.MainChainCoin.hasOwnProperty(k) && showCurrencys.indexOf(k) >= 0 && k !== 'KT') {
            item.currencyName = k;
            item.description = config_1.MainChainCoin[k].description;
            var balance = exports.fetchBalanceOfCurrency(k);
            var cny = store_1.getBorn('exchangeRateJson').get(k).CNY;
            item.balance = exports.formatBalance(balance);
            item.balanceValue = exports.formatBalanceValue(balance * cny);
            item.gain = coinGain.get(k) || exports.formatBalanceValue(0);
            assetList.push(item);
        }
    }
    for (var _k2 in config_1.ERC20Tokens) {
        var _item = {};
        if (config_1.ERC20Tokens.hasOwnProperty(_k2) && showCurrencys.indexOf(_k2) >= 0) {
            _item.currencyName = _k2;
            _item.description = config_1.ERC20Tokens[_k2].description;
            var _balance = exports.fetchBalanceOfCurrency(_k2);
            var _cny = store_1.getBorn('exchangeRateJson').get(_k2).CNY;
            _item.balance = exports.formatBalance(_balance);
            _item.balanceValue = exports.formatBalanceValue(_balance * _cny);
            _item.gain = coinGain.get(_k2) || exports.formatBalanceValue(0);
            assetList.push(_item);
        }
    }
    return assetList;
};
/**
 * 获取云端钱包资产列表
 */
exports.fetchCloudWalletAssetList = function () {
    var coinGain = store_1.getBorn('coinGain');
    var assetList = [];
    for (var k in interface_1.CurrencyType) {
        var item = {};
        if (config_1.MainChainCoin.hasOwnProperty(k)) {
            item.currencyName = k;
            item.description = config_1.MainChainCoin[k].description;
            var balance = store_1.getBorn('cloudBalance').get(interface_1.CurrencyType[k]) || 0;
            var cny = store_1.getBorn('exchangeRateJson').get(k).CNY;
            item.balance = exports.formatBalance(balance);
            item.balanceValue = exports.formatBalanceValue(balance * cny);
            item.gain = coinGain.get(k) || exports.formatBalanceValue(0);
            assetList.push(item);
        }
    }
    return assetList;
};
/**
 * 获取云端总资产
 */
exports.fetchCloudTotalAssets = function () {
    var cloudBalance = store_1.getBorn('cloudBalance');
    var totalAssets = 0;
    for (var _iterator = cloudBalance, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i2 >= _iterator.length) break;
            _ref = _iterator[_i2++];
        } else {
            _i2 = _iterator.next();
            if (_i2.done) break;
            _ref = _i2.value;
        }

        var _ref2 = _ref,
            _ref3 = _slicedToArray(_ref2, 2),
            k = _ref3[0],
            v = _ref3[1];

        totalAssets += v * store_1.find('exchangeRateJson', interface_1.CurrencyTypeReverse[k]).CNY;
    }
    return totalAssets;
};
/**
 * 没有创建钱包时
 */
exports.hasWallet = function () {
    var wallet = store_1.find('curWallet');
    if (!wallet) {
        root_1.popNew('app-components-modalBox-modalBox', {
            title: '提示',
            content: '你还没有登录，去登录使用更多功能吧',
            sureText: '去登录',
            cancelText: '暂时不'
        }, function () {
            root_1.popNew('app-view-wallet-create-home');
        });
        return false;
    }
    return true;
};
// 解析交易状态
exports.parseStatusShow = function (tx) {
    if (!tx) {
        return {
            text: '打包中',
            icon: 'pending.png'
        };
    }
    var status = tx.status;
    if (status === interface_1.TxStatus.PENDING) {
        return {
            text: '打包中',
            icon: 'pending.png'
        };
    } else if (status === interface_1.TxStatus.CONFIRMED) {
        return {
            text: "\u5DF2\u786E\u8BA4 " + tx.confirmedBlockNumber + "/" + tx.needConfirmedBlockNumber,
            icon: 'pending.png'
        };
    } else if (status === interface_1.TxStatus.FAILED) {
        return {
            text: '交易失败',
            icon: 'fail.png'
        };
    } else {
        return {
            text: '已完成',
            icon: 'icon_right2.png'
        };
    }
};
// 解析转账类型
exports.parseTxTypeShow = function (txType) {
    if (txType === interface_1.TxType.RECEIPT) {
        return '收款';
    }
    return '转账';
};
// 解析是否可以重发
exports.canResend = function (tx) {
    if (tx.status !== interface_1.TxStatus.PENDING) return false;
    if (tx.minerFeeLevel === interface_1.MinerFeeLevel.FASTEST) return false;
    return true;
};
/**
 * 获取钱包资产列表是否添加
 */
exports.fetchWalletAssetListAdded = function () {
    var wallet = store_1.find('curWallet');
    var showCurrencys = wallet && wallet.showCurrencys || constants_1.defalutShowCurrencys;
    var assetList = [];
    for (var k in config_1.MainChainCoin) {
        var item = {};
        if (config_1.MainChainCoin.hasOwnProperty(k) && k !== 'KT') {
            item.currencyName = k;
            item.description = config_1.MainChainCoin[k].description;
            if (showCurrencys.indexOf(k) >= 0) {
                item.added = true;
            } else {
                item.added = false;
            }
            if (constants_1.defalutShowCurrencys.indexOf(k) >= 0) {
                item.canSwtiched = false;
            } else {
                item.canSwtiched = true;
            }
            assetList.push(item);
        }
    }
    for (var _k3 in config_1.ERC20Tokens) {
        var _item2 = {};
        if (config_1.ERC20Tokens.hasOwnProperty(_k3)) {
            _item2.currencyName = _k3;
            _item2.description = config_1.ERC20Tokens[_k3].description;
            if (showCurrencys.indexOf(_k3) >= 0) {
                _item2.added = true;
            } else {
                _item2.added = false;
            }
            if (constants_1.defalutShowCurrencys.indexOf(_k3) >= 0) {
                _item2.canSwtiched = false;
            } else {
                _item2.canSwtiched = true;
            }
            assetList.push(_item2);
        }
    }
    return assetList;
};
/**
 * 初始化地址对象
 */
exports.initAddr = function (address, currencyName, addrName) {
    return {
        addr: address,
        addrName: addrName || exports.getDefaultAddr(address),
        record: [],
        balance: 0,
        currencyName: currencyName
    };
};
// 获取货币的涨跌情况
exports.fetchCoinGain = function () {
    var coinGain = store_1.getBorn('coinGain');
    for (var k in config_1.MainChainCoin) {
        var item = {};
        if (config_1.MainChainCoin.hasOwnProperty(k)) {
            var gain = Math.random();
            item.gain = gain > 0.5 ? exports.formatBalanceValue(gain) : exports.formatBalanceValue(-gain);
            if (k === 'KT') {
                item.gain = 0;
            }
            coinGain.set(k, item.gain);
        }
    }
    for (var _k4 in config_1.ERC20Tokens) {
        var _item3 = {};
        if (config_1.ERC20Tokens.hasOwnProperty(_k4)) {
            var _gain = Math.random();
            _item3.gain = _gain > 0.5 ? exports.formatBalanceValue(_gain) : exports.formatBalanceValue(-_gain);
            coinGain.set(_k4, _item3.gain);
        }
    }
};
/**
 * 转化rtype
 */
exports.parseRtype = function (rType) {
    if (rType === 0) return '普通红包';
    if (rType === 1) return '随机红包';
    if (rType === 99) return '邀请红包';
    return '';
};
/**
 * 获取某id理财产品持有量，不算已经赎回的
 */
exports.fetchHoldedProductAmount = function (id) {
    var purchaseRecord = store_1.find('purchaseRecord');
    var holdAmout = 0;
    for (var i = 0; i < purchaseRecord.length; i++) {
        var one = purchaseRecord[i];
        if (one.id === id && one.state === 1) {
            holdAmout += one.amount;
        }
    }
    return holdAmout;
};
/**
 * 计算剩余百分比
 */
exports.calPercent = function (surplus, total) {
    if (surplus === 0) {
        return {
            left: 0,
            use: 100
        };
    }
    if (surplus === total) {
        return {
            left: 100,
            use: 0
        };
    }
    if (surplus <= total / 100) {
        return {
            left: 1,
            use: 99
        };
    }
    var r = Number((surplus / total).toString().slice(0, 4));
    return {
        left: r * 100,
        use: 100 - r * 100
    };
};
/**
 * base64 to blob
 */
exports.base64ToBlob = function (base64) {
    var arr = base64.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};
/**
 * 图片base64转file格式
 */
exports.base64ToFile = function (base64) {
    var blob = exports.base64ToBlob(base64);
    var newFile = new File([blob], 'avatar.jpeg', { type: blob.type });
    console.log(newFile);
    return newFile;
};
/**
 * 获取用户基本信息
 */
exports.getUserInfo = function () {
    var userInfo = store_1.find('userInfo');
    if (!userInfo) return;
    var nickName = userInfo.nickName;
    if (!nickName) {
        var wallet = store_1.find('curWallet');
        if (wallet) {
            nickName = JSON.parse(wallet.gwlt).nickName;
        }
    }
    var avatar = userInfo.avatar;
    if (avatar && avatar.indexOf('data:image') < 0) {
        avatar = "" + pull_1.uploadFileUrlPrefix + avatar;
    }
    return {
        nickName: nickName,
        avatar: avatar
    };
};
/**
 * 获取区块确认数
 */
exports.getConfirmBlockNumber = function (currencyName, amount) {
    if (config_1.ERC20Tokens[currencyName]) {
        return constants_1.currencyConfirmBlockNumber.ERC20;
    }
    var confirmBlockNumbers = constants_1.currencyConfirmBlockNumber[currencyName];
    for (var i = 0; i < confirmBlockNumbers.length; i++) {
        if (amount < confirmBlockNumbers[i].value) {
            return confirmBlockNumbers[i].number;
        }
    }
};
/**
 * 获取设备唯一id
 */
exports.fetchDeviceId = function () {
    return exports.getFirstEthAddr();
};
/**
 * 根据当前语言设置获取静态文字，对于组件模块
 */
exports.getLanguage = function (w) {
    var lan = store_1.find('languageSet');
    if (lan) {
        return w.config.value[lan.languageList[lan.selected]];
    }
    return w.config.value.simpleChinese;
};
/**
 * 根据当前语言设置获取静态文字，对于单独的ts文件
 */
exports.getStaticLanguage = function () {
    var lan = store_1.find('languageSet');
    if (lan) {
        return config_1.Config[lan.languageList[lan.selected]];
    }
    return config_1.Config.simpleChinese;
};
/**
 * 助记词片段分享加密
 * 为了便于识别用户使用的是同一组密钥，会在分享出去的密钥的第2/4/6/8/10/12加上一个相同的随机数
 */
exports.mnemonicFragmentEncrypt = function (fragments) {
    var len = 6;
    var randomArr = [];
    for (var i = 0; i < len; i++) {
        var random = Math.floor(Math.random() * 10);
        randomArr.push(random);
    }
    var retFragments = [];
    for (var _i3 = 0; _i3 < fragments.length; _i3++) {
        var fragmentArr = fragments[_i3].split('');
        var j = 1;
        // tslint:disable-next-line:binary-expression-operand-order
        while (2 * j <= 12) {
            // tslint:disable-next-line:binary-expression-operand-order
            fragmentArr.splice(2 * j - 1, 0, randomArr[j - 1]);
            j++;
        }
        retFragments.push(fragmentArr.join(''));
    }
    return retFragments;
};
/**
 * 助记词片段分享解密
 * 为了便于识别用户使用的是同一组密钥，会在分享出去的密钥的第2/4/6/8/10/12加上一个相同的随机数
 */
exports.mnemonicFragmentDecrypt = function (fragment) {
    var fragmentArr = fragment.split('');
    var randomArr = [];
    var j = 6;
    while (j > 0) {
        // tslint:disable-next-line:binary-expression-operand-order
        var delRandom = fragmentArr.splice(2 * j - 1, 1);
        j--;
        randomArr.push(delRandom);
    }
    return {
        fragment: fragmentArr.join(''),
        randomStr: randomArr.reverse().join('')
    };
};
/**
 * 注销账户
 */
exports.logoutAccount = function () {
    store_1.updateStore('curWallet', null);
    store_1.updateStore('userInfo', null);
    store_1.logoutInit();
    con_mgr_1.closeCon();
    pull_1.openAndGetRandom();
};
})