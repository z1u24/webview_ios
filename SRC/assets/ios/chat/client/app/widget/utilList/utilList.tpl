(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "ul", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 3203143096;_node.attrs["w-class"] = "util-list-wrap";{
												var _$i = 0;
												for (var _iterator = it.utilList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
																				var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "li", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 3595873982;_node2.attrs["w-class"] = "liItem";{
																								var attrvalue = "";attrvalue += "handleUtilItemTap(e,";attrvalue += index;attrvalue += ")";_node2.attrs["on-tap"] = attrvalue;
																				}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["on-tap"]));if (item.iconPath) {
																								_$temp = _node2;{
																												var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.attrSize = 2;_node3.attrHash = 2753137346;_node3.attrs["w-class"] = "utilImg";{
																																var _attrvalue = "";_attrvalue += "../../res/images/";_attrvalue += item.iconPath;_attrvalue += "";_node3.attrs["src"] = _attrvalue;
																												}_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["src"]));_chFunc(_node3);_$parent3.children.push(_node3);
																								}
																				}_$temp = _node2;{
																								var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "span", "sid": 3 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 4249153416;_node4.attrs["w-class"] = "utilText";_node4.attrs["class"] = "utilTextSpan";_$temp = _node4;{
																												var _$parent5 = _$temp;_addText(item.utilText, _$parent5);
																								}_chFunc(_node4);_$parent4.children.push(_node4);
																				}_chFunc(_node2);_$parent2.children.push(_node2);
																}
												}
								}_chFunc(_node);return _node;
				}
});