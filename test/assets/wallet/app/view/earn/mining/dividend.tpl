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
			var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 3 };_node6.children = [];_node6.attrSize = 3;_node6.attrHash = 1985805996;_node6.attrs["w-class"] = "content";_node6.attrs["on-scroll"] = "getMoreList";_node6.attrs["id"] = "historylist";_$temp = _node6;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 4 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 3958668344;_node7.attrs["id"] = "history";_$temp = _node7;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.childHash = 1476764524;_node8.attrSize = 1;_node8.attrHash = 2523531606;_node8.attrs["style"] = "text-align: center;position: fixed;width: 100%;top: 330px;";_$temp = _node8;{
						var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "img", "sid": 6 };_node9.children = [];_node9.childHash = 0;_node9.attrSize = 2;_node9.attrHash = 2086402825;_node9.attrs["src"] = "../../../res/image/dividend_background.png";_node9.attrs["style"] = "width: 611px;height: 800px;";_$parent9.children.push(_node9);
					}_$parent8.children.push(_node8);
				}_$temp = _node7;{
					var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 3090186721;_node10.attrs["w-class"] = "groupcard";_$temp = _node10;{
						var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 1875170223;_node11.attrs["w-class"] = "dividend-title";_$temp = _node11;{
							var _$parent12 = _$temp;_addText(it1.cfgData.dividendTitle, _$parent12);
						}_chFunc(_node11);_$parent11.children.push(_node11);
					}_$temp = _node10;{
						var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 427216314;_node12.attrs["w-class"] = "dividend-money";_$temp = _node12;{
							var _$parent14 = _$temp;_addText(it1.totalDivid, _$parent14);
						}_chFunc(_node12);_$parent13.children.push(_node12);
					}_$temp = _node10;{
						var _$parent15 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 10 };_node13.children = [];_node13.childHash = 2946814719;_node13.attrSize = 1;_node13.attrHash = 3144420239;_node13.attrs["w-class"] = "dividLine";_$parent15.children.push(_node13);
					}_$temp = _node10;{
						var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 11 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 2271325905;_node14.attrs["w-class"] = "dividend-sum";_$temp = _node14;{
							var _$parent17 = _$temp;var _node15 = { "attrs": {}, "tagName": "span", "sid": 12 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 3608606104;_node15.attrs["style"] = "display: inline-block;vertical-align: middle;";_$temp = _node15;{
								var _$parent18 = _$temp;_addText(it1.cfgData.tips[0], _$parent18);
							}_$temp = _node15;{
								var _$parent19 = _$temp;var _node16 = _installText("&nbsp;", 1553561131);;
								_$parent19.children.push(_node16);
							}_$temp = _node15;{
								var _$parent20 = _$temp;_addText(it1.ktBalance, _$parent20);
							}_$temp = _node15;{
								var _$parent21 = _$temp;var _node17 = _installText("&nbsp;KT", 1397001297);;
								_$parent21.children.push(_node17);
							}_chFunc(_node15);_$parent17.children.push(_node15);
						}_chFunc(_node14);_$parent16.children.push(_node14);
					}_chFunc(_node10);_$parent10.children.push(_node10);
				}_$temp = _node7;{
					var _$parent22 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 13 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 2511157203;_node18.attrs["style"] = "margin-top: 10px;transform: translateZ(-1px);";_$temp = _node18;{
						var _$parent23 = _$temp;var _node19 = { "attrs": {}, "tagName": "app-components-threeParaCard-threeParaCard", "sid": 14 };_node19.hasChild = false;_node19.child = null;_node19.attrHash = 0;_$temp = _node19;{
							var _$parent24 = _$temp;var _node20 = {}; //jpair pre

							_node20["name"] = it1.cfgData.threeCard;
							//jpair suf
							//jpair pre

							_$temp = _node20;{
								var _$parent25 = _$temp;_$temp = _node20;{
									var _$parent26 = _$temp;var _node21 = [];_node21[0] = it1.yearIncome;_node21[1] = it1.thisDivid;_node21[2] = it1.totalDays;_$parent26["data"] = _node21;
								}
								//jpair suf
							}_addJson(_node20, _$parent24);
						}_chFunc(_node19);_$parent23.children.push(_node19);
					}_chFunc(_node18);_$parent22.children.push(_node18);
				}_$temp = _node7;{
					var _$parent27 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 15 };_node22.children = [];_node22.attrSize = 2;_node22.attrHash = 558225676;_node22.attrs["id"] = "dividendBtn";_node22.attrs["style"] = "text-align: center;margin-top: 180px;height: 200px;";_$temp = _node22;{
						var _$parent28 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 16 };_node23.children = [];_node23.attrSize = 3;_node23.attrHash = 3827939633;_node23.attrs["w-class"] = "miningBtn";_node23.attrs["on-tap"] = "doMining";{
							var attrvalue = "";attrvalue += "color: #fff;animation:";attrvalue += it1.isAbleBtn ? 'dividendChange 0.2s' : '';attrvalue += "";_node23.attrs["style"] = attrvalue;
						}_node23.attrHash = _hash.nextHash(_node23.attrHash, _calTextHash(_node23.attrs["style"]));_$temp = _node23;{
							var _$parent29 = _$temp;_addText(it1.cfgData.btnName, _$parent29);
						}_chFunc(_node23);_$parent28.children.push(_node23);
					}_$temp = _node22;{
						var _$parent30 = _$temp;var _node24 = { "attrs": {}, "tagName": "div", "sid": 17 };_node24.children = [];_node24.attrSize = 2;_node24.attrHash = 4069970227;_node24.attrs["class"] = "dividendNum";{
							var _attrvalue = "";_attrvalue += "animation:";_attrvalue += it1.doMining ? 'dividendMove 1s' : '';_attrvalue += "";_node24.attrs["style"] = _attrvalue;
						}_node24.attrHash = _hash.nextHash(_node24.attrHash, _calTextHash(_node24.attrs["style"]));_$temp = _node24;{
							var _$parent31 = _$temp;var _node25 = { "attrs": {}, "tagName": "span", "sid": 18 };_node25.children = [];_node25.attrHash = 0;_$temp = _node25;{
								var _$parent32 = _$temp;var _node26 = _installText("+", 3807426999);;
								_$parent32.children.push(_node26);
							}_$temp = _node25;{
								var _$parent33 = _$temp;_addText(it1.thisDivid, _$parent33);
							}_chFunc(_node25);_$parent31.children.push(_node25);
						}_chFunc(_node24);_$parent30.children.push(_node24);
					}_chFunc(_node22);_$parent27.children.push(_node22);
				}_$temp = _node7;{
					var _$parent34 = _$temp;var _node27 = { "attrs": {}, "tagName": "div", "sid": 19 };_node27.children = [];_node27.attrSize = 1;_node27.attrHash = 840313844;_node27.attrs["w-class"] = "history";_$temp = _node27;{
						var _$parent35 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 20 };_node28.children = [];_node28.attrSize = 1;_node28.attrHash = 4046753769;_node28.attrs["w-class"] = "historyTitle";_$temp = _node28;{
							var _$parent36 = _$temp;_addText(it1.cfgData.history, _$parent36);
						}_chFunc(_node28);_$parent35.children.push(_node28);
					}if (it1.data.length == 0) {
						_$temp = _node27;{
							var _$parent37 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 21 };_node29.children = [];_node29.attrSize = 1;_node29.attrHash = 3809030542;_node29.attrs["w-class"] = "historyNone";_$temp = _node29;{
								var _$parent38 = _$temp;var _node30 = { "attrs": {}, "tagName": "img", "sid": 22 };_node30.children = [];_node30.childHash = 0;_node30.attrSize = 2;_node30.attrHash = 1093656218;_node30.attrs["src"] = "../../../res/image/dividend_history_none.png";_node30.attrs["style"] = "width: 200px;height: 200px;";_$parent38.children.push(_node30);
							}_$temp = _node29;{
								var _$parent39 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 23 };_node31.children = [];_node31.attrHash = 0;_$temp = _node31;{
									var _$parent40 = _$temp;_addText(it1.cfgData.tips[1], _$parent40);
								}_chFunc(_node31);_$parent39.children.push(_node31);
							}_chFunc(_node29);_$parent37.children.push(_node29);
						}
					}_$temp = _node27;{
						var _$parent41 = _$temp;var _node32 = { "attrs": {}, "tagName": "div", "sid": 24 };_node32.children = [];_node32.attrSize = 1;_node32.attrHash = 1389042152;_node32.attrs["w-class"] = "historyContent";{
							var _$i = 0;
							for (var _iterator = it1.data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
								var ind = _$i++;_$temp = _node32;{
									var _$parent42 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 25 };_node33.children = [];_node33.attrSize = 1;_node33.attrHash = 574965062;_node33.attrs["w-class"] = "historyItem";_$temp = _node33;{
										var _$parent43 = _$temp;var _node34 = { "attrs": {}, "tagName": "span", "sid": 26 };_node34.children = [];_node34.attrSize = 1;_node34.attrHash = 3223011840;_node34.attrs["style"] = "flex: 1;";_$temp = _node34;{
											var _$parent44 = _$temp;_addText(val.time, _$parent44);
										}_chFunc(_node34);_$parent43.children.push(_node34);
									}_$temp = _node33;{
										var _$parent45 = _$temp;var _node35 = { "attrs": {}, "tagName": "span", "sid": 27 };_node35.children = [];_node35.attrHash = 0;_$temp = _node35;{
											var _$parent46 = _$temp;_addText(val.num + " ETH", _$parent46);
										}_chFunc(_node35);_$parent45.children.push(_node35);
									}_chFunc(_node33);_$parent42.children.push(_node33);
								}
							}
						}if (it1.data.length > 0 && !it1.hasMore) {
							_$temp = _node32;{
								var _$parent47 = _$temp;var _node36 = { "attrs": {}, "tagName": "div", "sid": 28 };_node36.children = [];_node36.attrSize = 1;_node36.attrHash = 3992589513;_node36.attrs["w-class"] = "endMess";_$temp = _node36;{
									var _$parent48 = _$temp;_addText(it1.cfgData.tips[2], _$parent48);
								}_$temp = _node36;{
									var _$parent49 = _$temp;var _node37 = _installText("^_^", 2624223669);;
									_$parent49.children.push(_node37);
								}_chFunc(_node36);_$parent47.children.push(_node36);
							}
						}_chFunc(_node32);_$parent41.children.push(_node32);
					}_chFunc(_node27);_$parent34.children.push(_node27);
				}_chFunc(_node7);_$parent7.children.push(_node7);
			}_chFunc(_node6);_$parent6.children.push(_node6);
		}_chFunc(_node);return _node;
	}
});