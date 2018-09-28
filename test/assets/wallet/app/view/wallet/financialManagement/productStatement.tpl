(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 814419304;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["on-tap"] = "closePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 3147826738;_node2.attrs["w-class"] = "body";_node2.attrs["on-tap"] = "no";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.childHash = 4091564180;_node3.attrSize = 1;_node3.attrHash = 1019047777;_node3.attrs["w-class"] = "title";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = _installText("理财声明", 1815813819);;
					_$parent4.children.push(_node4);
				}_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 3769928495;_node5.attrs["w-class"] = "statement";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrHash = 0;_$temp = _node6;{
						var _$parent7 = _$temp;_addText(it1.statement, _$parent7);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node2;{
				var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.childHash = 532142298;_node7.attrSize = 2;_node7.attrHash = 2944361944;_node7.attrs["w-class"] = "agree-choose";_node7.attrs["ev-checkbox-click"] = "checkBoxClick";_$temp = _node7;{
					var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "app-components1-checkbox-checkbox", "sid": 6 };_node8.hasChild = false;_node8.child = null;_node8.childHash = 2901728037;_node8.attrHash = 0;_$temp = _node8;{
						var _$parent10 = _$temp;var _node9 = {}; //jpair pre

						{
							var jvalue = "";
							jvalue = "false";
							//jpair suf

							_node9["itype"] = jvalue;
						}
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "我已经认证阅读并同意";
							//jpair suf

							_node9["text"] = _jvalue;
						}
						_addJson(_node9, _$parent10);
					}_$parent9.children.push(_node8);
				}_$parent8.children.push(_node7);
			}_$temp = _node2;{
				var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.childHash = 2469023285;_node10.attrSize = 2;_node10.attrHash = 1573521945;_node10.attrs["ev-btn-tap"] = "nextClick";_node10.attrs["w-class"] = "btn";_$temp = _node10;{
					var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 8 };_node11.hasChild = false;_node11.child = null;_node11.childHash = 3011951459;_node11.attrHash = 0;_$temp = _node11;{
						var _$parent13 = _$temp;var _node12 = {}; //jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "我已阅读";
							//jpair suf

							_node12["name"] = _jvalue2;
						}
						//jpair pre

						{
							var _jvalue3 = "";
							_jvalue3 = "big";
							//jpair suf

							_node12["types"] = _jvalue3;
						}
						//jpair pre

						{
							var _jvalue4 = "";
							_jvalue4 = "white";
							//jpair suf

							_node12["color"] = _jvalue4;
						}
						_addJson(_node12, _$parent13);
					}_$parent12.children.push(_node11);
				}_$parent11.children.push(_node10);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_chFunc(_node);return _node;
	}
});