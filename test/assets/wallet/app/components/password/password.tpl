(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrHash = 0;_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 3;_node2.attrHash = 1024234499;_node2.attrs["w-class"] = "pswInput";_node2.attrs["ev-input-change"] = "pswChange";_node2.attrs["ev-input-focus"] = "iconChange()";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 3711312999;_node3.attrs["style"] = "flex: 1";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 3 };_node4.hasChild = false;_node4.child = null;_node4.attrHash = 0;_$temp = _node4;{
						var _$parent5 = _$temp;var _node5 = {}; //jpair pre

						{
							var jvalue = "";
							jvalue = "password";
							//jpair suf

							_node5["itype"] = jvalue;
						}
						//jpair pre

						_node5["placeHolder"] = it.placeHolder ? it.placeHolder : it1.cfgData.password;
						//jpair suf
						//jpair pre

						_node5["input"] = it1.password;
						//jpair suf
						_addJson(_node5, _$parent5);
					}_chFunc(_node4);_$parent4.children.push(_node4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}if (it1.isSuccess) {
				_$temp = _node2;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 4 };_node6.children = [];_node6.childHash = 0;_node6.attrSize = 2;_node6.attrHash = 2482735419;_node6.attrs["src"] = "../../res/image/icon_right2.png";_node6.attrs["w-class"] = "successPic";_$parent6.children.push(_node6);
				}
			} else if (it1.showIcon) {
				_$temp = _node2;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 5 };_node7.children = [];_node7.childHash = 0;_node7.attrSize = 3;_node7.attrHash = 101892505;_node7.attrs["src"] = "../../res/image/fail.png";_node7.attrs["w-class"] = "successPic";_node7.attrs["on-tap"] = "clear";_$parent7.children.push(_node7);
				}
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 171783709;_node8.attrs["style"] = "display: flex;";_$temp = _node8;{
				var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 3556130807;{
					var attrvalue = "";attrvalue += "line line";attrvalue += it1.secret > 0 ? it1.secret : '';attrvalue += "";_node9.attrs["w-class"] = attrvalue;
				}_node9.attrHash = _hash.nextHash(_node9.attrHash, _calTextHash(_node9.attrs["w-class"]));_chFunc(_node9);_$parent9.children.push(_node9);
			}_$temp = _node8;{
				var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 3556130807;{
					var _attrvalue = "";_attrvalue += "line line";_attrvalue += it1.secret > 1 ? it1.secret : '';_attrvalue += "";_node10.attrs["w-class"] = _attrvalue;
				}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["w-class"]));_chFunc(_node10);_$parent10.children.push(_node10);
			}_$temp = _node8;{
				var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 9 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 3556130807;{
					var _attrvalue2 = "";_attrvalue2 += "line line";_attrvalue2 += it1.secret > 2 ? it1.secret : '';_attrvalue2 += "";_node11.attrs["w-class"] = _attrvalue2;
				}_node11.attrHash = _hash.nextHash(_node11.attrHash, _calTextHash(_node11.attrs["w-class"]));_chFunc(_node11);_$parent11.children.push(_node11);
			}_chFunc(_node8);_$parent8.children.push(_node8);
		}if (it1.showTips) {
			_$temp = _node;{
				var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 10 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 819962544;_node12.attrs["w-class"] = "tips";_$temp = _node12;{
					var _$parent13 = _$temp;_addText(it.tips ? it.tips : it1.cfgData.tips, _$parent13);
				}_chFunc(_node12);_$parent12.children.push(_node12);
			}
		}_chFunc(_node);return _node;
	}
});