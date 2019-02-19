(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;var admins = it.ginfo.adminids;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1542886283;_node.attrs["class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.childHash = 2248711028;_node2.attrSize = 1;_node2.attrHash = 49715079;_node2.attrs["ev-back-click"] = "goBack";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.childHash = 1612237445;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					{
						var jvalue = "";
						jvalue = "设置管理员";
						//jpair suf

						_node4["title"] = jvalue;
					}
					_addJson(_node4, _$parent4);
				}_$parent3.children.push(_node3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 1667031585;_node5.attrs["w-class"] = "a-part";_node5.attrs["ev-changeSelect"] = "changeSelect";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 3382618739;_node6.attrs["w-class"] = "a";_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = _installText("管理员", 3822153804);;
					_$parent7.children.push(_node7);
				}_$temp = _node6;{
					var _$parent8 = _$temp;_addText(admins.length, _$parent8);
				}_$temp = _node6;{
					var _$parent9 = _$temp;var _node8 = _installText("/5", 2138396263);;
					_$parent9.children.push(_node8);
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}{
				var _$i = 0;
				for (var _iterator = admins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
					var index = _$i++;_$temp = _node5;{
						var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 5 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 2311766789;_node9.attrs["style"] = "position:relative;";_$temp = _node9;{
							var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "chat-client-app-view-contactList-contactItem", "sid": 6 };_node10.hasChild = false;_node10.child = null;_node10.attrHash = 0;_$temp = _node10;{
								var _$parent12 = _$temp;var _node11 = {}; //jpair pre

								_node11["id"] = item;
								//jpair suf
								//jpair pre

								{
									var _jvalue = "";
									_jvalue = "user";
									//jpair suf

									_node11["chatType"] = _jvalue;
								}
								//jpair pre

								{
									var _jvalue2 = "";
									_jvalue2 = "../../res/images/user.png";
									//jpair suf

									_node11["img"] = _jvalue2;
								}
								_addJson(_node11, _$parent12);
							}_chFunc(_node10);_$parent11.children.push(_node10);
						}if (item !== it.ginfo.ownerid) {
							_$temp = _node9;{
								var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "img", "sid": 7 };_node12.children = [];_node12.attrSize = 3;_node12.attrHash = 3536273206;{
									var attrvalue = "";attrvalue += "removeAdmin(";attrvalue += item;attrvalue += ")";_node12.attrs["on-tap"] = attrvalue;
								}_node12.attrHash = _hash.nextHash(_node12.attrHash, _calTextHash(_node12.attrs["on-tap"]));_node12.attrs["src"] = "../../res/images/icon_remove.png";_node12.attrs["style"] = "position:absolute;right:36px;top:36px;";_chFunc(_node12);_$parent13.children.push(_node12);
							}
						} else {
							_$temp = _node9;{
								var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "span", "sid": 8 };_node13.children = [];_node13.childHash = 1749385674;_node13.attrSize = 1;_node13.attrHash = 4257211438;_node13.attrs["w-class"] = "mainPerson";_$temp = _node13;{
									var _$parent15 = _$temp;var _node14 = _installText("群主", 2538104408);;
									_$parent15.children.push(_node14);
								}_$parent14.children.push(_node13);
							}
						}_chFunc(_node9);_$parent10.children.push(_node9);
					}
				}
			}_$temp = _node5;{
				var _$parent16 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 9 };_node15.children = [];_node15.childHash = 3037130411;_node15.attrSize = 2;_node15.attrHash = 3672586903;_node15.attrs["style"] = "height:120px;";_node15.attrs["on-tap"] = "openAddAdmin";_$temp = _node15;{
					var _$parent17 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 10 };_node16.children = [];_node16.childHash = 2993419586;_node16.attrSize = 1;_node16.attrHash = 1530858778;_node16.attrs["w-class"] = "contact-wrap";_$temp = _node16;{
						var _$parent18 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 11 };_node17.children = [];_node17.childHash = 1768846468;_node17.attrSize = 1;_node17.attrHash = 4275137225;_node17.attrs["w-class"] = "avatar-wrap";_$temp = _node17;{
							var _$parent19 = _$temp;var _node18 = { "attrs": {}, "tagName": "img", "sid": 12 };_node18.children = [];_node18.childHash = 0;_node18.attrSize = 2;_node18.attrHash = 1261159337;_node18.attrs["w-class"] = "avatar";_node18.attrs["src"] = "../../res/images/add_group_user.png";_$parent19.children.push(_node18);
						}_$parent18.children.push(_node17);
					}_$temp = _node16;{
						var _$parent20 = _$temp;var _node19 = { "attrs": {}, "tagName": "span", "sid": 13 };_node19.children = [];_node19.childHash = 156723486;_node19.attrSize = 1;_node19.attrHash = 2710496119;_node19.attrs["w-class"] = "text";_$temp = _node19;{
							var _$parent21 = _$temp;var _node20 = _installText("添加管理员", 1343864817);;
							_$parent21.children.push(_node20);
						}_$parent20.children.push(_node19);
					}_$parent17.children.push(_node16);
				}_$parent16.children.push(_node15);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});