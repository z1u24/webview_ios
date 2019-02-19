_$define("earn/server/rpc/test.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../../../pi/util/math");
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var db_1 = require("../../utils/db");
var constant_1 = require("../data/constant");
var guessing_s_1 = require("../data/db/guessing.s");
var item_s_1 = require("../data/db/item.s");
var award_t_1 = require("../util/award.t");
var item_util_r_1 = require("../util/item_util.r");
var mining_util_1 = require("../util/mining_util");
var randomSeedMgr_1 = require("../util/randomSeedMgr");
var test_s_1 = require("./test.s");
var user_r_1 = require("./user.r");
var user_item_r_1 = require("./user_item.r");
// #[rpc=rpcServer]
exports.award = function (award) {
    var seedMgr = new randomSeedMgr_1.RandomSeedMgr(math_1.randomInt(1, 100));
    var v = [];
    award_t_1.doAward(award, seedMgr, v);
    var t = new test_s_1.Test();
    t.r = v.join();
    return t;
};
// #[rpc=rpcServer]
exports.db_test = function (pid) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.Award._$info.name, dbMgr);
    return bucket.get(pid)[0];
};
// #[rpc=rpcServer]
exports.item_add = function (count) {
    console.log('add test in!!!!!!!!!!');
    var uid = user_r_1.getUid();
    var itemType = 2003;
    return item_util_r_1.add_itemCount(uid, itemType, count);
};
// #[rpc=rpcServer]
exports.item_addticket = function (ticketType) {
    console.log('add test in!!!!!!!!!!');
    var uid = user_r_1.getUid();
    var itemType = ticketType;
    return item_util_r_1.add_itemCount(uid, itemType, 10);
};
// #[rpc=rpcServer]
exports.hit_test = function (hoeType) {
    console.log('hit test in !!!!!!!!!!!!!');
    var hits = [];
    var seeds = [];
    var random = new randomSeedMgr_1.RandomSeedMgr(200);
    var seed = random.seed;
    for (var i = 0; i < 200; i++) {
        seeds.push[seed];
        console.log('seed:!!!!!!!!!!!!!!!!!!', seed);
        var randomSeedMgr = new randomSeedMgr_1.RandomSeedMgr(seed);
        var hit = mining_util_1.doMining(hoeType, randomSeedMgr);
        hits.push(hit);
        seed = randomSeedMgr_1.RandomSeedMgr.randNumber(seed);
    }
    var total = new test_s_1.Hits();
    total.r = hits;
    total.seed = seeds;
    return total;
};
// #[rpc=rpcServer]
exports.bigint_test = function () {
    item_util_r_1.add_award(2, 5001, 20000, 'test');
    var test = new test_s_1.Test();
    test.r = 'test';
    return test;
};
// #[rpc=rpcServer]
exports.get_objStr = function () {
    var result = new guessing_s_1.Result();
    var items = user_item_r_1.item_query();
    result.reslutCode = constant_1.RESULT_SUCCESS;
    result.msg = JSON.stringify(items);
    return result;
};
})