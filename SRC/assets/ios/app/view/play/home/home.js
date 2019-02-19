_$define("app/view/play/home/home", function (require, exports, module){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../../pi/ui/root");
var lang_1 = require("../../../../pi/util/lang");
var forelet_1 = require("../../../../pi/widget/forelet");
var util_1 = require("../../../../pi/widget/util");
var widget_1 = require("../../../../pi/widget/widget");
var memstore_1 = require("../../../store/memstore");
var tools_1 = require("../../../utils/tools");
var webview_1 = require("../../../../pi/browser/webview");
var config_1 = require("../../../core/config");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var PlayHome = function (_widget_1$Widget) {
    _inherits(PlayHome, _widget_1$Widget);

    function PlayHome() {
        _classCallCheck(this, PlayHome);

        var _this = _possibleConstructorReturn(this, (PlayHome.__proto__ || Object.getPrototypeOf(PlayHome)).call(this));

        _this.web3Promise = new Promise(function (resolve) {
            var path = 'app/core/thirdparty/web3_rpc.js.txt';
            util_1.loadDir([path], undefined, undefined, undefined, function (fileMap) {
                var arr = new Uint8Array(fileMap[path]);
                // for (let i = 0; i < arr.length; ++i) {
                //     content += String.fromCharCode(arr[i]);
                // }
                // content = decodeURIComponent(escape(atob(content)));
                var content = new TextDecoder().decode(arr);
                resolve(content);
            }, function () {}, function () {});
        });
        _this.thirdApiPromise = new Promise(function (resolve) {
            var path = 'app/api/thirdApi.js.txt';
            util_1.loadDir([path], undefined, undefined, undefined, function (fileMap) {
                var arr = new Uint8Array(fileMap[path]);
                var content = new TextDecoder().decode(arr);
                resolve(content);
            }, function () {}, function () {});
        });
        return _this;
    }

    _createClass(PlayHome, [{
        key: "setProps",
        value: function setProps(props) {
            _get(PlayHome.prototype.__proto__ || Object.getPrototypeOf(PlayHome.prototype), "setProps", this).call(this, props);
            this.language = this.config.value[lang_1.getLang()];
            var userInfo = tools_1.getUserInfo();
            if (userInfo) {
                this.props.avatar = userInfo.avatar ? userInfo.avatar : '../../res/image1/default_avatar.png';
                this.props.refresh = false;
            }
            // http://fishing.rinkeby.cchaingames.com/
            // http://47.244.59.13/web-rinkeby/index.html
            this.props.gameList = [{
                title: { zh_Hans: 'fomosports', zh_Hant: 'fomosports', en: '' },
                desc: { zh_Hans: '要买要快，不要只是看', zh_Hant: '要買要快，不要只是看', en: '' },
                img: ['app/res/image1/fomosports.jpg', 'app/res/image1/fomosports.jpg'],
                url: 'https://test.fomosports.me/'
            }, {
                title: { zh_Hans: 'Crypto Fishing', zh_Hant: 'Crypto Fishing', en: '' },
                desc: { zh_Hans: '新一代区块链游戏', zh_Hant: '新一代區塊鏈遊戲', en: '' },
                img: ['app/res/image1/CryptoFishing.jpg', 'app/res/image1/CryptoFishing.jpg'],
                url: 'http://fishing.rinkeby.cchaingames.com/'
            }, {
                title: 'Decentraland',
                desc: { zh_Hans: 'Decentraland与Ethaemon合作', zh_Hant: 'Decentraland與Ethaemon合作', en: '' },
                img: ['app/res/image1/game4.jpg', 'app/res/image1/game4.jpg'],
                url: ''
            }];
            this.props.activityList = [{
                title: { zh_Hans: '竞猜', zh_Hant: '竞猜', en: '' },
                desc: { zh_Hans: '竞猜', zh_Hant: '竞猜', en: '' },
                img: ['app/res/image1/guess.png', 'app/res/image1/guess.png'],
                url: 'earn-client-app-view-guess-home'
            }, {
                title: { zh_Hans: '大转盘', zh_Hant: '大轉盤', en: '' },
                desc: { zh_Hans: '看看今天的运气怎么样', zh_Hant: '看看今天的運氣怎麼樣', en: '' },
                img: ['app/res/image1/turntable.png', 'app/res/image1/turntable.png'],
                url: 'earn-client-app-view-turntable-turntable'
            }, {
                title: { zh_Hans: '宝箱贩卖机', zh_Hant: '寶箱販賣機', en: '' },
                desc: { zh_Hans: '是哪一个幸运的宝箱被选中呢？', zh_Hant: '是哪一個幸運的寶箱被選中呢？', en: '' },
                img: ['app/res/image1/chest.png', 'app/res/image1/chest.png'],
                url: 'earn-client-app-view-openBox-openBox'
            }, {
                title: { zh_Hans: '兑换商城', zh_Hant: '兌換商城', en: '' },
                desc: { zh_Hans: '不定期上新物品', zh_Hant: '不定期上新物品', en: '' },
                img: ['app/res/image1/exchangeMall.png', 'app/res/image1/exchangeMall.png'],
                url: 'earn-client-app-view-exchange-exchange'
            }];
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "getCode",
        value: function getCode(event) {
            console.log(event.phone);
        }
    }, {
        key: "modalBoxSure",
        value: function modalBoxSure(e) {
            console.log(e.value);
        }
    }, {
        key: "showMine",
        value: function showMine() {
            root_1.popNew('app-view-mine-home-home');
        }
        /**
         * 刷新页面
         */

    }, {
        key: "refreshPage",
        value: function refreshPage() {
            var _this2 = this;

            this.props.refresh = true;
            this.paint();
            setTimeout(function () {
                _this2.props.refresh = false;
                _this2.paint();
            }, 1000);
        }
    }, {
        key: "gameClick",
        value: function gameClick(num) {
            if (!tools_1.hasWallet()) return;
            if (!this.props.gameList[num].url) {
                tools_1.popNewMessage(this.language.tips);
            } else {
                var gameTitle = this.props.gameList[num].title.zh_Hans;
                var gameUrl = this.props.gameList[num].url;
                var defaultInjectText = "\n            window.piWeb3EthDefaultAccount = '" + tools_1.getCurrentEthAddr() + "';\n            window.piWeb3ProviderNetWork = '" + config_1.getEthApiBaseUrl() + "';\n            window.piGameName = '" + gameTitle + "';\n            ";
                this.defaultInjectPromise = Promise.resolve(defaultInjectText);
                var allPromise = Promise.all([this.defaultInjectPromise, this.web3Promise]);
                allPromise.then(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 2),
                        defaultInjectContent = _ref2[0],
                        web3Content = _ref2[1];

                    var content = defaultInjectContent + web3Content;
                    webview_1.WebViewManager.open(gameTitle, gameUrl + "?" + Math.random(), gameTitle, content);
                });
            }
        }
        /**
         * 活动点击
         * @param index 序号
         */

    }, {
        key: "activityClick",
        value: function activityClick(index) {
            if (!tools_1.hasWallet()) return;
            root_1.popNew(this.props.activityList[index].url);
        }
    }, {
        key: "openTestClick",
        value: function openTestClick() {
            var gameTitle = '测试';
            var gameUrl = 'http://192.168.9.15:3001/authorize.html';
            this.thirdApiPromise.then(function (content) {
                webview_1.WebViewManager.open(gameTitle, gameUrl + "?" + Math.random(), gameTitle, content);
            });
        }
    }]);

    return PlayHome;
}(widget_1.Widget);

exports.PlayHome = PlayHome;
memstore_1.register('user/info', function () {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    if (w) {
        var userInfo = tools_1.getUserInfo();
        if (userInfo) {
            w.props.avatar = userInfo.avatar ? userInfo.avatar : '../../res/image1/default_avatar.png';
        }
        w.paint();
    }
});
})