(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["title"] = it1.cfgData.topBarTitle;
				//jpair suf
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 1679024856;_node4.attrs["style"] = "overflow-y: auto;overflow-x: hidden;flex: 1 0 0;";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 487306359;_node5.attrs["w-class"] = "content";{
					var _$i = 0;
					for (var _iterator = it1.data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
						var _ref;

						if (_isArray) {
							if (_i >= _iterator.length) break;
							_ref = _iterator[_i++];
						} else {
							_i = _iterator.next();
							if (_i.done) break;
							_ref = _i.value;
						}

						var val = _ref;
						var ind = _$i++;_$temp = _node5;{
							var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 767848974;{
								var attrvalue = "";attrvalue += "show(";attrvalue += ind;attrvalue += ")";_node6.attrs["on-tap"] = attrvalue;
							}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["on-tap"]));{
								var _attrvalue = "";_attrvalue += "goDetail(";_attrvalue += ind;_attrvalue += ")";_node6.attrs["ev-imgAndBtn-tap"] = _attrvalue;
							}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["ev-imgAndBtn-tap"]));_$temp = _node6;{
								var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "app-components-imgAndBtnItem-imgAndBtnItem", "sid": 5 };_node7.hasChild = false;_node7.child = null;_node7.attrHash = 0;_$temp = _node7;{
									var _$parent8 = _$temp;var _node8 = {}; //jpair pre

									_node8["name"] = val.itemName;
									//jpair suf
									//jpair pre

									_node8["describe"] = val.itemShort;
									//jpair suf
									//jpair pre

									_node8["img"] = val.itemImg;
									//jpair suf
									//jpair pre

									_node8["btnName"] = it1.cfgData.btnName;
									//jpair suf
									//jpair pre

									_node8["isComplete"] = val.isComplete;
									//jpair suf
									_addJson(_node8, _$parent8);
								}_chFunc(_node7);_$parent7.children.push(_node7);
							}if (val.show) {
								_$temp = _node6;{
									var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 3095917008;_node9.attrs["w-class"] = "itemDetail";_$temp = _node9;{
										var _$parent10 = _$temp;_addText(val.itemDetail, _$parent10);
									}_chFunc(_node9);_$parent9.children.push(_node9);
								}
							}_chFunc(_node6);_$parent6.children.push(_node6);
						}
					}
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});