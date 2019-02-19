_$define("chat/server/data/constant", function (require, exports, module){
"use strict";
/**
 * 常量定义
 */

Object.defineProperty(exports, "__esModule", { value: true });
// 数据库名
exports.WARE_NAME = 'file';
exports.MEMORY_NAME = 'memory';
// 表名
// 群组
exports.GROUP_INFO_TABLE = 'chat/server/data/db/group.GroupInfo';
exports.GROUP_USER_LINK_TABLE = 'chat/server/data/db/group.GroupUserLink';
// 消息
exports.USER_HISTORY_TABLE = 'chat/server/data/db/message.UserHistory';
exports.GROUP_HISTORY_TABLE = 'chat/server/data/db/message.GroupHistory';
exports.ANNOUNCE_HISTORY_TABLE = 'chat/server/data/db/message.AnnounceHistory';
exports.MSG_LOCK_TABLE = 'chat/server/data/db/message.MsgLock';
exports.USER_HISTORY_CURSOR_TABLE = 'chat/server/data/db/message.UserHistoryCursor';
exports.GROUP_HISTORY_CURSOR_TABLE = 'chat/server/data/db/message.GroupHistoryCursor';
// 个人
exports.USER_INFO_TABLE = 'chat/server/data/db/user.UserInfo';
exports.USER_ACCOUNT_TABLE = 'chat/server/data/db/user.UserAccount';
exports.USER_CREDENTIAL_TABLE = 'chat/server/data/db/user.UserCredential';
exports.ACCOUNT_GENERATOR_TABLE = 'chat/server/data/db/user.AccountGenerator';
exports.FRIEND_LINK_TABLE = 'chat/server/data/db/user.FriendLink';
exports.CONTACT_TABLE = 'chat/server/data/db/user.Contact';
exports.LAST_READ_MESSAGE_ID_TABLE = 'chat/server/data/db/user.LastReadMessageId';
exports.ONLINE_USERS_TABLE = 'chat/server/data/db/user.OnlineUsers';
exports.ONLINE_USERS_REVERSE_INDEX_TABLE = 'chat/server/data/db/user.OnlineUsersReverseIndex';
exports.FRONT_STORE_DATA = 'chat/server/data/db/user.FrontStoreData';
// 其他
exports.ADDRESS_INFO_TABLE = 'chat/server/data/db/extra.AddressInfo';
exports.DEFAULT_ERROR_STR = '-1';
exports.DEFAULT_ERROR_NUMBER = -1;
exports.CUSTOMER_SERVICE = 10001; // 客服账号
// 推送cmd
exports.SEND_REFUSED = 'refused_add'; // 拒绝好友
})