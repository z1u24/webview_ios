(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1542886283;_node.attrs["class"] = "new-page";if (it1.purchaseRecord.length === 0) {
			_$temp = _node;{
				var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 1587261762;_node2.attrs["w-class"] = "no-recode";_$temp = _node2;{
					var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.childHash = 0;_node3.attrSize = 2;_node3.attrHash = 832237403;_node3.attrs["src"] = "../../../res/image/dividend_history_none.png";_node3.attrs["w-class"] = "no-recode-icon";_$parent3.children.push(_node3);
				}_$temp = _node2;{
					var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 308010609;_node4.attrs["w-class"] = "no-recode-text";_$temp = _node4;{
						var _$parent5 = _$temp;_addText(it1.cfgData.noneMess, _$parent5);
					}_chFunc(_node4);_$parent4.children.push(_node4);
				}_chFunc(_node2);_$parent2.children.push(_node2);
			}
		} else {
			_$temp = _node;{
				var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 486435355;_node5.attrs["w-class"] = "list";{
					var _$i = 0;
					for (var _iterator = it1.purchaseRecord, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
						var i = _$i++;_$temp = _node5;{
							var _$parent7 = _$temp;var _node6 = { "attrs": {}, "tagName": "app-view-wallet-components-holdedProductItem", "sid": 5 };_node6.hasChild = false;_node6.child = null;_node6.attrHash = 0;_$temp = _node6;{
								var _$parent8 = _$temp;var _node7 = {}; //jpair pre

								_node7["product"] = v;
								//jpair suf
								_addJson(_node7, _$parent8);
							}_chFunc(_node6);_$parent7.children.push(_node6);
						}
					}
				}_chFunc(_node5);_$parent6.children.push(_node5);
			}
		}_chFunc(_node);return _node;
	}
});