_$define("earn/server/data/util", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 只有后端可以用的util
 */
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var db_1 = require("../../utils/db");
var user_s_1 = require("./db/user.s");
// 获取唯一ID
exports.get_index_id = function (index) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var IndexIDBucket = new db_1.Bucket('file', user_s_1.IDIndex._$info.name, dbMgr);
    var r = new user_s_1.IDIndex();
    IndexIDBucket.readAndWrite(index, function (v) {
        r.index = index;
        if (!v[0]) {
            r.id = 1;
        } else {
            r.id = v[0].id + 1;
        }
        return r;
    });
    return r.id;
};
exports.getcdkey = function (uid, code) {
    return uid + ":" + code;
};
})