_$define("earn/client/app/view/activity/inviteAward", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * sign in
 */
var root_1 = require("../../../../../pi/ui/root");
var forelet_1 = require("../../../../../pi/widget/forelet");
var widget_1 = require("../../../../../pi/widget/widget");
var memstore_1 = require("../../store/memstore");
var constants_1 = require("../../utils/constants");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var InviteAward = function (_widget_1$Widget) {
    _inherits(InviteAward, _widget_1$Widget);

    function InviteAward() {
        _classCallCheck(this, InviteAward);

        return _possibleConstructorReturn(this, (InviteAward.__proto__ || Object.getPrototypeOf(InviteAward)).apply(this, arguments));
    }

    _createClass(InviteAward, [{
        key: "create",
        value: function create() {
            _get(InviteAward.prototype.__proto__ || Object.getPrototypeOf(InviteAward.prototype), "create", this).call(this);
            var invited = memstore_1.getStore('invited');
            this.props = {
                welfareAwards: [],
                invitedNumberOfPerson: invited.invitedNumberOfPerson,
                inviteAwardsMultiple: constants_1.inviteAwardsMultiple
            };
            this.initWelfareAwards(invited.convertedInvitedAward);
        }
        /**
         * 初始化奖励列表
         */

    }, {
        key: "initWelfareAwards",
        value: function initWelfareAwards(receiveAwards) {
            var defaultAwardsLen = 4;
            var calAwardsLen = Math.floor(this.props.invitedNumberOfPerson / constants_1.inviteAwardsMultiple);
            var awardsLen = calAwardsLen > defaultAwardsLen ? calAwardsLen : defaultAwardsLen;
            var welfareAwards = [];
            for (var i = 0; i < awardsLen; i++) {
                var received = receiveAwards[i] === 0;
                var canReceive = this.props.invitedNumberOfPerson >= (i + 1) * constants_1.inviteAwardsMultiple;
                welfareAwards.push({
                    received: received,
                    canReceive: canReceive
                });
            }
            this.props.welfareAwards = welfareAwards;
            console.log('InviteAward ==========', this.props.welfareAwards);
        }
    }, {
        key: "closeClick",
        value: function closeClick() {
            this.ok && this.ok();
        }
    }, {
        key: "inviteClick",
        value: function inviteClick() {
            root_1.popNew('earn-client-app-view-activity-inviteFriend');
        }
    }, {
        key: "updateInvited",
        value: function updateInvited(invited) {
            this.props.invitedNumberOfPerson = invited.invitedNumberOfPerson;
            this.initWelfareAwards(invited.convertedInvitedAward);
            this.paint();
        }
    }]);

    return InviteAward;
}(widget_1.Widget);

exports.InviteAward = InviteAward;
// ========================
memstore_1.register('invited', function (invited) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    w && w.updateInvited(invited);
});
})