_$define("chat/client/app/view/group/setGroupChat", function (require, exports, module){
"use strict";
/**
 * 创建群聊
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
var group_s_1 = require("../../../../server/data/rpc/group.s");
var logger_1 = require("../../../../utils/logger");
var util_1 = require("../../../../utils/util");
var store = require("../../data/store");
var logic_1 = require("../../logic/logic");
var native_1 = require("../../logic/native");
var init_1 = require("../../net/init");
var upload_1 = require("../../net/upload");
var WIDGET_NAME = module.id.replace(/\//g, '-');
var logger = new logger_1.Logger(WIDGET_NAME);
exports.forelet = new forelet_1.Forelet();

var SetGroupChat = function (_widget_1$Widget) {
    _inherits(SetGroupChat, _widget_1$Widget);

    function SetGroupChat() {
        _classCallCheck(this, SetGroupChat);

        var _this = _possibleConstructorReturn(this, (SetGroupChat.__proto__ || Object.getPrototypeOf(SetGroupChat)).call(this));

        _this.props = {
            name: '',
            inviteMembers: [],
            isSelect: false,
            avatarHtml: ''
        };
        _this.state = new Map();
        return _this;
    }

    _createClass(SetGroupChat, [{
        key: "create",
        value: function create() {
            _get(SetGroupChat.prototype.__proto__ || Object.getPrototypeOf(SetGroupChat.prototype), "create", this).call(this);
            var sid = store.getStore('uid').toString();
            this.state = store.getStore('contactMap', new user_s_1.Contact()).get(sid);
        }
        // 返回上一页

    }, {
        key: "back",
        value: function back() {
            this.ok();
        }
        /**
         * 选择群头像
         */

    }, {
        key: "selectImageClick",
        value: function selectImageClick() {
            var _this2 = this;

            var imagePicker = native_1.selectImage(function (width, height, url) {
                console.log('selectImage url = ', url);
                // tslint:disable-next-line:max-line-length
                _this2.props.avatarHtml = "<div style=\"background-image: url(" + url + ");width: 120px;height: 120px;background-size: cover;background-position: center;background-repeat: no-repeat;border-radius:50%\"></div>";
                _this2.paint();
                var loading = root_1.popNew('app-components1-loading-loading', { text: '图片上传中' });
                imagePicker.getContent({
                    success: function success(buffer) {
                        upload_1.imgResize(buffer, function (res) {
                            upload_1.uploadFile(upload_1.arrayBuffer2File(res.ab), function (url) {
                                logic_1.bottomNotice('图片上传成功');
                                avatarUrl = url;
                                loading.callback(loading.widget);
                            });
                        });
                    }
                });
            });
        }
        // 点击完成

    }, {
        key: "completeClick",
        value: function completeClick() {
            var _this3 = this;

            if (!this.props.name) {
                logic_1.bottomNotice('群名不能为空');
                return;
            }
            if (this.props.inviteMembers.length === 0) {
                logic_1.bottomNotice('请至少选择一位好友');
                return;
            }
            var groupInfo = new group_s_1.GroupCreate();
            groupInfo.name = this.props.name;
            groupInfo.note = '';
            groupInfo.avatar = avatarUrl;
            groupInfo.need_agree = true; // 入群需要同意
            init_1.clientRpcFunc(group_p_1.createGroup, groupInfo, function (r) {
                if (r.gid === -1) {
                    logic_1.bottomNotice("\u521B\u5EFA\u7FA4\u7EC4\u5931\u8D25");
                    return;
                }
                store.setStore("groupInfoMap/" + r.gid, r);
                // 邀请好友进群
                if (_this3.props.inviteMembers.length > 0) {
                    var invites = new group_s_1.InviteArray();
                    invites.arr = [];
                    _this3.props.inviteMembers.forEach(function (id) {
                        var invite = new group_s_1.Invite();
                        invite.gid = r.gid;
                        invite.rid = id;
                        invites.arr.push(invite);
                    });
                    init_1.clientRpcFunc(group_p_1.inviteUsers, invites, function (r) {
                        if (r.r !== 1) {
                            logic_1.bottomNotice("\u9080\u8BF7\u597D\u53CB\u5165\u7FA4\u5931\u8D25");
                        }
                    });
                }
            });
            this.ok();
        }
    }, {
        key: "inputName",
        value: function inputName(e) {
            this.props.name = e.value;
            this.props.isSelect = e.value !== '' && this.props.inviteMembers.length > 0;
            this.paint();
        }
    }, {
        key: "addMember",
        value: function addMember(e) {
            var uid = e.value;
            logger.debug('=========创建群聊', uid);
            if (this.props.inviteMembers.findIndex(function (item) {
                return item === uid;
            }) === -1) {
                this.props.inviteMembers.push(uid);
            } else {
                this.props.inviteMembers = util_1.delValueFromArray(uid, this.props.inviteMembers);
            }
            logger.debug("inviteMembers is : " + JSON.stringify(this.props.inviteMembers));
            this.props.isSelect = e.value !== '' && this.props.inviteMembers.length > 0;
            this.paint();
        }
    }]);

    return SetGroupChat;
}(widget_1.Widget);

exports.SetGroupChat = SetGroupChat;
var avatarUrl = void 0; // 群头像链接
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