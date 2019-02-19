(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 5;_node.attrHash = 2851242308;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["ev-next-click"] = "goDetail";_node.attrs["ev-refresh-click"] = "refreshPage";topBarTitle = { "zh_Hans": "领分红", "zh_Hant": "領分紅", "en": "" };_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar2", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["scrollHeight"] = it.scrollHeight;
				//jpair suf
				//jpair pre

				_node3["text"] = topBarTitle;
				//jpair suf
				//jpair pre

				_node3["nextImg"] = it.scrollHeight > 0 ? "../../res/image/41_gray.png" : "../../res/image/41_white.png";
				//jpair suf
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.childHash = 3417562939;_node4.attrSize = 1;_node4.attrHash = 3779102506;_node4.attrs["style"] = "text-align: center;position: absolute;width: 100%;top: 150px;z-index: 0;";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 3 };_node5.children = [];_node5.childHash = 0;_node5.attrSize = 2;_node5.attrHash = 68926909;_node5.attrs["src"] = "../../../res/image/dividend_background.png";_node5.attrs["style"] = "width: 570px;";_$parent5.children.push(_node5);
			}_$parent4.children.push(_node4);
		}_$temp = _node;{
			var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 3;_node6.attrHash = 1985805996;_node6.attrs["w-class"] = "content";_node6.attrs["on-scroll"] = "getMoreList";_node6.attrs["id"] = "historylist";_$temp = _node6;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 3958668344;_node7.attrs["id"] = "history";_$temp = _node7;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 3090186721;_node8.attrs["w-class"] = "groupcard";_$temp = _node8;{
						var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.childHash = 2350745868;_node9.attrSize = 1;_node9.attrHash = 1875170223;_node9.attrs["w-class"] = "dividend-title";_$temp = _node9;{
							var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 8 };_node10.hasChild = false;_node10.child = null;_node10.childHash = 2903427177;_node10.attrHash = 0;_$temp = _node10;{
								var _$parent11 = _$temp;var _node11 = {}; //jpair pre

								{
									var jvalue = "";
									jvalue = "累计分红(ETH)";
									//jpair suf

									_node11["zh_Hans"] = jvalue;
								}
								//jpair pre

								{
									var _jvalue = "";
									_jvalue = "累計分紅(ETH)";
									//jpair suf

									_node11["zh_Hant"] = _jvalue;
								}
								//jpair pre

								{
									var _jvalue2 = "";
									_jvalue2 = "";
									//jpair suf

									_node11["en"] = _jvalue2;
								}
								_addJson(_node11, _$parent11);
							}_$parent10.children.push(_node10);
						}_$parent9.children.push(_node9);
					}_$temp = _node8;{
						var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 427216314;_node12.attrs["w-class"] = "dividend-money";_$temp = _node12;{
							var _$parent13 = _$temp;_addText(it.totalDivid, _$parent13);
						}_chFunc(_node12);_$parent12.children.push(_node12);
					}_$temp = _node8;{
						var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 10 };_node13.children = [];_node13.childHash = 2946814719;_node13.attrSize = 1;_node13.attrHash = 3144420239;_node13.attrs["w-class"] = "dividLine";_$parent14.children.push(_node13);
					}_$temp = _node8;{
						var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 11 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 2271325905;_node14.attrs["w-class"] = "dividend-sum";_$temp = _node14;{
							var _$parent16 = _$temp;var _node15 = { "attrs": {}, "tagName": "span", "sid": 12 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 3608606104;_node15.attrs["style"] = "display: inline-block;vertical-align: middle;";_$temp = _node15;{
								var _$parent17 = _$temp;var _node16 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 13 };_node16.hasChild = false;_node16.child = null;_node16.childHash = 1601369458;_node16.attrHash = 0;_$temp = _node16;{
									var _$parent18 = _$temp;var _node17 = {}; //jpair pre

									{
										var _jvalue3 = "";
										_jvalue3 = "持有";
										//jpair suf

										_node17["zh_Hans"] = _jvalue3;
									}
									//jpair pre

									{
										var _jvalue4 = "";
										_jvalue4 = "持有";
										//jpair suf

										_node17["zh_Hant"] = _jvalue4;
									}
									//jpair pre

									{
										var _jvalue5 = "";
										_jvalue5 = "";
										//jpair suf

										_node17["en"] = _jvalue5;
									}
									_addJson(_node17, _$parent18);
								}_$parent17.children.push(_node16);
							}_$temp = _node15;{
								var _$parent19 = _$temp;var _node18 = _installText("&nbsp;", 1553561131);;
								_$parent19.children.push(_node18);
							}_$temp = _node15;{
								var _$parent20 = _$temp;_addText(it.ktBalance, _$parent20);
							}_$temp = _node15;{
								var _$parent21 = _$temp;var _node19 = _installText("&nbsp;KT", 1397001297);;
								_$parent21.children.push(_node19);
							}_chFunc(_node15);_$parent16.children.push(_node15);
						}_chFunc(_node14);_$parent15.children.push(_node14);
					}_chFunc(_node8);_$parent8.children.push(_node8);
				}_$temp = _node7;{
					var _$parent22 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 14 };_node20.children = [];_node20.attrSize = 1;_node20.attrHash = 2511157203;_node20.attrs["style"] = "margin-top: 10px;transform: translateZ(-1px);";threeCard = [{ zh_Hans: "年化收益", zh_Hant: "年化收益", en: "" }, { zh_Hans: "本次分红", zh_Hant: "本次分紅", en: "" }, { zh_Hans: "已分红天数", zh_Hant: "已分紅天數", en: "" }];_$temp = _node20;{
						var _$parent23 = _$temp;var _node21 = { "attrs": {}, "tagName": "app-components-threeParaCard-threeParaCard", "sid": 15 };_node21.hasChild = false;_node21.child = null;_node21.attrHash = 0;_$temp = _node21;{
							var _$parent24 = _$temp;var _node22 = {}; //jpair pre

							_node22["name"] = threeCard;
							//jpair suf
							//jpair pre

							_$temp = _node22;{
								var _$parent25 = _$temp;_$temp = _node22;{
									var _$parent26 = _$temp;var _node23 = [];_node23[0] = it.yearIncome;_node23[1] = it.thisDivid;_node23[2] = it.totalDays;_$parent26["data"] = _node23;
								}
								//jpair suf
							}_addJson(_node22, _$parent24);
						}_chFunc(_node21);_$parent23.children.push(_node21);
					}_chFunc(_node20);_$parent22.children.push(_node20);
				}_$temp = _node7;{
					var _$parent27 = _$temp;var _node24 = { "attrs": {}, "tagName": "div", "sid": 16 };_node24.children = [];_node24.attrSize = 2;_node24.attrHash = 558225676;_node24.attrs["id"] = "dividendBtn";_node24.attrs["style"] = "text-align: center;margin-top: 180px;height: 200px;";_$temp = _node24;{
						var _$parent28 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 17 };_node25.children = [];_node25.attrSize = 3;_node25.attrHash = 3827939633;_node25.attrs["w-class"] = "miningBtn";_node25.attrs["on-tap"] = "doMining";{
							var attrvalue = "";attrvalue += "color: #fff;animation:";attrvalue += it.isAbleBtn ? 'dividendChange 0.2s' : '';attrvalue += "";_node25.attrs["style"] = attrvalue;
						}_node25.attrHash = _hash.nextHash(_node25.attrHash, _calTextHash(_node25.attrs["style"]));_$temp = _node25;{
							var _$parent29 = _$temp;var _node26 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 18 };_node26.hasChild = false;_node26.child = null;_node26.childHash = 1139088841;_node26.attrHash = 0;_$temp = _node26;{
								var _$parent30 = _$temp;var _node27 = {}; //jpair pre

								{
									var _jvalue6 = "";
									_jvalue6 = "领分红";
									//jpair suf

									_node27["zh_Hans"] = _jvalue6;
								}
								//jpair pre

								{
									var _jvalue7 = "";
									_jvalue7 = "領分紅";
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
						}_chFunc(_node25);_$parent28.children.push(_node25);
					}_$temp = _node24;{
						var _$parent31 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 19 };_node28.children = [];_node28.attrSize = 2;_node28.attrHash = 4069970227;_node28.attrs["class"] = "dividendNum";{
							var _attrvalue = "";_attrvalue += "animation:";_attrvalue += it.doMining ? 'dividendMove 1s' : '';_attrvalue += "";_node28.attrs["style"] = _attrvalue;
						}_node28.attrHash = _hash.nextHash(_node28.attrHash, _calTextHash(_node28.attrs["style"]));_$temp = _node28;{
							var _$parent32 = _$temp;var _node29 = { "attrs": {}, "tagName": "span", "sid": 20 };_node29.children = [];_node29.attrHash = 0;_$temp = _node29;{
								var _$parent33 = _$temp;var _node30 = _installText("+", 3807426999);;
								_$parent33.children.push(_node30);
							}_$temp = _node29;{
								var _$parent34 = _$temp;_addText(it.thisDivid, _$parent34);
							}_chFunc(_node29);_$parent32.children.push(_node29);
						}_chFunc(_node28);_$parent31.children.push(_node28);
					}_chFunc(_node24);_$parent27.children.push(_node24);
				}_$temp = _node7;{
					var _$parent35 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 21 };_node31.children = [];_node31.attrSize = 1;_node31.attrHash = 840313844;_node31.attrs["w-class"] = "history";_$temp = _node31;{
						var _$parent36 = _$temp;var _node32 = { "attrs": {}, "tagName": "div", "sid": 22 };_node32.children = [];_node32.childHash = 3590125974;_node32.attrSize = 1;_node32.attrHash = 4046753769;_node32.attrs["w-class"] = "historyTitle";_$temp = _node32;{
							var _$parent37 = _$temp;var _node33 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 23 };_node33.hasChild = false;_node33.child = null;_node33.childHash = 4191141471;_node33.attrHash = 0;_$temp = _node33;{
								var _$parent38 = _$temp;var _node34 = {}; //jpair pre

								{
									var _jvalue9 = "";
									_jvalue9 = "分红记录";
									//jpair suf

									_node34["zh_Hans"] = _jvalue9;
								}
								//jpair pre

								{
									var _jvalue10 = "";
									_jvalue10 = "分紅記錄";
									//jpair suf

									_node34["zh_Hant"] = _jvalue10;
								}
								//jpair pre

								{
									var _jvalue11 = "";
									_jvalue11 = "";
									//jpair suf

									_node34["en"] = _jvalue11;
								}
								_addJson(_node34, _$parent38);
							}_$parent37.children.push(_node33);
						}_$parent36.children.push(_node32);
					}if (it.data.length == 0) {
						_$temp = _node31;{
							var _$parent39 = _$temp;var _node35 = { "attrs": {}, "tagName": "div", "sid": 24 };_node35.children = [];_node35.childHash = 3808241759;_node35.attrSize = 1;_node35.attrHash = 3809030542;_node35.attrs["w-class"] = "historyNone";_$temp = _node35;{
								var _$parent40 = _$temp;var _node36 = { "attrs": {}, "tagName": "img", "sid": 25 };_node36.children = [];_node36.childHash = 0;_node36.attrSize = 2;_node36.attrHash = 1093656218;_node36.attrs["src"] = "../../../res/image/dividend_history_none.png";_node36.attrs["style"] = "width: 200px;height: 200px;";_$parent40.children.push(_node36);
							}_$temp = _node35;{
								var _$parent41 = _$temp;var _node37 = { "attrs": {}, "tagName": "div", "sid": 26 };_node37.children = [];_node37.childHash = 3525846262;_node37.attrHash = 0;_$temp = _node37;{
									var _$parent42 = _$temp;var _node38 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 27 };_node38.hasChild = false;_node38.child = null;_node38.childHash = 2043208451;_node38.attrHash = 0;_$temp = _node38;{
										var _$parent43 = _$temp;var _node39 = {}; //jpair pre

										{
											var _jvalue12 = "";
											_jvalue12 = "还没有记录哦";
											//jpair suf

											_node39["zh_Hans"] = _jvalue12;
										}
										//jpair pre

										{
											var _jvalue13 = "";
											_jvalue13 = "還沒有記錄哦";
											//jpair suf

											_node39["zh_Hant"] = _jvalue13;
										}
										//jpair pre

										{
											var _jvalue14 = "";
											_jvalue14 = "";
											//jpair suf

											_node39["en"] = _jvalue14;
										}
										_addJson(_node39, _$parent43);
									}_$parent42.children.push(_node38);
								}_$parent41.children.push(_node37);
							}_$parent39.children.push(_node35);
						}
					}_$temp = _node31;{
						var _$parent44 = _$temp;var _node40 = { "attrs": {}, "tagName": "div", "sid": 28 };_node40.children = [];_node40.attrSize = 1;_node40.attrHash = 1389042152;_node40.attrs["w-class"] = "historyContent";{
							var _$i = 0;
							for (var _iterator = it.data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
								var _ref;

								if (_isArray) {
									if (_i >= _iterator.length) break;
									_ref = _iterator[_i++];
								} else {
									_i = _iterator.next();
									if (_i.done) break;
									_ref = _i.value;
								}

								var val = _ref;
								var ind = _$i++;_$temp = _node40;{
									var _$parent45 = _$temp;var _node41 = { "attrs": {}, "tagName": "div", "sid": 29 };_node41.children = [];_node41.attrSize = 1;_node41.attrHash = 574965062;_node41.attrs["w-class"] = "historyItem";_$temp = _node41;{
										var _$parent46 = _$temp;var _node42 = { "attrs": {}, "tagName": "span", "sid": 30 };_node42.children = [];_node42.attrSize = 1;_node42.attrHash = 3223011840;_node42.attrs["style"] = "flex: 1;";_$temp = _node42;{
											var _$parent47 = _$temp;_addText(val.time, _$parent47);
										}_chFunc(_node42);_$parent46.children.push(_node42);
									}_$temp = _node41;{
										var _$parent48 = _$temp;var _node43 = { "attrs": {}, "tagName": "span", "sid": 31 };_node43.children = [];_node43.attrHash = 0;_$temp = _node43;{
											var _$parent49 = _$temp;_addText(val.num + " ETH", _$parent49);
										}_chFunc(_node43);_$parent48.children.push(_node43);
									}_chFunc(_node41);_$parent45.children.push(_node41);
								}
							}
						}if (it.data.length > 0 && !it.hasMore) {
							_$temp = _node40;{
								var _$parent50 = _$temp;var _node44 = { "attrs": {}, "tagName": "div", "sid": 32 };_node44.children = [];_node44.childHash = 783069360;_node44.attrSize = 1;_node44.attrHash = 3992589513;_node44.attrs["w-class"] = "endMess";_$temp = _node44;{
									var _$parent51 = _$temp;var _node45 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 33 };_node45.hasChild = false;_node45.child = null;_node45.childHash = 1461306196;_node45.attrHash = 0;_$temp = _node45;{
										var _$parent52 = _$temp;var _node46 = {}; //jpair pre

										{
											var _jvalue15 = "";
											_jvalue15 = "到此结束啦";
											//jpair suf

											_node46["zh_Hans"] = _jvalue15;
										}
										//jpair pre

										{
											var _jvalue16 = "";
											_jvalue16 = "到此結束啦";
											//jpair suf

											_node46["zh_Hant"] = _jvalue16;
										}
										//jpair pre

										{
											var _jvalue17 = "";
											_jvalue17 = "";
											//jpair suf

											_node46["en"] = _jvalue17;
										}
										_addJson(_node46, _$parent52);
									}_$parent51.children.push(_node45);
								}_$temp = _node44;{
									var _$parent53 = _$temp;var _node47 = _installText("^_^", 2624223669);;
									_$parent53.children.push(_node47);
								}_$parent50.children.push(_node44);
							}
						}_chFunc(_node40);_$parent44.children.push(_node40);
					}_chFunc(_node31);_$parent35.children.push(_node31);
				}_chFunc(_node7);_$parent7.children.push(_node7);
			}_chFunc(_node6);_$parent6.children.push(_node6);
		}_chFunc(_node);return _node;
	}
});