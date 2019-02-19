_$define("chat/server/data/rpc/message.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 聊天操作
 */
// ================================================================= 导入
var message_s_1 = require("../db/message.s");
var basic_s_1 = require("./basic.s");
var message_s_2 = require("./message.s");
var bon_1 = require("../../../../pi/util/bon");
var rpc_server_1 = require("../../../../pi_pt/net/rpc_server");
var js_net_1 = require("../../../../pi_pt/rust/pi_serv/js_net");
var db_1 = require("../../../utils/db");
var CONSTANT = require("../constant");
var util_1 = require("../../../utils/util");
var group_s_1 = require("../db/group.s");
var http = require("../http_client");
var group_r_1 = require("./group.r");
var user_r_1 = require("./user.r");
/**
 * 用户确认读取了的最新消息id
 * @param uid user id
 */
// export const messageReadAck = (cursor: LastReadMessageId): Result => {
//     const dbMgr = getEnv().getDbMgr();
//     const lastReadMessageidBucket = new Bucket('file', CONSTANT.LAST_READ_MESSAGE_ID_TABLE, dbMgr);
//     const sessionUid = getUid();
//     const uid = cursor.mtype.split(':')[1];
//     const res = new Result();
//     if (sessionUid === undefined) {
//         console.log('User didn\'t login, can\'t send message read ack');
//         res.r = 0;
//         return res;
//     }
//     if (sessionUid !== parseInt(uid,10)) {
//         console.log('inappropriate uid');
//         res.r = 0;
//         return res;
//     }
//     const lrmi = new LastReadMessageId();
//     lrmi.mtype = cursor.mtype;
//     lrmi.msgId = cursor.msgId;
//     lastReadMessageidBucket.put(uid, lrmi);
//     console.log('User: ', uid, 'confirm receive message id: ', lrmi.msgId);
//     res.r = 1;
//     return res;
// };
/**
 * 获取单聊消息游标
 */
// #[rpc=rpcServer]
exports.getUserHistoryCursor = function (uid) {
    console.log('getuserHistoryCursor uid:', uid);
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var sid = group_r_1.getUid();
    var userHistoryCursorBucket = new db_1.Bucket('file', CONSTANT.USER_HISTORY_CURSOR_TABLE, dbMgr);
    var msgLockBucket = new db_1.Bucket('file', CONSTANT.MSG_LOCK_TABLE, dbMgr);
    var lastID = msgLockBucket.get(util_1.genUserHid(sid, uid))[0];
    var userCursor = userHistoryCursorBucket.get(util_1.genUuid(sid, uid))[0];
    var historyCursor = new message_s_2.HistoryCursor();
    // if (!userCursor || !lastID) {
    //     historyCursor.code = -1;
    //     historyCursor.cursor = 0;
    //     historyCursor.last = 0;
    //     return historyCursor;
    // }
    console.log('getUserHistoryCursor userCursor', userCursor, lastID);
    historyCursor.code = 1;
    historyCursor.cursor = userCursor ? userCursor.cursor : -1; // 消息ID从0开始，-1表示没有消息
    historyCursor.last = lastID ? lastID.current : 0;
    console.log('getUserHistoryCursor historyCursor', historyCursor);
    return historyCursor;
};
/**
 * 获取群聊消息游标
 */
// #[rpc=rpcServer]
exports.getGroupHistoryCursor = function (gid) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var sid = group_r_1.getUid();
    var groupHistoryCursorBucket = new db_1.Bucket('file', CONSTANT.GROUP_HISTORY_CURSOR_TABLE, dbMgr);
    var msgLockBucket = new db_1.Bucket('file', CONSTANT.MSG_LOCK_TABLE, dbMgr);
    var lastID = msgLockBucket.get(util_1.genGroupHid(gid))[0];
    var groupCursor = groupHistoryCursorBucket.get(util_1.genGuid(gid, sid))[0];
    var historyCursor = new message_s_2.HistoryCursor();
    console.log('!!!!!!!!!!!!!!!!!groupCursor', groupCursor, lastID);
    // if (!groupCursor || !lastID) {
    //     historyCursor.code = -1;
    //     historyCursor.cursor = 0;
    //     historyCursor.last = 0;
    //     return historyCursor;
    // }
    historyCursor.code = 1;
    historyCursor.cursor = groupCursor ? groupCursor.cursor : -1;
    historyCursor.last = lastID ? lastID.current : 0;
    console.log('getGroupHistoryCursor groupCursor', groupCursor, lastID);
    console.log('getGroupHistoryCursor historyCursor', historyCursor);
    return historyCursor;
};
// ================================================================= 导出
/**
 * 发送群组消息
 * @param message group send
 */
// #[rpc=rpcServer]
// tslint:disable-next-line:max-func-body-length
exports.sendGroupMessage = function (message) {
    console.log("!!!!!!!!!!sendGroupMessage message: " + message);
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var groupHistoryBucket = new db_1.Bucket('file', CONSTANT.GROUP_HISTORY_TABLE, dbMgr);
    var msgLockBucket = new db_1.Bucket('file', CONSTANT.MSG_LOCK_TABLE, dbMgr);
    var gInfoBucket = new db_1.Bucket('file', CONSTANT.GROUP_INFO_TABLE, dbMgr);
    var gInfo = gInfoBucket.get(message.gid)[0];
    var gh = new message_s_1.GroupHistory();
    var sid = group_r_1.getUid();
    // 判断是否是群组成员
    console.log("sid is : " + sid);
    if (gInfo.memberids.findIndex(function (id) {
        return id === sid;
    }) === -1) {
        gh.hIncId = CONSTANT.DEFAULT_ERROR_STR;
        return gh;
    }
    // 判断群是否解散
    if (gInfo.state === group_s_1.GROUP_STATE.DISSOLVE) {
        gh.hIncId = CONSTANT.DEFAULT_ERROR_STR;
        return gh;
    }
    console.log("before read and write");
    // 过滤敏感词汇
    if (message.mtype === message_s_1.MSG_TYPE.TXT) {
        message.msg = filterWords(message.msg);
    }
    var gmsg = new message_s_1.GroupMsg();
    gmsg.msg = message.msg;
    gmsg.mtype = message.mtype;
    gmsg.send = true;
    gmsg.sid = sid;
    gmsg.time = Date.now(); // 发送时间由服务器设置
    gmsg.cancel = false;
    gh.msg = gmsg;
    // 消息撤回
    if (message.mtype === message_s_1.MSG_TYPE.RECALL) {
        // 需要撤回的消息key
        var recallKey = message.msg;
        // 获取撤回消息的基础信息
        var v = groupHistoryBucket.get(recallKey)[0];
        console.log('sendGroupMessage grouphistory begin v:', v);
        // TODO 判断撤回时间
        if (v !== undefined) {
            v.msg.cancel = true;
            // v.msg.mtype = MSG_TYPE.RECALL;
            groupHistoryBucket.put(recallKey, v);
            console.log('sendGroupMessage grouphistory v:', v);
            // // 发布消息通知
            // const buf = new BonBuffer();
            // v.bonEncode(buf);
            // const mqttServer = getEnv().getNativeObject<ServerNode>('mqttServer');
            // const groupTopic = `ims/group/msg/${message.gid}`;
            // console.log(`before publish ,the topic is : ${groupTopic}`);
            // // directly send message to group topic
            // mqttPublish(mqttServer, true, QoS.AtMostOnce, groupTopic, buf.getBuffer());
            // return v;
        } else {
            gh.hIncId = CONSTANT.DEFAULT_ERROR_STR;
            console.log('sendGroupMessage grouphistory gh:', gh);
            return gh;
        }
    }
    // 公告消息撤回
    if (message.mtype === message_s_1.MSG_TYPE.RENOTICE) {
        // 群主才能发送公告和撤销公告
        if (group_r_1.getUid() !== gInfo.ownerid) {
            gh.hIncId = CONSTANT.DEFAULT_ERROR_STR;
            return gh;
        }
        // 需要撤回的消息key
        var _recallKey = message.msg;
        var noticeBucket = new db_1.Bucket('file', CONSTANT.ANNOUNCE_HISTORY_TABLE, dbMgr);
        // 获取撤回消息的基础信息
        var _v = noticeBucket.get(_recallKey)[0];
        console.log('sendGroupMessage AnnounceHistory', _v);
        // TODO 判断撤回时间
        if (_v !== undefined) {
            _v.announce.cancel = true;
            noticeBucket.put(_recallKey, _v);
        } else {
            gh.hIncId = CONSTANT.DEFAULT_ERROR_STR;
            console.log('sendGroupMessage grouphistory gh:', gh);
            return gh;
        }
    }
    // 生成消息ID
    var msgLock = new message_s_1.MsgLock();
    msgLock.hid = util_1.genGroupHid(message.gid);
    // 这是一个事务
    msgLockBucket.readAndWrite(msgLock.hid, function (mLock) {
        mLock[0] === undefined ? msgLock.current = 0 : msgLock.current = util_1.genNextMessageIndex(mLock[0].current);
        return msgLock;
    });
    console.log("after read and write");
    gh.hIncId = util_1.genHIncId(msgLock.hid, msgLock.current);
    // 公告消息
    if (message.mtype === message_s_1.MSG_TYPE.NOTICE) {
        // 群主才能发送公告和撤销公告
        if (group_r_1.getUid() !== gInfo.ownerid) {
            gh.hIncId = CONSTANT.DEFAULT_ERROR_STR;
            return gh;
        }
        // 公告数据存储
        var _noticeBucket = new db_1.Bucket('file', CONSTANT.ANNOUNCE_HISTORY_TABLE, dbMgr);
        var anmt = new message_s_1.Announcement();
        anmt.cancel = false;
        anmt.msg = message.msg;
        anmt.mtype = message.mtype;
        anmt.send = true;
        anmt.time = Date.now();
        anmt.sid = group_r_1.getUid();
        var ah = new message_s_1.AnnounceHistory();
        // 公告key使用群聊消息key
        ah.aIncId = util_1.genHIncId(msgLock.hid, msgLock.current);
        ah.announce = anmt;
        _noticeBucket.put(ah.aIncId, ah);
        console.log('sendGroupMessage annoucement: ', ah, 'to group: ', message.gid);
        gInfo.annoceids.push(gh.hIncId);
        gInfoBucket.put(message.gid, gInfo);
    }
    groupHistoryBucket.put(gh.hIncId, gh);
    // 移动游标表
    // moveGroupCursor(message.gid, msgLock.current);
    // const buf = new BonBuffer();
    // gh.bonEncode(buf);
    var sendMsg = new message_s_2.SendMsg();
    sendMsg.code = 1;
    sendMsg.last = msgLock.current;
    sendMsg.rid = gmsg.sid;
    var buf = new bon_1.BonBuffer();
    sendMsg.bonEncode(buf);
    var mqttServer = rpc_server_1.getEnv().getNativeObject('mqttServer');
    var groupTopic = "ims/group/msg/" + message.gid;
    console.log("before publish ,the topic is : " + groupTopic);
    // directly send message to group topic
    js_net_1.mqttPublish(mqttServer, true, js_net_1.QoS.AtMostOnce, groupTopic, buf.getBuffer());
    console.log('Send group message: ', message.msg, 'to group topic: ', groupTopic);
    return gh;
};
/**
 * 群聊游标移动
 */
exports.moveGroupCursor = function (gid, current) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var groupHistoryCursorBucket = new db_1.Bucket('file', CONSTANT.GROUP_HISTORY_CURSOR_TABLE, dbMgr);
    var gInfoBucket = new db_1.Bucket('file', CONSTANT.GROUP_INFO_TABLE, dbMgr);
    var gInfo = gInfoBucket.get(gid)[0];
    // 群组中的所有成员都是接收者，包括发送者
    gInfo.memberids.forEach(function (elem) {
        var guid = util_1.genGuid(gid, elem);
        var ridGroupCursor = groupHistoryCursorBucket.get(guid)[0];
        console.log('sendGroupMessage moveGroupCursor begin guid', guid, 'ridGroupCursor: ', ridGroupCursor);
        // 游标表中是否有该用户的记录
        if (!ridGroupCursor) {
            ridGroupCursor = new message_s_1.GroupHistoryCursor();
            ridGroupCursor.guid = guid;
            ridGroupCursor.cursor = -1;
        }
        // 用户是否在线，在线则更新游标
        var res = exports.isUserOnline(elem);
        if (res.r === 1) {
            ridGroupCursor.cursor = current;
        }
        console.log('sendGroupMessage moveGroupCursor guid', guid, 'ridGroupCursor: ', ridGroupCursor);
        groupHistoryCursorBucket.put(guid, ridGroupCursor);
    });
};
/**
 * 发送单聊消息
 * @param message user send
 */
// #[rpc=rpcServer]
// tslint:disable-next-line:max-func-body-length
exports.sendUserMessage = function (message) {
    console.log('sendMsg!!!!!!!!!!!', message);
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var userHistoryBucket = new db_1.Bucket('file', CONSTANT.USER_HISTORY_TABLE, dbMgr);
    var msgLockBucket = new db_1.Bucket('file', CONSTANT.MSG_LOCK_TABLE, dbMgr);
    var sid = group_r_1.getUid();
    var userHistory = new message_s_1.UserHistory();
    var contactBucket = new db_1.Bucket(CONSTANT.WARE_NAME, CONSTANT.CONTACT_TABLE, dbMgr);
    // 获取对方联系人列表
    var sContactInfo = contactBucket.get(message.rid)[0];
    // 过滤敏感词汇
    if (message.mtype === message_s_1.MSG_TYPE.TXT) {
        message.msg = filterWords(message.msg);
    }
    // 消息撤回
    if (message.mtype === message_s_1.MSG_TYPE.RECALL) {
        // 需要撤回的消息key
        var recallKey = message.msg;
        // 获取撤回消息的基础信息
        var v = userHistoryBucket.get(recallKey)[0];
        // TODO 判断撤回时间
        if (v !== undefined) {
            v.msg.cancel = true; // 撤回该条消息，但是该消息本身不是一条撤回标记
            // v.msg.mtype = MSG_TYPE.RECALL;
            userHistoryBucket.put(recallKey, v);
        } else {
            // 错误的撤回请求
            userHistory.hIncId = CONSTANT.DEFAULT_ERROR_STR;
            return userHistory;
        }
    }
    var userMsg = new message_s_1.UserMsg();
    userMsg.cancel = false;
    userMsg.msg = message.msg;
    userMsg.mtype = message.mtype;
    userMsg.read = false;
    userMsg.send = true;
    userMsg.sid = sid;
    userMsg.time = Date.now();
    userHistory.msg = userMsg;
    var msgLock = new message_s_1.MsgLock();
    msgLock.hid = util_1.genUserHid(sid, message.rid);
    // 这是一个事务
    console.log('before readAndWrite');
    msgLockBucket.readAndWrite(msgLock.hid, function (mLock) {
        mLock[0] === undefined ? msgLock.current = 0 : msgLock.current = util_1.genNextMessageIndex(mLock[0].current);
        console.log('readAndWrite...');
        return msgLock;
    });
    console.log('after readAndWrite');
    userHistory.hIncId = util_1.genHIncId(msgLock.hid, msgLock.current);
    // 判断是否在对方的黑名单，只保存不推送
    if (sContactInfo.blackList.findIndex(function (item) {
        return item === sid;
    }) > -1) {
        userMsg.send = false;
        userHistory.msg = userMsg;
        userHistoryBucket.put(userHistory.hIncId, userHistory);
        return userHistory;
    }
    // 判断当前用户是否在对方的好友列表中
    if (sContactInfo.friends.findIndex(function (item) {
        return item === sid;
    }) === -1) {
        userHistory.hIncId = CONSTANT.DEFAULT_ERROR_STR;
        return userHistory;
    }
    userHistoryBucket.put(userHistory.hIncId, userHistory);
    console.log('Persist user history message to DB: ', userHistory);
    // 推送消息ID
    var sendMsg = new message_s_2.SendMsg();
    sendMsg.code = 1;
    sendMsg.last = msgLock.current;
    sendMsg.rid = sid;
    var buf = new bon_1.BonBuffer();
    sendMsg.bonEncode(buf);
    var mqttServer = rpc_server_1.getEnv().getNativeObject('mqttServer');
    js_net_1.mqttPublish(mqttServer, true, js_net_1.QoS.AtMostOnce, message.rid.toString(), buf.getBuffer());
    console.log("from " + sid + " to " + message.rid + ", message is : " + JSON.stringify(sendMsg), buf.getBuffer());
    // 举报用户
    if (message.mtype === message_s_1.MSG_TYPE.COMPLAINT) {
        user_r_1.autoReplayMessage('收到您的举报，我们将会尽快核实并给予处理');
    }
    return userHistory;
};
/**
 * 过滤敏感词
 * access_token 有效期一个月
 * @param mess 需要处理的文本
 */
var filterWords = function filterWords(mess) {
    var url = "https://aip.baidubce.com/rest/2.0/antispam/v2/spam?access_token=24.e9544e04e5a9a0cbadec4ba1f9bfe7ee.2592000.1552556386.282335-15546570";
    var client = http.createClient();
    http.addHeader(client, 'content-type', 'application/x-www-form-urlencoded');
    var r = http.formPost(client, url, 'content', mess);
    console.log('filterWords!!!!!!!!!!!! mess:', mess, ' r:', r);
    if (r.ok) {
        var res = JSON.parse(r.ok);
        if (res.result && res.result.spam > 0) {
            console.log('filterWords!!!!!!!!!!!! res:', res.result);
            var list = res.result.reject.concat(res.result.review);
            for (var _iterator = list, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var i = _ref;

                for (var _iterator2 = i.hit, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                    var _ref2;

                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i2++];
                    } else {
                        _i2 = _iterator2.next();
                        if (_i2.done) break;
                        _ref2 = _i2.value;
                    }

                    var j = _ref2;

                    while (mess.indexOf(j) > -1) {
                        mess = mess.replace(j, '*');
                    }
                    console.log('filterWords j:', j, ' mess:', mess);
                }
            }
        }
    }
    console.log('!!!!!!!!!!!!!!!!!!filterWords!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', mess);
    return mess;
};
/**
 * 判断用户是否在线
 * @param uid 用户ID
 */
// #[rpc=rpcServer]
exports.isUserOnline = function (uid) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var res = new basic_s_1.Result();
    var bucket = new db_1.Bucket('memory', CONSTANT.ONLINE_USERS_TABLE, dbMgr);
    var onlineUser = bucket.get(uid)[0];
    if (onlineUser !== undefined && onlineUser.sessionId !== -1) {
        console.log('User: ', uid, 'on line');
        res.r = 1; // on line;
        return res;
    } else {
        console.log('User: ', uid, 'off line');
        res.r = 0; // off online
        return res;
    }
};
// ----------------- helpers ------------------
})