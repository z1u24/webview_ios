(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;it = it || { tag: "btn", show: { "cfg": { "clazz": "", "text": "1", leaf: false }, select: false }, cmd: "", arr: [] };_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrHash = 0;if (it.tag) {
												_$temp = _node;{
																var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "widget", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrSize = 2;_node2.attrHash = 2967864307;{
																				var attrvalue = "";attrvalue = it.tag;_node2.attrs["w-tag"] = attrvalue;
																}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["w-tag"]));_node2.tagName = _node2.attrs["w-tag"];_node2.attrs["w-class"] = "item";{
																				var _attrvalue = "";_attrvalue += "change('";_attrvalue += it.cmd;_attrvalue += "')";_node2.attrs["on-tap"] = _attrvalue;
																}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["on-tap"]));_$temp = _node2;{
																				var _$parent3 = _$temp;_addJson(it.show, _$parent3);
																}_chFunc(_node2);_$parent2.children.push(_node2);
												}
								}if (it.arr && it.show.select) {
												_$temp = _node;{
																var _$parent4 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 2044962327;_node3.attrs["w-class"] = "tree";{
																				var _$i = 0;
																				for (var _iterator = it.arr, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
																								var i = _$i++;_$temp = _node3;{
																												var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "treememu$", "sid": 3 };_node4.hasChild = false;_node4.child = null;_node4.attrHash = 0;_$temp = _node4;{
																																var _$parent6 = _$temp;_addJson(parseInt(i), _$parent6);
																												}_chFunc(_node4);_$parent5.children.push(_node4);
																								}
																				}
																}_chFunc(_node3);_$parent4.children.push(_node3);
												}
								}_chFunc(_node);return _node;
				}
});