(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";if (it.type === 0) {
			topBarTitle = { "zh_Hans": "我的物品", "zh_Hant": "我的物品", "en": "" };
		} else {
			topBarTitle = { "zh_Hans": "中奖记录", "zh_Hant": "中獎記錄", "en": "" };
		}_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "widget", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 1483449382;_node2.attrs["w-tag"] = "app-components1-topBar-topBar";_node2.tagName = _node2.attrs["w-tag"];_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["title"] = topBarTitle;
				//jpair suf
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 3008141472;_node4.attrs["w-class"] = "content flex-col";if (it.history.length !== 0) {
				for (var i in it.history) {
					var item = it.history[i];_$temp = _node4;{
						var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 3729893308;_node5.attrs["w-class"] = "mat item";{
							var attrvalue = "";attrvalue += "goProductDetail(";attrvalue += i;attrvalue += ")";_node5.attrs["on-tap"] = attrvalue;
						}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["on-tap"]));_$temp = _node5;{
							var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 4 };_node6.children = [];_node6.attrSize = 3;_node6.attrHash = 818498790;{
								var _attrvalue = "";_attrvalue += "../../res/image/virtualGoods/";_attrvalue += item.pid;_attrvalue += ".jpg";_node6.attrs["src"] = _attrvalue;
							}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["src"]));_node6.attrs["height"] = "150px";_node6.attrs["style"] = "padding:5px 30px;";_chFunc(_node6);_$parent6.children.push(_node6);
						}_$temp = _node5;{
							var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 2314559994;_node7.attrs["w-class"] = "item-text";_$temp = _node7;{
								var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 3974450906;_node8.attrs["style"] = "height:45px;font-size:32px;margin-bottom: 20px;";_$temp = _node8;{
									var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "widget", "sid": 7 };_node9.hasChild = false;_node9.child = null;_node9.attrHash = 2467408643;_node9.attrs["w-tag"] = "pi-ui-lang";_node9.tagName = _node9.attrs["w-tag"];_$temp = _node9;{
										var _$parent10 = _$temp;var _node10 = {}; //jpair pre

										{
											var jvalue = "";
											jvalue += item.zh_hans;jvalue += "";
											//jpair suf

											_node10["zh_Hans"] = jvalue;
										}
										//jpair pre

										{
											var _jvalue = "";
											_jvalue += item.zh_hant;_jvalue += "";
											//jpair suf

											_node10["zh_Hant"] = _jvalue;
										}
										//jpair pre

										{
											var _jvalue2 = "";
											_jvalue2 = "";
											//jpair suf

											_node10["en"] = _jvalue2;
										}
										_addJson(_node10, _$parent10);
									}_chFunc(_node9);_$parent9.children.push(_node9);
								}_$temp = _node8;{
									var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "span", "sid": 8 };_node11.children = [];_node11.attrHash = 0;_$temp = _node11;{
										var _$parent12 = _$temp;var _node12 = _installText(":", 1140411531);;
										_$parent12.children.push(_node12);
									}_$temp = _node11;{
										var _$parent13 = _$temp;_addText(item.count, _$parent13);
									}_$temp = _node11;{
										var _$parent14 = _$temp;_addText(item.unit, _$parent14);
									}_chFunc(_node11);_$parent11.children.push(_node11);
								}_chFunc(_node8);_$parent8.children.push(_node8);
							}_$temp = _node7;{
								var _$parent15 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 9 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 3054326458;_node13.attrs["style"] = "height:33px;font-size:24px;";_$temp = _node13;{
									var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "widget", "sid": 10 };_node14.hasChild = false;_node14.child = null;_node14.childHash = 2135681403;_node14.attrHash = 2467408643;_node14.attrs["w-tag"] = "pi-ui-lang";_node14.tagName = _node14.attrs["w-tag"];_$temp = _node14;{
										var _$parent17 = _$temp;var _node15 = {}; //jpair pre

										{
											var _jvalue3 = "";
											_jvalue3 = "中奖时间";
											//jpair suf

											_node15["zh_Hans"] = _jvalue3;
										}
										//jpair pre

										{
											var _jvalue4 = "";
											_jvalue4 = "中奖时间";
											//jpair suf

											_node15["zh_Hant"] = _jvalue4;
										}
										//jpair pre

										{
											var _jvalue5 = "";
											_jvalue5 = "";
											//jpair suf

											_node15["en"] = _jvalue5;
										}
										_addJson(_node15, _$parent17);
									}_$parent16.children.push(_node14);
								}_$temp = _node13;{
									var _$parent18 = _$temp;_addText(item.time, _$parent18);
								}_chFunc(_node13);_$parent15.children.push(_node13);
							}_chFunc(_node7);_$parent7.children.push(_node7);
						}_chFunc(_node5);_$parent5.children.push(_node5);
					}
				}
			} else {
				_$temp = _node4;{
					var _$parent19 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 11 };_node16.children = [];_node16.childHash = 80176963;_node16.attrSize = 2;_node16.attrHash = 1052296048;_node16.attrs["w-class"] = "flex-col";_node16.attrs["style"] = "align-items: center;margin-top:160px;";_$temp = _node16;{
						var _$parent20 = _$temp;var _node17 = { "attrs": {}, "tagName": "img", "sid": 12 };_node17.children = [];_node17.childHash = 0;_node17.attrSize = 2;_node17.attrHash = 1172941070;_node17.attrs["src"] = "../../res/image/dividend_history_none.png";_node17.attrs["width"] = "195px;";_$parent20.children.push(_node17);
					}_$temp = _node16;{
						var _$parent21 = _$temp;var _node18 = { "attrs": {}, "tagName": "widget", "sid": 13 };_node18.hasChild = false;_node18.child = null;_node18.childHash = 2043208451;_node18.attrSize = 1;_node18.attrHash = 1739807805;_node18.attrs["w-class"] = "tips";_node18.attrs["w-tag"] = "pi-ui-lang";_node18.tagName = _node18.attrs["w-tag"];_$temp = _node18;{
							var _$parent22 = _$temp;var _node19 = {}; //jpair pre

							{
								var _jvalue6 = "";
								_jvalue6 = "还没有记录哦";
								//jpair suf

								_node19["zh_Hans"] = _jvalue6;
							}
							//jpair pre

							{
								var _jvalue7 = "";
								_jvalue7 = "還沒有記錄哦";
								//jpair suf

								_node19["zh_Hant"] = _jvalue7;
							}
							//jpair pre

							{
								var _jvalue8 = "";
								_jvalue8 = "";
								//jpair suf

								_node19["en"] = _jvalue8;
							}
							_addJson(_node19, _$parent22);
						}_$parent21.children.push(_node18);
					}_$parent19.children.push(_node16);
				}
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});