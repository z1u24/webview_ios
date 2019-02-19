_$define("chat/client/app/data/parse", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 对后端推送的数据做一些处理，然后放入数据库
 */
var message_s_1 = require("../../../server/data/db/message.s");
var user_s_1 = require("../../../server/data/db/user.s");
var util_1 = require("../../../utils/util");
var store = require("./store");
/**
 * 更新userHistoryMap/userChatMap,lastChat
 * @param msg UserHistory
 */
exports.updateUserMessage = function (nextside, msg) {
    store.setStore("userHistoryMap/" + msg.hIncId, msg.msg);
    var chat = store.getStore("userChatMap/" + util_1.getHidFromhIncId(msg.hIncId), []);
    // const index = chat.indexOf(msg.hIncId);
    // if (index < 0) {
    chat.push(msg.hIncId);
    store.setStore("userChatMap/" + util_1.getHidFromhIncId(msg.hIncId), chat);
    // }
    if (msg.msg.mtype === message_s_1.MSG_TYPE.RECALL) {
        // 撤回消息内容本身是消息ID
        var reHincId = msg.msg.msg;
        var userhistory = store.getStore("userHistoryMap/" + reHincId, new message_s_1.UserMsg());
        userhistory.cancel = true;
        store.setStore("userHistoryMap/" + reHincId, userhistory);
    }
    pushLastChat([nextside, msg.msg.time, user_s_1.GENERATOR_TYPE.USER]);
};
exports.updateGroupMessage = function (gid, msg) {
    if (msg.msg.mtype === message_s_1.MSG_TYPE.NOTICE || msg.msg.mtype === message_s_1.MSG_TYPE.RENOTICE) {
        store.setStore("announceHistoryMap/" + msg.hIncId, msg.msg);
        if (msg.msg.mtype === message_s_1.MSG_TYPE.RENOTICE) {
            // 撤回公告
            var renotice = store.getStore("announceHistoryMap/" + msg.msg.msg, new message_s_1.Announcement());
            renotice.cancel = true;
            store.setStore("announceHistoryMap/" + msg.msg.msg, renotice);
        }
    }
    store.setStore("groupHistoryMap/" + msg.hIncId, msg.msg);
    var chat = store.getStore("groupChatMap/" + util_1.getHidFromhIncId(msg.hIncId), []);
    var index = chat.indexOf(msg.hIncId);
    if (index < 0) {
        chat.push(msg.hIncId);
        store.setStore("groupChatMap/" + util_1.getHidFromhIncId(msg.hIncId), chat);
    }
    if (msg.msg.mtype === message_s_1.MSG_TYPE.RECALL) {
        // 撤回消息内容本身是消息ID
        var reHincId = msg.msg.msg;
        var grouphistory = store.getStore("groupHistoryMap/" + reHincId, new message_s_1.GroupMsg());
        grouphistory.cancel = true;
        store.setStore("groupHistoryMap/" + reHincId, grouphistory);
    }
    pushLastChat([gid, msg.msg.time, user_s_1.GENERATOR_TYPE.GROUP]);
};
/**
 *
 * @param value  chat
 */
var pushLastChat = function pushLastChat(value) {
    var lastChat = store.getStore("lastChat", []);
    var index = lastChat.findIndex(function (item) {
        return item[0] === value[0] && item[2] === value[2];
    });
    var setting = store.getStore('setting', { msgTop: [] });
    var topFg = void 0; // 消息是否置顶
    var topLen = void 0; // 置顶消息个数
    if (value[2] === user_s_1.GENERATOR_TYPE.USER) {
        // 单聊消息
        var sid = store.getStore('uid');
        var hid = util_1.genUserHid(sid, value[0]);
        topFg = setting.msgTop.findIndex(function (item) {
            return item === hid;
        }) > -1;
        topLen = setting.msgTop.length;
    } else {
        // 群聊消息
        var _hid = util_1.genGroupHid(value[0]);
        topFg = setting.msgTop.findIndex(function (item) {
            return item === _hid;
        }) > -1;
        topLen = setting.msgTop.length;
    }
    // 置顶消息不改变位置，不置顶消息放到置顶消息后
    if (!topFg) {
        index > -1 && lastChat.splice(index, 1);
        lastChat.splice(topLen, 0, value);
    }
    store.setStore("lastChat", lastChat);
};
})