_$define("earn/server/util/item_util.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var item_s_1 = require("../data/db/item.s");
var db_1 = require("../../utils/db");
var math_1 = require("../../../pi/util/math");
var db_2 = require("../../../pi_pt/db");
var rpc_server_1 = require("../../../pi_pt/net/rpc_server");
var item_s_2 = require("../../xlsx/item.s");
var constant_1 = require("../data/constant");
var medal_s_1 = require("../data/db/medal.s");
var util_1 = require("../data/util");
var mining_r_1 = require("../rpc/mining.r");
var user_r_1 = require("../rpc/user.r");
var user_item_r_1 = require("../rpc/user_item.r");
var award_t_1 = require("./award.t");
var mining_util_1 = require("./mining_util");
var oauth_lib_1 = require("./oauth_lib");
var randomSeedMgr_1 = require("./randomSeedMgr");
var sendMessage_1 = require("./sendMessage");
// 添加奖品
exports.add_award = function (uid, itemType, count, src, convert, desc, deadTime) {
    var time = new Date().valueOf();
    console.log('time!!!!!!!!!!!!!!!!!:', time);
    var awardid = "" + time + uid + math_1.randomInt(10000, 99999);
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var award = new item_s_1.Award();
    award.id = awardid;
    award.awardType = itemType;
    award.count = count;
    award.src = src;
    award.uid = uid;
    award.time = time.toString();
    if (convert) award.convert = convert;
    if (desc) award.desc = desc;
    if (deadTime) award.deadTime = deadTime;
    console.log('award!!!!!!!!!!!!!!!!!:', award);
    // 写入奖励表
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.Award._$info.name, dbMgr);
    bucket.put(awardid, award);
    // 写入奖励MAP表
    var awardMap = exports.get_award_ids(uid);
    console.log('awardMap!!!!!!!!!!!!!!!!!:', awardMap);
    var awardList = [];
    awardList = awardMap.awards;
    awardList.push(awardid);
    console.log('awardList!!!!!!!!!!!!!!!!!:', awardList);
    var mapBucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.AwardMap._$info.name, dbMgr);
    awardMap.awards = awardList;
    mapBucket.put(uid, awardMap);
    // 向钱包添加奖励相应的货币
    if (itemType === constant_1.BTC_TYPE || itemType === constant_1.ETH_TYPE || itemType === constant_1.ST_TYPE || itemType === constant_1.KT_TYPE) {
        var num = oauth_lib_1.oauth_alter_balance(itemType, awardid, count);
        // 写入特别奖励表
        console.log('add_special before!!!!!!!!!!!!!!!!!:', itemType, src);
        if ((itemType === constant_1.BTC_TYPE || itemType === constant_1.ETH_TYPE || itemType === constant_1.ST_TYPE) && src === constant_1.AWARD_SRC_MINE) {
            console.log('add_special in!!!!!!!!!!!!!!!!!:');
            var specialAward = new item_s_1.SpecialAward();
            specialAward.id = constant_1.THE_ELDER_SCROLLS;
            specialAward.awardType = itemType;
            specialAward.count = count;
            specialAward.src = src;
            specialAward.uid = uid;
            specialAward.openid = user_r_1.getOpenid();
            specialAward.time = time.toString();
            var specialAwardbucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.SpecialAward._$info.name, dbMgr);
            specialAwardbucket.put(constant_1.THE_ELDER_SCROLLS, specialAward);
        }
    }
    return award;
};
// 添加指定数量物品(包含Mine类)
exports.add_itemCount = function (uid, itemType, count) {
    console.log('add_itemCount in!!!!!!!!!!!!!!', itemType);
    if (count < 0) return;
    var enumNum = mining_util_1.get_enumType(itemType);
    var typeNum = itemType;
    var itemInfo = user_item_r_1.item_query();
    var item = user_item_r_1.get_item(itemType);
    var beforeCount = item.value.count;
    console.log('beforeCount:!!!!!!!!!!!!!!', beforeCount);
    var afterCount = beforeCount + count;
    console.log('afterCount:!!!!!!!!!!!!!!', afterCount);
    var items = itemInfo.item;
    var itemIndex = void 0;
    for (var _iterator = items, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var item1 = _ref;

        if (item1.value.num === typeNum) {
            itemIndex = items.indexOf(item1);
            console.log('itemIndex:!!!!!!!!!!!!!!', itemIndex);
            break;
        }
    }
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var itemBucket = new db_1.Bucket('file', item_s_1.Items._$info.name, dbMgr);
    if (enumNum === 1) {
        if (count > 1) return;
        var mineHp = new item_s_1.MineHp();
        mineHp.hp = exports.get_mine_hp(typeNum);
        var index = uid + ":" + mineHp.hp;
        mineHp.num = util_1.get_index_id(index);
        console.log('hp:!!!!!!!!!!!!!!', mineHp);
        var hpList = [];
        var mine = item.value;
        hpList = mine.hps;
        hpList.push(mineHp);
        mine.count = afterCount;
        mine.hps = hpList;
    } else {
        item.value.count = afterCount;
    }
    items[itemIndex] = item;
    itemInfo.item = items;
    itemBucket.put(uid, itemInfo);
    item.value.count = count;
    return item;
};
// 扣除物品(不包含Mine类)
exports.reduce_itemCount = function (itemType, count) {
    console.log('reduce_item in!!!!!!!!!!!!!!');
    var uid = user_r_1.getUid();
    var enumNum = mining_util_1.get_enumType(itemType);
    var itemInfo = user_item_r_1.item_query();
    var item = user_item_r_1.get_item(itemType);
    // 向钱包扣除相应的货币
    if (itemType === constant_1.BTC_TYPE || itemType === constant_1.ETH_TYPE || itemType === constant_1.ST_TYPE || itemType === constant_1.KT_TYPE) {
        var time = new Date().valueOf();
        var oid = "" + time + uid + math_1.randomInt(10000, 99999);
        if (!oauth_lib_1.oauth_alter_balance(itemType, oid, -count)) {
            return;
        }
        return item;
    }
    var beforeCount = item.value.count;
    var afterCount = beforeCount - count;
    console.log('afterCount !!!!!!!!!!!!!!', afterCount);
    if (afterCount < 0) return;
    var items = itemInfo.item;
    var itemIndex = void 0;
    for (var _iterator2 = items, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
        }

        var item1 = _ref2;

        if (item1.value.num === itemType) {
            itemIndex = items.indexOf(item1);
            break;
        }
    }
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var itemBucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.Items._$info.name, dbMgr);
    if (enumNum === 1) {
        return;
    } else {
        item.value.count = afterCount;
    }
    items[itemIndex] = item;
    itemInfo.item = items;
    itemBucket.put(uid, itemInfo);
    return item;
};
// 矿山扣血
exports.reduce_mine = function (itemType, mineNum, hits) {
    console.log('reduce_mine in!!!!!!!!!!!!!!', mineNum);
    var uid = user_r_1.getUid();
    var typeNum = itemType;
    var itemInfo = user_item_r_1.item_query();
    var item = user_item_r_1.get_item(itemType);
    var mine = item.value;
    var hps = mine.hps;
    var leftHp = void 0;
    console.log('mine.hps.length!!!!!!!!!!!!!!', mine.hps.length);
    for (var i = 0; i < hps.length; i++) {
        console.log('mine index!!!!!!!!!!!!!!', i);
        if (hps[i].num === mineNum) {
            console.log('mine HP!!!!!!!!!!!!!!', hps[i]);
            leftHp = mine.hps[i].hp;
            leftHp -= hits;
            hps[i].hp = leftHp;
            console.log('mineHp!!!!!!!!!!!!!!', hps[i]);
            // 获取Item对象在数组中的下标
            var items = itemInfo.item;
            var dbMgr = rpc_server_1.getEnv().getDbMgr();
            var itemBucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.Items._$info.name, dbMgr);
            var itemIndex = void 0;
            for (var _iterator3 = items, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                var _ref3;

                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    _ref3 = _i3.value;
                }

                var item1 = _ref3;

                if (item1.value.num === typeNum) {
                    itemIndex = items.indexOf(item1);
                    break;
                }
            }
            if (leftHp > 0) {
                item.value = mine;
                items[itemIndex] = item;
                itemInfo.item = items;
                itemBucket.update(uid, itemInfo);
                return leftHp;
            } else {
                console.log('mine HP zero!!!!!!!!!!!!!!');
                mine.count = mine.count - 1;
                mine.hps.splice(i, 1);
                item.value = mine;
                items[itemIndex] = item;
                itemInfo.item = items;
                itemBucket.update(uid, itemInfo);
                return 0;
            }
        }
    }
    return;
};
// 挖矿添加奖章
exports.mining_add_medal = function (uid, itemType) {
    console.log('mining_add_medal!!!!!!!!!!!!!!!!', itemType);
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.MEMORY_NAME, item_s_2.MedalCfg._$info.name, dbMgr);
    if (itemType === constant_1.KT_TYPE) {
        var ktNum = mining_r_1.get_miningKTNum(uid).total;
        var iter = bucket.iter(null, true);
        var pushMsg = true;
        do {
            var iterCfg = iter.nextElem();
            console.log('elCfg----------------read---------------', iterCfg);
            if (!iterCfg) {
                break;
            }
            var medalCfg = iterCfg[1];
            if (medalCfg.coinType !== itemType) {
                break;
            }
            if (ktNum >= medalCfg.coinNum) {
                exports.add_medal(uid, medalCfg.id, pushMsg);
                pushMsg = false;
            }
        } while (iter);
    }
    if (itemType === constant_1.ST_TYPE) {
        exports.add_achievement(uid, constant_1.MEDAL_ST);
    }
    if (itemType === constant_1.ETH_TYPE) {
        exports.add_achievement(uid, constant_1.MEDAL_ETH);
    }
    if (itemType === constant_1.BTC_TYPE) {
        exports.add_achievement(uid, constant_1.MEDAL_BTC);
    }
};
// 添加奖章
exports.add_medal = function (uid, medalType) {
    var pushMsg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    console.log('add_medal in!!!!!!!!!!!!!');
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, medal_s_1.Medals._$info.name, dbMgr);
    var medals = bucket.get(uid)[0];
    if (!medals) {
        medals = new medal_s_1.Medals();
        medals.uid = uid;
        medals.medals = [];
    } else {
        for (var _iterator4 = medals.medals, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref4 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref4 = _i4.value;
            }

            var medal = _ref4;

            if (medal === medalType) {
                return false;
            }
        }
    }
    medals.medals.push(medalType);
    bucket.put(uid, medals);
    // 推送获得奖章的信息
    if (pushMsg) sendMessage_1.send(uid, constant_1.MESSAGE_TYPE_ADDMEDAL, medalType.toString());
};
// 添加成就
exports.add_achievement = function (uid, achievementType) {
    exports.add_medal(uid, achievementType, true);
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, medal_s_1.Achievements._$info.name, dbMgr);
    var achievements = bucket.get(uid)[0];
    if (!achievements) {
        achievements = new medal_s_1.Achievements();
        achievements.uid = uid;
        achievements.achievements = [];
    } else {
        for (var _iterator5 = achievements.achievements, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
            var _ref5;

            if (_isArray5) {
                if (_i5 >= _iterator5.length) break;
                _ref5 = _iterator5[_i5++];
            } else {
                _i5 = _iterator5.next();
                if (_i5.done) break;
                _ref5 = _i5.value;
            }

            var achievement = _ref5;

            if (achievement === achievementType) {
                return false;
            }
        }
    }
    achievements.achievements.push(achievementType);
    bucket.put(uid, achievements);
};
// 用户物品数据库根据配置初始化
exports.items_init = function (uid) {
    console.log('item init in!!!!!!!!!!!!!');
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var itemInfo = new item_s_1.Items();
    var items = [];
    db_2.read(dbMgr, function (tr) {
        var iterCfg = db_2.iterDb(tr, constant_1.MEMORY_NAME, item_s_2.ItemInitCfg._$info.name, 0, false, null); // 取from表的迭代器
        console.log('!!!!!!!!!!!!!!iterCfg:', iterCfg);
        var maxid = constant_1.MAX_TYPE_NUM;
        do {
            var elCfg = iterCfg.nextElem();
            if (!elCfg) return;
            console.log('elCfg----------------read---------------', elCfg);
            var cfg = elCfg[1];
            var enumNum = cfg.enumNum;
            var typeNum = cfg.typeNum;
            var count = cfg.count;
            switch (enumNum) {
                case constant_1.MINE_ENUM_NUM:
                    var mine = new item_s_1.Mine();
                    mine.num = typeNum;
                    mine.count = count;
                    mine.hps = [];
                    var itemMine = new item_s_1.Item(enumNum, mine);
                    items.push(itemMine);
                    break;
                case constant_1.HOE_ENUM_NUM:
                    var hoe = new item_s_1.Hoe();
                    hoe.num = typeNum;
                    hoe.count = count;
                    var itemHoe = new item_s_1.Item(enumNum, hoe);
                    items.push(itemHoe);
                    break;
                case constant_1.BTC_ENUM_NUM:
                    var btc = new item_s_1.BTC();
                    btc.num = typeNum;
                    btc.count = count;
                    var itemBtc = new item_s_1.Item(enumNum, btc);
                    items.push(itemBtc);
                    break;
                case constant_1.ETH_ENUM_NUM:
                    var eth = new item_s_1.ETH();
                    eth.num = typeNum;
                    eth.count = count;
                    var itemEth = new item_s_1.Item(enumNum, eth);
                    items.push(itemEth);
                    break;
                case constant_1.ST_ENUM_NUM:
                    var st = new item_s_1.ST();
                    st.num = typeNum;
                    st.count = count;
                    var itemSt = new item_s_1.Item(enumNum, st);
                    items.push(itemSt);
                    break;
                case constant_1.KT_ENUM_NUM:
                    var kt = new item_s_1.KT();
                    kt.num = typeNum;
                    kt.count = count;
                    var itemKt = new item_s_1.Item(enumNum, kt);
                    items.push(itemKt);
                    break;
                case constant_1.TICKET_ENUM_NUM:
                    var ticket = new item_s_1.Ticket();
                    ticket.num = typeNum;
                    ticket.count = count;
                    var itemTicket = new item_s_1.Item(enumNum, ticket);
                    items.push(itemTicket);
                    break;
                default:
            }
            console.log('!!!!!!!!!!!!!!ITEMS:', items);
            maxid--;
        } while (maxid > 0);
    });
    itemInfo.uid = uid;
    itemInfo.item = items;
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.Items._$info.name, dbMgr);
    bucket.put(uid, itemInfo);
    // 添加初始奖章
    // add_medal(uid, MEDAL_KT0);
};
// 获取矿山总数
exports.get_mine_total = function () {
    console.log('!!!!!!!!!!!!!!get_mine_total:');
    var items = user_item_r_1.item_query().item;
    var mineTotal = 0;
    for (var i = 0; i < items.length; i++) {
        if (items[i].enum_type === 1) {
            mineTotal = mineTotal + items[i].value.count;
            continue;
        }
    }
    console.log('!!!!!!!!!!!!!!mineTotal:', mineTotal);
    return mineTotal;
};
// 随机(根据配置)获取矿山类型
exports.get_mine_type = function () {
    var randomMgr = new randomSeedMgr_1.RandomSeedMgr(math_1.randomInt(1, 10000));
    var pid = constant_1.GET_RANDOM_MINE; // 配置中按权重获取矿山类型的主键
    var v = [];
    award_t_1.doAward(pid, randomMgr, v);
    // console.log('doAward v:!!!!!!!!!!!!!', v);
    return v[0][0];
};
// 根据配置返回指定类型矿山的血量
exports.get_mine_hp = function (mineType) {
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.MEMORY_NAME, item_s_2.MineHpCfg._$info.name, dbMgr);
    console.log('doAward v:!!!!!!!!!!!!!', bucket.get(mineType)[0]);
    return bucket.get(mineType)[0].hp;
};
// 获取用户获奖id列表
exports.get_award_ids = function (uid) {
    console.log('get_award_ids in !!!!!!!!!!!!!!!', uid);
    var dbMgr = rpc_server_1.getEnv().getDbMgr();
    var bucket = new db_1.Bucket(constant_1.WARE_NAME, item_s_1.AwardMap._$info.name, dbMgr);
    var awardMap = bucket.get(uid)[0];
    if (!awardMap) {
        var blankAwardMap = new item_s_1.AwardMap();
        blankAwardMap.uid = uid;
        blankAwardMap.awards = [];
        console.log('null awardMap in !!!!!!!!!!!!!!!', blankAwardMap);
        return blankAwardMap;
    } else {
        return awardMap;
    }
};
// 获取1970年1月1日距今的时间(单位：天)
exports.get_today = function () {
    var timestamps = new Date().getTime();
    var time = timestamps + 28800000;
    console.log('timestamps !!!!!!!!!!!!!!!', time);
    return Math.floor(time / (1000 * 60 * 60 * 24));
};
})