(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 4252679546;_node.attrs["w-class"] = "body";{
			var _$i = 0;
			for (var _iterator = it.guessList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
				var i = _$i++;_$temp = _node;{
					var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 2182359652;_node2.attrs["w-class"] = "day-item";_$temp = _node2;{
						var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 1281297628;_node3.attrs["w-class"] = "top-date";_$temp = _node3;{
							var _$parent4 = _$temp;_addText(item.time, _$parent4);
						}_$temp = _node3;{
							var _$parent5 = _$temp;_addText(item.week, _$parent5);
						}_chFunc(_node3);_$parent3.children.push(_node3);
					}{
						var _$i2 = 0;
						for (var _iterator2 = item.data, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
							var _ref2;

							if (_isArray2) {
								if (_i2 >= _iterator2.length) break;
								_ref2 = _iterator2[_i2++];
							} else {
								_i2 = _iterator2.next();
								if (_i2.done) break;
								_ref2 = _i2.value;
							}

							var item1 = _ref2;
							var j = _$i2++;_$temp = _node2;{
								var _$parent6 = _$temp;var _node4 = { "attrs": {}, "tagName": "widget", "sid": 3 };_node4.hasChild = false;_node4.child = null;_node4.attrHash = 1529494859;_node4.attrs["w-tag"] = "earn-client-app-components-guessItem-guessItem";_node4.tagName = _node4.attrs["w-tag"];_$temp = _node4;{
									var _$parent7 = _$temp;var _node5 = {}; //jpair pre

									_node5["showBtn"] = true;
									//jpair suf
									//jpair pre

									_node5["guessData"] = item1;
									//jpair suf
									_addJson(_node5, _$parent7);
								}_chFunc(_node4);_$parent6.children.push(_node4);
							}
						}
					}_chFunc(_node2);_$parent2.children.push(_node2);
				}
			}
		}_chFunc(_node);return _node;
	}
});