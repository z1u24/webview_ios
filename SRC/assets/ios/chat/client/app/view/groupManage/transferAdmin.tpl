(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;var membersButnoOwner = it.ginfo.memberids.filter(function (item) {
		return item !== it.ginfo.ownerid;
	});_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1542886283;_node.attrs["class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.childHash = 4075798077;_node2.attrSize = 1;_node2.attrHash = 49715079;_node2.attrs["ev-back-click"] = "goBack";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.childHash = 1086884944;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					{
						var jvalue = "";
						jvalue = "转让群主";
						//jpair suf

						_node4["title"] = jvalue;
					}
					_addJson(_node4, _$parent4);
				}_$parent3.children.push(_node3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 1667031585;_node5.attrs["w-class"] = "a-part";_node5.attrs["ev-changeSelect"] = "changeSelect";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.childHash = 1031877520;_node6.attrSize = 1;_node6.attrHash = 3382618739;_node6.attrs["w-class"] = "a";_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = _installText("a", 3769940716);;
					_$parent7.children.push(_node7);
				}_$parent6.children.push(_node6);
			}_$temp = _node5;{
				var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.attrSize = 2;_node8.attrHash = 2113346344;_node8.attrs["w-class"] = "user-wrap";_node8.attrs["ev-transferAdmin"] = "openConfirmTranBox";{
					var _$i = 0;
					for (var _iterator = membersButnoOwner, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
						var index = _$i++;_$temp = _node8;{
							var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 2594915456;{
								var attrvalue = "";attrvalue += "openConfirmTranBox(";attrvalue += item;attrvalue += ")";_node9.attrs["on-tap"] = attrvalue;
							}_node9.attrHash = _hash.nextHash(_node9.attrHash, _calTextHash(_node9.attrs["on-tap"]));_$temp = _node9;{
								var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "chat-client-app-view-contactList-contactItem", "sid": 7 };_node10.hasChild = false;_node10.child = null;_node10.attrHash = 0;_$temp = _node10;{
									var _$parent11 = _$temp;var _node11 = {}; //jpair pre

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
									_addJson(_node11, _$parent11);
								}_chFunc(_node10);_$parent10.children.push(_node10);
							}_chFunc(_node9);_$parent9.children.push(_node9);
						}
					}
				}_chFunc(_node8);_$parent8.children.push(_node8);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});