_$define("earn/client/app/view/activity/inviteFriend", function (require, exports, module){
"use strict";
/**
 * 活动-邀请好友
 */

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
var native_1 = require("../../../../../app/logic/native");
var pull_1 = require("../../../../../app/net/pull");
var interface_1 = require("../../../../../app/store/interface");
var tools_1 = require("../../../../../app/utils/tools");
var shareToPlatforms_1 = require("../../../../../pi/browser/shareToPlatforms");
var lang_1 = require("../../../../../pi/util/lang");
var forelet_1 = require("../../../../../pi/widget/forelet");
var widget_1 = require("../../../../../pi/widget/widget");
var rpc_1 = require("../../net/rpc");
var memstore_1 = require("../../store/memstore");
var constants_1 = require("../../utils/constants");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var InviteFriend = function (_widget_1$Widget) {
    _inherits(InviteFriend, _widget_1$Widget);

    function InviteFriend() {
        _classCallCheck(this, InviteFriend);

        return _possibleConstructorReturn(this, (InviteFriend.__proto__ || Object.getPrototypeOf(InviteFriend)).apply(this, arguments));
    }

    _createClass(InviteFriend, [{
        key: "create",
        value: function create() {
            _get(InviteFriend.prototype.__proto__ || Object.getPrototypeOf(InviteFriend.prototype), "create", this).call(this);
            var invited = memstore_1.getStore('invited');
            this.props = {
                showPage: 'first',
                inviteCode: '******',
                welfareAwards: [],
                invitedNumberOfPerson: invited.invitedNumberOfPerson,
                inviteAwardsMultiple: constants_1.inviteAwardsMultiple
            };
            this.initWelfareAwards(invited.receiveAwards);
            this.initData();
        }
    }, {
        key: "initData",
        value: function initData() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var inviteCodeInfo;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.language = this.config.value[lang_1.getLang()];
                                _context.next = 3;
                                return pull_1.getInviteCode();

                            case 3:
                                inviteCodeInfo = _context.sent;

                                if (!(inviteCodeInfo.result !== 1)) {
                                    _context.next = 6;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 6:
                                this.props.inviteCode = "" + interface_1.LuckyMoneyType.Invite + inviteCodeInfo.cid;
                                this.paint();

                            case 8:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        // 初始化可领取得奖励

    }, {
        key: "initWelfareAwards",
        value: function initWelfareAwards() {
            var receiveAwards = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var defaultAwardsLen = 5;
            var len = Math.ceil(receiveAwards.length / defaultAwardsLen) + 1;
            var welfareAwards = void 0;
            for (var i = 0; i < len; i++) {
                welfareAwards = [];
                var allReceived = true;
                for (var k = 0; k < defaultAwardsLen; k++) {
                    var index = i * defaultAwardsLen + k;
                    if (receiveAwards[index] === 1) {
                        allReceived = false;
                    }
                    var received = receiveAwards[index] === 0;
                    var canReceive = receiveAwards[index] === 1;
                    welfareAwards.push({
                        received: received,
                        canReceive: canReceive,
                        number: (index + 1) * constants_1.inviteAwardsMultiple
                    });
                }
                if (!allReceived) break;
            }
            this.props.welfareAwards = welfareAwards;
        }
        /**
         * 返回上一页
         */

    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "refreshPage",
        value: function refreshPage() {
            this.initData();
        }
        /**
         * 切换显示页面
         * @param page 显示页面标识
         */

    }, {
        key: "change",
        value: function change(page) {
            this.props.showPage = page;
            this.paint();
        }
    }, {
        key: "shareToWechat",
        value: function shareToWechat() {
            this.baseShare(shareToPlatforms_1.ShareToPlatforms.PLATFORM_WEBCHAT);
        }
    }, {
        key: "shareToFriends",
        value: function shareToFriends() {
            this.baseShare(shareToPlatforms_1.ShareToPlatforms.PLATFORM_MOMENTS);
        }
    }, {
        key: "shareToQQ",
        value: function shareToQQ() {
            this.baseShare(shareToPlatforms_1.ShareToPlatforms.PLATFORM_QQ);
        }
    }, {
        key: "shareToQQSpace",
        value: function shareToQQSpace() {
            this.baseShare(shareToPlatforms_1.ShareToPlatforms.PLATFORM_QZONE);
        }
    }, {
        key: "copyClick",
        value: function copyClick() {
            tools_1.copyToClipboard(this.props.inviteCode);
            tools_1.popNewMessage(this.language.tips[0]);
        }
    }, {
        key: "openClick",
        value: function openClick(e, index) {
            console.log(index);
            var welfareAward = this.props.welfareAwards[index];
            if (!welfareAward.canReceive) return;
            rpc_1.converInviteAwards(welfareAward / constants_1.inviteAwardsMultiple);
        }
    }, {
        key: "baseShare",
        value: function baseShare(platform) {
            var stp = new shareToPlatforms_1.ShareToPlatforms();
            stp.init();
            native_1.makeScreenShot(function () {
                stp.shareScreenShot({
                    success: function success(result) {
                        // console.log();
                    },
                    fail: function fail(result) {
                        // console.log();
                    },
                    platform: platform
                });
            }, function () {
                // popNew('app-components-message-message',{ content:this.language.tips[0] });
            });
        }
    }, {
        key: "updateInvited",
        value: function updateInvited(invited) {
            this.props.invitedNumberOfPerson = invited.invitedNumberOfPerson;
            this.initWelfareAwards(invited.convertedInvitedAward);
            this.paint();
        }
    }]);

    return InviteFriend;
}(widget_1.Widget);

exports.InviteFriend = InviteFriend;
memstore_1.register('invited', function (invited) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    w && w.updateInvited(invited);
});
})