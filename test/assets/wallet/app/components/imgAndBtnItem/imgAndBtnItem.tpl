(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 2349690231;_node.attrs["w-class"] = "item";_node.attrs["ev-btn-tap"] = "doTap";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "img", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 1356816673;{
				var attrvalue = "";attrvalue += it.img;attrvalue += "";_node2.attrs["src"] = attrvalue;
			}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["src"]));_node2.attrs["w-class"] = "itemImg";_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 2863761446;_node3.attrs["style"] = "display: inline-block;flex: 1 0 0;";_$temp = _node3;{
				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 136397174;_node4.attrs["w-class"] = "itemName";_$temp = _node4;{
					var _$parent5 = _$temp;_addText(it.name, _$parent5);
				}_chFunc(_node4);_$parent4.children.push(_node4);
			}_$temp = _node3;{
				var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 936179753;_node5.attrs["w-class"] = "itemDescribe";_$temp = _node5;{
					var _$parent7 = _$temp;_addText(it.describe, _$parent7);
				}_chFunc(_node5);_$parent6.children.push(_node5);
			}_chFunc(_node3);_$parent3.children.push(_node3);
		}_$temp = _node;{
			var _$parent8 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 5 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 3935259669;_node6.attrs["w-class"] = "itemBtn";if (it.isComplete) {
				_$temp = _node6;{
					var _$parent9 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 6 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 626124697;_node7.attrs["w-class"] = "mybtn";_$temp = _node7;{
						var _$parent10 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 7 };_node8.children = [];_node8.childHash = 0;_node8.attrSize = 2;_node8.attrHash = 3263700126;_node8.attrs["src"] = "../../res/image/32_white.png";_node8.attrs["style"] = "width: 40px;height: 40px;margin-right: 10px;vertical-align: middle;";_$parent10.children.push(_node8);
					}_$temp = _node7;{
						var _$parent11 = _$temp;var _node9 = { "attrs": {}, "tagName": "span", "sid": 8 };_node9.children = [];_node9.attrHash = 0;_$temp = _node9;{
							var _$parent12 = _$temp;_addText(it1.cfgData.complete, _$parent12);
						}_chFunc(_node9);_$parent11.children.push(_node9);
					}_chFunc(_node7);_$parent9.children.push(_node7);
				}
			} else {
				_$temp = _node6;{
					var _$parent13 = _$temp;var _node10 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 9 };_node10.hasChild = false;_node10.child = null;_node10.attrHash = 0;_$temp = _node10;{
						var _$parent14 = _$temp;var _node11 = {}; //jpair pre

						_node11["name"] = it.btnName;
						//jpair suf
						//jpair pre

						{
							var jvalue = "";
							jvalue = "small";
							//jpair suf

							_node11["types"] = jvalue;
						}
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "orange";
							//jpair suf

							_node11["color"] = _jvalue;
						}
						//jpair pre

						_node11["style"] = it.style;
						//jpair suf
						_addJson(_node11, _$parent14);
					}_chFunc(_node10);_$parent13.children.push(_node10);
				}
			}_chFunc(_node6);_$parent8.children.push(_node6);
		}_chFunc(_node);return _node;
	}
});