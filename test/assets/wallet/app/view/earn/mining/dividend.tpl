(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 4;_node.attrHash = 4174024071;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["ev-next-click"] = "goDetail";if (!it1.scroll) {
			_$temp = _node;{
				var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
					var _$parent3 = _$temp;var _node3 = {}; //jpair pre

					_node3["title"] = it1.cfgData.topBarTitle;
					//jpair suf
					//jpair pre

					{
						var jvalue = "";
						jvalue = "../../res/image/41_white.png";
						//jpair suf

						_node3["nextImg"] = jvalue;
					}
					//jpair pre

					{
						var _jvalue = "";
						_jvalue = "#F94E4D";
						//jpair suf

						_node3["background"] = _jvalue;
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
					//jpair pre

					{
						var _jvalue2 = "";
						_jvalue2 = "../../res/image/41_blue.png";
						//jpair suf

						_node5["nextImg"] = _jvalue2;
					}
					_addJson(_node5, _$parent5);
				}_chFunc(_node4);_$parent4.children.push(_node4);
			}
		}_$temp = _node;{
			var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 3 };_node6.children = [];_node6.attrSize = 3;_node6.attrHash = 3715383355;_node6.attrs["w-class"] = "content";_node6.attrs["id"] = "content";_node6.attrs["on-scroll"] = "pageScroll";_$temp = _node6;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 4 };_node7.children = [];_node7.childHash = 1476764524;_node7.attrSize = 1;_node7.attrHash = 2523531606;_node7.attrs["style"] = "text-align: center;position: fixed;width: 100%;top: 330px;";_$temp = _node7;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 5 };_node8.children = [];_node8.childHash = 0;_node8.attrSize = 2;_node8.attrHash = 2086402825;_node8.attrs["src"] = "../../../res/image/dividend_background.png";_node8.attrs["style"] = "width: 611px;height: 800px;";_$parent8.children.push(_node8);
				}_$parent7.children.push(_node7);
			}_$temp = _node6;{
				var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 3090186721;_node9.attrs["w-class"] = "groupcard";_$temp = _node9;{
					var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 1875170223;_node10.attrs["w-class"] = "dividend-title";_$temp = _node10;{
						var _$parent11 = _$temp;_addText(it1.cfgData.dividendTitle, _$parent11);
					}_chFunc(_node10);_$parent10.children.push(_node10);
				}_$temp = _node9;{
					var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 427216314;_node11.attrs["w-class"] = "dividend-money";_$temp = _node11;{
						var _$parent13 = _$temp;_addText(it1.totalDivid, _$parent13);
					}_chFunc(_node11);_$parent12.children.push(_node11);
				}_$temp = _node9;{
					var _$parent14 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.childHash = 2946814719;_node12.attrSize = 1;_node12.attrHash = 3144420239;_node12.attrs["w-class"] = "dividLine";_$parent14.children.push(_node12);
				}_$temp = _node9;{
					var _$parent15 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 10 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 2271325905;_node13.attrs["w-class"] = "dividend-sum";_$temp = _node13;{
						var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "span", "sid": 11 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 3608606104;_node14.attrs["style"] = "display: inline-block;vertical-align: middle;";_$temp = _node14;{
							var _$parent17 = _$temp;_addText(it1.cfgData.tips[0], _$parent17);
						}_$temp = _node14;{
							var _$parent18 = _$temp;var _node15 = _installText("&nbsp;", 1553561131);;
							_$parent18.children.push(_node15);
						}_$temp = _node14;{
							var _$parent19 = _$temp;_addText(it1.ktBalance, _$parent19);
						}_$temp = _node14;{
							var _$parent20 = _$temp;var _node16 = _installText("&nbsp;KT", 1397001297);;
							_$parent20.children.push(_node16);
						}_chFunc(_node14);_$parent16.children.push(_node14);
					}_chFunc(_node13);_$parent15.children.push(_node13);
				}_chFunc(_node9);_$parent9.children.push(_node9);
			}_$temp = _node6;{
				var _$parent21 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 12 };_node17.children = [];_node17.attrSize = 1;_node17.attrHash = 2511157203;_node17.attrs["style"] = "margin-top: 10px;transform: translateZ(-1px);";_$temp = _node17;{
					var _$parent22 = _$temp;var _node18 = { "attrs": {}, "tagName": "app-components-threeParaCard-threeParaCard", "sid": 13 };_node18.hasChild = false;_node18.child = null;_node18.attrHash = 0;_$temp = _node18;{
						var _$parent23 = _$temp;var _node19 = {}; //jpair pre

						_node19["name"] = it1.cfgData.threeCard;
						//jpair suf
						//jpair pre

						_$temp = _node19;{
							var _$parent24 = _$temp;_$temp = _node19;{
								var _$parent25 = _$temp;var _node20 = [];_node20[0] = it1.yearIncome;_node20[1] = it1.thisDivid;_node20[2] = it1.totalDays;_$parent25["data"] = _node20;
							}
							//jpair suf
						}_addJson(_node19, _$parent23);
					}_chFunc(_node18);_$parent22.children.push(_node18);
				}_chFunc(_node17);_$parent21.children.push(_node17);
			}_$temp = _node6;{
				var _$parent26 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 14 };_node21.children = [];_node21.attrSize = 2;_node21.attrHash = 558225676;_node21.attrs["id"] = "dividendBtn";_node21.attrs["style"] = "text-align: center;margin-top: 180px;height: 200px;";_$temp = _node21;{
					var _$parent27 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 15 };_node22.children = [];_node22.attrSize = 3;_node22.attrHash = 3827939633;_node22.attrs["w-class"] = "miningBtn";_node22.attrs["on-tap"] = "doMining";{
						var attrvalue = "";attrvalue += "color: #fff;animation:";attrvalue += it1.isAbleBtn ? 'dividendChange 0.2s' : '';attrvalue += "";_node22.attrs["style"] = attrvalue;
					}_node22.attrHash = _hash.nextHash(_node22.attrHash, _calTextHash(_node22.attrs["style"]));_$temp = _node22;{
						var _$parent28 = _$temp;_addText(it1.cfgData.btnName, _$parent28);
					}_chFunc(_node22);_$parent27.children.push(_node22);
				}_$temp = _node21;{
					var _$parent29 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 16 };_node23.children = [];_node23.attrSize = 2;_node23.attrHash = 4069970227;_node23.attrs["class"] = "dividendNum";{
						var _attrvalue = "";_attrvalue += "animation:";_attrvalue += it1.doMining ? 'dividendMove 1s' : '';_attrvalue += "";_node23.attrs["style"] = _attrvalue;
					}_node23.attrHash = _hash.nextHash(_node23.attrHash, _calTextHash(_node23.attrs["style"]));_$temp = _node23;{
						var _$parent30 = _$temp;var _node24 = { "attrs": {}, "tagName": "span", "sid": 17 };_node24.children = [];_node24.attrHash = 0;_$temp = _node24;{
							var _$parent31 = _$temp;var _node25 = _installText("+", 3807426999);;
							_$parent31.children.push(_node25);
						}_$temp = _node24;{
							var _$parent32 = _$temp;_addText(it1.thisDivid, _$parent32);
						}_chFunc(_node24);_$parent30.children.push(_node24);
					}_chFunc(_node23);_$parent29.children.push(_node23);
				}_chFunc(_node21);_$parent26.children.push(_node21);
			}_$temp = _node6;{
				var _$parent33 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 18 };_node26.children = [];_node26.attrSize = 1;_node26.attrHash = 840313844;_node26.attrs["w-class"] = "history";_$temp = _node26;{
					var _$parent34 = _$temp;var _node27 = { "attrs": {}, "tagName": "div", "sid": 19 };_node27.children = [];_node27.attrSize = 1;_node27.attrHash = 4046753769;_node27.attrs["w-class"] = "historyTitle";_$temp = _node27;{
						var _$parent35 = _$temp;_addText(it1.cfgData.history, _$parent35);
					}_chFunc(_node27);_$parent34.children.push(_node27);
				}if (it1.dividHistory.length == 0) {
					_$temp = _node26;{
						var _$parent36 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 20 };_node28.children = [];_node28.attrSize = 1;_node28.attrHash = 3809030542;_node28.attrs["w-class"] = "historyNone";_$temp = _node28;{
							var _$parent37 = _$temp;var _node29 = { "attrs": {}, "tagName": "img", "sid": 21 };_node29.children = [];_node29.childHash = 0;_node29.attrSize = 2;_node29.attrHash = 1093656218;_node29.attrs["src"] = "../../../res/image/dividend_history_none.png";_node29.attrs["style"] = "width: 200px;height: 200px;";_$parent37.children.push(_node29);
						}_$temp = _node28;{
							var _$parent38 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 22 };_node30.children = [];_node30.attrHash = 0;_$temp = _node30;{
								var _$parent39 = _$temp;_addText(it1.cfgData.tips[1], _$parent39);
							}_chFunc(_node30);_$parent38.children.push(_node30);
						}_chFunc(_node28);_$parent36.children.push(_node28);
					}
				}_$temp = _node26;{
					var _$parent40 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 23 };_node31.children = [];_node31.attrSize = 1;_node31.attrHash = 1389042152;_node31.attrs["w-class"] = "historyContent";{
						var _$i = 0;
						for (var _iterator = it1.dividHistory, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
							var ind = _$i++;_$temp = _node31;{
								var _$parent41 = _$temp;var _node32 = { "attrs": {}, "tagName": "div", "sid": 24 };_node32.children = [];_node32.attrSize = 1;_node32.attrHash = 574965062;_node32.attrs["w-class"] = "historyItem";_$temp = _node32;{
									var _$parent42 = _$temp;var _node33 = { "attrs": {}, "tagName": "span", "sid": 25 };_node33.children = [];_node33.attrSize = 1;_node33.attrHash = 3223011840;_node33.attrs["style"] = "flex: 1;";_$temp = _node33;{
										var _$parent43 = _$temp;_addText(val.time, _$parent43);
									}_chFunc(_node33);_$parent42.children.push(_node33);
								}_$temp = _node32;{
									var _$parent44 = _$temp;var _node34 = { "attrs": {}, "tagName": "span", "sid": 26 };_node34.children = [];_node34.attrHash = 0;_$temp = _node34;{
										var _$parent45 = _$temp;_addText(val.num + " ETH", _$parent45);
									}_chFunc(_node34);_$parent44.children.push(_node34);
								}_chFunc(_node32);_$parent41.children.push(_node32);
							}
						}
					}if (it1.dividHistory.length > 0) {
						_$temp = _node31;{
							var _$parent46 = _$temp;var _node35 = { "attrs": {}, "tagName": "div", "sid": 27 };_node35.children = [];_node35.attrSize = 1;_node35.attrHash = 3992589513;_node35.attrs["w-class"] = "endMess";_$temp = _node35;{
								var _$parent47 = _$temp;_addText(it1.cfgData.tips[2], _$parent47);
							}_$temp = _node35;{
								var _$parent48 = _$temp;var _node36 = _installText("^_^", 2624223669);;
								_$parent48.children.push(_node36);
							}_chFunc(_node35);_$parent46.children.push(_node35);
						}
					}_chFunc(_node31);_$parent40.children.push(_node31);
				}_chFunc(_node26);_$parent33.children.push(_node26);
			}_chFunc(_node6);_$parent6.children.push(_node6);
		}_chFunc(_node);return _node;
	}
});