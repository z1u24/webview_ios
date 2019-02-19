(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 3097205650;_node.attrs["w-class"] = "modal-mask";_node.attrs["class"] = "new-page";_$temp = _node;{
												var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 4252679546;_node2.attrs["w-class"] = "body";_$temp = _node2;{
																var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 1019047777;_node3.attrs["w-class"] = "title";if (typeof it.title === 'string') {
																				_$temp = _node3;{
																								var _$parent4 = _$temp;_addText(it.title, _$parent4);
																				}
																} else {
																				_$temp = _node3;{
																								var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 3 };_node4.hasChild = false;_node4.child = null;_node4.attrHash = 0;_$temp = _node4;{
																												var _$parent6 = _$temp;_addJson(it.title, _$parent6);
																								}_chFunc(_node4);_$parent5.children.push(_node4);
																				}
																}_chFunc(_node3);_$parent3.children.push(_node3);
												}_$temp = _node2;{
																var _$parent7 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 503636906;_node5.attrs["w-class"] = "content";{
																				var attrvalue = "";attrvalue += it.style ? it.style : '';attrvalue += "";_node5.attrs["style"] = attrvalue;
																}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["style"]));if (typeof it.content === 'string') {
																				_$temp = _node5;{
																								var _$parent8 = _$temp;_addText(it.content, _$parent8);
																				}
																} else {
																				_$temp = _node5;{
																								var _$parent9 = _$temp;var _node6 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 5 };_node6.hasChild = false;_node6.child = null;_node6.attrHash = 0;_$temp = _node6;{
																												var _$parent10 = _$temp;_addJson(it.content, _$parent10);
																								}_chFunc(_node6);_$parent9.children.push(_node6);
																				}
																}_chFunc(_node5);_$parent7.children.push(_node5);
												}_$temp = _node2;{
																var _$parent11 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 6 };_node7.children = [];_node7.childHash = 2665314656;_node7.attrSize = 1;_node7.attrHash = 2566746008;_node7.attrs["w-class"] = "btns";_$temp = _node7;{
																				var _$parent12 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 7 };_node8.children = [];_node8.childHash = 2573229304;_node8.attrSize = 2;_node8.attrHash = 3340574570;_node8.attrs["w-class"] = "btn-cancel";_node8.attrs["on-tap"] = "cancelBtnClick";_$temp = _node8;{
																								var _$parent13 = _$temp;var _node9 = { "attrs": {}, "tagName": "span", "sid": 8 };_node9.children = [];_node9.childHash = 2195018664;_node9.attrHash = 0;_$temp = _node9;{
																												var _$parent14 = _$temp;var _node10 = _installText("取消", 359863121);;
																												_$parent14.children.push(_node10);
																								}_$parent13.children.push(_node9);
																				}_$parent12.children.push(_node8);
																}_$temp = _node7;{
																				var _$parent15 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 9 };_node11.children = [];_node11.childHash = 1228218462;_node11.attrSize = 2;_node11.attrHash = 4264153071;_node11.attrs["w-class"] = "btn-ok";_node11.attrs["on-tap"] = "okBtnClick";_$temp = _node11;{
																								var _$parent16 = _$temp;var _node12 = { "attrs": {}, "tagName": "span", "sid": 10 };_node12.children = [];_node12.childHash = 2383734690;_node12.attrHash = 0;_$temp = _node12;{
																												var _$parent17 = _$temp;var _node13 = _installText("确定", 2644238972);;
																												_$parent17.children.push(_node13);
																								}_$parent16.children.push(_node12);
																				}_$parent15.children.push(_node11);
																}_$parent11.children.push(_node7);
												}_chFunc(_node2);_$parent2.children.push(_node2);
								}_chFunc(_node);return _node;
				}
});