(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 3535021219;_node.attrs["w-class"] = "message-record-wrap";{
			var attrvalue = "";attrvalue += "background-color:";attrvalue += it.msgTop ? '#f0f0f0;' : '#fff';attrvalue += "";_node.attrs["style"] = attrvalue;
		}_node.attrHash = _hash.nextHash(_node.attrHash, _calTextHash(_node.attrs["style"]));_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 4275137225;_node2.attrs["w-class"] = "avatar-wrap";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "widget", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrSize = 1;_node3.attrHash = 1941416123;_node3.attrs["w-tag"] = "chat-client-app-widget-imgShow-imgShow";_node3.tagName = _node3.attrs["w-tag"];_node3.attrs["w-class"] = "avatar";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["imgURL"] = it.avatar;
					//jpair suf
					//jpair pre

					{
						var jvalue = "";
						jvalue = "80px;";
						//jpair suf

						_node4["width"] = jvalue;
					}
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 846934982;_node5.attrs["w-class"] = "user-info-wrap";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 925768543;_node6.attrs["w-class"] = "info-wrap";if (it.chatType == "group") {
					_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 5 };_node7.children = [];_node7.childHash = 0;_node7.attrSize = 2;_node7.attrHash = 2489533918;_node7.attrs["w-class"] = "resIcon";_node7.attrs["src"] = "../../res/images/group-icon.png";_$parent7.children.push(_node7);
					}
				}_$temp = _node6;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "span", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 4232090967;_node8.attrs["w-class"] = "userName";_$temp = _node8;{
						var _$parent9 = _$temp;_addText(it.name, _$parent9);
					}_chFunc(_node8);_$parent8.children.push(_node8);
				}if (it.msgAvoid) {
					_$temp = _node6;{
						var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "img", "sid": 7 };_node9.children = [];_node9.childHash = 0;_node9.attrSize = 2;_node9.attrHash = 1319088691;_node9.attrs["w-class"] = "notDisturbIcon";_node9.attrs["src"] = "../../res/images/not-disturb.png";_$parent10.children.push(_node9);
					}
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_$temp = _node5;{
				var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 2397263460;_node10.attrs["w-class"] = "recordInfo";_$temp = _node10;{
					var _$parent12 = _$temp;_addText(it.msg, _$parent12);
				}_chFunc(_node10);_$parent11.children.push(_node10);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_$temp = _node;{
			var _$parent13 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 9 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 3497080296;_node11.attrs["w-class"] = "right-wrap";_$temp = _node11;{
				var _$parent14 = _$temp;var _node12 = { "attrs": {}, "tagName": "span", "sid": 10 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 196440170;_node12.attrs["w-class"] = "recordTime";_$temp = _node12;{
					var _$parent15 = _$temp;_addText(it.time, _$parent15);
				}_chFunc(_node12);_$parent14.children.push(_node12);
			}if (it.unReadCount) {
				_$temp = _node11;{
					var _$parent16 = _$temp;var _node13 = { "attrs": {}, "tagName": "span", "sid": 11 };_node13.children = [];_node13.attrSize = 2;_node13.attrHash = 2108833723;_node13.attrs["w-class"] = "unread";{
						var _attrvalue = "";_attrvalue += "background:";_attrvalue += it.msgAvoid ? '#ccc' : '#F7931A';_attrvalue += "";_node13.attrs["style"] = _attrvalue;
					}_node13.attrHash = _hash.nextHash(_node13.attrHash, _calTextHash(_node13.attrs["style"]));_$temp = _node13;{
						var _$parent17 = _$temp;_addText(it.unReadCount, _$parent17);
					}_chFunc(_node13);_$parent16.children.push(_node13);
				}
			}_chFunc(_node11);_$parent13.children.push(_node11);
		}_chFunc(_node);return _node;
	}
});