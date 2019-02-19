(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 4;_node.attrHash = 3424737235;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["ev-refresh-click"] = "refreshPage";topBarTitle = { "zh_Hans": "邀请好友", "zh_Hant": "邀請好友", "en": "" };_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 227035209;_node2.attrs["style"] = "background:#2C6EEA;";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "app-components1-topBar-topBar2", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["text"] = topBarTitle;
					//jpair suf
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 3376600272;_node5.attrs["w-class"] = "content";_node5.attrs["on-scroll"] = "getMoreList";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 3331792770;_node6.attrs["w-class"] = "share_main";_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.childHash = 3946918741;_node7.attrSize = 1;_node7.attrHash = 3833421179;_node7.attrs["w-class"] = "share_out";_$temp = _node7;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.childHash = 2946814719;_node8.attrSize = 1;_node8.attrHash = 3135046259;_node8.attrs["w-class"] = "out_line";_$parent8.children.push(_node8);
					}_$parent7.children.push(_node7);
				}_$temp = _node6;{
					var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 2145900291;_node9.attrs["w-class"] = "share_ticket_box";_$temp = _node9;{
						var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 1915843755;_node10.attrs["w-class"] = "share_ticket";_$temp = _node10;{
							var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 9 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 692642680;_node11.attrs["w-class"] = "ticket_top";if (it.showPage === 'first') {
								_$temp = _node11;{
									var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 10 };_node12.children = [];_node12.childHash = 4037793398;_node12.attrSize = 1;_node12.attrHash = 11188633;_node12.attrs["w-class"] = "ticket_top_title";_$temp = _node12;{
										var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "widget", "sid": 11 };_node13.hasChild = false;_node13.child = null;_node13.childHash = 4027013795;_node13.attrHash = 2467408643;_node13.attrs["w-tag"] = "pi-ui-lang";_node13.tagName = _node13.attrs["w-tag"];_$temp = _node13;{
											var _$parent14 = _$temp;var _node14 = {}; //jpair pre

											{
												var jvalue = "";
												jvalue = "我的邀请码";
												//jpair suf

												_node14["zh_Hans"] = jvalue;
											}
											//jpair pre

											{
												var _jvalue = "";
												_jvalue = "我的邀請碼";
												//jpair suf

												_node14["zh_Hant"] = _jvalue;
											}
											//jpair pre

											{
												var _jvalue2 = "";
												_jvalue2 = "";
												//jpair suf

												_node14["en"] = _jvalue2;
											}
											_addJson(_node14, _$parent14);
										}_$parent13.children.push(_node13);
									}_$parent12.children.push(_node12);
								}_$temp = _node11;{
									var _$parent15 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 12 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 4050380126;_node15.attrs["w-class"] = "ticket_top_code";_$temp = _node15;{
										var _$parent16 = _$temp;_addText(it.inviteCode, _$parent16);
									}_chFunc(_node15);_$parent15.children.push(_node15);
								}var btnName = { "zh_Hans": "复制", "zh_Hant": "複製", "en": "" };_$temp = _node11;{
									var _$parent17 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 13 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 2942325363;_node16.attrs["ev-btn-tap"] = "copyClick";_$temp = _node16;{
										var _$parent18 = _$temp;var _node17 = { "attrs": {}, "tagName": "widget", "sid": 14 };_node17.hasChild = false;_node17.child = null;_node17.attrSize = 1;_node17.attrHash = 3994677068;_node17.attrs["style"] = "margin-top:40px;";_node17.attrs["w-tag"] = "app-components1-btn-btn";_node17.tagName = _node17.attrs["w-tag"];_$temp = _node17;{
											var _$parent19 = _$temp;var _node18 = {}; //jpair pre

											_node18["name"] = btnName;
											//jpair suf
											//jpair pre

											{
												var _jvalue3 = "";
												_jvalue3 = "orange";
												//jpair suf

												_node18["color"] = _jvalue3;
											}
											//jpair pre

											{
												var _jvalue4 = "";
												_jvalue4 = "small";
												//jpair suf

												_node18["types"] = _jvalue4;
											}
											_addJson(_node18, _$parent19);
										}_chFunc(_node17);_$parent18.children.push(_node17);
									}_chFunc(_node16);_$parent17.children.push(_node16);
								}
							} else {
								_$temp = _node11;{
									var _$parent20 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 15 };_node19.children = [];_node19.childHash = 3119761748;_node19.attrSize = 1;_node19.attrHash = 11188633;_node19.attrs["w-class"] = "ticket_top_title";_$temp = _node19;{
										var _$parent21 = _$temp;var _node20 = { "attrs": {}, "tagName": "widget", "sid": 16 };_node20.hasChild = false;_node20.child = null;_node20.childHash = 3415992812;_node20.attrHash = 2467408643;_node20.attrs["w-tag"] = "pi-ui-lang";_node20.tagName = _node20.attrs["w-tag"];_$temp = _node20;{
											var _$parent22 = _$temp;var _node21 = {}; //jpair pre

											{
												var _jvalue5 = "";
												_jvalue5 = "已成功邀请人数";
												//jpair suf

												_node21["zh_Hans"] = _jvalue5;
											}
											//jpair pre

											{
												var _jvalue6 = "";
												_jvalue6 = "已成功邀請人數";
												//jpair suf

												_node21["zh_Hant"] = _jvalue6;
											}
											//jpair pre

											{
												var _jvalue7 = "";
												_jvalue7 = "";
												//jpair suf

												_node21["en"] = _jvalue7;
											}
											_addJson(_node21, _$parent22);
										}_$parent21.children.push(_node20);
									}_$parent20.children.push(_node19);
								}_$temp = _node11;{
									var _$parent23 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 17 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 4050380126;_node22.attrs["w-class"] = "ticket_top_code";_$temp = _node22;{
										var _$parent24 = _$temp;_addText(it.invitedNumberOfPerson, _$parent24);
									}_chFunc(_node22);_$parent23.children.push(_node22);
								}var tip = { "zh_Hans": "已获得奖励", "zh_Hant": "已獲得獎勵", "en": "" };_$temp = _node11;{
									var _$parent25 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 18 };_node23.children = [];_node23.attrSize = 1;_node23.attrHash = 3938905469;_node23.attrs["w-class"] = "convert-container";{
										var _$i = 0;
										for (var _iterator = it.welfareAwards, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
											var index = _$i++;_$temp = _node23;{
												var _$parent26 = _$temp;var _node24 = { "attrs": {}, "tagName": "div", "sid": 19 };_node24.children = [];_node24.attrSize = 2;_node24.attrHash = 3292392853;_node24.attrs["w-class"] = "convert-item";{
													var attrvalue = "";attrvalue += "openClick(e,";attrvalue += index;attrvalue += ")";_node24.attrs["on-tap"] = attrvalue;
												}_node24.attrHash = _hash.nextHash(_node24.attrHash, _calTextHash(_node24.attrs["on-tap"]));_$temp = _node24;{
													var _$parent27 = _$temp;var _node25 = { "attrs": {}, "tagName": "img", "sid": 20 };_node25.children = [];_node25.attrSize = 3;_node25.attrHash = 3500732924;{
														var _attrvalue = "";_attrvalue += "../../res/image/";_attrvalue += item.received ? '101101boxOpen.png' : '101101box.png';_attrvalue += "";_node25.attrs["src"] = _attrvalue;
													}_node25.attrHash = _hash.nextHash(_node25.attrHash, _calTextHash(_node25.attrs["src"]));_node25.attrs["w-class"] = "convert-img";{
														var _attrvalue2 = "";_attrvalue2 += item.canReceive ? 'shake' : '';_attrvalue2 += "";_node25.attrs["class"] = _attrvalue2;
													}_node25.attrHash = _hash.nextHash(_node25.attrHash, _calTextHash(_node25.attrs["class"]));_chFunc(_node25);_$parent27.children.push(_node25);
												}_$temp = _node24;{
													var _$parent28 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 21 };_node26.children = [];_node26.attrSize = 1;_node26.attrHash = 169436959;_node26.attrs["w-class"] = "convert-text";_$temp = _node26;{
														var _$parent29 = _$temp;_addText(item.number, _$parent29);
													}_$temp = _node26;{
														var _$parent30 = _$temp;var _node27 = _installText("人", 1431085486);;
														_$parent30.children.push(_node27);
													}_chFunc(_node26);_$parent28.children.push(_node26);
												}if (index !== it.welfareAwards.length - 1) {
													_$temp = _node24;{
														var _$parent31 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 22 };_node28.children = [];_node28.childHash = 2946814719;_node28.attrSize = 1;_node28.attrHash = 917351695;_node28.attrs["w-class"] = "convert-line";_$parent31.children.push(_node28);
													}
												}_chFunc(_node24);_$parent26.children.push(_node24);
											}
										}
									}_chFunc(_node23);_$parent25.children.push(_node23);
								}
							}_chFunc(_node11);_$parent11.children.push(_node11);
						}_$temp = _node10;{
							var _$parent32 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 23 };_node29.children = [];_node29.childHash = 2946814719;_node29.attrSize = 1;_node29.attrHash = 3194183103;_node29.attrs["w-class"] = "ticket_center";_$parent32.children.push(_node29);
						}_$temp = _node10;{
							var _$parent33 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 24 };_node30.children = [];_node30.attrSize = 1;_node30.attrHash = 3744415389;_node30.attrs["w-class"] = "ticket_bottom";if (it.showPage === 'first') {
								_$temp = _node30;{
									var _$parent34 = _$temp;var _node31 = { "attrs": {}, "tagName": "img", "sid": 25 };_node31.children = [];_node31.childHash = 0;_node31.attrSize = 3;_node31.attrHash = 1226182546;_node31.attrs["src"] = "app/res/image/wechat_pn.jpg";_node31.attrs["height"] = "400px";_node31.attrs["width"] = "400px";_$parent34.children.push(_node31);
								}_$temp = _node30;{
									var _$parent35 = _$temp;var _node32 = { "attrs": {}, "tagName": "div", "sid": 26 };_node32.children = [];_node32.childHash = 2251923942;_node32.attrSize = 1;_node32.attrHash = 1253061714;_node32.attrs["w-class"] = "ticket_bottom-text";_$temp = _node32;{
										var _$parent36 = _$temp;var _node33 = { "attrs": {}, "tagName": "widget", "sid": 27 };_node33.hasChild = false;_node33.child = null;_node33.childHash = 189969808;_node33.attrHash = 2467408643;_node33.attrs["w-tag"] = "pi-ui-lang";_node33.tagName = _node33.attrs["w-tag"];_$temp = _node33;{
											var _$parent37 = _$temp;var _node34 = {}; //jpair pre

											{
												var _jvalue8 = "";
												_jvalue8 = "成功邀请后双方均可获得奖励";
												//jpair suf

												_node34["zh_Hans"] = _jvalue8;
											}
											//jpair pre

											{
												var _jvalue9 = "";
												_jvalue9 = "成功邀請後雙方均可獲得獎勵";
												//jpair suf

												_node34["zh_Hant"] = _jvalue9;
											}
											//jpair pre

											{
												var _jvalue10 = "";
												_jvalue10 = "";
												//jpair suf

												_node34["en"] = _jvalue10;
											}
											_addJson(_node34, _$parent37);
										}_$parent36.children.push(_node33);
									}_$temp = _node32;{
										var _$parent38 = _$temp;var _node35 = { "attrs": {}, "tagName": "img", "sid": 28 };_node35.children = [];_node35.childHash = 0;_node35.attrSize = 4;_node35.attrHash = 1985367692;_node35.attrs["on-tap"] = "change('second')";_node35.attrs["src"] = "app/res/image/change-blue.png";_node35.attrs["height"] = "48px";_node35.attrs["w-class"] = "change_icon";_$parent38.children.push(_node35);
									}_$parent35.children.push(_node32);
								}
							} else {
								_$temp = _node30;{
									var _$parent39 = _$temp;var _node36 = { "attrs": {}, "tagName": "div", "sid": 29 };_node36.children = [];_node36.childHash = 860720775;_node36.attrSize = 1;_node36.attrHash = 202646280;_node36.attrs["w-class"] = "rule";_$temp = _node36;{
										var _$parent40 = _$temp;var _node37 = { "attrs": {}, "tagName": "widget", "sid": 30 };_node37.hasChild = false;_node37.child = null;_node37.childHash = 3323698398;_node37.attrSize = 1;_node37.attrHash = 2195991620;_node37.attrs["w-class"] = "rule_title";_node37.attrs["w-tag"] = "pi-ui-lang";_node37.tagName = _node37.attrs["w-tag"];_$temp = _node37;{
											var _$parent41 = _$temp;var _node38 = {}; //jpair pre

											{
												var _jvalue11 = "";
												_jvalue11 = "活动说明";
												//jpair suf

												_node38["zh_Hans"] = _jvalue11;
											}
											//jpair pre

											{
												var _jvalue12 = "";
												_jvalue12 = "活動說明";
												//jpair suf

												_node38["zh_Hant"] = _jvalue12;
											}
											//jpair pre

											{
												var _jvalue13 = "";
												_jvalue13 = "";
												//jpair suf

												_node38["en"] = _jvalue13;
											}
											_addJson(_node38, _$parent41);
										}_$parent40.children.push(_node37);
									}_$temp = _node36;{
										var _$parent42 = _$temp;var _node39 = { "attrs": {}, "tagName": "widget", "sid": 31 };_node39.hasChild = false;_node39.child = null;_node39.childHash = 4245735373;_node39.attrSize = 1;_node39.attrHash = 3835114754;_node39.attrs["w-class"] = "rule_context";_node39.attrs["w-tag"] = "pi-ui-lang";_node39.tagName = _node39.attrs["w-tag"];_$temp = _node39;{
											var _$parent43 = _$temp;var _node40 = {}; //jpair pre

											{
												var _jvalue14 = "";
												_jvalue14 = "成功邀请好友下载KuPlay，在赚-兑换中输入邀请码，你就可以获得奖励哦。 注意~好友验证了手机即视为成功邀请。快去邀请小伙伴一起挖矿吧~";
												//jpair suf

												_node40["zh_Hans"] = _jvalue14;
											}
											//jpair pre

											{
												var _jvalue15 = "";
												_jvalue15 = "成功邀請好友下載KuPlay，在賺-兌換中輸入邀請碼，你就可以獲得獎勵哦。注意~好友驗證了手機即視為成功邀請。快去邀請小伙伴一起挖礦吧~";
												//jpair suf

												_node40["zh_Hant"] = _jvalue15;
											}
											//jpair pre

											{
												var _jvalue16 = "";
												_jvalue16 = "";
												//jpair suf

												_node40["en"] = _jvalue16;
											}
											_addJson(_node40, _$parent43);
										}_$parent42.children.push(_node39);
									}_$parent39.children.push(_node36);
								}_$temp = _node30;{
									var _$parent44 = _$temp;var _node41 = { "attrs": {}, "tagName": "div", "sid": 32 };_node41.children = [];_node41.childHash = 4283240156;_node41.attrSize = 1;_node41.attrHash = 1253061714;_node41.attrs["w-class"] = "ticket_bottom-text";_$temp = _node41;{
										var _$parent45 = _$temp;var _node42 = { "attrs": {}, "tagName": "img", "sid": 33 };_node42.children = [];_node42.childHash = 0;_node42.attrSize = 4;_node42.attrHash = 3096457413;_node42.attrs["on-tap"] = "change('first')";_node42.attrs["src"] = "app/res/image/change-blue.png";_node42.attrs["height"] = "48px";_node42.attrs["w-class"] = "change_icon";_$parent45.children.push(_node42);
									}_$parent44.children.push(_node41);
								}
							}_chFunc(_node30);_$parent33.children.push(_node30);
						}_chFunc(_node10);_$parent10.children.push(_node10);
					}_chFunc(_node9);_$parent9.children.push(_node9);
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}if (it.showPage === 'first') {
				_$temp = _node5;{
					var _$parent46 = _$temp;var _node43 = { "attrs": {}, "tagName": "div", "sid": 34 };_node43.children = [];_node43.childHash = 1002761626;_node43.attrSize = 1;_node43.attrHash = 3441321776;_node43.attrs["w-class"] = "share_text";_$temp = _node43;{
						var _$parent47 = _$temp;var _node44 = { "attrs": {}, "tagName": "widget", "sid": 35 };_node44.hasChild = false;_node44.child = null;_node44.childHash = 2623040831;_node44.attrHash = 2467408643;_node44.attrs["w-tag"] = "pi-ui-lang";_node44.tagName = _node44.attrs["w-tag"];_$temp = _node44;{
							var _$parent48 = _$temp;var _node45 = {}; //jpair pre

							{
								var _jvalue17 = "";
								_jvalue17 = "一键快速邀请";
								//jpair suf

								_node45["zh_Hans"] = _jvalue17;
							}
							//jpair pre

							{
								var _jvalue18 = "";
								_jvalue18 = "一鍵快速邀請";
								//jpair suf

								_node45["zh_Hant"] = _jvalue18;
							}
							//jpair pre

							{
								var _jvalue19 = "";
								_jvalue19 = "";
								//jpair suf

								_node45["en"] = _jvalue19;
							}
							_addJson(_node45, _$parent48);
						}_$parent47.children.push(_node44);
					}_$parent46.children.push(_node43);
				}_$temp = _node5;{
					var _$parent49 = _$temp;var _node46 = { "attrs": {}, "tagName": "div", "sid": 36 };_node46.children = [];_node46.childHash = 2896962272;_node46.attrSize = 1;_node46.attrHash = 628013494;_node46.attrs["w-class"] = "share_icon";_$temp = _node46;{
						var _$parent50 = _$temp;var _node47 = { "attrs": {}, "tagName": "div", "sid": 37 };_node47.children = [];_node47.childHash = 1219607529;_node47.attrSize = 2;_node47.attrHash = 1232469755;_node47.attrs["w-class"] = "img-box";_node47.attrs["on-tap"] = "shareToWechat";_$temp = _node47;{
							var _$parent51 = _$temp;var _node48 = { "attrs": {}, "tagName": "img", "sid": 38 };_node48.children = [];_node48.childHash = 0;_node48.attrSize = 2;_node48.attrHash = 3196651249;_node48.attrs["src"] = "app/res/image/img_share_wechat.png";_node48.attrs["height"] = "60px";_$parent51.children.push(_node48);
						}_$parent50.children.push(_node47);
					}_$temp = _node46;{
						var _$parent52 = _$temp;var _node49 = { "attrs": {}, "tagName": "div", "sid": 39 };_node49.children = [];_node49.childHash = 1854928811;_node49.attrSize = 2;_node49.attrHash = 83973387;_node49.attrs["w-class"] = "img-box";_node49.attrs["on-tap"] = "shareToFriends";_$temp = _node49;{
							var _$parent53 = _$temp;var _node50 = { "attrs": {}, "tagName": "img", "sid": 40 };_node50.children = [];_node50.childHash = 0;_node50.attrSize = 2;_node50.attrHash = 3802167370;_node50.attrs["src"] = "app/res/image/img_share_wechatArea.png";_node50.attrs["height"] = "60px";_$parent53.children.push(_node50);
						}_$parent52.children.push(_node49);
					}_$temp = _node46;{
						var _$parent54 = _$temp;var _node51 = { "attrs": {}, "tagName": "div", "sid": 41 };_node51.children = [];_node51.childHash = 565217834;_node51.attrSize = 2;_node51.attrHash = 1160707799;_node51.attrs["w-class"] = "img-box";_node51.attrs["on-tap"] = "shareToQQSpace";_$temp = _node51;{
							var _$parent55 = _$temp;var _node52 = { "attrs": {}, "tagName": "img", "sid": 42 };_node52.children = [];_node52.childHash = 0;_node52.attrSize = 2;_node52.attrHash = 1395503992;_node52.attrs["src"] = "app/res/image/img_share_qqArea.png";_node52.attrs["height"] = "60px";_$parent55.children.push(_node52);
						}_$parent54.children.push(_node51);
					}_$temp = _node46;{
						var _$parent56 = _$temp;var _node53 = { "attrs": {}, "tagName": "div", "sid": 43 };_node53.children = [];_node53.childHash = 1570686077;_node53.attrSize = 2;_node53.attrHash = 2252398995;_node53.attrs["w-class"] = "img-box";_node53.attrs["on-tap"] = "shareToQQ";_$temp = _node53;{
							var _$parent57 = _$temp;var _node54 = { "attrs": {}, "tagName": "img", "sid": 44 };_node54.children = [];_node54.childHash = 0;_node54.attrSize = 2;_node54.attrHash = 202130106;_node54.attrs["src"] = "app/res/image/img_share_qq.png";_node54.attrs["height"] = "60px";_$parent57.children.push(_node54);
						}_$parent56.children.push(_node53);
					}_$parent49.children.push(_node46);
				}
			} else {
				_$temp = _node5;{
					var _$parent58 = _$temp;var _node55 = { "attrs": {}, "tagName": "div", "sid": 45 };_node55.children = [];_node55.childHash = 2946814719;_node55.attrSize = 1;_node55.attrHash = 3441321776;_node55.attrs["w-class"] = "share_text";_$parent58.children.push(_node55);
				}_$temp = _node5;{
					var _$parent59 = _$temp;var _node56 = { "attrs": {}, "tagName": "div", "sid": 46 };_node56.children = [];_node56.childHash = 2946814719;_node56.attrSize = 1;_node56.attrHash = 628013494;_node56.attrs["w-class"] = "share_icon";_$parent59.children.push(_node56);
				}
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});