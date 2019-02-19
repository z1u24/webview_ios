(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 138104688;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 4252679546;_node2.attrs["w-class"] = "body";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.childHash = 2946814719;_node3.attrSize = 1;_node3.attrHash = 3605200885;_node3.attrs["w-class"] = "head";_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 1913054642;_node4.attrs["w-class"] = "main";{
					var _$i = 0;
					for (var _iterator = it.welfareAwards, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
						var index = _$i++;_$temp = _node4;{
							var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 199581027;_node5.attrs["style"] = "margin:5px;";_$temp = _node5;{
								var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "earn-client-app-components-welfareAward-welfareAward", "sid": 5 };_node6.hasChild = false;_node6.child = null;_node6.attrHash = 0;_$temp = _node6;{
									var _$parent7 = _$temp;var _node7 = {}; //jpair pre

									_node7["received"] = item.received;
									//jpair suf
									//jpair pre

									_node7["canReceive"] = item.canReceive;
									//jpair suf
									//jpair pre

									_node7["inviteNumber"] = (index + 1) * it.inviteAwardsMultiple;
									//jpair suf
									//jpair pre

									_node7["awardIndex"] = index;
									//jpair suf
									_addJson(_node7, _$parent7);
								}_chFunc(_node6);_$parent6.children.push(_node6);
							}_chFunc(_node5);_$parent5.children.push(_node5);
						}
					}
				}_chFunc(_node4);_$parent4.children.push(_node4);
			}_$temp = _node2;{
				var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.childHash = 2908380322;_node8.attrSize = 2;_node8.attrHash = 1463335927;_node8.attrs["w-class"] = "invite-btn";_node8.attrs["on-tap"] = "inviteClick";_$temp = _node8;{
					var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "widget", "sid": 7 };_node9.hasChild = false;_node9.child = null;_node9.childHash = 2657552803;_node9.attrHash = 2467408643;_node9.attrs["w-tag"] = "pi-ui-lang";_node9.tagName = _node9.attrs["w-tag"];_$temp = _node9;{
						var _$parent10 = _$temp;var _node10 = {}; //jpair pre

						{
							var jvalue = "";
							jvalue = "立即邀请";
							//jpair suf

							_node10["zh_Hans"] = jvalue;
						}
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "立即邀請";
							//jpair suf

							_node10["zh_Hant"] = _jvalue;
						}
						//jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "";
							//jpair suf

							_node10["en"] = _jvalue2;
						}
						_addJson(_node10, _$parent10);
					}_$parent9.children.push(_node9);
				}_$parent8.children.push(_node8);
			}_$temp = _node2;{
				var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.childHash = 2217235618;_node11.attrSize = 2;_node11.attrHash = 683987627;_node11.attrs["w-class"] = "close";_node11.attrs["on-tap"] = "closeClick";_$temp = _node11;{
					var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "img", "sid": 9 };_node12.children = [];_node12.childHash = 0;_node12.attrSize = 1;_node12.attrHash = 1782490124;_node12.attrs["src"] = "../../res/image/pop_close.png";_$parent12.children.push(_node12);
				}_$parent11.children.push(_node11);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_chFunc(_node);return _node;
	}
});