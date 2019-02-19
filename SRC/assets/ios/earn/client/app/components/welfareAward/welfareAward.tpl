(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 3911172853;_node.attrs["w-class"] = "box";_node.attrs["on-tap"] = "openClick";_$temp = _node;{
												var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 3;_node2.attrHash = 3315127827;_node2.attrs["w-class"] = "award-box";{
																var attrvalue = "";attrvalue += it.canReceive ? 'background-image:url(../../res/image/can_receive_bg.png);' : '';attrvalue += "";_node2.attrs["style"] = attrvalue;
												}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["style"]));{
																var _attrvalue = "";_attrvalue += it.received ? 'grayscale' : '';_attrvalue += "";_node2.attrs["class"] = _attrvalue;
												}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["class"]));_$temp = _node2;{
																var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.attrSize = 2;_node3.attrHash = 2746697151;{
																				var _attrvalue2 = "";_attrvalue2 += it.imgUrl;_attrvalue2 += "";_node3.attrs["src"] = _attrvalue2;
																}_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["src"]));_node3.attrs["w-class"] = "award-img";_chFunc(_node3);_$parent3.children.push(_node3);
												}_chFunc(_node2);_$parent2.children.push(_node2);
								}_$temp = _node;{
												var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 3917241699;_node4.attrs["w-class"] = "receiving-condition";_$temp = _node4;{
																var _$parent5 = _$temp;_addText(it.inviteNumber, _$parent5);
												}_$temp = _node4;{
																var _$parent6 = _$temp;var _node5 = _installText("人", 1431085486);;
																_$parent6.children.push(_node5);
												}_chFunc(_node4);_$parent4.children.push(_node4);
								}_chFunc(_node);return _node;
				}
});