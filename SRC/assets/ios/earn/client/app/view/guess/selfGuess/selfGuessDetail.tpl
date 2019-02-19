(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 928170999;_node2.attrs["style"] = "background:black;";topBarTitle = { "zh_Hans": "详情", "zh_Hant": "详情", "en": "" };_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "widget", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 2388812205;_node3.attrs["w-tag"] = "app-components1-topBar-topBar2";_node3.tagName = _node3.attrs["w-tag"];_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["scrollHeight"] = 0;
					//jpair suf
					//jpair pre

					_node4["text"] = topBarTitle;
					//jpair suf
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 487306359;_node5.attrs["w-class"] = "content";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 3820340678;_node6.attrs["w-class"] = "detail";_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 1210607516;_node7.attrs["w-class"] = "detail-box";_$temp = _node7;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 75034878;_node8.attrs["w-class"] = "detail-box-top";if (it.guessData.state !== 2) {
							_$temp = _node8;{
								var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "img", "sid": 7 };_node9.children = [];_node9.childHash = 0;_node9.attrSize = 4;_node9.attrHash = 4092243683;_node9.attrs["src"] = "../../../res/image/guessing_team.png";_node9.attrs["style"] = "transform: translateY(-100px);";_node9.attrs["width"] = "200px";_node9.attrs["height"] = "200px";_$parent9.children.push(_node9);
							}_$temp = _node8;{
								var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.childHash = 1183682436;_node10.attrSize = 1;_node10.attrHash = 1254003987;_node10.attrs["style"] = "margin-top:-70px";_$temp = _node10;{
									var _$parent11 = _$temp;var _node11 = _installText("竞赛中", 2909254800);;
									_$parent11.children.push(_node11);
								}_$parent10.children.push(_node10);
							}
						} else {
							if (it.guessData.result === 1) {
								_$temp = _node8;{
									var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "img", "sid": 9 };_node12.children = [];_node12.attrSize = 4;_node12.attrHash = 1262209745;{
										var attrvalue = "";attrvalue += "../../../res/image/guessTeam/";attrvalue += it.guessData.team1;attrvalue += ".png";_node12.attrs["src"] = attrvalue;
									}_node12.attrHash = _hash.nextHash(_node12.attrHash, _calTextHash(_node12.attrs["src"]));_node12.attrs["style"] = "transform: translateY(-100px);";_node12.attrs["width"] = "200px";_node12.attrs["height"] = "200px";_chFunc(_node12);_$parent12.children.push(_node12);
								}_$temp = _node8;{
									var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 10 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 1254003987;_node13.attrs["style"] = "margin-top:-70px";_$temp = _node13;{
										var _$parent14 = _$temp;_addText(it.guessData.team1, _$parent14);
									}_$temp = _node13;{
										var _$parent15 = _$temp;var _node14 = _installText("胜", 826155093);;
										_$parent15.children.push(_node14);
									}_chFunc(_node13);_$parent13.children.push(_node13);
								}
							} else if (it.guessData.result === 2) {
								_$temp = _node8;{
									var _$parent16 = _$temp;var _node15 = { "attrs": {}, "tagName": "img", "sid": 11 };_node15.children = [];_node15.attrSize = 4;_node15.attrHash = 1262209745;{
										var _attrvalue = "";_attrvalue += "../../../res/image/guessTeam/";_attrvalue += it.guessData.team2;_attrvalue += ".png";_node15.attrs["src"] = _attrvalue;
									}_node15.attrHash = _hash.nextHash(_node15.attrHash, _calTextHash(_node15.attrs["src"]));_node15.attrs["style"] = "transform: translateY(-100px);";_node15.attrs["width"] = "200px";_node15.attrs["height"] = "200px";_chFunc(_node15);_$parent16.children.push(_node15);
								}_$temp = _node8;{
									var _$parent17 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 12 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 1254003987;_node16.attrs["style"] = "margin-top:-70px";_$temp = _node16;{
										var _$parent18 = _$temp;_addText(it.guessData.team2, _$parent18);
									}_$temp = _node16;{
										var _$parent19 = _$temp;var _node17 = _installText("胜", 826155093);;
										_$parent19.children.push(_node17);
									}_chFunc(_node16);_$parent17.children.push(_node16);
								}
							} else if (it.guessData.result === 3) {
								_$temp = _node8;{
									var _$parent20 = _$temp;var _node18 = { "attrs": {}, "tagName": "img", "sid": 13 };_node18.children = [];_node18.childHash = 0;_node18.attrSize = 4;_node18.attrHash = 4092243683;_node18.attrs["src"] = "../../../res/image/guessing_team.png";_node18.attrs["style"] = "transform: translateY(-100px);";_node18.attrs["width"] = "200px";_node18.attrs["height"] = "200px";_$parent20.children.push(_node18);
								}_$temp = _node8;{
									var _$parent21 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 14 };_node19.children = [];_node19.childHash = 3047262766;_node19.attrSize = 1;_node19.attrHash = 1254003987;_node19.attrs["style"] = "margin-top:-70px";_$temp = _node19;{
										var _$parent22 = _$temp;var _node20 = _installText("比赛取消", 3983587483);;
										_$parent22.children.push(_node20);
									}_$parent21.children.push(_node19);
								}
							}
						}_chFunc(_node8);_$parent8.children.push(_node8);
					}_$temp = _node7;{
						var _$parent23 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 15 };_node21.children = [];_node21.attrSize = 1;_node21.attrHash = 1759299228;_node21.attrs["w-class"] = "guess-box-detail";_$temp = _node21;{
							var _$parent24 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 16 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 1230120020;_node22.attrs["w-class"] = "detail-item";_$temp = _node22;{
								var _$parent25 = _$temp;var _node23 = { "attrs": {}, "tagName": "widget", "sid": 17 };_node23.hasChild = false;_node23.child = null;_node23.childHash = 1481492515;_node23.attrHash = 2467408643;_node23.attrs["w-tag"] = "pi-ui-lang";_node23.tagName = _node23.attrs["w-tag"];_$temp = _node23;{
									var _$parent26 = _$temp;var _node24 = {}; //jpair pre

									{
										var jvalue = "";
										jvalue = "购买时间";
										//jpair suf

										_node24["zh_Hans"] = jvalue;
									}
									//jpair pre

									{
										var _jvalue = "";
										_jvalue = "購買時間";
										//jpair suf

										_node24["zh_Hant"] = _jvalue;
									}
									//jpair pre

									{
										var _jvalue2 = "";
										_jvalue2 = "";
										//jpair suf

										_node24["en"] = _jvalue2;
									}
									_addJson(_node24, _$parent26);
								}_$parent25.children.push(_node23);
							}_$temp = _node22;{
								var _$parent27 = _$temp;var _node25 = { "attrs": {}, "tagName": "span", "sid": 18 };_node25.children = [];_node25.attrHash = 0;_$temp = _node25;{
									var _$parent28 = _$temp;_addText(it.guessing.time, _$parent28);
								}_chFunc(_node25);_$parent27.children.push(_node25);
							}_chFunc(_node22);_$parent24.children.push(_node22);
						}_$temp = _node21;{
							var _$parent29 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 19 };_node26.children = [];_node26.attrSize = 1;_node26.attrHash = 1230120020;_node26.attrs["w-class"] = "detail-item";_$temp = _node26;{
								var _$parent30 = _$temp;var _node27 = { "attrs": {}, "tagName": "widget", "sid": 20 };_node27.hasChild = false;_node27.child = null;_node27.childHash = 1097824094;_node27.attrHash = 2467408643;_node27.attrs["w-tag"] = "pi-ui-lang";_node27.tagName = _node27.attrs["w-tag"];_$temp = _node27;{
									var _$parent31 = _$temp;var _node28 = {}; //jpair pre

									{
										var _jvalue3 = "";
										_jvalue3 = "购买比赛";
										//jpair suf

										_node28["zh_Hans"] = _jvalue3;
									}
									//jpair pre

									{
										var _jvalue4 = "";
										_jvalue4 = "購買比賽";
										//jpair suf

										_node28["zh_Hant"] = _jvalue4;
									}
									//jpair pre

									{
										var _jvalue5 = "";
										_jvalue5 = "";
										//jpair suf

										_node28["en"] = _jvalue5;
									}
									_addJson(_node28, _$parent31);
								}_$parent30.children.push(_node27);
							}_$temp = _node26;{
								var _$parent32 = _$temp;var _node29 = { "attrs": {}, "tagName": "span", "sid": 21 };_node29.children = [];_node29.attrHash = 0;_$temp = _node29;{
									var _$parent33 = _$temp;_addText(it.guessData.team1, _$parent33);
								}_$temp = _node29;{
									var _$parent34 = _$temp;var _node30 = _installText("&nbsp;vs&nbsp;", 2524349704);;
									_$parent34.children.push(_node30);
								}_$temp = _node29;{
									var _$parent35 = _$temp;_addText(it.guessData.team2, _$parent35);
								}_chFunc(_node29);_$parent32.children.push(_node29);
							}_chFunc(_node26);_$parent29.children.push(_node26);
						}_$temp = _node21;{
							var _$parent36 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 22 };_node31.children = [];_node31.attrSize = 1;_node31.attrHash = 1230120020;_node31.attrs["w-class"] = "detail-item";_$temp = _node31;{
								var _$parent37 = _$temp;var _node32 = { "attrs": {}, "tagName": "widget", "sid": 23 };_node32.hasChild = false;_node32.child = null;_node32.childHash = 3843722546;_node32.attrHash = 2467408643;_node32.attrs["w-tag"] = "pi-ui-lang";_node32.tagName = _node32.attrs["w-tag"];_$temp = _node32;{
									var _$parent38 = _$temp;var _node33 = {}; //jpair pre

									{
										var _jvalue6 = "";
										_jvalue6 = "我的竞猜";
										//jpair suf

										_node33["zh_Hans"] = _jvalue6;
									}
									//jpair pre

									{
										var _jvalue7 = "";
										_jvalue7 = "我的競猜";
										//jpair suf

										_node33["zh_Hant"] = _jvalue7;
									}
									//jpair pre

									{
										var _jvalue8 = "";
										_jvalue8 = "";
										//jpair suf

										_node33["en"] = _jvalue8;
									}
									_addJson(_node33, _$parent38);
								}_$parent37.children.push(_node32);
							}_$temp = _node31;{
								var _$parent39 = _$temp;var _node34 = { "attrs": {}, "tagName": "span", "sid": 24 };_node34.children = [];_node34.attrHash = 0;_$temp = _node34;{
									var _$parent40 = _$temp;_addText(it.guessing.guessTeam, _$parent40);
								}_$temp = _node34;{
									var _$parent41 = _$temp;var _node35 = _installText("&nbsp;胜", 517548636);;
									_$parent41.children.push(_node35);
								}_chFunc(_node34);_$parent39.children.push(_node34);
							}_chFunc(_node31);_$parent36.children.push(_node31);
						}_$temp = _node21;{
							var _$parent42 = _$temp;var _node36 = { "attrs": {}, "tagName": "div", "sid": 25 };_node36.children = [];_node36.attrSize = 1;_node36.attrHash = 1230120020;_node36.attrs["w-class"] = "detail-item";_$temp = _node36;{
								var _$parent43 = _$temp;var _node37 = { "attrs": {}, "tagName": "widget", "sid": 26 };_node37.hasChild = false;_node37.child = null;_node37.childHash = 2827965227;_node37.attrHash = 2467408643;_node37.attrs["w-tag"] = "pi-ui-lang";_node37.tagName = _node37.attrs["w-tag"];_$temp = _node37;{
									var _$parent44 = _$temp;var _node38 = {}; //jpair pre

									{
										var _jvalue9 = "";
										_jvalue9 = "我的购买";
										//jpair suf

										_node38["zh_Hans"] = _jvalue9;
									}
									//jpair pre

									{
										var _jvalue10 = "";
										_jvalue10 = "我的購買";
										//jpair suf

										_node38["zh_Hant"] = _jvalue10;
									}
									//jpair pre

									{
										var _jvalue11 = "";
										_jvalue11 = "";
										//jpair suf

										_node38["en"] = _jvalue11;
									}
									_addJson(_node38, _$parent44);
								}_$parent43.children.push(_node37);
							}_$temp = _node36;{
								var _$parent45 = _$temp;var _node39 = { "attrs": {}, "tagName": "span", "sid": 27 };_node39.children = [];_node39.attrHash = 0;_$temp = _node39;{
									var _$parent46 = _$temp;_addText(it.guessing.guessSTnum, _$parent46);
								}_$temp = _node39;{
									var _$parent47 = _$temp;var _node40 = _installText("&nbsp;ST", 1258959272);;
									_$parent47.children.push(_node40);
								}_chFunc(_node39);_$parent45.children.push(_node39);
							}_chFunc(_node36);_$parent42.children.push(_node36);
						}_$temp = _node21;{
							var _$parent48 = _$temp;var _node41 = { "attrs": {}, "tagName": "div", "sid": 28 };_node41.children = [];_node41.attrSize = 1;_node41.attrHash = 1230120020;_node41.attrs["w-class"] = "detail-item";if (it.guessData.state !== 2) {
								_$temp = _node41;{
									var _$parent49 = _$temp;var _node42 = { "attrs": {}, "tagName": "widget", "sid": 29 };_node42.hasChild = false;_node42.child = null;_node42.childHash = 2668064081;_node42.attrHash = 2467408643;_node42.attrs["w-tag"] = "pi-ui-lang";_node42.tagName = _node42.attrs["w-tag"];_$temp = _node42;{
										var _$parent50 = _$temp;var _node43 = {}; //jpair pre

										{
											var _jvalue12 = "";
											_jvalue12 = "预期收益";
											//jpair suf

											_node43["zh_Hans"] = _jvalue12;
										}
										//jpair pre

										{
											var _jvalue13 = "";
											_jvalue13 = "預期收益";
											//jpair suf

											_node43["zh_Hant"] = _jvalue13;
										}
										//jpair pre

										{
											var _jvalue14 = "";
											_jvalue14 = "";
											//jpair suf

											_node43["en"] = _jvalue14;
										}
										_addJson(_node43, _$parent50);
									}_$parent49.children.push(_node42);
								}
							} else {
								_$temp = _node41;{
									var _$parent51 = _$temp;var _node44 = { "attrs": {}, "tagName": "widget", "sid": 30 };_node44.hasChild = false;_node44.child = null;_node44.childHash = 1314823351;_node44.attrHash = 2467408643;_node44.attrs["w-tag"] = "pi-ui-lang";_node44.tagName = _node44.attrs["w-tag"];_$temp = _node44;{
										var _$parent52 = _$temp;var _node45 = {}; //jpair pre

										{
											var _jvalue15 = "";
											_jvalue15 = "实际收益";
											//jpair suf

											_node45["zh_Hans"] = _jvalue15;
										}
										//jpair pre

										{
											var _jvalue16 = "";
											_jvalue16 = "實際收益";
											//jpair suf

											_node45["zh_Hant"] = _jvalue16;
										}
										//jpair pre

										{
											var _jvalue17 = "";
											_jvalue17 = "";
											//jpair suf

											_node45["en"] = _jvalue17;
										}
										_addJson(_node45, _$parent52);
									}_$parent51.children.push(_node44);
								}
							}_$temp = _node41;{
								var _$parent53 = _$temp;var _node46 = { "attrs": {}, "tagName": "span", "sid": 31 };_node46.children = [];_node46.attrHash = 0;_$temp = _node46;{
									var _$parent54 = _$temp;_addText(it.guessing.benefit, _$parent54);
								}_$temp = _node46;{
									var _$parent55 = _$temp;var _node47 = _installText("&nbsp;ST", 1258959272);;
									_$parent55.children.push(_node47);
								}_chFunc(_node46);_$parent53.children.push(_node46);
							}_chFunc(_node41);_$parent48.children.push(_node41);
						}_chFunc(_node21);_$parent23.children.push(_node21);
					}_chFunc(_node7);_$parent7.children.push(_node7);
				}if (it.guessData.state !== 2 || it.guessData.result === 3) {
					_$temp = _node6;{
						var _$parent56 = _$temp;var _node48 = { "attrs": {}, "tagName": "div", "sid": 32 };_node48.children = [];_node48.childHash = 12197312;_node48.attrSize = 2;_node48.attrHash = 3303212675;_node48.attrs["w-class"] = "btn1";_node48.attrs["on-tap"] = "continueGuess";_$temp = _node48;{
							var _$parent57 = _$temp;var _node49 = _installText("继续加油", 4268152812);;
							_$parent57.children.push(_node49);
						}_$parent56.children.push(_node48);
					}
				} else {
					_$temp = _node6;{
						var _$parent58 = _$temp;var _node50 = { "attrs": {}, "tagName": "div", "sid": 33 };_node50.children = [];_node50.childHash = 503463737;_node50.attrSize = 2;_node50.attrHash = 2585026875;_node50.attrs["w-class"] = "btn1";_node50.attrs["on-tap"] = "backPrePage";_$temp = _node50;{
							var _$parent59 = _$temp;var _node51 = _installText("返回", 4211551885);;
							_$parent59.children.push(_node51);
						}_$parent58.children.push(_node50);
					}
				}_$temp = _node6;{
					var _$parent60 = _$temp;var _node52 = { "attrs": {}, "tagName": "div", "sid": 34 };_node52.children = [];_node52.childHash = 3957584421;_node52.attrSize = 2;_node52.attrHash = 1850095460;_node52.attrs["w-class"] = "btn2";_node52.attrs["on-tap"] = "shareClick";_$temp = _node52;{
						var _$parent61 = _$temp;var _node53 = _installText("分享", 2042836192);;
						_$parent61.children.push(_node53);
					}_$parent60.children.push(_node52);
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});