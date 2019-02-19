(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 4252679546;_node.attrs["w-class"] = "body";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 621309583;_node2.attrs["w-class"] = "topbar";{
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
					var i = _$i++;_$temp = _node2;{
						var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 3;_node3.attrHash = 3618185839;{
							var attrvalue = "";attrvalue += "changeTopbar(";attrvalue += i;attrvalue += ")";_node3.attrs["on-tap"] = attrvalue;
						}_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["on-tap"]));_node3.attrs["w-class"] = "topbar-item";{
							var _attrvalue = "";_attrvalue += "color:";_attrvalue += item.matchType === it.selectMacth.matchType ? '#5DDDFF' : '#ffffff';_attrvalue += "";_node3.attrs["style"] = _attrvalue;
						}_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["style"]));_$temp = _node3;{
							var _$parent4 = _$temp;_addText(item.matchName, _$parent4);
						}_chFunc(_node3);_$parent3.children.push(_node3);
					}
				}
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 727216642;_node4.attrs["style"] = "overflow: hidden auto;scroll-behavior: smooth;height: 100%;padding-bottom: 50px;";{
				var _$i2 = 0;
				for (var _iterator2 = it.selectMacth.list, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
					var _ref2;

					if (_isArray2) {
						if (_i2 >= _iterator2.length) break;
						_ref2 = _iterator2[_i2++];
					} else {
						_i2 = _iterator2.next();
						if (_i2.done) break;
						_ref2 = _i2.value;
					}

					var _item = _ref2;
					var _i3 = _$i2++;_$temp = _node4;{
						var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 2182359652;_node5.attrs["w-class"] = "day-item";_$temp = _node5;{
							var _$parent7 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 5 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 1281297628;_node6.attrs["w-class"] = "top-date";_$temp = _node6;{
								var _$parent8 = _$temp;_addText(_item.time, _$parent8);
							}_$temp = _node6;{
								var _$parent9 = _$temp;_addText(_item.week, _$parent9);
							}_chFunc(_node6);_$parent7.children.push(_node6);
						}{
							var _$i3 = 0;
							for (var _iterator3 = _item.list, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
								var _ref3;

								if (_isArray3) {
									if (_i4 >= _iterator3.length) break;
									_ref3 = _iterator3[_i4++];
								} else {
									_i4 = _iterator3.next();
									if (_i4.done) break;
									_ref3 = _i4.value;
								}

								var item1 = _ref3;
								var j = _$i3++;_$temp = _node5;{
									var _$parent10 = _$temp;var _node7 = { "attrs": {}, "tagName": "widget", "sid": 6 };_node7.hasChild = false;_node7.child = null;_node7.attrHash = 1529494859;_node7.attrs["w-tag"] = "earn-client-app-components-guessItem-guessItem";_node7.tagName = _node7.attrs["w-tag"];_$temp = _node7;{
										var _$parent11 = _$temp;var _node8 = {}; //jpair pre

										_node8["showBtn"] = true;
										//jpair suf
										//jpair pre

										_node8["guessData"] = item1;
										//jpair suf
										_addJson(_node8, _$parent11);
									}_chFunc(_node7);_$parent10.children.push(_node7);
								}
							}
						}_chFunc(_node5);_$parent6.children.push(_node5);
					}
				}
			}_chFunc(_node4);_$parent5.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});