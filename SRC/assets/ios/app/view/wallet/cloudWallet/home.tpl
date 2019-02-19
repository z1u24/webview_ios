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
					var _$parent12 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 3242123177;_node9.attrs["w-class"] = "head2-right";if (it.currencyName !== 'ST') {
						_$temp = _node9;{
							var _$parent13 = _$temp;var _node10 = { "attrs": {}, "tagName": "span", "sid": 8 };_node10.children = [];_node10.childHash = 4203235553;_node10.attrSize = 2;_node10.attrHash = 1878417502;_node10.attrs["w-class"] = "btn";_node10.attrs["on-tap"] = "rechargeClick";_$temp = _node10;{
								var _$parent14 = _$temp;var _node11 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 9 };_node11.hasChild = false;_node11.child = null;_node11.childHash = 1620279894;_node11.attrHash = 0;_$temp = _node11;{
									var _$parent15 = _$temp;var _node12 = {}; //jpair pre

									{
										var _jvalue2 = "";
										_jvalue2 = "充值";
										//jpair suf

										_node12["zh_Hans"] = _jvalue2;
									}
									//jpair pre

									{
										var _jvalue3 = "";
										_jvalue3 = "充值";
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
						}_$temp = _node9;{
							var _$parent16 = _$temp;var _node13 = { "attrs": {}, "tagName": "span", "sid": 10 };_node13.children = [];_node13.childHash = 1947506434;_node13.attrSize = 2;_node13.attrHash = 2981695675;_node13.attrs["w-class"] = "btn btn-withdraw";_node13.attrs["on-tap"] = "withdrawClick";_$temp = _node13;{
								var _$parent17 = _$temp;var _node14 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 11 };_node14.hasChild = false;_node14.child = null;_node14.childHash = 3582938198;_node14.attrHash = 0;_$temp = _node14;{
									var _$parent18 = _$temp;var _node15 = {}; //jpair pre

									{
										var _jvalue5 = "";
										_jvalue5 = "提币";
										//jpair suf

										_node15["zh_Hans"] = _jvalue5;
									}
									//jpair pre

									{
										var _jvalue6 = "";
										_jvalue6 = "提幣";
										//jpair suf

										_node15["zh_Hant"] = _jvalue6;
									}
									//jpair pre

									{
										var _jvalue7 = "";
										_jvalue7 = "";
										//jpair suf

										_node15["en"] = _jvalue7;
									}
									_addJson(_node15, _$parent18);
								}_$parent17.children.push(_node14);
							}_$parent16.children.push(_node13);
						}
					} else {
						_$temp = _node9;{
							var _$parent19 = _$temp;var _node16 = { "attrs": {}, "tagName": "span", "sid": 12 };_node16.children = [];_node16.childHash = 3643116667;_node16.attrSize = 2;_node16.attrHash = 1878417502;_node16.attrs["w-class"] = "btn";_node16.attrs["on-tap"] = "rechargeClick";_$temp = _node16;{
								var _$parent20 = _$temp;var _node17 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 13 };_node17.hasChild = false;_node17.child = null;_node17.childHash = 2730619205;_node17.attrHash = 0;_$temp = _node17;{
									var _$parent21 = _$temp;var _node18 = {}; //jpair pre

									{
										var _jvalue8 = "";
										_jvalue8 = "去充值";
										//jpair suf

										_node18["zh_Hans"] = _jvalue8;
									}
									//jpair pre

									{
										var _jvalue9 = "";
										_jvalue9 = "去充值";
										//jpair suf

										_node18["zh_Hant"] = _jvalue9;
									}
									//jpair pre

									{
										var _jvalue10 = "";
										_jvalue10 = "";
										//jpair suf

										_node18["en"] = _jvalue10;
									}
									_addJson(_node18, _$parent21);
								}_$parent20.children.push(_node17);
							}_$parent19.children.push(_node16);
						}
					}_chFunc(_node9);_$parent12.children.push(_node9);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node2;{
				var _$parent22 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 14 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 4105260532;_node19.attrs["w-class"] = "nav-wrap";_$temp = _node19;{
					var _$parent23 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 15 };_node20.children = [];_node20.attrSize = 1;_node20.attrHash = 1940417547;_node20.attrs["w-class"] = "nav";{
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
							var i = _$i++;var isActive = i === it.activeNum;_$temp = _node20;{
								var _$parent24 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 16 };_node21.children = [];_node21.attrSize = 2;_node21.attrHash = 1235456931;{
									var attrvalue = "";attrvalue += "nav-item ";attrvalue += isActive ? 'is-active' : '';attrvalue += "";_node21.attrs["w-class"] = attrvalue;
								}_node21.attrHash = _hash.nextHash(_node21.attrHash, _calTextHash(_node21.attrs["w-class"]));{
									var _attrvalue = "";_attrvalue += "tabsChangeClick(e,";_attrvalue += i;_attrvalue += ")";_node21.attrs["on-tap"] = _attrvalue;
								}_node21.attrHash = _hash.nextHash(_node21.attrHash, _calTextHash(_node21.attrs["on-tap"]));_$temp = _node21;{
									var _$parent25 = _$temp;_addText(v.tab, _$parent25);
								}_chFunc(_node21);_$parent24.children.push(_node21);
							}
						}
					}_chFunc(_node20);_$parent23.children.push(_node20);
				}_chFunc(_node19);_$parent22.children.push(_node19);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent26 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 17 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 915048845;_node22.attrs["w-class"] = "show-container";_$temp = _node22;{
				var _$parent27 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 18 };_node23.children = [];_node23.attrSize = 1;_node23.attrHash = 2438851802;_node23.attrs["w-class"] = "quotes";_$temp = _node23;{
					var _$parent28 = _$temp;var _node24 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 19 };_node24.hasChild = false;_node24.child = null;_node24.childHash = 2620983896;_node24.attrHash = 0;_$temp = _node24;{
						var _$parent29 = _$temp;var _node25 = {}; //jpair pre

						{
							var _jvalue11 = "";
							_jvalue11 = "行情";
							//jpair suf

							_node25["zh_Hans"] = _jvalue11;
						}
						//jpair pre

						{
							var _jvalue12 = "";
							_jvalue12 = "行情";
							//jpair suf

							_node25["zh_Hant"] = _jvalue12;
						}
						//jpair pre

						{
							var _jvalue13 = "";
							_jvalue13 = "";
							//jpair suf

							_node25["en"] = _jvalue13;
						}
						_addJson(_node25, _$parent29);
					}_$parent28.children.push(_node24);
				}_$temp = _node23;{
					var _$parent30 = _$temp;var _node26 = _installText("&nbsp;", 1553561131);;
					_$parent30.children.push(_node26);
				}_$temp = _node23;{
					var _$parent31 = _$temp;_addText(it.currencyUnitSymbol, _$parent31);
				}_$temp = _node23;{
					var _$parent32 = _$temp;_addText(it.rate, _$parent32);
				}_$temp = _node23;{
					var _$parent33 = _$temp;var _node27 = _installText("/", 883865250);;
					_$parent33.children.push(_node27);
				}_$temp = _node23;{
					var _$parent34 = _$temp;_addText(it.currencyName, _$parent34);
				}_chFunc(_node23);_$parent27.children.push(_node23);
			}if (it.redUp) {
				_$temp = _node22;{
					var _$parent35 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 20 };_node28.children = [];_node28.attrSize = 1;_node28.attrHash = 2255571891;{
						var _attrvalue2 = "";_attrvalue2 += it.gain >= 0 ? 'up' : 'down';_attrvalue2 += "";_node28.attrs["w-class"] = _attrvalue2;
					}_node28.attrHash = _hash.nextHash(_node28.attrHash, _calTextHash(_node28.attrs["w-class"]));_$temp = _node28;{
						var _$parent36 = _$temp;var _node29 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 21 };_node29.hasChild = false;_node29.child = null;_node29.childHash = 1558011476;_node29.attrHash = 0;_$temp = _node29;{
							var _$parent37 = _$temp;var _node30 = {}; //jpair pre

							{
								var _jvalue14 = "";
								_jvalue14 = "今日";
								//jpair suf

								_node30["zh_Hans"] = _jvalue14;
							}
							//jpair pre

							{
								var _jvalue15 = "";
								_jvalue15 = "今日";
								//jpair suf

								_node30["zh_Hant"] = _jvalue15;
							}
							//jpair pre

							{
								var _jvalue16 = "";
								_jvalue16 = "";
								//jpair suf

								_node30["en"] = _jvalue16;
							}
							_addJson(_node30, _$parent37);
						}_$parent36.children.push(_node29);
					}_$temp = _node28;{
						var _$parent38 = _$temp;var _node31 = _installText("&nbsp;", 1553561131);;
						_$parent38.children.push(_node31);
					}_$temp = _node28;{
						var _$parent39 = _$temp;_addText(it.gain >= 0 ? '+' : '', _$parent39);
					}_$temp = _node28;{
						var _$parent40 = _$temp;_addText(it.gain, _$parent40);
					}_$temp = _node28;{
						var _$parent41 = _$temp;var _node32 = _installText("%", 4257547020);;
						_$parent41.children.push(_node32);
					}_chFunc(_node28);_$parent35.children.push(_node28);
				}
			} else {
				_$temp = _node22;{
					var _$parent42 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 22 };_node33.children = [];_node33.attrSize = 1;_node33.attrHash = 2255571891;{
						var _attrvalue3 = "";_attrvalue3 += it.gain >= 0 ? 'down' : 'up';_attrvalue3 += "";_node33.attrs["w-class"] = _attrvalue3;
					}_node33.attrHash = _hash.nextHash(_node33.attrHash, _calTextHash(_node33.attrs["w-class"]));_$temp = _node33;{
						var _$parent43 = _$temp;var _node34 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 23 };_node34.hasChild = false;_node34.child = null;_node34.childHash = 1558011476;_node34.attrHash = 0;_$temp = _node34;{
							var _$parent44 = _$temp;var _node35 = {}; //jpair pre

							{
								var _jvalue17 = "";
								_jvalue17 = "今日";
								//jpair suf

								_node35["zh_Hans"] = _jvalue17;
							}
							//jpair pre

							{
								var _jvalue18 = "";
								_jvalue18 = "今日";
								//jpair suf

								_node35["zh_Hant"] = _jvalue18;
							}
							//jpair pre

							{
								var _jvalue19 = "";
								_jvalue19 = "";
								//jpair suf

								_node35["en"] = _jvalue19;
							}
							_addJson(_node35, _$parent44);
						}_$parent43.children.push(_node34);
					}_$temp = _node33;{
						var _$parent45 = _$temp;var _node36 = _installText("&nbsp;", 1553561131);;
						_$parent45.children.push(_node36);
					}_$temp = _node33;{
						var _$parent46 = _$temp;_addText(it.gain >= 0 ? '+' : '', _$parent46);
					}_$temp = _node33;{
						var _$parent47 = _$temp;_addText(it.gain, _$parent47);
					}_$temp = _node33;{
						var _$parent48 = _$temp;var _node37 = _installText("%", 4257547020);;
						_$parent48.children.push(_node37);
					}_chFunc(_node33);_$parent42.children.push(_node33);
				}
			}_chFunc(_node22);_$parent26.children.push(_node22);
		}_$temp = _node;{
			var _$parent49 = _$temp;var _node38 = { "attrs": {}, "tagName": "div", "sid": 24 };_node38.children = [];_node38.attrSize = 1;_node38.attrHash = 4252679546;_node38.attrs["w-class"] = "body";{
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
					var _i3 = _$i2++;var _isActive = _i3 === it.activeNum;_$temp = _node38;{
						var _$parent50 = _$temp;var _node39 = { "attrs": {}, "tagName": "widget", "sid": 25 };_node39.hasChild = false;_node39.child = null;_node39.attrSize = 1;_node39.attrHash = 543012080;{
							var _attrvalue4 = "";_attrvalue4 = _v.components;_node39.attrs["w-tag"] = _attrvalue4;
						}_node39.attrHash = _hash.nextHash(_node39.attrHash, _calTextHash(_node39.attrs["w-tag"]));_node39.tagName = _node39.attrs["w-tag"];{
							var _attrvalue5 = "";_attrvalue5 += "visibility: ";_attrvalue5 += _isActive ? 'visible' : 'hidden';_attrvalue5 += "; z-index:";_attrvalue5 += _isActive ? 0 : -1;_attrvalue5 += ";  width:100%;height: 100%;";_node39.attrs["style"] = _attrvalue5;
						}_node39.attrHash = _hash.nextHash(_node39.attrHash, _calTextHash(_node39.attrs["style"]));_$temp = _node39;{
							var _$parent51 = _$temp;var _node40 = {}; //jpair pre

							_node40["isActive"] = _isActive;
							//jpair suf
							//jpair pre

							_node40["currencyName"] = it.currencyName;
							//jpair suf
							_addJson(_node40, _$parent51);
						}_chFunc(_node39);_$parent50.children.push(_node39);
					}
				}
			}_chFunc(_node38);_$parent49.children.push(_node38);
		}_chFunc(_node);return _node;
	}
});