(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";topBarTitle = { "zh_Hans": "兑换记录", "zh_Hant": "兌換記錄", "en": "" };_$temp = _node;{
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
						var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 1759858292;_node5.attrs["w-class"] = "mat item";_$temp = _node5;{
							var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 4 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 4006558802;{
								var attrvalue = "";attrvalue += item.img;attrvalue += "";_node6.attrs["src"] = attrvalue;
							}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["src"]));_node6.attrs["width"] = "210px;";_chFunc(_node6);_$parent6.children.push(_node6);
						}_$temp = _node5;{
							var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 2314559994;_node7.attrs["w-class"] = "item-text";_$temp = _node7;{
								var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 3974450906;_node8.attrs["style"] = "height:45px;font-size:32px;margin-bottom: 20px;";_$temp = _node8;{
									var _$parent9 = _$temp;_addText(item.name, _$parent9);
								}_chFunc(_node8);_$parent8.children.push(_node8);
							}_$temp = _node7;{
								var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 3054326458;_node9.attrs["style"] = "height:33px;font-size:24px;";_$temp = _node9;{
									var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "widget", "sid": 8 };_node10.hasChild = false;_node10.child = null;_node10.childHash = 3234732950;_node10.attrHash = 2467408643;_node10.attrs["w-tag"] = "pi-ui-lang";_node10.tagName = _node10.attrs["w-tag"];_$temp = _node10;{
										var _$parent12 = _$temp;var _node11 = {}; //jpair pre

										{
											var jvalue = "";
											jvalue = "有效期：至";
											//jpair suf

											_node11["zh_Hans"] = jvalue;
										}
										//jpair pre

										{
											var _jvalue = "";
											_jvalue = "有效期：至";
											//jpair suf

											_node11["zh_Hant"] = _jvalue;
										}
										//jpair pre

										{
											var _jvalue2 = "";
											_jvalue2 = "";
											//jpair suf

											_node11["en"] = _jvalue2;
										}
										_addJson(_node11, _$parent12);
									}_$parent11.children.push(_node10);
								}_$temp = _node9;{
									var _$parent13 = _$temp;_addText(item.time, _$parent13);
								}_chFunc(_node9);_$parent10.children.push(_node9);
							}_chFunc(_node7);_$parent7.children.push(_node7);
						}_chFunc(_node5);_$parent5.children.push(_node5);
					}
				}
			} else {
				_$temp = _node4;{
					var _$parent14 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.childHash = 80176963;_node12.attrSize = 2;_node12.attrHash = 1052296048;_node12.attrs["w-class"] = "flex-col";_node12.attrs["style"] = "align-items: center;margin-top:160px;";_$temp = _node12;{
						var _$parent15 = _$temp;var _node13 = { "attrs": {}, "tagName": "img", "sid": 10 };_node13.children = [];_node13.childHash = 0;_node13.attrSize = 2;_node13.attrHash = 1172941070;_node13.attrs["src"] = "../../res/image/dividend_history_none.png";_node13.attrs["width"] = "195px;";_$parent15.children.push(_node13);
					}_$temp = _node12;{
						var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "widget", "sid": 11 };_node14.hasChild = false;_node14.child = null;_node14.childHash = 2043208451;_node14.attrSize = 1;_node14.attrHash = 1739807805;_node14.attrs["w-class"] = "tips";_node14.attrs["w-tag"] = "pi-ui-lang";_node14.tagName = _node14.attrs["w-tag"];_$temp = _node14;{
							var _$parent17 = _$temp;var _node15 = {}; //jpair pre

							{
								var _jvalue3 = "";
								_jvalue3 = "还没有记录哦";
								//jpair suf

								_node15["zh_Hans"] = _jvalue3;
							}
							//jpair pre

							{
								var _jvalue4 = "";
								_jvalue4 = "還沒有記錄哦";
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
					}_$parent14.children.push(_node12);
				}
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});