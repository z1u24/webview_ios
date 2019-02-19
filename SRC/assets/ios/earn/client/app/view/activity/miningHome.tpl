(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3610021598;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";{
			var attrvalue = "";attrvalue += "z-index: ";attrvalue += it.zIndex;attrvalue += ";";_node.attrs["style"] = attrvalue;
		}_node.attrHash = _hash.nextHash(_node.attrHash, _calTextHash(_node.attrs["style"]));_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 4252679546;_node2.attrs["w-class"] = "body";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "app-components1-blankDiv-topDiv", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.childHash = 2946814719;_node3.attrHash = 0;_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 2812074640;_node4.attrs["w-class"] = "container";_$temp = _node4;{
					var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 2257102471;_node5.attrs["w-class"] = "holded-hoes";{
						var _attrvalue = "";_attrvalue += it.zIndex ? 'visibility: hidden;' : '';_attrvalue += "";_node5.attrs["style"] = _attrvalue;
					}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["style"]));_$temp = _node5;{
						var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 5 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 443137950;{
							var _attrvalue2 = "";_attrvalue2 += "selectHoeClick(e,";_attrvalue2 += it.hoeType.IronHoe;_attrvalue2 += ")";_node6.attrs["ev-hoe-click"] = _attrvalue2;
						}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["ev-hoe-click"]));_$temp = _node6;{
							var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "earn-client-app-components-holdedHoe-holdedHoe", "sid": 6 };_node7.hasChild = false;_node7.child = null;_node7.attrHash = 0;_$temp = _node7;{
								var _$parent8 = _$temp;var _node8 = {}; //jpair pre

								_node8["holdedNumber"] = it.ironHoe;
								//jpair suf
								//jpair pre

								_node8["hoeType"] = it.hoeType.IronHoe;
								//jpair suf
								//jpair pre

								_node8["selected"] = it.hoeSelected;
								//jpair suf
								_addJson(_node8, _$parent8);
							}_chFunc(_node7);_$parent7.children.push(_node7);
						}_chFunc(_node6);_$parent6.children.push(_node6);
					}_$temp = _node5;{
						var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 443137950;{
							var _attrvalue3 = "";_attrvalue3 += "selectHoeClick(e,";_attrvalue3 += it.hoeType.GoldHoe;_attrvalue3 += ")";_node9.attrs["ev-hoe-click"] = _attrvalue3;
						}_node9.attrHash = _hash.nextHash(_node9.attrHash, _calTextHash(_node9.attrs["ev-hoe-click"]));_$temp = _node9;{
							var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "earn-client-app-components-holdedHoe-holdedHoe", "sid": 8 };_node10.hasChild = false;_node10.child = null;_node10.attrSize = 1;_node10.attrHash = 2854538931;_node10.attrs["style"] = "margin:0 15px;";_$temp = _node10;{
								var _$parent11 = _$temp;var _node11 = {}; //jpair pre

								_node11["holdedNumber"] = it.goldHoe;
								//jpair suf
								//jpair pre

								_node11["hoeType"] = it.hoeType.GoldHoe;
								//jpair suf
								//jpair pre

								_node11["selected"] = it.hoeSelected;
								//jpair suf
								_addJson(_node11, _$parent11);
							}_chFunc(_node10);_$parent10.children.push(_node10);
						}_chFunc(_node9);_$parent9.children.push(_node9);
					}_$temp = _node5;{
						var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 443137950;{
							var _attrvalue4 = "";_attrvalue4 += "selectHoeClick(e,";_attrvalue4 += it.hoeType.DiamondHoe;_attrvalue4 += ")";_node12.attrs["ev-hoe-click"] = _attrvalue4;
						}_node12.attrHash = _hash.nextHash(_node12.attrHash, _calTextHash(_node12.attrs["ev-hoe-click"]));_$temp = _node12;{
							var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "earn-client-app-components-holdedHoe-holdedHoe", "sid": 10 };_node13.hasChild = false;_node13.child = null;_node13.attrHash = 0;_$temp = _node13;{
								var _$parent14 = _$temp;var _node14 = {}; //jpair pre

								_node14["holdedNumber"] = it.diamondHoe;
								//jpair suf
								//jpair pre

								_node14["hoeType"] = it.hoeType.DiamondHoe;
								//jpair suf
								//jpair pre

								_node14["selected"] = it.hoeSelected;
								//jpair suf
								_addJson(_node14, _$parent14);
							}_chFunc(_node13);_$parent13.children.push(_node13);
						}_chFunc(_node12);_$parent12.children.push(_node12);
					}_chFunc(_node5);_$parent5.children.push(_node5);
				}_$temp = _node4;{
					var _$parent15 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 11 };_node15.children = [];_node15.attrSize = 2;_node15.attrHash = 1709207147;_node15.attrs["w-class"] = "digging-num";{
						var _attrvalue5 = "";_attrvalue5 += it.zIndex ? 'visibility: hidden;' : '';_attrvalue5 += "";_node15.attrs["style"] = _attrvalue5;
					}_node15.attrHash = _hash.nextHash(_node15.attrHash, _calTextHash(_node15.attrs["style"]));_$temp = _node15;{
						var _$parent16 = _$temp;var _node16 = { "attrs": {}, "tagName": "widget", "sid": 12 };_node16.hasChild = false;_node16.child = null;_node16.attrHash = 2467408643;_node16.attrs["w-tag"] = "pi-ui-lang";_node16.tagName = _node16.attrs["w-tag"];_$temp = _node16;{
							var _$parent17 = _$temp;var _node17 = {}; //jpair pre

							{
								var jvalue = "";
								jvalue += "今日已挖矿山 ";jvalue += it.miningedNumber;jvalue += "/";jvalue += it.mineMax;jvalue += " 座";
								//jpair suf

								_node17["zh_Hans"] = jvalue;
							}
							//jpair pre

							{
								var _jvalue = "";
								_jvalue += "今日已挖礦山 ";_jvalue += it.miningedNumber;_jvalue += "/";_jvalue += it.mineMax;_jvalue += " 座";
								//jpair suf

								_node17["zh_Hant"] = _jvalue;
							}
							//jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "";
								//jpair suf

								_node17["en"] = _jvalue2;
							}
							_addJson(_node17, _$parent17);
						}_chFunc(_node16);_$parent16.children.push(_node16);
					}_chFunc(_node15);_$parent15.children.push(_node15);
				}_$temp = _node4;{
					var _$parent18 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 13 };_node18.children = [];_node18.attrSize = 2;_node18.attrHash = 3616986670;_node18.attrs["w-class"] = "digging-tips";{
						var _attrvalue6 = "";_attrvalue6 += it.zIndex ? 'visibility: hidden;' : '';_attrvalue6 += "";_node18.attrs["style"] = _attrvalue6;
					}_node18.attrHash = _hash.nextHash(_node18.attrHash, _calTextHash(_node18.attrs["style"]));_$temp = _node18;{
						var _$parent19 = _$temp;var _node19 = { "attrs": {}, "tagName": "widget", "sid": 14 };_node19.hasChild = false;_node19.child = null;_node19.attrHash = 2467408643;_node19.attrs["w-tag"] = "pi-ui-lang";_node19.tagName = _node19.attrs["w-tag"];_$temp = _node19;{
							var _$parent20 = _$temp;_addJson(it.miningTips, _$parent20);
						}_chFunc(_node19);_$parent19.children.push(_node19);
					}_chFunc(_node18);_$parent18.children.push(_node18);
				}_$temp = _node4;{
					var _$parent21 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 15 };_node20.children = [];_node20.attrSize = 2;_node20.attrHash = 2213597809;_node20.attrs["w-class"] = "award-container";{
						var _attrvalue7 = "";_attrvalue7 += it.zIndex ? 'visibility: hidden;' : '';_attrvalue7 += "";_node20.attrs["style"] = _attrvalue7;
					}_node20.attrHash = _hash.nextHash(_node20.attrHash, _calTextHash(_node20.attrs["style"]));_$temp = _node20;{
						var _$parent22 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 16 };_node21.children = [];_node21.attrSize = 1;_node21.attrHash = 1295028478;_node21.attrs["w-class"] = "award-item";_$temp = _node21;{
							var _$parent23 = _$temp;var _node22 = { "attrs": {}, "tagName": "img", "sid": 17 };_node22.children = [];_node22.childHash = 0;_node22.attrSize = 2;_node22.attrHash = 767693772;_node22.attrs["src"] = "../../res/image/KT.png";_node22.attrs["w-class"] = "award-icon";_$parent23.children.push(_node22);
						}if (it.awardTypes[it.allAwardType.KT]) {
							_$temp = _node21;{
								var _$parent24 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 18 };_node23.children = [];_node23.attrSize = 1;_node23.attrHash = 662982715;_node23.attrs["w-class"] = "award-num";_$temp = _node23;{
									var _$parent25 = _$temp;var _node24 = _installText("+", 3807426999);;
									_$parent25.children.push(_node24);
								}_$temp = _node23;{
									var _$parent26 = _$temp;var _node25 = { "attrs": {}, "tagName": "span", "sid": 19 };_node25.children = [];_node25.attrHash = 0;_$temp = _node25;{
										var _$parent27 = _$temp;_addText(it.awardTypes[it.allAwardType.KT], _$parent27);
									}_chFunc(_node25);_$parent26.children.push(_node25);
								}_chFunc(_node23);_$parent24.children.push(_node23);
							}
						}_chFunc(_node21);_$parent22.children.push(_node21);
					}_$temp = _node20;{
						var _$parent28 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 20 };_node26.children = [];_node26.attrSize = 1;_node26.attrHash = 1295028478;_node26.attrs["w-class"] = "award-item";_$temp = _node26;{
							var _$parent29 = _$temp;var _node27 = { "attrs": {}, "tagName": "img", "sid": 21 };_node27.children = [];_node27.childHash = 0;_node27.attrSize = 2;_node27.attrHash = 3594109496;_node27.attrs["src"] = "../../res/image/ST.png";_node27.attrs["w-class"] = "award-icon";_$parent29.children.push(_node27);
						}if (it.awardTypes[it.allAwardType.ST]) {
							_$temp = _node26;{
								var _$parent30 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 22 };_node28.children = [];_node28.attrSize = 1;_node28.attrHash = 662982715;_node28.attrs["w-class"] = "award-num";_$temp = _node28;{
									var _$parent31 = _$temp;var _node29 = _installText("+", 3807426999);;
									_$parent31.children.push(_node29);
								}_$temp = _node28;{
									var _$parent32 = _$temp;var _node30 = { "attrs": {}, "tagName": "span", "sid": 23 };_node30.children = [];_node30.attrHash = 0;_$temp = _node30;{
										var _$parent33 = _$temp;_addText(it.awardTypes[it.allAwardType.ST], _$parent33);
									}_chFunc(_node30);_$parent32.children.push(_node30);
								}_chFunc(_node28);_$parent30.children.push(_node28);
							}
						}_chFunc(_node26);_$parent28.children.push(_node26);
					}_$temp = _node20;{
						var _$parent34 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 24 };_node31.children = [];_node31.attrSize = 1;_node31.attrHash = 1295028478;_node31.attrs["w-class"] = "award-item";_$temp = _node31;{
							var _$parent35 = _$temp;var _node32 = { "attrs": {}, "tagName": "img", "sid": 25 };_node32.children = [];_node32.childHash = 0;_node32.attrSize = 2;_node32.attrHash = 2264158408;_node32.attrs["src"] = "../../res/image/ETH.png";_node32.attrs["w-class"] = "award-icon";_$parent35.children.push(_node32);
						}if (it.awardTypes[it.allAwardType.ETH]) {
							_$temp = _node31;{
								var _$parent36 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 26 };_node33.children = [];_node33.attrSize = 1;_node33.attrHash = 662982715;_node33.attrs["w-class"] = "award-num";_$temp = _node33;{
									var _$parent37 = _$temp;var _node34 = _installText("+", 3807426999);;
									_$parent37.children.push(_node34);
								}_$temp = _node33;{
									var _$parent38 = _$temp;var _node35 = { "attrs": {}, "tagName": "span", "sid": 27 };_node35.children = [];_node35.attrHash = 0;_$temp = _node35;{
										var _$parent39 = _$temp;_addText(it.awardTypes[it.allAwardType.ETH], _$parent39);
									}_chFunc(_node35);_$parent38.children.push(_node35);
								}_chFunc(_node33);_$parent36.children.push(_node33);
							}
						}_chFunc(_node31);_$parent34.children.push(_node31);
					}_$temp = _node20;{
						var _$parent40 = _$temp;var _node36 = { "attrs": {}, "tagName": "div", "sid": 28 };_node36.children = [];_node36.attrSize = 1;_node36.attrHash = 1295028478;_node36.attrs["w-class"] = "award-item";_$temp = _node36;{
							var _$parent41 = _$temp;var _node37 = { "attrs": {}, "tagName": "img", "sid": 29 };_node37.children = [];_node37.childHash = 0;_node37.attrSize = 2;_node37.attrHash = 2948759833;_node37.attrs["src"] = "../../res/image/BTC.png";_node37.attrs["w-class"] = "award-icon";_$parent41.children.push(_node37);
						}if (it.awardTypes[it.allAwardType.BTC]) {
							_$temp = _node36;{
								var _$parent42 = _$temp;var _node38 = { "attrs": {}, "tagName": "div", "sid": 30 };_node38.children = [];_node38.attrSize = 1;_node38.attrHash = 662982715;_node38.attrs["w-class"] = "award-num";_$temp = _node38;{
									var _$parent43 = _$temp;var _node39 = _installText("+", 3807426999);;
									_$parent43.children.push(_node39);
								}_$temp = _node38;{
									var _$parent44 = _$temp;var _node40 = { "attrs": {}, "tagName": "span", "sid": 31 };_node40.children = [];_node40.attrHash = 0;_$temp = _node40;{
										var _$parent45 = _$temp;_addText(it.awardTypes[it.allAwardType.BTC], _$parent45);
									}_chFunc(_node40);_$parent44.children.push(_node40);
								}_chFunc(_node38);_$parent42.children.push(_node38);
							}
						}_chFunc(_node36);_$parent40.children.push(_node36);
					}_chFunc(_node20);_$parent21.children.push(_node20);
				}_$temp = _node4;{
					var _$parent46 = _$temp;var _node41 = { "attrs": {}, "tagName": "div", "sid": 32 };_node41.children = [];_node41.attrSize = 1;_node41.attrHash = 3342210286;_node41.attrs["w-class"] = "mine-area";{
						var _$i = 0;
						for (var _iterator = it.haveMines, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
							var index = _$i++;_$temp = _node41;{
								var _$parent47 = _$temp;var _node42 = { "attrs": {}, "tagName": "div", "sid": 33 };_node42.children = [];_node42.attrSize = 3;_node42.attrHash = 418192011;_node42.attrs["ev-mine-click"] = "mineClick";_node42.attrs["w-class"] = "mine-item";{
									var _attrvalue8 = "";_attrvalue8 += item.location;_attrvalue8 += "";_node42.attrs["style"] = _attrvalue8;
								}_node42.attrHash = _hash.nextHash(_node42.attrHash, _calTextHash(_node42.attrs["style"]));_$temp = _node42;{
									var _$parent48 = _$temp;var _node43 = { "attrs": {}, "tagName": "earn-client-app-components-mine-mine", "sid": 34 };_node43.hasChild = false;_node43.child = null;_node43.attrHash = 0;_$temp = _node43;{
										var _$parent49 = _$temp;var _node44 = {}; //jpair pre

										_node44["mineType"] = item.type;
										//jpair suf
										//jpair pre

										_node44["mineId"] = item.id;
										//jpair suf
										//jpair pre

										_node44["hp"] = item.hp;
										//jpair suf
										//jpair pre

										_node44["selectedHoe"] = it.hoeSelected;
										//jpair suf
										//jpair pre

										_node44["selected"] = item.type === it.mineType && item.id === it.mineId;
										//jpair suf
										//jpair pre

										_node44["lossHp"] = it.lossHp;
										//jpair suf
										//jpair pre

										_node44["hoeSelectedLeft"] = it.hoeSelectedLeft;
										//jpair suf
										//jpair pre

										_node44["beginMining"] = it.countDownStart;
										//jpair suf
										//jpair pre

										_node44["countDown"] = it.countDown;
										//jpair suf
										_addJson(_node44, _$parent49);
									}_chFunc(_node43);_$parent48.children.push(_node43);
								}_chFunc(_node42);_$parent47.children.push(_node42);
							}
						}
					}_chFunc(_node41);_$parent46.children.push(_node41);
				}_$temp = _node4;{
					var _$parent50 = _$temp;var _node45 = { "attrs": {}, "tagName": "div", "sid": 35 };_node45.children = [];_node45.childHash = 2855668221;_node45.attrSize = 2;_node45.attrHash = 2263813497;_node45.attrs["w-class"] = "ad-item";_node45.attrs["on-tap"] = "watchAdClick";_$temp = _node45;{
						var _$parent51 = _$temp;var _node46 = { "attrs": {}, "tagName": "img", "sid": 36 };_node46.children = [];_node46.childHash = 0;_node46.attrSize = 1;_node46.attrHash = 2454082015;_node46.attrs["src"] = "../../res/image/advertisement.png";_$parent51.children.push(_node46);
					}_$temp = _node45;{
						var _$parent52 = _$temp;var _node47 = { "attrs": {}, "tagName": "div", "sid": 37 };_node47.children = [];_node47.childHash = 1655380064;_node47.attrSize = 1;_node47.attrHash = 584203259;_node47.attrs["w-class"] = "action-tips";_$temp = _node47;{
							var _$parent53 = _$temp;var _node48 = { "attrs": {}, "tagName": "widget", "sid": 38 };_node48.hasChild = false;_node48.child = null;_node48.childHash = 955406970;_node48.attrHash = 2467408643;_node48.attrs["w-tag"] = "pi-ui-lang";_node48.tagName = _node48.attrs["w-tag"];_$temp = _node48;{
								var _$parent54 = _$temp;var _node49 = {}; //jpair pre

								{
									var _jvalue3 = "";
									_jvalue3 = "看广告得锄头";
									//jpair suf

									_node49["zh_Hans"] = _jvalue3;
								}
								//jpair pre

								{
									var _jvalue4 = "";
									_jvalue4 = "看廣告得鋤頭";
									//jpair suf

									_node49["zh_Hant"] = _jvalue4;
								}
								//jpair pre

								{
									var _jvalue5 = "";
									_jvalue5 = "";
									//jpair suf

									_node49["en"] = _jvalue5;
								}
								_addJson(_node49, _$parent54);
							}_$parent53.children.push(_node48);
						}_$parent52.children.push(_node47);
					}_$parent50.children.push(_node45);
				}_$temp = _node4;{
					var _$parent55 = _$temp;var _node50 = { "attrs": {}, "tagName": "img", "sid": 39 };_node50.children = [];_node50.childHash = 0;_node50.attrSize = 3;_node50.attrHash = 773691150;_node50.attrs["src"] = "../../res/image/close_mine.png";_node50.attrs["w-class"] = "close";_node50.attrs["on-tap"] = "closeClick";_$parent55.children.push(_node50);
				}_chFunc(_node4);_$parent4.children.push(_node4);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_chFunc(_node);return _node;
	}
});