(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "ul", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 435847668;_node.attrs["w-class"] = "manage-ul";{
												var _$i = 0;
												for (var _iterator = it.manageList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
																var index = _$i++;_$temp = _node;{
																				var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "li", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 2088917924;_node2.attrs["w-class"] = "manage-item-wrap";{
																								var attrvalue = "";attrvalue += "openManageItem(e,";attrvalue += index;attrvalue += ")";_node2.attrs["on-tap"] = attrvalue;
																				}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["on-tap"]));_$temp = _node2;{
																								var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "span", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 1019047777;_node3.attrs["w-class"] = "title";_$temp = _node3;{
																												var _$parent4 = _$temp;_addText(item.title, _$parent4);
																								}_chFunc(_node3);_$parent3.children.push(_node3);
																				}if (item.quantity) {
																								_$temp = _node2;{
																												var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "span", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 565146884;_node4.attrs["w-class"] = "quantity";_$temp = _node4;{
																																var _$parent6 = _$temp;_addText(item.quantity, _$parent6);
																												}_chFunc(_node4);_$parent5.children.push(_node4);
																								}
																				}_$temp = _node2;{
																								var _$parent7 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 4 };_node5.children = [];_node5.childHash = 0;_node5.attrSize = 2;_node5.attrHash = 3050103781;_node5.attrs["w-class"] = "goToImg";_node5.attrs["src"] = "../../res/images/more-gray.png";_$parent7.children.push(_node5);
																				}_chFunc(_node2);_$parent2.children.push(_node2);
																}
												}
								}_chFunc(_node);return _node;
				}
});