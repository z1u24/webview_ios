(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 4;_node.attrHash = 1551104450;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["ev-next-click"] = "shareScreen";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3673846548;_node2.attrs["w-class"] = "top-head";topBarTitle = { "zh_Hans": "充值", "zh_Hant": "充值", "en": "" };_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "widget", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 1483449382;_node3.attrs["w-tag"] = "app-components1-topBar-topBar";_node3.tagName = _node3.attrs["w-tag"];_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["title"] = topBarTitle;
					//jpair suf
					//jpair pre

					{
						var jvalue = "";
						jvalue = "linear-gradient(to right,#38CFE7,#318DE6);position: fixed;";
						//jpair suf

						_node4["background"] = jvalue;
					}
					//jpair pre

					{
						var _jvalue = "";
						_jvalue = "../../res/image/share_white.png";
						//jpair suf

						_node4["nextImg"] = _jvalue;
					}
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 4252679546;_node5.attrs["w-class"] = "body";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 4140979430;_node6.attrs["w-class"] = "status-container";if (it.state === '支付成功') {
					_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 5 };_node7.children = [];_node7.childHash = 0;_node7.attrSize = 2;_node7.attrHash = 4169677763;_node7.attrs["src"] = "../../../res/image/icon_right2.png";_node7.attrs["w-class"] = "status-icon";_$parent7.children.push(_node7);
					}
				} else {
					_$temp = _node6;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 6 };_node8.children = [];_node8.childHash = 0;_node8.attrSize = 2;_node8.attrHash = 2527277736;_node8.attrs["src"] = "../../../res/image/btn_img_close.png";_node8.attrs["w-class"] = "status-icon";_$parent8.children.push(_node8);
					}
				}_$temp = _node6;{
					var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 1323770159;_node9.attrs["w-class"] = "status";_$temp = _node9;{
						var _$parent10 = _$temp;_addText(it.state, _$parent10);
					}_chFunc(_node9);_$parent9.children.push(_node9);
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_$temp = _node5;{
				var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 3411736184;_node10.attrs["w-class"] = "detail-top";if (it.state !== '查询失败') {
					tags = [{ "zh_Hans": "金额", "zh_Hant": "金額", "en": "" }, { "zh_Hans": "类型", "zh_Hant": "類型", "en": "" }, { "zh_Hans": "交易时间", "zh_Hant": "交易時間", "en": "" }];_$temp = _node10;{
						var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 9 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 1141695757;_node11.attrs["w-class"] = "amount";_$temp = _node11;{
							var _$parent13 = _$temp;var _node12 = _installText("+", 3807426999);;
							_$parent13.children.push(_node12);
						}_$temp = _node11;{
							var _$parent14 = _$temp;_addText(it.GTNum, _$parent14);
						}_$temp = _node11;{
							var _$parent15 = _$temp;var _node13 = _installText("&nbsp;ST", 1258959272);;
							_$parent15.children.push(_node13);
						}_chFunc(_node11);_$parent12.children.push(_node11);
					}_$temp = _node10;{
						var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 10 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 1045235690;_node14.attrs["w-class"] = "item";_$temp = _node14;{
							var _$parent17 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 11 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 854203028;_node15.attrs["w-class"] = "tag";_$temp = _node15;{
								var _$parent18 = _$temp;var _node16 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 12 };_node16.hasChild = false;_node16.child = null;_node16.attrHash = 0;_$temp = _node16;{
									var _$parent19 = _$temp;_addJson(tags[0], _$parent19);
								}_chFunc(_node16);_$parent18.children.push(_node16);
							}_chFunc(_node15);_$parent17.children.push(_node15);
						}_$temp = _node14;{
							var _$parent20 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 13 };_node17.children = [];_node17.attrSize = 1;_node17.attrHash = 487306359;_node17.attrs["w-class"] = "content";_$temp = _node17;{
								var _$parent21 = _$temp;var _node18 = { "attrs": {}, "tagName": "span", "sid": 14 };_node18.children = [];_node18.attrHash = 0;_$temp = _node18;{
									var _$parent22 = _$temp;var _node19 = _installText("￥", 3615707983);;
									_$parent22.children.push(_node19);
								}_$temp = _node18;{
									var _$parent23 = _$temp;_addText(it.money, _$parent23);
								}_chFunc(_node18);_$parent21.children.push(_node18);
							}_chFunc(_node17);_$parent20.children.push(_node17);
						}_chFunc(_node14);_$parent16.children.push(_node14);
					}_$temp = _node10;{
						var _$parent24 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 15 };_node20.children = [];_node20.attrSize = 1;_node20.attrHash = 1045235690;_node20.attrs["w-class"] = "item";_$temp = _node20;{
							var _$parent25 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 16 };_node21.children = [];_node21.attrSize = 1;_node21.attrHash = 854203028;_node21.attrs["w-class"] = "tag";_$temp = _node21;{
								var _$parent26 = _$temp;var _node22 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 17 };_node22.hasChild = false;_node22.child = null;_node22.attrHash = 0;_$temp = _node22;{
									var _$parent27 = _$temp;_addJson(tags[1], _$parent27);
								}_chFunc(_node22);_$parent26.children.push(_node22);
							}_chFunc(_node21);_$parent25.children.push(_node21);
						}_$temp = _node20;{
							var _$parent28 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 18 };_node23.children = [];_node23.attrSize = 1;_node23.attrHash = 487306359;_node23.attrs["w-class"] = "content";_$temp = _node23;{
								var _$parent29 = _$temp;var _node24 = { "attrs": {}, "tagName": "span", "sid": 19 };_node24.children = [];_node24.attrHash = 0;_$temp = _node24;{
									var _$parent30 = _$temp;_addText(it.transactionType, _$parent30);
								}_chFunc(_node24);_$parent29.children.push(_node24);
							}_chFunc(_node23);_$parent28.children.push(_node23);
						}_chFunc(_node20);_$parent24.children.push(_node20);
					}_$temp = _node10;{
						var _$parent31 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 20 };_node25.children = [];_node25.attrSize = 1;_node25.attrHash = 1045235690;_node25.attrs["w-class"] = "item";_$temp = _node25;{
							var _$parent32 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 21 };_node26.children = [];_node26.attrSize = 1;_node26.attrHash = 854203028;_node26.attrs["w-class"] = "tag";_$temp = _node26;{
								var _$parent33 = _$temp;var _node27 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 22 };_node27.hasChild = false;_node27.child = null;_node27.attrHash = 0;_$temp = _node27;{
									var _$parent34 = _$temp;_addJson(tags[2], _$parent34);
								}_chFunc(_node27);_$parent33.children.push(_node27);
							}_chFunc(_node26);_$parent32.children.push(_node26);
						}_$temp = _node25;{
							var _$parent35 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 23 };_node28.children = [];_node28.attrSize = 1;_node28.attrHash = 487306359;_node28.attrs["w-class"] = "content";_$temp = _node28;{
								var _$parent36 = _$temp;var _node29 = { "attrs": {}, "tagName": "span", "sid": 24 };_node29.children = [];_node29.attrHash = 0;_$temp = _node29;{
									var _$parent37 = _$temp;_addText(it.transactionTime, _$parent37);
								}_chFunc(_node29);_$parent36.children.push(_node29);
							}_chFunc(_node28);_$parent35.children.push(_node28);
						}_chFunc(_node25);_$parent31.children.push(_node25);
					}
				}_chFunc(_node10);_$parent11.children.push(_node10);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});