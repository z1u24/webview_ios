(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 1303452502;_node.attrs["w-class"] = "item";_node.attrs["on-tap"] = "goProductDetail()";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3554551222;_node2.attrs["style"] = "height: 250px;text-align: center;";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.attrSize = 3;_node3.attrHash = 956491085;{
					var attrvalue = "";attrvalue += "../../res/image/virtualGoods/";attrvalue += it.id;attrvalue += ".jpg";_node3.attrs["src"] = attrvalue;
				}_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["src"]));_node3.attrs["height"] = "100%";_node3.attrs["alt"] = "";_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 4169927473;_node4.attrs["w-class"] = "item-desc";_$temp = _node4;{
				var _$parent5 = _$temp;_addText(it.name, _$parent5);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_$temp = _node;{
			var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 1374842448;_node5.attrs["w-class"] = "item-money";_$temp = _node5;{
				var _$parent7 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 5 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 3934296184;_node6.attrs["w-class"] = "money-one";_$temp = _node6;{
					var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 6 };_node7.children = [];_node7.childHash = 0;_node7.attrSize = 2;_node7.attrHash = 2773233105;_node7.attrs["src"] = "";_node7.attrs["alt"] = "";_$parent8.children.push(_node7);
				}_$temp = _node6;{
					var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "widget", "sid": 7 };_node8.hasChild = false;_node8.child = null;_node8.childHash = 1019303649;_node8.attrSize = 2;_node8.attrHash = 3020893357;_node8.attrs["w-tag"] = "pi-ui-lang";_node8.tagName = _node8.attrs["w-tag"];_node8.attrs["w-class"] = "money-num";_node8.attrs["style"] = "color:#888888;font-size:24px;";_$temp = _node8;{
						var _$parent10 = _$temp;var _node9 = {}; //jpair pre

						{
							var jvalue = "";
							jvalue = "碎银";
							//jpair suf

							_node9["zh_Hans"] = jvalue;
						}
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "碎銀";
							//jpair suf

							_node9["zh_Hant"] = _jvalue;
						}
						//jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "";
							//jpair suf

							_node9["en"] = _jvalue2;
						}
						_addJson(_node9, _$parent10);
					}_$parent9.children.push(_node8);
				}_$temp = _node6;{
					var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "span", "sid": 8 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 921162720;_node10.attrs["w-class"] = "money-num";_$temp = _node10;{
						var _$parent12 = _$temp;_addText(it.stCount / 100, _$parent12);
					}_chFunc(_node10);_$parent11.children.push(_node10);
				}_chFunc(_node6);_$parent7.children.push(_node6);
			}_chFunc(_node5);_$parent6.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});