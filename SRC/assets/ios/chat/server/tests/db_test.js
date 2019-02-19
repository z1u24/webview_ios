_$define("chat/server/tests/db_test", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sinfo_1 = require("../../../pi/struct/sinfo");
var init_1 = require("../../../pi_pt/init/init");
var db_1 = require("../../utils/db");
var foo_s_1 = require("./foo.s");
var dbMgr = init_1.getEnv().getDbMgr();
var test_basic_db_operation = function test_basic_db_operation() {
    var m = new sinfo_1.TabMeta(new sinfo_1.EnumType(sinfo_1.Type.Str), new sinfo_1.EnumType(sinfo_1.Type.Str));
    // memory db
    var memBucket = db_1.createPersistBucket('hello', m, dbMgr);
    memBucket.put('hi', 'Hello');
    // write different key type and value type
    memBucket.put(1, 100);
    // memBucket.get(1);   // should panic
    console.log(memBucket.get('hi'));
    if (memBucket.delete('hi')) {
        console.log('delete exist key success');
    } else {
        console.log('delete exist key failed');
    }
    // delete not exist key
    if (memBucket.delete('wtf')) {
        console.log('delete non-exist key success');
    } else {
        console.log('delete non-exist key failed');
    }
    // file db
    var persistBucket = db_1.createMemoryBucket('hello', m, dbMgr);
    persistBucket.put('11', '22');
    console.log(persistBucket.get('11'));
};
var test_write_structInfo = function test_write_structInfo() {
    var meta = new sinfo_1.TabMeta(new sinfo_1.EnumType(sinfo_1.Type.U32), new sinfo_1.EnumType(sinfo_1.Type.Struct, foo_s_1.UserInfo._$info));
    var m = db_1.createMemoryBucket('TEST', meta, dbMgr);
    var v = new foo_s_1.UserInfo();
    v.uid = 99202;
    v.phone = '你是谁';
    m.put(123, v);
    console.log(m.get(123));
};
var test_iterdb = function test_iterdb() {
    var m = new sinfo_1.TabMeta(new sinfo_1.EnumType(sinfo_1.Type.Str), new sinfo_1.EnumType(sinfo_1.Type.Str));
    // memory db
    var memBucket = db_1.createPersistBucket('foo', m, dbMgr);
    memBucket.put('hi1', 'world1');
    memBucket.put('hi2', 'world2');
    memBucket.put('hi3', 'world3');
    var it = memBucket.iter('hi');
    var item1 = it.nextElem();
    var item2 = it.nextElem();
    var item3 = it.nextElem();
    if (item1[1] !== 'world1' && item2[1] !== 'world2' && item3[1] !== 'world3') {
        throw new Error('Test iterdb failed');
    } else {
        console.log('Test iterDb successed');
    }
};
var test_read_from_exist_bucket = function test_read_from_exist_bucket() {
    var bkt = new db_1.Bucket('file', 'foo', dbMgr);
    console.log('read_from_exist_bucket', bkt.get('hi1'));
};
var test_batch_read = function test_batch_read() {
    var bkt = new db_1.Bucket('file', 'foo', dbMgr);
    var v = bkt.get(['hi1', 'hi2', 'hi3']);
    console.log('test_batch_read', v);
};
var test_batch_write_then_read = function test_batch_write_then_read() {
    var bkt = new db_1.Bucket('file', 'foo', dbMgr);
    var keys = ['batch1', 'batch2', 'batch3'];
    var vals = ['batch_value1', 'batch_value2', 'batch_value3'];
    bkt.put(keys, vals);
    var v = bkt.get(keys);
    console.log('batch_write_then_read:', v);
    if (v[0] === vals[0] && v[1] === vals[1] && v[2] === vals[2]) {
        console.log('test batch write then read success');
    } else {
        console.log('test batch write then read failed');
    }
};
exports.test_db = function () {
    test_basic_db_operation();
    test_write_structInfo();
    test_iterdb();
    test_read_from_exist_bucket();
    test_batch_read();
    test_batch_write_then_read();
};
})