(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;it1 = it1 || { "applyUser": [], "applyGroup": [] };_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 2436735543;_node.attrs["class"] = "new-page";_node.attrs["ev-back-click"] = "goBack";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 2015608281;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				{
					var jvalue = "";
					jvalue = "新的朋友";
					//jpair suf

					_node3["title"] = jvalue;
				}
				_addJson(_node3, _$parent3);
			}_$parent2.children.push(_node2);
		}if (it1.applyUser.length > 0 || it1.applyGroup.length > 0) {
			_$temp = _node;{
				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 3230834345;_node4.attrs["w-class"] = "apply-status-wrap";_$temp = _node4;{
					var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.childHash = 1784800329;_node5.attrSize = 1;_node5.attrHash = 1727084914;_node5.attrs["w-class"] = "title-wrap";_$temp = _node5;{
						var _$parent6 = _$temp;var _node6 = _installText("新的朋友", 140799365);;
						_$parent6.children.push(_node6);
					}_$parent5.children.push(_node5);
				}_$temp = _node4;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 4 };_node7.children = [];_node7.attrSize = 2;_node7.attrHash = 1482600746;_node7.attrs["w-class"] = "detail-wrap";_node7.attrs["ev-agree-friend"] = "agreeClick";{
						var _$i = 0;
						for (var _iterator = it1.applyUser, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
							var i = _$i++;_$temp = _node7;{
								var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "chat-client-app-view-contactList-applyUser", "sid": 5 };_node8.hasChild = false;_node8.child = null;_node8.attrHash = 0;_$temp = _node8;{
									var _$parent9 = _$temp;var _node9 = {}; //jpair pre

									_node9["id"] = v;
									//jpair suf
									//jpair pre

									{
										var _jvalue = "";
										_jvalue = "user";
										//jpair suf

										_node9["chatType"] = _jvalue;
									}
									_addJson(_node9, _$parent9);
								}_chFunc(_node8);_$parent8.children.push(_node8);
							}
						}
					}{
						var _$i2 = 0;
						for (var _iterator2 = it1.applyGroup, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
							var _ref2;

							if (_isArray2) {
								if (_i2 >= _iterator2.length) break;
								_ref2 = _iterator2[_i2++];
							} else {
								_i2 = _iterator2.next();
								if (_i2.done) break;
								_ref2 = _i2.value;
							}

							var _v = _ref2;
							var _i3 = _$i2++;_$temp = _node7;{
								var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 6 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 2411286874;_node10.attrs["ev-agree-group"] = "agreeGroupApply";_$temp = _node10;{
									var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "chat-client-app-view-contactList-applyUser", "sid": 7 };_node11.hasChild = false;_node11.child = null;_node11.attrHash = 0;_$temp = _node11;{
										var _$parent12 = _$temp;var _node12 = {}; //jpair pre

										_node12["guid"] = _v;
										//jpair suf
										//jpair pre

										{
											var _jvalue2 = "";
											_jvalue2 = "group";
											//jpair suf

											_node12["chatType"] = _jvalue2;
										}
										//jpair pre

										_node12["isActiveToGroup"] = false;
										//jpair suf
										_addJson(_node12, _$parent12);
									}_chFunc(_node11);_$parent11.children.push(_node11);
								}_chFunc(_node10);_$parent10.children.push(_node10);
							}
						}
					}_chFunc(_node7);_$parent7.children.push(_node7);
				}_chFunc(_node4);_$parent4.children.push(_node4);
			}
		} else {
			_$temp = _node;{
				var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 8 };_node13.children = [];_node13.childHash = 3894424057;_node13.attrSize = 1;_node13.attrHash = 3244922164;_node13.attrs["w-class"] = "noNewFriend";_$temp = _node13;{
					var _$parent14 = _$temp;var _node14 = _installText("暂无新朋友申请", 2689255060);;
					_$parent14.children.push(_node14);
				}_$parent13.children.push(_node13);
			}
		}_chFunc(_node);return _node;
	}
});