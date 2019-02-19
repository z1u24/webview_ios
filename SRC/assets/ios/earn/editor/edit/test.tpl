(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 125713350;_node.attrs["style"] = "position: absolute;top:0;bottom:0;left:0;right: 0; background-color: rgb(170, 221, 221);height: -webkit-fill-available;position: fixed;width: -webkit-fill-available;";{
												var _$i = 0;
												for (var _iterator = it.bts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
																var _ref;

																if (_isArray) {
																				if (_i >= _iterator.length) break;
																				_ref = _iterator[_i++];
																} else {
																				_i = _iterator.next();
																				if (_i.done) break;
																				_ref = _i.value;
																}

																var button = _ref;
																var index = _$i++;_$temp = _node;{
																				var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "span", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 815707115;_node2.attrs["w-class"] = "test-btn";{
																								var attrvalue = "";attrvalue += "onTap(";attrvalue += index;attrvalue += ")";_node2.attrs["on-tap"] = attrvalue;
																				}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["on-tap"]));_$temp = _node2;{
																								var _$parent3 = _$temp;_addText(button.name, _$parent3);
																				}_chFunc(_node2);_$parent2.children.push(_node2);
																}
												}
								}_chFunc(_node);return _node;
				}
});