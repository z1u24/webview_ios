_$define("chat/server/rpc/session.r", function (require, exports, module){
"use strict";
/**
 * 会话管理
 */

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================================= 导入
var math_1 = require("../../../pi/util/math");
var db_1 = require("../../../pi_pt/db");
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var db_2 = require("../../utils/db");
var logger_1 = require("../../utils/logger");
var session_s_1 = require("../data/db/session.s");
var session_s_2 = require("./session.s");
var logger = new logger_1.Logger('session');
// 自动登录
// #[rpc=rpcServer]
exports.auto_login = function (login) {
    var session = exports.get_cache_session(login.uid, 'token')[0];
    var token = session ? session.value : undefined;
    var result = new session_s_2.AutoLoginResult();
    // tslint:disable-next-line:possible-timing-attack
    if (login.token !== token) {
        result.code = -1;
        return result;
    }
    // 更新会话状态
    exports.replaceSession(login.uid);
    result.code = 1;
    return result;
};
// 获取token
// #[rpc=rpcServer]
exports.getToken = function (getToken) {
    var token2 = new session_s_2.Token();
    var uid = getToken.uid;
    if (!uid) {
        token2.code = -1;
        token2.token = '';
        return token2;
    }
    var token = math_1.randomInt(100000, 999999).toString();
    exports.setSession('token', token, uid);
    token2.code = 1;
    token2.token = token;
    return token2;
};
// 设置会话属性
exports.setSession = function (key, value, uid) {
    var session = rpc_server_1.getEnv().getSession();
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    db_1.write(dbMgr, function (tr) {
        session.set(tr, key, value);
        logger.info('set session key:', key, 'value:', value);
    });
    if (!uid) {
        return;
    }
    // 写入会话缓存
    var session2 = new session_s_1.Session();
    session2.key = key;
    session2.value = value;
    var sessionTab = new db_2.Bucket('memory', session_s_1.SessionTab._$info.name, dbMgr);
    var sessions = sessionTab.get(uid)[0];
    if (sessions) {
        for (var i = 0; i < sessions.sessions.length; i++) {
            if (sessions.sessions[i].key === key) {
                sessions.sessions[i] = session2;
                break;
            } else if (i === sessions.sessions.length - 1) {
                sessions.sessions.push(session2);
                break;
            }
        }
    } else {
        var sessions2 = new session_s_1.SessionTab();
        sessions2.id = uid;
        sessions2.sessions = [session2];
        sessions = sessions2;
    }
    sessionTab.put(uid, sessions);
};
// 获取会话属性
exports.getSession = function (key) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var session = rpc_server_1.getEnv().getSession();
    var value = void 0;
    db_1.read(dbMgr, function (tr) {
        value = session.get(tr, key);
    });
    return value;
};
// 替换会话
exports.replaceSession = function (uid) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var session = rpc_server_1.getEnv().getSession();
    var suid = exports.get_cache_session(uid, 'uid')[0].value;
    // 验证uid
    if (uid !== suid) {
        throw new Error("uid error uid:" + uid + ", suid:" + suid);
    }
    var sessionTab = new db_2.Bucket('memory', session_s_1.SessionTab._$info.name, dbMgr);
    var oldSessions = sessionTab.get(uid)[0];
    if (oldSessions) {
        var _loop = function _loop() {
            if (_isArray) {
                if (_i >= _iterator.length) return "break";
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) return "break";
                _ref = _i.value;
            }

            var session2 = _ref;

            db_1.write(dbMgr, function (tr) {
                session.set(tr, session2.key, session2.value);
            });
        };

        for (var _iterator = oldSessions.sessions, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            var _ret = _loop();

            if (_ret === "break") break;
        }
    }
    logger.info('replace_session set session:', oldSessions);
};
// 获取缓存中的会话
exports.get_cache_session = function (uid, key) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var sessionTab = new db_2.Bucket('memory', session_s_1.SessionTab._$info.name, dbMgr);
    var sessions = sessionTab.get(uid)[0];
    if (!sessions) {
        return [];
    }
    if (!key) {
        return sessions.sessions;
    }
    for (var _iterator2 = sessions.sessions, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
        }

        var s = _ref2;

        if (s.key === key) {
            return [s];
        }
    }
    return [];
};
})