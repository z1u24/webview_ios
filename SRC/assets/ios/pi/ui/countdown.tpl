(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "span", "sid": 0 };_node.children = [];_node.attrHash = 0;if (it.cdInfo) {
			var show = it.cdInfo.date + "天 " + it.cdInfo.hour + "时 " + it.cdInfo.minute + "分 " + it.cdInfo.second + "秒 ";_$temp = _node;{
				var _$parent2 = _$temp;_addText(show, _$parent2);
			}_$temp = _node;{
				var _$parent3 = _$temp;var _node2 = { "attrs": {}, "tagName": "imgtext$", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
					var _$parent4 = _$temp;var _node3 = {}; //jpair pre

					_$temp = _node3;{
						var _$parent5 = _$temp;_$temp = _node3;{
							var _$parent6 = _$temp;var _node4 = {}; //jpair pre

							_node4["text"] = show;
							//jpair suf
							//jpair pre

							{
								var jvalue = "";
								jvalue = "20px 宋体";
								//jpair suf

								_node4["font"] = jvalue;
							}
							//jpair pre

							{
								var _jvalue = "";
								_jvalue = "#636363";
								//jpair suf

								_node4["color"] = _jvalue;
							}
							_$parent6["textCfg"] = _node4;
						}
						//jpair suf
					}_addJson(_node3, _$parent4);
				}_chFunc(_node2);_$parent3.children.push(_node2);
			}
		}_chFunc(_node);return _node;
	}
});