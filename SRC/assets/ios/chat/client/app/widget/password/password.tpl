(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrHash = 0;_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 3;_node2.attrHash = 1024234499;_node2.attrs["w-class"] = "pswInput";_node2.attrs["ev-input-change"] = "pswChange";_node2.attrs["ev-input-focus"] = "iconChange()";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 3711312999;_node3.attrs["style"] = "flex: 1";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "chat-client-app-widget-input-input", "sid": 3 };_node4.hasChild = false;_node4.child = null;_node4.attrSize = 1;_node4.attrHash = 3311847573;_node4.attrs["w-class"] = "pwInput";_$temp = _node4;{
						var _$parent5 = _$temp;var _node5 = {}; //jpair pre

						_node5["itype"] = it.type;
						//jpair suf
						//jpair pre

						{
							var jvalue = "";
							jvalue = "密码";
							//jpair suf

							_node5["placeHolder"] = jvalue;
						}
						//jpair pre

						_node5["input"] = it1.password;
						//jpair suf
						//jpair pre

						_node5["isSuccess"] = it1.isSuccess;
						//jpair suf
						//jpair pre

						_node5["clearable"] = true;
						//jpair suf
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "font-size:32px;color:#318DE6";
							//jpair suf

							_node5["style"] = _jvalue;
						}
						_addJson(_node5, _$parent5);
					}_chFunc(_node4);_$parent4.children.push(_node4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 1989288640;_node6.attrs["style"] = "display: flex;flex: 3;";_$temp = _node6;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 3556130807;{
					var attrvalue = "";attrvalue += "line line";attrvalue += it1.secret > 0 ? it1.secret : '';attrvalue += "";_node7.attrs["w-class"] = attrvalue;
				}_node7.attrHash = _hash.nextHash(_node7.attrHash, _calTextHash(_node7.attrs["w-class"]));_chFunc(_node7);_$parent7.children.push(_node7);
			}_$temp = _node6;{
				var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 3556130807;{
					var _attrvalue = "";_attrvalue += "line line";_attrvalue += it1.secret > 1 ? it1.secret : '';_attrvalue += "";_node8.attrs["w-class"] = _attrvalue;
				}_node8.attrHash = _hash.nextHash(_node8.attrHash, _calTextHash(_node8.attrs["w-class"]));_chFunc(_node8);_$parent8.children.push(_node8);
			}_$temp = _node6;{
				var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 3556130807;{
					var _attrvalue2 = "";_attrvalue2 += "line line";_attrvalue2 += it1.secret > 2 ? it1.secret : '';_attrvalue2 += "";_node9.attrs["w-class"] = _attrvalue2;
				}_node9.attrHash = _hash.nextHash(_node9.attrHash, _calTextHash(_node9.attrs["w-class"]));_chFunc(_node9);_$parent9.children.push(_node9);
			}_chFunc(_node6);_$parent6.children.push(_node6);
		}if (it1.showTips) {
			_$temp = _node;{
				var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 819962544;_node10.attrs["w-class"] = "tips";_$temp = _node10;{
					var _$parent11 = _$temp;_addText(it.tips ? it.tips : "至少8位字符，可包含英文、数字、特殊字符！", _$parent11);
				}_chFunc(_node10);_$parent10.children.push(_node10);
			}
		}_chFunc(_node);return _node;
	}
});