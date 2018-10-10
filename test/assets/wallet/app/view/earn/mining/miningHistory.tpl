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
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 3;_node4.attrHash = 1828517035;_node4.attrs["w-class"] = "historylist";_node4.attrs["id"] = "historylist";_node4.attrs["on-scroll"] = "getMoreList";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 2208651128;_node5.attrs["w-class"] = "history";_node5.attrs["id"] = "history";{
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
							var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 1979317745;{
								var attrvalue = "";attrvalue += ind > 0 ? 'background: #ffffff;' : '';attrvalue += "";_node6.attrs["style"] = attrvalue;
							}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["style"]));_$temp = _node6;{
								var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "app-components-fourParaItem-fourParaItem", "sid": 5 };_node7.hasChild = false;_node7.child = null;_node7.attrHash = 0;_$temp = _node7;{
									var _$parent8 = _$temp;var _node8 = {}; //jpair pre

									_node8["name"] = it1.cfgData.itemName;
									//jpair suf
									//jpair pre

									_node8["data"] = val.num + ' ETH';
									//jpair suf
									//jpair pre

									_node8["time"] = val.time;
									//jpair suf
									_addJson(_node8, _$parent8);
								}_chFunc(_node7);_$parent7.children.push(_node7);
							}_chFunc(_node6);_$parent6.children.push(_node6);
						}
					}
				}if (it1.data.length > 0 && !it1.hasMore) {
					_$temp = _node5;{
						var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 3992589513;_node9.attrs["w-class"] = "endMess";_$temp = _node9;{
							var _$parent10 = _$temp;_addText(it1.cfgData.tips[0], _$parent10);
						}_$temp = _node9;{
							var _$parent11 = _$temp;var _node10 = _installText("^_^", 2624223669);;
							_$parent11.children.push(_node10);
						}_chFunc(_node9);_$parent9.children.push(_node9);
					}
				}if (it1.data.length == 0) {
					_$temp = _node5;{
						var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 7 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 3809030542;_node11.attrs["w-class"] = "historyNone";_$temp = _node11;{
							var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "img", "sid": 8 };_node12.children = [];_node12.childHash = 0;_node12.attrSize = 2;_node12.attrHash = 1623007564;_node12.attrs["src"] = "../../../res/image/dividend_history_none.png";_node12.attrs["style"] = "width: 200px;height: 200px;margin-bottom: 20px;";_$parent13.children.push(_node12);
						}_$temp = _node11;{
							var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 9 };_node13.children = [];_node13.attrHash = 0;_$temp = _node13;{
								var _$parent15 = _$temp;_addText(it1.cfgData.tips[1], _$parent15);
							}_chFunc(_node13);_$parent14.children.push(_node13);
						}_chFunc(_node11);_$parent12.children.push(_node11);
					}
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});