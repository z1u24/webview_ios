(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";topBarTitle = { "zh_Hans": it.product.productName, "zh_Hant": it.product.productName, "en": "" };_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3899014049;_node2.attrs["style"] = "background: linear-gradient(to right,#328EE6, #38CEE7);";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "app-components1-topBar-topBar2", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["scrollHeight"] = it.scrollHeight;
					//jpair suf
					//jpair pre

					_node4["text"] = topBarTitle;
					//jpair suf
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 3;_node5.attrHash = 1165043580;_node5.attrs["w-class"] = "body";_node5.attrs["on-scroll"] = "pageScroll";_node5.attrs["id"] = "body";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 3470977847;{
					var attrvalue = "";attrvalue += "head1 ";attrvalue += 'head1-' + it.stateBg;attrvalue += "";_node6.attrs["w-class"] = attrvalue;
				}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["w-class"]));tags = [{ "zh_Hans": "昨日收益", "zh_Hant": "昨日收益", "en": "" }, { "zh_Hans": "年化收益", "zh_Hant": "年化收益", "en": "" }, { "zh_Hans": "累计收益", "zh_Hant": "累計收益", "en": "" }, { "zh_Hans": "持续(天)", "zh_Hant": "持續(天)", "en": "" }];details = [{ "zh_Hans": "交易时间：", "zh_Hant": "交易時間：", "en": "" }, { "zh_Hans": "购买单价：", "zh_Hant": "購買單價：", "en": "" }, { "zh_Hans": "产品名称：", "zh_Hant": "產品名稱：", "en": "" }, { "zh_Hans": "购买份数：", "zh_Hant": "購買份數：", "en": "" }, { "zh_Hans": "年化收益：", "zh_Hant": "年化收益：", "en": "" }, { "zh_Hans": "锁定期：", "zh_Hant": "鎖定期：", "en": "" }];_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 2691711801;_node7.attrs["w-class"] = "head1-tag";_$temp = _node7;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 6 };_node8.hasChild = false;_node8.child = null;_node8.attrHash = 0;_$temp = _node8;{
							var _$parent9 = _$temp;_addJson(tags[0], _$parent9);
						}_chFunc(_node8);_$parent8.children.push(_node8);
					}_$temp = _node7;{
						var _$parent10 = _$temp;var _node9 = _installText("(", 3447679526);;
						_$parent10.children.push(_node9);
					}_$temp = _node7;{
						var _$parent11 = _$temp;_addText(it.product.coinType, _$parent11);
					}_$temp = _node7;{
						var _$parent12 = _$temp;var _node10 = _installText(")", 2008579719);;
						_$parent12.children.push(_node10);
					}_chFunc(_node7);_$parent7.children.push(_node7);
				}_$temp = _node6;{
					var _$parent13 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 7 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 105160949;_node11.attrs["w-class"] = "ye-earn";_$temp = _node11;{
						var _$parent14 = _$temp;_addText(it.product.yesterdayIncoming, _$parent14);
					}_chFunc(_node11);_$parent13.children.push(_node11);
				}_$temp = _node6;{
					var _$parent15 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 1323770159;_node12.attrs["w-class"] = "status";_$temp = _node12;{
						var _$parent16 = _$temp;_addText(it.stateShow, _$parent16);
					}_chFunc(_node12);_$parent15.children.push(_node12);
				}_$temp = _node6;{
					var _$parent17 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 9 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 253915434;_node13.attrs["w-class"] = "head2";_$temp = _node13;{
						var _$parent18 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 10 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 3828752007;_node14.attrs["w-class"] = "col1";_$temp = _node14;{
							var _$parent19 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 11 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 854203028;_node15.attrs["w-class"] = "tag";_$temp = _node15;{
								var _$parent20 = _$temp;var _node16 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 12 };_node16.hasChild = false;_node16.child = null;_node16.attrHash = 0;_$temp = _node16;{
									var _$parent21 = _$temp;_addJson(tags[1], _$parent21);
								}_chFunc(_node16);_$parent20.children.push(_node16);
							}_chFunc(_node15);_$parent19.children.push(_node15);
						}_$temp = _node14;{
							var _$parent22 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 13 };_node17.children = [];_node17.attrSize = 1;_node17.attrHash = 487306359;_node17.attrs["w-class"] = "content";_$temp = _node17;{
								var _$parent23 = _$temp;_addText(it.product.profit, _$parent23);
							}_$temp = _node17;{
								var _$parent24 = _$temp;var _node18 = _installText("%", 4257547020);;
								_$parent24.children.push(_node18);
							}_chFunc(_node17);_$parent22.children.push(_node17);
						}_chFunc(_node14);_$parent18.children.push(_node14);
					}_$temp = _node13;{
						var _$parent25 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 14 };_node19.children = [];_node19.childHash = 2946814719;_node19.attrSize = 1;_node19.attrHash = 374818280;_node19.attrs["w-class"] = "line";_$parent25.children.push(_node19);
					}_$temp = _node13;{
						var _$parent26 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 15 };_node20.children = [];_node20.attrSize = 1;_node20.attrHash = 833589976;_node20.attrs["w-class"] = "col2";_$temp = _node20;{
							var _$parent27 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 16 };_node21.children = [];_node21.attrSize = 1;_node21.attrHash = 854203028;_node21.attrs["w-class"] = "tag";_$temp = _node21;{
								var _$parent28 = _$temp;var _node22 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 17 };_node22.hasChild = false;_node22.child = null;_node22.attrHash = 0;_$temp = _node22;{
									var _$parent29 = _$temp;_addJson(tags[2], _$parent29);
								}_chFunc(_node22);_$parent28.children.push(_node22);
							}_$temp = _node21;{
								var _$parent30 = _$temp;var _node23 = _installText("(", 3447679526);;
								_$parent30.children.push(_node23);
							}_$temp = _node21;{
								var _$parent31 = _$temp;_addText(it.product.coinType, _$parent31);
							}_$temp = _node21;{
								var _$parent32 = _$temp;var _node24 = _installText(")", 2008579719);;
								_$parent32.children.push(_node24);
							}_chFunc(_node21);_$parent27.children.push(_node21);
						}_$temp = _node20;{
							var _$parent33 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 18 };_node25.children = [];_node25.attrSize = 1;_node25.attrHash = 487306359;_node25.attrs["w-class"] = "content";_$temp = _node25;{
								var _$parent34 = _$temp;_addText(it.product.totalIncoming, _$parent34);
							}_chFunc(_node25);_$parent33.children.push(_node25);
						}_chFunc(_node20);_$parent26.children.push(_node20);
					}_$temp = _node13;{
						var _$parent35 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 19 };_node26.children = [];_node26.childHash = 2946814719;_node26.attrSize = 1;_node26.attrHash = 374818280;_node26.attrs["w-class"] = "line";_$parent35.children.push(_node26);
					}_$temp = _node13;{
						var _$parent36 = _$temp;var _node27 = { "attrs": {}, "tagName": "div", "sid": 20 };_node27.children = [];_node27.attrSize = 1;_node27.attrHash = 3828752007;_node27.attrs["w-class"] = "col1";_$temp = _node27;{
							var _$parent37 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 21 };_node28.children = [];_node28.attrSize = 1;_node28.attrHash = 854203028;_node28.attrs["w-class"] = "tag";_$temp = _node28;{
								var _$parent38 = _$temp;var _node29 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 22 };_node29.hasChild = false;_node29.child = null;_node29.attrHash = 0;_$temp = _node29;{
									var _$parent39 = _$temp;_addJson(tags[3], _$parent39);
								}_chFunc(_node29);_$parent38.children.push(_node29);
							}_chFunc(_node28);_$parent37.children.push(_node28);
						}_$temp = _node27;{
							var _$parent40 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 23 };_node30.children = [];_node30.attrSize = 1;_node30.attrHash = 487306359;_node30.attrs["w-class"] = "content";_$temp = _node30;{
								var _$parent41 = _$temp;_addText(it.product.days, _$parent41);
							}_chFunc(_node30);_$parent40.children.push(_node30);
						}_chFunc(_node27);_$parent36.children.push(_node27);
					}_chFunc(_node13);_$parent17.children.push(_node13);
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_$temp = _node5;{
				var _$parent42 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 24 };_node31.children = [];_node31.attrSize = 1;_node31.attrHash = 4064917415;_node31.attrs["w-class"] = "bottom-box";_$temp = _node31;{
					var _$parent43 = _$temp;var _node32 = { "attrs": {}, "tagName": "div", "sid": 25 };_node32.children = [];_node32.attrSize = 1;_node32.attrHash = 2907488342;_node32.attrs["w-class"] = "row5";_$temp = _node32;{
						var _$parent44 = _$temp;_addText(it.product.productIntroduction, _$parent44);
					}_chFunc(_node32);_$parent43.children.push(_node32);
				}_$temp = _node31;{
					var _$parent45 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 26 };_node33.children = [];_node33.childHash = 2261057071;_node33.attrSize = 1;_node33.attrHash = 1019047777;_node33.attrs["w-class"] = "title";_$temp = _node33;{
						var _$parent46 = _$temp;var _node34 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 27 };_node34.hasChild = false;_node34.child = null;_node34.childHash = 2557923035;_node34.attrHash = 0;_$temp = _node34;{
							var _$parent47 = _$temp;var _node35 = {}; //jpair pre

							{
								var jvalue = "";
								jvalue = "其他信息";
								//jpair suf

								_node35["zh_Hans"] = jvalue;
							}
							//jpair pre

							{
								var _jvalue = "";
								_jvalue = "其他信息";
								//jpair suf

								_node35["zh_Hant"] = _jvalue;
							}
							//jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "";
								//jpair suf

								_node35["en"] = _jvalue2;
							}
							_addJson(_node35, _$parent47);
						}_$parent46.children.push(_node34);
					}_$parent45.children.push(_node33);
				}_$temp = _node31;{
					var _$parent48 = _$temp;var _node36 = { "attrs": {}, "tagName": "div", "sid": 28 };_node36.children = [];_node36.attrSize = 1;_node36.attrHash = 1210607516;_node36.attrs["w-class"] = "detail-box";_$temp = _node36;{
						var _$parent49 = _$temp;var _node37 = { "attrs": {}, "tagName": "div", "sid": 29 };_node37.children = [];_node37.attrSize = 1;_node37.attrHash = 3820340678;_node37.attrs["w-class"] = "detail";_$temp = _node37;{
							var _$parent50 = _$temp;var _node38 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 30 };_node38.hasChild = false;_node38.child = null;_node38.attrHash = 0;_$temp = _node38;{
								var _$parent51 = _$temp;_addJson(details[0], _$parent51);
							}_chFunc(_node38);_$parent50.children.push(_node38);
						}_$temp = _node37;{
							var _$parent52 = _$temp;_addText(it.product.purchaseDate, _$parent52);
						}_chFunc(_node37);_$parent49.children.push(_node37);
					}_$temp = _node36;{
						var _$parent53 = _$temp;var _node39 = { "attrs": {}, "tagName": "div", "sid": 31 };_node39.children = [];_node39.attrSize = 1;_node39.attrHash = 3820340678;_node39.attrs["w-class"] = "detail";_$temp = _node39;{
							var _$parent54 = _$temp;var _node40 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 32 };_node40.hasChild = false;_node40.child = null;_node40.attrHash = 0;_$temp = _node40;{
								var _$parent55 = _$temp;_addJson(details[1], _$parent55);
							}_chFunc(_node40);_$parent54.children.push(_node40);
						}_$temp = _node39;{
							var _$parent56 = _$temp;_addText(it.product.unitPrice, _$parent56);
						}_$temp = _node39;{
							var _$parent57 = _$temp;_addText(it.product.coinType, _$parent57);
						}_chFunc(_node39);_$parent53.children.push(_node39);
					}_$temp = _node36;{
						var _$parent58 = _$temp;var _node41 = { "attrs": {}, "tagName": "div", "sid": 33 };_node41.children = [];_node41.attrSize = 1;_node41.attrHash = 3820340678;_node41.attrs["w-class"] = "detail";_$temp = _node41;{
							var _$parent59 = _$temp;var _node42 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 34 };_node42.hasChild = false;_node42.child = null;_node42.attrHash = 0;_$temp = _node42;{
								var _$parent60 = _$temp;_addJson(details[2], _$parent60);
							}_chFunc(_node42);_$parent59.children.push(_node42);
						}_$temp = _node41;{
							var _$parent61 = _$temp;_addText(it.product.productName, _$parent61);
						}_chFunc(_node41);_$parent58.children.push(_node41);
					}_$temp = _node36;{
						var _$parent62 = _$temp;var _node43 = { "attrs": {}, "tagName": "div", "sid": 35 };_node43.children = [];_node43.attrSize = 1;_node43.attrHash = 3820340678;_node43.attrs["w-class"] = "detail";_$temp = _node43;{
							var _$parent63 = _$temp;var _node44 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 36 };_node44.hasChild = false;_node44.child = null;_node44.attrHash = 0;_$temp = _node44;{
								var _$parent64 = _$temp;_addJson(details[3], _$parent64);
							}_chFunc(_node44);_$parent63.children.push(_node44);
						}_$temp = _node43;{
							var _$parent65 = _$temp;_addText(it.product.amount, _$parent65);
						}_$temp = _node43;{
							var _$parent66 = _$temp;var _node45 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 37 };_node45.hasChild = false;_node45.child = null;_node45.childHash = 3332005577;_node45.attrHash = 0;_$temp = _node45;{
								var _$parent67 = _$temp;var _node46 = {}; //jpair pre

								{
									var _jvalue3 = "";
									_jvalue3 = "份";
									//jpair suf

									_node46["zh_Hans"] = _jvalue3;
								}
								//jpair pre

								{
									var _jvalue4 = "";
									_jvalue4 = "份";
									//jpair suf

									_node46["zh_Hant"] = _jvalue4;
								}
								//jpair pre

								{
									var _jvalue5 = "";
									_jvalue5 = "";
									//jpair suf

									_node46["en"] = _jvalue5;
								}
								_addJson(_node46, _$parent67);
							}_$parent66.children.push(_node45);
						}_chFunc(_node43);_$parent62.children.push(_node43);
					}_$temp = _node36;{
						var _$parent68 = _$temp;var _node47 = { "attrs": {}, "tagName": "div", "sid": 38 };_node47.children = [];_node47.attrSize = 1;_node47.attrHash = 3820340678;_node47.attrs["w-class"] = "detail";_$temp = _node47;{
							var _$parent69 = _$temp;var _node48 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 39 };_node48.hasChild = false;_node48.child = null;_node48.attrHash = 0;_$temp = _node48;{
								var _$parent70 = _$temp;_addJson(details[4], _$parent70);
							}_chFunc(_node48);_$parent69.children.push(_node48);
						}_$temp = _node47;{
							var _$parent71 = _$temp;_addText(it.product.profit, _$parent71);
						}_$temp = _node47;{
							var _$parent72 = _$temp;var _node49 = _installText("%", 4257547020);;
							_$parent72.children.push(_node49);
						}_chFunc(_node47);_$parent68.children.push(_node47);
					}_$temp = _node36;{
						var _$parent73 = _$temp;var _node50 = { "attrs": {}, "tagName": "div", "sid": 40 };_node50.children = [];_node50.attrSize = 1;_node50.attrHash = 3820340678;_node50.attrs["w-class"] = "detail";_$temp = _node50;{
							var _$parent74 = _$temp;var _node51 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 41 };_node51.hasChild = false;_node51.child = null;_node51.attrHash = 0;_$temp = _node51;{
								var _$parent75 = _$temp;_addJson(details[5], _$parent75);
							}_chFunc(_node51);_$parent74.children.push(_node51);
						}_$temp = _node50;{
							var _$parent76 = _$temp;_addText(it.product.lockday, _$parent76);
						}_chFunc(_node50);_$parent73.children.push(_node50);
					}_chFunc(_node36);_$parent48.children.push(_node36);
				}_$temp = _node31;{
					var _$parent77 = _$temp;var _node52 = { "attrs": {}, "tagName": "div", "sid": 42 };_node52.children = [];_node52.childHash = 3107666077;_node52.attrSize = 2;_node52.attrHash = 1310889798;_node52.attrs["w-class"] = "read";_node52.attrs["on-tap"] = "readAgree";_$temp = _node52;{
						var _$parent78 = _$temp;var _node53 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 43 };_node53.hasChild = false;_node53.child = null;_node53.childHash = 745052016;_node53.attrHash = 0;_$temp = _node53;{
							var _$parent79 = _$temp;var _node54 = {}; //jpair pre

							{
								var _jvalue6 = "";
								_jvalue6 = "阅读声明";
								//jpair suf

								_node54["zh_Hans"] = _jvalue6;
							}
							//jpair pre

							{
								var _jvalue7 = "";
								_jvalue7 = "閱讀聲明";
								//jpair suf

								_node54["zh_Hant"] = _jvalue7;
							}
							//jpair pre

							{
								var _jvalue8 = "";
								_jvalue8 = "";
								//jpair suf

								_node54["en"] = _jvalue8;
							}
							_addJson(_node54, _$parent79);
						}_$parent78.children.push(_node53);
					}_$parent77.children.push(_node52);
				}_$temp = _node31;{
					var _$parent80 = _$temp;var _node55 = { "attrs": {}, "tagName": "div", "sid": 44 };_node55.children = [];_node55.attrSize = 2;_node55.attrHash = 3101311255;_node55.attrs["ev-btn-tap"] = "redemptionClick";_node55.attrs["w-class"] = "btn";btnName = { "zh_Hans": it.btnText, "zh_Hant": it.btnText, "en": "" };_$temp = _node55;{
						var _$parent81 = _$temp;var _node56 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 45 };_node56.hasChild = false;_node56.child = null;_node56.attrHash = 0;_$temp = _node56;{
							var _$parent82 = _$temp;var _node57 = {}; //jpair pre

							_node57["name"] = btnName;
							//jpair suf
							//jpair pre

							{
								var _jvalue9 = "";
								_jvalue9 = "big";
								//jpair suf

								_node57["types"] = _jvalue9;
							}
							//jpair pre

							_node57["color"] = it.btnBgColor;
							//jpair suf
							_addJson(_node57, _$parent82);
						}_chFunc(_node56);_$parent81.children.push(_node56);
					}_chFunc(_node55);_$parent80.children.push(_node55);
				}_chFunc(_node31);_$parent42.children.push(_node31);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});