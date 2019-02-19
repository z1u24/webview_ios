(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;it1 = it1 || { lastChat: [], contactMap: "" };_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 24767440;_node.attrs["w-class"] = "new-page";_node.attrs["class"] = "new-page";_node.attrs["on-tap"] = "closeMore";if (it.hasWallet) {
			_$temp = _node;{
				var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 3;_node2.attrHash = 2492763353;_node2.attrs["w-class"] = "topBack";_node2.attrs["ev-next-click"] = "getMore";_node2.attrs["ev-refresh-click"] = "refreshPage";_$temp = _node2;{
					var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.childHash = 2946814719;_node3.attrSize = 1;_node3.attrHash = 4734226;_node3.attrs["w-class"] = "backImg";_$parent3.children.push(_node3);
				}if (it1.contactMap && it1.contactMap.applyUser.length + it1.contactMap.applyGroup.length > 0) {
					_$temp = _node2;{
						var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "span", "sid": 3 };_node4.children = [];_node4.childHash = 2946814719;_node4.attrSize = 1;_node4.attrHash = 3154146316;_node4.attrs["w-class"] = "redSpot";_$parent4.children.push(_node4);
					}
				}_$temp = _node2;{
					var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "widget", "sid": 4 };_node5.hasChild = false;_node5.child = null;_node5.attrHash = 646633041;_node5.attrs["w-tag"] = "chat-client-app-widget-topBar-topBar1";_node5.tagName = _node5.attrs["w-tag"];_$temp = _node5;{
						var _$parent6 = _$temp;var _node6 = {}; //jpair pre

						{
							var jvalue = "";
							jvalue += it.avatar;jvalue += "";
							//jpair suf

							_node6["avatar"] = jvalue;
						}
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "../../res/images/add-white.png";
							//jpair suf

							_node6["nextImg"] = _jvalue;
						}
						_addJson(_node6, _$parent6);
					}_chFunc(_node5);_$parent5.children.push(_node5);
				}_chFunc(_node2);_$parent2.children.push(_node2);
			}_$temp = _node;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 2825404704;_node7.attrs["w-class"] = "history-wrap";if (!it.isLogin) {
					_$temp = _node7;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.childHash = 1741060520;_node8.attrSize = 1;_node8.attrHash = 2135104629;_node8.attrs["w-class"] = "netClose";_$temp = _node8;{
							var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "img", "sid": 7 };_node9.children = [];_node9.childHash = 0;_node9.attrSize = 2;_node9.attrHash = 924247853;_node9.attrs["src"] = "../../res/images/question_blue.png";_node9.attrs["style"] = "width:48px;margin-right: 20px;";_$parent9.children.push(_node9);
						}_$temp = _node8;{
							var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "span", "sid": 8 };_node10.children = [];_node10.childHash = 727437460;_node10.attrHash = 0;_$temp = _node10;{
								var _$parent11 = _$temp;var _node11 = _installText("网络连接不可用", 4011952663);;
								_$parent11.children.push(_node11);
							}_$parent10.children.push(_node10);
						}_$parent8.children.push(_node8);
					}
				}if (it1.lastChat && it1.lastChat.length == 0) {
					_$temp = _node7;{
						var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.childHash = 3061339268;_node12.attrSize = 1;_node12.attrHash = 3583682907;_node12.attrs["style"] = "text-align: center;";_$temp = _node12;{
							var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "img", "sid": 10 };_node13.children = [];_node13.childHash = 0;_node13.attrSize = 2;_node13.attrHash = 2256362048;_node13.attrs["src"] = "../../res/images/chatEmpty.png";_node13.attrs["w-class"] = "emptyImg";_$parent13.children.push(_node13);
						}_$temp = _node12;{
							var _$parent14 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 11 };_node14.children = [];_node14.childHash = 1893011558;_node14.attrSize = 1;_node14.attrHash = 4258775645;_node14.attrs["w-class"] = "emptyText";_$temp = _node14;{
								var _$parent15 = _$temp;var _node15 = _installText("快开始聊天吧~", 1351898091);;
								_$parent15.children.push(_node15);
							}_$parent14.children.push(_node14);
						}_$parent12.children.push(_node12);
					}
				} else if (it1.lastChat) {
					_$temp = _node7;{
						var _$parent16 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 12 };_node16.children = [];_node16.attrSize = 2;_node16.attrHash = 898542408;_node16.attrs["w-class"] = "inner-wrap";{
							var attrvalue = "";attrvalue += "margin-top:";attrvalue += it.netClose ? '10px' : '30px;';attrvalue += "";_node16.attrs["style"] = attrvalue;
						}_node16.attrHash = _hash.nextHash(_node16.attrHash, _calTextHash(_node16.attrs["style"]));{
							var _$i = 0;
							for (var _iterator = it1.lastChat, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
								var i = _$i++;_$temp = _node16;{
									var _$parent17 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 13 };_node17.children = [];_node17.attrSize = 2;_node17.attrHash = 2173318385;{
										var _attrvalue = "";_attrvalue += "chat(e,";_attrvalue += v[0];_attrvalue += ",'";_attrvalue += v[2];_attrvalue += "')";_node17.attrs["on-tap"] = _attrvalue;
									}_node17.attrHash = _hash.nextHash(_node17.attrHash, _calTextHash(_node17.attrs["on-tap"]));_node17.attrs["style"] = "margin-bottom: 10px;";_$temp = _node17;{
										var _$parent18 = _$temp;var _node18 = { "attrs": {}, "tagName": "widget", "sid": 14 };_node18.hasChild = false;_node18.child = null;_node18.attrHash = 2754454529;_node18.attrs["w-tag"] = "chat-client-app-view-chat-messageRecord";_node18.tagName = _node18.attrs["w-tag"];_$temp = _node18;{
											var _$parent19 = _$temp;var _node19 = {}; //jpair pre

											_node19["rid"] = v[0];
											//jpair suf
											//jpair pre

											_node19["time"] = v[1];
											//jpair suf
											//jpair pre

											_node19["chatType"] = v[2];
											//jpair suf
											_addJson(_node19, _$parent19);
										}_chFunc(_node18);_$parent18.children.push(_node18);
									}_chFunc(_node17);_$parent17.children.push(_node17);
								}
							}
						}_chFunc(_node16);_$parent16.children.push(_node16);
					}
				}_chFunc(_node7);_$parent7.children.push(_node7);
			}if (it.isUtilVisible) {
				_$temp = _node;{
					var _$parent20 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 15 };_node20.children = [];_node20.attrSize = 2;_node20.attrHash = 2686158824;_node20.attrs["w-class"] = "util-wrap";_node20.attrs["ev-handleFatherTap"] = "handleFatherTap";_$temp = _node20;{
						var _$parent21 = _$temp;var _node21 = { "attrs": {}, "tagName": "chat-client-app-widget-utilList-utilList", "sid": 16 };_node21.hasChild = false;_node21.child = null;_node21.attrHash = 0;_$temp = _node21;{
							var _$parent22 = _$temp;var _node22 = {}; //jpair pre

							_node22["utilList"] = it.utilList;
							//jpair suf
							_addJson(_node22, _$parent22);
						}_chFunc(_node21);_$parent21.children.push(_node21);
					}if (it1.contactMap && it1.contactMap.applyUser.length + it1.contactMap.applyGroup.length > 0) {
						_$temp = _node20;{
							var _$parent23 = _$temp;var _node23 = { "attrs": {}, "tagName": "span", "sid": 17 };_node23.children = [];_node23.childHash = 2946814719;_node23.attrSize = 2;_node23.attrHash = 2616069812;_node23.attrs["w-class"] = "redSpot";_node23.attrs["style"] = "right: 145px;top:20px;";_$parent23.children.push(_node23);
						}
					}_chFunc(_node20);_$parent20.children.push(_node20);
				}
			}
		} else {
			_$temp = _node;{
				var _$parent24 = _$temp;var _node24 = { "attrs": {}, "tagName": "app-view-chat-home-home", "sid": 18 };_node24.hasChild = false;_node24.child = null;_node24.childHash = 2946814719;_node24.attrHash = 0;_$parent24.children.push(_node24);
			}
		}_chFunc(_node);return _node;
	}
});