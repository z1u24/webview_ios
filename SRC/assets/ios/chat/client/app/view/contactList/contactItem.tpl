(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrHash = 0;if (it.show) {
			_$temp = _node;{
				var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 1530858778;_node2.attrs["w-class"] = "contact-wrap";_$temp = _node2;{
					var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 4275137225;_node3.attrs["w-class"] = "avatar-wrap";_$temp = _node3;{
						var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "widget", "sid": 3 };_node4.hasChild = false;_node4.child = null;_node4.attrSize = 1;_node4.attrHash = 1941416123;_node4.attrs["w-tag"] = "chat-client-app-widget-imgShow-imgShow";_node4.tagName = _node4.attrs["w-tag"];_node4.attrs["w-class"] = "avatar";_$temp = _node4;{
							var _$parent5 = _$temp;var _node5 = {}; //jpair pre

							_node5["imgURL"] = it.img;
							//jpair suf
							//jpair pre

							{
								var jvalue = "";
								jvalue = "80px;";
								//jpair suf

								_node5["width"] = jvalue;
							}
							_addJson(_node5, _$parent5);
						}_chFunc(_node4);_$parent4.children.push(_node4);
					}_chFunc(_node3);_$parent3.children.push(_node3);
				}_$temp = _node2;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "span", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 2710496119;_node6.attrs["w-class"] = "text";_$temp = _node6;{
						var _$parent7 = _$temp;_addText(it.text ? it.text : it.name, _$parent7);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}if (it.totalNew > 0) {
					_$temp = _node2;{
						var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 2405874756;_node7.attrs["w-class"] = "other";_$temp = _node7;{
							var _$parent9 = _$temp;_addText(it.totalNew, _$parent9);
						}_chFunc(_node7);_$parent8.children.push(_node7);
					}
				}_chFunc(_node2);_$parent2.children.push(_node2);
			}
		}_chFunc(_node);return _node;
	}
});