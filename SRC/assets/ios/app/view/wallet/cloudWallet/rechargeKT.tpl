(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrHash = 0;topBarTitle = { "zh_Hans": "KT充值", "zh_Hant": "KT充值", "en": "" };_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "widget", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 1483449382;_node3.attrs["w-tag"] = "app-components1-topBar-topBar";_node3.tagName = _node3.attrs["w-tag"];_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["title"] = topBarTitle;
					//jpair suf
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 4252679546;_node5.attrs["w-class"] = "body";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 2502926294;_node6.attrs["w-class"] = "body-top";_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "widget", "sid": 5 };_node7.hasChild = false;_node7.child = null;_node7.attrSize = 1;_node7.attrHash = 1852840394;_node7.attrs["w-class"] = "top-title";_node7.attrs["w-tag"] = "pi-ui-lang";_node7.tagName = _node7.attrs["w-tag"];_$temp = _node7;{
						var _$parent8 = _$temp;var _node8 = {}; //jpair pre

						{
							var jvalue = "";
							jvalue += "赠送：";jvalue += it.giveST;jvalue += " ST";
							//jpair suf

							_node8["zh_Hans"] = jvalue;
						}
						//jpair pre

						{
							var _jvalue = "";
							_jvalue += "贈送：";_jvalue += it.giveST;_jvalue += " ST";
							//jpair suf

							_node8["zh_Hant"] = _jvalue;
						}
						//jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "";
							//jpair suf

							_node8["en"] = _jvalue2;
						}
						_addJson(_node8, _$parent8);
					}_chFunc(_node7);_$parent7.children.push(_node7);
				}_$temp = _node6;{
					var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 1503359809;_node9.attrs["w-class"] = "pay-list";{
						var _$i = 0;
						for (var _iterator = it.payList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
							var i = _$i++;_$temp = _node9;{
								var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.attrSize = 2;_node10.attrHash = 3819870429;{
									var attrvalue = "";attrvalue += "changePayItem(";attrvalue += i;attrvalue += ")";_node10.attrs["on-tap"] = attrvalue;
								}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["on-tap"]));{
									var _attrvalue = "";_attrvalue += item.KTnum === it.selectPayItem.KTnum ? 'pay-list-selectItem' : 'pay-list-item';_attrvalue += " ";_node10.attrs["w-class"] = _attrvalue;
								}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["w-class"]));_$temp = _node10;{
									var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "widget", "sid": 8 };_node11.hasChild = false;_node11.child = null;_node11.attrHash = 2467408643;_node11.attrs["w-tag"] = "pi-ui-lang";_node11.tagName = _node11.attrs["w-tag"];_$temp = _node11;{
										var _$parent12 = _$temp;var _node12 = {}; //jpair pre

										{
											var _jvalue3 = "";
											_jvalue3 += item.KTnum;_jvalue3 += "KT";
											//jpair suf

											_node12["zh_Hans"] = _jvalue3;
										}
										//jpair pre

										{
											var _jvalue4 = "";
											_jvalue4 += item.KTnum;_jvalue4 += "KT";
											//jpair suf

											_node12["zh_Hant"] = _jvalue4;
										}
										//jpair pre

										{
											var _jvalue5 = "";
											_jvalue5 = "";
											//jpair suf

											_node12["en"] = _jvalue5;
										}
										_addJson(_node12, _$parent12);
									}_chFunc(_node11);_$parent11.children.push(_node11);
								}_$temp = _node10;{
									var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "widget", "sid": 9 };_node13.hasChild = false;_node13.child = null;_node13.attrSize = 1;_node13.attrHash = 3892031274;_node13.attrs["style"] = "font-size:24px;";_node13.attrs["w-tag"] = "pi-ui-lang";_node13.tagName = _node13.attrs["w-tag"];_$temp = _node13;{
										var _$parent14 = _$temp;var _node14 = {}; //jpair pre

										{
											var _jvalue6 = "";
											_jvalue6 += "售价：";_jvalue6 += item.sellPrize;_jvalue6 += "元";
											//jpair suf

											_node14["zh_Hans"] = _jvalue6;
										}
										//jpair pre

										{
											var _jvalue7 = "";
											_jvalue7 += "售價：";_jvalue7 += item.sellPrize;_jvalue7 += "元";
											//jpair suf

											_node14["zh_Hant"] = _jvalue7;
										}
										//jpair pre

										{
											var _jvalue8 = "";
											_jvalue8 = "";
											//jpair suf

											_node14["en"] = _jvalue8;
										}
										_addJson(_node14, _$parent14);
									}_chFunc(_node13);_$parent13.children.push(_node13);
								}_chFunc(_node10);_$parent10.children.push(_node10);
							}
						}
					}_chFunc(_node9);_$parent9.children.push(_node9);
				}_$temp = _node6;{
					var _$parent15 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 10 };_node15.children = [];_node15.attrSize = 2;_node15.attrHash = 1774849349;_node15.attrs["w-class"] = "other-input";_node15.attrs["ev-input-change"] = "amountChange";inputPlace = { "zh_Hans": "其它大于20元金额", "zh_Hant": "其它大於20元金額", "en": "" };_$temp = _node15;{
						var _$parent16 = _$temp;var _node16 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 11 };_node16.hasChild = false;_node16.child = null;_node16.attrHash = 0;_$temp = _node16;{
							var _$parent17 = _$temp;var _node17 = {}; //jpair pre

							{
								var _jvalue9 = "";
								_jvalue9 = "integer";
								//jpair suf

								_node17["itype"] = _jvalue9;
							}
							//jpair pre

							_node17["maxLength"] = 5;
							//jpair suf
							//jpair pre

							_node17["placeHolder"] = inputPlace;
							//jpair suf
							//jpair pre

							_node17["input"] = it.total;
							//jpair suf
							//jpair pre

							{
								var _jvalue10 = "";
								_jvalue10 = "color:#318DE6;background:transparent;";
								//jpair suf

								_node17["style"] = _jvalue10;
							}
							_addJson(_node17, _$parent17);
						}_chFunc(_node16);_$parent16.children.push(_node16);
					}_chFunc(_node15);_$parent15.children.push(_node15);
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_$temp = _node5;{
				var _$parent18 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 12 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 3244763850;_node18.attrs["w-class"] = "body-center";_$temp = _node18;{
					var _$parent19 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 13 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 3475297262;_node19.attrs["w-class"] = "select-body";_$temp = _node19;{
						var _$parent20 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 14 };_node20.children = [];_node20.attrSize = 3;_node20.attrHash = 4217000957;_node20.attrs["w-class"] = "select-item";_node20.attrs["on-tap"] = "changPay('wxpay')";_node20.attrs["style"] = "border-bottom:1px solid #DBDBE5";_$temp = _node20;{
							var _$parent21 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 15 };_node21.children = [];_node21.childHash = 3118500666;_node21.attrSize = 1;_node21.attrHash = 4058108698;_node21.attrs["w-class"] = "select-detail";_$temp = _node21;{
								var _$parent22 = _$temp;var _node22 = { "attrs": {}, "tagName": "img", "sid": 16 };_node22.children = [];_node22.childHash = 0;_node22.attrSize = 2;_node22.attrHash = 477831455;_node22.attrs["src"] = "app/res/image/wxPay.png";_node22.attrs["width"] = "60px";_$parent22.children.push(_node22);
							}_$temp = _node21;{
								var _$parent23 = _$temp;var _node23 = { "attrs": {}, "tagName": "widget", "sid": 17 };_node23.hasChild = false;_node23.child = null;_node23.childHash = 2272842201;_node23.attrSize = 1;_node23.attrHash = 843759300;_node23.attrs["w-class"] = "pay-name";_node23.attrs["w-tag"] = "pi-ui-lang";_node23.tagName = _node23.attrs["w-tag"];_$temp = _node23;{
									var _$parent24 = _$temp;var _node24 = {}; //jpair pre

									{
										var _jvalue11 = "";
										_jvalue11 = "微信支付";
										//jpair suf

										_node24["zh_Hans"] = _jvalue11;
									}
									//jpair pre

									{
										var _jvalue12 = "";
										_jvalue12 = "微信支付";
										//jpair suf

										_node24["zh_Hant"] = _jvalue12;
									}
									//jpair pre

									{
										var _jvalue13 = "";
										_jvalue13 = "";
										//jpair suf

										_node24["en"] = _jvalue13;
									}
									_addJson(_node24, _$parent24);
								}_$parent23.children.push(_node23);
							}_$parent21.children.push(_node21);
						}_$temp = _node20;{
							var _$parent25 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 18 };_node25.children = [];_node25.attrSize = 1;_node25.attrHash = 2915938051;_node25.attrs["w-class"] = "select-round";if (it.payType === 'wxpay') {
								_$temp = _node25;{
									var _$parent26 = _$temp;var _node26 = { "attrs": {}, "tagName": "img", "sid": 19 };_node26.children = [];_node26.childHash = 0;_node26.attrSize = 2;_node26.attrHash = 1525204880;_node26.attrs["src"] = "app/res/image/icon_right2.png";_node26.attrs["width"] = "42px";_$parent26.children.push(_node26);
								}
							} else {
								_$temp = _node25;{
									var _$parent27 = _$temp;var _node27 = { "attrs": {}, "tagName": "div", "sid": 20 };_node27.children = [];_node27.childHash = 2946814719;_node27.attrSize = 1;_node27.attrHash = 95270474;_node27.attrs["w-class"] = "select-img";_$parent27.children.push(_node27);
								}
							}_chFunc(_node25);_$parent25.children.push(_node25);
						}_chFunc(_node20);_$parent20.children.push(_node20);
					}_$temp = _node19;{
						var _$parent28 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 21 };_node28.children = [];_node28.attrSize = 2;_node28.attrHash = 4095890375;_node28.attrs["w-class"] = "select-item";_node28.attrs["on-tap"] = "changPay('alipay')";_$temp = _node28;{
							var _$parent29 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 22 };_node29.children = [];_node29.childHash = 3383154883;_node29.attrSize = 1;_node29.attrHash = 4058108698;_node29.attrs["w-class"] = "select-detail";_$temp = _node29;{
								var _$parent30 = _$temp;var _node30 = { "attrs": {}, "tagName": "img", "sid": 23 };_node30.children = [];_node30.childHash = 0;_node30.attrSize = 2;_node30.attrHash = 1719149916;_node30.attrs["src"] = "app/res/image/aliPay.png";_node30.attrs["width"] = "60px";_$parent30.children.push(_node30);
							}_$temp = _node29;{
								var _$parent31 = _$temp;var _node31 = { "attrs": {}, "tagName": "widget", "sid": 24 };_node31.hasChild = false;_node31.child = null;_node31.childHash = 1490945557;_node31.attrSize = 1;_node31.attrHash = 843759300;_node31.attrs["w-class"] = "pay-name";_node31.attrs["w-tag"] = "pi-ui-lang";_node31.tagName = _node31.attrs["w-tag"];_$temp = _node31;{
									var _$parent32 = _$temp;var _node32 = {}; //jpair pre

									{
										var _jvalue14 = "";
										_jvalue14 = "支付宝支付";
										//jpair suf

										_node32["zh_Hans"] = _jvalue14;
									}
									//jpair pre

									{
										var _jvalue15 = "";
										_jvalue15 = "支付寶支付";
										//jpair suf

										_node32["zh_Hant"] = _jvalue15;
									}
									//jpair pre

									{
										var _jvalue16 = "";
										_jvalue16 = "";
										//jpair suf

										_node32["en"] = _jvalue16;
									}
									_addJson(_node32, _$parent32);
								}_$parent31.children.push(_node31);
							}_$parent29.children.push(_node29);
						}_$temp = _node28;{
							var _$parent33 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 25 };_node33.children = [];_node33.attrSize = 1;_node33.attrHash = 2915938051;_node33.attrs["w-class"] = "select-round";if (it.payType === 'alipay') {
								_$temp = _node33;{
									var _$parent34 = _$temp;var _node34 = { "attrs": {}, "tagName": "img", "sid": 26 };_node34.children = [];_node34.childHash = 0;_node34.attrSize = 2;_node34.attrHash = 1525204880;_node34.attrs["src"] = "app/res/image/icon_right2.png";_node34.attrs["width"] = "42px";_$parent34.children.push(_node34);
								}
							} else {
								_$temp = _node33;{
									var _$parent35 = _$temp;var _node35 = { "attrs": {}, "tagName": "div", "sid": 27 };_node35.children = [];_node35.childHash = 2946814719;_node35.attrSize = 1;_node35.attrHash = 95270474;_node35.attrs["w-class"] = "select-img";_$parent35.children.push(_node35);
								}
							}_chFunc(_node33);_$parent33.children.push(_node33);
						}_chFunc(_node28);_$parent28.children.push(_node28);
					}_chFunc(_node19);_$parent19.children.push(_node19);
				}_chFunc(_node18);_$parent18.children.push(_node18);
			}_$temp = _node5;{
				var _$parent36 = _$temp;var _node36 = { "attrs": {}, "tagName": "div", "sid": 28 };_node36.children = [];_node36.attrSize = 2;_node36.attrHash = 2388938569;_node36.attrs["w-class"] = "body-bottom";_node36.attrs["ev-btn-tap"] = "rechargeClick";var btnName = { "zh_Hans": "充值", "zh_Hant": "充值", "en": "" };_$temp = _node36;{
					var _$parent37 = _$temp;var _node37 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 29 };_node37.hasChild = false;_node37.child = null;_node37.attrHash = 0;_$temp = _node37;{
						var _$parent38 = _$temp;var _node38 = {}; //jpair pre

						_node38["name"] = btnName;
						//jpair suf
						//jpair pre

						{
							var _jvalue17 = "";
							_jvalue17 = "blue";
							//jpair suf

							_node38["color"] = _jvalue17;
						}
						//jpair pre

						{
							var _jvalue18 = "";
							_jvalue18 = "width:90%;";
							//jpair suf

							_node38["style"] = _jvalue18;
						}
						_addJson(_node38, _$parent38);
					}_chFunc(_node37);_$parent37.children.push(_node37);
				}_chFunc(_node36);_$parent36.children.push(_node36);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});