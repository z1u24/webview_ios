(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 246111272;_node.attrs["style"] = "background:#fff;";_node.attrs["class"] = "new-page";_node.attrs["ev-back-click"] = "goChat";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 1705561244;_node2.attrSize = 1;_node2.attrHash = 1019047777;_node2.attrs["w-class"] = "title";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				{
					var jvalue = "";
					jvalue = "注册";
					//jpair suf

					_node3["title"] = jvalue;
				}
				_addJson(_node3, _$parent3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.childHash = 3741375676;_node4.attrSize = 1;_node4.attrHash = 1679499277;_node4.attrs["w-class"] = "success-status-wrap";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 3 };_node5.children = [];_node5.childHash = 0;_node5.attrSize = 2;_node5.attrHash = 2433013970;_node5.attrs["src"] = "../../res/images/icon_right2.png";_node5.attrs["w-class"] = "successIcon";_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "span", "sid": 4 };_node6.children = [];_node6.childHash = 394025667;_node6.attrSize = 1;_node6.attrHash = 3884464489;_node6.attrs["w-class"] = "successText";_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = _installText("注册成功", 3902982980);;
					_$parent7.children.push(_node7);
				}_$parent6.children.push(_node6);
			}_$parent4.children.push(_node4);
		}_$temp = _node;{
			var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 2038881090;_node8.attrs["w-class"] = "id-wrap";_$temp = _node8;{
				var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "span", "sid": 6 };_node9.children = [];_node9.childHash = 2255975804;_node9.attrSize = 1;_node9.attrHash = 3749158876;_node9.attrs["w-class"] = "other-text";_$temp = _node9;{
					var _$parent10 = _$temp;var _node10 = _installText("您可以通过ID登录", 2554744281);;
					_$parent10.children.push(_node10);
				}_$parent9.children.push(_node9);
			}_$temp = _node8;{
				var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "span", "sid": 7 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 1554700297;_node11.attrs["w-class"] = "id";_$temp = _node11;{
					var _$parent12 = _$temp;_addText(it.uid, _$parent12);
				}_chFunc(_node11);_$parent11.children.push(_node11);
			}_chFunc(_node8);_$parent8.children.push(_node8);
		}_$temp = _node;{
			var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.childHash = 573739457;_node12.attrSize = 2;_node12.attrHash = 3693244977;_node12.attrs["w-class"] = "goChat";_node12.attrs["on-tap"] = "goChat";_$temp = _node12;{
				var _$parent14 = _$temp;var _node13 = _installText("去聊天", 3749371243);;
				_$parent14.children.push(_node13);
			}_$parent13.children.push(_node12);
		}_chFunc(_node);return _node;
	}
});