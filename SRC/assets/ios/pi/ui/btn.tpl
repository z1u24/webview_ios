(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;it = it || { "cfg": { "clazz": "", "text": "1" } };_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrHash = 0;_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 2857356896;{
				var attrvalue = "";attrvalue = it.cfg.clazz;_node2.attrs["w-class"] = attrvalue;
			}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["w-class"]));_node2.attrs["on-tap"] = "tap";if (it.cfg.text) {
				_$temp = _node2;{
					var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "imgtext$", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
						var _$parent4 = _$temp;var _node4 = {}; //jpair pre

						_$temp = _node4;{
							var _$parent5 = _$temp;_$temp = _node4;{
								var _$parent6 = _$temp;var _node5 = {}; //jpair pre

								_node5["text"] = it.cfg.text;
								//jpair suf
								//jpair pre

								{
									var jvalue = "";
									jvalue = "20px 宋体";
									//jpair suf

									_node5["font"] = jvalue;
								}
								//jpair pre

								{
									var _jvalue = "";
									_jvalue = "#636363";
									//jpair suf

									_node5["color"] = _jvalue;
								}
								_$parent6["textCfg"] = _node5;
							}
							//jpair suf
						}_addJson(_node4, _$parent4);
					}_chFunc(_node3);_$parent3.children.push(_node3);
				}
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_chFunc(_node);return _node;
	}
});