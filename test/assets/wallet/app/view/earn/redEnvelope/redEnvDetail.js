_$define("app/view/earn/redEnvelope/redEnvDetail", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
 * RedEnvDetail
 */
var shareToPlatforms_1 = require("../../../../pi/browser/shareToPlatforms");
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var pull_1 = require("../../../net/pull");
var interface_1 = require("../../../store/interface");
var store_1 = require("../../../store/store");
var tools_1 = require("../../../utils/tools");

var RedEnvDetail = function (_widget_1$Widget) {
    _inherits(RedEnvDetail, _widget_1$Widget);

    function RedEnvDetail() {
        _classCallCheck(this, RedEnvDetail);

        return _possibleConstructorReturn(this, (RedEnvDetail.__proto__ || Object.getPrototypeOf(RedEnvDetail)).apply(this, arguments));
    }

    _createClass(RedEnvDetail, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            _get(RedEnvDetail.prototype.__proto__ || Object.getPrototypeOf(RedEnvDetail.prototype), "setProps", this).call(this, props, oldProps);
            var cfg = tools_1.getLanguage(this);
            this.state = {
                message: cfg.message,
                redBagList: [
                    // { cuid:111,amount:1,timeShow:'04-30 14:32:00' },
                    // { cuid:111,amount:1,timeShow:'04-30 14:32:00' },
                    // { cuid:111,amount:1,timeShow:'04-30 14:32:00' } 
                ],
                scroll: false,
                showPin: this.props.rtype === 1,
                cfgData: cfg,
                userName: cfg.defaultUserName,
                userHead: '../../res/image/default_avater_big.png',
                greatAmount: 0,
                greatUser: -1
            };
            this.initData();
        }
    }, {
        key: "initData",
        value: function initData() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var value, user, redBagList, i, _user;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return pull_1.queryDetailLog(store_1.find('conUid'), this.props.rid);

                            case 2:
                                value = _context.sent;

                                if (value) {
                                    _context.next = 5;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 5:
                                this.state.redBagList = value[0];
                                this.state.message = value[1];
                                user = store_1.find('userInfo');

                                if (user) {
                                    _context.next = 10;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 10:
                                this.state.userName = user.nickName ? user.nickName : this.state.cfgData.defaultUserName;
                                this.state.userHead = user.avatar ? user.avatar : '../../res/image/default_avater_big.png';
                                redBagList = value[0];
                                _context.t0 = regeneratorRuntime.keys(redBagList);

                            case 14:
                                if ((_context.t1 = _context.t0()).done) {
                                    _context.next = 24;
                                    break;
                                }

                                i = _context.t1.value;
                                _context.next = 18;
                                return pull_1.getUserList([redBagList[i].cuid]);

                            case 18:
                                _user = _context.sent;

                                this.state.redBagList[i].userName = _user.nickName ? _user.nickName : this.state.cfgData.defaultUserName;
                                this.state.redBagList[i].avatar = _user.avatar ? _user.avatar : '../../res/image/default_avater_big.png';
                                if (this.props.rtype === 1 && redBagList.length === this.props.totalNum && this.state.greatAmount < redBagList[i].amount) {
                                    this.state.greatAmount = redBagList.amount;
                                    this.state.greatUser = i;
                                }
                                _context.next = 14;
                                break;

                            case 24:
                                this.paint();

                            case 25:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
        /**
         * 页面滑动
         */

    }, {
        key: "pageScroll",
        value: function pageScroll() {
            if (document.getElementById('redEnvDetail').scrollTop > 0) {
                this.state.scroll = true;
                if (this.state.scroll) {
                    this.paint();
                }
            } else {
                this.state.scroll = false;
                this.paint();
            }
        }
        /**
         * 继续发送红包
         */

    }, {
        key: "againSend",
        value: function againSend() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var url, title, inviteCodeInfo;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                url = '';
                                title = '';

                                if (!(this.props.rtype === 0)) {
                                    _context2.next = 7;
                                    break;
                                }

                                // tslint:disable-next-line:max-line-length
                                url = pull_1.sharePerUrl + "?type=" + interface_1.RedEnvelopeType.Normal + "&rid=" + this.props.rid + "&lm=" + window.encodeURIComponent(this.state.message);
                                title = this.state.cfgData.redEnvType[0];
                                _context2.next = 20;
                                break;

                            case 7:
                                if (!(this.props.rtype === 1)) {
                                    _context2.next = 12;
                                    break;
                                }

                                // tslint:disable-next-line:max-line-length
                                url = pull_1.sharePerUrl + "?type=" + interface_1.RedEnvelopeType.Random + "&rid=" + this.props.rid + "&lm=" + window.encodeURIComponent(this.state.message);
                                title = this.state.cfgData.redEnvType[1];
                                _context2.next = 20;
                                break;

                            case 12:
                                if (!(this.props.rid === '-1')) {
                                    _context2.next = 20;
                                    break;
                                }

                                _context2.next = 15;
                                return pull_1.getInviteCode();

                            case 15:
                                inviteCodeInfo = _context2.sent;

                                if (!(inviteCodeInfo.result !== 1)) {
                                    _context2.next = 18;
                                    break;
                                }

                                return _context2.abrupt("return");

                            case 18:
                                url = pull_1.sharePerUrl + "?cid=" + inviteCodeInfo.cid + "&type=" + interface_1.RedEnvelopeType.Invite;
                                title = this.state.cfgData.redEnvType[2];

                            case 20:
                                root_1.popNew('app-components-share-share', {
                                    shareType: shareToPlatforms_1.ShareToPlatforms.TYPE_LINK,
                                    url: url,
                                    title: title,
                                    content: this.state.message
                                });
                                console.error(url);

                            case 22:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }]);

    return RedEnvDetail;
}(widget_1.Widget);

exports.RedEnvDetail = RedEnvDetail;
})