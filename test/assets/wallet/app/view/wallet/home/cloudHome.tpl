(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 3118159832;_node.attrs["w-class"] = "asset-container";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3181901047;_node2.attrs["w-class"] = "total-asset-container";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 2866552653;_node3.attrs["w-class"] = "total-asset";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = _installText("总资产：￥", 4108157091);;
					_$parent4.children.push(_node4);
				}_$temp = _node3;{
					var _$parent5 = _$temp;_addText(it1.totalAsset, _$parent5);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 2812074640;_node5.attrs["w-class"] = "container";_$temp = _node5;{
				var _$parent7 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 2982197612;_node6.attrs["w-class"] = "asset-list";_node6.attrs["ev-item-click"] = "itemClick";_$temp = _node6;{
					var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "app-components1-walletAssetList-walletAssetList", "sid": 5 };_node7.hasChild = false;_node7.child = null;_node7.attrHash = 0;_$temp = _node7;{
						var _$parent9 = _$temp;var _node8 = {}; //jpair pre

						_node8["assetList"] = it1.assetList;
						//jpair suf
						_addJson(_node8, _$parent9);
					}_chFunc(_node7);_$parent8.children.push(_node7);
				}_chFunc(_node6);_$parent7.children.push(_node6);
			}_$temp = _node5;{
				var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 1511636449;_node9.attrs["w-class"] = "fm-container";_$temp = _node9;{
					var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.childHash = 329919784;_node10.attrSize = 1;_node10.attrHash = 2314726494;_node10.attrs["w-class"] = "fm-title";_$temp = _node10;{
						var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.childHash = 718128295;_node11.attrHash = 0;_$temp = _node11;{
							var _$parent13 = _$temp;var _node12 = _installText("优选理财", 2028512171);;
							_$parent13.children.push(_node12);
						}_$parent12.children.push(_node11);
					}_$temp = _node10;{
						var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "img", "sid": 9 };_node13.children = [];_node13.childHash = 0;_node13.attrSize = 2;_node13.attrHash = 3989934127;_node13.attrs["src"] = "../../../res/image/right_arrow_gray.png";_node13.attrs["on-tap"] = "optimalClick";_$parent14.children.push(_node13);
					}_$parent11.children.push(_node10);
				}_$temp = _node9;{
					var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 10 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 1491037490;_node14.attrs["w-class"] = "fm-list";{
						var _$i = 0;
						for (var _iterator = it1.productList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
							var i = _$i++;_$temp = _node14;{
								var _$parent16 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 11 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 3277888839;{
									var attrvalue = "";attrvalue += "fmItemClick(e,";attrvalue += i;attrvalue += ")";_node15.attrs["on-tap"] = attrvalue;
								}_node15.attrHash = _hash.nextHash(_node15.attrHash, _calTextHash(_node15.attrs["on-tap"]));_$temp = _node15;{
									var _$parent17 = _$temp;var _node16 = { "attrs": {}, "tagName": "app-view-wallet-components-fmListItem", "sid": 12 };_node16.hasChild = false;_node16.child = null;_node16.attrHash = 0;_$temp = _node16;{
										var _$parent18 = _$temp;var _node17 = {}; //jpair pre

										_node17["product"] = v;
										//jpair suf
										_addJson(_node17, _$parent18);
									}_chFunc(_node16);_$parent17.children.push(_node16);
								}_chFunc(_node15);_$parent16.children.push(_node15);
							}
						}
					}_chFunc(_node14);_$parent15.children.push(_node14);
				}_chFunc(_node9);_$parent10.children.push(_node9);
			}_chFunc(_node5);_$parent6.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});