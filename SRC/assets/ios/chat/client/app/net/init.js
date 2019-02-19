_$define("chat/client/app/net/init", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../../pi/struct/struct_mgr");
var bon_1 = require("../../../../pi/util/bon");
var basic_p_1 = require("../../../server/data/rpc/basic.p");
var basic_s_1 = require("../../../server/data/rpc/basic.s");
var group_p_1 = require("../../../server/data/rpc/group.p");
var message_s_1 = require("../../../server/data/rpc/message.s");
var util_1 = require("../../../utils/util");
var initStore_1 = require("../data/initStore");
var store = require("../data/store");
var autologin_1 = require("../logic/autologin");
var logic_1 = require("../logic/logic");
var subscribedb = require("../net/subscribedb");
var receive_1 = require("./receive");
// ================================================ 导出
/**
 * 客户端初始化
 */
exports.initClient = function (server, port) {
    if (!rootClient) {
        mqtt = new autologin_1.AutoLoginMgr(server, port);
        // mqtt = new AutoLoginMgr('192.168.9.29', port);
        rootClient = mqtt.connection();
    }
    receive_1.initPush();
};
// 登录
exports.login = function (userType, user, pwd, cb) {
    mqtt.login(userType, user, pwd, cb);
};
/**
 * rpc 调用
 * @param name  method name
 * @param req request
 * @param callback  callback
 * @param timeout  timeout
 */
exports.clientRpcFunc = function (name, req, callback) {
    var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2000;

    if (!clientRpc) {
        if (mqtt.getState()) {
            clientRpc = mqtt.getRpc();
        } else {
            return;
        }
    }
    if (!mqtt.getState()) {
        logic_1.bottomNotice("\u7F51\u7EDC\u8FDE\u63A5\u4E2D\uFF01\uFF01\uFF01\uFF01");
        return;
    }
    clientRpc(name, req, function (r) {
        if (!r) {
            logic_1.bottomNotice(name + " \u5931\u8D25\u4E86\uFF0C\u8FD4\u56DE\u7ED3\u679C " + r);
        } else {
            return callback(r);
        }
    }, timeout);
};
/**
 * 注册了所有可以rpc调用的结构体
 * @param fileMap file map
 */
exports.registerRpcStruct = function (fileMap) {
    if (!self.__mgr) {
        self.__mgr = new struct_mgr_1.StructMgr();
    }
    for (var k in fileMap) {
        if (!k.endsWith('.s.js')) {
            continue;
        }
        var filePath = k.slice(0, k.length - pi_modules.butil.exports.fileSuffix(k).length - 1);
        var exp = pi_modules[filePath] && pi_modules[filePath].exports;
        for (var kk in exp) {
            if (struct_mgr_1.Struct.isPrototypeOf(exp[kk]) && exp[kk]._$info && exp[kk]._$info.name) {
                if (!self.__mgr.lookup(exp[kk]._$info.name_hash)) {
                    self.__mgr.register(exp[kk]._$info.name_hash, exp[kk], exp[kk]._$info.name);
                }
            }
        }
    }
};
/**
 * 订阅主题
 * @param platerTopic topic
 * @param cb callback
 */
exports.subscribe = function (platerTopic, returnStruct, cb) {
    var subMgr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    if (!rootClient) return;
    var option = {
        qos: 0,
        onSuccess: function onSuccess() {
            console.log('subsuccess!===============================', platerTopic);
        },
        onFailure: function onFailure(e) {
            console.log('subfail!=============================== ', e);
        }
    };
    rootClient.onMessage(function (topic, payload) {
        if (topic === platerTopic) {
            var o = new bon_1.BonBuffer(payload).readBonCode(returnStruct);
            cb(o);
            console.log('listen db success!', o);
        }
    });
    rootClient.subscribe(platerTopic, option); // 订阅主题
    subMgr && mqtt.subMgr.update(platerTopic, returnStruct, cb);
};
/**
 * 取消订阅主题
 * @param platerTopic topic
 * @param cb callback
 */
exports.unSubscribe = function (platerTopic) {
    if (!rootClient) return;
    rootClient.unsubscribe(platerTopic); // 订阅主题
    mqtt.subMgr.del(platerTopic);
};
// ===================================登陆相关
/**
 * 登录成功获取各种数据表的变化
 * @param uid user id
 */
exports.init = function (uid) {
    subscribedb.subscribeContact(uid, function (r) {
        if (r && r.uid === uid) {
            updateUsers(r, uid);
        }
    }, function (r) {
        if (r && r.uid === uid) {
            updateGroup(r, uid);
        }
    });
    // TODO:
};
/**
 * 更新群组相关信息
 * @param r 联系人列表
 * @param uid 当前用户id
 */
var updateGroup = function updateGroup(r, uid) {
    // 判断群组是否发生了变化,需要重新订阅群组消息
    var oldGroup = (store.getStore("contactMap/" + uid) || { group: [] }).group;
    var addGroup = r.group.filter(function (gid) {
        return oldGroup.findIndex(function (item) {
            return item === gid;
        }) === -1;
    });
    var delGroup = oldGroup.filter(function (gid) {
        return r.group.findIndex(function (item) {
            return item === gid;
        }) === -1;
    });
    // 主动或被动退出的群组
    delGroup.forEach(function (gid) {
        logic_1.exitGroup(gid);
    });
    // 订阅我已经加入的群组基础信息
    addGroup.forEach(function (gid) {
        initStore_1.getMyGroupHistory(gid); // 获取群组离线消息
        exports.subscribe("ims/group/msg/" + gid, message_s_1.SendMsg, function (r) {
            if (r.code === 1) {
                initStore_1.getMyGroupHistory(gid);
            }
        });
        subscribedb.subscribeGroupInfo(gid, function () {
            exports.clientRpcFunc(group_p_1.getGroupUserLink, gid, function (r) {
                // 判断是否返回成功
                if (r && r.arr.length > 0) {
                    r.arr.forEach(function (item) {
                        store.setStore("groupUserLinkMap/" + item.guid, item);
                    });
                }
            });
        });
    });
    // 获取邀请我进群的群组信息
    var groups = new basic_s_1.GetGroupInfoReq();
    groups.gids = [];
    r.applyGroup.forEach(function (guid) {
        var gid = util_1.getGidFromGuid(guid);
        groups.gids.push(gid);
    });
    if (groups.gids.length > 0) {
        exports.clientRpcFunc(basic_p_1.getGroupsInfo, groups, function (r) {
            console.log(r);
            if (r && r.arr.length > 0) {
                r.arr.forEach(function (item) {
                    store.setStore("groupInfoMap/" + item.gid, item);
                });
            }
        });
    }
};
/**
 * 更新好友信息
 * @param r 联系人列表
 * @param uid 当前用户id
 */
var updateUsers = function updateUsers(r, uid) {
    var info = new basic_s_1.GetFriendLinksReq();
    info.uuid = [];
    r.friends.forEach(function (rid) {
        info.uuid.push(util_1.genUuid(uid, rid));
        initStore_1.getFriendHistory(rid); // 获取好友发送的离线消息
    });
    if (info.uuid.length > 0) {
        console.log(info.uuid);
        // 获取friendlink
        exports.clientRpcFunc(basic_p_1.getFriendLinks, info, function (r) {
            if (r && r.arr && r.arr.length > 0) {
                r.arr.forEach(function (e) {
                    store.setStore("friendLinkMap/" + e.uuid, e);
                });
            }
        });
    }
    var uids = r.friends.concat(r.temp_chat, r.blackList, r.applyUser);
    if (uids.length > 0) {
        uids.forEach(function (elem) {
            subscribedb.subscribeUserInfo(elem, function (r) {
                // TODO
            });
        });
    }
};
exports.closeConnection = function () {
    rootClient = null;
};
// ================================================ 本地
// MQTT管理
var mqtt = void 0;
// 客户端
var rootClient = void 0;
// root RPC
var clientRpc = void 0;
})