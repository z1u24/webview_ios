(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 3178753369;_node.attrs["w-class"] = "name-box";_node.attrs["ev-input-change"] = "nameChange";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "widget", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrSize = 1;_node2.attrHash = 1987105200;_node2.attrs["w-tag"] = "chat-client-app-widget-input-input";_node2.tagName = _node2.attrs["w-tag"];_node2.attrs["style"] = "flex: 1;";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["input"] = it1.name;
				//jpair suf
				//jpair pre

				_node3["maxLength"] = 10;
				//jpair suf
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "img", "sid": 2 };_node4.children = [];_node4.childHash = 0;_node4.attrSize = 3;_node4.attrHash = 1828333974;_node4.attrs["w-class"] = "random";_node4.attrs["src"] = "../../res/images/random.png";_node4.attrs["on-tap"] = "randomPlayName";_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});