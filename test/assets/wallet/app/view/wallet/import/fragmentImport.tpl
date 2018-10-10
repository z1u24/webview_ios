(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 138104688;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-view-wallet-components-tipsCard", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;_addJson(it1.cfgData.tipsCard, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 4064917415;_node3.attrs["w-class"] = "bottom-box";_$temp = _node3;{
				var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrHash = 0;_$temp = _node4;{
					var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 456403266;_node5.attrs["w-class"] = "input-father";_node5.attrs["ev-input-change"] = "fragment1Change";_$temp = _node5;{
						var _$parent7 = _$temp;var _node6 = { "attrs": {}, "tagName": "app-components-input-input", "sid": 5 };_node6.hasChild = false;_node6.child = null;_node6.attrHash = 0;_$temp = _node6;{
							var _$parent8 = _$temp;var _node7 = {}; //jpair pre

							_node7["input"] = it1.fragment1;
							//jpair suf
							//jpair pre

							_node7["placeHolder"] = it1.cfgData.inputPlace[0];
							//jpair suf
							//jpair pre

							{
								var jvalue = "";
								jvalue = "padding-right:76px;";
								//jpair suf

								_node7["style"] = jvalue;
							}
							_addJson(_node7, _$parent8);
						}_chFunc(_node6);_$parent7.children.push(_node6);
					}_$temp = _node5;{
						var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 6 };_node8.children = [];_node8.attrSize = 3;_node8.attrHash = 1922872880;_node8.attrs["src"] = "../../../res/image/scan.png";_node8.attrs["w-class"] = "scan";{
							var attrvalue = "";attrvalue += "doScanQRCode(e,";attrvalue += 1;attrvalue += ")";_node8.attrs["on-tap"] = attrvalue;
						}_node8.attrHash = _hash.nextHash(_node8.attrHash, _calTextHash(_node8.attrs["on-tap"]));_chFunc(_node8);_$parent9.children.push(_node8);
					}_chFunc(_node5);_$parent6.children.push(_node5);
				}_$temp = _node4;{
					var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 2;_node9.attrHash = 1221404001;_node9.attrs["w-class"] = "input-father";_node9.attrs["ev-input-change"] = "fragment2Change";_$temp = _node9;{
						var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "app-components-input-input", "sid": 8 };_node10.hasChild = false;_node10.child = null;_node10.attrHash = 0;_$temp = _node10;{
							var _$parent12 = _$temp;var _node11 = {}; //jpair pre

							_node11["input"] = it1.fragment2;
							//jpair suf
							//jpair pre

							_node11["placeHolder"] = it1.cfgData.inputPlace[1];
							//jpair suf
							//jpair pre

							{
								var _jvalue = "";
								_jvalue = "padding-right:76px;";
								//jpair suf

								_node11["style"] = _jvalue;
							}
							_addJson(_node11, _$parent12);
						}_chFunc(_node10);_$parent11.children.push(_node10);
					}_$temp = _node9;{
						var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "img", "sid": 9 };_node12.children = [];_node12.attrSize = 3;_node12.attrHash = 1922872880;_node12.attrs["src"] = "../../../res/image/scan.png";_node12.attrs["w-class"] = "scan";{
							var _attrvalue = "";_attrvalue += "doScanQRCode(e,";_attrvalue += 2;_attrvalue += ")";_node12.attrs["on-tap"] = _attrvalue;
						}_node12.attrHash = _hash.nextHash(_node12.attrHash, _calTextHash(_node12.attrs["on-tap"]));_chFunc(_node12);_$parent13.children.push(_node12);
					}_chFunc(_node9);_$parent10.children.push(_node9);
				}_chFunc(_node4);_$parent5.children.push(_node4);
			}_$temp = _node3;{
				var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 10 };_node13.children = [];_node13.attrSize = 2;_node13.attrHash = 1573521945;_node13.attrs["ev-btn-tap"] = "nextClick";_node13.attrs["w-class"] = "btn";_$temp = _node13;{
					var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 11 };_node14.hasChild = false;_node14.child = null;_node14.attrHash = 0;_$temp = _node14;{
						var _$parent16 = _$temp;var _node15 = {}; //jpair pre

						_node15["name"] = it1.cfgData.btnName;
						//jpair suf
						//jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "big";
							//jpair suf

							_node15["types"] = _jvalue2;
						}
						//jpair pre

						{
							var _jvalue3 = "";
							_jvalue3 = "blue";
							//jpair suf

							_node15["color"] = _jvalue3;
						}
						_addJson(_node15, _$parent16);
					}_chFunc(_node14);_$parent15.children.push(_node14);
				}_chFunc(_node13);_$parent14.children.push(_node13);
			}_chFunc(_node3);_$parent4.children.push(_node3);
		}_chFunc(_node);return _node;
	}
});