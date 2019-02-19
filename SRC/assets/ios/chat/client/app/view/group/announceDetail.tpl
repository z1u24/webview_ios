(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 2436735543;_node.attrs["class"] = "new-page";_node.attrs["ev-back-click"] = "goBack";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 386382122;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				{
					var jvalue = "";
					jvalue = "群公告";
					//jpair suf

					_node3["title"] = jvalue;
				}
				_addJson(_node3, _$parent3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 1727084914;_node4.attrs["w-class"] = "title-wrap";if (!it.aIncId) {
				_$temp = _node4;{
					var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "span", "sid": 3 };_node5.children = [];_node5.childHash = 433351092;_node5.attrSize = 1;_node5.attrHash = 3720948540;_node5.attrs["w-class"] = "topping";_$temp = _node5;{
						var _$parent6 = _$temp;var _node6 = _installText("置顶", 2643244958);;
						_$parent6.children.push(_node6);
					}_$parent5.children.push(_node5);
				}
			}_$temp = _node4;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "span", "sid": 4 };_node7.children = [];_node7.attrHash = 0;_$temp = _node7;{
					var _$parent8 = _$temp;_addText(it.title, _$parent8);
				}_chFunc(_node7);_$parent7.children.push(_node7);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_$temp = _node;{
			var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 2255799052;_node8.attrs["w-class"] = "content-wrap";_$temp = _node8;{
				var _$parent10 = _$temp;_addText(it.content, _$parent10);
			}_chFunc(_node8);_$parent9.children.push(_node8);
		}if (it.aIncId) {
			_$temp = _node;{
				var _$parent11 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.childHash = 1969532354;_node9.attrSize = 2;_node9.attrHash = 1352489422;_node9.attrs["w-class"] = "delete";_node9.attrs["on-tap"] = "deleteAnnounce";_$temp = _node9;{
					var _$parent12 = _$temp;var _node10 = _installText("删除", 715148869);;
					_$parent12.children.push(_node10);
				}_$parent11.children.push(_node9);
			}
		}_chFunc(_node);return _node;
	}
});