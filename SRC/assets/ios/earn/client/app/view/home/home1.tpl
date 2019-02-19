(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 1066778296;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-refresh-click"] = "refreshPage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "earn-client-app-view-activity-miningHome", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 2946814719;_node2.attrHash = 0;_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 2;_node3.attrHash = 572709611;_node3.attrs["w-class"] = "top-animate-container";{
				var attrvalue = "";attrvalue += it.upAnimate;attrvalue += "";_node3.attrs["class"] = attrvalue;
			}_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["class"]));_$temp = _node3;{
				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 1715108825;_node4.attrs["w-class"] = "topbar-container";_$temp = _node4;{
					var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "app-components1-topBar-topBar1", "sid": 4 };_node5.hasChild = false;_node5.child = null;_node5.attrHash = 0;_$temp = _node5;{
						var _$parent6 = _$temp;var _node6 = {}; //jpair pre

						_node6["avatar"] = it.avatar;
						//jpair suf
						//jpair pre

						_node6["scrollHeight"] = 0;
						//jpair suf
						_addJson(_node6, _$parent6);
					}_chFunc(_node5);_$parent5.children.push(_node5);
				}_chFunc(_node4);_$parent4.children.push(_node4);
			}_$temp = _node3;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 2;_node7.attrHash = 1614855112;_node7.attrs["w-class"] = "mining-rank-copy";{
					var _attrvalue = "";_attrvalue += !it.animateStart || it.scrollHeight >= 160 ? 'visibility: hidden;' : '';_attrvalue += "bottom: ";_attrvalue += -20 + it.scrollHeight;_attrvalue += "px;";_node7.attrs["style"] = _attrvalue;
				}_node7.attrHash = _hash.nextHash(_node7.attrHash, _calTextHash(_node7.attrs["style"]));_$temp = _node7;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 6 };_node8.children = [];_node8.attrSize = 2;_node8.attrHash = 819059147;{
						var _attrvalue2 = "";_attrvalue2 += "../../res/image/medals/medal";_attrvalue2 += it.miningMedalId;_attrvalue2 += ".png";_node8.attrs["src"] = _attrvalue2;
					}_node8.attrHash = _hash.nextHash(_node8.attrHash, _calTextHash(_node8.attrs["src"]));_node8.attrs["w-class"] = "medal-img";_chFunc(_node8);_$parent8.children.push(_node8);
				}_$temp = _node7;{
					var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 667182153;_node9.attrs["w-class"] = "mining-result";_$temp = _node9;{
						var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.childHash = 4239532626;_node10.attrSize = 1;_node10.attrHash = 2760161738;_node10.attrs["w-class"] = "mining-title";_$temp = _node10;{
							var _$parent11 = _$temp;var _node11 = _installText("挖矿", 3826901135);;
							_$parent11.children.push(_node11);
						}_$parent10.children.push(_node10);
					}_$temp = _node9;{
						var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 74843051;_node12.attrs["w-class"] = "mining-number";_$temp = _node12;{
							var _$parent13 = _$temp;_addText(it.miningKTnum, _$parent13);
						}_$temp = _node12;{
							var _$parent14 = _$temp;var _node13 = _installText("KT", 3071125820);;
							_$parent14.children.push(_node13);
						}_chFunc(_node12);_$parent12.children.push(_node12);
					}_chFunc(_node9);_$parent9.children.push(_node9);
				}if (it.miningRank === 0) {
					_$temp = _node7;{
						var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 10 };_node14.children = [];_node14.childHash = 549298073;_node14.attrSize = 1;_node14.attrHash = 32768078;_node14.attrs["w-class"] = "rank-num";_$temp = _node14;{
							var _$parent16 = _$temp;var _node15 = _installText("暂无排名", 2201670856);;
							_$parent16.children.push(_node15);
						}_$parent15.children.push(_node14);
					}
				} else {
					_$temp = _node7;{
						var _$parent17 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 11 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 32768078;_node16.attrs["w-class"] = "rank-num";_$temp = _node16;{
							var _$parent18 = _$temp;_addText(it.miningRank, _$parent18);
						}_$temp = _node16;{
							var _$parent19 = _$temp;var _node17 = _installText("名", 1518111024);;
							_$parent19.children.push(_node17);
						}_chFunc(_node16);_$parent17.children.push(_node16);
					}
				}_chFunc(_node7);_$parent7.children.push(_node7);
			}_chFunc(_node3);_$parent3.children.push(_node3);
		}_$temp = _node;{
			var _$parent20 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 12 };_node18.children = [];_node18.attrSize = 4;_node18.attrHash = 370819896;_node18.attrs["w-class"] = "contain";_node18.attrs["on-scroll"] = "scrollPage";_node18.attrs["id"] = "earn-home";{
				var _attrvalue3 = "";_attrvalue3 += it.downAnimate;_attrvalue3 += "";_node18.attrs["class"] = _attrvalue3;
			}_node18.attrHash = _hash.nextHash(_node18.attrHash, _calTextHash(_node18.attrs["class"]));_$temp = _node18;{
				var _$parent21 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 13 };_node19.children = [];_node19.attrSize = 2;_node19.attrHash = 3032816513;_node19.attrs["w-class"] = "mine-card";_node19.attrs["on-tap"] = "miningClick";_$temp = _node19;{
					var _$parent22 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 14 };_node20.children = [];_node20.attrSize = 3;_node20.attrHash = 908300492;_node20.attrs["w-class"] = "mining-rank";{
						var _attrvalue4 = "";_attrvalue4 += it.animateStart ? 'visibility: hidden;' : '';_attrvalue4 += "";_node20.attrs["style"] = _attrvalue4;
					}_node20.attrHash = _hash.nextHash(_node20.attrHash, _calTextHash(_node20.attrs["style"]));_node20.attrs["on-tap"] = "goMineRank";_$temp = _node20;{
						var _$parent23 = _$temp;var _node21 = { "attrs": {}, "tagName": "img", "sid": 15 };_node21.children = [];_node21.attrSize = 2;_node21.attrHash = 819059147;{
							var _attrvalue5 = "";_attrvalue5 += "../../res/image/medals/medal";_attrvalue5 += it.miningMedalId;_attrvalue5 += ".png";_node21.attrs["src"] = _attrvalue5;
						}_node21.attrHash = _hash.nextHash(_node21.attrHash, _calTextHash(_node21.attrs["src"]));_node21.attrs["w-class"] = "medal-img";_chFunc(_node21);_$parent23.children.push(_node21);
					}_$temp = _node20;{
						var _$parent24 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 16 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 667182153;_node22.attrs["w-class"] = "mining-result";_$temp = _node22;{
							var _$parent25 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 17 };_node23.children = [];_node23.childHash = 4239532626;_node23.attrSize = 1;_node23.attrHash = 2760161738;_node23.attrs["w-class"] = "mining-title";_$temp = _node23;{
								var _$parent26 = _$temp;var _node24 = _installText("挖矿", 3826901135);;
								_$parent26.children.push(_node24);
							}_$parent25.children.push(_node23);
						}_$temp = _node22;{
							var _$parent27 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 18 };_node25.children = [];_node25.attrSize = 1;_node25.attrHash = 74843051;_node25.attrs["w-class"] = "mining-number";_$temp = _node25;{
								var _$parent28 = _$temp;_addText(it.miningKTnum, _$parent28);
							}_$temp = _node25;{
								var _$parent29 = _$temp;var _node26 = _installText("KT", 3071125820);;
								_$parent29.children.push(_node26);
							}_chFunc(_node25);_$parent27.children.push(_node25);
						}_chFunc(_node22);_$parent24.children.push(_node22);
					}if (it.miningRank === 0) {
						_$temp = _node20;{
							var _$parent30 = _$temp;var _node27 = { "attrs": {}, "tagName": "div", "sid": 19 };_node27.children = [];_node27.childHash = 549298073;_node27.attrSize = 1;_node27.attrHash = 32768078;_node27.attrs["w-class"] = "rank-num";_$temp = _node27;{
								var _$parent31 = _$temp;var _node28 = _installText("暂无排名", 2201670856);;
								_$parent31.children.push(_node28);
							}_$parent30.children.push(_node27);
						}
					} else {
						_$temp = _node20;{
							var _$parent32 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 20 };_node29.children = [];_node29.attrSize = 1;_node29.attrHash = 32768078;_node29.attrs["w-class"] = "rank-num";_$temp = _node29;{
								var _$parent33 = _$temp;_addText(it.miningRank, _$parent33);
							}_$temp = _node29;{
								var _$parent34 = _$temp;var _node30 = _installText("名", 1518111024);;
								_$parent34.children.push(_node30);
							}_chFunc(_node29);_$parent32.children.push(_node29);
						}
					}_chFunc(_node20);_$parent22.children.push(_node20);
				}_$temp = _node19;{
					var _$parent35 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 21 };_node31.children = [];_node31.childHash = 2587010476;_node31.attrSize = 1;_node31.attrHash = 368253739;_node31.attrs["w-class"] = "explanation-box";_$temp = _node31;{
						var _$parent36 = _$temp;var _node32 = { "attrs": {}, "tagName": "div", "sid": 22 };_node32.children = [];_node32.childHash = 2109733722;_node32.attrSize = 2;_node32.attrHash = 3792866368;_node32.attrs["w-class"] = "explanation";_node32.attrs["on-tap"] = "miningInstructionsClick";_$temp = _node32;{
							var _$parent37 = _$temp;var _node33 = { "attrs": {}, "tagName": "span", "sid": 23 };_node33.children = [];_node33.childHash = 2834327838;_node33.attrHash = 0;_$temp = _node33;{
								var _$parent38 = _$temp;var _node34 = _installText("采矿说明", 3065883803);;
								_$parent38.children.push(_node34);
							}_$parent37.children.push(_node33);
						}_$temp = _node32;{
							var _$parent39 = _$temp;var _node35 = { "attrs": {}, "tagName": "img", "sid": 24 };_node35.children = [];_node35.childHash = 0;_node35.attrSize = 2;_node35.attrHash = 815865607;_node35.attrs["src"] = "../../res/image1/explanation.png";_node35.attrs["w-class"] = "explanation-icon";_$parent39.children.push(_node35);
						}_$parent36.children.push(_node32);
					}_$parent35.children.push(_node31);
				}_chFunc(_node19);_$parent21.children.push(_node19);
			}_$temp = _node18;{
				var _$parent40 = _$temp;var _node36 = { "attrs": {}, "tagName": "div", "sid": 25 };_node36.children = [];_node36.attrSize = 1;_node36.attrHash = 3540558576;_node36.attrs["w-class"] = "card-container";_$temp = _node36;{
					var _$parent41 = _$temp;var _node37 = { "attrs": {}, "tagName": "div", "sid": 26 };_node37.children = [];_node37.attrSize = 1;_node37.attrHash = 728365837;_node37.attrs["w-class"] = "card";_$temp = _node37;{
						var _$parent42 = _$temp;var _node38 = { "attrs": {}, "tagName": "div", "sid": 27 };_node38.children = [];_node38.childHash = 724754417;_node38.attrSize = 1;_node38.attrHash = 1094900014;_node38.attrs["style"] = "display: flex;align-items: center;";_$temp = _node38;{
							var _$parent43 = _$temp;var _node39 = { "attrs": {}, "tagName": "span", "sid": 28 };_node39.children = [];_node39.childHash = 1787135745;_node39.attrSize = 1;_node39.attrHash = 1737618097;_node39.attrs["w-class"] = "welfare";_$temp = _node39;{
								var _$parent44 = _$temp;var _node40 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 29 };_node40.hasChild = false;_node40.child = null;_node40.childHash = 3469843911;_node40.attrHash = 0;_$temp = _node40;{
									var _$parent45 = _$temp;var _node41 = {}; //jpair pre

									{
										var jvalue = "";
										jvalue = "热门活动";
										//jpair suf

										_node41["zh_Hans"] = jvalue;
									}
									//jpair pre

									{
										var _jvalue = "";
										_jvalue = "熱門活動";
										//jpair suf

										_node41["zh_Hant"] = _jvalue;
									}
									//jpair pre

									{
										var _jvalue2 = "";
										_jvalue2 = "";
										//jpair suf

										_node41["en"] = _jvalue2;
									}
									_addJson(_node41, _$parent45);
								}_$parent44.children.push(_node40);
							}_$parent43.children.push(_node39);
						}_$parent42.children.push(_node38);
					}_$temp = _node37;{
						var _$parent46 = _$temp;var _node42 = { "attrs": {}, "tagName": "div", "sid": 30 };_node42.children = [];_node42.attrSize = 1;_node42.attrHash = 1961051943;_node42.attrs["w-class"] = "welfare-container";{
							var _$i = 0;
							for (var _iterator = it.hotActivities, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
								var _ref;

								if (_isArray) {
									if (_i >= _iterator.length) break;
									_ref = _iterator[_i++];
								} else {
									_i = _iterator.next();
									if (_i.done) break;
									_ref = _i.value;
								}

								var item = _ref;
								var i = _$i++;_$temp = _node42;{
									var _$parent47 = _$temp;var _node43 = { "attrs": {}, "tagName": "div", "sid": 31 };_node43.children = [];_node43.attrSize = 3;_node43.attrHash = 1634070344;_node43.attrs["w-class"] = "welfare-activities-item";{
										var _attrvalue6 = "";_attrvalue6 += "goHotActivity(";_attrvalue6 += i;_attrvalue6 += ")";_node43.attrs["on-tap"] = _attrvalue6;
									}_node43.attrHash = _hash.nextHash(_node43.attrHash, _calTextHash(_node43.attrs["on-tap"]));_node43.attrs["class"] = "welfare-activities-item";_$temp = _node43;{
										var _$parent48 = _$temp;var _node44 = { "attrs": {}, "tagName": "img", "sid": 32 };_node44.children = [];_node44.attrSize = 1;_node44.attrHash = 377042497;{
											var _attrvalue7 = "";_attrvalue7 += "../../res/image1/";_attrvalue7 += item.img;_attrvalue7 += "";_node44.attrs["src"] = _attrvalue7;
										}_node44.attrHash = _hash.nextHash(_node44.attrHash, _calTextHash(_node44.attrs["src"]));_chFunc(_node44);_$parent48.children.push(_node44);
									}_$temp = _node43;{
										var _$parent49 = _$temp;var _node45 = { "attrs": {}, "tagName": "div", "sid": 33 };_node45.children = [];_node45.attrSize = 1;_node45.attrHash = 1571203319;_node45.attrs["w-class"] = "welfare-box";_$temp = _node45;{
											var _$parent50 = _$temp;var _node46 = { "attrs": {}, "tagName": "div", "sid": 34 };_node46.children = [];_node46.attrSize = 1;_node46.attrHash = 1928641893;_node46.attrs["w-class"] = "welfare-title";_$temp = _node46;{
												var _$parent51 = _$temp;_addText(item.title, _$parent51);
											}_chFunc(_node46);_$parent50.children.push(_node46);
										}_$temp = _node45;{
											var _$parent52 = _$temp;var _node47 = { "attrs": {}, "tagName": "div", "sid": 35 };_node47.children = [];_node47.attrSize = 1;_node47.attrHash = 3531694579;_node47.attrs["w-class"] = "welfare-desc";_$temp = _node47;{
												var _$parent53 = _$temp;_addText(item.desc, _$parent53);
											}_chFunc(_node47);_$parent52.children.push(_node47);
										}_chFunc(_node45);_$parent49.children.push(_node45);
									}_chFunc(_node43);_$parent47.children.push(_node43);
								}
							}
						}_chFunc(_node42);_$parent46.children.push(_node42);
					}_chFunc(_node37);_$parent41.children.push(_node37);
				}_$temp = _node36;{
					var _$parent54 = _$temp;var _node48 = { "attrs": {}, "tagName": "div", "sid": 36 };_node48.children = [];_node48.attrSize = 1;_node48.attrHash = 728365837;_node48.attrs["w-class"] = "card";_$temp = _node48;{
						var _$parent55 = _$temp;var _node49 = { "attrs": {}, "tagName": "div", "sid": 37 };_node49.children = [];_node49.childHash = 2136982160;_node49.attrSize = 1;_node49.attrHash = 1094900014;_node49.attrs["style"] = "display: flex;align-items: center;";_$temp = _node49;{
							var _$parent56 = _$temp;var _node50 = { "attrs": {}, "tagName": "span", "sid": 38 };_node50.children = [];_node50.childHash = 3604961286;_node50.attrSize = 1;_node50.attrHash = 1737618097;_node50.attrs["w-class"] = "welfare";_$temp = _node50;{
								var _$parent57 = _$temp;var _node51 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 39 };_node51.hasChild = false;_node51.child = null;_node51.childHash = 1799200180;_node51.attrHash = 0;_$temp = _node51;{
									var _$parent58 = _$temp;var _node52 = {}; //jpair pre

									{
										var _jvalue3 = "";
										_jvalue3 = "应用福利";
										//jpair suf

										_node52["zh_Hans"] = _jvalue3;
									}
									//jpair pre

									{
										var _jvalue4 = "";
										_jvalue4 = "應用福利";
										//jpair suf

										_node52["zh_Hant"] = _jvalue4;
									}
									//jpair pre

									{
										var _jvalue5 = "";
										_jvalue5 = "";
										//jpair suf

										_node52["en"] = _jvalue5;
									}
									_addJson(_node52, _$parent58);
								}_$parent57.children.push(_node51);
							}_$parent56.children.push(_node50);
						}_$parent55.children.push(_node49);
					}_$temp = _node48;{
						var _$parent59 = _$temp;var _node53 = { "attrs": {}, "tagName": "div", "sid": 40 };_node53.children = [];_node53.attrSize = 1;_node53.attrHash = 1961051943;_node53.attrs["w-class"] = "welfare-container";{
							var _$i2 = 0;
							for (var _iterator2 = it.applicationWelfares, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
								var _ref2;

								if (_isArray2) {
									if (_i2 >= _iterator2.length) break;
									_ref2 = _iterator2[_i2++];
								} else {
									_i2 = _iterator2.next();
									if (_i2.done) break;
									_ref2 = _i2.value;
								}

								var _item = _ref2;
								var _i3 = _$i2++;_$temp = _node53;{
									var _$parent60 = _$temp;var _node54 = { "attrs": {}, "tagName": "div", "sid": 41 };_node54.children = [];_node54.attrSize = 3;_node54.attrHash = 1978794851;_node54.attrs["w-class"] = "welfare-activities-item";{
										var _attrvalue8 = "";_attrvalue8 += "goApplicationWelfares(";_attrvalue8 += _i3;_attrvalue8 += ")";_node54.attrs["on-tap"] = _attrvalue8;
									}_node54.attrHash = _hash.nextHash(_node54.attrHash, _calTextHash(_node54.attrs["on-tap"]));_node54.attrs["class"] = "welfare-activities-item";_$temp = _node54;{
										var _$parent61 = _$temp;var _node55 = { "attrs": {}, "tagName": "img", "sid": 42 };_node55.children = [];_node55.attrSize = 1;_node55.attrHash = 377042497;{
											var _attrvalue9 = "";_attrvalue9 += "../../res/image1/";_attrvalue9 += _item.img;_attrvalue9 += "";_node55.attrs["src"] = _attrvalue9;
										}_node55.attrHash = _hash.nextHash(_node55.attrHash, _calTextHash(_node55.attrs["src"]));_chFunc(_node55);_$parent61.children.push(_node55);
									}_$temp = _node54;{
										var _$parent62 = _$temp;var _node56 = { "attrs": {}, "tagName": "div", "sid": 43 };_node56.children = [];_node56.attrSize = 1;_node56.attrHash = 1571203319;_node56.attrs["w-class"] = "welfare-box";_$temp = _node56;{
											var _$parent63 = _$temp;var _node57 = { "attrs": {}, "tagName": "div", "sid": 44 };_node57.children = [];_node57.attrSize = 1;_node57.attrHash = 1928641893;_node57.attrs["w-class"] = "welfare-title";_$temp = _node57;{
												var _$parent64 = _$temp;_addText(_item.title, _$parent64);
											}_chFunc(_node57);_$parent63.children.push(_node57);
										}_$temp = _node56;{
											var _$parent65 = _$temp;var _node58 = { "attrs": {}, "tagName": "div", "sid": 45 };_node58.children = [];_node58.attrSize = 1;_node58.attrHash = 3531694579;_node58.attrs["w-class"] = "welfare-desc";_$temp = _node58;{
												var _$parent66 = _$temp;_addText(_item.desc, _$parent66);
											}_chFunc(_node58);_$parent65.children.push(_node58);
										}_chFunc(_node56);_$parent62.children.push(_node56);
									}_chFunc(_node54);_$parent60.children.push(_node54);
								}
							}
						}_chFunc(_node53);_$parent59.children.push(_node53);
					}_chFunc(_node48);_$parent54.children.push(_node48);
				}_chFunc(_node36);_$parent40.children.push(_node36);
			}_chFunc(_node18);_$parent20.children.push(_node18);
		}_chFunc(_node);return _node;
	}
});