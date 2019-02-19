_$define("chat/client/app/logic/logic", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 一些全局方法
 */
// =====================================导入
var config_1 = require("../../../../app/config");
var root_1 = require("../../../../pi/ui/root");
var painter_1 = require("../../../../pi/widget/painter");
var group_s_1 = require("../../../server/data/db/group.s");
var user_s_1 = require("../../../server/data/db/user.s");
var util_1 = require("../../../utils/util");
var store = require("../data/store");
var init_1 = require("../net/init");
// =====================================导出
/**
 * 时间戳格式化 毫秒为单位
 * timeType 1 返回时分， 2 返回月日， 3 返回月日时分
 */
exports.timestampFormat = function (timestamp, timeType) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    var day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    var hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
    var minutes = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
    var seconds = date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
    if (timeType === 1) {
        return hour + ":" + minutes;
    }
    if (timeType === 2) {
        return month + "\u6708" + day + "\u65E5";
    }
    if (timeType === 3) {
        return month + "\u6708" + day + "\u65E5 " + hour + ":" + minutes;
    }
    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
};
/**
 * Map转json，仅接受一层map
 */
exports.map2Json = function (data) {
    var res = {};
    data.forEach(function (v, k) {
        res[k] = v;
    });
    return res;
};
/**
 * json转Map，仅可转一层map
 */
exports.json2Map = function (data) {
    var res = new Map();
    for (var i in data) {
        res.set(i, data[i]);
    }
    return res;
};
/**
 * 获取好友的别名
 */
exports.getFriendAlias = function (rid) {
    var sid = store.getStore('uid');
    var user = store.getStore("userInfoMap/" + rid, new user_s_1.UserInfo());
    var friend = store.getStore("friendLinkMap/" + util_1.genUuid(sid, rid), new user_s_1.FriendLink());
    return friend.alias || user.name;
};
/**
 * 用户退出群组后取消订阅清空本地数据
 */
exports.exitGroup = function (gid) {
    init_1.unSubscribe("ims/group/msg/" + gid);
    var groupChatMap = store.getStore('groupChatMap', new Map());
    groupChatMap.delete(util_1.genGroupHid(gid)); // 删除聊天记录
    store.setStore('groupChatMap', groupChatMap);
    var lastChat = store.getStore("lastChat", []);
    var index = lastChat.findIndex(function (item) {
        return item[0] === gid && item[2] === user_s_1.GENERATOR_TYPE.GROUP;
    });
    if (index > -1) {
        // 删除最近对话记录
        lastChat.splice(index, 1);
        store.setStore('lastChat', lastChat);
    }
    var lastRead = store.getStore("lastRead", []);
    lastRead.delete(util_1.genGroupHid(gid)); // 删除已读消息记录
    store.setStore("lastRead", lastRead);
    var gInfoMap = store.getStore("groupInfoMap", new Map());
    gInfoMap.delete(gid); // 删除群组信息
    store.setStore("groupInfoMap", gInfoMap);
};
// 复制到剪切板
exports.copyToClipboard = function (copyText) {
    var input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', copyText);
    input.setAttribute('style', 'position:absolute;top:-9999px;');
    document.body.appendChild(input);
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        input.setSelectionRange(0, 9999);
    } else {
        input.select();
    }
    if (document.execCommand('copy')) {
        document.execCommand('copy');
    }
    document.body.removeChild(input);
};
// 底部提示
exports.bottomNotice = function (content) {
    root_1.popNew('app-components1-message-message', { content: content });
};
// 获取用户头像
exports.getUserAvatar = function (rid) {
    if (rid) {
        var user = store.getStore("userInfoMap/" + rid, new user_s_1.UserInfo());
        var avatar = user.avatar ? util_1.depCopy(user.avatar) : '';
        if (avatar && avatar.indexOf('data:image') < 0) {
            avatar = "" + config_1.uploadFileUrlPrefix + avatar;
        }
        return avatar;
    } else {
        return '';
    }
};
// 获取群组头像
exports.getGroupAvatar = function (gid) {
    if (gid) {
        var group = store.getStore("groupInfoMap/" + gid, new group_s_1.GroupInfo());
        var avatar = group.avatar ? util_1.depCopy(group.avatar) : '';
        if (avatar && avatar.indexOf('data:image') < 0) {
            avatar = "" + config_1.uploadFileUrlPrefix + avatar;
        }
        return avatar;
    } else {
        return '';
    }
};
// 获取群内用户头像
exports.getGroupUserAvatar = function (gid, rid) {
    if (rid) {
        var user = store.getStore("groupUserLinkMap/" + util_1.genGuid(gid, rid), new group_s_1.GroupUserLink());
        var avatar = user.avatar ? util_1.depCopy(user.avatar) : '';
        if (avatar && avatar.indexOf('data:image') < 0) {
            avatar = "" + config_1.uploadFileUrlPrefix + avatar;
        }
        return avatar;
    } else {
        return '';
    }
};
// 水波纹动画效果展示
exports.rippleShow = function (e) {
    painter_1.getRealNode(e.node).classList.add('ripple');
    setTimeout(function () {
        painter_1.getRealNode(e.node).classList.remove('ripple');
    }, 500);
};
})