(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 138104688;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 3;_node2.attrHash = 2466546657;_node2.attrs["ev-back-click"] = "goBack";_node2.attrs["ev-next-click"] = "completeEdit";_node2.attrs["w-class"] = "topBar";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["title"] = it.title;
					//jpair suf
					//jpair pre

					{
						var jvalue = "";
						jvalue = "complete_blue.png";
						//jpair suf

						_node4["nextImg"] = jvalue;
					}
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}if (it.needTitle) {
			_$temp = _node;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.childHash = 2373311638;_node5.attrSize = 2;_node5.attrHash = 2822741361;_node5.attrs["ev-input-change"] = "inputChange";_node5.attrs["w-class"] = "title-wrap";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "widget", "sid": 4 };_node6.hasChild = false;_node6.child = null;_node6.childHash = 3438818884;_node6.attrHash = 3690458308;_node6.attrs["w-tag"] = "chat-client-app-widget-input-input";_node6.tagName = _node6.attrs["w-tag"];_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = {}; //jpair pre

						{
							var _jvalue = "";
							_jvalue = "标题（必填）1-40字";
							//jpair suf

							_node7["placeHolder"] = _jvalue;
						}
						//jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "border-radius: 12px;";
							//jpair suf

							_node7["style"] = _jvalue2;
						}
						_addJson(_node7, _$parent7);
					}_$parent6.children.push(_node6);
				}_$parent5.children.push(_node5);
			}
		}_$temp = _node;{
			var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.attrSize = 3;_node8.attrHash = 1858502751;_node8.attrs["ev-input-change"] = "textAreaChange";_node8.attrs["w-class"] = "content-wrap";_node8.attrs["on-tap"] = "focusContent";_$temp = _node8;{
				var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "widget", "sid": 6 };_node9.hasChild = false;_node9.child = null;_node9.attrHash = 3398297713;_node9.attrs["w-tag"] = "chat-client-app-widget-input-textarea";_node9.tagName = _node9.attrs["w-tag"];_$temp = _node9;{
					var _$parent10 = _$temp;var _node10 = {}; //jpair pre

					_node10["placeHolder"] = it.placeholder;
					//jpair suf
					//jpair pre

					{
						var _jvalue3 = "";
						_jvalue3 = "max-height:600px;height:auto;";
						//jpair suf

						_node10["style"] = _jvalue3;
					}
					//jpair pre

					_node10["input"] = it.contentInput;
					//jpair suf
					_addJson(_node10, _$parent10);
				}_chFunc(_node9);_$parent9.children.push(_node9);
			}_chFunc(_node8);_$parent8.children.push(_node8);
		}_chFunc(_node);return _node;
	}
});