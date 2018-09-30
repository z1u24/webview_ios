_$define("app/view/mine/other/addFriend", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 添加好友
 */
var shareToPlatforms_1 = require("../../../../pi/browser/shareToPlatforms");
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var store_1 = require("../../../store/store");
var tools_1 = require("../../../utils/tools");

var AddFriend = function (_widget_1$Widget) {
    _inherits(AddFriend, _widget_1$Widget);

    function AddFriend() {
        _classCallCheck(this, AddFriend);

        return _possibleConstructorReturn(this, (AddFriend.__proto__ || Object.getPrototypeOf(AddFriend)).apply(this, arguments));
    }

    _createClass(AddFriend, [{
        key: "create",
        value: function create() {
            _get(AddFriend.prototype.__proto__ || Object.getPrototypeOf(AddFriend.prototype), "create", this).call(this);
            var cfg = tools_1.getLanguage(this);
            this.state = {
                userName: cfg.defaultName,
                userHead: '../../../res/image/default_avater_big.png',
                address: 'FGGF1512151512sd78d4s51d8d44s51d8d4fd0260hg',
                cfgData: cfg
            };
            this.initData();
        }
    }, {
        key: "initData",
        value: function initData() {
            var user = store_1.find('userInfo');
            var addr = tools_1.getFirstEthAddr();
            if (user) {
                this.state.userHead = user.avatar ? user.avatar : '../../../res/image/default_avater_big.png';
                this.state.userName = user.nickName;
                this.state.address = addr;
            }
            this.paint();
        }
        /**
         * 分享二维码
         */

    }, {
        key: "share",
        value: function share() {
            root_1.popNew('app-components-share-share', { text: this.state.address, shareType: shareToPlatforms_1.ShareToPlatforms.TYPE_IMG }, function (result) {
                // alert(result);
            }, function (result) {
                // alert(result);
            });
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
        /**
         * 复制地址
         */

    }, {
        key: "copyAddr",
        value: function copyAddr() {
            tools_1.copyToClipboard(this.state.address);
            root_1.popNew('app-components-message-message', { content: this.state.cfgData.tips });
        }
    }]);

    return AddFriend;
}(widget_1.Widget);

exports.AddFriend = AddFriend;
})