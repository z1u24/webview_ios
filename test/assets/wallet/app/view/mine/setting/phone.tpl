(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 2139844790;_node.attrs["class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["title"] = it1.cfgData.topBarTitle;
				//jpair suf
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.childHash = 1408055209;_node4.attrSize = 2;_node4.attrHash = 1781424085;_node4.attrs["style"] = "margin: 30px 20px;";_node4.attrs["ev-getCode"] = "phoneChange";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "app-components-bindPhone-bindPhone", "sid": 3 };_node5.hasChild = false;_node5.child = null;_node5.childHash = 2946814719;_node5.attrHash = 0;_$parent5.children.push(_node5);
			}_$parent4.children.push(_node4);
		}_$temp = _node;{
			var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 487306359;_node6.attrs["w-class"] = "content";if (!it1.isSuccess) {
				_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 3454374597;_node7.attrs["w-class"] = "verify";_$temp = _node7;{
						var _$parent8 = _$temp;_addText(it1.cfgData.warn, _$parent8);
					}_chFunc(_node7);_$parent7.children.push(_node7);
				}
			}_$temp = _node6;{
				var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 3;_node8.attrHash = 3593399597;_node8.attrs["style"] = "text-align: center;margin-top: 60px;";_node8.attrs["ev-input-change"] = "codeChange";_node8.attrs["ev-input-focus"] = "codeFocus";{
					var _$i = 0;
					var _arr = [1, 2, 3, 4];
					for (var _i = 0; _i < _arr.length; _i++) {
						var val = _arr[_i];var ind = _$i++;_$temp = _node8;{
							var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 2;_node9.attrHash = 1499360264;_node9.attrs["w-class"] = "codeBottom";{
								var attrvalue = "";attrvalue += "codeInput";attrvalue += ind;attrvalue += "";_node9.attrs["id"] = attrvalue;
							}_node9.attrHash = _hash.nextHash(_node9.attrHash, _calTextHash(_node9.attrs["id"]));_$temp = _node9;{
								var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 8 };_node10.hasChild = false;_node10.child = null;_node10.attrHash = 0;_$temp = _node10;{
									var _$parent12 = _$temp;var _node11 = {}; //jpair pre

									_node11["index"] = ind;
									//jpair suf
									//jpair pre

									{
										var jvalue = "";
										jvalue = "number";
										//jpair suf

										_node11["itype"] = jvalue;
									}
									//jpair pre

									{
										var _jvalue = "";
										_jvalue = "font-size:64px;color:#368FE5;text-align:center;";
										//jpair suf

										_node11["style"] = _jvalue;
									}
									//jpair pre

									_node11["input"] = it1.code[ind];
									//jpair suf
									//jpair pre

									_node11["autofocus"] = false;
									//jpair suf
									_addJson(_node11, _$parent12);
								}_chFunc(_node10);_$parent11.children.push(_node10);
							}_chFunc(_node9);_$parent10.children.push(_node9);
						}
					}
				}_chFunc(_node8);_$parent9.children.push(_node8);
			}_chFunc(_node6);_$parent6.children.push(_node6);
		}_chFunc(_node);return _node;
	}
});