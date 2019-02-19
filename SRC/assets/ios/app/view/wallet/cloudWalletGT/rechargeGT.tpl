(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3673846548;_node2.attrs["w-class"] = "top-head";topBarTitle = { "zh_Hans": "GT充值", "zh_Hant": "GT充值", "en": "" };_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "widget", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 1483449382;_node3.attrs["w-tag"] = "app-components1-topBar-topBar";_node3.tagName = _node3.attrs["w-tag"];_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["title"] = topBarTitle;
					//jpair suf
					//jpair pre

					{
						var jvalue = "";
						jvalue = "linear-gradient(to right,#38CFE7,#318DE6);position: fixed;";
						//jpair suf

						_node4["background"] = jvalue;
					}
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 4252679546;_node5.attrs["w-class"] = "body";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 2502926294;_node6.attrs["w-class"] = "body-top";_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 948163967;_node7.attrs["w-class"] = "inner-tip";_$temp = _node7;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "span", "sid": 6 };_node8.children = [];_node8.childHash = 1065896311;_node8.attrSize = 1;_node8.attrHash = 1699263724;_node8.attrs["style"] = "position:relative";_$temp = _node8;{
							var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "img", "sid": 7 };_node9.children = [];_node9.childHash = 0;_node9.attrSize = 3;_node9.attrHash = 3108441008;_node9.attrs["src"] = "app/res/image/currency/ST.png";_node9.attrs["width"] = "32px";_node9.attrs["w-class"] = "input-icon";_$parent9.children.push(_node9);
						}_$temp = _node8;{
							var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "widget", "sid": 8 };_node10.hasChild = false;_node10.child = null;_node10.childHash = 2799285427;_node10.attrSize = 1;_node10.attrHash = 4193882604;_node10.attrs["w-tag"] = "pi-ui-lang";_node10.tagName = _node10.attrs["w-tag"];_node10.attrs["style"] = "padding-left:40px";_$temp = _node10;{
								var _$parent11 = _$temp;var _node11 = {}; //jpair pre

								{
									var _jvalue = "";
									_jvalue = "充值金额";
									//jpair suf

									_node11["zh_Hans"] = _jvalue;
								}
								//jpair pre

								{
									var _jvalue2 = "";
									_jvalue2 = "充值金額";
									//jpair suf

									_node11["zh_Hant"] = _jvalue2;
								}
								//jpair pre

								{
									var _jvalue3 = "";
									_jvalue3 = "";
									//jpair suf

									_node11["en"] = _jvalue3;
								}
								_addJson(_node11, _$parent11);
							}_$parent10.children.push(_node10);
						}_$parent8.children.push(_node8);
					}_$temp = _node7;{
						var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "span", "sid": 9 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 1349797565;_node12.attrs["w-class"] = "balance";_$temp = _node12;{
							var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 10 };_node13.hasChild = false;_node13.child = null;_node13.childHash = 1542162591;_node13.attrHash = 0;_$temp = _node13;{
								var _$parent14 = _$temp;var _node14 = {}; //jpair pre

								{
									var _jvalue4 = "";
									_jvalue4 = "余额：";
									//jpair suf

									_node14["zh_Hans"] = _jvalue4;
								}
								//jpair pre

								{
									var _jvalue5 = "";
									_jvalue5 = "餘額：";
									//jpair suf

									_node14["zh_Hant"] = _jvalue5;
								}
								//jpair pre

								{
									var _jvalue6 = "";
									_jvalue6 = "";
									//jpair suf

									_node14["en"] = _jvalue6;
								}
								_addJson(_node14, _$parent14);
							}_$parent13.children.push(_node13);
						}_$temp = _node12;{
							var _$parent15 = _$temp;var _node15 = _installText("&nbsp;", 1553561131);;
							_$parent15.children.push(_node15);
						}_$temp = _node12;{
							var _$parent16 = _$temp;_addText(it.balance % 1 === 0 ? it.balance.toFixed(2) : it.balance, _$parent16);
						}_chFunc(_node12);_$parent12.children.push(_node12);
					}_chFunc(_node7);_$parent7.children.push(_node7);
				}_$temp = _node6;{
					var _$parent17 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 11 };_node16.children = [];_node16.attrSize = 2;_node16.attrHash = 3806745363;_node16.attrs["w-class"] = "input-father";_node16.attrs["ev-input-change"] = "amountChange";inputPlace = { "zh_Hans": "￥输入金额", "zh_Hant": "￥輸入金額", "en": "" };_$temp = _node16;{
						var _$parent18 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 12 };_node17.children = [];_node17.attrSize = 1;_node17.attrHash = 1532757002;_node17.attrs["w-class"] = "balance-value";_$temp = _node17;{
							var _$parent19 = _$temp;var _node18 = _installText("≈", 1669375947);;
							_$parent19.children.push(_node18);
						}_$temp = _node17;{
							var _$parent20 = _$temp;_addText(it.num, _$parent20);
						}_$temp = _node17;{
							var _$parent21 = _$temp;var _node19 = _installText("&nbsp;ST", 1258959272);;
							_$parent21.children.push(_node19);
						}_chFunc(_node17);_$parent18.children.push(_node17);
					}_$temp = _node16;{
						var _$parent22 = _$temp;var _node20 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 13 };_node20.hasChild = false;_node20.child = null;_node20.attrHash = 0;_$temp = _node20;{
							var _$parent23 = _$temp;var _node21 = {}; //jpair pre

							{
								var _jvalue7 = "";
								_jvalue7 = "moneyNum";
								//jpair suf

								_node21["itype"] = _jvalue7;
							}
							//jpair pre

							_node21["maxLength"] = 7;
							//jpair suf
							//jpair pre

							_node21["placeHolder"] = inputPlace;
							//jpair suf
							//jpair pre

							_node21["input"] = it.total;
							//jpair suf
							//jpair pre

							{
								var _jvalue8 = "";
								_jvalue8 = "padding:0;background:transparent;";
								//jpair suf

								_node21["style"] = _jvalue8;
							}
							_addJson(_node21, _$parent23);
						}_chFunc(_node20);_$parent22.children.push(_node20);
					}_chFunc(_node16);_$parent17.children.push(_node16);
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_$temp = _node5;{
				var _$parent24 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 14 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 3244763850;_node22.attrs["w-class"] = "body-center";_$temp = _node22;{
					var _$parent25 = _$temp;var _node23 = { "attrs": {}, "tagName": "widget", "sid": 15 };_node23.hasChild = false;_node23.child = null;_node23.childHash = 3393341793;_node23.attrSize = 1;_node23.attrHash = 3436109550;_node23.attrs["w-class"] = "select-title";_node23.attrs["w-tag"] = "pi-ui-lang";_node23.tagName = _node23.attrs["w-tag"];_$temp = _node23;{
						var _$parent26 = _$temp;var _node24 = {}; //jpair pre

						{
							var _jvalue9 = "";
							_jvalue9 = "选择支付方式";
							//jpair suf

							_node24["zh_Hans"] = _jvalue9;
						}
						//jpair pre

						{
							var _jvalue10 = "";
							_jvalue10 = "選擇支付方式";
							//jpair suf

							_node24["zh_Hant"] = _jvalue10;
						}
						//jpair pre

						{
							var _jvalue11 = "";
							_jvalue11 = "";
							//jpair suf

							_node24["en"] = _jvalue11;
						}
						_addJson(_node24, _$parent26);
					}_$parent25.children.push(_node23);
				}_$temp = _node22;{
					var _$parent27 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 16 };_node25.children = [];_node25.attrSize = 1;_node25.attrHash = 3475297262;_node25.attrs["w-class"] = "select-body";_$temp = _node25;{
						var _$parent28 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 17 };_node26.children = [];_node26.attrSize = 3;_node26.attrHash = 4217000957;_node26.attrs["w-class"] = "select-item";_node26.attrs["on-tap"] = "changPay('wxpay')";_node26.attrs["style"] = "border-bottom:1px solid #DBDBE5";_$temp = _node26;{
							var _$parent29 = _$temp;var _node27 = { "attrs": {}, "tagName": "div", "sid": 18 };_node27.children = [];_node27.childHash = 3118500666;_node27.attrSize = 1;_node27.attrHash = 4058108698;_node27.attrs["w-class"] = "select-detail";_$temp = _node27;{
								var _$parent30 = _$temp;var _node28 = { "attrs": {}, "tagName": "img", "sid": 19 };_node28.children = [];_node28.childHash = 0;_node28.attrSize = 2;_node28.attrHash = 477831455;_node28.attrs["src"] = "app/res/image/wxPay.png";_node28.attrs["width"] = "60px";_$parent30.children.push(_node28);
							}_$temp = _node27;{
								var _$parent31 = _$temp;var _node29 = { "attrs": {}, "tagName": "widget", "sid": 20 };_node29.hasChild = false;_node29.child = null;_node29.childHash = 2272842201;_node29.attrSize = 1;_node29.attrHash = 843759300;_node29.attrs["w-class"] = "pay-name";_node29.attrs["w-tag"] = "pi-ui-lang";_node29.tagName = _node29.attrs["w-tag"];_$temp = _node29;{
									var _$parent32 = _$temp;var _node30 = {}; //jpair pre

									{
										var _jvalue12 = "";
										_jvalue12 = "微信支付";
										//jpair suf

										_node30["zh_Hans"] = _jvalue12;
									}
									//jpair pre

									{
										var _jvalue13 = "";
										_jvalue13 = "微信支付";
										//jpair suf

										_node30["zh_Hant"] = _jvalue13;
									}
									//jpair pre

									{
										var _jvalue14 = "";
										_jvalue14 = "";
										//jpair suf

										_node30["en"] = _jvalue14;
									}
									_addJson(_node30, _$parent32);
								}_$parent31.children.push(_node29);
							}_$parent29.children.push(_node27);
						}_$temp = _node26;{
							var _$parent33 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 21 };_node31.children = [];_node31.attrSize = 1;_node31.attrHash = 2915938051;_node31.attrs["w-class"] = "select-round";if (it.payType === 'wxpay') {
								_$temp = _node31;{
									var _$parent34 = _$temp;var _node32 = { "attrs": {}, "tagName": "img", "sid": 22 };_node32.children = [];_node32.childHash = 0;_node32.attrSize = 2;_node32.attrHash = 1525204880;_node32.attrs["src"] = "app/res/image/icon_right2.png";_node32.attrs["width"] = "42px";_$parent34.children.push(_node32);
								}
							} else {
								_$temp = _node31;{
									var _$parent35 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 23 };_node33.children = [];_node33.childHash = 2946814719;_node33.attrSize = 1;_node33.attrHash = 95270474;_node33.attrs["w-class"] = "select-img";_$parent35.children.push(_node33);
								}
							}_chFunc(_node31);_$parent33.children.push(_node31);
						}_chFunc(_node26);_$parent28.children.push(_node26);
					}_$temp = _node25;{
						var _$parent36 = _$temp;var _node34 = { "attrs": {}, "tagName": "div", "sid": 24 };_node34.children = [];_node34.attrSize = 2;_node34.attrHash = 4095890375;_node34.attrs["w-class"] = "select-item";_node34.attrs["on-tap"] = "changPay('alipay')";_$temp = _node34;{
							var _$parent37 = _$temp;var _node35 = { "attrs": {}, "tagName": "div", "sid": 25 };_node35.children = [];_node35.childHash = 3383154883;_node35.attrSize = 1;_node35.attrHash = 4058108698;_node35.attrs["w-class"] = "select-detail";_$temp = _node35;{
								var _$parent38 = _$temp;var _node36 = { "attrs": {}, "tagName": "img", "sid": 26 };_node36.children = [];_node36.childHash = 0;_node36.attrSize = 2;_node36.attrHash = 1719149916;_node36.attrs["src"] = "app/res/image/aliPay.png";_node36.attrs["width"] = "60px";_$parent38.children.push(_node36);
							}_$temp = _node35;{
								var _$parent39 = _$temp;var _node37 = { "attrs": {}, "tagName": "widget", "sid": 27 };_node37.hasChild = false;_node37.child = null;_node37.childHash = 1490945557;_node37.attrSize = 1;_node37.attrHash = 843759300;_node37.attrs["w-class"] = "pay-name";_node37.attrs["w-tag"] = "pi-ui-lang";_node37.tagName = _node37.attrs["w-tag"];_$temp = _node37;{
									var _$parent40 = _$temp;var _node38 = {}; //jpair pre

									{
										var _jvalue15 = "";
										_jvalue15 = "支付宝支付";
										//jpair suf

										_node38["zh_Hans"] = _jvalue15;
									}
									//jpair pre

									{
										var _jvalue16 = "";
										_jvalue16 = "支付寶支付";
										//jpair suf

										_node38["zh_Hant"] = _jvalue16;
									}
									//jpair pre

									{
										var _jvalue17 = "";
										_jvalue17 = "";
										//jpair suf

										_node38["en"] = _jvalue17;
									}
									_addJson(_node38, _$parent40);
								}_$parent39.children.push(_node37);
							}_$parent37.children.push(_node35);
						}_$temp = _node34;{
							var _$parent41 = _$temp;var _node39 = { "attrs": {}, "tagName": "div", "sid": 28 };_node39.children = [];_node39.attrSize = 1;_node39.attrHash = 2915938051;_node39.attrs["w-class"] = "select-round";if (it.payType === 'alipay') {
								_$temp = _node39;{
									var _$parent42 = _$temp;var _node40 = { "attrs": {}, "tagName": "img", "sid": 29 };_node40.children = [];_node40.childHash = 0;_node40.attrSize = 2;_node40.attrHash = 1525204880;_node40.attrs["src"] = "app/res/image/icon_right2.png";_node40.attrs["width"] = "42px";_$parent42.children.push(_node40);
								}
							} else {
								_$temp = _node39;{
									var _$parent43 = _$temp;var _node41 = { "attrs": {}, "tagName": "div", "sid": 30 };_node41.children = [];_node41.childHash = 2946814719;_node41.attrSize = 1;_node41.attrHash = 95270474;_node41.attrs["w-class"] = "select-img";_$parent43.children.push(_node41);
								}
							}_chFunc(_node39);_$parent41.children.push(_node39);
						}_chFunc(_node34);_$parent36.children.push(_node34);
					}_chFunc(_node25);_$parent27.children.push(_node25);
				}_chFunc(_node22);_$parent24.children.push(_node22);
			}_$temp = _node5;{
				var _$parent44 = _$temp;var _node42 = { "attrs": {}, "tagName": "div", "sid": 31 };_node42.children = [];_node42.attrSize = 2;_node42.attrHash = 2388938569;_node42.attrs["w-class"] = "body-bottom";_node42.attrs["ev-btn-tap"] = "rechargeClick";_$temp = _node42;{
					var _$parent45 = _$temp;var _node43 = { "attrs": {}, "tagName": "widget", "sid": 32 };_node43.hasChild = false;_node43.child = null;_node43.childHash = 162015266;_node43.attrSize = 1;_node43.attrHash = 2762879234;_node43.attrs["w-class"] = "btn-tip";_node43.attrs["w-tag"] = "pi-ui-lang";_node43.tagName = _node43.attrs["w-tag"];_$temp = _node43;{
						var _$parent46 = _$temp;var _node44 = {}; //jpair pre

						{
							var _jvalue18 = "";
							_jvalue18 = "充值金额不小于0.01元";
							//jpair suf

							_node44["zh_Hans"] = _jvalue18;
						}
						//jpair pre

						{
							var _jvalue19 = "";
							_jvalue19 = "充值金額不小於0.01元";
							//jpair suf

							_node44["zh_Hant"] = _jvalue19;
						}
						//jpair pre

						{
							var _jvalue20 = "";
							_jvalue20 = "";
							//jpair suf

							_node44["en"] = _jvalue20;
						}
						_addJson(_node44, _$parent46);
					}_$parent45.children.push(_node43);
				}var btnName = { "zh_Hans": "充值到云端", "zh_Hant": "充值到雲端", "en": "" };_$temp = _node42;{
					var _$parent47 = _$temp;var _node45 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 33 };_node45.hasChild = false;_node45.child = null;_node45.attrHash = 0;_$temp = _node45;{
						var _$parent48 = _$temp;var _node46 = {}; //jpair pre

						_node46["name"] = btnName;
						//jpair suf
						//jpair pre

						{
							var _jvalue21 = "";
							_jvalue21 = "blue";
							//jpair suf

							_node46["color"] = _jvalue21;
						}
						//jpair pre

						{
							var _jvalue22 = "";
							_jvalue22 = "width:90%;";
							//jpair suf

							_node46["style"] = _jvalue22;
						}
						_addJson(_node46, _$parent48);
					}_chFunc(_node45);_$parent47.children.push(_node45);
				}_chFunc(_node42);_$parent44.children.push(_node42);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});