(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1542886283;_node.attrs["class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.childHash = 1347914273;_node2.attrSize = 1;_node2.attrHash = 49715079;_node2.attrs["ev-back-click"] = "goBack";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.childHash = 3338440501;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					{
						var jvalue = "";
						jvalue = "入群申请";
						//jpair suf

						_node4["title"] = jvalue;
					}
					_addJson(_node4, _$parent4);
				}_$parent3.children.push(_node3);
			}_$parent2.children.push(_node2);
		}if (it.groupInfo.applyUser.length > 0) {
			_$temp = _node;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 3230834345;_node5.attrs["w-class"] = "apply-status-wrap";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.childHash = 500229898;_node6.attrSize = 1;_node6.attrHash = 1727084914;_node6.attrs["w-class"] = "title-wrap";_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = _installText("入群申请", 165151539);;
						_$parent7.children.push(_node7);
					}_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 2381994791;_node8.attrs["w-class"] = "detail-wrap";{
						var _$i = 0;
						for (var _iterator = it.groupInfo.applyUser, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
							var i = _$i++;_$temp = _node8;{
								var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 2905459948;_node9.attrs["ev-agree-joinGroup"] = "agreeJoinGroup";_$temp = _node9;{
									var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "chat-client-app-view-contactList-applyUser", "sid": 7 };_node10.hasChild = false;_node10.child = null;_node10.attrHash = 0;_$temp = _node10;{
										var _$parent11 = _$temp;var _node11 = {}; //jpair pre

										_node11["id"] = v;
										//jpair suf
										//jpair pre

										{
											var _jvalue = "";
											_jvalue = "group";
											//jpair suf

											_node11["chatType"] = _jvalue;
										}
										//jpair pre

										_node11["isActiveToGroup"] = true;
										//jpair suf
										//jpair pre

										_node11["activeToGGid"] = it.gid;
										//jpair suf
										_addJson(_node11, _$parent11);
									}_chFunc(_node10);_$parent10.children.push(_node10);
								}_chFunc(_node9);_$parent9.children.push(_node9);
							}
						}
					}_chFunc(_node8);_$parent8.children.push(_node8);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}
		} else {
			_$temp = _node;{
				var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.childHash = 2809980710;_node12.attrSize = 1;_node12.attrHash = 1043604938;_node12.attrs["w-class"] = "noUserApply";_$temp = _node12;{
					var _$parent13 = _$temp;var _node13 = _installText("暂无用户申请进群", 3865472255);;
					_$parent13.children.push(_node13);
				}_$parent12.children.push(_node12);
			}
		}_chFunc(_node);return _node;
	}
});