(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 5;_node.attrHash = 1590832859;_node.attrs["w-class"] = "new-page";_node.attrs["on-tap"] = "pageClick";_node.attrs["class"] = "new-page";_node.attrs["on-scroll"] = "scrollPage";_node.attrs["id"] = "groupInfo";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 3;_node2.attrHash = 1730697305;_node2.attrs["w-class"] = "top-main-wrap";_node2.attrs["ev-next-click"] = "handleMoreGroup";_node2.attrs["ev-back-click"] = "goBack";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 465971772;_node3.attrs["style"] = "position:relative;min-height: 128px;";if (it.inFlag != 2) {
					_$temp = _node3;{
						var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "widget", "sid": 3 };_node4.hasChild = false;_node4.child = null;_node4.attrHash = 4193775671;_node4.attrs["w-tag"] = "chat-client-app-widget-topBar-topBar2";_node4.tagName = _node4.attrs["w-tag"];_$temp = _node4;{
							var _$parent5 = _$temp;var _node5 = {}; //jpair pre

							{
								var jvalue = "";
								jvalue = "";
								//jpair suf

								_node5["text"] = jvalue;
							}
							//jpair pre

							_node5["nextImg"] = it.scrollHeight ? "more-dot-blue.png" : "more-dot-white.png";
							//jpair suf
							//jpair pre

							_node5["scrollHeight"] = it.scrollHeight;
							//jpair suf
							_addJson(_node5, _$parent5);
						}_chFunc(_node4);_$parent4.children.push(_node4);
					}
				} else {
					_$temp = _node3;{
						var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "widget", "sid": 4 };_node6.hasChild = false;_node6.child = null;_node6.childHash = 2524097749;_node6.attrHash = 2136666532;_node6.attrs["w-tag"] = "chat-client-app-widget-topBar-topBar";_node6.tagName = _node6.attrs["w-tag"];_$temp = _node6;{
							var _$parent7 = _$temp;var _node7 = {}; //jpair pre

							{
								var _jvalue = "";
								_jvalue = "";
								//jpair suf

								_node7["title"] = _jvalue;
							}
							//jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "transparent";
								//jpair suf

								_node7["background"] = _jvalue2;
							}
							_addJson(_node7, _$parent7);
						}_$parent6.children.push(_node6);
					}
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 22015006;_node8.attrs["w-class"] = "home-info-wrap";if (it.avatarHtml) {
					_$temp = _node8;{
						var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "widget", "sid": 6 };_node9.hasChild = false;_node9.child = null;_node9.attrSize = 1;_node9.attrHash = 1962072486;_node9.attrs["w-tag"] = "pi-ui-html";_node9.tagName = _node9.attrs["w-tag"];_node9.attrs["style"] = "width:190px";_$temp = _node9;{
							var _$parent10 = _$temp;_addJson(it.avatarHtml, _$parent10);
						}_chFunc(_node9);_$parent9.children.push(_node9);
					}
				} else {
					_$temp = _node8;{
						var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "widget", "sid": 7 };_node10.hasChild = false;_node10.child = null;_node10.attrSize = 2;_node10.attrHash = 4113627608;_node10.attrs["w-tag"] = "chat-client-app-widget-imgShow-imgShow";_node10.tagName = _node10.attrs["w-tag"];_node10.attrs["w-class"] = "avatar";_node10.attrs["on-tap"] = "selectAvatar";_$temp = _node10;{
							var _$parent12 = _$temp;var _node11 = {}; //jpair pre

							_node11["imgURL"] = it.avatar;
							//jpair suf
							//jpair pre

							{
								var _jvalue3 = "";
								_jvalue3 = "190px;";
								//jpair suf

								_node11["width"] = _jvalue3;
							}
							_addJson(_node11, _$parent12);
						}_chFunc(_node10);_$parent11.children.push(_node10);
					}
				}_$temp = _node8;{
					var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 2372826457;_node12.attrs["w-class"] = "nameText";if (it.editable) {
						_$temp = _node12;{
							var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "input", "sid": 9 };_node13.children = [];_node13.attrSize = 7;_node13.attrHash = 3486872177;_node13.attrs["type"] = "text";{
								var attrvalue = "";attrvalue += it.groupAlias;attrvalue += "";_node13.attrs["value"] = attrvalue;
							}_node13.attrHash = _hash.nextHash(_node13.attrHash, _calTextHash(_node13.attrs["value"]));_node13.attrs["w-class"] = "groupAliasInput";_node13.attrs["maxlength"] = "10";_node13.attrs["on-blur"] = "changeGroupAlias";_node13.attrs["on-tap"] = "editGroupAlias";_node13.attrs["on-input"] = "groupAliasChange";_chFunc(_node13);_$parent14.children.push(_node13);
						}
					} else {
						_$temp = _node12;{
							var _$parent15 = _$temp;_addText(it.groupAlias || it.groupInfo.name, _$parent15);
						}
					}if (it.isOwner) {
						_$temp = _node12;{
							var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "img", "sid": 10 };_node14.children = [];_node14.childHash = 0;_node14.attrSize = 3;_node14.attrHash = 1706023126;_node14.attrs["w-class"] = "edit";_node14.attrs["src"] = "../../res/images/edit_gray.png";_node14.attrs["on-tap"] = "editGroupAlias";_$parent16.children.push(_node14);
						}
					}_chFunc(_node12);_$parent13.children.push(_node12);
				}_$temp = _node8;{
					var _$parent17 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 11 };_node15.children = [];_node15.attrHash = 0;_$temp = _node15;{
						var _$parent18 = _$temp;var _node16 = _installText("群号：", 945648903);;
						_$parent18.children.push(_node16);
					}_$temp = _node15;{
						var _$parent19 = _$temp;_addText(it.groupInfo.gid, _$parent19);
					}_chFunc(_node15);_$parent17.children.push(_node15);
				}_chFunc(_node8);_$parent8.children.push(_node8);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent20 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 12 };_node17.children = [];_node17.attrSize = 1;_node17.attrHash = 1409877924;_node17.attrs["w-class"] = "outter";_$temp = _node17;{
				var _$parent21 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 13 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 3735594628;_node18.attrs["w-class"] = "detail-info-wrap";_$temp = _node18;{
					var _$parent22 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 14 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 3931189419;_node19.attrs["w-class"] = "detail-info";_$temp = _node19;{
						var _$parent23 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 15 };_node20.children = [];_node20.childHash = 3118840475;_node20.attrSize = 2;_node20.attrHash = 3273310037;_node20.attrs["w-class"] = "adress-wrap";_node20.attrs["on-tap"] = "openGroupAnnounce";_$temp = _node20;{
							var _$parent24 = _$temp;var _node21 = { "attrs": {}, "tagName": "img", "sid": 16 };_node21.children = [];_node21.childHash = 0;_node21.attrSize = 2;_node21.attrHash = 1061286674;_node21.attrs["w-class"] = "adressIcon";_node21.attrs["src"] = "../../res/images/sound.png";_$parent24.children.push(_node21);
						}_$temp = _node20;{
							var _$parent25 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 17 };_node22.children = [];_node22.childHash = 919934968;_node22.attrSize = 1;_node22.attrHash = 4092497811;_node22.attrs["w-class"] = "adress-text-wrap";_$temp = _node22;{
								var _$parent26 = _$temp;var _node23 = { "attrs": {}, "tagName": "span", "sid": 18 };_node23.children = [];_node23.childHash = 835424273;_node23.attrSize = 1;_node23.attrHash = 471407342;_node23.attrs["w-class"] = "mainText";_$temp = _node23;{
									var _$parent27 = _$temp;var _node24 = _installText("无", 3196082368);;
									_$parent27.children.push(_node24);
								}_$parent26.children.push(_node23);
							}_$temp = _node22;{
								var _$parent28 = _$temp;var _node25 = { "attrs": {}, "tagName": "span", "sid": 19 };_node25.children = [];_node25.childHash = 395770178;_node25.attrSize = 1;_node25.attrHash = 1984368765;_node25.attrs["w-class"] = "flag";_$temp = _node25;{
									var _$parent29 = _$temp;var _node26 = _installText("群公告", 4067236615);;
									_$parent29.children.push(_node26);
								}_$parent28.children.push(_node25);
							}_$parent25.children.push(_node22);
						}_$parent23.children.push(_node20);
					}_$temp = _node19;{
						var _$parent30 = _$temp;var _node27 = { "attrs": {}, "tagName": "div", "sid": 20 };_node27.children = [];_node27.attrSize = 2;_node27.attrHash = 3304378522;_node27.attrs["w-class"] = "adress-wrap";_node27.attrs["style"] = "margin:0;";_$temp = _node27;{
							var _$parent31 = _$temp;var _node28 = { "attrs": {}, "tagName": "img", "sid": 21 };_node28.children = [];_node28.childHash = 0;_node28.attrSize = 2;_node28.attrHash = 3659022722;_node28.attrs["w-class"] = "adressIcon";_node28.attrs["src"] = "../../res/images/group-code.png";_$parent31.children.push(_node28);
						}_$temp = _node27;{
							var _$parent32 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 22 };_node29.children = [];_node29.attrSize = 1;_node29.attrHash = 4092497811;_node29.attrs["w-class"] = "adress-text-wrap";_$temp = _node29;{
								var _$parent33 = _$temp;var _node30 = { "attrs": {}, "tagName": "span", "sid": 23 };_node30.children = [];_node30.attrSize = 1;_node30.attrHash = 471407342;_node30.attrs["w-class"] = "mainText";_$temp = _node30;{
									var _$parent34 = _$temp;_addText(it.groupInfo.gid, _$parent34);
								}_chFunc(_node30);_$parent33.children.push(_node30);
							}_$temp = _node29;{
								var _$parent35 = _$temp;var _node31 = { "attrs": {}, "tagName": "span", "sid": 24 };_node31.children = [];_node31.childHash = 1786850706;_node31.attrSize = 1;_node31.attrHash = 1984368765;_node31.attrs["w-class"] = "flag";_$temp = _node31;{
									var _$parent36 = _$temp;var _node32 = _installText("群号", 4048808932);;
									_$parent36.children.push(_node32);
								}_$parent35.children.push(_node31);
							}_chFunc(_node29);_$parent32.children.push(_node29);
						}_chFunc(_node27);_$parent30.children.push(_node27);
					}_chFunc(_node19);_$parent22.children.push(_node19);
				}_$temp = _node18;{
					var _$parent37 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 25 };_node33.children = [];_node33.attrSize = 1;_node33.attrHash = 1474034264;_node33.attrs["w-class"] = "other-wrap";if (it.inFlag == 2) {
						_$temp = _node33;{
							var _$parent38 = _$temp;var _node34 = { "attrs": {}, "tagName": "div", "sid": 26 };_node34.children = [];_node34.childHash = 805852145;_node34.attrSize = 1;_node34.attrHash = 1326855316;_node34.attrs["style"] = "margin: 0 60px 20px;";_$temp = _node34;{
								var _$parent39 = _$temp;var _node35 = { "attrs": {}, "tagName": "div", "sid": 27 };_node35.children = [];_node35.childHash = 1033248042;_node35.attrSize = 2;_node35.attrHash = 1558955702;_node35.attrs["w-class"] = "liItem1";_node35.attrs["on-tap"] = "applyGroup(e)";_$temp = _node35;{
									var _$parent40 = _$temp;var _node36 = _installText("加入群", 3070554707);;
									_$parent40.children.push(_node36);
								}_$parent39.children.push(_node35);
							}_$parent38.children.push(_node34);
						}
					} else {
						_$temp = _node33;{
							var _$parent41 = _$temp;var _node37 = { "attrs": {}, "tagName": "img", "sid": 28 };_node37.children = [];_node37.childHash = 0;_node37.attrSize = 2;_node37.attrHash = 3865073803;_node37.attrs["w-class"] = "moreChooseIcon";_node37.attrs["src"] = "../../res/images/more-choose.png";_$parent41.children.push(_node37);
						}_$temp = _node33;{
							var _$parent42 = _$temp;var _node38 = { "attrs": {}, "tagName": "ul", "sid": 29 };_node38.children = [];_node38.attrSize = 1;_node38.attrHash = 3590369830;_node38.attrs["w-class"] = "ul-wrap";_$temp = _node38;{
								var _$parent43 = _$temp;var _node39 = { "attrs": {}, "tagName": "li", "sid": 30 };_node39.children = [];_node39.childHash = 285769228;_node39.attrSize = 2;_node39.attrHash = 1132440399;_node39.attrs["w-class"] = "liItem";_node39.attrs["style"] = "padding-top:0;";_$temp = _node39;{
									var _$parent44 = _$temp;var _node40 = _installText("搜索聊天记录", 2923426960);;
									_$parent44.children.push(_node40);
								}_$parent43.children.push(_node39);
							}_$temp = _node38;{
								var _$parent45 = _$temp;var _node41 = { "attrs": {}, "tagName": "li", "sid": 31 };_node41.children = [];_node41.attrSize = 2;_node41.attrHash = 2774552847;_node41.attrs["w-class"] = "liItem";_node41.attrs["ev-switch-click"] = "msgTop";_$temp = _node41;{
									var _$parent46 = _$temp;var _node42 = { "attrs": {}, "tagName": "span", "sid": 32 };_node42.children = [];_node42.childHash = 3911349331;_node42.attrHash = 0;_$temp = _node42;{
										var _$parent47 = _$temp;var _node43 = _installText("聊天置顶", 2458869684);;
										_$parent47.children.push(_node43);
									}_$parent46.children.push(_node42);
								}_$temp = _node41;{
									var _$parent48 = _$temp;var _node44 = { "attrs": {}, "tagName": "chat-client-app-widget-switch-switch", "sid": 33 };_node44.hasChild = false;_node44.child = null;_node44.attrHash = 0;_$temp = _node44;{
										var _$parent49 = _$temp;var _node45 = {}; //jpair pre

										_node45["types"] = it.msgTop;
										//jpair suf
										//jpair pre

										{
											var _jvalue4 = "";
											_jvalue4 = "linear-gradient(to right,#318DE6,#38CFE7)";
											//jpair suf

											_node45["activeColor"] = _jvalue4;
										}
										//jpair pre

										{
											var _jvalue5 = "";
											_jvalue5 = "#dddddd";
											//jpair suf

											_node45["inactiveColor"] = _jvalue5;
										}
										_addJson(_node45, _$parent49);
									}_chFunc(_node44);_$parent48.children.push(_node44);
								}_chFunc(_node41);_$parent45.children.push(_node41);
							}_$temp = _node38;{
								var _$parent50 = _$temp;var _node46 = { "attrs": {}, "tagName": "li", "sid": 34 };_node46.children = [];_node46.attrSize = 2;_node46.attrHash = 1142353148;_node46.attrs["w-class"] = "liItem";_node46.attrs["ev-switch-click"] = "msgAvoid";_$temp = _node46;{
									var _$parent51 = _$temp;var _node47 = { "attrs": {}, "tagName": "span", "sid": 35 };_node47.children = [];_node47.childHash = 3543527578;_node47.attrHash = 0;_$temp = _node47;{
										var _$parent52 = _$temp;var _node48 = _installText("消息免打扰", 590319036);;
										_$parent52.children.push(_node48);
									}_$parent51.children.push(_node47);
								}_$temp = _node46;{
									var _$parent53 = _$temp;var _node49 = { "attrs": {}, "tagName": "chat-client-app-widget-switch-switch", "sid": 36 };_node49.hasChild = false;_node49.child = null;_node49.attrHash = 0;_$temp = _node49;{
										var _$parent54 = _$temp;var _node50 = {}; //jpair pre

										_node50["types"] = it.msgAvoid;
										//jpair suf
										//jpair pre

										{
											var _jvalue6 = "";
											_jvalue6 = "linear-gradient(to right,#318DE6,#38CFE7)";
											//jpair suf

											_node50["activeColor"] = _jvalue6;
										}
										//jpair pre

										{
											var _jvalue7 = "";
											_jvalue7 = "#dddddd";
											//jpair suf

											_node50["inactiveColor"] = _jvalue7;
										}
										_addJson(_node50, _$parent54);
									}_chFunc(_node49);_$parent53.children.push(_node49);
								}_chFunc(_node46);_$parent50.children.push(_node46);
							}if (it.isAdmin) {
								_$temp = _node38;{
									var _$parent55 = _$temp;var _node51 = { "attrs": {}, "tagName": "div", "sid": 37 };_node51.children = [];_node51.childHash = 2942695134;_node51.attrSize = 3;_node51.attrHash = 2219464932;_node51.attrs["w-class"] = "liItem1";_node51.attrs["style"] = "color: #222222;";_node51.attrs["on-tap"] = "openGroupManage";_$temp = _node51;{
										var _$parent56 = _$temp;var _node52 = _installText("群管理", 4124910804);;
										_$parent56.children.push(_node52);
									}_$parent55.children.push(_node51);
								}
							}if (it.inFlag != 1) {
								_$temp = _node38;{
									var _$parent57 = _$temp;var _node53 = { "attrs": {}, "tagName": "div", "sid": 38 };_node53.children = [];_node53.childHash = 157274201;_node53.attrSize = 2;_node53.attrHash = 3357748646;_node53.attrs["w-class"] = "liItem1";_node53.attrs["on-tap"] = "openGroupChat(e)";_$temp = _node53;{
										var _$parent58 = _$temp;var _node54 = _installText("开始聊天", 3694853604);;
										_$parent58.children.push(_node54);
									}_$parent57.children.push(_node53);
								}
							}_chFunc(_node38);_$parent42.children.push(_node38);
						}
					}_chFunc(_node33);_$parent37.children.push(_node33);
				}_chFunc(_node18);_$parent21.children.push(_node18);
			}_$temp = _node17;{
				var _$parent59 = _$temp;var _node55 = { "attrs": {}, "tagName": "div", "sid": 39 };_node55.children = [];_node55.attrSize = 1;_node55.attrHash = 3353099507;_node55.attrs["w-class"] = "a-part";_$temp = _node55;{
					var _$parent60 = _$temp;var _node56 = { "attrs": {}, "tagName": "div", "sid": 40 };_node56.children = [];_node56.attrSize = 1;_node56.attrHash = 3382618739;_node56.attrs["w-class"] = "a";_$temp = _node56;{
						var _$parent61 = _$temp;var _node57 = _installText("成员（", 3362467924);;
						_$parent61.children.push(_node57);
					}_$temp = _node56;{
						var _$parent62 = _$temp;_addText(it.members.length, _$parent62);
					}_$temp = _node56;{
						var _$parent63 = _$temp;var _node58 = _installText("/500）", 3861796467);;
						_$parent63.children.push(_node58);
					}_chFunc(_node56);_$parent60.children.push(_node56);
				}if (it.inFlag != 2) {
					_$temp = _node55;{
						var _$parent64 = _$temp;var _node59 = { "attrs": {}, "tagName": "div", "sid": 41 };_node59.children = [];_node59.attrSize = 2;_node59.attrHash = 3192459407;_node59.attrs["w-class"] = "member-wrap";_node59.attrs["on-tap"] = "openGroupMember";_$temp = _node59;{
							var _$parent65 = _$temp;var _node60 = { "attrs": {}, "tagName": "img", "sid": 42 };_node60.children = [];_node60.childHash = 0;_node60.attrSize = 2;_node60.attrHash = 2559097707;_node60.attrs["w-class"] = "grouperIcon";_node60.attrs["src"] = "../../res/images/add_group_user.png";_$parent65.children.push(_node60);
						}{
							var _$i = 0;
							for (var _iterator = it.members, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
								var _ref;

								if (_isArray) {
									if (_i >= _iterator.length) break;
									_ref = _iterator[_i++];
								} else {
									_i = _iterator.next();
									if (_i.done) break;
									_ref = _i.value;
								}

								var v = _ref;
								var i = _$i++;if (i < 5) {
									_$temp = _node59;{
										var _$parent66 = _$temp;var _node61 = { "attrs": {}, "tagName": "img", "sid": 43 };_node61.children = [];_node61.childHash = 0;_node61.attrSize = 2;_node61.attrHash = 3523184127;_node61.attrs["w-class"] = "grouperIcon";_node61.attrs["src"] = "../../res/images/user.png";_$parent66.children.push(_node61);
									}
								}
							}
						}_$temp = _node59;{
							var _$parent67 = _$temp;var _node62 = { "attrs": {}, "tagName": "img", "sid": 44 };_node62.children = [];_node62.childHash = 0;_node62.attrSize = 2;_node62.attrHash = 830496694;_node62.attrs["w-class"] = "more";_node62.attrs["src"] = "../../res/images/more-gray.png";_$parent67.children.push(_node62);
						}_chFunc(_node59);_$parent64.children.push(_node59);
					}
				}_chFunc(_node55);_$parent59.children.push(_node55);
			}_chFunc(_node17);_$parent20.children.push(_node17);
		}if (it.isGroupOpVisible) {
			_$temp = _node;{
				var _$parent68 = _$temp;var _node63 = { "attrs": {}, "tagName": "div", "sid": 45 };_node63.children = [];_node63.attrSize = 2;_node63.attrHash = 2516983453;_node63.attrs["w-class"] = "utilList";_node63.attrs["ev-handleFatherTap"] = "handleFatherTap";_$temp = _node63;{
					var _$parent69 = _$temp;var _node64 = { "attrs": {}, "tagName": "chat-client-app-widget-utilList-utilList", "sid": 46 };_node64.hasChild = false;_node64.child = null;_node64.attrHash = 0;_$temp = _node64;{
						var _$parent70 = _$temp;var _node65 = {}; //jpair pre

						_node65["utilList"] = it.utilList;
						//jpair suf
						_addJson(_node65, _$parent70);
					}_chFunc(_node64);_$parent69.children.push(_node64);
				}_chFunc(_node63);_$parent68.children.push(_node63);
			}
		}_chFunc(_node);return _node;
	}
});