(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 1044560210;_node.attrs["w-class"] = "user-apply-wrap";_node.attrs["on-tap"] = "viewApplyDetail";_$temp = _node;{
												var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.childHash = 2370944817;_node2.attrSize = 1;_node2.attrHash = 4275137225;_node2.attrs["w-class"] = "avatar-wrap";_$temp = _node2;{
																var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.childHash = 0;_node3.attrSize = 2;_node3.attrHash = 884279964;_node3.attrs["w-class"] = "avatar";_node3.attrs["src"] = "../../res/images/user.png";_$parent3.children.push(_node3);
												}_$parent2.children.push(_node2);
								}_$temp = _node;{
												var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 846934982;_node4.attrs["w-class"] = "user-info-wrap";_$temp = _node4;{
																var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "span", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 4232090967;_node5.attrs["w-class"] = "userName";_$temp = _node5;{
																				var _$parent6 = _$temp;_addText(it.name, _$parent6);
																}_chFunc(_node5);_$parent5.children.push(_node5);
												}_$temp = _node4;{
																var _$parent7 = _$temp;var _node6 = { "attrs": {}, "tagName": "span", "sid": 5 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 136796971;_node6.attrs["w-class"] = "applyInfo";_$temp = _node6;{
																				var _$parent8 = _$temp;_addText(it.applyInfo, _$parent8);
																}_chFunc(_node6);_$parent7.children.push(_node6);
												}_chFunc(_node4);_$parent4.children.push(_node4);
								}if (!it.isagree) {
												_$temp = _node;{
																var _$parent9 = _$temp;var _node7 = { "attrs": {}, "tagName": "span", "sid": 6 };_node7.children = [];_node7.childHash = 2490704499;_node7.attrSize = 2;_node7.attrHash = 2064942057;_node7.attrs["w-class"] = "seeText";_node7.attrs["on-tap"] = "agreenBtn";_$temp = _node7;{
																				var _$parent10 = _$temp;var _node8 = _installText("同意", 2069876040);;
																				_$parent10.children.push(_node8);
																}_$parent9.children.push(_node7);
												}
								} else {
												_$temp = _node;{
																var _$parent11 = _$temp;var _node9 = { "attrs": {}, "tagName": "span", "sid": 7 };_node9.children = [];_node9.childHash = 1903132846;_node9.attrSize = 2;_node9.attrHash = 3338804622;_node9.attrs["w-class"] = "seeText";_node9.attrs["style"] = "border:none;color: #888888;font-size: 28px;";_$temp = _node9;{
																				var _$parent12 = _$temp;var _node10 = _installText("已添加", 3962702707);;
																				_$parent12.children.push(_node10);
																}_$parent11.children.push(_node9);
												}
								}_chFunc(_node);return _node;
				}
});