(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1542886283;_node.attrs["class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 2259578786;_node2.attrs["ev-back-click"] = "goBack";_node2.attrs["ev-next-click"] = "editGroupAnnounce";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					{
						var jvalue = "";
						jvalue = "群公告";
						//jpair suf

						_node4["title"] = jvalue;
					}
					//jpair pre

					_node4["nextImg"] = it.isOwner ? "edit.png" : "";
					//jpair suf
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 1409877924;_node5.attrs["w-class"] = "outter";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 1295569400;_node6.attrs["w-class"] = "inner";_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 2;_node7.attrHash = 1700041412;_node7.attrs["w-class"] = "group-intro-wrap";_node7.attrs["on-tap"] = "goDetail('')";_$temp = _node7;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "span", "sid": 6 };_node8.children = [];_node8.childHash = 4130060399;_node8.attrHash = 0;_$temp = _node8;{
							var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "span", "sid": 7 };_node9.children = [];_node9.childHash = 433351092;_node9.attrSize = 1;_node9.attrHash = 3720948540;_node9.attrs["w-class"] = "topping";_$temp = _node9;{
								var _$parent10 = _$temp;var _node10 = _installText("置顶", 2643244958);;
								_$parent10.children.push(_node10);
							}_$parent9.children.push(_node9);
						}_$temp = _node8;{
							var _$parent11 = _$temp;var _node11 = _installText("本群须知", 4086343365);;
							_$parent11.children.push(_node11);
						}_$parent8.children.push(_node8);
					}_$temp = _node7;{
						var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "span", "sid": 8 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 4199677935;_node12.attrs["w-class"] = "time";_$temp = _node12;{
							var _$parent13 = _$temp;_addText(it.createTime, _$parent13);
						}_chFunc(_node12);_$parent12.children.push(_node12);
					}_chFunc(_node7);_$parent7.children.push(_node7);
				}if (it.aIncIdArray.length > 0) {
					{
						var _$i = 0;
						for (var _iterator = it.aIncIdArray, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
							var index = _$i++;_$temp = _node6;{
								var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "widget", "sid": 9 };_node13.hasChild = false;_node13.child = null;_node13.attrSize = 1;_node13.attrHash = 1041920876;_node13.attrs["w-tag"] = "chat-client-app-widget-announceItem-announceItem";_node13.tagName = _node13.attrs["w-tag"];{
									var attrvalue = "";attrvalue += "goDetail('";attrvalue += item;attrvalue += "')";_node13.attrs["on-tap"] = attrvalue;
								}_node13.attrHash = _hash.nextHash(_node13.attrHash, _calTextHash(_node13.attrs["on-tap"]));_$temp = _node13;{
									var _$parent15 = _$temp;var _node14 = {}; //jpair pre

									_node14["aIncId"] = item;
									//jpair suf
									_addJson(_node14, _$parent15);
								}_chFunc(_node13);_$parent14.children.push(_node13);
							}
						}
					}
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});