(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 49715079;_node.attrs["ev-back-click"] = "goBack";{
												var _$i = 0;
												for (var _iterator = it.emojis, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
																var _ref;

																if (_isArray) {
																				if (_i >= _iterator.length) break;
																				_ref = _iterator[_i++];
																} else {
																				_i = _iterator.next();
																				if (_i.done) break;
																				_ref = _i.value;
																}

																var value = _ref;
																var key = _$i++;_$temp = _node;{
																				var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "img", "sid": 1 };_node2.children = [];_node2.attrSize = 4;_node2.attrHash = 1243507636;_node2.attrs["style"] = "width:48px;height:48px;border: 10px solid transparent;";{
																								var attrvalue = "";attrvalue += "../../res/emoji/";attrvalue += value[2];attrvalue += "";_node2.attrs["src"] = attrvalue;
																				}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["src"]));{
																								var _attrvalue = "";_attrvalue += value[0];_attrvalue += "";_node2.attrs["alt"] = _attrvalue;
																				}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["alt"]));{
																								var _attrvalue2 = "";_attrvalue2 += "click(e,";_attrvalue2 += key;_attrvalue2 += ")";_node2.attrs["on-down"] = _attrvalue2;
																				}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["on-down"]));_chFunc(_node2);_$parent2.children.push(_node2);
																}
												}
								}_chFunc(_node);return _node;
				}
});