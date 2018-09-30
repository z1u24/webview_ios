(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 4120364114;_node2.attrs["w-class"] = "top-head";_node2.attrs["ev-next-click"] = "doScanClick";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					{
						var jvalue = "";
						jvalue += it.currencyName + it1.cfgData.topBarTitle;jvalue += "";
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
									var _$parent11 = _$temp;_addText(it.currencyName + it1.cfgData.tags[0], _$parent11);
								}_chFunc(_node10);_$parent10.children.push(_node10);
							}_$temp = _node9;{
								var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "span", "sid": 9 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 1349797565;_node11.attrs["w-class"] = "balance";_$temp = _node11;{
									var _$parent13 = _$temp;_addText(it1.cfgData.tags[1], _$parent13);
								}_$temp = _node11;{
									var _$parent14 = _$temp;var _node12 = _installText("&nbsp;", 1553561131);;
									_$parent14.children.push(_node12);
								}_$temp = _node11;{
									var _$parent15 = _$temp;_addText(it1.balance, _$parent15);
								}_chFunc(_node11);_$parent12.children.push(_node11);
							}_chFunc(_node9);_$parent9.children.push(_node9);
						}_$temp = _node8;{
							var _$parent16 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 10 };_node13.children = [];_node13.attrSize = 2;_node13.attrHash = 3806745363;_node13.attrs["w-class"] = "input-father";_node13.attrs["ev-input-change"] = "amountChange";_$temp = _node13;{
								var _$parent17 = _$temp;var _node14 = { "attrs": {}, "tagName": "app-components-input-input", "sid": 11 };_node14.hasChild = false;_node14.child = null;_node14.attrHash = 0;_$temp = _node14;{
									var _$parent18 = _$temp;var _node15 = {}; //jpair pre

									{
										var _jvalue3 = "";
										_jvalue3 = "number";
										//jpair suf

										_node15["itype"] = _jvalue3;
									}
									//jpair pre

									_node15["placeHolder"] = it1.cfgData.inputPlace;
									//jpair suf
									//jpair pre

									{
										var _jvalue4 = "";
										_jvalue4 = "padding:0;";
										//jpair suf

										_node15["style"] = _jvalue4;
									}
									//jpair pre

									_node15["input"] = it1.amount;
									//jpair suf
									//jpair pre

									_node15["disabled"] = it1.inputDisabled;
									//jpair suf
									_addJson(_node15, _$parent18);
								}_chFunc(_node14);_$parent17.children.push(_node14);
							}_$temp = _node13;{
								var _$parent19 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 12 };_node16.children = [];_node16.childHash = 1497213090;_node16.attrSize = 1;_node16.attrHash = 1532757002;_node16.attrs["w-class"] = "balance-value";_$temp = _node16;{
									var _$parent20 = _$temp;var _node17 = _installText("≈￥0.00", 4184745641);;
									_$parent20.children.push(_node17);
								}_$parent19.children.push(_node16);
							}_chFunc(_node13);_$parent16.children.push(_node13);
						}_chFunc(_node8);_$parent8.children.push(_node8);
					}_$temp = _node7;{
						var _$parent21 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 13 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 1045235690;_node18.attrs["w-class"] = "item";_$temp = _node18;{
							var _$parent22 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 14 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 948163967;_node19.attrs["w-class"] = "inner-tip";_$temp = _node19;{
								var _$parent23 = _$temp;var _node20 = { "attrs": {}, "tagName": "span", "sid": 15 };_node20.children = [];_node20.attrHash = 0;_$temp = _node20;{
									var _$parent24 = _$temp;_addText(it1.cfgData.tags[2], _$parent24);
								}_chFunc(_node20);_$parent23.children.push(_node20);
							}_$temp = _node19;{
								var _$parent25 = _$temp;var _node21 = { "attrs": {}, "tagName": "img", "sid": 16 };_node21.children = [];_node21.childHash = 0;_node21.attrSize = 1;_node21.attrHash = 2528061806;_node21.attrs["src"] = "../../../res/image/contact.png";_$parent25.children.push(_node21);
							}_chFunc(_node19);_$parent22.children.push(_node19);
						}_$temp = _node18;{
							var _$parent26 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 17 };_node22.children = [];_node22.attrSize = 2;_node22.attrHash = 785081609;_node22.attrs["w-class"] = "input-father1";_node22.attrs["ev-input-change"] = "toAddrChange";_$temp = _node22;{
								var _$parent27 = _$temp;var _node23 = { "attrs": {}, "tagName": "app-components-input-input", "sid": 18 };_node23.hasChild = false;_node23.child = null;_node23.attrHash = 0;_$temp = _node23;{
									var _$parent28 = _$temp;var _node24 = {}; //jpair pre

									_node24["placeHolder"] = it1.cfgData.inputPlace;
									//jpair suf
									//jpair pre

									{
										var _jvalue5 = "";
										_jvalue5 = "padding:0;";
										//jpair suf

										_node24["style"] = _jvalue5;
									}
									//jpair pre

									_node24["input"] = it1.toAddr;
									//jpair suf
									//jpair pre

									_node24["disabled"] = it1.inputDisabled;
									//jpair suf
									_addJson(_node24, _$parent28);
								}_chFunc(_node23);_$parent27.children.push(_node23);
							}_chFunc(_node22);_$parent26.children.push(_node22);
						}_chFunc(_node18);_$parent21.children.push(_node18);
					}_$temp = _node7;{
						var _$parent29 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 19 };_node25.children = [];_node25.attrSize = 1;_node25.attrHash = 1045235690;_node25.attrs["w-class"] = "item";_$temp = _node25;{
							var _$parent30 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 20 };_node26.children = [];_node26.attrSize = 1;_node26.attrHash = 948163967;_node26.attrs["w-class"] = "inner-tip";_$temp = _node26;{
								var _$parent31 = _$temp;var _node27 = { "attrs": {}, "tagName": "span", "sid": 21 };_node27.children = [];_node27.attrHash = 0;_$temp = _node27;{
									var _$parent32 = _$temp;_addText(it1.cfgData.tags[3], _$parent32);
								}_chFunc(_node27);_$parent31.children.push(_node27);
							}_chFunc(_node26);_$parent30.children.push(_node26);
						}_$temp = _node25;{
							var _$parent33 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 22 };_node28.children = [];_node28.attrSize = 1;_node28.attrHash = 689952449;_node28.attrs["w-class"] = "from-addr";_$temp = _node28;{
								var _$parent34 = _$temp;_addText(it1.fromAddr, _$parent34);
							}_chFunc(_node28);_$parent33.children.push(_node28);
						}_chFunc(_node25);_$parent29.children.push(_node25);
					}_$temp = _node7;{
						var _$parent35 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 23 };_node29.children = [];_node29.attrSize = 1;_node29.attrHash = 1045235690;_node29.attrs["w-class"] = "item";_$temp = _node29;{
							var _$parent36 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 24 };_node30.children = [];_node30.attrSize = 1;_node30.attrHash = 948163967;_node30.attrs["w-class"] = "inner-tip";_$temp = _node30;{
								var _$parent37 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 25 };_node31.children = [];_node31.attrHash = 0;_$temp = _node31;{
									var _$parent38 = _$temp;var _node32 = { "attrs": {}, "tagName": "span", "sid": 26 };_node32.children = [];_node32.attrHash = 0;_$temp = _node32;{
										var _$parent39 = _$temp;_addText(it1.cfgData.tags[4], _$parent39);
									}_chFunc(_node32);_$parent38.children.push(_node32);
								}_$temp = _node31;{
									var _$parent40 = _$temp;var _node33 = { "attrs": {}, "tagName": "span", "sid": 27 };_node33.children = [];_node33.attrSize = 1;_node33.attrHash = 2475578990;_node33.attrs["w-class"] = "speed";_$temp = _node33;{
										var _$parent41 = _$temp;_addText(it1.minerFeeList[it1.curLevel].text, _$parent41);
									}_chFunc(_node33);_$parent40.children.push(_node33);
								}_chFunc(_node31);_$parent37.children.push(_node31);
							}_$temp = _node30;{
								var _$parent42 = _$temp;var _node34 = { "attrs": {}, "tagName": "img", "sid": 28 };_node34.children = [];_node34.childHash = 0;_node34.attrSize = 2;_node34.attrHash = 241041747;_node34.attrs["src"] = "../../../res/image/41_blue.png";_node34.attrs["on-tap"] = "speedDescClick";_$parent42.children.push(_node34);
							}_chFunc(_node30);_$parent36.children.push(_node30);
						}_$temp = _node29;{
							var _$parent43 = _$temp;var _node35 = { "attrs": {}, "tagName": "div", "sid": 29 };_node35.children = [];_node35.attrSize = 1;_node35.attrHash = 3633564651;_node35.attrs["w-class"] = "speed-time";_$temp = _node35;{
								var _$parent44 = _$temp;_addText(it1.minerFeeList[it1.curLevel].time, _$parent44);
							}_chFunc(_node35);_$parent43.children.push(_node35);
						}_chFunc(_node29);_$parent35.children.push(_node29);
					}_$temp = _node7;{
						var _$parent45 = _$temp;var _node36 = { "attrs": {}, "tagName": "div", "sid": 30 };_node36.children = [];_node36.attrSize = 2;_node36.attrHash = 2582971015;_node36.attrs["w-class"] = "choose-fee";_node36.attrs["on-tap"] = "chooseMinerFee";_$temp = _node36;{
							var _$parent46 = _$temp;var _node37 = { "attrs": {}, "tagName": "span", "sid": 31 };_node37.children = [];_node37.attrHash = 0;_$temp = _node37;{
								var _$parent47 = _$temp;_addText(it1.cfgData.tags[5], _$parent47);
							}_chFunc(_node37);_$parent46.children.push(_node37);
						}_$temp = _node36;{
							var _$parent48 = _$temp;var _node38 = { "attrs": {}, "tagName": "div", "sid": 32 };_node38.children = [];_node38.attrSize = 1;_node38.attrHash = 1744097630;_node38.attrs["w-class"] = "fees";_$temp = _node38;{
								var _$parent49 = _$temp;var _node39 = { "attrs": {}, "tagName": "span", "sid": 33 };_node39.children = [];_node39.attrSize = 1;_node39.attrHash = 3070649413;_node39.attrs["w-class"] = "fee";_$temp = _node39;{
									var _$parent50 = _$temp;_addText(it1.minerFee, _$parent50);
								}_chFunc(_node39);_$parent49.children.push(_node39);
							}_$temp = _node38;{
								var _$parent51 = _$temp;var _node40 = { "attrs": {}, "tagName": "img", "sid": 34 };_node40.children = [];_node40.childHash = 0;_node40.attrSize = 1;_node40.attrHash = 1593016281;_node40.attrs["src"] = "../../../res/image/right_arrow_blue.png";_$parent51.children.push(_node40);
							}_chFunc(_node38);_$parent48.children.push(_node38);
						}_chFunc(_node36);_$parent45.children.push(_node36);
					}_chFunc(_node7);_$parent7.children.push(_node7);
				}_$temp = _node6;{
					var _$parent52 = _$temp;var _node41 = { "attrs": {}, "tagName": "div", "sid": 35 };_node41.children = [];_node41.attrSize = 2;_node41.attrHash = 1573521945;_node41.attrs["ev-btn-tap"] = "nextClick";_node41.attrs["w-class"] = "btn";_$temp = _node41;{
						var _$parent53 = _$temp;var _node42 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 36 };_node42.hasChild = false;_node42.child = null;_node42.attrHash = 0;_$temp = _node42;{
							var _$parent54 = _$temp;var _node43 = {}; //jpair pre

							_node43["name"] = it1.cfgData.btnName;
							//jpair suf
							//jpair pre

							{
								var _jvalue6 = "";
								_jvalue6 = "big";
								//jpair suf

								_node43["types"] = _jvalue6;
							}
							//jpair pre

							{
								var _jvalue7 = "";
								_jvalue7 = "blue";
								//jpair suf

								_node43["color"] = _jvalue7;
							}
							_addJson(_node43, _$parent54);
						}_chFunc(_node42);_$parent53.children.push(_node42);
					}_chFunc(_node41);_$parent52.children.push(_node41);
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});