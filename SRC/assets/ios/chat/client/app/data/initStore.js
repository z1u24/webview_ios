_$define("chat/client/app/data/initStore", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 初始化store
 */
var user_s_1 = require("../../../server/data/db/user.s");
var basic_p_1 = require("../../../server/data/rpc/basic.p");
var basic_s_1 = require("../../../server/data/rpc/basic.s");
var message_p_1 = require("../../../server/data/rpc/message.p");
var util_1 = require("../../../utils/util");
var init_1 = require("../net/init");
var lcstore_1 = require("./lcstore");
var parse_1 = require("./parse");
var store = require("./store");
/**
 * 更新当前用户的本地数据
 */
exports.initAccount = function () {
    lcstore_1.initFileStore().then(function () {
        var sid = store.getStore('uid');
        if (!sid) return;
        // 单聊历史记录
        lcstore_1.getFile(sid + "-userChatMap", function (value) {
            if (!value) return;
            store.setStore('userHistoryMap', value.userHistoryMap || new Map(), false);
            store.setStore('userChatMap', value.userChatMap || new Map(), false);
        }, function () {
            console.log('read userChatMap error');
        });
        // 好友信息
        lcstore_1.getFile(sid + "-userInfoMap", function (value) {
            if (!value) return;
            store.setStore('userInfoMap', value.userInfoMap || new Map(), false);
            store.setStore('friendLinkMap', value.friendLinkMap || new Map(), false);
        }, function () {
            console.log('read userInfoMap error');
        });
        // 群聊历史记录
        lcstore_1.getFile(sid + "-groupChatMap", function (value) {
            if (!value) return;
            store.setStore('groupHistoryMap', value.groupHistoryMap || new Map(), false);
            store.setStore('groupChatMap', value.groupChatMap || new Map(), false);
            store.setStore('announceHistoryMap', value.announceHistoryMap || new Map(), false);
        }, function () {
            console.log('read groupChatMap error');
        });
        // 群成员信息
        lcstore_1.getFile(sid + "-groupUserLinkMap", function (value) {
            if (!value) return;
            store.setStore('groupUserLinkMap', value || new Map(), false);
        }, function () {
            console.log('read groupUserLinkMap error');
        });
        // 最近会话列表
        lcstore_1.getFile(sid + "-lastChat", function (value) {
            if (!value) return;
            store.setStore('lastChat', value || []);
        }, function () {
            console.log('read lastChat error');
        });
        // 已读消息记录
        lcstore_1.getFile(sid + "-lastRead", function (value) {
            if (!value) return;
            store.setStore('lastRead', value || new Map());
        }, function () {
            console.log('read lastRead error');
        });
        // 额外设置信息
        lcstore_1.getFile(sid + "-setting", function (value) {
            if (!value) return;
            store.setStore('setting', value || null);
            if (!value) {
                exports.getSetting(); // 获取设置，本地没有则从服务器获取
            }
        }, function () {
            console.log('read setting error');
        });
    });
};
/**
 * 请求好友发的消息历史记录
 */
exports.getFriendHistory = function (rid) {
    var upLastRead = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var sid = store.getStore('uid');
    if (sid === rid) return;
    init_1.clientRpcFunc(message_p_1.getUserHistoryCursor, rid, function (r) {
        var hid = util_1.genUserHid(sid, rid);
        var lastRead = {
            msgId: '',
            msgType: user_s_1.GENERATOR_TYPE.USER
        };
        if (r && r.code === 1) {
            var cursor = r.cursor;
            lastRead.msgId = util_1.genHIncId(hid, cursor);
            var lastHincId = store.getStore("lastRead/" + hid, { msgId: undefined }).msgId;
            var localCursor = lastHincId ? util_1.getIndexFromHIncId(lastHincId) : -1;
            if (cursor > localCursor && (upLastRead || !lastHincId)) {
                // 本地没有记录时需要更新
                store.setStore("lastRead/" + hid, lastRead);
            }
            // 服务器最新消息
            var lastMsgId = r.last;
            var userflag = new basic_s_1.UserHistoryFlag();
            userflag.rid = rid;
            var hIncIdArr = store.getStore("userChatMap/" + hid, []);
            // 如果本地有记录从本地最后一条记录开始获取聊天消息
            // 本地没有记录则从服务器游标开始获取聊天消息
            userflag.start = hIncIdArr && hIncIdArr.length > 0 ? util_1.getIndexFromHIncId(hIncIdArr[hIncIdArr.length - 1]) + 1 : cursor + 1;
            userflag.end = lastMsgId;
            if (userflag.end >= userflag.start) {
                init_1.clientRpcFunc(basic_p_1.getUserHistory, userflag, function (r) {
                    // console.error('uuid: ',hid,'initStore getFriendHistory',r);
                    if (r.newMess > 0) {
                        r.arr.forEach(function (element) {
                            parse_1.updateUserMessage(userflag.rid, element);
                        });
                    }
                });
            }
        }
    });
};
/**
 * 请求群聊消息历史记录
 */
exports.getMyGroupHistory = function (gid) {
    var upLastRead = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var hid = util_1.genGroupHid(gid);
    // 获取最新消息和游标
    init_1.clientRpcFunc(message_p_1.getGroupHistoryCursor, gid, function (r) {
        var lastRead = {
            msgId: '',
            msgType: user_s_1.GENERATOR_TYPE.GROUP
        };
        if (r.code === 1) {
            // 服务端游标
            var cursor = r.cursor;
            // 服务端最新消息ID
            var lastMsgId = r.last;
            lastRead.msgId = util_1.genHIncId(hid, r.cursor);
            var lastHincId = store.getStore("lastRead/" + hid, { msgId: undefined }).msgId;
            var localCursor = lastHincId ? util_1.getIndexFromHIncId(lastHincId) : -1;
            if (cursor > localCursor && (upLastRead || !lastHincId)) {
                // 本地没有记录时需要更新
                store.setStore("lastRead/" + hid, lastRead);
            }
            var groupflag = new basic_s_1.GroupHistoryFlag();
            groupflag.gid = gid;
            var hIncIdArr = store.getStore("groupChatMap/" + hid, []);
            // 获取本地最新消息ID
            groupflag.start = hIncIdArr && hIncIdArr.length > 0 ? util_1.getIndexFromHIncId(hIncIdArr[hIncIdArr.length - 1]) + 1 : cursor + 1;
            groupflag.end = lastMsgId;
            if (groupflag.end >= groupflag.start) {
                init_1.clientRpcFunc(basic_p_1.getGroupHistory, groupflag, function (r) {
                    if (r && r.newMess > 0) {
                        r.arr.forEach(function (element) {
                            parse_1.updateGroupMessage(gid, element);
                        });
                    }
                });
            }
        }
    });
};
/**
 * 单聊数据变化
 */
exports.userChatChange = function () {
    var sid = store.getStore('uid');
    lcstore_1.getFile(sid + "-userChatMap", function (value) {
        if (!value) {
            value = {};
        }
        value.userHistoryMap = store.getStore('userHistoryMap'); // 单人聊天历史记录变化
        value.userChatMap = store.getStore('userChatMap'); // 单人聊天历史记录索引变化
        setTimeout(function () {
            lcstore_1.writeFile(sid + "-userChatMap", value, function () {
                console.log('write success');
            }, function () {
                console.log('fail!!!!!!!!!!');
            });
        }, 0);
    }, function () {
        console.log('read error');
    });
};
/**
 * 好友数据变化
 */
exports.friendChange = function () {
    var id = store.getStore('uid');
    lcstore_1.getFile(id + "-userInfoMap", function (value) {
        if (!value) {
            value = {};
        }
        value.friendLinkMap = store.getStore('friendLinkMap'); // 好友链接
        value.userInfoMap = store.getStore('userInfoMap'); // 用户信息
        lcstore_1.writeFile(id + "-userInfoMap", value);
    }, function () {
        console.log('read error');
    });
};
/**
 * 群组相关数据变化
 */
exports.groupChatChange = function () {
    var id = store.getStore('uid');
    lcstore_1.getFile(id + "-groupChatMap", function (value) {
        if (!value) {
            value = {};
        }
        value.groupHistoryMap = store.getStore('groupHistoryMap'); // 群组聊天
        value.groupChatMap = store.getStore('groupChatMap');
        value.announceHistoryMap = store.getStore('announceHistoryMap'); // 群组公告
        setTimeout(function () {
            lcstore_1.writeFile(id + "-groupChatMap", value, function () {
                console.log('write success');
            }, function () {
                console.log('fail!!!!!!!!!!');
            });
        }, 0);
    }, function () {
        console.log('read error');
    });
};
/**
 * 群组用户数据变化
 */
exports.groupUserLinkChange = function () {
    var id = store.getStore('uid');
    lcstore_1.getFile(id + "-groupUserLinkMap", function (value) {
        if (!value) {
            value = {};
        }
        value = store.getStore('groupUserLinkMap'); // 群组用户
        lcstore_1.writeFile(id + "-groupUserLinkMap", value);
    }, function () {
        console.log('read error');
    });
};
/**
 * 已读消息游标更新
 */
exports.lastReadChange = function () {
    var id = store.getStore('uid');
    lcstore_1.getFile(id + "-lastRead", function (value) {
        if (!value) {
            value = {};
        }
        setTimeout(function () {
            value = store.getStore('lastRead'); // 当前已读
            lcstore_1.writeFile(id + "-lastRead", value);
        }, 0);
    }, function () {
        console.log('read error');
    });
};
/**
 * 最近会话列表更新
 */
exports.lastChatChange = function () {
    var id = store.getStore('uid');
    lcstore_1.getFile(id + "-lastChat", function (value) {
        if (!value) {
            value = {};
        }
        setTimeout(function () {
            value = store.getStore('lastChat'); // 最近会话
            lcstore_1.writeFile(id + "-lastChat", value);
        }, 0);
    }, function () {
        console.log('read error');
    });
};
/**
 * 设置内容更新
 */
exports.settingChange = function () {
    var id = store.getStore('uid');
    lcstore_1.getFile(id + "-setting", function (value) {
        if (!value) {
            value = {};
        }
        value = store.getStore('setting'); // 群组用户
        lcstore_1.writeFile(id + "-setting", value);
    }, function () {
        console.log('read error');
    });
};
/**
 * 获取额外设置
 */
exports.getSetting = function () {
    var sid = store.getStore('uid');
    init_1.clientRpcFunc(basic_p_1.getData, sid, function (r) {
        if (r && r.uid === sid) {
            var setting = r.value ? JSON.parse(r.value) : { msgAvoid: [], msgTop: [] };
            store.setStore('setting', setting);
        }
    });
};
})