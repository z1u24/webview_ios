(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 3118159832;_node.attrs["w-class"] = "asset-container";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3181901047;_node2.attrs["w-class"] = "total-asset-container";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 2866552653;_node3.attrs["w-class"] = "total-asset";_$temp = _node3;{
					var _$parent4 = _$temp;_addText(it1.cfgData.totalAmount, _$parent4);
				}_$temp = _node3;{
					var _$parent5 = _$temp;var _node4 = _installText("￥", 3615707983);;
					_$parent5.children.push(_node4);
				}_$temp = _node3;{
					var _$parent6 = _$temp;_addText(it1.totalAsset, _$parent6);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent7 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 3 };_node5.children = [];_node5.childHash = 0;_node5.attrSize = 3;_node5.attrHash = 3601108044;_node5.attrs["src"] = "../../../res/image1/add.png";_node5.attrs["w-class"] = "add-asset";_node5.attrs["on-tap"] = "addAssetClick";_$parent7.children.push(_node5);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent8 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 2982197612;_node6.attrs["w-class"] = "asset-list";_node6.attrs["ev-item-click"] = "itemClick";_$temp = _node6;{
				var _$parent9 = _$temp;var _node7 = { "attrs": {}, "tagName": "app-components1-walletAssetList-walletAssetList", "sid": 5 };_node7.hasChild = false;_node7.child = null;_node7.attrHash = 0;_$temp = _node7;{
					var _$parent10 = _$temp;var _node8 = {}; //jpair pre

					_node8["assetList"] = it1.assetList;
					//jpair suf
					_addJson(_node8, _$parent10);
				}_chFunc(_node7);_$parent9.children.push(_node7);
			}_chFunc(_node6);_$parent8.children.push(_node6);
		}_chFunc(_node);return _node;
	}
});