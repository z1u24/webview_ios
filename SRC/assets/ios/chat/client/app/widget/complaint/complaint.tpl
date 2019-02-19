(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 3097205650;_node.attrs["w-class"] = "modal-mask";_node.attrs["class"] = "new-page";_$temp = _node;{
												var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 4252679546;_node2.attrs["w-class"] = "body";_$temp = _node2;{
																var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 487306359;_node3.attrs["w-class"] = "content";{
																				var _$i = 0;
																				for (var _iterator = it.content, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
																								var _ref;

																								if (_isArray) {
																												if (_i >= _iterator.length) break;
																												_ref = _iterator[_i++];
																								} else {
																												_i = _iterator.next();
																												if (_i.done) break;
																												_ref = _i.value;
																								}

																								var v = _ref;
																								var i = _$i++;selFg = it.selected.indexOf(i) > -1;_$temp = _node3;{
																												var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 3502478888;{
																																var attrvalue = "";attrvalue += "doClick(";attrvalue += i;attrvalue += ")";_node4.attrs["on-tap"] = attrvalue;
																												}_node4.attrHash = _hash.nextHash(_node4.attrHash, _calTextHash(_node4.attrs["on-tap"]));_node4.attrs["w-class"] = "checkbox";_$temp = _node4;{
																																var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 4 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 3087811751;{
																																				var _attrvalue = "";_attrvalue += "../../res/images/icon_right";_attrvalue += selFg ? '2' : '1';_attrvalue += ".png";_node5.attrs["src"] = _attrvalue;
																																}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["src"]));_node5.attrs["w-class"] = "selectImg";_chFunc(_node5);_$parent5.children.push(_node5);
																												}_$temp = _node4;{
																																var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "span", "sid": 5 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 1799229842;_node6.attrs["style"] = "line-height:40px;";_$temp = _node6;{
																																				var _$parent7 = _$temp;_addText(v, _$parent7);
																																}_chFunc(_node6);_$parent6.children.push(_node6);
																												}_chFunc(_node4);_$parent4.children.push(_node4);
																								}
																				}
																}_chFunc(_node3);_$parent3.children.push(_node3);
												}_$temp = _node2;{
																var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 6 };_node7.children = [];_node7.childHash = 777051007;_node7.attrSize = 1;_node7.attrHash = 2566746008;_node7.attrs["w-class"] = "btns";_$temp = _node7;{
																				var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 7 };_node8.children = [];_node8.childHash = 2195018664;_node8.attrSize = 2;_node8.attrHash = 3340574570;_node8.attrs["w-class"] = "btn-cancel";_node8.attrs["on-tap"] = "cancelBtnClick";_$temp = _node8;{
																								var _$parent10 = _$temp;var _node9 = _installText("取消", 359863121);;
																								_$parent10.children.push(_node9);
																				}_$parent9.children.push(_node8);
																}_$temp = _node7;{
																				var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.childHash = 3431826564;_node10.attrSize = 2;_node10.attrHash = 4264153071;_node10.attrs["w-class"] = "btn-ok";_node10.attrs["on-tap"] = "okBtnClick";_$temp = _node10;{
																								var _$parent12 = _$temp;var _node11 = _installText("举报", 2071251958);;
																								_$parent12.children.push(_node11);
																				}_$parent11.children.push(_node10);
																}_$parent8.children.push(_node7);
												}_chFunc(_node2);_$parent2.children.push(_node2);
								}_chFunc(_node);return _node;
				}
});