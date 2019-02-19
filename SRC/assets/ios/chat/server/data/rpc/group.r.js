_$define("chat/server/data/rpc/group.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 群组相关的rpc操作
 */
// ================================================================= 导入
var group_s_1 = require("../db/group.s");
var user_s_1 = require("../db/user.s");
var basic_s_1 = require("./basic.s");
var group_s_2 = require("./group.s");
var bon_1 = require("../../../../pi/util/bon");
var rpc_server_1 = require("../../../../pi_pt/net/rpc_server");
var js_net_1 = require("../../../../pi_pt/rust/pi_serv/js_net");
var db_1 = require("../../../utils/db");
var logger_1 = require("../../../utils/logger");
var util_1 = require("../../../utils/util");
var session_r_1 = require("../../rpc/session.r");
var CONSTANT = require("../constant");
var message_s_1 = require("../db/message.s");
var message_r_1 = require("./message.r");
var message_s_2 = require("./message.s");
var logger = new logger_1.Logger('GROUP');
var START_INDEX = 0;
// ================================================================= 导出
/**
 * 用户主动申请加入群组
 * @param guid group user id
 */
// #[rpc=rpcServer]
exports.applyJoinGroup = function (gid) {
    var groupInfoBucket = getGroupInfoBucket();
    var uid = exports.getUid();
    var res = new basic_s_1.Result();
    var gInfo = groupInfoBucket.get(gid)[0];
    // 群是否存在
    if (!gInfo) {
        logger.debug('group: ', gid, 'is not exist');
        res.r = -2;
        return res;
    }
    // 群是否被解散
    if (gInfo.state === group_s_1.GROUP_STATE.DISSOLVE) {
        logger.debug('group: ', gid, 'was Disbanded');
        res.r = -2;
        return res;
    }
    if (gInfo.memberids.indexOf(uid) > -1) {
        res.r = -1;
        logger.debug("user: " + uid + ", is exist in group: " + gInfo.name);
        return res;
    }
    gInfo.applyUser.findIndex(function (item) {
        return item === uid;
    }) < 0 && gInfo.applyUser.push(uid);
    groupInfoBucket.put(gid, gInfo);
    res.r = 1;
    return res;
};
/**
 * 用户主动退出群组
 * @param gid group number
 */
// #[rpc=rpcServer]
exports.userExitGroup = function (gid) {
    var groupInfoBucket = getGroupInfoBucket();
    var contactBucket = getContactBucket();
    var uid = exports.getUid();
    var res = new basic_s_1.Result();
    var gInfo = groupInfoBucket.get(gid)[0];
    var uidIndex = gInfo.memberids.indexOf(uid);
    var contact = contactBucket.get(uid)[0];
    var gidIndex = contact.group.indexOf(gid);
    // 群主不能主动退出群组 只能调用解散群接口
    if (gInfo.ownerid === uid) {
        logger.debug('user: ', uid, 'is owner, cant exit group: ', gid);
        res.r = -1;
        return res;
    }
    if (uidIndex > -1) {
        gInfo.memberids.splice(uidIndex, 1);
        groupInfoBucket.put(gid, gInfo);
        logger.debug('user: ', uid, 'exit group: ', gid);
        contact.group.splice(gidIndex, 1);
        contactBucket.put(uid, contact);
        logger.debug('Remove group: ', gid, 'from user\'s contact');
        var groupUserLinkBucket = getGroupUserLinkBucket();
        groupUserLinkBucket.delete(gid + ":" + uid);
        logger.debug('delete user: ', uid, 'from groupUserLinkBucket');
        res.r = 1;
    } else {
        res.r = 0;
    }
    return res;
};
/**
 * 管理员接受/拒绝用户的加群申请
 * @param agree agree
 */
// #[rpc=rpcServer]
// tslint:disable-next-line:max-func-body-length
exports.acceptUser = function (agree) {
    var groupInfoBucket = getGroupInfoBucket();
    var uid = exports.getUid();
    var res = new basic_s_1.Result();
    var gInfo = groupInfoBucket.get(agree.gid)[0];
    var admins = gInfo.adminids;
    var owner = gInfo.ownerid;
    var contactBucket = getContactBucket();
    var contact = contactBucket.get(agree.uid)[0];
    // 如果加群申请中没有该用户 
    if (gInfo.applyUser.findIndex(function (item) {
        return item === agree.uid;
    }) === -1) {
        res.r = 0;
        logger.debug('user:', agree.uid, 'not to be invited');
        return res;
    }
    // 删除接受/拒绝用户的加群申请
    gInfo.applyUser = util_1.delValueFromArray(agree.uid, gInfo.applyUser);
    groupInfoBucket.put(gInfo.gid, gInfo);
    // 进群需要同意，判断同意者是否是管理员
    if (gInfo.need_agree && !(admins.indexOf(uid) > -1 || owner === uid)) {
        res.r = 3; // user is not admin or owner
        logger.debug('User: ', uid, 'is not amdin or owner');
        return res;
    }
    // 拒绝入群申请
    if (!agree.agree) {
        res.r = 4; // admin refuse user to join
        logger.debug('Admin refuse user: ', agree.uid, 'to join in group: ', agree.gid);
        return res;
    }
    // 用户已经在群中
    if (gInfo.memberids.indexOf(agree.uid) > -1) {
        res.r = 2; // user has been exist
        logger.debug('User: ', agree.uid, 'has been exist');
        return res;
    } else if (!contact) {
        // 用户是否存在
        res.r = -1; // agree.uid is not a registered user
        logger.error('user: ', agree.uid, 'is not a registered user');
        return res;
    }
    gInfo.memberids.push(agree.uid);
    groupInfoBucket.put(gInfo.gid, gInfo);
    logger.debug('Accept user: ', agree.uid, 'to group: ', agree.gid);
    contact.applyGroup = util_1.delGidFromApplygroup(agree.gid, contact.applyGroup); // 同意用户入群，清空该用户受该群组的邀请记录
    contact.group.push(agree.gid);
    contactBucket.put(agree.uid, contact);
    logger.debug('acceptUser uid', agree.uid, 'group ', contact.group, 'applyGroup:', contact.applyGroup);
    var groupUserLinkBucket = getGroupUserLinkBucket();
    var currentUser = getCurrentUserInfo(agree.uid);
    var gul = new group_s_1.GroupUserLink();
    gul.guid = agree.gid + ":" + agree.uid;
    gul.hid = '';
    gul.join_time = Date.now();
    gul.userAlias = '';
    gul.groupAlias = '';
    gul.avatar = currentUser.avatar;
    groupUserLinkBucket.put(gul.guid, gul);
    moveGroupCursor(agree.gid, agree.uid);
    logger.debug('Add user: ', agree.uid, 'to groupUserLinkBucket', gul);
    // 发布一条用户入群成功消息，发送者ID应该是入群者非当前用户
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var groupHistoryBucket = new db_1.Bucket('file', CONSTANT.GROUP_HISTORY_TABLE, dbMgr);
    var msgLockBucket = new db_1.Bucket('file', CONSTANT.MSG_LOCK_TABLE, dbMgr);
    var gh = new message_s_1.GroupHistory();
    var gmsg = new message_s_1.GroupMsg();
    gmsg.msg = '用户加群成功';
    gmsg.mtype = message_s_1.MSG_TYPE.ADDGROUP;
    gmsg.send = true;
    gmsg.sid = agree.uid;
    gmsg.time = Date.now(); // 发送时间由服务器设置
    gmsg.cancel = false;
    gh.msg = gmsg;
    // 生成消息ID
    var msgLock = new message_s_1.MsgLock();
    msgLock.hid = util_1.genGroupHid(agree.gid);
    // 这是一个事务
    msgLockBucket.readAndWrite(msgLock.hid, function (mLock) {
        mLock[0] === undefined ? msgLock.current = 0 : msgLock.current = util_1.genNextMessageIndex(mLock[0].current);
        return msgLock;
    });
    gh.hIncId = util_1.genHIncId(msgLock.hid, msgLock.current);
    groupHistoryBucket.put(gh.hIncId, gh);
    var mqttServer = rpc_server_1.getEnv().getNativeObject('mqttServer');
    var sendMsg = new message_s_2.SendMsg();
    sendMsg.code = 1;
    sendMsg.last = msgLock.current;
    sendMsg.rid = gmsg.sid;
    var buf = new bon_1.BonBuffer();
    sendMsg.bonEncode(buf);
    var groupTopic = "ims/group/msg/" + agree.gid;
    logger.debug("before publish ,the topic is : " + groupTopic);
    // directly send message to group topic
    js_net_1.mqttPublish(mqttServer, true, js_net_1.QoS.AtMostOnce, groupTopic, buf.getBuffer());
    res.r = 1; // successfully add user
    return res;
};
/**
 * 群成员邀请其他用户加入群
 * @param invite invaite Array
 */
// #[rpc=rpcServer]
exports.inviteUsers = function (invites) {
    var groupInfoBucket = getGroupInfoBucket();
    var contactBucket = getContactBucket();
    var uid = exports.getUid();
    var res = new basic_s_1.Result();
    var gid = invites.arr[0].gid;
    var gInfo = groupInfoBucket.get(gid)[0];
    console.log('inviteUsers groupInfo: ', gInfo);
    // 判断该用户是否属于该群组
    if (gInfo.memberids.indexOf(uid) <= -1) {
        logger.debug('user: ', uid, 'is not a member of this group');
        res.r = 2; // User is not a member of this group
        return res;
    }
    // 入群需要同意需要判断是否是好友
    if (gInfo.need_agree) {
        // 判断该用户是否和被邀请的用户是好友
        var currentUserInfo = contactBucket.get(uid)[0];
        logger.debug("before filter invites is : " + JSON.stringify(invites.arr));
        logger.debug("currentUserInfo.friends is : " + JSON.stringify(currentUserInfo.friends));
        invites.arr = invites.arr.filter(function (ele) {
            // 无法邀请不是好友的用户
            return currentUserInfo.friends.findIndex(function (item) {
                return item === ele.rid;
            }) !== -1;
        });
    }
    logger.debug("after filter invites is : " + JSON.stringify(invites.arr));

    var _loop = function _loop(i) {
        var rid = invites.arr[i].rid;
        var cInfo = contactBucket.get(rid)[0];
        // 判断对方是否已经在当前群中
        if (gInfo.memberids.indexOf(rid) > -1) {
            logger.debug('be invited user: ', rid, 'is exist in this group:', gid);
            return "continue";
        }
        if (gInfo.need_agree) {
            cInfo.applyGroup.indexOf(util_1.genGuid(gid, uid)) === -1 && cInfo.applyGroup.push(util_1.genGuid(gid, uid));
            contactBucket.put(rid, cInfo);
            logger.debug('Invite user: ', rid, 'to group: ', gid);
        } else {
            // 入群不需要同意则直接自动入群
            gInfo.applyUser.findIndex(function (item) {
                return item === rid;
            }) === -1 && gInfo.applyUser.push(rid);
            groupInfoBucket.put(gid, gInfo);
            var agree = new group_s_2.GroupAgree();
            agree.gid = gid;
            agree.uid = rid;
            agree.agree = true;
            exports.acceptUser(agree);
        }
    };

    for (var i = 0; i < invites.arr.length; i++) {
        var _ret = _loop(i);

        if (_ret === "continue") continue;
    }
    res.r = 1;
    return res;
};
/**
 * 用户同意加入群组(被动加入)
 * @param agree GroupAgree
 */
// #[rpc=rpcServer]
exports.agreeJoinGroup = function (agree) {
    var groupInfoBucket = getGroupInfoBucket();
    var contactBucket = getContactBucket();
    var uid = exports.getUid();
    var gInfo = groupInfoBucket.get(agree.gid)[0];
    var cInfo = contactBucket.get(uid)[0];
    // 判断群组是否邀请了该用户,如果没有邀请，则直接返回
    if (cInfo.applyGroup.findIndex(function (item) {
        return util_1.getGidFromGuid(item) === agree.gid;
    }) === -1) {
        gInfo.gid = -1; // gid = -1 indicate that user don't want to join this group
        return gInfo;
    }
    // 删除applyGroup并放回db中
    cInfo.applyGroup = util_1.delGidFromApplygroup(agree.gid, cInfo.applyGroup);
    contactBucket.put(uid, cInfo);
    // 拒绝加入群组
    if (!agree.agree) {
        logger.debug('User: ', uid, 'don\'t want to join group: ', agree.gid);
        gInfo.gid = -2; // gid = -1 indicate that user don't want to join this group
        return gInfo;
    }
    // 已经在群组中
    if (gInfo.memberids.indexOf(uid) > -1) {
        logger.debug('User: ', uid, 'has been exist');
        gInfo.gid = -3;
        return gInfo;
    }
    cInfo.group.push(agree.gid);
    contactBucket.put(uid, cInfo);
    gInfo.memberids.push(uid);
    gInfo.applyUser = util_1.delValueFromArray(agree.uid, gInfo.applyUser); // 用户同意入群，清空该群组该用户的申请记录
    groupInfoBucket.put(gInfo.gid, gInfo);
    logger.debug('User: ', uid, 'agree to join group: ', agree.gid);
    var groupUserLinkBucket = getGroupUserLinkBucket();
    var currentUser = getCurrentUserInfo();
    var gul = new group_s_1.GroupUserLink();
    gul.guid = util_1.genGuid(agree.gid, uid);
    gul.hid = gInfo.hid;
    gul.join_time = Date.now();
    gul.userAlias = '';
    gul.groupAlias = '';
    gul.avatar = currentUser.avatar;
    groupUserLinkBucket.put(gul.guid, gul);
    moveGroupCursor(agree.gid, agree.uid);
    logger.debug('Add user: ', uid, 'to groupUserLinkBucket');
    var info = new message_s_2.GroupSend();
    info.msg = '用户加群成功';
    info.mtype = message_s_1.MSG_TYPE.ADDGROUP;
    info.gid = agree.gid;
    info.time = Date.now();
    message_r_1.sendGroupMessage(info);
    return gInfo;
};
/**
 * 用户被动或主动进入群组后创建一个游标
 */
var moveGroupCursor = function moveGroupCursor(gid, rid) {
    logger.debug('JoinGroup moveGroupCursor gid: ', gid, 'rid: ', rid);
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var guid = util_1.genGuid(gid, rid);
    var groupHistoryCursorBucket = new db_1.Bucket('file', CONSTANT.GROUP_HISTORY_CURSOR_TABLE, dbMgr);
    var msgLockBucket = new db_1.Bucket('file', CONSTANT.MSG_LOCK_TABLE, dbMgr);
    var msglock = msgLockBucket.get(util_1.genGroupHid(gid))[0];
    var ridGroupCursor = new message_s_1.GroupHistoryCursor();
    ridGroupCursor.guid = guid;
    ridGroupCursor.cursor = msglock ? msglock.current : -1;
    logger.debug('JoinGroup moveGroupCursor guid: ', guid, 'ridGroupCursor: ', ridGroupCursor);
    groupHistoryCursorBucket.put(guid, ridGroupCursor);
};
/**
 * 转移群主
 * @param guid group user id
 */
// #[rpc=rpcServer]
exports.setOwner = function (guid) {
    var groupInfoBucket = getGroupInfoBucket();
    var uid = exports.getUid();
    var groupId = util_1.getGidFromGuid(guid);
    var newOwnerId = util_1.getUidFromGuid(guid);
    var res = new basic_s_1.Result();
    logger.debug('user logged in with uid: ', uid, 'and you want to chang new owner: ', newOwnerId);
    var gInfo = groupInfoBucket.get(groupId)[0];
    if (uid !== gInfo.ownerid) {
        logger.debug('User: ', uid, 'is not the owner of group: ', gInfo.gid);
        res.r = 0; // not the group owner
        return res;
    }
    // 将原管理员列表对应项替换成新的群主
    var ownerIdindex = gInfo.adminids.indexOf(gInfo.ownerid);
    // 如果群主临时者是管理员
    if (gInfo.adminids.indexOf(newOwnerId) > -1) {
        gInfo.adminids.splice(ownerIdindex, 1);
    } else {
        gInfo.adminids.splice(ownerIdindex, 1, newOwnerId);
    }
    gInfo.ownerid = newOwnerId;
    groupInfoBucket.put(gInfo.gid, gInfo);
    logger.debug('change group: ', groupId, 'owner from: ', gInfo.ownerid, 'to: ', newOwnerId);
    res.r = 1;
    return res;
};
/**
 * 添加管理员
 * @param guidsAdmin group users id
 */
// #[rpc=rpcServer]
exports.addAdmin = function (guidsAdmin) {
    var groupInfoBucket = getGroupInfoBucket();
    // TODO:判断群是否已经销毁
    // TODO:判断群是否存在
    // TODO:先判断当前用户是否是管理员
    // TODO:判断被添加的用户是否是群成员
    // 判断被添加的用户是否已经是管理员
    var uid = exports.getUid();
    var guids = guidsAdmin.guids;
    var res = new basic_s_1.Result();
    var groupId = util_1.getGidFromGuid(guids[0]);
    var gInfo = groupInfoBucket.get(groupId)[0];
    if (!gInfo) {
        logger.debug('group: ', groupId, 'is not exist');
        res.r = -1;
        return res;
    }
    if (gInfo.state === group_s_1.GROUP_STATE.DISSOLVE) {
        logger.debug('group: ', groupId, 'was Disbanded');
        res.r = -1;
        return res;
    }
    if (gInfo.ownerid !== uid) {
        logger.debug('User: ', uid, 'is not an owner');
        res.r = -1;
        return res;
    }
    guids.forEach(function (item) {
        var addAdminId = item.split(':')[1];
        if (gInfo.adminids.indexOf(parseInt(addAdminId, 10)) > -1) {
            res.r = 0;
            logger.debug('User: ', addAdminId, 'is already an admin');
            return res;
        }
        logger.debug('user logged in with uid: ', uid, 'and you want to add an admin: ', addAdminId);
        gInfo.adminids.push(parseInt(addAdminId, 10));
    });
    groupInfoBucket.put(gInfo.gid, gInfo);
    logger.debug('After add admin: ', gInfo);
    res.r = 1;
    return res;
};
/**
 * 删除管理员
 * @param guid group user id
 */
// #[rpc=rpcServer]
exports.delAdmin = function (guid) {
    var groupInfoBucket = getGroupInfoBucket();
    var uid = exports.getUid();
    // TODO:判断群是否已经销毁
    // TODO:判断群是否存在
    // TODO:先判断当前用户是否是管理员
    // TODO:判断是否是群主，群主必须是管理员,不能被删除
    // 判断被添加的用户是否是管理员成员
    var groupId = util_1.getGidFromGuid(guid);
    var delAdminId = util_1.getUidFromGuid(guid);
    var res = new basic_s_1.Result();
    logger.debug('user logged in with uid: ', uid, 'and you want to delete an admin: ', delAdminId);
    var gInfo = groupInfoBucket.get(groupId)[0];
    logger.debug('read group info: ', gInfo);
    if (gInfo.state === 1) {
        logger.debug('group: ', gInfo.gid, ',', gInfo.name, 'is dissolve');
        res.r = -1;
        return res;
    }
    if (gInfo.gid === -1) {
        logger.debug('group: ', gInfo.gid, ',', gInfo.name, 'is not exist');
        res.r = -2;
        return res;
    }
    if (uid !== gInfo.ownerid) {
        logger.debug('user: ', uid, 'is not group owner, not have the permission of delete admins');
        res.r = -3;
        return res;
    }
    var adminids = gInfo.adminids;
    logger.debug('before delete admin memebers: ', gInfo.adminids);
    var index = adminids.indexOf(delAdminId);
    if (index > -1) {
        if (adminids[index] === gInfo.ownerid) {
            logger.debug('group owner: ', gInfo.ownerid, ',', 'is not allow to be delete');
            res.r = -4;
            return res;
        }
        adminids.splice(index, 1);
        gInfo.adminids = adminids;
        groupInfoBucket.put(gInfo.gid, gInfo);
        logger.debug('after delete admin memmber: ', groupInfoBucket.get(gInfo.gid));
        res.r = 1;
        return res;
    } else {
        res.r = 0; // not an admin
        logger.debug('User: ', delAdminId, 'is not an admin');
        return res;
    }
};
/**
 * 剔除用户
 * @param guid group user id
 */
// #[rpc=rpcServer]
exports.delMember = function (guid) {
    var groupInfoBucket = getGroupInfoBucket();
    var uid = exports.getUid();
    var groupId = util_1.getGidFromGuid(guid);
    var delId = util_1.getUidFromGuid(guid);
    var gInfo = groupInfoBucket.get(groupId)[0];
    logger.debug('read group info: ', gInfo);
    var res = new basic_s_1.Result();
    if (uid !== gInfo.ownerid && gInfo.adminids.indexOf(uid) === -1) {
        logger.debug('user : ', uid, 'is not a owner and admins');
        res.r = 0;
        return res;
    }
    if (delId === gInfo.ownerid || gInfo.adminids.indexOf(delId) > -1) {
        logger.debug('user : ', delId, 'is a owner or admins, cant remove');
        res.r = -1;
        return res;
    }
    logger.debug('user logged in with uid: ', uid, 'and you want to delete a member: ', delId);
    var members = gInfo.memberids;
    logger.debug('before delete memeber: ', gInfo.memberids);
    var index = members.indexOf(delId);
    if (index > -1) {
        members.splice(index, 1);
        var groupUserLinkBucket = getGroupUserLinkBucket();
        groupUserLinkBucket.delete(guid);
        logger.debug('delete user: ', delId, 'from groupUserLinkBucket');
    }
    gInfo.memberids = members;
    groupInfoBucket.put(gInfo.gid, gInfo);
    // 被踢出用户的群列表中将该群去掉
    var contactBucket = getContactBucket();
    var contact = contactBucket.get(delId)[0];
    var delGroupIndex = contact.group.indexOf(groupId);
    contact.group.splice(delGroupIndex, 1);
    contactBucket.put(delId, contact);
    logger.debug('user:', delId, 'has exit group', groupId);
    logger.debug('after delete memmber: ', groupInfoBucket.get(gInfo.gid)[0]);
    res.r = 1;
    return res;
};
/**
 * 获取群组内的用户id
 * @param gid group id
 */
exports.getGroupMembers = function (gid) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var groupInfoBucket = getGroupInfoBucket();
    var gm = new group_s_2.GroupMembers();
    var m = groupInfoBucket.get(gid)[0];
    gm.members = m.memberids;
    return gm;
};
/**
 * 获取用户在群组内的信息
 * @param gid group id
 */
// #[rpc=rpcServer]
exports.getGroupUserLink = function (gid) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var groupInfoBucket = getGroupInfoBucket();
    var groupUserLinkBucket = new db_1.Bucket('file', CONSTANT.GROUP_USER_LINK_TABLE, dbMgr);
    var userInfoBucket = new db_1.Bucket('file', CONSTANT.USER_INFO_TABLE, dbMgr);
    var gla = new basic_s_1.GroupUserLinkArray();
    var m = groupInfoBucket.get(gid)[0];
    logger.debug('getGroupUserLink gid: ', gid, 'groupInfo: ', m);
    if (!m) {
        gla.arr = [];
        return gla;
    }
    var guids = m.memberids.map(function (item) {
        return util_1.genGuid(gid, item);
    });
    gla.arr = [];
    for (var _iterator = guids, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

        var userlink = groupUserLinkBucket.get(i)[0];
        var userInfo = userInfoBucket.get(util_1.getUidFromGuid(i))[0];
        if (!userlink.userAlias) {
            userlink.userAlias = userInfo.name;
        }
        userlink.avatar = userInfo.avatar;
        gla.arr.push(userlink);
        console.log('getGroupUserLink userlink: ', userlink, 'userinfo: ', userInfo);
    }
    logger.debug('Get group user link: ', gla);
    return gla;
};
/**
 * 创建群
 * @param uid user id
 *
 *
 */
// #[rpc=rpcServer]
exports.createGroup = function (groupInfo) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var groupInfoBucket = getGroupInfoBucket();
    var uid = exports.getUid();
    var accountGeneratorBucket = new db_1.Bucket('file', CONSTANT.ACCOUNT_GENERATOR_TABLE, dbMgr);
    if (uid !== undefined) {
        var gInfo = new group_s_1.GroupInfo();
        // 这是一个事务
        accountGeneratorBucket.readAndWrite(user_s_1.GENERATOR_TYPE.GROUP, function (items) {
            var accountGenerator = new user_s_1.AccountGenerator();
            accountGenerator.index = user_s_1.GENERATOR_TYPE.GROUP;
            accountGenerator.currentIndex = util_1.genNewIdFromOld(items[0].currentIndex);
            gInfo.gid = accountGenerator.currentIndex;
            return accountGenerator;
        });
        gInfo.name = groupInfo.name;
        gInfo.hid = util_1.genGroupHid(gInfo.gid);
        gInfo.note = groupInfo.note;
        gInfo.avatar = groupInfo.avatar;
        gInfo.need_agree = groupInfo.need_agree;
        gInfo.adminids = [uid];
        // genAnnounceIncId(gInfo.gid, START_INDEX)
        gInfo.annoceids = [];
        gInfo.create_time = Date.now();
        gInfo.dissolve_time = 0;
        gInfo.join_method = 0;
        gInfo.ownerid = uid;
        // TODO: add self to memberids
        gInfo.memberids = [uid]; // add self to member
        gInfo.state = 0;
        gInfo.applyUser = [];
        logger.debug('create group: ', gInfo);
        groupInfoBucket.put(gInfo.gid, gInfo);
        logger.debug('read group info: ', groupInfoBucket.get(gInfo.gid));
        // 修改创建群的人的联系人列表，把当前群组加进去
        var contactBucket = getContactBucket();
        var contact = contactBucket.get(uid)[0];
        contact.group.push(gInfo.gid);
        contactBucket.put(uid, contact);
        moveGroupCursor(gInfo.gid, uid);
        logger.debug('Add self: ', uid, 'to conatact group');
        // 发送一条当前群组创建成功的消息，其实不是必须的
        var groupTopic = "ims/group/msg/" + gInfo.gid;
        var mqttServer = rpc_server_1.getEnv().getNativeObject('mqttServer');
        js_net_1.setMqttTopic(mqttServer, groupTopic, true, true);
        logger.debug('Set mqtt topic for group: ', gInfo.gid, 'with topic name: ', groupTopic);
        // 把创建群的用户加入groupUserLink
        var groupUserLinkBucket = new db_1.Bucket('file', CONSTANT.GROUP_USER_LINK_TABLE, dbMgr);
        var currentUser = getCurrentUserInfo(uid);
        var gulink = new group_s_1.GroupUserLink();
        gulink.groupAlias = '';
        gulink.guid = util_1.genGuid(gInfo.gid, uid);
        gulink.hid = '';
        gulink.join_time = Date.now();
        gulink.userAlias = '';
        gulink.avatar = currentUser.avatar;
        groupUserLinkBucket.put(gulink.guid, gulink);
        var info = new message_s_2.GroupSend();
        info.msg = "\u4F60\u5DF2\u7ECF\u6210\u529F\u521B\u5EFA\u7FA4 \"" + gInfo.name + "\"";
        info.mtype = message_s_1.MSG_TYPE.CREATEGROUP;
        info.gid = gInfo.gid;
        info.time = Date.now();
        message_r_1.sendGroupMessage(info);
        return gInfo;
    }
};
/**
 * 解散群
 * @param guid group user id
 */
// #[rpc=rpcServer]
exports.dissolveGroup = function (gid) {
    var groupInfoBucket = getGroupInfoBucket();
    var uid = exports.getUid();
    var res = new basic_s_1.Result();
    var gInfo = groupInfoBucket.get(gid)[0];
    if (uid === gInfo.ownerid) {
        gInfo.state = group_s_1.GROUP_STATE.DISSOLVE;
        groupInfoBucket.put(gid, gInfo);
        logger.debug('After group dissovled: ', groupInfoBucket.get(gid)[0]);
        var contactBucket = getContactBucket();
        gInfo.memberids.forEach(function (uid) {
            var contact = contactBucket.get(uid)[0];
            var index = contact.group.indexOf(gid);
            if (index > -1) {
                contact.group.splice(index, 1);
            }
            contactBucket.put(uid, contact);
            logger.debug('dissolveGroup uid: ', uid, 'contact', contact);
        });
        // 删除群主题
        // const mqttServer = getEnv().getNativeObject<ServerNode>('mqttServer');
        // const groupTopic = `ims/group/msg/${gid}`;
        // console.log('删除群主题！！！！！！！！！！！！！！', groupTopic);
        // unsetMqttTopic(mqttServer, groupTopic);
        // console.log('删除群主题！！！！！！！！！！！！！！ok');
        res.r = 1;
        return res;
    }
    res.r = 0;
    return res;
};
/**
 * 修改群信息
 * @param gid group id
 * @param groupAlias group alias / new group name
 */
// #[rpc=rpcServer]
exports.updateGroupInfo = function (newGroup) {
    var groupInfoBucket = getGroupInfoBucket();
    var gid = newGroup.gid;
    var uid = exports.getUid();
    var res = new basic_s_1.Result();
    var gInfo = groupInfoBucket.get(gid)[0];
    logger.debug('updateGroupInfo group begin: ', gInfo);
    if (uid === gInfo.ownerid) {
        gInfo.name = newGroup.name;
        gInfo.avatar = newGroup.avatar;
        gInfo.note = newGroup.note;
        groupInfoBucket.put(gid, gInfo);
        logger.debug('updateGroupInfo group after: ', gInfo);
        res.r = 1;
        return res;
    }
};
exports.getUid = function () {
    // const dbMgr = getEnv().getDbMgr();
    // const session = getEnv().getSession();
    // let uid;
    // read(dbMgr, (tr: Tr) => {
    //     uid = session.get(tr, 'uid');
    // });
    var uid = session_r_1.getSession('uid');
    return parseInt(uid, 10);
};
// ============ helpers =================
var getGroupUserLinkBucket = function getGroupUserLinkBucket() {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    return new db_1.Bucket('file', CONSTANT.GROUP_USER_LINK_TABLE, dbMgr);
};
var getGroupInfoBucket = function getGroupInfoBucket() {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    return new db_1.Bucket('file', CONSTANT.GROUP_INFO_TABLE, dbMgr);
};
var getContactBucket = function getContactBucket() {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    return new db_1.Bucket('file', CONSTANT.CONTACT_TABLE, dbMgr);
};
var getCurrentUserInfo = function getCurrentUserInfo(uid) {
    var currentUid = uid || exports.getUid();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var userInfoBucket = new db_1.Bucket('file', CONSTANT.USER_INFO_TABLE, dbMgr);
    return userInfoBucket.get(currentUid)[0];
};
})