(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 4;_node.attrHash = 3424737235;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["ev-refresh-click"] = "refreshPage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3673846548;_node2.attrs["w-class"] = "top-head";topBarTitle = { "zh_Hans": it.currencyName, "zh_Hant": it.currencyName, "en": "" };_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["title"] = topBarTitle;
					//jpair suf
					//jpair pre

					{
						var jvalue = "";
						jvalue = "linear-gradient(to right,#38CFE7,#318DE6)";
						//jpair suf

						_node4["background"] = jvalue;
					}
					//jpair pre

					{
						var _jvalue = "";
						_jvalue = "../../res/image1/refresh_white.png";
						//jpair suf

						_node4["refreshImg"] = _jvalue;
					}
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 253915434;_node5.attrs["w-class"] = "head2";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 3203423573;_node6.attrs["w-class"] = "head2-left";_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "span", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 1349797565;_node7.attrs["w-class"] = "balance";_$temp = _node7;{
							var _$parent8 = _$temp;_addText(it.balance % 1 === 0 ? it.balance.toFixed(2) : it.balance, _$parent8);
						}_chFunc(_node7);_$parent7.children.push(_node7);
					}_$temp = _node6;{
						var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "span", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 1532757002;_node8.attrs["w-class"] = "balance-value";_$temp = _node8;{
							var _$parent10 = _$temp;_addText(it.currencyUnitSymbol, _$parent10);
						}_$temp = _node8;{
							var _$parent11 = _$temp;_addText(it.balanceValue, _$parent11);
						}_chFunc(_node8);_$parent9.children.push(_node8);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent12 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.childHash = 278137322;_node9.attrSize = 1;_node9.attrHash = 3242123177;_node9.attrs["w-class"] = "head2-right";_$temp = _node9;{
						var _$parent13 = _$temp;var _node10 = { "attrs": {}, "tagName": "span", "sid": 8 };_node10.children = [];_node10.childHash = 3643116667;_node10.attrSize = 2;_node10.attrHash = 1878417502;_node10.attrs["w-class"] = "btn";_node10.attrs["on-tap"] = "rechargeClick";_$temp = _node10;{
							var _$parent14 = _$temp;var _node11 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 9 };_node11.hasChild = false;_node11.child = null;_node11.childHash = 2730619205;_node11.attrHash = 0;_$temp = _node11;{
								var _$parent15 = _$temp;var _node12 = {}; //jpair pre

								{
									var _jvalue2 = "";
									_jvalue2 = "去充值";
									//jpair suf

									_node12["zh_Hans"] = _jvalue2;
								}
								//jpair pre

								{
									var _jvalue3 = "";
									_jvalue3 = "去充值";
									//jpair suf

									_node12["zh_Hant"] = _jvalue3;
								}
								//jpair pre

								{
									var _jvalue4 = "";
									_jvalue4 = "";
									//jpair suf

									_node12["en"] = _jvalue4;
								}
								_addJson(_node12, _$parent15);
							}_$parent14.children.push(_node11);
						}_$parent13.children.push(_node10);
					}_$parent12.children.push(_node9);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node2;{
				var _$parent16 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 10 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 4105260532;_node13.attrs["w-class"] = "nav-wrap";_$temp = _node13;{
					var _$parent17 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 11 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 1940417547;_node14.attrs["w-class"] = "nav";{
						var _$i = 0;
						for (var _iterator = it.tabs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
							var _ref;

							if (_isArray) {
								if (_i >= _iterator.length) break;
								_ref = _iterator[_i++];
							} else {
								_i = _iterator.next();
								if (_i.done) break;
								_ref = _i.value;
							}

							var v = _ref;
							var i = _$i++;var isActive = i === it.activeNum;_$temp = _node14;{
								var _$parent18 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 12 };_node15.children = [];_node15.attrSize = 2;_node15.attrHash = 1235456931;{
									var attrvalue = "";attrvalue += "nav-item ";attrvalue += isActive ? 'is-active' : '';attrvalue += "";_node15.attrs["w-class"] = attrvalue;
								}_node15.attrHash = _hash.nextHash(_node15.attrHash, _calTextHash(_node15.attrs["w-class"]));{
									var _attrvalue = "";_attrvalue += "tabsChangeClick(e,";_attrvalue += i;_attrvalue += ")";_node15.attrs["on-tap"] = _attrvalue;
								}_node15.attrHash = _hash.nextHash(_node15.attrHash, _calTextHash(_node15.attrs["on-tap"]));_$temp = _node15;{
									var _$parent19 = _$temp;var _node16 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 13 };_node16.hasChild = false;_node16.child = null;_node16.attrHash = 0;_$temp = _node16;{
										var _$parent20 = _$temp;_addJson(v.tab, _$parent20);
									}_chFunc(_node16);_$parent19.children.push(_node16);
								}_chFunc(_node15);_$parent18.children.push(_node15);
							}
						}
					}_chFunc(_node14);_$parent17.children.push(_node14);
				}_chFunc(_node13);_$parent16.children.push(_node13);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent21 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 14 };_node17.children = [];_node17.attrSize = 1;_node17.attrHash = 915048845;_node17.attrs["w-class"] = "show-container";_$temp = _node17;{
				var _$parent22 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 15 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 2438851802;_node18.attrs["w-class"] = "quotes";_$temp = _node18;{
					var _$parent23 = _$temp;var _node19 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 16 };_node19.hasChild = false;_node19.child = null;_node19.childHash = 2620983896;_node19.attrHash = 0;_$temp = _node19;{
						var _$parent24 = _$temp;var _node20 = {}; //jpair pre

						{
							var _jvalue5 = "";
							_jvalue5 = "行情";
							//jpair suf

							_node20["zh_Hans"] = _jvalue5;
						}
						//jpair pre

						{
							var _jvalue6 = "";
							_jvalue6 = "行情";
							//jpair suf

							_node20["zh_Hant"] = _jvalue6;
						}
						//jpair pre

						{
							var _jvalue7 = "";
							_jvalue7 = "";
							//jpair suf

							_node20["en"] = _jvalue7;
						}
						_addJson(_node20, _$parent24);
					}_$parent23.children.push(_node19);
				}_$temp = _node18;{
					var _$parent25 = _$temp;var _node21 = _installText("&nbsp;", 1553561131);;
					_$parent25.children.push(_node21);
				}_$temp = _node18;{
					var _$parent26 = _$temp;_addText(it.currencyUnitSymbol, _$parent26);
				}_$temp = _node18;{
					var _$parent27 = _$temp;_addText(it.rate, _$parent27);
				}_$temp = _node18;{
					var _$parent28 = _$temp;var _node22 = _installText("/", 883865250);;
					_$parent28.children.push(_node22);
				}_$temp = _node18;{
					var _$parent29 = _$temp;_addText(it.currencyName, _$parent29);
				}_chFunc(_node18);_$parent22.children.push(_node18);
			}if (it.redUp) {
				_$temp = _node17;{
					var _$parent30 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 17 };_node23.children = [];_node23.attrSize = 1;_node23.attrHash = 2255571891;{
						var _attrvalue2 = "";_attrvalue2 += it.gain >= 0 ? 'up' : 'down';_attrvalue2 += "";_node23.attrs["w-class"] = _attrvalue2;
					}_node23.attrHash = _hash.nextHash(_node23.attrHash, _calTextHash(_node23.attrs["w-class"]));_$temp = _node23;{
						var _$parent31 = _$temp;var _node24 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 18 };_node24.hasChild = false;_node24.child = null;_node24.childHash = 1558011476;_node24.attrHash = 0;_$temp = _node24;{
							var _$parent32 = _$temp;var _node25 = {}; //jpair pre

							{
								var _jvalue8 = "";
								_jvalue8 = "今日";
								//jpair suf

								_node25["zh_Hans"] = _jvalue8;
							}
							//jpair pre

							{
								var _jvalue9 = "";
								_jvalue9 = "今日";
								//jpair suf

								_node25["zh_Hant"] = _jvalue9;
							}
							//jpair pre

							{
								var _jvalue10 = "";
								_jvalue10 = "";
								//jpair suf

								_node25["en"] = _jvalue10;
							}
							_addJson(_node25, _$parent32);
						}_$parent31.children.push(_node24);
					}_$temp = _node23;{
						var _$parent33 = _$temp;var _node26 = _installText("&nbsp;", 1553561131);;
						_$parent33.children.push(_node26);
					}_$temp = _node23;{
						var _$parent34 = _$temp;_addText(it.gain >= 0 ? '+' : '', _$parent34);
					}_$temp = _node23;{
						var _$parent35 = _$temp;_addText(it.gain, _$parent35);
					}_$temp = _node23;{
						var _$parent36 = _$temp;var _node27 = _installText("%", 4257547020);;
						_$parent36.children.push(_node27);
					}_chFunc(_node23);_$parent30.children.push(_node23);
				}
			} else {
				_$temp = _node17;{
					var _$parent37 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 19 };_node28.children = [];_node28.attrSize = 1;_node28.attrHash = 2255571891;{
						var _attrvalue3 = "";_attrvalue3 += it.gain >= 0 ? 'down' : 'up';_attrvalue3 += "";_node28.attrs["w-class"] = _attrvalue3;
					}_node28.attrHash = _hash.nextHash(_node28.attrHash, _calTextHash(_node28.attrs["w-class"]));_$temp = _node28;{
						var _$parent38 = _$temp;var _node29 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 20 };_node29.hasChild = false;_node29.child = null;_node29.childHash = 1558011476;_node29.attrHash = 0;_$temp = _node29;{
							var _$parent39 = _$temp;var _node30 = {}; //jpair pre

							{
								var _jvalue11 = "";
								_jvalue11 = "今日";
								//jpair suf

								_node30["zh_Hans"] = _jvalue11;
							}
							//jpair pre

							{
								var _jvalue12 = "";
								_jvalue12 = "今日";
								//jpair suf

								_node30["zh_Hant"] = _jvalue12;
							}
							//jpair pre

							{
								var _jvalue13 = "";
								_jvalue13 = "";
								//jpair suf

								_node30["en"] = _jvalue13;
							}
							_addJson(_node30, _$parent39);
						}_$parent38.children.push(_node29);
					}_$temp = _node28;{
						var _$parent40 = _$temp;var _node31 = _installText("&nbsp;", 1553561131);;
						_$parent40.children.push(_node31);
					}_$temp = _node28;{
						var _$parent41 = _$temp;_addText(it.gain >= 0 ? '+' : '', _$parent41);
					}_$temp = _node28;{
						var _$parent42 = _$temp;_addText(it.gain, _$parent42);
					}_$temp = _node28;{
						var _$parent43 = _$temp;var _node32 = _installText("%", 4257547020);;
						_$parent43.children.push(_node32);
					}_chFunc(_node28);_$parent37.children.push(_node28);
				}
			}_chFunc(_node17);_$parent21.children.push(_node17);
		}_$temp = _node;{
			var _$parent44 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 21 };_node33.children = [];_node33.attrSize = 1;_node33.attrHash = 4252679546;_node33.attrs["w-class"] = "body";{
				var _$i2 = 0;
				for (var _iterator2 = it.tabs, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
					var _ref2;

					if (_isArray2) {
						if (_i2 >= _iterator2.length) break;
						_ref2 = _iterator2[_i2++];
					} else {
						_i2 = _iterator2.next();
						if (_i2.done) break;
						_ref2 = _i2.value;
					}

					var _v = _ref2;
					var _i3 = _$i2++;var _isActive = _i3 === it.activeNum;_$temp = _node33;{
						var _$parent45 = _$temp;var _node34 = { "attrs": {}, "tagName": "widget", "sid": 22 };_node34.hasChild = false;_node34.child = null;_node34.attrSize = 1;_node34.attrHash = 543012080;{
							var _attrvalue4 = "";_attrvalue4 = _v.components;_node34.attrs["w-tag"] = _attrvalue4;
						}_node34.attrHash = _hash.nextHash(_node34.attrHash, _calTextHash(_node34.attrs["w-tag"]));_node34.tagName = _node34.attrs["w-tag"];{
							var _attrvalue5 = "";_attrvalue5 += "visibility: ";_attrvalue5 += _isActive ? 'visible' : 'hidden';_attrvalue5 += "; z-index:";_attrvalue5 += _isActive ? 0 : -1;_attrvalue5 += ";  width:100%;height: 100%;";_node34.attrs["style"] = _attrvalue5;
						}_node34.attrHash = _hash.nextHash(_node34.attrHash, _calTextHash(_node34.attrs["style"]));_$temp = _node34;{
							var _$parent46 = _$temp;var _node35 = {}; //jpair pre

							_node35["isActive"] = _isActive;
							//jpair suf
							//jpair pre

							_node35["currencyName"] = it.currencyName;
							//jpair suf
							_addJson(_node35, _$parent46);
						}_chFunc(_node34);_$parent45.children.push(_node34);
					}
				}
			}_chFunc(_node33);_$parent44.children.push(_node33);
		}_chFunc(_node);return _node;
	}
});