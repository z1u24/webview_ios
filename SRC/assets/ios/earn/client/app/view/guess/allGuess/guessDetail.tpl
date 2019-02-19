(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 4;_node.attrHash = 2349007316;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["ev-refresh-click"] = "initData";_$temp = _node;{
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
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrHash = 0;_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "widget", "sid": 5 };_node7.hasChild = false;_node7.child = null;_node7.attrHash = 1529494859;_node7.attrs["w-tag"] = "earn-client-app-components-guessItem-guessItem";_node7.tagName = _node7.attrs["w-tag"];_$temp = _node7;{
						var _$parent8 = _$temp;var _node8 = {}; //jpair pre

						_node8["showOdds"] = true;
						//jpair suf
						//jpair pre

						_node8["guessData"] = it.guessData;
						//jpair suf
						//jpair pre

						_node8["showBtn"] = false;
						//jpair suf
						_addJson(_node8, _$parent8);
					}_chFunc(_node7);_$parent7.children.push(_node7);
				}_$temp = _node6;{
					var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 708745537;_node9.attrs["w-class"] = "guess-box";_$temp = _node9;{
						var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 1751001085;_node10.attrs["w-class"] = "guess-btn-box";_$temp = _node10;{
							var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.attrSize = 2;_node11.attrHash = 3542622911;_node11.attrs["on-tap"] = "btnClick(e,2,1)";_node11.attrs["w-class"] = "guess-btn left-guessbtn";_$temp = _node11;{
								var _$parent12 = _$temp;var _node12 = _installText("为", 2571046250);;
								_$parent12.children.push(_node12);
							}_$temp = _node11;{
								var _$parent13 = _$temp;_addText(it.guessData.team1, _$parent13);
							}_$temp = _node11;{
								var _$parent14 = _$temp;var _node13 = _installText("加油", 2609034774);;
								_$parent14.children.push(_node13);
							}_chFunc(_node11);_$parent11.children.push(_node11);
						}_$temp = _node10;{
							var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 9 };_node14.children = [];_node14.attrSize = 2;_node14.attrHash = 414340171;_node14.attrs["on-tap"] = "btnClick(e,2,2)";_node14.attrs["w-class"] = "guess-btn right-guessbtn";_$temp = _node14;{
								var _$parent16 = _$temp;var _node15 = _installText("为", 2571046250);;
								_$parent16.children.push(_node15);
							}_$temp = _node14;{
								var _$parent17 = _$temp;_addText(it.guessData.team2, _$parent17);
							}_$temp = _node14;{
								var _$parent18 = _$temp;var _node16 = _installText("加油", 2609034774);;
								_$parent18.children.push(_node16);
							}_chFunc(_node14);_$parent15.children.push(_node14);
						}_chFunc(_node10);_$parent10.children.push(_node10);
					}_$temp = _node9;{
						var _$parent19 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 10 };_node17.children = [];_node17.attrSize = 2;_node17.attrHash = 3232263060;_node17.attrs["w-class"] = "input-box";_node17.attrs["ev-input-change"] = "inputChange";_$temp = _node17;{
							var _$parent20 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 11 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 1725998838;_node18.attrs["style"] = "height:50%";inputPlace = { "zh_Hans": "0.1ST", "zh_Hant": "0.1ST", "en": "" };_$temp = _node18;{
								var _$parent21 = _$temp;var _node19 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 12 };_node19.hasChild = false;_node19.child = null;_node19.attrHash = 0;_$temp = _node19;{
									var _$parent22 = _$temp;var _node20 = {}; //jpair pre

									{
										var jvalue = "";
										jvalue = "moneyNum1";
										//jpair suf

										_node20["itype"] = jvalue;
									}
									//jpair pre

									_node20["maxLength"] = 7;
									//jpair suf
									//jpair pre

									_node20["placeHolder"] = inputPlace;
									//jpair suf
									//jpair pre

									_node20["input"] = it.defaultGuessStNum;
									//jpair suf
									//jpair pre

									{
										var _jvalue = "";
										_jvalue = "padding:0;background:transparent;color:white;text-align:center";
										//jpair suf

										_node20["style"] = _jvalue;
									}
									_addJson(_node20, _$parent22);
								}_chFunc(_node19);_$parent21.children.push(_node19);
							}_chFunc(_node18);_$parent20.children.push(_node18);
						}_$temp = _node17;{
							var _$parent23 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 13 };_node21.children = [];_node21.attrSize = 1;_node21.attrHash = 107013482;_node21.attrs["w-class"] = "predict";_$temp = _node21;{
								var _$parent24 = _$temp;var _node22 = { "attrs": {}, "tagName": "span", "sid": 14 };_node22.children = [];_node22.attrHash = 0;_$temp = _node22;{
									var _$parent25 = _$temp;_addText(it.predictEarnTeam1, _$parent25);
								}_$temp = _node22;{
									var _$parent26 = _$temp;var _node23 = _installText("ST", 3826742053);;
									_$parent26.children.push(_node23);
								}_chFunc(_node22);_$parent24.children.push(_node22);
							}_$temp = _node21;{
								var _$parent27 = _$temp;var _node24 = { "attrs": {}, "tagName": "widget", "sid": 15 };_node24.hasChild = false;_node24.child = null;_node24.childHash = 380980649;_node24.attrHash = 2467408643;_node24.attrs["w-tag"] = "pi-ui-lang";_node24.tagName = _node24.attrs["w-tag"];_$temp = _node24;{
									var _$parent28 = _$temp;var _node25 = {}; //jpair pre

									{
										var _jvalue2 = "";
										_jvalue2 = "预测收益";
										//jpair suf

										_node25["zh_Hans"] = _jvalue2;
									}
									//jpair pre

									{
										var _jvalue3 = "";
										_jvalue3 = "預測收益";
										//jpair suf

										_node25["zh_Hant"] = _jvalue3;
									}
									//jpair pre

									{
										var _jvalue4 = "";
										_jvalue4 = "";
										//jpair suf

										_node25["en"] = _jvalue4;
									}
									_addJson(_node25, _$parent28);
								}_$parent27.children.push(_node24);
							}_$temp = _node21;{
								var _$parent29 = _$temp;var _node26 = { "attrs": {}, "tagName": "span", "sid": 16 };_node26.children = [];_node26.attrHash = 0;_$temp = _node26;{
									var _$parent30 = _$temp;_addText(it.predictEarnTeam2, _$parent30);
								}_$temp = _node26;{
									var _$parent31 = _$temp;var _node27 = _installText("ST", 3826742053);;
									_$parent31.children.push(_node27);
								}_chFunc(_node26);_$parent29.children.push(_node26);
							}_chFunc(_node21);_$parent23.children.push(_node21);
						}_chFunc(_node17);_$parent19.children.push(_node17);
					}_$temp = _node9;{
						var _$parent32 = _$temp;var _node28 = { "attrs": {}, "tagName": "widget", "sid": 17 };_node28.hasChild = false;_node28.child = null;_node28.childHash = 1819698929;_node28.attrSize = 1;_node28.attrHash = 2229405631;_node28.attrs["w-class"] = "tip";_node28.attrs["w-tag"] = "pi-ui-lang";_node28.tagName = _node28.attrs["w-tag"];_$temp = _node28;{
							var _$parent33 = _$temp;var _node29 = {}; //jpair pre

							{
								var _jvalue5 = "";
								_jvalue5 = "当前收益仅供参考，具体以结束时为准";
								//jpair suf

								_node29["zh_Hans"] = _jvalue5;
							}
							//jpair pre

							{
								var _jvalue6 = "";
								_jvalue6 = "当前收益仅供参考，具体以结束时为准";
								//jpair suf

								_node29["zh_Hant"] = _jvalue6;
							}
							//jpair pre

							{
								var _jvalue7 = "";
								_jvalue7 = "";
								//jpair suf

								_node29["en"] = _jvalue7;
							}
							_addJson(_node29, _$parent33);
						}_$parent32.children.push(_node28);
					}_chFunc(_node9);_$parent9.children.push(_node9);
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_$temp = _node5;{
				var _$parent34 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 18 };_node30.children = [];_node30.attrSize = 1;_node30.attrHash = 832204064;_node30.attrs["w-class"] = "bottom";_$temp = _node30;{
					var _$parent35 = _$temp;var _node31 = { "attrs": {}, "tagName": "widget", "sid": 19 };_node31.hasChild = false;_node31.child = null;_node31.attrHash = 2467408643;_node31.attrs["w-tag"] = "pi-ui-lang";_node31.tagName = _node31.attrs["w-tag"];_$temp = _node31;{
						var _$parent36 = _$temp;var _node32 = {}; //jpair pre

						{
							var _jvalue8 = "";
							_jvalue8 += "我的ST：";_jvalue8 += it.selfSTnum;_jvalue8 += "ST";
							//jpair suf

							_node32["zh_Hans"] = _jvalue8;
						}
						//jpair pre

						{
							var _jvalue9 = "";
							_jvalue9 += "我的ST：";_jvalue9 += it.selfSTnum;_jvalue9 += "ST";
							//jpair suf

							_node32["zh_Hant"] = _jvalue9;
						}
						//jpair pre

						{
							var _jvalue10 = "";
							_jvalue10 = "";
							//jpair suf

							_node32["en"] = _jvalue10;
						}
						_addJson(_node32, _$parent36);
					}_chFunc(_node31);_$parent35.children.push(_node31);
				}_$temp = _node30;{
					var _$parent37 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 20 };_node33.children = [];_node33.childHash = 972407182;_node33.attrSize = 1;_node33.attrHash = 171783709;_node33.attrs["style"] = "display: flex;";_$temp = _node33;{
						var _$parent38 = _$temp;var _node34 = { "attrs": {}, "tagName": "widget", "sid": 21 };_node34.hasChild = false;_node34.child = null;_node34.childHash = 1620279894;_node34.attrSize = 2;_node34.attrHash = 3109324393;_node34.attrs["w-class"] = "btn";_node34.attrs["on-tap"] = "btnClick(e,1)";_node34.attrs["w-tag"] = "pi-ui-lang";_node34.tagName = _node34.attrs["w-tag"];_$temp = _node34;{
							var _$parent39 = _$temp;var _node35 = {}; //jpair pre

							{
								var _jvalue11 = "";
								_jvalue11 = "充值";
								//jpair suf

								_node35["zh_Hans"] = _jvalue11;
							}
							//jpair pre

							{
								var _jvalue12 = "";
								_jvalue12 = "充值";
								//jpair suf

								_node35["zh_Hant"] = _jvalue12;
							}
							//jpair pre

							{
								var _jvalue13 = "";
								_jvalue13 = "";
								//jpair suf

								_node35["en"] = _jvalue13;
							}
							_addJson(_node35, _$parent39);
						}_$parent38.children.push(_node34);
					}_$temp = _node33;{
						var _$parent40 = _$temp;var _node36 = { "attrs": {}, "tagName": "widget", "sid": 22 };_node36.hasChild = false;_node36.child = null;_node36.childHash = 1434640078;_node36.attrSize = 2;_node36.attrHash = 1990777193;_node36.attrs["w-class"] = "btn";_node36.attrs["on-tap"] = "btnClick(e,0)";_node36.attrs["w-tag"] = "pi-ui-lang";_node36.tagName = _node36.attrs["w-tag"];_$temp = _node36;{
							var _$parent41 = _$temp;var _node37 = {}; //jpair pre

							{
								var _jvalue14 = "";
								_jvalue14 = "广告送ST";
								//jpair suf

								_node37["zh_Hans"] = _jvalue14;
							}
							//jpair pre

							{
								var _jvalue15 = "";
								_jvalue15 = "广告送ST";
								//jpair suf

								_node37["zh_Hant"] = _jvalue15;
							}
							//jpair pre

							{
								var _jvalue16 = "";
								_jvalue16 = "";
								//jpair suf

								_node37["en"] = _jvalue16;
							}
							_addJson(_node37, _$parent41);
						}_$parent40.children.push(_node36);
					}_$parent37.children.push(_node33);
				}_chFunc(_node30);_$parent34.children.push(_node30);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});