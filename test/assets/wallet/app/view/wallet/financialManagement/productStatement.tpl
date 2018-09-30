(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 814419304;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["on-tap"] = "closePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 3147826738;_node2.attrs["w-class"] = "body";_node2.attrs["on-tap"] = "no";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 1019047777;_node3.attrs["w-class"] = "title";_$temp = _node3;{
					var _$parent4 = _$temp;_addText(it1.cfgData.title, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 3769928495;_node4.attrs["w-class"] = "statement";_$temp = _node4;{
					var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrHash = 0;_$temp = _node5;{
						var _$parent7 = _$temp;_addText(it1.statement, _$parent7);
					}_chFunc(_node5);_$parent6.children.push(_node5);
				}_chFunc(_node4);_$parent5.children.push(_node4);
			}_$temp = _node2;{
				var _$parent8 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 5 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 2944361944;_node6.attrs["w-class"] = "agree-choose";_node6.attrs["ev-checkbox-click"] = "checkBoxClick";_$temp = _node6;{
					var _$parent9 = _$temp;var _node7 = { "attrs": {}, "tagName": "app-components1-checkbox-checkbox", "sid": 6 };_node7.hasChild = false;_node7.child = null;_node7.attrHash = 0;_$temp = _node7;{
						var _$parent10 = _$temp;var _node8 = {}; //jpair pre

						{
							var jvalue = "";
							jvalue = "false";
							//jpair suf

							_node8["itype"] = jvalue;
						}
						//jpair pre

						_node8["text"] = it1.cfgData.mess;
						//jpair suf
						_addJson(_node8, _$parent10);
					}_chFunc(_node7);_$parent9.children.push(_node7);
				}_chFunc(_node6);_$parent8.children.push(_node6);
			}_$temp = _node2;{
				var _$parent11 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 2;_node9.attrHash = 1573521945;_node9.attrs["ev-btn-tap"] = "nextClick";_node9.attrs["w-class"] = "btn";_$temp = _node9;{
					var _$parent12 = _$temp;var _node10 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 8 };_node10.hasChild = false;_node10.child = null;_node10.attrHash = 0;_$temp = _node10;{
						var _$parent13 = _$temp;var _node11 = {}; //jpair pre

						_node11["name"] = it1.cfgData.btnName;
						//jpair suf
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "big";
							//jpair suf

							_node11["types"] = _jvalue;
						}
						//jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "white";
							//jpair suf

							_node11["color"] = _jvalue2;
						}
						_addJson(_node11, _$parent13);
					}_chFunc(_node10);_$parent12.children.push(_node10);
				}_chFunc(_node9);_$parent11.children.push(_node9);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_chFunc(_node);return _node;
	}
});