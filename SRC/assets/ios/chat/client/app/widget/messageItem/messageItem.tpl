(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrHash = 0;if (!it.msg.cancel && it.msg.mtype < 5 || it.msg.mtype == 9 || it.msg.mtype == 12) {
			_$temp = _node;{
				var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 793787207;_node2.attrs["style"] = "overflow: hidden;";if (it.me) {
					_$temp = _node2;{
						var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 1972865127;_node3.attrs["style"] = "position:relative;margin: 10px 40px 0;float: right;";if (it.msg.mtype == 9) {
							_$temp = _node3;{
								var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "widget", "sid": 3 };_node4.hasChild = false;_node4.child = null;_node4.attrSize = 1;_node4.attrHash = 2751492981;_node4.attrs["w-tag"] = "chat-client-app-widget-nameCard-nameCard";_node4.tagName = _node4.attrs["w-tag"];_node4.attrs["on-tap"] = "openRedEnvelope";_$temp = _node4;{
									var _$parent5 = _$temp;var _node5 = {}; //jpair pre

									_node5["cardInfo"] = it.msg.msg;
									//jpair suf
									//jpair pre

									{
										var jvalue = "";
										jvalue = "redEnv";
										//jpair suf

										_node5["cardType"] = jvalue;
									}
									_addJson(_node5, _$parent5);
								}_chFunc(_node4);_$parent4.children.push(_node4);
							}_$temp = _node3;{
								var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "span", "sid": 4 };_node6.children = [];_node6.childHash = 2946814719;_node6.attrSize = 2;_node6.attrHash = 3587082310;_node6.attrs["w-class"] = "rightDownTail";_node6.attrs["style"] = "border-top: 10px solid #fff;";_$parent6.children.push(_node6);
							}
						} else if (it.msg.mtype == 2) {
							_$temp = _node3;{
								var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 3;_node7.attrHash = 2099113858;_node7.attrs["w-class"] = "img-wrap";_node7.attrs["on-tap"] = "openBigImage";_node7.attrs["on-longtap"] = "openMessageRecall";_$temp = _node7;{
									var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "widget", "sid": 6 };_node8.hasChild = false;_node8.child = null;_node8.attrSize = 1;_node8.attrHash = 3107403998;_node8.attrs["w-tag"] = "pi-ui-html";_node8.tagName = _node8.attrs["w-tag"];_node8.attrs["w-class"] = "pi-html";_$temp = _node8;{
										var _$parent9 = _$temp;_addJson(it.msg.msg, _$parent9);
									}_chFunc(_node8);_$parent8.children.push(_node8);
								}_$temp = _node7;{
									var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 3033652541;_node9.attrs["w-class"] = "imgCorner";_$temp = _node9;{
										var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "span", "sid": 8 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 675779844;_node10.attrs["style"] = "color:rgba(187, 229, 254, 1)";_$temp = _node10;{
											var _$parent12 = _$temp;_addText(it.time, _$parent12);
										}_chFunc(_node10);_$parent11.children.push(_node10);
									}if (it.chatType == "user") {
										_$temp = _node9;{
											var _$parent13 = _$temp;var _node11 = { "attrs": {}, "tagName": "img", "sid": 9 };_node11.children = [];_node11.attrSize = 2;_node11.attrHash = 2914597031;_node11.attrs["w-class"] = "isRead";{
												var attrvalue = "";attrvalue += "../../res/images/";attrvalue += it.msg.read ? 'readed' : 'unread';attrvalue += ".png";_node11.attrs["src"] = attrvalue;
											}_node11.attrHash = _hash.nextHash(_node11.attrHash, _calTextHash(_node11.attrs["src"]));_chFunc(_node11);_$parent13.children.push(_node11);
										}
									}_chFunc(_node9);_$parent10.children.push(_node9);
								}_chFunc(_node7);_$parent7.children.push(_node7);
							}
						} else if (it.msg.mtype == 3) {
							_$temp = _node3;{
								var _$parent14 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 10 };_node12.children = [];_node12.attrSize = 4;_node12.attrHash = 3399809850;_node12.attrs["w-class"] = "radio-wrap";_node12.attrs["on-tap"] = "playRadioMess";{
									var _attrvalue = "";_attrvalue += "width:";_attrvalue += it.msg.width * 4 + 250;_attrvalue += "px;";_node12.attrs["style"] = _attrvalue;
								}_node12.attrHash = _hash.nextHash(_node12.attrHash, _calTextHash(_node12.attrs["style"]));_node12.attrs["on-longtap"] = "openMessageRecall";_$temp = _node12;{
									var _$parent15 = _$temp;var _node13 = { "attrs": {}, "tagName": "img", "sid": 11 };_node13.children = [];_node13.attrSize = 2;_node13.attrHash = 4194304151;_node13.attrs["w-class"] = "playBtn";{
										var _attrvalue2 = "";_attrvalue2 += "../../res/images/";_attrvalue2 += it.playRadio ? 'stop-radio.png' : 'play-radio.png';_attrvalue2 += "";_node13.attrs["src"] = _attrvalue2;
									}_node13.attrHash = _hash.nextHash(_node13.attrHash, _calTextHash(_node13.attrs["src"]));_chFunc(_node13);_$parent15.children.push(_node13);
								}_$temp = _node12;{
									var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "widget", "sid": 12 };_node14.hasChild = false;_node14.child = null;_node14.attrSize = 2;_node14.attrHash = 1988220151;_node14.attrs["w-tag"] = "pi-ui-html";_node14.tagName = _node14.attrs["w-tag"];_node14.attrs["w-class"] = "pi-html";_node14.attrs["style"] = "flex:1 0 0;";_$temp = _node14;{
										var _$parent17 = _$temp;_addJson(it.msg.msg, _$parent17);
									}_chFunc(_node14);_$parent16.children.push(_node14);
								}_$temp = _node12;{
									var _$parent18 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 13 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 1292794146;_node15.attrs["w-class"] = "corner";_$temp = _node15;{
										var _$parent19 = _$temp;var _node16 = { "attrs": {}, "tagName": "span", "sid": 14 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 762732788;_node16.attrs["w-class"] = "sendTime";_$temp = _node16;{
											var _$parent20 = _$temp;_addText(it.time, _$parent20);
										}_chFunc(_node16);_$parent19.children.push(_node16);
									}if (it.chatType == "user") {
										_$temp = _node15;{
											var _$parent21 = _$temp;var _node17 = { "attrs": {}, "tagName": "img", "sid": 15 };_node17.children = [];_node17.attrSize = 2;_node17.attrHash = 2914597031;_node17.attrs["w-class"] = "isRead";{
												var _attrvalue3 = "";_attrvalue3 += "../../res/images/";_attrvalue3 += it.msg.read ? 'readed' : 'unread';_attrvalue3 += ".png";_node17.attrs["src"] = _attrvalue3;
											}_node17.attrHash = _hash.nextHash(_node17.attrHash, _calTextHash(_node17.attrs["src"]));_chFunc(_node17);_$parent21.children.push(_node17);
										}
									}_chFunc(_node15);_$parent18.children.push(_node15);
								}_chFunc(_node12);_$parent14.children.push(_node12);
							}_$temp = _node3;{
								var _$parent22 = _$temp;var _node18 = { "attrs": {}, "tagName": "span", "sid": 16 };_node18.children = [];_node18.childHash = 2946814719;_node18.attrSize = 1;_node18.attrHash = 759238593;_node18.attrs["w-class"] = "rightDownTail";_$parent22.children.push(_node18);
							}
						} else {
							_$temp = _node3;{
								var _$parent23 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 17 };_node19.children = [];_node19.attrSize = 3;_node19.attrHash = 3988903666;_node19.attrs["w-class"] = "text-wrap";_node19.attrs["on-longtap"] = "openMessageRecall";_node19.attrs["on-tap"] = "msgDetailClick";_$temp = _node19;{
									var _$parent24 = _$temp;var _node20 = { "attrs": {}, "tagName": "widget", "sid": 18 };_node20.hasChild = false;_node20.child = null;_node20.attrSize = 1;_node20.attrHash = 3107403998;_node20.attrs["w-tag"] = "pi-ui-html";_node20.tagName = _node20.attrs["w-tag"];_node20.attrs["w-class"] = "pi-html";_$temp = _node20;{
										var _$parent25 = _$temp;_addJson(it.msg.msg, _$parent25);
									}_chFunc(_node20);_$parent24.children.push(_node20);
								}_$temp = _node19;{
									var _$parent26 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 19 };_node21.children = [];_node21.attrSize = 1;_node21.attrHash = 1292794146;_node21.attrs["w-class"] = "corner";_$temp = _node21;{
										var _$parent27 = _$temp;var _node22 = { "attrs": {}, "tagName": "span", "sid": 20 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 762732788;_node22.attrs["w-class"] = "sendTime";_$temp = _node22;{
											var _$parent28 = _$temp;_addText(it.time, _$parent28);
										}_chFunc(_node22);_$parent27.children.push(_node22);
									}if (it.chatType == "user") {
										_$temp = _node21;{
											var _$parent29 = _$temp;var _node23 = { "attrs": {}, "tagName": "img", "sid": 21 };_node23.children = [];_node23.attrSize = 2;_node23.attrHash = 2914597031;_node23.attrs["w-class"] = "isRead";{
												var _attrvalue4 = "";_attrvalue4 += "../../res/images/";_attrvalue4 += it.msg.read ? 'readed' : 'unread';_attrvalue4 += ".png";_node23.attrs["src"] = _attrvalue4;
											}_node23.attrHash = _hash.nextHash(_node23.attrHash, _calTextHash(_node23.attrs["src"]));_chFunc(_node23);_$parent29.children.push(_node23);
										}
									}_chFunc(_node21);_$parent26.children.push(_node21);
								}_chFunc(_node19);_$parent23.children.push(_node19);
							}_$temp = _node3;{
								var _$parent30 = _$temp;var _node24 = { "attrs": {}, "tagName": "span", "sid": 22 };_node24.children = [];_node24.childHash = 2946814719;_node24.attrSize = 1;_node24.attrHash = 759238593;_node24.attrs["w-class"] = "rightDownTail";_$parent30.children.push(_node24);
							}
						}if (it.isMessageRecallVisible) {
							_$temp = _node3;{
								var _$parent31 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 23 };_node25.children = [];_node25.childHash = 39471976;_node25.attrSize = 1;_node25.attrHash = 765246306;_node25.attrs["style"] = "position:absolute;bottom: 0;left:-150px;";_$temp = _node25;{
									var _$parent32 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 24 };_node26.children = [];_node26.childHash = 1497185280;_node26.attrSize = 2;_node26.attrHash = 1537548913;_node26.attrs["w-class"] = "recallBtn";_node26.attrs["on-tap"] = "recall";_$temp = _node26;{
										var _$parent33 = _$temp;var _node27 = _installText("撤回", 3543959681);;
										_$parent33.children.push(_node27);
									}_$parent32.children.push(_node26);
								}_$parent31.children.push(_node25);
							}
						}_chFunc(_node3);_$parent3.children.push(_node3);
					}if (it.refusedMsg) {
						_$temp = _node2;{
							var _$parent34 = _$temp;var _node28 = { "attrs": {}, "tagName": "img", "sid": 25 };_node28.children = [];_node28.childHash = 0;_node28.attrSize = 2;_node28.attrHash = 3243963076;_node28.attrs["src"] = "../../res/images/refusedMsg.png";_node28.attrs["w-class"] = "loading";_$parent34.children.push(_node28);
						}
					}
				} else {
					_$temp = _node2;{
						var _$parent35 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 26 };_node29.children = [];_node29.attrSize = 1;_node29.attrHash = 3547124442;_node29.attrs["w-class"] = "username";_$temp = _node29;{
							var _$parent36 = _$temp;_addText(it.name, _$parent36);
						}_chFunc(_node29);_$parent35.children.push(_node29);
					}_$temp = _node2;{
						var _$parent37 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 27 };_node30.children = [];_node30.attrSize = 1;_node30.attrHash = 1170059783;_node30.attrs["style"] = "display:flex;margin:10px 20px;";_$temp = _node30;{
							var _$parent38 = _$temp;var _node31 = { "attrs": {}, "tagName": "widget", "sid": 28 };_node31.hasChild = false;_node31.child = null;_node31.attrSize = 2;_node31.attrHash = 1847518090;_node31.attrs["w-tag"] = "chat-client-app-widget-imgShow-imgShow";_node31.tagName = _node31.attrs["w-tag"];_node31.attrs["w-class"] = "avatar";_node31.attrs["on-tap"] = "userDetail";_$temp = _node31;{
								var _$parent39 = _$temp;var _node32 = {}; //jpair pre

								_node32["imgURL"] = it.avatar;
								//jpair suf
								//jpair pre

								{
									var _jvalue = "";
									_jvalue = "80px;";
									//jpair suf

									_node32["width"] = _jvalue;
								}
								_addJson(_node32, _$parent39);
							}_chFunc(_node31);_$parent38.children.push(_node31);
						}if (it.msg.mtype == 9) {
							_$temp = _node30;{
								var _$parent40 = _$temp;var _node33 = { "attrs": {}, "tagName": "span", "sid": 29 };_node33.children = [];_node33.childHash = 2946814719;_node33.attrSize = 2;_node33.attrHash = 1354885852;_node33.attrs["w-class"] = "leftDownTail";_node33.attrs["style"] = "border-bottom:10px solid rgba(235,79,79,1)";_$parent40.children.push(_node33);
							}_$temp = _node30;{
								var _$parent41 = _$temp;var _node34 = { "attrs": {}, "tagName": "widget", "sid": 30 };_node34.hasChild = false;_node34.child = null;_node34.attrSize = 1;_node34.attrHash = 2751492981;_node34.attrs["w-tag"] = "chat-client-app-widget-nameCard-nameCard";_node34.tagName = _node34.attrs["w-tag"];_node34.attrs["on-tap"] = "openRedEnvelope";_$temp = _node34;{
									var _$parent42 = _$temp;var _node35 = {}; //jpair pre

									_node35["cardInfo"] = it.msg.msg;
									//jpair suf
									//jpair pre

									{
										var _jvalue2 = "";
										_jvalue2 = "redEnv";
										//jpair suf

										_node35["cardType"] = _jvalue2;
									}
									_addJson(_node35, _$parent42);
								}_chFunc(_node34);_$parent41.children.push(_node34);
							}
						} else if (it.msg.mtype == 2) {
							_$temp = _node30;{
								var _$parent43 = _$temp;var _node36 = { "attrs": {}, "tagName": "div", "sid": 31 };_node36.children = [];_node36.attrSize = 2;_node36.attrHash = 3013055167;_node36.attrs["w-class"] = "img-wrap";_node36.attrs["on-tap"] = "openBigImage";_$temp = _node36;{
									var _$parent44 = _$temp;var _node37 = { "attrs": {}, "tagName": "widget", "sid": 32 };_node37.hasChild = false;_node37.child = null;_node37.attrSize = 1;_node37.attrHash = 3107403998;_node37.attrs["w-tag"] = "pi-ui-html";_node37.tagName = _node37.attrs["w-tag"];_node37.attrs["w-class"] = "pi-html";_$temp = _node37;{
										var _$parent45 = _$temp;_addJson(it.msg.msg, _$parent45);
									}_chFunc(_node37);_$parent44.children.push(_node37);
								}_$temp = _node36;{
									var _$parent46 = _$temp;var _node38 = { "attrs": {}, "tagName": "div", "sid": 33 };_node38.children = [];_node38.attrSize = 1;_node38.attrHash = 3033652541;_node38.attrs["w-class"] = "imgCorner";_$temp = _node38;{
										var _$parent47 = _$temp;var _node39 = { "attrs": {}, "tagName": "span", "sid": 34 };_node39.children = [];_node39.attrSize = 1;_node39.attrHash = 675779844;_node39.attrs["style"] = "color:rgba(187, 229, 254, 1)";_$temp = _node39;{
											var _$parent48 = _$temp;_addText(it.time, _$parent48);
										}_chFunc(_node39);_$parent47.children.push(_node39);
									}_chFunc(_node38);_$parent46.children.push(_node38);
								}_chFunc(_node36);_$parent43.children.push(_node36);
							}
						} else if (it.msg.mtype == 3) {
							_$temp = _node30;{
								var _$parent49 = _$temp;var _node40 = { "attrs": {}, "tagName": "span", "sid": 35 };_node40.children = [];_node40.childHash = 2946814719;_node40.attrSize = 1;_node40.attrHash = 4148981691;_node40.attrs["w-class"] = "leftDownTail";_$parent49.children.push(_node40);
							}_$temp = _node30;{
								var _$parent50 = _$temp;var _node41 = { "attrs": {}, "tagName": "div", "sid": 36 };_node41.children = [];_node41.attrSize = 3;_node41.attrHash = 2428051647;_node41.attrs["w-class"] = "radio-wrap";{
									var _attrvalue5 = "";_attrvalue5 += "color:#222222;background:#fff;width:";_attrvalue5 += it.msg.width * 4 + 250;_attrvalue5 += "px;";_node41.attrs["style"] = _attrvalue5;
								}_node41.attrHash = _hash.nextHash(_node41.attrHash, _calTextHash(_node41.attrs["style"]));_node41.attrs["on-tap"] = "playRadioMess";_$temp = _node41;{
									var _$parent51 = _$temp;var _node42 = { "attrs": {}, "tagName": "img", "sid": 37 };_node42.children = [];_node42.attrSize = 3;_node42.attrHash = 1754411752;_node42.attrs["w-class"] = "playBtn";{
										var _attrvalue6 = "";_attrvalue6 += "../../res/images/";_attrvalue6 += it.playRadio ? 'stop-radio.png' : 'play-radio.png';_attrvalue6 += "";_node42.attrs["src"] = _attrvalue6;
									}_node42.attrHash = _hash.nextHash(_node42.attrHash, _calTextHash(_node42.attrs["src"]));_node42.attrs["class"] = "audioImage";_chFunc(_node42);_$parent51.children.push(_node42);
								}_$temp = _node41;{
									var _$parent52 = _$temp;var _node43 = { "attrs": {}, "tagName": "widget", "sid": 38 };_node43.hasChild = false;_node43.child = null;_node43.attrSize = 2;_node43.attrHash = 1988220151;_node43.attrs["w-tag"] = "pi-ui-html";_node43.tagName = _node43.attrs["w-tag"];_node43.attrs["w-class"] = "pi-html";_node43.attrs["style"] = "flex:1 0 0;";_$temp = _node43;{
										var _$parent53 = _$temp;_addJson(it.msg.msg, _$parent53);
									}_chFunc(_node43);_$parent52.children.push(_node43);
								}_$temp = _node41;{
									var _$parent54 = _$temp;var _node44 = { "attrs": {}, "tagName": "div", "sid": 39 };_node44.children = [];_node44.attrSize = 1;_node44.attrHash = 1292794146;_node44.attrs["w-class"] = "corner";_$temp = _node44;{
										var _$parent55 = _$temp;var _node45 = { "attrs": {}, "tagName": "span", "sid": 40 };_node45.children = [];_node45.attrSize = 2;_node45.attrHash = 1095879518;_node45.attrs["w-class"] = "sendTime";_node45.attrs["style"] = "color:#297FCA";_$temp = _node45;{
											var _$parent56 = _$temp;_addText(it.time, _$parent56);
										}_chFunc(_node45);_$parent55.children.push(_node45);
									}_chFunc(_node44);_$parent54.children.push(_node44);
								}_chFunc(_node41);_$parent50.children.push(_node41);
							}
						} else {
							_$temp = _node30;{
								var _$parent57 = _$temp;var _node46 = { "attrs": {}, "tagName": "span", "sid": 41 };_node46.children = [];_node46.childHash = 2946814719;_node46.attrSize = 1;_node46.attrHash = 4148981691;_node46.attrs["w-class"] = "leftDownTail";_$parent57.children.push(_node46);
							}_$temp = _node30;{
								var _$parent58 = _$temp;var _node47 = { "attrs": {}, "tagName": "div", "sid": 42 };_node47.children = [];_node47.attrSize = 3;_node47.attrHash = 3757048141;_node47.attrs["w-class"] = "text-wrap";_node47.attrs["style"] = "color:#222222;background:#fff;";_node47.attrs["on-tap"] = "msgDetailClick";_$temp = _node47;{
									var _$parent59 = _$temp;var _node48 = { "attrs": {}, "tagName": "widget", "sid": 43 };_node48.hasChild = false;_node48.child = null;_node48.attrSize = 1;_node48.attrHash = 3107403998;_node48.attrs["w-tag"] = "pi-ui-html";_node48.tagName = _node48.attrs["w-tag"];_node48.attrs["w-class"] = "pi-html";_$temp = _node48;{
										var _$parent60 = _$temp;_addJson(it.msg.msg, _$parent60);
									}_chFunc(_node48);_$parent59.children.push(_node48);
								}_$temp = _node47;{
									var _$parent61 = _$temp;var _node49 = { "attrs": {}, "tagName": "div", "sid": 44 };_node49.children = [];_node49.attrSize = 1;_node49.attrHash = 1292794146;_node49.attrs["w-class"] = "corner";_$temp = _node49;{
										var _$parent62 = _$temp;var _node50 = { "attrs": {}, "tagName": "span", "sid": 45 };_node50.children = [];_node50.attrSize = 2;_node50.attrHash = 1095879518;_node50.attrs["w-class"] = "sendTime";_node50.attrs["style"] = "color:#297FCA";_$temp = _node50;{
											var _$parent63 = _$temp;_addText(it.time, _$parent63);
										}_chFunc(_node50);_$parent62.children.push(_node50);
									}_chFunc(_node49);_$parent61.children.push(_node49);
								}_chFunc(_node47);_$parent58.children.push(_node47);
							}
						}_chFunc(_node30);_$parent37.children.push(_node30);
					}
				}_chFunc(_node2);_$parent2.children.push(_node2);
			}
		} else if (it.msg.mtype == 5) {
			_$temp = _node;{
				var _$parent64 = _$temp;var _node51 = { "attrs": {}, "tagName": "div", "sid": 46 };_node51.children = [];_node51.attrSize = 1;_node51.attrHash = 2885852310;_node51.attrs["w-class"] = "recallMsg";_$temp = _node51;{
					var _$parent65 = _$temp;_addText(it.me ? "你" : it.name, _$parent65);
				}_$temp = _node51;{
					var _$parent66 = _$temp;var _node52 = _installText("撤回了一条消息", 2833016176);;
					_$parent66.children.push(_node52);
				}_chFunc(_node51);_$parent64.children.push(_node51);
			}
		} else if (it.msg.mtype == 8 || it.msg.mtype == 10) {
			_$temp = _node;{
				var _$parent67 = _$temp;var _node53 = { "attrs": {}, "tagName": "div", "sid": 47 };_node53.children = [];_node53.attrSize = 2;_node53.attrHash = 2983596414;_node53.attrs["w-class"] = "recallMsg";_node53.attrs["style"] = "font-size:32px;";_$temp = _node53;{
					var _$parent68 = _$temp;_addText(it.msg.msg, _$parent68);
				}_chFunc(_node53);_$parent67.children.push(_node53);
			}
		} else if (it.msg.mtype == 11) {
			_$temp = _node;{
				var _$parent69 = _$temp;var _node54 = { "attrs": {}, "tagName": "div", "sid": 48 };_node54.children = [];_node54.attrSize = 2;_node54.attrHash = 2983596414;_node54.attrs["w-class"] = "recallMsg";_node54.attrs["style"] = "font-size:32px;";_$temp = _node54;{
					var _$parent70 = _$temp;_addText(it.me ? "你" : it.name, _$parent70);
				}_$temp = _node54;{
					var _$parent71 = _$temp;var _node55 = _installText("已成功加入群组", 2398122679);;
					_$parent71.children.push(_node55);
				}_chFunc(_node54);_$parent69.children.push(_node54);
			}
		}_chFunc(_node);return _node;
	}
});