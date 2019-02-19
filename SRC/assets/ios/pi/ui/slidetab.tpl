(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = _installText("}", 4122649163);;
		return _node;
	}it = it || { cur: 0 };_$temp = node;{
		var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 0 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 263893721;_node2.attrs["style"] = "width:100%;height:100%";_$temp = _node2;{
			var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 1 };_node3.children = [];_node3.attrSize = 4;_node3.attrHash = 573763041;_node3.attrs["w-class"] = "tabs";_node3.attrs["on-move"] = "moveTab";_node3.attrs["on-touchstart"] = "poiseStart";_node3.attrs["on-touchend"] = "poiseEnd";_$temp = _node3;{
				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 583283217;_node4.attrs["container"] = "";{
					var attrvalue = "";attrvalue += "width:100%;height:100%;transform:translateX(";attrvalue += -100 * it.cur;attrvalue += "%);";_node4.attrs["style"] = attrvalue;
				}_node4.attrHash = _hash.nextHash(_node4.attrHash, _calTextHash(_node4.attrs["style"]));{
					var _$i = 0;
					for (var _iterator = _cfg.arr, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
						var i = _$i++;_$temp = _node4;{
							var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "widget", "sid": 3 };_node5.hasChild = false;_node5.child = null;_node5.attrSize = 1;_node5.attrHash = 1773846051;{
								var _attrvalue = "";_attrvalue = v.tab;_node5.attrs["w-tag"] = _attrvalue;
							}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["w-tag"]));_node5.tagName = _node5.attrs["w-tag"];{
								var _attrvalue2 = "";_attrvalue2 += "position: absolute;left:";_attrvalue2 += 100 * i;_attrvalue2 += "%;width:100%;height:100%;background-color: ";_attrvalue2 += v.color;_attrvalue2 += ";";_node5.attrs["style"] = _attrvalue2;
							}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["style"]));_chFunc(_node5);_$parent5.children.push(_node5);
						}
					}
				}_chFunc(_node4);_$parent4.children.push(_node4);
			}_chFunc(_node3);_$parent3.children.push(_node3);
		}_$temp = _node2;{
			var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 3;_node6.attrHash = 1339349161;_node6.attrs["btns"] = "";_node6.attrs["w-class"] = "btns";_node6.attrs["ev-btn"] = "change";{
				var _$i2 = 0;
				for (var _iterator2 = _cfg.arr, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
					var _ref2;

					if (_isArray2) {
						if (_i2 >= _iterator2.length) break;
						_ref2 = _iterator2[_i2++];
					} else {
						_i2 = _iterator2.next();
						if (_i2.done) break;
						_ref2 = _i2.value;
					}

					var _v = _ref2;
					var _i3 = _$i2++;_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "widget", "sid": 5 };_node7.hasChild = false;_node7.child = null;_node7.attrSize = 1;_node7.attrHash = 513035889;{
							var _attrvalue3 = "";_attrvalue3 = _cfg.btn;_node7.attrs["w-tag"] = _attrvalue3;
						}_node7.attrHash = _hash.nextHash(_node7.attrHash, _calTextHash(_node7.attrs["w-tag"]));_node7.tagName = _node7.attrs["w-tag"];_node7.attrs["style"] = "display: inline-block;";_$temp = _node7;{
							var _$parent8 = _$temp;var _node8 = {}; //jpair pre

							_node8["cfg"] = _v.btn;
							//jpair suf
							//jpair pre

							_$temp = _node8;{
								var _$parent9 = _$temp;_$temp = _node8;{
									var _$parent10 = _$temp;var _node9 = {}; //jpair pre

									_node9["cmd"] = _i3;
									//jpair suf
									_$parent10["e"] = _node9;
								}
								//jpair suf
							} //jpair pre

							_node8["select"] = _i3 == it.cur;
							//jpair suf
							_addJson(_node8, _$parent8);
						}_chFunc(_node7);_$parent7.children.push(_node7);
					}
				}
			}_chFunc(_node6);_$parent6.children.push(_node6);
		}_chFunc(_node2);return _node2;
	}
});