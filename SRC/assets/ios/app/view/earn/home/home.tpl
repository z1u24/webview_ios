(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 1636346215;_node.attrs["class"] = "new-page";_node.attrs["style"] = "display: flex;flex-direction: column;";_node.attrs["ev-refresh-click"] = "refreshPage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 3;_node2.attrHash = 2645525718;_node2.attrs["w-class"] = "contain";_node2.attrs["on-scroll"] = "scrollPage";_node2.attrs["id"] = "earn-home";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 4207495301;_node3.attrs["style"] = "background:linear-gradient(to right,#318DE6,#38CFE7);";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "app-components1-topBar-topBar1", "sid": 3 };_node4.hasChild = false;_node4.child = null;_node4.attrHash = 0;_$temp = _node4;{
						var _$parent5 = _$temp;var _node5 = {}; //jpair pre

						_node5["avatar"] = it.avatar;
						//jpair suf
						//jpair pre

						_node5["scrollHeight"] = it.scrollHeight;
						//jpair suf
						_addJson(_node5, _$parent5);
					}_chFunc(_node4);_$parent4.children.push(_node4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 4 };_node6.children = [];_node6.childHash = 0;_node6.attrSize = 2;_node6.attrHash = 3480930167;_node6.attrs["src"] = "../../../res/image1/topbar_backimg.png";_node6.attrs["w-class"] = "backImg";_$parent6.children.push(_node6);
			}_$temp = _node2;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 2188685783;_node7.attrs["w-class"] = "topBack";_$temp = _node7;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 3317608244;_node8.attrs["w-class"] = "groupCard";_$temp = _node8;{
						var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.childHash = 3438401313;_node9.attrSize = 1;_node9.attrHash = 591075809;_node9.attrs["w-class"] = "titleMode";_$temp = _node9;{
							var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "img", "sid": 8 };_node10.children = [];_node10.childHash = 0;_node10.attrSize = 2;_node10.attrHash = 1205569638;_node10.attrs["src"] = "../../../res/image1/mine_makmoney.png";_node10.attrs["w-class"] = "makeMoney";_$parent10.children.push(_node10);
						}_$temp = _node9;{
							var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "span", "sid": 9 };_node11.children = [];_node11.childHash = 733729738;_node11.attrSize = 1;_node11.attrHash = 4029746190;_node11.attrs["w-class"] = "totalTitle";_$temp = _node11;{
								var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 10 };_node12.hasChild = false;_node12.child = null;_node12.childHash = 258794879;_node12.attrHash = 0;_$temp = _node12;{
									var _$parent13 = _$temp;var _node13 = {}; //jpair pre

									{
										var jvalue = "";
										jvalue = "累计挖矿(KT)";
										//jpair suf

										_node13["zh_Hans"] = jvalue;
									}
									//jpair pre

									{
										var _jvalue = "";
										_jvalue = "累計挖礦(KT)";
										//jpair suf

										_node13["zh_Hant"] = _jvalue;
									}
									//jpair pre

									{
										var _jvalue2 = "";
										_jvalue2 = "";
										//jpair suf

										_node13["en"] = _jvalue2;
									}
									_addJson(_node13, _$parent13);
								}_$parent12.children.push(_node12);
							}_$parent11.children.push(_node11);
						}_$temp = _node9;{
							var _$parent14 = _$temp;var _node14 = { "attrs": {}, "tagName": "img", "sid": 11 };_node14.children = [];_node14.childHash = 0;_node14.attrSize = 3;_node14.attrHash = 1922456856;_node14.attrs["src"] = "../../../res/image/41_gray.png";_node14.attrs["w-class"] = "miningDesc";_node14.attrs["on-tap"] = "miningDesc";_$parent14.children.push(_node14);
						}_$parent9.children.push(_node9);
					}_$temp = _node8;{
						var _$parent15 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 12 };_node15.children = [];_node15.attrSize = 2;_node15.attrHash = 2894396870;_node15.attrs["w-class"] = "totalNum";_node15.attrs["id"] = "mining";_$temp = _node15;{
							var _$parent16 = _$temp;_addText(it.holdMines, _$parent16);
						}_$temp = _node15;{
							var _$parent17 = _$temp;var _node16 = { "attrs": {}, "tagName": "span", "sid": 13 };_node16.children = [];_node16.attrSize = 2;_node16.attrHash = 3543160957;_node16.attrs["class"] = "miningNum";{
								var attrvalue = "";attrvalue += "animation:";attrvalue += it.doMining ? 'miningEnlarge 0.3s linear' : '';attrvalue += "";_node16.attrs["style"] = attrvalue;
							}_node16.attrHash = _hash.nextHash(_node16.attrHash, _calTextHash(_node16.attrs["style"]));_$temp = _node16;{
								var _$parent18 = _$temp;var _node17 = _installText("+", 3807426999);;
								_$parent18.children.push(_node17);
							}_$temp = _node16;{
								var _$parent19 = _$temp;_addText(it.mines, _$parent19);
							}_chFunc(_node16);_$parent17.children.push(_node16);
						}_chFunc(_node15);_$parent15.children.push(_node15);
					}_$temp = _node8;{
						var _$parent20 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 14 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 591075809;_node18.attrs["w-class"] = "titleMode";_$temp = _node18;{
							var _$parent21 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 15 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 4029746190;_node19.attrs["w-class"] = "totalTitle";_$temp = _node19;{
								var _$parent22 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 16 };_node20.children = [];_node20.childHash = 2636266254;_node20.attrHash = 0;_$temp = _node20;{
									var _$parent23 = _$temp;var _node21 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 17 };_node21.hasChild = false;_node21.child = null;_node21.childHash = 3557392438;_node21.attrHash = 0;_$temp = _node21;{
										var _$parent24 = _$temp;var _node22 = {}; //jpair pre

										{
											var _jvalue3 = "";
											_jvalue3 = "矿山剩余(KT)";
											//jpair suf

											_node22["zh_Hans"] = _jvalue3;
										}
										//jpair pre

										{
											var _jvalue4 = "";
											_jvalue4 = "礦山剩餘(KT)";
											//jpair suf

											_node22["zh_Hant"] = _jvalue4;
										}
										//jpair pre

										{
											var _jvalue5 = "";
											_jvalue5 = "";
											//jpair suf

											_node22["en"] = _jvalue5;
										}
										_addJson(_node22, _$parent24);
									}_$parent23.children.push(_node21);
								}_$parent22.children.push(_node20);
							}_$temp = _node19;{
								var _$parent25 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 18 };_node23.children = [];_node23.attrSize = 1;_node23.attrHash = 3175542604;_node23.attrs["w-class"] = "otherNum";_$temp = _node23;{
									var _$parent26 = _$temp;_addText(it.mineLast, _$parent26);
								}_chFunc(_node23);_$parent25.children.push(_node23);
							}_chFunc(_node19);_$parent21.children.push(_node19);
						}_$temp = _node18;{
							var _$parent27 = _$temp;var _node24 = { "attrs": {}, "tagName": "div", "sid": 19 };_node24.children = [];_node24.attrSize = 1;_node24.attrHash = 4029746190;_node24.attrs["w-class"] = "totalTitle";_$temp = _node24;{
								var _$parent28 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 20 };_node25.children = [];_node25.childHash = 84825128;_node25.attrHash = 0;_$temp = _node25;{
									var _$parent29 = _$temp;var _node26 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 21 };_node26.hasChild = false;_node26.child = null;_node26.childHash = 3745839296;_node26.attrHash = 0;_$temp = _node26;{
										var _$parent30 = _$temp;var _node27 = {}; //jpair pre

										{
											var _jvalue6 = "";
											_jvalue6 = "本次可挖(KT)";
											//jpair suf

											_node27["zh_Hans"] = _jvalue6;
										}
										//jpair pre

										{
											var _jvalue7 = "";
											_jvalue7 = "本次可挖(KT)";
											//jpair suf

											_node27["zh_Hant"] = _jvalue7;
										}
										//jpair pre

										{
											var _jvalue8 = "";
											_jvalue8 = "";
											//jpair suf

											_node27["en"] = _jvalue8;
										}
										_addJson(_node27, _$parent30);
									}_$parent29.children.push(_node26);
								}_$parent28.children.push(_node25);
							}_$temp = _node24;{
								var _$parent31 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 22 };_node28.children = [];_node28.attrSize = 1;_node28.attrHash = 3175542604;_node28.attrs["w-class"] = "otherNum";_$temp = _node28;{
									var _$parent32 = _$temp;_addText(it.mines, _$parent32);
								}_chFunc(_node28);_$parent31.children.push(_node28);
							}_chFunc(_node24);_$parent27.children.push(_node24);
						}_$temp = _node18;{
							var _$parent33 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 23 };_node29.children = [];_node29.attrSize = 1;_node29.attrHash = 135029207;_node29.attrs["ev-btn-tap"] = "doPadding";var item = { zh_Hans: "挖一下", zh_Hant: "挖一下", en: "" };_$temp = _node29;{
								var _$parent34 = _$temp;var _node30 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 24 };_node30.hasChild = false;_node30.child = null;_node30.attrHash = 0;_$temp = _node30;{
									var _$parent35 = _$temp;var _node31 = {}; //jpair pre

									_node31["name"] = item;
									//jpair suf
									//jpair pre

									{
										var _jvalue9 = "";
										_jvalue9 = "small";
										//jpair suf

										_node31["types"] = _jvalue9;
									}
									_addJson(_node31, _$parent35);
								}_chFunc(_node30);_$parent34.children.push(_node30);
							}_chFunc(_node29);_$parent33.children.push(_node29);
						}_chFunc(_node18);_$parent20.children.push(_node18);
					}_$temp = _node8;{
						var _$parent36 = _$temp;var _node32 = { "attrs": {}, "tagName": "div", "sid": 25 };_node32.children = [];_node32.childHash = 2946814719;_node32.attrSize = 1;_node32.attrHash = 3144420239;_node32.attrs["w-class"] = "dividLine";_$parent36.children.push(_node32);
					}_$temp = _node8;{
						var _$parent37 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 26 };_node33.children = [];_node33.attrSize = 2;_node33.attrHash = 2956100685;_node33.attrs["w-class"] = "titleMode";_node33.attrs["on-tap"] = "goNextPage(0)";_$temp = _node33;{
							var _$parent38 = _$temp;var _node34 = { "attrs": {}, "tagName": "img", "sid": 27 };_node34.children = [];_node34.childHash = 0;_node34.attrSize = 2;_node34.attrHash = 2871696876;_node34.attrs["src"] = "../../../res/image1/mine_top.png";_node34.attrs["w-class"] = "rankTop";_$parent38.children.push(_node34);
						}_$temp = _node33;{
							var _$parent39 = _$temp;var _node35 = { "attrs": {}, "tagName": "span", "sid": 28 };_node35.children = [];_node35.childHash = 3429636975;_node35.attrSize = 2;_node35.attrHash = 663705095;_node35.attrs["w-class"] = "miningTitle";_node35.attrs["style"] = "flex: 1;";_$temp = _node35;{
								var _$parent40 = _$temp;var _node36 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 29 };_node36.hasChild = false;_node36.child = null;_node36.childHash = 2044366593;_node36.attrHash = 0;_$temp = _node36;{
									var _$parent41 = _$temp;var _node37 = {}; //jpair pre

									{
										var _jvalue10 = "";
										_jvalue10 = "挖矿排名";
										//jpair suf

										_node37["zh_Hans"] = _jvalue10;
									}
									//jpair pre

									{
										var _jvalue11 = "";
										_jvalue11 = "挖礦排名";
										//jpair suf

										_node37["zh_Hant"] = _jvalue11;
									}
									//jpair pre

									{
										var _jvalue12 = "";
										_jvalue12 = "";
										//jpair suf

										_node37["en"] = _jvalue12;
									}
									_addJson(_node37, _$parent41);
								}_$parent40.children.push(_node36);
							}_$parent39.children.push(_node35);
						}_$temp = _node33;{
							var _$parent42 = _$temp;var _node38 = { "attrs": {}, "tagName": "span", "sid": 30 };_node38.children = [];_node38.attrSize = 1;_node38.attrHash = 852422721;_node38.attrs["w-class"] = "miningTitle";_$temp = _node38;{
								var _$parent43 = _$temp;var _node39 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 31 };_node39.hasChild = false;_node39.child = null;_node39.childHash = 584037504;_node39.attrHash = 0;_$temp = _node39;{
									var _$parent44 = _$temp;var _node40 = {}; //jpair pre

									{
										var _jvalue13 = "";
										_jvalue13 = "第";
										//jpair suf

										_node40["zh_Hans"] = _jvalue13;
									}
									//jpair pre

									{
										var _jvalue14 = "";
										_jvalue14 = "第";
										//jpair suf

										_node40["zh_Hant"] = _jvalue14;
									}
									//jpair pre

									{
										var _jvalue15 = "";
										_jvalue15 = "";
										//jpair suf

										_node40["en"] = _jvalue15;
									}
									_addJson(_node40, _$parent44);
								}_$parent43.children.push(_node39);
							}_$temp = _node38;{
								var _$parent45 = _$temp;_addText(it.rankNum, _$parent45);
							}_$temp = _node38;{
								var _$parent46 = _$temp;var _node41 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 32 };_node41.hasChild = false;_node41.child = null;_node41.childHash = 3207460179;_node41.attrHash = 0;_$temp = _node41;{
									var _$parent47 = _$temp;var _node42 = {}; //jpair pre

									{
										var _jvalue16 = "";
										_jvalue16 = "位";
										//jpair suf

										_node42["zh_Hans"] = _jvalue16;
									}
									//jpair pre

									{
										var _jvalue17 = "";
										_jvalue17 = "位";
										//jpair suf

										_node42["zh_Hant"] = _jvalue17;
									}
									//jpair pre

									{
										var _jvalue18 = "";
										_jvalue18 = "";
										//jpair suf

										_node42["en"] = _jvalue18;
									}
									_addJson(_node42, _$parent47);
								}_$parent46.children.push(_node41);
							}_chFunc(_node38);_$parent42.children.push(_node38);
						}_$temp = _node33;{
							var _$parent48 = _$temp;var _node43 = { "attrs": {}, "tagName": "img", "sid": 33 };_node43.children = [];_node43.childHash = 0;_node43.attrSize = 2;_node43.attrHash = 1319070200;_node43.attrs["src"] = "../../../res/image1/25_blue.png";_node43.attrs["w-class"] = "rankList";_$parent48.children.push(_node43);
						}_chFunc(_node33);_$parent37.children.push(_node33);
					}_chFunc(_node8);_$parent8.children.push(_node8);
				}_$temp = _node7;{
					var _$parent49 = _$temp;var _node44 = { "attrs": {}, "tagName": "div", "sid": 34 };_node44.children = [];_node44.childHash = 1515139708;_node44.attrSize = 1;_node44.attrHash = 2468325048;_node44.attrs["w-class"] = "menuCard";_$temp = _node44;{
						var _$parent50 = _$temp;var _node45 = { "attrs": {}, "tagName": "div", "sid": 35 };_node45.children = [];_node45.childHash = 1081355384;_node45.attrSize = 2;_node45.attrHash = 4242798398;_node45.attrs["w-class"] = "oneBtn";_node45.attrs["on-tap"] = "goNextPage(1)";_$temp = _node45;{
							var _$parent51 = _$temp;var _node46 = { "attrs": {}, "tagName": "img", "sid": 36 };_node46.children = [];_node46.childHash = 0;_node46.attrSize = 2;_node46.attrHash = 3104397433;_node46.attrs["src"] = "../../../res/image1/btn_yun_1.png";_node46.attrs["w-class"] = "btnImg";_$parent51.children.push(_node46);
						}_$temp = _node45;{
							var _$parent52 = _$temp;var _node47 = { "attrs": {}, "tagName": "div", "sid": 37 };_node47.children = [];_node47.childHash = 128124650;_node47.attrSize = 1;_node47.attrHash = 3434925620;_node47.attrs["w-class"] = "btnMess";_$temp = _node47;{
								var _$parent53 = _$temp;var _node48 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 38 };_node48.hasChild = false;_node48.child = null;_node48.childHash = 1139088841;_node48.attrHash = 0;_$temp = _node48;{
									var _$parent54 = _$temp;var _node49 = {}; //jpair pre

									{
										var _jvalue19 = "";
										_jvalue19 = "领分红";
										//jpair suf

										_node49["zh_Hans"] = _jvalue19;
									}
									//jpair pre

									{
										var _jvalue20 = "";
										_jvalue20 = "領分紅";
										//jpair suf

										_node49["zh_Hant"] = _jvalue20;
									}
									//jpair pre

									{
										var _jvalue21 = "";
										_jvalue21 = "";
										//jpair suf

										_node49["en"] = _jvalue21;
									}
									_addJson(_node49, _$parent54);
								}_$parent53.children.push(_node48);
							}_$parent52.children.push(_node47);
						}_$parent50.children.push(_node45);
					}_$temp = _node44;{
						var _$parent55 = _$temp;var _node50 = { "attrs": {}, "tagName": "div", "sid": 39 };_node50.children = [];_node50.childHash = 868275022;_node50.attrSize = 2;_node50.attrHash = 1781634815;_node50.attrs["w-class"] = "oneBtn";_node50.attrs["on-tap"] = "goNextPage(2)";_$temp = _node50;{
							var _$parent56 = _$temp;var _node51 = { "attrs": {}, "tagName": "img", "sid": 40 };_node51.children = [];_node51.childHash = 0;_node51.attrSize = 2;_node51.attrHash = 3405518036;_node51.attrs["src"] = "../../../res/image1/btn_yun_2.png";_node51.attrs["w-class"] = "btnImg";_$parent56.children.push(_node51);
						}_$temp = _node50;{
							var _$parent57 = _$temp;var _node52 = { "attrs": {}, "tagName": "div", "sid": 41 };_node52.children = [];_node52.childHash = 3852093510;_node52.attrSize = 1;_node52.attrHash = 3434925620;_node52.attrs["w-class"] = "btnMess";_$temp = _node52;{
								var _$parent58 = _$temp;var _node53 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 42 };_node53.hasChild = false;_node53.child = null;_node53.childHash = 2423480515;_node53.attrHash = 0;_$temp = _node53;{
									var _$parent59 = _$temp;var _node54 = {}; //jpair pre

									{
										var _jvalue22 = "";
										_jvalue22 = "发红包";
										//jpair suf

										_node54["zh_Hans"] = _jvalue22;
									}
									//jpair pre

									{
										var _jvalue23 = "";
										_jvalue23 = "發紅包";
										//jpair suf

										_node54["zh_Hant"] = _jvalue23;
									}
									//jpair pre

									{
										var _jvalue24 = "";
										_jvalue24 = "";
										//jpair suf

										_node54["en"] = _jvalue24;
									}
									_addJson(_node54, _$parent59);
								}_$parent58.children.push(_node53);
							}_$parent57.children.push(_node52);
						}_$parent55.children.push(_node50);
					}_$temp = _node44;{
						var _$parent60 = _$temp;var _node55 = { "attrs": {}, "tagName": "div", "sid": 43 };_node55.children = [];_node55.childHash = 2344186374;_node55.attrSize = 2;_node55.attrHash = 755973867;_node55.attrs["w-class"] = "oneBtn";_node55.attrs["on-tap"] = "goNextPage(3)";_$temp = _node55;{
							var _$parent61 = _$temp;var _node56 = { "attrs": {}, "tagName": "img", "sid": 44 };_node56.children = [];_node56.childHash = 0;_node56.attrSize = 2;_node56.attrHash = 1747533302;_node56.attrs["src"] = "../../../res/image1/btn_yun_3.png";_node56.attrs["w-class"] = "btnImg";_$parent61.children.push(_node56);
						}_$temp = _node55;{
							var _$parent62 = _$temp;var _node57 = { "attrs": {}, "tagName": "div", "sid": 45 };_node57.children = [];_node57.childHash = 1012954019;_node57.attrSize = 1;_node57.attrHash = 3434925620;_node57.attrs["w-class"] = "btnMess";_$temp = _node57;{
								var _$parent63 = _$temp;var _node58 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 46 };_node58.hasChild = false;_node58.child = null;_node58.childHash = 863138032;_node58.attrHash = 0;_$temp = _node58;{
									var _$parent64 = _$temp;var _node59 = {}; //jpair pre

									{
										var _jvalue25 = "";
										_jvalue25 = "兑换";
										//jpair suf

										_node59["zh_Hans"] = _jvalue25;
									}
									//jpair pre

									{
										var _jvalue26 = "";
										_jvalue26 = "兌換";
										//jpair suf

										_node59["zh_Hant"] = _jvalue26;
									}
									//jpair pre

									{
										var _jvalue27 = "";
										_jvalue27 = "";
										//jpair suf

										_node59["en"] = _jvalue27;
									}
									_addJson(_node59, _$parent64);
								}_$parent63.children.push(_node58);
							}_$parent62.children.push(_node57);
						}_$parent60.children.push(_node55);
					}_$temp = _node44;{
						var _$parent65 = _$temp;var _node60 = { "attrs": {}, "tagName": "div", "sid": 47 };_node60.children = [];_node60.childHash = 2922882341;_node60.attrSize = 2;_node60.attrHash = 363039755;_node60.attrs["w-class"] = "oneBtn";_node60.attrs["on-tap"] = "goNextPage(4)";_$temp = _node60;{
							var _$parent66 = _$temp;var _node61 = { "attrs": {}, "tagName": "img", "sid": 48 };_node61.children = [];_node61.childHash = 0;_node61.attrSize = 2;_node61.attrHash = 848111067;_node61.attrs["src"] = "../../../res/image1/btn_yun_4.png";_node61.attrs["w-class"] = "btnImg";_$parent66.children.push(_node61);
						}_$temp = _node60;{
							var _$parent67 = _$temp;var _node62 = { "attrs": {}, "tagName": "div", "sid": 49 };_node62.children = [];_node62.childHash = 4102542398;_node62.attrSize = 1;_node62.attrHash = 3434925620;_node62.attrs["w-class"] = "btnMess";_$temp = _node62;{
								var _$parent68 = _$temp;var _node63 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 50 };_node63.hasChild = false;_node63.child = null;_node63.childHash = 1089704715;_node63.attrHash = 0;_$temp = _node63;{
									var _$parent69 = _$temp;var _node64 = {}; //jpair pre

									{
										var _jvalue28 = "";
										_jvalue28 = "做任务";
										//jpair suf

										_node64["zh_Hans"] = _jvalue28;
									}
									//jpair pre

									{
										var _jvalue29 = "";
										_jvalue29 = "做任務";
										//jpair suf

										_node64["zh_Hant"] = _jvalue29;
									}
									//jpair pre

									{
										var _jvalue30 = "";
										_jvalue30 = "";
										//jpair suf

										_node64["en"] = _jvalue30;
									}
									_addJson(_node64, _$parent69);
								}_$parent68.children.push(_node63);
							}_$parent67.children.push(_node62);
						}_$parent65.children.push(_node60);
					}_$parent49.children.push(_node44);
				}_$temp = _node7;{
					var _$parent70 = _$temp;var _node65 = { "attrs": {}, "tagName": "div", "sid": 51 };_node65.children = [];_node65.childHash = 1907248004;_node65.attrSize = 1;_node65.attrHash = 1094900014;_node65.attrs["style"] = "display: flex;align-items: center;";_$temp = _node65;{
						var _$parent71 = _$temp;var _node66 = { "attrs": {}, "tagName": "span", "sid": 52 };_node66.children = [];_node66.childHash = 2642715316;_node66.attrSize = 1;_node66.attrHash = 1737618097;_node66.attrs["w-class"] = "welfare";_$temp = _node66;{
							var _$parent72 = _$temp;var _node67 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 53 };_node67.hasChild = false;_node67.child = null;_node67.childHash = 3356240149;_node67.attrHash = 0;_$temp = _node67;{
								var _$parent73 = _$temp;var _node68 = {}; //jpair pre

								{
									var _jvalue31 = "";
									_jvalue31 = "福利活动";
									//jpair suf

									_node68["zh_Hans"] = _jvalue31;
								}
								//jpair pre

								{
									var _jvalue32 = "";
									_jvalue32 = "福利活動";
									//jpair suf

									_node68["zh_Hant"] = _jvalue32;
								}
								//jpair pre

								{
									var _jvalue33 = "";
									_jvalue33 = "";
									//jpair suf

									_node68["en"] = _jvalue33;
								}
								_addJson(_node68, _$parent73);
							}_$parent72.children.push(_node67);
						}_$parent71.children.push(_node66);
					}_$temp = _node65;{
						var _$parent74 = _$temp;var _node69 = { "attrs": {}, "tagName": "span", "sid": 54 };_node69.children = [];_node69.childHash = 2837545588;_node69.attrSize = 1;_node69.attrHash = 1745367832;_node69.attrs["on-tap"] = "openDemo";_$temp = _node69;{
							var _$parent75 = _$temp;var _node70 = _installText("点我弹出Demo", 3663182801);;
							_$parent75.children.push(_node70);
						}_$parent74.children.push(_node69);
					}_$parent70.children.push(_node65);
				}_$temp = _node7;{
					var _$parent76 = _$temp;var _node71 = { "attrs": {}, "tagName": "div", "sid": 55 };_node71.children = [];_node71.childHash = 803211608;_node71.attrSize = 1;_node71.attrHash = 80165423;_node71.attrs["style"] = "margin: 15px 20px;";_$temp = _node71;{
						var _$parent77 = _$temp;var _node72 = { "attrs": {}, "tagName": "widget", "sid": 56 };_node72.hasChild = false;_node72.child = null;_node72.childHash = 1166204297;_node72.attrSize = 2;_node72.attrHash = 826412306;_node72.attrs["w-tag"] = "pi-ui-langImg";_node72.tagName = _node72.attrs["w-tag"];_node72.attrs["style"] = "height: 250px;width: 100%;";_node72.attrs["on-tap"] = "doActivity(0)";_$temp = _node72;{
							var _$parent78 = _$temp;var _node73 = {}; //jpair pre

							{
								var _jvalue34 = "";
								_jvalue34 = "app/res/image1/activity1_CN.jpg";
								//jpair suf

								_node73["zh_Hans"] = _jvalue34;
							}
							//jpair pre

							{
								var _jvalue35 = "";
								_jvalue35 = "app/res/image1/activity1_TW.jpg";
								//jpair suf

								_node73["zh_Hant"] = _jvalue35;
							}
							//jpair pre

							{
								var _jvalue36 = "";
								_jvalue36 = "";
								//jpair suf

								_node73["en"] = _jvalue36;
							}
							_addJson(_node73, _$parent78);
						}_$parent77.children.push(_node72);
					}_$temp = _node71;{
						var _$parent79 = _$temp;var _node74 = { "attrs": {}, "tagName": "widget", "sid": 57 };_node74.hasChild = false;_node74.child = null;_node74.childHash = 655059594;_node74.attrSize = 2;_node74.attrHash = 2580899476;_node74.attrs["w-tag"] = "pi-ui-langImg";_node74.tagName = _node74.attrs["w-tag"];_node74.attrs["style"] = "height: 250px;width: 100%;margin-top: 30px;";_node74.attrs["on-tap"] = "doActivity(1)";_$temp = _node74;{
							var _$parent80 = _$temp;var _node75 = {}; //jpair pre

							{
								var _jvalue37 = "";
								_jvalue37 = "app/res/image1/activity2_CN.jpg";
								//jpair suf

								_node75["zh_Hans"] = _jvalue37;
							}
							//jpair pre

							{
								var _jvalue38 = "";
								_jvalue38 = "app/res/image1/activity2_TW.jpg";
								//jpair suf

								_node75["zh_Hant"] = _jvalue38;
							}
							//jpair pre

							{
								var _jvalue39 = "";
								_jvalue39 = "";
								//jpair suf

								_node75["en"] = _jvalue39;
							}
							_addJson(_node75, _$parent80);
						}_$parent79.children.push(_node74);
					}_$parent76.children.push(_node71);
				}_chFunc(_node7);_$parent7.children.push(_node7);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent81 = _$temp;var _node76 = { "attrs": {}, "tagName": "div", "sid": 58 };_node76.children = [];_node76.childHash = 2946814719;_node76.attrSize = 1;_node76.attrHash = 580350684;_node76.attrs["w-class"] = "bottomMode";_$parent81.children.push(_node76);
		}_chFunc(_node);return _node;
	}
});