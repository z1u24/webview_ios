(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1542886283;_node.attrs["class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.childHash = 1616071569;_node2.attrSize = 1;_node2.attrHash = 49715079;_node2.attrs["ev-back-click"] = "goBack";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.childHash = 3359966664;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					{
						var jvalue = "";
						jvalue = "群成员";
						//jpair suf

						_node4["title"] = jvalue;
					}
					_addJson(_node4, _$parent4);
				}_$parent3.children.push(_node3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.childHash = 920890775;_node5.attrSize = 2;_node5.attrHash = 234448543;_node5.attrs["w-class"] = "search-input";_node5.attrs["ev-input-change"] = "inputMember";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "chat-client-app-widget-input-input", "sid": 4 };_node6.hasChild = false;_node6.child = null;_node6.childHash = 1052727190;_node6.attrHash = 0;_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = {}; //jpair pre

					{
						var _jvalue = "";
						_jvalue = "搜索成员";
						//jpair suf

						_node7["placeHolder"] = _jvalue;
					}
					//jpair pre

					{
						var _jvalue2 = "";
						_jvalue2 = "font-size:32px;color:#ccc;padding-left:82px;";
						//jpair suf

						_node7["style"] = _jvalue2;
					}
					_addJson(_node7, _$parent7);
				}_$parent6.children.push(_node6);
			}_$temp = _node5;{
				var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 5 };_node8.children = [];_node8.childHash = 0;_node8.attrSize = 2;_node8.attrHash = 2939545999;_node8.attrs["w-class"] = "searchIcon";_node8.attrs["src"] = "../../res/images/search-gray.png";_$parent8.children.push(_node8);
			}_$parent5.children.push(_node5);
		}_$temp = _node;{
			var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 2858042520;_node9.attrs["w-class"] = "member-wrap";_$temp = _node9;{
				var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "widget", "sid": 7 };_node10.hasChild = false;_node10.child = null;_node10.childHash = 2884330847;_node10.attrSize = 1;_node10.attrHash = 2417660691;_node10.attrs["w-tag"] = "chat-client-app-widget-memberItem-memberItem";_node10.tagName = _node10.attrs["w-tag"];_node10.attrs["on-tap"] = "inviteMember";_$temp = _node10;{
					var _$parent11 = _$temp;var _node11 = {}; //jpair pre

					{
						var _jvalue3 = "";
						_jvalue3 = "../../res/images/add_group_user.png";
						//jpair suf

						_node11["avatorPath"] = _jvalue3;
					}
					//jpair pre

					{
						var _jvalue4 = "";
						_jvalue4 = "添加成员";
						//jpair suf

						_node11["text"] = _jvalue4;
					}
					//jpair pre

					_node11["isOperation"] = true;
					//jpair suf
					_addJson(_node11, _$parent11);
				}_$parent10.children.push(_node10);
			}if (it.isAdmin) {
				_$temp = _node9;{
					var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "widget", "sid": 8 };_node12.hasChild = false;_node12.child = null;_node12.childHash = 324588143;_node12.attrSize = 1;_node12.attrHash = 1930729774;_node12.attrs["w-tag"] = "chat-client-app-widget-memberItem-memberItem";_node12.tagName = _node12.attrs["w-tag"];_node12.attrs["on-tap"] = "deleteMember";_$temp = _node12;{
						var _$parent13 = _$temp;var _node13 = {}; //jpair pre

						{
							var _jvalue5 = "";
							_jvalue5 = "../../res/images/del_group_user.png";
							//jpair suf

							_node13["avatorPath"] = _jvalue5;
						}
						//jpair pre

						{
							var _jvalue6 = "";
							_jvalue6 = "移除成员";
							//jpair suf

							_node13["text"] = _jvalue6;
						}
						//jpair pre

						_node13["isOperation"] = true;
						//jpair suf
						_addJson(_node13, _$parent13);
					}_$parent12.children.push(_node12);
				}
			}_$temp = _node9;{
				var _$parent14 = _$temp;var _node14 = { "attrs": {}, "tagName": "widget", "sid": 9 };_node14.hasChild = false;_node14.child = null;_node14.attrHash = 1866388850;_node14.attrs["w-tag"] = "chat-client-app-widget-memberItem-memberItem";_node14.tagName = _node14.attrs["w-tag"];_$temp = _node14;{
					var _$parent15 = _$temp;var _node15 = {}; //jpair pre

					_node15["id"] = it.groupInfo.ownerid;
					//jpair suf
					//jpair pre

					_node15["gid"] = it.gid;
					//jpair suf
					//jpair pre

					{
						var _jvalue7 = "";
						_jvalue7 = "../../res/images/user.png";
						//jpair suf

						_node15["avatorPath"] = _jvalue7;
					}
					//jpair pre

					_node15["isOwner"] = true;
					//jpair suf
					_addJson(_node15, _$parent15);
				}_chFunc(_node14);_$parent14.children.push(_node14);
			}{
				var _$i = 0;
				for (var _iterator = it.groupInfo.adminids, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
					var index = _$i++;if (item !== it.groupInfo.ownerid) {
						_$temp = _node9;{
							var _$parent16 = _$temp;var _node16 = { "attrs": {}, "tagName": "widget", "sid": 10 };_node16.hasChild = false;_node16.child = null;_node16.attrHash = 1866388850;_node16.attrs["w-tag"] = "chat-client-app-widget-memberItem-memberItem";_node16.tagName = _node16.attrs["w-tag"];_$temp = _node16;{
								var _$parent17 = _$temp;var _node17 = {}; //jpair pre

								_node17["id"] = item;
								//jpair suf
								//jpair pre

								_node17["gid"] = it.gid;
								//jpair suf
								//jpair pre

								{
									var _jvalue8 = "";
									_jvalue8 = "../../res/images/user.png";
									//jpair suf

									_node17["avatorPath"] = _jvalue8;
								}
								//jpair pre

								_node17["isAdmin"] = true;
								//jpair suf
								_addJson(_node17, _$parent17);
							}_chFunc(_node16);_$parent16.children.push(_node16);
						}
					}
				}
			}{
				var _$i2 = 0;
				for (var _iterator2 = it.groupInfo.memberids, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
					var _ref2;

					if (_isArray2) {
						if (_i2 >= _iterator2.length) break;
						_ref2 = _iterator2[_i2++];
					} else {
						_i2 = _iterator2.next();
						if (_i2.done) break;
						_ref2 = _i2.value;
					}

					var _item = _ref2;
					var _index = _$i2++;if (_item !== it.groupInfo.ownerid && it.groupInfo.adminids.indexOf(_item) === -1) {
						_$temp = _node9;{
							var _$parent18 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 11 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 2311766789;_node18.attrs["style"] = "position:relative;";_$temp = _node18;{
								var _$parent19 = _$temp;var _node19 = { "attrs": {}, "tagName": "widget", "sid": 12 };_node19.hasChild = false;_node19.child = null;_node19.attrHash = 1866388850;_node19.attrs["w-tag"] = "chat-client-app-widget-memberItem-memberItem";_node19.tagName = _node19.attrs["w-tag"];_$temp = _node19;{
									var _$parent20 = _$temp;var _node20 = {}; //jpair pre

									_node20["id"] = _item;
									//jpair suf
									//jpair pre

									_node20["gid"] = it.gid;
									//jpair suf
									//jpair pre

									{
										var _jvalue9 = "";
										_jvalue9 = "../../res/images/user.png";
										//jpair suf

										_node20["avatorPath"] = _jvalue9;
									}
									_addJson(_node20, _$parent20);
								}_chFunc(_node19);_$parent19.children.push(_node19);
							}if (it.deleteBtn) {
								_$temp = _node18;{
									var _$parent21 = _$temp;var _node21 = { "attrs": {}, "tagName": "img", "sid": 13 };_node21.children = [];_node21.attrSize = 3;_node21.attrHash = 3615315347;{
										var attrvalue = "";attrvalue += "removeMember(";attrvalue += _item;attrvalue += ")";_node21.attrs["on-tap"] = attrvalue;
									}_node21.attrHash = _hash.nextHash(_node21.attrHash, _calTextHash(_node21.attrs["on-tap"]));_node21.attrs["src"] = "../../res/images/fail.png";_node21.attrs["style"] = "position:absolute;top:16px;left:20px;";_chFunc(_node21);_$parent21.children.push(_node21);
								}
							}_chFunc(_node18);_$parent18.children.push(_node18);
						}
					}
				}
			}_chFunc(_node9);_$parent9.children.push(_node9);
		}_chFunc(_node);return _node;
	}
});