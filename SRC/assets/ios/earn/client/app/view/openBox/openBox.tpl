(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 5;_node.attrHash = 3568239961;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["ev-next-click"] = "goHistory";_node.attrs["ev-refresh-click"] = "refresh";topBarTitle = { "zh_Hans": "开宝箱", "zh_Hant": "開寶箱", "en": "" };_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar2", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["scrollHeight"] = 0;
				//jpair suf
				//jpair pre

				_node3["text"] = topBarTitle;
				//jpair suf
				//jpair pre

				{
					var jvalue = "";
					jvalue = "../../res/image/26_white.png";
					//jpair suf

					_node3["nextImg"] = jvalue;
				}
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 487306359;_node4.attrs["w-class"] = "content";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 2007810158;_node5.attrs["w-class"] = "center";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 711732755;_node6.attrs["w-class"] = "box-content";if (it.ledShow) {
						_$temp = _node6;{
							var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 5 };_node7.children = [];_node7.childHash = 0;_node7.attrSize = 2;_node7.attrHash = 142229090;_node7.attrs["src"] = "../../res/image/openBox_LED1.png";_node7.attrs["alt"] = "";_$parent7.children.push(_node7);
						}
					}_$temp = _node6;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 87406631;_node8.attrs["w-class"] = "box-list";for (var i in it.boxList) {
							var item = it.boxList[i];_$temp = _node8;{
								var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 2210269787;_node9.attrs["w-class"] = "box";if (item === 0) {
									_$temp = _node9;{
										var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "img", "sid": 8 };_node10.children = [];_node10.attrSize = 6;_node10.attrHash = 1759828239;_node10.attrs["class"] = "chest-img";_node10.attrs["w-class"] = "chest-img";{
											var attrvalue = "";attrvalue += "openBox(e,";attrvalue += i;attrvalue += ")";_node10.attrs["on-tap"] = attrvalue;
										}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["on-tap"]));{
											var _attrvalue = "";_attrvalue += "../../res/image/";_attrvalue += it.selectChest.type;_attrvalue += "box.png";_node10.attrs["src"] = _attrvalue;
										}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["src"]));_node10.attrs["height"] = "100%;";_node10.attrs["style"] = "margin:0px auto;";_chFunc(_node10);_$parent10.children.push(_node10);
									}
								} else if (item === 1) {
									_$temp = _node9;{
										var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "img", "sid": 9 };_node11.children = [];_node11.attrSize = 4;_node11.attrHash = 3198204643;_node11.attrs["class"] = "chest-img";{
											var _attrvalue2 = "";_attrvalue2 += "../../res/image/";_attrvalue2 += it.selectChest.type;_attrvalue2 += "boxOpen.png";_node11.attrs["src"] = _attrvalue2;
										}_node11.attrHash = _hash.nextHash(_node11.attrHash, _calTextHash(_node11.attrs["src"]));_node11.attrs["height"] = "100%;";_node11.attrs["style"] = "margin:0px auto;";_chFunc(_node11);_$parent11.children.push(_node11);
									}
								} else if (item === 2) {
									_$temp = _node9;{
										var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "img", "sid": 10 };_node12.children = [];_node12.attrSize = 4;_node12.attrHash = 3779941408;_node12.attrs["class"] = "chest-img";{
											var _attrvalue3 = "";_attrvalue3 += "../../res/image/";_attrvalue3 += it.selectChest.type;_attrvalue3 += "boxEmpty.png";_node12.attrs["src"] = _attrvalue3;
										}_node12.attrHash = _hash.nextHash(_node12.attrHash, _calTextHash(_node12.attrs["src"]));_node12.attrs["height"] = "100%;";_node12.attrs["style"] = "margin:0px auto;";_chFunc(_node12);_$parent12.children.push(_node12);
									}
								}_chFunc(_node9);_$parent9.children.push(_node9);
							}
						}_chFunc(_node8);_$parent8.children.push(_node8);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 11 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 3178656977;_node13.attrs["w-class"] = "sale";_$temp = _node13;{
						var _$parent14 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 12 };_node14.children = [];_node14.childHash = 1607443202;_node14.attrSize = 2;_node14.attrHash = 3491109840;_node14.attrs["w-class"] = "sale-btn";_node14.attrs["on-tap"] = "btnClick(e,0)";_$temp = _node14;{
							var _$parent15 = _$temp;var _node15 = { "attrs": {}, "tagName": "widget", "sid": 13 };_node15.hasChild = false;_node15.child = null;_node15.childHash = 766392843;_node15.attrHash = 2467408643;_node15.attrs["w-tag"] = "pi-ui-lang";_node15.tagName = _node15.attrs["w-tag"];_$temp = _node15;{
								var _$parent16 = _$temp;var _node16 = {}; //jpair pre

								{
									var _jvalue = "";
									_jvalue = "换一波";
									//jpair suf

									_node16["zh_Hans"] = _jvalue;
								}
								//jpair pre

								{
									var _jvalue2 = "";
									_jvalue2 = "換一波";
									//jpair suf

									_node16["zh_Hant"] = _jvalue2;
								}
								//jpair pre

								{
									var _jvalue3 = "";
									_jvalue3 = "";
									//jpair suf

									_node16["en"] = _jvalue3;
								}
								_addJson(_node16, _$parent16);
							}_$parent15.children.push(_node15);
						}_$parent14.children.push(_node14);
					}_$temp = _node13;{
						var _$parent17 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 14 };_node17.children = [];_node17.attrSize = 1;_node17.attrHash = 4023129978;_node17.attrs["w-class"] = "sale-money";_$temp = _node17;{
							var _$parent18 = _$temp;var _node18 = { "attrs": {}, "tagName": "widget", "sid": 15 };_node18.hasChild = false;_node18.child = null;_node18.attrHash = 2467408643;_node18.attrs["w-tag"] = "pi-ui-lang";_node18.tagName = _node18.attrs["w-tag"];_$temp = _node18;{
								var _$parent19 = _$temp;_addJson(it.showTip, _$parent19);
							}_chFunc(_node18);_$parent18.children.push(_node18);
						}_chFunc(_node17);_$parent17.children.push(_node17);
					}_$temp = _node13;{
						var _$parent20 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 16 };_node19.children = [];_node19.childHash = 4191611989;_node19.attrSize = 2;_node19.attrHash = 2229361530;_node19.attrs["w-class"] = "sale-btn";_node19.attrs["on-tap"] = "btnClick(e,1)";_$temp = _node19;{
							var _$parent21 = _$temp;var _node20 = { "attrs": {}, "tagName": "widget", "sid": 17 };_node20.hasChild = false;_node20.child = null;_node20.childHash = 1620279894;_node20.attrHash = 2467408643;_node20.attrs["w-tag"] = "pi-ui-lang";_node20.tagName = _node20.attrs["w-tag"];_$temp = _node20;{
								var _$parent22 = _$temp;var _node21 = {}; //jpair pre

								{
									var _jvalue4 = "";
									_jvalue4 = "充值";
									//jpair suf

									_node21["zh_Hans"] = _jvalue4;
								}
								//jpair pre

								{
									var _jvalue5 = "";
									_jvalue5 = "充值";
									//jpair suf

									_node21["zh_Hant"] = _jvalue5;
								}
								//jpair pre

								{
									var _jvalue6 = "";
									_jvalue6 = "";
									//jpair suf

									_node21["en"] = _jvalue6;
								}
								_addJson(_node21, _$parent22);
							}_$parent21.children.push(_node20);
						}_$parent20.children.push(_node19);
					}_chFunc(_node13);_$parent13.children.push(_node13);
				}_$temp = _node5;{
					var _$parent23 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 18 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 1554851800;_node22.attrs["w-class"] = "ticket";for (var _i in it.chestList) {
						var _item = it.chestList[_i];_$temp = _node22;{
							var _$parent24 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 19 };_node23.children = [];_node23.attrSize = 2;_node23.attrHash = 1944389375;{
								var _attrvalue4 = "";_attrvalue4 += "btnClick(e,2,";_attrvalue4 += _i;_attrvalue4 += ")";_node23.attrs["on-tap"] = _attrvalue4;
							}_node23.attrHash = _hash.nextHash(_node23.attrHash, _calTextHash(_node23.attrs["on-tap"]));{
								var _attrvalue5 = "";_attrvalue5 += "ticket-item ";_attrvalue5 += it.selectChest.type === _item.type ? 'select' : '';_attrvalue5 += "";_node23.attrs["w-class"] = _attrvalue5;
							}_node23.attrHash = _hash.nextHash(_node23.attrHash, _calTextHash(_node23.attrs["w-class"]));_$temp = _node23;{
								var _$parent25 = _$temp;var _node24 = { "attrs": {}, "tagName": "img", "sid": 20 };_node24.children = [];_node24.attrSize = 3;_node24.attrHash = 2741423134;{
									var _attrvalue6 = "";_attrvalue6 += "../../res/image/";_attrvalue6 += _item.type;_attrvalue6 += "box.png";_node24.attrs["src"] = _attrvalue6;
								}_node24.attrHash = _hash.nextHash(_node24.attrHash, _calTextHash(_node24.attrs["src"]));_node24.attrs["width"] = "100%;";_node24.attrs["style"] = "margin-top:-10px;margin-right: -10px";_chFunc(_node24);_$parent25.children.push(_node24);
							}_chFunc(_node23);_$parent24.children.push(_node23);
						}
					}_chFunc(_node22);_$parent23.children.push(_node22);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});