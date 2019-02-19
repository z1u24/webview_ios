(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 2844282188;_node.attrs["w-class"] = "new-page";_node.attrs["class"] = "new-page";_node.attrs["on-tap"] = "pageClick";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 3;_node2.attrHash = 1248916004;_node2.attrs["w-class"] = "top-main-wrap";_node2.attrs["ev-next-click"] = "handleMoreContactor";_node2.attrs["ev-back-click"] = "goBack";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.childHash = 2819995811;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					{
						var jvalue = "";
						jvalue = "";
						//jpair suf

						_node4["title"] = jvalue;
					}
					//jpair pre

					{
						var _jvalue = "";
						_jvalue = "more-dot-white.png";
						//jpair suf

						_node4["nextImg"] = _jvalue;
					}
					//jpair pre

					{
						var _jvalue2 = "";
						_jvalue2 = "#318DE6";
						//jpair suf

						_node4["background"] = _jvalue2;
					}
					_addJson(_node4, _$parent4);
				}_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 2650761498;_node5.attrs["w-class"] = "home-info-wrap";{
					var attrvalue = "";attrvalue += it.inFlag == 3 ? 'margin-top: 50px;' : '';attrvalue += "";_node5.attrs["style"] = attrvalue;
				}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["style"]));_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "widget", "sid": 4 };_node6.hasChild = false;_node6.child = null;_node6.attrSize = 1;_node6.attrHash = 1941416123;_node6.attrs["w-tag"] = "chat-client-app-widget-imgShow-imgShow";_node6.tagName = _node6.attrs["w-tag"];_node6.attrs["w-class"] = "avatar";_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = {}; //jpair pre

						_node7["imgURL"] = it.avatar;
						//jpair suf
						//jpair pre

						{
							var _jvalue3 = "";
							_jvalue3 = "190px;";
							//jpair suf

							_node7["width"] = _jvalue3;
						}
						_addJson(_node7, _$parent7);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 2372826457;_node8.attrs["w-class"] = "nameText";_$temp = _node8;{
						var _$parent9 = _$temp;_addText(it.alias || it.userInfo.name, _$parent9);
					}_chFunc(_node8);_$parent8.children.push(_node8);
				}if (it.inFlag != 3) {
					_$temp = _node5;{
						var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 2;_node9.attrHash = 139000479;_node9.attrs["on-tap"] = "doCopy(0)";_node9.attrs["style"] = "display:flex;flex-direction:column;text-align: center;";_$temp = _node9;{
							var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.attrHash = 0;_$temp = _node10;{
								var _$parent12 = _$temp;var _node11 = _installText("ID：", 3204938943);;
								_$parent12.children.push(_node11);
							}_$temp = _node10;{
								var _$parent13 = _$temp;_addText(it.uid, _$parent13);
							}_chFunc(_node10);_$parent11.children.push(_node10);
						}_$temp = _node9;{
							var _$parent14 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.attrHash = 0;_$temp = _node12;{
								var _$parent15 = _$temp;var _node13 = _installText("昵称：", 3566822203);;
								_$parent15.children.push(_node13);
							}_$temp = _node12;{
								var _$parent16 = _$temp;_addText(it.userInfo.name, _$parent16);
							}_chFunc(_node12);_$parent14.children.push(_node12);
						}_chFunc(_node9);_$parent10.children.push(_node9);
					}
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent17 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 9 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 3735594628;_node14.attrs["w-class"] = "detail-info-wrap";_$temp = _node14;{
				var _$parent18 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 10 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 3931189419;_node15.attrs["w-class"] = "detail-info";_$temp = _node15;{
					var _$parent19 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 11 };_node16.children = [];_node16.attrSize = 3;_node16.attrHash = 905396339;_node16.attrs["w-class"] = "adress-wrap";_node16.attrs["style"] = "margin: 60px 0px 20px;";_node16.attrs["on-tap"] = "doCopy(1)";_$temp = _node16;{
						var _$parent20 = _$temp;var _node17 = { "attrs": {}, "tagName": "img", "sid": 12 };_node17.children = [];_node17.childHash = 0;_node17.attrSize = 2;_node17.attrHash = 3649326135;_node17.attrs["w-class"] = "adressIcon";_node17.attrs["src"] = "../../res/images/adress-book.png";_$parent20.children.push(_node17);
					}_$temp = _node16;{
						var _$parent21 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 13 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 4092497811;_node18.attrs["w-class"] = "adress-text-wrap";_$temp = _node18;{
							var _$parent22 = _$temp;var _node19 = { "attrs": {}, "tagName": "span", "sid": 14 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 471407342;_node19.attrs["w-class"] = "mainText";_$temp = _node19;{
								var _$parent23 = _$temp;_addText(it.uid, _$parent23);
							}_chFunc(_node19);_$parent22.children.push(_node19);
						}_$temp = _node18;{
							var _$parent24 = _$temp;var _node20 = { "attrs": {}, "tagName": "span", "sid": 15 };_node20.children = [];_node20.childHash = 3701888615;_node20.attrSize = 1;_node20.attrHash = 1984368765;_node20.attrs["w-class"] = "flag";_$temp = _node20;{
								var _$parent25 = _$temp;var _node21 = _installText("ID", 396921490);;
								_$parent25.children.push(_node21);
							}_$parent24.children.push(_node20);
						}_chFunc(_node18);_$parent21.children.push(_node18);
					}_chFunc(_node16);_$parent19.children.push(_node16);
				}_$temp = _node15;{
					var _$parent26 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 16 };_node22.children = [];_node22.attrSize = 2;_node22.attrHash = 2648070758;_node22.attrs["w-class"] = "adress-wrap";_node22.attrs["on-tap"] = "doCopy(2)";_$temp = _node22;{
						var _$parent27 = _$temp;var _node23 = { "attrs": {}, "tagName": "img", "sid": 17 };_node23.children = [];_node23.childHash = 0;_node23.attrSize = 2;_node23.attrHash = 2405658539;_node23.attrs["w-class"] = "adressIcon";_node23.attrs["src"] = "../../res/images/phone.png";_$parent27.children.push(_node23);
					}_$temp = _node22;{
						var _$parent28 = _$temp;var _node24 = { "attrs": {}, "tagName": "div", "sid": 18 };_node24.children = [];_node24.attrSize = 1;_node24.attrHash = 4092497811;_node24.attrs["w-class"] = "adress-text-wrap";if (it.inFlag == 3) {
							_$temp = _node24;{
								var _$parent29 = _$temp;var _node25 = { "attrs": {}, "tagName": "span", "sid": 19 };_node25.children = [];_node25.childHash = 1914540163;_node25.attrSize = 1;_node25.attrHash = 471407342;_node25.attrs["w-class"] = "mainText";_$temp = _node25;{
									var _$parent30 = _$temp;var _node26 = _installText("仅好友可见", 2862083716);;
									_$parent30.children.push(_node26);
								}_$parent29.children.push(_node25);
							}
						} else {
							_$temp = _node24;{
								var _$parent31 = _$temp;var _node27 = { "attrs": {}, "tagName": "span", "sid": 20 };_node27.children = [];_node27.attrSize = 1;_node27.attrHash = 471407342;_node27.attrs["w-class"] = "mainText";_$temp = _node27;{
									var _$parent32 = _$temp;_addText(it.userInfo.tel ? it.userInfo.tel : "未知", _$parent32);
								}_chFunc(_node27);_$parent31.children.push(_node27);
							}
						}_$temp = _node24;{
							var _$parent33 = _$temp;var _node28 = { "attrs": {}, "tagName": "span", "sid": 21 };_node28.children = [];_node28.childHash = 702834102;_node28.attrSize = 1;_node28.attrHash = 1984368765;_node28.attrs["w-class"] = "flag";_$temp = _node28;{
								var _$parent34 = _$temp;var _node29 = _installText("电话", 2935744730);;
								_$parent34.children.push(_node29);
							}_$parent33.children.push(_node28);
						}_chFunc(_node24);_$parent28.children.push(_node24);
					}_chFunc(_node22);_$parent26.children.push(_node22);
				}_chFunc(_node15);_$parent18.children.push(_node15);
			}if (it.inFlag == 3 || !it.isFriend) {
				_$temp = _node14;{
					var _$parent35 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 22 };_node30.children = [];_node30.childHash = 3566662793;_node30.attrSize = 1;_node30.attrHash = 3892565717;_node30.attrs["style"] = "margin: 40px 80px;";_$temp = _node30;{
						var _$parent36 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 23 };_node31.children = [];_node31.childHash = 3838731126;_node31.attrSize = 2;_node31.attrHash = 3717568668;_node31.attrs["w-class"] = "liItem1";_node31.attrs["on-tap"] = "addUser(e)";_$temp = _node31;{
							var _$parent37 = _$temp;var _node32 = _installText("加为好友", 3285198574);;
							_$parent37.children.push(_node32);
						}_$parent36.children.push(_node31);
					}_$parent35.children.push(_node30);
				}
			} else {
				_$temp = _node14;{
					var _$parent38 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 24 };_node33.children = [];_node33.attrSize = 1;_node33.attrHash = 1474034264;_node33.attrs["w-class"] = "other-wrap";_$temp = _node33;{
						var _$parent39 = _$temp;var _node34 = { "attrs": {}, "tagName": "img", "sid": 25 };_node34.children = [];_node34.childHash = 0;_node34.attrSize = 2;_node34.attrHash = 3865073803;_node34.attrs["w-class"] = "moreChooseIcon";_node34.attrs["src"] = "../../res/images/more-choose.png";_$parent39.children.push(_node34);
					}_$temp = _node33;{
						var _$parent40 = _$temp;var _node35 = { "attrs": {}, "tagName": "ul", "sid": 26 };_node35.children = [];_node35.attrSize = 1;_node35.attrHash = 3590369830;_node35.attrs["w-class"] = "ul-wrap";_$temp = _node35;{
							var _$parent41 = _$temp;var _node36 = { "attrs": {}, "tagName": "li", "sid": 27 };_node36.children = [];_node36.childHash = 285769228;_node36.attrSize = 2;_node36.attrHash = 1132440399;_node36.attrs["w-class"] = "liItem";_node36.attrs["style"] = "padding-top:0;";_$temp = _node36;{
								var _$parent42 = _$temp;var _node37 = _installText("搜索聊天记录", 2923426960);;
								_$parent42.children.push(_node37);
							}_$parent41.children.push(_node36);
						}_$temp = _node35;{
							var _$parent43 = _$temp;var _node38 = { "attrs": {}, "tagName": "li", "sid": 28 };_node38.children = [];_node38.attrSize = 2;_node38.attrHash = 2774552847;_node38.attrs["w-class"] = "liItem";_node38.attrs["ev-switch-click"] = "msgTop";_$temp = _node38;{
								var _$parent44 = _$temp;var _node39 = { "attrs": {}, "tagName": "span", "sid": 29 };_node39.children = [];_node39.childHash = 3911349331;_node39.attrHash = 0;_$temp = _node39;{
									var _$parent45 = _$temp;var _node40 = _installText("聊天置顶", 2458869684);;
									_$parent45.children.push(_node40);
								}_$parent44.children.push(_node39);
							}_$temp = _node38;{
								var _$parent46 = _$temp;var _node41 = { "attrs": {}, "tagName": "chat-client-app-widget-switch-switch", "sid": 30 };_node41.hasChild = false;_node41.child = null;_node41.attrHash = 0;_$temp = _node41;{
									var _$parent47 = _$temp;var _node42 = {}; //jpair pre

									_node42["types"] = it.msgTop;
									//jpair suf
									//jpair pre

									{
										var _jvalue4 = "";
										_jvalue4 = "linear-gradient(to right,#318DE6,#38CFE7)";
										//jpair suf

										_node42["activeColor"] = _jvalue4;
									}
									//jpair pre

									{
										var _jvalue5 = "";
										_jvalue5 = "#dddddd";
										//jpair suf

										_node42["inactiveColor"] = _jvalue5;
									}
									_addJson(_node42, _$parent47);
								}_chFunc(_node41);_$parent46.children.push(_node41);
							}_chFunc(_node38);_$parent43.children.push(_node38);
						}_$temp = _node35;{
							var _$parent48 = _$temp;var _node43 = { "attrs": {}, "tagName": "li", "sid": 31 };_node43.children = [];_node43.attrSize = 2;_node43.attrHash = 1142353148;_node43.attrs["w-class"] = "liItem";_node43.attrs["ev-switch-click"] = "msgAvoid";_$temp = _node43;{
								var _$parent49 = _$temp;var _node44 = { "attrs": {}, "tagName": "span", "sid": 32 };_node44.children = [];_node44.childHash = 3543527578;_node44.attrHash = 0;_$temp = _node44;{
									var _$parent50 = _$temp;var _node45 = _installText("消息免打扰", 590319036);;
									_$parent50.children.push(_node45);
								}_$parent49.children.push(_node44);
							}_$temp = _node43;{
								var _$parent51 = _$temp;var _node46 = { "attrs": {}, "tagName": "chat-client-app-widget-switch-switch", "sid": 33 };_node46.hasChild = false;_node46.child = null;_node46.attrHash = 0;_$temp = _node46;{
									var _$parent52 = _$temp;var _node47 = {}; //jpair pre

									_node47["types"] = it.msgAvoid;
									//jpair suf
									//jpair pre

									{
										var _jvalue6 = "";
										_jvalue6 = "linear-gradient(to right,#318DE6,#38CFE7)";
										//jpair suf

										_node47["activeColor"] = _jvalue6;
									}
									//jpair pre

									{
										var _jvalue7 = "";
										_jvalue7 = "#dddddd";
										//jpair suf

										_node47["inactiveColor"] = _jvalue7;
									}
									_addJson(_node47, _$parent52);
								}_chFunc(_node46);_$parent51.children.push(_node46);
							}_chFunc(_node43);_$parent48.children.push(_node43);
						}if (it.inFlag != 1) {
							_$temp = _node35;{
								var _$parent53 = _$temp;var _node48 = { "attrs": {}, "tagName": "div", "sid": 34 };_node48.children = [];_node48.childHash = 329155911;_node48.attrSize = 2;_node48.attrHash = 1254707198;_node48.attrs["w-class"] = "liItem1";_node48.attrs["on-tap"] = "startChat(e)";_$temp = _node48;{
									var _$parent54 = _$temp;var _node49 = _installText("开始对话", 3264223535);;
									_$parent54.children.push(_node49);
								}_$parent53.children.push(_node48);
							}
						}_chFunc(_node35);_$parent40.children.push(_node35);
					}_chFunc(_node33);_$parent38.children.push(_node33);
				}
			}_chFunc(_node14);_$parent17.children.push(_node14);
		}if (it.isContactorOpVisible && it.isFriend) {
			_$temp = _node;{
				var _$parent55 = _$temp;var _node50 = { "attrs": {}, "tagName": "div", "sid": 35 };_node50.children = [];_node50.attrSize = 2;_node50.attrHash = 1056293535;_node50.attrs["w-class"] = "contactorOpList";_node50.attrs["ev-handleFatherTap"] = "handleFatherTap";_$temp = _node50;{
					var _$parent56 = _$temp;var _node51 = { "attrs": {}, "tagName": "chat-client-app-widget-utilList-utilList", "sid": 36 };_node51.hasChild = false;_node51.child = null;_node51.attrHash = 0;_$temp = _node51;{
						var _$parent57 = _$temp;var _node52 = {}; //jpair pre

						_node52["utilList"] = it.utilList;
						//jpair suf
						_addJson(_node52, _$parent57);
					}_chFunc(_node51);_$parent56.children.push(_node51);
				}_chFunc(_node50);_$parent55.children.push(_node50);
			}
		}_chFunc(_node);return _node;
	}
});