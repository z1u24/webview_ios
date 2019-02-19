(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;it1 = it1 || { "group": [] };_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 4;_node.attrHash = 2907307334;_node.attrs["class"] = "new-page";_node.attrs["ev-next-click"] = "groupChat";_node.attrs["ev-back-click"] = "goBack";_node.attrs["w-class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 2567545070;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				{
					var jvalue = "";
					jvalue = "群聊";
					//jpair suf

					_node3["title"] = jvalue;
				}
				//jpair pre

				{
					var _jvalue = "";
					_jvalue = "add-blue.png";
					//jpair suf

					_node3["nextImg"] = _jvalue;
				}
				_addJson(_node3, _$parent3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 487306359;_node4.attrs["w-class"] = "content";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.childHash = 3493638312;_node5.attrSize = 2;_node5.attrHash = 4240169570;_node5.attrs["w-class"] = "search-input";_node5.attrs["ev-input-change"] = "inputGid";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "chat-client-app-widget-input-input", "sid": 4 };_node6.hasChild = false;_node6.child = null;_node6.childHash = 4203664241;_node6.attrHash = 0;_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = {}; //jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "搜索群聊";
							//jpair suf

							_node7["placeHolder"] = _jvalue2;
						}
						//jpair pre

						{
							var _jvalue3 = "";
							_jvalue3 = "font-size:32px;padding-left:82px;border-radius: 12px;";
							//jpair suf

							_node7["style"] = _jvalue3;
						}
						_addJson(_node7, _$parent7);
					}_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 5 };_node8.children = [];_node8.childHash = 0;_node8.attrSize = 2;_node8.attrHash = 2939545999;_node8.attrs["w-class"] = "searchIcon";_node8.attrs["src"] = "../../res/images/search-gray.png";_$parent8.children.push(_node8);
				}_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.childHash = 3214697363;_node9.attrSize = 2;_node9.attrHash = 2308861274;_node9.attrs["on-tap"] = "applyGroup(e)";_node9.attrs["w-class"] = "applyBtn";_$temp = _node9;{
					var _$parent10 = _$temp;var _node10 = _installText("添加群聊", 3070898489);;
					_$parent10.children.push(_node10);
				}_$parent9.children.push(_node9);
			}if (it1.group.length > 0) {
				_$temp = _node4;{
					var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 7 };_node11.children = [];_node11.attrSize = 2;_node11.attrHash = 1498623781;_node11.attrs["w-class"] = "groupPart";_node11.attrs["ev-changeSelect"] = "changeSelect";_$temp = _node11;{
						var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.childHash = 2200882037;_node12.attrSize = 1;_node12.attrHash = 3382618739;_node12.attrs["w-class"] = "a";_$temp = _node12;{
							var _$parent13 = _$temp;var _node13 = _installText("群聊", 1810046151);;
							_$parent13.children.push(_node13);
						}_$parent12.children.push(_node12);
					}{
						var _$i = 0;
						for (var _iterator = it1.group, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
							var index = _$i++;_$temp = _node11;{
								var _$parent14 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 9 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 31093567;{
									var attrvalue = "";attrvalue += "showInfo(";attrvalue += item;attrvalue += ")";_node14.attrs["on-tap"] = attrvalue;
								}_node14.attrHash = _hash.nextHash(_node14.attrHash, _calTextHash(_node14.attrs["on-tap"]));_$temp = _node14;{
									var _$parent15 = _$temp;var _node15 = { "attrs": {}, "tagName": "chat-client-app-view-contactList-contactItem", "sid": 10 };_node15.hasChild = false;_node15.child = null;_node15.attrHash = 0;_$temp = _node15;{
										var _$parent16 = _$temp;var _node16 = {}; //jpair pre

										_node16["id"] = item;
										//jpair suf
										//jpair pre

										{
											var _jvalue4 = "";
											_jvalue4 = "group";
											//jpair suf

											_node16["chatType"] = _jvalue4;
										}
										_addJson(_node16, _$parent16);
									}_chFunc(_node15);_$parent15.children.push(_node15);
								}_chFunc(_node14);_$parent14.children.push(_node14);
							}
						}
					}_chFunc(_node11);_$parent11.children.push(_node11);
				}
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});