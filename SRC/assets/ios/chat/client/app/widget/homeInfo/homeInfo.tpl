(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 22015006;_node.attrs["w-class"] = "home-info-wrap";_$temp = _node;{
												var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "img", "sid": 1 };_node2.children = [];_node2.childHash = 0;_node2.attrSize = 2;_node2.attrHash = 1051292715;_node2.attrs["w-class"] = "avatar";_node2.attrs["src"] = "../../res/images/img_avatar1.png";_$parent2.children.push(_node2);
								}_$temp = _node;{
												var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "span", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 2372826457;_node3.attrs["w-class"] = "nameText";_$temp = _node3;{
																var _$parent4 = _$temp;_addText(it.isUser && it.note ? it.note : it.name, _$parent4);
												}_chFunc(_node3);_$parent3.children.push(_node3);
								}if (!it.isUser && it.note) {
												_$temp = _node;{
																var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "span", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 1731633321;_node4.attrs["w-class"] = "otherText";_$temp = _node4;{
																				var _$parent6 = _$temp;var _node5 = _installText("群号：", 945648903);;
																				_$parent6.children.push(_node5);
																}_$temp = _node4;{
																				var _$parent7 = _$temp;_addText(it.note, _$parent7);
																}_chFunc(_node4);_$parent5.children.push(_node4);
												}
								}if (it.isUser && it.isContactor) {
												_$temp = _node;{
																var _$parent8 = _$temp;var _node6 = { "attrs": {}, "tagName": "span", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 862768705;_node6.attrs["w-class"] = "contactorID";_$temp = _node6;{
																				var _$parent9 = _$temp;var _node7 = _installText("ID：", 3204938943);;
																				_$parent9.children.push(_node7);
																}_$temp = _node6;{
																				var _$parent10 = _$temp;_addText(it.userId, _$parent10);
																}_chFunc(_node6);_$parent8.children.push(_node6);
												}_$temp = _node;{
																var _$parent11 = _$temp;var _node8 = { "attrs": {}, "tagName": "span", "sid": 5 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 1420556028;_node8.attrs["w-class"] = "contactorNick";_$temp = _node8;{
																				var _$parent12 = _$temp;var _node9 = _installText("昵称：", 3566822203);;
																				_$parent12.children.push(_node9);
																}_$temp = _node8;{
																				var _$parent13 = _$temp;_addText(it.name, _$parent13);
																}_chFunc(_node8);_$parent11.children.push(_node8);
												}
								} else if (it.isUser && !it.isContactor) {
												_$temp = _node;{
																var _$parent14 = _$temp;var _node10 = { "attrs": {}, "tagName": "span", "sid": 6 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 862768705;_node10.attrs["w-class"] = "contactorID";_$temp = _node10;{
																				var _$parent15 = _$temp;var _node11 = _installText("ID：", 3204938943);;
																				_$parent15.children.push(_node11);
																}_$temp = _node10;{
																				var _$parent16 = _$temp;_addText(it.userId, _$parent16);
																}_chFunc(_node10);_$parent14.children.push(_node10);
												}
								}_chFunc(_node);return _node;
				}
});