(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1542886283;_node.attrs["class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.childHash = 890789211;_node2.attrSize = 1;_node2.attrHash = 49715079;_node2.attrs["ev-back-click"] = "goBack";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.childHash = 1002187332;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					{
						var jvalue = "";
						jvalue = "群管理";
						//jpair suf

						_node4["title"] = jvalue;
					}
					_addJson(_node4, _$parent4);
				}_$parent3.children.push(_node3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 271600365;_node5.attrs["w-class"] = "group-manage-wrap";_node5.attrs["ev-openManageItem"] = "openManageItem";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "chat-client-app-widget-manageItem-manageItem", "sid": 4 };_node6.hasChild = false;_node6.child = null;_node6.attrHash = 0;_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = {}; //jpair pre

					_node7["manageList"] = it.manageList;
					//jpair suf
					_addJson(_node7, _$parent7);
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_$temp = _node;{
			var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.childHash = 1418285227;_node8.attrSize = 2;_node8.attrHash = 1232287632;_node8.attrs["w-class"] = "destroy";_node8.attrs["on-tap"] = "destroyGroup";_$temp = _node8;{
				var _$parent9 = _$temp;var _node9 = _installText("解散群", 3918128403);;
				_$parent9.children.push(_node9);
			}_$parent8.children.push(_node8);
		}_chFunc(_node);return _node;
	}
});