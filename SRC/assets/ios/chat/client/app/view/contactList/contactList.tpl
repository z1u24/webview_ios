(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;it1 = it1 || { "friends": [], "applyUser": [], "applyGroup": [] };_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 1450978127;_node.attrs["w-class"] = "new-page";_node.attrs["class"] = "new-page";_node.attrs["ev-back-click"] = "goBack";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 3646201315;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				{
					var jvalue = "";
					jvalue = "通讯录";
					//jpair suf

					_node3["title"] = jvalue;
				}
				_addJson(_node3, _$parent3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 487306359;_node4.attrs["w-class"] = "content";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 3302196029;_node5.attrs["w-class"] = "topic-wrap";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 2632507823;_node6.attrs["on-tap"] = "goNext(0)";_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "chat-client-app-view-contactList-contactItem", "sid": 5 };_node7.hasChild = false;_node7.child = null;_node7.attrHash = 0;_$temp = _node7;{
							var _$parent8 = _$temp;var _node8 = {}; //jpair pre

							{
								var _jvalue = "";
								_jvalue = "新的朋友";
								//jpair suf

								_node8["text"] = _jvalue;
							}
							//jpair pre

							_node8["totalNew"] = it1.applyUser.length + it1.applyGroup.length;
							//jpair suf
							//jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "../../res/images/new-friend.png";
								//jpair suf

								_node8["img"] = _jvalue2;
							}
							_addJson(_node8, _$parent8);
						}_chFunc(_node7);_$parent7.children.push(_node7);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.childHash = 2022289853;_node9.attrSize = 1;_node9.attrHash = 3756138145;_node9.attrs["on-tap"] = "goNext(1)";_$temp = _node9;{
						var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "chat-client-app-view-contactList-contactItem", "sid": 7 };_node10.hasChild = false;_node10.child = null;_node10.childHash = 1307963153;_node10.attrHash = 0;_$temp = _node10;{
							var _$parent11 = _$temp;var _node11 = {}; //jpair pre

							{
								var _jvalue3 = "";
								_jvalue3 = "群聊";
								//jpair suf

								_node11["text"] = _jvalue3;
							}
							//jpair pre

							{
								var _jvalue4 = "";
								_jvalue4 = "../../res/images/groups.png";
								//jpair suf

								_node11["img"] = _jvalue4;
							}
							_addJson(_node11, _$parent11);
						}_$parent10.children.push(_node10);
					}_$parent9.children.push(_node9);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 820218179;_node12.attrs["w-class"] = "friendPart";_$temp = _node12;{
					var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 9 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 337749441;_node13.attrs["on-tap"] = "goNext(2)";_$temp = _node13;{
						var _$parent14 = _$temp;var _node14 = { "attrs": {}, "tagName": "chat-client-app-view-contactList-contactItem", "sid": 10 };_node14.hasChild = false;_node14.child = null;_node14.attrHash = 0;_$temp = _node14;{
							var _$parent15 = _$temp;var _node15 = {}; //jpair pre

							_node15["id"] = it.sid;
							//jpair suf
							//jpair pre

							{
								var _jvalue5 = "";
								_jvalue5 = "user";
								//jpair suf

								_node15["chatType"] = _jvalue5;
							}
							_addJson(_node15, _$parent15);
						}_chFunc(_node14);_$parent14.children.push(_node14);
					}_chFunc(_node13);_$parent13.children.push(_node13);
				}{
					var _$i = 0;
					for (var _iterator = it1.friends, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
						var i = _$i++;if (it1.blackList.indexOf(v) < 0) {
							_$temp = _node12;{
								var _$parent16 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 11 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 3057177939;{
									var attrvalue = "";attrvalue += "goNext(3,";attrvalue += v;attrvalue += ")";_node16.attrs["on-tap"] = attrvalue;
								}_node16.attrHash = _hash.nextHash(_node16.attrHash, _calTextHash(_node16.attrs["on-tap"]));_$temp = _node16;{
									var _$parent17 = _$temp;var _node17 = { "attrs": {}, "tagName": "chat-client-app-view-contactList-contactItem", "sid": 12 };_node17.hasChild = false;_node17.child = null;_node17.attrHash = 0;_$temp = _node17;{
										var _$parent18 = _$temp;var _node18 = {}; //jpair pre

										_node18["id"] = v;
										//jpair suf
										//jpair pre

										{
											var _jvalue6 = "";
											_jvalue6 = "user";
											//jpair suf

											_node18["chatType"] = _jvalue6;
										}
										_addJson(_node18, _$parent18);
									}_chFunc(_node17);_$parent17.children.push(_node17);
								}_chFunc(_node16);_$parent16.children.push(_node16);
							}
						}
					}
				}_chFunc(_node12);_$parent12.children.push(_node12);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});