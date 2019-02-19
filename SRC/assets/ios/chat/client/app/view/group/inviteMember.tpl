(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1542886283;_node.attrs["class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.childHash = 1581056338;_node2.attrSize = 2;_node2.attrHash = 3937658585;_node2.attrs["ev-back-click"] = "goBack";_node2.attrs["ev-next-click"] = "completeAddGroupMember";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.childHash = 387366916;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					{
						var jvalue = "";
						jvalue = "邀请成员";
						//jpair suf

						_node4["title"] = jvalue;
					}
					//jpair pre

					{
						var _jvalue = "";
						_jvalue = "complete_blue.png";
						//jpair suf

						_node4["nextImg"] = _jvalue;
					}
					_addJson(_node4, _$parent4);
				}_$parent3.children.push(_node3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.childHash = 920890775;_node5.attrSize = 1;_node5.attrHash = 2228001473;_node5.attrs["w-class"] = "search-input";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "chat-client-app-widget-input-input", "sid": 4 };_node6.hasChild = false;_node6.child = null;_node6.childHash = 1052727190;_node6.attrHash = 0;_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = {}; //jpair pre

					{
						var _jvalue2 = "";
						_jvalue2 = "搜索成员";
						//jpair suf

						_node7["placeHolder"] = _jvalue2;
					}
					//jpair pre

					{
						var _jvalue3 = "";
						_jvalue3 = "font-size:32px;color:#ccc;padding-left:82px;";
						//jpair suf

						_node7["style"] = _jvalue3;
					}
					_addJson(_node7, _$parent7);
				}_$parent6.children.push(_node6);
			}_$temp = _node5;{
				var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 5 };_node8.children = [];_node8.childHash = 0;_node8.attrSize = 2;_node8.attrHash = 2939545999;_node8.attrs["w-class"] = "searchIcon";_node8.attrs["src"] = "../../res/images/search-gray.png";_$parent8.children.push(_node8);
			}_$parent5.children.push(_node5);
		}_$temp = _node;{
			var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 2;_node9.attrHash = 1667031585;_node9.attrs["w-class"] = "a-part";_node9.attrs["ev-changeSelect"] = "changeSelect";_$temp = _node9;{
				var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.childHash = 1031877520;_node10.attrSize = 1;_node10.attrHash = 3382618739;_node10.attrs["w-class"] = "a";_$temp = _node10;{
					var _$parent11 = _$temp;var _node11 = _installText("a", 3769940716);;
					_$parent11.children.push(_node11);
				}_$parent10.children.push(_node10);
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

					var item = _ref;
					var index = _$i++;_$temp = _node9;{
						var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 898279137;_node12.attrs["ev-addMember"] = "addGroupMember";_$temp = _node12;{
							var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "chat-client-app-widget-selectUser-selectUser", "sid": 9 };_node13.hasChild = false;_node13.child = null;_node13.attrHash = 0;_$temp = _node13;{
								var _$parent14 = _$temp;var _node14 = {}; //jpair pre

								_node14["id"] = item;
								//jpair suf
								//jpair pre

								{
									var _jvalue4 = "";
									_jvalue4 = "user";
									//jpair suf

									_node14["chatType"] = _jvalue4;
								}
								_addJson(_node14, _$parent14);
							}_chFunc(_node13);_$parent13.children.push(_node13);
						}_chFunc(_node12);_$parent12.children.push(_node12);
					}
				}
			}_chFunc(_node9);_$parent9.children.push(_node9);
		}_chFunc(_node);return _node;
	}
});