_$define("earn/client/app/test/test", function (require, exports, module){
"use strict";
/**
 * 登录
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var guessing_s_1 = require("../../../server/data/db/guessing.s");
var item_s_1 = require("../../../server/data/db/item.s");
var guessingCompetition_p_1 = require("../../../server/rpc/guessingCompetition.p");
var invite_p_1 = require("../../../server/rpc/invite.p");
var itemQuery_s_1 = require("../../../server/rpc/itemQuery.s");
var mining_p_1 = require("../../../server/rpc/mining.p");
var send_message_s_1 = require("../../../server/rpc/send_message.s");
var stParties_p_1 = require("../../../server/rpc/stParties.p");
var test_p_1 = require("../../../server/rpc/test.p");
var user_p_1 = require("../../../server/rpc/user.p");
var user_s_1 = require("../../../server/rpc/user.s");
var user_item_p_1 = require("../../../server/rpc/user_item.p");
var init_1 = require("../net/init");
exports.login = function () {
    // 钱包登录
    var userType = new user_s_1.UserType();
    userType.enum_type = user_s_1.UserType_Enum.WALLET;
    var walletLoginReq = new user_s_1.WalletLoginReq();
    walletLoginReq.openid = '1';
    walletLoginReq.sign = '';
    userType.value = walletLoginReq;
    init_1.clientRpcFunc(user_p_1.login, userType, function (r) {
        exports.initReceive(r.uid);
        console.log(r);
    });
};
// export const invite = () => {
//     const code = 'QOTJZB';
//     clientRpcFunc(cdkey, code, (r: Invite) => {
//         console.log(r);
//     });
// };
exports.get_items = function () {
    init_1.clientRpcFunc(user_item_p_1.item_query, null, function (r) {
        console.log(r);
    });
};
exports.award = function () {
    init_1.clientRpcFunc(test_p_1.award, 200101, function (r) {
        console.log(r);
    });
};
// 获取指定用户指定类型物品
exports.item_test1 = function () {
    var itemType = 1001;
    init_1.clientRpcFunc(user_item_p_1.get_item, itemType, function (r) {
        console.log(r);
    });
};
// 给指定用户添加指定类型物品
exports.item_test2 = function () {
    var count = 5;
    init_1.clientRpcFunc(test_p_1.item_add, count, function (r) {
        console.log(r);
    });
};
// 获取挖矿随机种子
exports.get_seed = function () {
    var itemType = 2003;
    init_1.clientRpcFunc(mining_p_1.mining, itemType, function (r) {
        console.log(r);
    });
};
// 挖矿测试
exports.mining_test = function () {
    var miningResult = new itemQuery_s_1.MiningResult();
    miningResult.hit = 60;
    miningResult.itemType = 1001;
    miningResult.mineNum = 2;
    init_1.clientRpcFunc(mining_p_1.mining_result, miningResult, function (r) {
        console.log(r);
    });
};
// 添加矿山
exports.test_add_mine = function () {
    init_1.clientRpcFunc(user_item_p_1.add_mine, null, function (r) {
        console.log(r);
    });
};
// 锄头模拟
exports.test_hits = function () {
    var hoeType = 2001;
    init_1.clientRpcFunc(test_p_1.hit_test, hoeType, function (r) {
        console.log(r);
    });
};
// 奖励查询
exports.award_query_test = function () {
    var query = new item_s_1.AwardQuery();
    query.src = '';
    init_1.clientRpcFunc(user_item_p_1.award_query, query, function (r) {
        console.log(r);
    });
};
// 添加奖券
exports.add_ticket = function () {
    var count = 7001;
    init_1.clientRpcFunc(test_p_1.item_addticket, count, function (r) {
        console.log(r);
    });
};
// 转盘
exports.rotary_test = function () {
    var itemType = 100701;
    init_1.clientRpcFunc(stParties_p_1.st_rotary, itemType, function (r) {
        console.log(r);
    });
};
// 宝箱
exports.box_test = function () {
    var itemType = 101001;
    init_1.clientRpcFunc(stParties_p_1.st_treasurebox, itemType, function (r) {
        console.log(r);
    });
};
// 挖矿排行(KT)
exports.mine_top_test = function () {
    var top = 10;
    init_1.clientRpcFunc(mining_p_1.get_miningKTTop, top, function (r) {
        console.log(r);
    });
};
// 添加兑换码
exports.add_convert_test = function () {
    init_1.clientRpcFunc(stParties_p_1.add_convert, null, function (r) {
        console.log(r);
    });
};
// 兑换物品
exports.convert_test = function () {
    var awardType = 500002;
    init_1.clientRpcFunc(stParties_p_1.st_convert, awardType, function (r) {
        console.log(r);
    });
};
// 大整数测试
exports.bigInt_test = function () {
    init_1.clientRpcFunc(test_p_1.bigint_test, null, function (r) {
        console.log(r);
    });
};
// 连续登陆天数
exports.get_series_days = function () {
    init_1.clientRpcFunc(user_p_1.get_loginDays, null, function (r) {
        console.log(r);
    });
};
// 获取邀请人数
exports.get_inviteNum_test = function () {
    init_1.clientRpcFunc(invite_p_1.get_inviteNum, null, function (r) {
        console.log(r);
    });
};
// 获取邀请奖励
exports.get_inviteAward_test = function () {
    var index = 5;
    init_1.clientRpcFunc(invite_p_1.get_invite_awards, index, function (r) {
        console.log(r);
    });
};
// 获取所有奖章
exports.get_medals_test = function () {
    init_1.clientRpcFunc(user_item_p_1.get_medals, null, function (r) {
        console.log(r);
    });
};
// 获取所有成就
exports.get_achievements_test = function () {
    init_1.clientRpcFunc(user_item_p_1.get_achievements, null, function (r) {
        console.log(r);
    });
};
// 获取ST数量
exports.get_stNum_test = function () {
    init_1.clientRpcFunc(stParties_p_1.get_STNum, null, function (r) {
        console.log(r);
    });
};
// 查看兑奖列表
exports.get_convert_list_test = function () {
    init_1.clientRpcFunc(stParties_p_1.get_convert_list, null, function (r) {
        console.log(r);
    });
};
// 挂奖章
exports.show_medal_test = function () {
    var medal = 8001;
    init_1.clientRpcFunc(user_item_p_1.show_medal, medal, function (r) {
        console.log(r);
    });
};
// 查看挂出的奖章
exports.get_medal_test = function () {
    var medal = 1;
    init_1.clientRpcFunc(user_item_p_1.get_showMedal, medal, function (r) {
        console.log(r);
    });
};
exports.initReceive = function (uid) {
    init_1.subscribe("send/" + uid, send_message_s_1.SendMsg, function (r) {
        console.log('勋章弹窗！！！！！！！', r);
    });
};
exports.objtostr_test = function () {
    init_1.clientRpcFunc(stParties_p_1.get_hasFree, null, function (r) {
        console.log(r);
    });
};
// 竞猜投注
exports.guessing_test = function () {
    var guessingReq = new guessing_s_1.GuessingReq();
    guessingReq.cid = 7;
    guessingReq.teamSide = 1;
    guessingReq.num = 200;
    init_1.clientRpcFunc(guessingCompetition_p_1.start_guessing, guessingReq, function (r) {
        console.log(r);
    });
};
// 奖池信息
exports.get_jackpots_test = function () {
    var cid = 4;
    init_1.clientRpcFunc(guessingCompetition_p_1.get_compJackpots, cid, function (r) {
        console.log(r);
    });
};
// 竞猜历史
exports.get_my_guessing = function () {
    init_1.clientRpcFunc(guessingCompetition_p_1.get_user_guessingInfo, null, function (r) {
        console.log(r);
    });
};
// 广告奖励
exports.ad_award_test = function () {
    init_1.clientRpcFunc(user_item_p_1.get_ad_award, 1, function (r) {
        console.log(r);
    });
};
// 编辑比赛
exports.competition_edit_test = function () {
    root_1.popNew('earn-client-app-test-compEditor');
};
// 编辑商品
exports.product_edit_test = function () {
    root_1.popNew('earn-client-app-test-convertEditor');
};
var props = {
    bts: [{
        name: '登录',
        func: function func() {
            exports.login();
        }
    }, {
        name: '奖励方法',
        func: function func() {
            exports.award();
        }
    }, {
        name: '所有物品',
        func: function func() {
            exports.get_items();
        }
    }, {
        name: '指定物品',
        func: function func() {
            exports.item_test1();
        }
    }, {
        name: '添加锄头',
        func: function func() {
            exports.item_test2();
        }
    }, {
        name: '随机种子',
        func: function func() {
            exports.get_seed();
        }
    }, {
        name: '挖矿',
        func: function func() {
            exports.mining_test();
        }
    }, {
        name: '添加矿山',
        func: function func() {
            exports.test_add_mine();
        }
    }, {
        name: '锄头模拟',
        func: function func() {
            exports.test_hits();
        }
    }, {
        name: '奖励查询',
        func: function func() {
            exports.award_query_test();
        }
    }, {
        name: '添加奖券',
        func: function func() {
            exports.add_ticket();
        }
    }, {
        name: '转盘',
        func: function func() {
            exports.rotary_test();
        }
    }, {
        name: '宝箱',
        func: function func() {
            exports.box_test();
        }
    }, {
        name: '挖矿排行',
        func: function func() {
            exports.mine_top_test();
        }
    }, {
        name: '兑换物品',
        func: function func() {
            exports.convert_test();
        }
    }, {
        name: '获取邀请人数',
        func: function func() {
            exports.get_inviteNum_test();
        }
    }, {
        name: '获取邀请奖励',
        func: function func() {
            exports.get_inviteAward_test();
        }
    }, {
        name: '获取奖章',
        func: function func() {
            exports.get_medals_test();
        }
    }, {
        name: '获取成就',
        func: function func() {
            exports.get_achievements_test();
        }
    }, {
        name: '查询ST',
        func: function func() {
            exports.get_stNum_test();
        }
    }, {
        name: '添加ST',
        func: function func() {
            exports.bigInt_test();
        }
    }, {
        name: '兑奖列表',
        func: function func() {
            exports.get_convert_list_test();
        }
    }, {
        name: '挂奖章',
        func: function func() {
            exports.show_medal_test();
        }
    }, {
        name: '查奖章',
        func: function func() {
            exports.get_medal_test();
        }
    }, {
        name: '竞猜',
        func: function func() {
            exports.guessing_test();
        }
    }, {
        name: '奖池',
        func: function func() {
            exports.get_jackpots_test();
        }
    }, {
        name: '竞猜历史',
        func: function func() {
            exports.get_my_guessing();
        }
    }, {
        name: '广告奖励',
        func: function func() {
            exports.ad_award_test();
        }
    }, {
        name: '添加比赛',
        func: function func() {
            exports.competition_edit_test();
        }
    }, {
        name: '编辑商品',
        func: function func() {
            exports.product_edit_test();
        }
    }] // 按钮数组
};
// ================================================ 导出

var Test = function (_widget_1$Widget) {
    _inherits(Test, _widget_1$Widget);

    function Test() {
        _classCallCheck(this, Test);

        var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this));

        _this.props = props;
        return _this;
    }

    _createClass(Test, [{
        key: "onTap",
        value: function onTap(a) {
            props.bts[a].func();
            // console.log('click ',props.bts[a].name);
        }
    }]);

    return Test;
}(widget_1.Widget);

exports.Test = Test;
// ================================================ 本地
})