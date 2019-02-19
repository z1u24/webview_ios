(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "ul", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 4197693607;_node.attrs["w-class"] = "group-set-ul";{
			var _$i = 0;
			for (var _iterator = it.groupSetList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
				var index = _$i++;_$temp = _node;{
					var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "li", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 2153160709;_node2.attrs["w-class"] = "groupSet-item-wrap";_$temp = _node2;{
						var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 2047554178;_node3.attrs["w-class"] = "itemText-wrap";_$temp = _node3;{
							var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "span", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 1019047777;_node4.attrs["w-class"] = "title";_$temp = _node4;{
								var _$parent5 = _$temp;_addText(item.title, _$parent5);
							}_chFunc(_node4);_$parent4.children.push(_node4);
						}_$temp = _node3;{
							var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "span", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 487306359;_node5.attrs["w-class"] = "content";_$temp = _node5;{
								var _$parent7 = _$temp;_addText(item.content, _$parent7);
							}_chFunc(_node5);_$parent6.children.push(_node5);
						}_chFunc(_node3);_$parent3.children.push(_node3);
					}_$temp = _node2;{
						var _$parent8 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 5 };_node6.children = [];_node6.childHash = 2402333919;_node6.attrSize = 1;_node6.attrHash = 1963355171;_node6.attrs["w-class"] = "switch";_$temp = _node6;{
							var _$parent9 = _$temp;var _node7 = { "attrs": {}, "tagName": "chat-client-app-widget-switch-switch", "sid": 6 };_node7.hasChild = false;_node7.child = null;_node7.childHash = 614148101;_node7.attrHash = 0;_$temp = _node7;{
								var _$parent10 = _$temp;var _node8 = {}; //jpair pre

								_node8["types"] = true;
								//jpair suf
								//jpair pre

								{
									var jvalue = "";
									jvalue = "linear-gradient(to right,#318DE6,#38CFE7)";
									//jpair suf

									_node8["activeColor"] = jvalue;
								}
								//jpair pre

								{
									var _jvalue = "";
									_jvalue = "#dddddd";
									//jpair suf

									_node8["inactiveColor"] = _jvalue;
								}
								_addJson(_node8, _$parent10);
							}_$parent9.children.push(_node7);
						}_$parent8.children.push(_node6);
					}_chFunc(_node2);_$parent2.children.push(_node2);
				}
			}
		}_chFunc(_node);return _node;
	}
});