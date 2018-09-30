(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3286765528;_node.attrs["class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["w-class"] = "new-page";if (!it1.isScroll) {
			_$temp = _node;{
				var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
					var _$parent3 = _$temp;var _node3 = {}; //jpair pre

					_node3["title"] = it1.cfgData.topBarTitle;
					//jpair suf
					//jpair pre

					{
						var jvalue = "";
						jvalue = "#F46262";
						//jpair suf

						_node3["background"] = jvalue;
					}
					_addJson(_node3, _$parent3);
				}_chFunc(_node2);_$parent2.children.push(_node2);
			}
		} else {
			_$temp = _node;{
				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 2 };_node4.hasChild = false;_node4.child = null;_node4.attrHash = 0;_$temp = _node4;{
					var _$parent5 = _$temp;var _node5 = {}; //jpair pre

					_node5["title"] = it1.cfgData.topBarTitle;
					//jpair suf
					_addJson(_node5, _$parent5);
				}_chFunc(_node4);_$parent4.children.push(_node4);
			}
		}_$temp = _node;{
			var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 3 };_node6.children = [];_node6.attrSize = 3;_node6.attrHash = 1129311734;_node6.attrs["w-class"] = "content";_node6.attrs["on-scroll"] = "getMoreList";_node6.attrs["id"] = "redEnvHistory";_$temp = _node6;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 4 };_node7.children = [];_node7.childHash = 0;_node7.attrSize = 2;_node7.attrHash = 1436780041;_node7.attrs["src"] = "../../../res/image/redEnvtop1.png";_node7.attrs["w-class"] = "topBackimg";_$parent7.children.push(_node7);
			}_$temp = _node6;{
				var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.attrSize = 2;_node8.attrHash = 3527543061;_node8.attrs["id"] = "historyRecords";_node8.attrs["w-class"] = "records";_$temp = _node8;{
					var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 2188685783;_node9.attrs["w-class"] = "topBack";_$temp = _node9;{
						var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "img", "sid": 7 };_node10.children = [];_node10.childHash = 0;_node10.attrSize = 2;_node10.attrHash = 4021738546;_node10.attrs["src"] = "../../../res/image/default_avater_big.png";_node10.attrs["w-class"] = "userHead";_$parent10.children.push(_node10);
					}_$temp = _node9;{
						var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 14946502;_node11.attrs["style"] = "margin-top: 20px;";_$temp = _node11;{
							var _$parent12 = _$temp;_addText(it1.cfgData.tips[0], _$parent12);
						}_chFunc(_node11);_$parent11.children.push(_node11);
					}_$temp = _node9;{
						var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 3864739911;_node12.attrs["style"] = "margin-bottom: 90px;";_$temp = _node12;{
							var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "span", "sid": 10 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 395455977;_node13.attrs["style"] = "font-size: 64px;";_$temp = _node13;{
								var _$parent15 = _$temp;_addText(it1.sendNumber, _$parent15);
							}_chFunc(_node13);_$parent14.children.push(_node13);
						}_$temp = _node12;{
							var _$parent16 = _$temp;_addText(it1.cfgData.tips[1], _$parent16);
						}_chFunc(_node12);_$parent13.children.push(_node12);
					}_chFunc(_node9);_$parent9.children.push(_node9);
				}_$temp = _node8;{
					var _$parent17 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 11 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 832204064;_node14.attrs["w-class"] = "bottom";if (it1.recordList.length == 0) {
						_$temp = _node14;{
							var _$parent18 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 12 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 3583682907;_node15.attrs["style"] = "text-align: center;";_$temp = _node15;{
								var _$parent19 = _$temp;var _node16 = { "attrs": {}, "tagName": "img", "sid": 13 };_node16.children = [];_node16.childHash = 0;_node16.attrSize = 2;_node16.attrHash = 624373708;_node16.attrs["src"] = "../../../res/image/redEnvEmpty.png";_node16.attrs["style"] = "width: 200px;height: 200px;margin-top: 210px;";_$parent19.children.push(_node16);
							}_$temp = _node15;{
								var _$parent20 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 14 };_node17.children = [];_node17.attrSize = 1;_node17.attrHash = 2787505104;_node17.attrs["style"] = "font-size: 32px;color: #888888;margin-top: 20px;";_$temp = _node17;{
									var _$parent21 = _$temp;_addText(it1.cfgData.tips[2], _$parent21);
								}_chFunc(_node17);_$parent20.children.push(_node17);
							}_chFunc(_node15);_$parent18.children.push(_node15);
						}
					} else {
						_$temp = _node14;{
							var _$parent22 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 15 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 819962544;_node18.attrs["w-class"] = "tips";_$temp = _node18;{
								var _$parent23 = _$temp;_addText(it1.cfgData.tips[3], _$parent23);
							}_chFunc(_node18);_$parent22.children.push(_node18);
						}{
							var _$i = 0;
							for (var _iterator = it1.recordList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
								var _ref;

								if (_isArray) {
									if (_i >= _iterator.length) break;
									_ref = _iterator[_i++];
								} else {
									_i = _iterator.next();
									if (_i.done) break;
									_ref = _i.value;
								}

								var val = _ref;
								var ind = _$i++;_$temp = _node14;{
									var _$parent24 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 16 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 738844491;{
										var attrvalue = "";attrvalue += "goDetail(";attrvalue += ind;attrvalue += ")";_node19.attrs["on-tap"] = attrvalue;
									}_node19.attrHash = _hash.nextHash(_node19.attrHash, _calTextHash(_node19.attrs["on-tap"]));_$temp = _node19;{
										var _$parent25 = _$temp;var _node20 = { "attrs": {}, "tagName": "app-components-fourParaItem-fourParaItem", "sid": 17 };_node20.hasChild = false;_node20.child = null;_node20.attrHash = 0;_$temp = _node20;{
											var _$parent26 = _$temp;var _node21 = {}; //jpair pre

											_node21["name"] = it1.rtypeShow[val.rtype];
											//jpair suf
											//jpair pre

											_node21["data"] = val.amount + " " + val.ctypeShow;
											//jpair suf
											//jpair pre

											_node21["time"] = val.timeShow;
											//jpair suf
											//jpair pre

											_node21["describe"] = val.curNum + "/" + val.totalNum + it1.cfgData.tips[4];
											//jpair suf
											_addJson(_node21, _$parent26);
										}_chFunc(_node20);_$parent25.children.push(_node20);
									}_chFunc(_node19);_$parent24.children.push(_node19);
								}
							}
						}
					}if (it1.showMoreTips && it1.recordList.length > 0) {
						_$temp = _node14;{
							var _$parent27 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 18 };_node22.children = [];_node22.attrSize = 2;_node22.attrHash = 2710372230;_node22.attrs["w-class"] = "endMess";_node22.attrs["id"] = "more";_$temp = _node22;{
								var _$parent28 = _$temp;_addText(it1.cfgData.endMess, _$parent28);
							}_$temp = _node22;{
								var _$parent29 = _$temp;var _node23 = _installText("^_^", 2624223669);;
								_$parent29.children.push(_node23);
							}_chFunc(_node22);_$parent27.children.push(_node22);
						}
					}_chFunc(_node14);_$parent17.children.push(_node14);
				}_chFunc(_node8);_$parent8.children.push(_node8);
			}_chFunc(_node6);_$parent6.children.push(_node6);
		}_chFunc(_node);return _node;
	}
});