_$define("earn/client/app/view/activity/miningRule", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * digging rule
 */
var native_1 = require("../../../../../app/logic/native");
var memstore_1 = require("../../../../../app/store/memstore");
var tools_1 = require("../../../../../app/utils/tools");
var root_1 = require("../../../../../pi/ui/root");
var widget_1 = require("../../../../../pi/widget/widget");

var MiningRule = function (_widget_1$Widget) {
    _inherits(MiningRule, _widget_1$Widget);

    function MiningRule() {
        _classCallCheck(this, MiningRule);

        return _possibleConstructorReturn(this, (MiningRule.__proto__ || Object.getPrototypeOf(MiningRule)).apply(this, arguments));
    }

    _createClass(MiningRule, [{
        key: "create",
        value: function create() {
            _get(MiningRule.prototype.__proto__ || Object.getPrototypeOf(MiningRule.prototype), "create", this).call(this);
            this.props = {
                getMethod: [{
                    title: { zh_Hans: '注册：', zh_Hant: '註冊：', en: '' },
                    desc: { zh_Hans: '新用户注册即送两把铜镐', zh_Hant: '新用戶註冊即送兩把銅鎬', en: '' },
                    action: { zh_Hans: '去注册', zh_Hant: '去註冊', en: '' },
                    page: 'app-view-wallet-create-home'
                }, {
                    title: { zh_Hans: '连续登陆：', zh_Hant: '連續登陸：', en: '' },
                    desc: { zh_Hans: '每日登陆赠送镐，连续登陆赠送更多镐。', zh_Hant: '每日登陸贈送鎬，連續登陸贈送更多鎬。', en: '' },
                    action: ''
                }, {
                    title: { zh_Hans: '邀请好友：', zh_Hant: '邀請好友：', en: '' },
                    desc: { zh_Hans: '邀请好友成功将获得不同的镐。', zh_Hant: '邀請好友成功將獲得不同的鎬。', en: '' },
                    action: { zh_Hans: '去邀请好友', zh_Hant: '去邀請好友', en: '' },
                    page: 'earn-client-app-view-activity-inviteFriend'
                }, {
                    title: { zh_Hans: '被邀请：', zh_Hant: '被邀請：', en: '' },
                    desc: { zh_Hans: '被邀请人会获得邀请人同等的额外奖励，但是同一个账号只能被邀请一次。', zh_Hant: '被邀請人會獲得邀請人同等的額外獎勵，但是同一個賬號只能被邀請一次。', en: '' },
                    action: { zh_Hans: '去填写邀请码', zh_Hant: '去填寫邀請碼', en: '' },
                    page: 'app-view-earn-exchange-exchange'
                }, {
                    title: { zh_Hans: '提建议：', zh_Hant: '提建議：', en: '' },
                    desc: [{ zh_Hans: '5字以上的建议，即可获得铜镐1-5把', zh_Hant: '5字以上的建議，即可獲得銅鎬1-5把', en: '' }, { zh_Hans: '有效建议可获得银镐5把', zh_Hant: '有效建議可獲得銀鎬5把', en: '' }, { zh_Hans: '建议被采纳获得金镐5把', zh_Hant: '建議被採納獲得金鎬5把', en: '' }],
                    action: { zh_Hans: '去提意见', zh_Hant: '去提意見', en: '' },
                    page: ''
                }, {
                    title: { zh_Hans: '观看广告：', zh_Hant: '觀看廣告：', en: '' },
                    desc: { zh_Hans: '每个广告奖励铜镐一把，但是有可能会遇上金银镐哦。', zh_Hant: '每個廣告獎勵銅鎬一把，但是有可能會遇上金銀鎬哦。', en: '' },
                    action: { zh_Hans: '看广告', zh_Hant: '看廣告', en: '' },
                    page: ''
                }]
            };
        }
    }, {
        key: "backClick",
        value: function backClick() {
            this.ok && this.ok();
        }
    }, {
        key: "actionClick",
        value: function actionClick(e, index) {
            var page = this.props.getMethod[index].page;
            if (index === 5) {
                native_1.watchAd(2, function (err, res) {
                    console.log('ad err = ', err);
                    console.log('ad res = ', res);
                });
                return;
            }
            if (index === 0 && memstore_1.getStore('user/id')) {
                tools_1.popNewMessage('已有账号');
            } else {
                page && root_1.popNew(page);
            }
        }
    }]);

    return MiningRule;
}(widget_1.Widget);

exports.MiningRule = MiningRule;
})