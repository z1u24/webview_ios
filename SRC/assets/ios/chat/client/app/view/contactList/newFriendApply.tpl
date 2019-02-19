(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1542886283;_node.attrs["class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 49715079;_node2.attrs["ev-back-click"] = "goBack";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["title"] = it.title;
					//jpair suf
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 3209294957;_node5.attrs["w-class"] = "newfriend-wrap";_node5.attrs["on-tap"] = "goDetail";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "chat-client-app-widget-featureBar-featureBar", "sid": 4 };_node6.hasChild = false;_node6.child = null;_node6.attrHash = 0;_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = {}; //jpair pre

					{
						var jvalue = "";
						jvalue = "user.png";
						//jpair suf

						_node7["iconPath"] = jvalue;
					}
					//jpair pre

					_node7["text"] = it.name;
					//jpair suf
					_addJson(_node7, _$parent7);
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_$temp = _node;{
			var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 2777195866;_node8.attrs["w-class"] = "attach-info-wrap";_$temp = _node8;{
				var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.childHash = 4237331106;_node9.attrSize = 1;_node9.attrHash = 1727084914;_node9.attrs["w-class"] = "title-wrap";_$temp = _node9;{
					var _$parent10 = _$temp;var _node10 = _installText("附加信息", 2170093189);;
					_$parent10.children.push(_node10);
				}_$parent9.children.push(_node9);
			}_$temp = _node8;{
				var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 7 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 2381994791;_node11.attrs["w-class"] = "detail-wrap";_$temp = _node11;{
					var _$parent12 = _$temp;_addText(it.applyInfo, _$parent12);
				}_chFunc(_node11);_$parent11.children.push(_node11);
			}_chFunc(_node8);_$parent8.children.push(_node8);
		}if (!it.isSolve) {
			_$temp = _node;{
				var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.childHash = 1126797;_node12.attrSize = 1;_node12.attrHash = 3275373163;_node12.attrs["w-class"] = "agree-wrap";_$temp = _node12;{
					var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "span", "sid": 9 };_node13.children = [];_node13.childHash = 1457910335;_node13.attrSize = 2;_node13.attrHash = 827818060;_node13.attrs["w-class"] = "reject";_node13.attrs["on-tap"] = "rejectBtn(e)";_$temp = _node13;{
						var _$parent15 = _$temp;var _node14 = _installText("拒绝", 2661966106);;
						_$parent15.children.push(_node14);
					}_$parent14.children.push(_node13);
				}_$temp = _node12;{
					var _$parent16 = _$temp;var _node15 = { "attrs": {}, "tagName": "span", "sid": 10 };_node15.children = [];_node15.childHash = 2490704499;_node15.attrSize = 2;_node15.attrHash = 2465851617;_node15.attrs["w-class"] = "agree";_node15.attrs["on-tap"] = "agreeBtn(e)";_$temp = _node15;{
						var _$parent17 = _$temp;var _node16 = _installText("同意", 2069876040);;
						_$parent17.children.push(_node16);
					}_$parent16.children.push(_node15);
				}_$parent13.children.push(_node12);
			}
		} else {
			_$temp = _node;{
				var _$parent18 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 11 };_node17.children = [];_node17.attrSize = 1;_node17.attrHash = 521373855;_node17.attrs["w-class"] = "solved";_$temp = _node17;{
					var _$parent19 = _$temp;_addText(it.isSolve, _$parent19);
				}_chFunc(_node17);_$parent18.children.push(_node17);
			}
		}_chFunc(_node);return _node;
	}
});