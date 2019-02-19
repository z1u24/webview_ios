(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;var textCfg = it.textCfg;var zoomfactor = textCfg.zoomfactor;if (textCfg.isCommon) {
								if (!textCfg.charUV) {
												_$temp = node;{
																var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "span", "sid": 0 };_node.children = [];_node.childHash = 2946814719;_node.attrHash = 0;return _node;
												}
								} else {
												var arr = it.show.split("");var uv = {};_$temp = node;{
																var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "span", "sid": 1 };_node2.children = [];_node2.attrHash = 0;{
																				var _$i = 0;
																				for (var _iterator = arr, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
																								var i = _$i++;uv = textCfg.charUV[v];_$temp = _node2;{
																												var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "span", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 2915635491;{
																																var attrvalue = "";attrvalue += "display:inline-block;overflow:hidden;background-image:url(";attrvalue += textCfg.url;attrvalue += ");background-repeat:no-repeat;background-size:";attrvalue += textCfg.width / zoomfactor;attrvalue += "px ";attrvalue += textCfg.height / zoomfactor;attrvalue += "px;background-position:-";attrvalue += uv.u1 / zoomfactor;attrvalue += "px -";attrvalue += uv.v1 / zoomfactor;attrvalue += "px;width:";attrvalue += (uv.u2 - uv.u1) / zoomfactor;attrvalue += "px;height:";attrvalue += (uv.v2 - uv.v1) / zoomfactor;attrvalue += "px;";if (it.space) {
																																				attrvalue += "margin:0px ";attrvalue += it.space;attrvalue += "px;";
																																}attrvalue += "";_node3.attrs["style"] = attrvalue;
																												}_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["style"]));_chFunc(_node3);_$parent3.children.push(_node3);
																								}
																				}
																}_chFunc(_node2);return _node2;
												}
								}
				} else {
								_$temp = node;{
												var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "img", "sid": 3 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 1999824179;{
																var _attrvalue = "";_attrvalue += "width:";_attrvalue += textCfg.width / zoomfactor;_attrvalue += "px; height:";_attrvalue += textCfg.height / zoomfactor;_attrvalue += "px";_node4.attrs["style"] = _attrvalue;
												}_node4.attrHash = _hash.nextHash(_node4.attrHash, _calTextHash(_node4.attrs["style"]));{
																var _attrvalue2 = "";_attrvalue2 = textCfg.url || '';_node4.attrs["src"] = _attrvalue2;
												}_node4.attrHash = _hash.nextHash(_node4.attrHash, _calTextHash(_node4.attrs["src"]));_chFunc(_node4);return _node4;
								}
				}
});