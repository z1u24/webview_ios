(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 4120364114;_node2.attrs["w-class"] = "top-head";_node2.attrs["ev-next-click"] = "doScanClick";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					{
						var jvalue = "";
						jvalue += it.currencyName;jvalue += "转账";
						//jpair suf

						_node4["title"] = jvalue;
					}
					//jpair pre

					{
						var _jvalue = "";
						_jvalue = "#fff";
						//jpair suf

						_node4["background"] = _jvalue;
					}
					//jpair pre

					{
						var _jvalue2 = "";
						_jvalue2 = "../../res/image/scan.png";
						//jpair suf

						_node4["nextImg"] = _jvalue2;
					}
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 4252679546;_node5.attrs["w-class"] = "body";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 2812074640;_node6.attrs["w-class"] = "container";_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrHash = 0;_$temp = _node7;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 1045235690;_node8.attrs["w-class"] = "item";_$temp = _node8;{
							var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 948163967;_node9.attrs["w-class"] = "inner-tip";_$temp = _node9;{
								var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "span", "sid": 8 };_node10.children = [];_node10.attrHash = 0;_$temp = _node10;{
									var _$parent11 = _$temp;_addText(it.currencyName, _$parent11);
								}_$temp = _node10;{
									var _$parent12 = _$temp;var _node11 = _installText("转账", 3857191924);;
									_$parent12.children.push(_node11);
								}_chFunc(_node10);_$parent10.children.push(_node10);
							}_$temp = _node9;{
								var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "span", "sid": 9 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 1349797565;_node12.attrs["w-class"] = "balance";_$temp = _node12;{
									var _$parent14 = _$temp;var _node13 = _installText("余额：&nbsp;", 1640511530);;
									_$parent14.children.push(_node13);
								}_$temp = _node12;{
									var _$parent15 = _$temp;_addText(it1.balance, _$parent15);
								}_chFunc(_node12);_$parent13.children.push(_node12);
							}_chFunc(_node9);_$parent9.children.push(_node9);
						}_$temp = _node8;{
							var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 10 };_node14.children = [];_node14.attrSize = 2;_node14.attrHash = 3806745363;_node14.attrs["w-class"] = "input-father";_node14.attrs["ev-input-change"] = "amountChange";_$temp = _node14;{
								var _$parent17 = _$temp;var _node15 = { "attrs": {}, "tagName": "app-components-input-input", "sid": 11 };_node15.hasChild = false;_node15.child = null;_node15.attrHash = 0;_$temp = _node15;{
									var _$parent18 = _$temp;var _node16 = {}; //jpair pre

									{
										var _jvalue3 = "";
										_jvalue3 = "number";
										//jpair suf

										_node16["itype"] = _jvalue3;
									}
									//jpair pre

									{
										var _jvalue4 = "";
										_jvalue4 = "输入金额";
										//jpair suf

										_node16["placeHolder"] = _jvalue4;
									}
									//jpair pre

									{
										var _jvalue5 = "";
										_jvalue5 = "padding:0;";
										//jpair suf

										_node16["style"] = _jvalue5;
									}
									//jpair pre

									_node16["input"] = it1.amount;
									//jpair suf
									//jpair pre

									_node16["disabled"] = it1.inputDisabled;
									//jpair suf
									_addJson(_node16, _$parent18);
								}_chFunc(_node15);_$parent17.children.push(_node15);
							}_$temp = _node14;{
								var _$parent19 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 12 };_node17.children = [];_node17.childHash = 1497213090;_node17.attrSize = 1;_node17.attrHash = 1532757002;_node17.attrs["w-class"] = "balance-value";_$temp = _node17;{
									var _$parent20 = _$temp;var _node18 = _installText("≈￥0.00", 4184745641);;
									_$parent20.children.push(_node18);
								}_$parent19.children.push(_node17);
							}_chFunc(_node14);_$parent16.children.push(_node14);
						}_chFunc(_node8);_$parent8.children.push(_node8);
					}_$temp = _node7;{
						var _$parent21 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 13 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 1045235690;_node19.attrs["w-class"] = "item";_$temp = _node19;{
							var _$parent22 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 14 };_node20.children = [];_node20.childHash = 422044200;_node20.attrSize = 1;_node20.attrHash = 948163967;_node20.attrs["w-class"] = "inner-tip";_$temp = _node20;{
								var _$parent23 = _$temp;var _node21 = { "attrs": {}, "tagName": "span", "sid": 15 };_node21.children = [];_node21.childHash = 304715098;_node21.attrHash = 0;_$temp = _node21;{
									var _$parent24 = _$temp;var _node22 = _installText("收款地址", 3414715046);;
									_$parent24.children.push(_node22);
								}_$parent23.children.push(_node21);
							}_$temp = _node20;{
								var _$parent25 = _$temp;var _node23 = { "attrs": {}, "tagName": "img", "sid": 16 };_node23.children = [];_node23.childHash = 0;_node23.attrSize = 1;_node23.attrHash = 2528061806;_node23.attrs["src"] = "../../../res/image/contact.png";_$parent25.children.push(_node23);
							}_$parent22.children.push(_node20);
						}_$temp = _node19;{
							var _$parent26 = _$temp;var _node24 = { "attrs": {}, "tagName": "div", "sid": 17 };_node24.children = [];_node24.attrSize = 2;_node24.attrHash = 785081609;_node24.attrs["w-class"] = "input-father1";_node24.attrs["ev-input-change"] = "toAddrChange";_$temp = _node24;{
								var _$parent27 = _$temp;var _node25 = { "attrs": {}, "tagName": "app-components-input-input", "sid": 18 };_node25.hasChild = false;_node25.child = null;_node25.attrHash = 0;_$temp = _node25;{
									var _$parent28 = _$temp;var _node26 = {}; //jpair pre

									{
										var _jvalue6 = "";
										_jvalue6 = "填入地址";
										//jpair suf

										_node26["placeHolder"] = _jvalue6;
									}
									//jpair pre

									{
										var _jvalue7 = "";
										_jvalue7 = "padding:0;";
										//jpair suf

										_node26["style"] = _jvalue7;
									}
									//jpair pre

									_node26["input"] = it1.toAddr;
									//jpair suf
									//jpair pre

									_node26["disabled"] = it1.inputDisabled;
									//jpair suf
									_addJson(_node26, _$parent28);
								}_chFunc(_node25);_$parent27.children.push(_node25);
							}_chFunc(_node24);_$parent26.children.push(_node24);
						}_chFunc(_node19);_$parent21.children.push(_node19);
					}_$temp = _node7;{
						var _$parent29 = _$temp;var _node27 = { "attrs": {}, "tagName": "div", "sid": 19 };_node27.children = [];_node27.attrSize = 1;_node27.attrHash = 1045235690;_node27.attrs["w-class"] = "item";_$temp = _node27;{
							var _$parent30 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 20 };_node28.children = [];_node28.childHash = 463877018;_node28.attrSize = 1;_node28.attrHash = 948163967;_node28.attrs["w-class"] = "inner-tip";_$temp = _node28;{
								var _$parent31 = _$temp;var _node29 = { "attrs": {}, "tagName": "span", "sid": 21 };_node29.children = [];_node29.childHash = 3336816395;_node29.attrHash = 0;_$temp = _node29;{
									var _$parent32 = _$temp;var _node30 = _installText("付款地址", 1327604916);;
									_$parent32.children.push(_node30);
								}_$parent31.children.push(_node29);
							}_$parent30.children.push(_node28);
						}_$temp = _node27;{
							var _$parent33 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 22 };_node31.children = [];_node31.attrSize = 1;_node31.attrHash = 689952449;_node31.attrs["w-class"] = "from-addr";_$temp = _node31;{
								var _$parent34 = _$temp;_addText(it1.fromAddr, _$parent34);
							}_chFunc(_node31);_$parent33.children.push(_node31);
						}_chFunc(_node27);_$parent29.children.push(_node27);
					}_$temp = _node7;{
						var _$parent35 = _$temp;var _node32 = { "attrs": {}, "tagName": "div", "sid": 23 };_node32.children = [];_node32.attrSize = 1;_node32.attrHash = 1045235690;_node32.attrs["w-class"] = "item";_$temp = _node32;{
							var _$parent36 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 24 };_node33.children = [];_node33.attrSize = 1;_node33.attrHash = 948163967;_node33.attrs["w-class"] = "inner-tip";_$temp = _node33;{
								var _$parent37 = _$temp;var _node34 = { "attrs": {}, "tagName": "div", "sid": 25 };_node34.children = [];_node34.attrHash = 0;_$temp = _node34;{
									var _$parent38 = _$temp;var _node35 = { "attrs": {}, "tagName": "span", "sid": 26 };_node35.children = [];_node35.childHash = 343849556;_node35.attrHash = 0;_$temp = _node35;{
										var _$parent39 = _$temp;var _node36 = _installText("到账速度", 2959036423);;
										_$parent39.children.push(_node36);
									}_$parent38.children.push(_node35);
								}_$temp = _node34;{
									var _$parent40 = _$temp;var _node37 = { "attrs": {}, "tagName": "span", "sid": 27 };_node37.children = [];_node37.attrSize = 1;_node37.attrHash = 2475578990;_node37.attrs["w-class"] = "speed";_$temp = _node37;{
										var _$parent41 = _$temp;_addText(it1.minerFeeList[it1.curLevel].text, _$parent41);
									}_chFunc(_node37);_$parent40.children.push(_node37);
								}_chFunc(_node34);_$parent37.children.push(_node34);
							}_$temp = _node33;{
								var _$parent42 = _$temp;var _node38 = { "attrs": {}, "tagName": "img", "sid": 28 };_node38.children = [];_node38.childHash = 0;_node38.attrSize = 2;_node38.attrHash = 241041747;_node38.attrs["src"] = "../../../res/image/41_blue.png";_node38.attrs["on-tap"] = "speedDescClick";_$parent42.children.push(_node38);
							}_chFunc(_node33);_$parent36.children.push(_node33);
						}_$temp = _node32;{
							var _$parent43 = _$temp;var _node39 = { "attrs": {}, "tagName": "div", "sid": 29 };_node39.children = [];_node39.attrSize = 1;_node39.attrHash = 3633564651;_node39.attrs["w-class"] = "speed-time";_$temp = _node39;{
								var _$parent44 = _$temp;_addText(it1.minerFeeList[it1.curLevel].time, _$parent44);
							}_chFunc(_node39);_$parent43.children.push(_node39);
						}_chFunc(_node32);_$parent35.children.push(_node32);
					}_$temp = _node7;{
						var _$parent45 = _$temp;var _node40 = { "attrs": {}, "tagName": "div", "sid": 30 };_node40.children = [];_node40.attrSize = 2;_node40.attrHash = 2582971015;_node40.attrs["w-class"] = "choose-fee";_node40.attrs["on-tap"] = "chooseMinerFee";_$temp = _node40;{
							var _$parent46 = _$temp;var _node41 = { "attrs": {}, "tagName": "span", "sid": 31 };_node41.children = [];_node41.childHash = 3880216523;_node41.attrHash = 0;_$temp = _node41;{
								var _$parent47 = _$temp;var _node42 = _installText("矿工费", 2445841764);;
								_$parent47.children.push(_node42);
							}_$parent46.children.push(_node41);
						}_$temp = _node40;{
							var _$parent48 = _$temp;var _node43 = { "attrs": {}, "tagName": "div", "sid": 32 };_node43.children = [];_node43.attrSize = 1;_node43.attrHash = 1744097630;_node43.attrs["w-class"] = "fees";_$temp = _node43;{
								var _$parent49 = _$temp;var _node44 = { "attrs": {}, "tagName": "span", "sid": 33 };_node44.children = [];_node44.attrSize = 1;_node44.attrHash = 3070649413;_node44.attrs["w-class"] = "fee";_$temp = _node44;{
									var _$parent50 = _$temp;_addText(it1.minerFee, _$parent50);
								}_chFunc(_node44);_$parent49.children.push(_node44);
							}_$temp = _node43;{
								var _$parent51 = _$temp;var _node45 = { "attrs": {}, "tagName": "img", "sid": 34 };_node45.children = [];_node45.childHash = 0;_node45.attrSize = 1;_node45.attrHash = 1593016281;_node45.attrs["src"] = "../../../res/image/right_arrow_blue.png";_$parent51.children.push(_node45);
							}_chFunc(_node43);_$parent48.children.push(_node43);
						}_chFunc(_node40);_$parent45.children.push(_node40);
					}_chFunc(_node7);_$parent7.children.push(_node7);
				}_$temp = _node6;{
					var _$parent52 = _$temp;var _node46 = { "attrs": {}, "tagName": "div", "sid": 35 };_node46.children = [];_node46.childHash = 1028141699;_node46.attrSize = 2;_node46.attrHash = 1573521945;_node46.attrs["ev-btn-tap"] = "nextClick";_node46.attrs["w-class"] = "btn";_$temp = _node46;{
						var _$parent53 = _$temp;var _node47 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 36 };_node47.hasChild = false;_node47.child = null;_node47.childHash = 2822766093;_node47.attrHash = 0;_$temp = _node47;{
							var _$parent54 = _$temp;var _node48 = {}; //jpair pre

							{
								var _jvalue8 = "";
								_jvalue8 = "下一步";
								//jpair suf

								_node48["name"] = _jvalue8;
							}
							//jpair pre

							{
								var _jvalue9 = "";
								_jvalue9 = "big";
								//jpair suf

								_node48["types"] = _jvalue9;
							}
							//jpair pre

							{
								var _jvalue10 = "";
								_jvalue10 = "blue";
								//jpair suf

								_node48["color"] = _jvalue10;
							}
							_addJson(_node48, _$parent54);
						}_$parent53.children.push(_node47);
					}_$parent52.children.push(_node46);
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});