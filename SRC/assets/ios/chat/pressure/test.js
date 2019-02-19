_$define("chat/pressure/test", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var initStore_1 = require("../client/app/data/initStore");
var store = require("../client/app/data/store");
var net_init = require("../client/app/net/init");
var rpc_1 = require("../client/app/net/rpc");
var constant_1 = require("../server/data/constant");
var basic_p_1 = require("../server/data/rpc/basic.p");
var group_p_1 = require("../server/data/rpc/group.p");
var group_s_1 = require("../server/data/rpc/group.s");
var message_p_1 = require("../server/data/rpc/message.p");
var message_s_1 = require("../server/data/rpc/message.s");
var user_p_1 = require("../server/data/rpc/user.p");
// import * as pre_init from './robot_init';
/**
 * 测试用例
 */

var Test = function () {
    function Test() {
        _classCallCheck(this, Test);

        this.response = new Map();
    }
    // 登录


    _createClass(Test, [{
        key: "login",
        value: function login(userType, user, pwd, cb) {
            var _this = this;

            var nowTime = new Date().getDate();
            net_init.login(userType, user, pwd, function (r) {
                if (r && r.uid > 0) {
                    var time = new Date().getDate() - nowTime;
                    // 记录调用时间
                    responseTime(_this, basic_p_1.login, time);
                    store.setStore("uid", r.uid);
                    store.setStore("userInfoMap/" + r.uid, r);
                    net_init.init(r.uid);
                    net_init.subscribe(r.uid.toString(), message_s_1.SendMsg, function (v) {
                        if (v.code === 1) {
                            initStore_1.getFriendHistory(v.rid);
                        }
                    });
                    // 设置用户基础信息
                    if (r.name === '') {
                        r.name = user;
                        r.tel = r.uid.toString();
                        net_init.clientRpcFunc(user_p_1.changeUserInfo, r, function (res) {
                            if (res && res.uid > 0) {
                                store.setStore("userInfoMap/" + r.uid, r);
                            }
                        });
                    }
                    // 自动接受好友申请
                    _this.accept();
                    cb(r);
                }
            });
        }
        // 添加好友

    }, {
        key: "addFind",
        value: function addFind(user) {
            rpc_1.applyFriend(user, function (r) {
                if (r.r === 0) {
                    console.log('error!!!!!!!!!!!!已经是好友');
                    return;
                } else if (r.r === -2) {
                    console.log('error!!!!!!!!!!!添加的好友不存在');
                    return;
                }
            });
        }
        // 自动接受对方为好友和入群

    }, {
        key: "accept",
        value: function accept() {
            store.register('contactMap', function (r) {
                var uid = store.getStore("uid");
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

                    for (var _iterator2 = value.applyUser, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                        var _ref2;

                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) break;
                            _ref2 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) break;
                            _ref2 = _i2.value;
                        }

                        var rid = _ref2;

                        rpc_1.acceptFriend(rid, true, function (r) {
                            if (r.r === 1) {
                                console.log('同意添加好友成功');
                            } else {
                                console.log('同意添加好友失败', r.r);
                            }
                        });
                    }

                    var _loop = function _loop() {
                        if (_isArray3) {
                            if (_i3 >= _iterator3.length) return "break";
                            _ref3 = _iterator3[_i3++];
                        } else {
                            _i3 = _iterator3.next();
                            if (_i3.done) return "break";
                            _ref3 = _i3.value;
                        }

                        var guid = _ref3;

                        var agree = new group_s_1.GroupAgree();
                        agree.agree = true;
                        var gid = parseInt(guid.split(':')[0], 10);
                        agree.gid = gid;
                        agree.uid = uid;
                        net_init.clientRpcFunc(group_p_1.agreeJoinGroup, agree, function (gInfo) {
                            if (gInfo.gid < 0) {
                                return;
                            }
                            console.log('同意加群！！！！！', gid);
                            store.setStore("groupInfoMap/" + gInfo.gid, gInfo);
                        });
                    };

                    for (var _iterator3 = value.applyGroup, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                        var _ref3;

                        var _ret = _loop();

                        if (_ret === "break") break;
                    }
                }
            });
        }
        // 单聊

    }, {
        key: "chat",
        value: function chat(rid, mtype, msg) {
            var info = new message_s_1.UserSend();
            info.msg = msg;
            info.mtype = mtype;
            info.rid = rid;
            info.time = new Date().getTime();
            net_init.clientRpcFunc(message_p_1.sendUserMessage, info, function (r) {
                if (r.hIncId === constant_1.DEFAULT_ERROR_STR) {
                    console.log('对方不是你的好友！');
                    return;
                }
            });
        }
        // 邀请加入群聊

    }, {
        key: "inviteGroup",
        value: function inviteGroup(gid, rid) {
            var invites = new group_s_1.InviteArray();
            invites.arr = [];
            var invite = new group_s_1.Invite();
            invite.gid = gid;
            invite.rid = rid;
            invites.arr.push(invite);
            net_init.clientRpcFunc(group_p_1.inviteUsers, invites, function (r) {
                if (r.r !== 1) {
                    console.log('邀请好友失败');
                }
                console.log('邀请好友成功');
            });
        }
        // 创建群聊

    }, {
        key: "createGroup",
        value: function createGroup(name) {
            var groupInfo = new group_s_1.GroupCreate();
            groupInfo.name = name;
            groupInfo.note = '';
            groupInfo.avatar = '';
            groupInfo.need_agree = true;
            net_init.clientRpcFunc(group_p_1.createGroup, groupInfo, function (r) {
                if (r.gid === -1) {
                    console.log('创建群组失败 r:', r);
                    return;
                }
                console.log('创建群组成功r:', r);
                store.setStore("groupInfoMap/" + r.gid, r);
            });
        }
        // 群聊

    }, {
        key: "groupchat",
        value: function groupchat(gid, mtype, msg) {
            var message = new message_s_1.GroupSend();
            message.gid = gid;
            message.msg = msg;
            message.mtype = mtype;
            message.time = new Date().getTime();
            net_init.clientRpcFunc(message_p_1.sendGroupMessage, message, function (r) {
                if (r.hIncId === constant_1.DEFAULT_ERROR_STR) {
                    console.log('群聊发送失败r:', r);
                    return;
                }
            });
        }
    }]);

    return Test;
}();

exports.Test = Test;
var responseTime = function responseTime(test, cmd, time) {
    var response = test.response.get(cmd);
    if (!response) {
        test.response.set(cmd, [time]);
    } else {
        response.push(time);
        test.response.set(cmd, response);
    }
};
})