(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 4;_node.attrHash = 3424737235;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["ev-refresh-click"] = "refreshPage";topBarTitle = { "zh_Hans": "验证手机号", "zh_Hant": "驗證手機號", "en": "" };_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 1374515553;_node2.attrs["style"] = "background:rgb(44, 110, 234);";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "app-components1-topBar-topBar2", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["text"] = topBarTitle;
					//jpair suf
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 3376600272;_node5.attrs["w-class"] = "content";_node5.attrs["on-scroll"] = "getMoreList";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 1913054642;_node6.attrs["w-class"] = "main";rule = [{ "zh_Hans": "1、验证手机号是真实用户的唯一标准。", "zh_Hant": "1、驗證手機號是真實用戶的唯一標準。", "en": "" }, { "zh_Hans": "2、一个钱包只能验证一个手机号。", "zh_Hant": "2，一個錢包只能驗證一個手機號。", "en": "" }, { "zh_Hans": "3、可以用未验证的手机号挤掉已验证的", "zh_Hant": "3，可以用未驗證的手機號擠掉已驗證的", "en": "" }, { "zh_Hans": "4、修改验证可以在账户-手机号中进行修改", "zh_Hant": "4，修改驗證可以在賬戶 - 手機號中進行修改", "en": "" }];rule_title = { "zh_Hans": "活动规则", "zh_Hant": "活動規則", "en": "" };ruleBtn = { "zh_Hans": "去验证手机号", "zh_Hant": "去驗證手機號", "en": "" };_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 1042679380;_node7.attrs["w-class"] = "phone_part";_$temp = _node7;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "widget", "sid": 6 };_node8.hasChild = false;_node8.child = null;_node8.attrSize = 1;_node8.attrHash = 2195991620;_node8.attrs["w-class"] = "rule_title";_node8.attrs["w-tag"] = "pi-ui-lang";_node8.tagName = _node8.attrs["w-tag"];_$temp = _node8;{
							var _$parent9 = _$temp;_addJson(rule_title, _$parent9);
						}_chFunc(_node8);_$parent8.children.push(_node8);
					}_$temp = _node7;{
						var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 634041548;_node9.attrs["w-class"] = "rule_list";for (var ind in rule) {
							var val = rule[ind];_$temp = _node9;{
								var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "widget", "sid": 8 };_node10.hasChild = false;_node10.child = null;_node10.attrSize = 1;_node10.attrHash = 730622639;_node10.attrs["w-class"] = "rule_item";_node10.attrs["w-tag"] = "pi-ui-lang";_node10.tagName = _node10.attrs["w-tag"];_$temp = _node10;{
									var _$parent12 = _$temp;_addJson(val, _$parent12);
								}_chFunc(_node10);_$parent11.children.push(_node10);
							}
						}_chFunc(_node9);_$parent10.children.push(_node9);
					}_$temp = _node7;{
						var _$parent13 = _$temp;var _node11 = { "attrs": {}, "tagName": "widget", "sid": 9 };_node11.hasChild = false;_node11.child = null;_node11.attrSize = 2;_node11.attrHash = 2310206252;_node11.attrs["w-class"] = "rule_btn";_node11.attrs["w-tag"] = "pi-ui-lang";_node11.tagName = _node11.attrs["w-tag"];_node11.attrs["on-tap"] = "goVerifyPhone";_$temp = _node11;{
							var _$parent14 = _$temp;_addJson(ruleBtn, _$parent14);
						}_chFunc(_node11);_$parent13.children.push(_node11);
					}_chFunc(_node7);_$parent7.children.push(_node7);
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});