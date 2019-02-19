_$define("chat/client/app/widget/memberItem/memberItem", function (require, exports, module){
"use strict";
/**
 * 群组成员信息组件
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = require("../../../../../pi/widget/widget");
var logger_1 = require("../../../../utils/logger");
var util_1 = require("../../../../utils/util");
var store = require("../../data/store");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);

var MemberItem = function (_widget_1$Widget) {
    _inherits(MemberItem, _widget_1$Widget);

    function MemberItem() {
        _classCallCheck(this, MemberItem);

        var _this = _possibleConstructorReturn(this, (MemberItem.__proto__ || Object.getPrototypeOf(MemberItem)).apply(this, arguments));

        _this.props = {
            id: null,
            name: '',
            gid: null,
            groupInfo: {},
            text: '',
            avatorPath: '',
            isOperation: false,
            isAdmin: true,
            isOwner: false
        };
        return _this;
    }

    _createClass(MemberItem, [{
        key: "setProps",
        value: function setProps(props) {
            _get(MemberItem.prototype.__proto__ || Object.getPrototypeOf(MemberItem.prototype), "setProps", this).call(this, props);
            logger.debug('===============isOperation', props);
            if (!this.props.isOperation) {
                logger.debug('===============isOperation = false', props);
                var guid = util_1.genGuid(this.props.gid, this.props.id);
                this.props.groupInfo = store.getStore("groupInfoMap/" + this.props.gid);
                var groupUser = store.getStore("groupUserLinkMap/" + guid);
                this.props.name = groupUser ? groupUser.userAlias : '';
            }
        }
    }]);

    return MemberItem;
}(widget_1.Widget);

exports.MemberItem = MemberItem;
})