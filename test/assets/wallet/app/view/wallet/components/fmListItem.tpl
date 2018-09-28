(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1045235690;_node.attrs["w-class"] = "item";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 863200548;_node2.attrs["w-class"] = "inner1";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 1612971462;_node3.attrs["w-class"] = "gain";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "span", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 3219134862;_node4.attrs["w-class"] = "gain-number";_$temp = _node4;{
						var _$parent5 = _$temp;_addText(it.product.profit, _$parent5);
					}_chFunc(_node4);_$parent4.children.push(_node4);
				}_$temp = _node3;{
					var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "span", "sid": 4 };_node5.children = [];_node5.childHash = 3629939966;_node5.attrSize = 1;_node5.attrHash = 882972463;_node5.attrs["w-class"] = "gain-unit";_$temp = _node5;{
						var _$parent7 = _$temp;var _node6 = _installText("%", 4257547020);;
						_$parent7.children.push(_node6);
					}_$parent6.children.push(_node5);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.childHash = 2433872631;_node7.attrSize = 1;_node7.attrHash = 3568076218;_node7.attrs["w-class"] = "desc";_$temp = _node7;{
					var _$parent9 = _$temp;var _node8 = _installText("预期年化收益", 2496982372);;
					_$parent9.children.push(_node8);
				}_$parent8.children.push(_node7);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 4169587451;_node9.attrs["w-class"] = "inner2";_$temp = _node9;{
				var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 1540292426;_node10.attrs["w-class"] = "name";_$temp = _node10;{
					var _$parent12 = _$temp;_addText(it.product.productName, _$parent12);
				}_chFunc(_node10);_$parent11.children.push(_node10);
			}_$temp = _node9;{
				var _$parent13 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 3568076218;_node11.attrs["w-class"] = "desc";_$temp = _node11;{
					var _$parent14 = _$temp;_addText(it.product.productDescribe, _$parent14);
				}_chFunc(_node11);_$parent13.children.push(_node11);
			}_chFunc(_node9);_$parent10.children.push(_node9);
		}_$temp = _node;{
			var _$parent15 = _$temp;var _node12 = { "attrs": {}, "tagName": "app-components-ringProgressBar-ringProgressBar", "sid": 9 };_node12.hasChild = false;_node12.child = null;_node12.attrHash = 0;_$temp = _node12;{
				var _$parent16 = _$temp;var _node13 = {}; //jpair pre

				_node13["width"] = 80;
				//jpair suf
				//jpair pre

				_node13["borderWidth"] = 4;
				//jpair suf
				//jpair pre

				{
					var jvalue = "";
					jvalue = "#f48e35";
					//jpair suf

					_node13["activeColor"] = jvalue;
				}
				//jpair pre

				_node13["activePercent"] = 1 - it.product.surplus / it.product.total;
				//jpair suf
				//jpair pre

				{
					var _jvalue = "";
					_jvalue = "fontSize:28px;color:#f7931a;";
					//jpair suf

					_node13["centerStyle"] = _jvalue;
				}
				//jpair pre

				_node13["centerText"] = it.product.surplus === 0 ? '售罄' : Math.floor(it.product.surplus / it.product.total * 100) + '%';
				//jpair suf
				_addJson(_node13, _$parent16);
			}_chFunc(_node12);_$parent15.children.push(_node12);
		}_chFunc(_node);return _node;
	}
});