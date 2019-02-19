_$define("chat/client/app/view/group/groupList", function (require, exports, module){
"use strict";
/**
 * 群聊列表
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================ 导入
var root_1 = require("../../../../../pi/ui/root");
var forelet_1 = require("../../../../../pi/widget/forelet");
var widget_1 = require("../../../../../pi/widget/widget");
var user_s_1 = require("../../../../server/data/db/user.s");
var group_p_1 = require("../../../../server/data/rpc/group.p");
var logger_1 = require("../../../../utils/logger");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var init_1 = require("../../net/init");
exports.forelet = new forelet_1.Forelet();
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);

var GroupListt = function (_widget_1$Widget) {
    _inherits(GroupListt, _widget_1$Widget);

    function GroupListt() {
        _classCallCheck(this, GroupListt);

        var _this = _possibleConstructorReturn(this, (GroupListt.__proto__ || Object.getPrototypeOf(GroupListt)).apply(this, arguments));

        _this.props = {
            inputGid: null
        };
        return _this;
    }

    _createClass(GroupListt, [{
        key: "create",
        value: function create() {
            _get(GroupListt.prototype.__proto__ || Object.getPrototypeOf(GroupListt.prototype), "create", this).call(this);
            var sid = store.getStore('uid').toString();
            this.state = store.getStore('contactMap', new user_s_1.Contact()).get(sid);
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.ok();
        }
        // 点击查看群的详细信息

    }, {
        key: "showInfo",
        value: function showInfo(gid) {
            root_1.popNew('chat-client-app-view-group-groupInfo', { gid: gid });
        }
        // 输入要添加群聊的Gid

    }, {
        key: "inputGid",
        value: function inputGid(e) {
            this.props.inputGid = parseInt(e.value, 10);
        }
        // 主动添加群聊

    }, {
        key: "applyGroup",
        value: function applyGroup(e) {
            logic_1.rippleShow(e);
            if (!this.props.inputGid) {
                logic_1.bottomNotice('请输入群聊ID');
            } else {
                init_1.clientRpcFunc(group_p_1.applyJoinGroup, this.props.inputGid, function (r) {
                    logger.debug('===========主动添加群聊返回', r);
                    if (r.r === -2) {
                        logic_1.bottomNotice('您申请的群不存在');
                    } else if (r.r === -1) {
                        logic_1.bottomNotice('您已经是该群的成员');
                    } else {
                        logic_1.bottomNotice('发送成功');
                    }
                });
            }
        }
        // 创建群聊

    }, {
        key: "groupChat",
        value: function groupChat() {
            root_1.popNew('chat-client-app-view-group-setGroupChat');
        }
    }]);

    return GroupListt;
}(widget_1.Widget);

exports.GroupListt = GroupListt;
// ================================================ 本地
store.register('contactMap', function (r) {
    // 这是一个特别的map，map里一定只有一个元素,只是为了和后端保持统一，才定义为map
    for (var _iterator = r.values(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var value = _ref;

        exports.forelet.paint(value);
    }
});
})